import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createStore } from '../server/store.mjs';
import { createService } from '../server/service.mjs';
import { localDate, addDays, dayNumber, validDate, validateComment } from '../server/domain.mjs';
import { anthology, fixture } from './fixtures.mjs';

test('valid calendar dates and timezone boundaries, including DST', () => {
  assert.equal(validDate('2026-02-30'), false);
  assert.equal(validDate('2028-02-29'), true);
  assert.equal(localDate('2026-09-12T20:59:59Z'), '2026-09-12');
  assert.equal(localDate('2026-09-12T21:00:00Z'), '2026-09-13');
  assert.equal(localDate('2026-03-29T20:59:59Z'), '2026-03-29');
  assert.equal(localDate('2026-03-29T21:00:00Z'), '2026-03-30');
  assert.equal(localDate('2026-10-25T21:59:59Z'), '2026-10-25');
  assert.equal(localDate('2026-10-25T22:00:00Z'), '2026-10-26');
  assert.equal(dayNumber('2026-03-28', '2026-03-30'), 3);
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
});

test('future metadata and bodies stay locked, GET does not register activity', t => {
  const f = fixture(); t.after(() => f.store.close());
  assert.deepEqual(f.service.feed(f.a, f.club).days.map(d => d.number), [1]);
  assert.throws(() => f.service.read(f.a, f.club, 'p2'), /not been released/);
  assert.throws(() => f.service.act(f.a, f.club, 'p2', { action: 'complete' }), /not been released/);
  f.service.read(f.a, f.club, 'p1');
  assert.equal(f.store.allReads('club').length, 0);
});

test('on-day checkmarks stay private even when everyone finished', t => {
  const f = fixture(); t.after(() => f.store.close());
  f.service.act(f.b, f.club, 'p1', { action: 'complete', comment: 'SECRET BOB COMMENT' });
  const feed = f.service.feed(f.a, f.club);
  const serialized = JSON.stringify(feed);
  assert.equal(f.work().revealed, false);
  assert.equal('collective' in f.work(), false);
  assert.equal(serialized.includes('SECRET BOB'), false);
  assert.equal(serialized.includes('Bob'), false);
  assert.equal(f.work(f.b).mine.comment, 'SECRET BOB COMMENT');
});

test('midnight AND all started readers must finish; nobody else blocks', t => {
  const f = fixture(); t.after(() => f.store.close());
  f.service.act(f.a, f.club, 'p1', { action: 'complete', comment: 'Alice thought' });
  f.service.act(f.b, f.club, 'p1', { action: 'start' });
  f.setTime('2026-09-12T21:00:00Z');
  assert.equal(f.work().revealReason, 'readers-finishing');
  f.service.act(f.b, f.club, 'p1', { action: 'complete', comment: 'Bob caught up' });
  const w = f.work();
  assert.equal(w.revealed, true);
  assert.equal(w.collective.onTime, 1);
  assert.equal(w.collective.catchUp, 1);
  assert.deepEqual(w.collective.comments.map(c => c.name), ['Bob', 'Alice']);
  assert.equal(w.collective.readers.some(r => r.uid === f.c.uid), false);
});

test('withdrawal releases the gate but does not count as reading', t => {
  const f = fixture(); t.after(() => f.store.close());
  f.service.act(f.b, f.club, 'p1', { action: 'start' });
  f.setTime('2026-09-13T10:00:00Z');
  assert.equal(f.work().revealed, false);
  f.service.act(f.b, f.club, 'p1', { action: 'withdraw' });
  assert.equal(f.work().revealed, true);
  assert.equal(f.work().collective.readers.length, 0);
});

test('late readers do not close a published gate; completion is immutable', t => {
  const f = fixture(); t.after(() => f.store.close());
  f.service.act(f.a, f.club, 'p1', { action: 'complete' });
  const firstTime = f.work().mine.completedAt;
  f.setTime('2026-09-14T10:00:00Z');
  assert.equal(f.work().revealed, true);
  f.service.act(f.c, f.club, 'p1', { action: 'start' });
  assert.equal(f.work().revealed, true);
  assert.equal(f.work(f.c).mine.joinedOnDay, false);
  f.service.act(f.a, f.club, 'p1', { action: 'complete' });
  assert.equal(f.work().mine.completedAt, firstTime);
  assert.equal(f.work().mine.onTime, true);
  assert.throws(() => f.service.act(f.a, f.club, 'p1', { action: 'withdraw' }), /cannot be undone/);
});

