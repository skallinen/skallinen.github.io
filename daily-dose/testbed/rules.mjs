// Writes testbed/.run/firestore.rules. Prefers the full live rules as last
// reviewed (private workspace backup, Daily Dose fragment swapped for the
// current one, exactly as scripts/update-rules.mjs does); otherwise wraps the
// fragment in the minimal Bookrank rules used by firestore-test/.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { homedir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const fragment = readFileSync(resolve(here, '../firestore/daily-dose.rules'), 'utf8');
const privateData = process.env.DAILY_DOSE_PRIVATE_DATA || join(homedir(), 'common/projects/daily-dose/webapp/data');
const full = join(privateData, 'firestore-before-personal-reveal.rules');
const old = join(privateData, 'firestore-before-personal-reveal.fragment.rules');
let content, origin;
if (existsSync(full) && existsSync(old)) {
  const parts = readFileSync(full, 'utf8').split(readFileSync(old, 'utf8'));
  if (parts.length !== 2) throw new Error('Old Daily Dose fragment not found exactly once in the private rules backup.');
  content = parts[0] + fragment + parts[1]; origin = 'live-derived (private backup + current fragment)';
} else {
  content = `rules_version = '2'; service cloud.firestore { match /databases/{database}/documents {
  match /clubs/{club} { allow read: if request.auth != null; match /members/{uid} { allow read: if request.auth != null; } }
  ${fragment}
}}`; origin = 'minimal Bookrank wrapper (private backup not found)';
}
mkdirSync(join(here, '.run'), { recursive: true });
writeFileSync(join(here, '.run/firestore.rules'), content);
console.log(`Rules: ${origin}`);
