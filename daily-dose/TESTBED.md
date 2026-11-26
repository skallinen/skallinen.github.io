# Daily Dose test bed

The deployed client (`client/app.mjs`) running against local Firebase
Auth and Firestore emulators, project `demo-daily-dose`. A `demo-*` project exists
only on the emulators, so nothing here can reach production Firebase.

## Commands

```sh
scripts/testbed.sh start    # build test client, start emulators, seed, serve page
scripts/testbed.sh reset    # while running: rebuild client and rules, wipe emulators, reseed (fresh Day 1)
scripts/testbed.sh stop     # stop page server and emulators
scripts/testbed.sh status   # which test bed ports are up
```

Page: **http://127.0.0.1:5178/**. Emulators: Auth `127.0.0.1:9199`, Firestore
`127.0.0.1:8290` (hub 4499, logging 4599, websocket 9151; no Emulator UI). These
ports avoid the rules suite (8189) and the Bookrank emulator (8080). Logs and pids
go to `testbed/.run/`. Emulator data is in memory: `start` always seeds from scratch.

Requirements: Node 22.13+, `npm ci` done, Java 21 (if `java` is missing the script
runs the emulators inside `nix-shell -p jdk21_headless`), and `npx` fetches
`firebase-tools@15.23.0` (override with `FIREBASE_TOOLS=...`). Nothing was installed
globally; the JDK comes from the nix store and firebase-tools from the npx cache.

On the utm-arch VM (Linux, repo on the Mac share): `node_modules` holds the
macOS esbuild, so point it at a Linux one without touching the share:
`npm install --prefix <scratch> @esbuild/linux-arm64@0.25.12`, then
`ESBUILD_BINARY_PATH=<scratch>/node_modules/@esbuild/linux-arm64/bin/esbuild`.
Set `ANTHOLOGY=~/mac/common/projects/daily-dose/webapp/data/anthology.json`
(the default path assumes `~/common`). The first JDK fetch through nix-shell
takes longer than the 120 s port wait; run `nix-shell -p jdk21_headless --run
"java -version"` once first. Playwright has no browsers there; launch with
`executablePath: ~/.nix-profile/bin/google-chrome-stable`. The rules suite:
`firebase emulators:exec --only firestore` with a config putting Firestore
on 8189 (2026-10-01, all green this way).

## Signing in

Click **Sign in with Google**. The popup is the Auth emulator's account chooser;
pick a persona. All accounts are fictional, `example.com` addresses.

| Name | Email | Role |
| --- | --- | --- |
| Aino Lehtola | aino.lehtola@example.com | organiser, tester |
| Mikko Saarinen | mikko.saarinen@example.com | member, tester |
| Priya Raman | priya.raman@example.com | member, tester |
| Tomas Berg | tomas.berg@example.com | member, tester |
| Leena Koski | leena.koski@example.com | member, tester |
| Grace Okafor | grace.okafor@example.com | member, background (seeded responses) |
| Oskar Nyström | oskar.nystrom@example.com | member, background (seeded responses) |
| Noora Laine | noora.laine@example.com | not a club member ("No club yet") |

