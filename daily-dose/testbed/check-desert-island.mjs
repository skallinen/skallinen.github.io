// Headless check of Desert island (every member) against a freshly started or
// reset test bed (scripts/testbed.sh start). Mikko, a member and not the
// organiser, finds "Desert island" in the progress strip ("Check off two texts
// to play"), checks off five texts and rates two of them, then opens it
// (#desert-island). The descriptions sit closed behind an ⓘ: a tap opens one
// and records no choice; a tap elsewhere, Escape and a second tap close it.
// "How this works" is closed until opened. With no choices the results put
// every text at 3 stars.
// He makes twelve choices by a fixed taste, never sees the same pair twice in
// a row, skips once (nothing recorded) and undoes once (the pair comes back);
// the results then rank his favourite first with 5 stars and his least liked
// last with 1, show his own stars beside the suggestion, a likely range and
// a strength with its ± for each text. His ratings are unchanged. The
// choices follow him to a second device (the account copy); Grace sees only
// her own (none). No sideways scrolling, no console errors. At the end the
// game and results are shot again at desktop width (a mouse: hover on the ⓘ). Exit 1 on the first
// failure. CHECK_SHOTS=dir keeps screenshots; CHECK_WIDTH (default 390) sets
// the phone width; CHROME a browser to launch.
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
// The toast is hidden for the picture (it would cover the page in a full-page shot).
const shot = async (page, name, fullPage = true) => { if (SHOTS) await page.waitForTimeout(400), await page.evaluate(() => document.querySelector('#toast')?.classList.remove('show')), await page.screenshot({ path: join(SHOTS, `${String(++step).padStart(2, '0')}-${name}.png`), fullPage }); };
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
const newContext = () => browser.newContext({ viewport: { width: WIDTH, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
const day = (page, n) => page.locator('section.day-group').filter({ has: page.getByRole('heading', { name: new RegExp(`Day ${String(n).padStart(2, '0')}`) }) });
const card = (page, n, genre) => day(page, n).locator('article').filter({ has: page.locator(`.genre.${genre}`) });
async function checkOff(page, n, genre, stars = null) {
  const c = card(page, n, genre);
  await c.scrollIntoViewIfNeeded();
  await c.getByRole('button', { name: /Check off as read/ }).click();
  await c.getByRole('button', { name: 'Mark as unread' }).waitFor();
  if (stars != null) {
    await c.getByRole('button', { name: `${stars} stars`, exact: true }).click();
    await c.getByText(`${stars} / 5`, { exact: true }).waitFor();
  }
  return c.getAttribute('data-work');
}
const pair = page => page.locator('.island-choose').evaluateAll(cs => cs.map(c => c.dataset.islandPick));
const countText = async page => (await page.locator('.island-count').textContent()).trim();
const rows = page => page.locator('.island-results > li').evaluateAll(lis => lis.map(li => ({
  id: li.dataset.islandId, meta: li.querySelector('.rank-meta').textContent, stats: li.querySelector('.island-stats').textContent,
  stars: Number(li.querySelector('.island-stars').textContent.replace('★', '')) })));
const noSideways = page => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
const key = (a, b) => [a, b].sort().join('|');

try {
  const mContext = await newContext();
  const page = await signIn(mContext, 'Mikko Saarinen');
  const link = page.locator('.personal-strip .island-link');
  expect(/Check off two texts to play/.test(await link.textContent()), 'a member sees "Desert island" in the progress strip: "Check off two texts to play"');
  const ids = [];
  ids.push(await checkOff(page, 1, 'poem', 2));
  ids.push(await checkOff(page, 1, 'story', 4));
  ids.push(await checkOff(page, 1, 'essay'));
  ids.push(await checkOff(page, 2, 'poem'));
  ids.push(await checkOff(page, 2, 'story'));
  ok(`five texts checked off (Day 1 poem 2 stars, Day 1 story 4 stars, three unrated): ${ids.join(', ')}`);
  await page.waitForTimeout(1500);
  const done = await page.locator('article.is-done').evaluateAll(a => a.map(x => x.dataset.work));
  expect(ids.every(id => done.includes(id)), `all five are checked off (${done.join(', ')})`);
  // His taste, best first: the Day 2 story, Day 1 essay, Day 1 story, Day 2 poem, Day 1 poem.
  const taste = [ids[4], ids[2], ids[1], ids[3], ids[0]];
  const better = (a, b) => taste.indexOf(a) < taste.indexOf(b) ? a : b;

  await link.getByRole('button', { name: 'Desert island' }).click();
  await page.locator('.island-pair').waitFor();
  expect(new globalThis.URL(page.url()).hash === '#desert-island', 'the address is #desert-island');
  expect(await page.getByRole('heading', { name: 'Which one would you take to a desert island?' }).count() === 1, 'the question is asked');
  let p = await pair(page);
  expect(p.length === 2 && p[0] !== p[1] && p.every(id => ids.includes(id)), 'two different texts he has checked off');
  expect(/^0 choices/.test(await countText(page)), 'no choices yet');
  expect(await page.getByRole('button', { name: 'Undo last choice' }).isDisabled(), 'nothing to undo');
  const first = page.locator('.island-card').first();
  expect(await first.locator('.island-title').count() === 1 && await first.locator('.island-author').count() === 1 && /(Poem|Story|Essay) · Day 0[12]/.test(await first.locator('.genre').textContent()), 'a card shows type, day, title and author');
  // The description sits behind an ⓘ: closed at first; a tap opens it and chooses nothing.
  const info = first.locator('.island-info'), tip = first.locator('.island-tip');
  expect(await info.count() === 1 && !await tip.isVisible(), 'the card has an ⓘ and its description is closed (the bed has descriptions)');
  await info.click();
  expect(await tip.isVisible() && await info.getAttribute('aria-expanded') === 'true', 'a tap on the ⓘ shows the description');
  expect(/^0 choices/.test(await countText(page)) && key(...await pair(page)) === key(...p), 'and records no choice: still 0, same pair');
  await shot(page, 'phone-description-open', false);
  await page.locator('.island-question').click();
  expect(!await tip.isVisible(), 'a tap elsewhere closes it');
  await info.click(); await page.keyboard.press('Escape');
  expect(!await tip.isVisible(), 'Escape closes it');
  // (After a key press the focused ⓘ would show it by keyboard focus, as on My ranking: blur first.)
  await page.locator('.island-question').click();
  await info.click(); await info.click();
  expect(!await tip.isVisible() && /^0 choices/.test(await countText(page)), 'a second tap closes it; still no choice');
  // How this works: closed until opened.
  const help = page.locator('details.island-help');
  expect(await help.count() === 1 && !await help.evaluate(d => d.open), '"How this works" is there, closed');
  await help.locator('summary').click();
  expect(await help.evaluate(d => d.open) && /never changes your stars/.test(await help.textContent()) && /Only you see your choices/.test(await help.textContent()), 'opened, it explains the game, says it never changes your stars and who sees the choices');
  await shot(page, 'how-it-works-open');
  await help.locator('summary').click();
  expect(await noSideways(page), 'no sideways scrolling (game)');
  await shot(page, 'game-start');

  await page.getByRole('button', { name: 'Results' }).click();
  let r = await rows(page);
  expect(r.length === 5 && r.every(x => x.stars === 3), `no choices: all five texts at 3 stars (${r.map(x => x.stars).join(' ')})`);
  expect(r.every(x => /likely 1 to 5 ★/.test(x.stats)), 'and each could land anywhere (likely 1 to 5)');
  await shot(page, 'results-empty');
  await page.getByRole('button', { name: 'Choose' }).click();

  let last = null;
  for (let k = 1; k <= 12; k++) {
    p = await pair(page);
    expect(key(...p) !== last, `choice ${k}: a new pair (${p.join(' vs ')})`);
    const pick = better(p[0], p[1]);
    await page.locator(`.island-choose[data-island-pick="${pick}"]`).click();
    await page.locator('.island-count', { hasText: new RegExp(`^${k} choices?`) }).waitFor();
    last = key(...p);
  }
  expect(/^12 choices/.test(await countText(page)), '12 choices counted');
  await page.locator('.island-bar .rank-status', { hasText: /^Saved\.$/ }).waitFor({ timeout: 15000 });
  ok('saved to the account ("Saved.")');
  await shot(page, 'game-12');

  // Skip records nothing and shows another pair.
  p = await pair(page);
  await page.getByRole('button', { name: 'Skip, I cannot decide' }).click();
  const afterSkip = await pair(page);
  expect(key(...afterSkip) !== key(...p) && /^12 choices/.test(await countText(page)), 'Skip shows another pair and records nothing');
  // A choice, then Undo: back to 12, and the same pair again.
  const pick = better(afterSkip[0], afterSkip[1]);
  await page.locator(`.island-choose[data-island-pick="${pick}"]`).click();
  await page.locator('.island-count', { hasText: /^13 choices/ }).waitFor();
  await page.getByRole('button', { name: 'Undo last choice' }).click();
  await page.locator('.island-count', { hasText: /^12 choices/ }).waitFor();
  expect(key(...await pair(page)) === key(...afterSkip), 'Undo takes the choice back and shows that pair again');
  await page.locator('.island-bar .rank-status', { hasText: /^Saved\.$/ }).waitFor({ timeout: 15000 });
  // Answer it again so the count stays 13 for the rest.
  await page.locator(`.island-choose[data-island-pick="${pick}"]`).click();
  await page.locator('.island-count', { hasText: /^13 choices/ }).waitFor();
  await page.locator('.island-bar .rank-status', { hasText: /^Saved\.$/ }).waitFor({ timeout: 15000 });

  await page.getByRole('button', { name: 'Results' }).click();
  r = await rows(page);
  expect(r.length === 5, 'five texts in the results');
  expect(r[0].id === taste[0] && r[0].stars === 5, `his favourite is first with 5 stars (${r.map(x => x.stars).join(' ')})`);
  expect(r[4].id === taste[4] && r[4].stars === 1, 'his least liked is last with 1 star');
  expect(r.every((x, i) => i === 0 || r[i - 1].stars >= x.stars), 'stars never rise down the list');
  expect(r.every(x => /likely \d( to \d)? ★ · strength [+−]\d\.\d\d ± \d\.\d\d · \d+ choices?, \d+ won/.test(x.stats)), 'each row: likely range, strength ± its uncertainty, choices and wins');
  const poemRow = r.find(x => x.id === ids[0]), storyRow = r.find(x => x.id === ids[1]);
  expect(/your stars 2 ★/.test(poemRow.meta) && /your stars 4 ★/.test(storyRow.meta) && r.filter(x => /not rated/.test(x.meta)).length === 3, 'his own stars beside the suggestion (2 ★, 4 ★, three not rated)');
  const rowInfo = page.locator('.island-results > li').first().locator('.island-info');
  await rowInfo.click();
  expect(await page.locator('.island-results > li').first().locator('.island-tip').isVisible(), 'in the results, a tap on a title\'s ⓘ shows its description');
  await shot(page, 'results-description-open', false);
  await page.locator('.rank-note').first().click();
  expect(/^From 13 choices\./.test(await page.locator('.rank-note').first().textContent()), 'the note says how many choices and how settled the list is');
  expect(await noSideways(page), 'no sideways scrolling (results)');
  await shot(page, 'results-13');

  // Nothing wrote a rating.
  await page.getByRole('button', { name: 'Back to readings' }).click();
  await page.getByText(/^OF 50$/).waitFor();
  expect(await card(page, 1, 'poem').getByText('2 / 5', { exact: true }).count() === 1 && await card(page, 1, 'story').getByText('4 / 5', { exact: true }).count() === 1, 'his ratings are unchanged (2 / 5, 4 / 5)');
  expect(await card(page, 1, 'essay').getByText('Not rated', { exact: true }).count() === 1, 'an unrated text is still not rated');
  expect(/13 choices so far/.test(await link.textContent()), 'the progress strip says "13 choices so far"');

  // A second device: the account copy.
  const m2Context = await newContext();
  const m2 = await signIn(m2Context, 'Mikko Saarinen');
  await m2.goto(`${URL}#desert-island`);
  await m2.locator('.island-count').waitFor({ timeout: 30000 });
  expect(/^13 choices/.test(await countText(m2)), 'his choices follow him to another device (13)');

  // Grace sees only her own.
  const gContext = await newContext();
  const grace = await signIn(gContext, 'Grace Okafor');
  expect(await grace.locator('.personal-strip .island-link').count() === 1, 'Grace, another member, has Desert island too');
  await grace.goto(`${URL}#desert-island`);
  await grace.locator('.island-count, .island-tabs').first().waitFor({ timeout: 30000 });
  expect(await grace.locator('.island-count').count() === 0 || /^0 choices/.test(await countText(grace)), 'and none of Mikko\'s choices');

  // Desktop width.
  const dContext = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
  const desk = await signIn(dContext, 'Mikko Saarinen');
  await desk.goto(`${URL}#desert-island`);
  await desk.locator('.island-pair').waitFor({ timeout: 30000 });
  const boxes = await desk.locator('.island-card').evaluateAll(cs => cs.map(c => c.getBoundingClientRect().top));
  expect(Math.abs(boxes[0] - boxes[1]) < 2, 'on a desktop the two cards sit side by side');
  const dInfo = desk.locator('.island-card').first().locator('.island-info');
  await dInfo.hover();
  expect(await desk.locator('.island-card').first().locator('.island-tip').isVisible(), 'on a desktop, pointing at the ⓘ shows the description');
  await shot(desk, 'desktop-game');
  await desk.mouse.move(5, 5);
  await desk.getByRole('button', { name: 'Results' }).click();
  await shot(desk, 'desktop-results');
  expect(!errors.length, `no console errors${errors.length ? ': ' + errors.join('; ') : ''}`);
} catch (e) { console.error(`  FAIL  ${e.message}`); process.exitCode = 1; }
await browser.close();
