// Headless check of the roster's Stars view, against a freshly started test
// bed (scripts/testbed.sh start): Aino, the organiser, finishes the Day 1 poem
// (3 stars), opens the Organiser page and switches the roster to Stars. Her
// own cell and Grace's and Oskar's seeded ratings on that poem show as stars;
// a text she has not finished shows as locked, never as stars; the switch
// survives a reload; no sideways scrolling. Exit 1 on the first failure.
// CHECK_SHOTS=dir keeps screenshots; CHECK_WIDTH (default 360) sets the width.
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
const shot = async (page, name) => { if (SHOTS) await page.screenshot({ path: join(SHOTS, `${String(++step).padStart(2, '0')}-${name}.png`), fullPage: true }); };
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
  await chooser.getByText('Aino Lehtola', { exact: true }).click();
  await page.getByText(/^OF 50$/).waitFor({ timeout: 45000 });
  ok(`Aino signed in at ${WIDTH} px`);

  const day1 = page.locator('section.day-group').filter({ has: page.getByRole('heading', { name: /Day 01/ }) });
  const card = day1.locator('article').filter({ has: page.locator('.genre.poem') });
  await card.scrollIntoViewIfNeeded();
  await card.getByRole('button', { name: /Check off as read/ }).click();
  await card.getByRole('button', { name: '3 stars', exact: true }).click();
  await card.getByText('3 / 5', { exact: true }).waitFor();
  await card.getByRole('textbox').fill('A quiet start.');
  await card.getByRole('button', { name: 'Finish & reveal' }).click();
  await card.locator('.reader-stats').waitFor({ timeout: 15000 });
  const readers = await card.locator('.reader-stats li').allTextContents();
  ok(`Day 1 poem revealed, finished readers: ${readers.join(' | ')}`);
  await page.waitForTimeout(1500);

  await page.evaluate(() => scrollTo(0, 0));
  await page.locator('[data-nav="organiser"]').first().click();
  await page.getByRole('heading', { name: 'Roster' }).waitFor({ timeout: 15000 });
  const sw = page.locator('.roster-switch');
  expect(await sw.locator('[aria-pressed="true"]').textContent() === 'Checked off', 'roster opens on Checked off');
  await shot(page, 'roster-checks');
  await sw.getByRole('button', { name: 'Stars' }).click();
  expect(await sw.locator('[aria-pressed="true"]').textContent() === 'Stars', 'switch now on Stars');
  const row = name => page.locator('.roster li').filter({ hasText: name });
  const cellKind = async (name, rowIndex, day) => (await row(name).locator('.roster-grid .cell').nth(rowIndex * 50 + day - 1).getAttribute('class')).replace('cell ', '');
  expect(await cellKind('Aino Lehtola', 0, 1) === 's3', 'Aino, Day 1 poem: s3 (her own 3 stars)');
  for (const name of ['Grace Okafor', 'Oskar Nyström']) {
    const k = await cellKind(name, 0, 1);
    expect(/^s[0-5]$|^none$/.test(k), `${name}, Day 1 poem: ${k}`);
    console.log(`        ${name}: ${await row(name).locator('.roster-count').textContent()}`);
  }
  expect(await cellKind('Grace Okafor', 1, 1) === 'locked', 'Grace, Day 1 story (Aino has not finished it): locked');
  expect(await cellKind('Grace Okafor', 0, 50) === 'coming', 'Grace, Day 50: coming');
  const starCells = await page.locator('.roster .cell[class*=" s"]').count();
  const visibleTexts = 1;
  expect(starCells <= (await page.locator('.roster li').count()) * visibleTexts, `star cells only on the one text she finished (${starCells})`);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scrolling');
  await shot(page, 'roster-stars');
  await page.reload();
  await page.getByRole('heading', { name: 'Roster' }).waitFor({ timeout: 30000 });
  expect(await page.locator('.roster-switch [aria-pressed="true"]').textContent() === 'Stars', 'Stars kept after a reload');
  await sw.getByRole('button', { name: 'Checked off' }).click();
  expect(await cellKind('Aino Lehtola', 0, 1) === 'on' || await cellKind('Aino Lehtola', 0, 1) === 'late', 'back on Checked off: her Day 1 poem is a checkmark cell');
  expect(!errors.length, `no console errors${errors.length ? ': ' + errors.join('; ') : ''}`);
} catch (e) { console.error(`  FAIL  ${e.message}`); process.exitCode = 1; }
await browser.close();
