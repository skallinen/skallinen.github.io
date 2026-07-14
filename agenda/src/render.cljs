(ns render
  (:require [domain]
            [layout]
            [state]
            [interactions]))

;; =============================================
;; Render plan -> SVG hiccup.
;; Disposable tier: knows Reagent atoms (drag, expanded)
;; but ALL geometry decisions come from layout.cljs plans.
;;
;; Geometry (viewBox units):
;;   gutter 36 | 7 days x 90 = 630 | margin 124  => width 790
;;   collapsed row height 26 (uniform, R14)
;;   one constant font size (R13)
;; =============================================

(println "[render] loaded")

(def GUT 36)
(def DAY 90)
(def GRID (* 7 DAY))
(def MARGIN 124)
(def W (+ GUT GRID MARGIN))
(def ROW-H 26)
(def PAD 1.5)
(def FONT 10.5)

(defn day-x [d] (+ GUT (* d DAY)))

(defn- diamond [cx cy r attrs]
  [:path (merge {:d (str "M" cx " " (- cy r)
                         " l" r " " r
                         " -" r " " r
                         " -" r " -" r " z")}
                attrs)])

(defn- label-text
  "One constant font size; white halo for legibility over fills (R13)."
  [x y anchor text & [{:keys [fill] :or {fill "#111"}}]]
  [:text {:x x :y y
          :text-anchor (name anchor)
          :font-size FONT
          :font-weight 700
          :fill fill
          :stroke "#fff"
          :stroke-width 2.5
          :paint-order "stroke"
          :style {:pointer-events "none"}}
   text])

(defn- row-chrome
  "Background, weekend tint, hairlines, week number, chevron, month label."
  [week h expanded?]
  (let [wk (:weeknum week)]
    [:g
     [:rect {:x GUT :y 0 :width GRID :height h
             :fill (if expanded? "#f8f4ef" "#f1ece7")}]
     [:rect {:x (day-x 5) :y 0 :width (* 2 DAY) :height h
             :fill "rgba(0,0,0,0.045)"}]
     (for [d (range 1 7)]
       ^{:key d}
       [:line {:x1 (day-x d) :y1 0 :x2 (day-x d) :y2 h
               :stroke "rgba(0,0,0,0.08)" :stroke-width 1}])
     ;; week number + expand chevron
     [:text {:x 14 :y (+ 4 (/ ROW-H 2))
             :text-anchor "middle" :font-size 9.5 :font-weight 800
             :fill "#000" :opacity 0.45}
      wk]
     [:g (let [ix (interactions/toggle-week (:key week))]
           {:on-click #(swap! state/expanded-week
                              (fn [cur] (when (not= cur (:key week)) (:key week))))
            :role (:role ix)
            :aria-label (:name ix)
            :style {:cursor "pointer"}})
      [:rect {:x 22 :y 4 :width 14 :height 18 :fill "transparent"}]
      [:path {:d (if expanded? "M25 11 l4 4 4 -4" "M27 9 l4 4 -4 4")
              :stroke "#000" :stroke-width 1.5 :fill "none" :opacity 0.4}]]
     ;; month label at month boundary (dates on demand, 4.1)
     (when-let [ml (domain/month-label week)]
       [:text {:x 14 :y (- h 3)
               :text-anchor "middle" :font-size 7 :font-weight 700
               :fill "#000" :opacity 0.4 :letter-spacing 0.5}
        ml])]))

