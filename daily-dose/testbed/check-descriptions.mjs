// Headless check of the descriptions (SPEC.md "Descriptions") against a
// freshly started test bed (scripts/testbed.sh start) whose seed found the
// private descriptions file. Aino, the organiser, at phone width with touch:
// the Day 1 poem card shows no description until she checks it off, shows it
// then, hides it on Mark as unread and shows it again on the next checkmark;
// a text she has not checked off never shows one. She rates two texts and
// opens My ranking: no description is visible until she taps a title, which
// opens it as a tooltip (aria-expanded true) without moving anything; a tap
// elsewhere (the tooltip itself included), Escape and a second tap close it; dragging by the handle still
// reorders the list and closes the tooltip. On a desktop (hover, no touch)
// hovering a title shows the tooltip and keyboard focus does too. No
// sideways scrolling, no console errors. Exit 1 on the first failure.
// CHECK_SHOTS=dir keeps screenshots; CHECK_WIDTH (default 360); CHROME a
// browser to launch. It writes to the bed: reset before a rerun.
import { chromium } from 'playwright';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';

const URL = process.env.TOUR_URL || 'http://127.0.0.1:5178/';
const WIDTH = Number(process.env.CHECK_WIDTH || 360);
const SHOTS = process.env.CHECK_SHOTS ? resolve(process.env.CHECK_SHOTS) : null;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const file = [process.env.DESCRIPTIONS, join(homedir(), 'common/projects/daily-dose/descriptions.json'),
  join(homedir(), 'mac/common/projects/daily-dose/descriptions.json')].filter(Boolean).find(p => existsSync(p));
if (!file) throw new Error('The private descriptions file is needed (DESCRIPTIONS=...).');
const descriptions = JSON.parse(readFileSync(file, 'utf8'));
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME ? { executablePath: process.env.CHROME } : {}) });
const errors = [];
let step = 0;
const ok = message => console.log(`  ok    ${message}`);
const shot = async (page, name) => { if (SHOTS) await page.waitForTimeout(300), await page.screenshot({ path: join(SHOTS, `${String(++step).padStart(2, '0')}-${name}.png`), fullPage: false }); };
function expect(condition, message) { if (!condition) throw new Error(message); ok(message); }

async function signIn(context, name, label) {
  const page = await context.newPage();
  page.on('console', m => { if (m.type() === 'error' && !m.location()?.url?.includes('/podcast/')) errors.push(`${name}: ${m.text()}`); });
  page.on('pageerror', e => errors.push(`${name}: ${e.message}`));
  await page.goto(URL);
  const popup = context.waitForEvent('page');
  await page.getByRole('button', { name: /Sign in with Google/ }).click();
  const chooser = await popup;
  await chooser.waitForLoadState('domcontentloaded');
  await chooser.getByText(name, { exact: true }).click();
  await page.getByText(/^OF 50$/).waitFor({ timeout: 45000 });
  ok(`${name} signed in (${label})`);
  return page;
}
const day = (page, n) => page.locator('section.day-group').filter({ has: page.getByRole('heading', { name: new RegExp(`Day ${String(n).padStart(2, '0')}`) }) });
const card = (page, n, genre) => day(page, n).locator('article').filter({ has: page.locator(`.genre.${genre}`) });
const workId = c => c.getAttribute('data-work');
const noSideways = page => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
const tipShown = (page, id) => page.locator(`#tip-${id}`).isVisible();

