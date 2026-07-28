;; Edge: the fetch-execution policy (docs/contexts/ingestion). An edge
;; process, not a pure `domain/policies` entry: it does network I/O and its
;; outcomes arrive asynchronously. Wired from dispatch/run-effects! on
;; url-captured / ingest-retried (dispatch! is passed in, like the speech
;; callbacks, to keep the namespaces acyclic).
;;
;; Retrieval: an ordered chain of attempts (domain/retrieval-relays, and the
;; decision + privacy caveat in docs/plan/03-web-articles/decisions.md) —
;; direct fetch of the URL, then each relay that passes the resource through
;; untouched, then the reader relay, which returns its own readable rendition.
;; Extraction is part of each attempt, so a page that relays fine but yields
;; nothing readable still gets the next attempt's shot at it. Every attempt
;; failing → "page could not be retrieved"; something retrieved but nothing
;; readable in any of them → "no readable content found".
;;
;; Extraction: Mozilla Readability (CDN classic-script global) over a
;; DOMParser document for HTML; pdf.js for a PDF address or an
;; application/pdf response (the same extraction the file-input path uses);
;; the reader relay's rendition taken as prose. A null parse, an extraction
;; error, or too little text (domain/readable-text?) makes an attempt yield
;; nothing.
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

;; ---------------------------------------------------------------------------
;; Retrieval — the attempt chain
;; ---------------------------------------------------------------------------

(def ^:private pass-through-relays
  "Relays that hand back the resource itself; usable for any content type."
  (vec (remove :renders? domain/retrieval-relays)))

(def ^:private reader-relay
  "The relay that answers with its own readable rendition of a page."
  (first (filter :renders? domain/retrieval-relays)))

(defn- ok-response [resp]
  (if (.-ok resp)
    resp
    (throw (js/Error. (str "HTTP " (.-status resp))))))

(defn- first-resolving
  "js/Promise of the first attempt (a thunk returning a promise) that
   resolves; rejects once every attempt has failed."
  [attempts]
  (reduce (fn [p attempt] (.catch p (fn [_] (attempt))))
          (js/Promise.reject (js/Error. "no attempt"))
          attempts))

(defn- pdf-response?
  "Does this response body hold a PDF — by the address's extension, or by the
   content type the server actually declared?"
  [url resp]
  (or (domain/pdf-url? url)
      (boolean (some-> (.get (.-headers resp) "content-type")
                       str/lower-case
                       (str/includes? "application/pdf")))))

(def ^:private relay-timeout-ms
  "How long one relay gets before the chain moves on. Bounded so a relay that
   hangs (observed: twenty seconds and no answer) cannot eat the attempts
   behind it. The direct fetch is deliberately not capped — a large document
   coming straight from its own site is allowed to take its time."
  20000)

