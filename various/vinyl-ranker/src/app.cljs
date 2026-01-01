(ns app
  (:require [reagent.core :as r]
            [reagent.dom :as rdom]))

;; -- Configuration --
;; -- Configuration --
(def SHEET_URL "https://docs.google.com/spreadsheets/d/1FT3dLkCfLyADcXuJX0qUmzDUmwp8f5Z-bTbs3JMA1Ww/export?format=csv&gid=966829031")
(def RESULTS_CSV_URL "https://docs.google.com/spreadsheets/d/1FT3dLkCfLyADcXuJX0qUmzDUmwp8f5Z-bTbs3JMA1Ww/export?format=csv&gid=1353005108")
(def BACKEND_URL "https://script.google.com/macros/s/AKfycbyufh6gKJYfgvad6Tb3muSrJ1cgNElo8K_s_lvspCy0zyGmCsP6KADEsiloPSsuPC0Z/exec")

;; -- Interop --
(def openskill js/openskill)
(def Papa js/Papa)

;; ... (State helper)

;; ... (Persistence helper)

(defn login! []
  (let [name @login-name]
    (when (not (empty? name))
      (reset! current-user name)
      (load-user-data! name) 
      (fetch-history-csv!))))

(defn logout! []
  (reset! current-user nil)
  (reset! login-name "")
  ;; Reload from sheet to reset ratings to default, but keep the Sheet data
  (fetch-data!) 
  (reset! history []))

;; -- TrueSkill Logic (Same as before) --
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

;; -- Cloud Sync (Read-Only) --

