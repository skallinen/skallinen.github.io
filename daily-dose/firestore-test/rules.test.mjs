import { test, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { doc, collection, getDoc, getDocs, setDoc, updateDoc, deleteDoc, writeBatch, serverTimestamp, arrayUnion, arrayRemove, Timestamp, query, where } from 'firebase/firestore';
import { scheduleDates } from '../client/calendar.mjs';
import { createFirestoreBackend } from '../client/firestore.mjs';

const projectId = 'demo-daily-dose';
let env;
const base = 'dailyDose/club';
const fullRules = `rules_version = '2'; service cloud.firestore { match /databases/{database}/documents {
  match /clubs/{club} { allow read: if request.auth != null; match /members/{uid} { allow read: if request.auth != null; } }
  ${readFileSync(new URL('../firestore/daily-dose.rules', import.meta.url), 'utf8')}
}}`;
before(async () => { env = await initializeTestEnvironment({ projectId, firestore: { host: '127.0.0.1', port: 8189, rules: fullRules } }); });
after(async () => { await env?.cleanup(); });
const db = uid => uid ? env.authenticatedContext(uid).firestore() : env.unauthenticatedContext().firestore();
const rowRef = (d, w, u) => doc(d, `${base}/works/${w}/reads/${u}`);
const workRef = (d, w) => doc(d, `${base}/works/${w}`);
const gateRef = (d, w) => doc(d, `${base}/gates/${w}`);
beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async ctx => {
    const d = ctx.firestore(), now = Date.now();
    await setDoc(doc(d, 'clubs/club'), { name: 'Test club', member_uids: ['alice','bob','cara'] });
    for (const u of ['alice','bob','cara']) await setDoc(doc(d, `clubs/club/members/${u}`), { display_name: u });
    await setDoc(doc(d, base), { organizerUids: ['alice'], participantUids: ['alice','bob','cara'], startDate: '2026-01-01', timezone: 'Europe/Helsinki', boundaries: [Timestamp.fromMillis(now - 86400000)], dayWorkIds: [{ ids: ['today','past','future'] }] });
    for (const [id, open, close] of [['today', now - 3600000, now + 3600000], ['past', now - 86400000, now - 3600000], ['future', now + 86400000, now + 172800000]]) {
      await setDoc(workRef(d, id), { id, day: 1, openAt: Timestamp.fromMillis(open), closeAt: Timestamp.fromMillis(close), revealedAt: null });
      await setDoc(gateRef(d, id), { pending: [], actor: null, updatedAt: null });
      await setDoc(doc(d, `${base}/texts/${id}`), { json: '{"title":"PRIVATE MANUSCRIPT"}' });
    }
  });
});
async function action(uid, work, status, joined = true) {
  const d = db(uid), ref = rowRef(d, work, uid), old = await getDoc(ref);
  let row = old.exists() ? { ...old.data(), status } : { status, startedAt: serverTimestamp(), completedAt: null, joinedOnDay: joined, comment: '', commentAt: null };
  if (status === 'done') row.completedAt = serverTimestamp();
  row.updatedAt = serverTimestamp();
  return setDoc(ref, row);
}
test('unauthenticated and nonmember access denied; future metadata and text stay private', async () => {
  for (const uid of [null, 'outsider']) {
    await assertFails(getDoc(doc(db(uid), base)));
    await assertFails(getDoc(doc(db(uid), `${base}/texts/today`)));
  }
  await assertSucceeds(getDoc(doc(db('alice'), `${base}/texts/today`)));
  await assertFails(getDoc(workRef(db('alice'), 'future')));
  await assertFails(getDoc(doc(db('alice'), `${base}/texts/future`)));
  await assertSucceeds(getDocs(query(collection(db('alice'), `${base}/works`), where('openAt', '>=', Timestamp.fromMillis(0)), where('openAt', '<=', Timestamp.fromMillis(Date.now() - 1000)))));
  await assertFails(getDocs(collection(db('alice'), `${base}/works`)));
});

const shared = (uid, w='today') => getDocs(query(collection(db(uid),base+'/works/'+w+'/reads'),where('submittedAt','>=',Timestamp.fromMillis(0))));
async function submit(uid, work='today', comment=uid+' finished', rating=4) {
  await action(uid,work,'done',work!=='past');
  return updateDoc(rowRef(db(uid),work,uid),{comment,rating,commentAt:serverTimestamp(),submittedAt:serverTimestamp(),updatedAt:serverTimestamp()});
}
test('retired gates are inaccessible; starting a text needs no shared gate update', async () => {
  for (const uid of ['alice','bob']) {
    await assertFails(getDoc(gateRef(db(uid),'today')));
    await assertFails(updateDoc(gateRef(db(uid),'today'),{pending:[]}));
  }
  await assertSucceeds(action('bob','today','reading'));
  await assertFails(getDoc(rowRef(db('alice'),'today','bob')));
});

test('submission immediately unlocks only submitted peers; checkmarks and complete drafts do not unlock', async () => {
  await submit('bob');
  await action('cara','today','reading');
  await assertFails(shared('alice'));
  await assertFails(getDoc(rowRef(db('alice'),'today','bob')));
  await action('alice','today','done');
  const ref=rowRef(db('alice'),'today','alice');
  await updateDoc(ref,{rating:0,comment:'Private complete draft',commentAt:serverTimestamp(),updatedAt:serverTimestamp()});
  await assertFails(shared('alice'));
  await assertFails(getDoc(rowRef(db('bob'),'today','alice')));
  await updateDoc(ref,{submittedAt:serverTimestamp(),updatedAt:serverTimestamp()});
  assert.deepEqual((await shared('alice')).docs.map(d=>d.id).sort(),['alice','bob']);
  assert.equal((await getDoc(rowRef(db('alice'),'today','bob'))).data().comment,'bob finished');
  await assertFails(getDoc(rowRef(db('alice'),'today','cara')));
  await assertFails(getDocs(collection(db('alice'),base+'/works/today/reads')));
  await assertFails(shared('cara'));
  await assertFails(shared('alice','past'));
  await assertFails(updateDoc(workRef(db('alice'),'today'),{revealedAt:serverTimestamp()}));
});

