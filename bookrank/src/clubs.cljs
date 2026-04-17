(ns clubs
  (:require [reagent.core :as r]
            [router]
            [auth]
            [db]))

;; =============================================
;; Clubs View — List, Create, Join
;; =============================================

(println "[clubs] loaded")

(defn clubs-view []
  (let [clubs       (r/atom [])
        loading     (r/atom true)
        show-create (r/atom false)
        show-join   (r/atom false)
        club-name   (r/atom "")
        invite-code (r/atom "")
        creating    (r/atom false)
        joining     (r/atom false)]

    ;; Fetch clubs on mount
    (db/fetch-clubs! clubs)
    (js/setTimeout #(reset! loading false) 1500)

    (fn []
      [:div
       [:div.section-header
        [:div
         [:h2.section-title "Your Book Clubs"]
         [:p.section-subtitle "Create a new club or join one with an invite code."]]
        [:div {:style {:display "flex" :gap "8px"}}
         [:button.btn.btn-small {:on-click #(swap! show-join not)} "Join"]
         [:button.btn.btn-small.btn-primary {:on-click #(swap! show-create not)} "Create"]]]

       ;; Join form
       (when @show-join
         [:div.card {:style {:margin-bottom "16px"}}
          [:div.form-inline
           [:div.form-group
            [:label.form-label "Invite Code"]
            [:input.form-input {:type "text"
                                :value @invite-code
                                :placeholder "e.g. ABC123"
                                :max-length 6
                                :style {:text-transform "uppercase" :letter-spacing "0.15em"}
                                :on-change #(reset! invite-code (-> % .-target .-value))}]]
           [:button.btn.btn-primary
            {:disabled @joining
             :on-click (fn []
                         (when (seq @invite-code)
                           (reset! joining true)
                           (db/join-club! @invite-code
                                          (fn [club-id]
                                            (reset! joining false)
                                            (reset! invite-code "")
                                            (reset! show-join false)
                                            (router/navigate! (str "#/club/" club-id))))))}
            (if @joining "Joining..." "Join")]]])

       ;; Create form
       (when @show-create
         [:div.card {:style {:margin-bottom "16px"}}
          [:div.form-inline
           [:div.form-group
            [:label.form-label "Club Name"]
            [:input.form-input {:type "text"
                                :value @club-name
                                :placeholder "e.g. Thursday Reads"
                                :on-change #(reset! club-name (-> % .-target .-value))}]]
           [:button.btn.btn-primary
            {:disabled @creating
             :on-click (fn []
                         (when (seq @club-name)
                           (reset! creating true)
                           (db/create-club! @club-name
                                            (fn [club-id]
                                              (reset! creating false)
                                              (reset! club-name "")
                                              (reset! show-create false)
                                              (router/navigate! (str "#/club/" club-id))))))}
            (if @creating "Creating..." "Create")]]])

       ;; Club list
       (if @loading
         [:div.loading "Loading your clubs..."]
         (if (empty? @clubs)
           [:div.empty-state
            [:div.empty-state-icon "📚"]
            [:div.empty-state-text "No book clubs yet. Create one or join with an invite code."]]
           [:div.club-grid
            (doall
             (for [club @clubs]
               [:div.card.club-card
                {:key (:id club)
                 :on-click #(router/navigate! (str "#/club/" (:id club)))}
                [:div
                 [:div.card-title (:name club)]
                 [:div.card-subtitle (str "Code: " (:invite_code club))]]
                [:div.club-meta
                 [:span "→"]]]))]))])))
