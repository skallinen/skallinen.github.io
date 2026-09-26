import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { esc, tableHtml, linkify } from './text.mjs';
import { firebaseConfig } from './firebase-config.mjs';
import { createFirestoreBackend } from './firestore.mjs';
import { ratingControl, sharedRatings } from './ratings.mjs';
import { addDays } from './calendar.mjs';

const root = document.querySelector('#app');
const reader = document.querySelector('#reader');
const toast = document.querySelector('#toast');
const firestoreMode = document.querySelector('meta[name="daily-dose-backend"]')?.content === 'firestore';
let backend;
const FILTERS = ['all', 'unread', 'poem', 'story', 'essay'];
const state = { config: null, auth: null, user: null, demoToken: null, clubs: [], clubId: null,
  feed: null, organiser: null, view: 'feed', filter: 'all', drafts: new Map(), ratingDrafts: new Map(), pending: new Set(), generation: 0,
  // Cards kept in the Unread view after check-off, until the filter changes.
  sticky: new Set(), openDetails: new Set(), confirmUnread: null };
const dateLabel = date => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
const timeLabel = (ms, zone) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short', timeZone: zone }).format(new Date(ms));
const category = { poem: 'Poem', story: 'Story', essay: 'Essay' };
const icons = { poem: '✳', story: '⌑', essay: '≋' };
const idNumber = n => String(n).padStart(2, '0');
const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const allWorks = () => state.feed?.days.flatMap(d => d.works) || [];
const currentWork = id => allWorks().find(w => w.id === id);
// "Europe/Helsinki" -> "Helsinki time"; one friendly label for the club clock.
export const zoneLabel = zone => !zone || zone === 'UTC' || zone === 'Etc/UTC' ? 'UTC' : `${zone.split('/').pop().replace(/_/g, ' ')} time`;
const timing = onTime => onTime ? 'on the day' : 'catch-up';

// Browser storage is a convenience: every access may throw (private mode, blocked data).
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); return true; } catch { return false; } },
  del(k) { try { localStorage.removeItem(k); } catch { /* storage unavailable */ } },
  json(k) { try { return JSON.parse(localStorage.getItem(k)) || null; } catch { return null; } },
};
const localKey = (kind, id) => `daily-dose-${kind}:${state.user?.uid}:${state.clubId}:${id}`;

// ---------- toasts: dark, readable, always at the bottom above the safe area,
// so they never cover the header buttons (Sign out, Organiser) or the Refresh link.
function notify(message, options = {}) {
  const { error = false, action = null } = typeof options === 'boolean' ? { error: options } : options;
  // A modal dialog is in the top layer; the toast must live inside the topmost one to be seen.
  const host = [...document.querySelectorAll('dialog[open]')].pop() || document.body;
  if (toast.parentElement !== host) host.append(toast);
  toast.innerHTML = `<span>${esc(message)}</span>${action ? `<button type="button" class="toast-action">${esc(action.label)}</button>` : ''}`;
  toast.className = `show${error ? ' error' : ''}`;
  toast.setAttribute('role', error ? 'alert' : 'status');
  if (action) toast.querySelector('.toast-action').onclick = () => { hideToast(); action.run(); };
  clearTimeout(notify.timer);
  // Slow readers first: at least 7 s, longer messages longer, 12 s when there is an Undo.
  notify.timer = setTimeout(hideToast, action ? 12000 : Math.max(7000, message.length * 110));
}
function hideToast() { toast.className = toast.className.replace('show', '').trim(); }

async function api(url, options = {}) {
  if (backend) return backend.request(url, options);
  const token = state.demoToken || await state.user?.getIdToken();
  const response = await fetch(`/api${url}`, { ...options, headers: {
    ...(token ? { Authorization: `Bearer ${token}` } : {}), 'Content-Type': 'application/json',
  }, ...(options.body ? { body: JSON.stringify(options.body) } : {}) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Could not save. Please try again.');
  return result;
}

// ---------- in-app confirmation (replaces window.confirm)
// The dialog gets its own history entry, so the phone's Back button closes it
// (as "Cancel" would) instead of changing the page behind it.
function confirmDialog({ title, message, ok, cancel = 'Cancel' }) {
  return new Promise(resolve => {
    const d = document.createElement('dialog');
    d.className = 'confirm';
    d.setAttribute('aria-labelledby', 'confirm-title');
    d.setAttribute('aria-describedby', 'confirm-message');
    d.innerHTML = `<h2 id="confirm-title">${esc(title)}</h2><p id="confirm-message">${esc(message)}</p>
      <div class="confirm-actions"><button type="button" class="secondary" value="cancel">${esc(cancel)}</button><button type="button" class="primary" value="ok">${esc(ok)}</button></div>`;
    document.body.append(d);
    let answer = false;
    d.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (b) { answer = b.value === 'ok'; d.close(); } else if (e.target === d) d.close();
    });
    d.addEventListener('close', () => {
      d.remove();
      if (!history.state?.confirm) { resolve(answer); return; }
      // Remove our history entry first, so whatever the answer does next
      // (a new route, a sign-out) happens on the page's own entry.
      let done = false;
      const finish = () => { if (!done) { done = true; resolve(answer); } };
      ignorePop = true;
      addEventListener('popstate', () => setTimeout(finish), { once: true });
      setTimeout(finish, 600);
      history.back();
    });
    history.pushState({ ...(history.state || {}), confirm: true }, '', location.href);
    d.showModal();
    d.querySelector('button[value="cancel"]').focus();
  });
}

// ---------- drafts: saved privately as you type, restored on load
const saveTimers = new Map(), saving = new Map();
const serverComment = id => currentWork(id)?.mine?.comment ?? '';
const draftText = work => state.drafts.get(work.id) ?? work.mine?.comment ?? '';
const unsavedShared = id => currentWork(id)?.revealed && ((state.drafts.has(id) && state.drafts.get(id).trim() !== serverComment(id)) || ratingChanged(id));

