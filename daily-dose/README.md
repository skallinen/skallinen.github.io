# Daily Dose companion

A private, mobile-friendly reading companion for **A Better Book Club Anthology**.
Uses Bookrank's existing Google accounts and club membership. It does not create
accounts, edit Bookrank records, publish the anthology publicly, or change print files.

## This repository checkout

This directory publishes the **application source**, not a working GitHub Pages
deployment. GitHub Pages cannot run the Node API or SQLite database. Do not point
participants at `public/index.html`: it expects the private API on the same origin.
Deploy the server using the hosting checklist below before sharing a reading URL.

The anthology texts, reading database, `.env`, print files and editorial source
materials are deliberately **not included in this public repository**. To run
this checkout, provision the corrected `data/anthology.json` separately on the
private server, then run `npm ci`, `npm run build` and `npm start` in this directory.
The export script requires the separate, complete editorial workspace; the
export commands below refer to that workspace. Never commit its output here.
Unit/API tests use synthetic fixtures and run without private manuscript data;
demo and browser tests also require the separately provisioned anthology export.

## Local preview

Requires Node 22.13 or newer and the manuscript project's Python environment.
From the project root:

```sh
.venv/bin/python webapp/export_anthology.py
cd webapp
npm ci
npm run build
npm run demo
```

Open <http://127.0.0.1:3000>. Choose fictional Morgan, Tess or Alex. The demo
starts on Day 3 with sample activity. Morgan can advance the demo clock. Try
Tess's unfinished Day 2 poem to see how withdrawing or finishing releases the
discussion. All demo activity disappears on restart. The demo is loopback-only
and cannot access real club data; it is forbidden with `NODE_ENV=production`.

## Real Bookrank login

Stop the demo, then run `npm start` from this directory. Sign in with the same
Google account used in Bookrank. Only existing club members can access texts.
The Bookrank Firebase project must allow the site's hostname under Authentication
→ Settings → Authorized domains. Use HTTPS when hosting beyond this computer.
If a browser refuses the Google popup, allow popups for this site and try again.

Scheduling is explicitly restricted to server-configured organiser UIDs. On
first login, expand **Organiser setup** to find your UID. Create `webapp/.env`
using `.env.example` as a guide, set `DAILY_DOSE_ORGANIZER_UIDS` to that UID
(comma-separated for multiple organisers), and restart. The organiser must
also belong to the selected Bookrank club. Then choose Day 1 and the club's
timezone in the app. The default timezone is Europe/Helsinki.

This separate allowlist is intentional: Bookrank's current self-editable member
records must not grant authority to reschedule this app. No real organiser is
automatically selected. Real Google sign-in needs an interactive smoke test;
automated integration tests use mocked Firebase verification and membership.

### Integration and storage

- Firebase project: `book-club-e4916`, matching the sibling Bookrank config.
- Google popup sign-in supplies a Firebase ID token. The server verifies it
  against that project before every authenticated request.
- Club discovery uses `clubs.member_uids`; access requires an actual
  `clubs/{clubId}/members/{uid}` document. Names use `display_name`.
- Membership is rechecked for every club request. Bookrank calls are read-only
  Firestore REST requests with the caller's token, governed by existing
  Firestore rules. No service-account database access or rule changes are needed.
- Day 1, checkmarks, comments and reveal state live in
  `webapp/data/daily-dose.sqlite`, not in Bookrank. There is one programme per club.
- The corrected 150-work export lives in `webapp/data/anthology.json`. Only
  `public/` is served statically. Never serve the project root or copy the
  anthology export into `public/`.

Implementation references: [Firebase token verification](https://firebase.google.com/docs/auth/admin/verify-id-tokens)
and [Firestore REST authentication](https://firebase.google.com/docs/firestore/use-rest-api).
Firebase's public web configuration identifies the project; it is not an
administrative credential. The server rejects the Auth emulator in live mode.

## Reading and reveal rules

Each of 50 local calendar days releases a poem, story and essay. Newest days
appear first. Missed texts remain readable; future texts are blocked by the
server, not merely hidden in the interface. A checkmark records its original
server timestamp and whether it was on the assigned day or catch-up.

Opening a text on its day joins that piece's “reading today” group. A physical
book reader can simply check it off. Discussion and other readers' statistics
remain private until **both the day has ended and every on-day starter has
finished or selected “Not reading today.”** Non-readers do not block. This is
the working interpretation of “all who have read”: the app cannot know someone
has finished until they check it off. No other participants' counts, names or
comments are included in pre-reveal responses.

Each completed piece allows one optional 140-character comment (Unicode code
points, including spaces). It can be edited or removed without changing the
checkmark time. After reveal, comments appear newest-edit first. Catch-up
activity joins the published discussion and cannot hide it again. An unfinished
on-day starter can keep discussion pending until they finish or withdraw; there
is no automatic timeout or organiser override. Checkmarks cannot be backdated
or undone. Day 1 and timezone lock when the programme starts or activity exists.

See [SPEC.md](SPEC.md) for the complete contract. Anthology content is the
corrected **review edition**, with remaining source-verification warnings
preserved. Exporting it does not resolve editorial holds or establish rights
to distribute these texts online.

## Verification

```sh
npm test
npm run build
npm run test:e2e
```

Browser tests use installed Google Chrome through Playwright, with an isolated
demo server on port 3107. They cover mobile layout, reading, checkmarks,
140-character enforcement and two-member disclosure. Server tests cover
authentication, membership, future-text locking, response privacy, calendar/DST
boundaries, immutable timestamps, permanent reveal, sanitisation and SQLite
persistence. Screenshots are written to `test-results/`.

Dependency audit at the initial source push (12 September 2026): `npm audit`
reported eight moderate findings in the Firebase Admin dependency tree, tracing
to the transitive `uuid` advisory GHSA-w5hq-g745-h8pq. The suggested complete fix
includes a Firebase Admin major-version upgrade. Review and test that upgrade
before deployment; no forced dependency upgrade was applied as part of this push.

## Hosting checklist

This needs a Node server, not static-only hosting. Use one server instance and
a persistent volume for SQLite, with HTTPS at a reverse proxy. Configure
`HOST=0.0.0.0`, `PORT` and `DAILY_DOSE_DB` as appropriate; relative database paths
are resolved against `webapp/`. Never deploy with `--demo`. Keep `.env` and
`data/` private. Back up SQLite using a consistent SQLite backup or while the
server is stopped (copying only the live main file can miss WAL transactions).

Before inviting participants, verify the deployed Firebase authorised domain,
sign in with a real existing member and an outsider account, set the organiser
allowlist and Day 1, and confirm the private online-text sharing scope. Nothing
here deploys the app or changes Firebase configuration automatically.
