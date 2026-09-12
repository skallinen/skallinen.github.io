import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture } from './fixtures.mjs';
import { validateRating, ratingSummary } from '../server/domain.mjs';
import { ratingControl } from '../client/ratings.mjs';

test('ratings accept only integers 0–5 or null; zero is not an absent rating', () => {
  for (const value of [0,1,2,3,4,5,null]) assert.equal(validateRating(value), value);
  for (const value of [-1,6,2.5,'5',false,undefined,NaN,{},[]]) assert.throws(() => validateRating(value));
  assert.deepEqual(ratingSummary([{rating:0},{rating:5},{rating:null},{}]), { count:2, average:2.5 });
  const html = ratingControl({ id:'p1', title:'Poem', mine:{rating:0} });
  assert.match(html, /aria-label="0 stars" aria-pressed="true"/);
  assert.match(html, /0 \/ 5/);
  assert.doesNotMatch(html, /Not rated/);
});

test('ratings require completion, stay private, preserve timestamps and publish with discussion', t => {
  const f = fixture(); t.after(() => f.store.close());
  assert.throws(() => f.service.act(f.b,f.club,'p1',{action:'rate',rating:3}), /Check off/);
  f.service.act(f.b,f.club,'p1',{action:'complete',comment:'A thought'});
  const before = f.store.reads('club','p1')[0];
  f.service.act(f.b,f.club,'p1',{action:'rate',rating:0});
  assert.equal(f.work(f.b).mine.rating,0);
  assert.equal('collective' in f.work(f.a),false);
  f.setTime('2026-09-13T10:00:00Z');
  assert.deepEqual(f.work(f.a).collective.ratings,{count:1,average:0});
  assert.equal(f.work(f.a).collective.readers[0].rating,0);
  f.service.act(f.b,f.club,'p1',{action:'rate',rating:5});
  const after = f.store.reads('club','p1')[0];
  assert.equal(after.completed_at,before.completed_at);
  assert.equal(after.comment_at,before.comment_at);
  assert.equal(after.comment,before.comment);
  f.service.act(f.b,f.club,'p1',{action:'rate',rating:null});
  assert.deepEqual(f.work(f.a).collective.ratings,{count:0,average:null});
});
