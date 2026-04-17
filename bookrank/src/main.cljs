(ns main
  (:require [reagent.core :as r]
            [reagent.dom :as rdom]
            [router]
            [auth]
            [login]
            [clubs]
            [club-view]))

;; =============================================
;; BookRank — Main Entry Point
;; =============================================

(println "[main] loaded")

;; -- Dark mode --
(defonce is-dark (r/atom (= "dark" (.getItem js/localStorage "theme"))))

(defn toggle-dark! []
  (swap! is-dark not)
  (let [dark? @is-dark]
    (.setItem js/localStorage "theme" (if dark? "dark" "light"))
    (if dark?
      (-> js/document .-body .-classList (.add "dark-mode"))
      (-> js/document .-body .-classList (.remove "dark-mode")))))

;; Apply immediately on load
(when @is-dark (-> js/document .-body .-classList (.add "dark-mode")))

;; -- Header --
(defn header []
  [:div.app-header
   [:span.app-title {:on-click #(router/navigate! "#/clubs")} "BookRank"]
   [:div.header-actions
    (when-let [u @auth/user]
      [:<>
       [:span.user-name (:display-name u)]
       (when (:photo-url u)
         [:img.user-avatar {:src (:photo-url u) :alt (:display-name u)}])
       [:button.btn.btn-small {:on-click auth/sign-out!} "Sign Out"]])
    [:button.btn.btn-small {:on-click toggle-dark!}
     (if @is-dark "Light" "Dark")]]])

;; -- Router Dispatch --
(defn current-page []
  (let [{:keys [page params]} @router/current-route]
    (cond
      ;; Still loading auth
      @auth/auth-loading
      [:div.loading "Loading..."]

      ;; Not signed in
      (nil? @auth/user)
      [login/login-view]

      ;; Routing
      :else
      (case page
        :clubs   [clubs/clubs-view]
        :club    [club-view/club-detail-view (:club-id params)]
        :ranking [club-view/ranking-page-view (:club-id params)]
        ;; Default: show clubs
        [clubs/clubs-view]))))

;; -- Root Component --
(defn app []
  [:div.app-container
   [header]
   [current-page]])

;; -- Init --
(defn mount-root []
  (rdom/render [app] (.getElementById js/document "app")))

(defn init []
  (println "[main] initializing BookRank")
  (router/init-router!)
  (auth/init-auth!)
  (mount-root))

(init)
