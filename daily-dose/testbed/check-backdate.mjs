// Headless check of "Counted when it was done" (SPEC.md) in Chromium at
// phone width (CHECK_WIDTH, default 390), on a running bed at Day 61 where
// Grace has not checked today's texts off:
//   VOLUME3=1 DAY1_OFFSET=60 scripts/testbed.sh start && node testbed/seed-finished.mjs
//   node testbed/check-backdate.mjs
// Today's poem is made to close CLOSE_IN seconds (default 45) after the start,
// standing in for midnight. Grace loads the page, goes offline and checks the
// poem off before it closes ("on the day" at once), reloads with the
// emulators still out of reach (the check off waits on her phone with the
// time she made it), and once the poem has closed they come back and it is
// sent. The server keeps both times: its own (after the close) and hers
// (before it); her card and her completion record (what the organiser sees) say on the day.
// Exit 1 on the first failure or an unexpected console error. It writes to
// the bed: reseed before running it again.
import { chromium } from 'playwright';
import { projectId, ports, host } from './config.mjs';
import { club } from './personas.mjs';

if (!projectId.startsWith('demo-')) throw new Error('Refusing to touch a non-demo project.');
process.env.FIRESTORE_EMULATOR_HOST = `${host}:${ports.firestore}`;
const { initializeApp } = await import('firebase-admin/app');
const { getFirestore, Timestamp } = await import('firebase-admin/firestore');
const db = getFirestore(initializeApp({ projectId }, 'check-backdate'));
const base = `dailyDose/${club.id}`;

const URL = process.env.TOUR_URL || 'http://127.0.0.1:5178/';
const WIDTH = Number(process.env.CHECK_WIDTH || 390);
const CLOSE_IN = Number(process.env.CLOSE_IN || 45) * 1000;
const ID = 'P61', UID = 'grace-okafor';
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME ? { executablePath: process.env.CHROME } : {}) });
const errors = [], results = {};
const ok = message => console.log(`  ok    ${message}`);
function expect(condition, message) { if (!condition) throw new Error(message); ok(message); }
const EMULATORS = /127\.0\.0\.1:(8290|9199)\//;
const offlineNoise = text => /Could not reach Cloud Firestore|client is offline|ERR_INTERNET_DISCONNECTED|ERR_FAILED|net::|network-request-failed|WebChannelConnection|unavailable|Failed to fetch|Not connected/i.test(text);

async function signIn(name) {
  const context = await browser.newContext({ viewport: { width: WIDTH, height: 800 }, hasTouch: WIDTH < 700, deviceScaleFactor: 2 });
  const page = await context.newPage();
  const benign = r => r.status() === 400 && /documents:commit|TYPE=terminate/.test(r.url());
  page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/podcast/') && !benign(r)) errors.push(`${name}: HTTP ${r.status()} ${r.url().slice(0, 120)}`); });
  page.on('console', m => { if (m.type() === 'error' && !m.location()?.url?.includes('/podcast/') && !/Failed to load resource/.test(m.text()) && !offlineNoise(m.text())) errors.push(`${name}: ${m.text()}`); });
  page.on('pageerror', e => errors.push(`${name}: ${e.message}`));
  page.on('dialog', d => d.accept().catch(() => {}));
  await page.goto(URL);
  const popup = context.waitForEvent('page');
  await page.getByRole('button', { name: /Sign in with Google/ }).click();
  const chooser = await popup;
  await chooser.waitForLoadState('domcontentloaded');
  await chooser.getByText(name, { exact: true }).click();
  return page;
}
const card = (page, id) => page.locator(`article[data-work="${id}"]`);
const full = page => page.waitForFunction(() => document.querySelectorAll('article[data-work]').length >= 183 && !document.querySelector('.feed-loading'), null, { timeout: 180000, polling: 100 });
const row = async () => (await db.doc(`${base}/works/${ID}/reads/${UID}`).get()).data();

