;;; paredit.cljs - Paredit operations on the s-expression tree
;;; Each operation takes {:tree tree :cursor path} and returns the same shape.

(ns paredit
  (:require [engine :as e]))

;; ── Navigation commands ─────────────────────────────────────────

(defn forward-sexp
  "C-M-f: Move forward one sexp"
  [{:keys [tree cursor] :as state}]
  (if-let [next-path (e/forward-sexp-path tree cursor)]
    (assoc state :cursor next-path)
    state))

(defn backward-sexp
  "C-M-b: Move backward one sexp"
  [{:keys [tree cursor] :as state}]
  (if-let [prev-path (e/backward-sexp-path tree cursor)]
    (assoc state :cursor prev-path)
    state))

(defn down-sexp
  "C-M-d: Move down into a sexp"
  [{:keys [tree cursor] :as state}]
  (if-let [d-path (e/down-path tree cursor)]
    (assoc state :cursor d-path)
    state))

(defn up-sexp
  "C-M-u: Move up out of a sexp"
  [{:keys [tree cursor] :as state}]
  (if-let [u-path (e/up-path tree cursor)]
    (assoc state :cursor u-path)
    state))

;; ── Slurp & Barf ───────────────────────────────────────────────
;; Like Emacs paredit: these operate on the nearest enclosing list.
;; If cursor is on a list, use that list.
;; If cursor is on an atom inside a list, use the parent list.

(defn- find-enclosing-list
  "Find the path to the nearest enclosing list for slurp/barf.
   Like Emacs: always returns the PARENT list (the one cursor is inside).
   Cursor must be inside a list, not on it from outside."
  [tree cursor]
  (when (seq cursor)
    (let [pp (or (e/parent-path cursor) [])]
      (when (e/sexp? (e/get-at tree pp))
        pp))))

(defn forward-slurp
  "C-) or C-right: Slurp the next sibling after the enclosing list
   into that list (appends it)."
  [{:keys [tree cursor] :as state}]
  (if-let [list-path (find-enclosing-list tree cursor)]
    (if-let [next-path (e/next-sibling-path tree list-path)]
      (let [next-elem (e/get-at tree next-path)
            tree2 (e/remove-at tree next-path)
            current (e/get-at tree2 list-path)
            new-current (conj current next-elem)
            tree3 (e/set-at tree2 list-path new-current)]
        (assoc state :tree tree3))
      state)
    state))

(defn backward-slurp
  "C-( or C-left: Slurp the previous sibling before the enclosing list
   into that list (prepends it)."
  [{:keys [tree cursor] :as state}]
  (if-let [list-path (find-enclosing-list tree cursor)]
    (if-let [prev-path (e/prev-sibling-path tree list-path)]
      (let [prev-elem (e/get-at tree prev-path)
            tree2 (e/remove-at tree prev-path)
            ;; List index shifts left by 1 since we removed before it
            new-list-path (conj (vec (e/parent-path list-path))
                                (dec (e/cursor-index list-path)))
            current (e/get-at tree2 new-list-path)
            new-current (into [prev-elem] current)
            tree3 (e/set-at tree2 new-list-path new-current)
            ;; Adjust cursor: if cursor was inside the list, shift for prepend
            new-cursor (if (= list-path cursor)
                         new-list-path
                         ;; Cursor was inside — parent shifted, index shifts +1
                         (conj new-list-path (inc (e/cursor-index cursor))))]
        (assoc state :tree tree3 :cursor new-cursor))
      state)
    state))

(defn forward-barf
  "C-} or C-S-right: Barf the last element out of the enclosing list."
  [{:keys [tree cursor] :as state}]
  (if-let [list-path (find-enclosing-list tree cursor)]
    (let [elem (e/get-at tree list-path)]
      (if (or (not (e/sexp? elem)) (empty? elem))
        state
        (let [last-child (peek elem)
              new-current (pop elem)
              tree2 (e/set-at tree list-path new-current)
              insert-path (conj (vec (e/parent-path list-path))
                                (inc (e/cursor-index list-path)))
              tree3 (e/insert-at tree2 insert-path last-child)]
          (assoc state :tree tree3))))
    state))

