;; Pure business logic: deciders (state × intent → events, can refuse) and
;; evolvers (state × event → state, pure left-fold). No Reagent, no browser —
;; runnable in Scittle and nbb alike (WAY-OF-WORKING §4, §9).
;;
;; Timestamps and fresh ids are computed at the edge (dispatch.cljs fills
;; :at / :ingest-id / :item-id defaults before decide runs), so everything
;; here stays referentially transparent.
(ns domain
  (:require [clojure.string :as str]
            [contract]))

(def init-state
  {:ingests {}                                   ; ingest-id → {:state … + capture info}
   :items   {}                                   ; item-id → item (+ :status)
   :sources {}                                   ; source-id → source aggregate (since 05)
   :queue   []                                   ; item-ids, play order
   :player  {:state "idle" :item-id nil :position 0 :speed 1}})

(defn- ingest-state [state ingest-id]
  (get-in state [:ingests ingest-id :state]))

;; ---------------------------------------------------------------------------
;; Text helpers (plan "Assorted": duration estimate, title from first line,
;; sentence chunking — position for pasted text = chunk index)
;; ---------------------------------------------------------------------------

(def words-per-minute 150)

(defn word-count [text]
  (count (remove str/blank? (str/split text #"\s+"))))

(defn estimate-duration
  "Seconds of speech: word count ÷ speaking speed."
  [text]
  (max 1 (js/Math.round (* 60 (/ (word-count text) words-per-minute)))))

(defn derive-title
  "First non-blank line of the text, trimmed."
  [text]
  (->> (str/split-lines text)
       (remove str/blank?)
       first
       str/trim))

(defn chunks
  "Sentence chunks of the text; the speech position is an index into these."
  [text]
  (->> (str/split (str/trim text) #"(?<=[.!?])\s+")
       (remove str/blank?)
       vec))

(def min-readable-words
  "Fewer words than this is boilerplate scraps, not an article
   (03-web-articles failure taxonomy: \"no readable content found\")."
  25)

(defn readable-text?
  "Did extraction yield enough text to be worth reading aloud?"
  [text]
  (>= (word-count (or text "")) min-readable-words))

(defn normalize-whitespace
  "Collapse extraction whitespace runs (indentation, newlines) to single
   spaces so speech chunks and duration estimates see clean prose."
  [s]
  (str/replace (str/trim (str s)) #"\s+" " "))

(defn article-draft
  "The complete-ingest item draft for an extracted web article
   (docs/contexts/ingestion/.../intents/complete-ingest.md)."
  [title text url excerpt]
  (let [content (normalize-whitespace text)
        origin (cond-> nil
                 url (assoc :url url)
                 (not (str/blank? (str excerpt))) (assoc :excerpt (normalize-whitespace excerpt)))]
    (cond-> {:title (normalize-whitespace title)
             :kind "web-article"
             :content content
             :duration-estimate (estimate-duration content)}
      origin (assoc :origin origin))))

(defn elapsed-seconds
  "Seconds of speech already heard: the words in the consumed chunks
   (position = index of the next chunk to speak) at the speaking speed.
   The docs give `position` the duration domain type; slice 01 records the
   sentence-chunk index, so seconds are estimated at the same 150 wpm as
   `estimate-duration` (decision in 02-queue-management/decisions.md)."
  [text position]
  (let [heard-words (reduce + (map word-count (take position (chunks text))))]
    (js/Math.round (* 60 (/ heard-words words-per-minute)))))

(defn chunk-at
  "The chunk index speaking at `seconds` into the text — the inverse of
   `elapsed-seconds`, at the same 150 wpm estimate. Clamps to
   [0, chunk count]; the chunk count itself means the end of the item
   (since 04-player-controls: the seconds↔chunk mapping behind seek/skip)."
  [text seconds]
  (let [cs (chunks text)
        n (count cs)]
    (loop [i 0 words-heard 0]
      (if (>= i n)
        n
        (let [words-through (+ words-heard (word-count (nth cs i)))
              chunk-end-secs (* 60 (/ words-through words-per-minute))]
          (if (< seconds chunk-end-secs)
            i
            (recur (inc i) words-through)))))))

;; ---------------------------------------------------------------------------
;; Recording helpers (since 05-podcast-feeds: an episode's position is seconds
;; of audio time — the docs' duration domain type directly; text items keep
;; the standing chunk-index decision)
;; ---------------------------------------------------------------------------

(defn recording?
  "Does the item play an audio recording (podcast episode) rather than
   synthesized speech?"
  [item]
  (not (str/blank? (str (:recording-url item)))))

(defn item-elapsed-seconds
  "Seconds of the item already heard: the position itself for a recording,
   the consumed-chunk estimate for a text item."
  [item position]
  (if (recording? item)
    (or position 0)
    (elapsed-seconds (or (:content item) "") (or position 0))))

(defn position-for-seconds
  "The item position at `seconds` in: clamped seconds for a recording,
   the chunk index (chunk-at) for a text item."
  [item seconds]
  (if (recording? item)
    (-> seconds (max 0) (min (:duration-estimate item)))
    (chunk-at (or (:content item) "") seconds)))

(defn parse-itunes-duration
  "itunes:duration → seconds. Accepts SS, MM:SS, or HH:MM:SS; nil when blank
   or unparsable."
  [s]
  (when-not (str/blank? (str s))
    (let [parts (mapv #(js/parseInt % 10) (str/split (str/trim (str s)) #":"))]
      (when (every? #(and (number? %) (not (js/isNaN %))) parts)
        (case (count parts)
          1 (nth parts 0)
          2 (+ (* 60 (nth parts 0)) (nth parts 1))
          3 (+ (* 3600 (nth parts 0)) (* 60 (nth parts 1)) (nth parts 2))
          nil)))))

(def max-excerpt-chars
  "An origin excerpt is a teaser, not the full show notes — real feeds carry
   multi-KB descriptions per episode, which would bloat every ingest event
   (found ratifying against a real 1000-episode feed; decisions.md)."
  280)

(defn excerpt-of
  "The description normalized and truncated to an excerpt, or nil when blank."
  [description]
  (when-not (str/blank? (str description))
    (let [text (normalize-whitespace description)]
      (if (> (count text) max-excerpt-chars)
        (str (subs text 0 max-excerpt-chars) "…")
        text))))

(defn episode-draft
  "The complete-ingest item draft for one feed episode
   (docs/contexts/ingestion/.../intents/complete-ingest.md)."
  [title recording-url {:keys [duration published-at description source-id]}]
  (cond-> {:title (normalize-whitespace title)
           :kind "podcast-episode"
           :recording-url recording-url
           :duration-estimate (or duration 0)
           :origin (cond-> {:source-id source-id}
                     (excerpt-of description)
                     (assoc :excerpt (excerpt-of description)))}
    published-at (assoc :published-at published-at)))

;; ---------------------------------------------------------------------------
;; Document helpers (since 07-documents: extraction resolves the item title
;; from the document's embedded metadata, falling back to the file name minus
;; its extension — the spec-level decision in docs/plan/07-documents/plan.md)
;; ---------------------------------------------------------------------------

(defn file-name-sans-extension
  "The file name without its last extension; a name with no extension (or a
   bare dotfile) is kept whole."
  [file-name]
  (let [n (str file-name)
        i (str/last-index-of n ".")]
    (if (and i (pos? i)) (subs n 0 i) n)))

(defn document-title
  "The document's embedded metadata title, falling back to the file name
   minus its extension."
  [metadata-title file-name]
  (if (str/blank? (str metadata-title))
    (file-name-sans-extension file-name)
    (normalize-whitespace metadata-title)))

(defn page-start-seconds
  "Estimated seconds of speech before the given page begins: the words on
   the preceding pages at the same 150 wpm as `estimate-duration`. Positions
   the outline sections (enabling-only groundwork for slice 10 chapters)."
  [page-texts page-index]
  (let [words (reduce + 0 (map word-count (take page-index page-texts)))]
    (js/Math.round (* 60 (/ words words-per-minute)))))

(defn document-draft
  "The complete-ingest item draft for an extracted document
   (docs/contexts/ingestion/.../intents/complete-ingest.md). `sections` are
   the document's outline entries as {title, position}; they stay on the
   draft only (add-item's sections field is populated from slice 10)."
  [title file-name text sections]
  (let [content (normalize-whitespace text)]
    (cond-> {:title (normalize-whitespace title)
             :kind "document"
             :content content
             :origin {:file-name file-name}
             :duration-estimate (estimate-duration content)}
      (seq sections) (assoc :sections (vec sections)))))

;; ---------------------------------------------------------------------------
;; Deciders — narrative strings match the statechart transitions (§4.3)
;; ---------------------------------------------------------------------------

(defn- accept [& events] {:ok? true :events (vec events)})
(defn- refuse [reason]   {:ok? false :reason reason})

(defmulti decide
  "S × I → {:ok? true :events [...]} | {:ok? false :reason \"…\"}"
  (fn [_state intent] (:kind intent)))

(defmethod decide :default [_ intent]
  (refuse (str "unknown intent kind: " (:kind intent))))

;; ingestion/ingest — "capture-text @ none → ready, emits [text-captured, ingest-completed]"
(defmethod decide "capture-text"
  [state {:keys [ingest-id text title channel at]}]
  (cond
    (some? (get-in state [:ingests ingest-id]))
    (refuse "ingest already exists")

    (or (nil? text) (str/blank? text))
    (refuse "pasted text is empty")

    :else
    (let [title'   (if (str/blank? (str title)) (derive-title text) title)
          channel' (or channel "in-app")]
      (accept {:kind "text-captured" :ingest-id ingest-id :title title'
               :text text :channel channel' :captured-at at}
              {:kind "ingest-completed" :ingest-id ingest-id
               :items [{:title title' :kind "pasted-text" :content text
                        :duration-estimate (estimate-duration text)}]
               :channel channel' :completed-at at}))))

;; ingestion/ingest — "capture-url @ none → requested, emits [url-captured]"
(defmethod decide "capture-url"
  [state {:keys [ingest-id url channel at]}]
  (cond
    (some? (get-in state [:ingests ingest-id]))
    (refuse "ingest already exists")

    (str/blank? (str url))
    (refuse "the URL is empty")

    :else
    (accept {:kind "url-captured" :ingest-id ingest-id :url url
             :channel (or channel "in-app") :captured-at at})))

;; ingestion/ingest — "capture-feed @ none → requested, emits [feed-captured]"
;; Issued by the feed-ingest policy on subscription and refresh, never
;; directly by the user (docs/contexts/ingestion/.../intents/capture-feed.md).
(defmethod decide "capture-feed"
  [state {:keys [ingest-id feed-url source-id at]}]
  (cond
    (some? (get-in state [:ingests ingest-id]))
    (refuse "ingest already exists")

    (str/blank? (str feed-url))
    (refuse "the feed address is empty")

    (str/blank? (str source-id))
    (refuse "the feed fetch has no library source")

    :else
    (accept {:kind "feed-captured" :ingest-id ingest-id :feed-url feed-url
             :source-id source-id :captured-at at})))

;; ingestion/ingest — "capture-document @ none → requested, emits [document-captured]"
;; The document-ref is an opaque reference to the file's bytes, resolvable by
;; the extraction edge — the bytes themselves never enter the event log.
(defmethod decide "capture-document"
  [state {:keys [ingest-id file-name document-ref channel at]}]
  (cond
    (some? (get-in state [:ingests ingest-id]))
    (refuse "ingest already exists")

    (str/blank? (str file-name))
    (refuse "the document has no file name")

    (str/blank? (str document-ref))
    (refuse "the document has no content reference")

    :else
    (accept {:kind "document-captured" :ingest-id ingest-id :file-name file-name
             :document-ref document-ref :channel (or channel "in-app")
             :captured-at at})))

;; ingestion/ingest — "start-fetch @ requested → fetching, emits [fetch-started]"
(defmethod decide "start-fetch"
  [state {:keys [ingest-id at]}]
  (if (= "requested" (ingest-state state ingest-id))
    (accept {:kind "fetch-started" :ingest-id ingest-id :started-at at})
    (refuse "the ingest is not requested")))

;; ingestion/ingest — "complete-ingest @ fetching [readable content was
;; extracted into at least one item draft] → ready, emits [ingest-completed]"
;; The guard reads the docs' item-draft schema: a draft is playable with
;; readable *content* or a *recording-url* (since 05-podcast-feeds). The
;; ingest's channel rides on the event so the slice-01 item-creation +
;; auto-queue policies fire for direct captures; feed ingests instead carry
;; the :source metadata block through.
(defn- playable-draft? [draft]
  (or (not (str/blank? (str (:content draft))))
      (not (str/blank? (str (:recording-url draft))))))

(defmethod decide "complete-ingest"
  [state {:keys [ingest-id items source at]}]
  (let [channel (get-in state [:ingests ingest-id :channel])]
    (cond
      (not= "fetching" (ingest-state state ingest-id))
      (refuse "the ingest is not fetching")

      (not (some playable-draft? items))
      (refuse "no item draft has readable content or a recording")

      :else
      (accept (cond-> {:kind "ingest-completed" :ingest-id ingest-id
                       :items (vec items) :completed-at at}
                channel (assoc :channel channel)
                source (assoc :source source))))))

;; ingestion/ingest — "fail-ingest @ fetching → failed, emits [ingest-failed]"
(defmethod decide "fail-ingest"
  [state {:keys [ingest-id reason at]}]
  (cond
    (not= "fetching" (ingest-state state ingest-id))
    (refuse "the ingest is not fetching")

    (str/blank? (str reason))
    (refuse "a failure reason is required")

    :else
    (accept {:kind "ingest-failed" :ingest-id ingest-id :reason reason :failed-at at})))

;; ingestion/ingest — "retry-ingest @ failed → requested, emits [ingest-retried]"
(defmethod decide "retry-ingest"
  [state {:keys [ingest-id at]}]
  (if (= "failed" (ingest-state state ingest-id))
    (accept {:kind "ingest-retried" :ingest-id ingest-id :retried-at at})
    (refuse "the ingest has not failed")))

;; ingestion/ingest — "discard-ingest @ failed → discarded, emits [ingest-discarded]"
(defmethod decide "discard-ingest"
  [state {:keys [ingest-id at]}]
  (if (= "failed" (ingest-state state ingest-id))
    (accept {:kind "ingest-discarded" :ingest-id ingest-id :discarded-at at})
    (refuse "the ingest has not failed")))

;; library/item — "add-item @ none → new, emits [item-added]"
(defmethod decide "add-item"
  [state {:keys [item-id title item-kind origin content recording-url
                 published-at duration-estimate at]}]
  (cond
    (some? (get-in state [:items item-id]))
    (refuse "item already exists")

    (not (contains? contract/item-kinds item-kind))
    (refuse (str "unknown item kind: " item-kind))

    :else
    (accept (cond-> {:kind "item-added" :item-id item-id :title title
                     :item-kind item-kind :content content
                     :duration-estimate duration-estimate :added-at at}
              origin (assoc :origin origin)
              recording-url (assoc :recording-url recording-url)
              published-at (assoc :published-at published-at)))))

;; library/item — "mark-in-progress @ new → in-progress, emits [item-marked-in-progress]"
(defmethod decide "mark-in-progress"
  [state {:keys [item-id at]}]
  (if (= "new" (get-in state [:items item-id :status]))
    (accept {:kind "item-marked-in-progress" :item-id item-id :at at})
    (refuse "only a new item can be marked in progress")))

;; library/item — "mark-played @ in-progress → played" (auto, since 01) and
;; "@ new → played" (the user's manual mark, since 06-library), emits
;; [item-marked-played]
(defmethod decide "mark-played"
  [state {:keys [item-id at]}]
  (if (contains? #{"new" "in-progress"} (get-in state [:items item-id :status]))
    (accept {:kind "item-marked-played" :item-id item-id :at at})
    (refuse "only a new or in-progress item can be marked played")))

;; library/item — "mark-unplayed @ played|in-progress → new, emits
;; [item-marked-unplayed]" (since 06-library)
(defmethod decide "mark-unplayed"
  [state {:keys [item-id at]}]
  (if (contains? #{"played" "in-progress"} (get-in state [:items item-id :status]))
    (accept {:kind "item-marked-unplayed" :item-id item-id :at at})
    (refuse "only a played or in-progress item can be marked unplayed")))

;; library/item — "archive-item @ new|in-progress|played → archived, emits
;; [item-archived]" (since 06-library)
(defmethod decide "archive-item"
  [state {:keys [item-id at]}]
  (if (contains? #{"new" "in-progress" "played"} (get-in state [:items item-id :status]))
    (accept {:kind "item-archived" :item-id item-id :at at})
    (refuse "only an active item can be archived")))

;; library/item — "unarchive-item @ archived → new, emits [item-unarchived]"
;; (since 06-library; prior play history stays in the event stream)
(defmethod decide "unarchive-item"
  [state {:keys [item-id at]}]
  (if (= "archived" (get-in state [:items item-id :status]))
    (accept {:kind "item-unarchived" :item-id item-id :at at})
    (refuse "only an archived item can be unarchived")))

;; library/item — "star-item @ new|in-progress|played → same state, emits
;; [item-starred], guard: the item is not already starred" (since 06-library)
(defmethod decide "star-item"
  [state {:keys [item-id at]}]
  (let [item (get-in state [:items item-id])]
    (cond
      (not (contains? #{"new" "in-progress" "played"} (:status item)))
      (refuse "only an active item can be starred")

      (:starred item)
      (refuse "the item is already starred")

      :else
      (accept {:kind "item-starred" :item-id item-id :at at}))))

;; library/item — "unstar-item @ new|in-progress|played → same state, emits
;; [item-unstarred], guard: the item is starred" (since 06-library)
(defmethod decide "unstar-item"
  [state {:keys [item-id at]}]
  (let [item (get-in state [:items item-id])]
    (cond
      (not (contains? #{"new" "in-progress" "played"} (:status item)))
      (refuse "only an active item can be unstarred")

      (not (:starred item))
      (refuse "the item is not starred")

      :else
      (accept {:kind "item-unstarred" :item-id item-id :at at}))))

;; library/source — "subscribe-source @ none → active, emits [source-subscribed]"
(defmethod decide "subscribe-source"
  [state {:keys [source-id feed-url at]}]
  (cond
    (some? (get-in state [:sources source-id]))
    (refuse "source already exists")

    (str/blank? (str feed-url))
    (refuse "the feed address is empty")

    :else
    (accept {:kind "source-subscribed" :source-id source-id
             :feed-url feed-url :subscribed-at at})))

;; library/source — "refresh-source @ active → active, emits [source-refresh-requested]"
(defmethod decide "refresh-source"
  [state {:keys [source-id at]}]
  (if (= "active" (get-in state [:sources source-id :state]))
    (accept {:kind "source-refresh-requested" :source-id source-id :requested-at at})
    (refuse "the source is not followed")))

;; library/source — "unsubscribe-source @ active → removed, emits [source-unsubscribed]"
;; `removed` is terminal; the source's items remain in the library.
(defmethod decide "unsubscribe-source"
  [state {:keys [source-id at]}]
  (if (= "active" (get-in state [:sources source-id :state]))
    (accept {:kind "source-unsubscribed" :source-id source-id :unsubscribed-at at})
    (refuse "the source is not followed")))

;; library/source — "set-source-voice @ active → active, emits [source-voice-set]"
;; (since 08-voices-and-settings). An *empty* voice-id is accepted — v1's way
;; of clearing the override (the intent doc); a missing one is refused (the
;; schema requires the field — fail loud at the point of misuse).
(defmethod decide "set-source-voice"
  [state {:keys [source-id voice-id at]}]
  (cond
    (not= "active" (get-in state [:sources source-id :state]))
    (refuse "the source is not followed")

    (not (string? voice-id))
    (refuse "a voice is required")

    :else
    (accept {:kind "source-voice-set" :source-id source-id
             :voice-id voice-id :at at})))

;; library/source — "set-source-speed @ active → active, emits [source-speed-set]"
;; (since 08-voices-and-settings). v1 always sets a value (clearing deferred);
;; the range refusal is the set-speed convention.
(defmethod decide "set-source-speed"
  [state {:keys [source-id speed at]}]
  (cond
    (not= "active" (get-in state [:sources source-id :state]))
    (refuse "the source is not followed")

    (not (and (number? speed) (<= 0.5 speed 3.0)))
    (refuse "the speed must be between 0.5x and 3x")

    :else
    (accept {:kind "source-speed-set" :source-id source-id
             :speed speed :at at})))

;; playback/queue — "queue-item @ empty|holding [not already queued] → holding, emits [item-queued]"
(defmethod decide "queue-item"
  [state {:keys [item-id at]}]
  (if (some #{item-id} (:queue state))
    (refuse "the item is already queued")
    (accept {:kind "item-queued" :item-id item-id :queued-at at})))

;; playback/queue — "queue-item-next @ empty|holding [not already queued] → holding, emits [item-queued-next]"
(defmethod decide "queue-item-next"
  [state {:keys [item-id at]}]
  (if (some #{item-id} (:queue state))
    (refuse "the item is already queued")
    (accept {:kind "item-queued-next" :item-id item-id :queued-at at})))

;; playback/queue — "reorder-queue @ holding [the given order lists exactly the queued items] → holding, emits [queue-reordered]"
(defmethod decide "reorder-queue"
  [state {:keys [order at]}]
  (cond
    (empty? (:queue state))
    (refuse "the queue is empty")

    (not= (frequencies order) (frequencies (:queue state)))
    (refuse "the order does not list exactly the queued items")

    :else
    (accept {:kind "queue-reordered" :order (vec order) :at at})))

;; playback/queue — "remove-from-queue @ holding → holding|empty, emits [item-removed-from-queue]"
;; (two statechart branches, one rule: the cardinality guard only decides
;; whether the queue empties)
(defmethod decide "remove-from-queue"
  [state {:keys [item-id at]}]
  (if (some #{item-id} (:queue state))
    (accept {:kind "item-removed-from-queue" :item-id item-id :at at})
    (refuse "the item is not queued")))

;; playback/queue — "clear-queue @ holding → empty, emits [queue-cleared]"
(defmethod decide "clear-queue"
  [state {:keys [at]}]
  (if (seq (:queue state))
    (accept {:kind "queue-cleared" :at at})
    (refuse "the queue is already empty")))

;; playback/queue — "take-next @ holding → holding|empty, emits [item-dequeued]"
(defmethod decide "take-next"
  [state {:keys [at]}]
  (if-let [front (first (:queue state))]
    (accept {:kind "item-dequeued" :item-id front :at at})
    (refuse "the queue is empty")))

;; playback/player — "play @ idle [item has speakable content or a recording] → playing, emits [playback-started]"
;; Since 08-voices-and-settings the intent may carry the effective :voice-id /
;; :speed (resolved by the play-from-queue policy); they pass through onto
;; playback-started when present.
(defmethod decide "play"
  [state {:keys [item-id position voice-id speed at]}]
  (let [item (get-in state [:items item-id])]
    (cond
      (not= "idle" (get-in state [:player :state]))
      (refuse "the player is not idle")

      (and (str/blank? (str (:content item)))
           (str/blank? (str (:recording-url item))))
      (refuse "the item has no speakable content and no recording")

      :else
      (accept (cond-> {:kind "playback-started" :item-id item-id
                       :position (or position 0) :started-at at}
                voice-id (assoc :voice-id voice-id)
                speed (assoc :speed speed))))))

;; playback/player — "pause @ playing → paused, emits [playback-paused]"
;; The current speech chunk index comes from the edge with the intent
;; (record-position does not exist until 02-queue-management).
(defmethod decide "pause"
  [state {:keys [position at]}]
  (let [player (:player state)]
    (if (= "playing" (:state player))
      (accept {:kind "playback-paused" :item-id (:item-id player)
               :position (or position (:position player)) :at at})
      (refuse "the player is not playing"))))

;; playback/player — "resume @ paused → playing, emits [playback-resumed]"
(defmethod decide "resume"
  [state {:keys [at]}]
  (let [player (:player state)]
    (if (= "paused" (:state player))
      (accept {:kind "playback-resumed" :item-id (:item-id player)
               :position (:position player) :at at})
      (refuse "the player is not paused"))))

;; playback/player — "record-position @ playing → playing, emits [position-changed]"
;; (periodic self-transition: the speech process's chunk-boundary callback)
(defmethod decide "record-position"
  [state {:keys [position at]}]
  (let [player (:player state)]
    (if (= "playing" (:state player))
      (accept {:kind "position-changed" :item-id (:item-id player)
               :position position :at at})
      (refuse "the player is not playing"))))

;; playback/player — "seek @ playing → playing / @ paused → paused
;; [the position is within the item's duration], emits [position-changed]"
;; The position unit is the sentence-chunk index for text items (slice-01
;; decision; the seconds↔chunk conversion happens at the edge via chunk-at)
;; and seconds of audio time for recordings (since 05-podcast-feeds).
(defmethod decide "seek"
  [state {:keys [position at]}]
  (let [{player-state :state :keys [item-id]} (:player state)
        item (get-in state [:items item-id])
        limit (if (recording? item)
                (:duration-estimate item)
                (count (chunks (or (:content item) ""))))]
    (cond
      (not (contains? #{"playing" "paused"} player-state))
      (refuse "the player has no current item")

      (or (nil? position) (neg? position) (> position limit))
      (refuse "the position is not within the item's duration")

      :else
      (accept {:kind "position-changed" :item-id item-id :position position :at at}))))

;; playback/player — "skip @ playing → playing / @ paused → paused,
;; emits [position-changed]" — the resulting position clamps to the item's
;; bounds; clamping at the end does not finish the item (plan.md spec notes).
(defmethod decide "skip"
  [state {:keys [direction seconds at]}]
  (let [{player-state :state :keys [item-id position]} (:player state)]
    (cond
      (not (contains? #{"playing" "paused"} player-state))
      (refuse "the player has no current item")

      (not (contains? #{"forward" "back"} direction))
      (refuse (str "unknown skip direction: " direction))

      (or (nil? seconds) (not (pos? seconds)))
      (refuse "the skip interval must be positive")

      :else
      (let [item (get-in state [:items item-id])
            elapsed (item-elapsed-seconds item position)
            target (if (= "forward" direction)
                     (+ elapsed seconds)
                     (- elapsed seconds))]
        (accept {:kind "position-changed" :item-id item-id
                 :position (position-for-seconds item target) :at at})))))

;; playback/player — "set-speed @ idle|playing|paused → same state,
;; emits [speed-changed]" — no statechart guard; the only refusal is a speed
;; outside the schema's 0.5–3.0 range (fail loud at the point of misuse).
(defmethod decide "set-speed"
  [_state {:keys [speed at]}]
  (if (and (number? speed) (<= 0.5 speed 3.0))
    (accept {:kind "speed-changed" :speed speed :at at})
    (refuse "the speed must be between 0.5x and 3x")))

;; playback/player — "set-voice @ idle|playing|paused → same state,
;; emits [voice-set]" (since 08-voices-and-settings) — a self-transition in
;; every player state; the only refusal is a blank voice-id (the set-speed
;; convention: fail loud at the point of misuse).
(defmethod decide "set-voice"
  [_state {:keys [voice-id at]}]
  (if (str/blank? (str voice-id))
    (refuse "a voice is required")
    (accept {:kind "voice-set" :voice-id voice-id :at at})))

;; playback/player — "finish-item @ playing → idle, emits [item-finished]"
(defmethod decide "finish-item"
  [state {:keys [at]}]
  (let [player (:player state)]
    (if (= "playing" (:state player))
      (accept {:kind "item-finished" :item-id (:item-id player) :finished-at at})
      (refuse "the player is not playing"))))

;; ---------------------------------------------------------------------------
;; Evolvers — pure left-fold, no business logic, cannot fail (§4.2)
;; ---------------------------------------------------------------------------

(defmulti evolve
  "S × E → S'"
  (fn [_state event] (:kind event)))

(defmethod evolve :default [state _event] state)

(defmethod evolve "text-captured"
  [state {:keys [ingest-id title channel captured-at]}]
  (assoc-in state [:ingests ingest-id]
            {:ingest-id ingest-id :state "requested" :capture-kind "text"
             :display-name title :channel channel :captured-at captured-at}))

(defmethod evolve "url-captured"
  [state {:keys [ingest-id url channel captured-at]}]
  (assoc-in state [:ingests ingest-id]
            {:ingest-id ingest-id :state "requested" :capture-kind "url"
             :display-name url :url url :channel channel :captured-at captured-at}))

(defmethod evolve "feed-captured"
  [state {:keys [ingest-id feed-url source-id captured-at]}]
  (assoc-in state [:ingests ingest-id]
            {:ingest-id ingest-id :state "requested" :capture-kind "feed"
             :display-name feed-url :feed-url feed-url :source-id source-id
             :captured-at captured-at}))

(defmethod evolve "document-captured"
  [state {:keys [ingest-id file-name document-ref channel captured-at]}]
  (assoc-in state [:ingests ingest-id]
            {:ingest-id ingest-id :state "requested" :capture-kind "document"
             :display-name file-name :file-name file-name
             :document-ref document-ref :channel channel
             :captured-at captured-at}))

(defmethod evolve "fetch-started" [state {:keys [ingest-id]}]
  (assoc-in state [:ingests ingest-id :state] "fetching"))

;; A feed ingest's :source block is where the source's display metadata
;; (title, author, artwork) arrives; the source-list projection reads it off
;; the source aggregate (docs/contexts/library/authorities/source/index.md).
(defmethod evolve "ingest-completed" [state {:keys [ingest-id source]}]
  (cond-> (assoc-in state [:ingests ingest-id :state] "ready")
    (:source-id source)
    (update-in [:sources (:source-id source)] merge
               (select-keys source [:title :author :artwork-url]))))

(defmethod evolve "ingest-failed" [state {:keys [ingest-id reason]}]
  (update-in state [:ingests ingest-id] assoc :state "failed" :reason reason))

(defmethod evolve "ingest-retried" [state {:keys [ingest-id]}]
  (update-in state [:ingests ingest-id]
             (fn [g] (-> g (assoc :state "requested") (dissoc :reason)))))

(defmethod evolve "ingest-discarded" [state {:keys [ingest-id]}]
  (assoc-in state [:ingests ingest-id :state] "discarded"))

(defmethod evolve "item-added"
  [state {:keys [item-id title item-kind origin content recording-url
                 published-at duration-estimate added-at]}]
  (assoc-in state [:items item-id]
            (cond-> {:item-id item-id :title title :item-kind item-kind
                     :content content :duration-estimate duration-estimate
                     :added-at added-at :status "new"}
              origin (assoc :origin origin)
              recording-url (assoc :recording-url recording-url)
              published-at (assoc :published-at published-at))))

(defmethod evolve "source-subscribed"
  [state {:keys [source-id feed-url subscribed-at]}]
  (assoc-in state [:sources source-id]
            {:source-id source-id :state "active" :feed-url feed-url
             :subscribed-at subscribed-at}))

(defmethod evolve "source-refresh-requested"
  [state {:keys [source-id requested-at]}]
  (assoc-in state [:sources source-id :refresh-requested-at] requested-at))

(defmethod evolve "source-unsubscribed" [state {:keys [source-id]}]
  (assoc-in state [:sources source-id :state] "removed"))

;; Per-source overrides (since 08-voices-and-settings): an empty voice-id
;; clears the override — cleared override = absent field (the intent doc).
(defmethod evolve "source-voice-set" [state {:keys [source-id voice-id]}]
  (if (str/blank? (str voice-id))
    (update-in state [:sources source-id] dissoc :voice-id)
    (assoc-in state [:sources source-id :voice-id] voice-id)))

(defmethod evolve "source-speed-set" [state {:keys [source-id speed]}]
  (assoc-in state [:sources source-id :speed] speed))

(defmethod evolve "item-marked-in-progress" [state {:keys [item-id]}]
  (assoc-in state [:items item-id :status] "in-progress"))

(defmethod evolve "item-marked-played" [state {:keys [item-id]}]
  (assoc-in state [:items item-id :status] "played"))

;; Returning to `new` (mark-unplayed, unarchive) also resets the recorded
;; position: `new` means "plays from the beginning" — the slice-04
;; item-finished precedent (decision in 06-library/decisions.md).
(defmethod evolve "item-marked-unplayed" [state {:keys [item-id]}]
  (update-in state [:items item-id] assoc :status "new" :position 0))

;; Archiving keeps metadata, starred flag, and position — only the status
;; moves; history stays in the stream.
(defmethod evolve "item-archived" [state {:keys [item-id]}]
  (assoc-in state [:items item-id :status] "archived"))

(defmethod evolve "item-unarchived" [state {:keys [item-id]}]
  (update-in state [:items item-id] assoc :status "new" :position 0))

(defmethod evolve "item-starred" [state {:keys [item-id]}]
  (assoc-in state [:items item-id :starred] true))

(defmethod evolve "item-unstarred" [state {:keys [item-id]}]
  (assoc-in state [:items item-id :starred] false))

(defmethod evolve "item-queued" [state {:keys [item-id]}]
  (update state :queue conj item-id))

(defmethod evolve "item-queued-next" [state {:keys [item-id]}]
  (update state :queue (fn [q] (into [item-id] q))))

(defmethod evolve "queue-reordered" [state {:keys [order]}]
  (assoc state :queue (vec order)))

(defmethod evolve "item-removed-from-queue" [state {:keys [item-id]}]
  (update state :queue (fn [q] (vec (remove #{item-id} q)))))

(defmethod evolve "queue-cleared" [state _event]
  (assoc state :queue []))

(defmethod evolve "item-dequeued" [state {:keys [item-id]}]
  (update state :queue (fn [q] (vec (remove #{item-id} q)))))

;; The speed is a global player setting, so playback-started and
;; item-finished update the player in place rather than replacing it.
;; Since 08-voices-and-settings the event's effective :speed folds into
;; :item-speed (the speed shown/heard while this item plays); an absent field
;; clears any stale one, so pre-08 logs replay unchanged.
(defmethod evolve "playback-started" [state {:keys [item-id position speed]}]
  (update state :player
          (fn [p]
            (cond-> (assoc p :state "playing" :item-id item-id
                           :position (or position 0))
              speed (assoc :item-speed speed)
              (nil? speed) (dissoc :item-speed)))))

(defmethod evolve "playback-paused" [state {:keys [position]}]
  (update state :player assoc :state "paused" :position position))

(defmethod evolve "playback-resumed" [state {:keys [position]}]
  (update state :player assoc :state "playing" :position position))

(defmethod evolve "position-changed" [state {:keys [item-id position]}]
  (cond-> (assoc-in state [:items item-id :position] position)
    (= item-id (get-in state [:player :item-id]))
    (assoc-in [:player :position] position)))

;; A live speed change takes over from any per-item override from that moment
;; (since 08-voices-and-settings: :item-speed clears).
(defmethod evolve "speed-changed" [state {:keys [speed]}]
  (update state :player (fn [p] (-> p (assoc :speed speed) (dissoc :item-speed)))))

;; The global default voice — a player setting like :speed
;; (since 08-voices-and-settings).
(defmethod evolve "voice-set" [state {:keys [voice-id]}]
  (assoc-in state [:player :voice-id] voice-id))

;; A finished item's recorded position resets so replaying it starts from the
;; beginning — otherwise resume-on-play (since 04-player-controls) would pick
;; up a played item at its end (decision in 04-player-controls/decisions.md).
;; The item's effective speed leaves with it (since 08-voices-and-settings).
(defmethod evolve "item-finished" [state {:keys [item-id]}]
  (-> state
      (assoc-in [:items item-id :position] 0)
      (update :player (fn [p] (-> p (assoc :state "idle" :item-id nil :position 0)
                                  (dissoc :item-speed))))))

(defn fold
  "Replay: left-fold events over state through the evolvers only (§4.2)."
  [state events]
  (reduce evolve state events))

;; ---------------------------------------------------------------------------
;; Effective voice/speed resolution (since 08-voices-and-settings, plan.md
;; "Policy addition"): the item's source override wins over the global player
;; setting. The resolved values travel on `play`, not as read-model fields —
;; the effective voice is observable only in the heard speech (spec notes).
;; ---------------------------------------------------------------------------

(defn- item-source [state item-id]
  (get-in state [:sources (get-in state [:items item-id :origin :source-id])]))

(defn effective-voice
  "The voice an item is heard in: its source's :voice-id override, else the
   global default, else nil (the speech provider's own default)."
  [state item-id]
  (or (:voice-id (item-source state item-id))
      (get-in state [:player :voice-id])))

(defn effective-speed
  "The speed an item plays at: its source's :speed override, else the global
   setting, else 1."
  [state item-id]
  (or (:speed (item-source state item-id))
      (get-in state [:player :speed])
      1))

;; ---------------------------------------------------------------------------
;; Policies — event → follow-up intents (plan.md story-map policy cards).
;; Pure: fresh ids come from the supplied new-id fn.
;; ---------------------------------------------------------------------------

(defn policies
  "S' × E × (fn [] fresh-id) → [intent …], where S' is the state after the
   event was folded in."
  [state event new-id]
  (case (:kind event)
    ;; item-creation + auto-queue: direct user captures (channel present) are
    ;; queued; feed ingests (channel absent — docs/contexts/ingestion) only
    ;; create items, and only for episodes whose recording is not already a
    ;; library item (refresh dedupe by enclosure URL)
    "ingest-completed"
    (if (:channel event)
      (vec (mapcat (fn [draft]
                     (let [item-id (new-id)]
                       [(cond-> {:kind "add-item" :item-id item-id
                                 :title (:title draft) :item-kind (:kind draft)
                                 :content (:content draft)
                                 :duration-estimate (:duration-estimate draft)}
                          (:origin draft) (assoc :origin (:origin draft)))
                        {:kind "queue-item" :item-id item-id}]))
                   (:items event)))
      (let [known (set (keep :recording-url (vals (:items state))))
            fresh (first
                   (reduce (fn [[drafts seen] draft]
                             (let [url (:recording-url draft)]
                               (if (and url (contains? seen url))
                                 [drafts seen]
                                 [(conj drafts draft) (cond-> seen url (conj url))])))
                           [[] known]
                           (:items event)))]
        (mapv (fn [draft]
                (cond-> {:kind "add-item" :item-id (new-id)
                         :title (:title draft) :item-kind (:kind draft)
                         :duration-estimate (:duration-estimate draft)}
                  (:content draft) (assoc :content (:content draft))
                  (:recording-url draft) (assoc :recording-url (:recording-url draft))
                  (:published-at draft) (assoc :published-at (:published-at draft))
                  (:origin draft) (assoc :origin (:origin draft))))
              fresh)))

    ;; feed ingest: a followed or refreshed source gets its feed fetched
    ;; (docs/contexts/ingestion/index.md policy table, since 05-podcast-feeds)
    "source-subscribed"
    [{:kind "capture-feed" :ingest-id (new-id)
      :feed-url (:feed-url event) :source-id (:source-id event)}]

    "source-refresh-requested"
    [{:kind "capture-feed" :ingest-id (new-id)
      :feed-url (get-in state [:sources (:source-id event) :feed-url])
      :source-id (:source-id event)}]

    ;; play-from-queue: the dequeued item starts playing — since
    ;; 04-player-controls at its last recorded position (resume; the play
    ;; intent doc: "the supplied position is the item's last recorded
    ;; position"), 0 for a never-played item; since 08-voices-and-settings
    ;; with the effective speed (always) and voice (only when one resolves —
    ;; the schema field is optional)
    "item-dequeued"
    (let [item-id (:item-id event)
          voice (effective-voice state item-id)]
      [(cond-> {:kind "play" :item-id item-id
                :position (or (get-in state [:items item-id :position]) 0)
                :speed (effective-speed state item-id)}
         voice (assoc :voice-id voice))])

    ;; progress-tracking: the item's first playback-started marks it in progress
    "playback-started"
    (if (= "new" (get-in state [:items (:item-id event) :status]))
      [{:kind "mark-in-progress" :item-id (:item-id event)}]
      [])

    ;; auto-mark-played + continuous playback: while the queue still holds
    ;; items, take-next follows — whose item-dequeued triggers play via the
    ;; play-from-queue policy above (docs/contexts/playback/index.md)
    "item-finished"
    (cond-> [{:kind "mark-played" :item-id (:item-id event)}]
      (seq (:queue state)) (conj {:kind "take-next"}))

    []))

(println "[domain] loaded")
