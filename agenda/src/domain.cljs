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

;; -- Presence (post-PoC surface, seeded here) --

(def away-kinds #{"travel" "camp"})

(defn away-on?
  "Is person pid away on day ed, given enriched periods?"
  [periods pid ed]
  (boolean (some #(and (active-on? % ed)
                       (contains? (set (:who %)) pid)
                       (contains? away-kinds (:kind %)))
                 periods)))
