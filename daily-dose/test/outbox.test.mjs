import test from 'node:test';
import assert from 'node:assert/strict';
import { paintCopy, usableCopy, outboxEntries, notConnected, retryDelay, draftConflict, OUTBOX_ACTIONS } from '../client/outbox.mjs';

const campaign = { startDate: '2026-11-25', timezone: 'Europe/Helsinki', currentDay: 2, today: '2026-11-26', totalDays: 75, editable: false };
const card = (id, day, category, extra = {}) => ({ id, day, category, minutes: 3, title: `Title ${id}`, author: 'A. Author', country: 'Finland', year: '2001',
  description: 'About it.', closeAt: 1, date: '2026-11-26', mine: { status: 'done', onTime: true, completedAt: 1, comment: 'mine', rating: 4, submittedAt: null },
  revealed: false, revealReason: 'submit-your-response', ...extra });
const feed = () => ({ club: { id: 'club', name: 'Club' }, me: { uid: 'u', name: 'U' }, organizer: false, edition: 'e', now: 5, campaign,
  personal: { completed: 1 }, seen: { x: [] },
  days: [{ number: 2, date: '2026-11-26', today: true, works: [card('P2', 2, 'poem', { collective: { comments: [{ text: 'someone else' }] } }), card('S2', 2, 'story'), card('E2', 2, 'essay')] },
    { number: 1, date: '2026-11-25', today: false, works: [card('P1', 1, 'poem'), { ...card('S1', 1, 'story'), loading: true }] }] });

test('the copy keeps today\'s three cards and only the outline of the earlier days, never the club\'s thoughts', () => {
  const copy = paintCopy(feed(), { uid: 'u', name: 'U', clubId: 'club', clubs: [{ id: 'club', name: 'Club', extra: 1 }] });
  assert.equal(copy.v, 1);
  assert.deepEqual(copy.clubs, [{ id: 'club', name: 'Club' }]);
  const [today, earlier] = copy.feed.days;
  assert.deepEqual(today.works.map(w => w.id), ['P2', 'S2', 'E2']);
  assert.equal(today.works[0].collective, undefined, 'no club thoughts in the copy');
  assert.equal(today.works[0].description, 'About it.');
  assert.deepEqual(today.works[0].mine, card('P2', 2, 'poem').mine);
  assert.deepEqual(earlier.works, [{ id: 'P1', day: 1, category: 'poem', title: 'Title P1', author: 'A. Author', loading: true },
    { id: 'S1', day: 1, category: 'story', title: 'Title S1', author: 'A. Author', loading: true }]);
  assert.equal(copy.feed.loading, true);
  assert.equal(copy.feed.cached, true);
  assert.equal(copy.feed.seen, undefined);
  assert.equal(copy.feed.now, undefined);
});

test('no copy without today (before Day 1, after the last day), while today is still loading, or without a member and club', () => {
  const f = feed();
  assert.equal(paintCopy({ ...f, days: f.days.slice(1) }, { uid: 'u', clubId: 'club' }), null);
  const loading = feed(); loading.days[0].works[1].loading = true;
  assert.equal(paintCopy(loading, { uid: 'u', clubId: 'club' }), null);
  assert.equal(paintCopy(f, { clubId: 'club' }), null);
  assert.equal(paintCopy(f, { uid: 'u' }), null);
  assert.equal(paintCopy({ ...f, campaign: null }, { uid: 'u', clubId: 'club' }), null);
});

test('the copy is drawn only on its own day in the club\'s timezone, and only in shape', () => {
  const copy = paintCopy(feed(), { uid: 'u', clubId: 'club' });
  assert.equal(usableCopy(copy, new Date('2026-11-26T10:00:00Z')), true);
  // 23:30 UTC on the 26th is already the 27th in Helsinki: new texts, no copy.
  assert.equal(usableCopy(copy, new Date('2026-11-26T23:30:00Z')), false);
  assert.equal(usableCopy(copy, new Date('2026-11-25T21:59:00Z')), false);
  assert.equal(usableCopy({ ...copy, v: 2 }, new Date('2026-11-26T10:00:00Z')), false);
  assert.equal(usableCopy(null), false);
  assert.equal(usableCopy({ ...copy, feed: { ...copy.feed, campaign: { ...campaign, timezone: 'Nowhere/Else' } } }, new Date('2026-11-26T10:00:00Z')), false);
});

test('the outbox keeps check-off, stars, Finish & reveal, Mark as unread and its Undo; anything else or out of shape is dropped', () => {
  assert.deepEqual(OUTBOX_ACTIONS, ['complete', 'restore', 'unread', 'rate', 'submit']);
  const good = [{ id: 'P2', k: 'a', payload: { action: 'complete' } }, { id: 'P2', k: 'b', payload: { action: 'rate', rating: 4 } }, { id: 'P2', k: 'c', payload: { action: 'submit', comment: 'x' } }];
  assert.deepEqual(outboxEntries([...good, { id: 'P2', k: 'd', payload: { action: 'start' } }, { id: 1, k: 'e', payload: { action: 'rate' } }, { id: 'P2', payload: { action: 'rate' } }, null]), good);
  assert.deepEqual(outboxEntries('nonsense'), []);
  assert.deepEqual(outboxEntries(null), []);
});

test('not connected: offline, not signed in yet, or the server out of reach; a refusal or an invalid write is an error', () => {
  for (const code of ['unavailable', 'deadline-exceeded', 'cancelled', 'unknown', 'internal', 'resource-exhausted', 'aborted']) assert.equal(notConnected({ code }), true, code);
  assert.equal(notConnected({ message: 'Failed to get document because the client is offline.' }), true);
  assert.equal(notConnected(new Error('x'), { online: false }), true);
  assert.equal(notConnected(new Error('Please sign in with your Bookrank account.'), { signedIn: false }), true);
  assert.equal(notConnected({ code: 'permission-denied' }), false);
  assert.equal(notConnected(new Error('Check off the reading before finishing.')), false);
  assert.equal(notConnected({ code: 'invalid-argument' }), false);
});

test('tries again after 2, 4, 8, 16, then every 30 seconds', () => {
  assert.deepEqual([0, 1, 2, 3, 4, 5, 9].map(retryDelay), [2000, 4000, 8000, 16000, 30000, 30000, 30000]);
});

test('a draft meets a different thought from one\'s other device: the newer typing wins', () => {
  // The row still holds what this draft began from, or this very text: no conflict.
  assert.equal(draftConflict({ comment: 'old', commentAt: 100 }, { comment: 'new', base: 'old', at: 50 }), null);
  assert.equal(draftConflict({ comment: 'new', commentAt: 100 }, { comment: ' new ', base: 'old', at: 50 }), null);
  // Another device saved "laptop": the one typed later wins.
  assert.equal(draftConflict({ comment: 'laptop', commentAt: 100 }, { comment: 'phone', base: 'old', at: 200 }), 'mine');
  assert.equal(draftConflict({ comment: 'laptop', commentAt: 300 }, { comment: 'phone', base: 'old', at: 200 }), 'theirs');
  // Without a time on either side this device's text is kept (it is the one in the box).
  assert.equal(draftConflict({ comment: 'laptop', commentAt: null }, { comment: 'phone', base: 'old', at: 200 }), 'mine');
  // A draft without a base (kept by an older page) is written as before.
  assert.equal(draftConflict({ comment: 'laptop', commentAt: 300 }, { comment: 'phone' }), null);
  assert.equal(draftConflict({ comment: '', commentAt: null }, { comment: 'phone', base: '', at: 1 }), null);
});
