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
  assert.match(html, /class="rating-button rating-zero"[^>]*aria-pressed="true"/);
  assert.match(html, /<strong>0 \/ 5<\/strong>/);
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
  f.service.act(f.b,f.club,'p1',{action:'submit',comment:'A thought'});
  f.service.act(f.a,f.club,'p1',{action:'complete'});
  f.service.act(f.a,f.club,'p1',{action:'rate',rating:0});
  f.service.act(f.a,f.club,'p1',{action:'submit',comment:'My thought'});
  f.setTime('2026-09-13T10:00:00Z');
  assert.deepEqual(f.work(f.a).collective.ratings,{count:2,average:0});
  assert.equal(f.work(f.a).collective.readers[0].rating,0);
  f.service.act(f.b,f.club,'p1',{action:'rate',rating:5});
  const after = f.store.reads('club','p1').find(r=>r.uid===f.b.uid);
  assert.equal(after.completed_at,before.completed_at);
  assert.equal(after.comment_at,before.comment_at);
  assert.equal(after.comment,before.comment);
  f.service.act(f.b,f.club,'p1',{action:'rate',rating:null});
  assert.deepEqual(f.work(f.a).collective.ratings,{count:1,average:0});
});

test('the five star buttons are stars 1 to 5; zero is a separate labelled control', () => {
  const html = ratingControl({ id:'p1', title:'Poem', mine:{rating:null} });
  const stars = html.split('class="rating-stars"')[1].split('</div>')[0];
  assert.deepEqual([...stars.matchAll(/data-rating="(\d)"/g)].map(m => m[1]), ['1','2','3','4','5']);
  // Zero is named by its visible words (no aria-label), sits after the status line, and says it is a choice.
  assert.match(html, /class="rating-button rating-zero"[^>]*aria-pressed="false" ><span class="choice-dot" aria-hidden="true"><\/span>0 stars: did not work for me<\/button>/);
  assert.doesNotMatch(html.split('rating-zero')[0].split('rating-status')[1], /data-rating="0"/);
  assert.ok(html.indexOf('rating-status') < html.indexOf('rating-zero'));
  // One state word at a time: "Not rated" and no remove button, or "N / 5" and a remove button.
  assert.match(html, /<strong>Not rated<\/strong>/);
  assert.doesNotMatch(html, /Remove rating|Clear/);
  const rated = ratingControl({ id:'p1', title:'Poem', mine:{rating:4} });
  assert.match(rated, /<strong>4 \/ 5<\/strong>/);
  assert.match(rated, /data-rating="clear"[^>]*>Remove rating<\/button>/);
  assert.doesNotMatch(rated, /Not rated/);
});

test('after finishing, a new star choice is shown as not saved yet and cannot be removed', () => {
  const html = ratingControl({ id:'p1', title:'Poem', revealed:true, mine:{rating:4} }, false, 2);
  assert.match(html, /<strong>2 \/ 5<\/strong> <span class="rating-unsaved">\(not saved yet\)<\/span>/);
  assert.match(html, /data-rating="2" aria-label="2 stars" aria-pressed="true"/);
  assert.doesNotMatch(html, /Remove rating/);
  const same = ratingControl({ id:'p1', title:'Poem', revealed:true, mine:{rating:4} });
  assert.doesNotMatch(same, /not saved yet/);
});
