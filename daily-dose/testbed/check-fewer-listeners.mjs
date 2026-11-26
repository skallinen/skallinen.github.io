// Headless check of "Fewer live connections" (SPEC.md) at phone width, on a
// running test bed with a busy club (every member has finished every earlier
// text):
//   VOLUME3=1 DAY1_OFFSET=52 scripts/testbed.sh start && node testbed/seed-finished.mjs
//   node testbed/check-fewer-listeners.mjs      # BROWSER=webkit; CHECK_SHOTS=dir keeps screenshots
// Mikko's page listens to far fewer queries than three per text. He finishes
// today's poem; Grace finishes it too and reacts: both reach him by
// themselves (today is live). Grace then edits her thought and reacts on an
// old text far down the page: nothing changes for Mikko until he scrolls to
// that card, which then shows both. Refresh brings the count on his name up
// to date for old texts he is not looking at; a reload does not read them
// (Today first). He reacts on an old
// card and Grace sees it; he opens an old text; Mark as unread hides an old
// card's thoughts and finishing again brings them back; Desert island works.
// With the one query switched on (scripts/backfill-read-uids.mjs --enable) the
// same steps pass, with fewer listeners still. Exit 1 on the first failure or
// a console error. It writes to the bed: reseed before running it again.
import { chromium, webkit } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const URL = process.env.TOUR_URL || 'http://127.0.0.1:5178/';
const WIDTH = Number(process.env.CHECK_WIDTH || 390);
const SHOTS = process.env.CHECK_SHOTS ? resolve(process.env.CHECK_SHOTS) : null;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const engine = process.env.BROWSER === 'webkit' ? webkit : chromium;
const browser = await engine.launch({ headless: true });
const errors = [];
let step = 0;
const ok = message => console.log(`  ok    ${message}`);
function expect(condition, message) { if (!condition) throw new Error(message); ok(message); }
async function shot(page, name) { if (SHOTS) await page.screenshot({ path: join(SHOTS, `${String(++step).padStart(2, '0')}-${name}.png`) }); }

// Counts, at the network, the listen targets the page has added and removed.
function countTargets() {
  const n = window.__targets = { add: 0, remove: 0 };
  const occ = (s, w) => { let c = 0, i = 0; while ((i = s.indexOf(w, i)) >= 0) { c++; i += w.length; } return c; };
  const out = body => { if (typeof body !== 'string') return; let s = body; try { s = decodeURIComponent(body); } catch { /* as it is */ } n.add += occ(s, '"addTarget"'); n.remove += occ(s, '"removeTarget"'); };
  const send = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body) { out(body); return send.call(this, body); };
  const fetch = window.fetch;
  window.fetch = function (input, init) {
    if (init?.body != null) out(init.body);
    else if (typeof input !== 'string' && input?.method === 'POST') { try { input.clone().text().then(out, () => {}); } catch { /* not readable */ } }
    return fetch.call(this, input, init);
  };
}
const live = page => page.evaluate(() => window.__targets.add - window.__targets.remove);

async function signIn(name) {
  const context = await browser.newContext({ viewport: { width: WIDTH, height: 780 }, hasTouch: true, deviceScaleFactor: 2, ...(engine === chromium ? { isMobile: true } : {}) });
  const page = await context.newPage();
  // Not errors here: the podcast files the bed answers 404 for on purpose, and
  // WebKit's line for each Firestore request a reload cuts off ("due to access control checks").
  const noise = text => /Firestore\/(Listen|Write)\/channel.* due to access control checks/.test(text);
  page.on('console', m => { if (m.type() === 'error' && !m.location()?.url?.includes('/podcast/') && !noise(m.text())) errors.push(`${name}: ${m.text()}`); });
  page.on('pageerror', e => { if (!noise(e.message)) errors.push(`${name}: ${e.message}`); });
  await page.addInitScript(countTargets);
  await page.goto(URL);
  const popup = context.waitForEvent('page');
  await page.getByRole('button', { name: /Sign in with Google/ }).click();
  const chooser = await popup;
  await chooser.waitForLoadState('domcontentloaded');
  await chooser.getByText(name, { exact: true }).click();
  await page.getByText(/^OF (50|75)$/).waitFor({ timeout: 120000 });
  await page.locator('article[data-work]').first().waitFor({ timeout: 120000 });
  // Today first: the earlier days follow the first draw.
  await page.waitForFunction(() => !document.querySelector('.feed-loading'), null, { timeout: 120000 });
  return page;
}
const card = (page, id) => page.locator(`article[data-work="${id}"]`);
const thought = (page, id, name) => card(page, id).locator('.tweet').filter({ hasText: name });
const badge = page => page.locator('header button[data-news]');
const news = async page => await badge(page).count() ? Number((await badge(page).getAttribute('aria-label')).match(/^(\d+) new/)[1]) : 0;
const toTop = page => page.evaluate(() => scrollTo(0, 0));
async function show(page, id) { await card(page, id).evaluate(el => el.scrollIntoView({ block: 'start' })); }
async function react(page, id, author, label) {
  const t = thought(page, id, author);
  await t.locator('.reaction-add').scrollIntoViewIfNeeded();
  await t.locator('.reaction-add').click();
  await t.getByRole('button', { name: label, exact: true }).click();
}
const pill = (page, id, author, key) => thought(page, id, author).locator(`button.reaction[data-emoji="${key}"]`);
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

