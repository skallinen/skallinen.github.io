;;; game.cljs - Main game loop, input handling, and state management

(ns game
  (:require [engine :as e]
            [paredit :as p]
            [render :as r]
            [levels :as l]
            [specs :as specs]
            [keymap :as km]))

;; ── Game state ──────────────────────────────────────────────────

(def canvas (js/document.getElementById "game-canvas"))
(def ctx (.getContext canvas "2d"))
(def canvas-w (.-width canvas))
(def canvas-h (.-height canvas))

(def state
  (atom {:tree [:a :b :c]
         :cursor [0]
         :stage 0
         :round 0
         :level-num 1
         :moves 0
         :phase :intro
         :message nil
         :available-commands []
         :goal-text nil
         :collected []
         :history []
         :command-log []
         :start-time 0          ;; ms when puzzle started
         :total-time 0          ;; accumulated ms across all puzzles
         :total-moves 0}))

;; ── HUD updates ─────────────────────────────────────────────────

(defn update-hud! []
  (let [{:keys [stage round moves level]} @state]
    (set! (.-innerHTML (js/document.querySelector "#hud-level span"))
          (str (inc stage) " - " (:title level)
               (when (pos? round) (str " [" round "/" (:practice-rounds (l/get-stage stage)) "]"))))
    (set! (.-innerHTML (js/document.querySelector "#hud-moves span"))
          (let [errors (:errors @state)]
            (if (pos? errors)
              (str moves " <span style='color:#a9431e'>(" errors " err)</span>")
              (str moves))))
    (set! (.-innerHTML (js/document.querySelector "#hud-goal span"))
          (case (:goal-type level)
            :reach "Reach the target"
            :shape "Match the shape"
            :collect-all "Collect all items"
            "-"))
    (set! (.-innerHTML (js/document.querySelector "#hud-command span")) "-")))

(defn flash-command! [cmd-name]
  (set! (.-innerHTML (js/document.querySelector "#hud-command span")) cmd-name))

(defn log-command! [cmd-name]
  (let [log-el (js/document.getElementById "command-log")
        entry (js/document.createElement "div")]
    (set! (.-className entry) "cmd-entry")
    (set! (.-innerHTML entry)
          (str "<span class='cmd-name'>" cmd-name "</span>"))
    (.appendChild log-el entry)
    ;; Keep only last 8 entries
    (when (> (.-childElementCount log-el) 8)
      (.removeChild log-el (.-firstChild log-el)))))

;; ── Level management ────────────────────────────────────────────

(defn load-step!
  "Load a specific stage and round."
  [stage-idx round]
  (when-let [level (l/get-step stage-idx round)]
    (let [prev-total-time (or (:total-time @state) 0)
          prev-total-moves (or (:total-moves @state) 0)]
      (reset! state
              {:tree (:tree level)
               :cursor (:cursor level)
               :stage stage-idx
               :round round
               :level-num (inc stage-idx)
               :level level
               :moves 0
               :phase :intro
               :message (:intro level)
               :available-commands (l/get-commands-with-disabled level stage-idx p/commands)
               :goal-text (case (:goal-type level)
                            :reach "Navigate to the highlighted target"
                            :shape "Transform the tree to match the goal"
                            :collect-all "Collect all stars and gems"
                            nil)
               :goal-tree (when (= :shape (:goal-type level))
                            (:goal-tree level))
               :history []
               :collected []
               :command-log []
               :errors 0
               :total-errors (or (:total-errors @state) 0)
               :start-time 0
               :total-time prev-total-time
               :total-moves prev-total-moves}))
    ;; Clear command log display
    (set! (.-innerHTML (js/document.getElementById "command-log")) "")
    (update-hud!)))

(defn advance!
  "Move to the next round or next stage."
  []
  (let [{:keys [stage round]} @state
        total-rounds (l/stage-total-rounds stage)]
    (if (< (inc round) total-rounds)
      ;; Next practice round in same stage
      (load-step! stage (inc round))
      ;; Next stage
      (if (< (inc stage) (l/total-stages))
        (load-step! (inc stage) 0)
        ;; All done — restart from beginning
        (load-step! 0 0)))))

(defn format-time [ms]
  (let [secs (js/Math.floor (/ ms 1000))
        mins (js/Math.floor (/ secs 60))
        s (mod secs 60)]
    (if (pos? mins)
      (str mins "m " s "s")
      (str s "s"))))

