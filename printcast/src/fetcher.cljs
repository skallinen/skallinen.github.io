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
(def no-document-text "no readable text was found")
(def document-unreadable "document could not be read")
(def document-gone "document is no longer available")

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

(defn- begin-after-hold!
  "Enter the fetch for a requested ingest: start-fetch, then run the given
   retrieval/extraction. Deferred a macrotask (or the test hold) so
   `requested` gets a render."
  [ingest-id dispatch! run!]
  (let [hold (or (some-> (test-config) .-holdMs) 0)]
    (js/setTimeout
     (fn []
       (dispatch! {:kind "start-fetch" :ingest-id ingest-id})
       (run!))
     hold)))

(defn begin!
  "Run the fetch for a requested url ingest."
  [ingest-id url dispatch!]
  (begin-after-hold! ingest-id dispatch! #(run-fetch! ingest-id url dispatch!)))

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
  (begin-after-hold! ingest-id dispatch!
                     #(run-feed-fetch! ingest-id feed-url source-id dispatch!)))

(defn resume-feed!
  "Boot reconcile: continue a feed ingest replayed as already `fetching`."
  [ingest-id feed-url source-id dispatch!]
  (run-feed-fetch! ingest-id feed-url source-id dispatch!))

;; ---------------------------------------------------------------------------
;; Document path (since 07-documents): the captured file's bytes are transient
;; edge state — stashed here under the ingest's opaque document-ref by the UI
;; when the file is picked, never persisted, dropped once extraction reports
;; an outcome. Only the extracted TEXT rides ingest-completed (like articles).
;; A ref whose bytes are gone (reload) fails with "document is no longer
;; available"; the retry affordance re-prompts for the file.
;;
;; Extraction: pdf.js (pinned legacy/UMD CDN build, main-thread fake worker
;; via the plain-script window.pdfjsWorker — decisions.md). Per-page text via
;; getTextContent; metadata Title with the file-name-minus-extension fallback
;; (domain/document-title); top-level outline entries become {title, position}
;; draft sections, best-effort only (enabling groundwork for slice 10).
;; ---------------------------------------------------------------------------

(defonce ^:private document-bytes (atom {}))     ; document-ref → js/ArrayBuffer

(defn stash-document!
  "Hold a picked file's bytes for the extraction edge under the capture's
   document-ref (also the retry path: new bytes under the same ref)."
  [document-ref array-buffer]
  (swap! document-bytes assoc document-ref array-buffer))

(defn- load-pdf
  "js/Promise of the pdf.js document proxy (a sync throw — e.g. pdf.js not
   loaded — becomes a rejection)."
  [array-buffer]
  (try
    (.-promise (js/pdfjsLib.getDocument #js {:data (js/Uint8Array. array-buffer)}))
    (catch :default e (js/Promise.reject e))))

(defn- page-texts
  "js/Promise of a vector of per-page extracted text."
  [pdf]
  (-> (js/Promise.all
       (to-array
        (map (fn [i]
               (-> (.getPage pdf i)
                   (.then (fn [page] (.getTextContent page)))
                   (.then (fn [tc]
                            (->> (.-items tc)
                                 (map #(.-str %))
                                 (remove #(str/blank? (str %)))
                                 (str/join " "))))))
             (range 1 (inc (.-numPages pdf))))))
      (.then vec)))

(defn- metadata-title
  "js/Promise of the document's embedded Title, or nil."
  [pdf]
  (-> (.getMetadata pdf)
      (.then (fn [md]
               (let [t (some-> md .-info .-Title)]
                 (when-not (str/blank? (str t)) t))))
      (.catch (fn [_] nil))))

(defn- outline-sections
  "js/Promise of the top-level outline entries as {:title :position} section
   drafts (position = estimated seconds at the entry's page). Best-effort:
   any problem — no outline, unresolvable destination — yields []."
  [pdf pages]
  (-> (.getOutline pdf)
      (.then
       (fn [outline]
         (if (nil? outline)
           (js/Promise.resolve #js [])
           (js/Promise.all
            (to-array
             (map (fn [entry]
                    (-> (let [dest (.-dest entry)]
                          (if (string? dest) (.getDestination pdf dest)
                              (js/Promise.resolve dest)))
                        (.then (fn [dest] (.getPageIndex pdf (aget dest 0))))
                        (.then (fn [idx]
                                 {:title (str (.-title entry))
                                  :position (domain/page-start-seconds pages idx)}))
                        (.catch (fn [_] nil))))
                  outline))))))
      (.then (fn [entries] (vec (remove nil? entries))))
      (.catch (fn [_] []))))

(defn- run-document-extract!
  "Extract the stashed bytes, then report the outcome as complete-ingest or
   fail-ingest. Missing bytes (reload lost the transient stash) fail with
   document-gone; a parse failure with document-unreadable; a text layer
   below the readable threshold with no-document-text."
  [ingest-id document-ref file-name dispatch!]
  (if-let [buf (get @document-bytes document-ref)]
    (-> (load-pdf buf)
        (.then
         (fn [pdf]
           (-> (page-texts pdf)
               (.then
                (fn [pages]
                  (let [text (str/join "\n" pages)]
                    (if (domain/readable-text? text)
                      (-> (js/Promise.all #js [(metadata-title pdf)
                                               (outline-sections pdf pages)])
                          (.then (fn [res]
                                   (dispatch! {:kind "complete-ingest" :ingest-id ingest-id
                                               :items [(domain/document-draft
                                                        (domain/document-title (aget res 0) file-name)
                                                        file-name text (aget res 1))]}))))
                      (dispatch! {:kind "fail-ingest" :ingest-id ingest-id
                                  :reason no-document-text}))))))))
        (.catch (fn [e]
                  (js/console.warn "[fetcher] document extraction failed" e)
                  (dispatch! {:kind "fail-ingest" :ingest-id ingest-id
                              :reason document-unreadable})))
        (.finally (fn [] (swap! document-bytes dissoc document-ref))))
    (dispatch! {:kind "fail-ingest" :ingest-id ingest-id :reason document-gone})))

(defn begin-document!
  "Run the extraction for a requested document ingest (begin! for files)."
  [ingest-id document-ref file-name dispatch!]
  (begin-after-hold! ingest-id dispatch!
                     #(run-document-extract! ingest-id document-ref file-name dispatch!)))

(defn resume-document!
  "Boot reconcile: continue a document ingest replayed as already `fetching`
   — with the transient bytes gone this fails cleanly as document-gone."
  [ingest-id document-ref file-name dispatch!]
  (run-document-extract! ingest-id document-ref file-name dispatch!))

(println "[fetcher] loaded")
