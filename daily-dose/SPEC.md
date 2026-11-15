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
  of seven, no free emoji picker: ❤️ heart (loved it), 👍 thumbs up (agree),
  👆 this (this, exactly: Slack's pointing finger),
  😂 laughing, 😮 surprised, 😢 moved, 🤔 made me think. Chosen for reading:
  what a text or a thought did to you, not just approval. Each emoji in use
  shows its count; one's own are highlighted and a tap takes them back;
  hovering or a long press shows who reacted (display names, "you" last).
  "React" opens the seven (one row from 390 px; rows of four and three at
  360 px). Reactions follow the thoughts' privacy exactly: only
  members who have submitted their own response to that text can read or add
  them (Firestore-enforced), and Mark as unread hides them again with the
  thoughts. A reaction can be added only to a thought that is currently
  submitted; removing one's own is always possible. Only current members count.
  Stored per text and reacting member (`works/{work}/reactions/{uid}`:
  `on` = author uid to a list of keys), so nobody can write another's.
  If the deployed rules predate reactions, the thoughts show without them.
- New reactions to your thoughts: your initial sits next to your name at the
  top; when other members have reacted to your own thoughts since you last
  looked, it becomes a button with the count on its corner (9+ above nine),
  labelled for screen readers "3 new reactions to your thoughts".
  What counts as new: a reaction (one member, one emoji) by another current
  member that is on your thought now and was not there when you last looked at
  that text. Your own reactions never count. The count is taken from the
  reactions as they are now, so a reaction taken back leaves no count behind
  (and one taken back and added again after you looked is not new again).
  Only texts you have finished count, as only those show reactions.
  What looking means, per text: your thought on that text was on screen (at
  least 60% of it, for a second, with the reader closed), or the count took you
  there. Opening the feed alone clears nothing. Your thought says "2 new
  reactions" under your name until the card is next redrawn.
  Tapping the count opens the newest day's text with news (switching to All
  readings or leaving the Organiser page if needed), scrolls your thought into
  view, moves focus to it, marks that text as looked at and says which text in
  a message. With news on several texts, each tap leads to the next.
  Stored per member as `seen/{uid}`: `works` = text id to the list of reactions
  ("reactorUid:key") on your thought when you last looked. Only you can read or
  write it, one text per write, at most 600 per text (Firestore-enforced). It
  follows your account across devices; this device also keeps a copy, and a
  reaction seen in either is not new. Until the rules for `seen` are deployed,
  the device copy alone is used. Cost: no extra reads of reactions (the feed
  already listens to them for every finished text), one listener on your own
  `seen` document, one write per text you look at while it has news.
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
  The roster shows each member as a grid, like GitHub contributions: 50 day
  columns (Day 1 to 50; 75 once Volume Three is stored, Days 51 to 75 in slate blue under a "Volume Three" band), rows P (poem), S (story), E (essay). Dark green =
  checked off on the day, light green = catch-up, white with an outline = not
  checked off (a past day or today), grey = a coming day. Same checkmark times
  and the same on the day test as the rest of the page; the text "n of m
  checked off" stays beside the name.
  A switch above the roster, "Checked off" / "Stars", turns the same grid into
  the stars each member gave (0 to 5, pale to dark rust), but only on texts the
  viewer has finished and revealed themselves: the ratings any finished member
  already sees under that text, taken from the viewer's own feed. A text the
  viewer has not finished is a dark grey "you have not finished it" cell, so
  the organiser learns no rating a member would not. Beside each name: "n
  ratings you can see, average x.x". The choice is kept on the device.
  Hovering a released cell names the text and its author (title, "by", author).
  Each member sees the same grid for themselves (same legend and key) in the
  progress strip near the top of the reading page, under "Today: n of 3 read",
  from their own checkmarks in the feed; it updates as they check texts off.
  The same "Checked off" / "Stars" switch sits above it. Stars colours each
  text the member has finished by the stars they gave it (same 0 to 5 scale);
  any other released text is "no stars yet". Their own stars are never hidden
  from them, so there is no locked cell. The choice is kept on the device,
  apart from the roster's.
