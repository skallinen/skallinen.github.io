// Headless check of "The box at first paint" and "Outbox for saves"
// (SPEC.md) in Chromium at phone width (CHECK_WIDTH, default 390), on a
// running bed with a busy club at Day 61 (Mikko has checked off and rated
// today's three texts, not finished them):
//   VOLUME3=1 DAY1_OFFSET=60 scripts/testbed.sh start && node testbed/seed-finished.mjs
//   node testbed/check-first-paint.mjs          # CHECK_SHOTS=dir keeps screenshots
// 1. Slow network: Mikko loads once, then every request to the emulators is
//    held back (SLOW_MS, default 1500 ms each) and he reloads: today's cards
//    are drawn from the copy on his phone and the thought box takes keys
//    within 1 s; his text, focus and caret stay when the live data arrives,
//    and the draft is then saved to his account.
// 2. Cut network: the same with the emulators out of reach; the box works
//    at once, says the draft waits on the phone, and once they are back the
//    page connects by itself and sends it.
// 3. Offline: he types a thought and chooses Finish & reveal with the
//    network off ("Sharing your response…"), reloads with the emulators
//    still out of reach (the outbox survives the reload), and once they are
//    back it is sent; Grace finishes the same text and sees his thought.
// 4. Two devices of his own: a draft typed offline on one meets a different
//    thought saved later on the other: the newer one is kept on both
//    orders, with the note "Your other device saved a different thought".
// Exit 1 on the first failure or an unexpected console error. It writes to
// the bed: reseed before running it again.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const URL = process.env.TOUR_URL || 'http://127.0.0.1:5178/';
const WIDTH = Number(process.env.CHECK_WIDTH || 390);
const SLOW_MS = Number(process.env.SLOW_MS || 1500);
const BOX_MS = 1000;
const SHOTS = process.env.CHECK_SHOTS ? resolve(process.env.CHECK_SHOTS) : null;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME ? { executablePath: process.env.CHROME } : {}) });
const errors = [], notes = [], pages = [];
const T0 = Date.now();
const results = {};
let step = 0;
const ok = message => console.log(`  ok    ${message}`);
function expect(condition, message) { if (!condition) throw new Error(message); ok(message); }
async function shot(page, name) { if (SHOTS) await page.screenshot({ path: join(SHOTS, `paint-${String(++step).padStart(2, '0')}-${name}-${WIDTH}.png`) }); }
const EMULATORS = /127\.0\.0\.1:(8290|9199)\//;
// What a page says while it cannot reach the emulators is not an error here.
const offlineNoise = text => /Could not reach Cloud Firestore|client is offline|ERR_INTERNET_DISCONNECTED|ERR_FAILED|net::|network-request-failed|WebChannelConnection|unavailable|Failed to fetch|Not connected/i.test(text);

async function signIn(name) {
  const context = await browser.newContext({ viewport: { width: WIDTH, height: 800 }, hasTouch: WIDTH < 700, deviceScaleFactor: 2 });
  const page = await context.newPage();
  const benign = r => r.status() === 400 && /documents:commit|TYPE=terminate/.test(r.url());
  page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/podcast/') && !benign(r)) errors.push(`${name}: HTTP ${r.status()} ${r.url().slice(0, 120)}`); });
  page.on('console', m => { if (m.type() === 'error' && !m.location()?.url?.includes('/podcast/') && !/Failed to load resource/.test(m.text()) && !offlineNoise(m.text())) errors.push(`${name}: ${m.text()}`); });
  page.on('pageerror', e => errors.push(`${name}: ${e.message}`));
  page.on('console', m => { if (['warning', 'error'].includes(m.type()) && !/Failed to load resource/.test(m.text())) notes.push(`${((Date.now() - T0) / 1000).toFixed(1)} ${name}: ${m.text().slice(0, 160)}`); });
  pages.push([name, page]);
  page.on('dialog', d => d.accept().catch(() => {}));
  // When the thought box first appears and when the first key reaches it, in ms from the start of the navigation.
  await page.addInitScript(() => {
    window.__box = null; window.__key = null;
    new MutationObserver(() => { if (window.__box == null && document.querySelector('textarea[data-draft]')) window.__box = performance.now(); })
      .observe(document, { childList: true, subtree: true });
    document.addEventListener('input', e => { if (window.__key == null && e.target.matches?.('textarea[data-draft]')) window.__key = performance.now(); }, true);
  });
  await page.goto(URL);
  const popup = context.waitForEvent('page');
  await page.getByRole('button', { name: /Sign in with Google/ }).click();
  const chooser = await popup;
  await chooser.waitForLoadState('domcontentloaded');
  await chooser.getByText(name, { exact: true }).click();
  page.context().name = name;
  return page;
}
const card = (page, id) => page.locator(`article[data-work="${id}"]`);
const box = (page, id) => page.locator(`textarea[data-draft="${id}"]`);
const status = (page, id) => page.locator(`#draft-status-${id}`);
const full = page => page.waitForFunction(() => document.querySelectorAll('article[data-work]').length >= 183 && !document.querySelector('.feed-loading'), null, { timeout: 180000, polling: 100 });
const hasCopy = page => page.waitForFunction(() => !!localStorage.getItem('daily-dose-paint'), null, { timeout: 30000 });
// Hold back (ms) or cut (null) every request to the emulators; `restore` lets them through again.
async function throttle(page, ms) {
  await page.route(EMULATORS, async route => {
    if (ms == null) return route.abort('internetdisconnected').catch(() => {});
    await new Promise(r => setTimeout(r, ms));
    return route.continue().catch(() => {});
  });
}
const restore = page => page.unroute(EMULATORS);
const outboxLine = 'Saved on this phone, sending when connected.';
const TODAY = { poem: 'P61', story: 'S61', essay: 'E61' };