// Round 2, privacy check: one member shares a response, another then writes a
// private draft on the same text. The sharer (and the organiser) must not be
// able to read that draft by get, by the reveal query or by any other query.
test('a member who has shared cannot read a later member draft by get or by any query', async () => {
  await submit('alice', 'today', "I read this at my mother's funeral. Still true: better to forget and smile.");
  await action('bob', 'today', 'done');
  const ref = rowRef(db('bob'), 'today', 'bob');
  await updateDoc(ref, { rating: 5, comment: "I read this at my mother's funeral. Still true.", commentAt: serverTimestamp(), updatedAt: serverTimestamp() });
  const reads = d => collection(d, `${base}/works/today/reads`);
  for (const reader of ['alice', 'cara']) {
    await assertFails(getDoc(rowRef(db(reader), 'today', 'bob')));
    await assertFails(getDocs(reads(db(reader))));
    await assertFails(getDocs(query(reads(db(reader)), where('status', '==', 'done'))));
    await assertFails(getDocs(query(reads(db(reader)), where('comment', '>=', ''))));
    await assertFails(getDocs(query(reads(db(reader)), where('submittedAt', '==', null))));
  }
  // The sharer's reveal query returns only submitted rows: her own.
  assert.deepEqual((await shared('alice')).docs.map(d => d.id), ['alice']);
  // Bob's own row is readable to him; Alice's shared row is not, until he finishes.
  await assertSucceeds(getDoc(ref));
  await assertFails(getDoc(rowRef(db('bob'), 'today', 'alice')));
});

test('old revealed flags and midnight grant no access; catch-up submission works independently', async () => {
  await env.withSecurityRulesDisabled(ctx=>updateDoc(workRef(ctx.firestore(),'past'),{revealedAt:Timestamp.now()}));
  await assertFails(shared('alice','past'));
  await assertSucceeds(submit('alice','past'));
  assert.equal((await shared('alice','past')).size,1);
  await assertFails(shared('bob','past'));
  await assertFails(action('bob','past','done',true));
  await assertFails(action('bob','future','done',false));
});

test('submission requires valid stars and a nonblank Unicode comment; timestamps and other owners protected', async () => {
  await action('bob','today','done');
  const ref=rowRef(db('bob'),'today','bob');
  const changes={submittedAt:serverTimestamp(),updatedAt:serverTimestamp()};
  await assertFails(updateDoc(ref,changes));
  await updateDoc(ref,{rating:0,updatedAt:serverTimestamp()});
  await assertFails(updateDoc(ref,changes));
  for(const comment of ['','   ','\n\t','🙂'.repeat(141)]) {
    await assertFails(updateDoc(ref,{...changes,comment,commentAt:serverTimestamp()}));
  }
  await assertSucceeds(updateDoc(ref,{...changes,comment:'🙂'.repeat(140),commentAt:serverTimestamp()}));
  await assertFails(updateDoc(ref,{submittedAt:Timestamp.fromMillis(100),updatedAt:serverTimestamp()}));
  await assertFails(updateDoc(ref,{completedAt:Timestamp.fromMillis(100),updatedAt:serverTimestamp()}));
  await assertFails(updateDoc(ref,{uid:'alice',updatedAt:serverTimestamp()}));
  await assertFails(updateDoc(rowRef(db('alice'),'today','bob'),{rating:5,updatedAt:serverTimestamp()}));
  await assertFails(updateDoc(doc(db('alice'),base+'/texts/today'),{json:'altered'}));
});

test('unread revokes access and peer visibility, preserves drafts, and recheck cannot backdate', async () => {
  await submit('alice'); await submit('bob');
  const ref=rowRef(db('bob'),'today','bob'),before=(await getDoc(ref)).data();
  await assertSucceeds(updateDoc(ref,{status:'reading',completedAt:null,submittedAt:null,updatedAt:serverTimestamp()}));
  await assertFails(shared('bob'));
  assert.deepEqual((await shared('alice')).docs.map(d=>d.id),['alice']);
  const unread=(await getDoc(ref)).data();
  assert.equal(unread.comment,before.comment); assert.equal(unread.rating,before.rating);
  await assertFails(updateDoc(ref,{status:'done',completedAt:before.completedAt,updatedAt:serverTimestamp()}));
  await action('bob','today','done');
  await assertFails(shared('bob'));
  await updateDoc(ref,{submittedAt:serverTimestamp(),updatedAt:serverTimestamp()});
  assert.equal((await shared('bob')).size,2);
  await assertFails(action('bob','today','withdrawn'));
});

test('Undo of Mark as unread restores the original checkmark time, only its own and only for five minutes', async () => {
  await action('bob', 'today', 'done');
  const ref = rowRef(db('bob'), 'today', 'bob');
  const original = (await getDoc(ref)).data().completedAt;
  const unread = { status: 'reading', completedAt: null, submittedAt: null, updatedAt: serverTimestamp() };
  // Unread may set aside only the checkmark it clears.
  await assertFails(updateDoc(ref, { ...unread, undoCompletedAt: Timestamp.fromMillis(original.toMillis() - 86400000) }));
  await assertSucceeds(updateDoc(ref, { ...unread, undoCompletedAt: original }));
  // Restore: exactly that time, nothing else.
  const restore = at => ({ status: 'done', completedAt: at, undoCompletedAt: null, updatedAt: serverTimestamp() });
  await assertFails(updateDoc(ref, restore(Timestamp.fromMillis(original.toMillis() - 60000))));
  await assertFails(updateDoc(ref, { ...restore(original), undoCompletedAt: original }));
  await assertSucceeds(updateDoc(ref, restore(original)));
  assert.ok((await getDoc(ref)).data().completedAt.isEqual(original));
  // After five minutes Undo is gone: only a fresh checkmark.
  await assertSucceeds(updateDoc(ref, { ...unread, undoCompletedAt: original }));
  await env.withSecurityRulesDisabled(ctx => updateDoc(rowRef(ctx.firestore(), 'today', 'bob'), { updatedAt: Timestamp.fromMillis(Date.now() - 6 * 60000) }));
  await assertFails(updateDoc(ref, restore(original)));
  await assertSucceeds(updateDoc(ref, { status: 'done', completedAt: serverTimestamp(), undoCompletedAt: null, updatedAt: serverTimestamp() }));
  // A new row cannot bring its own time to restore.
  await assertFails(setDoc(rowRef(db('cara'), 'today', 'cara'), { status: 'reading', startedAt: serverTimestamp(), completedAt: null, joinedOnDay: true,
    comment: '', commentAt: null, undoCompletedAt: Timestamp.fromMillis(Date.now() - 86400000), updatedAt: serverTimestamp() }));
});

