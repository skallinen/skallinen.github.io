(ns app.core
  (:require [reagent.core :as r]
            [reagent.dom  :as rdom]
            [clojure.string :as str]))

;; -----------------------------------------------------------------------------
;; Data
;; -----------------------------------------------------------------------------

;; Explicit filename mapping so paths match your on-disk names exactly.
(def id->file
  {:alfa "ics_alfa.svg"
   :bravo "ics_bravo.svg"
   :charlie "ics_charlie.svg"
   :delta "ics_delta.svg"
   :echo "ics_echo.svg"
   :foxtrot "ics_foxtrot.svg"
   :golf "ics_golf.svg"
   :hotel "ics_hotel.svg"
   :india "ics_india.svg"
   :juliett "ics_juliett.svg"
   :kilo "ics_kilo.svg"
   :lima "ics_lima.svg"
   :mike "ics_mike.svg"
   :november "ics_november.svg"
   :oscar "ics_oscar.svg"
   :papa "ics_papa.svg"
   :quebec "ics_quebec.svg"
   :romeo "ics_romeo.svg"
   :sierra "ics_sierra.svg"
   :tango "ics_tango.svg"
   :uniform "ics_uniform.svg"
   :victor "ics_victor.svg"
   :whiskey "ics_whiskey.svg"
   :x-ray "ics_x-ray.svg"               ;; note: hyphen in filename
   :yankee "ics_yankee.svg"
   :zulu "ics_zulu.svg"
   ;; Numeral pennants (0–9)
   :pennant-zero  "ics_pennant_zero.svg"
   :pennant-one   "ics_pennant_one.svg"
   :pennant-two   "ics_pennant_two.svg"
   :pennant-three "ics_pennant_three.svg"
   :pennant-four  "ics_pennant_four.svg"
   :pennant-five  "ics_pennant_five.svg"
   :pennant-six   "ics_pennant_six.svg"
   :pennant-seven "ics_pennant_seven.svg"
   :pennant-eight "ics_pennant_eight.svg"
   :pennant-niner "ics_pennant_niner.svg"
   ;; Answer + repeats
   :answer       "ics_answer.svg"
   :repeat-one   "ics_repeat_one.svg"
   :repeat-two   "ics_repeat_two.svg"
   :repeat-three "ics_repeat_three.svg"})

(defn flag-src
  "Return relative path from puzzles/flags/index.html to assets."
  [id]
  (str "./assets/flags/" (get id->file id)))

;; Letters A–Z
(def letters
  [{:id :alfa    :nato "Alfa"    :morse ".-"    :meaning "I have a diver down; keep well clear at slow speed."}
   {:id :bravo   :nato "Bravo"   :morse "-..."  :meaning "I am taking in, discharging, or carrying dangerous goods."}
   {:id :charlie :nato "Charlie" :morse "-.-."  :meaning "Affirmative."}
   {:id :delta   :nato "Delta"   :morse "-.."   :meaning "Keep clear of me; I am manoeuvring with difficulty."}
   {:id :echo    :nato "Echo"    :morse "."     :meaning "I am altering my course to starboard."}
   {:id :foxtrot :nato "Foxtrot" :morse "..-."  :meaning "I am disabled; communicate with me."}
   {:id :golf    :nato "Golf"    :morse "--."   :meaning "I require a pilot."}
   {:id :hotel   :nato "Hotel"   :morse "...."  :meaning "I have a pilot on board."}
   {:id :india   :nato "India"   :morse ".."    :meaning "I am altering my course to port."}
   {:id :juliett :nato "Juliett" :morse ".---"  :meaning "Keep clear of me; I am on fire and have dangerous cargo."}
   {:id :kilo    :nato "Kilo"    :morse "-.-"   :meaning "I wish to communicate with you."}
   {:id :lima    :nato "Lima"    :morse ".-.."  :meaning "You should stop your vessel instantly."}
   {:id :mike    :nato "Mike"    :morse "--"    :meaning "My vessel is stopped; making no way."}
   {:id :november :nato "November" :morse "-."    :meaning "No (negative)."}
   {:id :oscar   :nato "Oscar"   :morse "---"   :meaning "Man overboard."}
   {:id :papa    :nato "Papa"    :morse ".--."  :meaning "All personnel return to ship; the vessel is about to proceed to sea."}
   {:id :quebec  :nato "Quebec"  :morse "--.-"  :meaning "My vessel is healthy; request free pratique."}
   {:id :romeo   :nato "Romeo"   :morse ".-."   :meaning nil} ; No single-flag ICS meaning
   {:id :sierra  :nato "Sierra"  :morse "..."   :meaning "I am operating astern propulsion."}
   {:id :tango   :nato "Tango"   :morse "-"     :meaning "Keep clear of me; I am engaged in pair trawling."}
   {:id :uniform :nato "Uniform" :morse "..-"   :meaning "You are running into danger."}
   {:id :victor  :nato "Victor"  :morse "...-"  :meaning "I require assistance."}
   {:id :whiskey :nato "Whiskey" :morse ".--"   :meaning "I require medical assistance."}
   {:id :x-ray   :nato "X-ray"   :morse "-..-"  :meaning "Stop carrying out your intentions and watch for my signals."}
   {:id :yankee  :nato "Yankee"  :morse "-.--"  :meaning "I am dragging my anchor."}
   {:id :zulu    :nato "Zulu"    :morse "--.."  :meaning "I require a tug."}])

