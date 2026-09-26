// Clears the emulators and seeds the test bed: fictional Bookrank club,
// persona accounts (Google provider, so they appear in the emulator's
// sign-in chooser), the Daily Dose programme and all 150 texts. Document
// shapes mirror scripts/seed-firestore.mjs; Day 1 is set the way the
// organiser's schedule() writes it. Never touches production: the Admin SDK
// is pointed at the emulators and the project is a demo-* id.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { projectId, ports, host } from './config.mjs';
import { personas, club, backgroundActivity, tourActivity } from './personas.mjs';

process.env.FIRESTORE_EMULATOR_HOST = `${host}:${ports.firestore}`;
process.env.FIREBASE_AUTH_EMULATOR_HOST = `${host}:${ports.auth}`;
const { initializeApp } = await import('firebase-admin/app');
const { getFirestore, Timestamp } = await import('firebase-admin/firestore');
const { getAuth } = await import('firebase-admin/auth');
const { createStore } = await import('../server/store.mjs');
const { createService } = await import('../server/service.mjs');
const { midnight } = await import('../client/calendar.mjs');
const { addDays, localDate } = await import('../server/domain.mjs');

if (!projectId.startsWith('demo-')) throw new Error('Refusing to seed a non-demo project.');
const here = dirname(fileURLToPath(import.meta.url));
const timezone = 'Europe/Helsinki';
const offset = Number(process.env.DAY1_OFFSET ?? 4);
const startDate = process.env.DAY1 || addDays(localDate(Date.now(), timezone), -offset);

const candidates = [process.env.ANTHOLOGY, resolve(here, '../data/anthology.json'),
  join(homedir(), 'common/projects/daily-dose/webapp/data/anthology.json')].filter(Boolean);
const anthologyPath = candidates.find(p => existsSync(p));
if (!anthologyPath) throw new Error(`Private anthology not found; tried ${candidates.join(', ')}. Set ANTHOLOGY=...`);
const anthology = JSON.parse(readFileSync(anthologyPath, 'utf8'));
if (anthology.works.length !== 150) throw new Error('Expected the corrected 150-work export.');

// 1. Clear both emulators.
for (const url of [`http://${host}:${ports.firestore}/emulator/v1/projects/${projectId}/databases/(default)/documents`,
  `http://${host}:${ports.auth}/emulator/v1/projects/${projectId}/accounts`]) {
  const r = await fetch(url, { method: 'DELETE' });
  if (!r.ok) throw new Error(`Could not clear ${url}: ${r.status}`);
}

const app = initializeApp({ projectId });
const db = getFirestore(app), auth = getAuth(app);

// 2. Accounts, linked to the Google provider so the emulator chooser lists them.
const result = await auth.importUsers(personas.map(p => ({ uid: p.uid, email: p.email, displayName: p.name, emailVerified: true,
  providerData: [{ providerId: 'google.com', uid: `google-${p.uid}`, email: p.email, displayName: p.name }] })));
if (result.failureCount) throw new Error(JSON.stringify(result.errors));

// 3. Bookrank club and member documents (the rules require members/{uid}).
const ts = ms => Timestamp.fromMillis(ms);
const organizer = personas.find(p => p.organizer);
const memberUids = personas.filter(p => p.member).map(p => p.uid).sort();
const joined = ts(Date.parse('2026-01-15T10:00:00Z'));
let batch = db.batch(), count = 0;
const writes = [];
const set = (path, data) => writes.push([path, data]);
set(`clubs/${club.id}`, { name: club.name, created_by: organizer.uid, created_at: joined, invite_code: 'TSTBED', member_uids: memberUids });
for (const p of personas.filter(p => p.member)) {
  set(`clubs/${club.id}/members/${p.uid}`, { display_name: p.name, email: p.email, photo_url: null, role: p.organizer ? 'admin' : 'member', joined_at: joined });
}

