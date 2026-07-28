;; Edge: speech synthesis. Two providers behind one small interface —
;; ElevenLabs (when the user saved an API key) and the browser's built-in
;; speechSynthesis as the zero-config fallback — plus a near-instant fake
;; provider selected when window.__printcastTestSpeech is set before load
;; (the e2e suite stubs audible speech; see ticket 06).
;;
;; Interface: (speak! chunks from-chunk {:on-chunk (fn [i]) :on-done (fn [])
;;                                       :rate 1.0 :voice "builtin:…"})
;;            (stop!)  (speaking?)  (fetch-voices! api-key)
;;            (init-voices!)  (available-voices)  (voice-name voice-id)
;; A generation counter invalidates stale async callbacks after stop!.
;; :rate (since 04-player-controls) is the playback speed: the built-in
;; provider sets the utterance rate (utterances are per-chunk, so re-speaking
;; recreates them at the new rate), ElevenLabs sets the audio element's
;; playbackRate, and the fake provider records it in the speech log.
;; :voice (since 08-voices-and-settings) is the resolved effective voice-id;
;; the provider prefix makes routing self-describing: "elevenlabs:<id>" +
;; a saved key → ElevenLabs with that voice, "builtin:<voiceURI>" → the
;; matching SpeechSynthesisVoice on the utterance, nil → the pre-08 behavior
;; (ElevenLabs default voice with a key, else the browser default). Every
;; speak entry in the speech log records :voice — the audible observable.
(ns speech
  (:require [clojure.string :as str]
            [state]
            [store]))

(def default-voice "21m00Tcm4TlvDq8ikWAM") ; ElevenLabs "Rachel"

(defonce ^:private generation (atom 0))
(defonce ^:private current-audio (atom nil))
(defonce ^:private active (atom false))

(defn speaking? [] @active)

(defn- test-config [] (.-__printcastTestSpeech js/window))

(defn- speech-log!
  "Observable trace of what the app asked the speech edge to do
   (asserted by the e2e suite; harmless in production)."
  [entry]
  (let [arr (or (.-__printcastSpeechLog js/window)
                (let [a (array)]
                  (set! (.-__printcastSpeechLog js/window) a)
                  a))]
    (.push arr (clj->js entry))))

;; -- fake provider (test hook) ----------------------------------------------

;; chunkMs is re-read before scheduling each chunk, so a test may adjust it
;; mid-run (e.g. raise it to freeze position drift before asserting).
(defn- fake-speak! [gen chunks from {:keys [on-chunk on-done]}]
  (letfn [(step [i]
            (when (= gen @generation)
              (if (>= i (count chunks))
                (on-done)
                (do (on-chunk i)
                    (js/setTimeout #(step (inc i))
                                   (or (some-> (test-config) .-chunkMs) 50))))))]
    (step from)))

;; -- built-in provider (window.speechSynthesis) -----------------------------

