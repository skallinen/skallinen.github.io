# Daily Dose · Better Book Club

Live at **https://1-bit-wonder.net/daily-dose/**.

The deployed app follows Bookrank and Family Agenda: **GitHub Pages serves the
browser app; Firebase Authentication and Firestore provide login, storage and
access enforcement. No Node server, Cloud Run or billing upgrade is needed.**
The earlier source-only push was not a deployment; this architecture replaces it.

## Accounts and Day 1

Sign in with the same Google account as Bookrank. The initial programme uses the
existing BBC club and its six members, with Sami as organiser. No accounts or
Bookrank records are created or modified. Day 1 is deliberately unset.
The organiser chooses the start date and timezone in the app.

Membership requires both a Bookrank member document and the admitted programme
roster. When the organiser opens the app, that roster synchronises with the
current Bookrank members. Departures lose access immediately; their pending gate
entries cease to block after this organiser-side roster sync. Newly joined members
are admitted by that sync. Organiser authority is separately provisioned, never
taken from Bookrank's self-editable member role.

## Privacy and reveal

Future texts are blocked by Firestore rules. Opening a piece on its day joins
its reading group. Checkmarks use Firebase server timestamps and cannot be
backdated or undone. A later checkmark is catch-up. After completion, each reader
can write or edit one optional comment of at most 140 Unicode code points,
and give an optional whole-star rating from 0 to 5. Zero is a real rating;
“Clear” removes it. Ratings can be changed without changing reading timestamps.

Comments, ratings and other readers' statistics become readable only after the day ends
and all on-day starters have checked off or withdrawn with “Not reading today.”
The pending-reader document itself is never readable by participants, including
the organiser. Atomic writes and rules ensure a participant can alter only their
own entry in that group. Once published, a discussion cannot be hidden again.
After reveal, individual ratings and the average/count are shown; unrated texts
are excluded from the average. Existing reading records need no data migration.

Firestore listeners update cached data; the 30-second UI refresh does not
re-download the whole collection each time. Publication is checked by active
clients after midnight, with Firestore enforcing the conditions. There is no
background job, and no need for one to enforce privacy.

Full texts are stored privately under `dailyDose/{club}/texts/{work}`, outside
GitHub and the JS bundle. They use the corrected review edition, preserving
formatting and outstanding source notes. This does not resolve editorial holds
or grant distribution rights.

## Build and verify

Requires Node 22.13+ for the retained local test/demo tools.

```sh
npm ci
npm test
npm run build:pages
npm run test:rules
```

The rules suite requires a Firestore emulator at `127.0.0.1:8189`, project
`demo-daily-dose`. It tests actual Firebase allow/deny decisions plus the
browser's Firestore adapter. No real club data is used in those tests.

`build:pages` generates the tracked root `index.html` and `assets/app.js`.
Push those and the source under the website repo's `daily-dose/` directory;
GitHub Pages publishes the site. Do not serve `public/index.html` directly:
that separate entrypoint is for the legacy Node/demo harness.

The local Node demo remains available with `npm run build`, `npm run demo`
and `npm run test:e2e`. It requires the separately provisioned private
`data/anthology.json`. From the full editorial workspace, generate it with
`.venv/bin/python webapp/export_anthology.py`. The demo uses fictional people
and in-memory storage, never the production Firebase database.

## Firebase deployment

Only `dailyDose/**` was added to the **retrieved live** rules. Existing Bookrank,
Agenda and survey rules were preserved byte-for-byte, not overwritten from a
potentially stale local template. The original release and full rules backup
remain in the private editorial workspace's ignored `data/` directory.

- `firestore/daily-dose.rules`: the isolated production rule fragment.
- `scripts/deploy-rules.mjs`: validates, checks the live backup and appends that
  fragment; `--apply` performs deployment. It refuses a changed live baseline or
  a second append. Subsequent updates need a newly reviewed live baseline.
- `scripts/update-rules.mjs FULL_BACKUP OLD_FRAGMENT [--apply]`: validates and
  replaces exactly the inspected Daily Dose fragment in unchanged live rules.
  Rules for other apps are preserved byte-for-byte; concurrent releases abort.
- `scripts/seed-firestore.mjs`: prepares the BBC programme and 150 sanitised
  texts; `--apply` commits 451 create-only documents atomically. Existing data
  causes the entire operation to abort. Never overwrite a programme to redeploy.
- `scripts/firebase-operator.mjs`: local operator tooling using the existing
  Firebase CLI credential in memory. It is not imported into the browser bundle.

Do not commit `data/`, `.env`, credentials, print files or raw anthology files.
Firebase's public web configuration is an app identifier, not an admin key.
The existing authorised domain `1-bit-wonder.net` is reused.

The local Node/demo dependency tree still reports eight moderate Firebase Admin
transitive audit findings (GHSA-w5hq-g745-h8pq); Firebase Admin is not in the
deployed browser bundle. Review that upgrade before using the legacy Node server
for production. The live app uses the Firebase web SDK and the deployed rules.

See [SPEC.md](SPEC.md) for the reading contract.
