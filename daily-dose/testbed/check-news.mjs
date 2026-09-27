// Headless check of the count on your name (new reactions to your own
// thoughts) at phone width, against a running test bed seeded with
// TOUR_SEED=1 (Grace, Oskar and Priya have finished today's texts):
//   TOUR_SEED=1 scripts/testbed.sh start && node testbed/check-news.mjs
// Mikko finishes today's poem; Grace and Oskar react to his thought; his
// count shows 3, his own reaction adds nothing, a reaction taken back leaves
// no count behind, the count takes him to his thought and clears, stays clear
// after a reload and on his second device, and scrolling to his thought
// clears a later one. Exit 1 on the first failure. CHECK_SHOTS=dir keeps
// screenshots; CHECK_WIDTH (default 360) sets the phone width.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const URL = process.env.TOUR_URL || 'http://127.0.0.1:5178/';
const WIDTH = Number(process.env.CHECK_WIDTH || 360);
const SHOTS = process.env.CHECK_SHOTS ? resolve(process.env.CHECK_SHOTS) : null;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const browser = await chromium.launch({ headless: true });
const errors = [];
let step = 0;
const ok = message => console.log(`  ok    ${message}`);
async function shot(page, name, clip = null) {
  if (SHOTS) await page.screenshot({ path: join(SHOTS, `${String(++step).padStart(2, '0')}-${name}.png`), ...(clip ? { clip } : { fullPage: false }) });
}

