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

;; -- Sleep timer (since 10-sleep-chapters-history) ---------------------------
;; The countdown is an EDGE process — deciders stay pure. It ticks seconds of
;; *listening* (only while the player is playing) and, elapsed, plays the
;; sleep-timer-expiry policy: dispatch expire-sleep-timer. The documented
;; test hook window.__printcastTestClock = {multiplier} scales seconds per
;; tick so a 15-minute timer elapses in a few seconds; the pause itself is
;; never faked.

(defonce ^:private sleep-interval (atom nil))

(defn- stop-countdown! []
  (when-let [t @sleep-interval]
    (js/clearInterval t)
    (reset! sleep-interval nil))
  (reset! state/sleep-seconds-left nil))

(defn- clock-multiplier []
  (or (some-> (.-__printcastTestClock js/window) .-multiplier) 1))

(defn- start-countdown! [duration]
  (stop-countdown!)                     ; setting a timer again replaces it
  (reset! state/sleep-seconds-left duration)
  (reset! sleep-interval
          (js/setInterval
           (fn []
             (when (= "playing" (get-in @state/app-state [:player :state]))
               (let [left (swap! state/sleep-seconds-left - (clock-multiplier))]
                 (when (<= left 0)
                   (dispatch! {:kind "expire-sleep-timer"})))))
           1000)))

(defn reconcile-sleep-timer!
  "Boot reconcile: a duration timer replayed as armed restarts its countdown
   from the full duration — remaining is edge runtime, not persisted
   (decision in decisions.md). It ticks only once playback resumes; an
   end-of-item timer needs no process (the rendition-end routing below
   reads the folded state)."
  []
  (let [{:keys [mode duration]} (get-in @state/app-state [:player :sleep-timer])]
    (when (= "duration" mode)
      (start-countdown! duration))))

(defn- rendition-ended!
  "The speech/recording-completion report (edge policy). Normally it issues
   finish-item; with an end-of-item sleep timer armed the sleep-timer-expiry
   policy takes the report instead: expire-sleep-timer while the player is
   still playing (the statechart transition, pausing at the very end), then
   mark-played for the item — the auto-mark-played observable without
   item-finished, so continuous playback never takes the next queued item
   (ordering left to implementation by plan.md's spec notes; decision in
   decisions.md)."
  []
  (let [{:keys [item-id sleep-timer]} (:player @state/app-state)]
    (if (= "end-of-item" (:mode sleep-timer))
      (do (dispatch! {:kind "expire-sleep-timer"})
          (dispatch! {:kind "mark-played" :item-id item-id}))
      (dispatch! {:kind "finish-item"}))))

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
                    :on-done rendition-ended!})))

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
                :on-done rendition-ended!}))

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
    ;; the sleep countdown edge process follows the timer's lifecycle: a
    ;; duration timer (re)starts it (set-again replaces), an end-of-item
    ;; timer needs none, cancel/expiry stop it (since 10)
    "sleep-timer-set"  (if (= "duration" (:mode event))
                         (start-countdown! (:duration event))
                         (stop-countdown!))
    "sleep-timer-cancelled" (stop-countdown!)
    "sleep-timer-expired"   (stop-countdown!)
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
  "x-default fields (random-uuid, now) and edge enrichment: the intents that
   stop playback carry the live position (speech chunk index, or the
   recording's current second)."
  [intent]
  (let [;; pause and sleep-timer expiry both stop where the listener is now —
        ;; elapsed-ness is the edge's to know, the deciders have no clock
        stops-playback? (contains? #{"pause" "expire-sleep-timer"} (:kind intent))]
    (cond-> (assoc intent :at (now-iso))
      (and (contains? #{"capture-text" "capture-url" "capture-feed" "capture-document"}
                      (:kind intent))
           (nil? (:ingest-id intent)))
      (assoc :ingest-id (new-id))

      (and (= "subscribe-source" (:kind intent)) (nil? (:source-id intent)))
      (assoc :source-id (new-id))

      (and stops-playback? (speech/speaking?))
      (assoc :position @state/speech-position)

      (and stops-playback? (audio/playing?))
      (assoc :position (audio/position-seconds)))))

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
