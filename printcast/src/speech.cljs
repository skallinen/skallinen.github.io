;; Edge: speech synthesis. Two providers behind one small interface —
;; ElevenLabs (when the user saved an API key) and the browser's built-in
;; speechSynthesis as the zero-config fallback — plus a near-instant fake
;; provider selected when window.__printcastTestSpeech is set before load
;; (the e2e suite stubs audible speech; see ticket 06).
;;
;; Interface: (speak! chunks from-chunk {:on-chunk (fn [i]) :on-done (fn [])
;;                                       :rate 1.0 :voice "builtin:…"
;;                                       :item-id "…"})
;;            (stop!)  (drop-made-ready!)  (speaking?)  (fetch-voices! api-key)
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
            [domain]
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
;;
;; Two opt-in seam additions (since 19-the-next-sentence-is-ready, ticket 04),
;; both additive, both off unless the hook asks:
;; - makeReadyMs — how long acquiring a sentence's speech takes before it can
;;   play, distinct from the playing duration (chunkMs). Models a voice
;;   reached through a configured service, where making a sentence ready
;;   takes a noticeable moment. Re-read per acquisition, like chunkMs.
;; - logSentences — per-sentence, timestamped speech-log entries:
;;   {op "making-ready", chunk, text, t, at} when acquiring a sentence's
;;   speech begins, and {op "playing", chunk, reused, t, at} when the
;;   sentence begins playing (reused = it played from what was already in
;;   hand, no request issued). t is performance.now(), at is an ISO string
;;   on the same clock the event log's :at uses.
;; A run that sets neither knob gets a provider that behaves exactly as
;; before and a speech log byte-identical in shape to the pre-19 one.
(defn- fake-make-ready-ms [] (or (some-> (test-config) .-makeReadyMs) 0))
(defn- fake-log-sentences? [] (boolean (some-> (test-config) .-logSentences)))

(defn- sentence-log!
  "A per-sentence speech-log entry, timestamped on both clocks (the
   monotonic one for gaps, the wall one for ordering against event :at)."
  [entry]
  (speech-log! (assoc entry
                      :t (.now js/performance)
                      :at (.toISOString (js/Date.)))))

;; -- speech made ready (since 19-the-next-sentence-is-ready) -----------------
;; While one sentence is read aloud, the ones after it are made ready, and
;; speech once made ready is not made again while the reader stays on the
;; item. The clips live HERE, in memory, per item — never in the event log
;; (HANDOVER §8 decision 6; a clip is completely determined by text + voice,
;; which the log already holds) — and are let go whole when playback moves to
;; another item or the item finishes. WHICH sentences to make ready is the
;; pure rule domain/sentences-to-make-ready; this is only the book-keeping.

(defonce ^:private made-ready (atom {:item ::none :clips {} :in-flight {}}))

(defn- revoke-clip! [clip]
  (when (and (string? clip) (str/starts-with? clip "blob:"))
    (js/URL.revokeObjectURL clip)))

(defn drop-made-ready!
  "Let everything made ready for the current item go, whole — object URLs
   and all. Called when playback moves to another item or the item finishes;
   never on pause, whose resume is precisely what the clips are kept for."
  []
  (doseq [clip (vals (:clips @made-ready))]
    (revoke-clip! clip))
  (reset! made-ready {:item ::none :clips {} :in-flight {}}))

(defn- ensure-clip-item!
  "The per-item scope: the clips belong to the item being played, so another
   item's speak! drops the previous item's before anything else happens."
  [item-id]
  (when (not= item-id (:item @made-ready))
    (drop-made-ready!)
    (swap! made-ready assoc :item item-id)))

(defn- clip-key [chunks i voice]
  (domain/speech-clip-key (nth chunks i) voice))

(defn- in-hand-indices
  "The sentence indices already made ready or already in flight, for the
   pure window rule."
  [chunks voice]
  (let [{:keys [clips in-flight]} @made-ready]
    (set (filter (fn [i]
                   (let [k (clip-key chunks i voice)]
                     (or (contains? clips k) (contains? in-flight k))))
                 (range (count chunks))))))

(defn- acquire-clip!
  "The clip for sentence i: from hand, from flight, or freshly requested —
   logging a making-ready entry only when a request actually begins.
   Returns {:reused bool :promise p}. A sentence already being made ready
   when the reader stops may finish and is kept (it is paid for either way);
   one completing after the item has moved on is not kept. A failed request
   leaves nothing behind, so the playhead arriving later asks freshly."
  [chunks i voice request-fn log?]
  (let [k (clip-key chunks i voice)
        {:keys [item clips in-flight]} @made-ready]
    (cond
      (contains? clips k)
      {:reused true :promise (js/Promise.resolve (get clips k))}

      (contains? in-flight k)
      {:reused true :promise (get in-flight k)}

      :else
      (do (when log?
            (sentence-log! {:op "making-ready" :chunk i :text (nth chunks i)}))
          (let [p (-> (request-fn (nth chunks i))
                      (.then (fn [clip]
                               (if (= item (:item @made-ready))
                                 (swap! made-ready
                                        #(-> %
                                             (assoc-in [:clips k] clip)
                                             (update :in-flight dissoc k)))
                                 (revoke-clip! clip))
                               clip))
                      (.catch (fn [e]
                                (swap! made-ready update :in-flight dissoc k)
                                (throw e))))]
            (swap! made-ready assoc-in [:in-flight k] p)
            {:reused false :promise p})))))

