import { DatabaseSync } from 'node:sqlite';

export function createStore(filename = ':memory:') {
  const db = new DatabaseSync(filename);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS campaigns (
      club_id TEXT PRIMARY KEY, start_date TEXT NOT NULL, timezone TEXT NOT NULL,
      created_by TEXT NOT NULL, created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS reads (
      club_id TEXT NOT NULL, work_id TEXT NOT NULL, uid TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('reading','done','withdrawn')),
      joined_on_day INTEGER NOT NULL DEFAULT 0, started_at INTEGER,
      completed_at INTEGER, on_time INTEGER NOT NULL DEFAULT 0,
      comment TEXT NOT NULL DEFAULT '', comment_at INTEGER,
      PRIMARY KEY(club_id, work_id, uid)
    );
    CREATE TABLE IF NOT EXISTS reveals (
      club_id TEXT NOT NULL, work_id TEXT NOT NULL, revealed_at INTEGER NOT NULL,
      PRIMARY KEY(club_id, work_id)
    );`);
  return {
    db,
    campaign: club => db.prepare('SELECT * FROM campaigns WHERE club_id=?').get(club),
    reads: (club, work) => db.prepare('SELECT * FROM reads WHERE club_id=? AND work_id=?').all(club, work),
    allReads: club => db.prepare('SELECT * FROM reads WHERE club_id=?').all(club),
    transaction(fn) {
      db.exec('BEGIN IMMEDIATE');
      try { const result = fn(); db.exec('COMMIT'); return result; }
      catch (error) { db.exec('ROLLBACK'); throw error; }
    },
    close() { db.close(); },
  };
}