test('organiser-only atomic calendar setup; 151-write schedule batch fits rule access limits', async () => {
  await env.withSecurityRulesDisabled(async ctx => {
    const d = ctx.firestore();
    await updateDoc(doc(d, base), { startDate: null, boundaries: [] });
    for (let i = 0; i < 150; i++) await setDoc(workRef(d, `w${i}`), { day: Math.floor(i / 3) + 1, openAt: null, closeAt: null, revealedAt: null });
  });
  const start = '2027-01-01', boundaries = scheduleDates(start, 'Europe/Helsinki').map(Timestamp.fromMillis);
  const values = { startDate: start, timezone: 'Europe/Helsinki', boundaries, updatedAt: serverTimestamp() };
  await assertFails(updateDoc(doc(db('bob'), base), values));
  const d = db('alice'), b = writeBatch(d);
  b.update(doc(d, base), values);
  for (let i = 0; i < 150; i++) b.update(workRef(d, `w${i}`), { openAt: boundaries[Math.floor(i / 3)], closeAt: boundaries[Math.floor(i / 3) + 1] });
  await assertSucceeds(b.commit());
  await assertFails(updateDoc(workRef(db('bob'), 'w0'), { openAt: Timestamp.fromMillis(0) }));
});
test('calendar follows local midnight through both Helsinki DST transitions', () => {
  const spring = scheduleDates('2026-03-28', 'Europe/Helsinki', Date.parse('2026-03-01'));
  const autumn = scheduleDates('2026-10-24', 'Europe/Helsinki', Date.parse('2026-03-01'));
  assert.equal(spring[2] - spring[1], 23 * 3600000);
  assert.equal(autumn[2] - autumn[1], 25 * 3600000);
});


test('ratings allow only 0–5 integers or a private cleared draft; reading/comment times remain unchanged', async () => {
  await action('bob','today','reading');
  await assertFails(updateDoc(rowRef(db('bob'),'today','bob'),{rating:5,updatedAt:serverTimestamp()}));
  await action('bob','today','done');
  const ref=rowRef(db('bob'),'today','bob'),before=(await getDoc(ref)).data();
  for(const rating of [0,5,null]) await assertSucceeds(updateDoc(ref,{rating,updatedAt:serverTimestamp()}));
  for(const rating of [-1,6,2.5,'5',false]) await assertFails(updateDoc(ref,{rating,updatedAt:serverTimestamp()}));
  await updateDoc(ref,{rating:0,comment:'Zero is valid',commentAt:serverTimestamp(),submittedAt:serverTimestamp(),updatedAt:serverTimestamp()});
  assert.ok((await getDoc(ref)).data().completedAt.isEqual(before.completedAt));
  await assertFails(updateDoc(ref,{rating:null,updatedAt:serverTimestamp()}));
  await assertSucceeds(updateDoc(ref,{rating:null,submittedAt:null,updatedAt:serverTimestamp()}));
  await assertFails(shared('bob'));
});

test('real browser adapter uses Firebase for feed, checkmark, comment, catch-up and private disclosure', { timeout: 15000 }, async () => {
  const aliceDb = db('alice'), bobDb = db('bob');
  const alice = createFirestoreBackend(null, () => ({ uid: 'alice', displayName: 'Alice' }), aliceDb._delegate);
  const bob = createFirestoreBackend(null, () => ({ uid: 'bob', displayName: 'Bob' }), bobDb._delegate);
  try {
    const clubs = await alice.request('/clubs');
    assert.equal(clubs.clubs[0].id, 'club');
    // Fixtures use a programme old enough for all three mock days; private read
    // rules still govern their individual actual openAt / closeAt timestamps.
    await env.withSecurityRulesDisabled(async ctx => {
      const d = ctx.firestore(), now = Date.now();
      await updateDoc(doc(d, base), { startDate: new Date(now).toISOString().slice(0, 10), timezone: 'UTC', boundaries: Array.from({ length: 51 }, (_, i) => Timestamp.fromMillis(now - 3600000 + i * 86400000)) });
      await updateDoc(workRef(d, 'today'), { category: 'poem', title: 'Test poem', author: 'Author', country: 'Finland', year: '2026', minutes: 1 });
    });
    let f = await alice.request('/clubs/club/feed');
    assert.ok(f.days[0].works.some(w => w.id === 'today'));
    await alice.request('/clubs/club/works/today', { method: 'POST', body: { action: 'complete' } });
    await alice.request('/clubs/club/works/today', { method: 'POST', body: { action: 'comment', comment: 'PRIVATE ADAPTER THOUGHT' } });
    f = await alice.request('/clubs/club/feed');
    assert.equal(f.days.flatMap(d => d.works).find(w => w.id === 'today').mine.comment, 'PRIVATE ADAPTER THOUGHT');
    const original = (await getDoc(rowRef(aliceDb, 'today', 'alice'))).data();
    await alice.request('/clubs/club/works/today', { method: 'POST', body: { action: 'rate', rating: 0 } });
    f = await alice.request('/clubs/club/feed');
    assert.equal(f.days.flatMap(d => d.works).find(w => w.id === 'today').mine.rating, 0);
    const rated = (await getDoc(rowRef(aliceDb, 'today', 'alice'))).data();
    assert.ok(rated.completedAt.isEqual(original.completedAt));
    assert.ok(rated.commentAt.isEqual(original.commentAt));
    const other = await bob.request('/clubs/club/feed');
    assert.equal(JSON.stringify(other).includes('PRIVATE ADAPTER THOUGHT'), false);
    assert.equal('collective' in other.days.flatMap(d => d.works).find(w => w.id === 'today'), false);

    const act = (client, body) => client.request('/clubs/club/works/today',{method:'POST',body});
    const ownWork = feed => feed.days.flatMap(d=>d.works).find(w=>w.id==='today');
    await act(alice,{action:'submit',comment:'PRIVATE ADAPTER THOUGHT'});
    assert.equal(ownWork(await alice.request('/clubs/club/feed')).revealed,true);
    assert.equal(ownWork(await bob.request('/clubs/club/feed')).revealed,false);
    await act(bob,{action:'complete'}); await act(bob,{action:'rate',rating:5});
    await act(bob,{action:'submit',comment:'BOB FINISHED'});
    assert.equal(ownWork(await bob.request('/clubs/club/feed')).collective.readers.length,2);
    await act(bob,{action:'unread'});
    let undone=ownWork(await bob.request('/clubs/club/feed'));
    assert.equal(undone.revealed,false); assert.equal(undone.mine.comment,'BOB FINISHED');
    await act(bob,{action:'complete'}); await act(bob,{action:'submit',comment:'BOB FINISHED'});
    assert.equal(ownWork(await bob.request('/clubs/club/feed')).collective.readers.length,2);
    // A second tab undo must discard a now-forbidden shared listener, then recover.
    await updateDoc(rowRef(bobDb,'today','bob'),{status:'reading',completedAt:null,submittedAt:null,updatedAt:serverTimestamp()});
    await new Promise(resolve=>setTimeout(resolve,100));
    assert.equal(ownWork(await bob.request('/clubs/club/feed')).revealed,false);
    await act(bob,{action:'complete'}); await act(bob,{action:'submit',comment:'BOB FINISHED'});
    assert.equal(ownWork(await bob.request('/clubs/club/feed')).revealed,true);
    await alice.request('/clubs/club/works/past', { method: 'POST', body: { action: 'complete' } });
    const row = (await getDoc(rowRef(aliceDb, 'past', 'alice'))).data();
    assert.equal(row.joinedOnDay, false);
    await assertFails(alice.request('/clubs/club/works/future'));
  } finally { alice.reset(); bob.reset(); }
});

