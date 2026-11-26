import { getFirestore, initializeFirestore, memoryLocalCache, memoryLruGarbageCollector, doc, collection, collectionGroup, query, where, onSnapshot, getDocFromServer, getDocsFromServer, setDoc, updateDoc, writeBatch, runTransaction, serverTimestamp, deleteField, arrayUnion, arrayRemove, Timestamp } from 'firebase/firestore';
import { scheduleDates, localDate } from './calendar.mjs';
import { isReaction, tally, reactionsTo } from './reactions.mjs';
import { programmeDays, MAX_TEXTS } from './volumes.mjs';
import { validChoices } from './desert-island.mjs';
import { draftConflict } from './outbox.mjs';
import { dayNumber, validateComment, validateRating, ratingSummary } from '../server/domain.mjs';

const millis = t => t?.toMillis?.() ?? null;
const noAccess = e => e.code === 'permission-denied';

// The cache lives in memory, with LRU garbage collection: a listener closed
// while the page is hidden (pause) keeps its documents and resume token (not
// collected until the cache passes its size limit), so
// reopening it within Firestore's 30-minute window pays only for documents
// changed meanwhile. It is not kept in IndexedDB (persistentLocalCache) any
// more: there every listener costs IndexedDB work, and the feed held about
// three listeners per released text (own row, club responses, reactions;
// some 480 by Day 53; far fewer now, see "Fewer live connections" in
// SPEC.md). Whenever they all start at once (page load, the
// network coming back, resume) a draft save or Finish & reveal waited behind
// them: 10 to 12 s in WebKit on the Mac at Day 53, 2 s at Day 31, none at
// Day 11 (not measured on a phone). The cost: a reload or a new tab re-reads
// the feed from the server. If the app already has a Firestore instance, it
// is used as it is.
export function openFirestore(app) {
  try { return initializeFirestore(app, { localCache: memoryLocalCache({ garbageCollector: memoryLruGarbageCollector() }) }); }
  catch { return getFirestore(app); }
}

