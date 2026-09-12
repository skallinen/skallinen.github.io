import { readFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStore } from './store.mjs';
import { createService } from './service.mjs';
import { createApp } from './app.mjs';
import { createDemo } from './demo.mjs';
import { bookrankIdentity } from './bookrank.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const isDemo = process.argv.includes('--demo');
if (isDemo && process.env.NODE_ENV === 'production') throw new Error('Demo authentication is forbidden in production.');
if (!isDemo && process.env.FIREBASE_AUTH_EMULATOR_HOST) throw new Error('Live Bookrank login must not use the Firebase Auth emulator.');
const filename = path.resolve(root, process.env.DAILY_DOSE_DB || 'data/daily-dose.sqlite');
if (!isDemo) mkdirSync(path.dirname(filename), { recursive: true });
const store = createStore(isDemo ? ':memory:' : filename);
let anthology;
try { anthology = JSON.parse(readFileSync(path.join(root, 'data/anthology.json'), 'utf8')); }
catch { throw new Error('Export the corrected anthology first: ../.venv/bin/python export_anthology.py'); }
if (anthology.works.length !== 150) throw new Error('Expected all 150 anthology selections.');
const demo = isDemo ? createDemo(store, anthology) : null;
const identity = demo?.identity || bookrankIdentity({
  organizerUids: (process.env.DAILY_DOSE_ORGANIZER_UIDS || '').split(',').map(s => s.trim()).filter(Boolean),
});
const service = createService(store, anthology, demo?.clock);
const app = createApp({ service, identity, demo });
const port = Number(process.env.PORT || 3000);
// Demo remains loopback-only even if a production HOST variable is inherited.
const host = isDemo ? '127.0.0.1' : process.env.HOST || '127.0.0.1';
const server = app.listen(port, host, () => console.log(`Daily Dose ${isDemo ? 'FICTIONAL DEMO' : 'Bookrank login'}: http://${host}:${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => { store.close(); process.exit(0); }));