const checksRef = (d, u) => doc(d, `${base}/completions/${u}`);
async function checkOff(uid, work = 'today') {
  const d = db(uid), b = writeBatch(d), old = await getDoc(checksRef(d, uid));
  const row = await getDoc(rowRef(d, work, uid)).catch(() => null);
  if (row?.exists()) b.update(rowRef(d, work, uid), { status: 'done', completedAt: serverTimestamp(), updatedAt: serverTimestamp() });
  else b.set(rowRef(d, work, uid), { status: 'done', startedAt: serverTimestamp(), completedAt: serverTimestamp(), joinedOnDay: work !== 'past', comment: '', commentAt: null, updatedAt: serverTimestamp() });
  b.set(checksRef(d, uid), { works: { ...(old.exists() ? old.data().works : {}), [work]: serverTimestamp() }, last: work });
  return b.commit();
}
test('organiser reads completion records only; members cannot read others; drafts stay with their owner', async () => {
  await assertSucceeds(checkOff('bob'));
  await updateDoc(rowRef(db('bob'), 'today', 'bob'), { rating: 2, comment: 'BOB PRIVATE DRAFT', commentAt: serverTimestamp(), updatedAt: serverTimestamp() });
  const seen = await assertSucceeds(getDoc(checksRef(db('alice'), 'bob')));
  assert.deepEqual(Object.keys(seen.data()).sort(), ['last', 'works']);
  assert.deepEqual(Object.keys(seen.data().works), ['today']);
  assert.equal(JSON.stringify(seen.data()).includes('PRIVATE'), false);
  assert.equal((await assertSucceeds(getDocs(collection(db('alice'), `${base}/completions`)))).size, 1);
  await assertFails(getDoc(checksRef(db('cara'), 'bob')));
  await assertFails(getDocs(collection(db('cara'), `${base}/completions`)));
  await assertFails(getDocs(query(collection(db('cara'), `${base}/completions`), where('last', '==', 'today'))));
  await assertSucceeds(getDoc(checksRef(db('cara'), 'cara')));
  await assertSucceeds(getDoc(checksRef(db('bob'), 'bob')));
  await assertFails(getDoc(checksRef(db('outsider'), 'bob')));
  // Nobody but the owner reads a draft, the organiser included.
  for (const uid of ['alice', 'cara']) {
    await assertFails(getDoc(rowRef(db(uid), 'today', 'bob')));
    await assertFails(getDocs(collection(db(uid), `${base}/works/today/reads`)));
  }
  await assertSucceeds(getDoc(rowRef(db('bob'), 'today', 'bob')));
});

test('completion records cannot be forged: only the owner, only matching their own checkmark', async () => {
  const ts = Timestamp.fromMillis(Date.now() - 60000);
  // Another member's record, in any shape.
  await assertFails(setDoc(checksRef(db('cara'), 'bob'), { works: { today: serverTimestamp() }, last: 'today' }));
  await assertFails(setDoc(checksRef(db('alice'), 'bob'), { works: { today: serverTimestamp() }, last: 'today' }));
  // Own record without a checkmark behind it.
  await assertFails(setDoc(checksRef(db('cara'), 'cara'), { works: { today: serverTimestamp() }, last: 'today' }));
  await action('cara', 'today', 'reading');
  await assertFails(setDoc(checksRef(db('cara'), 'cara'), { works: { today: serverTimestamp() }, last: 'today' }));
  await assertSucceeds(checkOff('cara'));
  const row = (await getDoc(rowRef(db('cara'), 'today', 'cara'))).data();
  // A different time, a second text at once, extra fields, a hidden key: all refused.
  await assertFails(updateDoc(checksRef(db('cara'), 'cara'), { 'works.today': ts, last: 'today' }));
  await assertFails(updateDoc(checksRef(db('cara'), 'cara'), { 'works.past': row.completedAt, last: 'past' }));
  await assertFails(updateDoc(checksRef(db('cara'), 'cara'), { 'works.past': row.completedAt, 'works.future': row.completedAt, last: 'past' }));
  await assertFails(updateDoc(checksRef(db('cara'), 'cara'), { rating: 5 }));
  await assertFails(setDoc(checksRef(db('cara'), 'cara'), { works: {}, last: 'today' }));
  // Rewriting the true value is harmless and allowed (legacy repair).
  await assertSucceeds(setDoc(checksRef(db('cara'), 'cara'), { works: { today: row.completedAt }, last: 'today' }));
  // Mark as unread clears it, together with the private row.
  const d = db('cara'), b = writeBatch(d);
  b.update(rowRef(d, 'today', 'cara'), { status: 'reading', completedAt: null, submittedAt: null, updatedAt: serverTimestamp() });
  b.set(checksRef(d, 'cara'), { works: {}, last: 'today' });
  await assertSucceeds(b.commit());
  await assertFails(setDoc(checksRef(db('cara'), 'cara'), { works: { today: row.completedAt }, last: 'today' }));
  // Records are never deleted, and a future text cannot be claimed.
  await assertFails(deleteDoc(checksRef(db('cara'), 'cara')));
  await assertFails(checkOff('cara', 'future'));
});

