;; Edge: the fetch-execution policy (docs/contexts/ingestion). An edge
;; process, not a pure `domain/policies` entry: it does network I/O and its
;; outcomes arrive asynchronously. Wired from dispatch/run-effects! on
;; url-captured / ingest-retried (dispatch! is passed in, like the speech
;; callbacks, to keep the namespaces acyclic).
;;
;; Retrieval: direct fetch of the URL first; on CORS/network failure or a
;; non-OK response, one retry through the corsproxy.io relay (decision +
;; privacy caveat in docs/plan/03-web-articles/decisions.md). Both failing →
;; "page could not be retrieved".
;;
;; Extraction: Mozilla Readability (CDN classic-script global) over a
;; DOMParser document. A null parse, an extraction error, or too little text
;; (domain/readable-text?) → "no readable content found".
;;
;; Test hook: window.__printcastTestFetch = {holdMs} delays the start of
;; fetching so the momentary `requested` state is observable in e2e; nothing
;; else is faked — the real fetch/extraction path still runs.
(ns fetcher
  (:require [clojure.string :as str]
            [domain]))

(def retrieve-failed "page could not be retrieved")
(def nothing-readable "no readable content found")

(defn- test-config [] (.-__printcastTestFetch js/window))

(defn- relay-url [url]
  (str "https://corsproxy.io/?url=" (js/encodeURIComponent url)))

(defn- fetch-html
  "js/Promise of the page's HTML: direct fetch, falling back to the relay."
  [url]
  (letfn [(text-or-throw [resp]
            (if (.-ok resp)
              (.text resp)
              (throw (js/Error. (str "HTTP " (.-status resp))))))]
    (-> (js/fetch url)
        (.then text-or-throw)
        (.catch (fn [_] (-> (js/fetch (relay-url url))
                            (.then text-or-throw)))))))

(defn- extract
  "Readable article {:title :text :excerpt} from an HTML string, or nil when
   the page has no meaningful readable content."
  [html url]
  (try
    (let [doc (.parseFromString (js/DOMParser.) html "text/html")
          article (.parse (js/Readability. doc))]
      (when (and article (domain/readable-text? (.-textContent article)))
        {:title (let [t (.-title article)] (if (str/blank? (str t)) url t))
         :text (.-textContent article)
         :excerpt (.-excerpt article)}))
    (catch :default e
      (js/console.warn "[fetcher] extraction failed" e)
      nil)))

(defn- run-fetch!
  "Fetch + extract, then report the outcome as complete-ingest/fail-ingest.
   Two-arg .then keeps extraction problems from masquerading as retrieval
   failures."
  [ingest-id url dispatch!]
  (-> (fetch-html url)
      (.then
       (fn [html]
         (if-let [{:keys [title text excerpt]} (extract html url)]
           (dispatch! {:kind "complete-ingest" :ingest-id ingest-id
                       :items [(domain/article-draft title text url excerpt)]})
           (dispatch! {:kind "fail-ingest" :ingest-id ingest-id
                       :reason nothing-readable})))
       (fn [_]
         (dispatch! {:kind "fail-ingest" :ingest-id ingest-id
                     :reason retrieve-failed})))))

(defn begin!
  "Run the fetch for a requested ingest: start-fetch, then the outcome.
   Deferred a macrotask (or the test hold) so `requested` gets a render."
  [ingest-id url dispatch!]
  (let [hold (or (some-> (test-config) .-holdMs) 0)]
    (js/setTimeout
     (fn []
       (dispatch! {:kind "start-fetch" :ingest-id ingest-id})
       (run-fetch! ingest-id url dispatch!))
     hold)))

(defn resume!
  "Boot reconcile: continue an ingest replayed as already `fetching` —
   no second start-fetch; complete/fail are accepted in `fetching`."
  [ingest-id url dispatch!]
  (run-fetch! ingest-id url dispatch!))

(println "[fetcher] loaded")
