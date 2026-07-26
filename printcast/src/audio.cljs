;; Edge: audio-recording playback (podcast episodes, since 05-podcast-feeds).
;; One js/Audio element behind the same interface shape as speech: play! from
;; a position in seconds, stop!, seek!, set-rate!, playing?. A generation
;; counter invalidates stale callbacks after stop! (speech.cljs convention).
;;
;; Test seams (documented; no user interaction is faked):
;; - window.__printcastTestAudio = {rateFactor} multiplies the playbackRate
;;   (capped at Chromium's 16x) so a short fixture recording reaches its end
;;   quickly — playback itself is real <audio> playback;
;; - window.__printcastAudioLog mirrors the speech-log convention: what the
;;   app asked this edge to do (play/seek/stop entries).
(ns audio)

(def max-playback-rate 16)                       ; Chromium's supported ceiling

(defonce ^:private generation (atom 0))
(defonce ^:private element (atom nil))
(defonce ^:private active (atom false))

(defn playing? [] @active)

(defn- test-config [] (.-__printcastTestAudio js/window))

(defn- rate-factor [] (or (some-> (test-config) .-rateFactor) 1))

(defn- audio-log!
  "Observable trace of what the app asked the audio edge to do
   (asserted by the e2e suite; harmless in production)."
  [entry]
  (let [arr (or (.-__printcastAudioLog js/window)
                (let [a (array)]
                  (set! (.-__printcastAudioLog js/window) a)
                  a))]
    (.push arr (clj->js entry))))

(defn- apply-rate! [el rate]
  (set! (.-playbackRate el)
        (min max-playback-rate (* (or rate 1) (rate-factor)))))

(defn position-seconds
  "Whole seconds of audio time the current recording is at."
  []
  (if-let [el @element]
    (js/Math.floor (.-currentTime el))
    0))

(defn play!
  "Play the recording at `url` from `from-seconds`. :on-position is called
   with whole seconds on every timeupdate; :on-done when the recording ends."
  [url from-seconds {:keys [rate on-position on-done]}]
  (let [gen (swap! generation inc)
        el (js/Audio. url)]
    (reset! element el)
    (reset! active true)
    (audio-log! {:op "play" :url url :fromSeconds (or from-seconds 0)
                 :rate (or rate 1)})
    ;; before metadata loads this sets the default playback start position
    (set! (.-currentTime el) (or from-seconds 0))
    (apply-rate! el rate)
    (.addEventListener el "timeupdate"
                       (fn [_]
                         (when (and (= gen @generation) on-position)
                           (on-position (js/Math.floor (.-currentTime el))))))
    (.addEventListener el "ended"
                       (fn [_]
                         (when (= gen @generation)
                           (reset! active false)
                           (when on-done (on-done)))))
    (-> (.play el)
        (.catch (fn [e] (js/console.error "[audio] play failed" e))))))

(defn stop! []
  (swap! generation inc)
  (when @active
    (audio-log! {:op "stop"}))
  (reset! active false)
  (when-let [el @element]
    (.pause el)
    (reset! element nil)))

(defn seek!
  "Move the live recording to `seconds` (audio time)."
  [seconds]
  (when-let [el @element]
    (audio-log! {:op "seek" :seconds seconds})
    (set! (.-currentTime el) seconds)))

(defn set-rate!
  "Change the live recording's playback speed."
  [rate]
  (when-let [el @element]
    (apply-rate! el rate)))

(println "[audio] loaded")
