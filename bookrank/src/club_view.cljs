(ns club-view
  (:require [reagent.core :as r]
            [router]
            [auth]
            [db]
            [scoring]
            [add-book]
            [ranking]
            [state]))

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
  (let [;; UI-only state (local to this component)
        show-add   (r/atom false)
        copied     (r/atom false)
        active-tab (r/atom :ranking)
        expanded-book (r/atom nil)
        confirm-remove (r/atom nil)]

    ;; Reset state if navigating to a different club
    (when (not= club-id @state/current-club-id)
      (state/reset-club-state!)
      (reset! state/current-club-id club-id))

    ;; Subscribe to real-time data (auto-updates when any member saves)
    (state/add-subscription! (db/subscribe-club! club-id state/club))
    (state/add-subscription! (db/subscribe-books! club-id state/books))
    (state/add-subscription! (db/subscribe-members! club-id state/members))
    (state/add-subscription! (db/subscribe-rankings! club-id state/rankings))
    ;; First snapshot arrives almost instantly; timeout is a fallback
    (js/setTimeout #(reset! state/club-loading false) 1500)

    (fn [club-id]
      (let [books-map    (into {} (map (fn [b] [(:id b) b]) @state/books))
            member-ids   (mapv :id @state/members)
            members-map  (into {} (map (fn [m] [(:id m) m]) @state/members))
            all-book-ids (set (keys books-map))
            agg-scores   (scoring/compute-aggregate-scores @state/rankings member-ids all-book-ids)
            sorted-books (sort-by (fn [b]
                                    (let [sd (get agg-scores (:id b))]
                                      (if (and sd (not (:any-unranked? sd)))
                                        (- (or (:rrf-score sd) 0))
                                        100)))
                                  @state/books)
            current-uid  (:uid @auth/user)
            confirm?     (boolean (:confirm_ranking @state/club))
            is-admin?    (or (= current-uid (:created_by @state/club))
                             (some (fn [m] (and (= (:id m) current-uid)
                                                (= (:role m) "admin")))
                                   @state/members))]
        [:div
         ;; Back link
         [:a.back-link {:on-click #(router/navigate! "#/clubs")} "← All Clubs"]

         ;; Club header
         (when @state/club
           [:div.section-header
            [:div
             [:h2.section-title (:name @state/club)]
             [:div {:style {:display "flex" :gap "12px" :align-items "center" :margin-top "6px"}}
              [:div.members-row
               (doall
                (for [m @state/members]
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
                                 (:invite_code @state/club))]
                    (.writeText (.-clipboard js/navigator) url)
                    (reset! copied true)
                    (js/setTimeout #(reset! copied false) 2000)))}
               (:invite_code @state/club)
               (when @copied
                 [:span.invite-copied " link copied!"])]]]
            [:div {:style {:display "flex" :gap "8px"}}
             [:button.btn.btn-small
              {:on-click #(swap! show-add not)}
              (if @show-add "Cancel" "＋ Book")]]])

         ;; Add book form
         (when @show-add
           [add-book/add-book-form club-id
            (fn [] (reset! show-add false))])

         ;; Loading
         (if @state/club-loading
           [:div.loading "Loading books..."]

           ;; Book list
           (if (empty? @state/books)
             [:div.empty-state
              [:div.empty-state-icon "📖"]
              [:div.empty-state-text "No books yet. Add the first one!"]]

             [:div
              ;; Tabs
              [:div.tabs
               [:button.tab {:class (when (= @active-tab :ranking) "active")
                             :on-click #(reset! active-tab :ranking)}
                "My Ranking"]
               [:button.tab {:class (when (= @active-tab :scores) "active")
                             :on-click #(reset! active-tab :scores)}
                "Aggregate Scores"]
               [:button.tab {:class (when (= @active-tab :members) "active")
                             :on-click #(reset! active-tab :members)}
                (str "Members (" (count @state/members) ")")]]

              (case @active-tab
                :ranking
                [ranking/ranking-view club-id books-map confirm?]

                :scores

                [:div.book-list
                 [:div {:style {:font-size "0.8em" :opacity 0.7 :padding "4px 8px 10px" :line-height "1.4"}}
                  "Collective rank uses "
                  [:strong "reciprocal rank fusion"]
                  " to merge everyone's lists. Scores (1–5) follow a normal distribution. "
                  "A score only appears once every member has ranked or skipped a book."]
                 (doall
                  (map-indexed
                   (fn [idx book]
                     (let [score-data (get agg-scores (:id book))
                           show-score? (and score-data (not (:any-unranked? score-data)))
                           is-expanded? (= @expanded-book (:id book))]
                       [:div {:key (:id book)}
                        [:div.book-item
                         {:style (when show-score? {:cursor "pointer"})
                          :on-click (when show-score?
                                      (fn [] (swap! expanded-book
                                                    #(if (= % (:id book)) nil (:id book)))))}
                         [:span.book-rank (str (inc idx))]
                         [:div.book-info
                          [:div.book-title (:title book)]
                          [:div.book-author (:author book)]]
                         (if show-score?
                           [:div {:style {:text-align "right"}}
                            [:div.book-score {:class (score-class (:score score-data))}
                             (:display score-data)]
                            [:div.book-voters (str (:voter-count score-data) "/" (count member-ids)
                                                   (when (pos? (count (:unread-by score-data)))
                                                     (str " +" (count (:unread-by score-data)) "☐")))]]
                           [:div {:style {:text-align "right"}
                                  :title "Score appears once every member has ranked or skipped this book"}
                            [:div.book-score {:style {:color "var(--color-accent)"}} "—"]
                            (when score-data
                              [:div.book-voters (str (:voter-count score-data) "/" (count member-ids))])])]
                        ;; Expanded member ratings
                        (when (and show-score? is-expanded?)
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
                                 [:span {:style {:opacity 0.5 :font-size "0.85em"}} "skipped"]])))])]))
                   sorted-books))]

                :members
                [:div
                 (doall
                  (for [m @state/members]
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
                      (let [member-ranking (get @state/rankings (:id m))]
                        [:div.book-voters
                         (if member-ranking
                           (str (count (:order member-ranking)) " ranked")
                           "Not ranked yet")])
                      (when (and is-admin? (not= (:id m) current-uid))
                        (if (= @confirm-remove (:id m))
                          [:div {:style {:display "flex" :gap "4px"}}
                           [:button.btn.btn-small
                            {:style {:font-size "0.7em" :padding "2px 8px" :background "#c00" :color "#fff"}
                             :on-click (fn [e]
                                         (.stopPropagation e)
                                         (let [mid (:id m)]
                                           (db/delete-member! club-id mid
                                                              (fn []
                                                                (reset! confirm-remove nil)
                                                                ;; No manual fetch needed — subscriptions auto-update
                                                                ))))}
                            "Remove?"]
                           [:button.btn.btn-small
                            {:style {:font-size "0.7em" :padding "2px 8px"}
                             :on-click (fn [e]
                                         (.stopPropagation e)
                                         (reset! confirm-remove nil))}
                            "Cancel"]]
                          [:button.btn.btn-small
                           {:style {:font-size "0.7em" :padding "2px 8px" :color "#c00"}
                            :on-click (fn [e]
                                        (.stopPropagation e)
                                        (reset! confirm-remove (:id m)))}
                           "✕"]))       ;; close button vec, if, when
                      ]]               ;; close div flex, div.book-item
                    ))                 ;; close for, doall
                  ;; Admin settings
                  (when is-admin?
                    [:div {:style {:margin-top "20px"
                                  :padding "12px"
                                  :border-top "1px solid var(--color-border)"}}
                     [:div {:style {:font-size "0.85em"
                                    :font-weight "600"
                                    :margin-bottom "8px"
                                    :opacity 0.7}}
                      "Club Settings"]
                     [:label {:style {:display "flex"
                                      :align-items "center"
                                      :gap "8px"
                                      :font-size "0.85em"
                                      :cursor "pointer"}}
                      [:input {:type "checkbox"
                               :checked (boolean (:confirm_ranking @state/club))
                               :on-change
                               (fn [e]
                                 (let [v (.. e -target -checked)]
                                   (swap! state/club assoc :confirm_ranking v)
                                   (db/update-club-settings!
                                    club-id
                                    {:confirm_ranking v}
                                    nil)))}]
                      "Require confirm after ranking changes"]])]
                  )                    ;; close case
                  ]                    ;; close [:div (line 114)
                  )                    ;; close if (line 109)
                  )                    ;; close if (line 105)
                  ]                    ;; close [:div (line 58)
                  ))))                 ;; close fn, let, outer let, defn



(defn ranking-page-view [club-id]
  (let [loading (r/atom true)
        club    (r/atom nil)]
    (db/fetch-books! club-id state/books)
    (db/fetch-club! club-id club)
    (js/setTimeout #(reset! loading false) 1000)

    (fn [club-id]
      (let [books-map (into {} (map (fn [b] [(:id b) b]) @state/books))
            confirm?  (boolean (:confirm_ranking @club))]
        [:div
         [:a.back-link {:on-click #(router/navigate! (str "#/club/" club-id))} "← Back to Club"]
         [:div.section-header
          [:div
           [:h2.section-title "Your Ranking"]
           [:p.section-subtitle "Drag books to reorder. Best at top, worst at bottom."]]]
         (if @loading
           [:div.loading "Loading books..."]
           (if (empty? @state/books)
             [:div.empty-state
              [:div.empty-state-icon "📖"]
              [:div.empty-state-text "No books to rank yet."]]
             [ranking/ranking-view club-id books-map confirm?]))]))))