const pages = {};
try {
  const mikko = pages.Mikko = await signIn('Mikko Saarinen');
  const cards = await mikko.locator('article[data-work]').count();
  const poemToday = await mikko.locator('section.day-group').filter({ has: mikko.getByRole('heading', { name: /Today$/ }) }).locator('article').filter({ has: mikko.locator('.genre.poem') }).getAttribute('data-work');
  // Old texts, far down the page: the poems of Days 1 to 5.
  const [OLD, OLD2, OLD3, OLD4, OLD5] = ['P01', 'P02', 'P03', 'P04', 'P05'];
  expect(cards >= 15 && await card(mikko, OLD5).count() === 1, `Mikko signed in at ${WIDTH} px: ${cards} cards, the old ones among them`);
  expect(await thought(mikko, OLD, 'Grace Okafor').count() === 0 && await card(mikko, OLD).locator('.loading-thoughts').count() === 1, 'an old card he has not scrolled to holds no thoughts yet (Today first: read when it comes on screen)');
  await mikko.waitForTimeout(4000);
  const listeners = await live(mikko);
  expect(listeners > 0 && listeners <= 40, `the page keeps ${listeners} listeners open for ${cards} cards (it was about three per card, then one; own rows on demand: at most 40)`);
  const start = await news(mikko);
  await shot(mikko, 'loaded');

  // Today is live.
  await finish(mikko, poemToday, 'Short and it stays with me.');
  expect(await thought(mikko, poemToday, 'Mikko Saarinen').count() === 1, 'Mikko finishes today\'s poem: Finish & reveal shows his thought under it');
  const grace = pages.Grace = await signIn('Grace Okafor');
  await finish(grace, poemToday, 'Read it twice over coffee.');
  await thought(grace, poemToday, 'Mikko Saarinen').waitFor({ timeout: 15000 });
  await react(grace, poemToday, 'Mikko Saarinen', 'heart');
  await pill(grace, poemToday, 'Mikko Saarinen', 'heart').waitFor();
  ok('Grace finished the same poem and gave Mikko\'s thought a heart');
  await toTop(mikko);
  await mikko.waitForFunction(n => Number(document.querySelector('header button[data-news]')?.getAttribute('aria-label')?.match(/^(\d+)/)?.[1] || 0) === n, start + 1, { timeout: 45000 });
  ok(`today is live: the count on his name went from ${start} to ${start + 1} by itself`);
  await thought(mikko, poemToday, 'Grace Okafor').waitFor({ timeout: 45000 });
  ok('and Grace\'s thought appeared under today\'s poem without a reload');

  // An old text he is not looking at is not listened to.
  await show(grace, OLD);
  await thought(grace, OLD, 'Mikko Saarinen').waitFor({ timeout: 15000 });
  await react(grace, OLD, 'Mikko Saarinen', 'made me think');
  await pill(grace, OLD, 'Mikko Saarinen', 'think').waitFor();
  await card(grace, OLD).getByRole('textbox').fill('Grace changed her mind about this one.');
  await card(grace, OLD).getByRole('button', { name: 'Save changes' }).click();
  await thought(grace, OLD, 'Grace Okafor').filter({ hasText: 'changed her mind' }).waitFor({ timeout: 15000 });
  ok(`Grace reacted to Mikko's thought on an old text (${OLD}) and edited her own there`);
  const before = await news(mikko);
  await mikko.waitForTimeout(35000);   // a 30-second refresh passes
  expect(await news(mikko) === before, `Mikko, at the top of the page, sees no change for 35 s: the count stays ${before}`);
  expect(await thought(mikko, OLD, 'Grace Okafor').filter({ hasText: 'changed her mind' }).count() === 0, 'and the old card still holds Grace\'s earlier thought');
  // He scrolls to it: it turns live and is redrawn in place.
  await show(mikko, OLD);
  await thought(mikko, OLD, 'Grace Okafor').filter({ hasText: 'changed her mind' }).waitFor({ timeout: 10000 });
  ok('he scrolls to the old card: within seconds it shows Grace\'s edited thought');
  expect(/edited/.test(await thought(mikko, OLD, 'Grace Okafor').locator('.tweet-meta').innerText()), 'marked "edited"');
  await pill(mikko, OLD, 'Mikko Saarinen', 'think').waitFor({ timeout: 10000 });
  ok('and Grace\'s 🤔 on his own thought');
  await shot(mikko, 'old-card-on-screen');
  // While it is on screen it is live.
  await react(grace, OLD, 'Mikko Saarinen', 'laughing');
  await pill(mikko, OLD, 'Mikko Saarinen', 'laugh').waitFor({ timeout: 45000 });
  ok('while the old card is on screen, Grace\'s next reaction arrives by itself');

  // Refresh brings old texts up to date without looking at them; a reload
  // reads only today's and the two days before (Today first, SPEC.md).
  await toTop(mikko);
  await mikko.waitForTimeout(3000);
  const refresh = async () => {
    await mikko.evaluate(() => document.querySelector('button[data-action="refresh"]').click());
    await mikko.locator('#toast', { hasText: /Up to date/ }).waitFor({ timeout: 60000 });
    await mikko.evaluate(() => { document.querySelector('#toast').textContent = ''; });
  };
  // Every text read once, so the count includes the seed's older hearts.
  await refresh();
  const seen = await news(mikko);
  await show(grace, OLD2);
  await react(grace, OLD2, 'Mikko Saarinen', 'surprised');
  await pill(grace, OLD2, 'Mikko Saarinen', 'wow').waitFor();
  await mikko.waitForTimeout(1500);
  await refresh();
  expect(await news(mikko) === seen + 1, `Refresh: the count goes from ${seen} to ${seen + 1} for a reaction on an old text he is not looking at`);
  await show(grace, OLD3);
  await react(grace, OLD3, 'Mikko Saarinen', 'moved');
  await pill(grace, OLD3, 'Mikko Saarinen', 'moved').waitFor();
  await mikko.waitForTimeout(1500);
  await mikko.reload();
  await mikko.getByText(/^OF (50|75)$/).waitFor({ timeout: 120000 });
  await mikko.locator('article[data-work]').first().waitFor({ timeout: 120000 });
  await mikko.waitForFunction(() => document.querySelectorAll('article[data-work]').length > 15 && !document.querySelector('.feed-loading'), null, { timeout: 60000 });
  await mikko.waitForTimeout(3000);
  const reloaded = await news(mikko);
  expect(reloaded < seen + 2, `a reload reads no old text: the count is ${reloaded}, without the reactions on ${OLD2} and ${OLD3}`);
  await refresh();
  await mikko.waitForFunction(n => Number(document.querySelector('header button[data-news]')?.getAttribute('aria-label')?.match(/^(\d+)/)?.[1] || 0) === n, seen + 2, { timeout: 30000 });
  ok(`Refresh after the reload: the count is ${seen + 2}`);
  // The count leads to an old thought.
  await badge(mikko).click();
  await mikko.locator('#toast', { hasText: /new reactions? to your thought on/ }).waitFor({ timeout: 15000 });
  expect(await mikko.evaluate(() => { const el = document.activeElement; return !!el?.matches('[data-own-thought]') && el.getBoundingClientRect().top >= 0 && el.getBoundingClientRect().bottom <= innerHeight; }), 'a tap on the count goes to a thought of his with news, in view');

  // His own actions on an old card.
  await show(mikko, OLD4);
  // (👆: the seed gives hearts only, so this one is certainly new.)
  await react(mikko, OLD4, 'Grace Okafor', 'this');
  await pill(mikko, OLD4, 'Grace Okafor', 'this').and(mikko.locator('[aria-pressed="true"]')).waitFor({ timeout: 15000 });
  await mikko.waitForTimeout(2500);
  expect(await pill(mikko, OLD4, 'Grace Okafor', 'this').getAttribute('aria-pressed') === 'true', `he reacts on an old card (${OLD4}): his 👆 shows and stays after the server answers`);
  await show(grace, OLD4);
  await pill(grace, OLD4, 'Grace Okafor', 'this').waitFor({ timeout: 15000 });
  ok('Grace scrolls to that card and sees his 👆');
  await card(mikko, OLD4).getByRole('textbox').fill('Mikko, second thoughts.');
  await card(mikko, OLD4).getByRole('button', { name: 'Save changes' }).click();
  await thought(mikko, OLD4, 'Mikko Saarinen').filter({ hasText: 'second thoughts' }).waitFor({ timeout: 15000 });
  ok('Save changes on an old card shows his new thought');
  // Opening an old text.
  await card(mikko, OLD4).locator('.read-button').click();
  await mikko.locator('dialog#reader[open], dialog[open] .reader-inner').first().waitFor({ timeout: 15000 });
  await mikko.locator('dialog[open] [data-close]').click();
  expect(await thought(mikko, OLD4, 'Grace Okafor').count() === 1, 'he opens the old text and closes it: the card is as it was');

  // The reveal gate on an old card.
  await show(mikko, OLD5);
  const members = await card(mikko, OLD5).locator('.tweet').count();
  await card(mikko, OLD5).getByRole('button', { name: 'Mark as unread' }).click();
  await mikko.locator('dialog.confirm').getByRole('button', { name: 'Mark as unread' }).click();
  await card(mikko, OLD5).locator('.locked').waitFor({ timeout: 15000 });
  await mikko.waitForTimeout(2500);
  expect(await card(mikko, OLD5).locator('.tweet').count() === 0 && await card(mikko, OLD5).locator('.locked').count() === 1, 'Mark as unread on an old card hides the club\'s thoughts and locks it');
  await finish(mikko, OLD5, 'Back again.');
  await thought(mikko, OLD5, 'Grace Okafor').waitFor({ timeout: 15000 });
  expect(await card(mikko, OLD5).locator('.tweet').count() === members, `finishing it again brings all ${members} thoughts back`);

  // Desert island reads only his own rows.
  await toTop(mikko);
  await mikko.locator('.personal-strip .island-link').getByRole('button', { name: 'Desert island' }).click();
  await mikko.locator('.island-pair').waitFor({ timeout: 15000 });
  const pick = await mikko.locator('.island-choose').first().getAttribute('data-island-pick');
  await mikko.locator(`.island-choose[data-island-pick="${pick}"]`).click();
  await mikko.locator('.island-count', { hasText: /^1 choice/ }).waitFor({ timeout: 15000 });
  await mikko.locator('.island-bar .rank-status', { hasText: /^Saved\.$/ }).waitFor({ timeout: 15000 });
  await mikko.getByRole('button', { name: 'Results' }).click();
  const ranked = await mikko.locator('.island-results > li').count();
  expect(ranked >= cards - 6, `Desert island: a choice is saved, and the results list ${ranked} checked-off texts`);
  await mikko.getByRole('button', { name: /Back to readings/ }).click();
  await mikko.locator('article[data-work]').first().waitFor({ timeout: 15000 });
  await mikko.waitForTimeout(4000);
  const end = await live(mikko);
  expect(end <= 50, `back on the readings the page keeps ${end} listeners open (Desert island read his rows once, without listeners)`);
  await shot(mikko, 'end');
  expect(errors.length === 0, `no console errors${errors.length ? `: ${errors.join(' | ')}` : ''}`);
  console.log('All checks passed.');
} catch (error) {
  console.error(`  FAIL  ${error.message}`);
  if (errors.length) console.error(`  console: ${errors.join(' | ')}`);
  // What each page showed when it failed.
  for (const [name, page] of Object.entries(pages)) {
    console.error(`  ${name}: toast "${await page.locator('#toast').innerText().catch(() => '')}", scrolled to ${await page.evaluate(() => Math.round(scrollY)).catch(() => '?')}`);
    if (SHOTS) await page.screenshot({ path: join(SHOTS, `failed-${name}.png`) }).catch(() => {});
  }
  process.exitCode = 1;
} finally { await browser.close(); }
