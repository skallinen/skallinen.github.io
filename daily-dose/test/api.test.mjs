import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server/app.mjs';
import { Problem } from '../server/domain.mjs';
import { fixture } from './fixtures.mjs';

test('HTTP API rejects nonmembers and withholds unrevealed data on every response', async t => {
  const f = fixture();
  const identity = {
    async authenticate(token) { if (!['a','b','outsider'].includes(token)) throw new Problem(401, 'Bad token'); return { uid: token, name: token }; },
    async clubs(user) { return user.uid === 'outsider' ? [] : [{ id: 'club', name: 'Test club' }]; },
    async club(user, id) {
      if (id !== 'club' || !f.club.members.has(user.uid)) throw new Problem(403, 'Not a member');
      return { ...f.club, organizer: user.uid === 'a' };
    },
  };
  const server = createApp({ service: f.service, identity }).listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => { server.close(); f.store.close(); });
  const base = `http://127.0.0.1:${server.address().port}`;
  const request = (url, uid = 'a', options = {}) => fetch(base + url, { ...options,
    headers: { ...(uid ? { Authorization: `Bearer ${uid}` } : {}), 'Content-Type': 'application/json' },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}) });
  assert.equal((await request('/api/clubs/club/feed', null)).status, 401);
  assert.equal((await request('/api/clubs/club/feed', 'outsider')).status, 403);
  assert.equal((await request('/api/clubs/club/works/p1', 'outsider')).status, 403);
  assert.equal((await request('/api/clubs/club/works/p2')).status, 403);
  assert.equal((await request('/api/clubs/club/schedule', 'b', { method: 'PUT', body: { startDate: '2026-09-15', timezone: 'Europe/Helsinki' } })).status, 403);
  await request('/api/clubs/club/works/p1', 'b', { method: 'POST', body: { action: 'complete', comment: 'SECRET FROM BOB' } });
  const action = await (await request('/api/clubs/club/works/p1', 'a', { method: 'POST', body: { action: 'start' } })).json();
  assert.equal('collective' in action, false);
  const response = await request('/api/clubs/club/feed');
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal((await response.text()).includes('SECRET FROM BOB'), false);
  assert.equal((await request('/data/anthology.json')).status, 404);
  assert.equal((await request('/server/store.mjs')).status, 404);
  assert.equal((await request('/.env')).status, 404);
  assert.equal((await request('/api/demo/advance', 'a', { method: 'POST' })).status, 404);
  f.club.members.delete('a');
  assert.equal((await request('/api/clubs/club/feed', 'a')).status, 403);
});
