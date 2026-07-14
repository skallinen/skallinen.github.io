(ns router
  (:require [reagent.core :as r]
            [clojure.string :as str]))

;; =============================================
;; Simple Hash-Based SPA Router (bookrank pattern)
;; Routes: #/  #/agenda/:id  #/join/:code
;; =============================================

(println "[router] loaded")

(defonce current-route (r/atom {:page :loading :params {}}))

(defn parse-hash
  [hash-str]
  (let [path  (if (or (empty? hash-str) (= hash-str "#") (= hash-str "#/"))
                "/"
                (subs hash-str 1))
        parts (filterv seq (str/split path #"/"))]
    (cond
      ;; #/agenda/:id
      (and (= (count parts) 2) (= (first parts) "agenda"))
      {:page :agenda :params {:agenda-id (nth parts 1)}}

      ;; #/join/:code
      (and (= (count parts) 2) (= (first parts) "join"))
      {:page :join :params {:invite-code (nth parts 1)}}

      :else
      {:page :home :params {}})))

(defn navigate! [path]
  (set! (.-hash js/window.location) path))

(defn init-router! []
  (.addEventListener js/window "hashchange"
                     (fn [_] (reset! current-route (parse-hash (.-hash js/window.location)))))
  (reset! current-route (parse-hash (.-hash js/window.location))))
