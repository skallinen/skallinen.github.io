(ns state
  (:require [reagent.core :as r]))

;; =============================================
;; Centralized Application State (bookrank pattern)
;; Shared data atoms; UI-only state stays in components.
;; =============================================

(println "[state] loaded")

;; -- Agenda list --
(defonce agendas (r/atom []))
(defonce agendas-loading (r/atom true))

;; -- Current agenda --
(defonce current-agenda-id (r/atom nil))
(defonce agenda  (r/atom nil))
(defonce members (r/atom []))
(defonce persons (r/atom []))   ;; planning subjects (name, color, lane_order)
(defonce periods (r/atom []))   ;; raw storage maps
(defonce marks   (r/atom []))   ;; one-off day marks
(defonce anchors (r/atom []))   ;; recurring -> derived marks per year
(defonce notes   (r/atom {}))   ;; {week-key -> text}
(defonce agenda-loading (r/atom true))

;; -- View state --
(defonce expanded-week (r/atom nil))   ;; week-key or nil; ONE at a time (R14 exception)
(defonce history-quarters (r/atom 0))  ;; quarters of past revealed (0 = start at today)
(defonce editor (r/atom nil))          ;; nil or editor modal map, see views
(defonce drag (r/atom nil))            ;; nil or {:anchor-ed .. :ed ..} while painting

;; -- Firestore subscriptions --
(defonce subscriptions (atom []))

(defn cleanup-subscriptions! []
  (doseq [unsub @subscriptions]
    (when (fn? unsub) (unsub)))
  (reset! subscriptions []))

(defn add-subscription! [unsub-fn]
  (swap! subscriptions conj unsub-fn))

(defn reset-agenda-state! []
  (cleanup-subscriptions!)
  (reset! agenda nil)
  (reset! members [])
  (reset! persons [])
  (reset! periods [])
  (reset! marks [])
  (reset! anchors [])
  (reset! notes {})
  (reset! expanded-week nil)
  (reset! history-quarters 0)
  (reset! editor nil)
  (reset! drag nil)
  (reset! agenda-loading true))

;; -- Derived helpers --

(defn persons-sorted []
  (sort-by (fn [p] [(or (:lane_order p) 99) (:name p)]) @persons))

(defn person-color-map []
  (into {} (map (fn [p] [(:id p) (:color p)]) @persons)))

(defn person-name-map []
  (into {} (map (fn [p] [(:id p) (:name p)]) @persons)))