(defn check-victory! []
  (let [{:keys [stage round level start-time moves errors
                total-time total-moves total-errors]} @state]
    (when (l/check-goal level @state)
      (let [puzzle-time (- (.now js/Date) start-time)
            new-total-time (+ total-time puzzle-time)
            new-total-moves (+ total-moves moves)
            new-total-errors (+ (or total-errors 0) (or errors 0))]
        ;; Update totals
        (swap! state assoc
               :phase :celebrating
               :particles (r/create-particles canvas-w canvas-h 60)
               :total-time new-total-time
               :total-moves new-total-moves
               :total-errors new-total-errors)
        ;; Show the dialog after a delay
        (js/setTimeout
         (fn []
           (let [total-rounds (l/stage-total-rounds stage)
                 has-more (or (< (inc round) total-rounds)
                              (< (inc stage) (l/total-stages)))
                 err-str (when (pos? (or errors 0))
                           (str "  Errors: " errors))]
             (swap! state assoc
                    :phase :victory
                    :message {:title (if (zero? round) "Level Complete!" "Round Complete!")
                              :lines [(str "\"" (:title level) "\"")
                                      (str "Moves: " moves
                                           "    Time: " (format-time puzzle-time)
                                           (or err-str ""))
                                      ""
                                      (str "Total: " new-total-moves " moves"
                                           "  " (format-time new-total-time)
                                           (when (pos? new-total-errors)
                                             (str "  " new-total-errors " err")))
                                      ""
                                      (if has-more
                                        "Press any key to continue."
                                        "Congratulations! You've mastered Paredit!")]})))
         1500)))))

(defn try-collect! []
  "If cursor is on a collectible item, collect it (remove it).
   Only active in :collect-all levels."
  (let [{:keys [tree cursor level]} @state
        elem (e/get-at tree cursor)]
    (when (and (= :collect-all (:goal-type level))
               (e/item? elem))
      (let [new-tree (e/remove-at tree cursor)
            ;; Adjust cursor if we removed the last element
            parent-p (e/parent-path cursor)
            parent (e/get-at new-tree (or parent-p []))
            new-cursor (if (and (e/sexp? parent)
                                (>= (e/cursor-index cursor) (count parent)))
                         (if (pos? (count parent))
                           (conj (vec parent-p) (dec (count parent)))
                           (or parent-p []))
                         cursor)]
        (swap! state assoc
               :tree new-tree
               :cursor new-cursor
               :collected (conj (:collected @state) elem))))))

;; ── Input handling ──────────────────────────────────────────────

