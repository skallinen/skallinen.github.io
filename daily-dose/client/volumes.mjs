// The programme's length and its volumes. Days 1 to 50 are Volumes One and
// Two; Volume Three adds days 51 to 75 (November 2026). The length comes from
// the programme document: `boundaries` holds one midnight per day plus the
// end of the last day, so 51 boundaries make 50 days and 76 make 75. Until
// Volume Three is stored (scripts/seed-volume-three.mjs), everything shows 50.
export const VOLUME_THREE = { name: 'Volume Three', firstDay: 51, lastDay: 75 };
// The most texts a member can check off, react to or rank: 75 days of three.
// firestore/daily-dose.rules repeats it (completions, seen, rankings).
export const MAX_TEXTS = 225;
export const programmeDays = p => Array.isArray(p?.boundaries) && p.boundaries.length > 1 ? p.boundaries.length - 1 : 50;
export const volumeThree = day => day >= VOLUME_THREE.firstDay;
