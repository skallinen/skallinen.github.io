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
   :queue   []                                   ; item-ids, play order
   :player  {:state "idle" :item-id nil :position 0}})

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

;; ingestion/ingest — "start-fetch @ requested → fetching, emits [fetch-started]"
(defmethod decide "start-fetch"
  [state {:keys [ingest-id at]}]
  (if (= "requested" (ingest-state state ingest-id))
    (accept {:kind "fetch-started" :ingest-id ingest-id :started-at at})
    (refuse "the ingest is not requested")))

;; ingestion/ingest — "complete-ingest @ fetching [readable content was
;; extracted into at least one item draft] → ready, emits [ingest-completed]"
;; The ingest's channel rides on the event so the slice-01 item-creation +
;; auto-queue policies fire for direct captures.
(defmethod decide "complete-ingest"
  [state {:keys [ingest-id items at]}]
  (let [channel (get-in state [:ingests ingest-id :channel])]
    (cond
      (not= "fetching" (ingest-state state ingest-id))
      (refuse "the ingest is not fetching")

      (not (some #(not (str/blank? (str (:content %)))) items))
      (refuse "no readable content was extracted into an item draft")

      :else
      (accept (cond-> {:kind "ingest-completed" :ingest-id ingest-id
                       :items (vec items) :completed-at at}
                channel (assoc :channel channel))))))

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
  [state {:keys [item-id title item-kind origin content duration-estimate at]}]
  (cond
    (some? (get-in state [:items item-id]))
    (refuse "item already exists")

    (not (contains? contract/item-kinds item-kind))
    (refuse (str "unknown item kind: " item-kind))

    :else
    (accept (cond-> {:kind "item-added" :item-id item-id :title title
                     :item-kind item-kind :content content
                     :duration-estimate duration-estimate :added-at at}
              origin (assoc :origin origin)))))

;; library/item — "mark-in-progress @ new → in-progress, emits [item-marked-in-progress]"
(defmethod decide "mark-in-progress"
  [state {:keys [item-id at]}]
  (if (= "new" (get-in state [:items item-id :status]))
    (accept {:kind "item-marked-in-progress" :item-id item-id :at at})
    (refuse "only a new item can be marked in progress")))

;; library/item — "mark-played @ in-progress → played, emits [item-marked-played]"
;; (the manual mark-played @ new arrives in 06-library)
(defmethod decide "mark-played"
  [state {:keys [item-id at]}]
  (if (= "in-progress" (get-in state [:items item-id :status]))
    (accept {:kind "item-marked-played" :item-id item-id :at at})
    (refuse "only an in-progress item can be marked played")))

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
(defmethod decide "play"
  [state {:keys [item-id position at]}]
  (let [item (get-in state [:items item-id])]
    (cond
      (not= "idle" (get-in state [:player :state]))
      (refuse "the player is not idle")

      (and (str/blank? (str (:content item)))
           (str/blank? (str (:recording-url item))))
      (refuse "the item has no speakable content and no recording")

      :else
      (accept {:kind "playback-started" :item-id item-id
               :position (or position 0) :started-at at}))))

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

(defmethod evolve "fetch-started" [state {:keys [ingest-id]}]
  (assoc-in state [:ingests ingest-id :state] "fetching"))

(defmethod evolve "ingest-completed" [state {:keys [ingest-id]}]
  (assoc-in state [:ingests ingest-id :state] "ready"))

(defmethod evolve "ingest-failed" [state {:keys [ingest-id reason]}]
  (update-in state [:ingests ingest-id] assoc :state "failed" :reason reason))

(defmethod evolve "ingest-retried" [state {:keys [ingest-id]}]
  (update-in state [:ingests ingest-id]
             (fn [g] (-> g (assoc :state "requested") (dissoc :reason)))))

(defmethod evolve "ingest-discarded" [state {:keys [ingest-id]}]
  (assoc-in state [:ingests ingest-id :state] "discarded"))

(defmethod evolve "item-added"
  [state {:keys [item-id title item-kind origin content duration-estimate added-at]}]
  (assoc-in state [:items item-id]
            (cond-> {:item-id item-id :title title :item-kind item-kind
                     :content content :duration-estimate duration-estimate
                     :added-at added-at :status "new"}
              origin (assoc :origin origin))))

(defmethod evolve "item-marked-in-progress" [state {:keys [item-id]}]
  (assoc-in state [:items item-id :status] "in-progress"))

(defmethod evolve "item-marked-played" [state {:keys [item-id]}]
  (assoc-in state [:items item-id :status] "played"))

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

(defmethod evolve "playback-started" [state {:keys [item-id position]}]
  (assoc state :player {:state "playing" :item-id item-id :position (or position 0)}))

(defmethod evolve "playback-paused" [state {:keys [position]}]
  (update state :player assoc :state "paused" :position position))

(defmethod evolve "playback-resumed" [state {:keys [position]}]
  (update state :player assoc :state "playing" :position position))

(defmethod evolve "position-changed" [state {:keys [item-id position]}]
  (cond-> (assoc-in state [:items item-id :position] position)
    (= item-id (get-in state [:player :item-id]))
    (assoc-in [:player :position] position)))

(defmethod evolve "item-finished" [state _event]
  (assoc state :player {:state "idle" :item-id nil :position 0}))

(defn fold
  "Replay: left-fold events over state through the evolvers only (§4.2)."
  [state events]
  (reduce evolve state events))

;; ---------------------------------------------------------------------------
;; Policies — event → follow-up intents (plan.md story-map policy cards).
;; Pure: fresh ids come from the supplied new-id fn.
;; ---------------------------------------------------------------------------

(defn policies
  "S' × E × (fn [] fresh-id) → [intent …], where S' is the state after the
   event was folded in."
  [state event new-id]
  (case (:kind event)
    ;; item-creation + auto-queue: direct user captures (channel present)
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
      [])

    ;; play-from-queue: the dequeued item starts playing
    "item-dequeued"
    [{:kind "play" :item-id (:item-id event) :position 0}]

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