(defn replay-history! [csv-data]
  (js/console.log "Replaying" (count csv-data) "records from cloud...")
  ;; CSV Data comes as array of arrays: [Timestamp, WinnerID, LoserID, User, ClientUA...]
  ;; Headers are likely row 0. We need to find User column.
  
  (let [headers (first csv-data)
        rows (rest csv-data)
        ;; Simple index lookup based on expected columns from Apps Script appendRow
        ;; Appended: [Timestamp, WinnerID, LoserID, User, ClientUA]
        ;; CSV Export might vary, but assuming standard layout:
        idx-winner 1 
        idx-loser 2
        idx-user 3
        my-user @current-user]
    
    ;; Filter for current user
    (let [user-rows (filter #(= (nth % idx-user nil) my-user) rows)]
      (js/console.log "Found" (count user-rows) "matches for user" my-user)
      
      (when (seq user-rows)
        ;; Reset state to defaults
        (swap! albums (fn [current] (mapv #(assoc % :mu default-mu :sigma default-sigma) current)))
        (reset! history [])
  
        ;; Replay
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
                     ;; Update atoms silently (without persistence trigger to avoid loop)
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
        
        ;; Save finalized state to LocalStorage
        (when @current-user
           (let [ratings-key (get-storage-key "ratings" @current-user)
                 history-key (get-storage-key "history" @current-user)]
             (.setItem js/localStorage history-key (js/JSON.stringify (clj->js @history)))
             (.setItem js/localStorage ratings-key (js/JSON.stringify (clj->js @albums)))))))))

(defn fetch-history-csv! []
  (js/console.log "Fetching cloud history...")
  (.parse Papa RESULTS_CSV_URL
          (clj->js {:download true
                    :complete (fn [results]
                                (let [data (.-data results)]
                                  (replay-history! data)))
                    :error (fn [err] (js/console.error "CSV Fetch Error:" err))})))

;; -- Cloud Sync Logic --

(defn replay-cloud-history! [cloud-recs]
  (js/console.log "Replaying" (count cloud-recs) "records from cloud...")
  (reset! history cloud-recs)
  
  ;; Reset all albums to default first
  (swap! albums 
         (fn [current]
           (mapv #(assoc % :mu default-mu :sigma default-sigma) current)))
           
  ;; Iterate and update (Naive approach: sequential updates)
  ;; For performance with large datasets, we might want to optimize, but for <1000 votes this is fine.
  (doseq [rec cloud-recs]
    (let [w-id (:winner rec)
          l-id (:loser rec)]
      ;; We duplicate logic from update-ratings! here but without the side-effects of saving to history/LS every step
      (try
        (let [current-albums @albums
              winner (some #(when (= (:id %) w-id) %) current-albums)
              loser (some #(when (= (:id %) l-id) %) current-albums)]
          (when (and winner loser)
            (let [[new-w new-l] (rate-pair winner loser)]
              (swap! albums 
                 (fn [current]
                   (mapv (fn [a]
                           (cond
                             (= (:id a) w-id) (assoc a :mu (:mu new-w) :sigma (:sigma new-w))
                             (= (:id a) l-id) (assoc a :mu (:mu new-l) :sigma (:sigma new-l))
                             :else a))
                         current))))))
        (catch :default e (js/console.error "Replay error:" e)))))
  
  (js/console.log "Replay complete. Savings to local cache.")
  (when @current-user
      (let [ratings-key (get-storage-key "ratings" @current-user)
            history-key (get-storage-key "history" @current-user)]
        (.setItem js/localStorage history-key (js/JSON.stringify (clj->js @history)))
        (.setItem js/localStorage ratings-key (js/JSON.stringify (clj->js @albums))))))

(defn fetch-cloud-data! [user]
  (reset! loading true)
  (let [url (str BACKEND_URL "?action=fetch&user=" user)]
    (-> (js/fetch url)
        (.then #(.json %))
        (.then (fn [json]
                 (let [recs (js->clj json :keywordize-keys true)]
                   (if (empty? recs)
                     (js/console.log "No cloud history found.")
                     (replay-cloud-history! recs))
                   (reset! loading false))))
        (.catch (fn [err] 
                  (js/console.error "Cloud fetch failed:" err)
                  (reset! loading false))))))

;; -- Matchmaking --
(defn pick-pair []
  (let [all @albums]
    (if (< (count all) 2)
      nil
      (let [a (rand-nth all)
            b (rand-nth (filter #(not= (:id %) (:id a)) all))]
        [a b]))))

(defonce current-pair (r/atom nil))

;; Ensure pair exists when data loads
(add-watch albums :pair-watcher
  (fn [_ _ _ new-state]
    (when (and (empty? @current-pair) (>= (count new-state) 2))
      (reset! current-pair (pick-pair)))))


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
    (send-data! {:winner winner-id 
                 :loser loser-id 
                 :user user 
                 :timestamp (.now js/Date)}
                nil)))

(defn upload-record! [rec next-fn]
  (send-data! {:winner (:winner rec)
               :loser (:loser rec)
               :user (or @current-user "migration") 
               :timestamp (:timestamp rec)}
               #(js/setTimeout next-fn 400)))

(defn handle-vote [winner-id loser-id]
  (update-ratings! winner-id loser-id)
  (save-match! winner-id loser-id)
  (reset! current-pair (pick-pair)))

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

(defn score [album]
  (- (:mu album) (* 3 (:sigma album))))

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


;; upload-record! moved to top



(defn sync-next! [records total current]
  (reset! sync-status (str "Syncing record " (inc current) " of " total "..."))
  (if (empty? records)
    (reset! sync-status "Sync Complete! All records uploaded.")
    (upload-record! (first records) 
                    #(sync-next! (rest records) total (inc current)))))

(defn sync-to-cloud! []
  (let [recs @history
        cnt (count recs)]
    (if (pos? cnt)
      (do
        (reset! sync-status "Starting sync...")
        (sync-next! recs cnt 0))
      (reset! sync-status "No history to sync (Count is 0)."))))

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
         ;; [:button {:on-click sync-to-cloud! :style {:margin-right "10px" :background "#4CAF50"}} "Sync History to Cloud"]
         [:button {:on-click export-csv} "Export History CSV"]
         [:br]
         (when @sync-status [:div {:style {:margin-top "10px" :font-weight "bold" :color "blue"}} @sync-status])
         [:br]
         [:small {:style {:color "#666"}} (str "Changes saved for user: " @current-user)]]
        [leaderboard-view]])])

;; -- Init --
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
