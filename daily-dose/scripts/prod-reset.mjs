import { operatorRequest, firestoreBase, project } from './firebase-operator.mjs';
import { scheduleDates } from '../client/calendar.mjs';

// Production reset for Daily Dose reading data. DRY RUN by default: it lists
// every document it would delete and every document it would write. Only
// --apply writes. Programme, works, texts, retired gates, club membership and
// all Bookrank data are never touched, and nothing outside dailyDose/ is read.
// Deletes carry updateTime preconditions, so a row that
// changes between listing and commit aborts that commit instead of vanishing.
//
//   node scripts/prod-reset.mjs                 # dry run, read-only
//   node scripts/prod-reset.mjs --apply         # delete reading data, set Day 1
//   node scripts/prod-reset.mjs --keep-sessions # leave clock-sync docs alone
//
// Day 1 is written exactly as the organiser's schedule() in client/firestore.mjs:
// programme {startDate, timezone, boundaries[51], updatedAt: server time} and each
// work in dayWorkIds[i] gets openAt = boundaries[i], closeAt = boundaries[i + 1].
// scheduleDates() refuses a Day 1 before today in that timezone, as the client does.

const club = 'o0CwucZDrZBOea1sNm9g';
const startDate = '2026-09-26';
const timezone = 'Europe/Helsinki';
const apply = process.argv.includes('--apply');
const keepSessions = process.argv.includes('--keep-sessions');
const docRoot = `projects/${project}/databases/(default)/documents`;
const programPath = `dailyDose/${club}`;
const known = new Set(['works', 'texts', 'gates', 'sessions', 'completions']);

async function listDocs(path, mask = []) {
  const out = [];
  let token = '';
  do {
    const params = new URLSearchParams({ pageSize: '300', showMissing: 'false' });
    for (const f of mask) params.append('mask.fieldPaths', f);
    if (token) params.set('pageToken', token);
    const page = await operatorRequest(`${firestoreBase}/${path}?${params}`);
    out.push(...(page.documents || []));
    token = page.nextPageToken || '';
  } while (token);
  return out;
}
async function collectionIds(path) {
  const ids = [];
  let pageToken;
  do {
    const page = await operatorRequest(`${firestoreBase}/${path}:listCollectionIds`, { pageSize: 100, ...(pageToken ? { pageToken } : {}) });
    ids.push(...(page.collectionIds || []));
    pageToken = page.nextPageToken;
  } while (pageToken);
  return ids;
}
async function pool(items, n, fn) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (next < items.length) { const i = next++; results[i] = await fn(items[i], i); } }));
  return results;
}
const rel = name => name.slice(docRoot.length + 1);
const val = f => f == null ? undefined : 'nullValue' in f ? null : f.stringValue ?? f.booleanValue ?? f.timestampValue ?? (f.integerValue != null ? Number(f.integerValue) : undefined);

// 1. Inspect. Only the one established programme is expected.
const programmes = await listDocs('dailyDose');
const surprises = [];
if (programmes.length !== 1 || rel(programmes[0].name) !== programPath) surprises.push(`dailyDose has ${programmes.length} programme docs: ${programmes.map(d => rel(d.name)).join(', ')}`);
const program = await operatorRequest(`${firestoreBase}/${programPath}`);
const pf = program.fields;
const dayWorkIds = pf.dayWorkIds.arrayValue.values.map(v => (v.mapValue.fields.ids.arrayValue.values || []).map(x => x.stringValue));
if (dayWorkIds.length !== 50) throw new Error(`Expected 50 programme days, found ${dayWorkIds.length}.`);
const organizerUids = (pf.organizerUids.arrayValue.values || []).map(v => v.stringValue);
const participantUids = (pf.participantUids.arrayValue.values || []).map(v => v.stringValue);

const subcollections = await collectionIds(programPath);
for (const id of subcollections) if (!known.has(id)) surprises.push(`unexpected subcollection ${programPath}/${id} (not touched)`);

const works = await listDocs(`${programPath}/works`, ['day', 'openAt', 'closeAt', 'revealedAt']);
const texts = await listDocs(`${programPath}/texts`, ['__name__']);
const gates = await listDocs(`${programPath}/gates`, ['pending', 'actor', 'updatedAt']);
const workIds = works.map(w => rel(w.name).split('/').at(-1));
const scheduled = new Set(dayWorkIds.flat());
if (works.length !== 150 || texts.length !== 150 || scheduled.size !== 150 || !workIds.every(id => scheduled.has(id))) {
  throw new Error(`Programme mismatch: works ${works.length}, texts ${texts.length}, scheduled ${scheduled.size}.`);
}
const revealed = works.filter(w => val(w.fields?.revealedAt) != null).length;
if (revealed) surprises.push(`${revealed} works carry a non-null legacy revealedAt (kept; the current client ignores it)`);
const usedGates = gates.filter(g => (g.fields?.pending?.arrayValue?.values || []).length || val(g.fields?.actor) != null || val(g.fields?.updatedAt) != null).length;
if (usedGates) surprises.push(`${usedGates} retired gates docs hold data (kept untouched per README)`);

