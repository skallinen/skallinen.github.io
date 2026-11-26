// The delay per input in the thought box by how much is already typed
// (26.11.2026; TESTBED.md "Typing by length"). A measurement, not a check.
// On a running bed at Day 61 with a busy club:
//   VOLUME3=1 DAY1_OFFSET=60 scripts/testbed.sh start && node testbed/seed-finished.mjs
//   node testbed/measure-typing-length.mjs > result.json
// Mikko types a 188-character thought into today's essay (past the 140
// limit) at 390 px with touch: Chromium at 4x CPU (CPU=n) and a phone
// network, or BROWSER=webkit (no throttling there). Kinds of input (MODES):
// keys (key presses), words (a word at a time, insertText), ime (a
// composition per letter and a commit per word, as Android keyboards with
// suggestions send), auto (ime with a typo, then the word replaced, as
// autocorrect does). Thinking pauses of 1.5 s let the draft saves run. Each
// kind is typed twice (PASSES): idle, and active, with a second member
// rewriting thoughts every 1.5 s (testbed/live-member.mjs). Per input: the
// beforeinput timestamp to just after the next paint, and the app's input
// handler. TRACE=1 adds a Chromium trace per pass, main-thread time by kind
// in thirds of the pass. It writes Mikko's draft on that text.
import { chromium, webkit } from 'playwright';
import { writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
const label = process.env.LABEL || 'run';
const wk = process.env.BROWSER === 'webkit';
const outDir = process.env.OUT || '/tmp/dd-len/out';
const ID = process.env.TYPE_ID || 'E61';
const MODES = (process.env.MODES || (wk ? 'keys words' : 'keys words ime auto')).split(' ');
const PASSES = (process.env.PASSES || 'idle active').split(' ');
const THOUGHT = 'The sea kept its own counsel while the gulls argued over the harbour, and I kept thinking of my grandmother in her kitchen with the radio on, long winter evenings and then the quiet after.';
const words = THOUGHT.split(' ');
const browser = await (wk ? webkit : chromium).launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: !wk, deviceScaleFactor: 2 });
const page = await context.newPage();
page.on('pageerror', e => console.error('pageerror', e.message));
const cdp = wk ? null : await context.newCDPSession(page);
if (cdp) {
  await cdp.send('Performance.enable');
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: Number(process.env.CPU || 4) });
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 0.75e6 / 8 });
}
await page.addInitScript(() => {
  // The 30-second refresh runs as usual; its runs are logged.
  window.__ev = []; window.__long = []; window.__refresh = [];
  const si = window.setInterval;
  window.setInterval = (f, ms, ...a) => ms === 30000 ? si(() => { const t = performance.now(); f(); window.__refresh.push(t); }, ms, ...a) : si(f, ms, ...a);
  let cur = null;
  addEventListener('beforeinput', e => {
    if (!e.target?.dataset?.draft) return;
    const k = { t: e.timeStamp, type: e.inputType, len: e.target.value.length };
    window.__ev.push(k); cur = k;
    requestAnimationFrame(() => { const ch = new MessageChannel(); ch.port1.onmessage = () => { k.paint = performance.now() - k.t; }; ch.port2.postMessage(0); });
  }, true);
  addEventListener('input', () => { if (cur) cur.h0 = performance.now(); }, true);
  addEventListener('input', () => { if (cur) { cur.handler = performance.now() - cur.h0; cur = null; } }, false);
  try { new PerformanceObserver(l => { for (const e of l.getEntries()) window.__long.push([e.startTime, e.duration]); }).observe({ type: 'longtask', buffered: true }); } catch {}
});
await page.goto('http://127.0.0.1:5178/');
const popup = context.waitForEvent('page');
await page.getByRole('button', { name: /Sign in with Google/ }).click();
const chooser = await popup; await chooser.waitForLoadState('domcontentloaded');
await chooser.getByText('Mikko Saarinen', { exact: true }).click();
await page.waitForFunction(() => document.querySelectorAll('article[data-work]').length >= 183 && !document.querySelector('.feed-loading, .cell.waiting'), null, { timeout: 240000, polling: 300 });
await page.waitForTimeout(5000);
const ta = page.locator(`textarea[data-draft="${ID}"]`);
await ta.scrollIntoViewIfNeeded(); await ta.click();
const pause = ms => page.waitForTimeout(ms);
const sel = (a, b) => page.evaluate(([id, a, b]) => document.querySelector(`textarea[data-draft="${id}"]`).setSelectionRange(a, b), [ID, a, b]);
const ins = t => wk ? page.keyboard.insertText(t) : cdp.send('Input.insertText', { text: t });
async function typeMode(mode) {
  for (const [i, w] of words.entries()) {
    const word = i < words.length - 1 ? w + ' ' : w;
    if (mode === 'keys') await page.keyboard.type(word, { delay: 110 });
    else if (mode === 'words') { await ins(word); await pause(350); }
    else {
      const typo = mode === 'auto' && w.length > 3 ? w.slice(0, -2) + w.at(-1) + w.at(-2) : w;
      for (let j = 1; j <= typo.length; j++) { await cdp.send('Input.imeSetComposition', { text: typo.slice(0, j), selectionStart: j, selectionEnd: j }); await pause(110); }
      await ins(typo);
      if (typo !== w) { const end = await ta.evaluate(e => e.value.length); await sel(end - typo.length, end); await ins(w); }
      if (i < words.length - 1) await ins(' ');
      await pause(110);
    }
    if (i % 6 === 5) await pause(1500); // a pause to think: the draft save runs
  }
}
const pct = (xs, p) => { const s = xs.filter(x => x != null).sort((a, b) => a - b); return s.length ? Math.round(s[Math.min(s.length - 1, Math.floor(p * s.length))] * 10) / 10 : null; };
const metrics = async () => cdp ? Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m => [m.name, m.value])) : {};
const result = { label, browser: wk ? 'webkit' : 'chromium', chars: THOUGHT.length, runs: [] };
for (const passName of PASSES) {
  let child = null;
  if (passName === 'active') { child = spawn('node', ['testbed/live-member.mjs'], { stdio: ['ignore', 'ignore', 'inherit'] }); await pause(3000); }
  for (const mode of MODES) {
    await ta.fill(''); await pause(2500);
    await page.evaluate(() => { window.__ev = []; window.__long = []; window.__refresh = []; });
    const m0 = await metrics();
    const t0 = await page.evaluate(() => performance.now());
    const tracing = cdp && process.env.TRACE === '1';
    const chunks = [];
    if (tracing) {
      cdp.on('Tracing.dataCollected', d => chunks.push(...d.value));
      await cdp.send('Tracing.start', { categories: 'devtools.timeline,disabled-by-default-devtools.timeline', transferMode: 'ReportEvents' });
    }
    await typeMode(mode);
    if (tracing) {
      const done = new Promise(r => cdp.once('Tracing.tracingComplete', r));
      await cdp.send('Tracing.end'); await done;
      writeFileSync(`${outDir}/${label}-${passName}-${mode}.trace.json`, JSON.stringify({ traceEvents: chunks }));
      // Main-thread time by kind, in thirds of the pass (the text grows with time).
      const main = chunks.filter(e => e.ph === 'X' && e.dur && ['Layout', 'UpdateLayoutTree', 'PrePaint', 'Paint', 'Layerize', 'EventDispatch', 'FunctionCall', 'ParseHTML', 'TimerFire', 'RunMicrotasks', 'v8.run', 'FireAnimationFrame', 'HitTest'].includes(e.name));
      const ts = main.map(e => e.ts), a = Math.min(...ts), z = Math.max(...ts), third = (z - a) / 3;
      const by = [0, 1, 2].map(() => ({}));
      for (const e of main) { const k = Math.min(2, Math.floor((e.ts - a) / third)); by[k][e.name] = (by[k][e.name] || 0) + e.dur / 1000; }
      console.error(label, passName, mode, 'trace thirds (ms)', JSON.stringify(by.map(o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Math.round(v)])))));
      result.trace = result.trace || {}; result.trace[`${passName}-${mode}`] = by;
    }
    await pause(1500);
    const m1 = await metrics();
    const { ev, long, refresh } = await page.evaluate(() => ({ ev: window.__ev, long: window.__long, refresh: window.__refresh }));
    const value = await ta.inputValue();
    const buckets = [];
    for (let b = 0; b < 200; b += 20) {
      const xs = ev.filter(e => e.len >= b && e.len < b + 20);
      if (!xs.length) continue;
      buckets.push({ from: b, n: xs.length, med: pct(xs.map(e => e.paint), 0.5), p95: pct(xs.map(e => e.paint), 0.95), max: pct(xs.map(e => e.paint), 1), hMed: pct(xs.map(e => e.handler), 0.5), hMax: pct(xs.map(e => e.handler), 1) });
    }
    const height = await ta.evaluate(e => e.offsetHeight);
    const run = { pass: passName, mode, inputs: ev.length, ok: value === THOUGHT, valueLen: value.length, height, count: await page.locator(`form[data-comment-form="${ID}"] .char-count`).textContent(),
      longTasks: long.filter(([s]) => s >= t0).map(([s, d]) => Math.round(d)), refreshes: refresh.length, buckets,
      layoutMs: cdp ? Math.round((m1.LayoutDuration - m0.LayoutDuration) * 1000) : null, scriptMs: cdp ? Math.round((m1.ScriptDuration - m0.ScriptDuration) * 1000) : null, layouts: cdp ? m1.LayoutCount - m0.LayoutCount : null };
    result.runs.push(run);
    console.error(label, passName, mode, JSON.stringify(buckets.map(b => [b.from, b.med, b.p95, b.max, b.hMed])));
    writeFileSync(`${outDir}/${label}-${passName}-${mode}.json`, JSON.stringify({ run, ev }));
  }
  if (child) child.kill();
}
await page.screenshot({ path: `${outDir}/${label}.png` });
console.log(JSON.stringify(result));
await browser.close();
