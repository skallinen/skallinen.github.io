// Headless check of reactions at phone width, against a running test bed
// seeded with TOUR_SEED=1 (Grace, Oskar and Priya have finished today's texts):
//   TOUR_SEED=1 scripts/testbed.sh start && node testbed/check-reactions.mjs
// Mikko finishes today's poem, reacts to Grace's thought, sees the count go
// up, takes it back, reacts again; Grace, in her own browser, sees his
// reaction with his name. Exit 1 on the first failure. CHECK_SHOTS=dir keeps
// screenshots; CHECK_WIDTH (default 390) sets the phone width.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const URL = process.env.TOUR_URL || 'http://127.0.0.1:5178/';
const WIDTH = Number(process.env.CHECK_WIDTH || 390);
const SHOTS = process.env.CHECK_SHOTS ? resolve(process.env.CHECK_SHOTS) : null;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const browser = await chromium.launch({ headless: true });
const errors = [];
let step = 0;
const ok = message => console.log(`  ok    ${message}`);
async function shot(page, name) { if (SHOTS) await page.screenshot({ path: join(SHOTS, `${String(++step).padStart(2, '0')}-${name}.png`), fullPage: false }); }

async function signIn(name) {
  const context = await browser.newContext({ viewport: { width: WIDTH, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
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
const graceThought = page => poem(page).locator('.tweet').filter({ hasText: 'Grace Okafor' });
const pill = (page, emoji) => graceThought(page).locator(`button.reaction[data-emoji="${emoji}"]`);
const noSideways = page => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
function expect(condition, message) { if (!condition) throw new Error(message); ok(message); }

try {
  // Mikko: finish today's poem so the club's thoughts open.
  const mikko = await signIn('Mikko Saarinen');
  ok(`Mikko signed in at ${WIDTH} px`);
  const card = poem(mikko);
  await card.getByRole('button', { name: /Check off as read/ }).click();
  await card.getByRole('button', { name: '4 stars', exact: true }).click();
  await card.getByText('4 / 5', { exact: true }).waitFor();
  await card.getByRole('textbox').fill('A reaction test: short, and it landed.');
  await card.getByRole('button', { name: 'Finish & reveal' }).click();
  await card.getByText(/THE CLUB.S THOUGHTS/).waitFor({ timeout: 15000 });
  await graceThought(mikko).waitFor();
  expect(await graceThought(mikko).locator('button.reaction').count() === 0, 'nobody has reacted yet: no pills, only "React"');

  // React: open the seven choices, pick the heart.
  const add = graceThought(mikko).getByRole('button', { name: 'React to Grace Okafor’s thought' });
  await add.scrollIntoViewIfNeeded();
  await add.tap();
  const choices = graceThought(mikko).locator('.reaction-choice');
  await choices.first().waitFor();
  expect(await choices.count() === 7, 'React opens seven choices');
  expect(await choices.nth(2).getAttribute('aria-label') === 'this' && (await choices.nth(2).innerText()).includes('👆'), 'the third is 👆 this, after thumbs up');
  const boxes = await choices.evaluateAll(els => els.map(e => e.getBoundingClientRect()).map(r => ({ top: Math.round(r.top), w: r.width, h: r.height })));
  expect(boxes.every(b => b.w >= 44 && b.h >= 44), 'every choice is at least 44 px square');
  const rows = [...new Set(boxes.map(b => b.top))];
  if (WIDTH >= 390) expect(rows.length === 1, 'the seven choices fit one row');
  else expect(rows.length === 2 && boxes.filter(b => b.top === rows[0]).length === 4, 'the seven choices wrap cleanly: a row of four, then three');
  expect(await noSideways(mikko), 'no sideways scrolling with the choices open');
  await shot(mikko, 'mikko-choices');
  await graceThought(mikko).getByRole('button', { name: 'heart', exact: true }).tap();
  await pill(mikko, 'heart').waitFor();
  expect(await pill(mikko, 'heart').getAttribute('aria-pressed') === 'true', 'the heart is highlighted as his');
  expect((await pill(mikko, 'heart').innerText()).includes('1'), 'the count shows 1');
  expect(await graceThought(mikko).locator('.reaction-choice').count() === 0, 'the choices close after picking');
  await mikko.waitForTimeout(1500);   // the write reaches the server, the card redraws from it
  expect((await pill(mikko, 'heart').innerText()).includes('1') && await pill(mikko, 'heart').getAttribute('aria-pressed') === 'true', 'still 1 and his after the server confirmed');
  const box = await pill(mikko, 'heart').boundingBox();
  expect(box.height >= 44 && box.width >= 44, 'the pill is a full tap target');
  await shot(mikko, 'mikko-reacted');

  // Un-react: tap the pill again.
  await pill(mikko, 'heart').tap();
  await pill(mikko, 'heart').waitFor({ state: 'detached' });
  await mikko.waitForTimeout(1500);
  expect(await pill(mikko, 'heart').count() === 0, 'tapping it again takes it back: the pill is gone');

  // React again, with two emojis, and reload: it came from the server.
  await add.tap();
  await graceThought(mikko).getByRole('button', { name: 'made me think', exact: true }).tap();
  await pill(mikko, 'think').waitFor();
  await add.tap();
  await graceThought(mikko).getByRole('button', { name: 'heart', exact: true }).tap();
  await pill(mikko, 'heart').waitFor();
  await mikko.waitForTimeout(1500);
  await mikko.reload();
  await pill(mikko, 'think').waitFor({ timeout: 30000 });
  expect(await pill(mikko, 'heart').count() === 1 && await pill(mikko, 'think').count() === 1, 'after a reload his two reactions are still there');

  // Grace, in her own browser: sees Mikko's reactions on her thought, with his name.
  const grace = await signIn('Grace Okafor');
  ok('Grace signed in');
  const own = graceThought(grace);
  await own.scrollIntoViewIfNeeded();
  await pill(grace, 'heart').waitFor({ timeout: 15000 });
  expect((await pill(grace, 'heart').innerText()).includes('1') && await pill(grace, 'heart').getAttribute('aria-pressed') === 'false', 'Grace sees ❤️ 1, not highlighted for her');
  expect(await pill(grace, 'heart').getAttribute('title') === 'Mikko Saarinen reacted with ❤️', 'hover names Mikko');
  // A long press shows the names instead of toggling.
  const hb = await pill(grace, 'heart').boundingBox();
  const cdp = await grace.context().newCDPSession(grace);
  const at = { x: hb.x + hb.width / 2, y: hb.y + hb.height / 2 };
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [at] });
  await grace.waitForTimeout(800);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await grace.locator('#toast.show').getByText('Mikko Saarinen reacted with ❤️').waitFor({ timeout: 3000 });
  await grace.waitForTimeout(500);
  expect(await pill(grace, 'heart').getAttribute('aria-pressed') === 'false' && (await pill(grace, 'heart').innerText()).includes('1'), 'a long press shows who reacted and changes nothing');
  await shot(grace, 'grace-long-press');
  // Grace adds her own heart to her own thought: 2, highlighted.
  await pill(grace, 'heart').tap();
  await grace.waitForTimeout(1500);
  expect((await pill(grace, 'heart').innerText()).includes('2') && await pill(grace, 'heart').getAttribute('aria-pressed') === 'true', 'Grace reacts to her own thought: ❤️ 2, highlighted');
  expect(await pill(grace, 'heart').getAttribute('title') === 'Mikko Saarinen and you reacted with ❤️', 'hover now names Mikko and you');
  expect(await noSideways(grace), 'no sideways scrolling for Grace');
  await shot(grace, 'grace-reacted');

  // Back to Mikko: Refresh brings Grace's reaction.
  await mikko.getByRole('button', { name: 'Refresh' }).click();
  await mikko.waitForFunction(() => [...document.querySelectorAll('button.reaction[data-emoji="heart"]')].some(b => b.innerText.includes('2')), null, { timeout: 15000 });
  expect(await pill(mikko, 'heart').getAttribute('title') === 'Grace Okafor and you reacted with ❤️', 'Mikko sees ❤️ 2: Grace and him');
  await shot(mikko, 'mikko-sees-grace');

  // Leena has not finished the poem: neither thoughts nor reactions.
  const leena = await signIn('Leena Koski');
  await poem(leena).waitFor();
  expect(await poem(leena).locator('.tweet, .reactions').count() === 0, 'Leena, not finished yet, sees no thoughts and no reactions');

  if (errors.length) throw new Error(`console errors:\n${errors.join('\n')}`);
  console.log('Reactions check: all green.');
  await browser.close();
  process.exit(0);
} catch (error) {
  console.log(`  FAIL  ${error.message.split('\n').slice(0, 6).join('\n')}`);
  if (errors.length) console.log(errors.join('\n'));
  await browser.close();
  process.exit(1);
}