;; Numeral pennants 0–9 — use radio names (Zero..Niner)
(def digits
  [{:id :pennant-zero  :nato "Zero"  :morse "-----" :meaning nil}
   {:id :pennant-one   :nato "One"   :morse ".----" :meaning nil}
   {:id :pennant-two   :nato "Two"   :morse "..---" :meaning nil}
   {:id :pennant-three :nato "Three" :morse "...--" :meaning nil}
   {:id :pennant-four  :nato "Four"  :morse "....-" :meaning nil}
   {:id :pennant-five  :nato "Five"  :morse "....." :meaning nil}
   {:id :pennant-six   :nato "Six"   :morse "-...." :meaning nil}
   {:id :pennant-seven :nato "Seven" :morse "--..." :meaning nil}
   {:id :pennant-eight :nato "Eight" :morse "---.." :meaning nil}
   {:id :pennant-niner :nato "Niner" :morse "----." :meaning nil}])

;; Answer + repeaters
(def specials
  [{:id :answer       :nato "Answer"       :morse nil :meaning "Acknowledgement / message received."}
   {:id :repeat-one   :nato "Repeat One"   :morse nil :meaning "Repeats the first flag."}
   {:id :repeat-two   :nato "Repeat Two"   :morse nil :meaning "Repeats the second flag."}
   {:id :repeat-three :nato "Repeat Three" :morse nil :meaning "Repeats the third flag."}])

(def flags-data
  "Order = letters A–Z, digits 0–9, Answer, Repeaters."
  (vec (concat letters digits specials)))

(def all-fields
  "Selectable columns (the Flag image is the fixed left column)."
  [{:key :nato    :label "Radio name" :dot "var(--col-english-stroke)"}
   {:key :morse   :label "Morse"      :dot "var(--col-kmh-stroke)"}
   {:key :meaning :label "Meaning"    :dot "var(--col-sea-stroke)"}])

;; -----------------------------------------------------------------------------
;; State
;; -----------------------------------------------------------------------------