// 2. Reading data: every reads row under every work, plus completions, plus sessions.
const perWork = await pool(workIds, 10, async id => {
  const [rows, subs] = await Promise.all([listDocs(`${programPath}/works/${id}/reads`, ['status', 'submittedAt']), collectionIds(`${programPath}/works/${id}`)]);
  for (const s of subs) if (s !== 'reads') surprises.push(`unexpected subcollection ${programPath}/works/${id}/${s} (not touched)`);
  return rows;
});
const reads = perWork.flat();
const completions = subcollections.includes('completions') ? await listDocs(`${programPath}/completions`, ['last']) : [];
const sessions = subcollections.includes('sessions') ? await listDocs(`${programPath}/sessions`, ['at']) : [];
const deletions = [...reads, ...completions, ...(keepSessions ? [] : sessions)];
const nonMembers = new Set([...reads, ...completions, ...sessions].map(d => d.name.split('/').at(-1)).filter(uid => !participantUids.includes(uid)));
if (nonMembers.size) surprises.push(`reading docs from uids not in participantUids: ${[...nonMembers].join(', ')}`);

// 3. The schedule write, mirroring schedule() in client/firestore.mjs.
const boundaries = scheduleDates(startDate, timezone, Date.now()).map(ms => new Date(ms).toISOString());
const ts = iso => ({ timestampValue: iso });
const writes = deletions.map(d => ({ delete: d.name, currentDocument: { updateTime: d.updateTime } }));
const scheduleWrites = [{
  update: { name: `${docRoot}/${programPath}`, fields: { startDate: { stringValue: startDate }, timezone: { stringValue: timezone }, boundaries: { arrayValue: { values: boundaries.map(ts) } } } },
  updateMask: { fieldPaths: ['startDate', 'timezone', 'boundaries'] },
  updateTransforms: [{ fieldPath: 'updatedAt', setToServerValue: 'REQUEST_TIME' }],
  currentDocument: { updateTime: program.updateTime },
}];
dayWorkIds.forEach((ids, i) => ids.forEach(id => scheduleWrites.push({
  update: { name: `${docRoot}/${programPath}/works/${id}`, fields: { openAt: ts(boundaries[i]), closeAt: ts(boundaries[i + 1]) } },
  updateMask: { fieldPaths: ['openAt', 'closeAt'] },
  currentDocument: { exists: true },
})));

const status = {};
for (const r of reads) { const k = `${val(r.fields?.status)}${val(r.fields?.submittedAt) ? '+submitted' : ''}`; status[k] = (status[k] || 0) + 1; }
console.log(JSON.stringify({
  mode: apply ? 'APPLY' : 'DRY RUN (nothing written)', project, programme: programPath,
  current: { startDate: val(pf.startDate), timezone: val(pf.timezone), boundary0: pf.boundaries?.arrayValue?.values?.[0]?.timestampValue ?? null, updatedAt: val(pf.updatedAt), organizerUids, participants: participantUids.length },
  kept: { works: works.length, texts: texts.length, gates: gates.length, subcollections },
  delete: { reads: reads.length, readsByStatus: status, completions: completions.length, sessions: keepSessions ? `${sessions.length} kept` : sessions.length, total: deletions.length },
  write: { programme: 1, works: scheduleWrites.length - 1, total: scheduleWrites.length },
  surprises,
}, null, 2));
console.log('\nDELETE');
for (const d of deletions) console.log(`  ${rel(d.name)}`);
console.log('\nWRITE');
console.log(`  ${programPath} ${JSON.stringify({ startDate, timezone, boundaries: `[${boundaries.length}] ${boundaries[0]} .. ${boundaries[50]}`, updatedAt: 'REQUEST_TIME' })}`);
console.log(`  boundaries: ${JSON.stringify(boundaries)}`);
dayWorkIds.forEach((ids, i) => ids.forEach(id => console.log(`  ${programPath}/works/${id} day ${i + 1} openAt ${boundaries[i]} closeAt ${boundaries[i + 1]}`)));

if (apply) {
  // Deletes first, in preconditioned chunks; then the schedule in one atomic commit.
  for (let i = 0; i < writes.length; i += 400) {
    const r = await operatorRequest(`${firestoreBase}:commit`, { writes: writes.slice(i, i + 400) });
    console.log(JSON.stringify({ deleted: r.writeResults.length, at: r.commitTime }));
  }
  const r = await operatorRequest(`${firestoreBase}:commit`, { writes: scheduleWrites });
  console.log(JSON.stringify({ scheduled: r.writeResults.length, at: r.commitTime }));
  // Verify: nothing left, no row arrived during the reset.
  const left = (await pool(workIds, 10, id => listDocs(`${programPath}/works/${id}/reads`, ['status']))).flat().length
    + (await listDocs(`${programPath}/completions`, ['last'])).length;
  const after = await operatorRequest(`${firestoreBase}/${programPath}`);
  console.log(JSON.stringify({ remainingReadingDocs: left, startDate: val(after.fields.startDate), boundary0: after.fields.boundaries.arrayValue.values[0].timestampValue }));
  if (left) throw new Error('Reading data appeared during the reset; rerun the dry run and review.');
}
