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
  The reader remembers the scroll position per text on the device.
  There is no shared group to join, no withdrawal, and nobody blocks anyone else.
- Check off as read records server time. Completion on the assigned local day
  is on time; a later completion is catch-up. No client timestamps or backdating.
- To unlock responses for a text, complete it, select an integer 0–5-star rating,
  write a nonblank thought of at most 140 Unicode code points and explicitly
  choose “Finish & reveal”. Zero counts; an absent rating does not.
- Before submission only one's own response is readable. Afterwards only other
  submitted responses for the same text are readable. This is enforced by
  Firestore, including direct reads and queries, not just hidden by the UI.
  The organiser has no bypass to responses or drafts; organiser access is limited
  to completion records. Midnight and other people's progress are irrelevant.
- Shared views contain submitted reader names, completion times, on-the-day/catch-up
  status, individual ratings, rating average/count and comments, newest first
  submission first. Edits never reorder the list; an edited comment says "edited".
  Other people's drafts, partial checkmarks and private progress are excluded.
- Reactions, as in Slack: under each shared thought (one's own included), a
  reader who can see it may add or remove their own reactions from a fixed set
  of six, no free emoji picker: ❤️ heart (loved it), 👍 thumbs up (agree),
  😂 laughing, 😮 surprised, 😢 moved, 🤔 made me think. Chosen for reading:
  what a text or a thought did to you, not just approval. Each emoji in use
  shows its count; one's own are highlighted and a tap takes them back;
  hovering or a long press shows who reacted (display names, "you" last).
  "React" opens the six. Reactions follow the thoughts' privacy exactly: only
  members who have submitted their own response to that text can read or add
  them (Firestore-enforced), and Mark as unread hides them again with the
  thoughts. A reaction can be added only to a thought that is currently
  submitted; removing one's own is always possible. Only current members count.
  Stored per text and reacting member (`works/{work}/reactions/{uid}`:
  `on` = author uid to a list of keys), so nobody can write another's.
  If the deployed rules predate reactions, the thoughts show without them.
- Timing words: "on the day" = checked off on the text's own date in the club's
  timezone; "catch-up" = checked off later. Used everywhere, defined in "How it works".
- Unsent thoughts are saved as they are typed: before submission to the private
  row (a private draft that follows the account), after submission on the device
  only until "Save changes". One rule after submission: a new star choice also
  waits for "Save changes" (kept on the device until then); before submission,
  stars save privately at once, with Undo. Zero stars is a separate choice below
  the rating status, never next to the stars.
- "Continue reading" reopens a text where it was left (saved while reading, on
  Close, Back, Escape, hiding the page and reload); a reload while reading reopens
  the reader. Filters replace the history entry; phone Back closes the reader or
  an open question before it changes anything behind them.
- The organiser sees an Organiser page: the roster, the start date and timezone
  (read-only once started), and who has checked each released text off and when
  (on the day or catch-up). Nothing else: no ratings, thoughts, drafts or reader
  progress. This comes from a per-member completion record
  (`completions/{uid}`: text id to checkmark time) written with each checkmark and
  cleared by "Mark as unread"; rules accept only values equal to the owner's own
  private row, and only the owner and the organiser may read it. Members are told
  in "How it works" that the organiser can see who has checked texts off.
- Editing a submitted response preserves its completion and submission timestamps.
  Removing required feedback revokes submission. The UI requires nonblank
  comments and a rating to submit; clearing stars is available in draft mode.
- “Mark as unread” clears completion/submission, removes the shared response and
  relocks the discussion for its owner. Rating/comment drafts are retained.
  Before finishing it acts at once with an Undo. Undo restores the original
  checkmark time (so on the day stays on the day): unread sets the cleared time
  aside in the private row (`undoCompletedAt`), and rules accept restoring exactly
  that time within five minutes; a new row can never carry one.
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
