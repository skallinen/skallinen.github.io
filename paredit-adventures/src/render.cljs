;;; render.cljs - Visual rendering of s-expression trees on canvas
;;; Nested containers as rounded rectangles with depth-based coloring

(ns render
  (:require [engine :as e]))

;; ── Color palette ───────────────────────────────────────────────

;; Light mode palette from 8-bit-sheep / 1-bit-wonder
(def depth-colors
  ["rgba(0, 0, 0, 0.04)"            ;; depth 0 - subtle grey
   "rgba(169, 67, 30, 0.06)"        ;; depth 1 - orange tint
   "rgba(123, 173, 182, 0.08)"      ;; depth 2 - teal tint
   "rgba(227, 202, 195, 0.12)"      ;; depth 3 - rose
   "rgba(249, 237, 221, 0.15)"      ;; depth 4 - peach
   "rgba(238, 231, 225, 0.15)"]) ;; depth 5 - linen

(def depth-border-colors
  ["rgba(0, 0, 0, 0.12)"
   "rgba(169, 67, 30, 0.25)"
   "rgba(123, 173, 182, 0.30)"
   "rgba(0, 0, 0, 0.08)"
   "rgba(169, 67, 30, 0.15)"
   "rgba(123, 173, 182, 0.15)"])

(def item-colors
  {:star   "#a9431e"
   :key    "#7badb6"
   :gem    "#a9431e"
   :heart  "#a9431e"
   :trophy "#a9431e"
   :wall   "rgba(0,0,0,0.12)"
   :lock   "rgba(0,0,0,0.20)"})

(def item-symbols
  {:star   "\u2605"
   :key    "\u2763"
   :gem    "\u25C6"
   :heart  "\u2665"
   :trophy "\u2654"
   :wall   "\u2588"
   :lock   "\u2602"})

;; ── Layout calculation ──────────────────────────────────────────
;; We compute a layout tree: each node gets {:x :y :w :h :depth :path :node}

(def atom-width 44)
(def atom-height 40)
(def padding 12)
(def gap 10)
(def min-list-width 30)

(defn measure-node
  "Calculate the width and height needed for a node."
  [node]
  (if (e/atom? node)
    {:w atom-width :h atom-height}
    (if (empty? node)
      {:w min-list-width :h atom-height}
      (let [child-measures (mapv measure-node node)
            total-w (+ (* 2 padding)
                       (reduce + (map :w child-measures))
                       (* gap (dec (count child-measures))))
            max-h (apply max (map :h child-measures))
            total-h (+ (* 2 padding) max-h)]
        {:w total-w :h total-h}))))

(defn layout-node
  "Position a node and its children. Returns a flat list of layout rects."
  [node x y depth path]
  (if (e/atom? node)
    [{:x x :y y :w atom-width :h atom-height
      :depth depth :path path :node node :type :atom}]
    (let [measure (measure-node node)
          w (:w measure)
          h (:h measure)
          self {:x x :y y :w w :h h
                :depth depth :path path :node node :type :list}]
      (if (empty? node)
        [self]
        (let [child-measures (mapv measure-node node)
              ;; Center children vertically
              max-ch (apply max (map :h child-measures))
              start-x (+ x padding)
              cy (+ y padding)]
          (loop [i 0
                 cx start-x
                 acc [self]]
            (if (>= i (count node))
              acc
              (let [child (nth node i)
                    cm (nth child-measures i)
                    child-y (+ cy (/ (- max-ch (:h cm)) 2))
                    child-layouts (layout-node child cx child-y
                                               (inc depth)
                                               (conj path i))]
                (recur (inc i)
                       (+ cx (:w cm) gap)
                       (into acc child-layouts))))))))))

(defn compute-layout
  "Compute the full layout for a tree, centered on the canvas."
  [tree canvas-w canvas-h]
  (let [measure (measure-node tree)
        x (/ (- canvas-w (:w measure)) 2)
        y (/ (- canvas-h (:h measure)) 2)]
    (layout-node tree x y 0 [])))

