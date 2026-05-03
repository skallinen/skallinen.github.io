;;; levels.cljs - Level definitions for Paredit Adventures
;;; Each level defines: tree structure, cursor start, goal, unlocked commands,
;;; and intro message.

(ns levels
  (:require [engine :as e]
            [puzzlegen :as pg]))

;; ── Level definitions ───────────────────────────────────────────

(def level-defs
  [;; ── Level 1: Basic Navigation ─────────────────────────────
   {:id 1
    :title "First Steps"
    :tree [:a :b :c :star :e]
    :cursor [0]
    :goal-type :reach
    :goal-target [3]  ;; reach the :star element
    :unlocked-commands [:forward-sexp :backward-sexp]
    :intro {:title "Welcome to Paredit Adventures"
            :lines ["You are a cursor in a world of s-expressions."
                    "Nested containers hold the elements of code."
                    ""
                    "Use C-M-f to move forward over a sexp."
                    "Use C-M-b to move backward."
                    ""
                    "Goal: Reach the star!"
                    ""
                    "Press any key to begin."]}}

   ;; ── Level 2: Going Deeper ─────────────────────────────────
   {:id 2
    :title "Going Deeper"
    :tree [:x [:y [:z :star]] :w]
    :cursor [0]
    :goal-type :reach
    :goal-target [1 1 1]  ;; reach :star inside nested lists
    :unlocked-commands [:forward-sexp :backward-sexp :down-sexp :up-sexp]
    :intro {:title "Going Deeper"
            :lines ["Some treasures are hidden deep inside nesting."
                    ""
                    "Use C-M-d to descend into a container."
                    "Use C-M-u to ascend out of one."
                    ""
                    "Goal: Reach the star deep inside."
                    ""
                    "Press any key to begin."]}}

   ;; ── Level 3: Navigate & Collect ───────────────────────────
   {:id 3
    :title "Star Collector"
    :tree [[:star :a] :b [:c [:d :star]]]
    :cursor [1]
    :goal-type :collect-all
    :unlocked-commands [:forward-sexp :backward-sexp :down-sexp :up-sexp]
    :intro {:title "Star Collector"
            :lines ["Collect all the stars!"
                    ""
                    "Navigate to each star to collect it."
                    "Use all four navigation commands."
                    ""
                    "C-M-f  forward    C-M-b  backward"
                    "C-M-d  descend    C-M-u  ascend"
                    ""
                    "Press any key to begin."]}}

   ;; ── Level 4: Introduction to Slurp ────────────────────────
   {:id 4
    :title "The Hungry List"
    :tree [[:gem :gem] :gem :gem]
    :cursor [0]
    :goal-type :shape
    :goal-tree [[:gem :gem :gem :gem]]
    :unlocked-commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
                        :forward-slurp :undo]
    :intro {:title "The Hungry List"
            :lines ["Lists can grow! Use Forward Slurp to"
                    "swallow the next element into a list."
                    ""
                    "You must be INSIDE a list to slurp!"
                    "Use C-M-d to enter, then C-) to slurp."
                    ""
                    "C-)  : Forward Slurp"
                    "C-/  : Undo (available from now on!)"
                    ""
                    "Press any key to begin."]}}

   ;; ── Level 5: Barf it out ──────────────────────────────────
   {:id 5
    :title "Let It Go"
    :tree [[:gem :gem :a :b]]
    :cursor [0]
    :goal-type :shape
    :goal-tree [[:gem :gem] :a :b]
    :unlocked-commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
                        :forward-slurp :forward-barf :undo]
    :intro {:title "Let It Go"
            :lines ["Sometimes lists hold too much."
                    "Use Forward Barf to eject the last element."
                    ""
                    "C-}  : Forward Barf"
                    ""
                    "Keep the gems, barf out the rest!"
                    ""
                    "Press any key to begin."]}}

   ;; ── Level 6: Backward Slurp & Barf ───────────────────────
   {:id 6
    :title "Both Directions"
    :tree [:gem :gem [:gem] :gem :gem]
    :cursor [2]
    :goal-type :shape
    :goal-tree [[:gem :gem :gem :gem :gem]]
    :unlocked-commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
                        :forward-slurp :backward-slurp
                        :forward-barf :backward-barf :undo]
    :intro {:title "Both Directions"
            :lines ["Slurp works both ways!"
                    ""
                    "C-(  : Backward Slurp (grab from left)"
                    "C-)  : Forward Slurp (grab from right)"
                    ""
                    "Gems scattered on both sides."
                    "Slurp them all in!"
                    ""
                    "Press any key to begin."]}}

   ;; ── Level 7: Wrap ────────────────────────────────────────
   {:id 7
    :title "Gift Wrapping"
    :tree [:a :gem :b]
    :cursor [1]
    :goal-type :shape
    :goal-tree [:a [:gem] :b]
    :unlocked-commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
                        :forward-slurp :backward-slurp
                        :forward-barf :backward-barf
                        :wrap-round :undo]
    :intro {:title "Gift Wrapping"
            :lines ["Wrap creates a new container"
                    "around the current element."
                    ""
                    "M-(  : Wrap in parens"
                    ""
                    "Goal: Wrap the gem in a list."
                    ""
                    "Press any key to begin."]}}

   ;; ── Level 8: Splice ──────────────────────────────────────
   {:id 8
    :title "Break Free"
    :tree [:a [[:heart :heart :heart]] :b]
    :cursor [1 0]
    :goal-type :shape
    :goal-tree [:a [:heart :heart :heart] :b]
    :unlocked-commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
                        :forward-slurp :backward-slurp
                        :forward-barf :backward-barf
                        :wrap-round :splice-sexp :undo]
    :intro {:title "Break Free"
            :lines ["Splice removes a container's walls,"
                    "freeing its contents into the parent."
                    ""
                    "M-s  : Splice"
                    ""
                    "Goal: Remove the extra nesting around"
                    "      the hearts."
                    ""
                    "Press any key to begin."]}}

   ;; ── Level 9: Raise ───────────────────────────────────────
   {:id 9
    :title "Rise Up"
    :tree [:x [:a :star :b] :y]
    :cursor [1 1]
    :goal-type :shape
    :goal-tree [:x :star :y]
    :unlocked-commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
                        :forward-slurp :backward-slurp
                        :forward-barf :backward-barf
                        :wrap-round :splice-sexp :raise-sexp :undo]
    :intro {:title "Rise Up"
            :lines ["Raise replaces the entire parent"
                    "with just the current element."
                    ""
                    "M-r  : Raise"
                    ""
                    "Goal: Raise the star - it will replace"
                    "      the whole list it's inside."
                    ""
                    "Press any key to begin."]}}

   ;; ── Level 10: Transpose ────────────────────────────────────
   {:id 10
    :title "Swap Meet"
    :tree [:b :a :gem :c]
    :cursor [1]
    :goal-type :shape
    :goal-tree [:a :b :gem :c]
    :unlocked-commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
                        :forward-slurp :backward-slurp
                        :forward-barf :backward-barf
                        :wrap-round :splice-sexp :raise-sexp
                        :transpose-sexps :undo]
    :intro {:title "Swap Meet"
            :lines ["Transpose swaps the current sexp"
                    "with the one before it."
                    ""
                    "C-M-t  : Transpose"
                    ""
                    "Goal: Swap a and b into the right order."
                    ""
                    "Press any key to begin."]}}

   ;; ── Level 11: Splice killing ─────────────────────────────
   {:id 11
    :title "Surgical Splice"
    :tree [[:x :gem] [:gem :y]]
    :cursor [0 1]
    :goal-type :shape
    :goal-tree [:gem :gem]
    :unlocked-commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
                        :forward-slurp :backward-slurp
                        :forward-barf :backward-barf
                        :wrap-round :splice-sexp :raise-sexp
                        :transpose-sexps
                        :splice-kill-bwd :splice-kill-fwd :undo]
    :intro {:title "Surgical Splice"
            :lines ["Splice-kill removes the enclosing parens"
                    "AND kills in one direction."
                    ""
                    "M-up  or C-M-bksp : Splice, kill backward"
                    "M-down or M-k     : Splice, kill forward"
                    ""
                    "Free both gems! Kill the junk around them."
                    "Hint: splice-kill-bwd first, navigate,"
                    "      then splice-kill-fwd."
                    ""
                    "Press any key to begin."]}}

   ;; ── Level 12: Convolute ──────────────────────────────────
   ;; (a (b |gem gem)) → (b (a |gem gem))
   {:id 12
    :title "Inside Out"
    :tree [:a [:b :gem :gem]]
    :cursor [1 1]
    :goal-type :shape
    :goal-tree [:b [:a :gem :gem]]
    :unlocked-commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
                        :forward-slurp :backward-slurp
                        :forward-barf :backward-barf
                        :wrap-round :splice-sexp :raise-sexp
                        :transpose-sexps
                        :splice-kill-bwd :splice-kill-fwd
                        :convolute-sexp :undo]
    :intro {:title "Inside Out"
            :lines ["Convolute swaps the nesting of forms."
                    ""
                    "Before: (a (b |gem gem))"
                    "After:  (b (a |gem gem))"
                    ""
                    "M-?  : Convolute"
                    ""
                    "The outer head swaps with the inner head!"
                    ""
                    "Press any key to begin."]}}

   ;; ── Level 13: Split & Join ───────────────────────────────
   {:id 13
    :title "Divide & Conquer"
    :tree [[:gem :a :b :gem]]
    :cursor [0 2]
    :goal-type :shape
    :goal-tree [[:gem :a] [:b :gem]]
    :unlocked-commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
                        :forward-slurp :backward-slurp
                        :forward-barf :backward-barf
                        :wrap-round :splice-sexp :raise-sexp
                        :transpose-sexps
                        :splice-kill-bwd :splice-kill-fwd
                        :convolute-sexp
                        :split-sexp :join-sexp :undo]
    :intro {:title "Divide & Conquer"
            :lines ["Split divides one list into two."
                    "Join merges two adjacent lists."
                    ""
                    "M-S  : Split"
                    "M-J  : Join"
                    ""
                    "Goal: Split the list so each half"
                    "      gets a gem."
                    ""
                    "Press any key to begin."]}}

   ;; ── Level 14: The Gauntlet ───────────────────────────────
   {:id 14
    :title "The Gauntlet"
    :tree [[:a :star] :b [[:gem] :c [:heart :d]]]
    :cursor [0]
    :goal-type :collect-all
    :unlocked-commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
                        :forward-slurp :backward-slurp
                        :forward-barf :backward-barf
                        :wrap-round :splice-sexp :raise-sexp
                        :transpose-sexps
                        :splice-kill-bwd :splice-kill-fwd
                        :convolute-sexp
                        :split-sexp :join-sexp :undo]
    :intro {:title "The Gauntlet"
            :lines ["Use everything you've learned."
                    ""
                    "Collect all the treasures!"
                    "You may need to reshape the tree"
                    "to reach them all."
                    ""
                    "Press any key to begin."]}}])

