import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { esc, tableHtml, linkify } from './text.mjs';
import { firebaseConfig } from './firebase-config.mjs';
import { createFirestoreBackend } from './firestore.mjs';
import { ratingControl, sharedRatings } from './ratings.mjs';
import { addDays } from './calendar.mjs';
import { ratingSummary } from '../server/domain.mjs';
import { episodeFor, chapterAt, clock } from './podcast.mjs';
import { reactionBar, setReaction, newReactions, meMarker } from './reactions.mjs';

const root = document.querySelector('#app');
const reader = document.querySelector('#reader');
const toast = document.querySelector('#toast');
const firestoreMode = document.querySelector('meta[name="daily-dose-backend"]')?.content === 'firestore';
let backend;
const FILTERS = ['all', 'unread', 'poem', 'story', 'essay'];
const state = { config: null, auth: null, user: null, demoToken: null, clubs: [], clubId: null,
  feed: null, organiser: null, view: 'feed', filter: 'all', drafts: new Map(), ratingDrafts: new Map(), generation: 0,
  // Texts whose "Finish & reveal" / "Save changes" is on its way to the server.
  pending: new Set(),
  // The checkmark "Mark as unread" cleared, per text, for the optimistic Undo.
  undone: new Map(), clockOffset: 0,
  // Cards kept in the Unread view after check-off, until the filter changes.
  sticky: new Set(), openDetails: new Set(), confirmUnread: null,
  // The thought whose seven reaction choices are open (`work|author`), one at a time.
  reactOpen: null,
  // The roster shows checkmarks or, for texts the viewer has finished, the stars given.
  rosterView: null };
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
    ${views}<div class="account"><span class="me">${meMarker(state.user.displayName || state.user.name || 'you', newsCount())}<span class="user-name"><span class="signed-in-as">Signed in as </span><strong>${name}</strong></span></span><button class="nav-button sign-out" data-action="logout">Sign out</button></div></nav>` : ''}</header>
    <main id="main">${content}</main><footer class="site-footer"><span>One poem. One story. One essay.</span><span>Read at your own pace. Come back tomorrow.</span></footer>`;
  fitTextareas();
  watchNews();
}

// ---------- the count on your name: new reactions to your own thoughts
// (see client/reactions.mjs and SPEC.md). What you have seen is kept per text
// in your account (seen/{uid}, when the rules allow it) and on this device;
// a reaction seen in either is not new. Looking means your thought on that
// text was on screen for a second, or the count took you there.
let seenHere = { key: null, works: {} };
function deviceSeen() {
  const key = state.user && state.clubId ? `daily-dose-seen:${state.user.uid}:${state.clubId}` : null;
  if (seenHere.key !== key) seenHere = { key, works: (key && store.json(key)) || {} };
  return seenHere.works;
}
const news = () => state.feed ? newReactions(allWorks(), state.feed.seen, deviceSeen()) : [];
const newsCount = () => news().reduce((n, x) => n + x.count, 0);
const newsFor = id => news().find(x => x.id === id)?.count || 0;
function paintMe() {
  const el = root.querySelector('.me-marker'), name = state.user ? state.user.displayName || state.user.name || 'you' : '';
  if (el) morph(el, fragment(meMarker(name, newsCount())));
}
function markSeen(id) {
  const pairs = currentWork(id)?.collective?.toMe;
  if (!Array.isArray(pairs) || !newsFor(id)) return;
  const works = deviceSeen();
  works[id] = [...pairs];
  if (seenHere.key) store.set(seenHere.key, JSON.stringify(works));
  // Your account's copy, so your other devices know too; if it fails, this device still knows.
  if (state.feed?.seen) api(`/clubs/${state.clubId}/seen`, { method: 'POST', body: { work: id, pairs: [...pairs] } }).catch(() => {});
  paintMe();
}
// Your thought with new reactions, on screen for a second, counts as seen.
let newsObserver = null;
const newsTimers = new Map();
function watchNews() {
  if (!('IntersectionObserver' in window)) return;
  newsObserver ||= new IntersectionObserver(entries => {
    for (const e of entries) {
      const id = e.target.dataset.ownThought;
      clearTimeout(newsTimers.get(id)); newsTimers.delete(id);
      if (e.isIntersecting && e.intersectionRatio >= 0.6) newsTimers.set(id, setTimeout(() => {
        newsTimers.delete(id);
        if (!document.hidden && !reader.open) markSeen(id);
      }, 1000));
    }
  }, { threshold: [0, 0.6, 1] });
  newsObserver.disconnect();
  for (const t of newsTimers.values()) clearTimeout(t);
  newsTimers.clear();
  for (const el of root.querySelectorAll('.tweet.has-new[data-own-thought]')) newsObserver.observe(el);
}
// The count takes you to the newest text with news: your thought there, in view.
function showNews() {
  const next = news()[0];
  if (!next) { paintMe(); return; }
  const work = currentWork(next.id);
  if (state.view !== 'feed' || !shown(work)) navigate('', { replace: state.view === 'feed' });
  const el = root.querySelector(`[data-own-thought="${CSS.escape(next.id)}"]`);
  if (!el) return;
  el.scrollIntoView({ block: 'center' });
  el.focus({ preventScroll: true });
  markSeen(next.id);
  notify(`${next.count === 1 ? 'A new reaction' : `${next.count} new reactions`} to your thought on “${work.title}”.`);
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
  stopPlayer();
  state.generation++; state.user = user; state.demoToken = demoToken; state.feed = null; state.organiser = null;
  state.drafts.clear(); state.ratingDrafts.clear(); state.sticky.clear(); state.openDetails.clear(); state.confirmUnread = null;
  queues.clear(); state.pending.clear(); state.undone.clear(); reacting.clear(); state.reactOpen = null;
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
    <p>After you finish, you can react to the thoughts (your own too) with one of seven emojis. Tap an emoji again to take yours back. Only readers who have finished the text see reactions; hold a finger on one (or point at it) to see who reacted. When others react to your thought, a number appears on your initial at the top; tap it to go to that thought.</p>
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
  const hero = campaign.currentDay < 1 ? `We begin ${dateLabel(campaign.startDate)}.` : campaign.currentDay > 50 ? 'The pages stay open.' : 'Make a little room.';
  const filteredDays = feed.days.map(d => ({ ...d, works: d.works.filter(shown) })).filter(d => d.works.length);
  const next = campaign.currentDay >= 1 && campaign.currentDay < 50 && ['all', 'unread'].includes(state.filter)
    ? `<section class="day-group upcoming" aria-labelledby="day-next"><div class="day-heading"><h2 id="day-next">Day ${idNumber(campaign.currentDay + 1)} <span>${dateLabel(addDays(campaign.today, 1))}</span></h2>
      <span><span aria-hidden="true">◷ </span>Opens tomorrow at 00:00, ${esc(zone)}</span></div></section>` : '';
  shell(`<section class="feed-intro"><div><p class="eyebrow">${esc(feed.club.name)}</p><h1>${hero}</h1>
    <p class="intro-sub">${campaign.currentDay < 1 ? 'Your first three readings will open at midnight.' : campaign.currentDay > 50 ? 'Catch up, revisit a favourite, and keep the conversation going.' : 'Three readings. A moment to yourself. A thought to share.'}</p></div>
    <div class="day-seal" aria-label="Day ${activeDay} of 50"><span>DAY</span><strong>${idNumber(activeDay)}</strong><small>OF 50</small></div></section>
    ${personalStrip(feed)}
    ${podcastLine(feed)}
    ${howItWorks(zone)}
    ${feed.organizer && campaign.editable ? scheduleForm(campaign) : ''}
    ${state.config.demo ? `<div class="demo-tools"><span>Preview the reveal with another participant.</span><button class="text-button" data-action="logout">Switch person</button>${feed.organizer ? '<button class="text-button" data-action="advance">Advance demo one day →</button>' : ''}</div>` : ''}
    <div class="feed-toolbar">${filterBar()}<button class="text-button refresh" data-action="refresh">Refresh</button></div>
    <div class="feed">${next}${filteredDays.map(daySection).join('') || `<section class="empty compact"><h2>${campaign.currentDay < 1 ? 'Your reading room is ready.' : state.filter === 'unread' ? 'Nothing left to read.' : 'Nothing here yet.'}</h2><p>${campaign.currentDay < 1 ? `Day 1 opens on ${dateLabel(campaign.startDate)}, ${esc(zone)}.` : state.filter === 'unread' ? 'You have checked off every open text. Choose All readings to revisit one.' : 'Choose another filter.'}</p></section>`}</div>`);
}