(defn backward-barf
  "C-{ or C-S-left: Barf the first element out of the enclosing list."
  [{:keys [tree cursor] :as state}]
  (if-let [list-path (find-enclosing-list tree cursor)]
    (let [elem (e/get-at tree list-path)]
      (if (or (not (e/sexp? elem)) (empty? elem))
        state
        (let [first-child (first elem)
              new-current (vec (rest elem))
              tree2 (e/set-at tree list-path new-current)
              insert-path list-path
              tree3 (e/insert-at tree2 insert-path first-child)
              ;; List shifts right since we inserted before it
              new-list-path (conj (vec (e/parent-path list-path))
                                  (inc (e/cursor-index list-path)))
              ;; Adjust cursor
              new-cursor (if (= list-path cursor)
                           new-list-path
                           ;; Cursor was inside — parent shifted, index shifts -1
                           (let [ci (e/cursor-index cursor)]
                             (if (zero? ci)
                               ;; Cursor was on the barfed element — it's now outside
                               (conj (vec (e/parent-path list-path))
                                     (e/cursor-index list-path))
                               (conj new-list-path (dec ci)))))]
          (assoc state :tree tree3 :cursor new-cursor))))
    state))

;; ── Wrap & Splice ───────────────────────────────────────────────

(defn wrap-round
  "M-(: Wrap the current element in a new list."
  [{:keys [tree cursor] :as state}]
  (let [elem (e/get-at tree cursor)
        wrapped [elem]
        tree2 (e/set-at tree cursor wrapped)]
    (assoc state :tree tree2)))

(defn splice-sexp
  "M-s: Splice - remove the wrapping of the current sexp.
   Replaces the parent list with its children in the grandparent."
  [{:keys [tree cursor] :as state}]
  (if (empty? cursor)
    state ;; Can't splice the root
    (let [pp (e/parent-path cursor)
          parent (e/get-at tree (or pp []))]
      (if (or (nil? pp) (not (e/sexp? parent)))
        state
        (if (empty? pp)
          ;; Parent is the root
          (let [elem (e/get-at tree cursor)]
            (if (e/sexp? elem)
              (let [idx (e/cursor-index cursor)
                    before (subvec parent 0 idx)
                    after (subvec parent (inc idx))
                    new-root (into (into before elem) after)]
                (assoc state :tree new-root
                       :cursor (if (pos? (count before))
                                 [(count before)]
                                 [0])))
              state))
          ;; Normal case: parent is not root
          (let [gp-path pp
                gp (e/get-at tree (e/parent-path gp-path))
                gp-idx (e/cursor-index gp-path)]
            (if (e/sexp? gp)
              (let [before (subvec gp 0 gp-idx)
                    after (subvec gp (inc gp-idx))
                    new-gp (into (into before parent) after)
                    new-cursor-idx (+ (count before) (e/cursor-index cursor))
                    new-cursor (conj (vec (e/parent-path gp-path)) new-cursor-idx)]
                (assoc state
                       :tree (e/set-at tree (e/parent-path gp-path) new-gp)
                       :cursor new-cursor))
              state)))))))

(defn raise-sexp
  "M-r: Raise - replace the parent sexp with the current element."
  [{:keys [tree cursor] :as state}]
  (if (empty? cursor)
    state
    (let [elem (e/get-at tree cursor)
          pp (e/parent-path cursor)]
      (if pp
        (assoc state
               :tree (e/set-at tree pp elem)
               :cursor pp)
        ;; parent is root
        (assoc state
               :tree elem
               :cursor [])))))

(defn split-sexp
  "M-S: Split the current sexp at cursor position into two."
  [{:keys [tree cursor] :as state}]
  (if (empty? cursor)
    state
    (let [pp (e/parent-path cursor)
          parent (e/get-at tree (or pp []))
          idx (e/cursor-index cursor)]
      (if-not (and (e/sexp? parent) pp)
        state
        (let [left (vec (take idx parent))
              right (vec (drop idx parent))
              gp-path (e/parent-path pp)
              gp-idx (e/cursor-index pp)]
          (if gp-path
            (let [gp (e/get-at tree gp-path)
                  new-gp (into (into (subvec gp 0 gp-idx)
                                     [left right])
                               (subvec gp (inc gp-idx)))]
              (assoc state
                     :tree (e/set-at tree gp-path new-gp)
                     :cursor (conj gp-path (inc gp-idx) 0)))
            ;; Parent is at root level
            (let [root tree
                  new-root (into (into (subvec root 0 gp-idx)
                                       [left right])
                                 (subvec root (inc gp-idx)))]
              (assoc state
                     :tree new-root
                     :cursor [(inc gp-idx) 0]))))))))