- My ranking, as in Bookrank. Organiser-only for now: shown only to programme
  organisers (`organizerUids`); other members see nothing of it. A private list
  of every text the organiser has checked off and rated (whole stars 0 to 5,
  submitted or still a private draft), opened from "My ranking" in the
  progress strip (address `#ranking`), with "Back to readings".
  Until the list has been saved once, the 5-star texts come first, then the 4s
  and so on down to 0; inside a star group the order is random, fixed per
  member (it does not reshuffle on a reload or another device). They drag a
  text by its handle anywhere in the list, across star groups too, with a
  finger or a mouse; on the keyboard, arrow keys on the handle move it one
  place. The list saves itself half a second after the last move ("Saving…",
  "Saved").
  Each text shows a ranked score from its place, on Bookrank's bell curve
  (Bookrank `docs/contexts/ranking/scoring.md` section 1: midpoint quantiles,
  probit by Abramowitz & Stegun 26.2.23) but from 2 to 5 instead of 1 to 5:
  score(i, n) = 2 + 3 (z(i) - z_min) / (z_max - z_min), position i from 0 at the
  top, with probit(0.5) = 0 exactly. The top is 5.0, the bottom 2.0, a list of
  one 3.5, shown with one decimal. Because the curve is symmetric, the scores
  average exactly 3.5 for every list length. Scores are never stored, only the
  order. Each rated card also says "Your ranking: ★ 3.7, 4th of 12".
  The ranking sets the stars. Saving the list (after a drag or a keyboard move,
  or with "Save ranking") makes each text's rating its ranked score rounded to
  the nearest whole star, halves up (3.5 becomes 4), so 2 to 5 stars. It is
  written exactly as a star change is (the same "rate" write as "Save changes"
  after finishing, or a star tap before), so the other finished readers, the
  average, the Stars grids and the organiser's roster all see the new whole
  stars. Only texts whose whole stars change are written. So every text in a
  saved list has 2 to 5 stars: a 0 or 1-star text becomes at least 2; the view
  says so in one line. Opening the list never writes anything: "Save ranking"
  appears, with how many ratings it would change, while the list's stars and
  the ratings differ.
  A text rated after the list was saved goes below the last ranked text with
  as many stars or more (the bottom of its star group), so the starting rule
  keeps holding; it keeps the stars it was given until the list is next saved.
  A text whose rating is removed, or that is marked as unread, drops out.
  Stored as `rankings/{uid}`: `order` = the list of text ids, top first, and
  `updatedAt`. Only the owner reads or writes it, the organiser's own document
  included (nobody reads anyone else's); at most 225 ids, no repeats
  (Firestore-enforced). The rating writes use the existing rules for one's own
  row. Until the `rankings` rules are deployed, the order is kept on this
  device only; the device always keeps a copy, used when the account copy is
  unavailable. Cost: one listener on one's own document; per save, one write
  for the order and one per text whose stars change.
- Desert island, a ranking game for every member (not only organisers), opened
  from "Desert island" in the progress strip (address `#desert-island`), with
  "Back to readings". It shows two texts the member has checked off, side by
  side (stacked on a phone): type, day, title and author. Each card has an
  ⓘ button for the text's description, closed at first so the cards stay
  compact, as on My ranking: hover or keyboard focus shows it on a desktop, a
  tap opens and closes it on a phone (as do Escape, a tap elsewhere, another
  ⓘ or a choice); the results list has the same ⓘ by each title. A tap on the
  ⓘ never chooses: only the card's own button does.
  The question: "Which one would you take to a desert island?" A tap on a card
  chooses it; "Skip, I cannot decide" records nothing and shows another pair;
  "Undo last choice" takes the newest choice back and shows that pair again.
  At least two checked-off texts are needed. Each member sees only their own
  choices and results. "How this works", closed until opened (like "How it
  works" on the reading page), says in plain words what a choice does, that
  every text starts equal, that the ranking comes from all the choices
  together, what the likely star range means, that the game never changes
  one's stars, and that nobody else, the organiser included, sees the choices.
  The model is a Bayesian Bradley-Terry: each text has a strength theta_i with
  the same prior for every text, theta_i ~ N(0, 1), independent (flat: the
  member's stars play no part), and a choice of i over j has the likelihood
  P(i over j) = logistic(theta_i - theta_j). Every choice is one more
  observation. The posterior is fitted afresh from the whole history (so the
  order of the choices does not matter): Newton's method to the most probable
  strengths, then the Laplace approximation (a normal with the inverse Hessian
  as covariance). A text no longer checked off drops out; its old choices stay
  stored but do not count while it is out.
  The next pair is chosen actively: each pair is worth the variance its answer
  is expected to remove from the gap between the two, q v^2 / (1 + q v), with
  q = p (1 - p), p = P(i over j) at the posterior mean and v the posterior
  variance of theta_i - theta_j. So uncertain, informative pairs come first and
  a text with few comparisons (a wide posterior) comes up soon. The pick is
  random among the best eight, in proportion to worth, and never the pair just
  shown (unless it is the only one).
  "Results" lists the texts by posterior mean, each with suggested stars from
  its place on My ranking's bell curve stretched to 1 to 5 instead of 2 to 5:
  stars = round(1 + 4 (z(i) - z_min) / (z_max - z_min)), halves up, so the top
  gets 5, the bottom 1, the middle 3 (texts with equal means share their mean
  place, so with no choices every text gets 3). Beside them: the member's own
  current stars, the likely range (the middle 80 % of 400 draws from the
  posterior, each draw ranked and mapped the same way; seeded by the member and
  the history, so it does not change between redraws), the strength with its
  posterior SD, and how many choices and wins. A line above says how many
  choices count and how settled the list is (texts with a single likely star,
  the mean width of the ranges). Desert island never writes a rating: there is
  no apply button, the stars are only suggested.
  Stored as `desertIsland/{uid}`: `choices` = the list of { w: chosen text id,
  l: the other, at: the client's time in ms }, oldest first, and `updatedAt`.
  Only the owner reads or writes it (the organiser has no bypass); at most 5000
  choices (the newest are kept); the newest choice must be in shape (two
  different text ids, an integer time), as rules cannot check every entry;
  the client validates them all (Firestore-enforced where it can be). Until
  the rules are deployed, the choices are kept on this device only; the device
  always keeps a copy, used when the account copy is unavailable. Cost: one
  listener on one's own document; one write of the whole list half a second
  after the last choice (a skip writes nothing). Computing takes a
  few to tens of milliseconds in the browser (225 texts and 2000 choices:
  about 60 ms), once per history.
- Descriptions: each text has a short description, a refresher of at most
  280 Unicode code points (one tweet) on what it is about and what stands
  out, in English like the texts, written from the text itself. It is shown
  only to a reader who has checked the text off: on the reading page, under
  the byline of the text's card, from the moment of the checkmark (Mark as
  unread hides it again); behind an ⓘ on Desert island's cards and results;
  and on My ranking as a tooltip on each text's
  title (marked ⓘ), so the list stays one line per text. The tooltip shows
  on hover or keyboard focus, and a tap on the title opens it on a phone
  and closes it again (as do Escape, a tap elsewhere, another title or a
  drag); the drag handle stays the only way to start a drag. A text without
  a description shows neither. The description is part of the text's
  private record (`works/{work}.description`), so, like the text, members can
  read it only once the text is released; nobody can read a coming text's
  description. Before the checkmark it is hidden by the app, not by the rules
  (a member could read a released text's description early with developer
  tools; it gives away no more than the text, which they can already open).
  Descriptions and texts are never in the public repository.
- Fewer live connections (15.11.2026). Why: the page kept about three live
  Firestore listeners per released text (one's own row, the club's responses,
  the reactions): 477 on Day 53. Whenever they all started at once (a load,
  the network coming back, the page shown again) the first save waited behind
  them, and typing and Finish & reveal got slower day by day on a phone. Now
  the page listens only where a member can see the difference.
  Part A, the club's responses and the reactions (the thoughts, stars,
  finished readers and emojis under a text one has finished):
  - Live, as before: the texts of the current day; every text whose card is
    on screen (from 200 px before it scrolls in until it has scrolled out)
    or whose text is open in the reader.
  - Every other finished text: fetched once when the page loads, no
    listener. Fetched again when its card comes on screen (it turns live
    within about a second and its card is redrawn in place if anything
    changed), when Refresh is chosen (all of them, and the message "Up to
    date" waits for that), on a reload, and after the page was hidden for
    five minutes or more (in the background; the feed on screen is served
    at once from what the page has, then redrawn once if anything changed).
  - One's own action on a text that is not live (a reaction, Save changes)
    shows at once, as before: the next feed reads that text again.
  Decisions, feature by feature (every reader of these data across texts):
  - The cards of the feed: live for today and on screen, one fetch for the
    rest. Reason: nobody reads a card that is not on screen.
  - The count on your name: one fetch at load for older texts, live for
    today's and those on screen. Reason: reactions are stored per text and
    reacting member, so no single query can ask for "reactions to me"; the
    only way to keep the count live on every text is a listener per text,
    which is the thing being removed. The count is right at every load,
    every Refresh, every return to the page after five minutes, and at once
    for today's texts.
  - The organiser's roster, Stars view (the stars the others gave, from the
    viewer's own feed): the same data, so the same rule.
  - One's own grid (Checked off and Stars), "Today: n of 3 read", the Unread
    count, My ranking and Desert island read only one's own rows and one's
    own documents: they stay live on every text.
  - The Organiser page's checkmarks were already one fetch per opening.
    There are no other views across texts (no themes or summary pages).
  What a member can see differently, and nothing else: on an older text
  that is not on screen, another member's new thought, edited thought,
  changed stars, new finished reader ("Finished: n on the day") or reaction
  used to appear within 30 seconds; it now appears when the card comes on
  screen, on Refresh, on a reload or on returning after five minutes. The
  same holds for the count on one's name when the reaction is to a thought
  on an older text, and for the roster's Stars cells of older texts.
  Unchanged: the reveal gate (Firestore decides, per text, exactly as
  before; a fetch asks the same query a listener did), the fallbacks when
  access is lost (another tab marked the text unread: the fetch is refused,
  the page reads one's own row again and locks the card) and when the
  deployed rules do not know reactions.
  Part B, one's own rows in one query instead of a listener per text. A row
  carries its owner and club (`uid`, `club`: "the stamp"), written by the
  client on every create and update once the switch is on, and by
  `scripts/backfill-read-uids.mjs` for the rows that exist. The query is the
  collection group `reads` where `uid` is the asker and `club` the club;
  rules allow it only with both equalities, only for the asker's own uid and
  only for a current member of that club (Firestore-enforced; it returns
  the asker's own drafts, which were always theirs to read, and never
  anyone else's row: only the owner can write a row's stamp and only as the
  row's own uid and club). A stamped row stays stamped. It needs the
  composite index in `firestore/daily-dose.indexes.json`.
  The client uses the query only when the programme says so (`readsByUid:
  true` on `dailyDose/{club}`, set by the backfill script's `--enable`) and
  Firestore accepts it; otherwise, or when it is refused or fails (older
  rules, no index yet), it keeps to a listener per text and writes no stamp.
  With the query on, a text missing from it is asked once by its own
  listener, which closes when there is no row and stays only for a row
  without the stamp (written by a page still running older code), so
  nothing is missed whatever the order of deployment. So the order is:
  client, rules and index, backfill, switch; each step works without the
  next, and the switch can be turned off again. The old rules refuse a
  stamped row, so once rows are stamped the rules must not go back before
  the stamps are removed (`--disable`, then `--remove`).
  Measured on the test bed (Day 53, a member who has finished every earlier
  text, WebKit at phone size, 15.11.2026): 477 listeners open after a load
  before; 165 with part A; 7 with parts A and B at the top of the page, 15
  with today's poem finished and an old card on screen.
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
