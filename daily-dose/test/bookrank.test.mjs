import test from 'node:test';
import assert from 'node:assert/strict';
import { bookrankIdentity } from '../server/bookrank.mjs';

const doc = (name, fields) => ({ name, fields: Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, { stringValue: v }])) });
test('Bookrank integration uses verified UID and read-only, user-scoped membership requests', async () => {
  const calls = [];
  const id = bookrankIdentity({ organizerUids: ['verified-uid'], verify: async token => {
    assert.equal(token, 'test-token'); return { uid: 'verified-uid', name: 'Member' };
  }, fetcher: async (url, options) => {
    calls.push({ url, options });
    assert.equal(options.headers.Authorization, 'Bearer test-token');
    let data;
    if (url.endsWith(':runQuery')) data = [{ document: doc('clubs/club-a', { name: 'Bookrank club' }) }];
    else if (url.endsWith('/members/verified-uid')) data = doc('members/verified-uid', { display_name: 'Member', role: 'member' });
    else if (url.includes('/members?')) data = { documents: [doc('members/verified-uid', { display_name: 'Member', email: 'private@example.test' })] };
    else data = doc('clubs/club-a', { name: 'Bookrank club' });
    return new Response(JSON.stringify(data), { status: 200 });
  } });
  const user = await id.authenticate('test-token');
  assert.equal(user.uid, 'verified-uid');
  assert.deepEqual(await id.clubs(user), [{ id: 'club-a', name: 'Bookrank club' }]);
  const club = await id.club(user, 'club-a');
  assert.equal(club.organizer, true);
  assert.deepEqual(club.members.get(user.uid), { name: 'Member' });
  assert.ok(calls.every(c => c.options.method === 'GET' || c.url.endsWith(':runQuery')));
  assert.ok(calls[0].options.body.includes('verified-uid'));
});

test('unknown member and invalid token fail closed', async () => {
  const id = bookrankIdentity({ verify: async () => { throw new Error('invalid'); }, fetcher: async () => new Response('', { status: 404 }) });
  await assert.rejects(id.authenticate('forged'), /sign-in has expired/);
  await assert.rejects(id.club({ uid: 'outsider', token: 'x' }, 'club'), /not a member/);
});
