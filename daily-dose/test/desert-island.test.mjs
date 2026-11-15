import test from 'node:test';
import assert from 'node:assert/strict';
import { fit, results, nextPair, pairOdds, pairKey, starScore, activeChoices, validChoices, addChoice, prng, MAX_CHOICES, PRIOR_SD, islandCard, islandRow } from '../client/desert-island.mjs';
import { rankScore } from '../client/ranking.mjs';

const close = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `${a} != ${b}`);
const c = (w, l, at = 1) => ({ w, l, at });
const times = (k, w, l) => Array.from({ length: k }, (_, i) => c(w, l, i + 1));
const pool = ['A', 'B', 'C', 'D', 'E'];

test('the 1..5 star curve: top 5, bottom 1, middle 3, symmetric; My ranking keeps 2..5', () => {
  for (const n of [2, 3, 5, 10, 40, 225]) {
    close(starScore(0, n), 5); close(starScore(n - 1, n), 1);
    close(starScore((n - 1) / 2, n), 3);
    for (let i = 0; i < n; i++) close(starScore(i, n) + starScore(n - 1 - i, n), 6, 1e-9);
  }
  assert.equal(starScore(0, 1), 3);
  assert.equal(starScore(0, 0), null);
  close(starScore(2, 5), 3);
  // My ranking's own scale is unchanged.
  close(rankScore(0, 10), 5); close(rankScore(9, 10), 2); assert.equal(rankScore(0, 1), 3.5);
});

test('A chosen over B five times: P(A over B) above a half, and the uncertainty shrinks with every choice', () => {
  const sds = [];
  for (const k of [0, 1, 2, 5, 20]) {
    const f = fit(['A', 'B'], times(k, 'A', 'B')), o = pairOdds(f, 'A', 'B');
    if (k) assert.ok(o.p > 0.5, `k=${k}: p=${o.p}`);
    sds.push(Math.sqrt(o.v));
  }
  for (let i = 1; i < sds.length; i++) assert.ok(sds[i] < sds[i - 1], `sd of the gap shrinks: ${sds.join(', ')}`);
  close(sds[0], Math.sqrt(2) * PRIOR_SD, 1e-12);
  // A fit with one text always winning stays finite (the prior holds it).
  const f = fit(['A', 'B'], times(200, 'A', 'B'));
  assert.ok(Number.isFinite(f.mean[0]) && f.mean[0] > 0 && f.mean[1] < 0);
  // Mixed evidence: 3 to 1 is less sure than 6 to 2 is, but both lean the same way.
  const p31 = pairOdds(fit(['A', 'B'], [...times(3, 'A', 'B'), c('B', 'A')]), 'A', 'B');
  const p62 = pairOdds(fit(['A', 'B'], [...times(6, 'A', 'B'), ...times(2, 'B', 'A')]), 'A', 'B');
  assert.ok(p31.p > 0.5 && p62.p > p31.p && p62.v < p31.v);
});

test('the MAP is where the gradient of the log posterior vanishes', () => {
  const ch = [c('A', 'B'), c('A', 'C'), c('B', 'C'), c('C', 'B'), c('D', 'A'), c('E', 'D'), c('A', 'E')];
  const f = fit(pool, ch), at = new Map(f.ids.map((id, i) => [id, i]));
  const g = f.mean.map(t => t / PRIOR_SD ** 2);
  for (const x of ch) { const d = f.mean[at.get(x.w)] - f.mean[at.get(x.l)], r = 1 / (1 + Math.exp(d)); g[at.get(x.w)] -= r; g[at.get(x.l)] += r; }
  for (const v of g) close(v, 0, 1e-8);
});

test('symmetry: swapping the winner and the loser mirrors the strengths', () => {
  const ch = [c('A', 'B'), c('A', 'C'), c('B', 'C'), c('A', 'B')];
  const f = fit(['A', 'B', 'C'], ch), g = fit(['A', 'B', 'C'], ch.map(x => c(x.l, x.w)));
  f.mean.forEach((m, i) => close(m, -g.mean[i], 1e-9));
  f.sd.forEach((s, i) => close(s, g.sd[i], 1e-9));
  // Renaming the texts renames the result.
  const h = fit(['C', 'B', 'A'], ch);
  for (const id of ['A', 'B', 'C']) close(f.mean[f.ids.indexOf(id)], h.mean[h.ids.indexOf(id)], 1e-9);
});