function restoreDrafts() {
  for (const w of allWorks()) {
    const saved = store.get(localKey('draft', w.id));
    if (saved == null) continue;
    if (saved.trim() === (w.mine?.comment ?? '')) { store.del(localKey('draft', w.id)); continue; }
    if (!state.drafts.has(w.id)) state.drafts.set(w.id, saved);
    if (!w.revealed && w.mine?.status === 'done') queueDraftSave(w.id, 0);
  }
  // Stars chosen after finishing but not yet saved.
  for (const w of allWorks()) {
    const raw = store.get(localKey('rating', w.id));
    if (raw == null) continue;
    let value = null;
    try { value = JSON.parse(raw); } catch { /* unreadable: dropped below */ }
    if (!w.revealed || value === (w.mine?.rating ?? null) || !(Number.isInteger(value) && value >= 0 && value <= 5)) store.del(localKey('rating', w.id));
    else state.ratingDrafts.set(w.id, value);
  }
}
function queueDraftSave(id, delay = 1200) {
  clearTimeout(saveTimers.get(id));
  saveTimers.set(id, setTimeout(() => saveDraft(id), delay));
}
// Before submission the private row holds the draft (it roams across devices).
// After submission the row is shared, so unsent edits stay on this device only.
async function saveDraft(id) {
  clearTimeout(saveTimers.get(id)); saveTimers.delete(id);
  const work = currentWork(id), text = state.drafts.get(id);
  if (!work || text == null) return;
  if (work.revealed || work.mine?.status !== 'done') { draftStatus(id); return; }
  if (Array.from(text).length > 140) { draftStatus(id, 'Too long to save to your account. It is kept on this device.'); return; }
  if (text.trim() === serverComment(id)) { store.del(localKey('draft', id)); draftStatus(id, 'Draft saved privately.'); return; }
  const clubId = state.clubId;
  const run = api(`/clubs/${clubId}/works/${id}`, { method: 'POST', body: { action: 'comment', comment: text } })
    .then(() => {
      if (clubId !== state.clubId) return;
      const w = currentWork(id);
      if (w?.mine) w.mine.comment = text.trim();
      if (state.drafts.get(id) === text) store.del(localKey('draft', id));
      draftStatus(id, 'Draft saved privately.');
    })
    .catch(() => draftStatus(id, 'Not saved to your account yet. It is kept on this device.'))
    .finally(() => { if (saving.get(id) === run) saving.delete(id); });
  saving.set(id, run);
  draftStatus(id, 'Saving draft…');
  return run;
}
async function flushDrafts() {
  for (const id of [...saveTimers.keys()]) saveDraft(id);
  await Promise.allSettled([...saving.values()]);
}
function draftStatus(id, text) {
  const el = document.querySelector(`#draft-status-${CSS.escape(id)}`);
  if (!el) return;
  el.textContent = text ?? (unsavedShared(id) ? 'Unsaved changes. Choose Save changes to share them.' : '');
}

// ---------- routing: the filter and the organiser page live in the URL
function routeFromUrl() {
  const h = decodeURIComponent(location.hash.slice(1));
  if (h === 'organiser') return { view: 'organiser', filter: 'all' };
  return { view: 'feed', filter: FILTERS.includes(h) ? h : 'all' };
}
// Filters replace the current history entry (Back does not walk through them);
// moving between the readings and the organiser page adds one.
function navigate(hash, { replace = false } = {}) {
  const url = hash ? `#${hash}` : location.pathname + location.search;
  if ((location.hash.slice(1) || '') === (hash || '')) return applyRoute();
  history[replace ? 'replaceState' : 'pushState'](null, '', url);
  applyRoute();
}
function applyRoute() {
  const route = routeFromUrl();
  if (route.filter !== state.filter || route.view !== state.view) state.sticky.clear();
  state.filter = route.filter; state.view = route.view;
  if (state.view === 'organiser') {
    if (state.feed?.organizer) return loadOrganiser();
    state.view = 'feed';
    history.replaceState(null, '', location.pathname + location.search);
  }
  render();
}

const brand = `<a href="${firestoreMode ? './' : '/'}" class="brand" aria-label="Daily Dose home"><span class="brand-mark">d.</span><span>Daily Dose<small>BETTER BOOK CLUB</small></span></a>`;

