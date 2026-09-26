// Daily Dose feature tour: a presenter-driven walkthrough of the reading room.
//
// Each beat: (1) a caption card says what is about to happen, the presenter
// presses SPACE (or RIGHT ARROW, or Enter in the terminal); (2) the action
// happens visibly with a fake pointer; (3) if the action changed the screen,
// an explore stop lets the presenter click around by hand until SPACE.
//
// Run with scripts/tour.sh (see TESTBED.md, "Feature tour"). Environment:
//   TOUR_AUTOGO=ms          press space automatically after ms (unattended runs)
//   TOUR_HEADLESS=1         no window (verification)
//   TOUR_SHOTS=dir          save a screenshot at every caption and explore stop
//   TOUR_READER=name        persona who reads (default Grace Okafor)
//   TOUR_ORGANISER=name     organiser persona (default Aino Lehtola)
//   TOUR_SKIP_ORGANISER=1   leave out the organiser beats
//   TOUR_URL=url            default http://127.0.0.1:5178/
//   TOUR_SIZE=WxH | full    window size (default 1440x900)
//
// Everything is found by visible text or role. When the app's wording changes,
// update LABELS below; captions live in CAPTIONS, in beat order.
import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import readline from 'node:readline';

// ---------------------------------------------------------------- captions
// [main line, sub line]. {reader} and {organiser} are replaced by first names.
const CAPTIONS = {
  intro: ['Daily Dose: one poem, one story and one essay a day, for fifty days.',
    'A short tour of the reading room, as a club member sees it.'],
  signIn: ['{reader} signs in with the Google account already used for Bookrank.',
    'No new account and no signup: the book club is found automatically.'],
  feed: ['The top of the feed holds today’s three readings.',
    'The round seal says which of the fifty days it is.'],
  dayLabels: ['“Today” marks the fresh texts. Earlier days stay open for catch-up.',
    'Under each text, the club’s thoughts stay locked until you have finished it yourself.'],
  open: ['Open a text to read it in a quiet reading view.',
    'Opening it is private. Nobody sees that you started.'],
  read: ['Read at your own pace.', 'The source of the text is noted at the end.'],
  checkOff: ['Finished? Check it off.', 'The time comes from the server: read today counts as on time, read later counts as catch-up.'],
  rateZero: ['Rate it from 0 to 5 stars.', 'Zero is a real rating: you read it and it did not work for you.'],
  rateClear: ['Changed your mind? Before you share, a rating can be cleared or changed.',
    'Not rated and zero stars are different things.'],
  thought: ['Write one thought, up to 140 characters.', 'The counter keeps track. It stays private until you share it.'],
  reveal: ['“Finish & reveal” shares your response and opens everyone else’s.',
    'There is no deadline, and nobody waits for anybody.'],
  others: ['Now you see the club: the average rating, who read it on the day, and each thought.',
    'Only members who have finished this text appear here.'],
  edit: ['You can still edit after sharing.', 'Your original reading time is kept.'],
  unread: ['Checked it off by mistake? Mark it as unread.',
    'Your response becomes a private draft again and the discussion hides. What you saw cannot be unseen.'],
  tomorrow: ['Tomorrow’s texts stay locked until tomorrow begins.',
    'The feed only shows days that have opened. Come back tomorrow for three new readings.'],
  organiserIn: ['Now the organiser’s side: {organiser} runs the club.', 'She signs in the same way, with her Google account.'],
  organiserView: ['The organiser has one extra page, “Organiser”, at the top.',
    'It shows only who has checked each text off, and when. Never ratings, thoughts or drafts.'],
  organiserSettings: ['At the top: the start date (Day 01) and the club’s timezone.',
    'They are chosen once, before Day 1. After the start they are shown here, read-only, and cannot change.'],
  organiserToday: ['Today’s three texts: who has checked each one off, and at what time.',
    '“Not yet” only means not yet. Catching up later counts just the same.'],
  organiserDays: ['Earlier days: one block per day, one mark per text.',
    'Filled means on the day, a ring means catch-up, a dashed circle means not yet. From Day 2 on, the blocks appear here.'],
  organiserRoster: ['The roster: every member and how many texts each has checked off so far.',
    'It follows the book club’s member list: someone who joins is added the next time the organiser opens the app.'],
  signOut: ['Sign out from the top corner.', ''],
  closing: ['Daily Dose in one breath:',
    'three texts a day · read on the day or catch up · 0 to 5 stars and one thought · finish to reveal the club · edit or mark as unread · tomorrow stays locked'],
};