test('browser adapter writes and clears the completion record with the checkmark; organiser view is organiser-only', { timeout: 15000 }, async () => {
  await env.withSecurityRulesDisabled(async ctx => {
    const d = ctx.firestore(), now = Date.now();
    await updateDoc(doc(d, base), { startDate: new Date(now).toISOString().slice(0, 10), timezone: 'UTC', boundaries: Array.from({ length: 51 }, (_, i) => Timestamp.fromMillis(now - 3600000 + i * 86400000)) });
    await updateDoc(workRef(d, 'today'), { category: 'poem', title: 'Test poem', author: 'Author', country: 'Finland', year: '2026', minutes: 1 });
  });
  const alice = createFirestoreBackend(null, () => ({ uid: 'alice', displayName: 'Alice' }), db('alice')._delegate);
  const bob = createFirestoreBackend(null, () => ({ uid: 'bob', displayName: 'Bob' }), db('bob')._delegate);
  const act = (client, body) => client.request('/clubs/club/works/today', { method: 'POST', body });
  try {
    await act(bob, { action: 'complete' });
    await act(bob, { action: 'rate', rating: 3 });
    await act(bob, { action: 'comment', comment: 'BOB DRAFT' });
    const view = await alice.request('/clubs/club/organiser');
    assert.ok(view.checks.bob.today.at > 0);
    assert.equal(view.checks.bob.today.onTime, true);
    assert.deepEqual(view.roster.map(r => r.uid), ['alice', 'bob', 'cara']);
    assert.equal(JSON.stringify(view).includes('BOB DRAFT'), false);
    assert.equal(JSON.stringify(view).includes('"rating"'), false);
    await assert.rejects(bob.request('/clubs/club/organiser'));
    const first = (await getDoc(rowRef(db('bob'), 'today', 'bob'))).data().completedAt;
    await act(bob, { action: 'unread' });
    await act(bob, { action: 'restore' });
    const restored = (await getDoc(rowRef(db('bob'), 'today', 'bob'))).data();
    assert.ok(restored.completedAt.isEqual(first));
    assert.equal(restored.status, 'done');
    assert.ok((await getDoc(checksRef(db('alice'), 'bob'))).data().works.today.isEqual(first));
    await act(bob, { action: 'unread' });
    const fresh = createFirestoreBackend(null, () => ({ uid: 'alice', displayName: 'Alice' }), db('alice')._delegate);
    const after = await fresh.request('/clubs/club/organiser');
    fresh.reset();
    assert.equal(after.checks.bob?.today, undefined);
    // A legacy checkmark with no record is repaired when its owner opens the feed.
    await action('cara', 'today', 'done');
    const cara = createFirestoreBackend(null, () => ({ uid: 'cara', displayName: 'Cara' }), db('cara')._delegate);
    await cara.request('/clubs/club/feed');
    await new Promise(resolve => setTimeout(resolve, 500));
    const repaired = (await getDoc(checksRef(db('alice'), 'cara'))).data();
    assert.ok(repaired.works.today.isEqual((await getDoc(rowRef(db('cara'), 'today', 'cara'))).data().completedAt));
    cara.reset();
  } finally { alice.reset(); bob.reset(); }
});

// Reactions: one document per reacting member per text, { on: { author: [keys] }, last, updatedAt }.
const rxRef = (d, u, w = 'today') => doc(d, `${base}/works/${w}/reactions/${u}`);
const rxCol = (d, w = 'today') => collection(d, `${base}/works/${w}/reactions`);
const react = (uid, author, key, on = true, owner = uid, w = 'today') =>
  setDoc(rxRef(db(uid), owner, w), { on: { [author]: on ? arrayUnion(key) : arrayRemove(key) }, last: author, updatedAt: serverTimestamp() }, { merge: true });

test('reactions: a finished reader adds and removes her own, on others\' thoughts and her own', async () => {
  await submit('alice'); await submit('bob');
  await assertSucceeds(react('alice', 'bob', 'heart'));
  await assertSucceeds(react('alice', 'bob', 'think'));
  await assertSucceeds(react('alice', 'alice', 'laugh'));
  assert.deepEqual((await getDoc(rxRef(db('alice'), 'alice'))).data().on, { bob: ['heart', 'think'], alice: ['laugh'] });
  await assertSucceeds(react('alice', 'bob', 'heart', false));
  await assertSucceeds(react('alice', 'bob', 'heart', false));   // removing twice is harmless
  assert.deepEqual((await getDoc(rxRef(db('alice'), 'alice'))).data().on.bob, ['think']);
  // Bob, also finished, sees them.
  const seen = await assertSucceeds(getDocs(rxCol(db('bob'))));
  assert.deepEqual(seen.docs.map(d => d.id), ['alice']);
  await assertSucceeds(react('bob', 'alice', 'moved'));
  assert.equal((await getDocs(rxCol(db('alice')))).size, 2);
});