function shell(content) {
  // Organisers get two fixed tabs; the labels never swap. Sign out sits apart,
  // next to the name of whoever is signed in.
  const views = firestoreMode && state.feed?.organizer
    ? `<div class="nav-views">${[['', 'Readings', 'feed'], ['organiser', 'Organiser', 'organiser']].map(([hash, label, view]) =>
      `<button class="nav-button ${state.view === view ? 'active' : ''}" data-nav="${hash}" ${state.view === view ? 'aria-current="page"' : ''}>${label}</button>`).join('')}</div>` : '';
  const name = state.user ? esc(state.user.displayName || state.user.name || 'you') : '';
  root.innerHTML = `${state.config?.demo ? '<div class="demo-banner">LOCAL DEMO · fictional participants · no real club data</div>' : ''}
    <header class="site-header">${brand}${state.user ? `<nav aria-label="Account">
    ${state.clubs.length > 1 ? `<label class="sr-only" for="club-select">Book club</label><select id="club-select">${state.clubs.map(c => `<option value="${esc(c.id)}" ${c.id === state.clubId ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select>` : ''}
    ${views}<div class="account"><span class="user-name">Signed in as <strong>${name}</strong></span><button class="nav-button sign-out" data-action="logout">Sign out</button></div></nav>` : ''}</header>
    <main id="main">${content}</main><footer class="site-footer"><span>One poem. One story. One essay.</span><span>Read at your own pace. Come back tomorrow.</span></footer>`;
  fitTextareas();
}

function login() {
  shell(`<section class="welcome"><p class="eyebrow">A BETTER BOOK CLUB ANTHOLOGY</p>
    <h1>A little,<br><em>every day.</em></h1><p class="welcome-copy">Fifty days of poems, stories and essays.<br>A quiet place to read, reflect, and hear each other.</p>
    <button class="primary google" data-action="login"><span aria-hidden="true">G</span>Sign in with Google</button>
    <p class="fine-print">Sign in with the Google account you use for the book club.</p>
    ${state.config.demo ? `<div class="demo-picker"><label for="demo-user">Try the local demo as</label><select id="demo-user">${state.config.demoUsers.map(u => `<option value="${u.uid}">${u.name}${u === state.config.demoUsers[0] ? ' · organiser' : ''}</option>`).join('')}</select><button class="secondary" data-action="demo-login">Enter demo →</button></div>` : ''}
    <div class="welcome-rule"><span><strong>50</strong> days</span><span><strong>150</strong> readings</span><span><strong>140</strong> characters per thought</span></div></section>`);
}

async function signedIn(user, demoToken = null) {
  backend?.reset();
  if (reader.open) reader.close();
  reader.innerHTML = '';
  state.generation++; state.user = user; state.demoToken = demoToken; state.feed = null; state.organiser = null;
  state.drafts.clear(); state.ratingDrafts.clear(); state.sticky.clear(); state.openDetails.clear(); state.confirmUnread = null;
  if (!user) { state.clubs = []; state.clubId = null; login(); return; }
  shell('<section class="loading">Finding your book club…</section>');
  try {
    const generation = state.generation;
    const data = await api('/clubs');
    if (generation !== state.generation) return;
    state.clubs = data.clubs;
    const stored = store.get(`daily-dose-club:${user.uid}`);
    state.clubId = data.clubs.find(c => c.id === stored)?.id || data.clubs[0]?.id;
    if (!state.clubId) {
      shell(`<section class="empty"><p class="eyebrow">YOUR READING ROOM</p><h1>No club yet.</h1><p>Join your book club in Bookrank, then come back here.</p><button class="secondary" data-action="retry">Check membership again</button></section>`);
    } else {
      await refresh({ render: false });
      restoreDrafts();
      applyRoute();
      // A reload while reading reopens the text at the same place.
      const open = history.state?.reader;
      if (open && state.view === 'feed' && currentWork(open)) await openReading(open, { push: false });
    }
  } catch (error) {
    shell(`<section class="empty"><h1>We couldn’t open your club.</h1><p>${esc(error.message)}</p><button class="secondary" data-action="retry">Try again</button></section>`);
  }
}

function scheduleForm(campaign) {
  const min = campaign?.today || new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Helsinki' }).format(new Date());
  return `<form id="schedule" class="schedule-form"><h2>When is Day 1?</h2><p>Set the date once for everyone in this club. Dates lock when the programme starts.</p>
    <div class="form-row"><label>Day 1<input name="startDate" type="date" required min="${min}" value="${esc(campaign?.startDate || '')}"></label>
    <label>Club timezone<input name="timezone" required value="${esc(campaign?.timezone || 'Europe/Helsinki')}" placeholder="Europe/Helsinki"></label></div>
    <button class="primary" type="submit">Set Day 1</button></form>`;
}

function howItWorks(zone) {
  const open = state.openDetails.has('help') ? 'open' : '';
  return `<details class="help" data-details="help" ${open}><summary>How it works</summary>
    <ol class="help-steps"><li>Read the text.</li><li>Check it off.</li><li>Give it 0 to 5 stars.</li><li>Write one thought (up to 140 characters).</li><li>Choose “Finish & reveal” to see what the others wrote.</li></ol>
    <h3>Good to know</h3>
    <p>Three new texts open every day at midnight, ${esc(zone)}. Earlier days stay open. Nobody waits for anybody.</p>
    <p><strong>On the day</strong> means you checked a text off on its own date; <strong>catch-up</strong> means later. Both count.</p>
    <p>Before you finish, your stars and thought are private and saved as you go. After you finish, changes are shared only when you choose “Save changes”.</p>
    <p>“Mark as unread” corrects a checkmark. After you have finished, your response becomes a private draft again and the others’ responses hide. What you have seen cannot be unseen.</p>
    <p>The organiser can see who has checked each text off, and when. The organiser cannot see your ratings, thoughts or drafts.</p></details>`;
}

// Two plain lines: today, and what is waiting from earlier days.
function progressLines(feed) {
  const today = feed.days.find(d => d.today);
  const older = feed.days.filter(d => !d.today).flatMap(d => d.works).filter(w => w.mine?.status !== 'done').length;
  const lines = [];
  if (today) lines.push(`<strong>Today:</strong> ${today.works.filter(w => w.mine?.status === 'done').length} of ${today.works.length} read.`);
  lines.push(older ? `${plural(older, 'older text')} waiting.` : 'No older texts waiting.');
  return lines.map(l => `<p>${l}</p>`).join('');
}

function render() {
  const feed = state.feed;
  if (!feed) return;
  if (state.view === 'organiser' && state.organiser) return renderOrganiser();
  if (!feed.campaign) {
    shell(`<section class="empty"><p class="eyebrow">${esc(feed.club.name)}</p><h1>Every story has<br>a beginning.</h1>
      ${feed.organizer ? scheduleForm(null) : '<p>Your organiser will set Day 1. Nothing is open yet.</p>'}
      ${firestoreMode ? '<p class="fine-print">Uses your existing Bookrank club membership.</p>' : `<details class="help"><summary>Organiser setup</summary><p>The server operator can enable scheduling for your Firebase UID:</p><code>${esc(feed.me.uid)}</code></details>`}</section>`);
    return;
  }
  const campaign = feed.campaign, zone = zoneLabel(campaign.timezone);
  const activeDay = Math.max(0, Math.min(50, campaign.currentDay));
  const unreadCount = allWorks().filter(w => w.mine?.status !== 'done').length;
  const hero = campaign.currentDay < 1 ? `We begin ${dateLabel(campaign.startDate)}.` : campaign.currentDay > 50 ? 'The pages stay open.' : 'Make a little room.';
  const filteredDays = feed.days.map(d => ({ ...d, works: d.works.filter(w => state.filter === 'all' ||
    (state.filter === 'unread' ? w.mine?.status !== 'done' || state.sticky.has(w.id) : w.category === state.filter)) })).filter(d => d.works.length);
  const next = campaign.currentDay >= 1 && campaign.currentDay < 50 && ['all', 'unread'].includes(state.filter)
    ? `<section class="day-group upcoming" aria-labelledby="day-next"><div class="day-heading"><h2 id="day-next">Day ${idNumber(campaign.currentDay + 1)} <span>${dateLabel(addDays(campaign.today, 1))}</span></h2>
      <span><span aria-hidden="true">◷ </span>Opens tomorrow at 00:00, ${esc(zone)}</span></div></section>` : '';
  const labels = { all: 'All readings', unread: `Unread (${unreadCount})`, poem: 'Poems', story: 'Stories', essay: 'Essays' };
  shell(`<section class="feed-intro"><div><p class="eyebrow">${esc(feed.club.name)}</p><h1>${hero}</h1>
    <p class="intro-sub">${campaign.currentDay < 1 ? 'Your first three readings will open at midnight.' : campaign.currentDay > 50 ? 'Catch up, revisit a favourite, and keep the conversation going.' : 'Three readings. A moment to yourself. A thought to share.'}</p></div>
    <div class="day-seal" aria-label="Day ${activeDay} of 50"><span>DAY</span><strong>${idNumber(activeDay)}</strong><small>OF 50</small></div></section>
    <section class="personal-strip" aria-label="Your progress">${campaign.currentDay >= 1 ? progressLines(feed) : ''}<p class="timezone">Days change at midnight, ${esc(zone)}.</p></section>
    ${howItWorks(zone)}
    ${feed.organizer && campaign.editable ? scheduleForm(campaign) : ''}
    ${state.config.demo ? `<div class="demo-tools"><span>Preview the reveal with another participant.</span><button class="text-button" data-action="logout">Switch person</button>${feed.organizer ? '<button class="text-button" data-action="advance">Advance demo one day →</button>' : ''}</div>` : ''}
    <div class="feed-toolbar"><div class="filters" role="group" aria-label="Filter readings">${FILTERS.map(key => `<button data-filter="${key}" class="filter ${state.filter === key ? 'active' : ''}" aria-pressed="${state.filter === key}">${labels[key]}</button>`).join('')}</div><button class="text-button refresh" data-action="refresh">Refresh</button></div>
    <div class="feed">${next}${filteredDays.map(daySection).join('') || `<section class="empty compact"><h2>${campaign.currentDay < 1 ? 'Your reading room is ready.' : state.filter === 'unread' ? 'Nothing left to read.' : 'Nothing here yet.'}</h2><p>${campaign.currentDay < 1 ? `Day 1 opens on ${dateLabel(campaign.startDate)}, ${esc(zone)}.` : state.filter === 'unread' ? 'You have checked off every open text. Choose All readings to revisit one.' : 'Choose another filter.'}</p></section>`}</div>`);
}

function daySection(day) {
  return `<section class="day-group" aria-labelledby="day-${day.number}"><div class="day-heading"><h2 id="day-${day.number}">Day ${idNumber(day.number)} <span>${day.today ? 'Today' : dateLabel(day.date)}</span></h2><span>${day.today ? 'On the day until midnight' : 'Catch-up'}</span></div>${day.works.map(workCard).join('')}</section>`;
}

// "Read again" only for a text that is checked off; a text read to its end but
// not (or no longer) checked off simply offers to read it.
function readLabel(work) {
  const p = store.json(localKey('progress', work.id));
  if (p?.finished) return work.mine?.status === 'done' ? 'Read again' : `Read the ${category[work.category].toLowerCase()}`;
  if (p?.opened) return 'Continue reading';
  return `Read the ${category[work.category].toLowerCase()}`;
}
function timeLeft(work) {
  const p = store.json(localKey('progress', work.id));
  if (!p?.opened || p.finished || p.frac == null) return '';
  return `<span class="time-left">About ${Math.max(1, Math.ceil(work.minutes * (1 - p.frac)))} min left</span>`;
}

// Stars chosen after finishing wait for "Save changes", like the thought.
const ratingDraft = id => state.ratingDrafts.has(id) ? state.ratingDrafts.get(id) : undefined;
const ratingChanged = id => state.ratingDrafts.has(id) && state.ratingDrafts.get(id) !== (currentWork(id)?.mine?.rating ?? null);
const thoughtChanged = (work, draft) => draft.trim() !== (work.mine?.comment ?? '');

// What still stands between the reader and "Finish & reveal" / "Save changes".
function missing(work, draft) {
  const count = Array.from(draft).length, reasons = [];
  const rating = ratingDraft(work.id) !== undefined ? ratingDraft(work.id) : work.mine?.rating ?? null;
  if (rating == null) reasons.push('Choose a rating (0 to 5 stars).');
  if (!draft.trim()) reasons.push('Write a thought.');
  if (count > 140) reasons.push(`Shorten by ${plural(count - 140, 'character')}.`);
  if (!reasons.length && work.revealed && !thoughtChanged(work, draft) && !ratingChanged(work.id)) reasons.push('No changes to save.');
  return reasons;
}

// The reason sits right above the button, so it is on screen when the button is.
function commentForm(work) {
  const draft = draftText(work), count = Array.from(draft).length, reasons = missing(work, draft);
  const pending = state.pending.has(work.id);
  return `<form class="comment-form" data-comment-form="${work.id}"><label for="comment-${work.id}">Your thought <span>${work.revealed ? 'Shared with finished readers' : 'Private until you finish'}</span></label>
    <textarea id="comment-${work.id}" data-draft="${work.id}" rows="4" placeholder="What stayed with you?" aria-describedby="count-${work.id} hint-${work.id}">${esc(draft)}</textarea>
    <p id="hint-${work.id}" class="form-hint" aria-live="polite">${reasons.join(' ')}</p>
    <div class="comment-controls"><span id="count-${work.id}" class="char-count ${count > 140 ? 'over' : ''}">${count} / 140</span>
    <button class="save-button primary" type="submit" aria-disabled="${reasons.length > 0}" ${pending ? 'disabled' : ''}>${work.revealed ? 'Save changes' : 'Finish & reveal'}</button></div>
    <p id="draft-status-${work.id}" class="draft-status" aria-live="polite">${unsavedShared(work.id) ? 'Unsaved changes. Choose Save changes to share them.' : ''}</p></form>`;
}

// The hint under an unfinished card names only the steps still to do.
function lockedHint(work) {
  const steps = [];
  if (work.mine?.status !== 'done') steps.push('check it off');
  if (work.mine?.rating == null) steps.push('choose your stars');
  if (!draftText(work).trim()) steps.push('write a thought');
  if (!steps.length) return 'Ready. Choose “Finish & reveal” above to share your response and see the others.';
  const list = steps.length > 1 ? `${steps.slice(0, -1).join(', ')} and ${steps.at(-1)}` : steps[0];
  return `To see the others, ${list}, then choose “Finish & reveal”.`;
}

function reveal(work) {
  const collective = work.collective;
  if (!work.revealed) return `<p class="locked" id="locked-${work.id}"><span aria-hidden="true">◇</span><span class="locked-text">${esc(lockedHint(work))}</span></p>`;
  const others = collective.readers.filter(r => r.uid !== state.feed.me.uid).length;
  const detailsKey = `readers:${work.id}`;
  // "Finished" here, "checked off" on the organiser page: different measures, different words.
  return `<div class="reveal-heading"><span class="eyebrow">THE CLUB’S THOUGHTS</span><span><strong>Finished:</strong> ${collective.onTime} on the day, ${collective.catchUp} catch-up</span></div>
    ${sharedRatings(collective)}
    ${collective.readers.length ? `<details class="reader-stats" data-details="${detailsKey}" ${state.openDetails.has(detailsKey) ? 'open' : ''}><summary>Finished readers (${collective.readers.length})</summary><ul>${collective.readers.map(r => `<li><span class="reader-name">${esc(r.name)}</span><span class="reader-rating">${r.rating == null ? 'Not rated' : `${r.rating} / 5 ★`}</span><span class="reader-timing">${timing(r.onTime)}</span></li>`).join('')}</ul></details>` : ''}
    ${others ? '' : '<p class="empty-thoughts">Nobody else has finished this yet. Their responses appear here when they do.</p>'}
    ${collective.comments.map(c => `<div class="tweet"><span class="avatar" aria-hidden="true">${esc(c.name.slice(0, 1))}</span><div><div class="tweet-meta"><strong>${esc(c.name)}</strong><span>${timing(c.onTime)}${c.edited ? ' · edited' : ''}</span></div><p>${esc(c.text)}</p></div></div>`).join('')}`;
}

function workCard(work) {
  const done = work.mine?.status === 'done';
  const reading = work.mine?.status === 'reading';
  const keptDraft = reading && (work.mine.rating != null || (work.mine.comment ?? '').trim());
  const pending = state.pending.has(work.id);
  return `<article class="reading-card ${done ? 'is-done' : ''}" data-work="${work.id}" tabindex="-1">
    <div class="work-top"><span class="genre ${work.category}"><span aria-hidden="true">${icons[work.category]}</span>${category[work.category]}</span><span class="reading-time">${work.minutes} min read</span></div>
    <h3><button class="title-button" data-read="${work.id}">${esc(work.title)}</button></h3>
    <p class="byline">${esc(work.author)} <span>${esc(work.country)} · ${esc(work.year)}</span></p>
    <div class="work-actions"><div class="read-group"><button class="read-button" data-read="${work.id}">${readLabel(work)}</button>${timeLeft(work)}</div>
      ${done ? `<span class="completion"><span aria-hidden="true">✓</span> Checked off ${work.mine.onTime ? 'on the day' : 'as catch-up'}</span><button class="unread-button" data-unread="${work.id}" ${pending ? 'disabled' : ''}>Mark as unread</button>`
        : `<button class="check-button" data-complete="${work.id}" ${pending ? 'disabled' : ''}><span class="checkbox" aria-hidden="true"></span>Check off as read</button>`}
    </div>
    ${keptDraft ? '<p class="reading-status">Your rating and thought are kept as a private draft. Check the text off again to finish.</p>' : ''}
    ${done ? ratingControl(work, pending, ratingDraft(work.id)) : ''}
    ${done ? commentForm(work) : ''}
    <div class="reveal-section">${reveal(work)}</div>
  </article>`;
}

// ---------- organiser page: roster and who has checked what off, never what they wrote
async function loadOrganiser() {
  if (!state.organiser) shell('<section class="loading">Loading club progress…</section>');
  try {
    const generation = state.generation, clubId = state.clubId;
    const data = await api(`/clubs/${clubId}/organiser`);
    if (generation !== state.generation || clubId !== state.clubId || state.view !== 'organiser') return;
    state.organiser = data;
    renderOrganiser();
  } catch (error) { notify(error.message, true); state.view = 'feed'; render(); }
}

// One mark per text, 22 px, drawn in CSS so it is never a speck of dust:
// filled = on the day, ring = catch-up, dashed = not yet.
const orgMark = x => x
  ? `<span class="mark ${x.onTime ? 'on' : 'late'}" aria-hidden="true">✓</span><span class="sr-only">${x.onTime ? 'on the day' : 'catch-up'}</span>`
  : '<span class="mark none" aria-hidden="true"></span><span class="sr-only">not yet</span>';

function renderOrganiser() {
  const o = state.organiser, c = o.campaign, zone = zoneLabel(c?.timezone);
  const members = o.roster.filter(r => r.admitted);
  const mark = (uid, id) => o.checks[uid]?.[id];
  const today = o.days.find(d => d.today);
  const past = o.days.filter(d => !d.today);
  const released = o.days.flatMap(d => d.works).length;
  const todayTable = today ? `<h2>Today, Day ${idNumber(today.number)}</h2>
    ${today.works.map(w => {
      const list = members.map(m => { const x = mark(m.uid, w.id);
        return `<li><span class="reader-name">${esc(m.name)}</span><span class="${x ? 'checked' : 'not-yet'}">${x ? `✓ ${esc(timeLabel(x.at, c.timezone))}, ${timing(x.onTime)}` : 'Not yet'}</span></li>`; }).join('');
      const count = members.filter(m => mark(m.uid, w.id)).length;
      return `<section class="org-work"><h3>${category[w.category]}: ${esc(w.title)}</h3><p class="org-count">${count} of ${members.length} checked off</p><ul class="org-list">${list}</ul></section>`;
    }).join('')}` : '';
  // Earlier days as rows of their own (newest first, the newest open): the table
  // is always Member + Poem, Story, Essay, so it fits a 360 px phone without sideways scrolling.
  const dayTable = (d, i) => {
    const key = `org-day:${d.number}`, open = state.openDetails.has(key) || (i === 0 && !state.openDetails.has(`${key}:closed`));
    const total = members.length * d.works.length, checked = members.reduce((n, m) => n + d.works.filter(w => mark(m.uid, w.id)).length, 0);
    return `<details class="org-day" data-details="${key}" ${open ? 'open' : ''}><summary><span>Day ${idNumber(d.number)}, ${dateLabel(d.date)}</span><span class="org-day-count">${checked} of ${total} checked off</span></summary>
      <table class="org-grid"><thead><tr><th scope="col">Member</th>${d.works.map(w => `<th scope="col">${category[w.category]}<span class="sr-only">: ${esc(w.title)}</span></th>`).join('')}</tr></thead>
      <tbody>${members.map(m => `<tr><th scope="row">${esc(m.name)}</th>${d.works.map(w => `<td>${orgMark(mark(m.uid, w.id))}</td>`).join('')}</tr>`).join('')}</tbody></table></details>`;
  };
  const grid = past.length ? `<h2>Earlier days</h2><p class="org-legend"><span class="legend-item"><span class="mark on" aria-hidden="true">✓</span> checked off on the day</span>
      <span class="legend-item"><span class="mark late" aria-hidden="true">✓</span> checked off as catch-up</span><span class="legend-item"><span class="mark none" aria-hidden="true"></span> not yet</span></p>
    ${past.map(dayTable).join('')}` : '';
  const roster = `<h2>Roster</h2><ul class="org-list roster">${o.roster.map(r => {
    const total = Object.keys(o.checks[r.uid] || {}).length;
    return `<li><span class="reader-name">${esc(r.name)}${r.organizer ? ' (organiser)' : ''}</span><span>${r.admitted ? `${total} of ${released} checked off${r.justAdmitted ? ' · added just now' : ''}` : 'In the book club, not added yet'}</span></li>`; }).join('')}</ul>
    <p class="fine-print">The members are the people in your book club. Someone who joins the book club is added here the next time you open this app.</p>`;
  shell(`<section class="feed-intro organiser"><div><p class="eyebrow">Organiser · ${esc(o.club.name)}</p><h1>Club progress</h1>
    <p class="intro-sub">You can see who has checked each text off, and when. You cannot see ratings, thoughts, drafts or reading progress; members are told this in “How it works”.</p></div></section>
    <dl class="org-facts"><div><dt>Day 01</dt><dd>${c ? dateLabel(c.startDate) : 'Not set yet'}</dd></div><div><dt>Club timezone</dt><dd>${c ? `${esc(zone)} (${esc(c.timezone)})` : 'Not set yet'}</dd></div>
      <div><dt>Today</dt><dd>${c && c.currentDay >= 1 ? `Day ${idNumber(Math.min(c.currentDay, 50))} of 50` : 'Not started'}</dd></div><div><dt>Members</dt><dd>${members.length}</dd></div></dl>
    ${c && !c.editable ? '<p class="fine-print">The start date and timezone are fixed now that the programme has started.</p>' : ''}
    ${!c || c.editable ? scheduleForm(c) : ''}
    ${todayTable}${grid}${roster}
    <p><button class="secondary" data-nav="">Back to readings</button></p>`);
}

// ---------- refresh and actions, keeping the page steady around the card in use
function anchor(id) {
  const el = id ? document.querySelector(`[data-work="${CSS.escape(id)}"]`) : null;
  return { el: id, top: el?.getBoundingClientRect().top };
}
function settle(a) {
  if (a.top == null) return;
  const el = document.querySelector(`[data-work="${CSS.escape(a.el)}"]`);
  if (el) window.scrollBy(0, el.getBoundingClientRect().top - a.top);
}

async function refresh({ quiet = false, render: draw = true } = {}) {
  if (!state.clubId) return;
  const generation = state.generation;
  const clubId = state.clubId;
  const feed = await api(`/clubs/${clubId}/feed`);
  if (generation !== state.generation || clubId !== state.clubId) return;
  state.feed = feed;
  if (!draw || state.view === 'organiser') return;
  if (!quiet || !document.activeElement?.matches('textarea,input,select')) {
    const a = anchor(document.activeElement?.closest('[data-work]')?.dataset.work);
    render(); settle(a);
  }
}

function focusAfter(id, selector) {
  const card = document.querySelector(`[data-work="${CSS.escape(id)}"]`);
  (card?.querySelector(selector) || card)?.focus({ preventScroll: true });
}

const hasDraft = id => { const m = currentWork(id)?.mine; return m?.status !== 'done' && (m?.rating != null || !!(m?.comment ?? '').trim()); };
const draftNote = id => hasDraft(id) ? ' Your rating and thought are kept as a private draft.' : '';

// `undo: false` for actions that are themselves an Undo (no Undo of the Undo).
async function act(id, payload, { focus, undo = true, message } = {}) {
  if (state.pending.has(id)) return;
  const before = currentWork(id);
  const wasRevealed = before?.revealed, oldRating = before?.mine?.rating ?? null;
  if (['complete', 'restore'].includes(payload.action) && state.filter === 'unread') state.sticky.add(id);
  state.pending.add(id);
  const a = anchor(id);
  let ok = false;
  try {
    await api(`/clubs/${state.clubId}/works/${id}`, { method: 'POST', body: payload });
    ok = true;
    if (payload.action === 'submit') { state.drafts.delete(id); store.del(localKey('draft', id)); }
    if (payload.action === 'rate' || payload.action === 'submit') { state.ratingDrafts.delete(id); store.del(localKey('rating', id)); }
    await refresh({ render: false });
  } finally {
    state.pending.delete(id);
    if (state.view === 'feed') { render(); settle(a); if (focus) focusAfter(id, focus); }
  }
  if (!ok) return;
  const undoWith = (label, next, text) => undo ? { action: { label, run: () => act(id, next, { undo: false, message: text }).catch(e => notify(e.message, true)) } } : {};
  if (message) { notify(typeof message === 'function' ? message() : message); return; }
  if (payload.action === 'complete') {
    const onTime = currentWork(id)?.mine?.onTime;
    notify(`Checked off ${onTime ? 'on the day' : 'as catch-up'}.`, undoWith('Undo', { action: 'unread' }, () => `Undone. Not checked off.${draftNote(id)}`));
  }
  if (payload.action === 'rate') {
    const text = payload.rating === null ? 'Rating removed.' : `Rating saved: ${plural(payload.rating, 'star')}.`;
    notify(text, undoWith('Undo', { action: 'rate', rating: oldRating }, oldRating === null ? 'Undone. Not rated.' : `Undone. Back to ${plural(oldRating, 'star')}.`));
  }
  if (payload.action === 'submit') notify(wasRevealed ? 'Changes saved and shared.' : 'Response shared. Other finished readers’ responses are now visible.');
  // After finishing, the dialog was the question; before finishing, Undo is enough.
  if (payload.action === 'unread') notify(`Marked as unread.${draftNote(id)}`, wasRevealed ? {} : { action: { label: 'Undo', run: () => restoreCheck(id) } });
}

// Undo of "Mark as unread" puts back the original checkmark, time and all, so a
// text checked off on the day stays on the day. The legacy Node demo has no
// "restore"; there Undo checks the text off again with a fresh time.
async function restoreCheck(id) {
  const back = () => `Undone. Checked off ${currentWork(id)?.mine?.onTime ? 'on the day' : 'as catch-up'} again.`;
  try { await act(id, { action: 'restore' }, { undo: false, message: back }); }
  catch (e) {
    if (!/Unknown reading action/.test(e.message)) { notify(e.message, true); return; }
    await act(id, { action: 'complete' }, { undo: false, message: back }).catch(err => notify(err.message, true));
  }
}

// After finishing, a new star choice waits for "Save changes" together with
// the thought. It is kept on this device until then.
function chooseRatingDraft(id, value) {
  const saved = currentWork(id)?.mine?.rating ?? null;
  if (value === saved) { state.ratingDrafts.delete(id); store.del(localKey('rating', id)); }
  else { state.ratingDrafts.set(id, value); store.set(localKey('rating', id), JSON.stringify(value)); }
  const a = anchor(id); render(); settle(a);
  focusAfter(id, `[data-rate][data-rating="${value}"]`);
  notify(value === saved ? `Back to ${plural(saved, 'star')}, as shared.` : `${plural(value, 'star')} chosen. Choose Save changes to share it.`);
}

// "Save changes" after finishing: the rating, then the thought.
async function saveChanges(id) {
  const work = currentWork(id), draft = draftText(work);
  if (ratingChanged(id)) {
    await api(`/clubs/${state.clubId}/works/${id}`, { method: 'POST', body: { action: 'rate', rating: state.ratingDrafts.get(id) } });
    state.ratingDrafts.delete(id); store.del(localKey('rating', id));
  }
  await act(id, { action: 'submit', comment: state.drafts.get(id) ?? work.mine.comment });
}

// ---------- the reader
function blockHtml(block) {
  if (block.type === 'table') return tableHtml(block.rows, block.spans);
  if (block.type === 'space') return '<div class="reading-space"></div>';
  if (block.lines) return `<div class="stanza">${block.lines.map(l => `<div class="verse-line" style="--indent:${l.indentEm}em;--spaces:${l.indentSpaces}ch">${l.html}</div>`).join('')}</div>`;
  const tag = block.type === 'heading' ? 'h3' : 'p';
  return `<${tag} class="text-${esc(block.type)}">${block.html}</${tag}>`;
}

let readerId = null, ignorePop = false;
// Where the reader is, as a share of the text (robust to a rotated phone or a
// changed text size) and in pixels. A closed dialog has no layout and reports
// scrollTop 0, so progress is only ever measured while the reader is open:
// every close path saves first (closeReader, Escape, Back), never after.
function readerFraction() {
  const max = reader.scrollHeight - reader.clientHeight;
  return max > 0 ? Math.min(1, Math.max(0, reader.scrollTop / max)) : 1;
}
function saveProgress(extra = {}) {
  if (!readerId || !reader.open) return;
  const k = localKey('progress', readerId), old = store.json(k) || {};
  // Finished means the end of the text (the end-of-text action) came into view.
  const end = reader.querySelector('.reader-end')?.getBoundingClientRect();
  const atEnd = !!end && end.height > 0 && end.top < reader.getBoundingClientRect().bottom;
  const frac = readerFraction();
  store.set(k, JSON.stringify({ ...old, opened: true, top: reader.scrollTop, frac, finished: old.finished || atEnd, at: Date.now(), ...extra }));
  const bar = reader.querySelector('.reader-progress');
  if (bar) { bar.style.setProperty('--done', `${Math.round(frac * 100)}%`); bar.setAttribute('aria-valuenow', Math.round(frac * 100)); }
}
function closeReader() { saveProgress(); if (reader.open) reader.close(); }

async function openReading(id, { push = true } = {}) {
  const generation = state.generation;
  const clubId = state.clubId;
  // Opening records only private progress, never a completed read or submission.
  if (currentWork(id)?.mine == null) await act(id, { action: 'start' });
  const work = await api(`/clubs/${clubId}/works/${id}`);
  if (generation !== state.generation || clubId !== state.clubId) return;
  const done = currentWork(id)?.mine?.status === 'done';
  const minutes = plural(work.minutes, 'MINUTE', 'MINUTES');
  reader.innerHTML = `<div class="reader-toolbar"><span>${category[work.category]} · Day ${idNumber(work.day)}</span><button class="nav-button" data-close>Close ×</button>
      <div class="reader-progress" role="progressbar" aria-label="How far you have read" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div></div>
    <div class="reader-inner"><p class="eyebrow">${category[work.category]} · ${minutes}</p><h2 id="reader-title">${esc(work.title)}</h2><p class="reader-byline">${esc(work.author)}<span>${esc(work.country)} · ${esc(work.year)}</span></p>
    ${work.editorialHold ? `<p class="editorial-warning">Review note: ${linkify(work.editorialHold)}</p>` : ''}
    <div class="reading-text ${work.category === 'poem' ? 'poetry' : 'prose'}">${work.blocks.map(blockHtml).join('')}</div>
    <div class="reader-end"><span>The end. Let it sit for a moment.</span><button class="primary" data-reader-complete="${id}">${done ? 'Back to its card' : '✓ I’ve read this, check it off'}</button></div>
    ${work.sourceNote ? `<details class="source-note"><summary>About this edition</summary><p>${linkify(work.sourceNote)}</p></details>` : ''}</div>`;
  readerId = id;
  const progress = store.json(localKey('progress', id));
  if (!reader.open) {
    document.documentElement.classList.add('reader-open');
    reader.showModal();
    if (push) history.pushState({ reader: id }, '', location.href);
    else history.replaceState({ ...(history.state || {}), reader: id }, '', location.href);
  }
  // Continue where the reader left off; a text read to its end starts again from the top.
  const resume = progress && !progress.finished;
  const place = () => {
    const max = reader.scrollHeight - reader.clientHeight;
    reader.scrollTop = !resume ? 0 : progress.frac != null && max > 0 ? Math.round(progress.frac * max) : progress.top || 0;
  };
  place();
  requestAnimationFrame(() => { if (readerId === id) { place(); saveProgress(); } });
  reader.querySelector('[data-close]').focus({ preventScroll: true });
}

function readerClosed() {
  const id = readerId;
  readerId = null;
  document.documentElement.classList.remove('reader-open');
  if (history.state?.reader) { ignorePop = true; history.back(); }
  if (toast.parentElement !== document.body) document.body.append(toast);
  if (state.view === 'feed' && id) {
    render();
    const card = document.querySelector(`[data-work="${CSS.escape(id)}"]`);
    card?.scrollIntoView({ block: 'center' });
    card?.focus({ preventScroll: true });
  }
}
reader.addEventListener('close', readerClosed);
// Escape closes the dialog natively: save while it still has its layout.
reader.addEventListener('cancel', () => saveProgress());
let scrollFrame = 0;
reader.addEventListener('scroll', () => { cancelAnimationFrame(scrollFrame); scrollFrame = requestAnimationFrame(() => saveProgress()); }, { passive: true });
reader.addEventListener('click', e => { if (e.target === reader) closeReader(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) saveProgress(); });
addEventListener('pagehide', () => saveProgress());
setInterval(() => { if (reader.open) saveProgress(); }, 5000);

window.addEventListener('popstate', event => {
  if (ignorePop) { ignorePop = false; return; }
  // Back while a question is open answers it with "Cancel" and changes nothing else.
  const question = document.querySelector('dialog.confirm[open]');
  if (question) { question.close(); return; }
  if (reader.open) { closeReader(); return; }
  if (event.state?.reader && currentWork(event.state.reader)) { openReading(event.state.reader, { push: false }).catch(e => notify(e.message, true)); return; }
  if (state.feed) applyRoute();
});

// ---------- events
async function run(event) {
  const button = event.target.closest('button');
  if (!button || button.disabled || button.closest('dialog.confirm') || button.classList.contains('toast-action')) return;
  if (button.dataset.close !== undefined) { closeReader(); return; }
  if (button.dataset.read) return openReading(button.dataset.read);
  if (button.dataset.complete) return act(button.dataset.complete, { action: 'complete' }, { focus: '.rating-button' });
  if (button.dataset.unread) {
    const id = button.dataset.unread;
    if (currentWork(id)?.revealed && !await confirmDialog({ title: 'Mark as unread?', ok: 'Mark as unread', cancel: 'Keep it checked off',
      message: 'Your response will become a private draft and the others’ responses will be hidden again. Other readers may already have seen your response.' })) return;
    return act(id, { action: 'unread' }, { focus: '.check-button' });
  }
  if (button.dataset.rate) {
    const id = button.dataset.rate, value = button.dataset.rating;
    if (currentWork(id)?.revealed) { if (value !== 'clear') chooseRatingDraft(id, Number(value)); return; }
    await act(id, { action: 'rate', rating: value === 'clear' ? null : Number(value) });
    document.querySelector(`[data-rate="${CSS.escape(id)}"][data-rating="${value === 'clear' ? '1' : value}"]`)?.focus({ preventScroll: true });
    return;
  }
  if (button.dataset.readerComplete) {
    const id = button.dataset.readerComplete;
    saveProgress({ finished: true });
    if (currentWork(id)?.mine?.status !== 'done') {
      if (state.filter === 'unread') state.sticky.add(id);
      await act(id, { action: 'complete' });
    }
    closeReader(); return;
  }
  if (button.dataset.filter) { navigate(button.dataset.filter === 'all' ? '' : button.dataset.filter, { replace: true }); return; }
  if (button.dataset.nav !== undefined) {
    if (button.dataset.nav === 'organiser') state.organiser = null;
    navigate(button.dataset.nav); window.scrollTo(0, 0); return;
  }
  switch (button.dataset.action) {
    case 'login':
      if (state.config.demo) { notify('This is a local demo. Choose a participant below.'); return; }
      return signInWithPopup(state.auth, new GoogleAuthProvider());
    case 'demo-login': {
      const uid = document.querySelector('#demo-user').value;
      return signedIn(state.config.demoUsers.find(u => u.uid === uid), `demo:${uid}`);
    }
    case 'logout': {
      await flushDrafts();
      const unsaved = allWorks().filter(w => unsavedShared(w.id) || (state.drafts.has(w.id) && store.get(localKey('draft', w.id)) != null && !w.revealed));
      if (unsaved.length && !await confirmDialog({ title: 'Sign out?', ok: 'Sign out', cancel: 'Stay signed in',
        message: `${plural(unsaved.length, 'thought')} not saved to your account yet. ${unsaved.length === 1 ? 'It stays' : 'They stay'} on this device and will be here when you sign in again on it.` })) return;
      closeReader();
      state.drafts.clear(); state.ratingDrafts.clear();
      history.replaceState(null, '', location.pathname + location.search);
      state.filter = 'all'; state.view = 'feed';
      if (state.config.demo) return signedIn(null);
      return signOut(state.auth);
    }
    case 'retry': return signedIn(state.user, state.demoToken);
    case 'refresh': { const a = anchor(null); await refresh(); settle(a); notify('Up to date: the latest responses are shown.'); return; }
    case 'advance': await api('/demo/advance', { method: 'POST' }); await refresh(); notify('Demo moved forward one day.'); return;
  }
}

document.addEventListener('click', event => { run(event).catch(error => notify(error.message, true)); });
document.addEventListener('toggle', event => {
  const key = event.target.dataset?.details;
  if (!key) return;
  if (event.target.open) { state.openDetails.add(key); state.openDetails.delete(`${key}:closed`); }
  else { state.openDetails.delete(key); state.openDetails.add(`${key}:closed`); }
}, true);
document.addEventListener('input', event => {
  const id = event.target.dataset.draft;
  if (!id) return;
  const value = event.target.value;
  state.drafts.set(id, value);
  if (value.trim() === serverComment(id)) store.del(localKey('draft', id)); else store.set(localKey('draft', id), value);
  const work = currentWork(id), form = event.target.closest('form');
  const count = Array.from(value).length, reasons = work ? missing(work, value) : [];
  form.querySelector('.char-count').textContent = `${count} / 140`;
  form.querySelector('.char-count').classList.toggle('over', count > 140);
  form.querySelector('.form-hint').textContent = reasons.join(' ');
  form.querySelector('button[type="submit"]').setAttribute('aria-disabled', String(reasons.length > 0));
  fitTextarea(event.target);
  const locked = document.querySelector(`#locked-${CSS.escape(id)} .locked-text`);
  if (locked && work) locked.textContent = lockedHint(work);
  if (work && !work.revealed) queueDraftSave(id); else draftStatus(id);
});
document.addEventListener('focusout', event => {
  const id = event.target.dataset?.draft;
  // Leaving for the form's own submit button: the submission carries the text.
  if (!id || !saveTimers.has(id) || event.relatedTarget?.closest?.(`[data-comment-form="${CSS.escape(id)}"]`)) return;
  saveDraft(id);
});
document.addEventListener('change', event => {
  if (event.target.id !== 'club-select') return;
  flushDrafts().finally(() => {
    state.generation++; state.clubId = event.target.value; state.drafts.clear(); state.ratingDrafts.clear(); state.organiser = null; closeReader();
    store.set(`daily-dose-club:${state.user.uid}`, state.clubId);
    refresh({ render: false }).then(() => { restoreDrafts(); applyRoute(); }).catch(error => notify(error.message, true));
  });
});
document.addEventListener('submit', async event => {
  event.preventDefault();
  try {
    if (event.target.dataset.commentForm) {
      const id = event.target.dataset.commentForm, work = currentWork(id);
      // The button is only aria-disabled, so a tap on it says why, right where the finger is.
      const reasons = work ? missing(work, draftText(work)) : [];
      if (reasons.length) {
        const hint = event.target.querySelector('.form-hint');
        hint.textContent = reasons.join(' '); hint.classList.remove('flash'); void hint.offsetWidth; hint.classList.add('flash');
        return;
      }
      clearTimeout(saveTimers.get(id)); saveTimers.delete(id);
      await saving.get(id);
      if (work.revealed) await saveChanges(id);
      else await act(id, { action: 'submit', comment: state.drafts.get(id) ?? work.mine.comment });
    } else if (event.target.id === 'schedule') {
      const form = new FormData(event.target);
      await api(`/clubs/${state.clubId}/schedule`, { method: 'PUT', body: { startDate: form.get('startDate'), timezone: form.get('timezone') } });
      state.organiser = null;
      await refresh({ render: false }); applyRoute(); notify('Day 1 is set for your club.');
    }
  } catch (error) { notify(error.message, true); }
});
// Warn before leaving while a save is under way, or with changes to a shared
// response (thought or stars) that are not saved, or a thought too long to save.
window.addEventListener('beforeunload', event => {
  saveProgress();
  const unsent = allWorks().some(w => unsavedShared(w.id) || (!w.revealed && Array.from(state.drafts.get(w.id) ?? '').length > 140));
  if (!saveTimers.size && !saving.size && !unsent) return;
  for (const id of [...saveTimers.keys()]) saveDraft(id);
  event.preventDefault(); event.returnValue = '';
});

// ---------- the thought box grows with its text: all 140 characters stay visible, no inner scrolling
function fitTextarea(el) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight + el.offsetHeight - el.clientHeight}px`;
}
function fitTextareas() { for (const el of document.querySelectorAll('textarea[data-draft]')) fitTextarea(el); }
addEventListener('resize', () => { cancelAnimationFrame(fitTextareas.frame); fitTextareas.frame = requestAnimationFrame(fitTextareas); });
try {
  state.config = firestoreMode ? { demo: false, firebase: firebaseConfig } : await api('/config');
  if (state.config.demo) login();
  else {
    const app = initializeApp(state.config.firebase);
    state.auth = getAuth(app);
    if (firestoreMode) backend = createFirestoreBackend(app, () => state.user);
    onAuthStateChanged(state.auth, user => signedIn(user));
  }
} catch (error) { root.innerHTML = `<main class="empty"><h1>We couldn’t open the reading room.</h1><p>${esc(error.message)}</p><a href="./">Try again</a></main>`; }
setInterval(() => { if (state.user && state.clubId && !document.hidden && !reader.open && state.view === 'feed') refresh({ quiet: true }).catch(() => {}); }, 30000);
