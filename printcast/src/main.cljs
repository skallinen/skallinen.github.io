;; Entry point: replay the event log through the evolvers, mount the UI.
(ns main
  (:require [reagent.dom :as rdom]
            [domain]
            [state]
            [store]
            [speech]
            [fetcher]
            [dispatch]
            [ui]))

(defn init []
  ;; Replay needs no intents (WAY-OF-WORKING §4.2)
  (reset! state/app-state (domain/fold domain/init-state (store/load-events)))
  ;; A reload mid-play leaves the log saying "playing" while no speech runs:
  ;; reconcile by pausing at the last known position (decision in decisions.md)
  (when (= "playing" (get-in @state/app-state [:player :state]))
    (dispatch/dispatch! {:kind "pause"}))
  ;; A reload mid-fetch leaves url ingests stuck requested/fetching with no
  ;; edge process running: re-enter the fetch (decision in decisions.md)
  (doseq [{:keys [ingest-id url] lifecycle :state} (vals (:ingests @state/app-state))
          :when url]
    (case lifecycle
      "requested" (fetcher/begin! ingest-id url dispatch/dispatch!)
      "fetching"  (fetcher/resume! ingest-id url dispatch/dispatch!)
      nil))
  (when-let [k (store/elevenlabs-key)]
    (speech/fetch-voices! k))
  (rdom/render [ui/app] (.getElementById js/document "app")))

(init)

(println "[main] loaded")
