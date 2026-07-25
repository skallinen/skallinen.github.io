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
  {:ingests {}                                   ; ingest-id → statechart state
   :items   {}                                   ; item-id → item (+ :status)
   :queue   []                                   ; item-ids, play order
   :player  {:state "idle" :item-id nil :position 0}})

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

;; library/item — "add-item @ none → new, emits [item-added]"
(defmethod decide "add-item"
  [state {:keys [item-id title item-kind content duration-estimate at]}]
  (cond
    (some? (get-in state [:items item-id]))
    (refuse "item already exists")

    (not (contains? contract/item-kinds item-kind))
    (refuse (str "unknown item kind: " item-kind))

    :else
    (accept {:kind "item-added" :item-id item-id :title title
             :item-kind item-kind :content content
             :duration-estimate duration-estimate :added-at at})))

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

(defmethod evolve "text-captured" [state {:keys [ingest-id]}]
  (assoc-in state [:ingests ingest-id] "capturing"))

(defmethod evolve "ingest-completed" [state {:keys [ingest-id]}]
  (assoc-in state [:ingests ingest-id] "ready"))

(defmethod evolve "item-added"
  [state {:keys [item-id title item-kind content duration-estimate added-at]}]
  (assoc-in state [:items item-id]
            {:item-id item-id :title title :item-kind item-kind
             :content content :duration-estimate duration-estimate
             :added-at added-at :status "new"}))

(defmethod evolve "item-marked-in-progress" [state {:keys [item-id]}]
  (assoc-in state [:items item-id :status] "in-progress"))

(defmethod evolve "item-marked-played" [state {:keys [item-id]}]
  (assoc-in state [:items item-id :status] "played"))

(defmethod evolve "item-queued" [state {:keys [item-id]}]
  (update state :queue conj item-id))

(defmethod evolve "item-dequeued" [state {:keys [item-id]}]
  (update state :queue (fn [q] (vec (remove #{item-id} q)))))

(defmethod evolve "playback-started" [state {:keys [item-id position]}]
  (assoc state :player {:state "playing" :item-id item-id :position (or position 0)}))

(defmethod evolve "playback-paused" [state {:keys [position]}]
  (update state :player assoc :state "paused" :position position))

(defmethod evolve "playback-resumed" [state {:keys [position]}]
  (update state :player assoc :state "playing" :position position))

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
                       [{:kind "add-item" :item-id item-id
                         :title (:title draft) :item-kind (:kind draft)
                         :content (:content draft)
                         :duration-estimate (:duration-estimate draft)}
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

    ;; auto-mark-played
    "item-finished"
    [{:kind "mark-played" :item-id (:item-id event)}]

    []))

(println "[domain] loaded")
