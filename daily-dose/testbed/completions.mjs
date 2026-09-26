// Runs after testbed/seed.mjs: gives every seeded checkmark its completion
// record (dailyDose/{club}/completions/{uid}), as the client writes it with
// the checkmark. seed.mjs writes private rows directly, so without this the
// organiser page would show the background members as not checked off.
// Emulator only (demo-* project); never touches production.
import { projectId, ports, host } from './config.mjs';
import { club } from './personas.mjs';

process.env.FIRESTORE_EMULATOR_HOST = `${host}:${ports.firestore}`;
if (!projectId.startsWith('demo-')) throw new Error('Refusing to write to a non-demo project.');
const { initializeApp } = await import('firebase-admin/app');
const { getFirestore } = await import('firebase-admin/firestore');
const db = getFirestore(initializeApp({ projectId }, 'completions'));
const rows = await db.collectionGroup('reads').get();
const records = new Map();
for (const r of rows.docs) {
  if (!r.ref.path.startsWith(`dailyDose/${club.id}/works/`) || r.get('status') !== 'done') continue;
  const uid = r.id, work = r.ref.parent.parent.id;
  if (!records.has(uid)) records.set(uid, {});
  records.get(uid)[work] = r.get('completedAt');
}
const batch = db.batch();
for (const [uid, works] of records) batch.set(db.doc(`dailyDose/${club.id}/completions/${uid}`), { works, last: Object.keys(works)[0] });
await batch.commit();
console.log(JSON.stringify({ completionRecords: records.size }));
process.exit(0);
