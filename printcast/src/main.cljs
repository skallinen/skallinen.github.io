;; Entry point: replay the event log through the evolvers, mount the UI.
(ns main
  (:require [clojure.string :as str]
            [reagent.dom :as rdom]
            [domain]
            [state]
            [store]
            [speech]
            [fetcher]
            [dispatch]
            [ui]))

(defn- clear-capture-fragment!
  "Drop the #capture= fragment from the address bar so a reload cannot
   re-capture. replaceState fires no hashchange, so the route atom is
   re-synced by hand."
  []
  (.replaceState js/history nil ""
                 (str (.-pathname js/location) (.-search js/location)))
  (reset! state/route (.-hash js/location)))

(defn- handle-capture-hash!
  "The external capture channel (since 09-capture-extension): a
   #capture=<base64url(UTF-8 JSON)> fragment — present at boot, or arriving
   as a same-document navigation while the app is open — becomes a
   capture-url/-text intent with channel external through the normal
   dispatcher (fetch pipeline, auto-queue policy and all). Malformed
   payloads are fail-safe: ignored with a warning, nothing dispatched.
   Either way the fragment is cleared. #/… router hashes never match."
  []
  (let [h (str (.-hash js/location))]
    (when (str/starts-with? h "#capture=")
      (if-let [intent (domain/capture-intent (subs h (count "#capture=")))]
        (dispatch/dispatch! intent)
        (js/console.warn "[capture] malformed external capture payload — ignored"))
      (clear-capture-fragment!))))

(defn init []
  ;; Replay needs no intents (WAY-OF-WORKING §4.2)
  (reset! state/app-state (domain/fold domain/init-state (store/load-events)))
  ;; A reload mid-play leaves the log saying "playing" while no speech runs:
  ;; reconcile by pausing at the last known position (decision in decisions.md)
  (when (= "playing" (get-in @state/app-state [:player :state]))
    (dispatch/dispatch! {:kind "pause"}))
  ;; A reload mid-fetch leaves url/feed ingests stuck requested/fetching with
  ;; no edge process running: re-enter the fetch (decision in decisions.md)
  (doseq [{:keys [ingest-id url feed-url source-id document-ref file-name]
           lifecycle :state}
          (vals (:ingests @state/app-state))]
    (cond
      url
      (case lifecycle
        "requested" (fetcher/begin! ingest-id url dispatch/dispatch!)
        "fetching"  (fetcher/resume! ingest-id url dispatch/dispatch!)
        nil)

      feed-url
      (case lifecycle
        "requested" (fetcher/begin-feed! ingest-id feed-url source-id dispatch/dispatch!)
        "fetching"  (fetcher/resume-feed! ingest-id feed-url source-id dispatch/dispatch!)
        nil)

      ;; a document's bytes are transient edge state: re-entering extraction
      ;; after a reload fails cleanly ("document is no longer available"),
      ;; leaving a failed row whose Retry re-prompts for the file
      document-ref
      (case lifecycle
        "requested" (fetcher/begin-document! ingest-id document-ref file-name
                                             dispatch/dispatch!)
        "fetching"  (fetcher/resume-document! ingest-id document-ref file-name
                                              dispatch/dispatch!)
        nil)))
  ;; voice enumeration (since 08): platform voices now, re-read on
  ;; voiceschanged; the ElevenLabs list joins when a key is saved
  (speech/init-voices!)
  (when-let [k (store/elevenlabs-key)]
    (speech/fetch-voices! k))
  ;; external capture channel (since 09): a #capture= fragment present at
  ;; boot is dispatched now that the folded state is live
  (handle-capture-hash!)
  ;; hash routing (since 05): the route atom follows the location hash;
  ;; a #capture= fragment arriving while the app is open (same-document
  ;; navigation from the external channel) is handled and cleared (since 09)
  (.addEventListener js/window "hashchange"
                     (fn [_]
                       (reset! state/route (.-hash js/location))
                       (handle-capture-hash!)))
  (rdom/render [ui/app] (.getElementById js/document "app")))

(init)

(println "[main] loaded")
