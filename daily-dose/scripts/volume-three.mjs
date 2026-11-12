import { createStore } from '../server/store.mjs';
import { createService } from '../server/service.mjs';
import { midnight } from '../client/calendar.mjs';
import { addDays } from '../server/domain.mjs';
import { descriptionProblems } from '../client/description.mjs';
import { VOLUME_THREE } from '../client/volumes.mjs';

// Volume Three: the plan for adding Days 51 to 75 to a running programme.
// Pure (no Firestore here), so the operator script, the test bed and the unit
// tests share it. Input: the private export (editorial workspace,
// webapp/data/volume-3.json, from webapp/export_volume3.py), the descriptions
// (id to description) and the stored programme. Output: the 75 new works and
// private texts, in the shapes of scripts/seed-firestore.mjs, each with its
// description and its openAt/closeAt already set, and the programme's two
// extended fields. Days 1 to 50 are never in the output: their boundaries and
// day lists are kept as stored and only appended to.
//
// boundaries: one midnight per day plus the end of the last (51 for 50 days),
// in epoch milliseconds; it becomes 76.

const CATEGORIES = ['poem', 'story', 'essay'];
export const NEW_DAYS = VOLUME_THREE.lastDay - VOLUME_THREE.firstDay + 1;

export function planVolumeThree({ volume, descriptions, programme, existingIds }) {
  const { startDate, timezone, boundaries, dayWorkIds } = programme;
  const problems = [];
  if (!startDate || !timezone) problems.push('The programme has no Day 1 yet.');
  if (boundaries?.length === VOLUME_THREE.lastDay + 1) problems.push('The programme already has 75 days: Volume Three is stored.');
  else if (boundaries?.length !== VOLUME_THREE.firstDay) problems.push(`Expected 51 boundaries (50 days), found ${boundaries?.length}.`);
  if (dayWorkIds?.length !== VOLUME_THREE.firstDay - 1) problems.push(`Expected 50 programme days, found ${dayWorkIds?.length}.`);
  if (problems.length) throw new Error(problems.join('\n'));
  // The stored midnights must be the ones this calendar computes, so the new
  // days continue the same clock.
  for (let i = 0; i < boundaries.length; i++) {
    if (midnight(addDays(startDate, i), timezone) !== boundaries[i]) throw new Error(`Stored boundary ${i} is not midnight of ${addDays(startDate, i)} ${timezone}.`);
  }

  const works = volume?.works || [];
  const ids = works.map(w => w.id);
  if (works.length !== NEW_DAYS * 3 || new Set(ids).size !== works.length) throw new Error(`Expected 75 distinct Volume Three works, found ${works.length}.`);
  for (let day = VOLUME_THREE.firstDay; day <= VOLUME_THREE.lastDay; day++) {
    const cats = works.filter(w => w.day === day).map(w => w.category).sort();
    if (cats.join() !== [...CATEGORIES].sort().join()) throw new Error(`Day ${day} needs one poem, one story and one essay; found ${cats.join(', ') || 'nothing'}.`);
  }
  for (const w of works) {
    if (!/^[PSE](5[1-9]|6[0-9]|7[0-5])$/.test(w.id) || w.id[0] !== w.category[0].toUpperCase() || Number(w.id.slice(1)) !== w.day) throw new Error(`Unexpected id ${w.id} for day ${w.day} ${w.category}.`);
  }
  const old = new Set([...existingIds, ...dayWorkIds.flatMap(d => d.ids)]);
  const clash = ids.filter(id => old.has(id));
  if (clash.length) throw new Error(`Already in the programme: ${clash.join(', ')}.`);
  const descriptionIssues = descriptionProblems(Object.fromEntries(ids.map(id => [id, descriptions?.[id]])), ids);
  if (descriptionIssues.length) throw new Error(`Descriptions not ready:\n${descriptionIssues.join('\n')}`);

  const extended = [...boundaries];
  for (let i = boundaries.length; i <= VOLUME_THREE.lastDay; i++) extended.push(midnight(addDays(startDate, i), timezone));
  const newDays = Array.from({ length: NEW_DAYS }, (_, i) => VOLUME_THREE.firstDay + i)
    .map(day => ({ ids: CATEGORIES.map(c => works.find(w => w.day === day && w.category === c).id) }));

  // Sanitised exactly as the first 150 (server/service.mjs read()).
  const store = createStore();
  store.db.prepare('INSERT INTO campaigns VALUES (?,?,?,?,?)').run('plan', '2000-01-01', timezone, 'operator', 0);
  const service = createService(store, volume);
  const planned = [];
  try {
    for (const day of newDays) for (const id of day.ids) {
      const w = service.read({ uid: 'operator' }, { id: 'plan' }, id);
      const { blocks, sourceNote, editorialHold, ...meta } = w;
      const json = JSON.stringify(w);
      if (Buffer.byteLength(json) > 900000) throw new Error(`Text exceeds safe Firestore document size: ${id}`);
      planned.push({ id, day: w.day, work: { ...meta, description: descriptions[id] },
        openAt: extended[w.day - 1], closeAt: extended[w.day], text: { json } });
    }
  } finally { store.close(); }
  return { boundaries: extended, dayWorkIds: [...dayWorkIds, ...newDays], works: planned };
}
