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

(defn queue-view
  "docs/contexts/playback/read-models/queue-view.md — the queue in play order.
   Answers the `up-next` query."
  [state]
  {:items (mapv (fn [item-id] (display-item (get-in state [:items item-id])))
                (:queue state))})

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
                              :position 0
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

(def status-label
  {"new" "new" "in-progress" "in progress" "played" "played" "archived" "archived"})

(def kind-label
  {"pasted-text" "pasted text"
   "web-article" "web article"
   "podcast-episode" "podcast episode"
   "document" "document"})

(println "[views] loaded")
