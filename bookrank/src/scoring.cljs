(ns scoring)

;; =============================================
;; Normal Distribution Scoring
;; Maps rank positions to 1–5 scores using
;; the inverse normal CDF (probit function).
;; Mean = 3, 1 SD = 0.5 score units.
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
          raw-score  (+ 3.0 (* z 0.5))
          clamped    (max 0.0 (min 6.0 raw-score))]
      {:raw       clamped
       :display   (cond
                    (> clamped 5.0) "5+"
                    (< clamped 1.0) "1-"
                    :else           (.toFixed clamped 1))})))

(defn compute-aggregate-scores
  "Given a map of {uid -> {:order [book-ids...] :unread #{book-ids...}}},
   compute the aggregate score for each book.
   Returns a map of {book-id -> {:score number :display string :voter-count int}}."
  [all-rankings]
  (let [;; Collect per-book scores from all members
        book-scores (atom {})]
    (doseq [[_uid ranking] all-rankings]
      (let [order  (or (:order ranking) [])
            total  (count order)]
        (doseq [[idx book-id] (map-indexed vector order)]
          (let [{:keys [raw]} (rank->score idx total)]
            (swap! book-scores update book-id
                   (fn [scores] (conj (or scores []) raw)))))))
    ;; Average scores per book
    (into {}
          (map (fn [[book-id scores]]
                 (let [avg   (/ (reduce + scores) (count scores))
                       display (cond
                                 (> avg 5.0) "5+"
                                 (< avg 1.0) "1-"
                                 :else       (.toFixed avg 1))]
                   [book-id {:score       avg
                             :display     display
                             :voter-count (count scores)}]))
               @book-scores))))
