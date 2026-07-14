(ns domain
  (:require [clojure.string :as str]))

;; =============================================
;; TIER 1 — PURE domain logic (portable core).
;; No Firebase, no Reagent. See product-design.md Layer 9.
;; Dates are "epoch days" (UTC days since 1970-01-01) internally,
;; ISO "YYYY-MM-DD" strings at the storage boundary.
;; =============================================

(println "[domain] loaded")

;; -- Date <-> epoch-day --

(defn date-str->ed
  "\"2026-07-14\" -> epoch day (int)."
  [s]
  (let [[y m d] (map #(js/parseInt % 10) (str/split s #"-"))]
    (js/Math.round (/ (js/Date.UTC y (dec m) d) 86400000))))

(defn ed->js-date [ed] (js/Date. (* ed 86400000)))

(defn pad2 [n] (if (< n 10) (str "0" n) (str n)))

(defn ed->date-str
  "epoch day -> \"YYYY-MM-DD\"."
  [ed]
  (let [d (ed->js-date ed)]
    (str (.getUTCFullYear d) "-"
         (pad2 (inc (.getUTCMonth d))) "-"
         (pad2 (.getUTCDate d)))))

(defn ed->day-of-month [ed] (.getUTCDate (ed->js-date ed)))
(defn ed->month [ed] (inc (.getUTCMonth (ed->js-date ed))))
(defn ed->year [ed] (.getUTCFullYear (ed->js-date ed)))

(def month-names ["jan" "feb" "mar" "apr" "may" "jun" "jul" "aug" "sep" "oct" "nov" "dec"])

(defn today-ed []
  (let [now (js/Date.)]
    (date-str->ed (str (.getFullYear now) "-" (inc (.getMonth now)) "-" (.getDate now)))))

;; -- ISO weeks --
;; 1970-01-01 was a Thursday. Monday = 0.

(defn day-of-week [ed] (mod (+ ed 3) 7))

(defn week-start
  "Epoch day of the Monday of ed's week."
  [ed]
  (- ed (day-of-week ed)))

(defn iso-week
  "ISO-8601 week: the week that contains Thursday."
  [ed]
  (let [thu  (+ (week-start ed) 3)
        year (ed->year thu)
        jan1 (date-str->ed (str year "-01-01"))]
    {:year year
     :week (inc (js/Math.floor (/ (- thu jan1) 7)))}))

(defn week-key
  "Stable key for a week: \"2026-W29\". Used for notes and UI state."
  [ed]
  (let [{:keys [year week]} (iso-week ed)]
    (str year "-W" (pad2 week))))

(defn week-of
  "Week row descriptor for the week containing ed."
  [ed]
  (let [ws (week-start ed)]
    {:start ws
     :days  (vec (range ws (+ ws 7)))
     :key   (week-key ws)
     :weeknum (:week (iso-week ws))}))

(defn weeks-range
  "Seq of week descriptors covering [from-ed, to-ed]."
  [from-ed to-ed]
  (map week-of (range (week-start from-ed) (inc to-ed) 7)))

(defn month-label
  "Short month name if this week contains the 1st of a month, else nil.
   Gutter date context (design 4.1: dates at month boundaries)."
  [week]
  (some (fn [ed] (when (= 1 (ed->day-of-month ed))
                   (str (nth month-names (dec (ed->month ed)))
                        (when (= 1 (ed->month ed))
                          (str " " (ed->year ed))))))
        (:days week)))

;; -- Periods --

(defn enrich-period
  "Storage period ({:start \"2026-..\"} strings) -> internal (+ :start-ed :end-ed)."
  [p]
  (assoc p
         :start-ed (date-str->ed (:start p))
         :end-ed   (date-str->ed (:end p))))

(defn active-on?
  "Is period p active on epoch day ed?"
  [p ed]
  (<= (:start-ed p) ed (:end-ed p)))

(defn tentative? [p] (= "tentative" (:status p)))

(defn period-rank
  "Label priority (design 4.5): whole-family first, then bigger groups,
   confirmed before tentative, earlier start first. Lower sorts first."
  [p n-persons]
  [(if (>= (count (:who p)) (max n-persons 1)) 0 1)
   (- (count (:who p)))
   (if (tentative? p) 1 0)
   (:start-ed p)])

;; -- Day marks & anchors --

(defn enrich-mark [m]
  (assoc m :date-ed (date-str->ed (:date m))))

(defn anchor->mark
  "Expand a recurring anchor {:month 6 :day 24 :label ..} for a given year.
   Derived at render time, never materialized (Layer 9 schema)."
  [anchor year]
  {:id        (str "anchor-" (:id anchor) "-" year)
   :anchor-id (:id anchor)
   :date-ed   (date-str->ed (str year "-" (pad2 (:month anchor)) "-" (pad2 (:day anchor))))
   :label     (:label anchor)
   :person    (:person anchor)
   :recurring true})

(defn anchors->marks
  "All derived marks for anchors across the years covered by [from-ed to-ed]."
  [anchors from-ed to-ed]
  (let [y0 (ed->year from-ed)
        y1 (ed->year to-ed)]
    (for [a anchors
          y (range y0 (inc y1))
          :let [m (anchor->mark a y)]
          :when (<= from-ed (:date-ed m) to-ed)]
      m)))

;; -- Label ink: black or white by contrast with the band color --

(defn- hex->rgb [hex]
  [(js/parseInt (subs hex 1 3) 16)
   (js/parseInt (subs hex 3 5) 16)
   (js/parseInt (subs hex 5 7) 16)])

(defn- luminance
  "Perceived luminance 0..1 (YIQ weights)."
  [hex]
  (let [[r g b] (hex->rgb hex)]
    (/ (+ (* 0.299 r) (* 0.587 g) (* 0.114 b)) 255)))

(def ^:private cell-bg-luminance 0.929) ;; linen day cell #f1ece7

(defn band-ink
  "Ink color for a label sitting on a band of the given participant
   colors: black on light, white on dark. alpha < 1 (tentative bands)
   blends with the cell background before deciding."
  [hexes alpha]
  (let [hexes (if (seq hexes) hexes ["#999999"])
        lum   (/ (reduce + (map luminance hexes)) (count hexes))
        eff   (+ (* alpha lum) (* (- 1 alpha) cell-bg-luminance))]
    (if (> eff 0.6) "#1a1a1a" "#ffffff")))

;; -- iCalendar (subscribed feeds -> derived marks & periods) --
;; Minimal ICS: unfold lines, walk VEVENTs, read DTSTART/DTEND/SUMMARY.
;; All-day DTEND is EXCLUSIVE per RFC 5545. RRULE is not expanded
;; (holiday feeds enumerate their events). Pure — tier 1.

(defn- ics-unescape [s]
  (-> s
      (str/replace #"\\n" " ")
      (str/replace #"\\([,;\\])" "$1")))

(defn- ics-date->ed
  "\"20260620\" or \"20260620T120000Z\" -> epoch day (date part)."
  [v]
  (when (and v (re-matches #"\d{8}(T.*)?" v))
    (let [y (js/parseInt (subs v 0 4) 10)
          m (js/parseInt (subs v 4 6) 10)
          d (js/parseInt (subs v 6 8) 10)]
      (js/Math.round (/ (js/Date.UTC y (dec m) d) 86400000)))))

(defn parse-ics
  "ICS text -> [{:summary s :start-ed n :end-ed n} ...] (end inclusive)."
  [text]
  (let [unfolded (-> text
                     (str/replace #"\r\n[ \t]" "")
                     (str/replace #"\n[ \t]" ""))
        lines    (str/split-lines unfolded)]
    (loop [ls lines, cur nil, out []]
      (if-let [line (first ls)]
        (let [line (str/trim line)]
          (cond
            (= line "BEGIN:VEVENT")
            (recur (rest ls) {} out)

            (= line "END:VEVENT")
            (recur (rest ls) nil
                   (if-let [start (:start cur)]
                     (let [date-end? (:date-end? cur)
                           end-raw   (or (:end cur) start)
                           ;; DATE-valued DTEND is exclusive; timed DTEND
                           ;; (or none) already lands on the last day
                           end (if (and date-end? (> end-raw start))
                                 (dec end-raw)
                                 end-raw)]
                       (if (:summary cur)
                         (conj out {:summary (:summary cur)
                                    :start-ed start
                                    :end-ed (max start end)})
                         out))
                     out))

            (and cur (str/starts-with? line "DTSTART"))
            (recur (rest ls)
                   (assoc cur :start (ics-date->ed (second (str/split line #":" 2))))
                   out)

            (and cur (str/starts-with? line "DTEND"))
            (let [v (second (str/split line #":" 2))]
              (recur (rest ls)
                     (assoc cur :end (ics-date->ed v)
                            :date-end? (not (str/includes? (or v "") "T")))
                     out))

            (and cur (str/starts-with? line "SUMMARY"))
            (recur (rest ls)
                   (assoc cur :summary (ics-unescape (second (str/split line #":" 2))))
                   out)

            :else (recur (rest ls) cur out)))
        out))))

(defn nager-json->events
  "Nager.Date public-holidays JSON (string) -> event shape. Keyless,
   CORS-open — the zero-setup holiday source. All single-day. Pure."
  [json-text]
  (let [items (js->clj (js/JSON.parse json-text) :keywordize-keys true)]
    (vec (for [i items
               :let [d (:date i)]
               :when d]
           (let [ed (date-str->ed d)]
             {:summary (or (:localName i) (:name i))
              :start-ed ed
              :end-ed ed})))))

(defn gcal-json->events
  "Google Calendar API v3 events JSON (string) -> the same event shape
   as parse-ics. All-day end.date is exclusive; timed events collapse
   to their start date. Pure."
  [json-text]
  (let [data (js->clj (js/JSON.parse json-text) :keywordize-keys true)]
    (vec
     (for [item (:items data)
           :let [summary (:summary item)
                 sd (get-in item [:start :date])
                 sdt (get-in item [:start :dateTime])
                 ed (get-in item [:end :date])
                 start (cond sd  (date-str->ed sd)
                             sdt (date-str->ed (subs sdt 0 10))
                             :else nil)
                 end (cond ed  (dec (date-str->ed ed))   ;; exclusive
                           :else start)]
           :when (and summary start)]
       {:summary summary
        :start-ed start
        :end-ed (max start (or end start))}))))

(defn ics-events->items
  "Split parsed events: single all-day -> day marks (hollow, like
   recurring), multi-day -> periods. Derived, read-only, never stored."
  [events sub-id]
  (let [{singles true multis false}
        (group-by #(= (:start-ed %) (:end-ed %)) events)]
    {:marks   (vec (map-indexed
                    (fn [i e] {:id (str "sub-" sub-id "-m" i)
                               :label (:summary e)
                               :date-ed (:start-ed e)
                               :recurring true
                               :subscription sub-id})
                    singles))
     :periods (vec (map-indexed
                    (fn [i e] {:id (str "sub-" sub-id "-p" i)
                               :label (:summary e)
                               :start-ed (:start-ed e)
                               :end-ed (:end-ed e)
                               :who []
                               :status "confirmed"
                               :kind "calendar"
                               :subscription sub-id})
                    multis))}))

;; -- Presence (post-PoC surface, seeded here) --

(def away-kinds #{"travel" "camp"})

(defn away-on?
  "Is person pid away on day ed, given enriched periods?"
  [periods pid ed]
  (boolean (some #(and (active-on? % ed)
                       (contains? (set (:who %)) pid)
                       (contains? away-kinds (:kind %)))
                 periods)))