test('the order of the history does not matter', () => {
  const ch = [c('A', 'B', 1), c('C', 'A', 2), c('B', 'C', 3), c('A', 'D', 4), c('E', 'A', 5), c('A', 'B', 6), c('D', 'C', 7)];
  const f = fit(pool, ch), g = fit(pool, [...ch].reverse()), h = fit(pool, [ch[3], ch[0], ch[6], ch[1], ch[5], ch[2], ch[4]]);
  for (const other of [g, h]) { f.mean.forEach((m, i) => close(m, other.mean[i], 1e-9)); f.cov.forEach((v, i) => close(v, other.cov[i], 1e-9)); }
  const r = results(pool, ch, { seed: 7 }), s = results(pool, [...ch].reverse(), { seed: 7 });
  assert.deepEqual(r.rows.map(x => [x.id, x.stars, x.low, x.high]), s.rows.map(x => [x.id, x.stars, x.low, x.high]));
});

test('flat prior, no choices: every text in the middle (3 stars) with a wide range', () => {
  for (const ids of [pool, Array.from({ length: 40 }, (_, i) => `t${i}`)]) {
    const r = results(ids, []);
    assert.equal(r.used, 0);
    for (const row of r.rows) {
      assert.equal(row.stars, 3); close(row.score, 3); close(row.mean, 0, 1e-12); close(row.sd, PRIOR_SD, 1e-12);
      assert.ok(row.high - row.low >= 2, `${row.id}: ${row.low} to ${row.high}`);
    }
    assert.equal(r.single, 0);
  }
  // With five texts and nothing chosen, the range is the whole scale.
  assert.ok(results(pool, []).rows.every(x => x.low === 1 && x.high === 5));
});

test('a clear order gives 5 at the top, 1 at the bottom, 3 in the middle, and the ranges narrow as choices grow', () => {
  // A > B > C > D > E, every pair asked k times.
  const order = (k) => pool.flatMap((a, i) => pool.slice(i + 1).flatMap(b => times(k, a, b)));
  const few = results(pool, order(1), { seed: 3 }), many = results(pool, order(15), { seed: 3 });
  for (const r of [few, many]) assert.deepEqual(r.rows.map(x => x.id), pool);
  assert.deepEqual(many.rows.map(x => x.stars), [5, 4, 3, 2, 1]);
  assert.ok(many.width < few.width, `${many.width} < ${few.width}`);
  assert.ok(many.single > few.single);
  assert.ok(many.rows.every((x, i) => x.sd < few.rows[i].sd));
  // The suggested stars sit inside their own likely range.
  for (const r of [few, many]) for (const x of r.rows) assert.ok(x.low <= x.stars && x.stars <= x.high, `${x.id}: ${x.stars} in ${x.low}..${x.high}`);
  assert.equal(many.used, 10 * 15);
});

test('the ranges are stable for a seed and the draws are reproducible', () => {
  const ch = [c('A', 'B'), c('C', 'D'), c('A', 'C'), c('E', 'B')];
  assert.deepEqual(results(pool, ch, { seed: 42 }).rows, results(pool, ch, { seed: 42 }).rows);
  const r = prng(9), s = prng(9);
  for (let i = 0; i < 5; i++) assert.equal(r(), s());
});

test('a text that is no longer checked off drops out; its choices stay in the history but do not count', () => {
  const ch = [...times(4, 'A', 'B'), ...times(3, 'B', 'C'), ...times(5, 'C', 'A')];
  assert.equal(activeChoices(['A', 'B'], ch).length, 4);
  const r = results(['A', 'B'], ch);
  assert.equal(r.used, 4);
  assert.deepEqual(r.rows.map(x => x.id), ['A', 'B']);
  const without = fit(['A', 'B'], times(4, 'A', 'B')), withOld = fit(['A', 'B'], ch);
  without.mean.forEach((m, i) => close(m, withOld.mean[i]));
});

test('choices are validated like the ranking ids and capped at 5000, newest kept', () => {
  assert.ok(validChoices([c('A', 'B', 1), c('d01-poem', 'd02-story', Date.now())]));
  for (const bad of [[c('A', 'A')], [c('../x', 'B')], [{ w: 'A', l: 'B' }], [{ w: 'A', l: 'B', at: 1.5 }], [{ w: 'A', l: 'B', at: 1, extra: 1 }], [{ w: 'A', l: 'B', at: '1' }], 'A>B', null])
    assert.equal(validChoices(bad), false, JSON.stringify(bad));
  assert.equal(validChoices(Array.from({ length: MAX_CHOICES + 1 }, (_, i) => c('A', 'B', i))), false);
  let list = Array.from({ length: MAX_CHOICES }, (_, i) => c('A', 'B', i));
  list = addChoice(list, 'B', 'A', 99999);
  assert.equal(list.length, MAX_CHOICES);
  assert.deepEqual(list.at(-1), c('B', 'A', 99999));
  assert.equal(list[0].at, 1);
});

