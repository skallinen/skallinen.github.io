(ns main
  (:require [reagent.core :as r]
            [reagent.dom :as rdom]
            [clojure.string :as str]))

;; -- State --
(defonce posts (r/atom []))
(defonce loading (r/atom true))
(defonce is-dark (r/atom false))
(defonce error-msg (r/atom nil))

;; -- Interop --
(def Papa js/Papa)

;; -- Dark Mode --
(defn toggle-dark! []
  (swap! is-dark not)
  (if @is-dark
    (-> js/document .-body .-classList (.add "dark-mode"))
    (-> js/document .-body .-classList (.remove "dark-mode"))))

;; -- Components --
(defn post-card [post]
  [:div.post-card
   (when (seq (:image_url post))
     [:img.post-image {:src (:image_url post)}])
   
   [:div.post-meta
    [:span (:date post)]
    (when (seq (:type post))
      [:span (str/upper-case (:type post))])]
   
   [:h3.post-title 
    (if (seq (:link post))
      [:a {:href (:link post) :target "_blank"} (:title post)]
      (:title post))]
   
   [:div.post-body (:body post)]
   
   (when (seq (:tags post))
     [:div.post-tags
      (doall
        (for [tag (map str/trim (str/split (:tags post) #","))]
          [:span.tag {:key tag} tag]))])])

(defn navbar []
  [:div.app-header
   [:a.brand {:href "/"} "1-Bit Wonder"]
   
   [:div.nav-links
    [:a.nav-link {:href "/vinyl-wishlist/"} "Vinyl Wishlist"]
    
    ;; Sailing Menu (Simple Dropdown Logic or just Links)
    [:span.nav-link {:style {:color "#666" :cursor "default"}} "|"]
    
    [:a.nav-link {:href "/puzzles/beaufort/"} "Beaufort Scale"]
    [:a.nav-link {:href "/puzzles/flags/"} "Signal Flags"]
    
    [:button.btn-dark {:on-click toggle-dark!}
     (if @is-dark "Light" "Dark")]]])

(defn feed []
  (cond
    @loading [:div "Loading archives..."]
    @error-msg [:div.error @error-msg]
    :else
    [:div.feed-grid
     (doall
       (for [post @posts]
         ^{:key (or (:date post) (:title post))}
         [post-card post]))]))

(defn main-component []
  [:div.app-container
   [navbar]
   [feed]])

;; -- Data Fetching --
(defn fetch-posts! []
  (reset! loading true)
  (.parse Papa "data.csv"
          (clj->js {:download true
                    :header true
                    :complete (fn [results]
                                (let [data (js->clj (.-data results) :keywordize-keys true)
                                      ;; Filter empty rows and Sort by Date Descending
                                      sorted (->> data
                                                  (filter #(seq (:title %)))
                                                  (sort-by :date >))]
                                  (reset! posts sorted)
                                  (reset! loading false)))
                    :error (fn [err]
                             (reset! error-msg "Failed to load CSV data.")
                             (reset! loading false))})))

;; -- Init --
(defn mount-root []
  (rdom/render [main-component] (.getElementById js/document "app")))

(defn init []
  (fetch-posts!)
  (mount-root))

(init)
