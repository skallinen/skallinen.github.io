# Daily Dose companion

See [README.md](README.md) for operation and integration.

Production uses GitHub Pages + direct Firebase Auth/Firestore, like Bookrank and
Family Agenda. The Node/SQLite version is retained only as a local demo/test
harness. In the rules below, server time/access control means Firebase's
`request.time` and deployed Firestore security rules.

- Same Google identity and existing club membership as Bookrank; no new signup,
  roster, invitation system or changes to Bookrank data.
- An organiser selects a club, Day 1 date and IANA timezone (default
  Europe/Helsinki). Fifty consecutive calendar days follow. Date/timezone can
  be changed only before the programme begins and before any reading activity.
- Released days appear newest first, with poem, story and essay in book order.
  Future texts are inaccessible, including direct API requests. Missed days
  remain readable indefinitely after release.
- Opening a piece on its assigned day enters its “reading today” group.
  Checking it off records the server time once, irreversibly. A checkmark on
  its assigned local date is on time; a later checkmark is catch-up. Opening
  a piece is not proof of finishing. A participant may leave an unfinished
  group with “Not reading today”; this does not count as a read.
- A physical-book reader can check a piece off without opening its web text.
- One optional comment of at most 140 Unicode code points per person/piece,
  after checking it off. It may be edited/removed; editing does not change
  the original completion time. Comments are newest-edit first.
- Reveal requires BOTH the local day to have ended AND everyone who started
  that piece on its day to have checked it off or explicitly withdrawn.
  This is the working interpretation of the user's “all who have read” rule:
  completion cannot be known without a participant signal. Non-readers do not
  block publication. New catch-up readers do not join an old day's gate.
- Before reveal, only one's own status/comment are returned. Other people's
  statistics, completion times, identities, comments and pending counts are
  withheld by the server. After reveal, member read statistics and comments
  become available. Reveal is permanent; late reading adds catch-up activity
  without concealing already published comments. Removed members lose access
  immediately; their pending entries stop blocking when the organiser next opens
  the app and synchronises the programme roster with Bookrank. New club members
  are admitted at that sync. Membership remains owned by Bookrank.
- On-day means the server received the checkmark on that date. No backdating,
  offline completion claims or client-provided timestamps. No scheduling by
  elapsed 24-hour intervals: daylight-saving days are still calendar days.
- The website is a private reading companion, not a public anthology download.
  Full text comes from the corrected review pipeline, including source notes
  and outstanding editorial caveats. No claims of final print clearance.

The local demo uses fictional participants and a separate in-memory database.
It cannot access real club data or become a production authentication fallback.
