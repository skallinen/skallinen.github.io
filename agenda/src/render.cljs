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

;; geometry lives in the pure layout tier — the renderer draws plans
(def GUT layout/GUT)
(def DAY layout/DAY)
(def GRID layout/GRID)
(def MARGIN layout/MARGIN)
(def W layout/W)
(def ROW-H layout/ROW-H)
(def FONT 10.5)

(def day-x layout/day-x)

(defn- diamond [cx cy r attrs]
  [:path (merge {:d (str "M" cx " " (- cy r)
                         " l" r " " r
                         " -" r " " r
                         " -" r " -" r " z")}
                attrs)])

(defn- label-text
  "One constant font size (R13), one flat ink per label — black or
   white chosen by contrast with the color underneath (domain/band-ink).
   Thin (medium cut), no halo; white ink gets a hairline dark edge so
   overflow onto the light background stays readable."
  [x y anchor text & [{:keys [fill] :or {fill "#1a1a1a"}}]]
  (let [white? (= fill "#ffffff")]
    [:text (cond-> {:x x :y y
                    :text-anchor (name anchor)
                    :font-size FONT
                    :font-weight 500
                    :fill fill
                    :style {:pointer-events "none"}}
             white? (assoc :stroke "rgba(38,34,28,0.55)"
                           :stroke-width 1.4
                           :paint-order "stroke"
                           :stroke-linejoin "round"))
     text]))