(defn join-sexp
  "M-J: Join two adjacent sexps into one."
  [{:keys [tree cursor] :as state}]
  (let [elem (e/get-at tree cursor)]
    (if-not (e/sexp? elem)
      state
      (if-let [next-path (e/next-sibling-path tree cursor)]
        (let [next-elem (e/get-at tree next-path)]
          (if-not (e/sexp? next-elem)
            state
            (let [joined (into elem next-elem)
                  tree2 (e/set-at tree cursor joined)
                  tree3 (e/remove-at tree2 next-path)]
              (assoc state :tree tree3))))
        state))))

;; ── Convolute ───────────────────────────────────────────────────

(defn convolute-sexp
  "M-?: Convolute - save inner-head, splice inner into outer, wrap with inner-head.
   Before: (outer-head (inner-head |inner-tail) outer-tail)
   After:  (inner-head (outer-head |inner-tail outer-tail))
   Cursor must not be at index 0 in inner list (inner-head must be non-empty)."
  [{:keys [tree cursor] :as state}]
  (when (>= (count cursor) 2)
    (let [inner-path (vec (butlast cursor))
          inner-idx (last inner-path)
          outer-path (vec (butlast inner-path))
          outer (e/get-at tree outer-path)
          inner (e/get-at tree inner-path)
          cursor-idx (last cursor)]
      (when (and (e/sexp? outer) (e/sexp? inner) (pos? cursor-idx))
        (let [inner-head (subvec inner 0 cursor-idx)
              inner-tail (subvec inner cursor-idx)
              outer-head (subvec outer 0 inner-idx)
              outer-tail (subvec outer (inc inner-idx))
              spliced (into (into (vec outer-head) inner-tail) outer-tail)
              new-result (conj (vec inner-head) spliced)
              new-cursor (conj outer-path
                               (count inner-head)
                               (count outer-head))]
          (assoc state
                 :tree (e/set-at tree outer-path new-result)
                 :cursor new-cursor))))))

;; ── Splice killing ──────────────────────────────────────────────

(defn- root-path?
  "Check if path is nil or empty (points to root)."
  [p]
  (or (nil? p) (empty? p)))

(defn splice-sexp-killing-backward
  "M-<up>: Splice, killing everything before cursor in the enclosing list."
  [{:keys [tree cursor] :as state}]
  (if (< (count cursor) 1)
    state
    (let [pp (e/parent-path cursor)
          parent (e/get-at tree (or pp []))
          idx (e/cursor-index cursor)]
      (if-not (e/sexp? parent)
        state
        (let [kept (subvec parent idx)]
          (if (root-path? pp)
            (assoc state :tree (vec kept) :cursor [0])
            (let [gp-path (e/parent-path pp)
                  gp (e/get-at tree (or gp-path []))
                  gp-idx (e/cursor-index pp)]
              (if (e/sexp? gp)
                (let [before (subvec gp 0 gp-idx)
                      after (subvec gp (inc gp-idx))
                      new-gp (into (into before kept) after)
                      new-cursor-idx (count before)]
                  (assoc state
                         :tree (if (root-path? gp-path)
                                 new-gp
                                 (e/set-at tree gp-path new-gp))
                         :cursor (if (root-path? gp-path)
                                   [new-cursor-idx]
                                   (conj (vec gp-path) new-cursor-idx))))
                state))))))))

