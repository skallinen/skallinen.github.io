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
assigned local date counts as "on the day", and checking off later is "catch-up".

**What the organiser sees.** The organiser (programme `organizerUids`) has an
Organiser page with the roster and, per released text, whether and when each
member checked it off. That comes only from `dailyDose/{club}/completions/{uid}`,
a map of text id to checkmark time, written in the same transaction as the
checkmark and cleared by Mark as unread. Rules let the owner and the organiser
read it, and accept a change only when it equals the owner's own private row
after the write, so nobody can forge or hide another member's checkmark.
Ratings, thoughts, drafts and reader progress stay in the private rows, which
the organiser cannot read. The roster draws the same record as a grid per
member (50 day columns, rows poem, story, essay; on the day, catch-up, not
checked off, coming), built in the client from `days` and `checks`, so no
extra reads. Each member also sees their own grid, same code and legend, in
the progress strip at the top of the reading page, built from their own feed
(`mine.onTime`), so no extra reads there either. The roster's Stars switch colours the
grid by the stars each member gave, only on texts the organiser has finished
and revealed (the `collective.readers` already in their feed), so it shows no
rating a member would not see and needs no rules change. The member's own grid has
the same switch, coloured by their own stars (`mine.rating`). Rows from before this record
existed are repaired
the next time their owner opens the app (older checkmarks by members who never
return will not show). Members are told this in "How it works".

For each text, a reader checks it off, chooses a whole-star rating from 0 to 5,
writes a nonblank thought of at most 140 Unicode code points, then chooses
**Finish & reveal**. This explicitly submits the response and immediately unlocks
other submitted responses to that text for that reader. There is no midnight
reveal, shared finish moment, pending-reader gate or “Not reading today” action.
Reading a different text or another reader submitting does not grant access.

Zero is a real rating, distinct from unrated. Before submission, a rating may be
cleared and responses are private drafts, saved to the private row as they are
typed. Edits to a submitted thought stay on the device (localStorage, keyed by
account, club and text) until Save changes, because the row is shared. After submission, ratings/comments can
be edited while preserving the original reading time; both a new rating and a new
thought are shared only by Save changes. Shared views contain only
submitted responses, their average rating and read-on-day/catch-up statistics.
Drafts never enter the shared query, even for the organiser.

**Mark as unread** corrects accidental checkmarks. It clears the completion and
submission timestamps, removes the response from shared views, hides the
discussion for its owner and preserves the rating/comment as a private draft.
Undo within five minutes restores the original checkmark time (rules check it
against the time unread set aside in the private row). Any later checkmark records a fresh server timestamp; resubmission is required to
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

## Reactions

Finished readers can react to the club's thoughts (their own too) with one of
seven emojis, like Slack: ❤️ 👍 👆 😂 😮 😢 🤔 (see SPEC.md for why these). Under a
thought, each emoji in use shows its count, yours highlighted; tap it to take
yours back, or "React" to add one. Hover (desktop) or a long press (phone)
shows who reacted.

Data: `dailyDose/{club}/works/{work}/reactions/{uid}`, one document per member
per text, `{ on: { authorUid: ['heart', 'think'] }, last, updatedAt }`, written
with `arrayUnion` / `arrayRemove` and a merge, so each write changes only the
writer's own list for one author (`last`). Rules: read and write only for
members who have submitted their own response to that text (the same test as
reading the thoughts), only one's own document, only the seven keys without
repeats, a new reaction only on a thought that is submitted now, never a
delete. The client reads one listener per revealed text. Keys and emojis live
in `client/reactions.mjs` (the rules repeat the keys; `test/reactions.test.mjs`
checks they agree).

**Rules first, or nothing shows.** The client needs the new rules fragment. Until
it is deployed, the reactions listener is refused, the client stops asking for
the session, and the thoughts show exactly as before with no reaction controls.
Deploy the fragment with `scripts/update-rules.mjs` (below).

### The count on your name

When other members react to your own thoughts, your initial next to your name
at the top shows how many reactions are new (SPEC.md defines new and looked).
Tap it to go to the thought; scrolling to the thought yourself clears it too,
per text. Data: `dailyDose/{club}/seen/{uid}`, private to its owner,
`{ works: { workId: ['reactorUid:key'] }, last, updatedAt }`, one text per
write (merge). The feed computes the count from the reaction listeners it
already has, so it costs one extra listener (your own `seen` document) and a
write per text you look at. Until the `seen` rules are deployed, the client
keeps the record on the device only (`localStorage`); it always keeps that copy
too, and counts a reaction as seen if either copy has it.

## Podcast: each day read aloud

The club has a private podcast (RSS, one episode per day: the poem, story and
essay read in that order, with chapter times in the show notes). Its feed
address carries a private token, and this repo and `assets/app.js` are public,
so **the address is never committed or bundled.** It is stored on the programme
document as `podcast` (`feed`, `pattern`, `episodes[{day, url, duration,
chapters[{work, at}], closing}]`), which the existing rules let only admitted
members read. No rules change was needed.

The feed host sends no CORS headers, so the browser cannot read the feed.
`scripts/sync-podcast.mjs` reads it with the operator credential, matches each
chapter to the day's text by title (falling back to poem, story, essay order)
and writes the one field:

```sh
node scripts/sync-podcast.mjs 'https://.../feed.xml'           # dry run
node scripts/sync-podcast.mjs 'https://.../feed.xml' --apply   # first time
node scripts/sync-podcast.mjs --apply                          # later, reuses the stored feed
```

Re-run it after new episodes appear, for their chapter buttons. Until then the
app derives a new day's address from `pattern` and shows it (whole day, no
jumps) only after the browser has loaded the file's metadata; a missing
episode shows nothing. Where the feed is generated and hosted
(daily.pojubot.org, behind Cloudflare) is not in this repo; if that host ever
sends `Access-Control-Allow-Origin: https://1-bit-wonder.net`, the client
could read chapters itself.

In the app: each day with an episode gets a Listen button, the length, and
one button per text (Poem 0:20, Story 1:05, Essay 25:25). The reader's toolbar
has Listen/Pause for that text. One `<audio>` element lives outside `#app` in a
bar at the bottom, so re-renders never stop it; the card being read aloud is
outlined. "Subscribe" under the progress lines copies the feed address
(Clipboard API, `execCommand('copy')` outside secure contexts, a prompt as the
last resort); it is also a plain link, so long-press shows the address.
Parsing and matching are tested in `test/podcast.test.mjs`.

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