test('reactions: nobody touches another member\'s reactions', async () => {
  await submit('alice'); await submit('bob'); await submit('cara');
  await react('alice', 'bob', 'heart');
  // Writing into Alice's document, adding or removing, as Bob or the organiser-less Cara.
  await assertFails(react('bob', 'bob', 'heart', true, 'alice'));
  await assertFails(react('cara', 'bob', 'heart', false, 'alice'));
  await assertFails(updateDoc(rxRef(db('bob'), 'alice'), { on: {}, last: 'bob', updatedAt: serverTimestamp() }));
  await assertFails(deleteDoc(rxRef(db('bob'), 'alice')));
  await assertFails(deleteDoc(rxRef(db('alice'), 'alice')));
  // Own document, but bad shapes: unknown emoji, two authors at once, duplicates, a wrong `last`, extra fields, a client time.
  await assertFails(react('bob', 'alice', 'fire'));
  await assertFails(setDoc(rxRef(db('bob'), 'bob'), { on: { alice: ['heart'], cara: ['heart'] }, last: 'alice', updatedAt: serverTimestamp() }));
  await assertFails(setDoc(rxRef(db('bob'), 'bob'), { on: { alice: ['heart', 'heart'] }, last: 'alice', updatedAt: serverTimestamp() }));
  await assertFails(setDoc(rxRef(db('bob'), 'bob'), { on: { alice: ['heart'] }, last: 'cara', updatedAt: serverTimestamp() }));
  await assertFails(setDoc(rxRef(db('bob'), 'bob'), { on: { alice: ['heart'] }, last: 'alice', updatedAt: serverTimestamp(), rating: 5 }));
  await assertFails(setDoc(rxRef(db('bob'), 'bob'), { on: { alice: ['heart'] }, last: 'alice', updatedAt: Timestamp.now() }));
  await assertFails(setDoc(rxRef(db('bob'), 'bob'), { on: { alice: 'heart' }, last: 'alice', updatedAt: serverTimestamp() }));
  assert.deepEqual((await getDoc(rxRef(db('bob'), 'alice'))).data().on, { bob: ['heart'] });
});

test('reactions: non-members and signed-out visitors are refused', async () => {
  await submit('alice'); await submit('bob');
  await react('alice', 'bob', 'heart');
  for (const uid of [null, 'outsider']) {
    await assertFails(getDocs(rxCol(db(uid))));
    await assertFails(getDoc(rxRef(db(uid), 'alice')));
    await assertFails(react(uid, 'bob', 'heart', true, uid || 'anon'));
  }
  // A departed member (still in the programme roster, no Bookrank member document) too.
  await submit('cara');
  await env.withSecurityRulesDisabled(ctx => deleteDoc(doc(ctx.firestore(), 'clubs/club/members/cara')));
  await assertFails(getDocs(rxCol(db('cara'))));
  await assertFails(react('cara', 'bob', 'heart'));
});

test('reactions: a member who cannot see the thoughts yet can neither see nor add reactions', async () => {
  await submit('alice'); await submit('bob');
  await react('alice', 'bob', 'heart');
  // Cara has checked off and written a complete draft, but not submitted.
  await action('cara', 'today', 'done');
  await updateDoc(rowRef(db('cara'), 'today', 'cara'), { rating: 3, comment: 'Draft', commentAt: serverTimestamp(), updatedAt: serverTimestamp() });
  await assertFails(getDocs(rxCol(db('cara'))));
  await assertFails(getDoc(rxRef(db('cara'), 'alice')));
  await assertFails(getDoc(rxRef(db('cara'), 'cara')));
  await assertFails(react('cara', 'bob', 'heart'));
  await assertFails(react('cara', 'cara', 'heart'));
  // Only on a submitted thought, and only on a released text.
  await assertFails(react('alice', 'cara', 'heart'));
  await assertFails(react('alice', 'nobody', 'heart'));
  await assertFails(react('alice', 'alice', 'heart', true, 'alice', 'future'));
  await assertFails(getDocs(rxCol(db('alice'), 'past')));   // Alice has not finished that one
  await assertSucceeds(react('bob', 'alice', 'think'));
  // After Mark as unread the discussion hides again, reactions with it; her own stay in place.
  await updateDoc(rowRef(db('alice'), 'today', 'alice'), { status: 'reading', completedAt: null, submittedAt: null, updatedAt: serverTimestamp() });
  await assertFails(getDocs(rxCol(db('alice'))));
  await assertFails(react('alice', 'bob', 'heart', false));
  await assertSucceeds(getDocs(rxCol(db('bob'))));
  // Bob can take back a reaction on a thought that is no longer shared, but not add one.
  await assertFails(react('bob', 'alice', 'laugh'));
  await assertSucceeds(react('bob', 'alice', 'think', false));
});

test('browser adapter: react, count, un-react, and another finished reader sees it', { timeout: 15000 }, async () => {
  await env.withSecurityRulesDisabled(async ctx => {
    const d = ctx.firestore(), now = Date.now();
    await updateDoc(doc(d, base), { startDate: new Date(now).toISOString().slice(0, 10), timezone: 'UTC', boundaries: Array.from({ length: 51 }, (_, i) => Timestamp.fromMillis(now - 3600000 + i * 86400000)) });
    await updateDoc(workRef(d, 'today'), { category: 'poem', title: 'Test poem', author: 'Author', country: 'Finland', year: '2026', minutes: 1 });
  });
  const alice = createFirestoreBackend(null, () => ({ uid: 'alice', displayName: 'alice' }), db('alice')._delegate);
  const bob = createFirestoreBackend(null, () => ({ uid: 'bob', displayName: 'bob' }), db('bob')._delegate);
  const cara = createFirestoreBackend(null, () => ({ uid: 'cara', displayName: 'cara' }), db('cara')._delegate);
  const act = (client, body) => client.request('/clubs/club/works/today', { method: 'POST', body });
  const rx = (client, body) => client.request('/clubs/club/works/today/reactions', { method: 'POST', body });
  const thought = async (client, author) => (await client.request('/clubs/club/feed')).days.flatMap(d => d.works).find(w => w.id === 'today').collective?.comments.find(c => c.uid === author);
  // Another member's reaction reaches an open listener a moment later, as in the app.
  const eventually = async (client, author, want) => {
    for (let i = 0; i < 40; i++) { const t = await thought(client, author); if (JSON.stringify(t.reactions) === JSON.stringify(want)) return; await new Promise(r => setTimeout(r, 50)); }
    assert.deepEqual((await thought(client, author)).reactions, want);
  };
  try {
    for (const [client, text] of [[alice, 'ALICE THOUGHT'], [bob, 'BOB THOUGHT']]) {
      await act(client, { action: 'complete' }); await act(client, { action: 'rate', rating: 4 }); await act(client, { action: 'submit', comment: text });
    }
    assert.deepEqual((await thought(alice, 'bob')).reactions, []);
    await rx(alice, { author: 'bob', emoji: 'heart', on: true });
    assert.deepEqual((await thought(alice, 'bob')).reactions, [{ key: 'heart', count: 1, mine: true, names: [] }]);
    await rx(bob, { author: 'bob', emoji: 'heart', on: true });
    await eventually(alice, 'bob', [{ key: 'heart', count: 2, mine: true, names: ['bob'] }]);
    await eventually(bob, 'bob', [{ key: 'heart', count: 2, mine: true, names: ['alice'] }]);
    await rx(alice, { author: 'bob', emoji: 'heart', on: false });
    await eventually(bob, 'bob', [{ key: 'heart', count: 1, mine: true, names: [] }]);
    await assert.rejects(rx(alice, { author: 'bob', emoji: 'fire', on: true }), /Unknown reaction/);
    // Cara has not finished: no thoughts, no reactions, and her attempt is refused.
    assert.equal(await thought(cara, 'bob'), undefined);
    await assert.rejects(rx(cara, { author: 'bob', emoji: 'heart', on: true }), /not available/);
  } finally { alice.reset(); bob.reset(); cara.reset(); }
});

