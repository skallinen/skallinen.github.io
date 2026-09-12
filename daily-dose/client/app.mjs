import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { esc, tableHtml } from './text.mjs';

const root = document.querySelector('#app');
const reader = document.querySelector('#reader');
const state = { config: null, auth: null, user: null, demoToken: null, clubs: [], clubId: null,
  feed: null, filter: 'all', drafts: new Map(), pending: new Set(), generation: 0 };
const dateLabel = date => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
const category = { poem: 'Poem', story: 'Story', essay: 'Essay' };
const icons = { poem: '✳', story: '⌑', essay: '≋' };
const idNumber = n => String(n).padStart(2, '0');
const currentWork = id => state.feed?.days.flatMap(d => d.works).find(w => w.id === id);

function notify(message, error = false) {
  const el = document.querySelector('#toast');
  el.textContent = message; el.className = error ? 'show error' : 'show';
  clearTimeout(notify.timer); notify.timer = setTimeout(() => el.className = '', 5500);
}

async function api(url, options = {}) {
  const token = state.demoToken || await state.user?.getIdToken();
  const response = await fetch(`/api${url}`, { ...options, headers: {
    ...(token ? { Authorization: `Bearer ${token}` } : {}), 'Content-Type': 'application/json',
  }, ...(options.body ? { body: JSON.stringify(options.body) } : {}) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Could not save. Please try again.');
  return result;
}

const brand = `<a href="/" class="brand" aria-label="Daily Dose home"><span class="brand-mark">d.</span><span>Daily Dose<small>BETTER BOOK CLUB</small></span></a>`;

function shell(content) {
  root.innerHTML = `${state.config?.demo ? '<div class="demo-banner">LOCAL DEMO · fictional participants · no real club data</div>' : ''}
    <header class="site-header">${brand}${state.user ? `<nav aria-label="Account">
    ${state.clubs.length > 1 ? `<label class="sr-only" for="club-select">Book club</label><select id="club-select">${state.clubs.map(c => `<option value="${esc(c.id)}" ${c.id === state.clubId ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select>` : ''}
    <span class="user-name">${esc(state.user.displayName || state.user.name)}</span><button class="text-button" data-action="logout">Sign out</button></nav>` : ''}</header>
    <main id="main">${content}</main><footer class="site-footer"><span>One poem. One story. One essay.</span><span>Read at your own pace. Come back tomorrow.</span></footer>`;
}

function login() {
  shell(`<section class="welcome"><p class="eyebrow">A BETTER BOOK CLUB ANTHOLOGY</p>
    <h1>A little,<br><em>every day.</em></h1><p class="welcome-copy">Fifty days of poems, stories and essays.<br>A quiet place to read, reflect, and hear each other.</p>
    <button class="primary google" data-action="login"><span aria-hidden="true">G</span>Sign in with Google</button>
    <p class="fine-print">Your Bookrank login. Your existing book club.</p>
    ${state.config.demo ? `<div class="demo-picker"><label for="demo-user">Try the local demo as</label><select id="demo-user">${state.config.demoUsers.map(u => `<option value="${u.uid}">${u.name}${u === state.config.demoUsers[0] ? ' · organiser' : ''}</option>`).join('')}</select><button class="secondary" data-action="demo-login">Enter demo →</button></div>` : ''}
    <div class="welcome-rule"><span><strong>50</strong> days</span><span><strong>150</strong> readings</span><span><strong>140</strong> characters</span></div></section>`);
}

async function signedIn(user, demoToken = null) {
  reader.close(); reader.innerHTML = '';
  state.generation++; state.user = user; state.demoToken = demoToken; state.feed = null; state.drafts.clear();
  if (!user) { state.clubs = []; state.clubId = null; login(); return; }
  shell('<section class="loading">Finding your book club…</section>');
  try {
    const generation = state.generation;
    const data = await api('/clubs');
    if (generation !== state.generation) return;
    state.clubs = data.clubs;
    const stored = localStorage.getItem(`daily-dose-club:${user.uid}`);
    state.clubId = data.clubs.find(c => c.id === stored)?.id || data.clubs[0]?.id;
    if (!state.clubId) {
      shell(`<section class="empty"><p class="eyebrow">YOUR READING ROOM</p><h1>No club yet.</h1><p>Join your book club in Bookrank, then come back here.</p><button class="secondary" data-action="retry">Check membership again</button></section>`);
    } else await refresh();
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

function render() {
  const feed = state.feed;
  if (!feed) return;
  if (!feed.campaign) {
    shell(`<section class="empty"><p class="eyebrow">${esc(feed.club.name)}</p><h1>Every story has<br>a beginning.</h1>
      ${feed.organizer ? scheduleForm(null) : '<p>Your organiser will set Day 1. Nothing is unlocked yet.</p>'}
      <details class="help"><summary>Organiser setup</summary><p>The server operator can enable scheduling for your Firebase UID:</p><code>${esc(feed.me.uid)}</code></details></section>`);
    return;
  }
  const campaign = feed.campaign;
  const activeDay = Math.max(0, Math.min(50, campaign.currentDay));
  const today = feed.days.find(d => d.today);
  const done = today?.works.filter(w => w.mine?.status === 'done').length || 0;
  const hero = campaign.currentDay < 1 ? `We begin ${dateLabel(campaign.startDate)}.` : campaign.currentDay > 50 ? 'The pages stay open.' : 'Make a little room.';
  const filteredDays = feed.days.map(d => ({ ...d, works: d.works.filter(w => state.filter === 'all' ||
    (state.filter === 'unread' ? w.mine?.status !== 'done' : w.category === state.filter)) })).filter(d => d.works.length);
  shell(`<section class="feed-intro"><div><p class="eyebrow">${esc(feed.club.name)}</p><h1>${hero}</h1>
    <p class="intro-sub">${campaign.currentDay < 1 ? 'Your first three readings will open at midnight.' : campaign.currentDay > 50 ? 'Catch up, revisit a favourite, and keep the conversation going.' : 'Three readings. A moment to yourself. A thought to share.'}</p></div>
    <div class="day-seal"><span>DAY</span><strong>${idNumber(activeDay)}</strong><small>OF 50</small></div></section>
    <section class="personal-strip" aria-label="Your reading progress"><span>${today ? `<strong>${done} / 3</strong> read today` : '<strong>Your reading</strong>'}</span><span><strong>${feed.personal.onTime}</strong> on time</span><span><strong>${feed.personal.catchUp}</strong> caught up</span><span class="timezone">${esc(campaign.timezone)}</span></section>
    <details class="help"><summary>How the daily reveal works</summary><p>Opening today’s piece joins its reading group. After the day ends, comments and reader stats appear when everyone in that group has checked it off. If you don’t finish, choose “Not reading today”. A later checkmark counts as catch-up. Reading missed pieces never blocks an old day’s discussion.</p><p>Only your own activity is visible before the reveal. A checkmark records when you finish and cannot be backdated or undone.</p></details>
    ${feed.organizer && campaign.editable ? scheduleForm(campaign) : ''}
    ${state.config.demo ? `<div class="demo-tools"><span>Preview the reveal with another participant.</span><button class="text-button" data-action="logout">Switch person</button>${feed.organizer ? '<button class="text-button" data-action="advance">Advance demo one day →</button>' : ''}</div>` : ''}
    <div class="feed-toolbar"><div class="filters" role="group" aria-label="Filter readings">${[['all','All readings'],['unread','Unread'],['poem','Poems'],['story','Stories'],['essay','Essays']].map(([key,label]) => `<button data-filter="${key}" class="filter ${state.filter === key ? 'active' : ''}" aria-pressed="${state.filter === key}">${label}</button>`).join('')}</div><button class="text-button" data-action="refresh" aria-label="Refresh readings">Refresh ↻</button></div>
    <div class="feed">${filteredDays.map(daySection).join('') || `<section class="empty compact"><h2>${campaign.currentDay < 1 ? 'Your reading room is ready.' : 'You’re all caught up.'}</h2><p>${campaign.currentDay < 1 ? `Day 1 opens on ${dateLabel(campaign.startDate)} in ${esc(campaign.timezone)}.` : 'Choose another filter to revisit a reading.'}</p></section>`}</div>
    <p class="edition-note">Corrected review edition · some source checks remain. Full source notes accompany each reading.</p>`);
}

function daySection(day) {
  return `<section class="day-group" aria-labelledby="day-${day.number}"><div class="day-heading"><h2 id="day-${day.number}">Day ${idNumber(day.number)} <span>${day.today ? 'Today' : dateLabel(day.date)}</span></h2><span>${day.today ? 'A fresh page' : 'Open for catch-up'}</span></div>${day.works.map(workCard).join('')}</section>`;
}

function workCard(work) {
  const done = work.mine?.status === 'done';
  const reading = work.mine?.status === 'reading';
  const draft = state.drafts.get(work.id) ?? work.mine?.comment ?? '';
  const count = Array.from(draft).length;
  const collective = work.collective;
  return `<article class="reading-card ${done ? 'is-done' : ''}" data-work="${work.id}">
    <div class="work-top"><span class="genre ${work.category}"><span aria-hidden="true">${icons[work.category]}</span>${category[work.category]}</span><span class="reading-time">${work.minutes} min read</span></div>
    <h3><button class="title-button" data-read="${work.id}">${esc(work.title)}</button></h3>
    <p class="byline">${esc(work.author)} <span>${esc(work.country)} · ${esc(work.year)}</span></p>
    <div class="work-actions"><button class="read-button" data-read="${work.id}">${done ? 'Read again' : reading ? 'Continue reading' : 'Read the '+category[work.category].toLowerCase()} <span aria-hidden="true">↗</span></button>
      ${done ? `<span class="completion"><span aria-hidden="true">✓</span> ${work.mine.onTime ? 'Read on the day' : 'Caught up'}</span>` : `<button class="check-button" data-complete="${work.id}" ${state.pending.has(work.id) ? 'disabled' : ''}><span class="checkbox" aria-hidden="true"></span>Check off as read</button>`}
    </div>
    ${reading ? `<div class="reading-status"><span>${work.mine.joinedOnDay ? 'You joined this day’s reading group.' : 'Catch up whenever you’re ready.'}</span><button class="text-button" data-withdraw="${work.id}">Not reading today</button></div>` : ''}
    ${done ? `<form class="comment-form" data-comment-form="${work.id}"><label for="comment-${work.id}">Your thought <span>${work.revealed ? 'Shared with the club' : 'Private until the reveal'}</span></label><textarea id="comment-${work.id}" data-draft="${work.id}" rows="2" placeholder="What stayed with you?" aria-describedby="count-${work.id}">${esc(draft)}</textarea><div class="comment-controls"><span id="count-${work.id}" class="char-count ${count > 140 ? 'over' : ''}">${count} / 140</span><button class="save-button" type="submit" ${count > 140 || state.pending.has(work.id) ? 'disabled' : ''}>Save thought</button></div></form>` : ''}
    <div class="reveal-section">${work.revealed ? `<div class="reveal-heading"><span class="eyebrow">THE CLUB’S THOUGHTS</span><span>${collective.onTime} on time · ${collective.catchUp} caught up</span></div>
      ${collective.readers.length ? `<details class="reader-stats"><summary>Who read this?</summary><ul>${collective.readers.map(r => `<li><span>${esc(r.name)}</span><span>${r.onTime ? 'On the day' : 'Catch-up'}</span></li>`).join('')}</ul></details>` : ''}
      ${collective.comments.map(c => `<div class="tweet"><span class="avatar" aria-hidden="true">${esc(c.name.slice(0,1))}</span><div><div class="tweet-meta"><strong>${esc(c.name)}</strong><span>${c.onTime ? 'On the day' : 'Catch-up'}</span></div><p>${esc(c.text)}</p></div></div>`).join('') || '<p class="empty-thoughts">No thoughts yet. A few words are enough.</p>'}`
      : `<p class="locked"><span aria-hidden="true">◇</span>${work.revealReason === 'day-open' ? 'Thoughts stay private until the day is over and its readers finish.' : 'Waiting for this day’s reading group to finish. Thoughts and stats stay private.'}</p>`}</div>
  </article>`;
}

async function refresh({ quiet = false } = {}) {
  if (!state.clubId) return;
  const generation = state.generation;
  const clubId = state.clubId;
  const feed = await api(`/clubs/${clubId}/feed`);
  if (generation !== state.generation || clubId !== state.clubId) return;
  state.feed = feed;
  if (!quiet || !document.activeElement?.matches('textarea,input,select')) render();
}

async function act(id, payload) {
  if (state.pending.has(id)) return;
  state.pending.add(id);
  try {
    await api(`/clubs/${state.clubId}/works/${id}`, { method: 'POST', body: payload });
    if (payload.action === 'comment') state.drafts.delete(id);
    await refresh();
    if (payload.action === 'complete') notify('Checked off. Your reading time is saved.');
    if (payload.action === 'comment') notify(payload.comment.trim() ? 'Thought saved.' : 'Thought removed.');
    if (payload.action === 'withdraw') notify('You’ve left this reading group. You can catch up later.');
  } finally { state.pending.delete(id); render(); }
}

function blockHtml(block) {
  if (block.type === 'table') return tableHtml(block.rows, block.spans);
  if (block.type === 'space') return '<div class="reading-space"></div>';
  if (block.lines) return `<div class="stanza">${block.lines.map(l => `<div class="verse-line" style="--indent:${l.indentEm}em;--spaces:${l.indentSpaces}ch">${l.html}</div>`).join('')}</div>`;
  const tag = block.type === 'heading' ? 'h3' : 'p';
  return `<${tag} class="text-${esc(block.type)}">${block.html}</${tag}>`;
}

async function openReading(id) {
  const generation = state.generation;
  const clubId = state.clubId;
  // Explicit button gesture enrols the reader. GET alone never records a read.
  await act(id, { action: 'start' });
  const work = await api(`/clubs/${clubId}/works/${id}`);
  if (generation !== state.generation || clubId !== state.clubId) return;
  reader.innerHTML = `<div class="reader-toolbar"><span>${category[work.category]} · Day ${idNumber(work.day)}</span><button class="text-button" data-close aria-label="Close reading">Close ×</button></div>
    <div class="reader-inner"><p class="eyebrow">${category[work.category]} · ${work.minutes} MINUTES</p><h2 id="reader-title">${esc(work.title)}</h2><p class="reader-byline">${esc(work.author)}<span>${esc(work.country)} · ${esc(work.year)}</span></p>
    ${work.editorialHold ? `<p class="editorial-warning">Review note: ${esc(work.editorialHold)}</p>` : ''}
    <div class="reading-text ${work.category === 'poem' ? 'poetry' : 'prose'}">${work.blocks.map(blockHtml).join('')}</div>
    <div class="source-note"><h3>Text source</h3><p>${esc(work.sourceNote)}</p></div>
    <div class="reader-end"><span>Let it sit for a moment.</span><button class="primary" data-reader-complete="${id}">${currentWork(id)?.mine?.status === 'done' ? 'Back to the conversation' : '✓ I’ve read this'}</button></div></div>`;
  reader.showModal(); reader.scrollTop = 0;
}

async function run(event) {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.dataset.close !== undefined) { reader.close(); return; }
  if (button.dataset.read) return openReading(button.dataset.read);
  if (button.dataset.complete) return act(button.dataset.complete, { action: 'complete' });
  if (button.dataset.withdraw) return act(button.dataset.withdraw, { action: 'withdraw' });
  if (button.dataset.readerComplete) {
    if (currentWork(button.dataset.readerComplete)?.mine?.status !== 'done') await act(button.dataset.readerComplete, { action: 'complete' });
    reader.close(); return;
  }
  if (button.dataset.filter) { state.filter = button.dataset.filter; render(); return; }
  switch (button.dataset.action) {
    case 'login':
      if (state.config.demo) { notify('This is a local demo. Choose a participant below.'); return; }
      return signInWithPopup(state.auth, new GoogleAuthProvider());
    case 'demo-login': {
      const uid = document.querySelector('#demo-user').value;
      return signedIn(state.config.demoUsers.find(u => u.uid === uid), `demo:${uid}`);
    }
    case 'logout':
      reader.close(); state.drafts.clear(); state.filter = 'all';
      if (state.config.demo) return signedIn(null);
      return signOut(state.auth);
    case 'retry': return signedIn(state.user, state.demoToken);
    case 'refresh': await refresh(); notify('Reading room refreshed.'); return;
    case 'advance': await api('/demo/advance', { method: 'POST' }); await refresh(); notify('Demo moved forward one day.'); return;
  }
}

document.addEventListener('click', event => { run(event).catch(error => notify(error.message, true)); });
document.addEventListener('input', event => {
  const id = event.target.dataset.draft;
  if (!id) return;
  state.drafts.set(id, event.target.value);
  const count = Array.from(event.target.value).length;
  const form = event.target.closest('form');
  form.querySelector('.char-count').textContent = `${count} / 140`;
  form.querySelector('.char-count').classList.toggle('over', count > 140);
  form.querySelector('button[type="submit"]').disabled = count > 140;
});
document.addEventListener('change', event => {
  if (event.target.id !== 'club-select') return;
  state.generation++; state.clubId = event.target.value; state.drafts.clear(); reader.close();
  localStorage.setItem(`daily-dose-club:${state.user.uid}`, state.clubId);
  refresh().catch(error => notify(error.message, true));
});
document.addEventListener('submit', async event => {
  event.preventDefault();
  try {
    if (event.target.dataset.commentForm) {
      const id = event.target.dataset.commentForm;
      await act(id, { action: 'comment', comment: state.drafts.get(id) ?? currentWork(id).mine.comment });
    } else if (event.target.id === 'schedule') {
      const form = new FormData(event.target);
      await api(`/clubs/${state.clubId}/schedule`, { method: 'PUT', body: { startDate: form.get('startDate'), timezone: form.get('timezone') } });
      await refresh(); notify('Day 1 is set for your club.');
    }
  } catch (error) { notify(error.message, true); }
});
reader.addEventListener('click', e => { if (e.target === reader) reader.close(); });

try {
  state.config = await api('/config');
  if (state.config.demo) login();
  else {
    state.auth = getAuth(initializeApp(state.config.firebase));
    onAuthStateChanged(state.auth, user => signedIn(user));
  }
} catch (error) { root.innerHTML = `<main class="empty"><h1>We couldn’t open the reading room.</h1><p>${esc(error.message)}</p><a href="/">Try again</a></main>`; }
setInterval(() => { if (state.user && state.clubId && !document.hidden && !reader.open) refresh({ quiet: true }).catch(() => {}); }, 30000);
