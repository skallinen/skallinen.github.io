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
the club's thoughts, edit after sharing, Mark as unread, tomorrow; then the
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
