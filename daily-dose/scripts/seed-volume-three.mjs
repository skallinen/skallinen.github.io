import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { project, operatorRequest, firestoreBase, encode } from './firebase-operator.mjs';
import { planVolumeThree } from './volume-three.mjs';

// Adds Volume Three (Days 51 to 75) to the running BBC programme. DRY RUN by
// default; --apply commits everything in one atomic write:
//   - 75 new works/{id} (metadata, description, openAt, closeAt), create-only
//   - 75 new private texts/{id}, create-only
//   - the programme's `boundaries` (51 -> 76) and `dayWorkIds` (50 -> 75),
//     with an update mask on just those two fields and a precondition on the
//     programme's update time, so a roster sync in between aborts it.
// Nothing of Days 1 to 50 is written: no existing work, text, read, rating,
// completion or openAt. Any existing new id aborts the whole commit.
//
//   node scripts/seed-volume-three.mjs                       # dry run
//   node scripts/seed-volume-three.mjs --out FILE.json        # dry run, keep the plan summary
//   node scripts/seed-volume-three.mjs --apply
//
// The export and descriptions are private, from the editorial workspace
// (~/common/projects/daily-dose: webapp/data/volume-3.json from
// webapp/export_volume3.py, and descriptions.json), never this repository.
// Override with VOLUME3=... and DESCRIPTIONS=...

const club = 'o0CwucZDrZBOea1sNm9g';
const apply = process.argv.includes('--apply');
const outIndex = process.argv.indexOf('--out');
const out = outIndex > 0 ? process.argv[outIndex + 1] : null;
const workspace = path.join(homedir(), 'common/projects/daily-dose');
const volume = JSON.parse(readFileSync(process.env.VOLUME3 || path.join(workspace, 'webapp/data/volume-3.json'), 'utf8'));
const descriptions = JSON.parse(readFileSync(process.env.DESCRIPTIONS || path.join(workspace, 'descriptions.json'), 'utf8'));
const programPath = `dailyDose/${club}`;
const docName = rel => `projects/${project}/databases/(default)/documents/${programPath}${rel}`;
const millis = v => Date.parse(v.timestampValue);
const iso = ms => new Date(ms).toISOString();

const program = await operatorRequest(`${firestoreBase}/${programPath}`);
const f = program.fields;
const storedBoundaries = f.boundaries?.arrayValue?.values || [];
const storedDays = f.dayWorkIds?.arrayValue?.values || [];
const programme = {
  startDate: f.startDate?.stringValue, timezone: f.timezone?.stringValue,
  boundaries: storedBoundaries.map(millis),
  dayWorkIds: storedDays.map(d => ({ ids: (d.mapValue.fields.ids.arrayValue.values || []).map(v => v.stringValue) })),
};

const works = [];
let pageToken = '';
do {
  const params = new URLSearchParams({ pageSize: '300' });
  for (const k of ['day', 'openAt']) params.append('mask.fieldPaths', k);
  if (pageToken) params.set('pageToken', pageToken);
  const page = await operatorRequest(`${firestoreBase}/${programPath}/works?${params}`);
  for (const d of page.documents || []) works.push({ id: d.name.split('/').at(-1), day: Number(d.fields.day.integerValue), updateTime: d.updateTime });
  pageToken = page.nextPageToken || '';
} while (pageToken);
if (works.length !== 150 || works.some(w => w.day < 1 || w.day > 50)) throw new Error(`Expected the 150 works of Days 1 to 50, found ${works.length}.`);

const plan = planVolumeThree({ volume, descriptions, programme, existingIds: works.map(w => w.id) });

// The two programme fields: the stored values verbatim, then the new ones.
const boundaryValues = [...storedBoundaries, ...plan.boundaries.slice(storedBoundaries.length).map(ms => ({ timestampValue: iso(ms) }))];
const dayValues = [...storedDays, ...plan.dayWorkIds.slice(storedDays.length).map(d => encode(d))];
const writes = [{
  update: { name: docName(''), fields: { boundaries: { arrayValue: { values: boundaryValues } }, dayWorkIds: { arrayValue: { values: dayValues } } } },
  updateMask: { fieldPaths: ['boundaries', 'dayWorkIds'] },
  currentDocument: { updateTime: program.updateTime },
}];
for (const w of plan.works) {
  writes.push({ update: { name: docName(`/works/${w.id}`), fields: { ...encode(w.work).mapValue.fields,
    openAt: { timestampValue: iso(w.openAt) }, closeAt: { timestampValue: iso(w.closeAt) }, revealedAt: { nullValue: null } } },
  currentDocument: { exists: false } });
  writes.push({ update: { name: docName(`/texts/${w.id}`), fields: encode(w.text).mapValue.fields }, currentDocument: { exists: false } });
}

// Proof that Days 1 to 50 stay as they are: every written path is new, and
// the programme's first 51 boundaries and 50 days are the stored values.
const oldPaths = new Set(works.flatMap(w => [docName(`/works/${w.id}`), docName(`/texts/${w.id}`)]));
const touchesOld = writes.filter(w => oldPaths.has(w.update.name)).length;
const keepsPrefix = JSON.stringify(boundaryValues.slice(0, storedBoundaries.length)) === JSON.stringify(storedBoundaries)
  && JSON.stringify(dayValues.slice(0, storedDays.length)) === JSON.stringify(storedDays);
if (touchesOld || !keepsPrefix) throw new Error('The plan would change Days 1 to 50; stop.');

const bytes = Buffer.byteLength(JSON.stringify({ writes }));
if (writes.length !== 151 || bytes > 9 * 1024 * 1024) throw new Error(`Unexpected size: ${writes.length} writes, ${bytes} bytes.`);
const day = n => plan.works.filter(w => w.day === n);
const summary = {
  club, programPath, apply, startDate: programme.startDate, timezone: programme.timezone,
  existing: { works: works.length, days: storedDays.length, boundaries: storedBoundaries.length, writtenTo: touchesOld, prefixKept: keepsPrefix },
  after: { works: works.length + plan.works.length, days: plan.dayWorkIds.length, boundaries: plan.boundaries.length },
  writes: { total: writes.length, programmeFields: ['boundaries', 'dayWorkIds'], newWorks: plan.works.length, newTexts: plan.works.length, bytes },
  day51OpensAt: iso(plan.works.find(w => w.day === 51).openAt), day75ClosesAt: iso(plan.boundaries.at(-1)),
  days: Array.from({ length: 25 }, (_, i) => 51 + i).map(n => ({ day: n, opens: iso(day(n)[0].openAt),
    works: day(n).map(w => ({ id: w.id, category: w.work.category, title: w.work.title, author: w.work.author, minutes: w.work.minutes, descriptionCodePoints: [...w.work.description].length })) })),
};
console.log(JSON.stringify(summary, null, 1));
if (out) writeFileSync(out, JSON.stringify(summary, null, 1) + '\n');
if (apply) {
  const result = await operatorRequest(`${firestoreBase}:commit`, { writes });
  console.log(JSON.stringify({ committed: result.writeResults.length, at: result.commitTime }));
}