;; ── Drawing ─────────────────────────────────────────────────────

(defn draw-rounded-rect [ctx x y w h r]
  (.beginPath ctx)
  (.moveTo ctx (+ x r) y)
  (.lineTo ctx (+ x (- w r)) y)
  (.arcTo ctx (+ x w) y (+ x w) (+ y r) r)
  (.lineTo ctx (+ x w) (+ y (- h r)))
  (.arcTo ctx (+ x w) (+ y h) (+ x (- w r)) (+ y h) r)
  (.lineTo ctx (+ x r) (+ y h))
  (.arcTo ctx x (+ y h) x (+ y (- h r)) r)
  (.lineTo ctx x (+ y r))
  (.arcTo ctx x y (+ x r) y r)
  (.closePath ctx))

(def game-font "'Plus Jakarta Sans', 'Helvetica Neue', Arial, sans-serif")

(defn draw-cursor [ctx x y w h time-ms]
  (let [pulse (+ 0.5 (* 0.5 (js/Math.sin (/ time-ms 300))))
        alpha (+ 0.4 (* 0.4 pulse))]
    (set! (.-strokeStyle ctx) (str "rgba(169, 67, 30, " alpha ")"))
    (set! (.-lineWidth ctx) 2)
    (set! (.-shadowColor ctx) "rgba(169, 67, 30, 0.12)")
    (set! (.-shadowBlur ctx) 8)
    (draw-rounded-rect ctx (- x 4) (- y 4) (+ w 8) (+ h 8) 6)
    (.stroke ctx)
    (set! (.-shadowBlur ctx) 0)
    (set! (.-lineWidth ctx) 1)))

(defn draw-atom [ctx x y w h node]
  (let [color (get item-colors node "rgba(0,0,0,0.5)")
        symbol (get item-symbols node (name node))]
    (set! (.-fillStyle ctx) color)
    (set! (.-font ctx) (if (e/item? node)
                         (str "20px " game-font)
                         (str "13px " game-font)))
    (set! (.-textAlign ctx) "center")
    (set! (.-textBaseline ctx) "middle")
    (.fillText ctx symbol (+ x (/ w 2)) (+ y (/ h 2)))))

