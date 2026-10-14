import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { operatorRequest, firestoreBase, project } from './firebase-operator.mjs';
import { descriptionProblems } from '../client/description.mjs';

// Stores each text's short description (at most 280 code points, see
// client/description.mjs) as the field `description` on its private
// works/{work} document, which members can read only once the text is
// released. DRY RUN by default; --apply writes that one field on each text
// whose description differs, in one atomic commit, and nothing else.
//
//   node scripts/sync-descriptions.mjs                    # dry run
//   node scripts/sync-descriptions.mjs --apply
//   node scripts/sync-descriptions.mjs FILE.json [--apply]
//
// The descriptions file lives in the private editorial workspace
// (~/common/projects/daily-dose/descriptions.json, text id to description),
// never in this repository: descriptions give away the texts.

const club = 'o0CwucZDrZBOea1sNm9g';
const apply = process.argv.includes('--apply');
const file = process.argv.slice(2).find(a => a.endsWith('.json'))
  || process.env.DAILY_DOSE_DESCRIPTIONS || path.join(homedir(), 'common/projects/daily-dose/descriptions.json');
const descriptions = JSON.parse(readFileSync(file, 'utf8'));
const programPath = `dailyDose/${club}`;

const works = [];
let pageToken = '';
do {
  const params = new URLSearchParams({ pageSize: '300' });
  for (const f of ['day', 'category', 'title', 'description']) params.append('mask.fieldPaths', f);
  if (pageToken) params.set('pageToken', pageToken);
  const page = await operatorRequest(`${firestoreBase}/${programPath}/works?${params}`);
  for (const d of page.documents || []) works.push({ id: d.name.split('/').at(-1), day: Number(d.fields.day.integerValue),
    title: d.fields.title.stringValue, description: d.fields.description?.stringValue ?? null });
  pageToken = page.nextPageToken || '';
} while (pageToken);
if (works.length !== 150) throw new Error(`Expected 150 works, found ${works.length}.`);

const problems = descriptionProblems(descriptions, works.map(w => w.id));
if (problems.length) throw new Error(`The descriptions file is not ready:\n${problems.join('\n')}`);

const changed = works.filter(w => w.description !== descriptions[w.id]).sort((a, b) => a.day - b.day || a.id.localeCompare(b.id));
console.log(JSON.stringify({ file, works: works.length, alreadyStored: works.length - changed.length, toWrite: changed.length,
  writes: changed.map(w => ({ id: w.id, day: w.day, title: w.title, from: w.description, to: descriptions[w.id] })), apply }, null, 1));
if (apply && changed.length) {
  const writes = changed.map(w => ({
    update: { name: `projects/${project}/databases/(default)/documents/${programPath}/works/${w.id}`, fields: { description: { stringValue: descriptions[w.id] } } },
    updateMask: { fieldPaths: ['description'] },
    currentDocument: { exists: true },
  }));
  const result = await operatorRequest(`${firestoreBase}:commit`, { writes });
  console.log(`Stored ${result.writeResults.length} descriptions on ${programPath}/works at ${result.commitTime}.`);
}
