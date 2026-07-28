;; Shared data atoms live here; UI-only state stays local to components
;; (bookrank pattern, per docs/research/reference-architecture.md).
(ns state
  (:require [reagent.core :as r]
            [domain]))

(defonce app-state (r/atom domain/init-state))   ; the folded domain state
(defonce speech-position (r/atom 0))             ; current speech chunk index (edge runtime)
(defonce audio-seconds (r/atom 0))               ; current recording second (edge runtime, since 05)
(defonce route (r/atom (.-hash js/location)))    ; current hash route (since 05)
(defonce settings-open? (r/atom false))
(defonce elevenlabs-voices (r/atom nil))         ; [{:voice-id .. :name ..}] when fetched
(defonce platform-voices (r/atom []))            ; enumerated platform speech voices (since 08)

(println "[state] loaded")