(defonce app-db
  (r/atom {:selected-fields #{:nato}     ;; you can toggle to Morse / Meaning too
           :row-order []                 ;; permutation of row indices for display
           :board {}                     ;; {[row field] -> value}
           :tiles []                     ;; shuffled vector of {:value :field :row}
           :current-idx 0
           :attempts {:total 0 :correct 0 :cheats 0}
           :timer {:elapsed-ms 0 :paused? false :start-ms (.now js/Date)}
           :cheat? false
           :completed? false
           :flashes #{}}))

;; -----------------------------------------------------------------------------
;; Helpers
;; -----------------------------------------------------------------------------

(defn fields-ordered [selected]
  (->> all-fields (map :key) (filter selected)))

(defn tiles-for
  "Build tiles from SELECTED fields using display row-order (a vector of base indices)."
  [selected row-order]
  (->> row-order
       (map-indexed
        (fn [display-idx base-idx]
          (let [m (nth flags-data base-idx)]
            (for [f (fields-ordered selected)
                  :let [v (get m f)]
                  :when (and v (not (str/blank? (str v))))]
              {:value (str v) :field f :row display-idx}))))
       (apply concat) vec))

(defn shuffle-vec [v]
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

(defn current-tile [db] (get (:tiles db) (:current-idx db)))

(defn score-data [db]
  (let [{:keys [total correct cheats]} (:attempts db)
        pct (if (pos? total) (Math/round (* 100 (/ correct total))) 0)]
    {:total total :correct correct :pct pct :cheats (or cheats 0)}))

(defn fmt-mm-ss [ms]
  (let [s (long (/ ms 1000)) m (long (/ s 60)) ss (mod s 60)]
    (str (when (< m 10) "0") m ":" (when (< ss 10) "0") ss)))

(def puzzle-name "Signal Flags")

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
        {:keys [total correct pct cheats]} (score-data db)
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

;; -----------------------------------------------------------------------------
;; Game mutations
;; -----------------------------------------------------------------------------

(defn init-game! [selected]
  (swap! app-db
         (fn [db]
           (let [row-order (shuffle-vec (vec (range (count flags-data))))
                 tiles     (-> selected (tiles-for row-order) shuffle-vec)]
             (-> db
                 (assoc :selected-fields selected
                        :row-order row-order
                        :tiles tiles
                        :current-idx 0
                        :board {}
                        :attempts {:total 0 :correct 0 :cheats 0}
                        :timer {:elapsed-ms 0 :paused? false :start-ms (.now js/Date)}
                        :completed? false
                        :flashes #{}))))))

;; brief red flash marker (same mechanism as Beaufort)
(defn flash-cell! [row field]
  (let [cell [:cell row field]]
    (swap! app-db update :flashes (fnil conj #{}) cell)
    (js/setTimeout #(swap! app-db update :flashes disj cell) 220)))

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
    (swap! app-db update-in [:attempts :total] inc)
    (if (and ok? (not filled?))
      (place-tile! row field answer)
      (flash-cell! row field))))

(defn remove-tile! [row field]
  (swap! app-db
         (fn [db]
           (let [cell  [:cell row field]
                 val   (get-in db [:board cell])
                 tile  {:value val :field field}
                 idx   (:current-idx db)
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

(defn reset-game! [] (init-game! (:selected-fields @app-db)))

;; Cheat press & hold (increment cheats once per hold, show answers while held)
(defn start-cheat! []
  ;; increment once per activation
  (swap! app-db (fn [db]
                  (-> db
                      (assoc :cheat? true)
                      (update-in [:attempts :cheats] (fnil inc 0)))))
  (letfn [(end []
            (swap! app-db assoc :cheat? false)
            (.removeEventListener js/window "pointerup" end)
            (.removeEventListener js/window "pointercancel" end)
            (.removeEventListener js/window "blur" end))]
    (.addEventListener js/window "pointerup" end)
    (.addEventListener js/window "pointercancel" end)
    (.addEventListener js/window "blur" end)))

;; -----------------------------------------------------------------------------
;; Timer effect
;; -----------------------------------------------------------------------------

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

;; -----------------------------------------------------------------------------
;; UI
;; -----------------------------------------------------------------------------

(defn header []
  [:header {:style {:margin-bottom "6px"}}
   [:h1 "Signal Flags"]
   [:p.lead "Place tiles into the correct columns for each flag. The left column shows the flag image; you match Radio name, Morse, and/or Meaning."]])

(defn instructions []
  [:section.instructions
   [:div.label "Instructions"]
   [:ol
    [:li "Pick the columns you’d like to practice."]
    [:li "Click a cell in the target column to place the current tile."]
    [:li "Remove a placed tile by clicking it again."]
    [:li "Score = correct tries ÷ total tries. Timer pauses when you pause."]]])

(defn selectors []
  (let [{:keys [selected-fields]} @app-db]
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
    [:thead
     [:tr
      [:th "Flag"]
      (for [f fields
            :let [meta (first (filter #(= (:key %) f) all-fields))]]
        ^{:key (str "th-" (name f))}
        [:th
         [:span {:style {:display "inline-flex"
                         :align-items "center"
                         :gap "8px"
                         :justify-content "center"}}
          [:span.dot {:style {:background (:dot meta)}}]
          [:span (:label meta)]]])]]))

(defn drop-zone [row f value]
  (let [{:keys [board cheat? flashes]} @app-db
        cell [:cell row f]
        filled?    (contains? board cell)
        flashed?   (contains? flashes cell)
        highlight? (when-let [t (current-tile @app-db)]
                     (and (= (:field t) f) (not filled?)))]
    [:td
     (if (and value (not (str/blank? (str value))))
       (let [classes (cond-> ["drop-zone"]
                       filled?    (conj "filled")
                       highlight? (conj "highlight")
                       flashed?   (conj "flash"))]
         [:div {:class (str/join " " classes)
                :data-field (name f)
                :on-click (fn [_] (when-not filled?
                                    (try-place! row f (str value))))
                :style {:border-radius "var(--radius-2)"}}
          (when filled?
            [:div.placed-tile
             {:data-field (name f)
              :on-click (fn [e] (.stopPropagation e) (remove-tile! row f))}
             (get board cell)])
          (when (and cheat? (not filled?))
            [:div.cheat-ghost {:data-field (name f)} (str value)])])
       [:div.static-cell "—"])]))

(defn puzzle-table []
  (let [fields    (fields-ordered (:selected-fields @app-db))
        row-order (:row-order @app-db)]
    [:div.table-container
     [:table
      [table-head]
      [:tbody
       (for [[display-idx base-idx] (map-indexed vector row-order)]
         (let [m (nth flags-data base-idx)]
           ^{:key (str "row-" display-idx)}
           [:tr
            ;; Flag cell (preserve aspect ratio; height only)
            [:td
             [:img {:src (flag-src (:id m))
                    :alt (str (or (:nato m)
                                  (str/upper-case (name (:id m))))
                              " flag")
                    :height 36
                    :style {:border "1px solid var(--border)"
                            :border-radius "6px"
                            :display "inline-block"
                            :margin "12px 0"
                            :background "#FAFAFC"}}]]
            ;; Placeable cells
            (for [f fields]
              ^{:key (str "cell-" display-idx "-" (name f))}
              [drop-zone display-idx f (get m f)])]))]]]))
(defonce footer-h (r/atom 0))

(defn measure-footer! []
  (when-let [el (.getElementById js/document "editorFooter")]
    (reset! footer-h (.-offsetHeight el))))

;; --- Footer (dynamic height-aware) -------------------------------------------

(defonce footer-h (r/atom 0))

(defn ^:private measure-footer! []
  (when-let [el (.getElementById js/document "editorFooter")]
    (reset! footer-h (.-offsetHeight el))))

(defn footer []
  (r/create-class
   {:component-did-mount
    (fn []
      (measure-footer!)
      ;; Re-measure on viewport changes (e.g., mobile rotation, zoom changes)
      (.addEventListener js/window "resize" measure-footer!)
      (.addEventListener js/window "orientationchange" measure-footer!))
    :component-did-update
    (fn [_] (measure-footer!))
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
            {:keys [total correct pct cheats]} (score-data db)]
        [:div.editor-footer {:id "editorFooter"
                             ;; keep footer fixed; height is measured to make room above it
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
          [:span.label "Time"]
          [:span.metric (fmt-mm-ss (get-in db [:timer :elapsed-ms]))]
          [:span.footer-separator "|"]
          [:span.label "Score"]
          [:span.metric (str correct "/" total " (" pct "%)")]
          [:span.footer-separator "|"]
          [:span.label "Cheats"]
          [:span.metric cheats]]
         [:div.footer-section
          [:button.btn-primary {:on-click #(toggle-pause!)}
           (if (get-in db [:timer :paused?]) "Resume" "Pause")]
          [:button.btn-danger {:on-click #(reset-game!)} "Reset"]
          [:button.btn-primary {:title "Press and hold to reveal answers"
                                :on-pointer-down #(start-cheat!)}
           "Cheat (hold)"]]]))}))


(defn completion-modal []
  (let [{:keys [completed? timer]} @app-db
        {:keys [total correct pct cheats]} (score-data @app-db)]
    (when completed?
      [:div.modal-backdrop
       [:div.modal-card
        [:h3 {:style {:margin "0 0 8px" :font-weight 600}} "Completed! 🎉"]
        [:div {:style {:color "var(--subtext)" :margin-bottom "10px"}}
         [:div "Time: " [:strong (fmt-mm-ss (:elapsed-ms timer))]]
         [:div "Accuracy: " [:strong (str correct "/" total " (" pct "%)")]]
         [:div "Cheats: " [:strong cheats]]]
        [:div {:style {:display "flex" :gap "8px" :justify-content "flex-end"}}
         [:button.btn-secondary {:on-click #(download-results-csv!)} "Download CSV"]
         [:button.btn-primary {:on-click #(reset-game!)} "Play again"]]]])))



(defn root []
  [:div.container
   [header]
   [instructions]
   [selectors]
   [puzzle-table]
   ;; dynamic scroll buffer to push content above footer
   [:div.scroll-buffer {:aria-hidden "true"
                        :style {:height (str @footer-h "px")}}]
   [footer]
   [completion-modal]])

;; -----------------------------------------------------------------------------
;; Mount
;; -----------------------------------------------------------------------------

(defn mount! []
  (rdom/render [root] (.getElementById js/document "app"))
  (init-game! (:selected-fields @app-db))
  (start-timer!))

(mount!)