Grace and Oskar have submitted responses on some Day 1 and Day 2 texts (one of
Oskar's is catch-up), so a tester who finishes those texts sees peers.

## Seeded state

- After `seed.mjs`, `testbed/completions.mjs` writes each seeded checkmark's
  completion record (`dailyDose/{club}/completions/{uid}`), which the client writes
  together with a checkmark; without it the organiser page shows Grace and Oskar as
  not checked off. The rules file hot-reloads, so `reset` picks up rule changes.

- Bookrank club `clubs/testbed-club` ("Better Book Club") with `member_uids` and
  `members/{uid}` docs (`display_name`, `email`, `role`, `joined_at`), as Bookrank
  writes them; the Daily Dose rules require the member doc.
- `dailyDose/testbed-club`: shapes from `scripts/seed-firestore.mjs` (programme,
  150 `works`, 150 private `texts` sanitised through `server/service.mjs`, 150
  retired `gates`), with Day 1 already set as the organiser's `schedule()` would.
- Day 1 = today minus 4 days in Europe/Helsinki, so today is Day 5, Days 1 to 4 are
  catch-up and Day 6 onward is locked. Override with `DAY1_OFFSET=n` or
  `DAY1=YYYY-MM-DD` on `start`/`reset`. Seeded 2026-09-26: Day 1 = 2026-09-22.
- All 150 texts from the private anthology (first found of `$ANTHOLOGY`,
  `data/anthology.json`, `~/common/projects/daily-dose/webapp/data/anthology.json`).
  Seeding 465 documents takes a couple of seconds.
- Podcast: the programme gets a `podcast` record whose files `testbed/serve.mjs`
  serves as quiet 60-second WAVs: Days 1 to 3 synced with chapters (0:05, 0:20,
  0:40), Day 4 only through the pattern, Day 5 on answering 404 (no player).
  `TESTBED_PODCAST=0` leaves it out.
- Rules: the full live rules as last reviewed (private backup in the editorial
  workspace, Daily Dose fragment swapped for `firestore/daily-dose.rules`, as
  `scripts/update-rules.mjs` does). Without the backup, the minimal Bookrank wrapper
  from `firestore-test/` is used. Generated into `testbed/.run/firestore.rules`.

## Feature tour

A presenter-driven walkthrough of the reading room in a real Chrome window
(Playwright). Each beat shows a caption card; SPACE (or RIGHT ARROW, or Enter in
the terminal) runs the action with a visible pointer; then a pink "Explore" bar
lets you click around by hand until SPACE. Beats that only point have no explore
stop. If a step cannot be found, the tour says so in a bottom bar and moves on.

### Watching it on the Air

With no test bed running, type this in a terminal:

```sh
cd ~/common/projects/skallinen.github.io/daily-dose && TOUR_SIZE=full scripts/tour.sh
```

A Chrome window opens full screen. Press SPACE or RIGHT ARROW to advance each
caption, and again to leave each Explore stop. The script starts its own private
test bed (Day 1 = today, peers seeded), reads as Mikko Saarinen, then shows the
organiser page as Aino Lehtola, and stops the bed when the tour ends. Leave out
`TOUR_SIZE=full` for a 1440x900 window.

What it needs, all local, nothing global: Node 22.13+ and `npm ci` done in this
directory; Playwright's Chromium (`npx playwright install chromium`, once); Java
21 (`java` on the PATH, or `nix-shell`, which the script uses when `java` is
missing); network the first time, for `npx` to fetch firebase-tools; and the
private anthology at `~/common/projects/daily-dose/webapp/data/anthology.json`
(or `$ANTHOLOGY`), which the seed reads. Ports 5178, 9199, 8290, 4499, 4599 and
9151 must be free. Starting the bed takes about half a minute.

The beats, in order: sign in, the feed and day seal, today versus catch-up,
open, read, check off, 0 stars, remove and 4 stars, a thought, Finish & reveal,
the club's thoughts, react with an emoji, the count on your initial (the peer
the reader reacted to reacts back, written straight into the emulator), edit after sharing, Mark as unread, tomorrow; then the
organiser: sign in, the Organiser page (and what it cannot see), the read-only
start date and timezone, today's who-has-checked-off, the earlier days (one
block per day; none yet on Day 1, which the caption says), the roster, sign out.

```sh
scripts/tour.sh            # bed down: start a private one (Day 1 = today), tour, stop it
scripts/tour.sh --reset    # reseed the RUNNING bed first; wipes everyone's progress
scripts/tour.sh --keep     # keep a bed the script started
TOUR_SHOTS=tour/shots scripts/tour.sh     # screenshot every caption and explore stop
TOUR_HEADLESS=1 TOUR_AUTOGO=300 TOUR_SHOTS=/tmp/tour scripts/tour.sh   # unattended check; exit 1 if a beat was skipped
```

On its own bed (started or `--reset` by the script) the reader is Mikko Saarinen,
and the seed runs with `TOUR_SEED=1`: Grace, Oskar and Priya have already
finished today's texts, so the reveal shows peers. The tour ends with the
organiser, Aino Lehtola. On a bed someone else is using, the script neither
resets nor signs in as the organiser: the reader is Grace Okafor and the
organiser beats are left out. That reader's text ends as a private draft (the
tour marks it unread), so nothing stays shared.

Other settings: `TOUR_READER`, `TOUR_ORGANISER`, `TOUR_SKIP_ORGANISER=1`,
`TOUR_SIZE=1440x900|full`, `TOUR_URL`. Run `node tour/tour.mjs` directly to skip
the launcher.

To update after UI changes: captions are the `CAPTIONS` list and the app's
visible wording is the `LABELS` list, both at the top of `tour/tour.mjs`. Targets
are found by role and visible text. `tour/overlay.js` draws the caption card,
pointer and bars.

## How the client is pointed at the emulators

`testbed/build.mjs` bundles `client/app.mjs` with an esbuild plugin that, for imports
made from `client/` only, swaps `firebase-config.mjs` for the test config and
`firebase/auth` / `firebase/firestore` for shims that call `connectAuthEmulator` /
`connectFirestoreEmulator`. Output goes to `testbed/site/` (gitignored); `/public/`
is served from the source's `public/`. The production path (`scripts/build-pages.mjs`,
root `index.html`, `assets/app.js`) is untouched: rebuilding it after these changes
gave byte-identical files (no git diff).

## Files

Added: `scripts/testbed.sh`, `scripts/tour.sh`, `tour/` (`tour.mjs`, `overlay.js`), `testbed/` (`config.mjs`, `personas.mjs`, `build.mjs`,
`rules.mjs`, `seed.mjs`, `serve.mjs`, `firebase.json`, `shims/`), this file.
Changed: `.gitignore` (`testbed/site/`, `testbed/.run/`, `tour/shots/`). Nothing committed.

