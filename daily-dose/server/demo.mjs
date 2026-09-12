import { addDays, localDate, Problem } from './domain.mjs';

export function createDemo(store, anthology) {
  const users = [{ uid: 'demo-morgan', name: 'Morgan' }, { uid: 'demo-tess', name: 'Tess' }, { uid: 'demo-alex', name: 'Alex' }];
  let time = Date.now();
  const clock = () => time;
  const members = new Map(users.map(u => [u.uid, { name: u.name }]));
  const id = 'better-book-club-demo';
  const today = localDate(time, 'Europe/Helsinki');
  const start = addDays(today, -2);
  store.db.prepare('INSERT INTO campaigns VALUES (?,?,?,?,?)').run(id, start, 'Europe/Helsinki', users[0].uid, time);
  const insert = store.db.prepare(`INSERT INTO reads
    (club_id,work_id,uid,status,joined_on_day,started_at,completed_at,on_time,comment,comment_at)
    VALUES (?,?,?,?,?,?,?,?,?,?)`);
  for (const work of anthology.works.filter(w => w.day === 1)) {
    for (const [n, user] of users.entries()) {
      const when = Date.parse(`${start}T12:00:00Z`) + n * 60000;
      const thoughts = ['A small reading, but it stayed with me all afternoon.', 'I read the last lines twice. They change the beginning.', 'Something to bring to our next conversation.'];
      insert.run(id, work.id, user.uid, 'done', 1, when - 120000, when, 1, thoughts[n], when);
    }
  }
  const yesterday = anthology.works.find(w => w.day === 2 && w.category === 'poem');
  const when = Date.parse(`${addDays(start, 1)}T12:00:00Z`);
  insert.run(id, yesterday.id, users[0].uid, 'done', 1, when, when, 1, 'A thought waiting for the last reader.', when);
  insert.run(id, yesterday.id, users[1].uid, 'reading', 1, when, null, 0, '', null);
  return {
    users, clock,
    advance() { time += 86400000; },
    identity: {
      async authenticate(token) {
        const user = users.find(u => `demo:${u.uid}` === token);
        if (!user) throw new Problem(401, 'Choose a demo participant.');
        return user;
      },
      async clubs() { return [{ id, name: 'Better Book Club · demo' }]; },
      async club(user, clubId) {
        if (clubId !== id || !members.has(user.uid)) throw new Problem(403, 'Not a member of this demo club.');
        return { id, name: 'Better Book Club · demo', members, organizer: user.uid === users[0].uid };
      },
    },
  };
}
