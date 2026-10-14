import { esc } from './text.mjs';

// A short description of each text, a refresher of at most 280 Unicode code
// points (SPEC.md "Descriptions"). It is a field on the text's private
// `works/{work}` document, which the rules let members read only once the
// text is released, so a coming text's description is never readable early.
// It is shown only to a reader who has checked the text off: on its card in
// the readings, and as a tooltip on the title in My ranking (which lists
// only checked-off texts; client/ranking.mjs).
// The texts and their descriptions are never in this repository.

export const DESCRIPTION_MAX = 280;
export const codePoints = s => [...String(s ?? '')].length;
// A usable description: a nonblank string of at most 280 code points.
export const validDescription = s => typeof s === 'string' && /\S/.test(s) && codePoints(s) <= DESCRIPTION_MAX;
// Shown only after the reader has checked the text off.
export const showDescription = work => work?.mine?.status === 'done' && validDescription(work.description);

export function descriptionHtml(work, className = 'work-description') {
  return showDescription(work) ? `<p class="${className}">${esc(work.description.trim())}</p>` : '';
}

// Problems with a descriptions file (an object of text id to description)
// against the programme's text ids: [] when every text has a usable one.
// No em dashes (house style). Used by scripts/sync-descriptions.mjs, the test
// bed seed and the unit tests; never sent to the browser.
export function descriptionProblems(map, ids) {
  if (!map || typeof map !== 'object' || Array.isArray(map)) return ['Not an object of text id to description.'];
  const problems = [], known = new Set(ids);
  for (const id of ids) {
    const d = map[id];
    if (d == null) problems.push(`${id}: missing`);
    else if (!validDescription(d)) problems.push(`${id}: ${typeof d !== 'string' || !/\S/.test(d) ? 'blank' : `${codePoints(d)} code points, over ${DESCRIPTION_MAX}`}`);
    else if (d.includes('—')) problems.push(`${id}: em dash`);
  }
  for (const id of Object.keys(map)) if (!known.has(id)) problems.push(`${id}: not a text in the programme`);
  return problems;
}
