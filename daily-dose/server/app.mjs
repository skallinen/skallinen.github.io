import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Problem } from './domain.mjs';
import { firebaseConfig } from './bookrank.mjs';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));

export function createApp({ service, identity, demo = null }) {
  const app = express();
  app.disable('x-powered-by');
  app.use((req, res, next) => {
    res.set({ 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer',
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' https://apis.google.com; connect-src 'self' https://*.googleapis.com https://*.firebaseapp.com https://*.firebaseio.com; frame-src https://*.firebaseapp.com https://accounts.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" });
    if (req.path.startsWith('/api/')) res.set('Cache-Control', 'no-store');
    next();
  });
  app.use(express.json({ limit: '8kb', strict: true }));
  app.get('/api/config', (_req, res) => res.json({ demo: Boolean(demo), firebase: demo ? null : firebaseConfig,
    demoUsers: demo?.users.map(u => ({ uid: u.uid, name: u.name })) || [] }));
  app.use('/api', async (req, _res, next) => {
    const match = /^Bearer (\S+)$/.exec(req.get('Authorization') || '');
    if (!match || match[1].length > 10000) throw new Problem(401, 'Please sign in with your Bookrank account.');
    req.user = await identity.authenticate(match[1]);
    next();
  });
  app.get('/api/clubs', async (req, res) => res.json({ clubs: await identity.clubs(req.user),
    me: { uid: req.user.uid, name: req.user.name } }));
  app.use('/api/clubs/:clubId', async (req, _res, next) => {
    if (!/^[\w-]{1,128}$/.test(req.params.clubId)) throw new Problem(400, 'Invalid club.');
    req.club = await identity.club(req.user, req.params.clubId);
    next();
  });
  app.get('/api/clubs/:clubId/feed', (req, res) => res.json(service.feed(req.user, req.club)));
  app.put('/api/clubs/:clubId/schedule', (req, res) => res.json(service.schedule(req.user, req.club, req.body || {})));
  app.get('/api/clubs/:clubId/works/:workId', (req, res) => res.json(service.read(req.user, req.club, req.params.workId)));
  app.post('/api/clubs/:clubId/works/:workId', (req, res) => res.json(service.act(req.user, req.club, req.params.workId, req.body || {})));
  if (demo) app.post('/api/demo/advance', (req, res) => {
    if (req.user.uid !== demo.users[0].uid) throw new Problem(403, 'Only the demo organiser can advance time.');
    demo.advance(); res.json({ advanced: true });
  });
  app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));
  // Only this directory is served: manuscript, SQLite, source witnesses and .env are private.
  app.use(express.static(publicDir, { dotfiles: 'deny', index: 'index.html' }));
  app.use((_req, res) => res.status(404).send('Not found'));
  app.use((error, _req, res, _next) => {
    const status = error instanceof Problem ? error.status : error.type === 'entity.parse.failed' ? 400
      : error.type === 'entity.too.large' ? 413 : 500;
    if (status === 500) console.error('Request failed:', error.message);
    res.status(status).json({ error: status === 500 ? 'Something went wrong. Please try again.' : status === 400 && !(error instanceof Problem) ? 'Invalid request.' : error.message });
  });
  return app;
}