(defn splice-sexp-killing-forward
  "M-<down>: Splice, killing cursor element and everything after it.
   Emacs: kills from point forward (including what's at point)."
  [{:keys [tree cursor] :as state}]
  (if (< (count cursor) 1)
    state
    (let [pp (e/parent-path cursor)
          parent (e/get-at tree (or pp []))
          idx (e/cursor-index cursor)]
      (if-not (e/sexp? parent)
        state
        (let [kept (subvec parent 0 idx)]
          (if (root-path? pp)
            ;; Parent is root
            (if (empty? kept)
              state ;; nothing to keep
              (assoc state :tree (vec kept)
                     :cursor [(dec (count kept))]))
            (let [gp-path (e/parent-path pp)
                  gp (e/get-at tree (or gp-path []))
                  gp-idx (e/cursor-index pp)]
              (if (e/sexp? gp)
                (let [before (subvec gp 0 gp-idx)
                      after (subvec gp (inc gp-idx))
                      new-gp (into (into before kept) after)
                      ;; Cursor on last kept element, or first after-element
                      new-cursor-idx (+ (count before)
                                        (max 0 (dec (count kept))))]
                  (assoc state
                         :tree (if (root-path? gp-path)
                                 new-gp
                                 (e/set-at tree gp-path new-gp))
                         :cursor (if (root-path? gp-path)
                                   [new-cursor-idx]
                                   (conj (vec gp-path) new-cursor-idx))))
                state))))))))

;; ── Transpose ───────────────────────────────────────────────────

(defn transpose-sexps
  "C-M-t: Swap the current sexp with the previous one."
  [{:keys [tree cursor] :as state}]
  (if-let [prev-path (e/prev-sibling-path tree cursor)]
    (let [current (e/get-at tree cursor)
          prev (e/get-at tree prev-path)
          tree2 (-> tree
                    (e/set-at cursor prev)
                    (e/set-at prev-path current))]
      (assoc state :tree tree2))
    state))

;; ── Command registry ────────────────────────────────────────────

(def commands
  {:forward-sexp     {:fn forward-sexp
                      :name "Forward Sexp"
                      :keys ["C-M-f"]
                      :category :navigation}
   :backward-sexp    {:fn backward-sexp
                      :name "Backward Sexp"
                      :keys ["C-M-b"]
                      :category :navigation}
   :down-sexp        {:fn down-sexp
                      :name "Down Sexp"
                      :keys ["C-M-d"]
                      :category :navigation}
   :up-sexp          {:fn up-sexp
                      :name "Up Sexp"
                      :keys ["C-M-u"]
                      :category :navigation}
   :forward-slurp    {:fn forward-slurp
                      :name "Forward Slurp"
                      :keys ["C-)" "C-right"]
                      :category :slurp-barf}
   :backward-slurp   {:fn backward-slurp
                      :name "Backward Slurp"
                      :keys ["C-(" "C-left"]
                      :category :slurp-barf}
   :forward-barf     {:fn forward-barf
                      :name "Forward Barf"
                      :keys ["C-}" "C-S-right"]
                      :category :slurp-barf}
   :backward-barf    {:fn backward-barf
                      :name "Backward Barf"
                      :keys ["C-{" "C-S-left"]
                      :category :slurp-barf}
   :wrap-round       {:fn wrap-round
                      :name "Wrap"
                      :keys ["M-("]
                      :category :wrap-splice}
   :splice-sexp      {:fn splice-sexp
                      :name "Splice"
                      :keys ["M-s"]
                      :category :wrap-splice}
   :raise-sexp       {:fn raise-sexp
                      :name "Raise"
                      :keys ["M-r"]
                      :category :wrap-splice}
   :split-sexp       {:fn split-sexp
                      :name "Split"
                      :keys ["M-S"]
                      :category :advanced}
   :join-sexp        {:fn join-sexp
                      :name "Join"
                      :keys ["M-J"]
                      :category :advanced}
   :convolute-sexp   {:fn convolute-sexp
                      :name "Convolute"
                      :keys ["M-?"]
                      :category :advanced}
   :splice-kill-bwd  {:fn splice-sexp-killing-backward
                      :name "Splice Kill Bwd"
                      :keys ["M-up" "C-M-bksp"]
                      :category :wrap-splice}
   :splice-kill-fwd  {:fn splice-sexp-killing-forward
                      :name "Splice Kill Fwd"
                      :keys ["M-down" "M-k"]
                      :category :wrap-splice}
   :transpose-sexps  {:fn transpose-sexps
                      :name "Transpose"
                      :keys ["C-M-t"]
                      :category :navigation}
   :undo             {:fn identity
                      :name "Undo"
                      :keys ["C-/"]
                      :category :meta}})

(defn execute-command
  "Execute a named paredit command on the state."
  [state cmd-key]
  (if-let [cmd (get commands cmd-key)]
    (let [result ((:fn cmd) state)]
      (or result state))
    state))
