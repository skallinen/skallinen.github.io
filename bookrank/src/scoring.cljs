(ns scoring)

;; =============================================
;; Normal Distribution Scoring
;; Maps rank positions to 1–5 scores using
;; the inverse normal CDF (probit function).
;; Mean = 3, 1 SD = 2/3 score units (5 = +3σ, 1 = -3σ).
;; =============================================

(println "[scoring] loaded")

;; Rational approximation of the inverse normal CDF
;; Based on Abramowitz & Stegun approximation 26.2.23
;; Accurate to ~4.5e-4 for 0 < p < 1

(defn inv-normal-cdf
  "Approximate inverse of the standard normal CDF.
   Given probability p ∈ (0,1), returns the z-score."
  [p]
  (let [;; Use symmetry: compute for p <= 0.5, negate if needed
        sign (if (< p 0.5) -1.0 1.0)
        p*   (if (< p 0.5) p (- 1.0 p))
        ;; Rational approximation constants
        c0 2.515517
        c1 0.802853
        c2 0.010328
        d1 1.432788
        d2 0.189269
        d3 0.001308
        t  (js/Math.sqrt (* -2.0 (js/Math.log p*)))
        z  (- t (/ (+ c0 (* c1 t) (* c2 t t))
                   (+ 1.0 (* d1 t) (* d2 t t) (* d3 t t t))))]
    (* sign z)))

(defn rank->score
  "Convert a 0-indexed rank position and total count to a 1-5 score.
   Position 0 is the best (highest score).
   Returns a map {:raw score :display string}."
  [position total]
  (if (<= total 0)
    {:raw 3.0 :display "—"}
    (let [;; Map position to percentile (0 = best = high percentile)
          percentile (- 1.0 (/ (+ position 0.5) total))
          z          (inv-normal-cdf percentile)
          raw-score  (+ 3.0 (* z 0.6667))
          clamped    (max 0.0 (min 6.0 raw-score))]
      {:raw       clamped
       :display   (cond
                    (> clamped 5.0) "5+"
                    (< clamped 1.0) "1-"
                    :else           (.toFixed clamped 1))})))

(defn compute-aggregate-scores
  "Given a map of {uid -> {:order [book-ids...] :unread [book-ids...]}},
   a seq of member-ids, and a set of all book IDs in the club,
   compute the aggregate score for each book.
   A book is 'unranked' for a member if it's not in their order or unread.
   If any member has a book unranked, the aggregate is hidden.
   Returns a map of {book-id -> {:score :display :voter-count :member-scores :unread-by :any-unranked?}}."
  [all-rankings member-ids all-book-ids]
  (let [;; Build per-member sets for quick lookup (all members)
        member-known (into {}
                          (map (fn [mid]
                                 (let [ranking (get all-rankings mid)
                                       order-set (set (or (:order ranking) []))
                                       unread-set (set (or (:unread ranking) []))]
                                   [mid {:order order-set :unread unread-set}]))
                               member-ids))
        ;; Collect per-book scores from all members
        book-scores  (atom {})   ;; {book-id -> [{:uid uid :score raw}]}
        book-unread  (atom {})]  ;; {book-id -> #{uid}}
    ;; Collect ranked scores
    (doseq [[uid ranking] all-rankings]
      (let [order  (or (:order ranking) [])
            unread (set (or (:unread ranking) []))
            total  (count order)]
        ;; Ranked books
        (doseq [[idx book-id] (map-indexed vector order)]
          (let [{:keys [raw]} (rank->score idx total)]
            (swap! book-scores update book-id
                   (fn [entries] (conj (or entries []) {:uid uid :score raw})))))
        ;; Unread books
        (doseq [book-id unread]
          (swap! book-unread update book-id
                 (fn [s] (conj (or s #{}) uid))))))
    ;; Compute aggregates for all books that have at least one score
    (into {}
          (map (fn [[book-id entries]]
                 (let [scores  (map :score entries)
                       avg     (/ (reduce + scores) (count scores))
                       unread-set (get @book-unread book-id #{})
                       ;; Check if any member has this book unranked
                       any-unranked? (some (fn [mid]
                                             (let [m (get member-known mid)]
                                               (and (not (contains? (:order m) book-id))
                                                    (not (contains? (:unread m) book-id)))))
                                           member-ids)
                       display (cond
                                 (> avg 5.0) "5+"
                                 (< avg 1.0) "1-"
                                 :else       (.toFixed avg 1))]
                   [book-id {:score          avg
                             :display        display
                             :voter-count    (count entries)
                             :member-scores  entries
                             :unread-by      unread-set
                             :any-unranked?  (boolean any-unranked?)}]))
               @book-scores))))
