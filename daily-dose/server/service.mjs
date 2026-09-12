import sanitizeHtml from 'sanitize-html';
import { Problem, addDays, dayNumber, localDate, validateSchedule, validateComment, validateRating, ratingSummary, released, gateOpen } from './domain.mjs';

const clean = html => sanitizeHtml(html, {
  allowedTags: ['i', 'b', 'em', 'strong', 'br', 'sup', 'sub', 'u'], allowedAttributes: {},
});

export function createService(store, anthology, clock = () => Date.now()) {
  const works = new Map(anthology.works.map(w => [w.id, w]));
  const meta = w => ({ id: w.id, day: w.day, category: w.category, title: w.title,
    author: w.author, country: w.country, year: w.year, minutes: w.minutes });

  function available(clubId, workId) {
    const work = works.get(workId);
    const campaign = store.campaign(clubId);
    if (!work) throw new Problem(404, 'Reading not found.');
    if (!released(work, campaign, clock())) throw new Problem(403, 'This reading has not been released yet.');
    return { work, campaign };
  }

  function projection(user, club, work, campaign) {
    const rows = store.reads(club.id, work.id);
    const own = rows.find(r => r.uid === user.uid);
    let reveal = store.db.prepare('SELECT revealed_at FROM reveals WHERE club_id=? AND work_id=?').get(club.id, work.id);
    if (!reveal && gateOpen(work, campaign, rows, club.members, clock())) {
      store.db.prepare('INSERT OR IGNORE INTO reveals VALUES (?,?,?)').run(club.id, work.id, clock());
      reveal = store.db.prepare('SELECT revealed_at FROM reveals WHERE club_id=? AND work_id=?').get(club.id, work.id);
    }
    const date = addDays(campaign.start_date, work.day - 1);
    const result = { ...meta(work), date, mine: own ? {
      status: own.status, onTime: Boolean(own.on_time), completedAt: own.completed_at,
      comment: own.comment, rating: own.rating ?? null, joinedOnDay: Boolean(own.joined_on_day),
    } : null, revealed: Boolean(reveal),
    revealReason: reveal ? null : localDate(clock(), campaign.timezone) <= date ? 'day-open' : 'readers-finishing' };
    // Single gate: private rows never enter the response before publication.
    if (reveal) {
      const completed = rows.filter(r => r.status === 'done' && club.members.has(r.uid));
      result.collective = {
        ratings: ratingSummary(completed),
        revealedAt: reveal.revealed_at,
        onTime: completed.filter(r => r.on_time).length,
        catchUp: completed.filter(r => !r.on_time).length,
        readers: completed.map(r => ({ uid: r.uid, name: club.members.get(r.uid).name,
          onTime: Boolean(r.on_time), completedAt: r.completed_at, rating: r.rating ?? null })),
        comments: completed.filter(r => r.comment).sort((a, b) => b.comment_at - a.comment_at || a.uid.localeCompare(b.uid))
          .map(r => ({ uid: r.uid, name: club.members.get(r.uid).name, text: r.comment,
            at: r.comment_at, onTime: Boolean(r.on_time) })),
      };
    }
    return result;
  }

  return {
    schedule(user, club, { startDate, timezone }) {
      if (!club.organizer) throw new Problem(403, 'Only the organiser can set Day 1.');
      validateSchedule(startDate, timezone, clock());
      return store.transaction(() => {
        const previous = store.campaign(club.id);
        if (previous && (localDate(clock(), previous.timezone) >= previous.start_date || store.allReads(club.id).length)) {
          throw new Problem(409, 'The programme has started. Its dates cannot be moved.');
        }
        store.db.prepare(`INSERT INTO campaigns VALUES (?,?,?,?,?) ON CONFLICT(club_id)
          DO UPDATE SET start_date=excluded.start_date, timezone=excluded.timezone`).run(club.id, startDate, timezone, user.uid, clock());
        return { saved: true };
      });
    },
    feed(user, club) {
      const campaign = store.campaign(club.id);
      const now = clock();
      if (!campaign) return { club: { id: club.id, name: club.name }, organizer: club.organizer,
        campaign: null, days: [], now, me: { uid: user.uid, name: user.name } };
      const today = localDate(now, campaign.timezone);
      const day = dayNumber(campaign.start_date, today);
      const days = [];
      const personal = { completed: 0, onTime: 0, catchUp: 0 };
      for (let n = Math.min(50, day); n >= 1; n--) {
        const entries = anthology.works.filter(w => w.day === n).map(w => projection(user, club, w, campaign));
        days.push({ number: n, date: addDays(campaign.start_date, n - 1), today: n === day, works: entries });
        for (const w of entries) if (w.mine?.status === 'done') {
          personal.completed++;
          personal[w.mine.onTime ? 'onTime' : 'catchUp']++;
        }
      }
      return { club: { id: club.id, name: club.name }, organizer: club.organizer,
        me: { uid: user.uid, name: user.name }, campaign: { startDate: campaign.start_date,
          timezone: campaign.timezone, currentDay: day, today, totalDays: 50,
          editable: today < campaign.start_date && !store.allReads(club.id).length },
        days, personal, now, edition: anthology.edition };
    },
    read(user, club, workId) {
      const { work } = available(club.id, workId);
      return { ...meta(work), sourceNote: work.sourceNote, editorialHold: work.editorialHold,
        blocks: work.blocks.map(b => ({ type: b.type, html: clean(b.html || ''),
          ...(b.lines ? { lines: b.lines.map(l => ({ html: clean(l.html),
            indentEm: Math.min(15, Math.max(0, Number(l.indent_em) || 0)),
            indentSpaces: Math.min(30, Math.max(0, Number(l.indent_spaces) || 0)) })) } : {}),
          ...(b.rows ? { rows: b.rows.map(row => row.map(String)), spans: b.spans || [] } : {}),
        })) };
    },
    act(user, club, workId, payload) {
      const { action } = payload;
      if (!['start', 'complete', 'withdraw', 'comment', 'rate'].includes(action)) throw new Problem(400, 'Unknown reading action.');
      // Reject time/status/UID injection instead of silently accepting backdating.
      if (Object.keys(payload).some(k => !['action', 'comment', 'rating'].includes(k)) || ('rating' in payload && action !== 'rate')) throw new Problem(400, 'Unexpected reading fields.');
      const comment = 'comment' in payload ? validateComment(payload.comment) : undefined;
      const rating = action === 'rate' ? validateRating(payload.rating) : undefined;
      return store.transaction(() => {
        const { work, campaign } = available(club.id, workId);
        const now = clock();
        const onDay = localDate(now, campaign.timezone) === addDays(campaign.start_date, work.day - 1);
        const row = store.reads(club.id, workId).find(r => r.uid === user.uid);
        if (action === 'start') {
          if (!row || row.status === 'withdrawn') {
            store.db.prepare(`INSERT INTO reads (club_id,work_id,uid,status,joined_on_day,started_at)
              VALUES (?,?,?,'reading',?,?) ON CONFLICT(club_id,work_id,uid)
              DO UPDATE SET status='reading', joined_on_day=excluded.joined_on_day, started_at=excluded.started_at`)
              .run(club.id, workId, user.uid, Number(onDay), now);
          }
        } else if (action === 'complete') {
          if (row?.status !== 'done') {
            store.db.prepare(`INSERT INTO reads (club_id,work_id,uid,status,joined_on_day,started_at,completed_at,on_time)
              VALUES (?,?,?,'done',?,?,?,?) ON CONFLICT(club_id,work_id,uid)
              DO UPDATE SET status='done',completed_at=excluded.completed_at,on_time=excluded.on_time`)
              .run(club.id, workId, user.uid, Number(onDay), now, now, Number(onDay));
          }
          if (comment !== undefined) store.db.prepare('UPDATE reads SET comment=?,comment_at=? WHERE club_id=? AND work_id=? AND uid=?')
            .run(comment, now, club.id, workId, user.uid);
        } else if (action === 'withdraw') {
          if (row?.status === 'done') throw new Problem(409, 'A recorded read cannot be undone or backdated.');
          if (row) store.db.prepare("UPDATE reads SET status='withdrawn' WHERE club_id=? AND work_id=? AND uid=?")
            .run(club.id, workId, user.uid);
        } else if (action === 'rate') {
          if (row?.status !== 'done') throw new Problem(409, 'Check off the reading before rating it.');
          store.db.prepare('UPDATE reads SET rating=? WHERE club_id=? AND work_id=? AND uid=?').run(rating, club.id, workId, user.uid);
        } else {
          if (row?.status !== 'done') throw new Problem(409, 'Check off the reading before posting a comment.');
          if (comment === undefined) throw new Problem(400, 'A comment is required.');
          store.db.prepare('UPDATE reads SET comment=?,comment_at=? WHERE club_id=? AND work_id=? AND uid=?')
            .run(comment, now, club.id, workId, user.uid);
        }
        return projection(user, club, work, campaign);
      });
    },
  };
}
