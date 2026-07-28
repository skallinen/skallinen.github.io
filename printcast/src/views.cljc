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

(defn- library-row-visible?
  "The library-items filter block (all clauses AND together). Without a
   status filter archived items stay out of view — archived means \"out of
   active views\" (item-archived.md; decision in 06-library/decisions.md)."
  [row {:keys [status kind starred source-id]}]
  (and (if status
         (= status (:status row))
         (not= "archived" (:status row)))
       (or (nil? kind) (= kind (:kind row)))
       (or (nil? starred) (= starred (:starred row)))
       (or (nil? source-id) (= source-id (get-in row [:origin :source-id])))))

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
  "docs/contexts/library/read-models/library-items.md — the query: item-list
   rows, optionally filtered (status | kind | starred | source-id) and
   ordered (default date-newest-first, over the item's own date). Since
   06-library; the two date choices redefined since 11-item-ordering."
  ([state] (library-items state nil))
  ([state {row-filter :filter sort-key :sort}]
   {:items (-> (->> (:items (item-list state))
                    (filter #(library-row-visible? % row-filter)))
               (order-library-rows sort-key))}))

(defn source-list
  "docs/contexts/library/read-models/source-list.md — followed sources with
   display metadata (assembled from feed ingests), oldest subscription first;
   removed sources drop out. Answers the `library-sources` query. Since
   05-podcast-feeds."
  [state]
  {:sources (->> (vals (:sources state))
                 (filter #(= "active" (:state %)))
                 ;; total key (11-item-ordering): sources subscribed in the
                 ;; same instant are still settled relative to each other
                 (sort-by (juxt :subscribed-at :source-id))
                 (mapv #(select-keys % [:source-id :feed-url :title :author
                                        :artwork-url :subscribed-at
                                        ;; per-source overrides, when set
                                        ;; (since 08-voices-and-settings)
                                        :voice-id :speed])))})

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
   setting otherwise; :voice-id is always the global default (the effective
   voice is observable only in the heard speech — plan.md 08 spec notes).
   Since 10-sleep-chapters-history the item carries its :sections and the
   armed :sleep-timer shows {mode, remaining} — remaining is the armed
   duration (the live countdown is edge runtime, not folded state)."
  [state]
  (let [{player-state :state :keys [item-id position speed item-speed voice-id
                                    sleep-timer]}
        (:player state)]
    (cond-> {:state player-state :position position
             :speed (or item-speed speed 1)}
      voice-id (assoc :voice-id voice-id)
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
