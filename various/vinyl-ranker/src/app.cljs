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
        idx-id (get col-map "discogs_id")]
    
    (->> rows
         (map (fn [row]
                (let [cells (get row "c")
                      get-val (fn [idx] (when idx (get (get cells idx) "v")))
                      title (str (get-val idx-artist) " - " (get-val idx-album))]
                  {:id (or (get-val idx-id) title) ;; Stable ID fallback: Use Title
                   :title title
                   :image_url (or (get-val idx-itunes-image) (get-val idx-wiki-image) (get-val idx-discogs-image))
                   :mu default-mu
                   :sigma default-sigma})))
         (filter #(not (empty? (:title %))))
         (vec))))

(defn handle-jsonp-response [data]
  (try
    (let [parsed (parse-jsonp-data data)]
      (reset! albums parsed)
      (reset! loading false)
      (when @current-user
        (load-user-data! @current-user)))
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
  (let [all @albums]
    (if (< (count all) 2)
      nil
      (let [a (rand-nth all)
            b (rand-nth (filter #(not= (:id %) (:id a)) all))]
        [a b]))))

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

(defn movie-card [movie on-click]
  [:div.movie-card {:on-click on-click}
   [:img.movie-image {:src (or (:image_url movie) "https://via.placeholder.com/300")}]
   [:div.movie-title (:title movie)]
   [:div {:style {:color "#666" :font-size "0.8em" :margin-top "5px"}}
    (str "Est. Rating (\u03bc): " (.toFixed (:mu movie) 2))]])

(defn comparison-view []
  (cond 
    @loading [:div "Loading data..."]
    (nil? @current-pair) [:div "Not enough data to rank."]
    :else
    (let [[a b] @current-pair]
      [:div
       [:h2 "If you could only keep one, which one would it be?"]
       [:div.comparison-container
        [movie-card a #(handle-vote (:id a) (:id b))]
        [movie-card b #(handle-vote (:id b) (:id a))]]])))

(defn leaderboard-view []
  (if @loading 
    nil
    (let [sorted (sort-by score > @albums)]
      [:div.leaderboard
       [:h2 "Current Rankings"]
       [:table
        [:thead
         [:tr
          [:th "Rank"]
          [:th "Album"]
          [:th "Ranking Score (\u03bc - 3\u03c3)"]
          [:th "Est. Rating (\u03bc)"]
          [:th "Uncertainty (\u03c3)"]]]
        [:tbody
         (doall
           (map-indexed 
             (fn [idx album]
               [:tr {:key (:id album)}
                [:td.rank-cell (inc idx)]
                [:td (:title album)]
                [:td.score-cell (.toFixed (score album) 3)]
                [:td.score-cell (.toFixed (:mu album) 2)]
                [:td.score-cell (.toFixed (:sigma album) 2)]])
             sorted))]]])))

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
   [:h1 "Vinyl Ranker"]
   (cond
     @error-msg [:div.error @error-msg]
     (not @current-user) [login-view]
     :else
       [:div
        [:div.header {:style {:display "flex" :justify-content "space-between" :align-items "center" :margin-bottom "20px" :padding "0 20px"}}
         [:span (str "Rankings for: " @current-user)]
         [:button {:on-click logout! :style {:background "#333" :font-size "0.8rem"}} "Logout"]]
        [comparison-view]
        [:div.controls
         [:button {:on-click export-csv} "Export History CSV"]
         [:br]
         [:small {:style {:color "#666"}} (str "Changes saved for user: " @current-user)]
         [:br]
         [:small {:style {:color "#999" :font-size "0.7em"}} "v1.3 (Stable IDs)"]]
        [leaderboard-view]])])

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
