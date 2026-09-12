import { readFileSync } from 'node:fs';
import { operatorRequest, project } from './firebase-operator.mjs';

// Supply a freshly inspected full live backup and its exact Daily Dose fragment.
// No other app's rules are changed, and a concurrent release aborts deployment.
const [backupPath, oldFragmentPath] = process.argv.slice(2).filter(a => a !== '--apply');
if (!backupPath || !oldFragmentPath) throw new Error('Usage: node scripts/update-rules.mjs FULL_BACKUP OLD_FRAGMENT [--apply]');
const base = 'https://firebaserules.googleapis.com/v1';
const releasePath = `projects/${project}/releases/cloud.firestore`;
const previous = await operatorRequest(`${base}/${releasePath}`);
const live = await operatorRequest(`${base}/${previous.rulesetName}`);
const backup = readFileSync(backupPath, 'utf8');
const source = live.source.files.find(f => f.name === 'firestore.rules');
if (live.source.files.length !== 1 || !source || source.content !== backup) throw new Error('Live rules differ from the reviewed backup; stop and review.');
const oldFragment = readFileSync(oldFragmentPath, 'utf8');
const fragment = readFileSync('firestore/daily-dose.rules', 'utf8');
if (!oldFragment.includes('match /dailyDose/') || !fragment.includes('match /dailyDose/')) throw new Error('Not a Daily Dose fragment.');
const parts = backup.split(oldFragment);
if (parts.length !== 2) throw new Error('Old fragment must occur exactly once in live rules.');
const content = parts[0] + fragment + parts[1];
const sourcePayload = { files: [{ name: source.name, content }] };
const validation = await operatorRequest(`${base}/projects/${project}:test`, { source: sourcePayload });
if ((validation.issues || []).some(i => i.severity === 'ERROR')) throw new Error(JSON.stringify(validation.issues));
console.log(JSON.stringify({ previousRuleset: previous.rulesetName, otherAppsUnchanged: true, validated: true, apply: process.argv.includes('--apply') }));
if (process.argv.includes('--apply')) {
  const created = await operatorRequest(`${base}/projects/${project}/rulesets`, { source: sourcePayload });
  const check = await operatorRequest(`${base}/${releasePath}`);
  if (check.rulesetName !== previous.rulesetName) throw new Error('Rules changed during deployment; live release was not touched.');
  await operatorRequest(`${base}/${releasePath}`, { release: { name: releasePath, rulesetName: created.name }, updateMask: 'rulesetName' }, 'PATCH');
  const verified = await operatorRequest(`${base}/${releasePath}`);
  if (verified.rulesetName !== created.name) throw new Error('Release verification failed.');
  console.log(JSON.stringify({ deployedRuleset: created.name, rollbackRuleset: previous.rulesetName }));
}