test('member removal stops blocking; rejoin cannot re-hide publication', t => {
  const f = fixture(); t.after(() => f.store.close());
  f.service.act(f.b, f.club, 'p1', { action: 'start' });
  f.setTime('2026-09-14T10:00:00Z');
  assert.equal(f.work().revealed, false);
  f.club.members.delete('b'); assert.equal(f.work().revealed, true);
  f.club.members.set('b', { name: 'Bob' }); assert.equal(f.work().revealed, true);
});

test('comments are limited to 140 Unicode code points, optional and require completion', t => {
  const f = fixture(); t.after(() => f.store.close());
  assert.equal(validateComment('🙂'.repeat(140)).length, 280);
  assert.throws(() => validateComment('🙂'.repeat(141)), /140/);
  assert.throws(() => f.service.act(f.a, f.club, 'p1', { action: 'comment', comment: 'Not yet' }), /Check off/);
  f.service.act(f.a, f.club, 'p1', { action: 'complete', comment: '🙂'.repeat(140) });
  f.service.act(f.a, f.club, 'p1', { action: 'comment', comment: '' });
  assert.equal(f.work().mine.comment, '');
});

test('user IDs, timestamps and on-time claims cannot be injected', t => {
  const f = fixture(); t.after(() => f.store.close());
  for (const key of ['uid', 'completedAt', 'onTime', 'joined_on_day']) {
    assert.throws(() => f.service.act(f.a, f.club, 'p1', { action: 'complete', [key]: 'forged' }), /Unexpected/);
  }
  assert.equal(f.store.allReads('club').length, 0);
});

test('private statistics count only the current user; days newest first; catch-up after Day 50', t => {
  const f = fixture(); t.after(() => f.store.close());
  f.service.act(f.b, f.club, 'p1', { action: 'complete' });
  assert.equal(f.service.feed(f.a, f.club).personal.completed, 0);
  f.setTime('2026-11-05T12:00:00Z');
  assert.equal(f.service.feed(f.a, f.club).days[0].number, 50);
  f.service.act(f.a, f.club, 'p1', { action: 'complete' });
  assert.equal(f.work().mine.onTime, false);
  assert.equal(f.service.feed(f.a, f.club).personal.catchUp, 1);
});

test('schedule is organiser-only; cannot move a programme after its start', t => {
  const f = fixture(); t.after(() => f.store.close());
  assert.throws(() => f.service.schedule(f.b, { ...f.club, organizer: false }, { startDate: '2026-09-13', timezone: 'Europe/Helsinki' }), /Only the organiser/);
  assert.throws(() => f.service.schedule(f.a, f.club, { startDate: '2026-09-13', timezone: 'Europe/Helsinki' }), /programme has started/);
  const other = { ...f.club, id: 'new-club' };
  assert.throws(() => f.service.schedule(f.a, other, { startDate: '2026-02-30', timezone: 'Europe/Helsinki' }), /valid Day 1/);
  assert.throws(() => f.service.schedule(f.a, other, { startDate: '2026-09-13', timezone: 'Not/AZone' }), /IANA/);
  f.service.schedule(f.a, other, { startDate: '2026-09-14', timezone: 'Europe/Helsinki' });
  f.service.schedule(f.a, other, { startDate: '2026-09-15', timezone: 'Europe/Helsinki' });
  assert.equal(f.service.feed(f.a, other).days.length, 0);
});

test('sanitizes reading HTML without losing permitted emphasis', t => {
  const f = fixture(); t.after(() => f.store.close());
  assert.equal(f.service.read(f.a, f.club, 'p1').blocks[0].html, '<b>Safe text</b>');
});

test('SQLite survives reopening and isolates clubs', () => {
  const dir = mkdtempSync(join(tmpdir(), 'daily-dose-test-'));
  try {
    const f = fixture(join(dir, 'reading.sqlite'));
    f.service.act(f.a, f.club, 'p1', { action: 'complete', comment: 'Persist me' });
    f.store.close();
    const reopened = createStore(join(dir, 'reading.sqlite'));
    assert.equal(reopened.reads('club', 'p1')[0].comment, 'Persist me');
    assert.deepEqual(reopened.reads('other', 'p1'), []);
    reopened.close();
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