(defn- relay-opts
  "Fetch options for a relay request: bounded, plus any headers given."
  ([] (relay-opts nil))
  ([headers]
   (let [o #js {:signal (js/AbortSignal.timeout relay-timeout-ms)}]
     (when headers (set! (.-headers o) headers))
     o)))

(defn- fetch-resource
  "js/Promise of {:as :html|:bytes :body …} — the resource itself, retrieved
   directly or relayed untouched."
  [url address]
  (-> (if (= address url) (js/fetch address) (js/fetch address (relay-opts)))
      (.then ok-response)
      (.then (fn [resp]
               (if (pdf-response? url resp)
                 (.then (.arrayBuffer resp) (fn [b] {:as :bytes :body b}))
                 (.then (.text resp) (fn [t] {:as :html :body t})))))))

(defn- fetch-rendition
  "js/Promise of the reader relay's rendition: {:as :html} when asked for the
   page's own markup (so extraction still does the boilerplate removal),
   {:as :prose} for its readable text — the last resort, and the only one
   that reaches a page whose markup carries no article at all."
  [url markup?]
  (-> (js/fetch (domain/relay-url reader-relay url)
                (relay-opts (when markup? #js {"x-return-format" "html"})))
      (.then ok-response)
      (.then #(.text %))
      (.then (fn [t] {:as (if markup? :html :prose) :body t}))))

(defn- fetch-text
  "js/Promise of the response body as text (a feed document): direct fetch,
   then each pass-through relay. The reader relay is not in this chain — it
   answers with prose, which is not a feed."
  [url]
  (letfn [(text-at [address]
            (fn [] (-> (js/fetch address) (.then ok-response) (.then #(.text %)))))]
    (first-resolving
     (cons (text-at url)
           (map #(text-at (domain/relay-url % url)) pass-through-relays)))))

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

;; PDF extraction (pdf.js — pinned legacy/UMD CDN build, main-thread fake
;; worker via the plain-script window.pdfjsWorker; decisions.md). Shared by
;; both ways a document reaches printcast: picked as a file (07-documents) and
;; retrieved from an address (the post-release fix in 03's decisions.md).

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

(defn- document-title
  "The item's title: the document's own embedded title, falling back to a name
   derived from the address it was retrieved from, or — for a document picked
   as a file — from the file's name."
  [metadata-title file-name url]
  (if url
    (domain/document-title-for-url metadata-title url)
    (domain/document-title metadata-title file-name)))

(defn- pdf-draft
  "js/Promise of the document item draft for PDF bytes — embedded title with
   the file-name fallback, outline entries as sections, and (when the bytes
   came from an address) that address on the origin. Resolves nil when the
   document's text layer is below the readable threshold; rejects when the
   bytes are not a readable PDF at all."
  [array-buffer file-name url]
  (-> (load-pdf array-buffer)
      (.then
       (fn [pdf]
         (-> (page-texts pdf)
             (.then
              (fn [pages]
                (let [text (str/join "\n" pages)]
                  (when (domain/readable-text? text)
                    (-> (js/Promise.all #js [(metadata-title pdf)
                                             (outline-sections pdf pages)])
                        (.then (fn [res]
                                 (domain/document-draft
                                  (document-title (aget res 0) file-name url)
                                  file-name text (aget res 1) url)))))))))))))

;; ---------------------------------------------------------------------------
;; URL path (since 03-web-articles): the attempt chain, one draft out
;; ---------------------------------------------------------------------------

(defn- payload-draft
  "js/Promise of the item draft for one retrieved payload, or nil when it
   holds nothing readable. A PDF address yields a document draft — the same
   kind the file-input path produces — whether its bytes or the reader's
   rendition of it is what came back."
  [{:keys [as body]} url]
  (case as
    :bytes (pdf-draft body (domain/url-file-name url) url)

    :html (js/Promise.resolve
           (when-let [{:keys [title text excerpt]} (extract body url)]
             (domain/article-draft title text url excerpt)))

    :prose (js/Promise.resolve
            (let [{:keys [title text]} (domain/parse-reader-page body)
                  prose (domain/markdown->text text)]
              (when (domain/readable-text? prose)
                (if (domain/pdf-url? url)
                  (domain/document-draft (domain/document-title-for-url title url)
                                         (domain/url-file-name url) prose [] url)
                  (domain/article-draft (or title url) prose url nil)))))))

(defn- payload-substantial?
  "Did this attempt actually bring the thing back? An empty body — or a
   rendition the reader could not fill — is a failed retrieval, not a page
   that happens to hold no readable content."
  [{:keys [as body]}]
  (case as
    :bytes (pos? (.-byteLength body))
    :prose (not (str/blank? (:text (domain/parse-reader-page body))))
    (not (str/blank? (str body)))))

(defn- attempts
  "The ordered retrieval attempts for `url`, each a thunk of a js/Promise of
   a payload. `seen!` is called with every payload that actually arrived, so
   the failure reason can tell 'never reached it' from 'nothing to read'."
  [url seen!]
  (letfn [(step [f]
            (fn []
              (-> (f)
                  (.then (fn [payload]
                           (when (payload-substantial? payload) (seen! payload))
                           (payload-draft payload url)))
                  (.then (fn [draft]
                           (if draft draft (throw (js/Error. "nothing readable"))))))))]
    (concat
     [(step #(fetch-resource url url))]
     ;; the relays in their declared order; the rendering one is asked for the
     ;; page's own markup here, so extraction still does the boilerplate work
     (map (fn [relay]
            (if (:renders? relay)
              (step #(fetch-rendition url (not (domain/pdf-url? url))))
              (step #(fetch-resource url (domain/relay-url relay url)))))
          domain/retrieval-relays)
     ;; last resort: the rendering relay's readable prose, the only thing that
     ;; reaches a page whose markup carries no article at all
     [(step #(fetch-rendition url false))])))

(defn- run-fetch!
  "Work the attempt chain, then report the outcome as complete-ingest /
   fail-ingest. The reason distinguishes never having retrieved the page from
   having retrieved it and found nothing worth reading aloud."
  [ingest-id url dispatch!]
  (let [retrieved? (atom false)]
    (-> (first-resolving (attempts url #(reset! retrieved? true)))
        (.then
         (fn [draft]
           (dispatch! {:kind "complete-ingest" :ingest-id ingest-id :items [draft]}))
         (fn [_]
           (dispatch! {:kind "fail-ingest" :ingest-id ingest-id
                       :reason (if @retrieved? nothing-readable retrieve-failed)}))))))

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
;; Extraction is the shared `pdf-draft` above — the same pdf.js path a
;; document retrieved from an address goes through.
;; ---------------------------------------------------------------------------

(defonce ^:private document-bytes (atom {}))     ; document-ref → js/ArrayBuffer

(defn stash-document!
  "Hold a picked file's bytes for the extraction edge under the capture's
   document-ref (also the retry path: new bytes under the same ref)."
  [document-ref array-buffer]
  (swap! document-bytes assoc document-ref array-buffer))

(defn- run-document-extract!
  "Extract the stashed bytes, then report the outcome as complete-ingest or
   fail-ingest. Missing bytes (reload lost the transient stash) fail with
   document-gone; a parse failure with document-unreadable; a text layer
   below the readable threshold with no-document-text."
  [ingest-id document-ref file-name dispatch!]
  (if-let [buf (get @document-bytes document-ref)]
    (-> (pdf-draft buf file-name nil)
        (.then
         (fn [draft]
           (if draft
             (dispatch! {:kind "complete-ingest" :ingest-id ingest-id :items [draft]})
             (dispatch! {:kind "fail-ingest" :ingest-id ingest-id
                         :reason no-document-text}))))
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