(defn- builtin-voice
  "The SpeechSynthesisVoice for a \"builtin:<voiceURI>\" id, when present."
  [synth voice]
  (when (and voice (str/starts-with? voice "builtin:"))
    (let [uri (subs voice (count "builtin:"))]
      (->> (.getVoices synth)
           (filter #(= uri (.-voiceURI %)))
           first))))

(defn- builtin-speak! [gen chunks from {:keys [on-chunk on-done rate voice]}]
  (let [synth (.-speechSynthesis js/window)
        v (builtin-voice synth voice)]
    (letfn [(step [i]
              (when (= gen @generation)
                (if (>= i (count chunks))
                  (on-done)
                  (let [u (js/SpeechSynthesisUtterance. (nth chunks i))]
                    (on-chunk i)
                    (set! (.-rate u) (or rate 1))
                    (when v (set! (.-voice u) v))
                    (set! (.-onend u)
                          (fn [_] (when (= gen @generation) (step (inc i)))))
                    (.speak synth u)))))]
      (step from))))

;; -- ElevenLabs provider (bring-your-own-key, CORS-open API) ----------------
;; POST /v1/text-to-speech/{voice}, model eleven_flash_v2_5, mp3_44100_128,
;; one request per chunk, played via an audio element
;; (docs/research/clipper-and-elevenlabs.md).

(defn- elevenlabs-speak! [gen chunks from {:keys [on-chunk on-done rate] :as opts} api-key voice-id]
  (letfn [(step [i]
            (when (= gen @generation)
              (if (>= i (count chunks))
                (on-done)
                (-> (js/fetch (str "https://api.elevenlabs.io/v1/text-to-speech/" voice-id
                                   "?output_format=mp3_44100_128")
                              (clj->js {:method "POST"
                                        :headers {"xi-api-key" api-key
                                                  "Content-Type" "application/json"}
                                        :body (js/JSON.stringify
                                               (clj->js {:text (nth chunks i)
                                                         :model_id "eleven_flash_v2_5"}))}))
                    (.then (fn [resp]
                             (if (.-ok resp)
                               (.blob resp)
                               (throw (js/Error. (str "ElevenLabs HTTP " (.-status resp)))))))
                    (.then (fn [blob]
                             (when (= gen @generation)
                               (let [url (js/URL.createObjectURL blob)
                                     audio (js/Audio. url)]
                                 (reset! current-audio audio)
                                 (set! (.-playbackRate audio) (or rate 1))
                                 (on-chunk i)
                                 (set! (.-onended audio)
                                       (fn [_]
                                         (js/URL.revokeObjectURL url)
                                         (when (= gen @generation) (step (inc i)))))
                                 (.play audio)))))
                    (.catch (fn [e]
                              (js/console.error "[speech] ElevenLabs failed; falling back to built-in speech" e)
                              (when (= gen @generation)
                                (builtin-speak! gen chunks i opts))))))))]
    (step from)))

;; -- public interface --------------------------------------------------------

(defn speak! [chunks from-chunk opts]
  (let [gen (swap! generation inc)
        voice (:voice opts)
        opts (update opts :on-done
                     (fn [f] (fn [] (reset! active false) (f))))]
    (reset! active true)
    (speech-log! {:op "speak" :fromChunk from-chunk :chunks chunks
                  :rate (or (:rate opts) 1) :voice voice})
    (cond
      (test-config)
      (fake-speak! gen chunks from-chunk opts)

      ;; provider-prefixed routing (since 08-voices-and-settings)
      (and voice (str/starts-with? voice "elevenlabs:") (store/elevenlabs-key))
      (elevenlabs-speak! gen chunks from-chunk opts
                         (store/elevenlabs-key)
                         (subs voice (count "elevenlabs:")))

      (and voice (str/starts-with? voice "builtin:"))
      (builtin-speak! gen chunks from-chunk opts)

      ;; no resolved voice: the pre-08 defaults
      (store/elevenlabs-key)
      (elevenlabs-speak! gen chunks from-chunk opts
                         (store/elevenlabs-key)
                         (or (store/elevenlabs-voice) default-voice))

      :else
      (builtin-speak! gen chunks from-chunk opts))))

(defn stop! []
  (swap! generation inc)
  (when @active
    (speech-log! {:op "stop"}))
  (reset! active false)
  (when-let [a @current-audio]
    (.pause a)
    (reset! current-audio nil))
  (when-let [synth (.-speechSynthesis js/window)]
    (.cancel synth)))

;; -- voice enumeration (since 08-voices-and-settings) ------------------------
;; An external capability read at the UI edge, not a domain read model
;; (plan.md "Assorted"): the platform's speech synthesis voices, merged with
;; the ElevenLabs list under provider-prefixed ids when a key is saved.

(defn- platform-voice-list
  "The platform's voices as {:voice-id :name :provider}: the fake provider's
   deterministic test list when the test hook is set, else the browser's
   speechSynthesis voices under \"builtin:<voiceURI>\" ids."
  []
  (if-let [cfg (test-config)]
    (mapv (fn [v] {:voice-id (.-id v) :name (.-name v) :provider "Platform"})
          (or (.-voices cfg) #js []))
    (if-let [synth (.-speechSynthesis js/window)]
      (mapv (fn [v] {:voice-id (str "builtin:" (.-voiceURI v))
                     :name (.-name v) :provider "Built-in"})
            (.getVoices synth))
      [])))

(defn init-voices!
  "Enumerate the platform voices into state/platform-voices, re-reading on
   voiceschanged (the async population quirk: Chrome returns [] until the
   event fires)."
  []
  (reset! state/platform-voices (platform-voice-list))
  (when-let [synth (.-speechSynthesis js/window)]
    (.addEventListener synth "voiceschanged"
                       (fn [_] (reset! state/platform-voices (platform-voice-list))))))

(defn available-voices
  "The merged, provider-grouped voice list for the voice selects: platform
   voices, then the ElevenLabs voices under \"elevenlabs:<id>\" ids when a
   key is saved."
  []
  (vec (concat @state/platform-voices
               (when (store/elevenlabs-key)
                 (mapv (fn [{:keys [voice-id name]}]
                         {:voice-id (str "elevenlabs:" voice-id)
                          :name name :provider "ElevenLabs"})
                       @state/elevenlabs-voices)))))

(defn voice-name
  "The display name for a voice-id, falling back to the id itself (a voice
   may disappear from the platform between sessions)."
  [voice-id]
  (or (->> (available-voices)
           (filter #(= voice-id (:voice-id %)))
           first
           :name)
      voice-id))

(defn fetch-voices!
  "GET /v2/voices with the user's key; fills state/elevenlabs-voices for the
   settings dropdown."
  [api-key]
  (-> (js/fetch "https://api.elevenlabs.io/v2/voices"
                (clj->js {:headers {"xi-api-key" api-key}}))
      (.then (fn [resp] (if (.-ok resp) (.json resp) (throw (js/Error. (str "HTTP " (.-status resp)))))))
      (.then (fn [data]
               (reset! state/elevenlabs-voices
                       (->> (.-voices data)
                            (mapv (fn [v] {:voice-id (.-voice_id v) :name (.-name v)}))))))
      (.catch (fn [e] (js/console.error "[speech] fetching voices failed" e)))))

(println "[speech] loaded")
