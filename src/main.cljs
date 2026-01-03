(ns main
  (:require [reagent.core :as r]
            [reagent.dom :as rdom]
            [clojure.string :as str]))

(println "Main.cljs RELOADED v4 (Image Zoom)")

;; -- State --
(defonce posts (r/atom []))
(defonce loading (r/atom true))
(defonce is-dark (r/atom false))
(defonce error-msg (r/atom nil))
(defonce active-post (r/atom nil)) ;; For Modal
(defonce zoomed-image (r/atom nil)) ;; For Fullscreen Image

;; -- Interop --
(def Papa js/Papa)

;; -- Dark Mode --
(defn toggle-dark! []
  (swap! is-dark not)
  (if @is-dark
    (-> js/document .-body .-classList (.add "dark-mode"))
    (-> js/document .-body .-classList (.remove "dark-mode"))))

;; -- Helpers --
(defn format-body [text]
  (when text
    (into [:div]
          (map-indexed
            (fn [idx paragraph]
              (when (seq (str/trim paragraph))
                [:p {:key idx :style {:margin-bottom "1em" :line-height "1.6"}} 
                 paragraph]))
            (str/split text #"\n")))))

;; -- Components --

(defn fullscreen-image-view []
    [:div.fullscreen-overlay {:on-click #(reset! zoomed-image nil)}
     [:img.fullscreen-image {:src @zoomed-image}]])

(defn modal [post]
  [:div.modal-overlay {:on-click #(reset! active-post nil)}
   [:div.modal-content {:on-click #(.stopPropagation %)}
    [:button.close-btn {:on-click #(reset! active-post nil)} "×"]
    
    (if (seq (:video_url post))
      ;; If Video Exists: Show Video ONLY (no image)
      [:div.video-container
       {:dangerouslySetInnerHTML 
        {:__html (str "<iframe src=\"" (:video_url post) "\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen></iframe>")}}]
      
      ;; Else: Show Image (if exists) -> Clickable for Zoom
      (when (seq (:image_url post))
        [:img.modal-image {:src (:image_url post)
                           :on-click #(reset! zoomed-image (:image_url post))
                           :title "Click to zoom"}]))
    
    [:div.modal-text
     [:h2 (:title post)]
     [:div.post-meta [:span (:date post)]]
     
     ;; Formatted Body
     [:div.post-body 
      (format-body (:body post))]
     
     (when (seq (:link post))
       [:a.btn-dark {:href (:link post) :target "_blank" :style {:margin-top "20px" :display "inline-block"}} 
        "Visit Link →"])]]])

(defn post-card [post]
  [:div.post-card {:on-click #(reset! active-post post)}
   ;; Always show image in card view
   (when (seq (:image_url post))
     [:img.post-image {:src (:image_url post)}])
   
   [:div.post-meta
    [:span (:date post)]
    (when (seq (:type post))
      [:span (str/upper-case (:type post))])]
   
   [:h3.post-title 
    (:title post)]
   
   [:div.post-body 
    (if (> (count (:body post)) 150)
      (str (subs (:body post) 0 150) "...")
      (:body post))]
   
   (when (seq (:tags post))
     [:div.post-tags
      (doall
        (for [tag (map str/trim (str/split (:tags post) #","))]
          [:span.tag {:key tag} tag]))])])

(defn navbar []
  [:div.app-header
   [:a.brand {:href "/"} 
    [:img.logo {:src (if @is-dark 
                       "visuals/1-bit-sheep-logo.svg" 
                       "visuals/1-bit-sheep-logo-black.svg")
                :alt "1-Bit Wonder"}]]
   
   [:div.nav-links
    [:a.nav-link {:href "/vinyl-wishlist/"} "Vinyl Wishlist"]
    
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
   [feed]
   ;; Post Modal
   (when @active-post
     [modal @active-post])
   ;; Fullscreen Image Zoom
   (when @zoomed-image
     [fullscreen-image-view])])

;; -- Data Fetching --
(defn fetch-posts! []
  (reset! loading true)
  (.parse Papa "data.csv"
          (clj->js {:download true
                    :header true
                    :complete (fn [results]
                                (let [data (js->clj (.-data results) :keywordize-keys true)
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