// ------------------------------------------------------------------ labels
// The app's visible wording, in one place.
const LABELS = {
  signIn: /Sign in with Google/,
  signOut: 'Sign out',
  daySeal: /^OF 50$/,
  todayHeading: /Today$/,
  catchUpLabel: /^Catch-up$/,
  checkOff: /Check off as read/,
  readButton: /^(Read the (poem|story|essay)|Continue reading)/,
  lockedLine: /To see the others|Choose “Finish & reveal” above/,
  iveRead: /I’ve read this|Back to the conversation/,
  readDone: /Read on the day|Caught up|on the day|catch-up/i,
  zeroStars: '0 stars: did not work for me',
  clearRating: 'Remove rating',
  stars: n => `${n} stars`,
  notRated: 'Not rated',
  finish: 'Finish & reveal',
  saveChanges: 'Save changes',
  clubThoughts: /THE CLUB.S THOUGHTS/,
  whoRead: /Finished readers|Who read this\?|Who has read|Who read|Readers/,     // expander in the club's thoughts
  markUnread: 'Mark as unread',
  confirmUnread: /^(Mark as unread|Yes|Confirm|OK)\b/i,          // button in the app's own confirmation
  organiserTab: 'Organiser',                                        // tab at the top, organisers only
  organiserPage: 'Club progress',                                   // heading of the organiser page
  organiserPrivacy: /You cannot see ratings, thoughts, drafts/,
  startDate: 'Day 01',                                              // read-only fact: the start date
  clubTimezone: 'Club timezone',
  datesFixed: /fixed now that the programme has started/,
  organiserToday: /^Today, Day \d+$/,
  notYet: 'Not yet',
  earlierDays: 'Earlier days',
  roster: 'Roster',
  rosterNote: /The members are the people in your book club/,
  scheduleHeading: 'When is Day 1?',
  timezone: /^[A-Z][A-Za-z_]+\/[A-Za-z_]+$/,
  clubName: 'Better Book Club',
};
const THOUGHT = 'The last line landed hard. I read it twice before breakfast.';
const THOUGHT_EDIT = 'The last line landed hard. Read it twice, then once more aloud.';

// ------------------------------------------------------------------ config
const env = process.env;
const AUTOGO = env.TOUR_AUTOGO ? Number(env.TOUR_AUTOGO) : 0;
const HEADLESS = env.TOUR_HEADLESS === '1';
const SHOTS = env.TOUR_SHOTS ? resolve(env.TOUR_SHOTS) : null;
const READER = env.TOUR_READER || 'Grace Okafor';
const ORGANISER = env.TOUR_ORGANISER || 'Aino Lehtola';
const SKIP_ORGANISER = env.TOUR_SKIP_ORGANISER === '1';
const URL = env.TOUR_URL || 'http://127.0.0.1:5178/';
const SIZE = env.TOUR_SIZE || '1440x900';
const FAST = AUTOGO > 0 && HEADLESS;
const first = name => name.split(' ')[0];
const fill = s => s.replaceAll('{reader}', first(READER)).replaceAll('{organiser}', first(ORGANISER));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const here = dirname(fileURLToPath(import.meta.url));
if (SHOTS) mkdirSync(SHOTS, { recursive: true });

// ------------------------------------------------------------------ browser
const full = SIZE === 'full';
const [w, h] = full ? [0, 0] : SIZE.split('x').map(Number);
const browser = await chromium.launch({ headless: HEADLESS, ignoreDefaultArgs: ['--enable-automation'],
  args: full ? ['--start-maximized'] : [`--window-size=${w},${h + 90}`] });
const context = await browser.newContext(full ? { viewport: null } : { viewport: { width: w, height: h } });
await context.addInitScript({ content: readFileSync(join(here, 'overlay.js'), 'utf8') });
const page = await context.newPage();
const ctx = { page, acted: false, card: null, title: null, failures: [], shot: 0 };

// A native confirm() would block the tour, and no script can run in the page
// while it is open. Accept it, then show its text in the notice bar.
context.on('page', p => p.on('dialog', onDialog));
page.on('dialog', onDialog);
async function onDialog(dialog) {
  const p = dialog.page() || page, message = dialog.message();
  await sleep(AUTOGO ? 200 : 600);
  await dialog.accept().catch(() => {});
  await tour(p, t => t.notice(`The app asked, and the tour said OK: “${t.__msg}”`), message).catch(() => {});
  setTimeout(() => tour(p, t => t.notice('')).catch(() => {}), AUTOGO ? 1500 : 5000);
}

