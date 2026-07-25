;; Edge: the dispatcher. decide → refuse | (append to log → evolve → effects →
;; policies), all synchronously. Fills the x-default fields (fresh ids, now)
;; before decide so the domain stays pure (WAY-OF-WORKING §4).
(ns dispatch
  (:require [domain]
            [state]
            [store]
            [speech]
            [fetcher]))

(defn- now-iso [] (.toISOString (js/Date.)))
(defn- new-id [] (str (random-uuid)))

(declare dispatch!)

(defn- start-speech!
  "Effect: speak the item's sentence chunks from the given chunk index.
   Each chunk boundary is the periodic progress process (ticket 06): it
   dispatches record-position so positions survive across sessions."
  [item-id position]
  (let [content (get-in @state/app-state [:items item-id :content])
        chunks (domain/chunks (or content ""))]
    (reset! state/speech-position position)
    (speech/speak! chunks position
                   {:rate (get-in @state/app-state [:player :speed] 1)
                    :on-chunk (fn [i]
                                (reset! state/speech-position i)
                                (dispatch! {:kind "record-position" :position i}))
                    :on-done #(dispatch! {:kind "finish-item"})})))

(defn- restart-speech!
  "Re-speak the current item from the given chunk (seek/skip while playing,
   or a speed change: utterances are recreated at the new rate). Only when
   speech is actually running — paused/idle positions are picked up by the
   next playback-started/-resumed."
  [position]
  (let [{player-state :state :keys [item-id]} (:player @state/app-state)]
    (when (and (= "playing" player-state) (speech/speaking?))
      (speech/stop!)
      (start-speech! item-id position))))

(defn- run-effects!
  "Side effects at the edges; business logic stays in the deciders (§9)."
  [event]
  (case (:kind event)
    "playback-started" (start-speech! (:item-id event) (:position event))
    "playback-resumed" (start-speech! (:item-id event) (:position event))
    "playback-paused"  (speech/stop!)
    "item-finished"    (speech/stop!)
    ;; seek/skip while playing move the live speech; record-position events
    ;; never restart because on-chunk updates the live chunk index first
    "position-changed" (when (and (= (:item-id event)
                                     (get-in @state/app-state [:player :item-id]))
                                  (not= (:position event) @state/speech-position))
                         (restart-speech! (:position event)))
    ;; a speed change takes effect from the current position
    "speed-changed"    (restart-speech! @state/speech-position)
    ;; fetch execution (docs/contexts/ingestion policy, edge process):
    ;; a captured or retried URL enters the fetch
    "url-captured"     (fetcher/begin! (:ingest-id event) (:url event) dispatch!)
    "ingest-retried"   (fetcher/begin! (:ingest-id event)
                                       (get-in @state/app-state
                                               [:ingests (:ingest-id event) :url])
                                       dispatch!)
    nil))

(defn- with-defaults
  "x-default fields (random-uuid, now) and edge enrichment: pause carries the
   live speech chunk index (mid-chunk pauses can sit ahead of the last
   recorded position)."
  [intent]
  (cond-> (assoc intent :at (now-iso))
    (and (contains? #{"capture-text" "capture-url"} (:kind intent))
         (nil? (:ingest-id intent)))
    (assoc :ingest-id (new-id))

    (and (= "pause" (:kind intent)) (speech/speaking?))
    (assoc :position @state/speech-position)))

(defn dispatch!
  "Run an intent against the current state; on acceptance append its events to
   the localStorage log, fold them into the app state, run effects, then any
   policy follow-up intents. Refusals change nothing."
  [intent]
  (let [intent (with-defaults intent)
        result (domain/decide @state/app-state intent)]
    (if-not (:ok? result)
      (js/console.warn "[dispatch] refused" (:kind intent) "—" (:reason result))
      (doseq [event (:events result)]
        (swap! state/app-state domain/evolve event)
        (store/append-event! event)
        (run-effects! event)
        (doseq [follow-up (domain/policies @state/app-state event new-id)]
          (dispatch! follow-up))))
    result))

(defn press-play!
  "The player button: idle → play-from-queue policy (take-next → play);
   playing → pause; paused → resume."
  []
  (case (get-in @state/app-state [:player :state])
    "idle"    (dispatch! {:kind "take-next"})
    "playing" (dispatch! {:kind "pause"})
    "paused"  (dispatch! {:kind "resume"})))

(println "[dispatch] loaded")