// Which cards the current filter shows. Checked-off cards stay in Unread
// until the filter changes (state.sticky).
const shown = w => state.filter === 'all' ||
  (state.filter === 'unread' ? w.mine?.status !== 'done' || state.sticky.has(w.id) : w.category === state.filter);
function personalStrip(feed) {
  return `<section class="personal-strip" aria-label="Your progress">${feed.campaign.currentDay >= 1 ? progressLines(feed) + myGrid(feed) : ''}<p class="timezone">Days change at midnight, ${esc(zoneLabel(feed.campaign.timezone))}.</p></section>`;
}
function filterBar() {
  const unreadCount = allWorks().filter(w => w.mine?.status !== 'done').length;
  const labels = { all: 'All readings', unread: `Unread (${unreadCount})`, poem: 'Poems', story: 'Stories', essay: 'Essays' };
  return `<div class="filters" role="group" aria-label="Filter readings">${FILTERS.map(key => `<button data-filter="${key}" class="filter ${state.filter === key ? 'active' : ''}" aria-pressed="${state.filter === key}">${labels[key]}</button>`).join('')}</div>`;
}

function daySection(day) {
  return `<section class="day-group" aria-labelledby="day-${day.number}"><div class="day-heading"><h2 id="day-${day.number}">Day ${idNumber(day.number)} <span>${day.today ? 'Today' : dateLabel(day.date)}</span></h2><span>${day.today ? 'On the day until midnight' : 'Catch-up'}</span></div>${listenBar(day.number)}${day.works.map(workCard).join('')}</section>`;
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
  if (!work.revealed) return `<p class="locked" id="locked-${work.id}"><span aria-hidden="true">◇</span><span class="locked-text">${esc(state.pending.has(work.id) ? 'Sharing your response…' : lockedHint(work))}</span></p>`;
  const others = collective.readers.filter(r => r.uid !== state.feed.me.uid).length;
  const detailsKey = `readers:${work.id}`;
  // "Finished" here, "checked off" on the organiser page: different measures, different words.
  return `<div class="reveal-heading"><span class="eyebrow">THE CLUB’S THOUGHTS</span><span><strong>Finished:</strong> ${collective.onTime} on the day, ${collective.catchUp} catch-up</span></div>
    ${sharedRatings(collective)}
    ${collective.readers.length ? `<details class="reader-stats" data-details="${detailsKey}" ${state.openDetails.has(detailsKey) ? 'open' : ''}><summary>Finished readers (${collective.readers.length})</summary><ul>${collective.readers.map(r => `<li><span class="reader-name">${esc(r.name)}</span><span class="reader-rating">${r.rating == null ? 'Not rated' : `${r.rating} / 5 ★`}</span><span class="reader-timing">${timing(r.onTime)}</span></li>`).join('')}</ul></details>` : ''}
    ${others ? '' : '<p class="empty-thoughts">Nobody else has finished this yet. Their responses appear here when they do.</p>'}
    ${collective.comments.map(c => {
      // Your own thought carries what is new on it; the count on your name leads here.
      const own = c.uid === state.feed.me.uid, fresh = own ? newsFor(work.id) : 0;
      return `<div class="tweet${fresh ? ' has-new' : ''}"${own ? ` data-own-thought="${esc(work.id)}" tabindex="-1"` : ''}><span class="avatar" aria-hidden="true">${esc(c.name.slice(0, 1))}</span><div><div class="tweet-meta"><strong>${esc(c.name)}</strong><span>${timing(c.onTime)}${c.edited ? ' · edited' : ''}</span>${fresh ? `<span class="new-reactions">${plural(fresh, 'new reaction')}</span>` : ''}</div><p>${esc(c.text)}</p>${collective.reactable ? reactionBar(work.id, c, { open: state.reactOpen === `${work.id}|${c.uid}`, me: state.feed.me.uid }) : ''}</div></div>`;
    }).join('')}`;
}