## Status (2026-09-26)

Verified: `start` works end to end (rules live-derived, 8 accounts, 465 docs, Day 1
2026-09-22, current Day 5). A headless Playwright run clicked Sign in, picked Mikko
Saarinen in the emulator chooser and reached the Day 5 feed (Remember, Before the
Law, ...) with no console errors. `stop` leaves all test bed ports down.

Not yet done:
- `reset` while running is untested (it reuses the seed that `start` runs).
- The organiser flow (roster sync on open) is unexercised, and so is `TOUR_SEED=1`
  (checked by a dry run of its peer selection only).
- No `npm run testbed` alias; `package.json` was left alone.
- `scripts/testbed.sh status` hangs on port 9151 (the websocket port never answers
  plain HTTP and `up` has no curl timeout; `tour.sh` uses `curl -m 3`).

2026-09-26, feature tour: a headless auto-go run as Grace on the running bed
(Day 5) went through open, read, check off, rating 0 / clear / 4, thought,
Finish & reveal (five peers shown), edit, Mark as unread and sign out, all green.
The organiser beats and `scripts/tour.sh` itself have not been run yet.

2026-09-26, round 2: the organiser beats were rewritten for the organiser page
(read-only start date and timezone, today, earlier days, roster) and `signOut`
now scrolls to the top before pointing. `scripts/tour.sh` headless with shots:
21 of 21 beats on a private bed (Day 1 = today) and again with `--reset` on a
running bed; the earlier-days beat was also checked on a Day 3 bed. Bed stopped
afterwards.

## Reactions check

`testbed/check-reactions.mjs` is a headless Playwright check at phone width
(390 px, or `CHECK_WIDTH=360`) on a running bed seeded with `TOUR_SEED=1`:

```sh
TOUR_SEED=1 scripts/testbed.sh start
node testbed/check-reactions.mjs            # CHECK_SHOTS=dir keeps screenshots
scripts/testbed.sh stop
```