;; ── Stage definitions ────────────────────────────────────────────
;; Each stage: tutorial level index, practice generator key,
;; commands allowed, and how many practice rounds.

(def stage-defs
  [{:tutorial 1  :practice nil         :practice-rounds 0
    :commands [:forward-sexp :backward-sexp]}
   {:tutorial 2  :practice nil         :practice-rounds 0
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp]}
   {:tutorial 3  :practice nil         :practice-rounds 0
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp]}
   {:tutorial 4  :practice :forward-slurp  :practice-rounds 4
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :undo]}
   {:tutorial 5  :practice :forward-barf   :practice-rounds 4
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :forward-barf :undo]}
   {:tutorial 6  :practice :slurp-barf     :practice-rounds 5
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf :undo]}
   {:tutorial 7  :practice :wrap           :practice-rounds 3
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :undo]}
   {:tutorial 8  :practice :splice         :practice-rounds 3
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :undo]}
   {:tutorial 9  :practice :raise          :practice-rounds 3
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp :undo]}
   {:tutorial 10 :practice :transpose      :practice-rounds 3
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps :undo]}
   {:tutorial 11 :practice :splice-kill    :practice-rounds 3
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd :undo]}
   {:tutorial 12 :practice :convolute      :practice-rounds 3
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd
               :convolute-sexp :undo]}
   {:tutorial 13 :practice :split-join     :practice-rounds 3
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd
               :convolute-sexp
               :split-sexp :join-sexp :undo]}
   {:tutorial 14 :practice nil             :practice-rounds 0
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd
               :convolute-sexp
               :split-sexp :join-sexp :undo]}])

