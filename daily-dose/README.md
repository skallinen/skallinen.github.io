# Daily Dose · Better Book Club

Live at **https://1-bit-wonder.net/daily-dose/**.

The deployed app follows Bookrank and Family Agenda: **GitHub Pages serves the
browser app; Firebase Authentication and Firestore provide login, storage and
access enforcement. No Node server, Cloud Run or billing upgrade is needed.**
The earlier source-only push was not a deployment; this architecture replaces it.

## Accounts and Day 1

Sign in with the same Google account as Bookrank. The initial programme uses the
existing BBC club and its six members, with Sami as organiser. No accounts or
Bookrank records are created or modified. The organiser chooses the start date
and timezone in the app; redeploying never changes those settings.

Membership requires both a Bookrank member document and the admitted programme
roster. When the organiser opens the app, that roster synchronises with the
current Bookrank members. Departures lose access immediately. Newly joined
members are admitted by that sync. Organiser authority is separately provisioned, never
taken from Bookrank's self-editable member role.

## Privacy and reveal

Future texts are blocked by Firestore rules. Opening a piece records only private
progress. Checkmarks use Firebase server timestamps; checking off on the text's
assigned local date counts as on time, and checking off later is catch-up.

For each text, a reader checks it off, chooses a whole-star rating from 0 to 5,
writes a nonblank thought of at most 140 Unicode code points, then chooses
**Finish & reveal**. This explicitly submits the response and immediately unlocks
other submitted responses to that text for that reader. There is no midnight
reveal, shared finish moment, pending-reader gate or “Not reading today” action.
Reading a different text or another reader submitting does not grant access.

Zero is a real rating, distinct from unrated. Before submission, a rating may be
cleared and responses are private drafts. After submission, ratings/comments can
be edited while preserving the original reading time. Shared views contain only
submitted responses, their average rating and read-on-day/catch-up statistics.
Drafts never enter the shared query, even for the organiser.

**Mark as unread** corrects accidental checkmarks. It clears the completion and
submission timestamps, removes the response from shared views, hides the
discussion for its owner and preserves the rating/comment as a private draft.
A later checkmark records a fresh server timestamp; resubmission is required to
unlock the discussion again. Previously seen information cannot be unseen.

Firestore listeners cache data; the 30-second UI refresh picks up other readers'
new submissions. Shared listeners are discarded when access is revoked.
No background job or publication trigger is required.

Existing Firestore rows without `submittedAt` remain private, with their old
checkmarks, ratings and comments intact. No production data migration or automatic
submission occurs. Old work-level `revealedAt` fields and `gates` documents are
ignored and retained untouched; all client access to gates is denied.

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
