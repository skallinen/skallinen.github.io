import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFeed, parseChapters, matchChapters, patternFrom, podcastRecord, episodeFor, chapterAt, clock, seconds } from '../client/podcast.mjs';

// The feed host's shape, with a made-up host and token.
const base = 'https://podcast.example/f/TOKEN';
const item = (day, chapters, extraTitle = '') => `<item><title>Day ${String(day).padStart(2, '0')}\u2014${extraTitle}</title>
  <content:encoded>&lt;p&gt;Notes&lt;/p&gt;&lt;h3&gt;Chapters&lt;/h3&gt;&lt;ul&gt;${chapters.map(([t, n]) => `&lt;li&gt;${t}\u2014${n}&lt;/li&gt;`).join('')}&lt;/ul&gt;</content:encoded>
  <enclosure url="${base}/episodes/daily-dose-day-${String(day).padStart(2, '0')}.mp3" length="1" type="audio/mpeg" />
  <itunes:duration>50:50</itunes:duration><itunes:episode>${day}</itunes:episode></item>`;
const xml = `<rss><channel><title>Daily Dose</title>${item(6, [['0:20', 'Tracks'], ['1:05', 'Comma'], ['25:25', 'An Apology for Idlers'], ['50:33', 'Closing']])}
  ${item(3, [['0:19', 'old pond'], ['0:37', 'The Tell-Tale Heart'], ['13:07', 'Why I Wrote “The Yellow Wall-Paper”'], ['16:05', 'Closing']])}</channel></rss>`;
const works = [
  { id: 'P32', day: 6, category: 'poem', title: 'Tracks' }, { id: 'S25', day: 6, category: 'story', title: 'Comma' },
  { id: 'E33', day: 6, category: 'essay', title: 'An Apology for Idlers' },
  { id: 'P34', day: 3, category: 'poem', title: 'old pond' }, { id: 'S27', day: 3, category: 'story', title: 'The Tell-Tale Heart' },
  { id: 'E12', day: 3, category: 'essay', title: 'Why I Wrote The Yellow Wall-Paper' },
];

test('times read and print as the feed writes them', () => {
  assert.equal(seconds('50:50'), 3050); assert.equal(seconds('1:02:03'), 3723); assert.equal(seconds('x'), null);
  assert.equal(clock(65), '1:05'); assert.equal(clock(3723), '1:02:03');
});

test('the feed gives one episode per day with its audio and chapters', () => {
  const eps = parseFeed(xml);
  assert.deepEqual(eps.map(e => e.day), [6, 3]);
  assert.equal(eps[0].url, `${base}/episodes/daily-dose-day-06.mp3`);
  assert.equal(eps[0].duration, 3050);
  assert.deepEqual(eps[0].chapters.map(c => c.at), [20, 65, 1525, 3033]);
  assert.deepEqual(parseChapters('<p>no chapters</p>'), []);
});

test('chapters map to the day’s texts by title, ignoring quotes; the closing is kept apart', () => {
  const m = matchChapters(parseFeed(xml)[1].chapters, works.filter(w => w.day === 3));
  assert.deepEqual(m.chapters, [{ work: 'P34', at: 19 }, { work: 'S27', at: 37 }, { work: 'E12', at: 787 }]);
  assert.equal(m.closing, 965); assert.deepEqual(m.unmatched, []);
  // Retitled chapters fall back to the poem, story, essay order.
  const byOrder = matchChapters([{ at: 1, title: 'A' }, { at: 2, title: 'B' }, { at: 3, title: 'C' }, { at: 9, title: 'End' }], works.filter(w => w.day === 6));
  assert.deepEqual(byOrder.chapters.map(c => c.work), ['P32', 'S25', 'E33']); assert.equal(byOrder.closing, 9);
});

test('the record holds the feed, a day pattern and the synced episodes', () => {
  const { record, report } = podcastRecord(`${base}/feed.xml`, xml, works, new Date('2026-09-27T12:00:00Z'));
  assert.equal(record.pattern, `${base}/episodes/daily-dose-day-{NN}.mp3`);
  assert.deepEqual(record.episodes.map(e => e.day), [3, 6]);
  assert.deepEqual(report.map(r => r.unmatched), [[], []]);
  assert.equal(patternFrom([{ day: 1, url: 'https://a/x.mp3' }]), null);
});

test('a day plays its synced episode, a pattern guess to be confirmed, or nothing', () => {
  const { record } = podcastRecord(`${base}/feed.xml`, xml, works);
  const six = episodeFor(record, 6);
  assert.equal(six.confirmed, true); assert.equal(six.chapters.length, 3);
  const seven = episodeFor(record, 7);
  assert.equal(seven.confirmed, false); assert.equal(seven.url, `${base}/episodes/daily-dose-day-07.mp3`);
  assert.equal(episodeFor({ feed: 'x', episodes: [] }, 7), null);
  assert.equal(episodeFor(null, 1), null);
  assert.equal(episodeFor({ episodes: [{ day: 1, url: 'javascript:alert(1)' }] }, 1), null);
  assert.equal(chapterAt(six, 10), null); assert.equal(chapterAt(six, 70), 'S25'); assert.equal(chapterAt(six, 3040), null);
});
