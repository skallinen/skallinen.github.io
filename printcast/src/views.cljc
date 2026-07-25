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
   heard (estimated from the consumed chunks — since 02-queue-management)."
  [item]
  (max 0 (- (:duration-estimate item)
            (domain/elapsed-seconds (or (:content item) "")
                                    (or (:position item) 0)))))

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
                       (assoc (display-item item)
                              :status (:status item)
                              :starred false
                              :position (or (:position item) 0)
                              :added-at (:added-at item)))))})

(defn player-view
  "docs/contexts/playback/read-models/player-view.md — what the player is
   doing right now. Answers the `now-playing` query."
  [state]
  (let [{player-state :state :keys [item-id position]} (:player state)]
    (cond-> {:state player-state :position position}
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
