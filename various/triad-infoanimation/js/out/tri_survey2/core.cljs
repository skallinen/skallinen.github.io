(ns tri-survey2.core
  (:require
   [reagent.core :refer [atom]]
   [free-form.core :as free-form]
   [reagent.dom :as d]
   [free-form.bootstrap-3]
   [cljs-http.client :as http]
   [cljs.core.async :refer [<!]]
   [cemerick.url :refer [url url-encode]]
   )
  (:require-macros [cljs.core.async.macros :refer [go]]))

(defn on-js-reload [])

;; (ns tri-survey.core
;;   (:require [reagent.core :as reagent :refer [atom]]
;;             )


;;)

(enable-console-print!)



(def data
(atom {:service           (vals (:query (url (-> js/window .-location .-href))))
       :submitted         false
       :tri-element-width (min 250 (int (/ (.-innerWidth js/window) 3)))}))


(def texts
  {:triad-top                 "Wow! Innovatiivinen ja innoistava"
   :triad-left                "Toimiva ja vaivaton"
   :triad-right               "Paljon parannettavaa"
   :main-header               "Yle ja elämä infoanimaatio"
   :service                   "Tarkasteltava palvelu:"
   :micronarrative1           "1. Kuvittele, että keskustelet kollegasi kanssa infoanimaatiosta. Hän ei ole aikaisemmin kokeillut sellaista. Mieti hetken ja kuvaa hänelle lyhyesti ja totuudenmukaisesti sekä palvelun HYVIÄ että HUONOJA puolia.*"
   :micro-placeholder         "Kuvaa tähän"
   :analyze1                  "2. Lue, mieti ja analysoi kuvaustasi yllä, ja aseta sen valossa kolmion sisälle piste suhteessa kolmion kulmissa mainittuihin piirtesiin* Lue, mieti ja analysoi kuvaustasi yllä. Jos mielestäsi Painota alla olevia määreitä nimenomaan kirjoittamasi kuvauksen mukaisesti ja suhteessa toisiinsa."
   :favorite-service-question "Mikä verkkopalvelu tai mobiilisovellus on suosikkisi (mainitse yksi)*"
   :application-label         "3. Sovellus"
   :application-placeholder   "Sovelluksen nimi"
   :micronarrative2           "4. Kerro nyt ystävällesi suosikkipalvelustasi. Hän ei ole koskaan kokeillut sitä. Kuvaa hänelle lyhyesti sekä palvelun HYVIÄ että HUONOJA puolia*"
   :analyze2                  "6. Analysoi kuvaustasi yllä, ja aseta sen valossa kolmion sisälle piste suhteessa kolmion kulmissa mainittuihin piirteisiin*"
   :free                      "3. Vapaa palaute"
   :free-placeholder          "Kirjoita vapaa palaute tähän"
   :contact                   "4. Nimi, rooli ja tiimi"
   :contact-placeholder          "Nimi, rooli, tiimi"
   :birthyear-label           "8. Syntymävuosi*"
   :gender-label              "9. Sukupuoli*"
   :gender-options
   [:choose                     "Valitse tästä"
    :not-available              "En halua sanoa"
    :female                     "Nainen"
    :male                       "Mies"
    :other                      "Muu"]
   :send-label                "Lähetä"
   :thank-you                 "Kiitoksia, että osallistuit kyselyyn!"
   :validation-error          "Vastaa ja täytä kaikkiin tähdellä merkityttyihin kohtiin"})


(defn window-resize-handler
"Updating width in order to enable responsivity of the triangle"
[event]
(let [w (min  250 (int (/ (.-innerWidth js/window) 3)))]
  (swap! data assoc :tri-element-width w)))


(defn make-remote-call [endpoint]
(go (let [response (<! (http/get endpoint {:with-credentials? false}))]
      (js/console.log (:body response)))))


(defn submitted?
"Helper function for validation function.
  False if a field is empty"
[k x]
(not (nil? (k x))))


(defn validate-submission
  "Simple validation to allow posting an entry,
  goes through all required fields"
  []
  (let [submission @data]
    (and
     (reduce #(and %1 %2)
             (map #(submitted? %1 submission)
                  [:micronarrative1 :triad-values1]))
     (not (= (:birthyear submission)
             (second (:gender-options texts))))
     (not (= (:gender submission)
             (second (:gender-options texts)))))))


(defn format-entry [entry]
(let [[t1v1 t1v2 t1v3] (:triad-values1 entry)
      [t2v1 t2v2 t2v3] (:triad-values2 entry)]
  (assoc entry
         :triad1value1 t1v1
         :triad1value2 t1v2
         :triad1value3 t1v3
         :triad2value1 t2v1
         :triad2value2 t2v2
         :triad2value3 t2v3))
)

