(ns state
  (:require [reagent.core :as r]))

;; =============================================
;; Centralized Application State
;; Shared data atoms live here so they are:
;; 1. Inspectable (print @state/clubs etc.)
;; 2. Persistent across navigations
;; 3. Accessible from any component
;;
;; UI-only state (expanded toggles, form inputs)
;; stays local to components — that's fine.
;; =============================================

(println "[state] loaded")

;; -- Club List --
(defonce clubs (r/atom []))
(defonce clubs-loading (r/atom true))

;; -- Current Club Data --
;; These hold data for whichever club is currently being viewed.
;; Reset when navigating to a different club.
(defonce current-club-id (r/atom nil))
(defonce club (r/atom nil))
(defonce books (r/atom []))
(defonce members (r/atom []))
(defonce rankings (r/atom {}))
(defonce club-loading (r/atom true))

;; -- Firestore Subscriptions --
;; Holds unsubscribe functions from .onSnapshot() listeners.
;; Must be cleaned up when navigating to a different club.
(defonce subscriptions (atom []))

(defn cleanup-subscriptions!
  "Unsubscribe all active Firestore listeners."
  []
  (doseq [unsub @subscriptions]
    (when (fn? unsub) (unsub)))
  (reset! subscriptions []))

(defn add-subscription!
  "Track an unsubscribe function for cleanup."
  [unsub-fn]
  (swap! subscriptions conj unsub-fn))

(defn reset-club-state!
  "Clear club data and unsubscribe listeners when navigating away."
  []
  (cleanup-subscriptions!)
  (reset! club nil)
  (reset! books [])
  (reset! members [])
  (reset! rankings {})
  (reset! club-loading true))

(defn books-map
  "Derive a {book-id -> book} map from the books list."
  []
  (into {} (map (fn [b] [(:id b) b]) @books)))

(defn members-map
  "Derive a {member-id -> member} map from the members list."
  []
  (into {} (map (fn [m] [(:id m) m]) @members)))

(defn member-ids
  "Derive a vec of member IDs."
  []
  (mapv :id @members))
