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
   Uses the inverse normal CDF for bell-curve spacing, then rescales
   so that #1 is always 5.0 and last is always 1.0 regardless of total.
   Returns a map {:raw score :display string}."
  [position total]
  (cond
    (<= total 0) {:raw 3.0 :display "—"}
    (= total 1)  {:raw 3.0 :display "3.0"}
    :else
    (let [;; Compute z-scores for this position, best, and worst
          z-i   (inv-normal-cdf (- 1.0 (/ (+ position 0.5) total)))
          z-max (inv-normal-cdf (- 1.0 (/ 0.5 total)))          ;; z for position 0 (best)
          z-min (inv-normal-cdf (/ 0.5 total))                   ;; z for position n-1 (worst)
          ;; Linearly rescale from [z-min, z-max] to [1, 5]
          raw-score (+ 1.0 (* 4.0 (/ (- z-i z-min) (- z-max z-min))))
          clamped   (max 1.0 (min 5.0 raw-score))]
      {:raw     clamped
       :display (.toFixed clamped 1)})))

;; =============================================
;; Reciprocal Rank Fusion (RRF)
;; Standard algorithm for merging ranked lists.
;; Score(book) = avg( 1/(k + rank) ), where k=60
;; Averaged over rankers so skip count doesn't bias results.
;; =============================================

(defn compute-aggregate-scores
  "Given a map of {uid -> {:order [book-ids...] :unread [book-ids...]}},
   a seq of member-ids (the CURRENT ROSTER), a set of all book IDs in the
   club, and optionally the set of roster members who are AWAY, compute the
   aggregate score for each book using RRF.
   A book is 'unranked' for a member if it's not in their order or unread.
   If any member WHO IS NOT AWAY has a book unranked, the aggregate is hidden
   (docs/contexts/ranking/scoring.md §3, `fully-dealt-with?`).
   After RRF sorting, display scores are assigned using the normal distribution
   system (same as individual rankings).
   Returns a map of {book-id -> {:score :display :rrf-score :voter-count
                                  :member-scores :unread-by :population
                                  :any-unranked?}}.

   TWO POPULATIONS, and they are deliberately not the same set
   (docs/plan/01-away/decisions.md D10, D11):
     - the ROSTER (`member-ids`) is the fusion filter: every current member's
       ranking fuses, away or not;
     - the AWAITED (`member-ids` minus `away-ids`) is the gate's quantifier:
       only they can hold a book back.
   The three-argument arity means \"nobody is away\" and is byte-for-byte the
   pre-Away behaviour; the cross-track parity harness calls it that way."
  ([all-rankings member-ids all-book-ids]
   (compute-aggregate-scores all-rankings member-ids all-book-ids #{}))
  ([all-rankings member-ids all-book-ids away-ids]
  (let [k 60  ;; RRF constant
        ;; Away is a mark ON A ROSTER MEMBER; an id that is not on the roster
        ;; can be neither awaited nor counted, so the set is intersected.
        away         (into #{} (filter (set member-ids)) away-ids)
        ;; The gate's quantifier: current members who are not away.
        awaited      (remove #(contains? away %) member-ids)
        ;; Build per-member sets for quick lookup (all members)
        member-known (into {}
                          (map (fn [mid]
                                 (let [ranking (get all-rankings mid)
                                       order-set (set (or (:order ranking) []))
                                       unread-set (set (or (:unread ranking) []))]
                                   [mid {:order order-set :unread unread-set}]))
                               member-ids))
        dealt-with?  (fn [mid book-id]
                       (let [m (get member-known mid)]
                         (or (contains? (:order m) book-id)
                             (contains? (:unread m) book-id))))
        ;; Collect per-book RRF scores and member scores
        book-rrf     (atom {})   ;; {book-id -> rrf-total}
        book-rankers (atom {})   ;; {book-id -> count of members who ranked it}
        book-members (atom {})   ;; {book-id -> [{:uid uid :score raw}]}
        book-unread  (atom {})   ;; {book-id -> #{uid}}
        roster       (set member-ids)]
    ;; Calculate RRF scores from each member's ranking.
    ;; ONLY CURRENT MEMBERS FUSE. A ranking document that belongs to nobody on
    ;; the roster — someone removed from the club, whose cascade left the
    ;; document behind — must not influence the club's verdict.
    ;; docs/contexts/ranking/scoring.md §3 names the current member roster as
    ;; an input, and spec.feature's "Removing a member removes their influence"
    ;; makes the consequence explicit. Without this filter the rule held only
    ;; for as long as a second, non-atomic delete happened to succeed.
    (doseq [[uid ranking] all-rankings
            :when (contains? roster uid)]
      (let [order  (or (:order ranking) [])
            unread (set (or (:unread ranking) []))
            total  (count order)]
        ;; Ranked books: compute both RRF and individual score
        (doseq [[idx book-id] (map-indexed vector order)]
          (let [rrf-contribution (/ 1.0 (+ k (inc idx)))  ;; 1-indexed rank
                {:keys [raw]} (rank->score idx total)]
            (swap! book-rrf update book-id
                   (fn [v] (+ (or v 0) rrf-contribution)))
            (swap! book-rankers update book-id
                   (fn [v] (inc (or v 0))))
            (swap! book-members update book-id
                   (fn [entries]
                     (conj (or entries [])
                           {:uid uid :score raw})))))
        ;; Unread books
        (doseq [book-id unread]
          (swap! book-unread update book-id
                 (fn [s] (conj (or s #{}) uid))))))
    ;; Average RRF by ranker count, then sort descending
    (let [book-rrf-avg (into {} (map (fn [[bid total]]
                                       (let [n (get @book-rankers bid 1)]
                                         [bid (/ total n)]))
                                     @book-rrf))
          scored-books (sort-by (fn [[_ rrf]] (- rrf)) book-rrf-avg)
          total-scored (count scored-books)
          ;; Assign position-based display scores
          scored-with-pos (map-indexed
                           (fn [idx [book-id rrf-score]]
                             (let [{:keys [raw display]} (rank->score idx total-scored)
                                   unread-set (get @book-unread book-id #{})
                                   entries (get @book-members book-id [])
                                   ;; Only the awaited can hold a book back.
                                   any-unranked?
                                   (some (fn [mid] (not (dealt-with? mid book-id)))
                                         awaited)
                                   ;; The per-book population `m`: everyone
                                   ;; awaited, plus every away member who has
                                   ;; dealt with THIS book. The denominator of
                                   ;; the progress count and of the caveat;
                                   ;; fully-dealt-with? <=> voter-count = m.
                                   population
                                   (+ (count awaited)
                                      (count (filter #(dealt-with? % book-id) away)))]
                               [book-id {:score          raw
                                         :display        display
                                         :rrf-score      rrf-score
                                         :voter-count    (+ (count entries) (count unread-set))
                                         :member-scores  entries
                                         :unread-by      unread-set
                                         :population     population
                                         :any-unranked?  (boolean any-unranked?)}]))
                           scored-books)]
      (into {} scored-with-pos)))))
