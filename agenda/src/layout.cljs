(ns layout
  (:require [domain]))

;; =============================================
;; TIER 2 — PURE layout: the STREAMS algorithm ("variant D").
;; (week, periods, marks, person lanes) -> render plan with
;; coordinates. No Firebase, no Reagent.
;;
;; Design rules (product-design.md Layer 4.2, revised):
;; - Every person owns a FIXED slot in every week; a period is a thin
;;   stroke in its owner's slot (multi-person periods stroke in each
;;   participant's slot). Traceable streams, never painted cells.
;; - When one person runs n periods at once, their slot subdivides
;;   into n sub-strokes: position never moves, thickness divides —
;;   a thinner stream means that person is double-booked.
;; - No-person periods (guests, logistics, subscribed feeds) whisper:
;;   one thin muted lane at the bottom of the row.
;; - Labels: budget of 2 per week (person periods first), start only,
;;   each on a cell-toned plate, greedily nudged right until no two
;;   plates collide. Plates are placed here, drawn last by the
;;   renderer, so nothing overprints a label.
;; - Day marks: in-cell when the day is free, margin callout when busy.
;; Geometry constants (viewBox units) live HERE — the renderer draws
;; what this plan says.
;; =============================================

(println "[layout] loaded")

;; -- geometry (viewBox units) --
(def GUT 36)
(def DAY 90)
(def GRID (* 7 DAY))
(def MARGIN 124)
(def W (+ GUT GRID MARGIN))
(def ROW-H 26)

(defn day-x [d] (+ GUT (* d DAY)))

(def ^:private SLOT-TOP 2.5)
(def ^:private SLOT-AREA 19)      ;; person slots live in y 2.5..21.5
(def ^:private GUEST-Y 23.6)
(def ^:private GUEST-H 1.8)

(defn- lane-sorted [periods]
  (sort-by (juxt :start-ed :id) periods))

(defn- place-labels
  "Greedy horizontal nudging: shift a label right until its plate
   intersects no already-placed plate. Pure, deterministic."
  [requests]
  (loop [reqs requests, placed [], out []]
    (if-let [q (first reqs)]
      (let [w    (:w q)
            y0   (- (:y q) 8.5)
            y1   (+ (:y q) 2.5)
            x    (loop [x (:x q), guard 20]
                   (let [hit (some (fn [r]
                                     (when (and (< x (+ (:x r) (:w r)))
                                                (> (+ x w) (:x r))
                                                (< y0 (:y1 r))
                                                (> y1 (:y0 r)))
                                       r))
                                   placed)]
                     (if (and hit (pos? guard))
                       (recur (+ (:x hit) (:w hit) 4) (dec guard))
                       x)))
            x    (min x (- (+ GUT GRID) w))]
        (recur (rest reqs)
               (conj placed {:x x :w w :y0 y0 :y1 y1})
               (conj out (assoc q :x x))))
      out)))