(defn submit
"Data collected 'serverless', submits to Google Docs"
[entry]
(cond
  (validate-submission)
  (do
    (make-remote-call
     (str (assoc
           (url "https://script.google.com/macros/s/AKfycbwWx934JElNYwoyLuFoMKVGC85WXnQjPcZ12bdw2Sx_5_6fJ2P3/exec")
           :query (format-entry entry))))
    (swap! data assoc :submitted true))
  :else (swap! data assoc :validation-error true)))


(defn tri-height
"Helper function to figure out geometrics of the triangle.
  Calculates the triangle height based on the side length"
[size]
(Math/sqrt (- (* size size) (* (/ size 2) (/ size 2)))))


(defn tri-path-values
"Needed to build the triangle svg. Generates path coordinates
  based on triangle size (side lenght)"
[size]
(let [tx (* (/ size 2)) 
      ty 0
      lx (* size 0)
      ly (tri-height size)
      rx (* size 1)
      ry (tri-height size)]
  [tx ty lx ly rx ry nil]))


(defn tri-element-size
"To quantify the triad measurement with respect to
  the corners. Calculates size for element containing triangle"
[size]
{:width (* (Math/round  size) 1)
 :height (Math/ceil (* size  .95))})


(defn tri-path-string
"Generate path string for svg"
[coll]
(let [svg-path ["M" " " " L" " " " L" " " " Z"]]
  (apply str (interleave svg-path coll))))


(defn get-slope-intercept
"Helper function to calculate distances. Calculates
  line slope and incercept from two points
  line: y = mx + b"
[[x1 y1 x2 y2]]
(let [m    (/ (- y2 y1) (- x2 x1)) 
      b    (- y1 (* m x1))]
  [m b]))


(defn move-inside
"Moves the point inside triad when user clicks outside"
  [[x y] [tx ty lx ly rx ry]]
  (let  [[m1 b1]    (get-slope-intercept [tx ty lx ly]) 
         [m2 b2]    (get-slope-intercept [tx ty rx ry])
         boundry-x1 (/ (- y b1) m1)
         boundry-x2 (/ (- y b2) m2)
         new-x      (cond
                      (< x boundry-x1) boundry-x1
                      (> x boundry-x2) boundry-x2
                      :else x)
         new-y      (cond
                      (< y ty) ty
                      (> y ry) ry
                      :else y)] 
    [(int new-x) (int new-y)]))

(defn abs
  "Cause i can..."
  [n]
  (max n (- n)))


(defn distance
  "Calculate point distance from the triad side
  pos  X Y
  line y = mx + b

  mx + -1y + b = 0
  Ax +  By + C = 0
  
       |AX + BY + C|
  d = ---------------
      sqrt(A^2 + B^2)"

  [[x y] m b size]
  (int
   (* 100
      (/ (abs      (+ (* m x) (* -1 y) b))
         (Math/sqrt (+ (* m m) 1))
         size))))


(defn get-distances
  "To quantify the three dimensions / corner
  values within the triad."
  [pos [tx ty lx ly rx ry]]
  (let [[x y ]  pos
        [m1 b1] (get-slope-intercept [tx ty lx ly])
        [m2 b2] (get-slope-intercept [tx ty rx ry])
        m3      0
        b3      ly]
    [(/ (distance pos m1 b1 ly) 1)
     (/ (distance pos m2 b2 ly) 1)
     (/ (distance pos m3 b3 ly) 1)]))


(defn position
  "Mouse position in element to calculate triad point entry"
  [e]
  (let [rect (.getBoundingClientRect (.-target e))]
    [(- (.-clientX e) (.-left rect))
     (- (.-clientY e) (.-top rect))]))


(defn update-point
  "Helper function to update triad values"
  [data e size pos triad-values triad]
  (assoc data
         pos (move-inside (position e)
                          (tri-path-values size))
         triad-values (get-distances (move-inside (position e)
                                                  (tri-path-values size))
                                     (tri-path-values size))
         triad   true))


(defn build-triangle [[x y] visible size attrs]
  (let [[tx _ ly _ _ _] (tri-path-values size)]
    [:div.triangle
     [:p  (:triad-top texts)]

     [:svg.svg-style
      (merge-with merge attrs
                  {:width        (:width (tri-element-size size))
                   :height       (:height (tri-element-size size))})

      [:path {:d  (tri-path-string (tri-path-values size))}]
      ;; 
      [:g {:opacity (if (true? visible) 100 0)}
       [:circle {:id "point1" :cx x :cy y :r 3}]]]
     
     [:div {:style {:clear "both"}}
      
      [:span {:style {:top       (str ly "px")
                      :left      (str (- tx) "px")}}
       (:triad-left texts)]
      
      [:span {:style {:top      (str ly "px")
                      :left     (str tx "px")}}
       (:triad-right texts)]]]))