Mikko finishes today's poem, opens "React" under Grace's thought (seven choices,
one row at 390 px, rows of four and three at 360 px, each at least 44 px, the
third one 👆 "this"), reacts with a heart (count 1, highlighted), takes
it back (gone), reacts again and reloads; Grace, in her own browser, sees the
heart with Mikko's name on hover, a long press shows the names without toggling,
she adds her own (2); Mikko's Refresh shows 2; Leena, not finished, sees no
thoughts and no reactions. Exit 1 on the first failure or a console error (the
404 of Day 5's missing podcast file is expected and ignored). It writes to the
bed, so rerun it after a reseed (`TOUR_SEED=1 node testbed/seed.mjs && node
testbed/completions.mjs`).

2026-09-27, reactions: the check was all green at 390 and 360 px, and
`scripts/tour.sh --reset --stop` headless at 390x844 ran 22 of 22 beats,
including the new "react" beat. The rules suite (21 tests, run with the
emulator on 8189 via `firebase emulators:exec`) passed. The legacy Node demo
e2e (`npm run test:e2e`) fails 4 of 4 at its first step both with and without
this change (it expects "Day 03" first); not looked into.

## Count on your name check

`testbed/check-news.mjs` checks the count of new reactions to your own
thoughts at 360 px (`CHECK_WIDTH` to change) on a running bed seeded with
`TOUR_SEED=1`:

```sh
TOUR_SEED=1 scripts/testbed.sh start
node testbed/check-news.mjs                 # CHECK_SHOTS=dir keeps screenshots
scripts/testbed.sh stop
```

Mikko finishes today's poem and hearts his own thought (no count); Grace and
Oskar react (3, labelled "3 new reactions to your thoughts", 44 px target,
initial, name and Sign out in one row, no sideways scrolling); Grace takes one
back (2); with the Stories filter on, a tap on the count goes back to All
readings, shows and focuses his thought ("2 new reactions"), names the text in
a message and clears the count; it stays clear after a reload and on a second
device; Oskar's next reaction (1) clears when Mikko scrolls to his thought; the
second device agrees. Like the reactions check it writes to the bed: reseed
before a rerun.

2026-09-27, count on your name: `check-news.mjs` all green at 360 px;
`check-reactions.mjs` still green at 390 and 360 px; `scripts/tour.sh --reset`
headless at 390x844 ran 23 of 23 beats, including the new "news" beat; the
rules suite (24 tests, 3 new for `seen`) and the unit tests (36) passed.

2026-09-28, 👆 "this" as the seventh reaction: `check-reactions.mjs` green at
360 px (rows of four and three) and 390 px (one row), `check-news.mjs` green,
the tour 23 of 23, rules suite 25 of 25, unit tests 36 of 36.

2026-10-02, the roster's Stars switch: `check-stars.mjs` green at 360 px
against a fresh `start` (Aino finishes the Day 1 poem with 3 stars; her cell,
Grace's 5 and Oskar's 3 show as stars, Grace's unfinished-by-Aino story is
locked, the switch survives a reload, no sideways scrolling); unit tests passed.
Like the others it writes to the bed: reseed before a rerun.

2026-10-03, the same Stars switch on the member's own grid: `check-my-stars.mjs`
green at 360 and 1200 px against a fresh bed (Mikko finishes the Day 1 poem
with 4 stars; that cell is s4, his unfinished texts are "no stars yet", no
locked cells, the switch survives a reload); `check-stars.mjs` still green,
unit tests 36 of 36. Reseed before a rerun.

## My ranking check

`testbed/check-ranking.mjs` checks My ranking (organiser-only for now) at
360 px (`CHECK_WIDTH` to change) against a freshly started or reset bed:

```sh
scripts/testbed.sh start
CHROME=~/.nix-profile/bin/google-chrome-stable node testbed/check-ranking.mjs   # CHECK_SHOTS=dir keeps screenshots
scripts/testbed.sh stop
```

Aino checks off and rates four texts (5 shared, 0, 4 and 4 as drafts), opens
My ranking from the progress strip (`#ranking`): 5 first, 0 last, scores 5.0
to 2.0 averaging 3.5, and opening wrote no rating ("Save ranking" offered).
A mouse drag (with the page scrolling at the window edge) puts the 0-star
text on top, a finger (touch events through the DevTools protocol) puts it
back, an arrow key moves another; after each save every text has the rounded
score as its stars (5 4 3 2). The order survives a reload; the Day 1 poem
card shows the new stars and "Your ranking"; Grace, who finished that poem,
sees Aino's new stars; Grace has no My ranking and `#ranking` takes her back
to the readings. It writes to the bed: reset before a rerun.

The older checks launch Playwright's own Chromium, which the VM does not
have; running them here needs a copy with `executablePath: process.env.CHROME`.

2026-10-14, My ranking: `check-ranking.mjs` green at 360 px;
`check-my-stars.mjs` and `check-stars.mjs` green on a reset bed;
`check-reactions.mjs` (23 ok) and `check-news.mjs` (22 ok) green on
`TOUR_SEED=1` beds; rules suite 27 of 27 (2 new for `rankings`); unit tests
46 of 46 (10 new in `test/ranking.test.mjs`). The tour was not run.

## Descriptions check

`testbed/check-descriptions.mjs` checks the descriptions (SPEC.md,
"Descriptions") at 360 px with touch (`CHECK_WIDTH` to change) and at
1200 px with a mouse, against a freshly started or reset bed. The seed adds
the private descriptions when it finds `descriptions.json` in the editorial
workspace next to the anthology (or `DESCRIPTIONS=...`); without it no text
has one and the check stops at once.

```sh
scripts/testbed.sh start
CHROME=~/.nix-profile/bin/google-chrome-stable node testbed/check-descriptions.mjs   # CHECK_SHOTS=dir keeps screenshots
scripts/testbed.sh stop
```

Aino's Day 1 poem card has no description until she checks it off, shows
it (as written in the file) after, loses it on Mark as unread and gets it
back on the next checkmark; texts not checked off show none. On My ranking
nothing shows until a tap on a title opens its tooltip (`aria-expanded`
true, nothing moved or saved, no sideways scrolling); a tap elsewhere, a tap
on the tooltip itself (it lies over the row below), Escape and a second tap
close it, another title switches to its own; the handle still drags, and the
drag closes the tooltip. On the desktop, hover shows it, moving away hides
it, keyboard focus shows it. It writes to the bed: reset before a rerun.

2026-10-14, descriptions: `check-descriptions.mjs` green (28 ok);
`check-ranking.mjs`, `check-my-stars.mjs` (14) and `check-stars.mjs` (14)
green on reset beds; `check-reactions.mjs` (23) and `check-news.mjs` (22)
green on `TOUR_SEED=1` beds; rules suite 28 of 28 (1 new: a coming text's
description is unreadable, nobody writes one); unit tests 51 of 51 (4 new in
`test/description.test.mjs`, one of which checks the private file). The tour
was not run.

## Desert island check

`testbed/check-desert-island.mjs` checks Desert island (SPEC.md, "Desert
island") at 390 px with touch (`CHECK_WIDTH` to change) and at 1280 px with a
mouse, against a freshly started or reset bed (descriptions seeded):

```sh
scripts/testbed.sh start
CHROME=~/.nix-profile/bin/google-chrome-stable node testbed/check-desert-island.mjs   # CHECK_SHOTS=dir keeps screenshots
scripts/testbed.sh stop
```

Mikko (a member, not the organiser) sees "Desert island" in the progress
strip, checks off five texts and rates two, opens `#desert-island`: two cards,
the descriptions closed behind ⓘ (a tap opens one and records no choice; a tap
elsewhere, Escape and a second tap close it), "How this works" closed until
opened. With no choices every text is at 3 stars, likely 1 to 5. Twelve choices
by a fixed taste (never the same pair twice in a row, "Saved." to the account),
a Skip that records nothing, an Undo that brings the pair back; the results put
his favourite first at 5 stars and his least liked last at 1, with his own
stars, a likely range and strength ± SD on each row; his ratings are unchanged.
A second device sees his 13 choices; Grace sees none of them. On the desktop
the cards sit side by side and hovering the ⓘ shows the description. It writes
to the bed: reset before a rerun.

2026-11-15, Desert island: `check-desert-island.mjs` green (58 ok); unit
tests 69 of 69 (14 new in `test/desert-island.test.mjs`); rules suite 31 of 31
(3 new for `desertIsland`). The tour and the other checks were not rerun.
Before the new rules were in the emulator the check stopped at "Saved.": the
page said "Saved on this device.", the device-copy path working as meant.

On the VM `lsof` is missing, so `scripts/testbed.sh start` cannot see busy
ports: with an old bed still running (here one from 12.11.) it starts no
emulators, seeds the running ones and keeps their old rules, since the rules
file does not hot-reload over the Mac share. Check `ss -ltnp` first; to load
the current rules into a running emulator, PUT `testbed/.run/firestore.rules`
to `http://127.0.0.1:8290/emulator/v1/projects/demo-daily-dose:securityRules`
as `{ rules: { files: [{ name, content }] } }`.

## Volume Three

`VOLUME3=1` on `start`/`reset` adds Days 51 to 75 from the private
`webapp/data/volume-3.json` next to the anthology (or `VOLUME3=path`), with the
same plan as `scripts/seed-volume-three.mjs`; `DAY1_OFFSET=52` makes today Day 53.
Without it the bed stays at 50 days, which the checks above expect (`OF 50`).

## Fewer live connections check

`testbed/check-fewer-listeners.mjs` checks "Fewer live connections" (SPEC.md)
at phone width on a bed with a busy club: `testbed/seed-finished.mjs` makes
every member finish every text of the earlier days, with hearts (the state the
slowness of 15.11.2026 was found in; `STAMP=1` writes the rows with their
stamp, `FILL_DAYS=n` fills fewer days).

```sh
VOLUME3=1 DAY1_OFFSET=52 scripts/testbed.sh start && node testbed/seed-finished.mjs
node testbed/check-fewer-listeners.mjs      # BROWSER=webkit; CHECK_SHOTS=dir keeps screenshots
EMULATOR=127.0.0.1:8290 CLUB=testbed-club node scripts/backfill-read-uids.mjs --enable --apply   # then reseed and run it again: the one query
scripts/testbed.sh stop
```

Mikko's page keeps far fewer listeners than three per card (counted at the
network: listen targets added minus removed). Today is live: Grace's thought
and her heart on his reach him by themselves. An old card he is not looking
at does not change for 35 s after Grace edits and reacts there; when he
scrolls to it, it shows both within seconds and is live while on screen.
Refresh brings the count on his name up to date for old texts; since "Today
first" (25.11.) a reload reads only today's and the two days before.
His own reaction and Save changes on an old card show at once, Grace sees his
heart, the reader opens, Mark as unread locks an old card and finishing again
unlocks it, and Desert island saves a choice. It writes to the bed: reseed
(`scripts/testbed.sh reset`, then the seed) before running it again.


2026-11-15, fewer live connections: `check-fewer-listeners.mjs` green in
Chromium and WebKit, with a listener per text for one's own rows (part A)
and with the one query switched on (parts A and B). The seven older checks
(reactions, news, stars, my-stars, ranking, descriptions, desert-island) green
both ways on reset beds. Rules suite 41 of 41 (10 new). Unit tests 69 of 69.
The legacy demo e2e still fails 4 of 4, on `master` too.

Measured the same day on the busy bed (Day 53, Volume Three, Mikko, Playwright
WebKit at 390 px, three runs each, medians; listeners and documents counted at
the network, saves timed in the page from "Saving draft…" to "Draft saved
privately."; "reconnect" is the network off for 20 s, "resume" is the page
hidden long enough to close its listeners):

| | `master` | `fix-typing-slowness` | part A | parts A and B |
|---|---|---|---|---|
| Listeners open after a load | 477 | 477 | 165 | 7 |
| Listen targets opened during the load | 481 | 481 | 481 | 323 |
| Feed shown after sign-in | 9.9 s | 1.9 s | 1.6 s | 1.4 s |
| Documents from the server, full load | 2515 | 2515 | 2515 | 2515 |
| First save after a reconnect | 12.1 s | 0.08 s | 0.11 s | 0.15 s |
| Documents from the server, reconnect | 2671 | 2671 | 487 | 645 |
| First save after a resume | 13.2 s | 0.08 s | 0.09 s | 0.16 s |
| Documents from the server, resume | 2671 | 2671 | 2671 | 2829 |
| A save with nothing else going on | 0.13 s | 0.09 s | 0.10 s | 0.15 s |

The emulator sends every listened document again on a reconnect and on a
resume (no saving from resume tokens), so the last document rows say what is
asked for again, not what production would bill. On a resume the older texts
are fetched again in the background, which is why that row does not fall.
Not measured: a real phone, and production.

## Today first check

`testbed/check-today-first.mjs` checks "Today first" and "Redraw only what
changed" (SPEC.md) in Chromium at 390 px (`CHECK_WIDTH=1280` for the
desktop), on a busy bed at Day 61:

