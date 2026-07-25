;; Shared data atoms live here; UI-only state stays local to components
;; (bookrank pattern, per docs/research/reference-architecture.md).
(ns state
  (:require [reagent.core :as r]
            [domain]))

(defonce app-state (r/atom domain/init-state))   ; the folded domain state
(defonce speech-position (r/atom 0))             ; current speech chunk index (edge runtime)
(defonce settings-open? (r/atom false))
(defonce elevenlabs-voices (r/atom nil))         ; [{:voice-id .. :name ..}] when fetched

(println "[state] loaded")