test('pair choice: two different texts, never the pair just shown, unseen texts first', () => {
  const rand = prng(5);
  assert.equal(nextPair(['A'], []), null);
  assert.deepEqual(new Set(nextPair(['A', 'B'], [], { last: pairKey('A', 'B'), rand })), new Set(['A', 'B']), 'only one pair: it repeats');
  for (let k = 0; k < 200; k++) {
    const p = nextPair(pool, [], { last: pairKey('A', 'B'), rand });
    assert.equal(p.length, 2); assert.notEqual(p[0], p[1]);
    assert.notEqual(pairKey(...p), pairKey('A', 'B'));
  }
  // A, B and C have been compared a lot; D and E never: the next pair has one of them.
  const ch = [...times(5, 'A', 'B'), ...times(5, 'B', 'C'), ...times(5, 'A', 'C'), ...times(2, 'C', 'A')];
  for (let k = 0; k < 100; k++) { const p = nextPair(pool, ch, { rand }); assert.ok(p.includes('D') || p.includes('E'), p.join()); }
});

test('pair choice: an uncertain pair is preferred to a settled one, with some variety', () => {
  // A beat B twenty times; C and D are a toss-up seen twice.
  const ch = [...times(20, 'A', 'B'), c('C', 'D'), c('D', 'C')];
  const rand = prng(11), seen = new Map();
  for (let k = 0; k < 300; k++) { const key = pairKey(...nextPair(['A', 'B', 'C', 'D'], ch, { rand })); seen.set(key, (seen.get(key) || 0) + 1); }
  assert.ok(!seen.has(pairKey('A', 'B')) || seen.get(pairKey('A', 'B')) < 20, JSON.stringify([...seen]));
  assert.ok(seen.size >= 3, `variety: ${seen.size} pairs`);
  // Simulated play never asks the same pair twice in a row.
  let last = null, history = [];
  for (let k = 0; k < 60; k++) {
    const [a, b] = nextPair(pool, history, { last, rand });
    assert.notEqual(pairKey(a, b), last);
    last = pairKey(a, b);
    history = addChoice(history, a < b ? a : b, a < b ? b : a, k);
  }
});

test('fast enough for a full programme: 225 texts and 2000 choices', () => {
  const ids = Array.from({ length: 225 }, (_, i) => `w${i}`), rand = prng(1);
  const ch = Array.from({ length: 2000 }, (_, k) => { const a = Math.floor(rand() * 225), b = (a + 1 + Math.floor(rand() * 224)) % 225; return c(ids[Math.min(a, b)], ids[Math.max(a, b)], k); });
  const t0 = performance.now(), r = results(ids, ch, { seed: 1 }), t1 = performance.now();
  nextPair(ids, ch, { posterior: r.posterior, rand });
  const t2 = performance.now();
  assert.equal(r.rows.length, 225);
  console.log(`  fit and 400 draws: ${(t1 - t0).toFixed(0)} ms; next pair: ${(t2 - t1).toFixed(0)} ms`);
  assert.ok(t1 - t0 < 5000);
});

test('the ⓘ on a card is its own button outside the choose button: it shows the description and never chooses', () => {
  const work = { id: 'P01', title: 'A <poem>', author: 'Someone', category: 'poem', day: 1, description: 'About birds.', mine: { status: 'done', rating: 2 } };
  const html = islandCard(work, 'S02');
  const choose = /<button type="button" class="island-choose"[\s\S]*?<\/button>/.exec(html)[0];
  assert.match(choose, /data-island-pick="P01" data-island-other="S02"/);
  assert.doesNotMatch(choose, /island-info|About birds/, 'the ⓘ and the description are not inside the choose button');
  const info = /<button[^>]*class="island-info"[^>]*>/.exec(html)[0];
  assert.doesNotMatch(info, /data-island-pick/);
  assert.match(info, /data-island-tip="P01" aria-expanded="false"/);
  assert.doesNotMatch(html, /tip-open/, 'closed by default');
  assert.match(islandCard(work, 'S02', true), /island-card tip-open/);
  assert.match(html, /A &lt;poem&gt;/);
  // Not checked off, or no description: no ⓘ at all.
  assert.doesNotMatch(islandCard({ ...work, mine: { status: 'reading' } }, 'S02'), /island-info/);
  assert.doesNotMatch(islandCard({ ...work, description: '' }, 'S02'), /island-info/);
  const row = islandRow(work, { place: 1, mean: 0.5, sd: 0.4, stars: 5, low: 4, high: 5, comparisons: 3, wins: 3 });
  assert.match(row, /data-island-tip="P01"/);
  assert.match(row, /your stars 2 ★/);
  assert.match(row, /likely 4 to 5 ★ · strength \+0\.50 ± 0\.40 · 3 choices, 3 won/);
});
