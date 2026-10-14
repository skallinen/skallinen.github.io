import test from 'node:test';
import assert from 'node:assert/strict';
import { probit, rankScore, rankOrder, rankScores, scoreLabel, tieBreak, rankLine, rankStars, starChanges } from '../client/ranking.mjs';

const close = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `${a} != ${b}`);
const scores = n => Array.from({ length: n }, (_, i) => rankScore(i, n));

test('probit is the A&S 26.2.23 inverse normal CDF, symmetric', () => {
  assert.equal(probit(0.5), 0);
  close(probit(0.975), 1.959964, 5e-4);
  close(probit(0.025), -1.959964, 5e-4);
  for (const p of [0.01, 0.1, 0.3, 0.45]) close(probit(p), -probit(1 - p), 1e-12);
});

test('ranked scores run from 5.0 at the top to 2.0 at the bottom, a list of one is 3.5', () => {
  assert.equal(rankScore(0, 0), null);
  assert.equal(rankScore(0, 1), 3.5);
  for (const n of [2, 3, 5, 10, 37, 150]) {
    close(rankScore(0, n), 5);
    close(rankScore(n - 1, n), 2);
  }
  assert.equal(scoreLabel(rankScore(0, 1)), '3.5');
});

test('ranked scores strictly decrease and are symmetric: score(i) + score(n-1-i) = 7', () => {
  for (const n of [2, 3, 4, 7, 10, 25, 150]) {
    const s = scores(n);
    for (let i = 1; i < n; i++) assert.ok(s[i] < s[i - 1], `n=${n} i=${i}`);
    for (let i = 0; i < n; i++) close(s[i] + s[n - 1 - i], 7, 1e-9);
  }
});

test('the ranked scores of every list average exactly 3.5', () => {
  for (const n of [1, 2, 3, 4, 5, 6, 9, 10, 11, 20, 49, 50, 100, 150]) {
    const s = scores(n);
    close(s.reduce((a, b) => a + b, 0) / n, 3.5, 1e-9);
  }
});

test('Bookrank spacing on the 2..5 scale: wide at the ends, close in the middle', () => {
  // Bookrank's n = 10 is 5.0 4.3 3.8 3.5 3.2 2.8 2.5 2.2 1.7 1.0 on 1..5;
  // the same positions on 2..5 are 2 + 3/4 (x - 1).
  const s = scores(10).map(scoreLabel);
  assert.deepEqual(s, ['5.0', '4.4', '4.1', '3.9', '3.6', '3.4', '3.1', '2.9', '2.6', '2.0']);
  assert.deepEqual(scores(5).map(scoreLabel), ['5.0', '4.1', '3.5', '2.9', '2.0']);
});

test('without a saved order: stars descending, a fixed per-member shuffle inside each group', () => {
  const rated = [
    { id: 'a', rating: 3 }, { id: 'b', rating: 5 }, { id: 'c', rating: 0 }, { id: 'd', rating: 5 },
    { id: 'e', rating: 4 }, { id: 'f', rating: 3 }, { id: 'g', rating: 5 }, { id: 'h', rating: 4 }];
  const order = rankOrder(rated, null, 'mikko');
  const stars = order.map(id => rated.find(x => x.id === id).rating);
  assert.deepEqual(stars, [5, 5, 5, 4, 4, 3, 3, 0]);
  // The same member gets the same order, whatever order the texts come in.
  assert.deepEqual(rankOrder([...rated].reverse(), null, 'mikko'), order);
  assert.deepEqual(rankOrder(rated, [], 'mikko'), order);
  // Inside a group the order follows the member's hash.
  const fives = order.slice(0, 3);
  assert.deepEqual(fives, [...fives].sort((x, y) => tieBreak('mikko', x) - tieBreak('mikko', y)));
  // Somebody else gets their own shuffle (for this data the 5s differ).
  const other = ['anna', 'bo', 'cy', 'dee', 'eve'].map(uid => rankOrder(rated, null, uid).slice(0, 3).join());
  assert.ok(other.some(x => x !== fives.join()));
  // Unrated texts are not in the list.
  assert.deepEqual(rankOrder([{ id: 'x', rating: null }, { id: 'y', rating: 2 }], null, 'u'), ['y']);
});

