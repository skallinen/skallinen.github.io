(ns router
  (:require [reagent.core :as r]))

;; =============================================
;; Simple Hash-Based SPA Router
;; Routes: #/ #/clubs #/club/:id #/club/:id/rank
;; =============================================

(println "[router] loaded")

(defonce current-route (r/atom {:page :loading :params {}}))

(defn parse-hash
  "Parse window.location.hash into {:page keyword :params map}."
  [hash-str]
  (let [path (if (or (empty? hash-str) (= hash-str "#") (= hash-str "#/"))
               "/"
               (subs hash-str 1))   ;; Remove leading #
        parts (filterv seq (clojure.string/split path #"/"))]
    (cond
      ;; #/club/:id/rank
      (and (= (count parts) 3)
           (= (first parts) "club")
           (= (nth parts 2) "rank"))
      {:page :ranking :params {:club-id (nth parts 1)}}

      ;; #/club/:id
      (and (= (count parts) 2)
           (= (first parts) "club"))
      {:page :club :params {:club-id (nth parts 1)}}

      ;; #/clubs
      (and (= (count parts) 1)
           (= (first parts) "clubs"))
      {:page :clubs :params {}}

      ;; #/join/:code
      (and (= (count parts) 2)
           (= (first parts) "join"))
      {:page :join :params {:invite-code (nth parts 1)}}

      ;; Default
      :else
      {:page :home :params {}})))

(defn navigate!
  "Navigate to a route by setting window.location.hash."
  [path]
  (set! (.-hash js/window.location) path))

(defn init-router!
  "Set up hashchange listener and parse initial route."
  []
  (.addEventListener js/window "hashchange"
                     (fn [_] (reset! current-route (parse-hash (.-hash js/window.location)))))
  (reset! current-route (parse-hash (.-hash js/window.location))))
