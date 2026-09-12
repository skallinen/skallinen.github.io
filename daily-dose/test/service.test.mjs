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


function finish(f, user, comment, work = 'p1', rating = 4) {
  f.service.act(user, f.club, work, {action:'complete'});
  f.service.act(user, f.club, work, {action:'rate',rating});
  return f.service.act(user, f.club, work, {action:'submit',comment});
}

test('submission immediately unlocks only other submitted responses, independently per text', t => {
  const f = fixture(); t.after(() => f.store.close());
  finish(f, f.b, 'Bob finished');
  f.service.act(f.c, f.club, 'p1', {action:'start'});
  f.service.act(f.a, f.club, 'p1', {action:'complete',comment:'Alice draft'});
  assert.equal(f.work().revealed,false);
  assert.equal(f.work(f.b).collective.readers.length,1);
  f.service.act(f.a, f.club, 'p1', {action:'rate',rating:0});
  assert.equal(f.work().revealed,false);
  f.service.act(f.a, f.club, 'p1', {action:'submit',comment:'Alice finished'});
  assert.equal(f.work().revealed,true);
  assert.deepEqual(f.work().collective.readers.map(r=>r.uid).sort(),['a','b']);
  assert.equal(f.work(f.c).revealed,false);
  assert.equal(f.work(f.a,'s1').revealed,false);
});

test('submission requires a checkmark, zero-to-five rating and nonblank 140-character thought', t => {
  const f=fixture(); t.after(()=>f.store.close());
  const submit=comment=>f.service.act(f.a,f.club,'p1',{action:'submit',comment});
  assert.throws(()=>submit('Thought'),/Check off/);
  f.service.act(f.a,f.club,'p1',{action:'complete'});
  assert.throws(()=>submit('Thought'),/stars/);
  f.service.act(f.a,f.club,'p1',{action:'rate',rating:0});
  for(const comment of ['', '   ', '\n\t']) assert.throws(()=>submit(comment),/thought/);
  assert.throws(()=>submit('🙂'.repeat(141)),/140/);
  submit('🙂'.repeat(140));
  assert.equal(f.work().collective.ratings.average,0);
});

test('unread removes submission, preserves drafts and records a fresh catch-up time on recheck', t => {
  const f=fixture(); t.after(()=>f.store.close());
  finish(f,f.a,'Alice finished'); finish(f,f.b,'Bob finished');
  const first=f.work().mine.completedAt;
  f.service.act(f.a,f.club,'p1',{action:'unread'});
  assert.equal(f.work().revealed,false);
  assert.equal(f.work().mine.completedAt,null);
  assert.equal(f.work().mine.comment,'Alice finished');
  assert.equal(f.work().mine.rating,4);
  assert.equal(f.work(f.b).collective.readers.length,1);
  assert.equal(f.service.feed(f.a,f.club).personal.completed,0);
  f.setTime('2026-09-14T10:00:00Z');
  f.service.act(f.a,f.club,'p1',{action:'complete'});
  assert.ok(f.work().mine.completedAt>first);
  assert.equal(f.work().mine.onTime,false);
  assert.equal(f.work().revealed,false);
  f.service.act(f.a,f.club,'p1',{action:'submit',comment:'Alice finished'});
  assert.equal(f.work(f.b).collective.catchUp,1);
  const reread=f.work().mine.completedAt;
  f.service.act(f.a,f.club,'p1',{action:'complete'});
  assert.equal(f.work().mine.completedAt,reread);
  assert.throws(()=>f.service.act(f.a,f.club,'p1',{action:'withdraw'}),/Unknown/);
});

test('past days also require submission, old common reveals are ignored and departures are filtered', t => {
  const f=fixture(); t.after(()=>f.store.close());
  finish(f,f.b,'Bob finished');
  f.setTime('2026-09-14T10:00:00Z');
  f.store.db.prepare('INSERT INTO reveals VALUES (?,?,?)').run('club','p1',Date.now());
  assert.equal(f.work().revealed,false);
  finish(f,f.a,'Alice catch-up');
  f.club.members.delete('b');
  assert.deepEqual(f.work().collective.readers.map(r=>r.uid),['a']);
  f.club.members.set('b',{name:'Bob'});
  assert.equal(f.work().collective.readers.length,2);
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