function workCard(work) {
  const done = work.mine?.status === 'done';
  const reading = work.mine?.status === 'reading';
  const keptDraft = reading && (work.mine.rating != null || (work.mine.comment ?? '').trim());
  return `<article class="reading-card ${done ? 'is-done' : ''}${playingWork() === work.id ? ' is-playing' : ''}" data-work="${work.id}" tabindex="-1">
    <div class="work-top"><span class="genre ${work.category}"><span aria-hidden="true">${icons[work.category]}</span>${category[work.category]}</span><span class="reading-time">${work.minutes} min read</span></div>
    <h3><button class="title-button" data-read="${work.id}">${esc(work.title)}</button></h3>
    <p class="byline">${esc(work.author)} <span>${esc(work.country)} · ${esc(work.year)}</span></p>
    <div class="work-actions"><div class="read-group"><button class="read-button" data-read="${work.id}">${readLabel(work)}</button>${timeLeft(work)}</div>
      ${done ? `<span class="completion"><span aria-hidden="true">✓</span> Checked off ${work.mine.onTime ? 'on the day' : 'as catch-up'}</span><button class="unread-button" data-unread="${work.id}">Mark as unread</button>`
        : `<button class="check-button" data-complete="${work.id}"><span class="checkbox" aria-hidden="true"></span>Check off as read</button>`}
    </div>
    ${keptDraft ? '<p class="reading-status">Your rating and thought are kept as a private draft. Check the text off again to finish.</p>' : ''}
    ${done ? ratingControl(work, false, ratingDraft(work.id)) : ''}
    ${done ? commentForm(work) : ''}
    <div class="reveal-section">${reveal(work)}</div>
  </article>`;
}

