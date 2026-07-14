(ns main
  (:require [reagent.core :as r]
            [reagent.dom :as rdom]
            [router]
            [auth]
            [state]
            [db]
            [views]))

;; =============================================
;; Agenda — Main Entry Point
;; =============================================

(println "[main] loaded")

;; -- Header --
(defn header []
  [:div.app-header
   [:span.app-title {:on-click #(router/navigate! "#/")} "Agenda"]
   [:div.header-actions
    (when-let [u @auth/user]
      [:<>
       [:span.user-name (:display-name u)]
       (when (:photo-url u)
         [:img.user-avatar {:src (:photo-url u) :alt (:display-name u)}])
       [:button.btn.btn-small {:on-click auth/sign-out!} "Sign Out"]])]])

;; -- Join View (auto-join via invite link) --
(defn join-view [invite-code]
  (let [status (r/atom :joining)]
    (db/join-agenda! invite-code
                     (fn [aid]
                       (if aid
                         (router/navigate! (str "#/agenda/" aid))
                         (reset! status :failed))))
    (fn [invite-code]
      (case @status
        :joining [:div.loading (str "Joining agenda with code " invite-code "…")]
        :failed  [:div.empty-state
                  [:div.empty-state-icon "❌"]
                  [:div.empty-state-text (str "No agenda found for code: " invite-code)]
                  [:button.btn.btn-primary {:on-click #(router/navigate! "#/")}
                   "Go to Agendas"]]))))

;; -- Router Dispatch --
(defn current-page []
  (let [{:keys [page params]} @router/current-route]
    (cond
      @auth/auth-loading
      [:div.loading "Loading…"]

      (nil? @auth/user)
      [views/login-view]

      :else
      (case page
        :agenda [views/agenda-view (:agenda-id params)]
        :join   [join-view (:invite-code params)]
        [views/agendas-view]))))

;; -- Root --
(defn app []
  [:div.app-container
   [header]
   [current-page]])

(defn mount-root []
  (rdom/render [app] (.getElementById js/document "app")))

(defn init []
  (println "[main] initializing Agenda")
  (router/init-router!)
  (auth/init-auth!)
  (mount-root))

(init)
