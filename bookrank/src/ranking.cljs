(ns ranking
  (:require [reagent.core :as r]
            [scoring]
            [db]
            [auth]))

;; =============================================
;; Ranking View — Drag-and-Drop Book Ranking
;; Three states per book: ranked, unranked, unread
;; Uses SortableJS for drag-and-drop.
;; =============================================

(println "[ranking] loaded")

(defonce sortable-instance (atom nil))

(defn init-sortable!
  "Initialize SortableJS on the ranking list element.
   on-reorder is called with the new order of book IDs."
  [el on-reorder]
  (when (and el (some? (aget js/window "Sortable")))
    ;; Destroy previous instance
    (when @sortable-instance
      (.destroy @sortable-instance))
    (reset! sortable-instance
            (js/Sortable. el
                          (clj->js {:animation  150
                                    :ghostClass "sortable-ghost"
                                    :chosenClass "sortable-chosen"
                                    :handle     ".drag-handle"
                                    :onEnd      (fn [evt]
                                                  ;; Read new order from DOM
                                                  (let [items (.querySelectorAll el "[data-book-id]")
                                                        ids   (mapv #(.getAttribute % "data-book-id")
                                                                    (seq items))]
                                                    (on-reorder ids)))})))))

(defn ranking-view
  "The drag-and-drop ranking view for a club."
  [club-id books-map confirm?]
  (let [order    (r/atom [])
        unread   (r/atom #{})
        saving   (r/atom false)
        saved    (r/atom false)
        loaded   (r/atom false)
        list-ref (atom nil)
        dirty    (r/atom false)
        save-timer (atom nil)
        do-save! (fn []
                   ;; Debounced autosave: waits 500ms after last action
                   (when @save-timer (js/clearTimeout @save-timer))
                   (reset! save-timer
                           (js/setTimeout
                            (fn []
                              (reset! saving true)
                              (db/save-ranking!
                               club-id
                               (filterv #(not (contains? @unread %)) @order)
                               (vec @unread)
                               (fn []
                                 (reset! saving false)
                                 (reset! saved true)
                                 (reset! dirty false)
                                 (js/setTimeout #(reset! saved false) 2000))))
                            500)))]

    ;; Load existing ranking
    (let [ranking-data (r/atom nil)]
      (db/fetch-ranking! club-id ranking-data)
      ;; Use a timeout to wait for fetch
      (js/setTimeout
       (fn []
         (let [data @ranking-data
               all-book-ids (set (keys books-map))
               existing-order (or (:order data) [])
               existing-unread (set (or (:unread data) []))
               ;; Books in order that still exist
               valid-order (filterv #(contains? all-book-ids %) existing-order)
               valid-unread (set (filter #(contains? all-book-ids %) existing-unread))]
           ;; New books not in order or unread stay "unranked" (not stored anywhere)
           (reset! order valid-order)
           (reset! unread valid-unread)
           (reset! loaded true)))
       500))

    (fn [club-id books-map confirm?]
      (let [order-set    (set @order)
            unread-set   @unread
            ranked-books (filterv #(not (contains? unread-set %)) @order)
            unread-books (filterv #(contains? unread-set %) (keys books-map))
            ;; Unranked = not in order AND not in unread
            unranked-books (filterv #(and (not (contains? order-set %))
                                         (not (contains? unread-set %)))
                                    (keys books-map))
            total        (count ranked-books)]
        [:div
         ;; Help tips
         [:details {:style {:margin-bottom "12px" :font-size "0.82em" :opacity 0.8}}
          [:summary {:style {:cursor "pointer" :color "var(--color-accent)"}} "ℹ How this works"]
          [:div {:style {:padding "8px 12px" :line-height "1.5"}}
           [:p "Drag books to reorder. Best at top, worst at bottom. The order is what matters — the score is just a representation."]
           [:p {:style {:margin-top "6px"}} "📊 = add to your ranking · 📕 = mark as unread (haven't read it) · ↩ = remove from ranking"]
           [:p {:style {:margin-top "6px"}} "Leave books " [:strong "unranked"] " if you're currently reading or plan to. Only mark " [:strong "unread"] " if it will stay unread for now."]
           [:p {:style {:margin-top "6px"}} "Can't remember a book? Put it in the middle — if it wasn't memorable enough to recall, it's probably average."]]]
         ;; Ranked books (sortable)
         [:div.ranking-list
          {:ref (fn [el]
                  (when (and el @loaded (not= el @list-ref))
                    (reset! list-ref el)
                    (js/setTimeout
                     #(init-sortable! el
                                      (fn [new-ids]
                                        (reset! order
                                                (into (vec new-ids)
                                                      (filterv (fn [id] (contains? @unread id))
                                                               @order)))
                                        (if confirm?
                                          (reset! dirty true)
                                          (do-save!))))
                     100)))}
          (when @loaded
            (doall
             (map-indexed
              (fn [idx book-id]
                (let [book  (get books-map book-id)
                      score (scoring/rank->score idx total)]
                  [:div.ranking-item
                   {:key          book-id
                    :data-book-id book-id}
                   [:span.drag-handle "⠿"]
                   [:span.ranking-position (str (inc idx))]
                   [:div.book-info
                    [:div.book-title (or (:title book) book-id)]
                    [:div.book-author (or (:author book) "")]]
                   [:span.ranking-score
                    {:class (cond
                              (>= (:raw score) 4.0) "score-high"
                              (>= (:raw score) 2.5) "score-mid"
                              :else                  "score-low")}
                    (:display score)]
                   [:div {:style {:display "flex" :gap "2px"}}
                    [:button.btn-icon
                     {:title    "Mark as unread"
                      :on-click (fn [e]
                                  (.stopPropagation e)
                                  (swap! unread conj book-id)
                                  (do-save!))}
                     "📕"]
                    [:button.btn-icon
                     {:title    "Remove from ranking"
                      :on-click (fn [e]
                                  (.stopPropagation e)
                                  (swap! order (fn [o] (filterv #(not= % book-id) o)))
                                  (do-save!))}
                     "↩"]]]))
              ranked-books)))]

         ;; Unranked section (new books not yet ranked or marked unread)
         (when (seq unranked-books)
           [:div.unread-section
            [:div.unread-label "Unranked"]
            (doall
             (for [book-id unranked-books]
               (let [book (get books-map book-id)]
                 [:div.unread-item {:key book-id}
                  [:div.book-info
                   [:div.book-title (or (:title book) book-id)]
                   [:div.book-author (or (:author book) "")]]
                  [:div {:style {:display "flex" :gap "4px"}}
                   [:button.btn-icon
                    {:title    "Add to ranking"
                     :on-click (fn []
                                 (swap! order conj book-id)
                                 (if confirm?
                                   (reset! dirty true)
                                   (do-save!)))}
                    "📊"]
                   [:button.btn-icon
                    {:title    "Mark as unread"
                     :on-click (fn []
                                 (swap! unread conj book-id)
                                 (if confirm?
                                   (reset! dirty true)
                                   (do-save!)))}
                    "📕"]]])))])

         ;; Unread section
         (when (seq unread-books)
           [:div.unread-section
            [:div.unread-label "Unread"]
            (doall
             (for [book-id unread-books]
               (let [book (get books-map book-id)]
                 [:div.unread-item {:key book-id}
                  [:div.book-info
                   [:div.book-title (or (:title book) book-id)]
                   [:div.book-author (or (:author book) "")]]
                  [:button.btn-icon
                   {:title    "Mark as read"
                    :on-click (fn []
                                (swap! unread disj book-id)
                                ;; Add back to end of order if not present
                                (when-not (some #{book-id} @order)
                                  (swap! order conj book-id))
                                (do-save!))}
                   "📖"]])))])

         ;; Confirm ranking button (fixed bar at bottom after drag reorder)
         (when @dirty
           [:div {:style {:position "fixed" :bottom "0" :left "0" :right "0"
                          :background "var(--color-bg)" :border-top "2px solid var(--color-accent)"
                          :padding "12px" :text-align "center" :z-index "100"
                          :box-shadow "0 -2px 8px rgba(0,0,0,0.15)"}}
            [:button.btn.btn-primary
             {:disabled @saving
              :on-click (fn [] (do-save!))}
             "Confirm Ranking"]])

         ;; Autosave status
         [:div {:style {:margin-top "8px" :text-align "center"}}
          (cond
            @saving [:span {:style {:color "var(--color-accent)" :font-size "0.8rem"}} "Saving..."]
            @saved  [:span.invite-copied "✓ Saved"]
            :else   nil)]]))))
