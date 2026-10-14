import { esc } from './text.mjs';
import { showDescription } from './description.mjs';

// My ranking, as in Bookrank (SPEC.md "My ranking"): a member's private order
// of the texts they have rated, and the stars that order gives each text.
// Only the order is stored; the scores are computed here, never saved.

// Inverse of the standard normal CDF (probit), Abramowitz & Stegun 26.2.23,
// accurate to about 4.5e-4; the same approximation as Bookrank's scoring.cljs.
// Symmetric by construction, probit(1 - p) === -probit(p), with the middle
// pinned to 0 (the approximation alone gives about 4e-4 there), so the middle
// of an odd list scores exactly 3.5.
export function probit(p) {
  if (p === 0.5) return 0;
  const sign = p < 0.5 ? -1 : 1, q = p < 0.5 ? p : 1 - p;
  const t = Math.sqrt(-2 * Math.log(q));
  return sign * (t - (2.515517 + 0.802853 * t + 0.010328 * t * t) / (1 + 1.432788 * t + 0.189269 * t * t + 0.001308 * t * t * t));
}

// The ranked score of position i (0 = top) in a list of n: Bookrank's bell
// curve (midpoint quantiles, docs/contexts/ranking/scoring.md section 1),
// rescaled to 2..5 instead of 1..5. Top 5.0, bottom 2.0, n = 1 gives 3.5, and
// the scores of a list average exactly 3.5. Null for an empty list.
export const RANK_LOW = 2, RANK_HIGH = 5;
export function rankScore(i, n) {
  if (!(n > 0)) return null;
  if (n === 1) return (RANK_LOW + RANK_HIGH) / 2;
  const z = probit(1 - (i + 0.5) / n), zMax = probit(1 - 0.5 / n), zMin = probit(0.5 / n);
  const raw = RANK_LOW + (RANK_HIGH - RANK_LOW) * (z - zMin) / (zMax - zMin);
  return Math.max(RANK_LOW, Math.min(RANK_HIGH, raw));
}
export const scoreLabel = s => s == null ? '' : s.toFixed(1);
// The whole stars a ranked score sets: the nearest whole star, halves up
// (3.5 becomes 4). The tiny allowance keeps a computed 3.4999999999 a half.
export const rankStars = s => Math.floor(s + 0.5 + 1e-9);
// Saving the list sets each text's rating to its ranked whole stars. Only the
// texts whose stars would change: [{ id, rating }]. `ratingOf` gives a text's
// current whole stars.
export function starChanges(order, ratingOf) {
  return order.map((id, i) => ({ id, rating: rankStars(rankScore(i, order.length)) })).filter(x => ratingOf(x.id) !== x.rating);
}
// Bookrank's bands, on the 2..5 scale: high from 4.0, mid from 3.0.
export const scoreBand = s => s >= 4 ? 'high' : s >= 3 ? 'mid' : 'low';

// A fixed random order inside a star group: a hash of the member and the text
// (FNV-1a), so the list never reshuffles on a reload or another device and
// every member gets their own shuffle.
export function tieBreak(uid, id) {
  let h = 0x811c9dc5;
  for (const ch of `${uid}:${id}`) h = Math.imul(h ^ ch.codePointAt(0), 0x01000193) >>> 0;
  return h;
}
const byStars = uid => (a, b) => b.rating - a.rating || tieBreak(uid, a.id) - tieBreak(uid, b.id) || (a.id < b.id ? -1 : 1);

// The ranked list. `rated` = [{ id, rating }] (whole stars, 0 to 5), `saved` =
// the stored order (text ids, top first) or null. Saved ids still rated keep
// their places; any other rated text goes below the last ranked text with as
// many stars or more (the top if there is none). Without a saved order this is
// simply stars descending with the fixed shuffle inside each group.
export function rankOrder(rated, saved, uid) {
  const byId = new Map(rated.filter(x => Number.isInteger(x.rating)).map(x => [x.id, x]));
  const seen = new Set();
  const list = (Array.isArray(saved) ? saved : []).filter(id => byId.has(id) && !seen.has(id) && seen.add(id)).map(id => byId.get(id));
  for (const x of [...byId.values()].filter(x => !seen.has(x.id)).sort(byStars(uid))) {
    let at = 0;
    list.forEach((y, i) => { if (y.rating >= x.rating) at = i + 1; });
    list.splice(at, 0, x);
  }
  return list.map(x => x.id);
}

// Text id -> { score, position (1-based), of } for a ranked order.
export function rankScores(order) {
  return new Map(order.map((id, i) => [id, { score: rankScore(i, order.length), position: i + 1, of: order.length }]));
}

const ordinal = n => { const s = n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] || 'th'; return `${n}${s}`; };

// The line under the rating on a rated card: the member's own ranked stars.
export function rankLine(r) {
  if (!r) return '';
  return `<p class="rank-line"><span class="rank-line-text">Your ranking: <span class="rank-star" aria-hidden="true">★</span> <strong>${scoreLabel(r.score)}</strong>, ${ordinal(r.position)} of ${r.of}</span> <button type="button" class="text-button" data-nav="ranking">My ranking</button></p>`;
}

// The title of a ranking row. With a description (client/description.mjs) it
// is a button that shows the description as a tooltip: on hover or keyboard
// focus on a desktop, and toggled by a tap (`open`), since a phone has no
// hover. Only the drag handle starts a drag, so the title never does.
function rankTitle(work, open) {
  if (!showDescription(work)) return `<span class="rank-title">${esc(work.title)}</span>`;
  const tip = `tip-${esc(work.id)}`;
  return `<button type="button" class="rank-title rank-tip-button" data-rank-tip="${esc(work.id)}" aria-expanded="${open}" aria-describedby="${tip}">${esc(work.title)}<span class="tip-mark" aria-hidden="true"> ⓘ</span></button><span class="rank-tip" role="tooltip" id="${tip}">${esc(work.description.trim())}</span>`;
}

// One row of the ranking list. `work` has title, author, category, day,
// mine.rating and its description, if any; `r` its place and score; `open`
// whether its description is shown (tapped open).
export function rankItem(work, r, categoryLabel, open = false) {
  const stars = work.mine?.rating;
  return `<li class="rank-item${open && showDescription(work) ? ' tip-open' : ''}" data-rank-id="${esc(work.id)}">
    <button type="button" class="drag-handle" data-drag="${esc(work.id)}" aria-label="Move “${esc(work.title)}”, place ${r.position} of ${r.of}. Drag, or use the arrow keys." aria-describedby="rank-help"><span aria-hidden="true">⠿</span></button>
    <span class="rank-position">${r.position}</span>
    <span class="rank-info">${rankTitle(work, open)}<span class="rank-meta">${esc(work.author)} · ${esc(categoryLabel)}, Day ${String(work.day).padStart(2, '0')} · ${stars === rankStars(r.score) ? `${stars} ★` : `${stars} ★ now, ${rankStars(r.score)} ★ when saved`}</span></span>
    <span class="rank-score score-${scoreBand(r.score)}" aria-label="${scoreLabel(r.score)} stars"><span aria-hidden="true">★</span>${scoreLabel(r.score)}</span>
  </li>`;
}
