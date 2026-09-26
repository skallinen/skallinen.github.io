import { esc } from './text.mjs';

// Stars 1 to 5 are exactly the five stars, touching, so a tap between two hits
// the nearer one. Zero is a real rating, offered as its own choice well below
// the stars (a slightly low tap on star 1 lands on the status line, not on it).
// One status line says the state: "Not rated" or "N / 5".
// `pending` is a rating chosen after finishing that waits for "Save changes".
export function ratingControl(work, disabled = false, pending = undefined) {
  const saved = work.mine?.rating ?? null;
  const rating = pending !== undefined ? pending : saved;
  const unsaved = pending !== undefined && pending !== saved;
  const button = (value, label, text, classes = '') => `<button type="button" class="rating-button ${classes}" data-rate="${esc(work.id)}" data-rating="${value}"${label ? ` aria-label="${label}"` : ''} aria-pressed="${rating === value}" ${disabled ? 'disabled' : ''}>${text}</button>`;
  return `<section class="rating-control" aria-label="Your rating for ${esc(work.title)}"><div class="rating-label">Your rating <span>${work.revealed ? 'Shared with finished readers' : 'Private until you finish'}</span></div>
    <div class="rating-options" role="group" aria-label="Choose 0 to 5 stars">
      <div class="rating-stars">${[1,2,3,4,5].map(n => button(n, `${n} ${n === 1 ? 'star' : 'stars'}`, `<span aria-hidden="true">${rating !== null && n <= rating ? '★' : '☆'}</span>`, `rating-star${rating !== null && n <= rating ? ' is-filled' : ''}`)).join('')}</div>
      <div class="rating-status"><span class="rating-value" aria-live="polite"><strong>${rating === null ? 'Not rated' : `${rating} / 5`}</strong>${unsaved ? ' <span class="rating-unsaved">(not saved yet)</span>' : ''}</span>
      ${rating === null || work.revealed ? '' : `<button type="button" class="rating-clear" data-rate="${esc(work.id)}" data-rating="clear" ${disabled ? 'disabled' : ''}>Remove rating</button>`}</div>
      <div class="rating-extra">${button(0, '', '<span class="choice-dot" aria-hidden="true"></span>0 stars: did not work for me', 'rating-zero')}</div>
    </div></section>`;
}

export function sharedRatings(collective) {
  const summary = collective?.ratings;
  if (!summary?.count) return '<p class="rating-summary">No ratings yet.</p>';
  return `<p class="rating-summary"><span aria-hidden="true">★</span> <strong>${summary.average.toFixed(1)} / 5</strong> average · ${summary.count} ${summary.count === 1 ? 'rating' : 'ratings'}</p>`;
}
