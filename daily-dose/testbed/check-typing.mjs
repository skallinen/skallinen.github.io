// Headless check of the delay per key in the thought box, in Chromium at
// phone width (CHECK_WIDTH, default 390) with a phone's CPU (4x slower,
// TYPING_CPU) and network (150 ms, 1.6 Mbit/s), on a running bed with a busy
// club at Day 61:
//   VOLUME3=1 DAY1_OFFSET=60 scripts/testbed.sh start && node testbed/seed-finished.mjs
//   node testbed/check-typing.mjs          # CHECK_SHOTS=dir keeps screenshots
// Mikko types 60 characters into today's essay (TYPE_ID, default E61), one
// key every 100 ms: once with nothing else going on, once through the
// 30-second refresh (fired after the tenth key; the page's own 30-second
// timer is held back so it cannot land elsewhere), once right after a draft
// save started. Per key, the time from the keydown to just after the next
// paint (requestAnimationFrame, then a message) must stay under 50 ms for
// 95% of the keys and under 200 ms for every key (200 ms is where the Web
// Vitals call a response to input slow). The box keeps every character, the
// count and the hint follow, focus stays, and the draft saves privately.
// Exit 1 on the first failure or a console error. It writes to the bed
// (Mikko's draft on that text); reseed before a run that needs it empty.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const URL = process.env.TOUR_URL || 'http://127.0.0.1:5178/';
const WIDTH = Number(process.env.CHECK_WIDTH || 390);
const CPU = Number(process.env.TYPING_CPU || 4);
const ID = process.env.TYPE_ID || 'E61';
const P95_MS = 50, MAX_MS = 200;
const SHOTS = process.env.CHECK_SHOTS ? resolve(process.env.CHECK_SHOTS) : null;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME ? { executablePath: process.env.CHROME } : {}) });
const errors = [];
let step = 0, page;
const ok = message => console.log(`  ok    ${message}`);
function expect(condition, message) { if (!condition) throw new Error(message); ok(message); }
async function shot(name) { if (SHOTS) await page.screenshot({ path: join(SHOTS, `typing-${String(++step).padStart(2, '0')}-${name}-${WIDTH}.png`) }); }
const pct = (xs, p) => { const s = [...xs].sort((a, b) => a - b); return Math.round(s[Math.min(s.length - 1, Math.floor(p * s.length))]); };
const TEXT = 'The sea kept its own counsel and the gulls argued over that.';

