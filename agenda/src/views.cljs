(ns views
  (:require [reagent.core :as r]
            [clojure.string :as str]
            [config]
            [interactions]
            [domain]
            [layout]
            [router]
            [auth]
            [state]
            [db]
            [render]))

;; =============================================
;; Views: login, agenda list, year view, editors.
;; Disposable tier (Layer 9).
;; =============================================

(println "[views] loaded")

;; -- Login --

(defn google-icon []
  [:svg {:viewBox "0 0 24 24" :width "20" :height "20"}
   [:path {:d "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" :fill "#4285F4"}]
   [:path {:d "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" :fill "#34A853"}]
   [:path {:d "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" :fill "#FBBC05"}]
   [:path {:d "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" :fill "#EA4335"}]])

(defn login-view []
  [:div.login-container
   [:h1.login-title "Agenda"]
   [:p.login-subtitle "See a quarter of family life in one eyeful. Plan a year in one scroll."]
   [:button.google-btn {:on-click auth/sign-in!}
    [google-icon]
    "Sign in with Google"]])

;; -- Agenda list (create / join) --

(defn agendas-view []
  (let [show-create (r/atom false)
        show-join   (r/atom false)
        agenda-name (r/atom "")
        invite-code (r/atom "")
        busy        (r/atom false)]
    (db/fetch-agendas! state/agendas)
    (js/setTimeout #(reset! state/agendas-loading false) 1500)
    (fn []
      (let [agendas @state/agendas
            loading @state/agendas-loading]
        [:div
         [:div.section-header
          [:div
           [:div.section-label "family yearplanner"]
           [:h2.section-title "Your Agendas"]
           [:p.section-subtitle "Create a family agenda or join one with an invite code."]]
          [:div {:style {:display "flex" :gap "8px"}}
           [:button.btn.btn-small {:on-click #(swap! show-join not)} "Join"]
           [:button.btn.btn-small.btn-primary {:on-click #(swap! show-create not)} "Create"]]]

         (when @show-join
           [:div.card {:style {:margin-bottom "12px"}}
            [:div.form-inline
             [:div.form-group
              [:label.form-label "Invite Code"]
              [:input.form-input {:type "text" :value @invite-code
                                  :aria-label (:label interactions/invite-code-field)
                                  :placeholder "e.g. ABC123" :max-length 6
                                  :style {:text-transform "uppercase" :letter-spacing "0.15em"}
                                  :on-change #(reset! invite-code (-> % .-target .-value))}]]
             [:button.btn.btn-primary
              {:disabled @busy
               :on-click (fn []
                           (when (seq @invite-code)
                             (reset! busy true)
                             (db/join-agenda! @invite-code
                                              (fn [aid]
                                                (reset! busy false)
                                                (when aid
                                                  (router/navigate! (str "#/agenda/" aid)))))))}
              "Join"]]])

         (when @show-create
           [:div.card {:style {:margin-bottom "12px"}}
            [:div.form-inline
             [:div.form-group
              [:label.form-label "Agenda Name"]
              [:input.form-input {:type "text" :value @agenda-name
                                  :aria-label (:label interactions/agenda-name-field)
                                  :placeholder "e.g. Familjen"
                                  :on-change #(reset! agenda-name (-> % .-target .-value))}]]
             [:button.btn.btn-primary
              {:disabled @busy
               :on-click (fn []
                           (when (seq @agenda-name)
                             (reset! busy true)
                             (db/create-agenda! @agenda-name
                                                (fn [aid]
                                                  (reset! busy false)
                                                  (router/navigate! (str "#/agenda/" aid))))))}
              "Create"]]])

         (if loading
           [:div.loading "Loading your agendas..."]
           (if (empty? agendas)
             [:div.empty-state
              [:div.empty-state-icon "🗓️"]
              [:div.empty-state-text "No agendas yet. Create one, or join with an invite code."]]
             [:div.agenda-grid
              (doall
               (for [a agendas]
                 [:div.card.agenda-card
                  {:key (:id a)
                   :on-click #(router/navigate! (str "#/agenda/" (:id a)))}
                  [:div
                   [:div.card-title (:name a)]
                   [:div.card-subtitle (str "Code: " (:invite_code a))]]
                  [:span "→"]]))]))]))))

;; -- Persons management --

(defn persons-bar [aid]
  (let [adding    (r/atom false)
        new-name  (r/atom "")
        new-color (r/atom (:hex (first config/person-colors)))]
    (fn [aid]
      (let [persons (state/persons-sorted)
            hidden  @state/hidden-persons
            flip!   (fn [k] (swap! state/hidden-persons
                                   #(if (% k) (disj % k) (conj % k))))]
        [:div.persons-bar
         (doall
          (for [p persons]
            [:span.person-chip
             {:key (:id p)
              :class (when (hidden (:id p)) "off")
              :role "button"
              :aria-label (:name (interactions/toggle-person (:name p)))
              :aria-pressed (str (not (hidden (:id p))))
              :title "Click to hide/show"
              :on-click #(flip! (:id p))}
             [:span.person-dot {:style {:background (:color p)}}]
             (:name p)
             [:span.chip-x
              {:role "button"
               :aria-label (:name (interactions/remove-person (:name p)))
               :on-click (fn [e]
                           (.stopPropagation e)
                           (when (js/confirm (str "Remove " (:name p) "?"))
                             (db/delete-doc! aid "persons" (:id p) nil)))}
              "×"]]))
         [:span.person-chip
          {:class (when (hidden :others) "off")
           :role "button"
           :aria-label (:name (interactions/toggle-person "others"))
           :aria-pressed (str (not (hidden :others)))
           :title "Guests, logistics, subscribed feeds"
           :on-click #(flip! :others)}
          [:span.person-dot {:style {:background "#9a958e"}}]
          "Others"]
         (if @adding
           [:span {:style {:display "inline-flex" :gap "6px" :align-items "center"}}
            [:input.form-input {:type "text" :value @new-name
                                :placeholder "Name"
                                :aria-label (:label interactions/person-name-field)
                                :style {:min-width "100px"}
                                :on-change #(reset! new-name (-> % .-target .-value))}]
            (doall
             (for [{:keys [name hex]} config/person-colors]
               [:span.color-swatch
                {:key hex
                 :class (when (= hex @new-color) "selected")
                 :title name
                 :aria-label name
                 :role "button"
                 :style {:background hex}
                 :on-click #(reset! new-color hex)}]))
            [:button.btn.btn-small.btn-primary
             {:on-click (fn []
                          (when (seq @new-name)
                            (db/add-doc! aid "persons"
                                         {:name @new-name
                                          :color @new-color
                                          :lane_order (count @state/persons)}
                                         nil)
                            (reset! new-name "")
                            (reset! adding false)))}
             (:name interactions/confirm-person)]
            [:button.btn.btn-small {:on-click #(reset! adding false)} "×"]]
           [:button.btn.btn-small {:on-click #(reset! adding true)}
            (:name interactions/add-person)])]))))

;; -- Invite (owner shares link) --
;; The URL itself is desktop furniture; the ACTION is copying. On
;; mobile only the copy button survives (inside the ☰ menu).

(defn- invite-link []
  (when-let [a @state/agenda]
    (str (.-origin js/window.location)
         (.-pathname js/window.location)
         "#/join/" (:invite_code a))))

(defn copy-invite-btn []
  (let [copied (r/atom false)]
    (fn []
      [:button.btn.btn-small
       {:aria-label (:name interactions/copy-invite)
        :on-click (fn []
                    (when-let [link (invite-link)]
                      (.writeText (.-clipboard js/navigator) link)
                      (reset! copied true)
                      (js/setTimeout #(reset! copied false) 1500)))}
       (if @copied "Copied!" "Copy invite")])))

(defn invite-row []
  (when-let [link (invite-link)]
    [:div.invite-row
     [:span.invite-link {:title "Invite link"} link]
     [copy-invite-btn]]))

;; -- Calendar subscriptions (design: derived like Anchors, read-only) --

(defn- fetch-sub!
  "Fetch + parse one subscription into derived marks/periods."
  [{:keys [id url]}]
  (when-not (contains? @state/sub-events id)
    (swap! state/sub-events assoc id {:status :loading})
    (db/fetch-calendar!
     url
     (fn [{:keys [format body] :as result}]
       (if result
         (let [events (case format
                        :nager (domain/nager-json->events body)
                        :gcal  (domain/gcal-json->events body)
                        (domain/parse-ics body))
               items  (domain/ics-events->items events id)]
           (swap! state/sub-events assoc id (assoc items :status :ok)))
         (swap! state/sub-events assoc id {:status :error}))))))

(defonce _ics-watcher
  (add-watch state/cal-subs :ics-fetch
             (fn [_ _ _ subs] (doseq [s subs] (fetch-sub! s)))))

(defonce show-calendars (r/atom false))
(defonce show-menu      (r/atom false))   ;; mobile ☰ dropdown

(defn calendars-modal [aid]
  (when @show-calendars
    (let [new-name (r/atom "")
          new-url  (r/atom "")]
      (fn [aid]
        (when @show-calendars
          (let [close! #(reset! show-calendars false)]
            [:div.modal-overlay {:on-click close!}
             [:div.modal {:on-click #(.stopPropagation %)
                          :role (:role interactions/calendars-dialog)
                          :aria-label (:name interactions/calendars-dialog)}
              [:div.modal-title "Subscribed calendars"]
              [:p {:style {:font-size "0.75rem" :opacity 0.6}}
               "Single all-day events become day marks; multi-day events become periods. Read-only, refreshed daily."]
              (doall
               (for [s @state/cal-subs]
                 (let [ev (get @state/sub-events (:id s))]
                   [:div {:key (:id s)
                          :style {:display "flex" :gap "8px" :align-items "center"}}
                    [:span {:style {:font-weight 700}} (:name s)]
                    [:span {:style {:font-size "0.7rem" :opacity 0.5}}
                     (case (:status ev)
                       :ok      (str (count (:marks ev)) " days, "
                                     (count (:periods ev)) " periods")
                       :loading "loading…"
                       :error   "fetch failed"
                       "")]
                    [:span {:style {:flex 1}}]
                    [:button.btn.btn-small
                     {:aria-label (:name (interactions/remove-calendar (:name s)))
                      :on-click (fn []
                                  (swap! state/sub-events dissoc (:id s))
                                  (db/delete-doc! aid "subscriptions" (:id s) nil))}
                     "×"]])))
              [:div.modal-row
               [:div.form-group
                [:label.form-label "Name"]
                [:input.form-input {:type "text" :value @new-name
                                    :aria-label (:label interactions/calendar-name-field)
                                    :placeholder "e.g. Suomen juhlapyhät"
                                    :on-change #(reset! new-name (-> % .-target .-value))}]]
               [:div.form-group
                [:label.form-label "URL"]
                [:input.form-input {:type "text" :value @new-url
                                    :aria-label (:label interactions/calendar-url-field)
                                    :placeholder "https://date.nager.at/api/v3/PublicHolidays/2026/FI"
                                    :style {:min-width "280px"}
                                    :on-change #(reset! new-url (-> % .-target .-value))}]]
               [:button.btn.btn-primary
                {:disabled (or (str/blank? @new-name) (str/blank? @new-url))
                 :on-click (fn []
                             (db/add-doc! aid "subscriptions"
                                          {:name @new-name :url (str/trim @new-url)}
                                          nil)
                             (reset! new-name "")
                             (reset! new-url ""))}
                (:name interactions/add-calendar)]]
              [:div.modal-actions
               [:button.btn {:on-click close!} (:name interactions/cancel)]]]]))))))

;; -- Period / mark editor modal --
;; state/editor: {:type :period|:mark  :id nil-or-existing
;;                :label "" :who #{} :start-ed .. :end-ed ..
;;                :tentative false :kind "other" :person nil}

(defn open-new-editor! [start-ed end-ed]
  (reset! state/editor
          {:type :period :id nil :label ""
           :who #{} :start-ed start-ed :end-ed end-ed
           :tentative false :kind "other" :person nil
           :comment ""}))

(defn open-period-editor! [p]
  (reset! state/editor
          {:type :period :id (:id p) :label (:label p)
           :who (set (:who p))
           :start-ed (:start-ed p) :end-ed (:end-ed p)
           :tentative (domain/tentative? p) :kind (or (:kind p) "other")
           :person nil
           :comment (or (:comment p) "")}))

(defn open-mark-editor! [m]
  (reset! state/editor
          {:type :mark :id (:id m) :label (:label m)
           :who #{} :start-ed (:date-ed m) :end-ed (:date-ed m)
           :tentative false :kind "other" :person (:person m)
           :comment (or (:comment m) "")}))

(def kinds ["travel" "vacation" "camp" "event" "visit" "other"])

(defn editor-modal [aid]
  (when-let [ed @state/editor]
    (let [close! #(reset! state/editor nil)
          period? (= :period (:type ed))
          set-field! (fn [k v] (swap! state/editor assoc k v))]
      [:div.modal-overlay {:on-click close!}
       [:div.modal {:on-click #(.stopPropagation %)
                    :role (:role interactions/editor)
                    :aria-label (:name interactions/editor)}
        [:div.modal-title (cond
                            (:id ed) "Edit"
                            period?  "New period"
                            :else    "New day mark")]
        ;; type toggle (new items only)
        (when-not (:id ed)
          [:div.type-toggle
           [:button.btn.btn-small {:class (when period? "active")
                                   :on-click #(set-field! :type :period)}
            (:name interactions/type-period)]
           [:button.btn.btn-small {:class (when-not period? "active")
                                   :on-click #(set-field! :type :mark)}
            (:name interactions/type-mark)]])
        [:div.modal-row
         [:div.form-group
          [:label.form-label "Label"]
          [:input.form-input {:type "text" :value (:label ed) :auto-focus true
                              :aria-label (:label interactions/label-field)
                              :on-change #(set-field! :label (-> % .-target .-value))}]]
         [:div.form-group
          [:label.form-label (if period? "Start" "Date")]
          [:input.form-input {:type "date"
                              :aria-label (:label (if period?
                                                    interactions/start-field
                                                    interactions/date-field))
                              :value (domain/ed->date-str (:start-ed ed))
                              :on-change #(set-field! :start-ed
                                                      (domain/date-str->ed (-> % .-target .-value)))}]]
         (when period?
           [:div.form-group
            [:label.form-label "End"]
            [:input.form-input {:type "date"
                                :aria-label (:label interactions/end-field)
                                :value (domain/ed->date-str (:end-ed ed))
                                :on-change #(set-field! :end-ed
                                                        (domain/date-str->ed (-> % .-target .-value)))}]])]
        ;; who (period: multi-select chips; mark: single person or none)
        [:div.form-group
         [:label.form-label (if period? "Who" "Whose day (optional)")]
         [:div.persons-bar
          (doall
           (for [p (state/persons-sorted)]
             (let [sel? (if period?
                          (contains? (:who ed) (:id p))
                          (= (:person ed) (:id p)))]
               [:span.person-chip
                {:key (:id p)
                 :class (when sel? "selected")
                 :on-click (fn []
                             (if period?
                               (set-field! :who ((if sel? disj conj) (:who ed) (:id p)))
                               (set-field! :person (when-not sel? (:id p)))))}
                [:span.person-dot {:style {:background (:color p)}}]
                (:name p)])))]]
        (when period?
          [:div.modal-row
           [:div.form-group
            [:label.form-label "Kind"]
            [:select.form-select
             {:value (:kind ed)
              :aria-label (:label interactions/kind-field)
              :on-change #(set-field! :kind (-> % .-target .-value))}
             (for [k kinds] ^{:key k} [:option {:value k} k])]]
           [:label {:style {:display "flex" :gap "6px" :align-items "center"
                            :font-size "0.8rem" :font-weight 700}}
            [:input {:type "checkbox" :checked (:tentative ed)
                     :on-change #(set-field! :tentative (-> % .-target .-checked))}]
            (:label interactions/tentative-field)]])
        ;; free-text detail ("flight leaves 13:30") — editor + chooser
        ;; only, never the overview (R2: the grid stays quiet)
        [:div.form-group
         [:label.form-label "Comment"]
         [:textarea.form-textarea
          {:value (:comment ed)
           :aria-label (:label interactions/comment-field)
           :placeholder "e.g. flight leaves 13:30"
           :rows 2
           :on-change #(set-field! :comment (-> % .-target .-value))}]]
        [:div.modal-actions
         (when (:id ed)
           [:button.btn {:on-click (fn []
                                     (when (js/confirm "Delete?")
                                       (db/delete-doc! aid
                                                       (if period? "periods" "marks")
                                                       (:id ed) nil)
                                       (close!)))}
            (:name interactions/delete)])
         [:button.btn {:on-click close!} (:name interactions/cancel)]
         [:button.btn.btn-accent
          {:disabled (str/blank? (:label ed))
           :on-click
           (fn []
             (let [data (if period?
                          {:label  (:label ed)
                           :who    (vec (:who ed))
                           :start  (domain/ed->date-str (min (:start-ed ed) (:end-ed ed)))
                           :end    (domain/ed->date-str (max (:start-ed ed) (:end-ed ed)))
                           :status (if (:tentative ed) "tentative" "confirmed")
                           :kind   (:kind ed)
                           :comment (:comment ed)}
                          {:date   (domain/ed->date-str (:start-ed ed))
                           :label  (:label ed)
                           :person (:person ed)
                           :comment (:comment ed)})
                   coll (if period? "periods" "marks")]
               (if (:id ed)
                 (db/update-doc! aid coll (:id ed) data nil)
                 (db/add-doc! aid coll data nil)))
             (close!))}
          (:name interactions/save)]]]])))

;; -- Day chooser: several items share the clicked day (design 4.5) --

(defn day-chooser-modal []
  (when-let [{:keys [ed periods marks]} @state/day-chooser]
    (let [close! #(reset! state/day-chooser nil)
          colors (state/person-color-map)
          hidden @state/hidden-persons
          dot    (fn [pid]
                   [:span.person-dot
                    {:key pid
                     :style {:background (get colors pid "#9a958e")
                             :opacity (if (hidden pid) 0.3 1)
                             :margin-right "5px"
                             :width "9px" :height "9px"}}])
          all-hidden? (fn [p]
                        (if (seq (:who p))
                          (every? hidden (:who p))
                          (hidden :others)))]
      [:div.modal-overlay {:on-click close!}
       [:div.modal {:on-click #(.stopPropagation %)
                    :role (:role interactions/day-chooser)
                    :aria-label (:name interactions/day-chooser)}
        [:div.modal-title (str "On " (domain/ed->date-str ed))]
        [:div {:style {:display "flex" :flex-direction "column" :gap "6px"}}
         (doall
          (for [p periods]
            (let [ix (interactions/edit-period (:label p))]
              [:button.btn {:key (:id p)
                            :aria-label (:name ix)
                            :style {:text-align "left"
                                    :opacity (if (all-hidden? p) 0.45 1)}
                            :on-click (fn [] (close!) (open-period-editor! p))}
               (if (seq (:who p))
                 (map dot (:who p))
                 (dot nil))
               (str (:label p)
                    (when (domain/tentative? p) "?")
                    "  ·  " (:start p) " → " (:end p))
               (when (all-hidden? p) "  (hidden)")
               (when (seq (:comment p))
                 [:span.item-comment (:comment p)])])))
         (doall
          (for [m marks]
            (let [ix (interactions/day-mark (:label m))
                  m-hidden? (and (:person m) (hidden (:person m)))]
              [:button.btn {:key (:id m)
                            :aria-label (:label ix)
                            :style {:text-align "left"
                                    :opacity (if m-hidden? 0.45 1)}
                            :on-click (fn [] (close!) (open-mark-editor! m))}
               (when (:person m) (dot (:person m)))
               (str "◆ " (:label m))
               (when m-hidden? "  (hidden)")
               (when (seq (:comment m))
                 [:span.item-comment (:comment m)])])))
         [:button.btn.btn-primary
          {:aria-label (:name interactions/new-item)
           :on-click (fn [] (close!) (open-new-editor! ed ed))}
          "+ New on this day"]]
        [:div.modal-actions
         [:button.btn {:on-click close!} (:name interactions/cancel)]]]])))

;; -- Week note (inside expanded week) --

(defn week-note [aid wkey]
  (let [text (r/atom (get @state/notes wkey ""))]
    (fn [aid wkey]
      [:div.week-note
       [:input.form-input {:type "text" :value @text
                           :placeholder "Week note…"
                           :aria-label (:label interactions/week-note-field)
                           :style {:flex 1}
                           :on-change #(reset! text (-> % .-target .-value))}]
       [:button.btn.btn-small
        {:on-click #(db/save-note! aid wkey @text nil)}
        (:name interactions/save-note)]])))

;; -- The year view --

(defn year-view [aid]
  (let [today    (domain/today-ed)
        own-periods (mapv domain/enrich-period @state/periods)
        ;; subscribed calendars: derived, read-only, merged for display
        sub-data (vals @state/sub-events)
        names    (into {} (map (juxt :id :name)) @state/persons)
        ;; hover hints (slice 11): computed once here, read by every surface
        periods  (mapv #(assoc % :hint (domain/period-hint % names))
                       (into own-periods (mapcat :periods sub-data)))
        one-offs (into (mapv domain/enrich-mark @state/marks)
                       (mapcat :marks sub-data))
        ;; history is part of the product (Principle 8) but hidden until
        ;; today by default — "Show previous" reveals a quarter at a time
        data-eds (concat (map :start-ed periods) (map :date-ed one-offs))
        from     (- (domain/week-start today) (* 91 @state/history-quarters))
        to       (+ (apply max (+ today (* 52 7)) data-eds)
                    (* 91 @state/future-quarters))
        weeks    (domain/weeks-range from to)
        ;; visibility toggles: hidden persons free their slot, the
        ;; remaining visible streams redistribute the row's space.
        ;; NOTE: `periods`/`marks` stay UNfiltered (the chooser and the
        ;; expanded week always show the truth); only the collapsed
        ;; rendering uses the vis-* variants.
        hidden   @state/hidden-persons
        lane-ids (into [] (comp (map :id) (remove hidden))
                       (state/persons-sorted))
        colors   (state/person-color-map)
        derived  (domain/anchors->marks @state/anchors from to)
        marks    (mapv #(assoc % :hint (domain/mark-hint % names))
                       (into one-offs derived))
        vis-periods (cond->> periods
                      (hidden :others) (filterv #(seq (:who %))))
        vis-marks (filterv (fn [m]
                             (and (not (hidden (:person m)))
                                  (not (and (:subscription m) (hidden :others)))))
                           marks)
        ;; a zero-length paint is a click: an EMPTY day goes straight to
        ;; the new-item editor; an occupied day always opens the chooser
        ;; (which lists each item AND offers "+ New on this day" — the
        ;; only reliable way to add on a busy day). Subscribed (derived)
        ;; items are read-only and not selectable.
        on-paint (fn [a b]
                   (if (not= a b)
                     (open-new-editor! a b)
                     (let [dps (->> periods
                                    (remove :subscription)
                                    (filter #(domain/active-on? % a))
                                    (sort-by (juxt :start-ed :id))
                                    vec)
                           dms (->> one-offs
                                    (remove :subscription)
                                    (filterv #(= (:date-ed %) a)))]
                       (if (and (empty? dps) (empty? dms))
                         (open-new-editor! a b)
                         (reset! state/day-chooser
                                 {:ed a :periods dps :marks dms})))))
        on-edit  (fn [p] (when-not (:subscription p) (open-period-editor! p)))
        today-key (domain/week-key today)]
    [:div.year-view
     ;; cancel a drag that ends outside any row
     {:on-mouse-up #(reset! state/drag nil)
      :on-mouse-leave #(reset! state/drag nil)}
     [:div {:style {:display "flex" :justify-content "center" :margin "2px 0 6px"}}
      [:button.btn.btn-small.btn-ghost
       {:aria-label (:name interactions/show-previous)
        :style {:opacity 0.6}
        :on-click #(swap! state/history-quarters inc)}
       "↑ previous quarter"]]
     [render/day-header]
     (doall
      (for [week weeks]
        (let [wkey (:key week)
              expanded? (= wkey @state/expanded-week)]
          [:div.week-row-wrap
           {:key wkey
            :id (when (= wkey today-key) "today-week")
            :class (when (= wkey today-key) "today-week")}
           (if expanded?
             [:<>
              [render/expanded-week-row
               (layout/expanded-plan week periods marks)
               colors on-edit]
              [week-note aid wkey]]
             [render/week-row
              (layout/week-plan week vis-periods vis-marks lane-ids)
              colors on-paint])])))
     [:div {:style {:display "flex" :justify-content "center" :margin "6px 0 2px"}}
      [:button.btn.btn-small.btn-ghost
       {:aria-label (:name interactions/show-next)
        :style {:opacity 0.6}
        :on-click #(swap! state/future-quarters inc)}
       "↓ next quarter"]]]))

;; -- Agenda page --

(defn- load-agenda! [aid]
  (state/reset-agenda-state!)
  (reset! state/current-agenda-id aid)
  (state/add-subscription! (db/subscribe-agenda! aid state/agenda))
  (state/add-subscription! (db/subscribe-coll! aid "persons" state/persons))
  (state/add-subscription! (db/subscribe-coll! aid "periods" state/periods))
  (state/add-subscription! (db/subscribe-coll! aid "marks" state/marks))
  (state/add-subscription! (db/subscribe-coll! aid "anchors" state/anchors))
  (state/add-subscription! (db/subscribe-coll! aid "subscriptions" state/cal-subs))
  (state/add-subscription! (db/subscribe-notes! aid state/notes))
  (js/setTimeout
   (fn []
     (reset! state/agenda-loading false)
     (when-let [el (.getElementById js/document "today-week")]
       (.scrollIntoView el (clj->js {:block "center"}))))
   800))

(defn agenda-view [aid]
  (when (not= aid @state/current-agenda-id)
    (load-agenda! aid))
  (fn [aid]
    [:div
     [:div.section-header
      [:div
       [:div.section-label "family yearplanner"]
       [:h2.section-title (or (:name @state/agenda) "…")]
       [:p.section-subtitle
        "Paint days to add a period. Click a period to edit. Chevron opens a week."]]
      ;; semantic order: sharing/settings (secondary) → primary action.
      ;; Mobile folds the secondary pair behind ☰ so the header stays
      ;; two buttons wide; "+ New" is always the last, rightmost thing.
      [:div.header-menu
       [:div.desktop-actions
        [invite-row]
        [:button.btn.btn-small
         {:aria-label (:name interactions/calendars)
          :on-click #(reset! show-calendars true)}
         "Calendars"]]
       ;; explicit creation affordance: works on busy days too, where a
       ;; click would open the existing period instead
       [:button.btn.btn-small.btn-primary
        {:aria-label (:name interactions/new-item)
         :on-click #(let [t (domain/today-ed)] (open-new-editor! t t))}
        "+ New"]
       [:button.btn.btn-small.mobile-only
        {:aria-label (:name interactions/menu)
         :aria-expanded (str @show-menu)
         :on-click #(swap! show-menu not)}
        "☰"]
       (when @show-menu
         [:div.menu-pop {:on-click #(js/setTimeout (fn [] (reset! show-menu false)) 100)}
          [copy-invite-btn]
          [:button.btn.btn-small
           {:aria-label (:name interactions/calendars)
            :on-click #(reset! show-calendars true)}
           "Calendars"]])]]
     [persons-bar aid]
     (if @state/agenda-loading
       [:div.loading "Loading agenda…"]
       [:div.year-card [year-view aid]])
     [day-chooser-modal]
     [calendars-modal aid]
     [editor-modal aid]]))
