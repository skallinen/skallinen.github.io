import { getFirestore, doc, collection, query, where, onSnapshot, getDocFromServer, getDocsFromServer, setDoc, updateDoc, writeBatch, runTransaction, serverTimestamp, Timestamp, arrayUnion, arrayRemove } from 'firebase/firestore';
import { scheduleDates, localDate } from './calendar.mjs';
import { dayNumber, validateComment, validateRating, ratingSummary } from '../server/domain.mjs';

const millis = t => t?.toMillis?.() ?? null;
const noAccess = e => e.code === 'permission-denied';

// Live data is protected by Firestore rules, not by UI filtering. Gate documents
// cannot be read even by the organiser; clients update only their own entry.
export function createFirestoreBackend(app, user, db = getFirestore(app)) {
  const watches = new Map(), clocks = new Map(), attempts = new Map();
  function watch(key, ref) {
    if (!watches.has(key)) {
      const e = {};
      e.ready = new Promise((resolve, reject) => {
        e.stop = onSnapshot(ref, { includeMetadataChanges: true }, snap => {
          if (snap.metadata.fromCache || snap.metadata.hasPendingWrites) return;
          e.snap = snap; resolve();
        }, error => { e.error = error; reject(error); });
      });
      watches.set(key, e);
    }
    const e = watches.get(key);
    return e.ready.then(() => { if (e.error) throw e.error; return e.snap; });
  }
  const programRef = c => doc(db, 'dailyDose', c);
  const workRef = (c, w) => doc(programRef(c), 'works', w);
  const ownRef = (c, w) => doc(workRef(c, w), 'reads', user().uid);
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
    const [ps, ms, cs] = await Promise.all([watch(`p:${c}`, programRef(c)), watch(`m:${c}`, collection(db, 'clubs', c, 'members')), watch(`c:${c}`, doc(db, 'clubs', c))]);
    if (!ps.exists() || !ms.docs.some(d => d.id === user().uid)) throw new Error('Your book-club membership could not be confirmed.');
    const p = ps.data(), members = new Map(ms.docs.map(d => [d.id, { name: d.data().display_name || 'Book club member' }]));
    const organizer = p.organizerUids.includes(user().uid);
    const ids = [...members.keys()].sort();
    // Only the trusted organiser synchronises admission / departures from Bookrank.
    if (organizer && JSON.stringify(ids) !== JSON.stringify([...p.participantUids].sort())) {
      await updateDoc(programRef(c), { participantUids: ids }); p.participantUids = ids;
    }
    return { p, members, organizer, club: { id: c, name: cs.data().name }, now: await clock(c) };
  }
  async function reveal(c, w, now) {
    if (w.revealedAt || now < millis(w.closeAt)) return w;
    const key = `${c}:${w.id}`;
    if (now - (attempts.get(key) || 0) < 29000) return w;
    attempts.set(key, now);
    try {
      await updateDoc(workRef(c, w.id), { revealedAt: serverTimestamp() });
      return (await getDocFromServer(workRef(c, w.id))).data();
    } catch (e) { if (!noAccess(e)) throw e; return w; }
  }
  const mine = (r, w) => r ? { status: r.status, onTime: r.completedAt != null && millis(r.completedAt) < millis(w.closeAt), completedAt: millis(r.completedAt), comment: r.comment, rating: r.rating ?? null, joinedOnDay: r.joinedOnDay } : null;
  async function project(c, input, ctx) {
    const w = await reveal(c, input, ctx.now);
    const { openAt, closeAt, revealedAt, ...meta } = w;
    const result = { ...meta, date: localDate(millis(openAt), ctx.p.timezone), revealed: Boolean(revealedAt), revealReason: revealedAt ? null : ctx.now < millis(closeAt) ? 'day-open' : 'readers-finishing' };
    if (!revealedAt) {
      const own = await watch(`own:${c}:${w.id}`, ownRef(c, w.id));
      result.mine = mine(own.exists() ? own.data() : null, w);
    } else {
      const rows = await watch(`shared:${c}:${w.id}`, collection(workRef(c, w.id), 'reads'));
      result.mine = mine(rows.docs.find(d => d.id === user().uid)?.data(), w);
      const done = rows.docs.map(d => ({ uid: d.id, ...d.data() })).filter(r => r.status === 'done' && ctx.members.has(r.uid));
      const onTime = r => millis(r.completedAt) < millis(closeAt);
      result.collective = { ratings: ratingSummary(done), revealedAt: millis(revealedAt), onTime: done.filter(onTime).length, catchUp: done.filter(r => !onTime(r)).length,
        readers: done.map(r => ({ uid: r.uid, name: ctx.members.get(r.uid).name, completedAt: millis(r.completedAt), onTime: onTime(r), rating: r.rating ?? null })),
        comments: done.filter(r => r.comment).sort((a, b) => millis(b.commentAt) - millis(a.commentAt) || a.uid.localeCompare(b.uid))
          .map(r => ({ uid: r.uid, name: ctx.members.get(r.uid).name, text: r.comment, at: millis(r.commentAt), onTime: onTime(r) })) };
    }
    return result;
  }
  async function feed(c) {
    const ctx = await context(c), p = ctx.p;
    const base = { club: ctx.club, me: { uid: user().uid, name: user().displayName }, organizer: ctx.organizer, now: ctx.now, edition: p.edition, days: [], personal: { completed: 0, onTime: 0, catchUp: 0 } };
    if (!p.startDate) return { ...base, campaign: null };
    const today = localDate(ctx.now, p.timezone), day = dayNumber(p.startDate, today);
    base.campaign = { startDate: p.startDate, timezone: p.timezone, currentDay: day, today, totalDays: 50, editable: ctx.now < millis(p.boundaries[0]) };
    if (day < 1) return base;
    const cutoff = p.boundaries[Math.min(day, 50) - 1];
    const snapshot = await watch(`works:${c}:${millis(cutoff)}`, query(collection(programRef(c), 'works'), where('openAt', '>=', Timestamp.fromMillis(0)), where('openAt', '<=', cutoff)));
    const works = await Promise.all(snapshot.docs.map(d => project(c, d.data(), ctx)));
    for (let n = Math.min(50, day); n >= 1; n--) {
      const entries = works.filter(w => w.day === n).sort((a, b) => ['poem','story','essay'].indexOf(a.category) - ['poem','story','essay'].indexOf(b.category));
      if (entries.length) base.days.push({ number: n, date: entries[0].date, today: n === day, works: entries });
      for (const w of entries) if (w.mine?.status === 'done') { base.personal.completed++; base.personal[w.mine.onTime ? 'onTime' : 'catchUp']++; }
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
    if (!['start','complete','withdraw','comment','rate'].includes(payload.action)) throw new Error('Unknown reading action.');
    if (Object.keys(payload).some(k => !['action','comment','rating'].includes(k)) || ('rating' in payload && payload.action !== 'rate')) throw new Error('Unexpected reading fields.');
    const comment = payload.action === 'comment' ? validateComment(payload.comment) : null;
    const rating = payload.action === 'rate' ? validateRating(payload.rating) : null;
    const now = await clock(c) + 1000;
    try {
      await runTransaction(db, async tx => {
        const [ws, rs] = await Promise.all([tx.get(workRef(c, id)), tx.get(ownRef(c, id))]);
        const w = ws.data(), row = rs.exists() ? rs.data() : null;
        let next;
        if (payload.action === 'start' || (payload.action === 'complete' && (!row || row.status === 'withdrawn'))) {
          if (payload.action === 'start' && row && row.status !== 'withdrawn') return;
          next = { status: payload.action === 'start' ? 'reading' : 'done', startedAt: serverTimestamp(), completedAt: payload.action === 'complete' ? serverTimestamp() : null,
            joinedOnDay: now < millis(w.closeAt), comment: '', commentAt: null };
        } else if (payload.action === 'complete') {
          if (row?.status === 'done') return;
          next = { ...row, status: 'done', completedAt: serverTimestamp() };
        } else if (payload.action === 'withdraw') {
          if (row?.status === 'done') throw new Error('A recorded read cannot be undone.');
          if (!row || row.status === 'withdrawn') return;
          next = { ...row, status: 'withdrawn' };
        } else if (payload.action === 'rate') {
          if (row?.status !== 'done') throw new Error('Check off the reading before rating it.');
          next = { ...row, rating };
        } else {
          if (row?.status !== 'done') throw new Error('Check off the reading before posting a comment.');
          next = { ...row, comment, commentAt: serverTimestamp() };
        }
        next.updatedAt = serverTimestamp(); tx.set(ownRef(c, id), next);
        tx.update(doc(programRef(c), 'gates', id), { pending: next.status === 'reading' && next.joinedOnDay ? arrayUnion(user().uid) : arrayRemove(user().uid), actor: user().uid, updatedAt: serverTimestamp() });
      });
    } catch (e) {
      if (retry && noAccess(e)) { await clock(c, true); return act(c, id, payload, false); }
      throw e;
    }
    attempts.delete(`${c}:${id}`);
    // A completed write can resolve before an existing listener delivers its
    // snapshot. Read our committed row so the immediate UI refresh is current.
    const own = await getDocFromServer(ownRef(c, id));
    if (watches.has(`own:${c}:${id}`)) watches.get(`own:${c}:${id}`).snap = own;
    if (watches.has(`shared:${c}:${id}`)) watches.get(`shared:${c}:${id}`).snap = await getDocsFromServer(collection(workRef(c, id), 'reads'));
  }
  return {
    reset() { for (const w of watches.values()) w.stop(); watches.clear(); clocks.clear(); attempts.clear(); },
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
      if (parts[2] === 'feed') return feed(c);
      if (parts[2] === 'schedule' && options.method === 'PUT') return schedule(c, options.body);
      if (parts[2] === 'works' && options.method === 'POST') return act(c, id, options.body);
      if (parts[2] === 'works') return JSON.parse((await getDocFromServer(doc(programRef(c), 'texts', id))).data().json);
      throw new Error('Unknown request.');
    },
  };
}