try {
  // Today's poem closes CLOSE_IN from now (in place of midnight).
  const closeAt = Date.now() + CLOSE_IN;
  await db.doc(`${base}/works/${ID}`).update({ closeAt: Timestamp.fromMillis(closeAt) });
  expect(!(await row())?.completedAt, `the poem closes in ${CLOSE_IN / 1000} s; Grace has not checked it off`);
  const grace = await signIn('Grace Okafor');
  await full(grace);
  await grace.waitForFunction(() => !!localStorage.getItem('daily-dose-paint'), null, { timeout: 30000 });

  // Offline, before the close: checked off, on the day at once.
  await grace.context().setOffline(true);
  const c = card(grace, ID);
  await c.scrollIntoViewIfNeeded();
  await c.getByRole('button', { name: /Check off as read/ }).click();
  const made = Date.now();
  await c.getByText('Checked off on the day').waitFor({ timeout: 5000 });
  expect(made < closeAt - 5000, `offline, ${((closeAt - made) / 1000).toFixed(0)} s before the close: the card says "Checked off on the day"`);
  const outbox = await grace.evaluate(() => Object.entries(localStorage).filter(([k]) => k.startsWith('daily-dose-outbox:')).flatMap(([, v]) => JSON.parse(v)));
  const entry = outbox.find(e => e.id === ID && e.payload.action === 'complete');
  expect(entry && entry.payload.writtenAt < closeAt && Math.abs(entry.payload.writtenAt - made) < 3000, 'the check off waits on her phone with the time she made it');

  // A reload with the emulators still out of reach: the outbox survives it.
  await grace.route(EMULATORS, route => route.abort('internetdisconnected').catch(() => {}));
  await grace.context().setOffline(false);
  await grace.reload({ waitUntil: 'commit' });
  await card(grace, ID).waitFor({ timeout: 10000 });
  await card(grace, ID).getByText('Checked off on the day').waitFor({ timeout: 10000 });
  ok('reloaded with no connection: the card still says checked off on the day');

  // The poem closes; then the connection comes back and the check off is sent.
  await grace.waitForTimeout(Math.max(0, closeAt - Date.now() + 2000));
  expect(Date.now() > closeAt && !(await row())?.completedAt, 'the poem has closed and the server has not got the check off yet');
  const back = Date.now();
  await grace.unroute(EMULATORS);
  for (let i = 0; i < 600 && (await row())?.status !== 'done'; i++) await new Promise(r => setTimeout(r, 100));
  results.sentAfter = Date.now() - back;
  const r = await row();
  results.writtenBeforeClose = closeAt - r.writtenAt.toMillis(); results.serverAfterClose = r.completedAt.toMillis() - closeAt;
  expect(r?.status === 'done' && r.completedAt.toMillis() > closeAt && r.writtenAt.toMillis() < closeAt,
    `sent ${(results.sentAfter / 1000).toFixed(1)} s after the connection came back: the server time is ${(results.serverAfterClose / 1000).toFixed(0)} s after the close, her phone time ${(results.writtenBeforeClose / 1000).toFixed(0)} s before it; both are kept`);
  expect(Math.abs(r.writtenAt.toMillis() - entry.payload.writtenAt) < 1000 && r.joinedOnDay === true, 'the phone time is the one she made it at, and she counts as joined on the day');
  const record = (await db.doc(`${base}/completions/${UID}`).get()).data();
  expect(record.works[ID].toMillis() === r.writtenAt.toMillis(), 'her completion record holds the time it counts at (the phone time)');

  // What she and the organiser see after a fresh load.
  await grace.reload();
  await full(grace);
  await card(grace, ID).getByText('Checked off on the day').waitFor({ timeout: 10000 });
  ok('after a fresh load her card says "Checked off on the day"');
  expect(errors.length === 0, `no console errors${errors.length ? `: ${errors.join(' | ')}` : ''}`);
  console.log(`RESULTS ${JSON.stringify(results)}`);
  console.log('All checks passed.');
} catch (error) {
  console.error(`  FAIL  ${error.message}`);
  if (errors.length) console.error(`  console: ${errors.join(' | ')}`);
  console.log(`RESULTS ${JSON.stringify(results)}`);
  process.exitCode = 1;
} finally { await browser.close(); }
