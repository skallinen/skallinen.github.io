import { test, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { doc, collection, getDoc, getDocs, setDoc, updateDoc, writeBatch, serverTimestamp, Timestamp, arrayUnion, arrayRemove, query, where } from 'firebase/firestore';
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
  const b = writeBatch(d);
  b.set(ref, row);
  b.update(gateRef(d, work), { pending: status === 'reading' && joined ? arrayUnion(uid) : arrayRemove(uid), actor: uid, updatedAt: serverTimestamp() });
  return b.commit();
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
test('private gate cannot be inspected and a start cannot omit the atomic gate update', async () => {
  for (const uid of ['alice','bob']) await assertFails(getDoc(gateRef(db(uid), 'today')));
  await assertFails(setDoc(rowRef(db('bob'), 'today', 'bob'), { status: 'reading', startedAt: serverTimestamp(), completedAt: null, joinedOnDay: true, comment: '', commentAt: null, updatedAt: serverTimestamp() }));
  await assertSucceeds(action('bob', 'today', 'reading'));
  await assertFails(getDoc(rowRef(db('alice'), 'today', 'bob')));
});
test('on-day comments remain unreadable even after all checkmarks; owners can read theirs', async () => {
  await action('bob', 'today', 'done');
  await updateDoc(rowRef(db('bob'), 'today', 'bob'), { comment: 'Secret thought', commentAt: serverTimestamp(), updatedAt: serverTimestamp() });
  await assertSucceeds(getDoc(rowRef(db('bob'), 'today', 'bob')));
  await assertFails(getDoc(rowRef(db('alice'), 'today', 'bob')));
  await assertFails(getDocs(collection(db('alice'), `${base}/works/today/reads`)));
  await assertFails(updateDoc(workRef(db('alice'), 'today'), { revealedAt: serverTimestamp() }));
});
test('after midnight, pending readers block until withdrawal; published rows then readable', async () => {
  await env.withSecurityRulesDisabled(async ctx => {
    const d = ctx.firestore(), at = Timestamp.fromMillis(Date.now() - 7200000);
    await setDoc(rowRef(d, 'past', 'bob'), { status: 'reading', startedAt: at, completedAt: null, joinedOnDay: true, comment: '', commentAt: null, updatedAt: at });
    await updateDoc(gateRef(d, 'past'), { pending: ['bob'] });
  });
  await assertFails(updateDoc(workRef(db('alice'), 'past'), { revealedAt: serverTimestamp() }));
  await assertSucceeds(action('bob', 'past', 'withdrawn'));
  await assertSucceeds(updateDoc(workRef(db('alice'), 'past'), { revealedAt: serverTimestamp() }));
  await assertSucceeds(getDocs(collection(db('cara'), `${base}/works/past/reads`)));
  await assertFails(updateDoc(workRef(db('alice'), 'past'), { revealedAt: null }));
});
test('cannot remove another reader from the gate or forge on-day completion', async () => {
  await action('bob', 'today', 'reading');
  const d = db('alice'), b = writeBatch(d);
  b.set(rowRef(d, 'today', 'alice'), { status: 'done', startedAt: serverTimestamp(), completedAt: serverTimestamp(), joinedOnDay: true, comment: '', commentAt: null, updatedAt: serverTimestamp() });
  b.update(gateRef(d, 'today'), { pending: [], actor: 'alice', updatedAt: serverTimestamp() });
  await assertFails(b.commit());
  await assertFails(action('alice', 'past', 'done', true));
  await assertSucceeds(action('alice', 'past', 'done', false));
  await assertFails(updateDoc(rowRef(d, 'past', 'alice'), { completedAt: Timestamp.fromMillis(100), commentAt: serverTimestamp(), updatedAt: serverTimestamp() }));
});
test('140 Unicode characters, no forged UID, no checkmark undo, and no public text edits', async () => {
  await action('bob', 'today', 'done');
  const ref = rowRef(db('bob'), 'today', 'bob');
  await assertSucceeds(updateDoc(ref, { comment: '🙂'.repeat(140), commentAt: serverTimestamp(), updatedAt: serverTimestamp() }));
  await assertFails(updateDoc(ref, { comment: '🙂'.repeat(141), commentAt: serverTimestamp(), updatedAt: serverTimestamp() }));
  await assertFails(updateDoc(ref, { uid: 'alice', commentAt: serverTimestamp(), updatedAt: serverTimestamp() }));
  await assertFails(action('bob', 'today', 'withdrawn'));
  await assertFails(updateDoc(doc(db('alice'), `${base}/texts/today`), { json: 'altered' }));
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
    const other = await bob.request('/clubs/club/feed');
    assert.equal(JSON.stringify(other).includes('PRIVATE ADAPTER THOUGHT'), false);
    await alice.request('/clubs/club/works/past', { method: 'POST', body: { action: 'complete' } });
    const row = (await getDoc(rowRef(aliceDb, 'past', 'alice'))).data();
    assert.equal(row.joinedOnDay, false);
    await assertFails(alice.request('/clubs/club/works/future'));
  } finally { alice.reset(); bob.reset(); }
});
