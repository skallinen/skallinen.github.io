(ns app.core
  (:require [reagent.core :as r]
            [reagent.dom  :as rdom]
            [clojure.string :as str]))

;; -----------------------
;; Data (EDN)
;; -----------------------
(def beaufort-data
  [{:b 0  :knots "<1"   :ms "0-0.2"    :kmh "<1"    :english "Calm"
    :finnish "Tyyni" :finnish_modern "Tyyni" :swedish "Stiltje"
    :sea "Peilityyni meri."
    :everyday "Slow stroll (~3 km/h)"}

   {:b 1  :knots "1-3"  :ms "0.3-1.5"  :kmh "1-5"   :english "Light Air"
    :finnish "Hiljainen tuuli" :finnish_modern "Heikko tuuli" :swedish "Nästan stiltje"
    :sea "Meren pinnassa pieniä kareita, ei vaahtoa."
    :everyday "Normal walking (~5 km/h)"}

   {:b 2  :knots "4-6"  :ms "1.6-3.3"  :kmh "6-11"  :english "Light Breeze"
    :finnish "Heikko tuuli" :finnish_modern "Heikko tuuli" :swedish "Lätt bris"
    :sea "Selkeitä mutta lyhyitä ja matalia aaltoja. Aallonharjat eivät murru."
    :everyday "Jogging (~10 km/h)"}

   {:b 3  :knots "7-10" :ms "3.4-5.4"  :kmh "12-19" :english "Gentle Breeze"
    :finnish "Heikonlainen tuuli" :finnish_modern "Kohtalainen tuuli" :swedish "God bris"
    :sea "Suurempia aaltoja; harvakseltaan vaahtoa."
    :everyday "Easy city cycling (~15 km/h)"}

   {:b 4  :knots "11-16":ms "5.5-7.9"  :kmh "20-28" :english "Moderate Breeze"
    :finnish "Kohtalainen tuuli" :finnish_modern "Kohtalainen tuuli" :swedish "Frisk bris"
    :sea "Pitkähköjä aaltoja; valkoista vaahtoa."
    :everyday "Fast running / sprint (non-elite) (~25 km/h)"}

   {:b 5  :knots "17-21":ms "8.0-10.7" :kmh "29-38" :english "Fresh Breeze"
    :finnish "Navakka tuuli" :finnish_modern "Navakka tuuli" :swedish "Styv bris"
    :sea "Kohtalaisia, pitempiä aaltoja; vaahtopäitä."
    :everyday "Racing bike fast (~35 km/h)"}

   {:b 6  :knots "22-27":ms "10.8-13.8":kmh "39-49" :english "Strong Breeze"
    :finnish "Kova tuuli" :finnish_modern "Navakka tuuli" :swedish "Hård bris"
    :sea "Kookkaita aaltoja; pärskettä."
    :everyday "EU moped (capped at 45 km/h)"}

   {:b 7  :knots "28-33":ms "13.9-17.1":kmh "50-61" :english "Near Gale"
    :finnish "Luja tuuli" :finnish_modern "Kova tuuli" :swedish "Styv kuling"
    :sea "Vaahtopäät juoviksi, roiskeita."
    :everyday "City street / urban arterial (~50 km/h)"}

   {:b 8  :knots "34-40":ms "17.2-20.7":kmh "62-74" :english "Gale"
    :finnish "Myrskyinen tuuli" :finnish_modern "Kova tuuli" :swedish "Hård kuling"
    :sea "Korkeita ja pitkiä aaltoja, vaahtojuovia."
    :everyday "Country road with bends (~70 km/h)"}

   {:b 9  :knots "41-47":ms "20.8-24.4":kmh "75-88" :english "Severe Gale"
    :finnish "Myrsky" :finnish_modern "Myrsky" :swedish "Halv storm"
    :sea "Korkeita aaltoja; näkyvyys heikentyy."
    :everyday "Rural single carriageway (~85 km/h)"}

   {:b 10 :knots "48-55":ms "24.5-28.4":kmh "89-102":english "Storm"
    :finnish "Kova myrsky" :finnish_modern "Myrsky" :swedish "Storm"
    :sea "Erittäin korkeat aallot; näkyvyys heikko."
    :everyday "Small motorcycle (125 cc) (~95 km/h)"}

   {:b 11 :knots "56-63":ms "28.5-32.6":kmh "103-117":english "Violent Storm"
    :finnish "Ankara myrsky" :finnish_modern "Myrsky" :swedish "Svår storm"
    :sea "Poikkeuksellisen korkeita aaltoja."
    :everyday "Dual carriageway / expressway (~105 km/h)"}

   {:b 12 :knots "64+"  :ms ">32.7"    :kmh ">118" :english "Hurricane"
    :finnish "Hirmumyrsky" :finnish_modern "Hirmumyrsky" :swedish "Orkan"
    :sea "Ilma täynnä pärskettä; näkyvyys erittäin heikko."
    :everyday "Motorway typical cruise (~125 km/h)"}])

