import { test, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { doc, collection, getDoc, getDocs, setDoc, updateDoc, writeBatch, serverTimestamp, Timestamp, query, where } from 'firebase/firestore';
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