// Run a function against window.__tour on a page; arg is exposed as t.__msg.
function tour(p, fn, arg) {
  return p.evaluate(([src, a]) => { const t = window.__tour; if (!t || !t.ensure()) return null; t.__msg = a; return (0, eval)(src)(t); },
    [fn.toString(), arg ?? null]);
}

// Terminal fallback: Enter advances too.
let terminalGo = false;
if (process.stdin.isTTY && !AUTOGO) {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.on('data', d => { if (String(d).includes('\n') || String(d).includes('\r')) terminalGo = true; });
}

async function shot(name) {
  if (!SHOTS) return;
  await sleep(350);
  const file = join(SHOTS, `${String(++ctx.shot).padStart(2, '0')}-${name}.png`);
  await page.screenshot({ path: file }).catch(() => {});
}

// Wait for SPACE / RIGHT ARROW in the page (or Enter in the terminal, or the
// autogo timer). Re-installs the caption or explore bar on every poll, so a
// navigation during the wait does not lose them.
async function waitGo({ caption = null, explore = false }) {
  terminalGo = false;
  const t0 = Date.now();
  for (;;) {
    let go = false;
    try {
      go = await page.evaluate(({ caption, explore }) => {
        const t = window.__tour; if (!t || !t.ensure()) return false;
        if (explore) t.explore(true);
        if (caption && !document.querySelector('#tour-scrim.on')) t.caption(caption[0], caption[1]);
        t.raise(); t.arm();
        return t.takeGo();
      }, { caption, explore });
    } catch { /* navigating: try again */ }
    if (go || terminalGo || (AUTOGO && Date.now() - t0 >= AUTOGO)) break;
    await sleep(120);
  }
  await page.evaluate(explore => { const t = window.__tour; t?.disarm(); if (explore) t?.explore(false); }, explore).catch(() => {});
}

async function showCaption(key) {
  const [main, sub] = CAPTIONS[key].map(fill);
  await tour(page, t => t.caption(t.__msg[0], t.__msg[1]), [main, sub]);
  await shot(`${key}-caption`);
  await waitGo({ caption: [main, sub] });
  await tour(page, t => t.hideCaption());
  await sleep(FAST ? 300 : 600);
}

async function exploreStop(key) {
  await tour(page, t => t.explore(true));
  await shot(`${key}-explore`);
  await waitGo({ explore: true });
}

// ------------------------------------------------------------------ actions
// Scroll the target into view, measure, glide the pointer, flash a ring,
// then click. With click: false it only points.
async function point(locator, { click = true, on = page } = {}) {
  await locator.waitFor({ state: 'visible', timeout: 10000 });
  const inView = await locator.evaluate(e => { const r = e.getBoundingClientRect(); return r.top >= 60 && r.bottom <= innerHeight - 40; });
  if (!inView) {
    await locator.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'smooth' }));
    await sleep(FAST ? 300 : 700);
  }
  const box = await locator.boundingBox();
  if (!box) throw new Error('target has no box');
  const x = box.x + box.width / 2, y = box.y + box.height / 2;
  await tour(on, t => t.glide(t.__msg[0], t.__msg[1], 450), [x, y]);
  await on.mouse.move(x, y);
  await tour(on, t => t.ring(t.__msg, 'flash'), box);
  await sleep(FAST ? 200 : 550);
  if (!click) { await sleep(FAST ? 100 : 500); return box; }
  await tour(on, t => t.ripple(t.__msg[0], t.__msg[1]), [x, y]);
  await on.mouse.click(x, y);
  ctx.acted = true;
  return box;
}

async function type(locator, text) {
  const box = await point(locator);
  await tour(page, t => t.ring(t.__msg, 'field', 1800), box);
  await locator.fill('');
  await locator.pressSequentially(text, { delay: FAST ? 5 : 55 });
  ctx.acted = true;
}

async function signIn(name) {
  const popupPromise = context.waitForEvent('page', { timeout: 15000 });
  await point(page.getByRole('button', { name: LABELS.signIn }));
  const popup = await popupPromise;
  await popup.waitForLoadState('domcontentloaded');
  await point(popup.getByText(name, { exact: true }), { on: popup });
  await popup.waitForEvent('close', { timeout: 15000 }).catch(() => {});
  await page.getByText(LABELS.daySeal).waitFor({ timeout: 45000 });
  await page.getByText(name, { exact: true }).first().waitFor();
}

async function signOut() {
  // Sign out sits in the header: from the bottom of a long page, a smooth scroll
  // is still moving when the pointer measures it. Go to the top first.
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForFunction(() => scrollY === 0, null, { timeout: 5000 }).catch(() => {});
  await sleep(FAST ? 200 : 500);
  await point(page.getByRole('button', { name: LABELS.signOut }));
  await page.getByRole('button', { name: LABELS.signIn }).waitFor({ timeout: 15000 });
}