(def all-fields
  [{:key :ms             :label "m/s"              :dot "var(--col-ms-stroke)"}
   {:key :knots          :label "Knots"            :dot "var(--col-knots-stroke)"}
   {:key :kmh            :label "km/h"             :dot "var(--col-kmh-stroke)"}
   ;; NEW:
   {:key :everyday       :label "Everyday"         :dot "var(--col-kmh-stroke)"}
   {:key :english        :label "English"          :dot "var(--col-english-stroke)"}
   {:key :finnish        :label "Suomi (vanha)"    :dot "var(--col-finnish-stroke)"}
   {:key :finnish_modern :label "Suomi (nykyinen)" :dot "var(--col-finnishModern-stroke)"}
   {:key :swedish        :label "Svenska"          :dot "var(--col-swedish-stroke)"}
   {:key :sea            :label "Vaikutus merellä" :dot "var(--col-sea-stroke)"}])



;; -----------------------
;; App state
;; -----------------------
(defonce app-db
  (r/atom {:selected-fields #{:ms}
           :theme (keyword (or (.getItem js/localStorage "theme") "dutch"))
           :board {}                   ;; {[row field] -> value}
           :tiles []                   ;; vector of {:value v :field f :row r}
           :current-idx 0
           :attempts {:total 0 :correct 0}
           :timer {:elapsed-ms 0 :paused? false :start-ms (.now js/Date)}
           :cheat? false
           :cheat-count 0             ;; NEW: track cheat activations
           :flashes #{}
           :completed? false}))

;; Apply theme immediately
(.setAttribute (.-documentElement js/document) "data-theme" (name (:theme @app-db)))

;; -----------------------
;; Helpers (pure)
;; -----------------------
(defn fmt-mm-ss [ms]
  (let [s (long (/ ms 1000))
        m (long (/ s 60))
        ss (mod s 60)]
    (str (when (< m 10) "0") m ":" (when (< ss 10) "0") ss)))

(defn fields-ordered [selected]
  (->> all-fields (map :key) (filter selected)))

(defn tiles-for [selected]
  (->> beaufort-data
       (map-indexed
        (fn [row m]
          (for [f (fields-ordered selected)
                :let [v (get m f)]
                :when (and v (not (str/blank? (str v))))]
            {:value (str v) :field f :row row})))
       (apply concat)
       vec))

(defn shuffle-tiles [v]
  (let [a (to-array v)]
    (loop [i (dec (alength a))]
      (when (> i 0)
        (let [j (rand-int (inc i))
              vi (aget a i)
              vj (aget a j)]
          (aset a i vj)
          (aset a j vi)
          (recur (dec i)))))
    (vec a)))

(defn current-tile [db]
  (get (:tiles db) (:current-idx db)))

(defn score-data [db]
  (let [{:keys [total correct]} (:attempts db)
        pct (if (pos? total) (Math/round (* 100 (/ correct total))) 0)]
    {:total total :correct correct :pct pct}))
(def puzzle-name "Beaufort Scale")

(def labels-by-key
  (into {} (map (juxt :key :label) all-fields)))