;; ── Progression system ──────────────────────────────────────────
;; The game progresses through stages. Each stage has:
;;   - A tutorial (hand-crafted level)
;;   - N practice rounds (generated puzzles)
;; A "step" is identified by [stage-idx round]
;;   round 0 = tutorial, round 1..N = practice

(defn total-stages [] (count stage-defs))

(defn get-stage [stage-idx]
  (nth stage-defs stage-idx nil))

(defn get-step
  "Get level data for a given stage and round.
   Round 0 = tutorial, round 1+ = generated practice."
  [stage-idx round]
  (when-let [stage (get-stage stage-idx)]
    (if (zero? round)
      ;; Tutorial round: use the hand-crafted level
      (let [level (nth level-defs (dec (:tutorial stage)) nil)]
        (when level
          (assoc level :unlocked-commands (:commands stage))))
      ;; Practice round: generate a puzzle (retry if already solved)
      (when-let [gen-key (:practice stage)]
        (let [difficulty round
              puzzle (loop [attempts 0]
                       (let [p (pg/generate-puzzle gen-key difficulty)]
                         (if (and (= (:tree p) (:goal-tree p))
                                  (< attempts 10))
                           (recur (inc attempts))
                           p)))]
          {:id (str "S" (inc stage-idx) "R" round)
           :title (str "Practice " round "/" (:practice-rounds stage))
           :tree (:tree puzzle)
           :cursor (:cursor puzzle)
           :goal-type (:goal-type puzzle)
           :goal-tree (:goal-tree puzzle)
           :unlocked-commands (:commands stage)
           :intro {:title (str "Practice Round " round)
                   :lines ["Apply what you just learned!"
                           ""
                           "Transform the tree to match the goal."
                           ""
                           "Press any key to begin."]}})))))

