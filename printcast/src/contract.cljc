;; Hand-authored contract, mirroring docs/contexts/** (WAY-OF-WORKING §5:
;; any mismatch between this file and the docs is a bug in this file).
;; Slice 01-walking-skeleton subset. Kinds are kebab-case (§11).
;;
;; Message shape: one flat map per intent/event with :kind as the message
;; envelope. Because the library item's own `kind` field (pasted-text | …)
;; would collide with the envelope key in a flat map, that field travels as
;; :item-kind inside add-item / item-added; nested ingest drafts keep :kind
;; exactly as the docs schema (recorded in decisions.md).
(ns contract)

(def intents
  "intent kind → authority (docs/contexts/<ctx>/authorities/<auth>/intents/<kind>.md)"
  {"capture-text"     :ingestion/ingest
   "add-item"         :library/item
   "mark-in-progress" :library/item
   "mark-played"      :library/item
   "queue-item"       :playback/queue
   "take-next"        :playback/queue
   "play"             :playback/player
   "pause"            :playback/player
   "resume"           :playback/player
   "finish-item"      :playback/player})

(def events
  "event kind → authority (docs/contexts/<ctx>/authorities/<auth>/events/<kind>.md)"
  {"text-captured"           :ingestion/ingest
   "ingest-completed"        :ingestion/ingest
   "item-added"              :library/item
   "item-marked-in-progress" :library/item
   "item-marked-played"      :library/item
   "item-queued"             :playback/queue
   "item-dequeued"           :playback/queue
   "playback-started"        :playback/player
   "playback-paused"         :playback/player
   "playback-resumed"        :playback/player
   "item-finished"           :playback/player})

(def item-kinds #{"podcast-episode" "web-article" "pasted-text" "document"})

(println "[contract] loaded")