```sh
VOLUME3=1 DAY1_OFFSET=60 scripts/testbed.sh start && node testbed/seed-finished.mjs
node testbed/check-today-first.mjs          # CHECK_SHOTS=dir keeps screenshots
scripts/testbed.sh stop
```

Mikko signs in on a phone-like network (150 ms, 1.6 Mbit/s): the first draw
holds today and the two days before (9 cards) with "Loading earlier days…"
below, loading cells in the grid, "Loading your earlier days…" and no count
on Unread; then all 183 cards, each with his own checkmark, the grid
complete, "No older texts waiting.", Unread (0). An old card off screen says
the club's thoughts are loading; one from two days ago already has them;
scrolled to, the old card shows them. With nothing new, 35 s (one 30-second
refresh) change nothing on the page (a MutationObserver on `#main`) and
replace no card element. Grace finishing today's poem redraws that card
only. While he types in that card through a refresh, the box, focus, text
and caret stay and Grace's new heart waits; once he leaves the box the heart
appears and his unsaved text is still there. Closing the reader keeps every
card element. It writes to the bed: reseed before a rerun.

2026-11-25, today first: `check-today-first.mjs` green at 390 and 1280 px
(14 ok each); `check-fewer-listeners.mjs` green in Chromium and WebKit (27
ok; its sign-in now waits for the earlier days, and the count steps take a
Refresh first: a reload no longer reads old texts, the count went from 365
to 10 on the busy bed and back to 365 on Refresh); stars, my-stars,
ranking, desert-island, reactions, news green; `scripts/tour.sh` headless
at 390x844 on its own bed, every beat ran (23). `check-descriptions.mjs`
fails now and then on a console line "400 (Bad Request)" from a
transaction commit the SDK retries (`documents:commit`): 2 of 2 runs on
`master`, 1 of 2 on this branch, so not from this change. A second
emulator 400 came up in later runs of `check-today-first.mjs`: Grace's write
stream ended by the SDK a minute after her last write
(`Write/channel?...TYPE=terminate`, empty body; it reopens on the next
write, nothing visible). A probe (finish, react, idle 90 s) saw it in 1 of 2
runs on this branch and 0 of 2 on `master`, too few to call it unrelated;
the check tolerates exactly these two requests and fails on any other.
Rules suite 43 of 43 (2 new), unit tests 69 of 69.

