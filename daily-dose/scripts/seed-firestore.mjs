import { readFileSync } from 'node:fs';
import { createStore } from '../server/store.mjs';
import { createService } from '../server/service.mjs';
import { project, operatorRequest, firestoreBase, encode } from './firebase-operator.mjs';

// Exact established BBC club / organiser, verified against existing membership.
const club = 'o0CwucZDrZBOea1sNm9g';
const organizer = 'UrbT8J2Ha6dA8mcmSS2BDgTXHjH2';
const members = await operatorRequest(`${firestoreBase}/clubs/${club}/members?pageSize=1000`);
if (members.nextPageToken) throw new Error('Unexpected roster pagination.');
const participantUids = members.documents.map(d => d.name.split('/').at(-1)).sort();
if (!participantUids.includes(organizer) || participantUids.length > 100) throw new Error('Organiser / roster mismatch.');
const anthology = JSON.parse(readFileSync('data/anthology.json', 'utf8'));
if (anthology.works.length !== 150) throw new Error('Expected corrected 150-work export.');
const store = createStore();
store.db.prepare('INSERT INTO campaigns VALUES (?,?,?,?,?)').run(club, '2000-01-01', 'Europe/Helsinki', organizer, 0);
const service = createService(store, anthology);
const writes = [];
function create(relativePath, data) {
  writes.push({ update: { name: `projects/${project}/databases/(default)/documents/dailyDose/${club}${relativePath}`, fields: encode(data).mapValue.fields }, currentDocument: { exists: false } });
}
create('', { organizerUids: [organizer], participantUids, startDate: null, timezone: 'Europe/Helsinki', boundaries: [], updatedAt: null,
  edition: anthology.edition, dayWorkIds: Array.from({ length: 50 }, (_, i) => ({ ids: anthology.works.filter(w => w.day === i + 1).map(w => w.id) })) });
for (const raw of anthology.works) {
  const w = service.read({ uid: organizer }, { id: club }, raw.id);
  const { blocks, sourceNote, editorialHold, ...meta } = w;
  const json = JSON.stringify(w);
  if (Buffer.byteLength(json) > 900000) throw new Error(`Text exceeds safe Firestore document size: ${w.id}`);
  create(`/works/${w.id}`, { ...meta, openAt: null, closeAt: null, revealedAt: null });
  create(`/texts/${w.id}`, { json });
  create(`/gates/${w.id}`, { pending: [], actor: null, updatedAt: null });
}
store.close();
const bytes = Buffer.byteLength(JSON.stringify({ writes }));
if (writes.length !== 451 || bytes > 9 * 1024 * 1024) throw new Error('Unexpected seed size.');
console.log(JSON.stringify({ club, members: participantUids.length, privateTexts: 150, writes: writes.length, bytes, day1: 'not set', apply: process.argv.includes('--apply') }));
if (process.argv.includes('--apply')) {
  // Atomic and create-only: an existing programme or any activity aborts the
  // entire batch. Never overwrite user data on a second invocation.
  const result = await operatorRequest(`${firestoreBase}:commit`, { writes });
  console.log(JSON.stringify({ committed: result.writeResults.length, at: result.commitTime }));
}
