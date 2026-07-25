;; Edge: the dispatcher. decide → refuse | (append to log → evolve → effects →
;; policies), all synchronously. Fills the x-default fields (fresh ids, now)
;; before decide so the domain stays pure (WAY-OF-WORKING §4).
(ns dispatch
  (:require [domain]
            [state]
            [store]
            [speech]))

(defn- now-iso [] (.toISOString (js/Date.)))
(defn- new-id [] (str (random-uuid)))

(declare dispatch!)

(defn- start-speech!
  "Effect: speak the item's sentence chunks from the given chunk index."
  [item-id position]
  (let [content (get-in @state/app-state [:items item-id :content])
        chunks (domain/chunks (or content ""))]
    (reset! state/speech-position position)
    (speech/speak! chunks position
                   {:on-chunk #(reset! state/speech-position %)
                    :on-done #(dispatch! {:kind "finish-item"})})))

(defn- run-effects!
  "Side effects at the edges; business logic stays in the deciders (§9)."
  [event]
  (case (:kind event)
    "playback-started" (start-speech! (:item-id event) (:position event))
    "playback-resumed" (start-speech! (:item-id event) (:position event))
    "playback-paused"  (speech/stop!)
    "item-finished"    (speech/stop!)
    nil))

(defn- with-defaults
  "x-default fields (random-uuid, now) and edge enrichment: pause carries the
   live speech chunk index (record-position arrives in 02-queue-management)."
  [intent]
  (cond-> (assoc intent :at (now-iso))
    (and (= "capture-text" (:kind intent)) (nil? (:ingest-id intent)))
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
