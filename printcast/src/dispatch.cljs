;; Edge: the dispatcher. decide → refuse | (append to log → evolve → effects →
;; policies), all synchronously. Fills the x-default fields (fresh ids, now)
;; before decide so the domain stays pure (WAY-OF-WORKING §4).
(ns dispatch
  (:require [domain]
            [state]
            [store]
            [speech]
            [audio]
            [fetcher]))

(defn- now-iso [] (.toISOString (js/Date.)))
(defn- new-id [] (str (random-uuid)))

(declare dispatch!)

(defn- live-speed
  "The speed the current item plays/speaks at: its effective speed while it
   plays (:item-speed, since 08-voices-and-settings), else the global."
  []
  (let [{:keys [item-speed speed]} (:player @state/app-state)]
    (or item-speed speed 1)))

(defn- start-speech!
  "Effect: speak the item's sentence chunks from the given chunk index.
   Each chunk boundary is the periodic progress process (ticket 06): it
   dispatches record-position so positions survive across sessions.
   The effective voice and the live speed are recomputed from the folded
   state at every (re)start (since 08-voices-and-settings)."
  [item-id position]
  (let [content (get-in @state/app-state [:items item-id :content])
        chunks (domain/chunks (or content ""))]
    (reset! state/speech-position position)
    (speech/speak! chunks position
                   {:rate (live-speed)
                    :voice (domain/effective-voice @state/app-state item-id)
                    :on-chunk (fn [i]
                                (reset! state/speech-position i)
                                (dispatch! {:kind "record-position" :position i}))
                    :on-done #(dispatch! {:kind "finish-item"})})))

(def ^:private record-position-every-seconds
  "Recordings dispatch record-position at most this often (event-volume
   decision, ticket 04) — speech records per chunk instead."
  5)

(defonce ^:private last-recorded-second (atom 0))

(defn- start-audio!
  "Effect: play the item's recording from the given second. timeupdate keeps
   the live seconds atom current and records the position every ~5 s;
   'ended' finishes the item into the continuous-playback policy."
  [item-id position]
  (reset! state/audio-seconds position)
  (reset! last-recorded-second position)
  (audio/play! (get-in @state/app-state [:items item-id :recording-url]) position
               {:rate (live-speed)
                :on-position (fn [secs]
                               (reset! state/audio-seconds secs)
                               (when (>= (- secs @last-recorded-second)
                                         record-position-every-seconds)
                                 (reset! last-recorded-second secs)
                                 (dispatch! {:kind "record-position" :position secs})))
                :on-done #(dispatch! {:kind "finish-item"})}))

(defn- start-playback!
  "Route the started/resumed item to its edge: recordings to the audio
   element, everything else to speech."
  [item-id position]
  (if (domain/recording? (get-in @state/app-state [:items item-id]))
    (start-audio! item-id position)
    (start-speech! item-id position)))

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
    "playback-started" (start-playback! (:item-id event) (:position event))
    "playback-resumed" (start-playback! (:item-id event) (:position event))
    "playback-paused"  (do (speech/stop!) (audio/stop!))
    "item-finished"    (do (speech/stop!) (audio/stop!))
    ;; seek/skip while playing move the live playback (a seek on the audio
    ;; element, a re-speak from the chunk for text); record-position events
    ;; never seek/restart because the edge updates the live position first
    "position-changed" (when (= (:item-id event)
                                (get-in @state/app-state [:player :item-id]))
                         (if (domain/recording?
                              (get-in @state/app-state [:items (:item-id event)]))
                           (when (and (audio/playing?)
                                      (not= (:position event) @state/audio-seconds))
                             (reset! state/audio-seconds (:position event))
                             (audio/seek! (:position event)))
                           (when (not= (:position event) @state/speech-position)
                             (restart-speech! (:position event)))))
    ;; a speed change takes effect from the current position: live on the
    ;; audio element, a re-speak at the new rate for speech
    "speed-changed"    (if (audio/playing?)
                         (audio/set-rate! (:speed event))
                         (restart-speech! @state/speech-position))
    ;; a default-voice change takes effect from the current position — but
    ;; only when it can alter the heard voice: speech must be running and the
    ;; new default must be what the current item resolves to (a recording, or
    ;; a source whose override wins, restarts nothing — ticket 01)
    "voice-set"        (let [item-id (get-in @state/app-state [:player :item-id])]
                         (when (and item-id
                                    (= (:voice-id event)
                                       (domain/effective-voice @state/app-state item-id)))
                           (restart-speech! @state/speech-position)))
    ;; fetch execution (docs/contexts/ingestion policy, edge process):
    ;; a captured or retried URL/feed enters the fetch
    "url-captured"     (fetcher/begin! (:ingest-id event) (:url event) dispatch!)
    "feed-captured"    (fetcher/begin-feed! (:ingest-id event) (:feed-url event)
                                            (:source-id event) dispatch!)
    "document-captured" (fetcher/begin-document! (:ingest-id event)
                                                 (:document-ref event)
                                                 (:file-name event) dispatch!)
    "ingest-retried"   (let [g (get-in @state/app-state [:ingests (:ingest-id event)])]
                         (cond
                           (:feed-url g)
                           (fetcher/begin-feed! (:ingest-id event) (:feed-url g)
                                                (:source-id g) dispatch!)

                           (:document-ref g)
                           (fetcher/begin-document! (:ingest-id event) (:document-ref g)
                                                    (:file-name g) dispatch!)

                           :else
                           (fetcher/begin! (:ingest-id event) (:url g) dispatch!)))
    nil))

(defn- with-defaults
  "x-default fields (random-uuid, now) and edge enrichment: pause carries the
   live position (speech chunk index, or the recording's current second)."
  [intent]
  (cond-> (assoc intent :at (now-iso))
    (and (contains? #{"capture-text" "capture-url" "capture-feed" "capture-document"}
                    (:kind intent))
         (nil? (:ingest-id intent)))
    (assoc :ingest-id (new-id))

    (and (= "subscribe-source" (:kind intent)) (nil? (:source-id intent)))
    (assoc :source-id (new-id))

    (and (= "pause" (:kind intent)) (speech/speaking?))
    (assoc :position @state/speech-position)

    (and (= "pause" (:kind intent)) (audio/playing?))
    (assoc :position (audio/position-seconds))))

(defonce ^:private dispatch-depth (atom 0))

(defn dispatch!
  "Run an intent against the current state; on acceptance append its events to
   the event log, fold them into the app state, run effects, then any policy
   follow-up intents. The log is persisted once per outermost dispatch (a
   feed ingest cascades into ~1000 follow-ups; per-event persistence is
   O(n²) — decisions.md). Refusals change nothing."
  [intent]
  (swap! dispatch-depth inc)
  (try
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
      result)
    (finally
      (when (zero? (swap! dispatch-depth dec))
        (store/flush!)))))

(defn press-play!
  "The player button: idle → play-from-queue policy (take-next → play);
   playing → pause; paused → resume."
  []
  (case (get-in @state/app-state [:player :state])
    "idle"    (dispatch! {:kind "take-next"})
    "playing" (dispatch! {:kind "pause"})
    "paused"  (dispatch! {:kind "resume"})))

(println "[dispatch] loaded")
