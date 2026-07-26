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
(def feed-retrieve-failed "feed could not be retrieved")
(def no-episodes "no episodes found in the feed")

(defn- test-config [] (.-__printcastTestFetch js/window))

(defn- relay-url [url]
  (str "https://corsproxy.io/?url=" (js/encodeURIComponent url)))

(defn- fetch-text
  "js/Promise of the response body (HTML page or feed XML): direct fetch,
   falling back to the relay."
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
  (-> (fetch-text url)
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

;; ---------------------------------------------------------------------------
;; Feed path (since 05-podcast-feeds): same direct-then-relay retrieval,
;; DOMParser XML parse of RSS 2.0 (+ basic Atom) into episode drafts and
;; source metadata. Failures: feed-retrieve-failed / no-episodes.
;; ---------------------------------------------------------------------------

(defn- child-els
  "Direct child elements with the given (qualified) tag name."
  [parent tag]
  (->> (.from js/Array (.-children parent))
       (filterv #(= tag (.-tagName %)))))

(defn- child-el
  "First direct child element with the given (qualified) tag name."
  [parent tag]
  (first (child-els parent tag)))

(defn- child-text [parent tag]
  (when-let [el (child-el parent tag)]
    (let [t (str/trim (str (.-textContent el)))]
      (when-not (str/blank? t) t))))

(defn- to-iso
  "A feed date (RFC 822 pubDate or ISO Atom published) as ISO 8601, or nil."
  [s]
  (when-not (str/blank? (str s))
    (let [d (js/Date. s)]
      (when-not (js/isNaN (.getTime d))
        (.toISOString d)))))

(defn- rss-episode [item source-id]
  (let [enclosure (child-el item "enclosure")
        url (some-> enclosure (.getAttribute "url"))]
    (when-not (str/blank? (str url))
      (domain/episode-draft
       (or (child-text item "title") url) url
       {:duration (domain/parse-itunes-duration (child-text item "itunes:duration"))
        :published-at (to-iso (child-text item "pubDate"))
        :description (child-text item "description")
        :source-id source-id}))))

(defn- rss-artwork [channel]
  (or (some-> (child-el channel "itunes:image") (.getAttribute "href"))
      (some-> (child-el channel "image") (child-text "url"))))

(defn- parse-rss [channel source-id]
  {:source (cond-> {:source-id source-id}
             (child-text channel "title") (assoc :title (child-text channel "title"))
             (child-text channel "itunes:author") (assoc :author (child-text channel "itunes:author"))
             (rss-artwork channel) (assoc :artwork-url (rss-artwork channel)))
   :episodes (vec (keep #(rss-episode % source-id) (child-els channel "item")))})

(defn- atom-episode [entry source-id]
  (let [enclosure (->> (child-els entry "link")
                       (filter #(= "enclosure" (.getAttribute % "rel")))
                       first)
        url (some-> enclosure (.getAttribute "href"))]
    (when-not (str/blank? (str url))
      (domain/episode-draft
       (or (child-text entry "title") url) url
       {:duration (domain/parse-itunes-duration (child-text entry "itunes:duration"))
        :published-at (to-iso (or (child-text entry "published")
                                  (child-text entry "updated")))
        :description (or (child-text entry "summary") (child-text entry "content"))
        :source-id source-id}))))

(defn- parse-atom [feed source-id]
  {:source (cond-> {:source-id source-id}
             (child-text feed "title") (assoc :title (child-text feed "title"))
             (some-> (child-el feed "author") (child-text "name"))
             (assoc :author (some-> (child-el feed "author") (child-text "name")))
             (child-text feed "icon") (assoc :artwork-url (child-text feed "icon")))
   :episodes (vec (keep #(atom-episode % source-id) (child-els feed "entry")))})

(defn- parse-feed
  "{:source {...} :episodes [drafts]} from a feed XML string, or nil when the
   document is not a parsable RSS/Atom feed."
  [xml source-id]
  (try
    (let [doc (.parseFromString (js/DOMParser.) xml "text/xml")
          root (.-documentElement doc)]
      (when (zero? (.-length (.getElementsByTagName doc "parsererror")))
        (cond
          (= "rss" (.-tagName root))
          (some-> (child-el root "channel") (parse-rss source-id))

          (= "feed" (.-tagName root))
          (parse-atom root source-id))))
    (catch :default e
      (js/console.warn "[fetcher] feed parse failed" e)
      nil)))

(defn- run-feed-fetch!
  "Fetch + parse the feed, then report the outcome as complete-ingest (with
   the :source metadata block) or fail-ingest. Two-arg .then keeps parse
   problems from masquerading as retrieval failures."
  [ingest-id feed-url source-id dispatch!]
  (-> (fetch-text feed-url)
      (.then
       (fn [xml]
         (let [{:keys [source episodes]} (parse-feed xml source-id)]
           (if (seq episodes)
             (dispatch! {:kind "complete-ingest" :ingest-id ingest-id
                         :items episodes :source source})
             (dispatch! {:kind "fail-ingest" :ingest-id ingest-id
                         :reason no-episodes}))))
       (fn [_]
         (dispatch! {:kind "fail-ingest" :ingest-id ingest-id
                     :reason feed-retrieve-failed})))))

(defn begin-feed!
  "Run the fetch for a requested feed ingest (begin! for feeds)."
  [ingest-id feed-url source-id dispatch!]
  (let [hold (or (some-> (test-config) .-holdMs) 0)]
    (js/setTimeout
     (fn []
       (dispatch! {:kind "start-fetch" :ingest-id ingest-id})
       (run-feed-fetch! ingest-id feed-url source-id dispatch!))
     hold)))

(defn resume-feed!
  "Boot reconcile: continue a feed ingest replayed as already `fetching`."
  [ingest-id feed-url source-id dispatch!]
  (run-feed-fetch! ingest-id feed-url source-id dispatch!))

(println "[fetcher] loaded")