// ---------- organiser page: roster and who has checked what off, never what they wrote
async function loadOrganiser() {
  state.rosterView ??= store.get('daily-dose-roster-view') === 'stars' ? 'stars' : 'checks';
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

// The roster as a contribution grid, like GitHub's: one column per day (Day 1 to
// 50), one row per text (P poem, S story, E essay). A cell is "on" (checked off
// on the day), "late" (catch-up), "none" (released, not checked off; today too)
// or "coming" (a later day). On the day and catch-up are the checkmark times the
// organiser page already reads (server time against the day's local midnight).
const GRID_ROWS = [['poem', 'P'], ['story', 'S'], ['essay', 'E']];
const CELL_WORDS = { on: 'on the day', late: 'catch-up', none: 'not checked off', coming: 'coming' };
// The roster's Stars view: the same grid, a cell per text coloured by the stars
// the member gave (0 to 5). Only texts the viewer has finished themselves show
// stars, because only those reveal the others' ratings in the feed; the
// organiser sees nothing a member would not. "locked" = you have not finished it.
const STAR_WORDS = { s0: '0 stars', s1: '1 star', s2: '2 stars', s3: '3 stars', s4: '4 stars', s5: '5 stars',
  none: 'not finished', locked: 'you have not finished it', coming: 'coming' };
const checkKind = checks => work => { const x = checks[work.id]; return x ? (x.onTime ? 'on' : 'late') : 'none'; };
// The ratings the viewer can see, uid -> work id -> stars, from the feed's revealed texts.
function visibleStars(feed) {
  const seen = new Map(), stars = {};
  for (const w of feed.days.flatMap(d => d.works)) {
    if (!w.revealed || !w.collective) continue;
    seen.set(w.id, true);
    for (const r of w.collective.readers) if (r.rating != null) (stars[r.uid] ??= {})[w.id] = r.rating;
  }
  return { seen, stars };
}
const starKind = (vis, uid) => work => !vis.seen.has(work.id) ? 'locked'
  : vis.stars[uid]?.[work.id] != null ? `s${vis.stars[uid][work.id]}` : 'none';
// One member's grid, shared by the organiser's roster and the member's own page:
// `days` are the released days, `kindOf` gives a released text's cell kind. The
// tooltip names the text and its author.
function gridCells(c, days, kindOf) {
  const byDay = new Map(days.map(d => [d.number, d]));
  return GRID_ROWS.map(([cat]) => Array.from({ length: 50 }, (_, i) => {
    const n = i + 1;
    if (!(c.currentDay >= n)) return { n, cat, kind: 'coming' };
    const work = byDay.get(n)?.works.find(w => w.category === cat);
    return { n, cat, work, kind: work ? kindOf(work) : 'none' };
  }));
}
function progressGrid(c, days, kindOf, label, words = CELL_WORDS) {
  const rows = gridCells(c, days, kindOf);
  const count = kind => rows.flat().filter(x => x.kind === kind).length;
  const summary = Object.keys(words).filter(k => count(k)).map(k => `${count(k)} ${words[k]}`).join(', ');
  return `<div class="roster-grid" role="img" aria-label="${esc(label)}, texts by day: ${summary}">${rows.map((row, i) =>
    `<span class="grid-label" aria-hidden="true">${GRID_ROWS[i][1]}</span>${row.map(x =>
      `<span class="cell ${x.kind}" title="Day ${idNumber(x.n)}, ${dateLabel(addDays(c.startDate, x.n - 1))}, ${category[x.cat]}${x.work ? `, “${esc(x.work.title)}”${x.work.author ? ` by ${esc(x.work.author)}` : ''}` : ''}: ${words[x.kind]}"></span>`).join('')}`).join('')}</div>`;
}
const rosterGrid = (o, r, vis) => vis
  ? progressGrid(o.campaign, o.days, starKind(vis, r.uid), r.name, STAR_WORDS)
  : progressGrid(o.campaign, o.days, checkKind(o.checks[r.uid] || {}), r.name);
// The member's own grid on the reading page, from the feed it already has: the
// same on the day test (completedAt before the day's closeAt), no extra reads.
function myGrid(feed) {
  const checks = Object.fromEntries(feed.days.flatMap(d => d.works).filter(w => w.mine?.status === 'done').map(w => [w.id, { onTime: w.mine.onTime }]));
  return `<div class="my-grid">${rosterLegend(feed.campaign)}${progressGrid(feed.campaign, feed.days, checkKind(checks), 'You')}</div>`;
}
// The day axis (1, 10, 20 ... 50) sits once above the roster, on the same columns.
function rosterLegend(c, stars = false) {
  const ticks = [1, 10, 20, 30, 40, 50].map(n => `<span class="tick${n === 50 ? ' end' : ''}" style="grid-column: ${n === 50 ? '48 / 52' : `${n + 1} / span 4`}">${n}</span>`).join('');
  const words = stars ? STAR_WORDS : CELL_WORDS;
  const legend = stars
    ? `<span class="legend-item legend-scale">0 ${['s0', 's1', 's2', 's3', 's4', 's5'].map(k => `<span class="cell ${k}" aria-hidden="true"></span>`).join('')} 5 stars</span>${['none', 'locked', 'coming'].map(k =>
      `<span class="legend-item"><span class="cell ${k}" aria-hidden="true"></span> ${words[k]}</span>`).join('')}`
    : ['on', 'late', 'none', 'coming'].map(k => `<span class="legend-item"><span class="cell ${k}" aria-hidden="true"></span> ${words[k]}</span>`).join('');
  return `<p class="org-legend roster-legend">${legend}</p>
    <p class="fine-print roster-key">One column per day, Day 1 to 50. Rows: P poem, S story, E essay.${c.currentDay >= 1 && c.currentDay <= 50 ? ` Today is Day ${idNumber(c.currentDay)}.` : ''}${stars ? ' Stars show only on texts you have finished yourself: the same ratings you see under each text.' : ''}</p>
    <div class="roster-grid roster-axis" aria-hidden="true"><span class="grid-label"></span>${ticks}</div>`;
}

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
  const vis = state.rosterView === 'stars' && state.feed ? visibleStars(state.feed) : null;
  const starCount = uid => {
    const given = Object.values(vis.stars[uid] || {});
    return given.length ? `${plural(given.length, 'rating')} you can see, average ${(given.reduce((a, b) => a + b, 0) / given.length).toFixed(1)}` : 'No ratings you can see';
  };
  const viewSwitch = c ? `<div class="filters roster-switch" role="group" aria-label="Roster shows">${[['checks', 'Checked off'], ['stars', 'Stars']].map(([key, label]) =>
    `<button data-roster-view="${key}" class="filter ${(vis ? 'stars' : 'checks') === key ? 'active' : ''}" aria-pressed="${(vis ? 'stars' : 'checks') === key}">${label}</button>`).join('')}</div>` : '';
  const roster = `<h2>Roster</h2>${viewSwitch}${c ? rosterLegend(c, !!vis) : ''}<ul class="org-list roster">${o.roster.map(r => {
    const total = Object.keys(o.checks[r.uid] || {}).length;
    const count = vis ? starCount(r.uid) : `${total} of ${released} checked off`;
    return `<li><span class="reader-name">${esc(r.name)}${r.organizer ? ' (organiser)' : ''}</span><span class="roster-count">${r.admitted ? `${count}${r.justAdmitted ? ' · added just now' : ''}` : 'In the book club, not added yet'}</span>${c && r.admitted ? rosterGrid(o, r, vis) : ''}</li>`; }).join('')}</ul>
    <p class="fine-print">The members are the people in your book club. Someone who joins the book club is added here the next time you open this app.</p>`;
  shell(`<section class="feed-intro organiser"><div><p class="eyebrow">Organiser · ${esc(o.club.name)}</p><h1>Club progress</h1>
    <p class="intro-sub">You can see who has checked each text off, and when. You cannot see ratings, thoughts, drafts or reading progress; members are told this in “How it works”. The roster’s Stars view shows only the ratings you already see as a member, on texts you have finished.</p></div></section>
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

// A refresh that started earlier never overwrites the result of a later one.
let refreshSeq = 0, refreshShown = 0;
async function refresh({ quiet = false, render: draw = true } = {}) {
  if (!state.clubId) return;
  const generation = state.generation;
  const clubId = state.clubId, seq = ++refreshSeq;
  const feed = await api(`/clubs/${clubId}/feed`);
  if (generation !== state.generation || clubId !== state.clubId || seq < refreshShown) return;
  refreshShown = seq;
  state.feed = feed;
  if (Number.isFinite(feed.now)) state.clockOffset = feed.now - Date.now();
  // Writes still on their way stay visible over the server's older state.
  for (const w of allWorks()) for (const op of queuedOps(w.id)) op.apply(w);
  for (const w of allWorks()) applyReactions(w);
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

// ---------- redrawing one card in place
// Patch `from` to match `to`, keeping every element that is still there, so
// focus, the caret in the thought box and open <details> survive a redraw.
function morph(from, to) {
  if (from.nodeType !== to.nodeType || from.nodeName !== to.nodeName) { from.replaceWith(to); return; }
  if (from.nodeType === Node.TEXT_NODE) { if (from.nodeValue !== to.nodeValue) from.nodeValue = to.nodeValue; return; }
  if (from.nodeType !== Node.ELEMENT_NODE) { from.replaceWith(to); return; }
  for (const { name } of [...from.attributes]) if (!to.hasAttribute(name)) from.removeAttribute(name);
  for (const { name, value } of [...to.attributes]) if (from.getAttribute(name) !== value) from.setAttribute(name, value);
  // The text being typed is never touched; state.drafts already holds it.
  if (from.tagName === 'TEXTAREA') { if (from !== document.activeElement && from.value !== to.value) from.value = to.value; return; }
  const a = [...from.childNodes], b = [...to.childNodes];
  b.forEach((node, i) => { if (i < a.length) morph(a[i], node); else from.append(node); });
  for (const node of a.slice(b.length)) node.remove();
}
const fragment = html => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };

// Redraw one card and the counts in the header, not the whole feed. When the
// filter now shows or hides the card, fall back to a full render.
function redrawCard(id, { focus } = {}) {
  if (state.view !== 'feed' || !state.feed?.campaign || !root.querySelector('.feed')) return;
  const work = currentWork(id), card = root.querySelector(`[data-work="${CSS.escape(id)}"]`);
  if (!work || !card !== !shown(work)) {
    const a = anchor(id); render(); settle(a);
    if (focus) focusAfter(id, focus);
    return;
  }
  if (card) {
    const top = card.getBoundingClientRect().top;
    morph(card, fragment(workCard(work)));
    for (const el of card.querySelectorAll('textarea[data-draft]')) fitTextarea(el);
    const moved = card.getBoundingClientRect().top - top;
    if (moved) window.scrollBy(0, moved);
    if (focus) focusAfter(id, focus);
  }
  const strip = root.querySelector('.personal-strip'), filters = root.querySelector('.feed-toolbar .filters');
  if (strip) morph(strip, fragment(personalStrip(state.feed)));
  if (filters) morph(filters, fragment(filterBar()));
  paintMe(); watchNews();
}

// ---------- saving: a tap shows its result at once, the write follows
// One queue per text, so its writes reach the server one at a time, in tap
// order. A rating still waiting behind another write is replaced by a newer
// one: the last choice wins and nothing is reordered. Each write carries
// `apply`, which puts its expected result on a work; it is applied again after
// every refresh until the server has confirmed it. When a write fails, it and
// everything queued after it are dropped, the card goes back to the server's
// state, and the error is shown.
const queues = new Map();
const queuedOps = id => { const q = queues.get(id); return q ? [q.running, ...q.waiting].filter(Boolean) : []; };

function enqueue(id, payload, apply) {
  let q = queues.get(id);
  if (!q) queues.set(id, q = { running: null, waiting: [] });
  const tail = q.waiting.at(-1);
  if (payload.action === 'rate' && tail?.payload.action === 'rate') { tail.payload = payload; tail.apply = apply; return tail.done; }
  const op = { payload, apply, clubId: state.clubId, generation: state.generation };
  op.done = new Promise((resolve, reject) => { op.resolve = resolve; op.reject = reject; });
  q.waiting.push(op);
  if (!q.running) drain(id, q);
  return op.done;
}

async function drain(id, q) {
  while (q.waiting.length) {
    const op = q.running = q.waiting.shift();
    const current = () => op.generation === state.generation && op.clubId === state.clubId;
    try {
      await api(`/clubs/${op.clubId}/works/${id}`, { method: 'POST', body: op.payload });
      // The last write in the queue brings the server's view back: the real
      // checkmark time, the club's responses after Finish & reveal.
      if (!q.waiting.length && current()) {
        await refresh({ render: false }).catch(() => {});
        if (!q.waiting.length) { q.running = null; redrawCard(id); }
      }
      q.running = null;
      op.resolve();
    } catch (error) {
      const dropped = q.waiting.splice(0);
      if (current()) { await refresh({ render: false }).catch(() => {}); q.running = null; redrawCard(id); }
      q.running = null;
      op.reject(error);
      for (const d of dropped) d.reject(error);
    }
  }
  if (queues.get(id) === q) queues.delete(id);
}

// The server clock as the backend last measured it: only for the expected
// "on the day" / "catch-up" of a checkmark, which the server then confirms.
const serverNow = () => Date.now() + state.clockOffset;
const expectOnTime = w => w.closeAt != null ? serverNow() < w.closeAt : !!state.feed?.days.find(d => d.works.some(x => x.id === w.id))?.today;
function hideShared(w) { w.revealed = false; w.revealReason = 'submit-your-response'; delete w.collective; }
// After finishing, one's own entry in the club's view changes with one's own
// rating and thought; everybody else's stays as the server sent it.
function patchShared(w) {
  const c = w.collective, me = state.feed?.me?.uid;
  if (!c || !me) return;
  const readers = c.readers.map(r => r.uid === me ? { ...r, rating: w.mine.rating } : r);
  const comments = c.comments.map(x => x.uid === me ? { ...x, text: w.mine.comment, edited: x.edited || x.text !== w.mine.comment } : x);
  w.collective = { ...c, readers, comments, ratings: ratingSummary(readers) };
}

// What a reading action will do to a work, as the server's transaction does it.
function expectation(id, payload) {
  const w0 = currentWork(id);
  switch (payload.action) {
    case 'start':
      return w => { if (w.mine == null) w.mine = { status: 'reading', onTime: false, completedAt: null, comment: '', rating: null, submittedAt: null }; };
    case 'complete':
    case 'restore': {
      const back = payload.action === 'restore' ? state.undone.get(id) : null;
      const completedAt = back?.completedAt ?? serverNow(), onTime = back ? back.onTime : w0 ? expectOnTime(w0) : false;
      return w => {
        if (w.mine?.status === 'done') return;
        const kept = w.mine?.status === 'reading' ? w.mine : { comment: '', rating: null };
        w.mine = { ...kept, status: 'done', completedAt, onTime, submittedAt: null };
      };
    }
    case 'unread':
      return w => {
        if (w.mine?.status !== 'done') return;
        w.mine = { ...w.mine, status: 'reading', completedAt: null, onTime: false, submittedAt: null };
        hideShared(w);
      };
    case 'rate':
      return w => {
        if (w.mine?.status !== 'done') return;
        w.mine = { ...w.mine, rating: payload.rating };
        if (payload.rating == null) { w.mine.submittedAt = null; hideShared(w); } else patchShared(w);
      };
    case 'submit': {
      const comment = String(payload.comment ?? '').trim(), at = serverNow();
      return w => {
        if (w.mine?.status !== 'done') return;
        w.mine = { ...w.mine, comment, submittedAt: w.mine.submittedAt ?? at };
        patchShared(w);
      };
    }
    default: return () => {};
  }
}

const hasDraft = id => { const m = currentWork(id)?.mine; return m?.status !== 'done' && (m?.rating != null || !!(m?.comment ?? '').trim()); };
const draftNote = id => hasDraft(id) ? ' Your rating and thought are kept as a private draft.' : '';

// The card changes at once; the returned promise settles when the server has
// the write (and rejects after the card has gone back, so callers show the error).
// `undo: false` for actions that are themselves an Undo (no Undo of the Undo);
// `quiet` for a step of "Save changes", which has its own message.
function act(id, payload, { focus, undo = true, message, quiet = false } = {}) {
  const before = currentWork(id), generation = state.generation;
  const wasRevealed = before?.revealed, oldRating = before?.mine?.rating ?? null, wasDone = before?.mine?.status === 'done';
  if (['complete', 'restore'].includes(payload.action) && state.filter === 'unread') state.sticky.add(id);
  if (payload.action === 'unread' && wasDone) state.undone.set(id, { ...before.mine });
  const apply = expectation(id, payload);
  if (payload.action === 'submit') state.pending.add(id);
  const saved = enqueue(id, payload, apply);
  if (before) apply(before);
  redrawCard(id, { focus });

  const undoWith = (label, next, text) => undo ? { action: { label, run: () => act(id, next, { undo: false, message: text }).catch(e => notify(e.message, true)) } } : {};
  if (quiet) { /* the caller speaks */ }
  else if (message) notify(typeof message === 'function' ? message() : message);
  else if (payload.action === 'complete' && !wasDone) {
    notify(`Checked off ${currentWork(id)?.mine?.onTime ? 'on the day' : 'as catch-up'}.`, undoWith('Undo', { action: 'unread' }, () => `Undone. Not checked off.${draftNote(id)}`));
  } else if (payload.action === 'rate') {
    const text = payload.rating === null ? 'Rating removed.' : `Rating saved: ${plural(payload.rating, 'star')}.`;
    notify(text, undoWith('Undo', { action: 'rate', rating: oldRating }, oldRating === null ? 'Undone. Not rated.' : `Undone. Back to ${plural(oldRating, 'star')}.`));
  } else if (payload.action === 'unread' && wasDone) {
    // After finishing, the dialog was the question; before finishing, Undo is enough.
    notify(`Marked as unread.${draftNote(id)}`, wasRevealed ? {} : { action: { label: 'Undo', run: () => restoreCheck(id) } });
  }

  return saved.then(() => {
    if (generation !== state.generation || payload.action !== 'submit') return;
    state.pending.delete(id);
    // A thought typed while this one was being sent stays as the newer draft.
    if (state.drafts.get(id) === payload.comment) { state.drafts.delete(id); store.del(localKey('draft', id)); }
    redrawCard(id);
    if (!quiet) notify(wasRevealed ? 'Changes saved and shared.' : 'Response shared. Other finished readers’ responses are now visible.');
  }, error => {
    if (payload.action === 'submit' && generation === state.generation) { state.pending.delete(id); redrawCard(id); }
    throw error;
  });
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
  redrawCard(id, { focus: `[data-rate][data-rating="${value}"]` });
  notify(value === saved ? `Back to ${plural(saved, 'star')}, as shared.` : `${plural(value, 'star')} chosen. Choose Save changes to share it.`);
}

// "Save changes" after finishing: the rating, then the thought, queued
// together. Both show as saved at once; the unsaved choices stay on this
// device until the server has them, so a failed save loses nothing.
async function saveChanges(id) {
  const work = currentWork(id);
  const rating = ratingChanged(id) ? state.ratingDrafts.get(id) : undefined;
  const steps = [];
  if (rating !== undefined) steps.push(act(id, { action: 'rate', rating }, { quiet: true }));
  steps.push(act(id, { action: 'submit', comment: state.drafts.get(id) ?? work.mine.comment }));
  await Promise.all(steps);
  if (rating !== undefined && state.ratingDrafts.get(id) === rating) { state.ratingDrafts.delete(id); store.del(localKey('rating', id)); redrawCard(id); }
}

// ---------- reactions to the club's thoughts (see client/reactions.mjs)
// A tap shows at once; the write follows, one at a time per thought and emoji,
// and the choice stays on top of every refresh until the server has it.
const reacting = new Map();
let reactSeq = 0;
function applyReactions(w) {
  if (!w.collective?.reactable) return;
  for (const [key, p] of reacting) {
    const [id, author, emoji] = key.split('|');
    const c = id === w.id && w.collective.comments.find(x => x.uid === author);
    if (c) c.reactions = setReaction(c.reactions || [], emoji, p.on);
  }
}
function toggleReaction(id, author, emoji) {
  const work = currentWork(id), c = work?.collective?.reactable && work.collective.comments.find(x => x.uid === author);
  if (!c) return;
  const on = !c.reactions?.find(r => r.key === emoji)?.mine;
  const key = `${id}|${author}|${emoji}`, token = ++reactSeq, clubId = state.clubId, generation = state.generation;
  const chain = (reacting.get(key)?.chain || Promise.resolve()).catch(() => {})
    .then(() => api(`/clubs/${clubId}/works/${id}/reactions`, { method: 'POST', body: { author, emoji, on } }));
  reacting.set(key, { on, token, chain });
  c.reactions = setReaction(c.reactions || [], emoji, on);
  state.reactOpen = null;
  const who = `[data-author="${CSS.escape(author)}"]`;
  redrawCard(id, { focus: `.reaction${who}[data-emoji="${emoji}"], .reaction-add${who}` });
  const settleWith = async error => {
    if (generation !== state.generation || reacting.get(key)?.token !== token) return;
    reacting.delete(key);
    await refresh({ render: false }).catch(() => {});
    redrawCard(id);
    if (error) notify(error.message, true);
  };
  chain.then(() => settleWith(null), settleWith);
}
// On a phone there is no hover: a long press on a reaction says who reacted.
let pressTimer = 0, pressEl = null, pressShown = null;
document.addEventListener('pointerdown', event => {
  const b = event.target.closest?.('button.reaction');
  clearTimeout(pressTimer); pressShown = null; pressEl = b;
  if (b) pressTimer = setTimeout(() => { pressShown = b; notify(b.title); }, 500);
});
for (const type of ['pointerup', 'pointercancel']) document.addEventListener(type, () => clearTimeout(pressTimer));
document.addEventListener('pointerleave', event => { if (event.target === pressEl) clearTimeout(pressTimer); }, true);
document.addEventListener('contextmenu', event => { if (event.target.closest?.('button.reaction')) event.preventDefault(); });
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !state.reactOpen) return;
  const [id, author] = state.reactOpen.split('|');
  state.reactOpen = null;
  redrawCard(id, { focus: `.reaction-add[data-author="${CSS.escape(author)}"]` });
});

// ---------- the podcast: each day read aloud (see client/podcast.mjs)
// One <audio> for the whole app, outside #app, so a re-render never stops it.
// The feed and audio addresses are private: they come from the programme
// document (members only), never from this public bundle.
const probes = new Map();
const player = { el: null, audio: null, episode: null, work: undefined, paused: true };
const podcastEpisode = day => episodeFor(state.feed?.podcast, day);
// A day's episode shows only once it is known to exist: synced, or confirmed
// by the browser loading the file's metadata. A missing file shows nothing.
function availableEpisode(day) {
  const ep = podcastEpisode(day);
  if (!ep) return null;
  if (ep.confirmed) return ep;
  const p = probes.get(ep.url);
  if (!p) probe(ep.url);
  return p?.ok ? { ...ep, duration: p.duration } : null;
}
function probe(url) {
  probes.set(url, { ok: false });
  const a = new Audio();
  a.preload = 'metadata';
  const done = ok => {
    probes.set(url, { ok, duration: ok && Number.isFinite(a.duration) ? a.duration : null });
    a.removeAttribute('src'); a.load();
    if (ok) paintListen();
  };
  a.addEventListener('loadedmetadata', () => done(true), { once: true });
  a.addEventListener('error', () => done(false), { once: true });
  a.src = url;
}
const loaded = ep => !!ep && player.episode?.url === ep.url;
const playingWork = () => player.episode && !player.paused ? player.work : null;
const minutesLabel = s => s ? `${Math.max(1, Math.round(s / 60))} min` : '';

function listenBar(day) {
  const ep = availableEpisode(day);
  if (!ep) return `<div class="listen" data-listen-day="${day}" hidden></div>`;
  const here = loaded(ep), playing = here && !player.paused;
  const label = playing ? 'Pause' : here && player.audio.currentTime > 0 ? 'Resume' : 'Listen';
  const works = state.feed?.days.find(d => d.number === day)?.works || [];
  const chapters = ep.chapters.map(c => ({ ...c, w: works.find(w => w.id === c.work) })).filter(c => c.w);
  return `<div class="listen" data-listen-day="${day}"><button class="listen-button" data-play-day="${day}"><span aria-hidden="true">${playing ? '❚❚' : '▶'}</span>${label}</button>
    <span class="listen-length">Read aloud${ep.duration ? `, ${minutesLabel(ep.duration)}` : ''}</span>
    ${chapters.length ? `<span class="chapters" role="group" aria-label="Jump to a text">${chapters.map(c => {
      const now = here && player.work === c.work;
      return `<button class="chapter${now ? ' current' : ''}" data-play-day="${day}" data-play-work="${esc(c.work)}" aria-pressed="${now && playing}" aria-label="Play from ${esc(c.w.title)}, at ${clock(c.at)}">${category[c.w.category]} <span>${clock(c.at)}</span></button>`;
    }).join('')}</span>` : ''}</div>`;
}

// Inside the reader: listen to this text, from where its reading starts.
function readerListen(work) {
  const ep = availableEpisode(work.day), c = ep?.chapters.find(x => x.work === work.id);
  if (!c) return '<span data-reader-listen hidden></span>';
  const playing = loaded(ep) && !player.paused && player.work === work.id;
  return `<button class="nav-button listen-inline" data-reader-listen data-play-day="${work.day}" data-play-work="${esc(work.id)}"><span aria-hidden="true">${playing ? '❚❚' : '▶'}</span> ${playing ? 'Pause' : 'Listen'}</button>`;
}

function ensurePlayer() {
  if (player.el) return;
  const el = document.createElement('section');
  el.className = 'player'; el.hidden = true; el.setAttribute('aria-label', 'Reading aloud');
  el.innerHTML = '<div class="player-row"><p class="player-now" aria-live="polite"></p><button type="button" class="text-button player-close" data-player-close>Close</button></div><audio controls preload="none"></audio>';
  document.body.append(el);
  const audio = el.querySelector('audio');
  Object.assign(player, { el, audio });
  const sync = () => {
    const work = chapterAt(player.episode, audio.currentTime);
    if (work === player.work && audio.paused === player.paused) return;
    player.work = work; player.paused = audio.paused;
    paintListen();
  };
  for (const type of ['play', 'pause', 'ended', 'seeked', 'timeupdate']) audio.addEventListener(type, sync);
  audio.addEventListener('error', () => { if (player.episode) notify('The reading could not be played. Try again later.', true); });
}

function listen(day, workId) {
  const ep = availableEpisode(day);
  if (!ep) return;
  ensurePlayer();
  const { audio } = player, at = workId ? ep.chapters.find(c => c.work === workId)?.at : null;
  if (loaded(ep) && (workId ? player.work === workId : true) && (!workId || !audio.paused || audio.currentTime > 0)) {
    // The same button again: pause, or carry on from where it stopped.
    if (audio.paused) audio.play().catch(() => {}); else audio.pause();
    return;
  }
  if (!loaded(ep)) { player.episode = ep; player.work = undefined; audio.src = ep.url; }
  const seek = () => { if (at != null) audio.currentTime = at; };
  if (audio.readyState >= 1) seek(); else audio.addEventListener('loadedmetadata', seek, { once: true });
  player.el.hidden = false;
  document.documentElement.classList.add('has-player');
  audio.play().catch(error => { if (error.name !== 'AbortError') notify('The reading could not be played. Try again later.', true); });
  if ('mediaSession' in navigator && globalThis.MediaMetadata) {
    navigator.mediaSession.metadata = new MediaMetadata({ title: `Day ${idNumber(day)}`, artist: 'Daily Dose', album: state.feed?.club?.name || 'Daily Dose' });
  }
  paintListen();
}

function stopPlayer() {
  if (!player.audio) return;
  player.audio.pause(); player.audio.removeAttribute('src'); player.audio.load();
  Object.assign(player, { episode: null, work: undefined, paused: true });
  player.el.hidden = true;
  document.documentElement.classList.remove('has-player');
  paintListen();
}

// Redraw only the listening controls and the highlighted card.
function paintListen() {
  for (const el of document.querySelectorAll('[data-listen-day]')) morph(el, fragment(listenBar(Number(el.dataset.listenDay))));
  const inReader = reader.querySelector('[data-reader-listen]'), work = readerId && currentWork(readerId);
  if (inReader && work) morph(inReader, fragment(readerListen(work)));
  for (const card of document.querySelectorAll('.reading-card')) card.classList.toggle('is-playing', card.dataset.work === playingWork());
  if (player.el && player.episode) {
    const w = player.work && currentWork(player.work);
    player.el.querySelector('.player-now').innerHTML = `<strong>Day ${idNumber(player.episode.day)}</strong>${w ? ` · ${category[w.category]}: ${esc(w.title)}` : ''}`;
    if (w && 'mediaSession' in navigator && navigator.mediaSession.metadata) navigator.mediaSession.metadata.title = `${w.title} (Day ${idNumber(player.episode.day)})`;
  }
}

// The subscribe link copies the private feed address for a podcast app. It is
// a real link too: long-press or right-click shows and copies the address.
function podcastLine(feed) {
  if (!feed.podcast?.feed || !/^https?:\/\//.test(feed.podcast.feed)) return '';
  return `<p class="podcast-line">Every day is also read aloud as a private podcast. <a class="subscribe" href="${esc(feed.podcast.feed)}" data-subscribe rel="noreferrer">Subscribe</a><span class="subscribe-hint">copies the link for your podcast app</span></p>`;
}
async function copyText(text) {
  try { if (window.isSecureContext && navigator.clipboard) { await navigator.clipboard.writeText(text); return true; } } catch { /* fall through */ }
  const ta = document.createElement('textarea');
  ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
  document.body.append(ta); ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  ta.remove();
  return ok;
}
document.addEventListener('click', async event => {
  const link = event.target.closest?.('a[data-subscribe]');
  if (!link) return;
  event.preventDefault();
  const url = link.href;
  if (await copyText(url)) {
    link.textContent = 'Copied';
    clearTimeout(link.timer);
    link.timer = setTimeout(() => { link.textContent = 'Subscribe'; }, 2000);
    notify('Podcast link copied. In your podcast app, choose to add a show by URL and paste it.');
  } else window.prompt('Copy this podcast link into your podcast app:', url);
});

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
  if (currentWork(id)?.mine == null) act(id, { action: 'start' }).catch(e => notify(e.message, true));
  const work = await api(`/clubs/${clubId}/works/${id}`);
  if (generation !== state.generation || clubId !== state.clubId) return;
  const done = currentWork(id)?.mine?.status === 'done';
  const minutes = plural(work.minutes, 'MINUTE', 'MINUTES');
  reader.innerHTML = `<div class="reader-toolbar"><span>${category[work.category]} · Day ${idNumber(work.day)}</span><div class="reader-tools">${readerListen(work)}<button class="nav-button" data-close>Close ×</button></div>
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
  if (button.dataset.playDay) return listen(Number(button.dataset.playDay), button.dataset.playWork || null);
  if (button.dataset.playerClose !== undefined) { stopPlayer(); return; }
  if (button.dataset.news !== undefined) { showNews(); return; }
  if (button.dataset.reactOpen) {
    const id = button.dataset.reactOpen, author = button.dataset.author, key = `${id}|${author}`;
    state.reactOpen = state.reactOpen === key ? null : key;
    redrawCard(id, { focus: `${state.reactOpen ? '.reaction-choice' : '.reaction-add'}[data-author="${CSS.escape(author)}"]` });
    return;
  }
  if (button.dataset.react) {
    // The press that just showed who reacted is not also a tap.
    if (pressShown === button) { pressShown = null; return; }
    return toggleReaction(button.dataset.react, button.dataset.author, button.dataset.emoji);
  }
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
    return act(id, { action: 'rate', rating: value === 'clear' ? null : Number(value) }, { focus: `[data-rating="${value === 'clear' ? '1' : value}"]` });
  }
  if (button.dataset.readerComplete) {
    const id = button.dataset.readerComplete;
    saveProgress({ finished: true });
    if (currentWork(id)?.mine?.status !== 'done') {
      if (state.filter === 'unread') state.sticky.add(id);
      const saved = act(id, { action: 'complete' });
      closeReader();
      return saved;
    }
    closeReader(); return;
  }
  if (button.dataset.filter) { navigate(button.dataset.filter === 'all' ? '' : button.dataset.filter, { replace: true }); return; }
  if (button.dataset.rosterView) {
    state.rosterView = button.dataset.rosterView; store.set('daily-dose-roster-view', state.rosterView);
    renderOrganiser(); return;
  }
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
    queues.clear(); state.pending.clear(); state.undone.clear(); reacting.clear(); state.reactOpen = null;
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
// Warn before leaving while a save is under way (a draft or a reading action), or with changes to a shared
// response (thought or stars) that are not saved, or a thought too long to save.
window.addEventListener('beforeunload', event => {
  saveProgress();
  const unsent = allWorks().some(w => unsavedShared(w.id) || (!w.revealed && Array.from(state.drafts.get(w.id) ?? '').length > 140));
  if (!saveTimers.size && !saving.size && !queues.size && !reacting.size && !unsent) return;
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
