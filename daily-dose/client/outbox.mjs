// The copy on this phone and the outbox (SPEC.md, "The box at first paint"
// and "Outbox for saves"). Pure helpers; client/app.mjs keeps the state and
// client/firestore.mjs decides a draft conflict inside its transaction.
// Tested in test/outbox.test.mjs.

// ---------- the copy on this phone
// After every load the page keeps today's three cards (title and the other
// card details, checked off or not, stars, one's own thought, whether one has
// finished) and the outline of the earlier days (text id, day, kind, title,
// author: what the grid needs), never the club's thoughts. The next load
// draws them at once, before sign-in and the network have answered.
export const COPY_KEY = 'daily-dose-paint';
const CARD = ['id', 'day', 'category', 'minutes', 'title', 'author', 'country', 'year', 'description', 'closeAt', 'date', 'mine', 'revealed', 'revealReason'];
const pick = (w, keys) => Object.fromEntries(keys.filter(k => w[k] !== undefined).map(k => [k, w[k]]));

export function paintCopy(feed, { uid, name = '', clubId, clubs = [] } = {}) {
  const today = feed?.campaign && feed.days?.find(d => d.today);
  if (!uid || !clubId || !today || today.works.some(w => w.loading)) return null;
  const days = feed.days.map(d => ({ number: d.number, date: d.date, today: !!d.today,
    works: d.today ? d.works.map(w => pick(w, CARD)) : d.works.map(w => ({ ...pick(w, ['id', 'day', 'category', 'title', 'author']), loading: true })) }));
  return { v: 1, uid, name, clubId, clubs: clubs.map(c => ({ id: c.id, name: c.name })),
    feed: { club: feed.club, me: feed.me, organizer: !!feed.organizer, edition: feed.edition, campaign: feed.campaign, podcast: feed.podcast, days, loading: true, cached: true } };
}

// The copy can be drawn when it is in shape and is of today in the club's
// timezone (after midnight there are new texts, which the copy does not have).
export function usableCopy(copy, now = new Date()) {
  const c = copy?.feed?.campaign;
  if (copy?.v !== 1 || typeof copy.uid !== 'string' || typeof copy.clubId !== 'string' || !c || !Array.isArray(copy.feed.days)) return false;
  try { return new Intl.DateTimeFormat('en-CA', { timeZone: c.timezone }).format(now) === c.today; } catch { return false; }
}

// ---------- the outbox
// Check-off, stars, Finish & reveal (and Save changes), Mark as unread and
// its Undo wait on this phone (localStorage) until the server has them, so
// their order survives a reload; drafts wait in their own device copy, as
// before. Opening a text ('start') is retried but not kept.
export const OUTBOX_ACTIONS = ['complete', 'restore', 'unread', 'rate', 'submit'];
export const outboxEntries = list => Array.isArray(list)
  ? list.filter(e => e && typeof e.id === 'string' && typeof e.k === 'string' && OUTBOX_ACTIONS.includes(e.payload?.action)) : [];

// A failure that means "not connected" (no network, the server out of reach,
// not signed in yet): the write waits and is tried again. Anything else (a
// refusal by the rules, an invalid write) is an error to show.
const NOT_CONNECTED = new Set(['unavailable', 'deadline-exceeded', 'cancelled', 'unknown', 'internal', 'resource-exhausted', 'aborted']);
export const notConnected = (error, { signedIn = true, online = true } = {}) =>
  !signedIn || !online || NOT_CONNECTED.has(error?.code) || /client is offline|network/i.test(error?.message || '');

// Waits between tries: 2, 4, 8, 16 s, then every 30 s; going online tries at once.
export const retryDelay = attempt => Math.min(30000, 2000 * 2 ** Math.min(Math.max(0, attempt), 4));

// A draft sent from this device carries the thought the server had when the
// draft was begun here (`base`) and when it was last typed (`at`, server
// time). If the row now holds a different thought that is neither, another
// device of one's own saved it: the newer typing wins. 'mine': this one is
// written; 'theirs': the row keeps the other device's; null: no conflict.
export function draftConflict(row, { comment, base, at } = {}) {
  if (typeof base !== 'string') return null;
  const theirs = row?.comment ?? '';
  if (theirs === base.trim() || theirs === String(comment ?? '').trim()) return null;
  return Number.isFinite(row?.commentAt) && Number.isFinite(at) && row.commentAt > at ? 'theirs' : 'mine';
}
