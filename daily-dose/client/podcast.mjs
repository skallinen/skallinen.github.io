// The club's private reading podcast: one episode per day, the poem, story
// and essay read in that order, with chapter times in the show notes.
//
// The feed address carries a private token and this bundle is public (GitHub
// Pages), so the address never appears here. It lives on the programme
// document (`podcast`), which Firestore rules let only members read, and is
// written there by scripts/sync-podcast.mjs. The feed host sends no CORS
// headers, so the browser cannot read the feed itself: the sync script reads it
// and stores each episode's audio address and chapter times. <audio> needs no
// CORS, so playback goes straight to the feed host.
//
// Stored shape: podcast = { feed, pattern?, episodes: [{ day, url, duration,
// chapters: [{ work, at }], closing? }], syncedAt }. `pattern` (with {NN} for
// the two-digit day) covers episodes published after the last sync: the
// player then plays the whole day without chapter jumps, and only after the
// browser has confirmed the file exists.

const DASH = '\u2014';

export const clock = seconds => {
  const s = Math.max(0, Math.round(seconds)), h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, r = String(s % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${r}` : `${m}:${r}`;
};
export const seconds = text => {
  const parts = String(text ?? '').trim().split(':').map(Number);
  if (!parts.length || parts.some(n => !Number.isFinite(n) || n < 0)) return null;
  return parts.reduce((t, n) => t * 60 + n, 0);
};

const decode = s => String(s ?? '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&amp;/g, '&');
const tag = (xml, name) => { const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`)); return m ? decode(m[1]).trim() : null; };
const attr = (xml, name, key) => { const m = xml.match(new RegExp(`<${name}\\s[^>]*\\b${key}="([^"]*)"`)); return m ? decode(m[1]) : null; };
const plain = html => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

// "0:20 (dash) Tracks" lines under the notes' "Chapters" heading.
export function parseChapters(notes) {
  const html = String(notes ?? ''), start = html.search(/>\s*Chapters\s*</i);
  if (start < 0) return [];
  const out = [];
  for (const m of html.slice(start).matchAll(/<li>([\s\S]*?)<\/li>/g)) {
    const line = plain(m[1]), c = line.match(new RegExp(`^(\\d+(?::\\d{1,2}){1,2})\\s*[${DASH}\\u2013-]\\s*(.+)$`));
    if (c) out.push({ at: seconds(c[1]), title: c[2].trim() });
  }
  return out;
}

// RSS as the feed host writes it; a regular-expression reader, so the same
// code runs in Node (the sync script) and in tests without a DOM.
export function parseFeed(xml) {
  const items = [...String(xml).matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => m[1]);
  return items.map(item => {
    const title = tag(item, 'title') || '';
    const day = Number(tag(item, 'itunes:episode')) || Number(title.match(/\bDay\s+(\d+)/i)?.[1]) || null;
    return { day, title, url: attr(item, 'enclosure', 'url'), type: attr(item, 'enclosure', 'type'),
      duration: seconds(tag(item, 'itunes:duration')), chapters: parseChapters(tag(item, 'content:encoded') || tag(item, 'description')) };
  }).filter(e => e.day && e.url);
}

const norm = s => String(s ?? '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '');
const ORDER = ['poem', 'story', 'essay'];

// Chapters to the day's texts: by title, and by the fixed poem, story, essay
// order when every title fails but the count fits. Anything after the last
// text (the "Closing") is kept as `closing`.
export function matchChapters(chapters, works) {
  const byTitle = new Map(works.map(w => [norm(w.title), w]));
  const matched = chapters.map(c => ({ ...c, work: byTitle.get(norm(c.title))?.id ?? null }));
  let result = matched.filter(c => c.work);
  if (!result.length) {
    const sorted = [...works].sort((a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category));
    if (chapters.length >= sorted.length && sorted.length) result = sorted.map((w, i) => ({ ...chapters[i], work: w.id }));
  }
  const lastAt = result.at(-1)?.at;
  const closing = lastAt == null ? null : chapters.find((c, i) => c.at > lastAt && !matched[i].work && !result.some(r => r.at === c.at));
  return { chapters: result.map(c => ({ work: c.work, at: c.at })), closing: closing?.at ?? null,
    unmatched: works.filter(w => !result.some(c => c.work === w.id)).map(w => w.id) };
}

// The pattern from the enclosures seen: every address the same except the
// two-digit day. No common pattern, no guessing.
export function patternFrom(episodes) {
  const guesses = new Set(episodes.map(e => e.url.includes(String(e.day).padStart(2, '0')) ? e.url.replace(new RegExp(`${String(e.day).padStart(2, '0')}(?=[^/]*$)`), '{NN}') : null));
  return guesses.size === 1 && !guesses.has(null) ? [...guesses][0] : null;
}

// The whole podcast record for the programme document.
export function podcastRecord(feedUrl, feedXml, works, now = new Date()) {
  const byDay = new Map();
  for (const w of works) byDay.set(w.day, [...(byDay.get(w.day) || []), w]);
  const episodes = parseFeed(feedXml).filter(e => byDay.has(e.day)).sort((a, b) => a.day - b.day).map(e => {
    const m = matchChapters(e.chapters, byDay.get(e.day));
    return { day: e.day, url: e.url, duration: e.duration, chapters: m.chapters, ...(m.closing != null ? { closing: m.closing } : {}), unmatched: m.unmatched };
  });
  const pattern = patternFrom(episodes);
  return { record: { feed: feedUrl, ...(pattern ? { pattern } : {}), episodes: episodes.map(({ unmatched, ...e }) => e), syncedAt: now.toISOString() },
    report: episodes.map(e => ({ day: e.day, chapters: e.chapters.length, unmatched: e.unmatched })) };
}

// What the client shows for a day: a synced episode (with chapters), or the
// pattern's address (to be confirmed by the browser), or nothing.
export function episodeFor(podcast, day) {
  if (!podcast || !Number.isInteger(day)) return null;
  const e = (podcast.episodes || []).find(x => x.day === day);
  const safe = u => typeof u === 'string' && /^https?:\/\//.test(u) ? u : null;
  if (e && safe(e.url)) return { day, url: e.url, duration: e.duration ?? null, chapters: (e.chapters || []).filter(c => Number.isFinite(c.at)), closing: e.closing ?? null, confirmed: true };
  const url = safe(podcast.pattern?.replace('{NN}', String(day).padStart(2, '0')));
  return url && podcast.pattern.includes('{NN}') ? { day, url, duration: null, chapters: [], closing: null, confirmed: false } : null;
}

// The chapter playing at `t`, as a work id (null before the first text or in the closing).
export function chapterAt(episode, t) {
  if (!episode?.chapters?.length) return null;
  if (episode.closing != null && t >= episode.closing) return null;
  let current = null;
  for (const c of episode.chapters) if (t + 0.25 >= c.at) current = c.work;
  return current;
}
