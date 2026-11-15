import { esc } from './text.mjs';
import { showDescription } from './description.mjs';
import { quantileScore, rankStars, tieBreak } from './ranking.mjs';

// Desert island (SPEC.md "Desert island"): a member picks, from two texts they
// have checked off, the one they would take to a desert island. Every choice
// is one more observation in a Bayesian Bradley-Terry model, and the ranking
// it implies suggests stars from 1 to 5. Pure functions, no libraries; only
// the choices are stored, everything here is recomputed from them. Nothing
// here writes a rating.
//
// The model. Each text i has a strength theta_i with the same prior for every
// text, theta_i ~ N(0, PRIOR_SD^2), independent (flat: no text starts ahead,
// the member's stars play no part). A choice of i over j has the likelihood
// P(i over j) = logistic(theta_i - theta_j). The posterior is fitted afresh
// from the whole history, so the order of the choices does not matter: Newton's
// method to the most probable strengths (MAP), then the Laplace approximation,
// a normal with the inverse Hessian as covariance. PRIOR_SD = 1 means that
// before any choice two texts are a coin toss and a strong favourite beats a
// weak one about 9 times in 10 (a gap of 2 SD); it also keeps the fit finite
// when one text has won every time.

export const PRIOR_SD = 1;
export const MAX_CHOICES = 5000;
export const STAR_LOW = 1, STAR_HIGH = 5;
// The star range shown as "likely": the middle 80 % of the posterior draws.
export const INTERVAL = 0.8;
export const SAMPLES = 400;
const ID = /^[A-Za-z0-9-]{1,40}$/;

// One stored choice: { w: chosen text id, l: the other one, at: client ms }.
export const validChoice = c => !!c && typeof c === 'object' && Object.keys(c).length === 3 && typeof c.w === 'string' && ID.test(c.w)
  && typeof c.l === 'string' && ID.test(c.l) && c.w !== c.l && Number.isInteger(c.at) && c.at >= 0;
export const validChoices = list => Array.isArray(list) && list.length <= MAX_CHOICES && list.every(validChoice);
// Adding a choice keeps the newest MAX_CHOICES.
export const addChoice = (list, w, l, at) => [...list, { w, l, at }].slice(-MAX_CHOICES);

// The 1..5 bell curve of My ranking's score (client/ranking.mjs), stretched:
// top 5, bottom 1, middle 3. `i` may be fractional (the mean place of a tie).
export const starScore = (i, n) => quantileScore(i, n, STAR_LOW, STAR_HIGH);

const logistic = x => x >= 0 ? 1 / (1 + Math.exp(-x)) : Math.exp(x) / (1 + Math.exp(x));
const log1pexp = x => x > 0 ? x + Math.log1p(Math.exp(-x)) : Math.log1p(Math.exp(x));

// Choices between two texts both in the pool; a text no longer checked off
// drops out and its old choices are ignored while it is out.
export function activeChoices(pool, choices) {
  const inPool = new Set(pool);
  return (Array.isArray(choices) ? choices : []).filter(c => validChoice(c) && inPool.has(c.w) && inPool.has(c.l));
}

// Cholesky factor of a symmetric positive definite n x n matrix (row major):
// lower triangular L with A = L L^T.
function cholesky(a, n) {
  const l = new Float64Array(n * n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let s = a[i * n + j];
      for (let k = 0; k < j; k++) s -= l[i * n + k] * l[j * n + k];
      l[i * n + j] = i === j ? Math.sqrt(Math.max(s, 1e-300)) : s / l[j * n + j];
    }
  }
  return l;
}
// Solve L y = b, then L^T x = y.
function forward(l, n, b) {
  const y = new Float64Array(n);
  for (let i = 0; i < n; i++) { let s = b[i]; for (let k = 0; k < i; k++) s -= l[i * n + k] * y[k]; y[i] = s / l[i * n + i]; }
  return y;
}
function backward(l, n, y) {
  const x = new Float64Array(n);
  for (let i = n - 1; i >= 0; i--) { let s = y[i]; for (let k = i + 1; k < n; k++) s -= l[k * n + i] * x[k]; x[i] = s / l[i * n + i]; }
  return x;
}
// The inverse of A = L L^T: (L^-1)^T L^-1.
function inverse(l, n) {
  const m = new Float64Array(n * n); // L^-1, lower triangular
  for (let j = 0; j < n; j++) {
    m[j * n + j] = 1 / l[j * n + j];
    for (let i = j + 1; i < n; i++) {
      let s = 0;
      for (let k = j; k < i; k++) s -= l[i * n + k] * m[k * n + j];
      m[i * n + j] = s / l[i * n + i];
    }
  }
  const c = new Float64Array(n * n);
  for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) {
    let s = 0;
    for (let k = i; k < n; k++) s += m[k * n + i] * m[k * n + j];
    c[i * n + j] = s; c[j * n + i] = s;
  }
  return c;
}

