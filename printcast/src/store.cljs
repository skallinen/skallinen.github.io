;; Edge: persistence. The event log is appended to localStorage as EDN and
;; replayed on load through the evolvers only (WAY-OF-WORKING §4.2, ticket 05).
;; Settings (ElevenLabs key/voice) are plain localStorage entries — edge
;; configuration, not domain events.
(ns store
  (:require [clojure.edn :as edn]
            [clojure.string :as str]))

(def ^:private log-key "printcast:events")
(def ^:private el-key-key "printcast:elevenlabs-key")
(def ^:private el-voice-key "printcast:elevenlabs-voice")

(defonce ^:private cached-log (atom []))

(defn load-events
  "The full event log, oldest first."
  []
  (let [events (if-let [s (.getItem js/localStorage log-key)]
                 (vec (edn/read-string s))
                 [])]
    (reset! cached-log events)
    events))

(defn append-event! [event]
  (swap! cached-log conj event)
  (.setItem js/localStorage log-key (pr-str @cached-log)))

(defn elevenlabs-key []
  (let [k (.getItem js/localStorage el-key-key)]
    (when-not (str/blank? k) k)))

(defn elevenlabs-voice []
  (let [v (.getItem js/localStorage el-voice-key)]
    (when-not (str/blank? v) v)))

(defn save-elevenlabs! [api-key voice-id]
  (if (str/blank? api-key)
    (.removeItem js/localStorage el-key-key)
    (.setItem js/localStorage el-key-key api-key))
  (if (str/blank? voice-id)
    (.removeItem js/localStorage el-voice-key)
    (.setItem js/localStorage el-voice-key voice-id)))

(println "[store] loaded")