try {
  const context = await browser.newContext({ viewport: { width: WIDTH, height: 780 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const page = await signIn(context, 'Aino Lehtola', `${WIDTH} px, touch`);
  const poem = card(page, 1, 'poem'), story = card(page, 1, 'story'), essay = card(page, 1, 'essay');
  const poemId = await workId(poem), storyId = await workId(story);
  expect(descriptions[poemId] && descriptions[storyId], `the private file has descriptions for ${poemId} and ${storyId}`);
  await poem.scrollIntoViewIfNeeded();
  expect(await poem.locator('.work-description').count() === 0, 'before the checkmark the poem card shows no description');
  await poem.getByRole('button', { name: /Check off as read/ }).click();
  await poem.locator('.work-description').waitFor({ timeout: 10000 });
  expect((await poem.locator('.work-description').textContent()) === descriptions[poemId], 'checked off: the description appears under the byline, as written');
  await shot(page, 'card-after-checkmark');
  await poem.getByRole('button', { name: 'Mark as unread' }).click();
  await poem.getByRole('button', { name: /Check off as read/ }).waitFor();
  expect(await poem.locator('.work-description').count() === 0, 'Mark as unread hides it again');
  await poem.getByRole('button', { name: /Check off as read/ }).click();
  await poem.locator('.work-description').waitFor({ timeout: 10000 });
  ok('checked off again: it is back');
  await poem.getByRole('button', { name: '4 stars', exact: true }).click();
  await poem.getByText('4 / 5', { exact: true }).waitFor();
  await story.scrollIntoViewIfNeeded();
  await story.getByRole('button', { name: /Check off as read/ }).click();
  await story.getByRole('button', { name: '3 stars', exact: true }).click();
  await story.getByText('3 / 5', { exact: true }).waitFor();
  expect(await essay.locator('.work-description').count() === 0 && await day(page, 2).locator('.work-description').count() === 0,
    'texts not checked off show none');
  expect(await noSideways(page), 'no sideways scrolling on the readings');

  // My ranking: the description is a tooltip on the title.
  await page.locator('.rank-link').getByRole('button', { name: 'My ranking' }).click();
  await page.locator('.rank-list > li').nth(1).waitFor();
  const ids = () => page.locator('.rank-list > li').evaluateAll(lis => lis.map(li => li.dataset.rankId));
  const before = await ids();
  expect(before.join() === [poemId, storyId].join(), `the list is the poem (4 stars) then the story (3)`);
  expect(!await tipShown(page, poemId) && !await tipShown(page, storyId), 'no description is visible in the list');
  expect(await page.locator('.rank-description, .work-description').count() === 0, 'and none as plain text under the items');
  const title = page.locator(`[data-rank-tip="${poemId}"]`);
  await title.tap();
  expect(await tipShown(page, poemId) && (await page.locator(`#tip-${poemId}`).textContent()) === descriptions[poemId], 'a tap on the title opens its description');
  expect(await title.getAttribute('aria-expanded') === 'true', 'the title says it is expanded');
  expect((await ids()).join() === before.join() && !(await page.locator('.rank-status').textContent()), 'the tap moved nothing and saved nothing');
  expect(await noSideways(page), 'no sideways scrolling with the tooltip open');
  await shot(page, 'ranking-tooltip');
  await page.getByRole('heading', { name: 'Your ranking' }).tap();
  expect(!await tipShown(page, poemId), 'a tap elsewhere closes it');
  await title.tap();
  await page.locator(`#tip-${poemId}`).tap();
  expect(!await tipShown(page, poemId), 'a tap on the open description itself closes it (it lies over the row below)');
  await page.locator(`[data-rank-tip="${storyId}"]`).tap();
  await title.tap();
  expect(await tipShown(page, poemId) && !await tipShown(page, storyId), 'another title switches to its description');
  await title.tap();
  expect(!await tipShown(page, poemId), 'a second tap on the same title closes it');
  await title.tap();
  await page.keyboard.press('Escape');
  expect(!await tipShown(page, poemId), 'Escape closes it');

  // The handle still drags (the story to the top), and a drag closes the
  // tooltip (the story's own: an open one lies over the row below it).
  await page.locator(`[data-rank-tip="${storyId}"]`).tap();
  const handle = i => page.locator('.rank-list > li').nth(i).locator('.drag-handle');
  const from = await handle(1).boundingBox(), to = await handle(0).boundingBox();
  const mx = from.x + from.width / 2;
  await page.mouse.move(mx, from.y + from.height / 2);
  await page.mouse.down();
  for (let k = 1; k <= 8; k++) await page.mouse.move(mx, from.y + from.height / 2 + (to.y + 4 - from.y - from.height / 2) * k / 8, { steps: 2 });
  await page.mouse.up();
  await page.locator('.rank-status', { hasText: /^Saved/ }).waitFor({ timeout: 15000 });
  expect((await ids()).join() === [storyId, poemId].join(), 'the handle still drags: the story is now first');
  expect(!await tipShown(page, storyId), 'the drag closed the tooltip');
  await context.close();

  // Desktop: hover and keyboard focus show it.
  const desk = await browser.newContext({ viewport: { width: 1200, height: 800 } });
  const dpage = await signIn(desk, 'Aino Lehtola', '1200 px, mouse');
  await dpage.locator('.rank-link').getByRole('button', { name: 'My ranking' }).click();
  await dpage.locator('.rank-list > li').nth(1).waitFor();
  expect(!await tipShown(dpage, poemId), 'desktop: hidden at first');
  await dpage.locator(`[data-rank-tip="${poemId}"]`).hover();
  expect(await tipShown(dpage, poemId), 'desktop: hovering the title shows the description');
  await shot(dpage, 'desktop-hover');
  await dpage.mouse.move(5, 5);
  expect(!await tipShown(dpage, poemId), 'desktop: moving away hides it');
  await dpage.locator(`[data-rank-tip="${storyId}"]`).focus();
  await dpage.keyboard.press('Shift+Tab');
  await dpage.keyboard.press('Tab');
  expect(await tipShown(dpage, storyId), 'desktop: keyboard focus on the title shows it');
  await desk.close();

  expect(errors.length === 0, `no console errors${errors.length ? `: ${errors.join(' | ')}` : ''}`);
  console.log('All description checks passed.');
} catch (e) {
  console.error(`  FAIL  ${e.message}`);
  if (errors.length) console.error(errors.join('\n'));
  process.exitCode = 1;
} finally {
  await browser.close();
}
