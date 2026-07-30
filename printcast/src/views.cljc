;; Read side: projections + queries, pure functions of the folded state.
;; Mirrors docs/contexts/*/read-models (slice-01 fields; projections use the
;; docs' own field names — `kind` etc. — since there is no envelope to clash
;; with). No Reagent, no browser (WAY-OF-WORKING §9).
(ns views
  (:require [domain]))

(defn- display-item [item]
  {:item-id (:item-id item)
   :title (:title item)
   :kind (:item-kind item)
   :duration-estimate (:duration-estimate item)})

(defn- remaining-seconds
  "What is left to hear of an item: its estimate minus the seconds already
   heard (recorded seconds for a recording, the consumed-chunk estimate for
   text — since 02-queue-management, recordings since 05-podcast-feeds)."
  [item]
  (max 0 (- (:duration-estimate item)
            (domain/item-elapsed-seconds item (:position item)))))

(defn queue-view
  "docs/contexts/playback/read-models/queue-view.md — the queue in play order,
   with the total remaining listening time (since 02-queue-management).
   Answers the `up-next` query."
  [state]
  (let [queued (mapv #(get-in state [:items %]) (:queue state))]
    {:items (mapv (fn [item]
                    (assoc (display-item item) :position (or (:position item) 0)))
                  queued)
     :total-remaining (reduce + 0 (map remaining-seconds queued))}))

(defn item-list
  "docs/contexts/library/read-models/item-list.md — every library item with
   its lifecycle status and starred flag, in added order (the base
   projection; the `library-items` query below applies filter + sort).

   The order is keyed on [added-at item-id], not on added-at alone: item-id
   is unique, so the key is total and the projection cannot inherit the
   arbitrary order `(vals …)` gives a map past its array-map size (since
   11-item-ordering)."
  [state]
  {:items (->> (vals (:items state))
               (sort-by (juxt :added-at :item-id))
               (mapv (fn [item]
                       (cond-> (assoc (display-item item)
                                      :status (:status item)
                                      :starred (boolean (:starred item))
                                      :position (or (:position item) 0)
                                      :added-at (:added-at item))
                         (:origin item) (assoc :origin (:origin item))
                         (:published-at item) (assoc :published-at (:published-at item))
                         ;; chapter-like divisions (since 10-sleep-chapters-history)
                         (:sections item) (assoc :sections (:sections item))))))})

(defn- followed-sources
  "Which sources the reader currently follows — the one definition, used by
   the `source-list` projection (which then orders them and counts them) and
   by the membership test below (which needs neither). An unsubscribed source
   is `removed` and drops out. Since 05-podcast-feeds, extracted since
   16-library-membership so that \"followed\" is said once."
  [state]
  (filter #(= "active" (:state %)) (vals (:sources state))))

(defn followed-source-ids
  "The sources the reader currently follows, as a set of ids — exactly the
   sources the `library-sources` query answers with.

   Membership in `library-items` and in `latest-from-sources` is by
   FOLLOWING, not by carrying a source id. The weaker test reads simpler and
   is wrong: unsubscribing does not delete a source's items (the `source`
   authority) and it removes the source's page, so under \"has an
   origin.source-id\" those items would be listed nowhere at all. Resolved
   once here so the two queries cannot drift (library-items.md, Membership;
   latest-from-sources.md, Membership). Since 16-library-membership."
  [state]
  (into #{} (map :source-id) (followed-sources state)))

(defn- of-followed-source?
  "Does this item-list row belong to a source the reader currently follows?
   A row with no origin, or one naming a source nobody follows, does not."
  [row followed]
  (contains? followed (get-in row [:origin :source-id])))

(defn- library-row-visible?
  "The library-items filter block (all clauses AND together).

   Two clauses both narrow AND reveal, which is the one shape this query was
   always built on:
   - without a status filter, archived items stay out of view — archived
     means \"out of active views\" (item-archived.md; 06-library);
   - without a source-id filter, the items of a FOLLOWED source stay out of
     view, because they are listed on that source's own page and in
     `latest-from-sources`; naming the source is how the reader asks for
     them. Since 16-library-membership — until then the unfiltered answer
     held every item in the library, a followed source's included.

   This block never consults the queue: a queued item is still listed here,
   and so is the one the player is holding (library-items.md)."
  [row {:keys [status kind starred source-id]} followed]
  (and (if status
         (= status (:status row))
         (not= "archived" (:status row)))
       (if source-id
         (= source-id (get-in row [:origin :source-id]))
         (not (of-followed-source? row followed)))
       (or (nil? kind) (= kind (:kind row)))
       (or (nil? starred) (= starred (:starred row)))))

(defn- descending [a b] (compare b a))

(defn- item-date
  "An item's own date (item-list.md, \"An item's own date\"): its
   `published-at` when it has one — an item from a followed source was
   published before the reader ever met it — and its `added-at` otherwise,
   for items the reader adds themselves, which have no date earlier than the
   day they entered the library. `added-at` is on every row, so this is never
   nil. Since 11-item-ordering."
  [row]
  (or (:published-at row) (:added-at row)))

(def ^:private default-library-sort "date-newest-first")

(def ^:private library-sorters
  "sort enum → [key-fn comparator] (library-items.md, Ordering). The two date
   choices order by the item's own date; the two duration choices by the
   duration estimate, unchanged since 06-library.

   Every key is TOTAL — it ends in :item-id, which is unique per item — so
   the answer is one and only one order, and cannot depend on the order rows
   reached the sort or on sort-by being stable. (Slice 06 believed stability
   kept one dispatch's episodes in feed order; it never did past a handful of
   items — see 06-library/decisions.md, post-release correction.) Each
   `-oldest-`/`-longest-` choice is its pair's exact reverse: same key,
   reversed comparator."
  {"date-newest-first"       [(juxt item-date :added-at :item-id) descending]
   "date-oldest-first"       [(juxt item-date :added-at :item-id) compare]
   "duration-shortest-first" [(juxt :duration-estimate item-date :item-id) compare]
   "duration-longest-first"  [(juxt :duration-estimate item-date :item-id) descending]})

(defn order-library-rows
  "Order item-list rows by one of the library-items ordering choices (nil =
   the default). Public so a source's page can order its episodes with the
   very same key and comparator the query uses — library-items.md: the source
   page \"gives the same order as the library filtered to the same source\",
   and one shared ordering is how that stays true. Since 11-item-ordering."
  [rows sort-key]
  (let [[key-fn cmp] (get library-sorters (or sort-key default-library-sort))]
    (vec (sort-by key-fn cmp rows))))

(defn library-items
  "docs/contexts/library/read-models/library-items.md — the query: the items
   the reader added themselves, optionally filtered (status | kind | starred
   | source-id) and ordered (default date-newest-first, over the item's own
   date). Naming a source-id reveals that source's items instead. Since
   06-library; the two date choices redefined since 11-item-ordering; the
   membership narrowed since 16-library-membership."
  ([state] (library-items state nil))
  ([state {row-filter :filter sort-key :sort}]
   (let [followed (followed-source-ids state)]
     {:items (-> (->> (:items (item-list state))
                      (filter #(library-row-visible? % row-filter followed)))
                 (order-library-rows sort-key))})))

(def ^:private unplayed-statuses
  "item-list.md, \"An unplayed item\": the reader has neither played it nor
   put it away. Defined once, because two surfaces count unplayed items and
   must count the same ones — the per-source tally on `source-list` and the
   membership of `latest-from-sources`. Since 16-library-membership."
  #{"new" "in-progress"})

(defn- unplayed? [item] (contains? unplayed-statuses (:status item)))

(defn source-list
  "docs/contexts/library/read-models/source-list.md — followed sources with
   display metadata (assembled from feed ingests), oldest subscription first;
   removed sources drop out. Answers the `library-sources` query. Since
   05-podcast-feeds; the order stated in the docs, and the per-source
   :unplayed-count added, since 16-library-membership.

   The count is of the source's WHOLE catalogue as the reader holds it — it
   deliberately does not exclude what is in the queue, because queueing an
   episode is not hearing it (source-list.md; plan decision 8). That is the
   one place where it and `latest-from-sources` differ, and it is intended."
  [state]
  (let [unplayed-per-source (->> (vals (:items state))
                                 (filter unplayed?)
                                 (keep #(get-in % [:origin :source-id]))
                                 frequencies)]
    {:sources (->> (followed-sources state)
                   ;; total key (11-item-ordering): sources subscribed in the
                   ;; same instant are still settled relative to each other
                   (sort-by (juxt :subscribed-at :source-id))
                   (mapv #(-> (select-keys % [:source-id :feed-url :title :author
                                              :artwork-url :subscribed-at
                                              ;; per-source overrides, when set
                                              ;; (since 08-voices-and-settings)
                                              :voice-id :speed])
                              (assoc :unplayed-count
                                     (get unplayed-per-source (:source-id %) 0)))))}))

;; -- Latest from sources (since 16-library-membership) -----------------------

(declare player-view)

(def ^:private latest-bound
  "latest-from-sources.md, \"The bound\": at most ten. A count, not a period
   of time — a window would make the answer depend on the moment it was
   asked, so it could not be fully determined. There is deliberately no way
   to ask for more, and no input to this query at all."
  10)

(defn- spoken-for-item-ids
  "What playback has already taken: everything in the queue, plus the item
   the player has in hand while it is playing or paused (nothing while idle).

   Read from the existing playback read models, NOT re-folded here. \"What is
   queued\" must have exactly one answer in this app; a second fold of the
   queue's events living in `library` is the two-answers-to-one-question
   shape 11-item-ordering had to remove (latest-from-sources.md, \"What the
   answer is built from\")."
  [state]
  (let [pv (player-view state)]
    (cond-> (into #{} (map :item-id) (:items (queue-view state)))
      (contains? #{"playing" "paused"} (:state pv))
      (conj (get-in pv [:item :item-id])))))

(defn latest-from-sources
  "docs/contexts/library/read-models/latest-from-sources.md — the query: what
   has arrived from the sources the reader follows and is not yet spoken for.
   At most ten, newest first by the item's own date. Since
   16-library-membership.

   Three membership clauses, ANDed: the item belongs to a source the reader
   currently follows; it is unplayed (`new` or `in-progress` — item-list.md);
   and playback does not hold it. Custody, not queue membership, is the test:
   an item dequeued to be played passed into the player's hands rather than
   back to the reader, and stays out; an item begun in an EARLIER session
   with the player idle is held by nobody and is listed — what is excluded is
   custody, not progress.

   QUALIFY, ORDER, THEN TAKE TEN — in that order and no other. Taking ten
   first and dropping the spoken-for ones afterwards is a different rule with
   a different answer: it would silently shrink the surface on exactly the
   day the reader had used it most, while items that plainly qualified sat
   below the cut unshown. Written in this order there is nowhere for the
   wrong version to hide.

   The order is `date-newest-first`, reached through the very same
   order-library-rows the library query answers through, so an item cannot
   sit in a different position in two places that both show the newest
   first — and its final tiebreak is what makes the BOUND determinate, since
   an undetermined order at the boundary is an undetermined tenth item."
  [state]
  (let [followed (followed-source-ids state)
        spoken-for (spoken-for-item-ids state)
        qualifying (->> (:items (item-list state))
                        (filter #(of-followed-source? % followed))
                        (filter unplayed?)
                        (remove #(contains? spoken-for (:item-id %))))]
    {:items (->> (order-library-rows qualifying "date-newest-first")
                 (take latest-bound)
                 vec)}))

(def ^:private live-ingest-states #{"requested" "fetching" "failed"})

(defn active-ingests
  "docs/contexts/ingestion/read-models/active-ingests.md — every ingest that
   is not yet done, oldest first; completed and discarded ingests drop out
   (since 03-web-articles)."
  [state]
  {:ingests (->> (vals (:ingests state))
                 (filter #(contains? live-ingest-states (:state %)))
                 ;; total key (11-item-ordering), as for every listing here
                 (sort-by (juxt :captured-at :ingest-id))
                 (mapv (fn [g]
                         (cond-> (select-keys g [:ingest-id :capture-kind
                                                 :display-name :state :captured-at])
                           (:reason g) (assoc :reason (:reason g))))))})

(defn ingest-status
  "docs/contexts/ingestion/read-models/ingest-status.md — the state of one
   ingest, answered from the active-ingests projection. Answers the
   `ingest-status` query."
  [state ingest-id]
  (->> (:ingests (active-ingests state))
       (filter #(= ingest-id (:ingest-id %)))
       first))

(defn player-view
  "docs/contexts/playback/read-models/player-view.md — what the player is
   doing right now. Answers the `now-playing` query. :speed is the effective
   one — the playing item's speed when it carries an override, the global
   setting otherwise. :voice-ids is the voice rotation — the picked voices in
   the order they are heard; since 15-voice-rotation it REPLACES the single
   string :voice-id (01…14, the one global default voice), and a reader who
   chose one voice reads back as an array of one. It is always the SETTING,
   never the voice of the item in hand — the effective voice is observable
   only in the heard speech (plan.md 08 spec notes, kept by 15).
   Since 10-sleep-chapters-history the item carries its :sections and the
   armed :sleep-timer shows {mode, remaining} — remaining is the armed
   duration (the live countdown is edge runtime, not folded state)."
  [state]
  (let [{player-state :state :keys [item-id position speed item-speed
                                    voice-rotation sleep-timer]}
        (:player state)]
    (cond-> {:state player-state :position position
             :speed (or item-speed speed 1)}
      (seq (:voice-ids voice-rotation)) (assoc :voice-ids (:voice-ids voice-rotation))
      item-id (assoc :item (let [item (get-in state [:items item-id])]
                             (cond-> (display-item item)
                               (:sections item) (assoc :sections (:sections item)))))
      sleep-timer (assoc :sleep-timer
                         (cond-> {:mode (:mode sleep-timer)}
                           (:duration sleep-timer)
                           (assoc :remaining (:duration sleep-timer)))))))

(defn listening-history
  "docs/contexts/playback/read-models/listening-history.md — recently played
   items, newest first: what was listened to and when, whether finished.
   Built from the :listens fold joined with the library items (a listen
   whose item is gone drops out). Since 10-sleep-chapters-history."
  [state]
  {:entries (->> (:listens state)
                 (keep (fn [[item-id {:keys [last-played-at finished]}]]
                         (when-let [item (get-in state [:items item-id])]
                           {:item-id item-id
                            :title (:title item)
                            :kind (:item-kind item)
                            :last-played-at last-played-at
                            :finished (boolean finished)})))
                 ;; total key (11-item-ordering): two items last played in
                 ;; the same instant keep a settled order
                 (sort-by (juxt :last-played-at :item-id) descending)
                 vec)})

(defn listening-stats
  "docs/contexts/playback/read-models/listening-stats.md — cumulative
   listening statistics: total time listened (content ÷ speed, seconds),
   items finished, time saved by playing above 1x, and when listening began.
   The fold's private :anchor stays out. Since 10-sleep-chapters-history."
  [state]
  (let [{:keys [total-listened items-finished time-saved-by-speed
                first-listened-at]} (:stats state)]
    (cond-> {:total-listened (or total-listened 0)
             :items-finished (or items-finished 0)
             :time-saved-by-speed (or time-saved-by-speed 0)}
      first-listened-at (assoc :first-listened-at first-listened-at))))

(defn format-duration
  "Estimated listening time for display: minutes, rounded up."
  [seconds]
  (str (max 1 (js/Math.ceil (/ seconds 60))) " min"))

(defn format-minutes
  "Accumulated listening time for display: whole rounded minutes
   (the stats page — since 10-sleep-chapters-history)."
  [seconds]
  (str (js/Math.round (/ seconds 60)) " min"))

(defn format-position
  "Elapsed listening time for display: m:ss."
  [seconds]
  (let [m (quot seconds 60)
        s (mod seconds 60)]
    (str m ":" (when (< s 10) "0") s)))

(def status-label
  "Display labels; the domain status `new` reads \"unplayed\" in the UI
   (the spec's word — decision in 06-library/decisions.md)."
  {"new" "unplayed" "in-progress" "in progress" "played" "played" "archived" "archived"})

(def kind-label
  {"pasted-text" "pasted text"
   "web-article" "web article"
   "podcast-episode" "podcast episode"
   "document" "document"})

(println "[views] loaded")