(defn- look-ahead!
  "While sentence i plays, begin making ready the ones after it (the depth-2
   window the pure rule computes). A look-ahead failure is no failure at all
   unless the playhead reaches that sentence — the rejection is dropped here,
   and the arriving playhead asks freshly and falls back as it always did."
  [chunks i voice request-fn log?]
  (doseq [j (domain/sentences-to-make-ready (count chunks) i
                                            (in-hand-indices chunks voice)
                                            domain/make-ready-depth)]
    (-> (:promise (acquire-clip! chunks j voice request-fn log?))
        (.catch (fn [_])))))

(defn- begin-sentence!
  "The sentence boundary, in the one order every made-ready provider owes
   the reader (tickets 01 + 05): sound first, then the ones after it made
   ready while it plays, and the record — with the whole-log write it
   flushes — behind sound already playing, never in the silence in front
   of it. Both providers cross every boundary through here, so the ordering
   cannot diverge between the suite's provider and the reader's."
  [start-sound! {:keys [chunks i reused voice request-fn log? on-chunk]}]
  (start-sound!)
  (when log?
    (sentence-log! {:op "playing" :chunk i :reused reused}))
  (look-ahead! chunks i voice request-fn log?)
  (on-chunk i))

;; The fake provider runs the same look-ahead and reuse machinery as the
;; configured-service path, so the suite locks down the loop's shape, not
;; the vendor: acquiring takes makeReadyMs (a timer standing in for the
;; round trip), playing takes chunkMs.
(defn- fake-request-fn []
  (fn [_text]
    (js/Promise.
     (fn [resolve _]
       (let [d (fake-make-ready-ms)]
         (if (pos? d)
           (js/setTimeout #(resolve true) d)
           (resolve true)))))))

(defn- fake-speak! [gen chunks from {:keys [on-chunk on-done voice]}]
  (let [request (fake-request-fn)
        log? (fake-log-sentences?)]
    (letfn [(step [i]
              (when (= gen @generation)
                (if (>= i (count chunks))
                  (on-done)
                  (let [{:keys [reused promise]} (acquire-clip! chunks i voice request log?)]
                    (-> promise
                        (.then (fn [_]
                                 (when (= gen @generation)
                                   (begin-sentence!
                                    ;; the fake's sound is its playing timer
                                    #(js/setTimeout (fn [] (step (inc i)))
                                                    (or (some-> (test-config) .-chunkMs) 50))
                                    {:chunks chunks :i i :reused reused :voice voice
                                     :request-fn request :log? log? :on-chunk on-chunk})))))))))]
      (step from))))

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
                    (set! (.-rate u) (or rate 1))
                    (when v (set! (.-voice u) v))
                    (set! (.-onend u)
                          (fn [_] (when (= gen @generation) (step (inc i)))))
                    ;; sound first, the record behind it (slice 19 ticket 05:
                    ;; the position record — and the log write it flushes —
                    ;; runs behind speech already started, on every provider)
                    (.speak synth u)
                    (on-chunk i)))))]
      (step from))))

;; -- ElevenLabs provider (bring-your-own-key, CORS-open API) ----------------
;; POST /v1/text-to-speech/{voice}, model eleven_flash_v2_5, mp3_44100_128,
;; one request per chunk, played via an audio element
;; (docs/research/clipper-and-elevenlabs.md). Since
;; 19-the-next-sentence-is-ready the requests run AHEAD of the playhead
;; through the made-ready machinery above: while sentence n plays, n+1 and
;; n+2 are being made ready, and everything made ready is kept for the item
;; and replayed — resume, a speed change (playbackRate is applied to the
;; element at play time, so the bytes are speed-independent) and a backwards
;; seek issue no request. Per-sentence making-ready/playing entries go to the
;; speech log unconditionally here: no suite ever drives this path, and the
;; live ratification needs them to measure the gap it hears.

(defn- elevenlabs-request-fn [api-key voice-id]
  (fn [text]
    (-> (js/fetch (str "https://api.elevenlabs.io/v1/text-to-speech/" voice-id
                       "?output_format=mp3_44100_128")
                  (clj->js {:method "POST"
                            :headers {"xi-api-key" api-key
                                      "Content-Type" "application/json"}
                            :body (js/JSON.stringify
                                   (clj->js {:text text
                                             :model_id "eleven_flash_v2_5"}))}))
        (.then (fn [resp]
                 (if (.-ok resp)
                   (.blob resp)
                   (throw (js/Error. (str "ElevenLabs HTTP " (.-status resp)))))))
        (.then (fn [blob] (js/URL.createObjectURL blob))))))