// The posterior for a pool of text ids and a history of choices:
// { ids, mean, sd, cov (n x n, row major), chol (of the Hessian), comparisons,
//   wins, used }. `used` is the number of choices that count.
export function fit(pool, choices, { priorSd = PRIOR_SD } = {}) {
  const ids = [...new Set(pool)], n = ids.length, at = new Map(ids.map((id, i) => [id, i]));
  const active = activeChoices(ids, choices);
  // Wins per unordered pair: [i, j, wins of i, wins of j], i < j.
  const pairs = new Map(), wins = new Float64Array(n), comparisons = new Float64Array(n);
  for (const c of active) {
    const a = at.get(c.w), b = at.get(c.l), i = Math.min(a, b), j = Math.max(a, b), key = i * n + j;
    if (!pairs.has(key)) pairs.set(key, [i, j, 0, 0]);
    pairs.get(key)[a === i ? 2 : 3]++;
    wins[a]++; comparisons[a]++; comparisons[b]++;
  }
  const list = [...pairs.values()], prec = 1 / (priorSd * priorSd);
  const objective = t => {
    let f = 0;
    for (let i = 0; i < n; i++) f += 0.5 * prec * t[i] * t[i];
    for (const [i, j, wi, wj] of list) { const d = t[i] - t[j]; f += wi * log1pexp(-d) + wj * log1pexp(d); }
    return f;
  };
  const hessian = t => {
    const h = new Float64Array(n * n), g = new Float64Array(n);
    for (let i = 0; i < n; i++) { h[i * n + i] = prec; g[i] = prec * t[i]; }
    for (const [i, j, wi, wj] of list) {
      const p = logistic(t[i] - t[j]), r = (wi + wj) * p - wi, q = (wi + wj) * p * (1 - p);
      g[i] += r; g[j] -= r;
      h[i * n + i] += q; h[j * n + j] += q; h[i * n + j] -= q; h[j * n + i] -= q;
    }
    return { h, g };
  };
  // Newton's method on the negative log posterior (convex), halving a step
  // that does not improve it.
  let theta = new Float64Array(n);
  for (let iter = 0; iter < 100 && list.length; iter++) {
    const { h, g } = hessian(theta), l = cholesky(h, n), step = backward(l, n, forward(l, n, g));
    let size = 1, next, f0 = objective(theta);
    for (let k = 0; k < 30; k++) {
      next = theta.map((x, i) => x - size * step[i]);
      if (objective(next) <= f0 + 1e-12) break;
      size /= 2;
    }
    const moved = Math.max(0, ...next.map((x, i) => Math.abs(x - theta[i])));
    theta = next;
    if (moved < 1e-10) break;
  }
  const { h } = hessian(theta), chol = cholesky(h, n), cov = inverse(chol, n);
  return { ids, mean: theta, sd: ids.map((_, i) => Math.sqrt(cov[i * n + i])), cov, chol, comparisons, wins, used: active.length };
}

// A small seeded generator (mulberry32) and normal draws (Box-Muller), so the
// intervals do not change between two renders of the same history.
export function prng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const normal = rand => { let u = 0; while (u === 0) u = rand(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand()); };

// Places by posterior mean, top first: each id's place (0-based), with tied
// means sharing their mean place, so with no choices every text is in the middle.
function places(ids, mean) {
  const order = ids.map((_, i) => i).sort((a, b) => mean[b] - mean[a] || (ids[a] < ids[b] ? -1 : 1));
  const place = new Float64Array(ids.length);
  for (let s = 0; s < order.length;) {
    let e = s;
    while (e + 1 < order.length && Math.abs(mean[order[e + 1]] - mean[order[s]]) < 1e-9) e++;
    for (let k = s; k <= e; k++) place[order[k]] = (s + e) / 2;
    s = e + 1;
  }
  return { order, place };
}

