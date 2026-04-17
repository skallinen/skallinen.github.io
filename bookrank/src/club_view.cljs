(ns club-view
  (:require [reagent.core :as r]
            [router]
            [auth]
            [db]
            [scoring]
            [add-book]
            [ranking]))

;; =============================================
;; Club View — Books, Scores, Members
;; =============================================

(println "[club-view] loaded")

(defn score-class [score]
  (cond
    (>= score 4.0) "score-high"
    (>= score 2.5) "score-mid"
    :else           "score-low"))

(defn club-detail-view [club-id]
  (let [club       (r/atom nil)
        books      (r/atom [])
        members    (r/atom [])
        rankings   (r/atom {})
        loading    (r/atom true)
        show-add   (r/atom false)
        copied     (r/atom false)
        active-tab (r/atom :scores)
        expanded-book (r/atom nil)]

    ;; Fetch data
    (db/fetch-club! club-id club)
    (db/fetch-books! club-id books)
    (db/fetch-members! club-id members)
    (db/fetch-all-rankings! club-id rankings)
    (js/setTimeout #(reset! loading false) 1500)

    (fn [club-id]
      (let [books-map    (into {} (map (fn [b] [(:id b) b]) @books))
            member-count (count @members)
            members-map  (into {} (map (fn [m] [(:id m) m]) @members))
            agg-scores   (scoring/compute-aggregate-scores @rankings member-count)
            sorted-books (sort-by (fn [b]
                                    (let [sd (get agg-scores (:id b))]
                                      (if (and sd (:all-rated? sd))
                                        (- (:score sd))
                                        100)))
                                  @books)
            current-uid  (:uid @auth/user)
            is-admin?    (or (= current-uid (:created_by @club))
                             (some (fn [m] (and (= (:id m) current-uid)
                                                (= (:role m) "admin")))
                                   @members))]
        [:div
         ;; Back link
         [:a.back-link {:on-click #(router/navigate! "#/clubs")} "← All Clubs"]

         ;; Club header
         (when @club
           [:div.section-header
            [:div
             [:h2.section-title (:name @club)]
             [:div {:style {:display "flex" :gap "12px" :align-items "center" :margin-top "6px"}}
              [:div.members-row
               (doall
                (for [m @members]
                  [:img.member-avatar
                   {:key (:id m)
                    :src (or (:photo_url m) "")
                    :title (or (:display_name m) (:email m))
                    :alt (or (:display_name m) "")}]))]
              [:span.invite-code
               {:on-click
                (fn []
                  (let [url (str (.-origin js/window.location)
                                 (.-pathname js/window.location)
                                 "#/join/"
                                 (:invite_code @club))]
                    (.writeText (.-clipboard js/navigator) url)
                    (reset! copied true)
                    (js/setTimeout #(reset! copied false) 2000)))}
               (:invite_code @club)
               (when @copied
                 [:span.invite-copied " link copied!"])]]]
            [:div {:style {:display "flex" :gap "8px"}}
             [:button.btn.btn-small
              {:on-click #(swap! show-add not)}
              (if @show-add "Cancel" "＋ Book")]
             [:button.btn.btn-small.btn-primary
              {:on-click #(router/navigate! (str "#/club/" club-id "/rank"))}
              "My Ranking"]]])

         ;; Add book form
         (when @show-add
           [add-book/add-book-form club-id
            (fn []
              (reset! show-add false)
              (db/fetch-books! club-id books))])

         ;; Loading
         (if @loading
           [:div.loading "Loading books..."]

           ;; Book list
           (if (empty? @books)
             [:div.empty-state
              [:div.empty-state-icon "📖"]
              [:div.empty-state-text "No books yet. Add the first one!"]]

             [:div
              ;; Tabs
              [:div.tabs
               [:button.tab {:class (when (= @active-tab :scores) "active")
                             :on-click #(reset! active-tab :scores)}
                "Aggregate Scores"]
               [:button.tab {:class (when (= @active-tab :members) "active")
                             :on-click #(reset! active-tab :members)}
                (str "Members (" (count @members) ")")]]

              (case @active-tab
                :scores
                [:div.book-list
                 (doall
                  (map-indexed
                   (fn [idx book]
                     (let [score-data (get agg-scores (:id book))
                           fully-rated? (and score-data (:all-rated? score-data))
                           is-expanded? (= @expanded-book (:id book))]
                       [:div {:key (:id book)}
                        [:div.book-item
                         {:style (when fully-rated? {:cursor "pointer"})
                          :on-click (when fully-rated?
                                      (fn [] (swap! expanded-book
                                                    #(if (= % (:id book)) nil (:id book)))))}
                         [:span.book-rank (str (inc idx))]
                         [:div.book-info
                          [:div.book-title (:title book)]
                          [:div.book-author (:author book)]]
                         (if fully-rated?
                           [:div {:style {:text-align "right"}}
                            [:div.book-score {:class (score-class (:score score-data))}
                             (:display score-data)]
                            [:div.book-voters (str (:voter-count score-data) "/" member-count
                                                   (when (pos? (count (:unread-by score-data)))
                                                     (str " +" (count (:unread-by score-data)) "☐")))]]
                           [:div.book-score {:style {:color "var(--color-muted)"}} "—"])]
                        ;; Expanded member ratings
                        (when (and fully-rated? is-expanded?)
                          [:div.member-ratings
                           (doall
                            (for [{:keys [uid score]} (:member-scores score-data)]
                              (let [member (get members-map uid)]
                                [:div.member-rating-row {:key uid}
                                 [:img.member-avatar-small
                                  {:src (or (:photo_url member) "")
                                   :alt (or (:display_name member) "")}]
                                 [:span.member-name (or (:display_name member) "Unknown")]
                                 [:span.member-score {:class (score-class score)}
                                  (.toFixed score 1)]])))
                           (doall
                            (for [uid (:unread-by score-data)]
                              (let [member (get members-map uid)]
                                [:div.member-rating-row {:key (str uid "-unread")}
                                 [:img.member-avatar-small
                                  {:src (or (:photo_url member) "")
                                   :alt (or (:display_name member) "")}]
                                 [:span.member-name (or (:display_name member) "Unknown")]
                                 [:span {:style {:opacity 0.5 :font-size "0.85em"}} "unread"]])))])]))
                   sorted-books))]

                :members
                [:div
                 (doall
                  (for [m @members]
                    [:div.book-item {:key (:id m)}
                     [:img.member-avatar {:src (or (:photo_url m) "")
                                          :alt (or (:display_name m) "")}]
                     [:div.book-info
                      [:div.book-title
                       (or (:display_name m) "Unknown")
                       (when (= (:role m) "admin")
                         [:span {:style {:font-size "0.7em" :opacity 0.5 :margin-left "8px"}} "ADMIN"])]
                      [:div.book-author (or (:email m) "")]]
                     [:div {:style {:display "flex" :gap "8px" :align-items "center"}}
                      (let [member-ranking (get @rankings (:id m))]
                        [:div.book-voters
                         (if member-ranking
                           (str (count (:order member-ranking)) " ranked")
                           "Not ranked yet")])
                      (when (and is-admin? (not= (:id m) current-uid))
                        [:button.btn.btn-small
                         {:style {:font-size "0.7em" :padding "2px 8px" :color "#c00"}
                          :on-click (fn [e]
                                      (.stopPropagation e)
                                      (let [name (or (:display_name m) "this member")
                                            mid  (:id m)]
                                        (js/setTimeout
                                         (fn []
                                           (when (js/confirm (str "Remove " name "?"))
                                             (db/delete-member! club-id mid
                                                                #(db/fetch-members! club-id members))))
                                         10)))}
                         "✕"])]]))])]))]))))

(defn ranking-page-view [club-id]
  (let [books   (r/atom [])
        loading (r/atom true)]
    (db/fetch-books! club-id books)
    (js/setTimeout #(reset! loading false) 1000)

    (fn [club-id]
      (let [books-map (into {} (map (fn [b] [(:id b) b]) @books))]
        [:div
         [:a.back-link {:on-click #(router/navigate! (str "#/club/" club-id))} "← Back to Club"]
         [:div.section-header
          [:div
           [:h2.section-title "Your Ranking"]
           [:p.section-subtitle "Drag books to reorder. Best at top, worst at bottom."]]]
         (if @loading
           [:div.loading "Loading books..."]
           (if (empty? @books)
             [:div.empty-state
              [:div.empty-state-icon "📖"]
              [:div.empty-state-text "No books to rank yet."]]
             [ranking/ranking-view club-id books-map]))]))))
