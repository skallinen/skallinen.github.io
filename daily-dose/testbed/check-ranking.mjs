// Headless check of My ranking (organiser-only for now) against a freshly
// started test bed (scripts/testbed.sh start). Aino, the organiser, checks
// off and rates four texts (5, 0, 4 and 4 stars; the 5 shared, the others
// private drafts), opens My ranking from the progress strip and finds them
// 5 first, 0 last, scores 5.0 to 2.0 averaging 3.5, and that opening wrote no
// rating. She drags the 0-star text to the top with a mouse, then back down
// with a finger (touch events), then moves one with the arrow keys; each
// save rewrites only the stars that change, to the rounded scores. The order
// survives a reload; the Day 1 poem card shows the new stars and "Your
// ranking"; Grace, who finished that poem, sees Aino's new stars; Grace and
// any other member have no My ranking. No sideways scrolling, no console
// errors. Exit 1 on the first failure. CHECK_SHOTS=dir keeps screenshots;
// CHECK_WIDTH (default 360) sets the width; CHROME a browser to launch.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { rankScore, rankStars } from '../client/ranking.mjs';

const URL = process.env.TOUR_URL || 'http://127.0.0.1:5178/';
const WIDTH = Number(process.env.CHECK_WIDTH || 360);
const SHOTS = process.env.CHECK_SHOTS ? resolve(process.env.CHECK_SHOTS) : null;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME ? { executablePath: process.env.CHROME } : {}) });
const errors = [];
let step = 0;
const ok = message => console.log(`  ok    ${message}`);
const shot = async (page, name) => { if (SHOTS) await page.waitForTimeout(400), await page.screenshot({ path: join(SHOTS, `${String(++step).padStart(2, '0')}-${name}.png`), fullPage: true }); };
function expect(condition, message) { if (!condition) throw new Error(message); ok(message); }

