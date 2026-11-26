// A second member active while Mikko types. Every 1.5 s
// Priya or Tomas rewrites a thought (and rating) on one of today's or
// yesterday's texts. Emulator only (demo project).
import { projectId, ports, host } from './config.mjs';
import { club } from './personas.mjs';
process.env.FIRESTORE_EMULATOR_HOST = `${host}:${ports.firestore}`;
if (!projectId.startsWith('demo-')) throw new Error('demo only');
const { initializeApp } = await import('firebase-admin/app');
const { getFirestore, Timestamp } = await import('firebase-admin/firestore');
const db = getFirestore(initializeApp({ projectId }, 'live'));
const base = `dailyDose/${club.id}`;
const now = Date.now();
const works = (await db.collection(`${base}/works`).get()).docs.map(d => ({ id: d.id, ...d.data() }))
  .filter(w => w.openAt.toMillis() <= now && w.closeAt.toMillis() > now - 86400000 * 2).map(w => w.id);
const who = ['priya-raman', 'tomas-berg'];
let i = 0;
for (;;) {
  const uid = who[i % 2], id = works[i % works.length], t = Timestamp.now();
  await db.doc(`${base}/works/${id}/reads/${uid}`).set({ status: 'done', startedAt: t, completedAt: t, joinedOnDay: true, comment: `Live thought ${i}, still thinking about it.`, commentAt: t, rating: i % 6, submittedAt: t, updatedAt: t }, { merge: true });
  i++;
  await new Promise(r => setTimeout(r, 1500));
}