Measured the same day (scratch `testbed/.run/measure4.mjs`, Mikko at Day 61,
Chromium at 390 px with 4x CPU and a phone network, 150 ms and 1.6 Mbit/s
down; two runs each, both shown; "production-shaped" is
`testbed/.run/seed-prodlike.mjs`, the club as it was measured in production
on 25.11., checked texts per member 181, 166, 58, 58, 6; "busy" is
`seed-finished.mjs`; requests are listen targets added; "return" is the
page hidden until its listeners close, then shown; long tasks from the
browser's longtask entries):

| | master, production-shaped | branch, production-shaped | master, busy | branch, busy |
|---|---|---|---|---|
| Requests at load | 553 | 205 | 553 | 205 |
| Requests on return | 549 | 201 | 549 | 201 |
| First feed (today usable) | 14.2 s, 13.7 s | 3.8 s, 3.3 s | 21.7 s, 21.8 s | 3.8 s, 3.5 s |
| Full feed (all 183 cards) | 14.2 s, 13.8 s | 6.3 s, 5.8 s | 21.7 s, 21.9 s | 6.2 s, 6.0 s |
| Documents and kB at load | 902, 921 kB | 392, 423 kB | 2899, 2131 kB | 463, 467 kB |
| Long tasks, 35 s idle | 585 ms, 563 ms | 74 ms, 72 ms | 937 ms, 868 ms | 82 ms, 74 ms |
| Longest task after return | 1.8 s, 1.9 s | 0.48 s, 0.46 s | 2.9 s, 2.7 s | 0.47 s, 0.46 s |
| Save, warm | 1.26 s, 1.20 s | 1.23 s, 1.22 s | 1.22 s, 1.25 s | 1.22 s, 1.25 s |
| Save after return | 2.51 s, 2.51 s | 2.64 s, 2.54 s | 2.48 s, 2.51 s | 2.60 s, 2.59 s |
| Older card scrolled to: thoughts shown | 0.06 s, 0.07 s | 0.85 s, 0.86 s | 0.11 s, 0.10 s | 0.85 s, 0.85 s |

Saves are unchanged: a save after a return still waits behind the 183
own-row listeners reopening (part B, one query, is what removes those).
On `master` the older card's thoughts were already on the page.
Not measured: a real phone, production.

## Typing check

`testbed/check-typing.mjs` checks how long a key takes to reach the screen
in the thought box, in Chromium at 390 px (`CHECK_WIDTH=1280` for the
desktop) with a phone's CPU (4x slower, `TYPING_CPU`) and network (150 ms,
1.6 Mbit/s), on the busy bed at Day 61:

