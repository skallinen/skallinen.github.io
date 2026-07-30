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
  {:ingests {}                                   ; ingest-id → {:state … + capture info}
   :items   {}                                   ; item-id → item (+ :status)
   :sources {}                                   ; source-id → source aggregate (since 05)
   :queue   []                                   ; item-ids, play order
   :player  {:state "idle" :item-id nil :position 0 :speed 1}
   ;; read-side folds (since 10-sleep-chapters-history): what the listening
   ;; history / stats projections are built from
   :listens {}                                   ; item-id → {:last-played-at :finished}
   :stats   {:total-listened 0 :items-finished 0 :time-saved-by-speed 0}})

(defn- ingest-state [state ingest-id]
  (get-in state [:ingests ingest-id :state]))

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

;; -- Chapters from headings (since 10-sleep-chapters-history) ---------------
;; Pasted text's top-level headings are markdown-style `# ` lines (single #);
;; documents get their sections from the PDF outline at the extraction edge.

(defn strip-heading-markers
  "The text with its top-level `# ` markers removed, so speech reads a
   heading's words plainly. Deeper levels (##…) are left untouched."
  [text]
  (->> (str/split-lines (str text))
       (map (fn [line]
              (if-let [[_ title] (re-matches #"# +(.*)" line)] title line)))
       (str/join "\n")))

(defn text-sections
  "The top-level `# ` headings of pasted text as {:title :position} section
   drafts — position = estimated seconds of the spoken words before the
   heading (150 wpm over the stripped content), the docs' duration domain
   type. Empty when the text has no top-level headings."
  [text]
  (loop [lines (str/split-lines (str text)), words 0, out []]
    (if (empty? lines)
      out
      (let [line (first lines)
            [_ title] (re-matches #"# +(.*)" line)]
        (recur (rest lines)
               (+ words (word-count (or title line)))
               (if title
                 (conj out {:title (str/trim title)
                            :position (js/Math.round (* 60 (/ words words-per-minute)))})
                 out))))))

(defn section-start-chunk
  "The chunk index a section positioned at `seconds` starts at: the first
   chunk whose exact start (cumulative words at 150 wpm) reaches
   seconds − 0.5. The half-second tolerance absorbs the rounding of stored
   section positions, so a jump lands on the chunk beginning the heading's
   own text (since 10-sleep-chapters-history)."
  [text seconds]
  (let [cs (chunks text)
        n (count cs)]
    (loop [i 0 words 0]
      (if (>= i n)
        (max 0 (dec n))
        (if (>= (* 60 (/ words words-per-minute)) (- seconds 0.5))
          i
          (recur (inc i) (+ words (word-count (nth cs i)))))))))

(def min-readable-words
  "Fewer words than this is boilerplate scraps, not an article
   (03-web-articles failure taxonomy: \"no readable content found\")."
  25)

(defn readable-text?
  "Did extraction yield enough text to be worth reading aloud?"
  [text]
  (>= (word-count (or text "")) min-readable-words))

(defn normalize-whitespace
  "Collapse extraction whitespace runs (indentation, newlines) to single
   spaces so speech chunks and duration estimates see clean prose."
  [s]
  (str/replace (str/trim (str s)) #"\s+" " "))

(defn article-draft
  "The complete-ingest item draft for an extracted web article
   (docs/contexts/ingestion/.../intents/complete-ingest.md)."
  [title text url excerpt]
  (let [content (normalize-whitespace text)
        origin (cond-> nil
                 url (assoc :url url)
                 (not (str/blank? (str excerpt))) (assoc :excerpt (normalize-whitespace excerpt)))]
    (cond-> {:title (normalize-whitespace title)
             :kind "web-article"
             :content content
             :duration-estimate (estimate-duration content)}
      origin (assoc :origin origin))))

(defn elapsed-seconds
  "Seconds of speech already heard: the words in the consumed chunks
   (position = index of the next chunk to speak) at the speaking speed.
   The docs give `position` the duration domain type; slice 01 records the
   sentence-chunk index, so seconds are estimated at the same 150 wpm as
   `estimate-duration` (decision in 02-queue-management/decisions.md)."
  [text position]
  (let [heard-words (reduce + (map word-count (take position (chunks text))))]
    (js/Math.round (* 60 (/ heard-words words-per-minute)))))

(defn chunk-at
  "The chunk index speaking at `seconds` into the text — the inverse of
   `elapsed-seconds`, at the same 150 wpm estimate. Clamps to
   [0, chunk count]; the chunk count itself means the end of the item
   (since 04-player-controls: the seconds↔chunk mapping behind seek/skip)."
  [text seconds]
  (let [cs (chunks text)
        n (count cs)]
    (loop [i 0 words-heard 0]
      (if (>= i n)
        n
        (let [words-through (+ words-heard (word-count (nth cs i)))
              chunk-end-secs (* 60 (/ words-through words-per-minute))]
          (if (< seconds chunk-end-secs)
            i
            (recur (inc i) words-through)))))))

;; ---------------------------------------------------------------------------
;; Recording helpers (since 05-podcast-feeds: an episode's position is seconds
;; of audio time — the docs' duration domain type directly; text items keep
;; the standing chunk-index decision)
;; ---------------------------------------------------------------------------

(defn recording?
  "Does the item play an audio recording (podcast episode) rather than
   synthesized speech?"
  [item]
  (not (str/blank? (str (:recording-url item)))))

(defn item-elapsed-seconds
  "Seconds of the item already heard: the position itself for a recording,
   the consumed-chunk estimate for a text item."
  [item position]
  (if (recording? item)
    (or position 0)
    (elapsed-seconds (or (:content item) "") (or position 0))))

(defn position-for-seconds
  "The item position at `seconds` in: clamped seconds for a recording,
   the chunk index (chunk-at) for a text item."
  [item seconds]
  (if (recording? item)
    (-> seconds (max 0) (min (:duration-estimate item)))
    (chunk-at (or (:content item) "") seconds)))

(defn parse-itunes-duration
  "itunes:duration → seconds. Accepts SS, MM:SS, or HH:MM:SS; nil when blank
   or unparsable."
  [s]
  (when-not (str/blank? (str s))
    (let [parts (mapv #(js/parseInt % 10) (str/split (str/trim (str s)) #":"))]
      (when (every? #(and (number? %) (not (js/isNaN %))) parts)
        (case (count parts)
          1 (nth parts 0)
          2 (+ (* 60 (nth parts 0)) (nth parts 1))
          3 (+ (* 3600 (nth parts 0)) (* 60 (nth parts 1)) (nth parts 2))
          nil)))))

(def max-excerpt-chars
  "An origin excerpt is a teaser, not the full show notes — real feeds carry
   multi-KB descriptions per episode, which would bloat every ingest event
   (found ratifying against a real 1000-episode feed; decisions.md)."
  280)

(defn excerpt-of
  "The description normalized and truncated to an excerpt, or nil when blank."
  [description]
  (when-not (str/blank? (str description))
    (let [text (normalize-whitespace description)]
      (if (> (count text) max-excerpt-chars)
        (str (subs text 0 max-excerpt-chars) "…")
        text))))

(defn episode-draft
  "The complete-ingest item draft for one feed episode
   (docs/contexts/ingestion/.../intents/complete-ingest.md)."
  [title recording-url {:keys [duration published-at description source-id]}]
  (cond-> {:title (normalize-whitespace title)
           :kind "podcast-episode"
           :recording-url recording-url
           :duration-estimate (or duration 0)
           :origin (cond-> {:source-id source-id}
                     (excerpt-of description)
                     (assoc :excerpt (excerpt-of description)))}
    published-at (assoc :published-at published-at)))

;; ---------------------------------------------------------------------------
;; Document helpers (since 07-documents: extraction resolves the item title
;; from the document's embedded metadata, falling back to the file name minus
;; its extension — the spec-level decision in docs/plan/07-documents/plan.md)
;; ---------------------------------------------------------------------------

(defn- extension-start
  "Where this name's file extension begins — the index of the dot — or nil
   when it carries no extension. Only a suffix that actually looks like an
   extension counts: a short run starting with a letter. So a dotted
   identifier (`1706.03762`), a bare dotfile (`.hidden`) and an undotted name
   carry none."
  [name]
  (let [n (str name)
        i (str/last-index-of n ".")]
    (when (and i (pos? i)
               (re-matches #"[A-Za-z][A-Za-z0-9]{0,4}" (subs n (inc i))))
      i)))

(defn file-name-sans-extension
  "The file name without its last extension; a name with no extension (or a
   bare dotfile) is kept whole."
  [file-name]
  (let [n (str file-name)]
    (if-let [i (extension-start n)] (subs n 0 i) n)))

(defn document-title
  "The document's embedded metadata title, falling back to the file name
   minus its extension."
  [metadata-title file-name]
  (if (str/blank? (str metadata-title))
    (file-name-sans-extension file-name)
    (normalize-whitespace metadata-title)))

(defn page-start-seconds
  "Estimated seconds of speech before the given page begins: the words on
   the preceding pages at the same 150 wpm as `estimate-duration`. Positions
   the outline sections (enabling-only groundwork for slice 10 chapters)."
  [page-texts page-index]
  (let [words (reduce + 0 (map word-count (take page-index page-texts)))]
    (js/Math.round (* 60 (/ words words-per-minute)))))

(defn document-draft
  "The complete-ingest item draft for an extracted document
   (docs/contexts/ingestion/.../intents/complete-ingest.md). `sections` are
   the document's outline entries as {title, position}; they stay on the
   draft only (add-item's sections field is populated from slice 10). The
   4-arity is a document picked as a file; the 5-arity adds the address a
   document retrieved by URL came from (both fields are `origin` properties
   in the complete-ingest schema)."
  ([title file-name text sections] (document-draft title file-name text sections nil))
  ([title file-name text sections url]
   (let [content (normalize-whitespace text)]
     (cond-> {:title (normalize-whitespace title)
              :kind "document"
              :content content
              :origin (cond-> {:file-name file-name}
                        (not (str/blank? (str url))) (assoc :url url))
              :duration-estimate (estimate-duration content)}
       (seq sections) (assoc :sections (vec sections))))))

;; ---------------------------------------------------------------------------
;; Retrieval addressing (since the post-release defect fix recorded in
;; docs/plan/03-web-articles/decisions.md). The *pure* half of the fetch edge:
;; which relays exist and in what order, how each one's address is built for a
;; target URL, whether a URL names a document rather than a web page, and how
;; the reader service's plain-text rendition is turned back into title + prose.
;; Keeping these here (rather than in fetcher.cljs) is what makes them
;; unit-testable under nbb — the edge keeps only the I/O.
;; ---------------------------------------------------------------------------

(def retrieval-relays
  "Public relays tried, in order, when a page will not answer the app
   directly. `:query` relays carry the target as one percent-encoded query
   parameter; `:path` relays take it appended verbatim. `:renders?` marks a
   relay that can answer with its own rendition of the page as well as with
   the page's own markup. Order is by measured cost, not by kind: the
   rendering relay sits ahead of the last pass-through one because it answers
   in about a second where that one has been observed to take twenty, and
   asking it for the markup means extraction still does the boilerplate
   removal (evidence in docs/plan/03-web-articles/decisions.md)."
  [{:id "corsproxy" :form :query :prefix "https://corsproxy.io/?url="}
   {:id "reader" :form :path :prefix "https://r.jina.ai/" :renders? true}
   {:id "allorigins" :form :query :prefix "https://api.allorigins.win/raw?url="}])

(defn relay-url
  "The address to request for `url` through `relay`. A `:query` relay's target
   is percent-encoded as a single component — an already-escaped path (a
   non-ASCII article slug) is escaped again on purpose, so the relay's own
   single decode restores the target exactly. A `:path` relay's target is
   appended verbatim, since encoding it would hide the target's own escapes."
  [relay url]
  (str (:prefix relay)
       (if (= :query (:form relay)) (js/encodeURIComponent url) url)))

(defn- url-path
  "The path portion of a URL — no query, no fragment."
  [url]
  (-> (str url) (str/split #"[?#]") first))

(defn pdf-url?
  "Does this address name a PDF document rather than a web page? Decided on
   the path's extension; the retrieved content type is the edge's own,
   stronger check."
  [url]
  (str/ends-with? (str/lower-case (url-path url)) ".pdf"))

(defn- url-parts
  "`url`'s host and path segments: scheme stripped, split on the separator."
  [url]
  (-> (url-path url) (str/replace #"^[a-zA-Z]+://" "") (str/split #"/")))

(defn- url-host
  "The host part of `url`, scheme stripped."
  [url]
  (first (url-parts url)))

(defn- url-last-segment
  "The last path segment of `url` with its escapes decoded — nil when the
   address carries no path segment to name anything by (the host is not one)."
  [url]
  (let [segment (last (remove str/blank? (rest (url-parts url))))
        decoded (try (js/decodeURIComponent (str segment))
                     (catch :default _ (str segment)))]
    (when-not (or (str/blank? decoded) (str/includes? decoded ":"))
      decoded)))

(defn url-file-name
  "The name to file a document retrieved from `url` under: the last path
   segment with its escapes decoded, falling back to the host when the address
   has no usable segment."
  [url]
  (or (url-last-segment url) (url-host url)))

(defn merely-a-file-name?
  "Is this recorded title a file name rather than the name of a work (since
   13-document-naming)? True for a **bare name carrying a file extension**:
   one unbroken run of characters — no whitespace anywhere — that ends in a
   suffix `file-name-sans-extension` recognises as a genuine extension.
   `blei03a.dvi` and `report_final_v3.docx` are file names; `1706.03762` and
   `NIST.SP.800-63-3` are not (a dotted identifier is not an extension), and
   neither is anything with a space in it — a title that merely contains a
   dot, `PostgreSQL 16.14 Documentation` or a sentence with a full stop, is
   prose and stays."
  [title]
  (let [s (str/trim (str title))]
    (boolean (and (not (str/blank? s))
                  (not (re-find #"\s" s))
                  (extension-start s)))))

(defn document-title-for-url
  "The title of a document retrieved from `url` (since 12-documents-by-address;
   refined by 13-document-naming): the title the document records for itself,
   unless it records none or what it records is merely a file name — then a
   name derived from the address. That name is the last path segment minus a
   suffix that really is a file extension — `blei03a.pdf` is filed as
   `blei03a`, the dotted identifier `1706.03762` keeps all of itself. When the
   address has no segment to name it by, the host names it and is kept whole:
   a top-level domain is not a file extension, so a document at
   `https://example.org/` is never called `example`."
  [metadata-title url]
  (if (or (str/blank? (str metadata-title))
          (merely-a-file-name? metadata-title))
    (if-let [segment (url-last-segment url)]
      (file-name-sans-extension segment)
      (url-host url))
    (normalize-whitespace metadata-title)))

(def ^:private reader-content-marker "Markdown Content:")

(defn parse-reader-page
  "{:title :text} from the reader service's plain-text rendition: a header
   block of `Label: value` lines (Title, source address, publication time,
   any warnings) followed by the content marker and the prose. A rendition
   with no marker is all prose; a blank title is no title."
  [body]
  (let [s (str body)
        i (str/index-of s reader-content-marker)
        header (if i (subs s 0 i) "")
        text (str/trim (if i (subs s (+ i (count reader-content-marker))) s))
        title (some->> (str/split-lines header)
                       (filter #(str/starts-with? % "Title:"))
                       first
                       (#(str/trim (subs % (count "Title:")))))]
    {:title (when-not (str/blank? (str title)) title)
     :text text}))

(defn markdown->text
  "The reader's markup as speakable prose: images dropped, links read as their
   words and never their addresses, heading/emphasis/quote/list markers
   stripped. Whitespace is left alone — `article-draft` normalizes it."
  [md]
  (-> (str md)
      (str/replace #"!\[[^\]]*\]\([^)]*\)" "")            ; images
      (str/replace #"\[([^\]]*)\]\([^)]*\)" "$1")         ; inline links
      (str/replace #"<https?://[^>\s]*>" "")              ; bare autolinks
      (str/replace #"(?m)^\s{0,3}#{1,6}\s+" "")           ; headings
      (str/replace #"(?m)^\s{0,3}>\s?" "")                ; block quotes
      (str/replace #"(?m)^\s{0,3}[-*+]\s+" "")            ; bullets
      (str/replace #"(?m)^\s*[-*_]{3,}\s*$" "")           ; rules
      (str/replace #"\*\*([^*]+)\*\*" "$1")               ; strong
      (str/replace #"(?<![\w*])\*([^*\n]+)\*(?![\w*])" "$1")
      (str/replace #"(?<![\w_])_([^_\n]+)_(?![\w_])" "$1")
      (str/replace #"`+" "")))

;; ---------------------------------------------------------------------------
;; External capture payload (since 09-capture-extension): the fixed contract
;; both tracks build to — the external channel navigates to the app with
;; `#capture=<base64url(UTF-8 JSON)>`, JSON {v:1, kind:"url"|"text", url,
;; title?, text?}. The mapping payload → intent is pure (string in, intent
;; map or nil out) and lives here so nbb unit-tests it; delivery, fragment
;; clearing, and the fail-safe warning are the edge's (main.cljs).
;; ---------------------------------------------------------------------------

(defn- base64url->utf8
  "The UTF-8 string behind a base64url payload (- _ alphabet, no padding),
   or nil when the string is not decodable base64."
  [s]
  (try
    (let [b64 (-> (str s) (str/replace "-" "+") (str/replace "_" "/"))
          pad (mod (- 4 (mod (count b64) 4)) 4)
          bin (js/atob (str b64 (apply str (repeat pad "="))))
          bytes (js/Uint8Array.from bin (fn [ch] (.charCodeAt ch 0)))]
      (.decode (js/TextDecoder. "utf-8") bytes))
    (catch :default _ nil)))

(defn capture-intent
  "The capture intent carried by an external #capture= payload: kind url →
   capture-url, kind text → capture-text, both with :channel \"external\";
   nil for anything malformed — bad base64url, bad JSON, non-object JSON,
   v ≠ 1, unknown kind, missing/blank url or text (fail-safe: the edge
   warns and ignores). Payload fields with no home in the intent schemas
   (title on a url capture, url on a text capture) are dropped — the
   intent schemas are the contract."
  [payload]
  (when-let [json (base64url->utf8 payload)]
    (let [parsed (try (js->clj (js/JSON.parse json)) (catch :default _ nil))
          {:strs [v kind url title text]} (when (map? parsed) parsed)]
      (cond
        (not= 1 v) nil

        (and (= "url" kind) (not (str/blank? (str url))))
        {:kind "capture-url" :url url :channel "external"}

        (and (= "text" kind) (not (str/blank? (str text))))
        (cond-> {:kind "capture-text" :text text :channel "external"}
          (not (str/blank? (str title))) (assoc :title title))

        :else nil))))

;; ---------------------------------------------------------------------------
;; The order the voices are offered in (since 14-voice-picker-order; the
;; order follows a declared alphabet since 18-an-alphabet-not-a-numbering)
;;
;; The list of candidate voices is edge state, not a read model — an external
;; capability read at the UI edge (08-voices-and-settings ticket 04) — and
;; ordering it does not make it one. What lives here is only the RULE: a total
;; function from a list of offered voices (and the alphabet in force, an
;; explicit argument) to the same list in order, reading
;; no state, no clock and nothing from the interface. It sits with the other
;; pure rules the edges call (retrieval addressing, document naming) for the
;; same reason those do: it is unit-testable at a scale the interface cannot
;; be driven at, and both pickers reach the one ordering instead of each
;; sorting for itself — which is how the library and a source's page came to
;; disagree in 11-item-ordering.
;; ---------------------------------------------------------------------------

;; The alphabet a name is read by (since 18-an-alphabet-not-a-numbering).
;; It is DATA, not behaviour — declared in the slice's spec layer and
;; mirrored here like every other contract (WAY-OF-WORKING §5) — because the
;; conventional alternative, asking the runtime for its collation tables,
;; gives an answer that varies by machine and runner, and a listing order in
;; this app must be totally determined (HANDOVER §7). The alphabet in force
;; is an explicit argument to the ordering rule; today the app has exactly
;; one, and the caller supplies it as a constant. The day it becomes a
;; reader's setting, the argument is filled from a fold over the event log
;; instead — still pure, still replayable, still total.

(def finnish-alphabet
  "The declared reading alphabet — Finnish, the reader's own. :letters are
   the letters in order; å, ä and ö are letters in their own right and come
   after z, not decoration on a and o. :variants each name the letter whose
   place they take — é is an e and nothing else; ü is a variant of y and w
   keeps its own place, both ruled by the reader (18/decisions.md,
   2026-07-29). æ, ø and œ are letters elsewhere and variants here, because
   the alphabet in force is the reader's and not the name's. Mirrors the
   table in 18-an-alphabet-not-a-numbering/plan.md; a correction to it is a
   data change, not a rule change."
  {:letters ["a" "b" "c" "d" "e" "f" "g" "h" "i" "j" "k" "l" "m"
             "n" "o" "p" "q" "r" "s" "t" "u" "v" "w" "x" "y" "z"
             "å" "ä" "ö"]
   :variants {"á" "a", "à" "a", "â" "a", "ã" "a", "ā" "a", "ă" "a", "ą" "a"
              "ć" "c", "ĉ" "c", "ċ" "c", "č" "c", "ç" "c"
              "ď" "d", "đ" "d", "ð" "d"
              "é" "e", "è" "e", "ê" "e", "ë" "e", "ē" "e", "ĕ" "e", "ė" "e"
              "ę" "e", "ě" "e"
              "ĝ" "g", "ğ" "g", "ġ" "g", "ģ" "g"
              "í" "i", "ì" "i", "î" "i", "ï" "i", "ī" "i", "į" "i", "ı" "i"
              "ĺ" "l", "ļ" "l", "ľ" "l", "ł" "l"
              "ń" "n", "ņ" "n", "ň" "n", "ŋ" "n"
              "ó" "o", "ò" "o", "ô" "o", "õ" "o", "ō" "o", "ŏ" "o"
              "ŕ" "r", "ř" "r"
              "ś" "s", "ŝ" "s", "š" "s", "ş" "s"
              "ť" "t", "ţ" "t", "þ" "t"
              "ú" "u", "ù" "u", "û" "u", "ū" "u", "ů" "u", "ų" "u"
              "ü" "y", "ý" "y", "ŷ" "y", "ÿ" "y"
              "ź" "z", "ż" "z", "ž" "z"
              "æ" "ä"
              "ø" "ö", "œ" "ö", "ő" "ö"}})

(defn- alphabet-places
  "Each character the alphabet names, mapped to a single character encoding
   its place: letters in declared order, each variant to the place of the
   letter it varies. Places are encoded as characters so a whole name's key
   is a plain string — strings compare position by position, which is what
   letter-by-letter comparison means (a vector of places would compare by
   count first and file Zosia before Amélie for being shorter)."
  [{:keys [letters variants]}]
  (let [place (fn [i] (char (+ 33 i)))
        letter-place (into {} (map-indexed (fn [i l] [l (place i)]) letters))]
    (merge letter-place
           (into {} (for [[variant base] variants]
                      [variant (letter-place base)])))))

(defn- name-key
  "How a name compares, said once for every name the key holds: by the
   alphabet in force first, and by plain character order second. Under the
   alphabet each character contributes its place — its own, or its base
   letter's when it is a variant — as one character of a string, so the name
   compares position by position. A character the alphabet does not name at
   all sorts after every letter it does name (`unnamed`, a place past the
   last letter's, followed by the character itself so such characters take
   their own order among themselves) — one stated answer for every input,
   nothing asked of the runtime. Its honest cost, pinned by the spec: a
   space is not a letter, so Iltarusko is offered before Ilta Aamu. The
   plain-order half exists because two different names can be equal under an
   alphabet — Sofia and Sofía are the same letters in Finnish — and it makes
   their order STATED rather than falling invisibly to the identifier.
   Letter case is not part of a letter's identity in either half."
  [places unnamed nm]
  (let [lower (str/lower-case (str nm))]
    [(apply str (map (fn [ch] (or (places ch) (str unnamed ch))) (seq lower)))
     lower]))

(defn order-offered-voices
  "The voices to offer, in the order to offer them: offered voices × the
   alphabet in force → the same voices, in order. Reads no configuration, no
   clock, no locale and nothing from the interface — same voices, same
   alphabet, same answer, on any machine.

   One key, four parts (14-voice-picker-order/ticket-01, the name parts
   reworked by 18-an-alphabet-not-a-numbering/ticket-02):
     1. the service the voice is reached through — every configured service
        before the platform's own built-in voices (\"built-in last\", not a
        list of known services), and configured services among themselves by
        the service's name, compared as every name is;
     2. the voice's name, by the alphabet in force;
     3. the voice's name, by plain character order (both from `name-key`);
     4. the identifier the choice is recorded under — the final tiebreak, and
        the part that makes the order TOTAL. Displayed names collide
        (08-voices-and-settings recorded it as a known gap), and a key that
        stops short leaves collisions in whatever order they reached the
        sort — the defect class HANDOVER §7 spent a slice on."
  [voices alphabet]
  (let [places (alphabet-places alphabet)
        unnamed (char (+ 33 (count (:letters alphabet))))
        akey #(name-key places unnamed %)]
    (vec (sort-by (fn [{:keys [voice-id name provider built-in?]}]
                    [(if built-in? 1 0)
                     (akey provider)
                     (akey name)
                     (str voice-id)])
                  (or voices [])))))

;; ---------------------------------------------------------------------------
;; The look-ahead's pure core (since 19-the-next-sentence-is-ready)
;;
;; While one sentence is read aloud, the ones after it are made ready. WHICH
;; ones is a rule, not a side effect, and it lives here for the reason the
;; voice ordering above does: it is a total function — of the sentence count,
;; the playhead, what is already in hand or in flight, and the depth — that
;; reads no state, no clock and no network, so the unit suite can cover it to
;; exhaustion while the fetching stays at the edge (speech.cljs). It is not a
;; read model and no projection reaches it. Audio itself never enters the
;; event log (HANDOVER §8 decision 6): a made-ready clip is completely
;; determined by the sentence's text and the voice it is made in, facts the
;; log already holds — which is also why the reuse key below needs nothing
;; else. Speed is deliberately absent from the key: audio is made once and
;; played at the reader's speed, so a speed change is a reuse, never a
;; re-request.
;; ---------------------------------------------------------------------------

(def make-ready-depth
  "How many sentences ahead of the playhead are made ready — two: a full
   sentence of slack behind every boundary, bounded waste on a stop or skip
   (19-the-next-sentence-is-ready plan.md, decision 1)."
  2)

(defn sentences-to-make-ready
  "The sentence indices to begin making ready while `playhead` is read aloud:
   the next `depth` sentences, minus any already in hand or in flight
   (`in-hand`, a set of indices), never past the end of the item. Relative to
   the playhead wherever a seek put it; sentences behind the playhead are
   never asked for."
  [chunk-count playhead in-hand depth]
  (->> (range (inc playhead) (min chunk-count (+ playhead depth 1)))
       (remove in-hand)
       vec))

(defn speech-clip-key
  "The key speech once made ready is reused under: the exact sentence text
   and the exact voice it was made in — the two facts that make the audio
   byte-identical. An unresolved voice keys as itself, not as any voice's."
  [text voice]
  [(str text) voice])

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
    ;; Top-level `# ` headings become the draft's sections (since
    ;; 10-sleep-chapters-history); the spoken content is the stripped text so
    ;; a heading is read plainly. Unheaded text passes through unchanged.
    (let [sections (text-sections text)
          content  (if (seq sections) (strip-heading-markers text) text)
          title'   (if (str/blank? (str title)) (derive-title content) title)
          channel' (or channel "in-app")]
      (accept {:kind "text-captured" :ingest-id ingest-id :title title'
               :text text :channel channel' :captured-at at}
              {:kind "ingest-completed" :ingest-id ingest-id
               :items [(cond-> {:title title' :kind "pasted-text" :content content
                                :duration-estimate (estimate-duration content)}
                         (seq sections) (assoc :sections sections))]
               :channel channel' :completed-at at}))))

;; ingestion/ingest — "capture-url @ none → requested, emits [url-captured]"
(defmethod decide "capture-url"
  [state {:keys [ingest-id url channel at]}]
  (cond
    (some? (get-in state [:ingests ingest-id]))
    (refuse "ingest already exists")

    (str/blank? (str url))
    (refuse "the URL is empty")

    :else
    (accept {:kind "url-captured" :ingest-id ingest-id :url url
             :channel (or channel "in-app") :captured-at at})))

;; ingestion/ingest — "capture-feed @ none → requested, emits [feed-captured]"
;; Issued by the feed-ingest policy on subscription and refresh, never
;; directly by the user (docs/contexts/ingestion/.../intents/capture-feed.md).
(defmethod decide "capture-feed"
  [state {:keys [ingest-id feed-url source-id at]}]
  (cond
    (some? (get-in state [:ingests ingest-id]))
    (refuse "ingest already exists")

    (str/blank? (str feed-url))
    (refuse "the feed address is empty")

    (str/blank? (str source-id))
    (refuse "the feed fetch has no library source")

    :else
    (accept {:kind "feed-captured" :ingest-id ingest-id :feed-url feed-url
             :source-id source-id :captured-at at})))

;; ingestion/ingest — "capture-document @ none → requested, emits [document-captured]"
;; The document-ref is an opaque reference to the file's bytes, resolvable by
;; the extraction edge — the bytes themselves never enter the event log.
(defmethod decide "capture-document"
  [state {:keys [ingest-id file-name document-ref channel at]}]
  (cond
    (some? (get-in state [:ingests ingest-id]))
    (refuse "ingest already exists")

    (str/blank? (str file-name))
    (refuse "the document has no file name")

    (str/blank? (str document-ref))
    (refuse "the document has no content reference")

    :else
    (accept {:kind "document-captured" :ingest-id ingest-id :file-name file-name
             :document-ref document-ref :channel (or channel "in-app")
             :captured-at at})))

;; ingestion/ingest — "start-fetch @ requested → fetching, emits [fetch-started]"
(defmethod decide "start-fetch"
  [state {:keys [ingest-id at]}]
  (if (= "requested" (ingest-state state ingest-id))
    (accept {:kind "fetch-started" :ingest-id ingest-id :started-at at})
    (refuse "the ingest is not requested")))

;; ingestion/ingest — "complete-ingest @ fetching [readable content was
;; extracted into at least one item draft] → ready, emits [ingest-completed]"
;; The guard reads the docs' item-draft schema: a draft is playable with
;; readable *content* or a *recording-url* (since 05-podcast-feeds). The
;; ingest's channel rides on the event so the slice-01 item-creation +
;; auto-queue policies fire for direct captures; feed ingests instead carry
;; the :source metadata block through.
(defn- playable-draft? [draft]
  (or (not (str/blank? (str (:content draft))))
      (not (str/blank? (str (:recording-url draft))))))

(defmethod decide "complete-ingest"
  [state {:keys [ingest-id items source at]}]
  (let [channel (get-in state [:ingests ingest-id :channel])]
    (cond
      (not= "fetching" (ingest-state state ingest-id))
      (refuse "the ingest is not fetching")

      (not (some playable-draft? items))
      (refuse "no item draft has readable content or a recording")

      :else
      (accept (cond-> {:kind "ingest-completed" :ingest-id ingest-id
                       :items (vec items) :completed-at at}
                channel (assoc :channel channel)
                source (assoc :source source))))))

;; ingestion/ingest — "fail-ingest @ fetching → failed, emits [ingest-failed]"
(defmethod decide "fail-ingest"
  [state {:keys [ingest-id reason at]}]
  (cond
    (not= "fetching" (ingest-state state ingest-id))
    (refuse "the ingest is not fetching")

    (str/blank? (str reason))
    (refuse "a failure reason is required")

    :else
    (accept {:kind "ingest-failed" :ingest-id ingest-id :reason reason :failed-at at})))

;; ingestion/ingest — "retry-ingest @ failed → requested, emits [ingest-retried]"
(defmethod decide "retry-ingest"
  [state {:keys [ingest-id at]}]
  (if (= "failed" (ingest-state state ingest-id))
    (accept {:kind "ingest-retried" :ingest-id ingest-id :retried-at at})
    (refuse "the ingest has not failed")))

;; ingestion/ingest — "discard-ingest @ failed → discarded, emits [ingest-discarded]"
(defmethod decide "discard-ingest"
  [state {:keys [ingest-id at]}]
  (if (= "failed" (ingest-state state ingest-id))
    (accept {:kind "ingest-discarded" :ingest-id ingest-id :discarded-at at})
    (refuse "the ingest has not failed")))

;; library/item — "add-item @ none → new, emits [item-added]"
;; :sections (chapter-like divisions from headings/outline) ride through
;; since 10-sleep-chapters-history.
(defmethod decide "add-item"
  [state {:keys [item-id title item-kind origin content recording-url
                 published-at duration-estimate sections at]}]
  (cond
    (some? (get-in state [:items item-id]))
    (refuse "item already exists")

    (not (contains? contract/item-kinds item-kind))
    (refuse (str "unknown item kind: " item-kind))

    :else
    (accept (cond-> {:kind "item-added" :item-id item-id :title title
                     :item-kind item-kind :content content
                     :duration-estimate duration-estimate :added-at at}
              origin (assoc :origin origin)
              recording-url (assoc :recording-url recording-url)
              published-at (assoc :published-at published-at)
              (seq sections) (assoc :sections (vec sections))))))

;; library/item — "mark-in-progress @ new → in-progress, emits [item-marked-in-progress]"
(defmethod decide "mark-in-progress"
  [state {:keys [item-id at]}]
  (if (= "new" (get-in state [:items item-id :status]))
    (accept {:kind "item-marked-in-progress" :item-id item-id :at at})
    (refuse "only a new item can be marked in progress")))

;; library/item — "mark-played @ in-progress → played" (auto, since 01) and
;; "@ new → played" (the user's manual mark, since 06-library), emits
;; [item-marked-played]
(defmethod decide "mark-played"
  [state {:keys [item-id at]}]
  (if (contains? #{"new" "in-progress"} (get-in state [:items item-id :status]))
    (accept {:kind "item-marked-played" :item-id item-id :at at})
    (refuse "only a new or in-progress item can be marked played")))

;; library/item — "mark-unplayed @ played|in-progress → new, emits
;; [item-marked-unplayed]" (since 06-library)
(defmethod decide "mark-unplayed"
  [state {:keys [item-id at]}]
  (if (contains? #{"played" "in-progress"} (get-in state [:items item-id :status]))
    (accept {:kind "item-marked-unplayed" :item-id item-id :at at})
    (refuse "only a played or in-progress item can be marked unplayed")))

;; library/item — "archive-item @ new|in-progress|played → archived, emits
;; [item-archived]" (since 06-library)
(defmethod decide "archive-item"
  [state {:keys [item-id at]}]
  (if (contains? #{"new" "in-progress" "played"} (get-in state [:items item-id :status]))
    (accept {:kind "item-archived" :item-id item-id :at at})
    (refuse "only an active item can be archived")))

;; library/item — "unarchive-item @ archived → new, emits [item-unarchived]"
;; (since 06-library; prior play history stays in the event stream)
(defmethod decide "unarchive-item"
  [state {:keys [item-id at]}]
  (if (= "archived" (get-in state [:items item-id :status]))
    (accept {:kind "item-unarchived" :item-id item-id :at at})
    (refuse "only an archived item can be unarchived")))

;; library/item — "star-item @ new|in-progress|played → same state, emits
;; [item-starred], guard: the item is not already starred" (since 06-library)
(defmethod decide "star-item"
  [state {:keys [item-id at]}]
  (let [item (get-in state [:items item-id])]
    (cond
      (not (contains? #{"new" "in-progress" "played"} (:status item)))
      (refuse "only an active item can be starred")

      (:starred item)
      (refuse "the item is already starred")

      :else
      (accept {:kind "item-starred" :item-id item-id :at at}))))

;; library/item — "unstar-item @ new|in-progress|played → same state, emits
;; [item-unstarred], guard: the item is starred" (since 06-library)
(defmethod decide "unstar-item"
  [state {:keys [item-id at]}]
  (let [item (get-in state [:items item-id])]
    (cond
      (not (contains? #{"new" "in-progress" "played"} (:status item)))
      (refuse "only an active item can be unstarred")

      (not (:starred item))
      (refuse "the item is not starred")

      :else
      (accept {:kind "item-unstarred" :item-id item-id :at at}))))

;; library/source — "subscribe-source @ none → active, emits [source-subscribed]"
(defmethod decide "subscribe-source"
  [state {:keys [source-id feed-url at]}]
  (cond
    (some? (get-in state [:sources source-id]))
    (refuse "source already exists")

    (str/blank? (str feed-url))
    (refuse "the feed address is empty")

    :else
    (accept {:kind "source-subscribed" :source-id source-id
             :feed-url feed-url :subscribed-at at})))

;; library/source — "refresh-source @ active → active, emits [source-refresh-requested]"
(defmethod decide "refresh-source"
  [state {:keys [source-id at]}]
  (if (= "active" (get-in state [:sources source-id :state]))
    (accept {:kind "source-refresh-requested" :source-id source-id :requested-at at})
    (refuse "the source is not followed")))

;; library/source — "unsubscribe-source @ active → removed, emits [source-unsubscribed]"
;; `removed` is terminal; the source's items remain in the library.
(defmethod decide "unsubscribe-source"
  [state {:keys [source-id at]}]
  (if (= "active" (get-in state [:sources source-id :state]))
    (accept {:kind "source-unsubscribed" :source-id source-id :unsubscribed-at at})
    (refuse "the source is not followed")))

;; library/source — "set-source-voice @ active → active, emits [source-voice-set]"
;; (since 08-voices-and-settings). An *empty* voice-id is accepted — v1's way
;; of clearing the override (the intent doc); a missing one is refused (the
;; schema requires the field — fail loud at the point of misuse).
(defmethod decide "set-source-voice"
  [state {:keys [source-id voice-id at]}]
  (cond
    (not= "active" (get-in state [:sources source-id :state]))
    (refuse "the source is not followed")

    (not (string? voice-id))
    (refuse "a voice is required")

    :else
    (accept {:kind "source-voice-set" :source-id source-id
             :voice-id voice-id :at at})))

;; library/source — "set-source-speed @ active → active, emits [source-speed-set]"
;; (since 08-voices-and-settings). v1 always sets a value (clearing deferred);
;; the range refusal is the set-speed convention.
(defmethod decide "set-source-speed"
  [state {:keys [source-id speed at]}]
  (cond
    (not= "active" (get-in state [:sources source-id :state]))
    (refuse "the source is not followed")

    (not (and (number? speed) (<= 0.5 speed 3.0)))
    (refuse "the speed must be between 0.5x and 3x")

    :else
    (accept {:kind "source-speed-set" :source-id source-id
             :speed speed :at at})))

;; playback/queue — "queue-item @ empty|holding [not already queued] → holding, emits [item-queued]"
(defmethod decide "queue-item"
  [state {:keys [item-id at]}]
  (if (some #{item-id} (:queue state))
    (refuse "the item is already queued")
    (accept {:kind "item-queued" :item-id item-id :queued-at at})))

;; playback/queue — "queue-item-next @ empty|holding [not already queued] → holding, emits [item-queued-next]"
(defmethod decide "queue-item-next"
  [state {:keys [item-id at]}]
  (if (some #{item-id} (:queue state))
    (refuse "the item is already queued")
    (accept {:kind "item-queued-next" :item-id item-id :queued-at at})))

;; playback/queue — "reorder-queue @ holding [the given order lists exactly the queued items] → holding, emits [queue-reordered]"
(defmethod decide "reorder-queue"
  [state {:keys [order at]}]
  (cond
    (empty? (:queue state))
    (refuse "the queue is empty")

    (not= (frequencies order) (frequencies (:queue state)))
    (refuse "the order does not list exactly the queued items")

    :else
    (accept {:kind "queue-reordered" :order (vec order) :at at})))

;; playback/queue — "remove-from-queue @ holding → holding|empty, emits [item-removed-from-queue]"
;; (two statechart branches, one rule: the cardinality guard only decides
;; whether the queue empties)
(defmethod decide "remove-from-queue"
  [state {:keys [item-id at]}]
  (if (some #{item-id} (:queue state))
    (accept {:kind "item-removed-from-queue" :item-id item-id :at at})
    (refuse "the item is not queued")))

;; playback/queue — "clear-queue @ holding → empty, emits [queue-cleared]"
(defmethod decide "clear-queue"
  [state {:keys [at]}]
  (if (seq (:queue state))
    (accept {:kind "queue-cleared" :at at})
    (refuse "the queue is already empty")))

;; playback/queue — "take-next @ holding → holding|empty, emits [item-dequeued]"
(defmethod decide "take-next"
  [state {:keys [at]}]
  (if-let [front (first (:queue state))]
    (accept {:kind "item-dequeued" :item-id front :at at})
    (refuse "the queue is empty")))

;; playback/player — "play @ idle [item has speakable content or a recording] → playing, emits [playback-started]"
;; Since 08-voices-and-settings the intent may carry the effective :voice-id /
;; :speed (resolved by the play-from-queue policy); they pass through onto
;; playback-started when present.
(defmethod decide "play"
  [state {:keys [item-id position voice-id speed at]}]
  (let [item (get-in state [:items item-id])]
    (cond
      (not= "idle" (get-in state [:player :state]))
      (refuse "the player is not idle")

      (and (str/blank? (str (:content item)))
           (str/blank? (str (:recording-url item))))
      (refuse "the item has no speakable content and no recording")

      :else
      (accept (cond-> {:kind "playback-started" :item-id item-id
                       :position (or position 0) :started-at at}
                voice-id (assoc :voice-id voice-id)
                speed (assoc :speed speed))))))

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

;; playback/player — "record-position @ playing → playing, emits [position-changed]"
;; (periodic self-transition: the speech process's chunk-boundary callback)
(defmethod decide "record-position"
  [state {:keys [position at]}]
  (let [player (:player state)]
    (if (= "playing" (:state player))
      (accept {:kind "position-changed" :item-id (:item-id player)
               :position position :at at})
      (refuse "the player is not playing"))))

;; playback/player — "seek @ playing → playing / @ paused → paused
;; [the position is within the item's duration], emits [position-changed]"
;; The position unit is the sentence-chunk index for text items (slice-01
;; decision; the seconds↔chunk conversion happens at the edge via chunk-at)
;; and seconds of audio time for recordings (since 05-podcast-feeds).
(defmethod decide "seek"
  [state {:keys [position at]}]
  (let [{player-state :state :keys [item-id]} (:player state)
        item (get-in state [:items item-id])
        limit (if (recording? item)
                (:duration-estimate item)
                (count (chunks (or (:content item) ""))))]
    (cond
      (not (contains? #{"playing" "paused"} player-state))
      (refuse "the player has no current item")

      (or (nil? position) (neg? position) (> position limit))
      (refuse "the position is not within the item's duration")

      :else
      (accept {:kind "position-changed" :item-id item-id :position position :at at}))))

;; playback/player — "skip @ playing → playing / @ paused → paused,
;; emits [position-changed]" — the resulting position clamps to the item's
;; bounds; clamping at the end does not finish the item (plan.md spec notes).
(defmethod decide "skip"
  [state {:keys [direction seconds at]}]
  (let [{player-state :state :keys [item-id position]} (:player state)]
    (cond
      (not (contains? #{"playing" "paused"} player-state))
      (refuse "the player has no current item")

      (not (contains? #{"forward" "back"} direction))
      (refuse (str "unknown skip direction: " direction))

      (or (nil? seconds) (not (pos? seconds)))
      (refuse "the skip interval must be positive")

      :else
      (let [item (get-in state [:items item-id])
            elapsed (item-elapsed-seconds item position)
            target (if (= "forward" direction)
                     (+ elapsed seconds)
                     (- elapsed seconds))]
        (accept {:kind "position-changed" :item-id item-id
                 :position (position-for-seconds item target) :at at})))))

;; playback/player — "set-speed @ idle|playing|paused → same state,
;; emits [speed-changed]" — no statechart guard; the only refusal is a speed
;; outside the schema's 0.5–3.0 range (fail loud at the point of misuse).
(defmethod decide "set-speed"
  [_state {:keys [speed at]}]
  (if (and (number? speed) (<= 0.5 speed 3.0))
    (accept {:kind "speed-changed" :speed speed :at at})
    (refuse "the speed must be between 0.5x and 3x")))

;; playback/player — "set-voice @ idle|playing|paused → same state,
;; emits [voice-set]" (since 08-voices-and-settings) — a self-transition in
;; every player state; the only refusal is a blank voice-id (the set-speed
;; convention: fail loud at the point of misuse).
(defmethod decide "set-voice"
  [_state {:keys [voice-id at]}]
  (if (str/blank? (str voice-id))
    (refuse "a voice is required")
    (accept {:kind "voice-set" :voice-id voice-id :at at})))

;; playback/player — "set-voice-rotation @ idle|playing|paused [the rotation
;; names at least one voice, and names no voice twice] → same state, emits
;; [voice-rotation-set]" (since 15-voice-rotation) — a self-transition in
;; every player state, like set-voice. Exactly two refusals; an identifier
;; naming no voice the service currently offers is NOT one of them — ids are
;; opaque here (slice 08), and a choice that cannot be honoured falls through
;; to the service's own default.
(defmethod decide "set-voice-rotation"
  [_state {:keys [voice-ids at]}]
  (cond
    (empty? voice-ids)
    (refuse "at least one voice is required")

    (not (apply distinct? voice-ids))
    (refuse "a voice may not appear twice in the rotation")

    :else
    (accept {:kind "voice-rotation-set" :voice-ids (vec voice-ids) :at at})))

;; playback/player — "finish-item @ playing → idle, emits [item-finished]"
(defmethod decide "finish-item"
  [state {:keys [at]}]
  (let [player (:player state)]
    (if (= "playing" (:state player))
      (accept {:kind "item-finished" :item-id (:item-id player) :finished-at at})
      (refuse "the player is not playing"))))

;; playback/player — "jump-to-chapter @ playing|paused → same state [the item
;; has a section at the given index], emits [position-changed]" (since
;; 10-sleep-chapters-history). The target is the section's start in the
;; item's position unit: seconds (clamped) for a recording, the chunk that
;; starts the heading's text for a text item.
(defmethod decide "jump-to-chapter"
  [state {:keys [section-index at]}]
  (let [{player-state :state :keys [item-id]} (:player state)
        item (get-in state [:items item-id])
        sections (:sections item)]
    (cond
      (not (contains? #{"playing" "paused"} player-state))
      (refuse "the player has no current item")

      (not (and (number? section-index)
                (<= 0 section-index)
                (< section-index (count sections))))
      (refuse "the item has no section at the given index")

      :else
      (let [{:keys [position]} (nth sections section-index)]
        (accept {:kind "position-changed" :item-id item-id
                 :position (if (recording? item)
                             (-> position (max 0) (min (:duration-estimate item)))
                             (section-start-chunk (or (:content item) "") position))
                 :at at})))))

;; playback/player — "set-sleep-timer @ playing|paused → same state, emits
;; [sleep-timer-set]" (since 10-sleep-chapters-history). No already-set
;; guard: setting again replaces the previous timer (the intent doc).
(defmethod decide "set-sleep-timer"
  [state {:keys [mode duration at]}]
  (cond
    (not (contains? #{"playing" "paused"} (get-in state [:player :state])))
    (refuse "the player has no current item")

    (not (contains? #{"duration" "end-of-item"} mode))
    (refuse (str "unknown sleep timer mode: " mode))

    (and (= "duration" mode) (not (and (number? duration) (pos? duration))))
    (refuse "a positive duration is required")

    :else
    (accept (cond-> {:kind "sleep-timer-set" :mode mode :at at}
              (= "duration" mode) (assoc :duration duration)))))

;; playback/player — "cancel-sleep-timer @ playing|paused → same state
;; [a sleep timer is set], emits [sleep-timer-cancelled]"
(defmethod decide "cancel-sleep-timer"
  [state {:keys [at]}]
  (let [player (:player state)]
    (cond
      (not (contains? #{"playing" "paused"} (:state player)))
      (refuse "the player has no current item")

      (nil? (:sleep-timer player))
      (refuse "no sleep timer is set")

      :else
      (accept {:kind "sleep-timer-cancelled" :at at}))))

;; playback/player — "expire-sleep-timer @ playing [a sleep timer is set and
;; has elapsed] → paused, emits [sleep-timer-expired, playback-paused]".
;; The *elapsed* half of the guard is owned by the edge expiry policy that
;; issues this intent (the countdown / rendition-end process) — a pure
;; decider has no clock (decision in decisions.md). The pause position rides
;; in from the edge like `pause`'s.
(defmethod decide "expire-sleep-timer"
  [state {:keys [position at]}]
  (let [player (:player state)]
    (cond
      (not= "playing" (:state player))
      (refuse "the player is not playing")

      (nil? (:sleep-timer player))
      (refuse "no sleep timer is set")

      :else
      (accept {:kind "sleep-timer-expired" :at at}
              {:kind "playback-paused" :item-id (:item-id player)
               :position (or position (:position player)) :at at}))))

;; ---------------------------------------------------------------------------
;; Evolvers — pure left-fold, no business logic, cannot fail (§4.2)
;; ---------------------------------------------------------------------------

;; Listening-stats accumulation (since 10-sleep-chapters-history): time
;; listened counts content time ÷ speed — positions, not wall clocks, so a
;; tab closed mid-play adds nothing. Samples are anchored at play/resume and
;; folded in at every position-changed, pause, and finish; the surplus of a
;; segment played above 1x is the time saved.

(defn- live-speed*
  "The speed the current segment plays at: the item's effective speed while
   it plays, else the global (the slice-08 convention)."
  [state]
  (or (get-in state [:player :item-speed])
      (get-in state [:player :speed])
      1))

(defn- anchor-listening
  "Start a stats segment at the given content position of the current item."
  [state item-id position]
  (assoc-in state [:stats :anchor]
            (item-elapsed-seconds (get-in state [:items item-id]) position)))

(defn- accumulate-listening
  "Fold the content seconds consumed since the anchor into the stats —
   content ÷ speed listened, the surplus saved — and re-anchor."
  [state new-elapsed]
  (let [anchor (get-in state [:stats :anchor])
        delta (max 0 (- new-elapsed (or anchor new-elapsed)))
        listened (/ delta (live-speed* state))]
    (-> state
        (update-in [:stats :total-listened] + listened)
        (update-in [:stats :time-saved-by-speed] + (- delta listened))
        (assoc-in [:stats :anchor] new-elapsed))))

(defmulti evolve
  "S × E → S'"
  (fn [_state event] (:kind event)))

(defmethod evolve :default [state _event] state)

(defmethod evolve "text-captured"
  [state {:keys [ingest-id title channel captured-at]}]
  (assoc-in state [:ingests ingest-id]
            {:ingest-id ingest-id :state "requested" :capture-kind "text"
             :display-name title :channel channel :captured-at captured-at}))

(defmethod evolve "url-captured"
  [state {:keys [ingest-id url channel captured-at]}]
  (assoc-in state [:ingests ingest-id]
            {:ingest-id ingest-id :state "requested" :capture-kind "url"
             :display-name url :url url :channel channel :captured-at captured-at}))

(defmethod evolve "feed-captured"
  [state {:keys [ingest-id feed-url source-id captured-at]}]
  (assoc-in state [:ingests ingest-id]
            {:ingest-id ingest-id :state "requested" :capture-kind "feed"
             :display-name feed-url :feed-url feed-url :source-id source-id
             :captured-at captured-at}))

(defmethod evolve "document-captured"
  [state {:keys [ingest-id file-name document-ref channel captured-at]}]
  (assoc-in state [:ingests ingest-id]
            {:ingest-id ingest-id :state "requested" :capture-kind "document"
             :display-name file-name :file-name file-name
             :document-ref document-ref :channel channel
             :captured-at captured-at}))

(defmethod evolve "fetch-started" [state {:keys [ingest-id]}]
  (assoc-in state [:ingests ingest-id :state] "fetching"))

;; A feed ingest's :source block is where the source's display metadata
;; (title, author, artwork) arrives; the source-list projection reads it off
;; the source aggregate (docs/contexts/library/authorities/source/index.md).
(defmethod evolve "ingest-completed" [state {:keys [ingest-id source]}]
  (cond-> (assoc-in state [:ingests ingest-id :state] "ready")
    (:source-id source)
    (update-in [:sources (:source-id source)] merge
               (select-keys source [:title :author :artwork-url]))))

(defmethod evolve "ingest-failed" [state {:keys [ingest-id reason]}]
  (update-in state [:ingests ingest-id] assoc :state "failed" :reason reason))

(defmethod evolve "ingest-retried" [state {:keys [ingest-id]}]
  (update-in state [:ingests ingest-id]
             (fn [g] (-> g (assoc :state "requested") (dissoc :reason)))))

(defmethod evolve "ingest-discarded" [state {:keys [ingest-id]}]
  (assoc-in state [:ingests ingest-id :state] "discarded"))

(defmethod evolve "item-added"
  [state {:keys [item-id title item-kind origin content recording-url
                 published-at duration-estimate sections added-at]}]
  (assoc-in state [:items item-id]
            (cond-> {:item-id item-id :title title :item-kind item-kind
                     :content content :duration-estimate duration-estimate
                     :added-at added-at :status "new"}
              origin (assoc :origin origin)
              recording-url (assoc :recording-url recording-url)
              published-at (assoc :published-at published-at)
              sections (assoc :sections sections))))

(defmethod evolve "source-subscribed"
  [state {:keys [source-id feed-url subscribed-at]}]
  (assoc-in state [:sources source-id]
            {:source-id source-id :state "active" :feed-url feed-url
             :subscribed-at subscribed-at}))

(defmethod evolve "source-refresh-requested"
  [state {:keys [source-id requested-at]}]
  (assoc-in state [:sources source-id :refresh-requested-at] requested-at))

(defmethod evolve "source-unsubscribed" [state {:keys [source-id]}]
  (assoc-in state [:sources source-id :state] "removed"))

;; Per-source overrides (since 08-voices-and-settings): an empty voice-id
;; clears the override — cleared override = absent field (the intent doc).
(defmethod evolve "source-voice-set" [state {:keys [source-id voice-id]}]
  (if (str/blank? (str voice-id))
    (update-in state [:sources source-id] dissoc :voice-id)
    (assoc-in state [:sources source-id :voice-id] voice-id)))

(defmethod evolve "source-speed-set" [state {:keys [source-id speed]}]
  (assoc-in state [:sources source-id :speed] speed))

(defmethod evolve "item-marked-in-progress" [state {:keys [item-id]}]
  (assoc-in state [:items item-id :status] "in-progress"))

(defmethod evolve "item-marked-played" [state {:keys [item-id]}]
  (assoc-in state [:items item-id :status] "played"))

;; Returning to `new` (mark-unplayed, unarchive) also resets the recorded
;; position: `new` means "plays from the beginning" — the slice-04
;; item-finished precedent (decision in 06-library/decisions.md).
(defmethod evolve "item-marked-unplayed" [state {:keys [item-id]}]
  (update-in state [:items item-id] assoc :status "new" :position 0))

;; Archiving keeps metadata, starred flag, and position — only the status
;; moves; history stays in the stream.
(defmethod evolve "item-archived" [state {:keys [item-id]}]
  (assoc-in state [:items item-id :status] "archived"))

(defmethod evolve "item-unarchived" [state {:keys [item-id]}]
  (update-in state [:items item-id] assoc :status "new" :position 0))

(defmethod evolve "item-starred" [state {:keys [item-id]}]
  (assoc-in state [:items item-id :starred] true))

(defmethod evolve "item-unstarred" [state {:keys [item-id]}]
  (assoc-in state [:items item-id :starred] false))

(defmethod evolve "item-queued" [state {:keys [item-id]}]
  (update state :queue conj item-id))

(defmethod evolve "item-queued-next" [state {:keys [item-id]}]
  (update state :queue (fn [q] (into [item-id] q))))

(defmethod evolve "queue-reordered" [state {:keys [order]}]
  (assoc state :queue (vec order)))

(defmethod evolve "item-removed-from-queue" [state {:keys [item-id]}]
  (update state :queue (fn [q] (vec (remove #{item-id} q)))))

(defmethod evolve "queue-cleared" [state _event]
  (assoc state :queue []))

(defmethod evolve "item-dequeued" [state {:keys [item-id]}]
  (update state :queue (fn [q] (vec (remove #{item-id} q)))))

;; The speed is a global player setting, so playback-started and
;; item-finished update the player in place rather than replacing it.
;; Since 08-voices-and-settings the event's effective :speed folds into
;; :item-speed (the speed shown/heard while this item plays); an absent field
;; clears any stale one, so pre-08 logs replay unchanged.
;; playback-started also opens the listening-history entry (a fresh listen is
;; unfinished) and anchors the stats segment (since 10-sleep-chapters-history).
;; Since 15-voice-rotation the event's effective :voice-id folds into
;; :item-voice — the voice the current item is being heard in, the recorded
;; fact every restart of the rendition resolves to — and each start whose
;; voice the rotation supplied moves the rotation on.
(declare advance-rotation)

(defmethod evolve "playback-started" [state {:keys [item-id position speed voice-id started-at]}]
  (-> state
      (update :player
              (fn [p]
                (cond-> (assoc p :state "playing" :item-id item-id
                               :position (or position 0))
                  speed (assoc :item-speed speed)
                  (nil? speed) (dissoc :item-speed)
                  voice-id (assoc :item-voice voice-id)
                  (nil? voice-id) (dissoc :item-voice))))
      (advance-rotation item-id)
      (anchor-listening item-id (or position 0))
      (update-in [:stats :first-listened-at] (fn [t] (or t started-at)))
      (update :listens assoc item-id {:last-played-at started-at :finished false})))

(defmethod evolve "playback-paused" [state {:keys [item-id position]}]
  (-> state
      (accumulate-listening
       (item-elapsed-seconds (get-in state [:items item-id]) position))
      (update :player assoc :state "paused" :position position)))

(defmethod evolve "playback-resumed" [state {:keys [item-id position]}]
  (-> state
      (update :player assoc :state "playing" :position position)
      (anchor-listening item-id position)))

(defmethod evolve "position-changed" [state {:keys [item-id position]}]
  (let [current? (= item-id (get-in state [:player :item-id]))
        ;; a moving current item while playing is a listened segment sample
        state (cond-> state
                (and current? (= "playing" (get-in state [:player :state])))
                (accumulate-listening
                 (item-elapsed-seconds (get-in state [:items item-id]) position)))]
    (cond-> (assoc-in state [:items item-id :position] position)
      current? (assoc-in [:player :position] position))))

;; A live speed change takes over from any per-item override from that moment
;; (since 08-voices-and-settings: :item-speed clears).
(defmethod evolve "speed-changed" [state {:keys [speed]}]
  (update state :player (fn [p] (-> p (assoc :speed speed) (dissoc :item-speed)))))

;; The voice rotation — ONE piece of state, stated by two intents (since
;; 15-voice-rotation; before that, [:player :voice-id] held a single global
;; default). {:voice-ids [...] :next i} — the ordered voices the reader
;; picked and which of them the rotation offers next. `voice-set` folds as a
;; rotation of exactly that one voice, which is why every log recorded since
;; 08-voices-and-settings replays to identical behaviour with no migration.
(declare rotation-decides?)

(defn- state-rotation
  "Fold a statement of the rotation (either intent's event): the rotation
   becomes the listed voices, offering the FIRST — stating the setting
   starts it over. When the current item's voice is the rotation's to
   decide, the item takes that first voice from where it is (slice 08's
   mid-item promise) and the rotation moves on — the one advance rule,
   applied because the rotation answered; an item with a source override,
   and an item playing a recording, are untouched."
  [state voice-ids]
  (let [item-id (get-in state [:player :item-id])
        state (assoc-in state [:player :voice-rotation]
                        {:voice-ids (vec voice-ids) :next 0})]
    (if (and item-id (rotation-decides? state item-id))
      (-> state
          (assoc-in [:player :item-voice] (first voice-ids))
          (advance-rotation item-id))
      state)))

(defmethod evolve "voice-set" [state {:keys [voice-id]}]
  (state-rotation state [voice-id]))

(defmethod evolve "voice-rotation-set" [state {:keys [voice-ids]}]
  (state-rotation state voice-ids))

;; A finished item's recorded position resets so replaying it starts from the
;; beginning — otherwise resume-on-play (since 04-player-controls) would pick
;; up a played item at its end (decision in 04-player-controls/decisions.md).
;; The item's effective speed leaves with it (since 08-voices-and-settings),
;; and so does the voice it was heard in (since 15-voice-rotation).
;; Since 10-sleep-chapters-history it also closes the stats segment at the
;; item's full content, counts the finish, and marks the history entry
;; finished; an armed *duration* sleep timer stays — it spans continuous
;; playback across items.
(defmethod evolve "item-finished" [state {:keys [item-id finished-at]}]
  (-> state
      (accumulate-listening
       (or (get-in state [:items item-id :duration-estimate]) 0))
      (update-in [:stats :items-finished] inc)
      (update :listens assoc item-id {:last-played-at finished-at :finished true})
      (assoc-in [:items item-id :position] 0)
      (update :player (fn [p] (-> p (assoc :state "idle" :item-id nil :position 0)
                                  (dissoc :item-speed :item-voice))))))

;; The sleep timer on the player aggregate (since 10-sleep-chapters-history):
;; set replaces, cancel and expiry consume.
(defmethod evolve "sleep-timer-set" [state {:keys [mode duration]}]
  (assoc-in state [:player :sleep-timer]
            (cond-> {:mode mode}
              duration (assoc :duration duration))))

(defmethod evolve "sleep-timer-cancelled" [state _event]
  (update state :player dissoc :sleep-timer))

(defmethod evolve "sleep-timer-expired" [state _event]
  (update state :player dissoc :sleep-timer))

(defn fold
  "Replay: left-fold events over state through the evolvers only (§4.2)."
  [state events]
  (reduce evolve state events))

;; ---------------------------------------------------------------------------
;; Effective voice/speed resolution (since 08-voices-and-settings, plan.md
;; "Policy addition"; the voice's rule deepened by 15-voice-rotation): the
;; resolved values travel on `play`, not as read-model fields — the effective
;; voice is observable only in the heard speech (spec notes).
;; ---------------------------------------------------------------------------

(defn- item-source [state item-id]
  (get-in state [:sources (get-in state [:items item-id :origin :source-id])]))

(defn rotation-decides?
  "Is this item's voice the rotation's to decide — would the resolution
   below reach its rotation step? True when the item plays no recording and
   its source has no voice override (15-voice-rotation). Both the advance
   rule and the mid-item restatement key on this, so 'which step answered'
   has exactly one definition."
  [state item-id]
  (and (not (recording? (get-in state [:items item-id])))
       (nil? (:voice-id (item-source state item-id)))))

(defn effective-voice
  "The voice an item is heard in WHEN IT STARTS, first answer wins
   (15-voice-rotation): an item that plays a recording has no voice at all —
   it is heard as recorded; else its source's :voice-id override; else the
   voice the rotation is offering; else nil — the speech service's own
   default. Resolved once per start by the play-from-queue policy; every
   restart within the item reads the folded [:player :item-voice] instead of
   asking again (the stability rule)."
  [state item-id]
  (when-not (recording? (get-in state [:items item-id]))
    (or (:voice-id (item-source state item-id))
        (let [{:keys [voice-ids next]} (get-in state [:player :voice-rotation])]
          (when (seq voice-ids) (nth voice-ids next))))))

(defn- advance-rotation
  "The rotation moves on to its next voice exactly when it was the step that
   answered — this item's start took the offered voice. A recording and an
   overridden source take no turn, from the same rotation-decides? test the
   resolution uses; with nothing picked there is nothing to move
   (15-voice-rotation)."
  [state item-id]
  (let [{:keys [voice-ids next]} (get-in state [:player :voice-rotation])]
    (if (and (seq voice-ids) (rotation-decides? state item-id))
      (assoc-in state [:player :voice-rotation :next]
                (mod (inc next) (count voice-ids)))
      state)))

(defn effective-speed
  "The speed an item plays at: its source's :speed override, else the global
   setting, else 1."
  [state item-id]
  (or (:speed (item-source state item-id))
      (get-in state [:player :speed])
      1))

;; ---------------------------------------------------------------------------
;; Policies — event → follow-up intents (plan.md story-map policy cards).
;; Pure: fresh ids come from the supplied new-id fn.
;; ---------------------------------------------------------------------------

(defn feed-read-successfully-before?
  "The auto-queue policy's guard for a feed ingest, since 17-arrivals-not-
   archives: has this ingest's source had its feed read successfully BEFORE
   this reading? (docs/contexts/ingestion/index.md, \"Auto-queue new items\".)

   `ready` is the state an ingest reaches only through ingest-completed, and it
   is where an ingest stays, so the source's ingest history is simply the
   ingests naming it. The current reading is excluded by id: by the time the
   policy runs, its own ingest is already `ready`.

   Deliberately the source's INGEST HISTORY and not \"does this source have
   items?\". Unsubscribing keeps a source's items while `removed` is terminal,
   so following an address again mints a *different* source — whose items all
   belong to the old one. An item-counting guard would answer \"no items\" for
   the re-followed source: right on its first reading, and wrong on its second,
   silently swallowing the first genuinely new episode after a re-follow.

   A fetch that finds no episodes never completes (complete-ingest is refused
   when no draft is playable), so a show followed before it had published
   anything has not been read successfully, and the reading that brings its
   debut episode is still its first."
  [state ingest-id]
  (let [source-id (get-in state [:ingests ingest-id :source-id])]
    (boolean
     (and source-id
          (some (fn [g]
                  (and (= source-id (:source-id g))
                       (not= ingest-id (:ingest-id g))
                       (= "ready" (:state g))))
                (vals (:ingests state)))))))

(defn arrival-order
  "Created items of one feed reading, ordered as they are to be queued:
   OLDEST PUBLISHED FIRST (docs/contexts/ingestion/index.md).

   The key is the item's own date — its publication date, else the moment it
   enters the library, which is 11-item-ordering's `item-date` rule reused
   rather than redefined. An item's added-at does not exist yet at this point
   (the dispatcher fills it when add-item runs), so the reading's own
   completed-at stands in for it: it is the same instant for every item this
   reading creates and it keeps the policy free of a clock.

   The final tiebreak is the FEED'S OWN ORDER, REVERSED — of two episodes the
   feed dates identically, or does not date at all, the one listed later is
   queued first. Feeds list newest first, so reversing continues the same
   oldest-first intent and keeps a same-day batch in its publisher's sequence.
   That key is total: two drafts of one reading cannot share a position in the
   document they came from. `created` arrives in feed order with the
   already-held drafts dropped, so a position in it is an order-preserving
   image of the feed's own."
  [created completed-at]
  (->> created
       (map-indexed vector)
       (sort-by (fn [[i [_ draft]]] [(or (:published-at draft) completed-at) (- i)]))
       (mapv second)))

(defn policies
  "S' × E × (fn [] fresh-id) → [intent …], where S' is the state after the
   event was folded in."
  [state event new-id]
  (case (:kind event)
    ;; item-creation + auto-queue. Item creation is unchanged: every draft of a
    ;; direct capture, and for a feed reading only the episodes whose recording
    ;; is not already a library item (refresh dedupe by enclosure URL).
    ;;
    ;; Auto-queue queues the items the reading CREATED, when either the ingest
    ;; carries a channel — a direct user capture, unchanged since slice 01 —
    ;; or, since 17-arrivals-not-archives, the ingest is a feed reading for a
    ;; source whose feed has been read successfully before. So a source's first
    ;; reading queues nothing and a back catalogue can never enter the queue,
    ;; while every later reading queues each new episode it finds.
    "ingest-completed"
    (if (:channel event)
      (vec (mapcat (fn [draft]
                     (let [item-id (new-id)]
                       [(cond-> {:kind "add-item" :item-id item-id
                                 :title (:title draft) :item-kind (:kind draft)
                                 :content (:content draft)
                                 :duration-estimate (:duration-estimate draft)}
                          (:origin draft) (assoc :origin (:origin draft))
                          ;; sections ride onto the item (since 10)
                          (:sections draft) (assoc :sections (:sections draft)))
                        {:kind "queue-item" :item-id item-id}]))
                   (:items event)))
      (let [known (set (keep :recording-url (vals (:items state))))
            fresh (first
                   (reduce (fn [[drafts seen] draft]
                             (let [url (:recording-url draft)]
                               (if (and url (contains? seen url))
                                 [drafts seen]
                                 [(conj drafts draft) (cond-> seen url (conj url))])))
                           [[] known]
                           (:items event)))
            created (mapv (fn [draft] [(new-id) draft]) fresh)
            adds (mapv (fn [[item-id draft]]
                         (cond-> {:kind "add-item" :item-id item-id
                                  :title (:title draft) :item-kind (:kind draft)
                                  :duration-estimate (:duration-estimate draft)}
                           (:content draft) (assoc :content (:content draft))
                           (:recording-url draft) (assoc :recording-url (:recording-url draft))
                           (:published-at draft) (assoc :published-at (:published-at draft))
                           (:origin draft) (assoc :origin (:origin draft))
                           (:sections draft) (assoc :sections (:sections draft))))
                       created)]
        (if (feed-read-successfully-before? state (:ingest-id event))
          ;; queued to the bottom ("play last"), never as play-next: what
          ;; turned up on its own waits behind what the reader put there
          (into adds
                (map (fn [[item-id _]] {:kind "queue-item" :item-id item-id}))
                (arrival-order created (:completed-at event)))
          adds)))

    ;; feed ingest: a followed or refreshed source gets its feed fetched
    ;; (docs/contexts/ingestion/index.md policy table, since 05-podcast-feeds)
    "source-subscribed"
    [{:kind "capture-feed" :ingest-id (new-id)
      :feed-url (:feed-url event) :source-id (:source-id event)}]

    "source-refresh-requested"
    [{:kind "capture-feed" :ingest-id (new-id)
      :feed-url (get-in state [:sources (:source-id event) :feed-url])
      :source-id (:source-id event)}]

    ;; play-from-queue: the dequeued item starts playing — since
    ;; 04-player-controls at its last recorded position (resume; the play
    ;; intent doc: "the supplied position is the item's last recorded
    ;; position"), 0 for a never-played item; since 08-voices-and-settings
    ;; with the effective speed (always) and voice (only when one resolves —
    ;; the schema field is optional)
    "item-dequeued"
    (let [item-id (:item-id event)
          voice (effective-voice state item-id)]
      [(cond-> {:kind "play" :item-id item-id
                :position (or (get-in state [:items item-id :position]) 0)
                :speed (effective-speed state item-id)}
         voice (assoc :voice-id voice))])

    ;; progress-tracking: the item's first playback-started marks it in progress
    "playback-started"
    (if (= "new" (get-in state [:items (:item-id event) :status]))
      [{:kind "mark-in-progress" :item-id (:item-id event)}]
      [])

    ;; auto-mark-played + continuous playback: while the queue still holds
    ;; items, take-next follows — whose item-dequeued triggers play via the
    ;; play-from-queue policy above (docs/contexts/playback/index.md)
    "item-finished"
    (cond-> [{:kind "mark-played" :item-id (:item-id event)}]
      (seq (:queue state)) (conj {:kind "take-next"}))

    []))

(println "[domain] loaded")