(defn- row-chrome
  "Background, weekend tint, today column, hairlines, week number,
   chevron, month label."
  [week h expanded?]
  (let [wk (:weeknum week)
        today-idx (.indexOf (:days week) (domain/today-ed))]
    [:g
     [:rect {:x GUT :y 0 :width GRID :height h
             :fill (if expanded? "#f8f4ef" "#f1ece7")}]
     [:rect {:x (day-x 5) :y 0 :width (* 2 DAY) :height h
             :fill "rgba(0,0,0,0.045)"}]
     ;; today: a soft column tint (the tick is drawn late, over bands)
     (when (>= today-idx 0)
       [:rect {:x (day-x today-idx) :y 0 :width DAY :height h
               :fill "rgba(169,67,30,0.10)"}])
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

(defn- stream-stroke
  "One period as a thin rounded stroke in its owner's fixed slot
   (streams design, 4.2). Visual only — the day overlay owns pointer
   events."
  [{:keys [period person x x1 y h]} colors]
  (let [tnt (domain/tentative? period)]
    [:rect (cond-> {:x x :y y :width (- x1 x) :height h :rx 1.4
                    :fill (get colors person "#999")
                    :opacity (if tnt 0.5 1)
                    :style {:pointer-events "none"}}
             tnt (assoc :stroke-dasharray "4 3"))]))

(defn- guest-stroke
  "No-person periods whisper: one thin muted lane at the row bottom."
  [{:keys [period x x1 y h]}]
  [:rect {:x x :y y :width (- x1 x) :height h :rx 0.9
          :fill "#9a958e"
          :opacity (if (domain/tentative? period) 0.35 0.5)
          :style {:pointer-events "none"}}])

(defn- label-plate
  "A placed label on its cell-toned plate — drawn last, nothing
   overprints it."
  [{:keys [x y w text muted?]}]
  [:g {:style {:pointer-events "none"}}
   [:rect {:x (- x 2) :y (- y 8.5) :width w :height 11 :rx 2
           :fill "#f1ece7" :opacity 0.92}]
   (label-text (+ x 2) y :start text
               {:fill (if muted? "rgba(0,0,0,0.45)" "#1a1a1a")})])

(defn- period-ink
  "Black or white for a label on this period's band (expanded week)."
  [period colors]
  (domain/band-ink (mapv #(get colors % "#999999") (:who period))
                   (if (domain/tentative? period) 0.45 1)))

(defn- mark-glyph [m colors cx cy]
  (let [c (if (:person m) (get colors (:person m) "#333") "#333")]
    (if (:recurring m)
      (diamond cx cy 4 {:fill "#fff" :stroke c :stroke-width 1.4})
      (diamond cx cy 4 {:fill c}))))

(defn- cell-mark [m colors]
  (let [cx (+ (day-x (:day m)) 9)
        cy (/ ROW-H 2)]
    [:g {:role "img" :aria-label (:label (interactions/day-mark (:label m)))}
     (mark-glyph m colors cx cy)
     (label-text (+ cx 8) (+ cy (* FONT 0.36)) :start (:label m))]))

(defn- day-dot
  "Neutral origin dot on the day: dark core + white ring, visible on
   ANY band color (a person-colored glyph can vanish on its own color)."
  [x]
  [:circle {:cx x :cy 4.5 :r 2.2
            :fill "#26221c" :stroke "#fff" :stroke-width 1.2}])

(defn- dot-x
  "X of a mark's origin dot; same-day marks sit side by side."
  [m day-slots]
  (let [[k n] (get day-slots (:id m) [0 1])]
    (+ (day-x (:day m)) (/ DAY 2)
       (- (* k 6.5) (/ (* (dec n) 6.5) 2)))))

(defn- callout
  "Margin label + leader to its (busy) day. The COLORED diamond lives
   only in the margin; the day end is a neutral dot. Each leader runs
   at its label's height and elbows up to its own dot, so several
   callouts in one week stay visually distinct. Marks whisper (4.3)."
  [m i colors day-slots]
  (let [tx  (+ GUT GRID 14)
        ty  (+ 8 (* i 12))
        dx  (dot-x m day-slots)
        d   (str "M" (- tx 6) " " ty
                 " H" dx
                 " V" 7)]
    [:g {:role "img" :aria-label (:label (interactions/day-mark (:label m)))}
     [:path {:d d :stroke "#fff" :stroke-width 3
             :fill "none" :stroke-linejoin "round"}]
     [:path {:d d :stroke "#333" :stroke-width 0.9
             :fill "none" :stroke-linejoin "round"}]
     (day-dot dx)
     (mark-glyph m colors (- tx 4) ty)
     (label-text (+ tx 4) (+ ty (* FONT 0.36)) :start (:label m))]))

(defn- extra-marker
  "Origin dot only (no label) for marks beyond the margin's two lanes."
  [m colors day-slots]
  [:g {:role "img" :aria-label (:label (interactions/day-mark (:label m)))
       :style {:pointer-events "none"}}
   (day-dot (dot-x m day-slots))])

(defn- more-marks-pill
  "+N aggregator in the second margin lane; opens the expanded week,
   where every mark is shown on its day."
  [n week]
  (let [tx (+ GUT GRID 14)
        ty 20
        ix (interactions/more-marks n)]
    [:g {:role (:role ix)
         :aria-label (:name ix)
         :on-click #(reset! state/expanded-week (:key week))
         :style {:cursor "pointer"}}
     ;; hit area: labels are pointer-events none, so the group needs
     ;; a painted (transparent) rect to be reliably clickable
     [:rect {:x (- tx 10) :y (- ty 7) :width (- W tx -6) :height 14
             :fill "transparent"}]
     (diamond (- tx 4) ty 3 {:fill "#333"})
     (label-text (+ tx 4) (+ ty (* FONT 0.36)) :start (str "+" n " more"))]))

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

(defn- today-tick
  "Drawn late so it stays visible over fully painted days."
  [week]
  (let [idx (.indexOf (:days week) (domain/today-ed))]
    (when (>= idx 0)
      [:rect {:x (day-x idx) :y 0 :width DAY :height 2.5
              :fill "#a9431e"
              :style {:pointer-events "none"}}])))

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
        ;; a uniform row holds TWO labeled margin lanes (R13/R14);
        ;; beyond that: markers stay on their days, labels aggregate
        ;; into a +N pill that opens the expanded week
        callouts (:callouts plan)
        labeled  (if (> (count callouts) 2) (take 1 callouts) callouts)
        extra    (drop (count labeled) callouts)
        ;; same-day marks get side-by-side origin dots: id -> [k n]
        day-slots (into {}
                        (mapcat (fn [[_ ms]]
                                  (map-indexed (fn [k m] [(:id m) [k (count ms)]]) ms))
                                (group-by :day callouts)))]
    [:svg.week-row-svg {:viewBox (str "0 0 " W " " ROW-H)
                        :style {:margin-bottom "1px"}}
     [row-chrome week ROW-H false]
     ;; streams: fixed person slots (subdividing) + the guest whisper lane
     (for [s (:strokes plan)]
       ^{:key (str (:id (:period s)) "-" (:person s))}
       [stream-stroke s colors])
     (for [g (:guests plan)]
       ^{:key (str "g" (:id (:period g)))}
       [guest-stroke g])
     ;; day marks
     (for [m (:cell-marks plan)]
       ^{:key (str "m" (:id m))}
       [cell-mark m colors])
     (for [[i m] (map-indexed vector labeled)]
       ^{:key (str "c" (:id m))}
       [callout m i colors day-slots])
     (for [m extra]
       ^{:key (str "x" (:id m))}
       [extra-marker m colors day-slots])
     (when (seq extra)
       [more-marks-pill (count extra) week])
     [today-tick week]
     ;; labels last, on plates — nothing overprints them
     (for [[i l] (map-indexed vector (:labels plan))]
       ^{:key (str "lp" i)}
       [label-plate l])
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
        marks  (:marks eplan)
        ;; same-day marks stack vertically (dynamic height is the
        ;; expanded week's privilege)
        mark-level (into {}
                         (mapcat (fn [[_ ms]]
                                   (map-indexed (fn [k m] [(:id m) k]) ms))
                                 (group-by :day marks)))
        stack   (if (seq marks) (inc (apply max 0 (vals mark-level))) 0)
        marks-h (* 15 stack)
        h      (max ROW-H (+ 6 marks-h (* (count lanes) LANE-H)))]
    [:svg.week-row-svg {:viewBox (str "0 0 " W " " h)
                        :style {:margin-bottom "1px"}}
     [row-chrome week h true]
     ;; marks always on their days (they come home from the margin)
     (for [m marks]
       ^{:key (str "em" (:id m))}
       (let [cx (+ (day-x (:day m)) 9)
             cy (+ 9 (* 13 (get mark-level (:id m) 0)))]
         [:g {:role "img" :aria-label (:label (interactions/day-mark (:label m)))}
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
                      (str (:label period) (when tnt "?"))
                      {:fill (period-ink period colors)})]))
     [today-tick week]]))

;; -- Frozen weekday header (sticks while the year scrolls) --

(defn day-header
  "Sticky column header; today's weekday is highlighted."
  []
  (let [dow (domain/day-of-week (domain/today-ed))]
    [:div.day-header
     [:svg.week-row-svg {:viewBox (str "0 0 " W " 15")}
      (for [[i nm] (map-indexed vector ["MO" "TU" "WE" "TH" "FR" "SA" "SU"])]
        ^{:key nm}
        [:text {:x (+ (day-x i) (/ DAY 2)) :y 11
                :text-anchor "middle"
                :font-size 9 :font-weight 700 :letter-spacing 1
                :fill (if (= i dow) "#a9431e" "#000")
                :opacity (if (= i dow) 0.95 0.4)}
         nm])]]))