(defn week-plan
  "Render plan for one collapsed week row.
   week      — domain/week-of descriptor {:days [7 eds] :key ..}
   periods   — enriched periods (domain/enrich-period)
   marks     — enriched day marks (incl. derived anchor/feed marks)
   lane-ids  — person ids in lane order (state/persons-sorted)
   Returns {:strokes [..] :guests [..] :labels [..]
            :cell-marks [..] :callouts [..] :periods [..]}"
  [week periods marks lane-ids]
  (let [days     (:days week)
        d0       (first days)
        d6       (last days)
        in-week? (fn [p] (and (<= (:start-ed p) d6) (>= (:end-ed p) d0)))
        wps      (vec (lane-sorted (filter in-week? periods)))
        n-lanes  (max (count lane-ids) 1)
        slot-h   (/ SLOT-AREA n-lanes)
        ;; uncapped: fewer visible persons -> thicker streams, up to a
        ;; near-painted row when only one person is shown
        zone-h   (max (- slot-h 1.0) 1.2)
        slot-y   (into {} (map-indexed (fn [i pid] [pid (+ SLOT-TOP (* i slot-h))])
                                       lane-ids))
        x0-of    (fn [p] (if (>= (:start-ed p) d0) (+ (day-x (- (:start-ed p) d0)) 1) GUT))
        x1-of    (fn [p] (if (<= (:end-ed p) d6) (- (day-x (inc (- (:end-ed p) d0))) 2)
                             (+ GUT GRID)))
        ;; person strokes: per person, their concurrent periods subdivide
        person-strokes
        (vec (mapcat
              (fn [pid]
                (let [ps (filterv #(some #{pid} (:who %)) wps)
                      n  (count ps)
                      sub (when (pos? n) (/ zone-h n))]
                  (map-indexed
                   (fn [k p]
                     {:period p :person pid
                      :x (x0-of p) :x1 (x1-of p)
                      :y (+ (get slot-y pid) (* k sub))
                      :h (max (- sub 0.5) 1.2)})
                   ps)))
              lane-ids))
        ;; guests / logistics / subscribed: the whisper lane
        guest-strokes
        (vec (for [p wps :when (empty? (:who p))]
               {:period p :x (x0-of p) :x1 (x1-of p) :y GUEST-Y :h GUEST-H}))
        ;; labels: starts only, people first (by lane order), budget 2;
        ;; a guest label only when no person label claimed the week
        starting  (fn [coll] (filter #(<= d0 (:start-ed (:period %)) d6) coll))
        p-reqs    (->> (starting person-strokes)
                       (sort-by (fn [s] [(get slot-y (:person s)) (:start-ed (:period s))]))
                       ;; one label per period even if several participants
                       (reduce (fn [[seen out] s]
                                 (if (seen (:id (:period s)))
                                   [seen out]
                                   [(conj seen (:id (:period s))) (conj out s)]))
                               [#{} []])
                       second
                       (take 2)
                       (mapv (fn [s]
                               (let [p (:period s)
                                     t (str (:label p) (when (domain/tentative? p) "?"))]
                                 ;; baseline clamped so top-lane labels
                                 ;; stay inside the row (plates keep them
                                 ;; readable over neighboring strokes)
                                 {:x (+ (:x s) 1)
                                  :y (max 8.8 (- (:y s) 1.6))
                                  :w (+ (* (count t) 6.3) 8)
                                  :text t :muted? false}))))
        g-reqs    (when (empty? p-reqs)
                    (->> (starting guest-strokes)
                         (take 1)
                         (mapv (fn [s]
                                 (let [p (:period s)
                                       t (str (:label p) (when (domain/tentative? p) "?"))]
                                   {:x (+ (:x s) 1) :y (- (:y s) 1.8)
                                    :w (+ (* (count t) 6.3) 8)
                                    :text t :muted? true})))))
        labels    (place-labels (into p-reqs g-reqs))
        ;; day marks (unchanged system): in-cell on free days, margin
        ;; callouts on busy ones
        active    (fn [ed] (some #(domain/active-on? % ed) wps))
        busy-days (set (for [[i ed] (map-indexed vector days) :when (active ed)] i))
        wmarks    (filterv #(<= d0 (:date-ed %) d6) marks)
        mark-day  (fn [m] (- (:date-ed m) d0))
        {cell-marks false callouts true}
        (group-by #(contains? busy-days (mark-day %)) wmarks)]
    {:week       week
     :strokes    person-strokes
     :guests     guest-strokes
     :labels     labels
     :cell-marks (vec (map #(assoc % :day (mark-day %)) cell-marks))
     :callouts   (vec (sort-by :date-ed (map #(assoc % :day (mark-day %)) callouts)))
     :busy-days  busy-days
     :periods    wps}))

(defn expanded-plan
  "Render plan for the expanded week (design 4.7): one swimlane per
   period, all labels, marks always on their days. Unchanged — the
   chevron zoom is where a busy week is read comfortably."
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
