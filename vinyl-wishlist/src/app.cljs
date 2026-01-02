(ns app
  (:require [reagent.core :as r]
            [reagent.dom :as rdom]
            [clojure.string :as str]))

;; -- Configuration --
(def SHEET_URL "https://docs.google.com/spreadsheets/d/1FT3dLkCfLyADcXuJX0qUmzDUmwp8f5Z-bTbs3JMA1Ww/export?format=csv&gid=966829031")
(def RESULTS_CSV_URL "https://docs.google.com/spreadsheets/d/1p7pwFov8CkxI7sWDfD1U6GtVmEeAUnvtBjXm2JOuNVo/export?format=csv&gid=1353005108")
(def BACKEND_URL "https://script.google.com/macros/s/AKfycbyufh6gKJYfgvad6Tb3muSrJ1cgNElo8K_s_lvspCy0zyGmCsP6KADEsiloPSsuPC0Z/exec")

;; -- Interop --
(def openskill js/openskill)
(def Papa js/Papa)

;; -- State --
(defonce current-user (r/atom nil))
(defonce albums (r/atom [])) ;; Start empty
(defonce history (r/atom []))
(defonce login-name (r/atom ""))
(defonce loading (r/atom true))
(defonce error-msg (r/atom nil))
(defonce sync-status (r/atom nil))
(defonce current-tab (r/atom :explore)) ;; :rank or :explore
(defonce explore-tab (r/atom :genres)) ;; :genres, :splom, :facets, :3d, or :2d-growth
(defonce fixed-album (r/atom nil)) ;; Fixed album ID for King of the Hill mode
(defonce is-acid (r/atom false))
(defonce facet-metric (r/atom :spotify_popularity)) ;; Default for facet view

(defn toggle-acid! []
  (swap! is-acid not)
  (if @is-acid
    (-> js/document .-body .-classList (.add "acid-mode"))
    (-> js/document .-body .-classList (.remove "acid-mode"))))

;; -- Persistence Helper --
(defn get-storage-key [key-type username]
  (if username
    (str "vinyl_ranker_" key-type "_" username)
    (str "vinyl_ranker_" key-type)))

(def default-mu 25.0)
(def default-sigma 8.333)