test('a saved order is kept; newcomers go to the bottom of their star group; unrated texts drop out', () => {
  const rated = [{ id: 'a', rating: 5 }, { id: 'b', rating: 4 }, { id: 'c', rating: 2 }, { id: 'd', rating: 4 }];
  // The member put the 2-star text on top: it stays there.
  assert.deepEqual(rankOrder(rated, ['c', 'a', 'b', 'd'], 'u'), ['c', 'a', 'b', 'd']);
  // New 4: below the last ranked text with 4 or more (b), not below c.
  assert.deepEqual(rankOrder([...rated, { id: 'n', rating: 4 }], ['c', 'a', 'b', 'd'], 'u'), ['c', 'a', 'b', 'd', 'n']);
  assert.deepEqual(rankOrder([...rated, { id: 'n', rating: 4 }], ['a', 'b', 'c', 'd'], 'u'), ['a', 'b', 'c', 'd', 'n']);
  assert.deepEqual(rankOrder([...rated, { id: 'n', rating: 4 }], ['a', 'd', 'c', 'b'], 'u'), ['a', 'd', 'c', 'b', 'n']);
  assert.deepEqual(rankOrder([...rated, { id: 'n', rating: 3 }], ['a', 'b', 'd', 'c'], 'u'), ['a', 'b', 'd', 'n', 'c']);
  // A new 5 with no 5 above it in the list... a is 5, so it goes right after a.
  assert.deepEqual(rankOrder([...rated, { id: 'n', rating: 5 }], ['a', 'b', 'd', 'c'], 'u'), ['a', 'n', 'b', 'd', 'c']);
  // Nothing ranked with as many stars: the top.
  assert.deepEqual(rankOrder([{ id: 'a', rating: 3 }, { id: 'n', rating: 5 }], ['a'], 'u'), ['n', 'a']);
  // Rating removed: drops out. Unknown or repeated ids in the saved order are ignored.
  assert.deepEqual(rankOrder([{ id: 'a', rating: 5 }, { id: 'b', rating: null }], ['b', 'zz', 'a', 'a'], 'u'), ['a']);
  // Changing the stars of a ranked text does not move it.
  assert.deepEqual(rankOrder([{ id: 'a', rating: 0 }, { id: 'b', rating: 5 }], ['a', 'b'], 'u'), ['a', 'b']);
});

test('rankScores gives place and score; the card line shows one decimal', () => {
  const r = rankScores(['a', 'b', 'c']);
  assert.deepEqual(r.get('a'), { score: 5, position: 1, of: 3 });
  close(r.get('b').score, 3.5);
  assert.equal(r.get('c').score, 2);
  assert.match(rankLine(r.get('b')), /<strong>3\.5<\/strong>, 2nd of 3/);
  assert.equal(rankLine(undefined), '');
});

test('saving sets whole stars: the ranked score rounded, halves up, so 2 to 5', () => {
  assert.equal(rankStars(5), 5);
  assert.equal(rankStars(2), 2);
  assert.equal(rankStars(3.5), 4);
  assert.equal(rankStars(3.4999999999), 4, 'a computed half is still a half');
  assert.equal(rankStars(3.49), 3);
  assert.equal(rankStars(4.5), 5);
  assert.equal(rankStars(rankScore(0, 1)), 4, 'a list of one: 3.5, so 4 stars');
  assert.equal(rankStars(rankScore(2, 5)), 4, 'the middle of an odd list: 3.5, so 4 stars');
  for (const n of [1, 2, 3, 7, 10, 150]) for (let i = 0; i < n; i++) {
    const st = rankStars(rankScore(i, n));
    assert.ok(st >= 2 && st <= 5 && Number.isInteger(st));
  }
  // n = 10: 5.0 4.4 4.1 3.9 3.6 3.4 3.1 2.9 2.6 2.0 gives 5 4 4 4 4 3 3 3 3 2.
  assert.deepEqual(Array.from({ length: 10 }, (_, i) => rankStars(rankScore(i, 10))), [5, 4, 4, 4, 4, 3, 3, 3, 3, 2]);
});

test('only the texts whose whole stars change are written', () => {
  const ratings = { a: 5, b: 4, c: 0, d: 1, e: 3 };
  // n = 5: 5.0 4.1 3.5 2.9 2.0 gives 5 4 4 3 2.
  assert.deepEqual(starChanges(['a', 'b', 'e', 'c', 'd'], id => ratings[id]),
    [{ id: 'e', rating: 4 }, { id: 'c', rating: 3 }, { id: 'd', rating: 2 }]);
  assert.deepEqual(starChanges(['a', 'b'], id => ({ a: 5, b: 2 })[id]), []);
  assert.deepEqual(starChanges([], () => 0), []);
});