// Firestore enforces per-reader disclosure. Only a submitted reader can query
// other submitted responses; drafts never enter that query or its snapshots.
// `recentDays`: how many days before today count as recent ("Today first" in
// SPEC.md): drawn first with today's, their club data fetched at load.
export function createFirestoreBackend(app, user, db = openFirestore(app), { recentDays = 2 } = {}) {
  const watches = new Map(), clocks = new Map(), healed = new Set(), texts = new Map();
  // True while the page is hidden: listeners are closed (see pause).
  let paused = false;
  // Set when the deployed rules refuse reactions (rules older than the
  // client): the thoughts then show without them, and nobody can react.
  let reactionsOff = false;
  // Likewise for the record of which reactions to one's own thoughts one has
  // seen (seen/{uid}): until those rules are deployed, the app keeps it on
  // the device only.
  let seenOff = false;
  // And for My ranking (rankings/{uid}): until its rules are deployed, the
  // order lives on the device only.
  let rankingOff = false;
  // And for Desert island (desertIsland/{uid}): until its rules are deployed,
  // the choices live on the device only.
  let islandOff = false;
  // Fewer live connections (SPEC.md). The club's responses and the reactions
  // on a text are listened to only while the text is today's or on screen
  // (`attended`, told by the app). The recent days are fetched once and kept
  // here (`once`: key -> { ref, snap, pending, stale, error }), then fetched
  // again when marked stale: Refresh, or the page shown again after its
  // listeners were closed (pause). An older text keeps here what its
  // listener last showed; it is read again only by Refresh (Today first).
  // Today first (SPEC.md): an older text is not read at all until its card
  // comes on screen, Refresh, the Stars roster or one's own action on it
  // (`again`: keys to read from the server at the next feed).
  const attended = new Map(), once = new Map(), again = new Set();
  // Called when a fetch in the background has brought newer data than the
  // last feed showed, so the app can ask for the feed again.
  let changed = () => {}, inFlight = 0, dirty = false;
  // One's own rows in one query (SPEC.md): clubs where that query was
  // refused or failed (per-text listeners are used there, as before); texts
  // known to have no row of one's own; rows read from the server that are
  // newer than the query's last snapshot.
  const mineOff = new Set(), norow = new Set(), newer = new Map();
  function unwatch(key) { watches.get(key)?.stop?.(); watches.delete(key); }
  // Drop a key altogether: its listener and its one-time copy.
  function forget(key) { unwatch(key); once.delete(key); }
  // Drop it and read it from the server at the next feed, live or not.
  function reread(key) { forget(key); again.add(key); }
  function listen(e) {
    e.stop = onSnapshot(e.ref, { includeMetadataChanges: true }, snap => {
      if (snap.metadata.fromCache || snap.metadata.hasPendingWrites) return;
      e.snap = snap; e.resolve();
      for (const w of e.waiters) if (w.test(snap)) w.done();
    }, error => { e.error = error; e.stop = null; e.reject(error); for (const w of e.waiters) w.done(); });
  }
  function watch(key, ref) {
    if (!watches.has(key)) {
      const e = { ref, waiters: new Set(), stop: null };
      e.ready = new Promise((resolve, reject) => { e.resolve = resolve; e.reject = reject; });
      // A listener asked for while hidden opens on resume; until then the
      // first read waits, as it would for a slow server.
      if (!paused) listen(e);
      watches.set(key, e);
    }
    const e = watches.get(key);
    return e.ready.then(() => { if (e.error) throw e.error; return e.snap; });
  }
  // Close every listener while the page is hidden, keeping each one's last
  // snapshot, and reopen them all when it is shown again. A reopened listener
  // pays only for the documents changed meanwhile (within 30 minutes).
  function pause() {
    if (paused) return;
    paused = true;
    for (const e of watches.values()) { e.stop?.(); e.stop = null; }
  }
  function resume() {
    if (!paused) return;
    paused = false;
    for (const e of watches.values()) if (!e.stop && !e.error) listen(e);
    // What was fetched once may be old by now, and a text may have got a row
    // from another device: the next feed fetches the recent days again, in
    // the background; older texts wait until they are on screen or Refresh.
    for (const e of once.values()) e.stale = true;
    norow.clear();
  }
  // One fetch from the server, kept. A stale copy is served at once while a
  // new fetch runs in the background (`wait` waits for it instead); `changed`
  // then tells the app. With no copy at all the caller waits for the fetch.
  async function fetched(key, ref, wait = false) {
    let e = once.get(key);
    if (!e) { e = { ref, snap: null, error: null, pending: null, stale: true }; once.set(key, e); }
    if (e.stale && !e.pending) {
      e.stale = false;
      const had = !!e.snap;
      inFlight++;
      e.pending = getDocsFromServer(ref).then(snap => {
        if (had && !wait && !sameDocs(e.snap, snap)) dirty = true;
        e.snap = snap; e.error = null;
        // A refusal changes what the feed shows (the text locks); a failed
        // fetch (no network) does not, and is tried again by the next feed.
      }, error => { e.error = error; if (had && !wait && noAccess(error)) dirty = true; })
        // One call for the whole round of background fetches, when the last one is in.
        .finally(() => { e.pending = null; if (!--inFlight && dirty) { dirty = false; changed(); } });
    }
    if (e.pending && (wait || !e.snap)) await e.pending;
    if (e.error) {
      const error = e.error;
      e.error = null;
      // Refused: the caller decides (lost access, or rules older than the
      // client). Any other failure (no network): keep what there is and try
      // again on the next feed; with nothing to show, wait on a listener,
      // which simply delivers when the network is back, as it always did.
      if (noAccess(error)) { once.delete(key); throw error; }
      e.stale = true;
      if (!e.snap) { once.delete(key); return watch(key, ref); }
    }
    return e.snap;
  }
  const sameDocs = (a, b) => a.size === b.size && a.docs.every((d, i) => d.id === b.docs[i].id && d.data().updatedAt?.isEqual?.(b.docs[i].data().updatedAt));
  // A query's documents, read the way `how` says (see `howToRead`):
  // 'live' from a listener; 'fetch' from one fetch, kept, a stale copy served
  // at once and fetched again in the background; 'wait' fetched again and
  // waited for; 'copy' only what the page already has, null when nothing
  // (Today first: an older text off screen). A text that stops being live
  // hands its listener's last snapshot over and closes the listener; one
  // that becomes live keeps its copy until the listener has delivered.
  async function read(key, ref, how) {
    if (how === 'live') { const snap = await watch(key, ref); once.delete(key); return snap; }
    const w = watches.get(key);
    if (w && (w.error || !w.snap)) return watch(key, ref);
    if (w) { once.set(key, { ref, snap: w.snap, error: null, pending: null, stale: false }); unwatch(key); }
    if (how === 'copy') {
      const e = once.get(key);
      if (e?.snap) return e.snap;
      return e?.pending ? fetched(key, ref) : null;
    }
    return fetched(key, ref, how === 'wait');
  }
  const isLive = (c, w, ctx) => w.day === ctx.day || !!attended.get(c)?.has(w.id);
  // Today and the `recentDays` before it (of the programme's last day, once
  // it has ended): drawn first, their club data fetched at load.
  const isRecent = (w, ctx) => w.day >= ctx.last - recentDays;
  // How a finished text's club data (responses, reactions) is read, per key.
  function howToRead(key, live, recent, ctx) {
    if (live) return 'live';
    if (ctx.fresh || again.has(key)) return 'wait';
    return recent ? 'fetch' : 'copy';
  }
  // The app says which texts are on screen (or open in the reader). True when
  // a text was added, so the app asks for the feed again and gets it live.
  function attend(c, ids) {
    const before = attended.get(c) || new Set(), now = new Set(ids);
    attended.set(c, now);
    return [...now].some(id => !before.has(id));
  }
  // Resolves once the listener has delivered a server snapshot passing `test`
  // (true), or false if none arrives in time or the listener is gone.
  function settled(key, test, ms = 4000) {
    const e = watches.get(key);
    if (!e || e.error) return Promise.resolve(false);
    if (e.snap && test(e.snap)) return Promise.resolve(true);
    return new Promise(resolve => {
      const w = { test, done: () => { clearTimeout(t); e.waiters.delete(w); resolve(!e.error && watches.get(key) === e); } };
      const t = setTimeout(() => { e.waiters.delete(w); resolve(false); }, ms);
      e.waiters.add(w);
    });
  }
  const programRef = c => doc(db, 'dailyDose', c);
  const workRef = (c, w) => doc(programRef(c), 'works', w);
  const ownRef = (c, w) => doc(workRef(c, w), 'reads', user().uid);
  // The organiser-visible completion record: only whether and when each text
  // was checked off. Ratings, thoughts and progress stay in the private row.
  const completionRef = (c, uid = user().uid) => doc(programRef(c), 'completions', uid);
  // Private to its owner: per text, the reactions to one's own thought already seen.
  const seenRef = c => doc(programRef(c), 'seen', user().uid);
  // Private to its owner: My ranking, the order of the texts one has rated.
  const rankingRef = c => doc(programRef(c), 'rankings', user().uid);
  // Private to its owner: Desert island, the pairwise choices one has made.
  const islandRef = c => doc(programRef(c), 'desertIsland', user().uid);
  async function clock(c, fresh = false) {
    if (fresh || !clocks.has(c)) {
      const ref = doc(programRef(c), 'sessions', user().uid);
      await setDoc(ref, { at: serverTimestamp() });
      const snap = await getDocFromServer(ref);
      clocks.set(c, { server: millis(snap.data().at), local: performance.now() });
    }
    const t = clocks.get(c);
    return t.server + performance.now() - t.local - 1000;
  }
  async function context(c) {
    // The clock is asked at the same time (it was asked after these three): one round trip less.
    const time = clock(c).then(now => ({ now }), error => ({ error }));
    const [ps, ms, cs] = await Promise.all([watch(`p:${c}`, programRef(c)), watch(`m:${c}`, collection(db, 'clubs', c, 'members')), watch(`c:${c}`, doc(db, 'clubs', c))]);
    if (!ps.exists() || !ms.docs.some(d => d.id === user().uid)) throw new Error('Your book-club membership could not be confirmed.');
    const p = ps.data(), members = new Map(ms.docs.map(d => [d.id, { name: d.data().display_name || 'Book club member' }]));
    const organizer = p.organizerUids.includes(user().uid);
    const ids = [...members.keys()].sort();
    const before = [...p.participantUids];
    // Only the trusted organiser synchronises admission / departures from Bookrank.
    if (organizer && JSON.stringify(ids) !== JSON.stringify([...p.participantUids].sort())) {
      try { await updateDoc(programRef(c), { participantUids: ids }); p.participantUids = ids; }
      catch (e) { if (!noAccess(e)) throw e; }
    }
    let t = await time;
    // Refused before the membership was confirmed (a member just admitted by the sync above): ask again.
    if (t.error && noAccess(t.error)) { clocks.delete(c); t = { now: await clock(c, true) }; }
    if (t.error) throw t.error;
    return { p, members, organizer, before, club: { id: c, name: cs.data().name }, now: t.now };
  }
  // One's own rows on every text of this club, in one query: the collection
  // group `reads` by the stamp (uid and club) that rows carry once the rules
  // know it. Used only when the programme says so (`readsByUid`, set by
  // scripts/backfill-read-uids.mjs after the rules, the index and the
  // backfill) and the query is accepted. Null otherwise: a listener per text.
  const mineKey = c => `mine:${c}`;
  async function mineRows(c, p) {
    if (p.readsByUid !== true) { unwatch(mineKey(c)); return null; }
    if (mineOff.has(c)) return null;
    try {
      const snap = await watch(mineKey(c), query(collectionGroup(db, 'reads'), where('uid', '==', user().uid), where('club', '==', c)));
      return new Map(snap.docs.filter(d => d.ref.path.startsWith(`dailyDose/${c}/works/`)).map(d => [d.ref.parent.parent.id, d]));
    } catch (e) {
      // Refused (rules older than the client), no index yet, or anything
      // else: this page keeps to the listeners per text.
      console.warn('Own rows in one query unavailable; using one listener per text.', e.code || e);
      unwatch(mineKey(c)); mineOff.add(c);
      return null;
    }
  }
  const NO_ROW = { exists: () => false, data: () => undefined };
  // One's own row on one text. From the one query when it is in use; a text
  // missing there has either no row or a row without the stamp (written
  // before the backfill, or by a page still running older code), so it is
  // asked once by its own listener, which stays only for an unstamped row.
  async function ownRow(c, id, mine) {
    const key = `own:${c}:${id}`;
    if (!mine) return watch(key, ownRef(c, id));
    const n = newer.get(key);
    if (n) { if (n.base === watches.get(mineKey(c))?.snap) return n.snap; newer.delete(key); }
    const row = mine.get(id);
    if (row) { unwatch(key); return row; }
    if (norow.has(key)) return NO_ROW;
    const snap = await watch(key, ownRef(c, id));
    if (!snap.exists()) { unwatch(key); norow.add(key); }
    else if (snap.data().uid) unwatch(key);
    return snap;
  }
  // A row just read from the server replaces what the listeners hold, until
  // they deliver something newer.
  function setOwn(c, id, latest) {
    const key = `own:${c}:${id}`, w = watches.get(key), m = watches.get(mineKey(c));
    if (w) w.snap = latest;
    if (m && !m.error) newer.set(key, { snap: latest, base: m.snap });
  }
  const submittedQuery = (c, id) => query(collection(workRef(c, id), 'reads'), where('submittedAt', '>=', Timestamp.fromMillis(0)));
  const mine = (r, w) => r ? { status: r.status, onTime: r.completedAt != null && millis(r.completedAt) < millis(w.closeAt), completedAt: millis(r.completedAt), comment: r.comment, rating: r.rating ?? null, submittedAt: millis(r.submittedAt), joinedOnDay: r.joinedOnDay } : null;
  // A text's card before one's own row is known: what the works query says.
  function cardOf(w, ctx) {
    const { openAt, closeAt, revealedAt, ...meta } = w;
    return { ...meta, closeAt: millis(closeAt), date: localDate(millis(openAt), ctx.p.timezone) };
  }
  async function project(c, w, ctx) {
    const { closeAt } = w;
    const own = await ownRow(c, w.id, ctx.mine);
    ctx.rows.set(w.id, own);
    const ownData = own.exists() ? own.data() : null;
    const revealed = ownData?.status === 'done' && ownData.submittedAt != null;
    const result = { ...cardOf(w, ctx), mine: mine(ownData, w), revealed, revealReason: revealed ? null : 'submit-your-response' };
    const sharedKey = `shared:${c}:${w.id}`, rxKey = `rx:${c}:${w.id}`;
    if (!revealed) { forget(sharedKey); forget(rxKey); }
    else {
      const live = isLive(c, w, ctx), recent = isRecent(w, ctx);
      const how = key => {
        const h = howToRead(key, live, recent, ctx);
        // The Stars roster: every finished text once; what the page has is enough.
        return h === 'copy' && ctx.all && !once.get(key)?.snap && !watches.get(key)?.snap ? 'wait' : h;
      };
      const rxHow = how(rxKey);
      // What this page already had of the reactions, by listener or by one fetch.
      const rxBefore = watches.get(rxKey)?.snap || once.get(rxKey)?.snap;
      // The responses and the reactions together: both are readable exactly
      // when one's own response is submitted (they were read one after the other).
      const [sharedRead, rxRead] = await Promise.allSettled([read(sharedKey, submittedQuery(c, w.id), how(sharedKey)),
        reactionsOff ? null : read(rxKey, collection(workRef(c, w.id), 'reactions'), rxHow)]);
      again.delete(sharedKey); again.delete(rxKey);
      if (sharedRead.status === 'rejected') {
        const e = sharedRead.reason;
        if (!noAccess(e)) throw e;
        // Another tab may have undone this response. Discard shared snapshots.
        forget(sharedKey); forget(rxKey);
        const latest = await getDocFromServer(ownRef(c, w.id));
        setOwn(c, w.id, latest); ctx.rows.set(w.id, latest);
        result.mine = mine(latest.exists() ? latest.data() : null, w);
        result.revealed = false; result.revealReason = 'submit-your-response';
        return result;
      }
      const rows = sharedRead.value;
      // Today first: an older text off screen that this page has not read.
      // Its card says the club's thoughts are loading.
      if (!rows) { result.later = true; return result; }
      const done = rows.docs.map(d => ({ uid: d.id, ...d.data() })).filter(r => r.status === 'done' && r.submittedAt != null && ctx.members.has(r.uid));
      const onTime = r => millis(r.completedAt) < millis(closeAt);
      // Stable order: newest first submission first. Later edits never reorder the list.
      done.sort((a, b) => millis(b.submittedAt) - millis(a.submittedAt) || a.uid.localeCompare(b.uid));
      const edited = r => millis(r.commentAt) > millis(r.submittedAt);
      let reactions = null;
      if (rxRead.status === 'fulfilled' && rxRead.value) reactions = rxRead.value.docs.map(d => ({ uid: d.id, on: d.data().on || {} }));
      else if (rxRead.status === 'fulfilled' && !reactionsOff && rxHow === 'copy') {
        // Responses in hand but no reactions yet (a race with a background
        // fetch): read them now, so the card never shows thoughts without them.
        reactions = await reactionDocs(c, w.id, 'wait');
      } else if (rxRead.status === 'rejected') {
        if (!noAccess(rxRead.reason)) throw rxRead.reason;
        // Refused while the responses were allowed: a read that never
        // delivered anything means the deployed rules do not know reactions
        // yet; one that worked before lost access in a race: skip it this time.
        forget(rxKey);
        if (!rxBefore) reactionsOff = true;
      }
      result.collective = { ratings: ratingSummary(done), revealedAt: millis(ownData.submittedAt), onTime: done.filter(onTime).length, catchUp: done.filter(r => !onTime(r)).length,
        readers: done.map(r => ({ uid: r.uid, name: ctx.members.get(r.uid).name, completedAt: millis(r.completedAt), onTime: onTime(r), rating: r.rating ?? null })),
        comments: done.filter(r => r.comment)
          .map(r => ({ uid: r.uid, name: ctx.members.get(r.uid).name, text: r.comment, at: millis(r.commentAt), submittedAt: millis(r.submittedAt), edited: edited(r), onTime: onTime(r),
            ...(reactions ? { reactions: tally(reactions, r.uid, ctx.members, user().uid) } : {}) })),
        reactable: !!reactions,
        // Other members' reactions to one's own thought ("uid:key"), for the count on one's name.
        ...(reactions ? { toMe: reactionsTo(reactions, user().uid, ctx.members) } : {}) };
    }
    return result;
  }
  // Everyone's reaction documents for one text, readable exactly when the
  // shared responses are. Null when reactions are unavailable (see reactionsOff).
  async function reactionDocs(c, id, how) {
    if (reactionsOff) return null;
    const key = `rx:${c}:${id}`;
    // What this page already had of them, by listener or by one fetch.
    const before = watches.get(key)?.snap || once.get(key)?.snap;
    try { return (await read(key, collection(workRef(c, id), 'reactions'), how)).docs.map(d => ({ uid: d.id, on: d.data().on || {} })); }
    catch (e) {
      if (!noAccess(e)) throw e;
      // A read that never delivered anything was refused outright: the
      // deployed rules do not know reactions yet. One that worked before lost
      // access (another tab marked the text unread): just skip it this time.
      forget(key);
      if (!before) reactionsOff = true;
      return null;
    }
  }
  // Add or remove one's own reaction to one thought. Only one's own document
  // is written, and only the list for that author (the rules check both).
  async function react(c, id, { author, emoji, on }) {
    if (!isReaction(emoji) || typeof author !== 'string' || !/^[A-Za-z0-9_-]{1,128}$/.test(author) || typeof on !== 'boolean') throw new Error('Unknown reaction.');
    try {
      await setDoc(doc(workRef(c, id), 'reactions', user().uid),
        { on: { [author]: on ? arrayUnion(emoji) : arrayRemove(emoji) }, last: author, updatedAt: serverTimestamp() }, { merge: true });
    } catch (e) {
      if (noAccess(e)) throw new Error('Reactions are not available here yet.');
      throw e;
    }
    // Wait until the open listener carries the write, so the next feed shows
    // it. Without a listener (the text is not live), or with a silent one,
    // the next feed reads the reactions from the server again.
    const key = `rx:${c}:${id}`;
    const has = snap => !!snap.docs.find(d => d.id === user().uid)?.data().on?.[author]?.includes(emoji);
    if (!await settled(key, snap => has(snap) === on)) reread(key);
  }
  // Which reactions to one's own thoughts one has seen, per text: { workId: [pairs] }.
  // One listener on one's own document; null while the rules do not allow it.
  async function seenWorks(c) {
    if (seenOff) return null;
    try { const snap = await watch(`seen:${c}`, seenRef(c)); return snap.exists() ? snap.data().works || {} : {}; }
    catch (e) {
      if (!noAccess(e)) throw e;
      unwatch(`seen:${c}`); seenOff = true;
      return null;
    }
  }
  // One has looked at the reactions to one's thought on one text: store
  // exactly the pairs there now, so a reaction taken back is dropped too.
  async function markSeen(c, { work, pairs } = {}) {
    if (typeof work !== 'string' || !/^[A-Za-z0-9-]{1,40}$/.test(work) || !Array.isArray(pairs) || pairs.length > 600
      || !pairs.every(p => typeof p === 'string' && /^[A-Za-z0-9_-]{1,128}:[a-z]{1,16}$/.test(p))) throw new Error('Unknown reactions.');
    if (seenOff) throw new Error('Not available here yet.');
    try { await setDoc(seenRef(c), { works: { [work]: [...pairs] }, last: work, updatedAt: serverTimestamp() }, { merge: true }); }
    catch (e) {
      if (noAccess(e)) { seenOff = true; unwatch(`seen:${c}`); throw new Error('Not available here yet.'); }
      throw e;
    }
    // Wait until the open listener carries the write, so the next feed shows it.
    const want = JSON.stringify(pairs);
    if (!await settled(`seen:${c}`, snap => JSON.stringify(snap.data()?.works?.[work]) === want)) unwatch(`seen:${c}`);
  }
  // My ranking: { order } (null when never saved), or null while the rules
  // do not allow it. One listener on one's own document.
  async function rankingDoc(c) {
    if (rankingOff) return null;
    try { const snap = await watch(`rank:${c}`, rankingRef(c)); return { order: snap.exists() && Array.isArray(snap.data().order) ? snap.data().order : null }; }
    catch (e) {
      if (!noAccess(e)) throw e;
      unwatch(`rank:${c}`); rankingOff = true;
      return null;
    }
  }
  async function saveRanking(c, { order } = {}) {
    if (!Array.isArray(order) || order.length > MAX_TEXTS || new Set(order).size !== order.length
      || !order.every(id => typeof id === 'string' && /^[A-Za-z0-9-]{1,40}$/.test(id))) throw new Error('Unknown ranking.');
    if (rankingOff) throw new Error('Not available here yet.');
    try { await setDoc(rankingRef(c), { order: [...order], updatedAt: serverTimestamp() }); }
    catch (e) {
      if (noAccess(e)) { rankingOff = true; unwatch(`rank:${c}`); throw new Error('Not available here yet.'); }
      throw e;
    }
    // Wait until the open listener carries the write, so the next feed shows it.
    const want = JSON.stringify(order);
    if (!await settled(`rank:${c}`, snap => JSON.stringify(snap.data()?.order) === want)) unwatch(`rank:${c}`);
  }
  // Desert island: { choices } (null when never saved), or null while the
  // rules do not allow it. One listener on one's own document, for every member.
  async function islandDoc(c) {
    if (islandOff) return null;
    try { const snap = await watch(`island:${c}`, islandRef(c)); return { choices: snap.exists() && Array.isArray(snap.data().choices) ? snap.data().choices : null }; }
    catch (e) {
      if (!noAccess(e)) throw e;
      unwatch(`island:${c}`); islandOff = true;
      return null;
    }
  }
  // The whole history is written each time (an undo removes the newest).
  async function saveIsland(c, { choices } = {}) {
    if (!validChoices(choices)) throw new Error('Unknown choices.');
    if (islandOff) throw new Error('Not available here yet.');
    const list = choices.map(({ w, l, at }) => ({ w, l, at }));
    try { await setDoc(islandRef(c), { choices: list, updatedAt: serverTimestamp() }); }
    catch (e) {
      if (noAccess(e)) { islandOff = true; unwatch(`island:${c}`); throw new Error('Not available here yet.'); }
      throw e;
    }
    // Compared field by field: Firestore may hand the maps' keys back in another order.
    const flat = l => Array.isArray(l) ? l.map(x => `${x?.w}>${x?.l}@${x?.at}`).join(',') : null, want = flat(list);
    if (!await settled(`island:${c}`, snap => flat(snap.data()?.choices) === want)) unwatch(`island:${c}`);
  }
  // `fresh` (Refresh): every finished text's club data is read from the
  // server and waited for. `all` (the Stars roster): every finished text not
  // read yet is read once. `early` (the first draw, Today first in SPEC.md):
  // returns once today's texts and the recent days are complete; the other
  // texts are placeholders (`loading: true`, no `mine`) and `loading` is
  // true. The app then asks again, without `early`, for the complete feed;
  // the listeners and fetches opened by this one serve it.
  async function feed(c, fresh = false, { early = false, all = false } = {}) {
    const ctx = await context(c), p = ctx.p;
    ctx.fresh = fresh; ctx.all = all; ctx.rows = new Map();
    if (fresh) { for (const e of once.values()) e.stale = true; norow.clear(); }
    const base = { club: ctx.club, me: { uid: user().uid, name: user().displayName }, organizer: ctx.organizer, now: ctx.now, edition: p.edition, days: [], personal: { completed: 0, onTime: 0, catchUp: 0 } };
    // One's own documents, asked together (they were asked one after the
    // other) and alongside the released texts below.
    const own = Promise.all([seenWorks(c),
      // My ranking is organiser-only for now (SPEC.md): nobody else even reads it.
      ctx.organizer ? rankingDoc(c) : null,
      // Desert island is for every member, each reading only their own.
      islandDoc(c)]);
    own.catch(() => {});
    const ownDocs = async () => { [base.seen, base.ranking, base.desertIsland] = await own; };
    if (!p.startDate) { await ownDocs(); return { ...base, campaign: null }; }
    const today = localDate(ctx.now, p.timezone), day = dayNumber(p.startDate, today);
    base.campaign = { startDate: p.startDate, timezone: p.timezone, currentDay: day, today, totalDays: programmeDays(p), editable: ctx.now < millis(p.boundaries[0]) };
    // The private podcast (see client/podcast.mjs): members only, released days only.
    const pod = p.podcast;
    if (typeof pod?.feed === 'string') base.podcast = { feed: pod.feed, pattern: typeof pod.pattern === 'string' ? pod.pattern : null,
      episodes: (Array.isArray(pod.episodes) ? pod.episodes : []).filter(e => Number.isInteger(e?.day) && e.day <= Math.min(day, programmeDays(p))) };
    if (day < 1) { await ownDocs(); return base; }
    const cutoff = p.boundaries[Math.min(day, programmeDays(p)) - 1];
    ctx.day = day; ctx.last = Math.min(day, programmeDays(p));
    // The released texts' query changes at midnight: close yesterday's.
    const worksKey = `works:${c}:${millis(cutoff)}`;
    for (const k of [...watches.keys()]) if (k.startsWith(`works:${c}:`) && k !== worksKey) unwatch(k);
    const [snapshot, mineMap] = await Promise.all([watch(worksKey, query(collection(programRef(c), 'works'), where('openAt', '>=', Timestamp.fromMillis(0)), where('openAt', '<=', cutoff))), mineRows(c, p)]);
    ctx.mine = mineMap;
    const docs = snapshot.docs.map(d => d.data());
    let works;
    if (early) {
      // Only the first days are asked for here, so their answers do not
      // share the line with the older rows; the complete feed asked next
      // opens the rest.
      const first = docs.map(w => isRecent(w, ctx));
      const done = await Promise.all(docs.filter((_, i) => first[i]).map(w => project(c, w, ctx)));
      let k = 0;
      works = docs.map((w, i) => first[i] ? done[k++] : { ...cardOf(w, ctx), loading: true });
      if (first.some(f => !f)) base.loading = true;
    } else {
      works = await Promise.all(docs.map(w => project(c, w, ctx)));
      heal(c, docs, ctx.rows).catch(e => console.warn('Completion record not repaired', e));
    }
    await ownDocs();
    for (let n = ctx.last; n >= 1; n--) {
      const entries = works.filter(w => w.day === n).sort((a, b) => ['poem','story','essay'].indexOf(a.category) - ['poem','story','essay'].indexOf(b.category));
      if (entries.length) base.days.push({ number: n, date: entries[0].date, today: n === day, works: entries });
      for (const w of entries) if (w.mine?.status === 'done') { base.personal.completed++; base.personal[w.mine.onTime ? 'onTime' : 'catchUp']++; }
    }
    return base;
  }
  // Rows written before completion records existed (or by an older client)
  // get their record here, from the owner's own checkmarks. Rules only accept
  // values equal to the private row, so this cannot forge anything.
  async function heal(c, works, rows) {
    if (healed.has(c)) return;
    healed.add(c);
    const snap = await getDocFromServer(completionRef(c));
    let exists = snap.exists();
    const record = { ...(exists ? snap.data().works || {} : {}) };
    for (const w of works) {
      const row = rows.get(w.id);
      const data = row?.exists() ? row.data() : null;
      const want = data?.status === 'done' ? data.completedAt : null;
      const have = record[w.id] ?? null;
      if (want ? have?.isEqual?.(want) : have == null) continue;
      if (!data) continue; // the rules verify every change against the private row
      if (!exists) { await setDoc(completionRef(c), { works: { [w.id]: want }, last: w.id }); exists = true; }
      else await updateDoc(completionRef(c), { [`works.${w.id}`]: want ?? deleteField(), last: w.id });
      if (want) record[w.id] = want; else delete record[w.id];
    }
  }
  // Organiser only: the roster and who has checked each released text off, and
  // when. Never ratings, thoughts, drafts or reading progress (see the rules).
  async function organiser(c) {
    const ctx = await context(c), p = ctx.p;
    if (!ctx.organizer) throw new Error('Only the organiser can see club progress.');
    const roster = [...ctx.members].map(([uid, m]) => ({ uid, name: m.name, admitted: p.participantUids.includes(uid),
      justAdmitted: !ctx.before.includes(uid) && p.participantUids.includes(uid), organizer: p.organizerUids.includes(uid) }))
      .sort((a, b) => a.name.localeCompare(b.name));
    const base = { club: ctx.club, roster, campaign: null, days: [], checks: {} };
    if (!p.startDate) return base;
    const today = localDate(ctx.now, p.timezone), day = dayNumber(p.startDate, today);
    base.campaign = { startDate: p.startDate, timezone: p.timezone, currentDay: day, today, totalDays: programmeDays(p), editable: ctx.now < millis(p.boundaries[0]) };
    if (day < 1) return base;
    const cutoff = p.boundaries[Math.min(day, programmeDays(p)) - 1];
    const [works, records] = await Promise.all([
      getDocsFromServer(query(collection(programRef(c), 'works'), where('openAt', '>=', Timestamp.fromMillis(0)), where('openAt', '<=', cutoff))),
      getDocsFromServer(collection(programRef(c), 'completions'))]);
    const byId = new Map(works.docs.map(d => [d.id, d.data()]));
    for (let n = Math.min(programmeDays(p), day); n >= 1; n--) {
      const entries = [...byId.values()].filter(w => w.day === n).sort((a, b) => ['poem','story','essay'].indexOf(a.category) - ['poem','story','essay'].indexOf(b.category));
      if (entries.length) base.days.push({ number: n, date: localDate(millis(entries[0].openAt), p.timezone), today: n === day,
        works: entries.map(w => ({ id: w.id, title: w.title, author: w.author, category: w.category })) });
    }
    for (const r of records.docs) {
      if (!ctx.members.has(r.id)) continue;
      const checks = base.checks[r.id] = {};
      for (const [id, at] of Object.entries(r.data().works || {})) {
        const w = byId.get(id);
        if (w && at) checks[id] = { at: millis(at), onTime: millis(at) < millis(w.closeAt) };
      }
    }
    return base;
  }
  async function schedule(c, { startDate, timezone }) {
    const ctx = await context(c);
    if (!ctx.organizer) throw new Error('Only the organiser can set Day 1.');
    const boundaries = scheduleDates(startDate, timezone, ctx.now).map(Timestamp.fromMillis);
    const batch = writeBatch(db);
    batch.update(programRef(c), { startDate, timezone, boundaries, updatedAt: serverTimestamp() });
    for (const [i, day] of ctx.p.dayWorkIds.entries()) for (const id of day.ids) batch.update(workRef(c, id), { openAt: boundaries[i], closeAt: boundaries[i + 1] });
    await batch.commit();
    const latest = await getDocFromServer(programRef(c));
    if (watches.has(`p:${c}`)) watches.get(`p:${c}`).snap = latest;
  }
  async function act(c, id, payload, retry = true) {
    if (!['start','complete','restore','unread','comment','rate','submit'].includes(payload.action)) throw new Error('Unknown reading action.');
    if (Object.keys(payload).some(k => !['action','comment','rating','base','at'].includes(k)) || ('rating' in payload && payload.action !== 'rate')
      || (('base' in payload || 'at' in payload) && payload.action !== 'comment')) throw new Error('Unexpected reading fields.');
    const comment = ['comment','submit'].includes(payload.action) ? validateComment(payload.comment) : null;
    const rating = payload.action === 'rate' ? validateRating(payload.rating) : null;
    const now = await clock(c) + 1000;
    // With one's own rows in one query, every write carries the stamp the
    // query finds rows by. (No programme listener yet: no stamp, and the row
    // is found by its own listener, as before.)
    const program = watches.get(`p:${c}`)?.snap?.data();
    const stamp = !!(program && await mineRows(c, program));
    // What the committed attempt saw and wrote (a transaction may run twice).
    let seen = null, wrote = false, wasShared = false, isShared = false;
    // A draft from the outbox (SPEC.md, "Outbox for saves"): another device of
    // one's own may have saved a different thought meanwhile; the newer typing wins.
    let conflict = null, theirs = null;
    const draft = payload.action === 'comment' && typeof payload.base === 'string' ? { comment, base: payload.base, at: Number(payload.at) } : null;
    try {
      await runTransaction(db, async tx => {
        const [ws, rs, cs] = await Promise.all([tx.get(workRef(c, id)), tx.get(ownRef(c, id)), tx.get(completionRef(c))]);
        const w = ws.data(), row = rs.exists() ? rs.data() : null;
        seen = row?.updatedAt ?? null; wrote = false; conflict = null; theirs = null;
        wasShared = row?.status === 'done' && row.submittedAt != null;
        let next;
        if (payload.action === 'start' || (payload.action === 'complete' && (!row || row.status === 'withdrawn'))) {
          if (payload.action === 'start' && row && row.status !== 'withdrawn') return;
          next = { status: payload.action === 'start' ? 'reading' : 'done', startedAt: serverTimestamp(), completedAt: payload.action === 'complete' ? serverTimestamp() : null,
            joinedOnDay: now < millis(w.closeAt), comment: '', commentAt: null, submittedAt: null };
        } else if (payload.action === 'complete') {
          if (row?.status === 'done') return;
          next = { ...row, status: 'done', completedAt: serverTimestamp(), undoCompletedAt: null };
        } else if (payload.action === 'restore') {
          // Undo of "Mark as unread": the original checkmark time comes back, so
          // "on the day" stays on the day. Rules allow it for five minutes.
          if (row?.status === 'done') return;
          if (!row?.undoCompletedAt) throw new Error('This checkmark can no longer be restored. Check the text off again.');
          next = { ...row, status: 'done', completedAt: row.undoCompletedAt, undoCompletedAt: null };
        } else if (payload.action === 'unread') {
          if (row?.status !== 'done') return;
          next = { ...row, status: 'reading', completedAt: null, submittedAt: null, undoCompletedAt: row.completedAt };
        } else if (payload.action === 'rate') {
          if (row?.status !== 'done') throw new Error('Check off the reading before rating it.');
          next = { ...row, rating };
        } else if (payload.action === 'submit') {
          if (row?.status !== 'done') throw new Error('Check off the reading before finishing.');
          if (row.rating == null || !comment) throw new Error('Choose 0–5 stars and write a short thought before revealing responses.');
          next = { ...row, comment, commentAt: comment === row.comment ? row.commentAt : serverTimestamp(), submittedAt: row.submittedAt || serverTimestamp() };
        } else {
          if (row?.status !== 'done') throw new Error('Check off the reading before posting a comment.');
          conflict = draft && draftConflict({ comment: row.comment ?? '', commentAt: millis(row.commentAt) }, draft);
          if (conflict) theirs = row.comment ?? '';
          // The other device's thought is newer: it stays, nothing is written.
          if (conflict === 'theirs') return;
          next = { ...row, comment, commentAt: serverTimestamp() };
        }
        if (next.rating == null || !next.comment.trim()) next.submittedAt = null;
        next.updatedAt = serverTimestamp();
        if (stamp) { next.uid = user().uid; next.club = c; }
        tx.set(ownRef(c, id), next);
        wrote = true; isShared = next.status === 'done' && next.submittedAt != null;
        // Written together with the checkmark and cleared by Mark as unread.
        const wasDone = row?.status === 'done', isDone = next.status === 'done';
        if (wasDone !== isDone || (isDone && next.completedAt !== row.completedAt)) {
          const record = { ...(cs.exists() ? cs.data().works || {} : {}) };
          if (next.status === 'done') record[id] = next.completedAt; else delete record[id];
          tx.set(completionRef(c), { works: record, last: id });
        }
      });
    } catch (e) {
      if (retry && noAccess(e)) { await clock(c, true); return act(c, id, payload, false); }
      throw e;
    }
    const result = conflict ? { conflict, theirs } : undefined;
    if (!wrote) return result;
    // A completed write can resolve before the listeners deliver its snapshot,
    // and the next feed() reads the listeners. So wait here until they carry
    // this write (its updatedAt replaces the one the transaction read): the
    // listener is already open, so this costs no extra round trip. Only if it
    // stays silent is the row read from the server, as before.
    const fresh = d => d?.exists() && !(seen && d.data().updatedAt?.isEqual?.(seen));
    const ownKey = `own:${c}:${id}`, sharedKey = `shared:${c}:${id}`, rxKey = `rx:${c}:${id}`;
    if (!isShared) forget(rxKey);
    // Just shared (Finish & reveal): the next feed reads the others, live or not.
    if (!wasShared && isShared) { reread(sharedKey); reread(rxKey); }
    const shared = !isShared ? forget(sharedKey) : !wasShared ? null
      // Still shared (a rating or Save changes): the open query updates
      // itself; a text that is not live is read again by the next feed.
      : settled(sharedKey, q => fresh(q.docs.find(d => d.id === user().uid))).then(ok => { if (!ok) reread(sharedKey); });
    norow.delete(ownKey);
    // The stamped row arrives in the one query; an unstamped one by its own listener.
    const carried = stamp ? settled(mineKey(c), q => fresh(q.docs.find(d => d.ref.path === ownRef(c, id).path))) : settled(ownKey, fresh);
    const own = carried.then(async ok => {
      if (ok) { newer.delete(ownKey); return; }
      if (!stamp && !watches.has(ownKey)) return;
      setOwn(c, id, await getDocFromServer(ownRef(c, id)));
    });
    await Promise.all([shared, own]);
    return result;
  }
  return {
    pause, resume, attend,
    // The app's function to call when a background fetch brought newer data.
    onChange(fn) { changed = typeof fn === 'function' ? fn : () => {}; },
    // For tests and measurements: the open listeners and the one-time copies, by key.
    stats() { return { listeners: [...watches].filter(([, e]) => e.stop).map(([k]) => k).sort(), fetched: [...once.keys()].sort(), ownQuery: [...watches.keys()].filter(k => k.startsWith('mine:')).map(k => k.slice(5)) }; },
    reset() { for (const w of watches.values()) w.stop?.(); watches.clear(); clocks.clear(); healed.clear(); texts.clear(); reactionsOff = false; seenOff = false; rankingOff = false; islandOff = false;
      attended.clear(); once.clear(); again.clear(); mineOff.clear(); norow.clear(); newer.clear(); dirty = false; },
    async request(url, options = {}) {
      if (!user()) throw new Error('Please sign in with your Bookrank account.');
      if (url === '/clubs') {
        const snapshot = await getDocsFromServer(query(collection(db, 'clubs'), where('member_uids', 'array-contains', user().uid)));
        const clubs = [];
        for (const c of snapshot.docs) {
          try { const p = await getDocFromServer(programRef(c.id)); if (p.exists()) clubs.push({ id: c.id, name: c.data().name }); }
          catch (e) { if (!noAccess(e)) throw e; }
        }
        return { clubs };
      }
      const parts = url.split('/').filter(Boolean), c = parts[1], id = parts[3];
      if (parts[0] !== 'clubs') throw new Error('Unknown request.');
      if (parts[2] === 'feed') return feed(c, options.fresh === true, { early: options.early === true, all: options.all === true });
      if (parts[2] === 'organiser') return organiser(c);
      if (parts[2] === 'schedule' && options.method === 'PUT') return schedule(c, options.body);
      if (parts[2] === 'seen' && options.method === 'POST') return markSeen(c, options.body);
      if (parts[2] === 'ranking' && options.method === 'POST') return saveRanking(c, options.body);
      if (parts[2] === 'desert-island' && options.method === 'POST') return saveIsland(c, options.body);
      if (parts[2] === 'works' && parts[4] === 'reactions' && options.method === 'POST') return react(c, id, options.body);
      if (parts[2] === 'works' && options.method === 'POST') return act(c, id, options.body);
      // A text does not change while it is being read: fetch it once per page.
      if (parts[2] === 'works') {
        const key = `${c}:${id}`;
        if (!texts.has(key)) texts.set(key, getDocFromServer(doc(programRef(c), 'texts', id)).then(t => t.data().json).catch(e => { texts.delete(key); throw e; }));
        return JSON.parse(await texts.get(key));
      }
      throw new Error('Unknown request.');
    },
  };
}
