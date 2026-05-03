;;; engine.cljs - Core data model and s-expression tree operations
;;; S-expressions are represented as nested vectors.
;;; Atoms are keywords or strings. Lists are vectors.
;;; The cursor is a path (vector of indices) into the tree.
;;; Items (collectibles) are special atoms like :star, :key, :gem

(ns engine)

;; ── S-expression utilities ──────────────────────────────────────

(defn sexp? [x] (vector? x))
(defn atom? [x] (not (vector? x)))

(defn item? [x]
  (and (keyword? x)
       (contains? #{:star :key :gem :heart :trophy} x)))

(defn wall? [x]
  (and (keyword? x)
       (contains? #{:wall :lock} x)))

(defn get-at
  "Get the element at a path in the tree."
  [tree path]
  (if (empty? path)
    tree
    (get-in tree path)))

(defn set-at
  "Set the element at a path in the tree."
  [tree path value]
  (if (empty? path)
    value
    (assoc-in tree path value)))

(defn parent-path
  "Get the path to the parent of the element at path."
  [path]
  (when (seq path)
    (vec (butlast path))))

(defn cursor-index
  "Get the index within the parent (last element of path)."
  [path]
  (when (seq path)
    (last path)))

(defn sibling-count
  "How many siblings (including self) at this level."
  [tree path]
  (if (empty? path)
    1
    (let [parent (get-at tree (parent-path path))]
      (when (sexp? parent)
        (count parent)))))

;; ── Navigation helpers ──────────────────────────────────────────

(defn valid-path?
  "Check if a path points to a valid location in the tree."
  [tree path]
  (if (empty? path)
    true
    (let [parent (get-at tree (parent-path path))
          idx (cursor-index path)]
      (and (sexp? parent)
           (integer? idx)
           (>= idx 0)
           (< idx (count parent))))))

(defn next-sibling-path
  "Path to next sibling, or nil."
  [tree path]
  (when (seq path)
    (let [parent (get-at tree (parent-path path))
          idx (cursor-index path)
          next-idx (inc idx)]
      (when (and (sexp? parent) (< next-idx (count parent)))
        (conj (vec (parent-path path)) next-idx)))))

(defn prev-sibling-path
  "Path to previous sibling, or nil."
  [tree path]
  (when (seq path)
    (let [idx (cursor-index path)
          prev-idx (dec idx)]
      (when (>= prev-idx 0)
        (conj (vec (parent-path path)) prev-idx)))))

(defn down-path
  "Path into the first child of current element, or nil."
  [tree path]
  (let [elem (get-at tree path)]
    (when (and (sexp? elem) (pos? (count elem)))
      (conj path 0))))

(defn up-path
  "Path to the parent element, or nil."
  [_tree path]
  (when (> (count path) 1)
    (vec (parent-path path))))

(defn forward-sexp-path
  "Move forward over the next sexp at the same level."
  [tree path]
  (next-sibling-path tree path))

(defn backward-sexp-path
  "Move backward over the previous sexp at the same level."
  [tree path]
  (prev-sibling-path tree path))

;; ── Tree collection helpers ─────────────────────────────────────

(defn collect-items
  "Collect all items from the tree, returning their paths."
  [tree]
  (letfn [(walk [node path]
            (if (sexp? node)
              (mapcat (fn [i] (walk (nth node i) (conj path i)))
                      (range (count node)))
              (if (item? node)
                [{:item node :path path}]
                [])))]
    (walk tree [])))

(defn remove-at
  "Remove element at index from a vector within the tree."
  [tree path]
  (if (empty? path)
    tree
    (let [pp (parent-path path)
          idx (cursor-index path)
          parent (get-at tree pp)
          new-parent (into (subvec parent 0 idx)
                           (subvec parent (inc idx)))]
      (set-at tree pp new-parent))))

(defn insert-at
  "Insert element at index in a vector within the tree."
  [tree path elem]
  (if (empty? path)
    elem
    (let [pp (parent-path path)
          idx (cursor-index path)
          parent (get-at tree pp)
          new-parent (into (conj (subvec parent 0 idx) elem)
                           (subvec parent idx))]
      (set-at tree pp new-parent))))