(defn load-user-data! [username]
  (let [ratings-key (get-storage-key "ratings" username)
        history-key (get-storage-key "history" username)
        stored-ratings (.getItem js/localStorage ratings-key)
        stored-history (.getItem js/localStorage history-key)]
    
    ;; Load ratings
    (if stored-ratings
      (let [saved (js->clj (js/JSON.parse stored-ratings) :keywordize-keys true)
            ;; Merge logic: Keep saved mu/sigma for IDs that exist in current albums
            merged (mapv (fn [sheet-item] 
                           (if-let [saved-item (some #(when (= (:id %) (:id sheet-item)) %) saved)]
                             (merge sheet-item (select-keys saved-item [:mu :sigma]))
                             sheet-item)) 
                         @albums)]
        (reset! albums merged))
      nil)

    ;; Load history
    (if stored-history
      (reset! history (js->clj (js/JSON.parse stored-history) :keywordize-keys true))
      (reset! history []))))

;; -- JSONP Data Fetching --
(defn parse-jsonp-data [data]
  (let [cols (-> data .-table .-cols js->clj)
        rows (-> data .-table .-rows js->clj)
        col-map (zipmap (map #(get % "label") cols) (range))
        idx-artist (get col-map "artist")
        idx-album (get col-map "album")
        idx-discogs-image (get col-map "cover_image_url")
        idx-wiki-image (get col-map "wikipedia_image_url")
        idx-itunes-image (get col-map "itunes_image_url")
        idx-id (get col-map "discogs_id")
        idx-pop (get col-map "spotify_popularity")
        idx-rating (get col-map "discogs_rating")
        idx-rating-count (get col-map "discogs_rating_count")
        idx-price (get col-map "price_median")
        idx-have (get col-map "have")
        idx-want (get col-map "want")
        idx-for-sale (get col-map "for_sale")
        idx-for-sale (get col-map "for_sale")
        idx-genres (get col-map "spotify_genres")
        idx-desc (get col-map "release_description")]
    
    (->> rows
         (map (fn [row]
                (let [cells (get row "c")
                      get-val (fn [idx] (when idx (get (get cells idx) "v")))
                      discogs-id (get-val idx-id)
                      title (str (get-val idx-artist) " - " (get-val idx-album))
                      price-str (str (get-val idx-price))
                      price-clean (if price-str (js/parseFloat (str/replace price-str #"[^0-9.]" "")) 0)]
                  {:id (if (and discogs-id (not (empty? (str discogs-id))))
                         (str discogs-id)
                         title) ;; Fallback to Title only if Discogs ID is missing
                   :title title
                   :artist (get-val idx-artist)
                   :album (get-val idx-album)
                   :release_description (get-val idx-desc)
                   :spotify_popularity (js/parseInt (get-val idx-pop))
                   :discogs_rating (js/parseFloat (get-val idx-rating))
                   :discogs_rating_count (js/parseInt (get-val idx-rating-count))
                   :price_median price-clean
                   :discogs_have (js/parseInt (get-val idx-have))
                   :discogs_want (js/parseInt (get-val idx-want))
                   :discogs_for_sale (js/parseInt (get-val idx-for-sale))
                   :spotify_genres (get-val idx-genres)
                   ;; Image Priority: iTunes (High Res) > Wiki > Discogs
                   :image_url (or (get-val idx-itunes-image) (get-val idx-wiki-image) (get-val idx-discogs-image))
                   :mu default-mu
                   :sigma default-sigma})))
         (filter #(not (empty? (:title %))))
         (vec))))

(defn handle-jsonp-response [data]
  (try
    (let [parsed (parse-jsonp-data data)]
      (reset! albums parsed)
      (reset! loading false))
    (catch :default e
      (reset! error-msg (str "JSONP Parse Error: " e))
      (reset! loading false))))

(set! (.-loadRatings js/window) handle-jsonp-response)

(defn fetch-data! []
  (reset! loading true)
  (let [unique-id (.now js/Date)
        script (.createElement js/document "script")
        url (str "https://docs.google.com/spreadsheets/d/1FT3dLkCfLyADcXuJX0qUmzDUmwp8f5Z-bTbs3JMA1Ww/gviz/tq?tqx=responseHandler:loadRatings&gid=966829031&_t=" unique-id)]
    (set! (.-src script) url)
    (set! (.-onerror script) (fn [] 
                               (reset! error-msg "Failed to load data from Google Sheets") 
                               (reset! loading false)))
    (.appendChild js/document.body script)))

;; -- TrueSkill Logic --
(defn rate-pair [winner loser]
  (let [rating-w {:mu (:mu winner) :sigma (:sigma winner)}
        rating-l {:mu (:mu loser) :sigma (:sigma loser)}
        js-args (clj->js [[rating-w] [rating-l]])
        js-opts (clj->js {:rank [0 1]})
        raw-result (openskill.rate js-args js-opts)
        w-obj (aget raw-result 0 0)
        l-obj (aget raw-result 1 0)
        new-w {:mu (.-mu w-obj) :sigma (.-sigma w-obj)}
        new-l {:mu (.-mu l-obj) :sigma (.-sigma l-obj)}]
    [new-w new-l]))

(defn update-ratings! [winner-id loser-id]
  (try
    (let [current-albums @albums
          winner (some #(when (= (:id %) winner-id) %) current-albums)
          loser (some #(when (= (:id %) loser-id) %) current-albums)]
      
      (let [[new-w new-l] (rate-pair winner loser)]
        (swap! albums 
               (fn [current]
                 (mapv (fn [a]
                         (cond
                           (= (:id a) winner-id) 
                             (assoc a :mu (:mu new-w) :sigma (:sigma new-w))
                           (= (:id a) loser-id) 
                             (assoc a :mu (:mu new-l) :sigma (:sigma new-l))
                           :else a))
                       current)))
        
        (swap! history conj {:winner winner-id :loser loser-id :timestamp (.now js/Date)})
        
        (when @current-user
          (let [ratings-key (get-storage-key "ratings" @current-user)
                history-key (get-storage-key "history" @current-user)]
            (.setItem js/localStorage history-key (js/JSON.stringify (clj->js @history)))
            (.setItem js/localStorage ratings-key (js/JSON.stringify (clj->js @albums)))))))
    (catch :default e
      (js/console.error "Error in update-ratings!:" e))))

;; -- Cloud Sync (CSV Reading) --

(defn replay-history! [csv-data]
  (js/console.log "Replaying" (count csv-data) "records from cloud...")
  (let [headers (first csv-data)
        rows (rest csv-data)
        ;; Assuming strict column order from appendRow: Timestamp,WinnerID,LoserID,User
        idx-winner 1 
        idx-loser 2
        idx-user 3
        my-user @current-user]
    
    (let [user-rows (filter #(= (nth % idx-user nil) my-user) rows)]
      (js/console.log "Found" (count user-rows) "matches for user" my-user)
      
      (when (seq user-rows)
        ;; Reset to defaults before replay
        (swap! albums (fn [current] (mapv #(assoc % :mu default-mu :sigma default-sigma) current)))
        (reset! history [])
  
        (doseq [row user-rows]
          (let [w-id (nth row idx-winner)
                l-id (nth row idx-loser)
                ts (nth row 0)]
            (try
               (let [current-albums @albums
                     winner (some #(when (= (:id %) w-id) %) current-albums)
                     loser (some #(when (= (:id %) l-id) %) current-albums)]
                 (when (and winner loser)
                   (let [[new-w new-l] (rate-pair winner loser)]
                     ;; Update atoms silently
                     (swap! albums 
                        (fn [current]
                          (mapv (fn [a]
                                  (cond
                                    (= (:id a) w-id) (assoc a :mu (:mu new-w) :sigma (:sigma new-w))
                                    (= (:id a) l-id) (assoc a :mu (:mu new-l) :sigma (:sigma new-l))
                                    :else a))
                                current)))
                     (swap! history conj {:winner w-id :loser l-id :timestamp ts}))))
               (catch :default e (js/console.error "Replay error:" e)))))
        
        ;; Save finalized state
        (when @current-user
           (let [ratings-key (get-storage-key "ratings" @current-user)
                 history-key (get-storage-key "history" @current-user)]
             (.setItem js/localStorage history-key (js/JSON.stringify (clj->js @history)))
             (.setItem js/localStorage ratings-key (js/JSON.stringify (clj->js @albums)))))))))

(defn fetch-history-csv! []
  (reset! loading true)
  (reset! error-msg nil)
  (js/console.log "Fetching cloud history from" RESULTS_CSV_URL)
  (.parse Papa RESULTS_CSV_URL
          (clj->js {:download true
                    :complete (fn [results]
                                (let [data (.-data results)]
                                  (replay-history! data)
                                  (reset! loading false)))
                    :error (fn [err] 
                             (js/console.error "CSV Fetch Error:" err)
                             (reset! error-msg (str "Cloud Sync Failed: " (.-message err) ". (Try disabling ad-blocker or check console)"))
                             (reset! loading false))})))

;; -- Login / Logout (Defined AFTER fetch functions) --

(defn login! []
  (let [name @login-name]
    (when (not (empty? name))
      (reset! current-user name)
      (load-user-data! name) 
      (fetch-history-csv!))))

(defn logout! []
  (reset! current-user nil)
  (reset! login-name "")
  ;; Reload base data to clear any user-specific mu/sigma changes
  (fetch-data!) 
  (reset! history []))

;; -- Matchmaking & Saving --

(defn send-data! [data callback]
  (let [params (js/URLSearchParams.)]
    (doseq [[k v] data]
      (.append params (name k) v))
    (let [url (str BACKEND_URL "?" (.toString params))]
      (-> (js/fetch url (clj->js {:method "GET" :mode "no-cors"}))
          (.then #(do (js/console.log "Sent data:" data) (when callback (callback))))
          (.catch #(js/console.error "Send error:" %))))))

(defn save-match! [winner-id loser-id]
  (let [user (or @current-user "anonymous")]
    (send-data! {:winner winner-id :loser loser-id :user user :timestamp (.now js/Date)} nil)))

(defn pick-pair []
  (let [all @albums
        fixed-id @fixed-album]
    (if (< (count all) 2)
      nil
      (if (and fixed-id (some #(= (:id %) fixed-id) all))
        ;; Case 1: Fixed Album exists
        (let [a (first (filter #(= (:id %) fixed-id) all))
              b (rand-nth (filter #(not= (:id %) fixed-id) all))]
          [a b])
        ;; Case 2: Random Pair
        (let [a (rand-nth all)
              b (rand-nth (filter #(not= (:id %) (:id a)) all))]
          [a b])))))

(defonce current-pair (r/atom nil))
(defonce current-pair (r/atom nil))

(add-watch albums :pair-watcher
  (fn [_ _ _ new-state]
    (when (and (empty? @current-pair) (>= (count new-state) 2))
      (reset! current-pair (pick-pair)))))

(defn handle-vote [winner-id loser-id]
  (update-ratings! winner-id loser-id)
  (save-match! winner-id loser-id)
  (reset! current-pair (pick-pair)))

(defn export-csv []
  (let [headers "winner_id,loser_id,timestamp\n"
        rows (map #(str (:winner %) "," (:loser %) "," (:timestamp %)) @history)
        csv-content (str headers (clojure.string/join "\n" rows))
        blob (js/Blob. #js [csv-content] #js {:type "text/csv;charset=utf-8;"})
        url (js/URL.createObjectURL blob)
        link (.createElement js/document "a")]
    (.setAttribute link "href" url)
    (.setAttribute link "download" (str "ranker_history_" @current-user ".csv"))
    (.appendChild js/document.body link)
    (.click link)
    (.removeChild js/document.body link)))

(defn score [album]
  (- (:mu album) (* 3 (:sigma album))))

;; -- UI Components --

(defn movie-card [movie on-click is-fixed on-toggle-fix]
  [:div.movie-card {:on-click on-click
                    :class (when is-fixed "fixed")}
   [:button.fix-btn {:on-click (fn [e] 
                               (.stopPropagation e)
                               (on-toggle-fix))}
    (if is-fixed "📌 Keep" "📌 Pin")]
   [:img.movie-image {:src (or (:image_url movie) "https://via.placeholder.com/300")}]
   [:div.movie-title (:title movie)]
   [:div.text-accent {:style {:font-size "0.8em" :margin-top "5px"}}
    (str "Est. Rating (\u03bc): " (.toFixed (:mu movie) 2))]])

;; -- Stats Helper --
(defn mean [coll]
  (if (empty? coll) 0 (/ (reduce + coll) (count coll))))

(defn standard-deviation [coll]
  (let [avg (mean coll)
        squares (map #(Math/pow (- % avg) 2) coll)]
    (Math/sqrt (/ (reduce + squares) (count coll)))))

(defn simple-regression [xs ys]
  (let [n (count xs)
        sum-x (reduce + xs)
        sum-y (reduce + ys)
        sum-xx (reduce + (map #(* % %) xs))
        sum-xy (reduce + (map * xs ys))
        slope (/ (- (* n sum-xy) (* sum-x sum-y))
                 (- (* n sum-xx) (* sum-x sum-x)))
        intercept (/ (- sum-y (* slope sum-x)) n)
        
        ;; Standard Error of Estimate
        residuals (map (fn [x y] (Math/pow (- y (+ intercept (* slope x))) 2)) xs ys)
        ss-res (reduce + residuals)
        s-err (Math/sqrt (/ ss-res (- n 2)))]
    {:slope slope 
     :intercept intercept
     :s-err s-err
     :n n
     :mean-x (/ sum-x n)
     :ss-x (- sum-xx (/ (* sum-x sum-x) n))}))

(defn predict-with-bands [model x t-score]
  (let [{:keys [slope intercept s-err n mean-x ss-x]} model
        y-pred (+ intercept (* slope x))
        se-pred (* s-err (Math/sqrt (+ (/ 1 n) (/ (Math/pow (- x mean-x) 2) ss-x))))
        margin (* t-score se-pred)]
    {:y y-pred
     :lower (- y-pred margin)
     :upper (+ y-pred margin)}))

(defn comparison-view []
  (cond 
    @loading [:div "Loading data..."]
    (nil? @current-pair) [:div "Not enough data to rank."]
    :else
    (let [[a b] @current-pair]
      [:div
       [:h2 "If you could only keep one, which one would it be?"]
       [:div.comparison-container
        [movie-card a 
         #(handle-vote (:id a) (:id b)) 
         (= (:id a) @fixed-album)
         #(if (= (:id a) @fixed-album)
            (reset! fixed-album nil)
            (reset! fixed-album (:id a)))]
        
        [movie-card b 
         #(handle-vote (:id b) (:id a))
         (= (:id b) @fixed-album)
         #(if (= (:id b) @fixed-album)
            (reset! fixed-album nil)
            (reset! fixed-album (:id b)))]]])))

(defn leaderboard-view []
  (if @loading 
    nil
    (let [sorted (sort-by score > @albums)
          [top-50 rest-albums] (split-at 50 sorted)]
      [:div.leaderboard
       [:h2 "Current Rankings"]
       [:table
        [:thead
         [:tr
           [:th "Rank"]
           [:th "Album"]
           [:th "Ranking Score (\u03bc - 3\u03c3)"]
           [:th "Est. Rating (\u03bc)"]
           [:th "Uncertainty (\u03c3)"]
           [:th "Actions"]]]
        [:tbody
         (doall
           (map-indexed 
             (fn [idx album]
               [:tr {:key (:id album)}
                [:td.rank-cell (inc idx)]
                [:td (:title album)]
                [:td.score-cell (.toFixed (score album) 3)]
                [:td.score-cell (.toFixed (:mu album) 2)]
                [:td.score-cell (.toFixed (:sigma album) 2)]
                [:td 
                 [:button.rank-action-btn
                          {:on-click #(do 
                                        (reset! fixed-album (:id album))
                                        (reset! current-pair (pick-pair))
                                        (reset! current-tab :rank))}
                  "Rank"]]])
             top-50))
         (when (seq rest-albums)
           [:<>
            [:tr {:key "divider"}
             [:td {:col-span 6 :class "text-center text-accent" :style {:letter-spacing "2px" :text-transform "uppercase" :padding "20px 0"}} 
              "Below Top 50"]]
            (doall
              (map-indexed 
                (fn [idx album]
                  [:tr {:key (:id album) :class "text-accent" :style {:opacity "0.5"}}
                   [:td.rank-cell (+ 51 idx)]
                   [:td (:title album)]
                   [:td.score-cell (.toFixed (score album) 3)]
                   [:td.score-cell (.toFixed (:mu album) 2)]
                   [:td.score-cell (.toFixed (:sigma album) 2)]
                   [:td 
                     [:button.rank-action-btn
                              {:on-click #(do 
                                            (reset! fixed-album (:id album))
                                            (reset! current-pair (pick-pair))
                                            (reset! current-tab :rank))}
                      "Rank"]]])
                 rest-albums))])]]])))

;; -- Explore View (Plotly) --


;; -- Math Helpers (Linear Algebra for Regression) --

(defn matrix-transpose [m]
  (apply mapv vector m))

(defn dot-product [v1 v2]
  (reduce + (map * v1 v2)))

(defn matrix-multiply [A B]
  (let [Bt (matrix-transpose B)]
    (mapv (fn [row] (mapv #(dot-product row %) Bt)) A)))

(defn matrix-vector-multiply [A v]
  (mapv #(dot-product % v) A))

;; Gaussian Elimination to solve Ax = b
(defn solve-linear-system [A b]
  (let [n (count A)
        ;; Augment A with b
        aug (mapv conj A b)
        
        ;; Forward Elimination
        triangular (loop [mat aug
                          i 0]
                     (if (>= i n)
                       mat
                       (let [pivot-row (nth mat i)
                             pivot-val (nth pivot-row i)]
                         (if (zero? pivot-val)
                           mat ;; Should handle swap, but assuming solved for now
                           (let [norm-row (mapv #(/ % pivot-val) pivot-row)
                                 new-mat (map-indexed 
                                           (fn [idx row]
                                             (if (or (<= idx i) (zero? (nth row i)))
                                               (if (= idx i) norm-row row)
                                               (let [factor (nth row i)]
                                                 (mapv - row (mapv #(* % factor) norm-row)))))
                                           mat)]
                             (recur new-mat (inc i)))))))
        
        ;; Back Substitution
        solution (loop [i (dec n)
                        sol (vec (repeat n 0))]
                   (if (< i 0)
                     sol
                     (let [row (nth triangular i)
                           val (last row) ;; The b' terms
                           params (take n row) ;; The x terms
                           known-sum (reduce + (map-indexed (fn [k co] (* co (nth sol k))) params))
                           ;; The current x coefficient is 1.0 due to normalization
                           result (- val known-sum)]
                       (recur (dec i) (assoc sol i result)))))]
    solution))

(defn fit-quadratic-surface [points]
  ;; points is list of [x y z]
  ;; Model: z = a + bx + cy + dx^2 + ey^2 + fxy
  ;; Design Matrix Row: [1, x, y, x*x, y*y, x*y]
  (let [X (mapv (fn [[x y _]] 
                  [1 x y (* x x) (* y y) (* x y)]) 
                points)
        Y (mapv last points)
        Xt (matrix-transpose X)
        XtX (matrix-multiply Xt X)
        XtY (matrix-vector-multiply Xt Y)
        beta (solve-linear-system XtX XtY)]
    beta))

(defn fit-linear-surface [points]
  ;; points is list of [x y z]
  ;; Model: z = a + bx + cy
  ;; Design Matrix Row: [1, x, y]
  (let [X (mapv (fn [[x y _]] 
                  [1 x y]) 
                points)
        Y (mapv last points)
        Xt (matrix-transpose X)
        XtX (matrix-multiply Xt X)
        XtY (matrix-vector-multiply Xt Y)
        beta (solve-linear-system XtX XtY)]
    beta))

;; -- Explore View (Plotly) --

(defn make-linear-surface-grid [coefs x-range y-range steps]
  (let [[min-x max-x] x-range
        [min-y max-y] y-range
        step-x (/ (- max-x min-x) steps)
        step-y (/ (- max-y min-y) steps)
        xs (range min-x (+ max-x step-x) step-x)
        ys (range min-y (+ max-y step-y) step-y)
        [a b c] coefs]
    {:x xs
     :y ys
     :z (mapv (fn [y]
                (mapv (fn [x]
                        (let [val (+ a (* b x) (* c y))
                              ;; Model Z-Clamping
                              clamped-val (Math/max (Math/min val 5) -1)]
                          (Math/pow 10 clamped-val)))
                      xs))
              ys)}))

(defn make-surface-grid [coefs x-range y-range steps]
  (let [[min-x max-x] x-range
        [min-y max-y] y-range
        step-x (/ (- max-x min-x) steps)
        step-y (/ (- max-y min-y) steps)
        xs (range min-x (+ max-x step-x) step-x)
        ys (range min-y (+ max-y step-y) step-y)
        [a b c d e f] coefs]
    {:x xs
     :y ys
     :z (mapv (fn [y]
                (mapv (fn [x]
                        (let [val (+ a 
                                     (* b x) 
                                     (* c y) 
                                     (* d x x) 
                                     (* e y y) 
                                     (* f x y))
                              ;; Model Z-Clamping: Prevent surface from exploding outside data z-range
                              clamped-val (Math/max (Math/min val 5) -1)] ;; Assuming Log Price roughly -1 to 5
                          (Math/pow 10 clamped-val)))
                      xs))
              ys)}))

(defn draw-3d-plot [data]
  (let [node (.getElementById js/document "plotly-3d-container")
        ;; Filter valid data
        valid (filter #(and (:spotify_popularity %) 
                            (:discogs_rating %) 
                            (:price_median %)
                            (> (:price_median %) 0)) 
                      data)
        
        ;; Prepare Data for Regression [Pop, Rating, Log(Price)]
        points (map (fn [d] [(:spotify_popularity d) 
                             (:discogs_rating d) 
                             (Math/log10 (:price_median d))]) 
                    valid)
        
        ;; Fit Model
        coefs (fit-quadratic-surface points)
        
        ;; Generate Surface Grid
        xs (map first points)
        ys (map second points)
        surface (if (seq points)
                  (make-surface-grid coefs 
                                     [(apply min xs) (apply max xs)] 
                                     [(apply min ys) (apply max ys)] 
                                     20)
                  nil)
        
        scatter-trace {:x (map :spotify_popularity valid)
                       :y (map :discogs_rating valid)
                       :z (map :price_median valid)
                       :text (map #(str "Artist: " (:artist %) "<br>Album: " (:album %) "<br>Info: " (:release_description %)) valid)
                       :mode "markers"
                       :type "scatter3d"
                       :name "Albums"
                       :marker {:size 4 
                                :color (map :spotify_popularity valid) 
                                :colorscale "Viridis"
                                :opacity 0.8}}
                                
        surface-trace (when surface
                        {:type "surface"
                         :x (:x surface)
                         :y (:y surface)
                         :z (:z surface)
                         :opacity 0.4
                         :colorscale "Greys"
                         :showscale false
                         :name "Quadratic Fit"
                         :hoverinfo "skip"})
                         
        traces (if surface-trace [surface-trace scatter-trace] [scatter-trace])
        
        ;; Calculate Bounds
        x-min (if (seq points) (apply min xs) 0)
        x-max (if (seq points) (apply max xs) 100)
        y-min (if (seq points) (apply min ys) 0)
        y-max (if (seq points) (apply max ys) 5)
        price-min (apply min (map :price_median valid))
        price-max (apply max (map :price_median valid))

        layout {:title {:text "Collection Inspect: Pop vs Rating vs Price" :font {:color "#fff"}}
                :paper_bgcolor "#1e1e1e"
                :plot_bgcolor "#1e1e1e"
                :font {:color "#ddd" :family "Roboto Mono, monospace"}
                :scene {:xaxis {:title "Spot. Pop" :color "#ddd" :gridcolor "#444" :zerolinecolor "#444" :showbackground true :backgroundcolor "#1e1e1e"}
                        :yaxis {:title "Rating" :color "#ddd" :gridcolor "#444" :zerolinecolor "#444" :showbackground true :backgroundcolor "#1e1e1e"}
                        :zaxis {:title "Price (€)" :type "log" :color "#ddd" :gridcolor "#444" :zerolinecolor "#444" :showbackground true :backgroundcolor "#1e1e1e"
                                :range [(Math/log10 (Math/max 0.1 price-min)) (Math/log10 price-max)]}
                        :bgcolor "#1e1e1e"
                        :camera {:eye {:x 1.5 :y 1.5 :z 1.5}}}
                :margin {:l 0 :r 0 :b 0 :t 50}
                :height 600}]
    (when node
      (js/Plotly.newPlot node (clj->js traces) (clj->js layout)))))

(defn draw-3d-demand-plot [data]
  (let [node (.getElementById js/document "plotly-3d-demand-container")
        ;; Filter valid data
        valid (filter #(and (:discogs_have %) 
                            (:discogs_want %)
                            (:discogs_for_sale %)
                            (:price_median %)
                            (> (:discogs_have %) 0)
                            (> (:discogs_for_sale %) 0)
                            (> (:price_median %) 0)) 
                      data)
        
        ;; Prepare Data [Log(Want/Have), Log(Sale), Log(Price)]
        points (map (fn [d] [(Math/log10 (/ (:discogs_want d) (:discogs_have d))) ;; X: Log Demand Ratio
                             (Math/log10 (:discogs_for_sale d))                   ;; Y: Log Supply
                             (Math/log10 (:price_median d))])                     ;; Z: Log Price
                    valid)
        
        ;; Fit Model (Linear Plane)
        coefs (fit-linear-surface points)
        
        ;; Generate Surface Grid
        xs (map first points)
        ys (map second points)
        surface (if (seq points)
                  (let [grid (make-linear-surface-grid coefs 
                                                       [(apply min xs) (apply max xs)] 
                                                       [(apply min ys) (apply max ys)] 
                                                       20)]
                    ;; Convert grid X (Log Ratio) back to Linear for Log-Axis Plot
                    (update grid :x (fn [log-xs] (mapv #(Math/pow 10 %) log-xs))))
                  nil)
        
        scatter-trace {:x (map #(Math/pow 10 (first %)) points) ;; Convert X back to Linear
                       :y (map second points)
                       :z (map #(Math/pow 10 (nth % 2)) points) ;; Convert Z back to Linear
                       :text (map #(str "Artist: " (:artist %) "<br>Ratio (W/H): " (.toFixed (/ (:discogs_want %) (:discogs_have %)) 2)) valid)
                       :mode "markers"
                       :type "scatter3d"
                       :name "Albums"
                       :marker {:size 4 
                                :color (map first points) ;; Color by Log Ratio 
                                :colorscale "Viridis"
                                :opacity 0.8}}
                                
        surface-trace (when surface
                        {:type "surface"
                         :x (:x surface)
                         :y (:y surface)
                         :z (:z surface)
                         :opacity 0.4
                         :colorscale "Greys"
                         :showscale false
                         :name "Linear Fit"
                         :hoverinfo "skip"})
                         
        traces (if surface-trace [surface-trace scatter-trace] [scatter-trace])
        
        ;; Calculate Bounds
        x-min (if (seq points) (apply min xs) 0)
        x-max (if (seq points) (apply max xs) 1)
        y-min (if (seq points) (apply min ys) 0)
        y-max (if (seq points) (apply max ys) 1)
        price-min (apply min (map :price_median valid))
        price-max (apply max (map :price_median valid))

        layout {:title {:text "Supply & Demand: Want/Have vs For Sale vs Price" :font {:color "#fff"}}
                :paper_bgcolor "#1e1e1e"
                :plot_bgcolor "#1e1e1e"
                :font {:color "#ddd" :family "Roboto Mono, monospace"}
                :scene {:xaxis {:title "Want/Have Ratio" :type "log" :color "#ddd" :gridcolor "#444" :zerolinecolor "#444" :showbackground true :backgroundcolor "#1e1e1e"
                                :range [x-min x-max]} ;; Range is still in Logs, which Plotly expects
                        :yaxis {:title "Log(For Sale)" :color "#ddd" :gridcolor "#444" :zerolinecolor "#444" :showbackground true :backgroundcolor "#1e1e1e"
                                :range [y-min y-max]}
                        :zaxis {:title "Price (€)" :type "log" :color "#ddd" :gridcolor "#444" :zerolinecolor "#444" :showbackground true :backgroundcolor "#1e1e1e"
                                :range [(Math/log10 (Math/max 0.1 price-min)) (Math/log10 price-max)]}
                        :bgcolor "#1e1e1e"
                        :camera {:eye {:x 1.5 :y 1.5 :z 1.5}}}
                :margin {:l 0 :r 0 :b 0 :t 50}
                :height 600}]
    (when node
      (js/Plotly.newPlot node (clj->js traces) (clj->js layout)))))

(defn plot-3d-demand-view []
  (r/create-class
    {:component-did-mount
     (fn []
       (js/setTimeout #(draw-3d-demand-plot @albums) 100))
     :component-did-update
     (fn []
       (draw-3d-demand-plot @albums))
     :reagent-render
     (fn []
       @albums ;; Dereference to track
       [:div.plotly-container {:id "plotly-3d-demand-container" :style {:height "600px"}}])}))

(defn plot-3d-view []
  (r/create-class
    {:component-did-mount
     (fn []
       (js/setTimeout #(draw-3d-plot @albums) 100))
     :component-did-update
     (fn []
       (draw-3d-plot @albums))
     :reagent-render
     (fn []
       @albums ;; Dereference to track
       [:div.plotly-container {:id "plotly-3d-container" :style {:height "600px"}}])}))


(defn draw-2d-have-plot [data]
  (let [node (.getElementById js/document "plotly-2d-container")
        ;; Filter valid data for regression (must have > 0 for log)
        valid-data (filter #(and (:discogs_have %) (:spotify_popularity %) (> (:discogs_have %) 0)) data)
        
        xs-log (map #(Math/log10 (:discogs_have %)) valid-data)
        ys (map :spotify_popularity valid-data)
        
        ;; Calculate Regression
        model (simple-regression xs-log ys)
        
        ;; Generate points for lines (range of x)
        min-x (apply min xs-log)
        max-x (apply max xs-log)
        plot-xs (range min-x (+ max-x 0.1) 0.1)
        
        ;; T-scores (approx for n>30): 80% = 1.28, 90% = 1.645
        points-80 (map #(predict-with-bands model % 1.28) plot-xs)
        points-90 (map #(predict-with-bands model % 1.645) plot-xs)
        
        real-xs (map #(Math/pow 10 %) plot-xs) ;; Convert back for plotting on log-axis
        
        traces [
                ;; 90% Band
                {:x (concat real-xs (reverse real-xs))
                 :y (concat (map :upper points-90) (reverse (map :lower points-90)))
                 :fill "toself"
                 :fillcolor "rgba(255, 255, 255, 0.05)"
                 :line {:color "transparent"}
                 :name "90% Confidence"
                 :showlegend true
                 :hoverinfo "skip"}
                
                ;; 80% Band
                {:x (concat real-xs (reverse real-xs))
                 :y (concat (map :upper points-80) (reverse (map :lower points-80)))
                 :fill "toself"
                 :fillcolor "rgba(255, 255, 255, 0.1)"
                 :line {:color "transparent"}
                 :name "80% Confidence"
                 :showlegend true
                 :hoverinfo "skip"}
                
                ;; Regression Line
                {:x real-xs
                 :y (map :y points-80) ;; Mean prediction
                 :mode "lines"
                 :line {:color "rgba(255, 255, 255, 0.5)" :dash "dash" :width 2}
                 :name "Regression"
                 :hoverinfo "skip"}

                ;; Scatter Points
                {:x (map :discogs_have data)
                 :y (map :spotify_popularity data)
                 :text (map #(str "Artist: " (:artist %) "<br>Album: " (:album %)) data)
                 :mode "markers"
                 :type "scatter"
                 :name "Albums"
                 :marker {:size 10 
                          :color (map :spotify_popularity data) 
                          :colorscale "Viridis"
                          :opacity 1
                          :line {:color "white" :width 1}}}]
        
        layout {:title {:text "Market Reach: Discogs Owned vs. Spotify Popularity" :font {:color "#fff"}}
                :paper_bgcolor "#1e1e1e"
                :plot_bgcolor "#1e1e1e"
                :font {:color "#ddd" :family "Roboto Mono, monospace"}
                :xaxis {:title "Discogs Have (Collectors)" :type "log" :color "#ddd" :gridcolor "#444" :zerolinecolor "#444"}
                :yaxis {:title "Spotify Popularity (Streamers)" :color "#ddd" :gridcolor "#444" :zerolinecolor "#444"}
                :margin {:l 50 :r 20 :b 50 :t 50}
                :height 600
                :showlegend true
                :legend {:x 0 :y 1 :bgcolor "rgba(0,0,0,0.5)"}}]
    (when node
      (js/Plotly.newPlot node (clj->js traces) (clj->js layout)))))

(defn plot-2d-have-view []
  (r/create-class
    {:component-did-mount
     (fn []
       (js/setTimeout #(draw-2d-have-plot @albums) 100))
     
     :component-did-update
     (fn []
       (draw-2d-have-plot @albums))
     
     :reagent-render
     (fn []
       @albums ;; Dereference
       [:div.plotly-container {:id "plotly-2d-container" :style {:height "600px"}}])}))





(defn draw-splom-plot [data]
  (let [node (.getElementById js/document "plotly-splom-container")
        ;; Filter incomplete data (ensure all log targets are > 0)
        valid-data (filter #(and (:price_median %) (:discogs_have %) (:discogs_for_sale %) (:discogs_want %) (:discogs_rating_count %)
                                 (> (:price_median %) 0) (> (:discogs_have %) 0) (> (:discogs_for_sale %) 0) 
                                 (> (:discogs_want %) 0) (> (:discogs_rating_count %) 0)) 
                           data)
        
        ;; Linear Data Vectors
        pop (map :spotify_popularity valid-data)
        rating (map :discogs_rating valid-data)
        
        ;; Log Transformed Vectors
        rating-count-log (map #(Math/log10 (:discogs_rating_count %)) valid-data)
        want-log (map #(Math/log10 (:discogs_want %)) valid-data)
        have-log (map #(Math/log10 (:discogs_have %)) valid-data)
        sale-log (map #(Math/log10 (:discogs_for_sale %)) valid-data)
        price-log (map #(Math/log10 (:price_median %)) valid-data)
        want-have-ratio-log (map #(Math/log10 (/ (:discogs_want %) (:discogs_have %))) valid-data)

        text (map #(str (:artist %) " - " (:album %)) valid-data)

        traces [{:type "splom"
                 :dimensions [{:label "Pop" :values pop}
                              {:label "Rate" :values rating}
                              {:label "Count" :values rating-count-log}
                              {:label "Want" :values want-log}
                              {:label "Have" :values have-log}
                              {:label "Sale" :values sale-log}
                              {:label "Price" :values price-log}
                              {:label "W/H" :values want-have-ratio-log}]
                 :text text
                 :marker {:color price-log
                          :colorscale "Viridis"
                          :size 5
                          :line {:color "white" :width 0.5}}
                 :diagonal {:visible true}
                 :showupperhalf false}] ;; Hide upper half to reduce clutter and improve perf
                 
        layout {:title {:text "Collection Analysis Matrix (Scatter Plot Grid)" :font {:color "#fff"}}
                :paper_bgcolor "#1e1e1e"
                :plot_bgcolor "#1e1e1e"
                :font {:color "#ddd" :family "Roboto Mono, monospace" :size 9}
                ;; :height 800  <-- Removed to allow autosize
                :margin {:l 80 :r 20 :b 80 :t 80} ;; Increased margins for labels
                :hovermode "closest"
                :dragmode "select"
                :automargin true}]
    
    (when node
      (js/Plotly.newPlot node (clj->js traces) (clj->js layout)))))

(defn plot-splom-view []
  (r/create-class
    {:component-did-mount
     (fn []
       (js/setTimeout #(draw-splom-plot @albums) 100))
     :component-did-update
     (fn []
       (draw-splom-plot @albums))
     :reagent-render
     (fn []
       @albums ;; Dereference
       [:div.plotly-container {:id "plotly-splom-container" :style {:height "80vh"}}])}))

;; -- Facet View (Genre Distributions) --

(def facet-options
  [{:label "Spotify Popularity" :key :spotify_popularity :log? false}
   {:label "Discogs Rating" :key :discogs_rating :log? false}
   {:label "Median Price" :key :price_median :log? true}
   {:label "Have Count" :key :discogs_have :log? true}
   {:label "Want Count" :key :discogs_want :log? true}
   {:label "Want/Have Ratio" :key :want_have_ratio :log? true}])

(defn draw-facet-plot [data]
  (let [node (.getElementById js/document "plotly-facet-container")
        ;; Pre-process data to include derived ratio
        processed-data (map (fn [d]
                              (assoc d :want_have_ratio 
                                     (if (and (:discogs_have d) (pos? (:discogs_have d)) (:discogs_want d))
                                       (/ (:discogs_want d) (:discogs_have d))
                                       0)))
                            data)
                            
        metric-info (some #(when (= (:key %) @facet-metric) %) facet-options)
        key-fn (:key metric-info)
        use-log? (:log? metric-info)
        
        ;; Filter valid data
        valid (filter #(and (key-fn %)
                            (> (key-fn %) 0)
                            (:spotify_genres %)) 
                      processed-data)
        
        ;; 1. Identify Top 15 Genres
        genre-counts (reduce (fn [acc album]
                               (let [genres (-> (:spotify_genres album)
                                                (str "")
                                                (str/split #",\s*")
                                                (->> (remove empty?)
                                                     (map str/trim)
                                                     (map str/lower-case)))]
                                 (reduce #(update %1 %2 (fnil inc 0)) acc genres)))
                             {}
                             data)
        top-genres (->> genre-counts
                        (sort-by val >)
                        (take 15)
                        (map first)
                        (set))
        
        ;; 2. Unroll Data: Album -> [ {genre, val} ... ]
        plot-data (reduce (fn [acc album]
                            (let [val (key-fn album)
                                  genres (-> (:spotify_genres album)
                                             (str "")
                                             (str/split #",\s*")
                                             (->> (remove empty?)
                                                  (map str/trim)
                                                  (map str/lower-case)
                                                  (filter top-genres)))]
                              (if (and val (> val 0))
                                (into acc (map #(hash-map :y % :x val :text (:title album)) genres)) ;; Pass raw value!
                                acc)))
                          []
                          valid)
        
        ;; 3. Sort by Median of input (optional, but helps layout)
        
        traces [{:type "box"
                 :y (map :y plot-data)
                 :x (map :x plot-data)
                 :text (map :text plot-data)
                 :orientation "h"
                 :boxpoints "all"
                 :jitter 0.3
                 :pointpos -1.8
                 :marker {:color "#39FF14" :size 3 :opacity 0.6}
                 :line {:color "#ddd" :width 1}
                 :fillcolor "rgba(255,255,255,0.05)"}]
                 
        layout {:title {:text (str "Distributions by Genre: " (:label metric-info)) 
                        :font {:color "#fff"}}
                :paper_bgcolor "#1e1e1e"
                :plot_bgcolor "#1e1e1e"
                :font {:color "#ddd" :family "Roboto Mono, monospace"}
                :xaxis {:title (:label metric-info) 
                        :color "#ddd" 
                        :gridcolor "#444" 
                        :zerolinecolor "#444"
                        :type (if use-log? "log" "linear")} ;; Native Plotly Log Scale
                :yaxis {:color "#ddd" :gridcolor "#444" :zerolinecolor "#444" :automargin true}
                :margin {:l 100 :r 20 :b 50 :t 50}
                :showlegend false}]
    
    (when node
      (js/Plotly.newPlot node (clj->js traces) (clj->js layout)))))

(defn plot-facet-view []
  (r/create-class
    {:component-did-mount
     (fn []
       (js/setTimeout #(draw-facet-plot @albums) 100))
     :component-did-update
     (fn []
       (draw-facet-plot @albums))
     :reagent-render
     (fn []
       @albums 
       [:div
        [:div.facet-controls {:style {:display "flex" :justify-content "center" :gap "10px" :margin-bottom "15px" :flex-wrap "wrap"}}
         (doall
           (for [opt facet-options]
             [:button {:key (:key opt)
                       :on-click #(reset! facet-metric (:key opt))
                       :class (when (= @facet-metric (:key opt)) "active")}
              (:label opt)]))]
        [:div.plotly-container {:id "plotly-facet-container" :style {:height "80vh"}}]])}))



(defn draw-genre-plot [data]
  (let [node (.getElementById js/document "plotly-genre-container")
        ;; Process Genres into {genre [albums...]} map
        genre-map (reduce (fn [acc album]
                            (let [genres (-> (:spotify_genres album)
                                             (str "")
                                             (str/split #",\s*")
                                             (->> (remove empty?)
                                                  (map str/trim)
                                                  (map str/lower-case)))]
                              (reduce (fn [sub-acc g]
                                        (update sub-acc g conj (:title album)))
                                      acc
                                      genres)))
                          {}
                          data)
        
        ;; Sort by count (number of albums)
        sorted-genres (take 20 (sort-by #(count (val %)) > genre-map))
        
        labels (map first sorted-genres)
        values (map #(count (second %)) sorted-genres)
        ;; Create hover text: Join top 5 albums + "and X more..."
        hover-texts (map (fn [[_ albums]]
                           (let [top (take 10 albums)
                                 remaining (- (count albums) 10)]
                             (str (str/join "<br>" top)
                                  (when (> remaining 0) 
                                    (str "<br>... and " remaining " more")))))
                         sorted-genres)
        
        traces [{:y labels
                 :x values
                 :type "bar"
                 :orientation "h"
                 :marker {:color values 
                          :colorscale "Viridis"}
                 :text values
                 :textposition "auto"
                 :hovertext hover-texts
                 :hoverinfo "text"}] ;; Use custom hover text
        
        layout {:title {:text "Top 20 Music Genres in Collection" :font {:color "#fff"}}
                :paper_bgcolor "#1e1e1e"
                :plot_bgcolor "#1e1e1e"
                :font {:color "#ddd" :family "Courier New, monospace"}
                :xaxis {:title "Count" :color "#ddd" :gridcolor "#444" :zerolinecolor "#444"}
                :yaxis {:title "Genre" :color "#ddd" :gridcolor "#444" :zerolinecolor "#444" :autorange "reversed"}
                :margin {:l 150 :r 20 :b 50 :t 50}}]
                ;; :height 600 <-- Removed
    
    (when node
      (js/Plotly.newPlot node (clj->js traces) (clj->js layout)))))

(defn plot-genre-view []
  (r/create-class
    {:component-did-mount
     (fn []
       (js/setTimeout #(draw-genre-plot @albums) 100))
     :component-did-update
     (fn []
       (draw-genre-plot @albums))
     :reagent-render
     (fn []
       @albums ;; Dereference
       [:div.plotly-container {:id "plotly-genre-container" :style {:height "80vh"}}])}))

(defn explore-view []
  [:div
   [:div.explore-tabs
    [:button {:on-click #(reset! explore-tab :genres)
              :class (when (= @explore-tab :genres) "active")}
     "Genres"]
    [:button {:on-click #(reset! explore-tab :splom)
              :class (when (= @explore-tab :splom) "active")}
     "Matrix"]
    [:button {:on-click #(reset! explore-tab :facets)
              :class (when (= @explore-tab :facets) "active")}
     "Facets"]
    [:button {:on-click #(reset! explore-tab :3d)
              :class (when (= @explore-tab :3d) "active")}
     "3D Price"]
    [:button {:on-click #(reset! explore-tab :3d-demand)
              :class (when (= @explore-tab :3d-demand) "active")}
     "3D Demand"]
    [:button {:on-click #(reset! explore-tab :2d-growth)
              :class (when (= @explore-tab :2d-growth) "active")}
     "Collector vs Streamer"]]
   
   (case @explore-tab
     :genres [plot-genre-view]
     :splom [plot-splom-view]
     :facets [plot-facet-view]
     :3d [plot-3d-view]
     :3d-demand [plot-3d-demand-view]
     :2d-growth [plot-2d-have-view])])

(defn login-view []
  [:div.login-container {:style {:margin-top "100px" :display "flex" :flex-direction "column" :align-items "center" :gap "20px"}}
   [:h2 "Who is ranking?"]
   [:input {:type "text" 
            :placeholder "Enter your name"
            :value @login-name
            :on-change #(reset! login-name (-> % .-target .-value))
            :style {:padding "12px" :font-size "1.2rem" :border-radius "8px" :border "none"}}]
   [:button {:on-click login! :style {:padding "12px 24px" :font-size "1.2rem"}} "Start Ranking"]])

(defn main-component []
  [:div
   [:div.header {:class "app-header"}
    [:div
     [:button {:on-click #(reset! current-tab :explore)
               :class "btn btn-nav"
               :style (when (= @current-tab :explore) {:background "var(--accent)"})} "Explore"]
     [:button {:on-click #(reset! current-tab :rank)
               :class "btn btn-nav"
               :style (when (= @current-tab :rank) {:background "var(--accent)"})} "Rank"]]

    (when @current-user
      [:div
       [:span {:style {:margin-right "15px" :color "#aaa"}} (str "User: " @current-user)]
       [:button {:on-click logout! :class "btn btn-sm"} "Logout"]])

    [:div
     [:button.btn.btn-sm.btn-acid {:on-click toggle-acid!} (if @is-acid "ACID MODE ON" "ACID MODE")]]]

   [:h1 {:style {:text-align "center" :margin-bottom "20px"}} "Vinyl Wishlist"]

   (cond
     @error-msg [:div.error @error-msg]

     (= @current-tab :explore)
     [explore-view]

     (= @current-tab :rank)
     (if @current-user
       [:<>
        [comparison-view]
         [:div.controls
          [:button {:on-click export-csv} "Export History"]
          [:br]
          [:small.text-accent (str "Logged in as: " @current-user)]]
        [leaderboard-view]]
       [login-view]))])

(defn mount-root []
  (rdom/render [main-component] (.getElementById js/document "app")))

(defn init []
  (fetch-data!)
  (if (.-openskill js/window)
    (do
      (js/console.log "Openskill found, mounting app.")
      (mount-root))
    (do
      (js/console.log "Openskill not found yet, waiting...")
      (js/setTimeout init 100))))

(init)