test('browser adapter without reaction rules: thoughts still show, reactions are simply absent', { timeout: 15000 }, async () => {
  const old = await initializeTestEnvironment({ projectId: 'demo-daily-dose-old', firestore: { host: '127.0.0.1', port: 8189,
    rules: fullRules.replace(/match \/reactions\/\{uid\} \{[\s\S]*?allow delete: if false;\n        \}/, '') } });
  try {
    assert.doesNotMatch(fullRules.replace(/match \/reactions\/\{uid\} \{[\s\S]*?allow delete: if false;\n        \}/, ''), /reactions\/\{uid\}/);
    await old.withSecurityRulesDisabled(async ctx => {
      const d = ctx.firestore(), now = Date.now();
      await setDoc(doc(d, 'clubs/club'), { name: 'Test club', member_uids: ['alice'] });
      await setDoc(doc(d, 'clubs/club/members/alice'), { display_name: 'alice' });
      await setDoc(doc(d, base), { organizerUids: ['alice'], participantUids: ['alice'], startDate: new Date(now).toISOString().slice(0, 10), timezone: 'UTC',
        boundaries: Array.from({ length: 51 }, (_, i) => Timestamp.fromMillis(now - 3600000 + i * 86400000)), dayWorkIds: [{ ids: ['today'] }] });
      await setDoc(doc(d, `${base}/works/today`), { id: 'today', day: 1, category: 'poem', title: 'Test poem', openAt: Timestamp.fromMillis(now - 3600000), closeAt: Timestamp.fromMillis(now + 3600000) });
    });
    const alice = createFirestoreBackend(null, () => ({ uid: 'alice', displayName: 'alice' }), old.authenticatedContext('alice').firestore()._delegate);
    try {
      const act = body => alice.request('/clubs/club/works/today', { method: 'POST', body });
      await act({ action: 'complete' }); await act({ action: 'rate', rating: 2 }); await act({ action: 'submit', comment: 'STILL SHOWN' });
      const w = (await alice.request('/clubs/club/feed')).days[0].works[0];
      assert.equal(w.collective.comments[0].text, 'STILL SHOWN');
      assert.equal(w.collective.reactable, false);
      assert.equal('reactions' in w.collective.comments[0], false);
      await assert.rejects(alice.request('/clubs/club/works/today/reactions', { method: 'POST', body: { author: 'alice', emoji: 'heart', on: true } }), /not available/);
    } finally { alice.reset(); }
  } finally { await old.cleanup(); }
});

// Seen: which reactions to one's own thoughts one has looked at, private to its owner.
const seenRef = (d, u) => doc(d, `${base}/seen/${u}`);
const see = (uid, work, pairs, owner = uid) =>
  setDoc(seenRef(db(uid), owner), { works: { [work]: pairs }, last: work, updatedAt: serverTimestamp() }, { merge: true });

test('seen record: only its owner reads and writes it, one text at a time, in shape', async () => {
  await assertSucceeds(see('alice', 'today', ['bob:heart', 'cara:think']));
  await assertSucceeds(see('alice', 'past', ['bob:laugh']));
  await assertSucceeds(see('alice', 'today', []));                    // everything taken back: an empty list
  assert.deepEqual((await getDoc(seenRef(db('alice'), 'alice'))).data().works, { today: [], past: ['bob:laugh'] });
  // Nobody else, the organiser included, reads, lists or writes it.
  await assertFails(getDoc(seenRef(db('bob'), 'alice')));
  await assertFails(getDocs(collection(db('alice'), `${base}/seen`)));
  await assertFails(see('bob', 'today', [], 'alice'));
  await assertFails(see('alice', 'today', [], 'bob'));                // Alice is the organiser
  await assertFails(deleteDoc(seenRef(db('alice'), 'alice')));
  // Bad shapes: two texts at once, a wrong `last`, not a list, too long, extra fields, a client time.
  await assertFails(setDoc(seenRef(db('bob'), 'bob'), { works: { today: [], past: [] }, last: 'today', updatedAt: serverTimestamp() }));
  await assertFails(setDoc(seenRef(db('bob'), 'bob'), { works: { today: [] }, last: 'past', updatedAt: serverTimestamp() }));
  await assertFails(setDoc(seenRef(db('bob'), 'bob'), { works: { today: 'alice:heart' }, last: 'today', updatedAt: serverTimestamp() }));
  await assertFails(setDoc(seenRef(db('bob'), 'bob'), { works: { today: Array.from({ length: 601 }, (_, i) => `u${i}:heart`) }, last: 'today', updatedAt: serverTimestamp() }));
  await assertFails(setDoc(seenRef(db('bob'), 'bob'), { works: { today: [] }, last: 'today', updatedAt: serverTimestamp(), extra: 1 }));
  await assertFails(setDoc(seenRef(db('bob'), 'bob'), { works: { today: [] }, last: 'today', updatedAt: Timestamp.now() }));
  await assertFails(setDoc(seenRef(db('bob'), 'bob'), { works: { 'no/slash': [] }, last: 'no/slash', updatedAt: serverTimestamp() }));
  await assertSucceeds(setDoc(seenRef(db('bob'), 'bob'), { works: { today: Array.from({ length: 600 }, (_, i) => `u${i}:heart`) }, last: 'today', updatedAt: serverTimestamp() }));
  // Signed out, outsiders and departed members: nothing.
  for (const uid of [null, 'outsider']) {
    await assertFails(getDoc(seenRef(db(uid), 'alice')));
    await assertFails(see(uid, 'today', [], uid || 'anon'));
  }
  await env.withSecurityRulesDisabled(ctx => deleteDoc(doc(ctx.firestore(), 'clubs/club/members/bob')));
  await assertFails(getDoc(seenRef(db('bob'), 'bob')));
  await assertFails(see('bob', 'today', []));
});

