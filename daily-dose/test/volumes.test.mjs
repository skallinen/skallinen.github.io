import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { programmeDays, volumeThree, MAX_TEXTS, VOLUME_THREE } from '../client/volumes.mjs';
import { planVolumeThree } from '../scripts/volume-three.mjs';
import { midnight } from '../client/calendar.mjs';
import { addDays } from '../server/domain.mjs';

test('the programme length comes from its boundaries: 50 days until Volume Three is stored, then 75', () => {
  assert.equal(programmeDays({ boundaries: new Array(51) }), 50);
  assert.equal(programmeDays({ boundaries: new Array(76) }), 75);
  assert.equal(programmeDays({}), 50);
  assert.equal(volumeThree(50), false);
  assert.equal(volumeThree(51), true);
  assert.deepEqual(VOLUME_THREE, { name: 'Volume Three', firstDay: 51, lastDay: 75 });
});

test('the rules cap completions, seen and rankings at the same 225 texts as the client', () => {
  const rules = readFileSync(new URL('../firestore/daily-dose.rules', import.meta.url), 'utf8');
  assert.equal(MAX_TEXTS, 225);
  assert.equal(rules.match(new RegExp(`size\\(\\) <= ${MAX_TEXTS}\\n`, 'g')).length, 3);
  assert.doesNotMatch(rules, /<= 150\b/);
});

// A synthetic programme and volume (no private texts in tests).
const startDate = '2026-09-26', timezone = 'Europe/Helsinki';
const programme = () => ({ startDate, timezone,
  boundaries: Array.from({ length: 51 }, (_, i) => midnight(addDays(startDate, i), timezone)),
  dayWorkIds: Array.from({ length: 50 }, (_, i) => ({ ids: [`P${i + 1}`, `S${i + 1}`, `E${i + 1}`] })) });
const volume = () => ({ edition: 'test', works: Array.from({ length: 25 }, (_, i) => i + 51).flatMap(day => ['poem', 'story', 'essay'].map(category => ({
  id: `${category[0].toUpperCase()}${day}`, day, category, title: `${category} ${day}`, author: 'A. Writer', country: 'Finland', year: '2020', minutes: 3,
  blocks: [{ type: 'paragraph', html: 'Text <script>x</script><i>here</i>.' }], sourceNote: 'Test.', editorialHold: null }))) });
const descriptions = () => Object.fromEntries(volume().works.map(w => [w.id, `What happens in ${w.title}.`]));
const existingIds = Array.from({ length: 50 }, (_, i) => ['P', 'S', 'E'].map(k => `${k}${String(i + 1).padStart(2, '0')}`)).flat();

test('Volume Three plan: 75 new texts on Days 51 to 75, Days 1 to 50 kept as stored', () => {
  const before = programme();
  const plan = planVolumeThree({ volume: volume(), descriptions: descriptions(), programme: before, existingIds });
  assert.equal(plan.works.length, 75);
  assert.equal(plan.boundaries.length, 76);
  assert.deepEqual(plan.boundaries.slice(0, 51), before.boundaries);
  assert.deepEqual(plan.dayWorkIds.slice(0, 50), before.dayWorkIds);
  assert.deepEqual(plan.dayWorkIds[50], { ids: ['P51', 'S51', 'E51'] });
  // Day 51 opens at midnight 15 November 2026 in Helsinki (22:00 UTC the day before).
  const p51 = plan.works.find(w => w.id === 'P51');
  assert.equal(new Date(p51.openAt).toISOString(), '2026-11-14T22:00:00.000Z');
  assert.equal(new Date(plan.works.find(w => w.id === 'E75').closeAt).toISOString(), '2026-12-09T22:00:00.000Z');
  assert.equal(p51.work.description, 'What happens in poem 51.');
  assert.deepEqual(Object.keys(p51.work).sort(), ['author', 'category', 'country', 'day', 'description', 'id', 'minutes', 'title', 'year']);
  // Sanitised as the first 150: no script tag in the private text.
  assert.doesNotMatch(p51.text.json, /<script>/);
  assert.match(p51.text.json, /<i>here<\/i>/);
});

test('Volume Three plan refuses a second run, a clash, a missing description and a broken day', () => {
  const run = over => () => planVolumeThree({ volume: volume(), descriptions: descriptions(), programme: programme(), existingIds, ...over });
  const stored = planVolumeThree({ volume: volume(), descriptions: descriptions(), programme: programme(), existingIds });
  assert.throws(run({ programme: { ...programme(), boundaries: stored.boundaries, dayWorkIds: stored.dayWorkIds } }), /already has 75 days/);
  assert.throws(run({ existingIds: [...existingIds, 'S60'] }), /Already in the programme: S60/);
  const missing = descriptions(); delete missing.E70;
  assert.throws(run({ descriptions: missing }), /E70: missing/);
  const dashed = descriptions(); dashed.P52 = 'One — two.';
  assert.throws(run({ descriptions: dashed }), /P52: em dash/);
  const broken = volume(); broken.works = broken.works.filter(w => w.id !== 'S53');
  assert.throws(run({ volume: broken }), /Expected 75/);
  const moved = programme(); moved.boundaries[10] += 3600000;
  assert.throws(run({ programme: moved }), /Stored boundary 10/);
});