(defn- band-rects
  "One band = one period on one day. Participants stripe WITHIN the band
   (one period = one thickness). Tentative renders as pattern, not color."
  [{:keys [day period y0 y1]} colors usable]
  (let [x   (day-x day)
        by0 (+ PAD (* y0 usable))
        by1 (+ PAD (* y1 usable))
        h   (- by1 by0)
        who (:who period)
        cs  (if (seq who) (mapv #(get colors % "#999") who) ["#999"])
        k   (count cs)
        tnt (domain/tentative? period)
        stripe-h (/ h k)]
    ;; visual only — the day overlay owns all pointer events; a zero-length
    ;; drag (click) on a busy day opens the top period's editor (see views)
    [:g {:opacity (if tnt 0.45 1)
         :style {:pointer-events "none"}}
     (for [[i c] (map-indexed vector cs)]
       ^{:key i}
       [:rect {:x x :width DAY
               :y (+ by0 (* i stripe-h))
               :height (- stripe-h (if (< i (dec k)) 0.6 0))
               :fill c}])
     (when tnt
       [:rect {:x (+ x 0.75) :width (- DAY 1.5)
               :y (+ by0 0.75) :height (- h 1.5)
               :fill "none" :stroke "#fff"
               :stroke-width 1.2 :stroke-dasharray "4 3"}])]))

(defn- band-label [{:keys [day period align]} bands usable]
  (let [band (some #(when (and (= (:day %) day)
                               (= (:id (:period %)) (:id period))) %)
                   bands)
        y0   (+ PAD (* (:y0 band 0) usable))
        y1   (+ PAD (* (:y1 band 1) usable))
        ymid (+ (/ (+ y0 y1) 2) (* FONT 0.36))
        txt  (str (:label period) (when (domain/tentative? period) "?"))]
    (if (= align :end)
      (label-text (- (day-x (inc day)) 3) ymid :end txt)
      (label-text (+ (day-x day) 3) ymid :start txt))))

(defn- mark-glyph [m colors cx cy]
  (let [c (if (:person m) (get colors (:person m) "#333") "#333")]
    (if (:recurring m)
      (diamond cx cy 4 {:fill "#fff" :stroke c :stroke-width 1.4})
      (diamond cx cy 4 {:fill c}))))

(defn- cell-mark [m colors]
  (let [cx (+ (day-x (:day m)) 9)
        cy (/ ROW-H 2)]
    [:g
     (mark-glyph m colors cx cy)
     (label-text (+ cx 8) (+ cy (* FONT 0.36)) :start (:label m))]))

(defn- callout
  "Margin label + leader line to its (busy) day. Marks whisper (4.3)."
  [m i colors]
  (let [tx  (+ GUT GRID 14)
        ty  (+ 8 (* i 12))
        dx  (+ (day-x (:day m)) (/ DAY 2))]
    [:g
     (diamond dx 4 3 (if (:recurring m)
                       {:fill "#fff" :stroke (get colors (:person m) "#333") :stroke-width 1.1}
                       {:fill (get colors (:person m) "#333")}))
     [:path {:d (str "M" (+ dx 4) " " (min ty 5) " H" (- tx 8))
             :stroke "#fff" :stroke-width 3 :fill "none"}]
     [:path {:d (str "M" (+ dx 4) " " (min ty 5) " H" (- tx 8))
             :stroke "#333" :stroke-width 0.8 :fill "none"}]
     (mark-glyph m colors (- tx 4) ty)
     (label-text (+ tx 4) (+ ty (* FONT 0.36)) :start (:label m))]))

;; -- Drag-to-paint plumbing (R6) --

(defn- drag-range []
  (when-let [{:keys [anchor-ed ed]} @state/drag]
    [(min anchor-ed ed) (max anchor-ed ed)]))

(defn- day-overlay
  "Transparent per-day rect: mouse handlers for paint gesture + open editor."
  [week d h on-paint]
  (let [ed (nth (:days week) d)]
    [:rect {:x (day-x d) :y 0 :width DAY :height h
            :fill "transparent"
            :style {:cursor "crosshair"}
            :on-mouse-down (fn [e]
                             (.preventDefault e)
                             (reset! state/drag {:anchor-ed ed :ed ed}))
            :on-mouse-enter (fn [_]
                              (when @state/drag
                                (swap! state/drag assoc :ed ed)))
            :on-mouse-up (fn [_]
                           (when-let [[a b] (drag-range)]
                             (reset! state/drag nil)
                             (on-paint a b)))}]))

(defn- drag-highlight [week h]
  (when-let [[a b] (drag-range)]
    (let [d0 (first (:days week))
          d6 (last (:days week))]
      (when (and (<= a d6) (>= b d0))
        (let [from (max 0 (- (max a d0) d0))
              to   (min 6 (- (min b d6) d0))]
          [:rect {:x (day-x from) :y 0
                  :width (* (inc (- to from)) DAY) :height h
                  :fill "rgba(169,67,30,0.15)"
                  :style {:pointer-events "none"}}])))))