const todayGroup = () => page.locator('section').filter({ has: page.getByRole('heading', { name: LABELS.todayHeading }) });
const card = () => { if (!ctx.card) throw new Error('no text was chosen'); return ctx.card; };

// Pick the first of today's texts the reader has not checked off yet, and pin
// it by its title so later beats keep finding it after re-renders.
async function chooseText() {
  const open = todayGroup().locator('article').filter({ has: page.getByRole('button', { name: LABELS.checkOff }) }).first();
  await open.waitFor({ timeout: 10000 });
  ctx.title = (await open.getByRole('heading').innerText()).trim();
  ctx.card = page.locator('article').filter({ has: page.getByRole('heading', { name: ctx.title, exact: true }) });
}

// ------------------------------------------------------------------ beats
const beats = [
  { key: 'signIn', run: async () => { await signIn(READER); } },
  { key: 'feed', run: async () => {
    await point(page.getByText(LABELS.daySeal), { click: false });
    await point(todayGroup().getByRole('heading').first(), { click: false });
  } },
  { key: 'dayLabels', run: async () => {
    await chooseText();
    await point(todayGroup().getByRole('heading').first(), { click: false });
    const catchUp = page.getByText(LABELS.catchUpLabel).first();
    if (await catchUp.count()) await point(catchUp, { click: false });
    await point(card().getByText(LABELS.lockedLine), { click: false });
  } },
  { key: 'open', run: async () => {
    await point(card().getByRole('button', { name: LABELS.readButton }));
    await page.getByRole('dialog').waitFor();
    await sleep(400);
  } },
  { key: 'read', run: async () => {
    const dialog = page.getByRole('dialog');
    const box = await dialog.boundingBox();
    await tour(page, t => t.glide(t.__msg[0], t.__msg[1], 450), [box.x + box.width / 2, box.y + box.height * .6]);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height * .6);
    for (let i = 0; i < 40; i++) {
      const atEnd = await dialog.evaluate(d => d.scrollTop + d.clientHeight >= d.scrollHeight - 4);
      if (atEnd) break;
      await page.mouse.wheel(0, 140);
      await sleep(FAST ? 20 : 90);
    }
    ctx.acted = true;
  } },
  { key: 'checkOff', run: async () => {
    await point(page.getByRole('dialog').getByRole('button', { name: LABELS.iveRead }));
    await page.getByRole('dialog').waitFor({ state: 'hidden' });
    await card().getByText(LABELS.readDone).waitFor();
    await point(card().getByText(LABELS.readDone), { click: false });
  } },
  { key: 'rateZero', run: async () => {
    await point(card().getByRole('button', { name: LABELS.zeroStars, exact: true }));
    await card().getByText('0 / 5', { exact: true }).waitFor();
  } },
  { key: 'rateClear', run: async () => {
    await point(card().getByRole('button', { name: LABELS.clearRating }));
    await card().getByText(LABELS.notRated, { exact: true }).waitFor();
    await point(card().getByRole('button', { name: LABELS.stars(4), exact: true }));
    await card().getByText('4 / 5', { exact: true }).waitFor();
  } },
  { key: 'thought', run: async () => {
    await type(card().getByRole('textbox'), THOUGHT);
    await point(card().getByText(/^\d+ \/ 140$/), { click: false });
  } },
  { key: 'reveal', run: async () => {
    await point(card().getByRole('button', { name: LABELS.finish }));
    await card().getByText(LABELS.clubThoughts).waitFor({ timeout: 15000 });
  } },
  { key: 'others', run: async () => {
    await point(card().getByText(LABELS.clubThoughts), { click: false });
    const who = card().getByText(LABELS.whoRead).first();
    if (await who.count()) await point(who);
    await card().getByText(LABELS.clubThoughts).evaluate(e => scrollBy({ top: e.getBoundingClientRect().top - 110, behavior: 'smooth' }));
    await sleep(FAST ? 300 : 800);
  } },
  { key: 'edit', run: async () => {
    await type(card().getByRole('textbox'), THOUGHT_EDIT);
    await point(card().getByRole('button', { name: LABELS.saveChanges }));
    await card().getByText(THOUGHT_EDIT, { exact: true }).last().waitFor({ timeout: 15000 });
  } },
  { key: 'unread', run: async () => {
    await point(card().getByRole('button', { name: LABELS.markUnread }));
    // Older builds use window.confirm (accepted by onDialog); newer ones ask in
    // the page. Confirm in the page if such a question appears.
    const confirmIn = page.locator('dialog[open], [role="dialog"], [role="alertdialog"]').getByRole('button', { name: LABELS.confirmUnread }).first();
    if (await confirmIn.waitFor({ timeout: 2500 }).then(() => true, () => false)) await point(confirmIn);
    await card().getByRole('button', { name: LABELS.checkOff }).waitFor({ timeout: 15000 });
    await point(card().getByText(LABELS.lockedLine), { click: false });
  } },
  { key: 'tomorrow', run: async () => {
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'smooth' }));
    await sleep(FAST ? 300 : 800);
    await point(page.getByText(LABELS.daySeal), { click: false });
    await point(todayGroup().getByRole('heading').first(), { click: false });
  } },
  ...(SKIP_ORGANISER ? [] : [
    { key: 'organiserIn', run: async () => { await signOut(); await signIn(ORGANISER); } },
    { key: 'organiserView', run: async () => {
      await point(page.getByRole('button', { name: LABELS.organiserTab, exact: true }));
      await page.getByRole('heading', { name: LABELS.organiserPage }).waitFor({ timeout: 15000 });
      await point(page.getByRole('heading', { name: LABELS.organiserPage }), { click: false });
      await point(page.getByText(LABELS.organiserPrivacy), { click: false });
    } },
    { key: 'organiserSettings', run: async () => {
      // Before Day 1 the organiser sees the form; after it, the read-only facts.
      const form = page.getByRole('heading', { name: LABELS.scheduleHeading });
      if (await form.count()) { await point(form, { click: false }); return; }
      await point(page.locator('dt').getByText(LABELS.startDate, { exact: true }), { click: false });
      await point(page.locator('dt').getByText(LABELS.clubTimezone, { exact: true }), { click: false });
      await point(page.getByText(LABELS.datesFixed), { click: false });
    } },
    { key: 'organiserToday', run: async () => {
      await point(page.getByRole('heading', { name: LABELS.organiserToday }), { click: false });
      const done = page.locator('.org-work .checked').first();
      if (await done.count()) await point(done, { click: false });
      const waiting = page.locator('.org-work').getByText(LABELS.notYet, { exact: true }).first();
      if (await waiting.count()) await point(waiting, { click: false });
    } },
    { key: 'organiserDays', run: async () => {
      // With Day 1 = today there are no earlier days yet: the caption says so.
      const heading = page.getByRole('heading', { name: LABELS.earlierDays, exact: true });
      if (!(await heading.count())) return;
      await point(heading, { click: false });
      await point(page.locator('.org-day summary').first(), { click: false });
      await point(page.locator('.org-day .mark').first(), { click: false });
    } },
    { key: 'organiserRoster', run: async () => {
      await point(page.getByRole('heading', { name: LABELS.roster, exact: true }), { click: false });
      await point(page.getByText(LABELS.rosterNote), { click: false });
    } },
  ]),
  { key: 'signOut', run: async () => { await signOut(); } },
];

