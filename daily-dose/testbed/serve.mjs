// Static server for the test bed page. / and /assets come from testbed/site,
// /public from the source's public/ (styles, favicon), as on GitHub Pages.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, normalize, extname } from 'node:path';
import { ports, host } from './config.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png' };
// The podcast stand-in (see seed.mjs): a quiet 60-second WAV for Days 1 to 4,
// 404 for later days, with byte ranges so the player can seek.
function wav(seconds = 60, rate = 8000) {
  const n = seconds * rate, b = Buffer.alloc(44 + n, 128);
  b.write('RIFF', 0); b.writeUInt32LE(36 + n, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(rate, 24); b.writeUInt32LE(rate, 28); b.writeUInt16LE(1, 32); b.writeUInt16LE(8, 34); b.write('data', 36); b.writeUInt32LE(n, 40);
  return b;
}
const episode = wav();
createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  const pod = path.match(/^\/podcast\/episodes\/daily-dose-day-(\d\d)\.wav$/);
  if (pod) {
    if (Number(pod[1]) > 4) { res.writeHead(404).end(); return; }
    const r = (req.headers.range || '').match(/bytes=(\d*)-(\d*)/), size = episode.length;
    const start = r?.[1] ? Number(r[1]) : 0, end = r?.[2] ? Math.min(Number(r[2]), size - 1) : size - 1;
    res.writeHead(r ? 206 : 200, { 'Content-Type': 'audio/wav', 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1,
      ...(r ? { 'Content-Range': `bytes ${start}-${end}/${size}` } : {}) });
    res.end(episode.subarray(start, end + 1));
    return;
  }
  const file = path === '/' ? join(here, 'site/index.html')
    : path.startsWith('/public/') ? join(here, '..', path) : join(here, 'site', path);
  if (path.includes('..') || path === '/public/app.js') { res.writeHead(404).end(); return; }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' }).end(body);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(ports.page, host, () => console.log(`Daily Dose test bed: http://${host}:${ports.page}/`));