;; -- Collapsed week row --

(defn week-row
  "One uniform-height week row (R14). plan from layout/week-plan.
   on-paint receives [start-ed end-ed]; a zero-length paint is a click —
   the caller decides whether that means edit-existing or create-new."
  [plan colors on-paint]
  (let [week   (:week plan)
        usable (- ROW-H (* 2 PAD))]
    [:svg.week-row-svg {:viewBox (str "0 0 " W " " ROW-H)
                        :style {:margin-bottom "1px"}}
     [row-chrome week ROW-H false]
     ;; bands (conditional fill)
     (for [b (:bands plan)]
       ^{:key (str (:id (:period b)) "-" (:day b))}
       [band-rects b colors usable])
     ;; labels (one per cell, both ends)
     (for [l (:labels plan)]
       ^{:key (str "l" (:day l) (name (:align l)))}
       [band-label l (:bands plan) usable])
     ;; day marks
     (for [m (:cell-marks plan)]
       ^{:key (str "m" (:id m))}
       [cell-mark m colors])
     (for [[i m] (map-indexed vector (:callouts plan))]
       ^{:key (str "c" (:id m))}
       [callout m i colors])
     ;; paint overlay: owns ALL pointer events in the row
     (for [d (range 7)]
       ^{:key (str "ov" d)}
       [day-overlay week d ROW-H on-paint])
     [drag-highlight week ROW-H]]))

;; -- Expanded week (4.7): dynamic height, one swimlane per period --

(def LANE-H 17)

(defn expanded-week-row
  "Expanded week (4.7): swimlanes are directly clickable (no paint
   overlay here — collapse the week to paint new periods)."
  [eplan colors on-edit]
  (let [week   (:week eplan)
        lanes  (:lanes eplan)
        marksr (seq (:marks eplan))
        marks-h (if marksr 16 0)
        h      (max ROW-H (+ 6 marks-h (* (count lanes) LANE-H)))]
    [:svg.week-row-svg {:viewBox (str "0 0 " W " " h)
                        :style {:margin-bottom "1px"}}
     [row-chrome week h true]
     ;; marks always on their days (they come home from the margin)
     (for [m (:marks eplan)]
       ^{:key (str "em" (:id m))}
       (let [cx (+ (day-x (:day m)) 9)
             cy 9]
         [:g
          (mark-glyph m colors cx cy)
          (label-text (+ cx 8) (+ cy (* FONT 0.36)) :start (:label m))]))
     ;; swimlanes: every period, full label, nothing suppressed
     (for [{:keys [lane period day0 day1 starts? ends?]} lanes]
       ^{:key (str "lane" (:id period))}
       (let [y   (+ 4 marks-h (* lane LANE-H))
             x0  (if starts? (day-x day0) GUT)
             x1  (if ends? (day-x (inc day1)) (+ GUT GRID))
             who (:who period)
             cs  (if (seq who) (mapv #(get colors % "#999") who) ["#999"])
             k   (count cs)
             bh  (- LANE-H 3)
             tnt (domain/tentative? period)]
         [:g (let [ix (interactions/edit-period (:label period))]
               {:opacity (if tnt 0.5 1)
                :on-click #(on-edit period)
                :role (:role ix)
                :aria-label (:name ix)
                :style {:cursor "pointer"}})
          (for [[i c] (map-indexed vector cs)]
            ^{:key i}
            [:rect {:x x0 :width (- x1 x0)
                    :y (+ y (* i (/ bh k)))
                    :height (- (/ bh k) 0.5)
                    :fill c}])
          (when tnt
            [:rect {:x x0 :y y :width (- x1 x0) :height bh
                    :fill "none" :stroke "#fff"
                    :stroke-width 1.2 :stroke-dasharray "4 3"}])
          (label-text (+ x0 4) (+ y (/ bh 2) (* FONT 0.36)) :start
                      (str (:label period) (when tnt "?")))]))]))
