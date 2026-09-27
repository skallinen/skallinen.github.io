import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { REACTIONS, isReaction, tally, setReaction, whoReacted, reactionBar, reactionsTo, newReactions, newsLabel, meMarker } from '../client/reactions.mjs';

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

// ---------- the count on your name
test('reactions to a thought: other current members only, one pair per emoji, sorted', () => {
  const docs = [
    { uid: 'c', on: { a: ['think', 'heart', 'heart', 'fire'] } },
    { uid: 'b', on: { a: ['heart'], c: ['laugh'] } },
    { uid: 'a', on: { a: ['heart'] } },          // your own reaction to your own thought: not news
    { uid: 'gone', on: { a: ['heart'] } },       // left the club: not counted
    { uid: 'x', on: null },
  ];
  assert.deepEqual(reactionsTo(docs, 'a', members), ['b:heart', 'c:heart', 'c:think']);
  assert.deepEqual(reactionsTo(docs, 'c', members), ['b:laugh']);
  assert.deepEqual(reactionsTo([], 'a', members), []);
});

test('new reactions: what is on your thought now minus what you have seen, per text, in feed order', () => {
  const works = [
    { id: 'd2-poem', collective: { toMe: ['b:heart', 'c:think'] } },
    { id: 'd2-story', collective: { reactable: true } },        // no thought of yours with reactions
    { id: 'd1-poem', collective: { toMe: ['b:laugh'] } },
    { id: 'd1-essay' },                                         // not finished: nothing shown
  ];
  assert.deepEqual(newReactions(works, null, {}), [{ id: 'd2-poem', count: 2 }, { id: 'd1-poem', count: 1 }], 'never looked: all are new');
  assert.deepEqual(newReactions(works, { 'd2-poem': ['b:heart'] }, null), [{ id: 'd2-poem', count: 1 }, { id: 'd1-poem', count: 1 }]);
  // Seen on another device (the account) or on this one: either counts.
  assert.deepEqual(newReactions(works, { 'd2-poem': ['b:heart'] }, { 'd2-poem': ['c:think'], 'd1-poem': ['b:laugh'] }), []);
  // A reaction taken back leaves nothing behind: the count is of what is there now.
  const taken = [{ id: 'd2-poem', collective: { toMe: ['c:think'] } }];
  assert.deepEqual(newReactions(taken, { 'd2-poem': ['b:heart'] }), [{ id: 'd2-poem', count: 1 }]);
  assert.deepEqual(newReactions(taken, { 'd2-poem': ['b:heart', 'c:think'] }), []);
  // Taken back before you looked: gone from the count too.
  assert.deepEqual(newReactions([{ id: 'd2-poem', collective: { toMe: [] } }], {}), []);
});

test('the marker on your name: your initial, and with news a button with the count and a spoken label', () => {
  assert.equal(newsLabel(1), '1 new reaction to your thoughts');
  assert.equal(newsLabel(3), '3 new reactions to your thoughts');
  const quiet = meMarker('Mikko Saarinen', 0);
  assert.equal(quiet, '<span class="me-marker" aria-hidden="true">M</span>');
  const news = meMarker('Mikko Saarinen', 3);
  assert.match(news, /^<button type="button" class="me-marker has-news" data-news aria-label="3 new reactions to your thoughts"/);
  assert.match(news, /class="news-count" aria-hidden="true">3</);
  assert.match(meMarker('Mikko', 12), />9\+</);
  assert.match(meMarker('Mikko', 12), /aria-label="12 new reactions to your thoughts"/);
  assert.match(meMarker('<b>', 0), />&lt;</);
  assert.match(meMarker('Øystein', 1), />Ø</);
});

test('the rules keep the seen record private and one text per write', () => {
  const rules = readFileSync(new URL('../firestore/daily-dose.rules', import.meta.url), 'utf8');
  const block = rules.slice(rules.indexOf('match /seen/{uid}'), rules.indexOf('match /gates/{work}'));
  assert.match(block, /allow get: if doseMember\(club\) && request\.auth\.uid == uid;/);
  assert.match(block, /allow list, delete: if false;/);
  assert.match(block, /affectedKeys\(\)\.hasOnly\(\[request\.resource\.data\.last\]\)/);
});
