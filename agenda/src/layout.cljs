(ns layout
  (:require [domain]))

;; =============================================
;; TIER 2 — PURE layout: the conditional-fill algorithm.
;; (week, periods, marks) -> render plan. No Firebase, no Reagent.
;;
;; Encodes the design rules (product-design.md Layer 4.2/4.3):
;; - A day's vertical space divides EQUALLY among the periods
;;   active that day (alone = whole cell; several = equal bands).
;; - One period = one thickness; participants stripe within.
;; - Labels on start AND end caps; one label per cell by priority.
;; - Day marks: in-cell when the day is free, margin callout when busy.
;; All coordinates are fractions (0..1) of the row's content height —
;; the renderer scales; row height itself is uniform (R14).
;; =============================================

(println "[layout] loaded")

(defn- lane-sorted
  "Stable lane order within a week: by start day then id (R3-adjacent)."
  [periods]
  (sort-by (juxt :start-ed :id) periods))

(defn week-plan
  "Compute the render plan for one week.
   week    — domain/week-of descriptor {:days [7 eds] :key ..}
   periods — enriched periods (domain/enrich-period)
   marks   — enriched day marks (incl. derived anchor marks)
   n-persons — total persons in the agenda (for whole-family ranking)
   Returns {:bands [..] :labels [..] :cell-marks [..] :callouts [..] :busy-days #{..}}"
  [week periods marks n-persons]
  (let [days     (:days week)
        d0       (first days)
        d6       (last days)
        in-week? (fn [p] (and (<= (:start-ed p) d6) (>= (:end-ed p) d0)))
        wps      (vec (lane-sorted (filter in-week? periods)))
        active   (fn [ed] (filterv #(domain/active-on? % ed) wps))
        ;; conditional fill: per day, equal fractional bands
        bands    (vec
                  (for [[i ed] (map-indexed vector days)
                        :let [as (active ed)
                              n  (count as)]
                        [slot p] (map-indexed vector as)]
                    {:day    i
                     :period p
                     :y0     (/ slot n)
                     :y1     (/ (inc slot) n)
                     :start? (= ed (:start-ed p))
                     :end?   (= ed (:end-ed p))}))
        busy-days (set (for [[i ed] (map-indexed vector days)
                             :when (pos? (count (active ed)))]
                         i))
        ;; labels at both ends, one per cell by priority
        candidates (concat
                    (for [p wps :when (<= d0 (:start-ed p) d6)]
                      {:day    (- (:start-ed p) d0)
                       :period p
                       :align  :start})
                    (for [p wps :when (and (<= d0 (:end-ed p) d6)
                                           (not= (:start-ed p) (:end-ed p)))]
                      {:day    (- (:end-ed p) d0)
                       :period p
                       :align  :end}))
        labels (->> candidates
                    (reduce (fn [m l]
                              (let [k (:day l)
                                    r #(domain/period-rank (:period %) n-persons)]
                                (if (or (nil? (m k)) (neg? (compare (r l) (r (m k)))))
                                  (assoc m k l)
                                  m)))
                            {})
                    vals
                    vec)
        wmarks (filterv #(<= d0 (:date-ed %) d6) marks)
        mark-day (fn [m] (- (:date-ed m) d0))
        {cell-marks false callouts true}
        (group-by #(contains? busy-days (mark-day %)) wmarks)]
    {:week       week
     :bands      bands
     :labels     labels
     :cell-marks (vec (map #(assoc % :day (mark-day %)) cell-marks))
     ;; sorted by day so stacked margin labels read left-to-right and
     ;; their leader lines never cross
     :callouts   (vec (sort-by :date-ed (map #(assoc % :day (mark-day %)) callouts)))
     :busy-days  busy-days
     :periods    wps}))

(defn expanded-plan
  "Render plan for the expanded week (design 4.7): one swimlane per
   period, all labels, marks always on their days."
  [week periods marks]
  (let [days     (:days week)
        d0       (first days)
        d6       (last days)
        in-week? (fn [p] (and (<= (:start-ed p) d6) (>= (:end-ed p) d0)))
        wps      (vec (lane-sorted (filter in-week? periods)))
        wmarks   (filterv #(<= d0 (:date-ed %) d6) marks)]
    {:week  week
     :lanes (vec (map-indexed
                  (fn [i p]
                    {:lane   i
                     :period p
                     :day0   (max 0 (- (:start-ed p) d0))
                     :day1   (min 6 (- (:end-ed p) d0))
                     :starts? (>= (:start-ed p) d0)
                     :ends?   (<= (:end-ed p) d6)})
                  wps))
     :marks (vec (map #(assoc % :day (- (:date-ed %) d0)) wmarks))}))
