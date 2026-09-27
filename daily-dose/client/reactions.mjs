import { esc } from './text.mjs';

// Slack-style reactions on the club's thoughts: a small fixed set, no picker
// of every emoji. Stored by key, never by the emoji itself, so the set can be
// drawn differently later without touching data. The Firestore rules repeat
// this list (firestore/daily-dose.rules, match /reactions/{uid}).
export const REACTIONS = [
  { key: 'heart', emoji: '❤️', label: 'heart' },
  { key: 'like', emoji: '👍', label: 'thumbs up' },
  { key: 'this', emoji: '👆', label: 'this' },
  { key: 'laugh', emoji: '😂', label: 'laughing' },
  { key: 'wow', emoji: '😮', label: 'surprised' },
  { key: 'moved', emoji: '😢', label: 'moved' },
  { key: 'think', emoji: '🤔', label: 'made me think' },
];
const byKey = new Map(REACTIONS.map(r => [r.key, r]));
export const isReaction = key => typeof key === 'string' && byKey.has(key);

// One member's reaction document per text: { on: { authorUid: [keys] } }.
// Returns, for one thought, each emoji in use with its count, whether the
// viewer is among the reactors, and the names of the others (current members
// only, like every other shared aggregate).
export function tally(docs, author, members, me) {
  const who = new Map();
  for (const { uid, on } of docs) {
    if (!members.has(uid)) continue;
    const keys = Array.isArray(on?.[author]) ? on[author] : [];
    for (const key of new Set(keys)) if (byKey.has(key)) (who.get(key) || who.set(key, []).get(key)).push(uid);
  }
  return REACTIONS.filter(r => who.get(r.key)?.length).map(r => {
    const uids = who.get(r.key);
    return { key: r.key, count: uids.length, mine: uids.includes(me),
      names: uids.filter(u => u !== me).map(u => members.get(u).name).sort((a, b) => a.localeCompare(b)) };
  });
}

// The viewer's own reaction added or removed, on top of a tally.
export function setReaction(list, key, on) {
  const have = list.find(r => r.key === key);
  if (!!have?.mine === on) return list;
  if (on) {
    const next = have ? list.map(r => r === have ? { ...r, count: r.count + 1, mine: true } : r) : [...list, { key, count: 1, mine: true, names: [] }];
    return REACTIONS.map(r => next.find(x => x.key === r.key)).filter(Boolean);
  }
  return list.map(r => r === have ? { ...r, count: r.count - 1, mine: false } : r).filter(r => r.count > 0);
}

// "Grace Okafor, Oskar Nyström and you"
export function whoReacted(r) {
  const people = [...r.names, ...(r.mine ? ['you'] : [])];
  return people.length > 1 ? `${people.slice(0, -1).join(', ')} and ${people.at(-1)}` : people[0] || '';
}

// Under one thought: the emojis in use (tap to add or remove your own), and
// "React", which opens the seven choices. Hover shows who reacted (title);
// a long press does the same on a phone (app.mjs).
export function reactionBar(workId, comment, { open = false, me = null } = {}) {
  const list = comment.reactions || [];
  const attrs = `data-react="${esc(workId)}" data-author="${esc(comment.uid)}"`;
  const pills = list.map(r => {
    const def = byKey.get(r.key), who = whoReacted(r);
    const label = `${def.emoji} ${def.label}, ${r.count}: ${who}. ${r.mine ? 'Tap to remove yours' : 'Tap to add yours'}`;
    return `<button type="button" class="reaction${r.mine ? ' mine' : ''}" ${attrs} data-emoji="${r.key}" aria-pressed="${r.mine}" title="${esc(`${who} reacted with ${def.emoji}`)}" aria-label="${esc(label)}"><span aria-hidden="true">${def.emoji}</span><span class="reaction-count" aria-hidden="true">${r.count}</span></button>`;
  }).join('');
  const panel = `reactions-${workId}-${comment.uid}`;
  const choices = open ? `<div class="reaction-choices" id="${esc(panel)}" role="group" aria-label="Choose a reaction">${REACTIONS.map(r => {
    const mine = !!list.find(x => x.key === r.key)?.mine;
    return `<button type="button" class="reaction-choice${mine ? ' mine' : ''}" ${attrs} data-emoji="${r.key}" aria-pressed="${mine}" aria-label="${esc(r.label)}" title="${esc(r.label)}"><span aria-hidden="true">${r.emoji}</span></button>`;
  }).join('')}</div>` : '';
  return `<div class="reactions">${pills}<button type="button" class="reaction-add" data-react-open="${esc(workId)}" data-author="${esc(comment.uid)}" aria-expanded="${open}"${open ? ` aria-controls="${esc(panel)}"` : ''} aria-label="${comment.uid === me ? 'React to your own thought' : `React to ${esc(comment.name)}’s thought`}"><span aria-hidden="true">☺</span> React</button>${choices}</div>`;
}

// ---------- the count on your name: new reactions to your own thoughts
// A reaction is one pair "reactorUid:key". The pairs on one thought, from
// other current members only (your own reactions to your own thought are not
// news), sorted so they compare and store the same way everywhere.
export function reactionsTo(docs, author, members) {
  const pairs = new Set();
  for (const { uid, on } of docs) {
    if (uid === author || !members.has(uid)) continue;
    const keys = Array.isArray(on?.[author]) ? on[author] : [];
    for (const key of keys) if (byKey.has(key)) pairs.add(`${uid}:${key}`);
  }
  return [...pairs].sort();
}

// New = on your thought now and not in what you had seen of that text. The
// count comes from the reactions as they are now, so a reaction taken back
// leaves no count behind. `seen` is any number of { workId: [pairs] } maps
// (your account's and this device's); a pair seen in any of them is seen.
// Returns the texts with news, in feed order (newest day first).
export function newReactions(works, ...seen) {
  const out = [];
  for (const w of works) {
    const pairs = w.collective?.toMe;
    if (!Array.isArray(pairs) || !pairs.length) continue;
    const known = new Set(seen.flatMap(s => Array.isArray(s?.[w.id]) ? s[w.id] : []));
    const count = pairs.filter(p => !known.has(p)).length;
    if (count) out.push({ id: w.id, count });
  }
  return out;
}

export const newsLabel = n => `${n} new ${n === 1 ? 'reaction' : 'reactions'} to your thoughts`;

// Your initial in the header; with news, a button carrying the count, which
// takes you to the thought that got them.
export function meMarker(name, count) {
  const initial = esc(Array.from(String(name || '?').trim())[0] || '?');
  if (!count) return `<span class="me-marker" aria-hidden="true">${initial}</span>`;
  return `<button type="button" class="me-marker has-news" data-news aria-label="${newsLabel(count)}" title="${newsLabel(count)}"><span aria-hidden="true">${initial}</span><span class="news-count" aria-hidden="true">${count > 9 ? '9+' : count}</span></button>`;
}
