// Headless check of "Today first" and "Redraw only what changed" (SPEC.md)
// in Chromium at phone width (CHECK_WIDTH, default 390), on a running bed
// with a busy club at Day 61 (every member has finished every earlier text):
//   VOLUME3=1 DAY1_OFFSET=60 scripts/testbed.sh start && node testbed/seed-finished.mjs
//   node testbed/check-today-first.mjs          # CHECK_SHOTS=dir keeps screenshots
// Mikko signs in on a phone-like network (150 ms, 1.6 Mbit/s, so the two steps
// show): today's cards are drawn while the earlier days still load (a line at
// the end, outlined grid cells, no counts from part of the texts); then every
// card is there with his own checkmark, and the counts are right. Off screen,
// an old card's thoughts are not read until he scrolls to it; the two days
// before today have them at once. The 30-second refresh then touches nothing
// when nothing changed; when Grace finishes today's poem, only that card is
// redrawn; while he types in a card, it is left alone (his text, focus and
// caret stay) and brought up to date once he leaves it; closing the reader
// keeps every other card as it was. Exit 1 on the first failure or a console
// error. It writes to the bed: reseed before running it again.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const URL = process.env.TOUR_URL || 'http://127.0.0.1:5178/';
const WIDTH = Number(process.env.CHECK_WIDTH || 390);
const SHOTS = process.env.CHECK_SHOTS ? resolve(process.env.CHECK_SHOTS) : null;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME ? { executablePath: process.env.CHROME } : {}) });
const errors = [];
let step = 0;
const ok = message => console.log(`  ok    ${message}`);
function expect(condition, message) { if (!condition) throw new Error(message); ok(message); }
async function shot(page, name) { if (SHOTS) await page.screenshot({ path: join(SHOTS, `${String(++step).padStart(2, '0')}-${name}-${WIDTH}.png`) }); }

async function signIn(name, { slow = false } = {}) {
  const context = await browser.newContext({ viewport: { width: WIDTH, height: 800 }, hasTouch: WIDTH < 700, deviceScaleFactor: 2 });
  const page = await context.newPage();
  page.on('console', m => { if (m.type() === 'error' && !m.location()?.url?.includes('/podcast/')) errors.push(`${name}: ${m.text()}`); });
  page.on('pageerror', e => errors.push(`${name}: ${e.message}`));
  const cdp = await context.newCDPSession(page);
  if (slow) { await cdp.send('Network.enable'); await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 0.75e6 / 8 }); }
  page.fast = () => cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  await page.goto(URL);
  const popup = context.waitForEvent('page');
  await page.getByRole('button', { name: /Sign in with Google/ }).click();
  const chooser = await popup;
  await chooser.waitForLoadState('domcontentloaded');
  page.t0 = Date.now();
  await chooser.getByText(name, { exact: true }).click();
  return page;
}
const card = (page, id) => page.locator(`article[data-work="${id}"]`);
const thought = (page, id, name) => card(page, id).locator('.tweet').filter({ hasText: name });
const full = page => page.waitForFunction(() => document.querySelectorAll('article[data-work]').length >= 183 && !document.querySelector('.feed-loading'), null, { timeout: 180000, polling: 100 });
async function finish(page, id, text) {
  const c = card(page, id);
  await c.scrollIntoViewIfNeeded();
  if (await c.getByRole('button', { name: /Check off as read/ }).count()) await c.getByRole('button', { name: /Check off as read/ }).click();
  await c.getByRole('textbox').waitFor();
  if (!await c.getByText(/^\d \/ 5$/).count()) { await c.getByRole('button', { name: '4 stars', exact: true }).click(); await c.getByText('4 / 5', { exact: true }).waitFor(); }
  await c.getByRole('textbox').fill(text);
  await c.getByRole('button', { name: 'Finish & reveal' }).click();
  await c.getByRole('button', { name: 'Save changes' }).waitFor({ timeout: 30000 });
}
// Every card element gets a mark, and a MutationObserver notes which cards
// (or other parts of the feed) changed from now on.
const watchFeed = page => page.evaluate(() => {
  for (const el of document.querySelectorAll('article[data-work]')) el.__kept = true;
  window.__changed = new Set();
  window.__feedObserver?.disconnect();
  window.__feedObserver = new MutationObserver(list => {
    for (const m of list) {
      const el = m.target.nodeType === 1 ? m.target : m.target.parentElement;
      window.__changed.add(el?.closest('article[data-work]')?.dataset.work || el?.closest('.personal-strip, .filters, .feed') ? (el.closest('article[data-work]')?.dataset.work || el.closest('.personal-strip, .filters, .feed').className.split(' ')[0]) : 'other');
    }
  });
  window.__feedObserver.observe(document.querySelector('#main'), { childList: true, subtree: true, attributes: true, characterData: true });
});
const changedParts = page => page.evaluate(() => [...window.__changed].sort());
const replaced = page => page.evaluate(() => [...document.querySelectorAll('article[data-work]')].filter(el => !el.__kept).map(el => el.dataset.work));