test('browser adapter: reactions to your thought and what you have seen, across devices', { timeout: 20000 }, async () => {
  await env.withSecurityRulesDisabled(async ctx => {
    const d = ctx.firestore(), now = Date.now();
    await updateDoc(doc(d, base), { startDate: new Date(now).toISOString().slice(0, 10), timezone: 'UTC', boundaries: Array.from({ length: 51 }, (_, i) => Timestamp.fromMillis(now - 3600000 + i * 86400000)) });
    await updateDoc(workRef(d, 'today'), { category: 'poem', title: 'Test poem', author: 'Author', country: 'Finland', year: '2026', minutes: 1 });
  });
  const client = uid => createFirestoreBackend(null, () => ({ uid, displayName: uid }), db(uid)._delegate);
  const alice = client('alice'), bob = client('bob'), cara = client('cara'), alice2 = client('alice');
  const act = (c, body) => c.request('/clubs/club/works/today', { method: 'POST', body });
  const rx = (c, body) => c.request('/clubs/club/works/today/reactions', { method: 'POST', body });
  const today = async c => { const f = await c.request('/clubs/club/feed'); return { seen: f.seen, w: f.days.flatMap(d => d.works).find(w => w.id === 'today') }; };
  const eventually = async (c, test) => {
    for (let i = 0; i < 60; i++) { if (test(await today(c))) return; await new Promise(r => setTimeout(r, 50)); }
    assert.ok(test(await today(c)), JSON.stringify(await today(c)));
  };
  try {
    for (const [c, text] of [[alice, 'ALICE'], [bob, 'BOB'], [cara, 'CARA']]) {
      await act(c, { action: 'complete' }); await act(c, { action: 'rate', rating: 3 }); await act(c, { action: 'submit', comment: text });
    }
    let t = await today(alice);
    assert.deepEqual(t.seen, {}, 'nothing seen yet: an empty record, not "unavailable"');
    assert.deepEqual(t.w.collective.toMe, []);
    await rx(bob, { author: 'alice', emoji: 'heart', on: true });
    await rx(cara, { author: 'alice', emoji: 'think', on: true });
    await rx(alice, { author: 'alice', emoji: 'laugh', on: true });     // her own: not news
    await rx(bob, { author: 'cara', emoji: 'heart', on: true });        // someone else's thought
    await eventually(alice, x => JSON.stringify(x.w.collective.toMe) === '["bob:heart","cara:think"]');
    await alice.request('/clubs/club/seen', { method: 'POST', body: { work: 'today', pairs: ['bob:heart', 'cara:think'] } });
    assert.deepEqual((await today(alice)).seen, { today: ['bob:heart', 'cara:think'] });
    // Her other device knows too.
    await eventually(alice2, x => JSON.stringify(x.seen) === '{"today":["bob:heart","cara:think"]}');
    // Bob takes his back: the pair leaves what is on her thought.
    await rx(bob, { author: 'alice', emoji: 'heart', on: false });
    await eventually(alice, x => JSON.stringify(x.w.collective.toMe) === '["cara:think"]');
    await assert.rejects(alice.request('/clubs/club/seen', { method: 'POST', body: { work: 'today', pairs: ['<b>'] } }), /Unknown reactions/);
    await assert.rejects(alice.request('/clubs/club/seen', { method: 'POST', body: { work: '../x', pairs: [] } }), /Unknown reactions/);
    // Another member never sees her record, through the adapter either.
    assert.deepEqual((await today(bob)).seen, {});
  } finally { alice.reset(); bob.reset(); cara.reset(); alice2.reset(); }
});

test('browser adapter without seen rules: the feed says so (null) and a write is refused', { timeout: 15000 }, async () => {
  const withoutSeen = fullRules.replace(/match \/seen\/\{uid\} \{[\s\S]*?size\(\) <= 600;\n      \}/, '');
  assert.doesNotMatch(withoutSeen, /seen\/\{uid\}/);
  const old = await initializeTestEnvironment({ projectId: 'demo-daily-dose-noseen', firestore: { host: '127.0.0.1', port: 8189, rules: withoutSeen } });
  try {
    await old.withSecurityRulesDisabled(async ctx => {
      const d = ctx.firestore(), now = Date.now();
      await setDoc(doc(d, 'clubs/club'), { name: 'Test club', member_uids: ['alice'] });
      await setDoc(doc(d, 'clubs/club/members/alice'), { display_name: 'alice' });
      await setDoc(doc(d, base), { organizerUids: ['alice'], participantUids: ['alice'], startDate: new Date(now).toISOString().slice(0, 10), timezone: 'UTC',
        boundaries: Array.from({ length: 51 }, (_, i) => Timestamp.fromMillis(now - 3600000 + i * 86400000)), dayWorkIds: [{ ids: ['today'] }] });
      await setDoc(doc(d, `${base}/works/today`), { id: 'today', day: 1, category: 'poem', title: 'Test poem', openAt: Timestamp.fromMillis(now - 3600000), closeAt: Timestamp.fromMillis(now + 3600000) });
    });
    const alice = createFirestoreBackend(null, () => ({ uid: 'alice', displayName: 'alice' }), old.authenticatedContext('alice').firestore()._delegate);
    try {
      const act = body => alice.request('/clubs/club/works/today', { method: 'POST', body });
      await act({ action: 'complete' }); await act({ action: 'rate', rating: 2 }); await act({ action: 'submit', comment: 'STILL SHOWN' });
      const feed = await alice.request('/clubs/club/feed');
      assert.equal(feed.seen, null);
      assert.equal(feed.days[0].works[0].collective.comments[0].text, 'STILL SHOWN');
      assert.deepEqual(feed.days[0].works[0].collective.toMe, []);
      await assert.rejects(alice.request('/clubs/club/seen', { method: 'POST', body: { work: 'today', pairs: [] } }), /Not available/);
    } finally { alice.reset(); }
  } finally { await old.cleanup(); }
});