// ------------------------------------------------------------------ run
console.log(`Tour: ${beats.length} beats, reader ${READER}${SKIP_ORGANISER ? ', organiser beats skipped' : `, organiser ${ORGANISER}`}.`);
await page.goto(URL);
await page.getByRole('button', { name: LABELS.signIn }).waitFor({ timeout: 20000 });
await showCaption('intro');
let previous = 'intro';
for (const beat of beats) {
  if (ctx.acted) await exploreStop(previous);
  previous = beat.key;
  await showCaption(beat.key);
  ctx.acted = false;
  const t0 = Date.now();
  try {
    await beat.run();
    console.log(`  ok    ${beat.key} (${Date.now() - t0} ms)`);
  } catch (error) {
    const reason = String(error.message || error).split('\n')[0];
    ctx.failures.push({ beat: beat.key, reason });
    console.log(`  SKIP  ${beat.key}: ${reason}`);
    await tour(page, t => t.notice(t.__msg), `Skipped “${beat.key}”: this step did not work here. Moving on.`).catch(() => {});
    await shot(`${beat.key}-skipped`);
    await sleep(AUTOGO ? 800 : 2500);
    await tour(page, t => t.notice('')).catch(() => {});
  }
}
if (ctx.acted) await exploreStop(previous);
await showCaption('closing');
await browser.close();
if (ctx.failures.length) {
  console.log(`Tour finished with ${ctx.failures.length} skipped beat(s):`);
  for (const f of ctx.failures) console.log(`  - ${f.beat}: ${f.reason}`);
  process.exit(1);
}
console.log('Tour finished: every beat ran.');
process.exit(0);