const pages = {};
try {
  // ---------- Today first
  const mikko = pages.Mikko = await signIn('Mikko Saarinen', { slow: true });
  await mikko.locator('article[data-work] textarea[data-draft]').first().waitFor({ timeout: 180000 });
  const first = Date.now() - mikko.t0;
  const early = await mikko.evaluate(() => ({ loadingLine: !!document.querySelector('.feed-loading'), waiting: document.querySelectorAll('.my-grid .cell.waiting').length,
    cards: document.querySelectorAll('article[data-work]').length, progress: document.querySelector('.personal-strip')?.innerText || '',
    unread: document.querySelector('[data-filter="unread"]')?.innerText, days: [...document.querySelectorAll('.day-group:not(.upcoming) h2')].map(h => h.id) }));
  await shot(mikko, 'first-draw');
  expect(early.loadingLine && early.cards === 9 && early.days.join() === 'day-61,day-60,day-59', `first draw after ${(first / 1000).toFixed(1)} s on a phone network: today and the two days before (${early.cards} cards), "Loading earlier days…" below`);
  expect(early.waiting > 0 && /Loading your earlier days/.test(early.progress) && early.unread === 'Unread', `meanwhile ${early.waiting} grid cells are drawn as loading, the strip says "Loading your earlier days…" and Unread has no count`);
  await full(mikko);
  const whole = Date.now() - mikko.t0;
  const done = await mikko.evaluate(() => ({ cards: document.querySelectorAll('article[data-work]').length, done: document.querySelectorAll('article[data-work].is-done').length,
    waiting: document.querySelectorAll('.cell.waiting').length, progress: document.querySelector('.personal-strip')?.innerText || '', unread: document.querySelector('[data-filter="unread"]')?.innerText }));
  expect(done.cards === 183 && done.done === 183, `all ${done.cards} cards after ${(whole / 1000).toFixed(1)} s, every one with his own checkmark`);
  expect(done.waiting === 0 && /No older texts waiting/.test(done.progress) && done.unread === 'Unread (0)', 'the grid is complete, "No older texts waiting.", Unread (0)');
  await mikko.fast();
  await shot(mikko, 'complete');

  // An old card off screen has not been read; scrolled to, it is.
  const OLD = 'P05', RECENT = 'P59';
  expect(await card(mikko, OLD).locator('.loading-thoughts').count() === 1 && await card(mikko, OLD).locator('.tweet').count() === 0, `an old card off screen (${OLD}) says the club's thoughts are loading and holds none`);
  expect(await thought(mikko, RECENT, 'Grace Okafor').count() === 1, `a card from two days ago (${RECENT}) holds the club's thoughts without being scrolled to`);
  await card(mikko, OLD).evaluate(el => el.scrollIntoView({ block: 'center' }));
  const tOld = Date.now();
  await thought(mikko, OLD, 'Grace Okafor').waitFor({ timeout: 15000 });
  expect(await card(mikko, OLD).locator('.loading-thoughts').count() === 0, `scrolled to, it shows them after ${((Date.now() - tOld) / 1000).toFixed(1)} s`);
  await shot(mikko, 'old-card');

  // ---------- Redraw only what changed
  await mikko.evaluate(() => scrollTo(0, 0));
  await mikko.waitForTimeout(5000);
  await watchFeed(mikko);
  await mikko.waitForTimeout(35000);   // a 30-second refresh passes
  let parts = await changedParts(mikko), gone = await replaced(mikko);
  expect(parts.length === 0 && gone.length === 0, `35 s with nothing new: nothing on the page changed (${parts.join(', ') || 'no part'}), no card was replaced`);

  // Grace finishes today's poem: only that card is redrawn for Mikko.
  const POEM = 'P61';
  await finish(mikko, POEM, 'Short and it stays with me.');
  await mikko.evaluate(() => { document.activeElement?.blur(); scrollTo(0, 0); });
  await mikko.waitForTimeout(3000);
  await watchFeed(mikko);
  const grace = pages.Grace = await signIn('Grace Okafor');
  await grace.locator('article[data-work]').first().waitFor({ timeout: 60000 });
  await finish(grace, POEM, 'Read it twice over coffee.');
  await thought(mikko, POEM, 'Grace Okafor').waitFor({ timeout: 45000 });
  parts = await changedParts(mikko); gone = await replaced(mikko);
  expect(parts.every(p => p === POEM) && gone.length === 0, `Grace finishes today's poem: Mikko's page redraws that card only (${parts.join(', ')}), no card replaced`);

  // While he types in a card, it is left alone; once he leaves it, it catches up.
  const box = card(mikko, POEM).getByRole('textbox');
  await box.scrollIntoViewIfNeeded();
  await box.click();
  await mikko.keyboard.press('End');
  await mikko.evaluate(id => { window.__box = document.querySelector(`textarea[data-draft="${id}"]`); }, POEM);
  await card(grace, POEM).locator('.tweet').filter({ hasText: 'Mikko Saarinen' }).locator('.reaction-add').click();
  await card(grace, POEM).locator('.tweet').filter({ hasText: 'Mikko Saarinen' }).getByRole('button', { name: 'heart', exact: true }).click();
  const typed = ' And again on the bus.';
  for (const part of [' And again', ' on the bus.']) { await mikko.keyboard.type(part, { delay: 120 }); await mikko.waitForTimeout(17000); }
  const during = await mikko.evaluate(() => ({ same: window.__box === document.activeElement, value: window.__box.value, caret: window.__box.selectionStart,
    hearts: window.__box.closest('article').querySelectorAll('.tweet button.reaction[data-emoji="heart"]').length }));
  expect(during.same && during.value === `Short and it stays with me.${typed}` && during.caret === during.value.length, 'typing through a 30-second refresh: same box, focus, text and caret');
  expect(during.hearts === 0, 'and Grace\'s heart on his thought waits while he types');
  await mikko.evaluate(() => document.activeElement.blur());
  await card(mikko, POEM).locator('.tweet').filter({ hasText: 'Mikko Saarinen' }).locator('button.reaction[data-emoji="heart"]').waitFor({ timeout: 45000 });
  expect(await box.inputValue() === `Short and it stays with me.${typed}`, 'he leaves the box: the heart appears, his unsaved text is still there');
  await shot(mikko, 'typed');

  // Closing the reader redraws in place.
  await watchFeed(mikko);
  await card(mikko, 'E60').locator('.read-button').click();
  await mikko.locator('dialog[open] [data-close]').waitFor({ timeout: 15000 });
  await mikko.locator('dialog[open] [data-close]').click();
  await mikko.waitForTimeout(1000);
  gone = await replaced(mikko);
  expect(gone.length === 0, 'opening and closing the reader keeps every card element (redrawn in place)');
  expect(errors.length === 0, `no console errors${errors.length ? `: ${errors.join(' | ')}` : ''}`);
  console.log('All checks passed.');
} catch (error) {
  console.error(`  FAIL  ${error.message}`);
  if (errors.length) console.error(`  console: ${errors.join(' | ')}`);
  for (const [name, page] of Object.entries(pages)) if (SHOTS) await page.screenshot({ path: join(SHOTS, `failed-${name}-${WIDTH}.png`) }).catch(() => {});
  process.exitCode = 1;
} finally { await browser.close(); }