try {
  const context = await browser.newContext({ viewport: { width: WIDTH, height: 844 }, hasTouch: WIDTH < 700, deviceScaleFactor: 2 });
  page = await context.newPage();
  // The two emulator 400s TESTBED.md describes are not errors here.
  const benign = r => r.status() === 400 && /documents:commit|TYPE=terminate/.test(r.url());
  page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/podcast/') && !benign(r)) errors.push(`HTTP ${r.status()} ${r.url().slice(0, 120)}`); });
  page.on('console', m => { if (m.type() === 'error' && !m.location()?.url?.includes('/podcast/') && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  page.on('pageerror', e => errors.push(e.message));
  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: CPU });
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 0.75e6 / 8 });
  await page.addInitScript(() => {
    const si = window.setInterval;
    window.setInterval = (f, ms, ...a) => { if (ms === 30000) { window.__refresh30 = f; return si(() => {}, 1e9); } return si(f, ms, ...a); };
    window.__keys = [];
    document.addEventListener('keydown', e => {
      const k = { t: e.timeStamp };
      window.__keys.push(k);
      requestAnimationFrame(() => { const ch = new MessageChannel(); ch.port1.onmessage = () => { k.ms = performance.now() - k.t; }; ch.port2.postMessage(0); });
    }, true);
  });
  await page.goto(URL);
  const popup = context.waitForEvent('page');
  await page.getByRole('button', { name: /Sign in with Google/ }).click();
  const chooser = await popup;
  await chooser.waitForLoadState('domcontentloaded');
  await chooser.getByText('Mikko Saarinen', { exact: true }).click();
  await page.waitForFunction(() => document.querySelectorAll('article[data-work]').length >= 183 && !document.querySelector('.feed-loading, .cell.waiting'), null, { timeout: 240000, polling: 200 });
  await page.waitForTimeout(5000);
  const box = page.locator(`textarea[data-draft="${ID}"]`), form = page.locator(`form[data-comment-form="${ID}"]`);
  const status = form.locator('.draft-status');
  await box.scrollIntoViewIfNeeded();
  await box.click();

  async function pass(name, { refreshAt = -1, from = 0 } = {}) {
    await box.fill('');
    await page.waitForTimeout(2500);
    await page.evaluate(() => { window.__keys = []; });
    if (from) {
      await page.keyboard.type(TEXT.slice(0, from), { delay: 100 });
      await page.waitForFunction(id => /Saving/.test(document.querySelector(`#draft-status-${id}`)?.textContent || ''), ID, { timeout: 30000, polling: 20 });
    }
    const first = await page.evaluate(() => window.__keys.length);
    for (const [i, ch] of [...TEXT].entries()) {
      if (i < from) continue;
      if (i === refreshAt) await page.evaluate(() => { setTimeout(() => window.__refresh30(), 0); });
      await page.keyboard.type(ch);
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(1000);
    const ms = (await page.evaluate(() => window.__keys)).slice(first).map(k => k.ms).filter(x => x != null);
    const p95 = pct(ms, 0.95), max = Math.round(Math.max(...ms));
    expect(ms.length === TEXT.length - from, `${name}: ${ms.length} keys timed (median ${pct(ms, 0.5)} ms, 95% ${p95} ms, longest ${max} ms)`);
    expect(p95 < P95_MS, `${name}: 95% of keys reach the screen within ${P95_MS} ms`);
    expect(max < MAX_MS, `${name}: every key reaches the screen within ${MAX_MS} ms`);
    expect(await box.inputValue() === TEXT, `${name}: the box holds every character typed`);
    expect(await page.evaluate(id => document.activeElement?.dataset?.draft === id, ID), `${name}: focus stays in the box`);
    expect(await form.locator('.char-count').textContent() === `${TEXT.length} / 140`, `${name}: the count follows (${TEXT.length} / 140)`);
    expect((await form.locator('.form-hint').textContent()) === '' && await form.locator('button[type="submit"]').getAttribute('aria-disabled') === 'false', `${name}: nothing missing, Finish & reveal is ready`);
    await shot(name);
  }
  await pass('steady');
  expect(await page.evaluate(() => typeof window.__refresh30 === 'function'), 'the 30-second refresh is held for the check to fire');
  await pass('refresh', { refreshAt: 10 });
  await pass('after-save', { from: 20 });
  await status.filter({ hasText: 'Draft saved privately.' }).waitFor({ timeout: 30000 });
  ok('the draft saves privately');
  const locked = await page.locator(`#locked-${ID} .locked-text`).textContent();
  expect(/Ready\. Choose “Finish & reveal”/.test(locked), 'the hint under the card says it is ready to finish');
  await page.reload();
  await page.locator(`textarea[data-draft="${ID}"]`).waitFor({ timeout: 120000 });
  expect(await page.locator(`textarea[data-draft="${ID}"]`).inputValue() === TEXT, 'after a reload the draft is back in the box');
  expect(errors.length === 0, `no console errors${errors.length ? `: ${errors.join(' | ')}` : ''}`);
  console.log('All checks passed.');
} catch (error) {
  console.error(`  FAIL  ${error.message}`);
  if (errors.length) console.error(`  console: ${errors.join(' | ')}`);
  if (SHOTS && page) await page.screenshot({ path: join(SHOTS, `typing-failed-${WIDTH}.png`) }).catch(() => {});
  process.exitCode = 1;
} finally { await browser.close(); }