(defn draw-layout [ctx layouts cursor-path time-ms]
  ;; Draw lists (back to front, they're already in order)
  (doseq [{:keys [x y w h depth path type node]} layouts]
    (when (= type :list)
      (let [ci (mod depth (count depth-colors))
            fill (nth depth-colors ci)
            border (nth depth-border-colors ci)]
        (set! (.-fillStyle ctx) fill)
        (set! (.-strokeStyle ctx) border)
        (set! (.-lineWidth ctx) 1)
        (draw-rounded-rect ctx x y w h 6)
        (.fill ctx)
        (.stroke ctx))))

  ;; Draw atoms
  (doseq [{:keys [x y w h type node]} layouts]
    (when (= type :atom)
      (draw-atom ctx x y w h node)))

  ;; Draw cursor
  (doseq [{:keys [x y w h path]} layouts]
    (when (= path cursor-path)
      (draw-cursor ctx x y w h time-ms))))

(defn draw-goal-indicator [ctx canvas-w text]
  (set! (.-fillStyle ctx) "rgba(0,0,0,0.25)")
  (set! (.-font ctx) (str "13px " game-font))
  (set! (.-textAlign ctx) "center")
  (set! (.-textBaseline ctx) "top")
  (.fillText ctx text (/ canvas-w 2) 16))

(defn draw-goal-tree
  "Draw a small version of the target tree in the top-right corner."
  [ctx canvas-w goal-tree]
  (let [scale 0.6
        measure (measure-node goal-tree)
        sw (* (:w measure) scale)
        sh (* (:h measure) scale)
        margin 16
        ox (- canvas-w sw margin)
        oy margin]
    ;; Label
    (set! (.-fillStyle ctx) "rgba(0,0,0,0.25)")
    (set! (.-font ctx) (str "700 10px " game-font))
    (set! (.-textAlign ctx) "right")
    (set! (.-textBaseline ctx) "top")
    (.fillText ctx "GOAL" (- ox 10) (+ oy (/ sh 2) -5))
    ;; Draw scaled
    (.save ctx)
    (.translate ctx ox oy)
    (.scale ctx scale scale)
    (let [layouts (layout-node goal-tree 0 0 0 [])]
      ;; Draw lists
      (doseq [{:keys [x y w h depth type]} layouts]
        (when (= type :list)
          (let [ci (mod depth (count depth-colors))
                fill (nth depth-colors ci)
                border (nth depth-border-colors ci)]
            (set! (.-fillStyle ctx) fill)
            (set! (.-strokeStyle ctx) border)
            (set! (.-lineWidth ctx) 1)
            (draw-rounded-rect ctx x y w h 8)
            (.fill ctx)
            (.stroke ctx))))
      ;; Draw atoms
      (doseq [{:keys [x y w h type node]} layouts]
        (when (= type :atom)
          (draw-atom ctx x y w h node))))
    (.restore ctx)))

(defn draw-available-commands [ctx commands-list y-start row-h]
  ;; Check if any are disabled — show banner
  (let [has-disabled (some #(not (:enabled %)) commands-list)]
    (when has-disabled
      (set! (.-fillStyle ctx) "rgba(169, 67, 30, 0.08)")
      (.fillRect ctx 12 (- y-start 22) 200 18)
      (set! (.-fillStyle ctx) "#a9431e")
      (set! (.-font ctx) (str "700 9px " game-font))
      (set! (.-textAlign ctx) "left")
      (set! (.-textBaseline ctx) "top")
      (.fillText ctx "SOME COMMANDS TEMPORARILY DISABLED" 16 (- y-start 19))))
  (set! (.-textAlign ctx) "left")
  (set! (.-textBaseline ctx) "top")
  (doseq [[i {:keys [name keys enabled]}] (map-indexed vector commands-list)]
    (let [y (+ y-start (* i row-h))]
      (if enabled
        (do
          (set! (.-fillStyle ctx) "#a9431e")
          (set! (.-font ctx) (str "700 11px " game-font))
          (.fillText ctx (first keys) 20 y)
          (set! (.-fillStyle ctx) "rgba(0,0,0,0.35)")
          (set! (.-font ctx) (str "400 11px " game-font))
          (.fillText ctx name (+ 20 90) y))
        ;; Disabled: muted text + strikethrough + red X
        (do
          (set! (.-fillStyle ctx) "rgba(0,0,0,0.10)")
          (set! (.-font ctx) (str "700 11px " game-font))
          (.fillText ctx (first keys) 20 y)
          (set! (.-font ctx) (str "400 11px " game-font))
          (.fillText ctx name (+ 20 90) y)
          ;; Strikethrough
          (set! (.-strokeStyle ctx) "rgba(169, 67, 30, 0.35)")
          (set! (.-lineWidth ctx) 1)
          (.beginPath ctx)
          (.moveTo ctx 18 (+ y 6))
          (.lineTo ctx 180 (+ y 6))
          (.stroke ctx))))))

(defn draw-message [ctx canvas-w canvas-h title lines]
  (let [box-w 440
        box-h (+ 88 (* 24 (count lines)))
        bx (/ (- canvas-w box-w) 2)
        by (/ (- canvas-h box-h) 2)]
    ;; Backdrop
    (set! (.-fillStyle ctx) "rgba(255, 255, 255, 0.92)")
    (.fillRect ctx 0 0 canvas-w canvas-h)
    ;; Box
    (set! (.-fillStyle ctx) "#ffffff")
    (set! (.-strokeStyle ctx) "rgba(0, 0, 0, 0.08)")
    (set! (.-lineWidth ctx) 1.5)
    (draw-rounded-rect ctx bx by box-w box-h 6)
    (.fill ctx)
    (.stroke ctx)
    ;; Shadow
    (set! (.-shadowColor ctx) "rgba(0,0,0,0.08)")
    (set! (.-shadowBlur ctx) 24)
    (draw-rounded-rect ctx bx by box-w box-h 6)
    (.fill ctx)
    (set! (.-shadowBlur ctx) 0)
    ;; Orange top accent line
    (set! (.-fillStyle ctx) "#a9431e")
    (.fillRect ctx bx by box-w 3)
    ;; Title
    (set! (.-fillStyle ctx) "#000000")
    (set! (.-font ctx) (str "800 18px " game-font))
    (set! (.-textAlign ctx) "center")
    (set! (.-textBaseline ctx) "top")
    (.fillText ctx title (/ canvas-w 2) (+ by 30))
    ;; Lines
    (set! (.-fillStyle ctx) "rgba(0,0,0,0.5)")
    (set! (.-font ctx) (str "400 13px " game-font))
    (doseq [[i line] (map-indexed vector lines)]
      (.fillText ctx line (/ canvas-w 2) (+ by 64 (* i 24))))))

;; ── Celebration particles ────────────────────────────────────────

(def celebration-emojis ["🎉" "✨" "🌟" "💫" "🎊" "⭐" "🥳" "🔥" "💜" "🚀"])

(defn create-particles
  "Create a burst of particles from the center."
  [canvas-w canvas-h n]
  (let [cx (/ canvas-w 2)
        cy (/ canvas-h 2)]
    (vec (for [_ (range n)]
           (let [angle (* (js/Math.random) 6.28)
                 speed (+ 3 (* (js/Math.random) 10))]
             {:x (+ cx (* (- (js/Math.random) 0.5) 100))
              :y (+ cy (* (- (js/Math.random) 0.5) 60))
              :vx (* (js/Math.cos angle) speed)
              :vy (* (js/Math.sin angle) speed)
              :gravity 0.08
              :life 1.0
              :decay (+ 0.003 (* (js/Math.random) 0.006))
              :size (+ 24 (* (js/Math.random) 32))
              :emoji (nth celebration-emojis
                          (js/Math.floor (* (js/Math.random)
                                            (count celebration-emojis))))
              :rotation (* (js/Math.random) 6.28)})))))

(defn update-particle [p]
  (-> p
      (update :x + (:vx p))
      (update :y + (:vy p))
      (update :vy + (:gravity p))
      (update :life - (:decay p))
      (update :rotation + 0.05)))

(defn update-particles [particles]
  (->> particles
       (mapv update-particle)
       (filterv #(pos? (:life %)))))

(defn draw-particles [ctx particles]
  (doseq [{:keys [x y life size emoji rotation]} particles]
    (.save ctx)
    (.translate ctx x y)
    (.rotate ctx rotation)
    (set! (.-globalAlpha ctx) (min 1.0 (* life 2.0)))
    (set! (.-font ctx) (str (js/Math.round size) "px serif"))
    (set! (.-textAlign ctx) "center")
    (set! (.-textBaseline ctx) "middle")
    (.fillText ctx emoji 0 0)
    (.restore ctx))
  (set! (.-globalAlpha ctx) 1.0))

;; ── Slurp & Barf effects ─────────────────────────────────────────

(def slurp-emojis ["😋" "👅" "😛" "🤤" "👄"])
(def barf-emojis  ["🤮" "💦" "🤢" "😝" "💨"])

(defn create-slurp-fx
  "Create a slurp effect: one big emoji + smaller trail particles."
  [x y direction]
  (let [spread-x (* direction -120)]
    (into
     ;; One big prominent emoji
     [{:x (+ x (* direction -60))
       :y y
       :vx (* direction -1.5)
       :vy 0
       :life 1.0
       :decay 0.012
       :size 42
       :emoji "😋"
       :rotation 0
       :gravity 0}]
     ;; Trail of smaller emojis
     (for [i (range 8)]
       {:x (+ x spread-x (* (js/Math.random) (js/Math.abs spread-x)))
        :y (+ y (* (- (js/Math.random) 0.5) 30))
        :vx (* direction -1 (+ 0.5 (* (js/Math.random) 2)))
        :vy (* (- (js/Math.random) 0.5) 0.8)
        :life 1.0
        :decay (+ 0.008 (* i 0.002))
        :size (+ 16 (* (js/Math.random) 12))
        :emoji (nth slurp-emojis
                    (js/Math.floor (* (js/Math.random)
                                      (count slurp-emojis))))
        :rotation 0
        :gravity 0}))))

(defn create-barf-fx
  "Create a barf effect: one big emoji + spray of smaller ones."
  [x y direction]
  (into
   ;; One big prominent emoji
   [{:x x
     :y y
     :vx (* direction 2)
     :vy -1.5
     :gravity 0.06
     :life 1.0
     :decay 0.01
     :size 46
     :emoji "🤮"
     :rotation 0}]
   ;; Spray of smaller emojis
   (for [_ (range 10)]
     {:x x
      :y y
      :vx (* direction (+ 2 (* (js/Math.random) 5)))
      :vy (* (- (js/Math.random) 0.5) 3)
      :gravity 0.08
      :life 1.0
      :decay (+ 0.012 (* (js/Math.random) 0.008))
      :size (+ 14 (* (js/Math.random) 16))
      :emoji (nth barf-emojis
                  (js/Math.floor (* (js/Math.random)
                                    (count barf-emojis))))
      :rotation (* (- (js/Math.random) 0.5) 0.3)})))

(defn update-fx-particle [p]
  (-> p
      (update :x + (:vx p))
      (update :y + (or (:vy p) 0))
      (update :vy + (or (:gravity p) 0))
      (update :life - (:decay p))
      ;; Gentle slowdown
      (update :vx * 0.98)))

(defn update-fx [fx-list]
  (->> fx-list
       (mapv update-fx-particle)
       (filterv #(pos? (:life %)))))

(defn draw-fx [ctx fx-list]
  (doseq [{:keys [x y life size emoji rotation]} fx-list]
    (.save ctx)
    (.translate ctx x y)
    (.rotate ctx rotation)
    (set! (.-globalAlpha ctx) (min 1.0 (* life 1.5)))
    (set! (.-font ctx) (str (js/Math.round size) "px serif"))
    (set! (.-textAlign ctx) "center")
    (set! (.-textBaseline ctx) "middle")
    (.fillText ctx emoji 0 0)
    (.restore ctx))
  (set! (.-globalAlpha ctx) 1.0))

;; ── Main render ─────────────────────────────────────────────────

(defn render-frame
  "Render a complete frame."
  [ctx canvas-w canvas-h game-state time-ms]
  ;; Clear
  (set! (.-fillStyle ctx) "#ffffff")
  (.fillRect ctx 0 0 canvas-w canvas-h)

  (let [{:keys [tree cursor message available-commands goal-text goal-tree phase particles fx]} game-state
        layouts (compute-layout tree canvas-w canvas-h)]

    ;; Draw the s-expression tree
    (draw-layout ctx layouts cursor time-ms)

    ;; Draw goal
    (when goal-text
      (draw-goal-indicator ctx canvas-w goal-text))

    ;; Draw goal tree preview for :shape goals
    (when goal-tree
      (draw-goal-tree ctx canvas-w goal-tree))

    ;; Draw available commands — fit all within canvas
    (when (seq available-commands)
      (let [row-h (min 20 (/ (- canvas-h 40) (max 1 (count available-commands))))
            y-start (- canvas-h (* row-h (count available-commands)) 8)]
        (draw-available-commands ctx available-commands y-start row-h)))

    ;; Draw slurp/barf effects
    (when (seq fx)
      (draw-fx ctx fx))

    ;; Draw celebration particles
    (when (seq particles)
      (draw-particles ctx particles))

    ;; Draw message overlay if any
    (when message
      (draw-message ctx canvas-w canvas-h
                    (:title message) (:lines message)))))