(defn stage-total-rounds
  "Total rounds (tutorial + practice) for a stage."
  [stage-idx]
  (if-let [stage (get-stage stage-idx)]
    (+ 1 (:practice-rounds stage))
    0))

;; ── Legacy helpers (still used by game.cljs) ────────────────────

(defn get-level [n]
  (nth level-defs (dec n) nil))

(defn total-levels []
  (count level-defs))

(defn check-goal
  "Check if the current game state satisfies the level goal."
  [level game-state]
  (case (:goal-type level)
    :reach
    (= (:cursor game-state) (:goal-target level))

    :shape
    (= (:tree game-state) (:goal-tree level))

    :collect-all
    (let [items (e/collect-items (:tree game-state))]
      (empty? items))

    false))

(defn get-available-commands
  "Get the command info for commands unlocked in this level."
  [level all-commands]
  (mapv (fn [cmd-key]
          (let [cmd (get all-commands cmd-key)]
            {:key cmd-key
             :name (:name cmd)
             :keys (:keys cmd)
             :enabled true}))
        (:unlocked-commands level)))

(defn get-known-commands
  "All commands seen up to this stage. Returns set of cmd-keys."
  [stage-idx]
  (let [stages (take (inc stage-idx) stage-defs)]
    (set (mapcat :commands stages))))

(defn get-commands-with-disabled
  "Get command list showing enabled + disabled (known but not allowed)."
  [level stage-idx all-commands]
  (let [unlocked (set (:unlocked-commands level))
        known (get-known-commands stage-idx)
        ;; Don't show nav commands as disabled, only structural ones
        skip #{:forward-sexp :backward-sexp :down-sexp :up-sexp :undo}]
    (into
     ;; Enabled commands first
     (mapv (fn [cmd-key]
             (let [cmd (get all-commands cmd-key)]
               {:key cmd-key :name (:name cmd)
                :keys (:keys cmd) :enabled true}))
           (:unlocked-commands level))
     ;; Disabled commands (known but not in this level)
     (keep (fn [cmd-key]
             (when (and (not (unlocked cmd-key))
                        (not (skip cmd-key)))
               (let [cmd (get all-commands cmd-key)]
                 {:key cmd-key :name (:name cmd)
                  :keys (:keys cmd) :enabled false})))
           (sort (vec (filter #(not (unlocked %)) known)))))))