try {
  const mikko = await signIn('Mikko Saarinen');
  await full(mikko);
  await hasCopy(mikko);
  const copy = await mikko.evaluate(() => JSON.parse(localStorage.getItem('daily-dose-paint')));
  const kept = copy.feed.days.find(d => d.today).works;
  expect(kept.length === 3 && kept.every(w => w.title && w.mine?.status === 'done' && !w.collective) && copy.feed.days.filter(d => !d.today).every(d => d.works.every(w => w.loading && !w.mine)),
    'after a load the phone keeps today\'s three cards (with his checkmarks and stars, without the club\'s thoughts) and only the outline of the earlier days');

  // ---------- 1. slow network
  const ID = TODAY.poem, TEXT = 'Typed before the data came.';
  await throttle(mikko, SLOW_MS);
  let t0 = Date.now();
  await mikko.reload({ waitUntil: 'commit' });
  await box(mikko, ID).waitFor({ timeout: 10000 });
  await box(mikko, ID).click();
  await mikko.keyboard.type(TEXT, { delay: 30 });
  const slow = await mikko.evaluate(() => ({ box: window.__box, key: window.__key, cards: document.querySelectorAll('article[data-work]').length, loading: !!document.querySelector('.feed-loading'), copy: !!document.querySelector('.feed-loading') }));
  results.slowBox = Math.round(slow.box); results.slowKey = Math.round(slow.key);
  await shot(mikko, 'slow-first-paint');
  expect(slow.box < BOX_MS && slow.key < BOX_MS + 1000, `slow network (${SLOW_MS} ms per request): the box is there ${results.slowBox} ms after the reload began, the first key reached it at ${results.slowKey} ms`);
  expect(slow.cards === 3 && slow.loading, `drawn from the copy: today's ${slow.cards} cards, "Loading earlier days…" below`);
  await full(mikko);
  results.slowLive = Date.now() - t0;
  const after = await mikko.evaluate(id => ({ value: document.querySelector(`textarea[data-draft="${id}"]`).value, focus: document.activeElement?.dataset?.draft, caret: document.activeElement?.selectionStart }), ID);
  expect(after.value === TEXT && after.focus === ID && after.caret === TEXT.length, `the live data arrived ${(results.slowLive / 1000).toFixed(1)} s after the reload: his text, focus and caret stay in the box`);
  await status(mikko, ID).filter({ hasText: 'Draft saved privately.' }).waitFor({ timeout: 30000 });
  ok('and the draft is saved to his account');
  await restore(mikko);

  // ---------- 2. cut network
  await mikko.locator('h1').first().click();
  await throttle(mikko, null);
  t0 = Date.now();
  await mikko.reload({ waitUntil: 'commit' });
  await box(mikko, TODAY.essay).waitFor({ timeout: 10000 });
  await box(mikko, TODAY.essay).click();
  const CUT = 'Typed with no connection at all.';
  await mikko.keyboard.type(CUT, { delay: 30 });
  const cut = await mikko.evaluate(() => ({ box: window.__box, key: window.__key }));
  results.cutBox = Math.round(cut.box); results.cutKey = Math.round(cut.key);
  expect(cut.box < BOX_MS, `cut network: the box is there ${results.cutBox} ms after the reload began, the first key reached it at ${results.cutKey} ms`);
  expect(await box(mikko, ID).inputValue() === TEXT, 'the saved draft from before is in its box');
  await status(mikko, TODAY.essay).filter({ hasText: outboxLine }).waitFor({ timeout: 20000 });
  await shot(mikko, 'cut-waiting');
  ok(`the line under the box says "${outboxLine}"`);
  await mikko.waitForTimeout(3000);
  expect(await mikko.locator('article[data-work]').count() === 3, 'nothing more arrives while the emulators are out of reach, and the page stays as it is');
  const back = Date.now();
  await restore(mikko);
  await full(mikko);
  results.cutLive = Date.now() - back;
  expect(await box(mikko, TODAY.essay).inputValue() === CUT && await mikko.evaluate(() => document.activeElement?.dataset?.draft) === TODAY.essay, `back in reach: the page connects by itself ${(results.cutLive / 1000).toFixed(1)} s later, and the box still holds his text with focus`);
  await status(mikko, TODAY.essay).filter({ hasText: 'Draft saved privately.' }).waitFor({ timeout: 60000 });
  results.cutSaved = Date.now() - back;
  ok(`the waiting draft is saved ${(results.cutSaved / 1000).toFixed(1)} s after the emulators came back`);

  // ---------- 3. offline: Finish & reveal waits on the phone, across a reload
  const S = TODAY.story, SHARED = 'Written offline, sent later.';
  await mikko.locator('h1').first().click();
  await mikko.context().setOffline(true);
  await card(mikko, S).scrollIntoViewIfNeeded();
  await box(mikko, S).fill(SHARED);
  await card(mikko, S).getByRole('button', { name: 'Finish & reveal' }).click();
  await card(mikko, S).getByText('Sharing your response…').waitFor({ timeout: 10000 });
  await status(mikko, S).filter({ hasText: outboxLine }).waitFor({ timeout: 20000 });
  await shot(mikko, 'offline-sharing');
  ok('offline: Finish & reveal shows "Sharing your response…" and the line says it waits on the phone');
  const kept3 = await mikko.evaluate(() => Object.entries(localStorage).filter(([k]) => k.startsWith('daily-dose-outbox:')).map(([, v]) => JSON.parse(v)).flat());
  expect(kept3.some(e => e.id === 'S61' && e.payload.action === 'submit' && e.payload.comment === SHARED), 'Finish & reveal is in the outbox on the phone');
  // The page itself cannot load offline (no service worker yet): the emulators stay out of reach instead.
  await throttle(mikko, null);
  await mikko.context().setOffline(false);
  await mikko.reload({ waitUntil: 'commit' });
  await card(mikko, S).getByText('Sharing your response…').waitFor({ timeout: 10000 });
  ok('after a reload, still out of reach: the card says "Sharing your response…" from the outbox');
  const grace = await signIn('Grace Okafor');
  await grace.locator('article[data-work]').first().waitFor({ timeout: 60000 });
  const sent = Date.now();
  await restore(mikko);
  await card(mikko, S).getByRole('button', { name: 'Save changes' }).waitFor({ timeout: 90000 });
  results.offlineSent = Date.now() - sent;
  expect(await card(mikko, S).locator('.tweet').filter({ hasText: SHARED }).count() === 1, `back in reach: his response is shared ${(results.offlineSent / 1000).toFixed(1)} s later, his thought among the club's`);
  await shot(mikko, 'offline-shared');
  const c = card(grace, S);
  await c.scrollIntoViewIfNeeded();
  await c.getByRole('button', { name: /Check off as read/ }).click();
  await c.getByRole('button', { name: '4 stars', exact: true }).click();
  await c.getByText('4 / 5', { exact: true }).waitFor();
  await c.getByRole('textbox').fill('Grace on the story.');
  await c.getByRole('button', { name: 'Finish & reveal' }).click();
  await c.locator('.tweet').filter({ hasText: SHARED }).waitFor({ timeout: 30000 });
  ok('Grace finishes the same story and sees his thought');
  expect(await mikko.evaluate(() => Object.keys(localStorage).filter(k => k.startsWith('daily-dose-outbox:')).length) === 0, 'the outbox on his phone is empty again');

  // ---------- 4. two devices of his own
  const E = TODAY.essay, laptop = await signIn('Mikko Saarinen'), phone = mikko;
  await full(laptop);
  await restore(phone);
  await phone.locator('h1').first().click();
  // (a) The phone types offline first; the laptop saves later: the laptop's thought is newer.
  await phone.context().setOffline(true);
  await card(phone, E).scrollIntoViewIfNeeded();
  await box(phone, E).fill('From the phone, offline.');
  await phone.locator('h1').first().click();
  await status(phone, E).filter({ hasText: outboxLine }).waitFor({ timeout: 10000 });
  await phone.waitForTimeout(1500);
  await card(laptop, E).scrollIntoViewIfNeeded();
  await box(laptop, E).fill('From the laptop, later.');
  await laptop.locator('h1').first().click();
  await status(laptop, E).filter({ hasText: 'Draft saved privately.' }).waitFor({ timeout: 30000 });
  await phone.context().setOffline(false);
  await card(phone, E).getByText('Your other device saved a different thought later. It is shown here instead.').waitFor({ timeout: 60000 });
  expect(await box(phone, E).inputValue() === 'From the laptop, later.', 'the phone comes back online: the laptop\'s later thought is in its box, with the note "Your other device saved a different thought later"');
  await shot(phone, 'conflict-theirs');
  // (b) The phone goes offline, the laptop saves, then the phone types: the phone's thought is newer.
  await phone.context().setOffline(true);
  await box(laptop, E).fill('Laptop, second try.');
  await laptop.locator('h1').first().click();
  await status(laptop, E).filter({ hasText: 'Draft saved privately.' }).waitFor({ timeout: 30000 });
  await phone.waitForTimeout(1500);
  await box(phone, E).fill('Phone, typed last.');
  await phone.locator('h1').first().click();
  await status(phone, E).filter({ hasText: outboxLine }).waitFor({ timeout: 10000 });
  await phone.context().setOffline(false);
  await card(phone, E).getByText('Your other device saved a different thought. The one here is newer, so it is kept.').waitFor({ timeout: 60000 });
  await status(phone, E).filter({ hasText: 'Draft saved privately.' }).waitFor({ timeout: 30000 });
  expect(await box(phone, E).inputValue() === 'Phone, typed last.', 'the phone typed after the laptop\'s save: its own thought stays and is saved, with the note "Your other device saved a different thought"');
  await shot(phone, 'conflict-mine');
  await laptop.reload();
  await box(laptop, E).waitFor({ timeout: 30000 });
  await full(laptop);
  expect(await box(laptop, E).inputValue() === 'Phone, typed last.', 'the laptop, reloaded, has the phone\'s newer thought');

  // ---------- sign-out clears the copy
  await phone.getByRole('button', { name: 'Sign out' }).click();
  await phone.getByRole('button', { name: /Sign in with Google/ }).waitFor({ timeout: 30000 });
  expect(await phone.evaluate(() => localStorage.getItem('daily-dose-paint')) === null, 'signing out removes the copy of today\'s cards from the phone');
  expect(errors.length === 0, `no console errors${errors.length ? `: ${errors.join(' | ')}` : ''}`);
  console.log(`RESULTS ${JSON.stringify(results)}`);
  console.log('All checks passed.');
} catch (error) {
  console.error(`  FAIL  ${error.message}`);
  if (errors.length) console.error(`  console: ${errors.join(' | ')}`);
  console.log(`RESULTS ${JSON.stringify(results)}`);
  for (const [name, p] of pages) console.error(`  state ${name}: ${JSON.stringify(await p.evaluate(() => ({ cards: document.querySelectorAll('article[data-work]').length, loading: !!document.querySelector('.feed-loading'), focus: document.activeElement?.dataset?.draft, main: document.querySelector('#main')?.innerText.slice(0, 160) })).catch(e => e.message))}`);
  console.error(notes.slice(-25).join('\n'));
  process.exitCode = 1;
} finally { await browser.close(); }