```sh
VOLUME3=1 DAY1_OFFSET=60 scripts/testbed.sh start && node testbed/seed-finished.mjs
node testbed/check-typing.mjs               # CHECK_SHOTS=dir keeps screenshots
scripts/testbed.sh stop
```

Mikko types 60 characters into today's essay, a key every 100 ms, three
times: with nothing else going on, through the 30-second refresh (fired
after the tenth key; the page's own timer is held back so it cannot land
elsewhere), and right after a draft save started. Per key it times the
keydown to just after the next paint (`requestAnimationFrame`, then a
message). 95% of keys must take under 50 ms and every key under 200 ms (the
Web Vitals line for a slow response to input). The box keeps every
character and the focus, the count and the hint follow, the draft saves
privately and is back after a reload. It writes Mikko's draft on that text.

2026-11-26, typing (Arno, 25.11.: "typing the thought is slow on the
phone"). Measured before changing anything (scratch
`testbed/.run/measure-typing.mjs`, same settings and seeds as the "Today
first" table, Mikko at Day 61; two runs each on the production-shaped and
the busy club, so four per column; median of the runs' medians, then the
range of the runs' 95th percentiles and the longest single key; "early" is
typing as soon as today's box is there, while the earlier days still
arrive on the branch):

| Key to screen, ms | `master` | `daily-dose-today-first` |
|---|---|---|
| Box usable after sign-in | 13.5 to 21.3 s | 3.3 to 3.8 s |
| Early: median, 95%, longest | 13, 19 to 34, 60 | 11, 50 to 60, 133 |
| Nothing else going on | 14, 17 to 25, 62 | 10, 13 to 22, 31 |
| Through the 30-second refresh | 12, 18 to 31, 79 | 11, 14 to 24, 90 |
| Right after a draft save | 13, 16 to 26, 28 | 10, 14 to 15, 23 |

Playwright WebKit (no CPU or network slowdown available there), one run per
club: 11 to 13 ms median and at most 42 ms on both. Where the time goes
(branch, 4x CPU, 60 keys with the app's input handler on, then stopped
before it, three times each): the handler adds 1 to 3 ms of main thread
per key (two extra layouts, about 0.5 ms; script about 0.3 ms; the
localStorage write too small to show), and the median key reaches the screen 0 to 1 ms
later. Most of the 9 to 10 ms is waiting for the next frame. So typing was
already fast and nothing in the client was changed: `fitTextarea`, the
count, the hint and the device copy stay per key. The slowness phones felt
is the load (13 to 21 s before the box on `master`) and the work queued
behind the old listeners, which "Fewer live connections" and "Today first"
remove. What is left on the branch: during the first seconds, while the
earlier days are added below, a few keys take 50 to 130 ms; one key per
30-second refresh takes up to 90 ms. Both stay under 200 ms. Not measured:
a real phone.
Checks the same day on the branch: `check-typing.mjs` green at 390 and 1280
px (26 ok each; the longest key 78 and 88 ms, through the refresh);
today-first at 390 and 1280, fewer-listeners in Chromium and WebKit, stars,
my-stars, desert-island, reactions, news and the tour green; ranking failed
once on an emulator "400 (Bad Request)" console line and passed twice on
rerun. Rules suite 43 of 43, unit tests 69 of 69.

## Typing by length

`testbed/measure-typing-length.mjs` measures the delay per input in the
thought box against how much is already typed. It is a measurement, not a
pass or fail check. Same busy bed at Day 61:

```sh
VOLUME3=1 DAY1_OFFSET=60 scripts/testbed.sh start && node testbed/seed-finished.mjs
node testbed/measure-typing-length.mjs > result.json   # BROWSER=webkit, CPU=8, TRACE=1
scripts/testbed.sh stop
```