(defn micronarrative-element [k]
  [:free-form/field {:type        :textarea
                     :key         k
                     :label       (k texts)
                     :placeholder (:micro-placeholder texts)}])


(defn triad-element [app-state size analyze pos triad-values triad]
  [[:label (analyze texts)]
   [:div       [build-triangle
                (pos app-state)
                (triad app-state)
                size
                {:on-click
                 (fn [e]
                   (swap! data update-point e size pos triad-values triad))}]]])


(defn favorite-app-element []
  [[:h3  (:favorite-service-question texts)]
   [:free-form/field {:type        :text
                      :key         :fave-app
                      :label (:application-label texts)
                      :placeholder (:application-placeholder texts)}]])


(defn other-feedback-element []
  [:free-form/field {:type        :textarea
                     :key         :other-feedback
                     :label       (:free texts)
                     :placeholder (:free-placeholder texts)}])

(defn contact-element []
  [:free-form/field {:type        :text
                     :key         :contact
                     :label       (:contact texts)
                     :placeholder (:contact-placeholder texts)}])


(defn render-years-list []
  (concat  (list :choose (second (:gender-options texts)))
           (interleave
            (map #(keyword (str %)) (range 2015 1900 -1))
            (map str (range 2015 1900 -1)))))


(defn birth-year-element []
  [:free-form/field {:type  :select
                     :label (:birthyear-label texts)
                     :key  :birthyear
                     :options (render-years-list)}])


(defn gender-element []
  [:free-form/field {:type    :select
                     :label   (:gender-label texts)
                     :key     :gender
                     :options (:gender-options texts)}])


(defn validation-error-element [app-state]
  [:p {:style {:color "red"}}
   (cond
     (:validation-error app-state) (:validation-error texts)
     :else "")])


(defn submit-button [app-state]
  [:button.btn.btn-primary 
   {:style {:fill "black"}
    :type :button
    :on-click (fn [e ] (submit app-state))} (:send-label texts)])


(defn thank-you-element [app-state]
  [:div {:style
         {:display
          (cond
            (:submitted app-state) "block"
            :else "none")}}
   [:h3 (:thank-you texts)]])


(defn quest?
  "Helper function to hide survey"
  [app-state]
  (cond
    (:submitted app-state) "none"
    :else "block"))

(defn show-questionnaire?
  "Hide survey when submitted"
  [app-state]
  {:style {:display (quest? app-state)}})

(defn show-service
  "Show template service name if no service defined as
  get element"
  [app-state]
  (let [s (:service app-state)]
    (cond
      (not (nil? s)) s
      :else "Test Service")))


(defn page []
  (let [app-state @data
        size(:tri-element-width app-state)]
    [:div.container
     [:h1.main-header
      (:main-header texts)]
     [:div.plain-form
      (show-questionnaire? app-state) 
      [:hr]
      [:p
       [:h4 (:service texts)] 
       [:h2 (show-service app-state)]]
      [:br]
      
      [free-form/form app-state (:-errors app-state)
       (fn [keys value] (swap! data #(assoc-in % keys value))) :bootstrap-3
       [:form {:noValidate true}
        ;;[:div.col-sm-offset-2.col-sm-10 {:free-form/error-message {:key :-general}} [:p.text-danger]]

        (micronarrative-element :micronarrative1)
        
        (map identity (triad-element
                       app-state
                       size
                       :analyze1 :position1
                       :triad-values1 :triad1))
        
        ;; (map identity (favorite-app-element))

        ;; (micronarrative-element :micronarrative2)

        ;; (map identity (triad-element
        ;;                app-state
        ;;                size
        ;;                :analyze2 :position2
        ;;                :triad-values2 :triad2))

        (other-feedback-element)

        (contact-element)

        ;; (birth-year-element)

        ;; (gender-element)

        (validation-error-element app-state)

        (submit-button app-state)]]]
     
     (thank-you-element app-state)

     [:hr]
     
     (comment
       [:code "@data:" app-state])
     
     (.addEventListener js/window "resize" window-resize-handler)]))


;; (reagent/render-component [page]
;;                           (. js/document (getElementById "app")))





;; -------------------------
;; Views

(defn home-page []
  [:div [:h2 "Welcome to Reagent"]])

;; -------------------------
;; Initialize app

(defn mount-root []
  (d/render [page] (.getElementById js/document "app")))

(defn init! []
  (mount-root))