(defn- elevenlabs-speak! [gen chunks from {:keys [on-chunk on-done rate] :as opts} api-key voice-id]
  (let [;; the key names the voice the audio is actually made in — the
        ;; resolved id, provider-prefixed, even when :voice arrived nil and
        ;; the stored default resolved it
        voice (str "elevenlabs:" voice-id)
        request (elevenlabs-request-fn api-key voice-id)]
    (letfn [(step [i]
              (when (= gen @generation)
                (if (>= i (count chunks))
                  (on-done)
                  (let [{:keys [reused promise]} (acquire-clip! chunks i voice request true)]
                    (-> promise
                        (.then (fn [url]
                                 (when (= gen @generation)
                                   (begin-sentence!
                                    ;; no revoke on ended: the clip is kept
                                    ;; for the item and let go whole at the
                                    ;; letting-go (ticket 02)
                                    (fn []
                                      (let [audio (js/Audio. url)]
                                        (reset! current-audio audio)
                                        (set! (.-playbackRate audio) (or rate 1))
                                        (set! (.-onended audio)
                                              (fn [_]
                                                (when (= gen @generation) (step (inc i)))))
                                        (.play audio)))
                                    {:chunks chunks :i i :reused reused :voice voice
                                     :request-fn request :log? true :on-chunk on-chunk}))))
                        (.catch (fn [e]
                                  (js/console.error "[speech] ElevenLabs failed; falling back to built-in speech" e)
                                  (when (= gen @generation)
                                    (builtin-speak! gen chunks i opts)))))))))]
      (step from))))

;; -- public interface --------------------------------------------------------

(defn speak! [chunks from-chunk opts]
  (let [gen (swap! generation inc)
        voice (:voice opts)
        opts (update opts :on-done
                     (fn [f] (fn [] (reset! active false) (f))))]
    ;; the made-ready clips are scoped to the item (:item-id, since 19):
    ;; another item's speak! lets the previous item's go before anything else
    (ensure-clip-item! (:item-id opts))
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
  "The platform's voices as {:voice-id :name :provider :built-in?}: the fake
   provider's deterministic test list when the test hook is set, else the
   browser's speechSynthesis voices under \"builtin:<voiceURI>\" ids.

   The test hook's entries are {id, name, provider?, builtIn?} (the last two
   since 14-voice-picker-order, ticket 03): `provider` is the service the
   voice is reached through — the group label — and `builtIn` says the
   platform provides it built in, which is what puts its group last. An entry
   saying neither, which is every entry slices 01–13 supply, keeps exactly
   its pre-14 shape: one group, labelled \"Platform\", not the platform's own
   built-in group."
  []
  (if-let [cfg (test-config)]
    (mapv (fn [v]
            (let [built-in? (boolean (.-builtIn v))]
              {:voice-id (.-id v)
               :name (.-name v)
               :provider (or (.-provider v) (if built-in? "Built-in" "Platform"))
               :built-in? built-in?}))
          (or (.-voices cfg) #js []))
    (if-let [synth (.-speechSynthesis js/window)]
      (mapv (fn [v] {:voice-id (str "builtin:" (.-voiceURI v))
                     :name (.-name v) :provider "Built-in" :built-in? true})
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

(defn- assembled-voices
  "Every voice there is to choose from: the platform's, plus the ElevenLabs
   voices under \"elevenlabs:<id>\" ids when a key is saved. Which voices
   exist — not what order to offer them in. Until 14-voice-picker-order this
   assembly WAS the order (platform first, ElevenLabs appended), which is
   what buried the handful of voices a reader had configured under the
   hundred and eighty the platform supplies."
  []
  (vec (concat @state/platform-voices
               (when (store/elevenlabs-key)
                 (mapv (fn [{:keys [voice-id name]}]
                         {:voice-id (str "elevenlabs:" voice-id)
                          :name name :provider "ElevenLabs" :built-in? false})
                       @state/elevenlabs-voices)))))

(defn available-voices
  "The voices to offer, in the one order to offer them
   (domain/order-offered-voices, since 14-voice-picker-order). Both voice
   selects reach the ordering through here, so they agree by construction
   rather than by two implementations happening to match. The alphabet in
   force is a constant of the app, not a reading of the machine (since
   18-an-alphabet-not-a-numbering): today it is the declared Finnish table,
   and the day the alphabet becomes a reader's setting, this caller — not
   the rule — is what changes."
  []
  (domain/order-offered-voices (assembled-voices) domain/finnish-alphabet))

(defn voice-name
  "The display name for a voice-id, falling back to the id itself (a voice
   may disappear from the platform between sessions). Looks in the assembly,
   not the offering: naming one voice has no use for an order."
  [voice-id]
  (or (->> (assembled-voices)
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
