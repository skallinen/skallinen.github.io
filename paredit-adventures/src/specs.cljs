;;; specs.cljs — Single source of truth for all puzzles and solutions.
;;; Consumed by: game (levels), E2E tests (Playwright), elisp tests.

(ns specs)

;; Each spec:
;;   :id       - unique identifier "S{stage}R{round}"
;;   :title    - display name
;;   :tree     - starting s-expression tree
;;   :cursor   - starting cursor path
;;   :goal     - {:type :reach/:shape/:collect-all, :target/tree as needed}
;;   :commands - allowed paredit commands for this puzzle
;;   :solution - optimal command sequence to solve
;;   :intro    - optional {:title :lines} for tutorial puzzles

(def puzzle-specs
  [;; ══════════════════════════════════════════════════════════════
   ;; Stage 0: Basic forward/backward navigation
   ;; ══════════════════════════════════════════════════════════════
   {:id "S0R0" :stage 0 :round 0
    :title "First Steps"
    :tree [:a :b :c :star :e]
    :cursor [0]
    :goal {:type :reach :target [3]}
    :commands [:forward-sexp :backward-sexp]
    :solution [:forward-sexp :forward-sexp :forward-sexp]
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

   ;; ══════════════════════════════════════════════════════════════
   ;; Stage 1: Down/up navigation
   ;; ══════════════════════════════════════════════════════════════
   {:id "S1R0" :stage 1 :round 0
    :title "Going Deeper"
    :tree [:x [:y [:z :star]] :w]
    :cursor [0]
    :goal {:type :reach :target [1 1 1]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp]
    :solution [:forward-sexp :down-sexp :forward-sexp :down-sexp :forward-sexp]
    :intro {:title "Going Deeper"
            :lines ["Some treasures are hidden deep inside nesting."
                    ""
                    "Use C-M-d to descend into a container."
                    "Use C-M-u to ascend out of one."
                    ""
                    "Goal: Reach the star deep inside."
                    ""
                    "Press any key to begin."]}}

   ;; ══════════════════════════════════════════════════════════════
   ;; Stage 2: Collect all (navigation challenge)
   ;; ══════════════════════════════════════════════════════════════
   {:id "S2R0" :stage 2 :round 0
    :title "Star Collector"
    :tree [[:star :a] :b [:c [:d :star]]]
    :cursor [1]
    :goal {:type :collect-all}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp]
    :solution [:backward-sexp :down-sexp
               :up-sexp :forward-sexp :forward-sexp :down-sexp
               :forward-sexp :down-sexp :forward-sexp]
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

   ;; ══════════════════════════════════════════════════════════════
   ;; Stage 3: Forward slurp (+ 4 practice)
   ;; ══════════════════════════════════════════════════════════════
   {:id "S3R0" :stage 3 :round 0
    :title "The Hungry List"
    :tree [[:gem :gem] :gem :gem]
    :cursor [0]
    :goal {:type :shape :tree [[:gem :gem :gem :gem]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :undo]
    :solution [:down-sexp :forward-slurp :forward-slurp]
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

   {:id "S3R1" :stage 3 :round 1
    :title "Practice 1/4"
    :tree [[:a :gem] :star :b]
    :cursor [2]
    :goal {:type :shape :tree [[:a :gem :star] :b]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :undo]
    :solution [:backward-sexp :backward-sexp :down-sexp :forward-slurp]}

   {:id "S3R2" :stage 3 :round 2
    :title "Practice 2/4"
    :tree [:a [[:b :gem] :star] :heart]
    :cursor [1 0 1]
    :goal {:type :shape :tree [:a [[:b :gem :star] :heart]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :undo]
    :solution [:forward-slurp :up-sexp :up-sexp :down-sexp :forward-slurp]}

   {:id "S3R3" :stage 3 :round 3
    :title "Practice 3/4"
    :tree [[:gem] :star :heart :a]
    :cursor [3]
    :goal {:type :shape :tree [[:gem :star :heart] :a]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :undo]
    :solution [:backward-sexp :backward-sexp :backward-sexp
               :down-sexp :forward-slurp :forward-slurp]}

   {:id "S3R4" :stage 3 :round 4
    :title "Practice 4/4"
    :tree [:a [[:gem] :star :heart] :gem]
    :cursor [1 0 0]
    :goal {:type :shape :tree [:a [[:gem :star :heart :gem]]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :undo]
    :solution [:forward-slurp :forward-slurp
               :up-sexp :up-sexp :down-sexp :forward-slurp
               :down-sexp :forward-slurp]}

   ;; ══════════════════════════════════════════════════════════════
   ;; Stage 4: Forward barf (+ 4 practice)
   ;; ══════════════════════════════════════════════════════════════
   {:id "S4R0" :stage 4 :round 0
    :title "Let It Go"
    :tree [[:gem :gem :a :b]]
    :cursor [0]
    :goal {:type :shape :tree [[:gem :gem] :a :b]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :forward-barf :undo]
    :solution [:down-sexp :forward-barf :forward-barf]
    :intro {:title "Let It Go"
            :lines ["Sometimes lists hold too much."
                    "Use Forward Barf to eject the last element."
                    ""
                    "C-}  : Forward Barf"
                    ""
                    "Keep the gems, barf out the rest!"
                    ""
                    "Press any key to begin."]}}

   {:id "S4R1" :stage 4 :round 1
    :title "Practice 1/4"
    :tree [[:star :heart :a]]
    :cursor [0]
    :goal {:type :shape :tree [[:star :heart] :a]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :forward-barf :undo]
    :solution [:down-sexp :forward-barf]}

   {:id "S4R2" :stage 4 :round 2
    :title "Practice 2/4"
    :tree [[:gem :star :a :b] :c]
    :cursor [1]
    :goal {:type :shape :tree [[:gem :star] :a :b :c]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :forward-barf :undo]
    :solution [:backward-sexp :down-sexp :forward-barf :forward-barf]}

   {:id "S4R3" :stage 4 :round 3
    :title "Practice 3/4"
    :tree [:a [:gem :heart :b :c] :d]
    :cursor [2]
    :goal {:type :shape :tree [:a [:gem :heart] :b :c :d]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :forward-barf :undo]
    :solution [:backward-sexp :down-sexp :forward-barf :forward-barf]}

   {:id "S4R4" :stage 4 :round 4
    :title "Practice 4/4"
    :tree [:a [:b [:gem :star :c :d :e]]]
    :cursor [1 0]
    :goal {:type :shape :tree [:a [:b [:gem :star] :c :d :e]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :forward-barf :undo]
    :solution [:forward-sexp :down-sexp :forward-barf :forward-barf :forward-barf]}

   ;; ══════════════════════════════════════════════════════════════
   ;; Stage 5: All slurp/barf directions (+ 5 practice)
   ;; ══════════════════════════════════════════════════════════════
   {:id "S5R0" :stage 5 :round 0
    :title "Both Directions"
    :tree [:gem :gem [:gem] :gem :gem]
    :cursor [2]
    :goal {:type :shape :tree [[:gem :gem :gem :gem :gem]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf :undo]
    :solution [:down-sexp :backward-slurp :backward-slurp
               :forward-slurp :forward-slurp]
    :intro {:title "Both Directions"
            :lines ["Slurp works both ways!"
                    ""
                    "C-(  : Backward Slurp (grab from left)"
                    "C-)  : Forward Slurp (grab from right)"
                    ""
                    "A gem on each side. Slurp them all in!"
                    ""
                    "Press any key to begin."]}}

   {:id "S5R1" :stage 5 :round 1
    :title "Practice 1/5"
    :tree [:star [:gem] :heart]
    :cursor [1 0]
    :goal {:type :shape :tree [[:star :gem :heart]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf :undo]
    :solution [:backward-slurp :forward-slurp]}

   {:id "S5R2" :stage 5 :round 2
    :title "Practice 2/5"
    :tree [[:a :gem :star :heart]]
    :cursor [0]
    :goal {:type :shape :tree [:a [:gem :star :heart]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf :undo]
    :solution [:down-sexp :backward-barf]}

   {:id "S5R3" :stage 5 :round 3
    :title "Practice 3/5"
    :tree [[:a :gem :star] :heart]
    :cursor [0]
    :goal {:type :shape :tree [:a [:gem :star :heart]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf :undo]
    :solution [:down-sexp :forward-sexp :backward-barf :forward-slurp]}

   {:id "S5R4" :stage 5 :round 4
    :title "Practice 4/5"
    :tree [:a [:gem [:star] :heart] :gem]
    :cursor [0]
    :goal {:type :shape :tree [:a [[:gem :star :heart] :gem]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf :undo]
    :solution [:forward-sexp :down-sexp :forward-sexp :down-sexp
               :backward-slurp :forward-slurp
               :up-sexp :up-sexp :down-sexp :forward-slurp]}

   {:id "S5R5" :stage 5 :round 5
    :title "Practice 5/5"
    :tree [[:a :b :gem :star] :heart :gem]
    :cursor [0]
    :goal {:type :shape :tree [:a :b [:gem :star :heart :gem]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf :undo]
    :solution [:down-sexp :forward-sexp :forward-sexp
               :backward-barf :backward-barf
               :forward-slurp :forward-slurp]}

   ;; ══════════════════════════════════════════════════════════════
   ;; Stage 6: Wrap (+ 3 practice)
   ;; ══════════════════════════════════════════════════════════════
   {:id "S6R0" :stage 6 :round 0
    :title "Gift Wrapping"
    :tree [:a :gem :b]
    :cursor [1]
    :goal {:type :shape :tree [:a [:gem] :b]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :undo]
    :solution [:wrap-round]
    :intro {:title "Gift Wrapping"
            :lines ["Wrap creates a new container"
                    "around the current element."
                    ""
                    "M-(  : Wrap in parens"
                    ""
                    "Goal: Wrap the gem in a list."
                    ""
                    "Press any key to begin."]}}

   {:id "S6R1" :stage 6 :round 1
    :title "Practice 1/3"
    :tree [:a :gem :star :b]
    :cursor [3]
    :goal {:type :shape :tree [:a [:gem :star] :b]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :undo]
    :solution [:backward-sexp :backward-sexp :wrap-round :down-sexp :forward-slurp]}

   {:id "S6R2" :stage 6 :round 2
    :title "Practice 2/3"
    :tree [:a [:b :gem :c] :d]
    :cursor [2]
    :goal {:type :shape :tree [:a [:b [:gem] :c] :d]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :undo]
    :solution [:backward-sexp :down-sexp :forward-sexp :wrap-round]}

   {:id "S6R3" :stage 6 :round 3
    :title "Practice 3/3"
    :tree [:a :gem :star :heart :b]
    :cursor [4]
    :goal {:type :shape :tree [:a [:gem :star :heart] :b]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :undo]
    :solution [:backward-sexp :backward-sexp :backward-sexp
               :wrap-round :down-sexp :forward-slurp :forward-slurp]}

   ;; ══════════════════════════════════════════════════════════════
   ;; Stage 7: Splice (+ 3 practice)
   ;; ══════════════════════════════════════════════════════════════
   {:id "S7R0" :stage 7 :round 0
    :title "Break Free"
    :tree [:a [[:heart :heart :heart]] :b]
    :cursor [1 0]
    :goal {:type :shape :tree [:a [:heart :heart :heart] :b]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :undo]
    :solution [:splice-sexp]
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

   {:id "S7R1" :stage 7 :round 1
    :title "Practice 1/3"
    :tree [:a [[:b :gem :star]] :c]
    :cursor [2]
    :goal {:type :shape :tree [:a [:b :gem :star] :c]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :undo]
    :solution [:backward-sexp :down-sexp :splice-sexp]}

   {:id "S7R2" :stage 7 :round 2
    :title "Practice 2/3"
    :tree [[[:gem]] :star :a]
    :cursor [1]
    :goal {:type :shape :tree [[:gem :star] :a]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :undo]
    :solution [:backward-sexp :down-sexp :splice-sexp
               :down-sexp :forward-slurp]}

   {:id "S7R3" :stage 7 :round 3
    :title "Practice 3/3"
    :tree [:a [[[:gem :star] :b]] :c]
    :cursor [0]
    :goal {:type :shape :tree [:a [[:gem :star] :b] :c]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :undo]
    :solution [:forward-sexp :down-sexp :splice-sexp]}

   ;; ══════════════════════════════════════════════════════════════
   ;; Stage 8: Raise (+ 3 practice)
   ;; ══════════════════════════════════════════════════════════════
   {:id "S8R0" :stage 8 :round 0
    :title "Rise Up"
    :tree [:x [:a :star :b] :y]
    :cursor [1 1]
    :goal {:type :shape :tree [:x :star :y]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp :undo]
    :solution [:raise-sexp]
    :intro {:title "Rise Up"
            :lines ["Raise replaces the entire parent"
                    "with just the current element."
                    ""
                    "M-r  : Raise"
                    ""
                    "Goal: Raise the star — it will replace"
                    "      the whole list it's inside."
                    ""
                    "Press any key to begin."]}}

   {:id "S8R1" :stage 8 :round 1
    :title "Practice 1/3"
    :tree [:a [:c :gem :d] :b]
    :cursor [2]
    :goal {:type :shape :tree [:a :gem :b]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp :undo]
    :solution [:backward-sexp :down-sexp :forward-sexp :raise-sexp]}

   {:id "S8R2" :stage 8 :round 2
    :title "Practice 2/3"
    :tree [:c [:a [:d :gem :e] :b]]
    :cursor [0]
    :goal {:type :shape :tree [:c [:a :gem :b]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp :undo]
    :solution [:forward-sexp :down-sexp :forward-sexp :down-sexp
               :forward-sexp :raise-sexp]}

   {:id "S8R3" :stage 8 :round 3
    :title "Practice 3/3"
    :tree [[:c :gem :d] :star]
    :cursor [1]
    :goal {:type :shape :tree [[:gem :star]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp :undo]
    :solution [:backward-sexp :down-sexp :forward-sexp :raise-sexp
               :backward-sexp :wrap-round :down-sexp :forward-slurp]}

   ;; ══════════════════════════════════════════════════════════════
   ;; Stage 9: Transpose (+ 3 practice)
   ;; ══════════════════════════════════════════════════════════════
   {:id "S9R0" :stage 9 :round 0
    :title "Swap Meet"
    :tree [:b :a :gem :c]
    :cursor [1]
    :goal {:type :shape :tree [:a :b :gem :c]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps :undo]
    :solution [:transpose-sexps]
    :intro {:title "Swap Meet"
            :lines ["Transpose swaps the current sexp"
                    "with the one before it."
                    ""
                    "C-M-t  : Transpose"
                    ""
                    "Goal: Swap a and b into the right order."
                    ""
                    "Press any key to begin."]}}

   {:id "S9R1" :stage 9 :round 1
    :title "Practice 1/3"
    :tree [:a [:star :gem] :b]
    :cursor [2]
    :goal {:type :shape :tree [:a [:gem :star] :b]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps :undo]
    :solution [:backward-sexp :down-sexp :forward-sexp :transpose-sexps]}

   {:id "S9R2" :stage 9 :round 2
    :title "Practice 2/3"
    :tree [:heart :gem :star]
    :cursor [0]
    :goal {:type :shape :tree [:gem :star :heart]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps :undo]
    :solution [:forward-sexp :transpose-sexps :forward-sexp :transpose-sexps]}

   {:id "S9R3" :stage 9 :round 3
    :title "Practice 3/3"
    :tree [:a [:star :gem :heart] :b]
    :cursor [1 0]
    :goal {:type :shape :tree [:a [:gem :star :heart] :b]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps :undo]
    :solution [:forward-sexp :transpose-sexps]}

   ;; ══════════════════════════════════════════════════════════════
   ;; Stage 10: Splice-kill (+ 3 practice) — raise disabled
   ;; ══════════════════════════════════════════════════════════════
   {:id "S10R0" :stage 10 :round 0
    :title "Surgical Splice"
    :tree [[:x :gem] [:gem :y]]
    :cursor [0 1]
    :goal {:type :shape :tree [:gem :gem]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd :undo]
    :solution [:splice-kill-bwd :forward-sexp :down-sexp :forward-sexp :splice-kill-fwd]
    :intro {:title "Surgical Splice"
            :lines ["Splice-kill removes the enclosing parens"
                    "AND kills in one direction."
                    ""
                    "M-up  or C-M-bksp : Splice, kill backward"
                    "M-down or M-k     : Splice, kill forward"
                    ""
                    "Free both gems! Kill the junk around them."
                    ""
                    "Press any key to begin."]}}

   {:id "S10R1" :stage 10 :round 1
    :title "Practice 1/3"
    :tree [:a [:c :d :gem] :b]
    :cursor [1 2]
    :goal {:type :shape :tree [:a :gem :b]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd :undo]
    :solution [:splice-kill-bwd]}

   {:id "S10R2" :stage 10 :round 2
    :title "Practice 2/3"
    :tree [:a [:gem :c :d] :b]
    :cursor [2]
    :goal {:type :shape :tree [:a :gem :b]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd :undo]
    :solution [:backward-sexp :down-sexp :forward-sexp :splice-kill-fwd]}

   {:id "S10R3" :stage 10 :round 3
    :title "Practice 3/3"
    :tree [:a [[:c :gem :d]] :b]
    :cursor [1 0 1]
    :goal {:type :shape :tree [:a :gem :b]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd :undo]
    :solution [:splice-kill-bwd :forward-sexp :splice-kill-fwd]}

   ;; ══════════════════════════════════════════════════════════════
   ;; Stage 11: Convolute (+ 3 practice)
   ;; ══════════════════════════════════════════════════════════════
   {:id "S11R0" :stage 11 :round 0
    :title "Inside Out"
    :tree [:a [:b :gem :gem]]
    :cursor [1 1]
    :goal {:type :shape :tree [:b [:a :gem :gem]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd
               :convolute-sexp :undo]
    :solution [:convolute-sexp]
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

   {:id "S11R1" :stage 11 :round 1
    :title "Practice 1/3"
    :tree [:a [:gem :star]]
    :cursor [1 1]
    :goal {:type :shape :tree [:gem [:a :star]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd
               :convolute-sexp :undo]
    :solution [:convolute-sexp]}

   {:id "S11R2" :stage 11 :round 2
    :title "Practice 2/3"
    :tree [:a [:b :gem] :star]
    :cursor [1 1]
    :goal {:type :shape :tree [:b [:a :gem :star]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd
               :convolute-sexp :undo]
    :solution [:convolute-sexp]}

   {:id "S11R3" :stage 11 :round 3
    :title "Practice 3/3"
    :tree [:a [:b [:gem :star] :heart]]
    :cursor [1 1 1]
    :goal {:type :shape :tree [:a [:gem [:b :star :heart]]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd
               :convolute-sexp :undo]
    :solution [:convolute-sexp]}

   ;; ══════════════════════════════════════════════════════════════
   ;; Stage 12: Split & Join (+ 3 practice)
   ;; ══════════════════════════════════════════════════════════════
   {:id "S12R0" :stage 12 :round 0
    :title "Divide & Conquer"
    :tree [[:gem :a :b :gem]]
    :cursor [0 2]
    :goal {:type :shape :tree [[:gem :a] [:b :gem]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd
               :convolute-sexp
               :split-sexp :join-sexp :undo]
    :solution [:split-sexp]
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

   {:id "S12R1" :stage 12 :round 1
    :title "Practice 1/3"
    :tree [[:gem :star :heart :gem]]
    :cursor [0 0]
    :goal {:type :shape :tree [[:gem :star] [:heart :gem]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd
               :convolute-sexp
               :split-sexp :join-sexp :undo]
    :solution [:forward-sexp :forward-sexp :split-sexp]}

   {:id "S12R2" :stage 12 :round 2
    :title "Practice 2/3"
    :tree [[:gem :star] [:heart :gem]]
    :cursor [1]
    :goal {:type :shape :tree [[:gem :star :heart :gem]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd
               :convolute-sexp
               :split-sexp :join-sexp :undo]
    :solution [:backward-sexp :join-sexp]}

   {:id "S12R3" :stage 12 :round 3
    :title "Practice 3/3"
    :tree [[:gem :star :heart] [:gem]]
    :cursor [0 0]
    :goal {:type :shape :tree [[:gem] [:star :heart :gem]]}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd
               :convolute-sexp
               :split-sexp :join-sexp :undo]
    :solution [:forward-sexp :split-sexp :up-sexp :join-sexp]}

   ;; ══════════════════════════════════════════════════════════════
   ;; Stage 13: The Gauntlet
   ;; ══════════════════════════════════════════════════════════════
   {:id "S13R0" :stage 13 :round 0
    :title "The Gauntlet"
    :tree [[:a :star] :b [[:gem] :c [:heart :d]]]
    :cursor [0]
    :goal {:type :collect-all}
    :commands [:forward-sexp :backward-sexp :down-sexp :up-sexp
               :forward-slurp :backward-slurp
               :forward-barf :backward-barf
               :wrap-round :splice-sexp :raise-sexp
               :transpose-sexps
               :splice-kill-bwd :splice-kill-fwd
               :convolute-sexp
               :split-sexp :join-sexp :undo]
    :solution nil  ;; complex, multiple valid solutions
    :intro {:title "The Gauntlet"
            :lines ["Use everything you've learned."
                    ""
                    "Collect all the treasures!"
                    "You may need to reshape the tree"
                    "to reach them all."
                    ""
                    "Press any key to begin."]}}])

;; ── Helpers ─────────────────────────────────────────────────────

(defn specs-by-stage-round
  "Get spec for a given stage and round."
  [stage round]
  (first (filter #(and (= (:stage %) stage)
                       (= (:round %) round))
                 puzzle-specs)))

(defn stage-specs
  "Get all specs for a stage."
  [stage]
  (filter #(= (:stage %) stage) puzzle-specs))

(defn total-stages []
  (inc (apply max (map :stage puzzle-specs))))

(defn stage-rounds
  "How many rounds in a stage."
  [stage]
  (count (stage-specs stage)))
