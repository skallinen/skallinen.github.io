import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { REACTIONS, isReaction, tally, setReaction, whoReacted, reactionBar } from '../client/reactions.mjs';

const members = new Map([['a', { name: 'Alice' }], ['b', { name: 'Bob' }], ['c', { name: 'Cara' }]]);

test('six fixed reactions; the rules allow exactly the same keys', () => {
  assert.deepEqual(REACTIONS.map(r => r.key), ['heart', 'like', 'laugh', 'wow', 'moved', 'think']);
  assert.deepEqual(REACTIONS.map(r => r.emoji), ['❤️', '👍', '😂', '😮', '😢', '🤔']);
  for (const r of REACTIONS) assert.ok(isReaction(r.key));
  for (const x of ['❤️', 'fire', '', null, undefined, 'HEART', 'toString']) assert.equal(isReaction(x), false);
  const rules = readFileSync(new URL('../firestore/daily-dose.rules', import.meta.url), 'utf8');
  assert.match(rules, new RegExp(`hasOnly\\(\\[${REACTIONS.map(r => `'${r.key}'`).join(', ')}\\]\\)`));
});

test('tally counts per thought, in the fixed order, current members only, unknown keys ignored', () => {
  const docs = [
    { uid: 'a', on: { b: ['think', 'heart'], c: ['laugh'] } },
    { uid: 'c', on: { b: ['heart', 'heart', 'fire'] } },
    { uid: 'b', on: { b: ['heart'] } },          // one's own thought: allowed
    { uid: 'gone', on: { b: ['heart'] } },       // left the club: not counted
    { uid: 'x', on: null },
  ];
  assert.deepEqual(tally(docs, 'b', members, 'a'), [
    { key: 'heart', count: 3, mine: true, names: ['Bob', 'Cara'] },
    { key: 'think', count: 1, mine: true, names: [] },
  ]);
  assert.deepEqual(tally(docs, 'c', members, 'b'), [{ key: 'laugh', count: 1, mine: false, names: ['Alice'] }]);
  assert.deepEqual(tally(docs, 'a', members, 'a'), []);
});

test('adding and removing one\'s own reaction adjusts only one\'s own share', () => {
  let list = [{ key: 'think', count: 1, mine: false, names: ['Bob'] }];
  list = setReaction(list, 'heart', true);
  assert.deepEqual(list.map(r => [r.key, r.count, r.mine]), [['heart', 1, true], ['think', 1, false]]);
  assert.equal(setReaction(list, 'heart', true), list, 'adding twice changes nothing');
  list = setReaction(list, 'think', true);
  assert.deepEqual(list.find(r => r.key === 'think'), { key: 'think', count: 2, mine: true, names: ['Bob'] });
  list = setReaction(list, 'heart', false);
  assert.deepEqual(list.map(r => r.key), ['think'], 'a count of zero disappears');
  list = setReaction(list, 'think', false);
  assert.deepEqual(list, [{ key: 'think', count: 1, mine: false, names: ['Bob'] }]);
  assert.equal(setReaction(list, 'think', false), list, 'removing what is not yours changes nothing');
});

test('who reacted reads as a sentence, with you last', () => {
  assert.equal(whoReacted({ names: [], mine: true }), 'you');
  assert.equal(whoReacted({ names: ['Bob'], mine: false }), 'Bob');
  assert.equal(whoReacted({ names: ['Bob', 'Cara'], mine: true }), 'Bob, Cara and you');
});

test('the bar: pills with counts, yours pressed, names on hover, choices only when open', () => {
  const comment = { uid: 'b', name: 'Bob <b>', reactions: [
    { key: 'heart', count: 2, mine: true, names: ['Cara'] }, { key: 'laugh', count: 1, mine: false, names: ['Cara'] }] };
  const html = reactionBar('p1', comment, { me: 'a' });
  const pills = [...html.matchAll(/<button type="button" class="reaction( mine)?" [^>]*>/g)].map(m => m[0]);
  assert.equal(pills.length, 2);
  assert.match(pills[0], /data-emoji="heart" aria-pressed="true" title="Cara and you reacted with ❤️"/);
  assert.match(pills[1], /data-emoji="laugh" aria-pressed="false" title="Cara reacted with 😂"/);
  assert.match(html, /class="reaction-count" aria-hidden="true">2</);
  assert.match(html, /aria-label="React to Bob &lt;b&gt;’s thought"/);
  assert.match(html, /aria-expanded="false"/);
  assert.doesNotMatch(html, /reaction-choice|aria-controls/);
  const open = reactionBar('p1', comment, { open: true, me: 'b' });
  const choices = [...open.matchAll(/class="reaction-choice( mine)?"[^>]*data-emoji="(\w+)" aria-pressed="(\w+)"/g)].map(m => [m[2], m[3]]);
  assert.deepEqual(choices, [['heart', 'true'], ['like', 'false'], ['laugh', 'false'], ['wow', 'false'], ['moved', 'false'], ['think', 'false']]);
  assert.match(open, /aria-expanded="true" aria-controls="reactions-p1-b" aria-label="React to your own thought"/);
  // Nobody has reacted yet: only "React".
  assert.doesNotMatch(reactionBar('p1', { uid: 'b', name: 'Bob' }), /class="reaction[ "]/);
});