(defn- key-letter
  "Get the lowercase letter from a key event, checking both e.key and e.code.
   Returns the letter string or nil. Handles Mac Alt munging e.key."
  [e]
  (let [key (.-key e)
        code (.-code e)]
    (cond
      ;; e.key is a single ASCII letter (Linux/Windows, or Ctrl-only on Mac)
      (and (= 1 (count key)) (re-matches #"[a-zA-Z]" key))
      (.toLowerCase key)
      ;; e.code is KeyX — extract the letter (works on Mac with Alt)
      (and (> (count code) 3) (= "Key" (subs code 0 3)))
      (.toLowerCase (subs code 3))
      :else nil)))

(def keymap (atom (or (km/load-keymap) (km/make-default-keymap))))
(def calibrating (atom nil)) ;; nil or {:step-idx N :results {}}

(defn key-to-command
  "Map a keyboard event to a paredit command keyword.
   - Letters: key-letter (e.key then e.code fallback for Mac Alt)
   - Symbols (){}?/: calibrated keymap (layout-independent)
   - Arrows, Backspace: e.code (universal physical keys)"
  [e]
  (let [code (.-code e)
        key (.-key e)
        ctrl (.-ctrlKey e)
        alt (.-altKey e)
        meta (.-metaKey e)
        shift (.-shiftKey e)
        letter (key-letter e)
        ctrl-like (or ctrl meta)
        kmap @keymap]
    (cond
      ;; ── Navigation: C-M-{f,b,d,u} (letters) ─────────────
      (and ctrl-like alt (= letter "f"))  :forward-sexp
      (and ctrl-like alt (= letter "b"))  :backward-sexp
      (and ctrl-like alt (= letter "d"))  :down-sexp
      (and ctrl-like alt (= letter "u"))  :up-sexp

      ;; ── Transpose: C-M-t (letter) ─────────────────────────
      (and ctrl-like alt (= letter "t"))  :transpose-sexps

      ;; ── Slurp/Barf: calibrated symbol keys ───────────────
      ;; Forward slurp: C-)
      (and ctrl-like (km/match-key e (:slurp-fwd kmap)))
      :forward-slurp
      ;; or C-right / M-right
      (and (or (and ctrl-like (not alt))
               (and alt (not ctrl-like)))
           (not shift) (= code "ArrowRight"))
      :forward-slurp

      ;; Backward slurp: C-(
      (and ctrl-like (not alt) (km/match-key e (:slurp-bwd kmap)))
      :backward-slurp
      ;; or C-left / M-left
      (and (or (and ctrl-like (not alt))
               (and alt (not ctrl-like)))
           (not shift) (= code "ArrowLeft"))
      :backward-slurp

      ;; Forward barf: C-}
      (and ctrl-like (km/match-key e (:barf-fwd kmap)))
      :forward-barf
      ;; or C-S-right / M-S-right
      (and (or (and ctrl-like (not alt))
               (and alt (not ctrl-like)))
           shift (= code "ArrowRight"))
      :forward-barf

      ;; Backward barf: C-{
      (and ctrl-like (km/match-key e (:barf-bwd kmap)))
      :backward-barf
      ;; or C-S-left / M-S-left
      (and (or (and ctrl-like (not alt))
               (and alt (not ctrl-like)))
           shift (= code "ArrowLeft"))
      :backward-barf

      ;; ── Wrap: M-( ─────────────────────────────────────────
      ;; Use backward-slurp key binding with Alt instead of Ctrl
      (and alt (not ctrl-like) (km/match-key e (:slurp-bwd kmap)))
      :wrap-round

      ;; ── Splice: M-s (letter) ──────────────────────────────
      (and alt (not ctrl-like) (not shift) (= letter "s"))
      :splice-sexp

      ;; ── Raise: M-r (letter) ───────────────────────────────
      (and alt (not ctrl-like) (not shift) (= letter "r"))
      :raise-sexp

      ;; ── Split: M-S (letter + shift) ───────────────────────
      (and alt (not ctrl-like) shift (= letter "s"))
      :split-sexp

      ;; ── Join: M-J (letter + shift) ────────────────────────
      (and alt (not ctrl-like) shift (= letter "j"))
      :join-sexp

      ;; ── Convolute: M-? ────────────────────────────────────
      (and (or alt ctrl-like) (or (= key "?")
                                   (and shift (= code "Slash"))))
      :convolute-sexp

      ;; ── Splice kill backward: M-up or C-M-bksp ───────────
      (and alt (not ctrl-like) (not shift) (= code "ArrowUp"))
      :splice-kill-bwd
      (and ctrl-like alt (= code "Backspace"))
      :splice-kill-bwd

      ;; ── Splice kill forward: M-down or M-k ────────────────
      (and alt (not ctrl-like) (not shift) (= code "ArrowDown"))
      :splice-kill-fwd
      (and alt (not ctrl-like) (not shift) (= letter "k"))
      :splice-kill-fwd

      :else nil)))

(defn command-unlocked?
  "Check if a command is available in the current level."
  [cmd-key]
  (some #{cmd-key} (:unlocked-commands (:level @state))))

(defn handle-key! [e]
  (if-let [cal @calibrating]
    ;; ── Calibration mode ────────────────────────────────────
    (let [key (.-key e)
          code (.-code e)
          shift (.-shiftKey e)]
      (.preventDefault e)
      (if (= key "Escape")
        ;; Skip calibration, use defaults
        (do (reset! calibrating nil)
            (reset! keymap (km/make-default-keymap))
            (km/save-keymap! (km/make-default-keymap)))
      (when-not (#{"Control" "Alt" "Shift" "Meta" "CapsLock"} key)
        (let [step-idx (:step-idx cal)
              steps km/calibration-steps
              step (nth steps step-idx)
              result {:code code :key key :shift shift}
              new-results (assoc (:results cal) (:id step) result)
              next-idx (inc step-idx)]
          (if (< next-idx (count steps))
            (reset! calibrating {:step-idx next-idx :results new-results})
            (do
              (reset! keymap new-results)
              (km/save-keymap! new-results)
              (reset! calibrating nil)))))))

  (let [{:keys [phase]} @state]
    (case phase
      :intro
      (do
        (.preventDefault e)
        (if (= (.-key e) "c")
          ;; Recalibrate keys
          (do (km/clear-keymap!)
              (reset! calibrating {:step-idx 0 :results {}}))
          (swap! state assoc
                 :phase :playing
                 :message nil
                 :start-time (.now js/Date))))

      :playing
      (let [code (.-code e)
            key (.-key e)
            ctrl (.-ctrlKey e)
            alt (.-altKey e)
            meta (.-metaKey e)
            shift (.-shiftKey e)
            ctrl-like (or ctrl meta)]
        ;; Escape: skip puzzle
        (if (= key "Escape")
          (do (.preventDefault e) (advance!))
        ;; R (no modifiers): restart current puzzle
        (if (and (or (= key "r") (= code "KeyR")) (not ctrl-like) (not alt) (not shift))
          (do (.preventDefault e)
              (load-step! (:stage @state) (:round @state)))
        ;; Undo: C-/ (symbol → e.key)
        (if (and ctrl-like (not alt) (not shift) (= key "/"))
          (do
            (.preventDefault e)
            (when (seq (:history @state))
              (let [prev (peek (:history @state))]
                (swap! state assoc
                       :tree (:tree prev)
                       :cursor (:cursor prev)
                       :history (pop (:history @state))
                       :moves (inc (:moves @state)))
                (flash-command! "Undo")
                (log-command! "Undo")
                (update-hud!))))
          ;; Normal command
          (when-let [cmd-key (key-to-command e)]
            (.preventDefault e)
            (if-not (command-unlocked? cmd-key)
              ;; Error: known command but disabled for this level
              (do
                (swap! state update :errors inc)
                (flash-command! (str "DISABLED"))
                (update-hud!))

              (let [cmd (get p/commands cmd-key)
                    old-state @state
                    new-state (p/execute-command
                               {:tree (:tree old-state)
                                :cursor (:cursor old-state)}
                               cmd-key)]
                (when (or (not= (:tree new-state) (:tree old-state))
                          (not= (:cursor new-state) (:cursor old-state)))
                  ;; Save to history if tree changed (not just navigation)
                  (let [tree-changed? (not= (:tree new-state) (:tree old-state))
                        new-history (if tree-changed?
                                      (conj (or (:history old-state) [])
                                            {:tree (:tree old-state)
                                             :cursor (:cursor old-state)})
                                      (:history old-state))]
                    ;; Spawn slurp/barf effects at cursor position
                    (let [layouts (r/compute-layout (:tree old-state) canvas-w canvas-h)
                          cursor-layout (first (filter #(= (:path %) (:cursor old-state)) layouts))
                          cx (when cursor-layout (+ (:x cursor-layout) (/ (:w cursor-layout) 2)))
                          cy (when cursor-layout (+ (:y cursor-layout) (/ (:h cursor-layout) 2)))
                          new-fx (when (and cx cy)
                                   (case cmd-key
                                     :forward-slurp  (r/create-slurp-fx cx cy 1)
                                     :backward-slurp (r/create-slurp-fx cx cy -1)
                                     :forward-barf   (r/create-barf-fx cx cy 1)
                                     :backward-barf  (r/create-barf-fx cx cy -1)
                                     nil))]
                      (swap! state assoc
                             :tree (:tree new-state)
                             :cursor (:cursor new-state)
                             :moves (inc (:moves old-state))
                             :history new-history
                             :fx (if new-fx
                                   (into (or (:fx @state) []) new-fx)
                                   (:fx @state)))))
                  (flash-command! (:name cmd))
                  (log-command! (:name cmd))
                  (update-hud!)
                  ;; Check victory before collecting (reach goals need original path)
                  (check-victory!)
                  ;; Try to collect item at new position
                  (when (not= :celebrating (:phase @state))
                    (try-collect!)
                    ;; Re-check for collect-all goals
                    (check-victory!))))))))))

      :celebrating
      (.preventDefault e) ;; ignore keys during celebration

      :victory
      (do
        (.preventDefault e)
        (advance!))))))

(.addEventListener js/window "keydown" handle-key!)

;; ── Game loop ───────────────────────────────────────────────────

(defn draw-calibration [ctx cw ch]
  (when-let [cal @calibrating]
    (let [step (nth km/calibration-steps (:step-idx cal))
          font r/game-font]
      ;; Background
      (set! (.-fillStyle ctx) "rgba(255,255,255,0.97)")
      (.fillRect ctx 0 0 cw ch)
      ;; Title
      (set! (.-fillStyle ctx) "#000")
      (set! (.-font ctx) (str "800 20px " font))
      (set! (.-textAlign ctx) "center")
      (set! (.-textBaseline ctx) "middle")
      (.fillText ctx "Keyboard Setup" (/ cw 2) (- (/ ch 2) 60))
      ;; Instruction
      (set! (.-fillStyle ctx) "rgba(0,0,0,0.5)")
      (set! (.-font ctx) (str "400 14px " font))
      (.fillText ctx (str "Step " (inc (:step-idx cal)) " of " (count km/calibration-steps))
                 (/ cw 2) (- (/ ch 2) 30))
      ;; Key to press
      (set! (.-fillStyle ctx) "#a9431e")
      (set! (.-font ctx) (str "700 28px " font))
      (.fillText ctx (str "Press:  " (:desc step))
                 (/ cw 2) (/ ch 2))
      ;; Hint
      (set! (.-fillStyle ctx) "rgba(0,0,0,0.25)")
      (set! (.-font ctx) (str "400 12px " font))
      (.fillText ctx "Hold Ctrl, then press the key that produces the symbol on your keyboard"
                 (/ cw 2) (+ (/ ch 2) 40))
      (.fillText ctx "Press Escape to use defaults (US layout)"
                 (/ cw 2) (+ (/ ch 2) 60)))))

(defn game-loop [timestamp]
  (r/render-frame ctx canvas-w canvas-h @state timestamp)

  ;; Draw calibration overlay if active
  (when @calibrating
    (draw-calibration ctx canvas-w canvas-h))

  ;; Draw goal target indicator for :reach goals
  (let [{:keys [phase tree level]} @state]
    (when (and (= phase :playing)
               (= (:goal-type level) :reach))
      (let [layouts (r/compute-layout tree canvas-w canvas-h)
            target-path (:goal-target level)]
        (doseq [{:keys [x y w h path]} layouts]
          (when (= path target-path)
            (let [pulse (+ 0.3 (* 0.3 (js/Math.sin (/ timestamp 300))))]
              (set! (.-strokeStyle ctx) (str "rgba(123, 173, 182, " pulse ")"))

              (set! (.-lineWidth ctx) 2)
              (.setLineDash ctx (array 5 5))
              (r/draw-rounded-rect ctx (- x 5) (- y 5) (+ w 10) (+ h 10) 6)
              (.stroke ctx)
              (.setLineDash ctx (array))))))))

  ;; Update live timer
  (when (= :playing (:phase @state))
    (let [elapsed (- (.now js/Date) (:start-time @state))]
      (set! (.-innerHTML (js/document.querySelector "#hud-time span"))
            (format-time elapsed))))

  ;; Update celebration particles
  (when (seq (:particles @state))
    (swap! state update :particles r/update-particles))

  ;; Update slurp/barf effects
  (when (seq (:fx @state))
    (swap! state update :fx r/update-fx))

  (js/requestAnimationFrame game-loop))

;; ── Test API — expose state for E2E tests ───────────────────────

(set! (.-getGameState js/window)
      (fn []
        (let [s @state]
          (clj->js {:phase (name (:phase s))
                    :stage (:stage s)
                    :round (:round s)
                    :tree (pr-str (:tree s))
                    :cursor (pr-str (:cursor s))
                    :goalTree (pr-str (:goal-tree s))
                    :goalType (name (or (get-in s [:level :goal-type]) :none))
                    :moves (:moves s)
                    :errors (:errors s)
                    :title (get-in s [:level :title])}))))

(set! (.-loadStep js/window)
      (fn [stage round]
        (load-step! stage round)))

(set! (.-skipCalibration js/window)
      (fn []
        (reset! calibrating nil)
        (reset! keymap (km/make-default-keymap))
        (km/save-keymap! (km/make-default-keymap))))

(set! (.-getPuzzleSpecs js/window)
      (fn []
        (clj->js (mapv (fn [s]
                          {:id (:id s)
                           :stage (:stage s)
                           :round (:round s)
                           :title (:title s)
                           :solution (when (:solution s)
                                       (mapv name (:solution s)))})
                        specs/puzzle-specs))))

;; ── Start ───────────────────────────────────────────────────────

;; Start calibration if no saved keymap
(when (km/needs-calibration?)
  (reset! calibrating {:step-idx 0 :results {}}))

(load-step! 0 0)
(js/requestAnimationFrame game-loop)
