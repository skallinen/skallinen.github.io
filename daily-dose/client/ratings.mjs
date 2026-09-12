import { esc } from './text.mjs';

export function ratingControl(work, disabled = false) {
  const rating = work.mine?.rating ?? null;
  const button = (value, label, text, classes = '') => `<button type="button" class="rating-button ${classes}" data-rate="${esc(work.id)}" data-rating="${value}" aria-label="${label}" aria-pressed="${rating === value}" ${disabled ? 'disabled' : ''}>${text}</button>`;
  return `<section class="rating-control" aria-label="Your rating for ${esc(work.title)}"><div class="rating-label">Your rating <span>${work.revealed ? 'Shared with the club' : 'Private until the reveal'}</span></div>
    <div class="rating-options" role="group" aria-label="Choose 0 to 5 stars">
      ${button(0, '0 stars', '0', 'rating-zero')}
      ${[1,2,3,4,5].map(n => button(n, `${n} ${n === 1 ? 'star' : 'stars'}`, '<span aria-hidden="true">★</span>', rating !== null && n <= rating ? 'is-filled' : '')).join('')}
      <span class="rating-value" aria-live="polite">${rating === null ? 'Not rated' : `${rating} / 5`}</span>
      ${rating === null ? '' : `<button type="button" class="text-button rating-clear" data-rate="${esc(work.id)}" data-rating="clear" aria-label="Clear rating" ${disabled ? 'disabled' : ''}>Clear</button>`}
    </div></section>`;
}

export function sharedRatings(collective) {
  const summary = collective?.ratings;
  if (!summary?.count) return '<p class="rating-summary">No ratings yet.</p>';
  return `<p class="rating-summary"><span aria-hidden="true">★</span> <strong>${summary.average.toFixed(1)} / 5</strong> · ${summary.count} ${summary.count === 1 ? 'rating' : 'ratings'}</p>`;
}
