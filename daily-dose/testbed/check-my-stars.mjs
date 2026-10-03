// Headless check of the Stars switch on a member's own grid (the progress
// strip at the top of the reading page), against a freshly started test bed
// (scripts/testbed.sh start): Mikko finishes the Day 1 poem with 4 stars and
// switches his grid to Stars. That cell is s4, his other released texts are
// "no stars yet", there is no locked cell, the switch survives a reload, and
// "Checked off" brings the checkmark cell back. No sideways scrolling.
// Exit 1 on the first failure. CHECK_SHOTS=dir keeps screenshots;
// CHECK_WIDTH (default 360) sets the width.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const URL = process.env.TOUR_URL || 'http://127.0.0.1:5178/';
const WIDTH = Number(process.env.CHECK_WIDTH || 360);
const SHOTS = process.env.CHECK_SHOTS ? resolve(process.env.CHECK_SHOTS) : null;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME ? { executablePath: process.env.CHROME } : {}) });
const errors = [];
let step = 0;
const ok = message => console.log(`  ok    ${message}`);
const shot = async (page, name) => { if (SHOTS) await page.waitForTimeout(600), await page.evaluate(() => document.querySelector('#toast')?.style.setProperty('display', 'none')), await page.locator('.personal-strip').screenshot({ path: join(SHOTS, `${String(++step).padStart(2, '0')}-${name}.png`) }); };
function expect(condition, message) { if (!condition) throw new Error(message); ok(message); }

try {
  const context = await browser.newContext({ viewport: { width: WIDTH, height: 780 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const page = await context.newPage();
  page.on('console', m => { if (m.type() === 'error' && !m.location()?.url?.includes('/podcast/')) errors.push(m.text()); });
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(URL);
  const popup = context.waitForEvent('page');
  await page.getByRole('button', { name: /Sign in with Google/ }).click();
  const chooser = await popup;
  await chooser.waitForLoadState('domcontentloaded');
  await chooser.getByText('Mikko Saarinen', { exact: true }).click();
  await page.getByText(/^OF 50$/).waitFor({ timeout: 45000 });
  ok(`Mikko signed in at ${WIDTH} px`);

  const day1 = page.locator('section.day-group').filter({ has: page.getByRole('heading', { name: /Day 01/ }) });
  const card = day1.locator('article').filter({ has: page.locator('.genre.poem') });
  await card.scrollIntoViewIfNeeded();
  await card.getByRole('button', { name: /Check off as read/ }).click();
  await card.getByRole('button', { name: '4 stars', exact: true }).click();
  await card.getByText('4 / 5', { exact: true }).waitFor();
  await card.getByRole('textbox').fill('Short and bright.');
  await card.getByRole('button', { name: 'Finish & reveal' }).click();
  await card.locator('.reader-stats').waitFor({ timeout: 15000 });
  ok('Day 1 poem finished with 4 stars');
  await page.waitForTimeout(1500);
  await page.evaluate(() => scrollTo(0, 0));

  const sw = page.locator('.my-grid .roster-switch');
  const cells = page.locator('.my-grid .roster-grid:not(.roster-axis) .cell');
  const cellKind = async (rowIndex, day) => (await cells.nth(rowIndex * 50 + day - 1).getAttribute('class')).replace('cell ', '');
  expect(await sw.locator('[aria-pressed="true"]').textContent() === 'Checked off', 'own grid opens on Checked off');
  expect(['on', 'late'].includes(await cellKind(0, 1)), 'Day 1 poem is a checkmark cell');
  await shot(page, 'my-grid-checks');
  await sw.getByRole('button', { name: 'Stars' }).click();
  expect(await sw.locator('[aria-pressed="true"]').textContent() === 'Stars', 'switch now on Stars');
  expect(await cellKind(0, 1) === 's4', 'Day 1 poem: s4 (his 4 stars)');
  expect(await cellKind(1, 1) === 'none', 'Day 1 story (not finished): none');
  expect(await cellKind(0, 50) === 'coming', 'Day 50: coming');
  expect(await page.locator('.my-grid .cell.locked').count() === 0, 'no locked cells on his own grid');
  expect(/no stars yet/.test(await page.locator('.my-grid .roster-legend').textContent()), 'legend says "no stars yet"');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scrolling');
  await shot(page, 'my-grid-stars');
  await page.reload();
  await page.getByText(/^OF 50$/).waitFor({ timeout: 30000 });
  expect(await sw.locator('[aria-pressed="true"]').textContent() === 'Stars', 'Stars kept after a reload');
  await sw.getByRole('button', { name: 'Checked off' }).click();
  expect(['on', 'late'].includes(await cellKind(0, 1)), 'back on Checked off: Day 1 poem is a checkmark cell');
  expect(!errors.length, `no console errors${errors.length ? ': ' + errors.join('; ') : ''}`);
} catch (e) { console.error(`  FAIL  ${e.message}`); process.exitCode = 1; }
await browser.close();