// The results: per text, top first, { id, mean, sd, place (1-based), score
// (1.0 to 5.0), stars (whole), low, high (the 80 % star range from posterior
// draws), comparisons, wins }; and how settled the list is: `single` = texts
// whose range is one star, `width` = mean range width in stars.
export function results(pool, choices, { seed = 1, samples = SAMPLES, priorSd = PRIOR_SD, posterior } = {}) {
  const f = posterior || fit(pool, choices, { priorSd }), n = f.ids.length;
  if (!n) return { rows: [], used: f.used, single: 0, width: 0, posterior: f };
  const { order, place } = places(f.ids, f.mean);
  // Draws theta = MAP + L^-T z have the covariance H^-1 = (L L^T)^-1.
  const rand = prng(seed), counts = Array.from({ length: n }, () => new Uint16Array(STAR_HIGH + 1));
  const starAt = Array.from({ length: n }, (_, k) => rankStars(starScore(k, n)));
  for (let s = 0; s < samples; s++) {
    const z = new Float64Array(n);
    for (let i = 0; i < n; i++) z[i] = normal(rand);
    const d = backward(f.chol, n, z), draw = f.mean.map((m, i) => m + d[i]);
    const ranked = f.ids.map((_, i) => i).sort((a, b) => draw[b] - draw[a]);
    ranked.forEach((i, k) => counts[i][starAt[k]]++);
  }
  const tail = samples * (1 - INTERVAL) / 2;
  const rows = order.map((i, k) => {
    let low = STAR_LOW, high = STAR_HIGH, below = 0, above = 0;
    while (low < STAR_HIGH && below + counts[i][low] <= tail) below += counts[i][low++];
    while (high > low && above + counts[i][high] <= tail) above += counts[i][high--];
    const score = starScore(place[i], n);
    return { id: f.ids[i], mean: f.mean[i], sd: f.sd[i], place: k + 1, score, stars: rankStars(score), low, high, comparisons: f.comparisons[i], wins: f.wins[i] };
  });
  return { rows, used: f.used, single: rows.filter(r => r.low === r.high).length,
    width: rows.reduce((a, r) => a + r.high - r.low, 0) / n, posterior: f };
}

// P(i is preferred to j) under the posterior mean, and the variance of the
// difference of their strengths.
export function pairOdds(f, a, b) {
  const n = f.ids.length, i = f.ids.indexOf(a), j = f.ids.indexOf(b);
  return { p: logistic(f.mean[i] - f.mean[j]), v: f.cov[i * n + i] + f.cov[j * n + j] - 2 * f.cov[i * n + j] };
}
export const pairKey = (a, b) => a < b ? `${a}|${b}` : `${b}|${a}`;

// The next pair to show: active, not uniform. A pair is worth asking when its
// outcome is uncertain (P near 0.5) and the gap between the two is not known
// well (a large posterior variance of theta_i - theta_j). Its worth is the
// variance the answer is expected to remove from that gap, q v^2 / (1 + q v)
// with q = p (1 - p): the Laplace update of one more observation. A text with
// few comparisons has a wide posterior, so it comes up soon by itself. The
// pick is random among the best few, in proportion to worth, so it does not
// loop on one pair; never the pair just shown (`last`, a pairKey) unless it is
// the only one. Returns [left, right] in a random order, or null.
export const PAIR_POOL = 8;
export function nextPair(pool, choices, { last = null, rand = Math.random, posterior } = {}) {
  const f = posterior || fit(pool, choices), n = f.ids.length;
  if (n < 2) return null;
  const best = [];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    if (n > 2 && pairKey(f.ids[i], f.ids[j]) === last) continue;
    const p = logistic(f.mean[i] - f.mean[j]), q = p * (1 - p), v = f.cov[i * n + i] + f.cov[j * n + j] - 2 * f.cov[i * n + j];
    // A whisper of noise breaks exact ties (no choices yet) at random.
    const worth = q * v * v / (1 + q * v) * (1 + 1e-6 * rand());
    if (best.length < PAIR_POOL || worth > best[best.length - 1].worth) {
      best.push({ i, j, worth });
      best.sort((x, y) => y.worth - x.worth);
      if (best.length > PAIR_POOL) best.pop();
    }
  }
  const total = best.reduce((a, x) => a + x.worth, 0);
  let r = rand() * total, pick = best[0];
  for (const x of best) { r -= x.worth; if (r <= 0) { pick = x; break; } }
  const pair = [f.ids[pick.i], f.ids[pick.j]];
  return rand() < 0.5 ? pair : pair.reverse();
}

