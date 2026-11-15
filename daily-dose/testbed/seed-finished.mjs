// A busy club, on a running test bed (emulators only, demo project): every
// member has checked off, rated and finished every text of the earlier days,
// with a thought and some hearts on the others' thoughts. Today's texts:
// Mikko alone has checked them off and rated them, not finished (the checks
// type there). This is the state the slowness of 15.11.2026 was found in
// (about three listeners per released text), so the performance probes and
// testbed/check-fewer-listeners.mjs start from it:
//   VOLUME3=1 DAY1_OFFSET=52 scripts/testbed.sh start && node testbed/seed-finished.mjs
// FILL_DAYS=n fills only Days 1 to n. With STAMP=1 the rows carry their
// owner's stamp (uid, club), as after scripts/backfill-read-uids.mjs.
import { projectId, ports, host } from './config.mjs';
import { personas, club } from './personas.mjs';

if (!projectId.startsWith('demo-')) throw new Error('Refusing to seed a non-demo project.');
process.env.FIRESTORE_EMULATOR_HOST = `${host}:${ports.firestore}`;
const { initializeApp } = await import('firebase-admin/app');
const { getFirestore, Timestamp } = await import('firebase-admin/firestore');
const db = getFirestore(initializeApp({ projectId }, 'seed-finished'));
const base = `dailyDose/${club.id}`;
const members = personas.filter(p => p.member).map(p => p.uid);
const typist = 'mikko-saarinen';
const stamp = process.env.STAMP === '1';
const works = (await db.collection(`${base}/works`).get()).docs.map(d => d.data());
const now = Date.now(), ts = Timestamp.fromMillis;
const today = works.filter(w => w.openAt.toMillis() <= now && w.closeAt.toMillis() > now).map(w => w.id);
const fill = Number(process.env.FILL_DAYS ?? Infinity);
let batch = db.batch(), n = 0;
const set = async (path, data) => { batch.set(db.doc(path), data); if (++n % 400 === 0) { await batch.commit(); batch = db.batch(); } };
const records = Object.fromEntries(members.map(m => [m, {}]));
for (const w of works) {
  const open = w.openAt.toMillis();
  if (open > now) continue;
  const isToday = today.includes(w.id);
  if (w.day > fill && !isToday) continue;
  for (const [i, uid] of members.entries()) {
    if (isToday && uid !== typist) continue;
    const done = Math.min(now - 3600000, open + 3600000 * (2 + i)), shared = !isToday;
    await set(`${base}/works/${w.id}/reads/${uid}`, { status: 'done', startedAt: ts(done - 600000), completedAt: ts(done), joinedOnDay: true,
      comment: shared ? `Thought ${i} on ${w.id}: a line of about this length, so the card has some text.` : '', commentAt: shared ? ts(done + 60000) : null,
      rating: (i + w.day) % 6, submittedAt: shared ? ts(done + 60000) : null, updatedAt: ts(done + 60000), ...(stamp ? { uid, club: club.id } : {}) });
    records[uid][w.id] = ts(done);
    if (!shared) continue;
    const on = {};
    for (const author of members) if (author !== uid && (author.length + i + w.day) % 3 === 0) on[author] = ['heart'];
    if (Object.keys(on).length) await set(`${base}/works/${w.id}/reactions/${uid}`, { on, last: Object.keys(on)[0], updatedAt: ts(done + 120000) });
  }
}
for (const [uid, record] of Object.entries(records)) if (Object.keys(record).length) await set(`${base}/completions/${uid}`, { works: record, last: Object.keys(record)[0] });
await batch.commit();
console.log(JSON.stringify({ members: members.length, today, documents: n, stamped: stamp }));
process.exit(0);