async function signIn(context, name) {
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
  ok(`${name} signed in at ${WIDTH} px`);
  return page;
}
const newContext = () => browser.newContext({ viewport: { width: WIDTH, height: 780 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
const day = (page, n) => page.locator('section.day-group').filter({ has: page.getByRole('heading', { name: new RegExp(`Day ${String(n).padStart(2, '0')}`) }) });
const card = (page, n, genre) => day(page, n).locator('article').filter({ has: page.locator(`.genre.${genre}`) });

async function rate(page, n, genre, stars) {
  const c = card(page, n, genre);
  await c.scrollIntoViewIfNeeded();
  await c.getByRole('button', { name: /Check off as read/ }).click();
  await c.getByRole('button', { name: stars === 0 ? /0 stars: did not work/ : `${stars} stars`, exact: stars !== 0 }).click();
  await c.getByText(`${stars} / 5`, { exact: true }).waitFor();
  return c;
}
// The list as [{ title, stars, score, pending }], top first.
const list = page => page.locator('.rank-list > li').evaluateAll(lis => lis.map(li => ({
  id: li.dataset.rankId, title: li.querySelector('.rank-title').textContent, meta: li.querySelector('.rank-meta').textContent,
  score: Number(li.querySelector('.rank-score').textContent.replace('★', '')) })));
const starsIn = meta => Number(/· (\d) ★/.exec(meta)?.[1]);
async function saved(page) {
  await page.locator('.rank-status', { hasText: /^Saved/ }).waitFor({ timeout: 15000 });
  await page.waitForTimeout(300);
}
// After a save, every text has the whole stars of its rounded score.
async function expectStarsFollow(page, label) {
  const l = await list(page);
  const want = l.map((_, i) => rankStars(rankScore(i, l.length)));
  expect(l.every((x, i) => starsIn(x.meta) === want[i] && !/when saved/.test(x.meta)), `${label}: stars now ${l.map(x => starsIn(x.meta)).join(' ')}, the rounded scores`);
  return l;
}

try {
  const aContext = await newContext();
  const page = await signIn(aContext, 'Aino Lehtola');
  const poem = await rate(page, 1, 'poem', 5);
  await poem.getByRole('textbox').fill('Short and bright.');
  await poem.getByRole('button', { name: 'Finish & reveal' }).click();
  await poem.locator('.reader-stats').waitFor({ timeout: 15000 });
  await rate(page, 1, 'story', 0);
  await rate(page, 1, 'essay', 4);
  await rate(page, 2, 'poem', 4);
  ok('Day 1 poem 5 stars (shared), Day 1 story 0, Day 1 essay 4, Day 2 poem 4 (drafts)');
  await page.waitForTimeout(1500);

  const link = page.locator('.personal-strip .rank-link');
  expect(/4 rated texts/.test(await link.textContent()), 'the progress strip offers My ranking, 4 rated texts');
  expect(await poem.locator('.rank-line').count() === 1, 'a rated card says "Your ranking"');
  await link.getByRole('button', { name: 'My ranking' }).click();
  await page.locator('.rank-list').waitFor();
  expect(new globalThis.URL(page.url()).hash === '#ranking', 'the address is #ranking');
  let l = await list(page);
  expect(l.length === 4, 'four texts in the list');
  expect(l.map(x => starsIn(x.meta)).join() === '5,4,4,0', `initial order by stars: ${l.map(x => starsIn(x.meta)).join(' ')}`);
  expect(l[0].score === 5 && l[3].score === 2, `scores from 5.0 at the top to 2.0 at the bottom (${l.map(x => x.score).join(' ')})`);
  expect(Math.abs(l.reduce((a, x) => a + x.score, 0) / 4 - 3.5) < 0.051, 'the shown scores average 3.5');
  expect(/at least 2/.test(await page.locator('.rank-note').textContent()), 'the note says a 0 or 1-star text becomes at least 2');
  expect(/when saved/.test(l[3].meta) && await page.getByRole('button', { name: /Save ranking/ }).count() === 1, 'opening wrote nothing: "Save ranking" offered, the 0-star text says "0 ★ now, 2 ★ when saved"');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scrolling');
  await shot(page, 'opened');

  // A mouse drags the bottom text to the top.
  const story = l[3];
  const handle = i => page.locator('.rank-list > li').nth(i).locator('.drag-handle');
  // The handle starts on screen; holding near the top edge scrolls the page up.
  await handle(3).scrollIntoViewIfNeeded();
  let from = await handle(3).boundingBox();
  const mx = from.x + from.width / 2;
  await page.mouse.move(mx, from.y + from.height / 2);
  await page.mouse.down();
  for (let k = 1; k <= 10; k++) await page.mouse.move(mx, from.y + from.height / 2 + (20 - from.y) * k / 10, { steps: 2 });
  await page.waitForTimeout(1500);
  let top = await page.locator('.rank-list').boundingBox();
  await page.mouse.move(mx, top.y + 8, { steps: 4 });
  await page.mouse.up();
  await saved(page);
  l = await expectStarsFollow(page, 'mouse drag');
  expect(l[0].id === story.id, `the 0-star text "${story.title}" is now first, with 5 stars`);
  await shot(page, 'mouse-drag');

  // A finger drags it back to the bottom (touch events through the browser).
  const cdp = await aContext.newCDPSession(page);
  await page.evaluate(() => scrollTo(0, 0));
  await handle(0).scrollIntoViewIfNeeded();
  from = await handle(0).boundingBox();
  const x = from.x + from.width / 2, y0 = from.y + from.height / 2, H = page.viewportSize().height;
  const touch = (type, y) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: [{ x, y }] });
  await touch('touchStart', y0);
  for (let k = 1; k <= 12; k++) await touch('touchMove', y0 + (H - 20 - y0) * k / 12);
  await page.waitForTimeout(1500);
  const bottom = await page.locator('.rank-list').boundingBox();
  await touch('touchMove', Math.min(H - 2, bottom.y + bottom.height - 4));
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await saved(page);
  l = await expectStarsFollow(page, 'touch drag');
  expect(l[3].id === story.id, 'a finger moved it back to the bottom: 2 stars');

  // The arrow keys move one place.
  const second = l[1];
  await handle(1).focus();
  await page.keyboard.press('ArrowUp');
  expect(await page.evaluate(() => document.activeElement?.closest('li')?.dataset.rankId) === second.id, 'ArrowUp moves it and its handle keeps the focus');
  await saved(page);
  l = await expectStarsFollow(page, 'keyboard move');
  expect(l[0].id === second.id, `"${second.title}" is now first`);
  const order = l.map(x => x.id).join();

  await page.reload();
  await page.locator('.rank-list').waitFor({ timeout: 30000 });
  expect((await list(page)).map(x => x.id).join() === order, 'the order survives a reload');
  expect(await page.getByRole('button', { name: /Save ranking/ }).count() === 0, 'nothing left to save');

  await page.getByRole('button', { name: 'Back to readings' }).click();
  await page.getByText(/^OF 50$/).waitFor();
  const poemPlace = l.findIndex(x => /Poem, Day 01/.test(x.meta));
  const poemStars = starsIn(l[poemPlace].meta);
  await poem.scrollIntoViewIfNeeded();
  expect(await poem.getByText(`${poemStars} / 5`, { exact: true }).count() === 1, `the Day 1 poem card now says ${poemStars} / 5`);
  expect(new RegExp(`Your ranking: ★ ${l[poemPlace].score.toFixed(1)}, `).test(await poem.locator('.rank-line').textContent()), 'and "Your ranking" with its score');
  await shot(page, 'card');

  // Grace finished the Day 1 poem: she sees Aino's new stars, and no ranking of her own.
  const gContext = await newContext();
  const grace = await signIn(gContext, 'Grace Okafor');
  expect(await grace.locator('.rank-link').count() === 0, 'Grace (a member) has no My ranking');
  const gPoem = card(grace, 1, 'poem');
  await gPoem.scrollIntoViewIfNeeded();
  await gPoem.locator('.reader-stats summary').click();
  const ainoRow = gPoem.locator('.reader-stats li').filter({ hasText: 'Aino Lehtola' });
  expect((await ainoRow.locator('.reader-rating').textContent()).startsWith(`${poemStars} / 5`), `Grace sees Aino's Day 1 poem at ${poemStars} stars`);
  await grace.goto(`${URL}#ranking`);
  await grace.getByText(/^OF 50$/).waitFor({ timeout: 30000 });
  expect(await grace.locator('.rank-list').count() === 0 && new globalThis.URL(grace.url()).hash === '', '#ranking takes Grace back to the readings');
  expect(!errors.length, `no console errors${errors.length ? ': ' + errors.join('; ') : ''}`);
} catch (e) { console.error(`  FAIL  ${e.message}`); process.exitCode = 1; }
await browser.close();
