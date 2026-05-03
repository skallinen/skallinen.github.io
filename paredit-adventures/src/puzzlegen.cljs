;;; puzzlegen.cljs - Procedural puzzle generation
;;; Two strategies:
;;; 1. Hand-crafted templates for early/tutorial practice (case statements)
;;; 2. "Scramble from goal" for later stages: start from goal,
;;;    apply inverse operations to create puzzle. Guaranteed solvable.

(ns puzzlegen
  (:require [engine :as e]
            [paredit :as p]))

;; ── Random helpers ──────────────────────────────────────────────

(def filler-atoms [:a :b :c :d :e :f :g :h :i :j :k :l :m :n :p :q :r])
(def reward-atoms [:gem :star :heart])

(defn rand-nth-safe [coll]
  (nth coll (js/Math.floor (* (js/Math.random) (count coll)))))

(defn rand-fillers [n]
  (vec (repeatedly n #(rand-nth-safe filler-atoms))))

(defn rand-reward [] (rand-nth-safe reward-atoms))
(defn rand-rewards [n] (vec (repeatedly n rand-reward)))

(defn rand-int [n]
  (if (<= n 0) 0 (js/Math.floor (* (js/Math.random) n))))

;; ── Tree analysis helpers ───────────────────────────────────────

(defn all-paths
  "Return all valid paths in a tree."
  [tree]
  (letfn [(walk [node path]
            (if (e/atom? node)
              [path]
              (into [path]
                    (mapcat (fn [i] (walk (nth node i) (conj path i)))
                            (range (count node))))))]
    (walk tree [])))

(defn list-paths
  "Return paths to all list (vector) nodes in the tree."
  [tree]
  (filter #(e/sexp? (e/get-at tree %)) (all-paths tree)))

(defn atom-paths
  "Return paths to all atom nodes in the tree."
  [tree]
  (filter #(e/atom? (e/get-at tree %)) (all-paths tree)))

(defn lists-with-next-sibling
  "List paths that have a next sibling (for forward-barf as inverse of slurp)."
  [tree]
  (filter #(e/next-sibling-path tree %) (list-paths tree)))

(defn lists-with-prev-sibling
  "List paths that have a prev sibling."
  [tree]
  (filter #(e/prev-sibling-path tree %) (list-paths tree)))

(defn non-empty-lists
  "List paths to lists with at least 2 elements (for barf)."
  [tree]
  (filter #(> (count (e/get-at tree %)) 1) (list-paths tree)))

(defn elements-inside-lists
  "Paths to elements that are inside a list (depth >= 2)."
  [tree]
  (filter #(> (count %) 1) (atom-paths tree)))

(defn adjacent-list-pairs
  "Paths to lists that have a next-sibling that's also a list (for join)."
  [tree]
  (filter (fn [path]
            (when-let [next (e/next-sibling-path tree path)]
              (e/sexp? (e/get-at tree next))))
          (list-paths tree)))

;; ── Inverse operations ──────────────────────────────────────────
;; Each takes a state {:tree :cursor} and returns a new state,
;; or nil if the operation can't be applied.
;; The PLAYER must apply the FORWARD operation to undo this.

(def inverse-ops
  {;; Player needs forward-slurp → we apply forward-barf
   :forward-slurp
   {:find (fn [tree] (non-empty-lists tree))
    :apply (fn [state path] (p/forward-barf (assoc state :cursor path)))
    :name "inv-slurp-fwd"}

   ;; Player needs backward-slurp → we apply backward-barf
   :backward-slurp
   {:find (fn [tree] (non-empty-lists tree))
    :apply (fn [state path] (p/backward-barf (assoc state :cursor path)))
    :name "inv-slurp-bwd"}

   ;; Player needs forward-barf → we apply forward-slurp
   :forward-barf
   {:find (fn [tree] (lists-with-next-sibling tree))
    :apply (fn [state path] (p/forward-slurp (assoc state :cursor path)))
    :name "inv-barf-fwd"}

   ;; Player needs backward-barf → we apply backward-slurp
   :backward-barf
   {:find (fn [tree] (lists-with-prev-sibling tree))
    :apply (fn [state path] (p/backward-slurp (assoc state :cursor path)))
    :name "inv-barf-bwd"}

   ;; Player needs wrap → we apply splice
   :wrap-round
   {:find (fn [tree]
            ;; Find lists inside other lists (can be spliced)
            (filter #(and (seq %) (e/sexp? (e/get-at tree %)))
                    (mapcat (fn [lp]
                              (let [lst (e/get-at tree lp)]
                                (keep-indexed
                                 (fn [i child]
                                   (when (e/sexp? child) (conj lp i)))
                                 lst)))
                            (list-paths tree))))
    :apply (fn [state path] (p/splice-sexp (assoc state :cursor (conj path 0))))
    :name "inv-wrap"}

   ;; Player needs splice → we apply wrap
   :splice-sexp
   {:find (fn [tree] (filter #(seq %) (atom-paths tree)))
    :apply (fn [state path] (p/wrap-round (assoc state :cursor path)))
    :name "inv-splice"}

   ;; Player needs raise → we add junk siblings around element
   :raise-sexp
   {:find (fn [tree]
            ;; Elements inside lists where we can add junk
            (filter #(> (count %) 0) (atom-paths tree)))
    :apply (fn [state path]
             ;; Insert a junk element as sibling
             (let [junk (rand-nth-safe filler-atoms)
                   parent-path (e/parent-path path)
                   parent (e/get-at (:tree state) (or parent-path []))
                   idx (e/cursor-index path)]
               (when (e/sexp? parent)
                 (let [;; Insert junk before or after randomly
                       insert-before? (> (rand-int 2) 0)
                       new-parent (if insert-before?
                                    (into (conj (subvec parent 0 idx) junk)
                                          (subvec parent idx))
                                    (into (subvec parent 0 (inc idx))
                                          (into [junk] (subvec parent (inc idx)))))
                       new-cursor (if insert-before?
                                    (conj (vec (or parent-path [])) (inc idx))
                                    path)]
                   {:tree (e/set-at (:tree state) (or parent-path []) new-parent)
                    :cursor new-cursor}))))
    :name "inv-raise"}

   ;; Player needs transpose → we apply transpose (self-inverse)
   :transpose-sexps
   {:find (fn [tree]
            (filter #(e/prev-sibling-path tree %) (all-paths tree)))
    :apply (fn [state path] (p/transpose-sexps (assoc state :cursor path)))
    :name "inv-transpose"}

   ;; Player needs split → we apply join
   :split-sexp
   {:find (fn [tree] (adjacent-list-pairs tree))
    :apply (fn [state path] (p/join-sexp (assoc state :cursor path)))
    :name "inv-split"}

   ;; Player needs join → we apply split (at random point)
   :join-sexp
   {:find (fn [tree]
            ;; Lists with >= 2 elements that can be split
            (filter #(> (count (e/get-at tree %)) 2) (list-paths tree)))
    :apply (fn [state path]
             (let [lst (e/get-at (:tree state) path)
                   split-at (+ 1 (rand-int (dec (count lst))))
                   ;; Need cursor inside the list at split point
                   inner-cursor (conj path split-at)]
               (p/split-sexp (assoc state :cursor inner-cursor))))
    :name "inv-join"}})

;; ── Scramble engine ─────────────────────────────────────────────

(defn valid-puzzle-tree?
  "Check that a tree is a valid puzzle state:
   - Must be a vector (list) at root
   - Must have at least 2 elements
   - Must still contain at least one inner list"
  [tree]
  (and (e/sexp? tree)
       (>= (count tree) 2)
       (or (some e/sexp? tree)
           ;; Allow flat trees only if short
           (<= (count tree) 5))))

(defn apply-random-inverse
  "Try to apply one random inverse operation from the allowed set.
   Returns new state or nil if none could be applied.
   Rejects results that destroy tree structure."
  [state allowed-ops]
  (let [tree (:tree state)
        ops-to-try (filter #(allowed-ops (first %))
                           (shuffle (seq inverse-ops)))]
    (loop [remaining ops-to-try]
      (when (seq remaining)
        (let [[op-key {:keys [find apply]}] (first remaining)
              valid-paths (find tree)]
          (if (seq valid-paths)
            (let [path (rand-nth-safe (vec valid-paths))
                  result (apply state path)]
              (if (and result
                       (not= (:tree result) tree)
                       (valid-puzzle-tree? (:tree result))
                       (e/valid-path? (:tree result) (:cursor result)))
                result
                (recur (rest remaining))))
            (recur (rest remaining))))))))

(defn scramble-from-goal
  "Generate a puzzle by scrambling a goal state with N inverse operations.
   Returns {:tree :cursor :goal-tree :goal-type} or nil."
  [goal-tree goal-cursor allowed-ops n-steps]
  (loop [state {:tree goal-tree :cursor goal-cursor}
         steps-remaining n-steps
         steps-applied 0]
    (if (or (zero? steps-remaining) (> steps-applied (* n-steps 3)))
      ;; Done — place cursor at a random top-level position to force nav
      (when (and (not= (:tree state) goal-tree)
                 (valid-puzzle-tree? (:tree state)))
        (let [tree (:tree state)
              top-paths (vec (map vector (range (count tree))))
              cursor (rand-nth-safe top-paths)]
          {:tree tree
           :cursor cursor
           :goal-tree goal-tree
           :goal-type :shape}))
      (let [result (apply-random-inverse state allowed-ops)]
        (if result
          (recur result (dec steps-remaining) (inc steps-applied))
          ;; Couldn't apply any op, return what we have
          (when (and (not= (:tree state) goal-tree)
                     (valid-puzzle-tree? (:tree state)))
            (let [tree (:tree state)
                  top-paths (vec (map vector (range (count tree))))
                  cursor (rand-nth-safe top-paths)]
              {:tree tree
               :cursor cursor
               :goal-tree goal-tree
               :goal-type :shape})))))))

;; ── Goal state generators ───────────────────────────────────────

(defn make-goal-gems-in-list
  "Simple goal: all gems inside one list."
  [n-gems]
  (let [gems (rand-rewards n-gems)]
    {:tree [(vec gems)] :cursor [0]}))

(defn make-goal-nested
  "Goal with some nesting structure."
  [complexity]
  (let [rewards (rand-rewards (+ 2 (rand-int complexity)))]
    (case (rand-int 3)
      0 {:tree [(vec rewards)] :cursor [0]}
      1 {:tree [(vec (take 2 rewards)) (vec (drop 2 rewards))]
         :cursor [0]}
      {:tree [[(vec rewards)]] :cursor [0 0]})))

(defn make-goal-flat
  "Goal: flat sequence of items in correct order."
  [n]
  (let [items (rand-rewards n)]
    {:tree (vec items) :cursor [0]}))

;; ── Staged generators ───────────────────────────────────────────
;; Early stages use hand-crafted templates.
;; Later stages use scramble-from-goal.

;; ── Stage 4: Forward slurp ──────────────────────────────────────

(defn gen-slurp-practice [difficulty]
  (case difficulty
    1 (let [[r1 r2] (rand-rewards 2)]
        {:tree [[:a r1] r2 :b]
         :cursor [2] :goal-tree [[:a r1 r2] :b] :goal-type :shape})
    2 (let [[r1 r2 r3] (rand-rewards 3)]
        {:tree [:a [[:b r1] r2] r3]
         :cursor [1 0 1] :goal-tree [:a [[:b r1 r2] r3]] :goal-type :shape})
    3 (let [[r1 r2 r3] (rand-rewards 3)]
        {:tree [[r1] r2 r3 :a]
         :cursor [3] :goal-tree [[r1 r2 r3] :a] :goal-type :shape})
    (let [[r1 r2 r3 r4] (rand-rewards 4)]
      {:tree [:a [[r1] r2 r3] r4]
       :cursor [1 0 0] :goal-tree [:a [[r1 r2 r3 r4]]] :goal-type :shape})))

;; ── Stage 5: Barf ───────────────────────────────────────────────

(defn gen-barf-practice [difficulty]
  (case difficulty
    1 (let [[r1 r2] (rand-rewards 2) [j1] (rand-fillers 1)]
        {:tree [[r1 r2 j1]] :cursor [0]
         :goal-tree [[r1 r2] j1] :goal-type :shape})
    2 (let [[r1 r2] (rand-rewards 2) [j1 j2] (rand-fillers 2)]
        {:tree [[r1 r2 j1 j2] :a] :cursor [1]
         :goal-tree [[r1 r2] j1 j2 :a] :goal-type :shape})
    3 (let [[r1 r2] (rand-rewards 2) [j1 j2] (rand-fillers 2)]
        {:tree [:a [r1 r2 j1 j2] :b] :cursor [2]
         :goal-tree [:a [r1 r2] j1 j2 :b] :goal-type :shape})
    (let [[r1 r2] (rand-rewards 2) [j1 j2 j3] (rand-fillers 3)]
      {:tree [:a [:b [r1 r2 j1 j2 j3]]] :cursor [1 0]
       :goal-tree [:a [:b [r1 r2] j1 j2 j3]] :goal-type :shape})))

;; ── Stage 6: All slurp/barf ─────────────────────────────────────

(defn gen-slurp-barf-all [difficulty]
  ;; No scramble here — slurp/barf can't reorder or create lists.
  ;; All templates preserve element order and list structure.
  (case difficulty
    ;; Round 1: backward slurp — cursor inside
    1 (let [[r1 r2 r3] (rand-rewards 3)]
        {:tree [r1 [r2] r3] :cursor [1 0]
         :goal-tree [[r1 r2 r3]] :goal-type :shape})
    ;; Round 2: backward barf
    2 (let [[r1 r2 r3] (rand-rewards 3) [j1] (rand-fillers 1)]
        {:tree [[j1 r1 r2 r3]] :cursor [0]
         :goal-tree [j1 [r1 r2 r3]] :goal-type :shape})
    ;; Round 3: backward barf + forward slurp
    3 (let [[r1 r2 r3] (rand-rewards 3) [j1] (rand-fillers 1)]
        {:tree [[j1 r1 r2] r3] :cursor [0]
         :goal-tree [j1 [r1 r2 r3]] :goal-type :shape})
    ;; Round 4: slurp from both sides in nested context
    4 (let [[r1 r2 r3 r4] (rand-rewards 4)]
        {:tree [:a [r1 [r2] r3] r4] :cursor [0]
         :goal-tree [:a [[r1 r2 r3] r4]] :goal-type :shape})
    ;; Round 5: backward-barf multiple + forward-slurp
    (let [[r1 r2 r3 r4] (rand-rewards 4) [j1 j2] (rand-fillers 2)]
      {:tree [[j1 j2 r1 r2] r3 r4] :cursor [0]
       :goal-tree [j1 j2 [r1 r2 r3 r4]] :goal-type :shape})))

;; ── Stage 7: Wrap ───────────────────────────────────────────────

(defn gen-wrap-practice [difficulty]
  (case difficulty
    1 (let [[r1 r2] (rand-rewards 2)]
        {:tree [:a r1 r2 :b] :cursor [3]
         :goal-tree [:a [r1 r2] :b] :goal-type :shape})
    2 (let [[r1] (rand-rewards 1)]
        {:tree [:a [:b r1 :c] :d] :cursor [2]
         :goal-tree [:a [:b [r1] :c] :d] :goal-type :shape})
    (let [[r1 r2 r3] (rand-rewards 3)]
      {:tree [:a r1 r2 r3 :b] :cursor [4]
       :goal-tree [:a [r1 r2 r3] :b] :goal-type :shape})))

;; ── Stage 8: Splice ─────────────────────────────────────────────

(defn gen-splice-practice [difficulty]
  (case difficulty
    1 (let [[r1 r2] (rand-rewards 2)]
        {:tree [:a [[:b r1 r2]] :c] :cursor [2]
         :goal-tree [:a [:b r1 r2] :c] :goal-type :shape})
    2 (let [[r1 r2] (rand-rewards 2)]
        {:tree [[[r1]] r2 :a] :cursor [1]
         :goal-tree [[r1 r2] :a] :goal-type :shape})
    ;; splice + barf combo — double wrapped, splice outer, barf junk
    (let [[r1 r2] (rand-rewards 2) [j1] (rand-fillers 1)]
      {:tree [:a [[[r1 r2] j1]] :b] :cursor [0]
       :goal-tree [:a [[r1 r2] j1] :b] :goal-type :shape})))

;; ── Stage 9: Raise ──────────────────────────────────────────────

(defn gen-raise-practice [difficulty]
  (case difficulty
    1 (let [[r1] (rand-rewards 1) [j1 j2] (rand-fillers 2)]
        {:tree [:a [j1 r1 j2] :b] :cursor [2]
         :goal-tree [:a r1 :b] :goal-type :shape})
    2 (let [[r1] (rand-rewards 1) [j1 j2 j3] (rand-fillers 3)]
        {:tree [j1 [:a [j2 r1 j3] :b]] :cursor [0]
         :goal-tree [j1 [:a r1 :b]] :goal-type :shape})
    ;; raise + slurp combo
    (let [[r1 r2] (rand-rewards 2) [j1 j2] (rand-fillers 2)]
      {:tree [[j1 r1 j2] r2] :cursor [1]
       :goal-tree [[r1 r2]] :goal-type :shape})))

;; ── Stage 10: Transpose ─────────────────────────────────────────

(defn gen-transpose-practice [difficulty]
  (case difficulty
    1 (let [[r1 r2] (rand-rewards 2)]
        {:tree [:a [r2 r1] :b] :cursor [2]
         :goal-tree [:a [r1 r2] :b] :goal-type :shape})
    2 (let [[r1 r2 r3] (rand-rewards 3)]
        {:tree [r3 r1 r2] :cursor [0]
         :goal-tree [r1 r2 r3] :goal-type :shape})
    ;; transpose inside nesting
    (let [[r1 r2 r3] (rand-rewards 3)]
      {:tree [:a [r2 r1 r3] :b] :cursor [1 0]
       :goal-tree [:a [r1 r2 r3] :b] :goal-type :shape})))

;; ── Stage 11: Splice-kill ───────────────────────────────────────

(defn gen-splice-kill-practice [difficulty]
  (case difficulty
    1 (let [[r1] (rand-rewards 1) [j1 j2] (rand-fillers 2)]
        {:tree [:a [j1 j2 r1] :b] :cursor [1 2]
         :goal-tree [:a r1 :b] :goal-type :shape})
    2 (let [[r1] (rand-rewards 1) [j1 j2] (rand-fillers 2)]
        {:tree [:a [r1 j1 j2] :b] :cursor [2]
         :goal-tree [:a r1 :b] :goal-type :shape})
    ;; Two nested lists, each needs one splice-kill direction
    (let [[r1] (rand-rewards 1) [j1 j2] (rand-fillers 2)]
      {:tree [:a [[j1 r1 j2]] :b] :cursor [1 0 1]
       :goal-tree [:a r1 :b] :goal-type :shape})))

;; ── Stage 12: Convolute ─────────────────────────────────────────

(defn gen-convolute-practice [difficulty]
  (case difficulty
    1 (let [[r1 r2] (rand-rewards 2)]
        {:tree [:a [r1 r2]] :cursor [1 1]
         :goal-tree [r1 [:a r2]] :goal-type :shape})
    2 (let [[r1 r2] (rand-rewards 2)]
        {:tree [:a [:b r1] r2] :cursor [1 1]
         :goal-tree [:b [:a r1 r2]] :goal-type :shape})  ;; outer-tail r2 absorbed
    (let [[r1 r2 r3] (rand-rewards 3)]
      {:tree [:a [:b [r1 r2] r3]] :cursor [1 1 1]
       :goal-tree [:a [r1 [:b r2 r3]]] :goal-type :shape})))

;; ── Stage 13: Split & Join ──────────────────────────────────────

(defn gen-split-join-practice [difficulty]
  (case difficulty
    1 (let [[r1 r2 r3 r4] (rand-rewards 4)]
        {:tree [[r1 r2 r3 r4]] :cursor [0 0]
         :goal-tree [[r1 r2] [r3 r4]] :goal-type :shape})
    2 (let [[r1 r2 r3 r4] (rand-rewards 4)]
        {:tree [[r1 r2] [r3 r4]] :cursor [1]
         :goal-tree [[r1 r2 r3 r4]] :goal-type :shape})
    ;; split + join combo — restructure
    (let [[r1 r2 r3 r4] (rand-rewards 4)]
      {:tree [[r1 r2 r3] [r4]] :cursor [0 0]
       :goal-tree [[r1] [r2 r3 r4]] :goal-type :shape})))

;; ── Generator registry ──────────────────────────────────────────

(def generators
  {:forward-slurp    gen-slurp-practice
   :forward-barf     gen-barf-practice
   :slurp-barf       gen-slurp-barf-all
   :wrap             gen-wrap-practice
   :splice           gen-splice-practice
   :raise            gen-raise-practice
   :transpose        gen-transpose-practice
   :splice-kill      gen-splice-kill-practice
   :convolute        gen-convolute-practice
   :split-join       gen-split-join-practice})

(defn generate-puzzle
  "Generate a puzzle for a given stage-key and difficulty (round number)."
  [stage-key difficulty]
  (let [gen-fn (get generators stage-key gen-slurp-practice)]
    (gen-fn difficulty)))