// 4. Programme, works, private texts and retired gates, as in seed-firestore.mjs,
// with Day 1 already chosen (as the organiser's schedule() would write it).
const boundaries = Array.from({ length: 51 }, (_, i) => midnight(addDays(startDate, i), timezone));
const store = createStore();
store.db.prepare('INSERT INTO campaigns VALUES (?,?,?,?,?)').run(club.id, '2000-01-01', timezone, organizer.uid, 0);
const service = createService(store, anthology);
const base = `dailyDose/${club.id}`;
set(base, { organizerUids: [organizer.uid], participantUids: memberUids, startDate, timezone, boundaries: boundaries.map(ts),
  updatedAt: ts(Date.now()), edition: anthology.edition,
  dayWorkIds: Array.from({ length: 50 }, (_, i) => ({ ids: anthology.works.filter(w => w.day === i + 1).map(w => w.id) })) });
for (const raw of anthology.works) {
  const w = service.read({ uid: organizer.uid }, { id: club.id }, raw.id);
  const { blocks, sourceNote, editorialHold, ...meta } = w;
  set(`${base}/works/${w.id}`, { ...meta, openAt: ts(boundaries[w.day - 1]), closeAt: ts(boundaries[w.day]), revealedAt: null });
  set(`${base}/texts/${w.id}`, { json: JSON.stringify(w) });
  set(`${base}/gates/${w.id}`, { pending: [], actor: null, updatedAt: null });
}
store.close();

// 5. A little earlier activity by the background members, so a tester who
// submits a response has peers to see. Shapes satisfy rowShape().
const hour = 3600000;
for (const a of backgroundActivity) {
  const work = anthology.works.find(w => w.id === a.work);
  if (boundaries[work.day - 1] > Date.now()) continue;
  const open = boundaries[work.day - 1], close = boundaries[work.day];
  const done = Math.min(Date.now() - hour, a.catchUp ? close + a.at * hour : open + a.at * hour);
  set(`${base}/works/${a.work}/reads/${a.uid}`, { status: 'done', startedAt: ts(done - hour / 2), completedAt: ts(done), joinedOnDay: done < close,
    comment: a.comment, commentAt: ts(done + 300000), rating: a.rating, submittedAt: ts(done + 300000), updatedAt: ts(done + 300000) });
}

// 6. Tour option (TOUR_SEED=1, used by scripts/tour.sh): on each of the
// current day's three texts, a few more members have already finished, so the
// tour's reader sees several peers the moment they reveal. Off by default.
if (process.env.TOUR_SEED === '1') {
  const today = localDate(Date.now(), timezone);
  const current = Math.round((Date.parse(today) - Date.parse(startDate)) / 86400000) + 1;
  const seeded = new Set(backgroundActivity.map(a => `${a.uid}:${a.work}`));
  for (const a of tourActivity) {
    const work = anthology.works.find(w => w.day === current && w.category === a.category);
    if (!work || seeded.has(`${a.uid}:${work.id}`)) continue;
    const open = boundaries[work.day - 1];
    const done = Math.max(open + 60000, Date.now() - a.ago * 60000);
    set(`${base}/works/${work.id}/reads/${a.uid}`, { status: 'done', startedAt: ts(Math.max(open, done - 600000)), completedAt: ts(done), joinedOnDay: true,
      comment: a.comment, commentAt: ts(done + 60000), rating: a.rating, submittedAt: ts(done + 60000), updatedAt: ts(done + 60000) });
  }
}

for (const [path, data] of writes) {
  batch.set(db.doc(path), data);
  if (++count % 400 === 0) { await batch.commit(); batch = db.batch(); }
}
await batch.commit();
const today = localDate(Date.now(), timezone);
console.log(JSON.stringify({ project: projectId, club: club.name, accounts: personas.length, members: memberUids.length,
  texts: anthology.works.length, documents: writes.length, day1: startDate, today, currentDay: Math.round((Date.parse(today) - Date.parse(startDate)) / 86400000) + 1 }));
process.exit(0);