// A seed for the posterior draws: the member and the history's length, so the
// intervals stay put until the next choice.
export const drawSeed = (uid, choices, pool) => tieBreak(uid || '', `${choices.length}:${pool.length}:${choices.at(-1)?.at ?? 0}`);

// ---------- the view's pieces (client/app.mjs draws the page around them)

const TYPE = { poem: 'Poem', story: 'Story', essay: 'Essay' };
const day = d => `Day ${String(d).padStart(2, '0')}`;
export const starRange = r => r.low === r.high ? `${r.low} ★` : `${r.low} to ${r.high} ★`;

// The ⓘ button and the description it shows, as on My ranking
// (client/ranking.mjs, rankTitle): hover or keyboard focus on a desktop, a tap
// toggles it on a phone (`open`). Only for a text with a description that the
// member has checked off (client/description.mjs), which every pool text is.
// The box that opens is the nearest [data-island-tipbox].
function info(work, open, where) {
  if (!showDescription(work)) return '';
  const tip = `itip-${where}-${esc(work.id)}`;
  return `<button type="button" class="island-info" data-island-tip="${esc(work.id)}" aria-expanded="${open}" aria-describedby="${tip}" aria-label="About “${esc(work.title)}”"><span aria-hidden="true">ⓘ</span></button><span class="island-tip" role="tooltip" id="${tip}">${esc(work.description.trim())}</span>`;
}

// One of the two texts. The big button chooses it; the ⓘ beside it only
// shows the description and never chooses. `work` has id, title, author,
// category, day and, once checked off, its description.
export function islandCard(work, other, open = false) {
  return `<div class="island-card${open && showDescription(work) ? ' tip-open' : ''}" data-island-tipbox="${esc(work.id)}">
    <button type="button" class="island-choose" data-island-pick="${esc(work.id)}" data-island-other="${esc(other)}">
      <span class="genre ${esc(work.category)}">${TYPE[work.category] || esc(work.category)} · ${day(work.day)}</span>
      <span class="island-title">${esc(work.title)}</span>
      <span class="island-author">${esc(work.author)}</span>
    </button>${info(work, open, 'card')}
  </div>`;
}

// One row of the results: place, title (with its ⓘ), the member's own stars
// beside the suggestion, the likely range and the strength with its
// uncertainty.
export function islandRow(work, r, open = false) {
  const mine = work.mine?.rating;
  const yours = Number.isInteger(mine) ? `your stars ${mine} ★` : 'not rated';
  return `<li class="rank-item island-row${open && showDescription(work) ? ' tip-open' : ''}" data-island-id="${esc(work.id)}" data-island-tipbox="${esc(work.id)}">
    <span class="rank-position">${r.place}</span>
    <span class="rank-info"><span class="island-row-title"><span class="rank-title">${esc(work.title)}</span>${info(work, open, 'row')}</span>
      <span class="rank-meta">${esc(work.author)} · ${TYPE[work.category] || esc(work.category)}, ${day(work.day)} · ${yours}</span>
      <span class="rank-meta island-stats">likely ${starRange(r)} · strength ${r.mean >= 0 ? '+' : '−'}${Math.abs(r.mean).toFixed(2)} ± ${r.sd.toFixed(2)} · ${r.comparisons} ${r.comparisons === 1 ? 'choice' : 'choices'}, ${r.wins} won</span></span>
    <span class="rank-score island-stars score-${r.stars >= 4 ? 'high' : r.stars >= 3 ? 'mid' : 'low'}" aria-label="Suggested ${r.stars} stars, likely ${r.low} to ${r.high}"><span aria-hidden="true">★</span>${r.stars}</span>
  </li>`;
}