Mikko types a 188-character thought (past the 140 limit) into today's essay
at 390 px with touch, in four kinds of input: key presses; a word at a
time (`insertText`); keyboard composition (a composition update per
letter, a commit per word, as Android keyboards with suggestions send);
and autocorrect (composition with a typo, then the word replaced). Every
sixth word a 1.5 s pause lets the draft save run. Each kind is typed twice:
alone, and while a second member (`testbed/live-member.mjs`) rewrites a
thought every 1.5 s on today's and yesterday's texts. The 30-second
refresh runs as usual. Per input: the `beforeinput` timestamp to just after
the next paint, and the time in the app's input handler. `TRACE=1` adds a
Chromium trace and sums main-thread time by kind in thirds of the pass.

2026-11-26 (Sami: "the claim is that the more words you write the slower it
is"). Chromium, 4x CPU, phone network; median ms per input at 0 to 29
characters typed, then at 150 to 179; the longest input up to 179:

| Kind | `master` alone | `master` active | branch alone | branch active |
|---|---|---|---|---|
| Key presses | 22, 20; 75 | 20, 18; 64 | 12, 11; 34 | 14, 14; 36 |
| A word at a time | 22, 21; 67 | 20, 21; 88 | 13, 13; 30 | 14, 14; 58 |
| Composition | 21, 21; 60 | 18, 18; 73 | 11, 13; 40 | 13, 14; 33 |
| Autocorrect | 21, 21; 58 | 21, 17; 63 | 12, 14; 33 | 15, 15; 36 |

WebKit (no throttling there), key presses and a word at a time: 6 to 13 ms
median at every length on both, the longest input 22 ms. At 8x CPU (key
presses and composition, alone and active): `master` 44 to 46 ms median at
every length, the longest input 200 ms; the branch 26 to 28 ms, the longest
192 ms.
The input handler takes 1 to 2 ms per input at the start and at the end.
Trace (branch, composition, three thirds of the pass): layout 232, 269 and
231 ms, paint 464, 454 and 456, pre-paint 342, 374 and 357, event handling
185, 207 and 186: nothing grows with the text. Most of an input's 11 to 22
ms is the frame (pre-paint and paint of a long page), the same at any
length. So the claim was not reproduced: in the test bed the delay does not
grow with the length of the thought, for any kind of input, alone or with
another member writing. Not measured: a real phone (iOS Safari, a real
keyboard), which is still the next step.

Past the limit the box keeps every character, the count turns red, the hint
above the button says "Shorten by N characters." and the draft stays on the
device ("Too long to save to your account"). The hint under the card still
said "Ready. Choose “Finish & reveal”" there; it now says to shorten the
thought (SPEC.md), and `check-typing.mjs` checks it past the limit
(failed before the change, passes after).
## Own rows on demand: measured

"Own rows on demand" (SPEC.md) is measured with the same scratch probe as
"Today first" (`testbed/.run/measure4.mjs`, not committed: Mikko at Day 61,
390 px, Chromium at 4x CPU, 150 ms, 1.6 Mbit/s down; requests are Firestore
listen targets added), on c995282 (before) and this branch (after), a
production-shaped club (prod) and a busy one (busy), one run each,
26.11.2026:

| | before prod | after prod | before busy | after busy |
| --- | --- | --- | --- | --- |
| requests at load | 205 | 31 | 205 | 31 |
| listeners open after load | 189 | 16 | 189 | 16 |
| documents / kB at load | 392 / 423 | 218 / 241 | 463 / 467 | 289 / 285 |
| first feed / full feed (s) | 3.4 / 6.1 | 3.8 / 3.8 | 3.5 / 6.0 | 3.8 / 3.8 |
| requests on return (5 min hidden) | 201 | 28 | 201 | 28 |
| documents on return | 572 | 400 | 643 | 471 |
| save warm / first save after return (s) | 1.21 / 2.57 | 1.28 / 1.32 | 1.26 / 2.55 | 1.27 / 1.45 |
| longest task after return (ms) | 441 | 61 | 447 | 70 |
| older card shows its thoughts (s) | 0.84 | 0.81 | 0.85 | 0.83 |

The 31 at load: the programme, members, club, clock, works, the record,
seen and desert island (8), own rows of today and the two days before (9),
the two days before's thoughts and reactions (12), and one of those cards
on screen turning live (2). With one recent day instead of two it would be
about 22. A save itself still takes about 1.2 s on this network (a
transaction: read, then commit), the same before and after; the wait
behind the old listeners after a return is gone.

Checks on this branch, 26.11.2026: rules suite 44 of 44 (1 new: rows only
for the views that need them, a row written off screen kept, another
device's checkmark drops the kept row, needed texts live, a legacy
checkmark repaired once its row is read); `check-fewer-listeners.mjs` green
in Chromium and WebKit (27 ok; its limit is now 40 listeners at load, it
saw 16); `check-today-first.mjs` green at 390 and 1280 px (13 ok: the first
draw is now usually the complete feed, its cards added a few days at a
time, and the check accepts that or the early draw); typing, stars,
my-stars, ranking, desert-island and reactions green.
