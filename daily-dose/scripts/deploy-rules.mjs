import { readFileSync } from 'node:fs';
import { operatorRequest, project } from './firebase-operator.mjs';

const base = 'https://firebaserules.googleapis.com/v1';
const releasePath = `projects/${project}/releases/cloud.firestore`;
const previous = await operatorRequest(`${base}/${releasePath}`);
const live = await operatorRequest(`${base}/${previous.rulesetName}`);
const backup = readFileSync('data/firestore-before-daily-dose.rules', 'utf8');
const source = live.source.files.find(f => f.name === 'firestore.rules');
if (live.source.files.length !== 1 || !source || source.content !== backup) throw new Error('Live rules differ from the inspected backup. Stop and review; do not overwrite them.');
if (backup.includes('match /dailyDose/')) throw new Error('Daily Dose rules already exist. Use a reviewed update, not an append.');
const ending = /\n  }\n}\s*$/;
if (!ending.test(backup)) throw new Error('Unexpected rule-file structure.');
const prefix = backup.slice(0, backup.search(ending));
const suffix = backup.slice(prefix.length);
const fragment = readFileSync('firestore/daily-dose.rules', 'utf8');
const content = `${prefix}\n${fragment}${suffix}`;
const sourcePayload = { files: [{ name: source.name, content }] };
// Compile and validate before creating any ruleset or changing the live release.
const validation = await operatorRequest(`${base}/projects/${project}:test`, { source: sourcePayload });
if ((validation.issues || []).some(i => i.severity === 'ERROR')) throw new Error(JSON.stringify(validation.issues));
console.log(JSON.stringify({ previousRuleset: previous.rulesetName, originalRulesPreserved: content.startsWith(prefix) && content.endsWith(suffix), validated: true, apply: process.argv.includes('--apply') }));
if (process.argv.includes('--apply')) {
  const created = await operatorRequest(`${base}/projects/${project}/rulesets`, { source: sourcePayload });
  const check = await operatorRequest(`${base}/${releasePath}`);
  if (check.rulesetName !== previous.rulesetName) throw new Error('Rules changed during deployment; live release was not touched.');
  await operatorRequest(`${base}/${releasePath}`, { release: { name: releasePath, rulesetName: created.name }, updateMask: 'rulesetName' }, 'PATCH');
  const verified = await operatorRequest(`${base}/${releasePath}`);
  if (verified.rulesetName !== created.name) throw new Error('Release verification failed.');
  console.log(JSON.stringify({ deployedRuleset: created.name, rollbackRuleset: previous.rulesetName }));
}
