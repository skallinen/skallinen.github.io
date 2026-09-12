import { createStore } from '../server/store.mjs';
import { createService } from '../server/service.mjs';

export const anthology = { edition: 'Test edition', works: [1, 2, 3, 50].flatMap(day => ['poem', 'story', 'essay'].map((category, i) => ({
  id: `${category[0]}${day}`, day, category, title: `${category} ${day}`, author: 'Test author',
  country: 'Finland', year: '2026', minutes: i + 1, sourceNote: 'Test source',
  blocks: [{ type: 'paragraph', html: '<b>Safe text</b><script>alert(1)</script><img src=x onerror=alert(2)>' }],
}))) };

export function fixture(filename) {
  const store = createStore(filename);
  let now = Date.parse('2026-09-12T09:00:00Z');
  const service = createService(store, anthology, () => now);
  const a = { uid: 'a', name: 'Alice' }, b = { uid: 'b', name: 'Bob' }, c = { uid: 'c', name: 'Cara' };
  const members = new Map([['a', { name: 'Alice' }], ['b', { name: 'Bob' }], ['c', { name: 'Cara' }]]);
  const club = { id: 'club', name: 'Test club', organizer: true, members };
  service.schedule(a, club, { startDate: '2026-09-12', timezone: 'Europe/Helsinki' });
  return { store, service, a, b, c, club, setTime: value => now = Date.parse(value),
    work: (user = a, id = 'p1') => service.feed(user, club).days.flatMap(d => d.works).find(w => w.id === id) };
}
