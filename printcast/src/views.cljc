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
   its lifecycle status, in added order. Answers the `library-items` query."
  [state]
  {:items (->> (vals (:items state))
               (sort-by :added-at)
               (mapv (fn [item]
                       (cond-> (assoc (display-item item)
                                      :status (:status item)
                                      :starred false
                                      :position (or (:position item) 0)
                                      :added-at (:added-at item))
                         (:origin item) (assoc :origin (:origin item))
                         (:published-at item) (assoc :published-at (:published-at item))))))})

(defn source-list
  "docs/contexts/library/read-models/source-list.md — followed sources with
   display metadata (assembled from feed ingests), oldest subscription first;
   removed sources drop out. Answers the `library-sources` query. Since
   05-podcast-feeds."
  [state]
  {:sources (->> (vals (:sources state))
                 (filter #(= "active" (:state %)))
                 (sort-by :subscribed-at)
                 (mapv #(select-keys % [:source-id :feed-url :title :author
                                        :artwork-url :subscribed-at])))})

(def ^:private live-ingest-states #{"requested" "fetching" "failed"})

(defn active-ingests
  "docs/contexts/ingestion/read-models/active-ingests.md — every ingest that
   is not yet done, oldest first; completed and discarded ingests drop out
   (since 03-web-articles)."
  [state]
  {:ingests (->> (vals (:ingests state))
                 (filter #(contains? live-ingest-states (:state %)))
                 (sort-by :captured-at)
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
   doing right now. Answers the `now-playing` query."
  [state]
  (let [{player-state :state :keys [item-id position speed]} (:player state)]
    (cond-> {:state player-state :position position :speed (or speed 1)}
      item-id (assoc :item (display-item (get-in state [:items item-id]))))))

(defn format-duration
  "Estimated listening time for display: minutes, rounded up."
  [seconds]
  (str (max 1 (js/Math.ceil (/ seconds 60))) " min"))

(defn format-position
  "Elapsed listening time for display: m:ss."
  [seconds]
  (let [m (quot seconds 60)
        s (mod seconds 60)]
    (str m ":" (when (< s 10) "0") s)))

(def status-label
  {"new" "new" "in-progress" "in progress" "played" "played" "archived" "archived"})

(def kind-label
  {"pasted-text" "pasted text"
   "web-article" "web article"
   "podcast-episode" "podcast episode"
   "document" "document"})

(println "[views] loaded")
