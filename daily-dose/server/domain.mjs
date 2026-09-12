export class Problem extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

export function localDate(now, zone = 'Europe/Helsinki') {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date(now));
  const value = type => parts.find(p => p.type === type).value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function validDate(date) {
  return typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)
    && Number.isFinite(Date.parse(date)) && new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date;
}

export function addDays(date, count) {
  return new Date(Date.parse(`${date}T00:00:00Z`) + count * 86400000).toISOString().slice(0, 10);
}

export function dayNumber(start, today) {
  return Math.floor((Date.parse(`${today}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86400000) + 1;
}

export function validateSchedule(start, timezone, now) {
  if (!validDate(start) || typeof timezone !== 'string') throw new Problem(400, 'Choose a valid Day 1 date and timezone.');
  let today;
  try { today = localDate(now, timezone); } catch { throw new Problem(400, 'Choose a valid IANA timezone.'); }
  if (start < today) throw new Problem(400, 'Day 1 must be today or a future date.');
}

export function validateComment(value) {
  if (typeof value !== 'string' || Array.from(value).length > 140) {
    throw new Problem(400, 'Your comment can contain at most 140 characters.');
  }
  return value.trim();
}

export function validateRating(value) {
  if (value !== null && (!Number.isInteger(value) || value < 0 || value > 5)) {
    throw new Problem(400, 'Choose a whole-star rating from 0 to 5, or clear it.');
  }
  return value;
}

export function ratingSummary(rows) {
  const values = rows.map(r => r.rating).filter(v => Number.isInteger(v) && v >= 0 && v <= 5);
  return { count: values.length, average: values.length ? values.reduce((a, b) => a + b, 0) / values.length : null };
}

export function released(work, campaign, now) {
  return campaign && addDays(campaign.start_date, work.day - 1) <= localDate(now, campaign.timezone);
}
