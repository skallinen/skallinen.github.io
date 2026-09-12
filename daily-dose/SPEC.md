# Daily Dose companion

See [README.md](README.md) for operation and integration.

Production uses GitHub Pages and direct Firebase Auth/Firestore, like Bookrank
and Family Agenda. Node/SQLite is retained only as a local demo/test harness.

- Same Google identity and existing Bookrank club membership; no new signup.
- Only the separately provisioned organiser selects Day 1 and the IANA timezone.
  Fifty calendar days follow. Scheduling freezes when the programme starts.
- Released days appear newest first; each contains poem, story and essay.
  Future texts remain inaccessible. Missed days remain readable.
- Opening a text records private progress, not a completed read or submission.
  There is no shared group to join, no withdrawal, and nobody blocks anyone else.
- Check off as read records server time. Completion on the assigned local day
  is on time; a later completion is catch-up. No client timestamps or backdating.
- To unlock responses for a text, complete it, select an integer 0–5-star rating,
  write a nonblank thought of at most 140 Unicode code points and explicitly
  choose “Finish & reveal”. Zero counts; an absent rating does not.
- Before submission only one's own response is readable. Afterwards only other
  submitted responses for the same text are readable. This is enforced by
  Firestore, including direct reads and queries, not just hidden by the UI.
  The organiser has no bypass. Midnight and other people's progress are irrelevant.
- Shared views contain submitted reader names, completion times, on-time/catch-up
  status, individual ratings, rating average/count and comments newest-edit first.
  Other people's drafts, partial checkmarks and private progress are excluded.
- Editing a submitted response preserves its completion and submission timestamps.
  Removing required feedback revokes submission. The UI requires nonblank
  comments and a rating to submit; clearing stars is available in draft mode.
- “Mark as unread” clears completion/submission, removes the shared response and
  relocks the discussion for its owner. Rating/comment drafts are retained.
  Previously viewed information cannot be unseen. A subsequent checkmark uses
  a new server timestamp and the reader must submit again.
- Legacy checkmarks/ratings/comments remain intact as private, unsubmitted drafts.
  Old shared-reveal fields and gate documents are ignored, never migrated into
  automatic submissions. Deployments do not change the programme date or roster.
- Departures lose access immediately through Bookrank membership enforcement.
  Organiser-side roster sync admits new Bookrank members. Shared UI aggregates
  include only current members.
- The private text edition preserves formatting, source notes and editorial holds.
  The website does not imply public distribution rights or final print clearance.

The local demo uses fictional participants and separate in-memory storage,
never real club data. Tests cover Firebase allow/deny decisions, the real browser
adapter, local API parity, mobile submission and undo/re-submission.
