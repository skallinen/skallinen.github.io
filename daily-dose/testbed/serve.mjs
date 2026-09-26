// Static server for the test bed page. / and /assets come from testbed/site,
// /public from the source's public/ (styles, favicon), as on GitHub Pages.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, normalize, extname } from 'node:path';
import { ports, host } from './config.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png' };
createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  const file = path === '/' ? join(here, 'site/index.html')
    : path.startsWith('/public/') ? join(here, '..', path) : join(here, 'site', path);
  if (path.includes('..') || path === '/public/app.js') { res.writeHead(404).end(); return; }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' }).end(body);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(ports.page, host, () => console.log(`Daily Dose test bed: http://${host}:${ports.page}/`));