async function signIn(name) {
  const context = await browser.newContext({ viewport: { width: WIDTH, height: 780 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const page = await context.newPage();
  // Day 5's podcast file answers 404 on purpose (testbed/serve.mjs): not an error here.
  page.on('console', m => { if (m.type() === 'error' && !m.location()?.url?.includes('/podcast/')) errors.push(`${name}: ${m.text()}`); });
  page.on('pageerror', e => errors.push(`${name}: ${e.message}`));
  await page.goto(URL);
  const popup = context.waitForEvent('page');
  await page.getByRole('button', { name: /Sign in with Google/ }).click();
  const chooser = await popup;
  await chooser.waitForLoadState('domcontentloaded');
  await chooser.getByText(name, { exact: true }).click();
  await page.getByText(/^OF 50$/).waitFor({ timeout: 45000 });
  return page;
}
const today = page => page.locator('section.day-group').filter({ has: page.getByRole('heading', { name: /Today$/ }) });
const poem = page => today(page).locator('article').filter({ has: page.locator('.genre.poem') });
const mikkoThought = page => poem(page).locator('.tweet').filter({ hasText: 'Mikko Saarinen' });
const badge = page => page.locator('header button[data-news]');
const noSideways = page => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
function expect(condition, message) { if (!condition) throw new Error(message); ok(message); }
const settle = page => page.waitForTimeout(1500);   // a write reaches the server and the listeners

async function react(page, emoji, label) {
  const thought = mikkoThought(page);
  const pill = thought.locator(`button.reaction[data-emoji="${emoji}"]`);
  const mine = await pill.count() && await pill.getAttribute('aria-pressed') === 'true';
  if (mine) { await pill.tap(); return; }        // take it back
  const add = thought.getByRole('button', { name: 'React to Mikko Saarinen’s thought' });
  await add.scrollIntoViewIfNeeded();
  await add.tap();
  await thought.getByRole('button', { name: label, exact: true }).tap();
  await pill.waitFor();
}
// Refresh from the top of the page, without scrolling to the button: not looking at the thought.
async function refresh(page) {
  await page.evaluate(() => { scrollTo(0, 0); document.querySelector('button[data-action="refresh"]').click(); });
  await page.waitForTimeout(1200);
}

try {
  // Mikko finishes today's poem, so his thought is shared.
  const mikko = await signIn('Mikko Saarinen');
  ok(`Mikko signed in at ${WIDTH} px`);
  const card = poem(mikko);
  await card.getByRole('button', { name: /Check off as read/ }).click();
  await card.getByRole('button', { name: '4 stars', exact: true }).click();
  await card.getByText('4 / 5', { exact: true }).waitFor();
  await card.getByRole('textbox').fill('Short and it stays with me.');
  await card.getByRole('button', { name: 'Finish & reveal' }).click();
  await mikkoThought(mikko).waitFor({ timeout: 15000 });
  expect(await badge(mikko).count() === 0 && await mikko.locator('header .me-marker').count() === 1, 'no reactions yet: his initial, no count');
  // His own reaction to his own thought is not news.
  const own = mikkoThought(mikko);
  await own.getByRole('button', { name: 'React to your own thought' }).tap();
  await own.getByRole('button', { name: 'heart', exact: true }).tap();
  await own.locator('button.reaction[data-emoji="heart"][aria-pressed="true"]').waitFor();
  await settle(mikko);
  await refresh(mikko);
  expect(await badge(mikko).count() === 0, 'his own heart on his own thought gives no count');

  // Grace (heart, made me think) and Oskar (laughing) react to his thought.
  const grace = await signIn('Grace Okafor');
  await mikkoThought(grace).waitFor({ timeout: 15000 });
  await react(grace, 'heart', 'heart');
  await react(grace, 'think', 'made me think');
  const oskar = await signIn('Oskar Nyström');
  await mikkoThought(oskar).waitFor({ timeout: 15000 });
  await react(oskar, 'laugh', 'laughing');
  await settle(grace); await settle(oskar);
  ok('Grace and Oskar reacted to Mikko\'s thought');

  await refresh(mikko);
  await badge(mikko).waitFor({ timeout: 15000 });
  expect(await badge(mikko).getAttribute('aria-label') === '3 new reactions to your thoughts', 'the count on his name says "3 new reactions to your thoughts"');
  expect((await badge(mikko).innerText()).includes('3'), 'and shows 3');
  const box = await badge(mikko).boundingBox();
  expect(box.width >= 44 && box.height >= 44, `the whole marker is the tap target (${Math.round(box.width)} x ${Math.round(box.height)} px)`);
  expect(await noSideways(mikko), 'no sideways scrolling with the count shown');
  expect(await mikko.evaluate(() => { const a = document.querySelector('.me').getBoundingClientRect(), b = document.querySelector('.sign-out').getBoundingClientRect();
    return Math.abs((a.top + a.bottom) / 2 - (b.top + b.bottom) / 2) < 4; }), 'initial, name and Sign out share one row');
  const header = await mikko.locator('header.site-header').boundingBox();
  await shot(mikko, 'badge-header', { x: 0, y: 0, width: WIDTH, height: Math.ceil(header.y + header.height) + 8 });
  await shot(mikko, 'badge-page');

  // Grace takes hers back before he looks: no phantom count.
  await react(grace, 'think', 'made me think');
  await settle(grace);
  await refresh(mikko);
  await mikko.waitForFunction(() => document.querySelector('header [data-news]')?.getAttribute('aria-label') === '2 new reactions to your thoughts', null, { timeout: 15000 });
  ok('a reaction taken back leaves the count: 2');

  // With a filter that hides the poem, the count still takes him to it.
  await mikko.getByRole('button', { name: 'Stories' }).click();
  expect(await poem(mikko).count() === 0, 'the Stories filter hides the poem');
  await mikko.evaluate(() => scrollTo(0, 0));
  await badge(mikko).tap();
  await mikkoThought(mikko).waitFor();
  const inView = await mikkoThought(mikko).evaluate(e => { const r = e.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; });
  expect(inView, 'a tap on the count shows his thought (filter back to All readings)');
  expect(await mikko.evaluate(() => document.activeElement?.matches('.tweet[data-own-thought]')), 'focus moves to his thought');
  expect(await mikkoThought(mikko).getByText('2 new reactions', { exact: true }).isVisible(), 'the thought says "2 new reactions"');
  await mikko.locator('#toast.show').getByText(/2 new reactions to your thought on “.+”\./).waitFor({ timeout: 3000 });
  ok('a message names the text');
  expect(await badge(mikko).count() === 0, 'the count is gone once he has looked');
  await shot(mikko, 'badge-tapped');
  await settle(mikko);

  // It stays seen: after a reload, and on his other device (the account knows).
  await mikko.reload();
  await mikko.getByText(/^OF 50$/).waitFor({ timeout: 45000 });
  await mikkoThought(mikko).waitFor({ timeout: 15000 });
  expect(await badge(mikko).count() === 0, 'no count after a reload');
  const phone2 = await signIn('Mikko Saarinen');
  await mikkoThought(phone2).waitFor({ timeout: 15000 });
  expect(await badge(phone2).count() === 0, 'no count on his second device either');

  // A new reaction; this time he scrolls to his thought himself.
  await react(oskar, 'wow', 'surprised');
  await settle(oskar);
  await refresh(mikko);
  await mikko.waitForFunction(() => document.querySelector('header [data-news]')?.getAttribute('aria-label') === '1 new reaction to your thoughts', null, { timeout: 15000 });
  ok('Oskar\'s new reaction: "1 new reaction to your thoughts"');
  await mikkoThought(mikko).evaluate(e => e.scrollIntoView({ block: 'center' }));
  await mikko.waitForTimeout(2000);
  expect(await badge(mikko).count() === 0, 'his thought on screen for a second clears it');
  await settle(mikko);
  await refresh(phone2);
  expect(await badge(phone2).count() === 0, 'and his second device agrees after a refresh');

  // Someone else's count is theirs: Grace has no reactions from others.
  await refresh(grace);
  expect(await badge(grace).count() === 0, 'Grace, whose thought nobody else reacted to, has no count');

  if (errors.length) throw new Error(`console errors:\n${errors.join('\n')}`);
  console.log('Count on your name: all green.');
  await browser.close();
  process.exit(0);
} catch (error) {
  console.log(`  FAIL  ${error.message.split('\n').slice(0, 6).join('\n')}`);
  if (errors.length) console.log(errors.join('\n'));
  await browser.close();
  process.exit(1);
}
