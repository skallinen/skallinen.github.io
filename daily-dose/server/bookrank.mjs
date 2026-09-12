import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { Problem } from './domain.mjs';

// Public Firebase web-app identifiers, shared with ../bookrank/src/config.cljs.
export const firebaseConfig = {
  apiKey: 'AIzaSyCUn2U-L_gipdKcpcXe4r1TCM63dxhDVnM',
  authDomain: 'book-club-e4916.firebaseapp.com',
  projectId: 'book-club-e4916',
  appId: '1:910679044088:web:04f7c993a52c7f393af00d',
};

function value(field) {
  if (!field) return undefined;
  if ('stringValue' in field) return field.stringValue;
  if ('booleanValue' in field) return field.booleanValue;
  if ('arrayValue' in field) return (field.arrayValue.values || []).map(value);
  return undefined;
}
const fields = doc => Object.fromEntries(Object.entries(doc.fields || {}).map(([key, v]) => [key, value(v)]));

export function bookrankIdentity({ organizerUids = [], fetcher = fetch, verify } = {}) {
  const project = firebaseConfig.projectId;
  const app = getApps().find(a => a.name === 'daily-dose-verifier')
    || initializeApp({ projectId: project }, 'daily-dose-verifier');
  const verifyToken = verify || (token => getAuth(app).verifyIdToken(token));
  const base = `https://firestore.googleapis.com/v1/projects/${project}/databases/(default)/documents`;
  const organisers = new Set(organizerUids);

  async function request(user, path, body) {
    let response;
    try {
      response = await fetcher(base + path, {
        method: body ? 'POST' : 'GET',
        headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' },
        ...(body ? { body: JSON.stringify(body) } : {}),
        signal: AbortSignal.timeout(12000),
      });
    } catch { throw new Problem(503, 'Bookrank is unavailable. Please try again shortly.'); }
    if (response.status === 404) return null;
    if ([401, 403].includes(response.status)) throw new Problem(403, 'Bookrank could not confirm your club access.');
    if (!response.ok) throw new Problem(503, 'Could not read Bookrank membership. Please try again.');
    return response.json();
  }

  async function member(user, clubId) {
    return request(user, `/clubs/${encodeURIComponent(clubId)}/members/${encodeURIComponent(user.uid)}`);
  }

  return {
    async authenticate(token) {
      try {
        const decoded = await verifyToken(token);
        return { uid: decoded.uid, name: decoded.name || 'Book club member', token };
      } catch { throw new Problem(401, 'Your sign-in has expired. Please sign in again.'); }
    },
    async clubs(user) {
      const result = await request(user, ':runQuery', { structuredQuery: {
        from: [{ collectionId: 'clubs' }],
        where: { fieldFilter: { field: { fieldPath: 'member_uids' }, op: 'ARRAY_CONTAINS', value: { stringValue: user.uid } } },
      } });
      const found = [];
      for (const row of result || []) {
        if (!row.document) continue;
        const id = row.document.name.split('/').at(-1);
        // The array is a discovery index, not the membership authority.
        if (await member(user, id)) found.push({ id, name: fields(row.document).name || 'Book club' });
      }
      return found;
    },
    async club(user, clubId) {
      if (!await member(user, clubId)) throw new Problem(403, 'You are not a member of this Bookrank club.');
      const doc = await request(user, `/clubs/${encodeURIComponent(clubId)}`);
      if (!doc) throw new Problem(404, 'Club not found.');
      const members = new Map();
      let next = '';
      do {
        const response = await request(user, `/clubs/${encodeURIComponent(clubId)}/members?pageSize=1000${next ? `&pageToken=${encodeURIComponent(next)}` : ''}`);
        for (const m of response?.documents || []) {
          const data = fields(m);
          members.set(m.name.split('/').at(-1), { name: data.display_name || 'Book club member' });
        }
        next = response?.nextPageToken || '';
      } while (next);
      if (!members.has(user.uid)) throw new Problem(403, 'Your club membership has changed.');
      return { id: clubId, name: fields(doc).name || 'Book club', members, organizer: organisers.has(user.uid) };
    },
  };
}
