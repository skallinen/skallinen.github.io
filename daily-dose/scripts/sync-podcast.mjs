import { operatorRequest, firestoreBase, encode } from './firebase-operator.mjs';
import { podcastRecord } from '../client/podcast.mjs';

// Stores the club's private podcast on the programme document, where only
// members can read it (see client/podcast.mjs). DRY RUN by default; --apply
// writes the one field `podcast` and nothing else.
//
//   node scripts/sync-podcast.mjs FEED_URL            # first time: dry run
//   node scripts/sync-podcast.mjs FEED_URL --apply
//   node scripts/sync-podcast.mjs --apply             # later: re-read the stored feed
//
// The feed address carries a private token: pass it on the command line (or
// DAILY_DOSE_PODCAST_FEED), never commit it. The browser cannot read the feed
// (its host sends no CORS headers), so re-run this after new episodes to give
// them chapter jumps; until then the app plays a new day whole, once the
// browser has confirmed the file exists.

const club = 'o0CwucZDrZBOea1sNm9g';
const apply = process.argv.includes('--apply');
const programPath = `dailyDose/${club}`;
const program = await operatorRequest(`${firestoreBase}/${programPath}`);
const stored = program.fields.podcast?.mapValue?.fields?.feed?.stringValue;
const feedUrl = process.argv.slice(2).find(a => /^https:\/\//.test(a)) || process.env.DAILY_DOSE_PODCAST_FEED || stored;
if (!feedUrl) throw new Error('Pass the feed URL (https://.../feed.xml).');

const works = [];
let pageToken = '';
do {
  const params = new URLSearchParams({ pageSize: '300' });
  for (const f of ['day', 'category', 'title']) params.append('mask.fieldPaths', f);
  if (pageToken) params.set('pageToken', pageToken);
  const page = await operatorRequest(`${firestoreBase}/${programPath}/works?${params}`);
  for (const d of page.documents || []) works.push({ id: d.name.split('/').at(-1), day: Number(d.fields.day.integerValue), category: d.fields.category.stringValue, title: d.fields.title.stringValue });
  pageToken = page.nextPageToken || '';
} while (pageToken);
if (works.length !== 150) throw new Error(`Expected 150 works, found ${works.length}.`);

const response = await fetch(feedUrl, { signal: AbortSignal.timeout(60000) });
if (!response.ok) throw new Error(`Feed: HTTP ${response.status}`);
const { record, report } = podcastRecord(feedUrl, await response.text(), works);
if (!record.episodes.length) throw new Error('The feed has no episodes that match programme days.');
const redact = s => s.replace(/\/f\/[^/]+\//, '/f/…/');
console.log(JSON.stringify({ feed: redact(feedUrl), pattern: record.pattern ? redact(record.pattern) : null, episodes: report, apply }, null, 1));
if (report.some(r => r.unmatched.length)) console.warn('Some texts have no chapter; they get no jump button.');
if (apply) {
  await operatorRequest(`${firestoreBase}/${programPath}?updateMask.fieldPaths=podcast&currentDocument.exists=true`, { fields: { podcast: encode(record) } }, 'PATCH');
  console.log(`Stored ${record.episodes.length} episodes on ${programPath}.podcast.`);
}