(defn csv-escape [s]
  (let [s (str (or s ""))]
    (str "\"" (str/replace s #"\"" "\"\"") "\"")))

(defn download-results-csv! []
  (let [db @app-db
        now (js/Date.)
        iso (.toISOString now)
        time-ms (get-in db [:timer :elapsed-ms])
        time-str (fmt-mm-ss time-ms)
        {:keys [total correct pct]} (score-data db)
        cheats (:cheat-count db)
        sel (fields-ordered (:selected-fields db))
        cols (->> sel (map #(get labels-by-key %)) (str/join " | "))
        headers ["puzzle_name" "datetime_iso" "time_hhmmss" "total" "correct" "pct" "cheats" "columns" "accuracy_str"]
        accuracy (str correct "/" total " (" pct "%)")
        row [puzzle-name iso time-str total correct pct cheats cols accuracy]
        csv (str (str/join "," (map csv-escape headers)) "\n"
                 (str/join "," (map csv-escape row)) "\n")
        blob (js/Blob. (clj->js [csv]) #js {:type "text/csv;charset=utf-8"})
        iso-for-file (str/replace iso ":" "-")
        fname (str (-> puzzle-name (str/replace #"[^A-Za-z0-9]+" "-") (str/lower-case))
                   "_" iso-for-file ".csv")
        url (.createObjectURL js/URL blob)
        a (.createElement js/document "a")]
    (set! (.-href a) url)
    (set! (.-download a) fname)
    (.appendChild (.-body js/document) a)
    (.click a)
    (.removeChild (.-body js/document) a)
    (.revokeObjectURL js/URL url)))

;; -----------------------
;; Game mutations
;; -----------------------
(defn init-game! [selected]
  (swap! app-db
         (fn [db]
           (let [t (-> selected tiles-for shuffle-tiles)]
             (-> db
                 (assoc :selected-fields selected
                        :tiles t
                        :current-idx 0
                        :board {}
                        :attempts {:total 0 :correct 0}
                        :timer {:elapsed-ms 0
                                :paused? false
                                :start-ms (.now js/Date)}
                        :flashes #{}
                        :completed? false
                        :cheat-count 0))))))      ;; reset cheat counter

;; wrong-click flash helper
(defn flash-cell! [row field]
  (let [cell [:cell row field]]
    (swap! app-db update :flashes (fnil conj #{}) cell)
    (js/setTimeout
     (fn [] (swap! app-db update :flashes disj cell))
     220)))

;; place when correct (no total++ here; handled by try-place!)
(defn place-tile! [row field answer]
  (swap! app-db
         (fn [db]
           (let [t (current-tile db)
                 match? (and t (= (:field t) field) (= (:value t) answer))
                 cell   [:cell row field]
                 filled? (contains? (:board db) cell)]
             (if (and match? (not filled?))
               (let [board' (assoc (:board db) cell (:value t))
                     db'    (-> db
                                (update-in [:attempts :correct] inc)
                                (assoc :board board')
                                (update :current-idx inc))
                     done?  (>= (:current-idx db') (count (:tiles db')))]
                 (cond-> db'
                   done? (assoc :completed? true)
                   done? (assoc-in [:timer :paused?] true)))
               db)))))

(defn try-place! [row field answer]
  (let [db  @app-db
        t   (current-tile db)
        ok? (and t (= (:field t) field) (= (:value t) answer))
        cell [:cell row field]
        filled? (contains? (:board db) cell)]
    (if (and ok? (not filled?))
      (do
        (swap! app-db update-in [:attempts :total] inc)
        (place-tile! row field answer))
      (do
        (swap! app-db update-in [:attempts :total] inc)
        (flash-cell! row field)))))

(defn remove-tile! [row field]
  (swap! app-db
         (fn [db]
           (let [cell [:cell row field]
                 val  (get-in db [:board cell])
                 tile {:value val :field field}
                 idx  (:current-idx db)
                 tiles (:tiles db)
                 insert-pos (+ idx (rand-int (max 1 (- (count tiles) idx))))
                 tiles* (-> []
                            (into (subvec tiles 0 insert-pos))
                            (conj tile)
                            (into (subvec tiles insert-pos)))
                 board' (dissoc (:board db) cell)]
             (-> db
                 (assoc :tiles tiles* :board board')
                 (update-in [:attempts :correct] (fn [n] (max 0 (dec n))))
                 (assoc :completed? false))))))

(defn toggle-pause! []
  (swap! app-db
         (fn [db]
           (let [paused? (not (get-in db [:timer :paused?]))]
             (if paused?
               (assoc-in db [:timer :paused?] true)
               (-> db
                   (assoc-in [:timer :paused?] false)
                   (assoc-in [:timer :start-ms]
                             (- (.now js/Date) (get-in db [:timer :elapsed-ms])))))))))

(defn reset-game! []
  (init-game! (:selected-fields @app-db)))

(defn set-theme! [k]
  (.setAttribute (.-documentElement js/document) "data-theme" (name k))
  (.setItem js/localStorage "theme" (name k))
  (swap! app-db assoc :theme k))

;; Cheat press & hold (self-removing listeners)
(defn start-cheat! []
  ;; increment cheat count once per hold
  (swap! app-db (fn [db]
                  (-> db
                      (assoc :cheat? true)
                      (update :cheat-count (fnil inc 0)))))
  (letfn [(end []
            (swap! app-db assoc :cheat? false)
            (.removeEventListener js/window "pointerup" end)
            (.removeEventListener js/window "pointercancel" end)
            (.removeEventListener js/window "blur" end))]
    (.addEventListener js/window "pointerup" end)
    (.addEventListener js/window "pointercancel" end)
    (.addEventListener js/window "blur" end)))

;; -----------------------
;; Effects: timer + footer ResizeObserver
;; -----------------------
(defonce timer-handle (atom nil))

(defn start-timer! []
  (when @timer-handle (js/clearInterval @timer-handle))
  (reset! timer-handle
          (js/setInterval
           (fn []
             (swap! app-db
                    (fn [db]
                      (if (get-in db [:timer :paused?])
                        db
                        (assoc-in db [:timer :elapsed-ms]
                                  (- (.now js/Date) (get-in db [:timer :start-ms])))))))
           1000)))

;; --- Footer sizing (same as Flags) -------------------------------------------
(defonce footer-h (r/atom 0))

(defn ^:private measure-footer! []
  (when-let [el (.getElementById js/document "editorFooter")]
    (reset! footer-h (.-offsetHeight el))))

(defn footer []
  (r/create-class
   {:display-name "footer"
    :component-did-mount
    (fn []
      (start-timer!)
      (measure-footer!)
      (.addEventListener js/window "resize" measure-footer!)
      (.addEventListener js/window "orientationchange" measure-footer!))
    :component-did-update (fn [_] (measure-footer!))
    :component-will-unmount
    (fn []
      (.removeEventListener js/window "resize" measure-footer!)
      (.removeEventListener js/window "orientationchange" measure-footer!))
    :reagent-render
    (fn []
      (let [db @app-db
            t (current-tile db)
            prog (if (seq (:tiles db))
                   (str (inc (:current-idx db)) "/" (count (:tiles db)))
                   "0/0")
            {:keys [total correct pct]} (score-data db)
            cheats (:cheat-count db)]
        [:div.editor-footer {:id "editorFooter"
                             :style {:position "fixed"
                                     :bottom 0
                                     :left 0
                                     :right 0}}
         [:div.footer-section
          [:span.label {:style {:margin-right "6px"}} "Tile"]
          [:span.metric {:style {:padding "6px 10px"
                                 :border "1px solid var(--border)"
                                 :border-radius "var(--radius-2)"
                                 :background "#FAFAFC"}}
           (or (:value t) "Ready")]
          [:span.footer-separator "|"]
          [:span.metric prog]]
         [:div.footer-section
          [:span.label "Time"] [:span.metric (fmt-mm-ss (get-in db [:timer :elapsed-ms]))]
          [:span.footer-separator "|"]
          [:span.label "Score"] [:span.metric (str correct "/" total " (" pct "%)")]
          [:span.footer-separator "|"]
          [:span.label "Cheats"] [:span.metric cheats]]
         [:div.footer-section
          [:button.btn-primary {:on-click #(toggle-pause!)}
           (if (get-in db [:timer :paused?]) "Resume" "Pause")]
          [:button.btn-danger  {:on-click #(reset-game!)} "Reset"]
          [:button.btn-primary {:title "Press and hold to reveal answers"
                                :on-pointer-down #(start-cheat!)}
           "Cheat (hold)"]]]))}))

;; -----------------------
;; Components
;; -----------------------
(defn header []
  [:header {:style {:margin-bottom "6px"}}
   [:h1 "Wind Speed"]
   [:p.lead "Fill the Beaufort scale table by placing the correct tiles into each selected column."]])

(defn instructions []
  [:section.instructions
   [:div.label "Instructions"]
   [:ol
    [:li "Pick the columns you’d like to practice."]
    [:li "Click a cell in the target column to place the current tile."]
    [:li "Remove a placed tile by clicking it again."]
    [:li "Press and hold Cheat to peek answers."]
    [:li "Score is correct tries ÷ total tries. Timer runs only while active."]]])

(defn selectors []
  (let [{:keys [selected-fields theme]} @app-db]
    [:div.selectors {:id "selectors"}
     [:div.selectors-left
      [:span.group-title "Columns:"]
      (for [{:keys [key label dot]} all-fields]
        ^{:key (str "chip-" (name key))}
        [:label.chip {:for (str "toggle-" (name key))}
         [:span.dot {:style {:background dot}}]
         [:input {:id (str "toggle-" (name key))
                  :type "checkbox"
                  :checked (contains? selected-fields key)
                  :on-change (fn [e]
                               (let [checked (.. e -target -checked)
                                     new (if checked
                                           (conj selected-fields key)
                                           (disj selected-fields key))
                                     new (if (empty? new) selected-fields new)]
                                 (init-game! new)))}]
         [:span label]])]]))

(defn table-head []
  (let [fields (fields-ordered (:selected-fields @app-db))]
    [:thead {:id "tableHead"}
     [:tr
      [:th "Beaufort"]
      (for [f fields
            :let [meta (first (filter #(= (:key %) f) all-fields))]]
        ^{:key (str "th-" (name f))}
        [:th {:data-field (name f)}
         [:span {:style {:display "inline-flex"
                         :align-items "center"
                         :gap "8px"
                         :justify-content "center"}}
          [:span.dot {:style {:background (:dot meta)}}]
          [:span (:label meta)]]])]]))

(defn drop-zone [row f value]
  (let [{:keys [board cheat? flashes]} @app-db
        cell [:cell row f]
        filled? (contains? board cell)
        flashed? (contains? flashes cell)
        highlight? (when-let [t (current-tile @app-db)]
                     (and (= (:field t) f) (not filled?)))
        override-style (when flashed?
                         {:background "var(--danger-50)"
                          :border-color "var(--danger)"})]
    [:td
     (if (and value (not (str/blank? (str value))))
       (let [classes (cond-> ["drop-zone"]
                       filled? (conj "filled")
                       highlight? (conj "highlight"))]
         [:div {:class (str/join " " classes)
                :data-row row
                :data-field (name f)
                :on-click (fn [_]
                            (when-not filled?
                              (try-place! row f (str value))))
                :style (merge {:border-radius "var(--radius-2)"} override-style)}
          (when filled?
            [:div.placed-tile
             {:data-field (name f)
              :on-click (fn [e]
                          (.stopPropagation e)
                          (remove-tile! row f))}
             (get board cell)])
          (when (and cheat? (not filled?))
            [:div.cheat-ghost {:data-field (name f)} (str value)])])
       [:div.static-cell "—"])]))

(defn puzzle-table []
  (let [fields (fields-ordered (:selected-fields @app-db))]
    [:div.table-container
     [:table {:id "puzzleTable"}
      [table-head]
      [:tbody
       (for [[row m] (map-indexed vector beaufort-data)]
         ^{:key (str "row-" row)}
         [:tr
          [:td [:span.beaufort-badge (:b m)]]
          (for [f fields]
            ^{:key (str "cell-" row "-" (name f))}
            [drop-zone row f (get m f)])])]]]))

(defn scroll-buffer []
  [:div.scroll-buffer {:aria-hidden "true"
                       :style {:height (str @footer-h "px")}}])



(defn completion-modal []
  (let [{:keys [completed? timer cheat-count]} @app-db
        {:keys [total correct pct]} (score-data @app-db)]
    (when completed?
      [:div.modal-backdrop
       [:div.modal-card
        [:h3 {:style {:margin "0 0 8px" :font-weight 600}} "Completed! 🎉"]
        [:div {:style {:color "var(--subtext)" :margin-bottom "10px"}}
         [:div "Time: " [:strong (fmt-mm-ss (:elapsed-ms timer))]]
         [:div "Accuracy: " [:strong (str correct "/" total " (" pct "%)")]]
         [:div "Cheats: " [:strong cheat-count]]]
        [:div {:style {:display "flex" :gap "8px" :justify-content "flex-end"}}
         [:button.btn-secondary {:on-click #(download-results-csv!)} "Download CSV"]
         [:button.btn-primary {:on-click #(reset-game!)} "Play again"]]]])))

(defn root []
  [:div.container
   [header]
   [instructions]
   [selectors]
   [puzzle-table]
   [scroll-buffer]
   [footer]
   [completion-modal]])

;; -----------------------
;; Mount + initial game
;; -----------------------
(defn mount! []
  (rdom/render [root] (.getElementById js/document "app"))
  (init-game! (:selected-fields @app-db))
  (start-timer!))

(mount!)
