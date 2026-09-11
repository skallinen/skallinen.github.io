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

;; -- Superuser --
(defonce is-superuser (r/atom false))

;; -- Current Club Data --
;; These hold data for whichever club is currently being viewed.
;; Reset when navigating to a different club.
(defonce current-club-id (r/atom nil))
(defonce club (r/atom nil))
(defonce books (r/atom []))
(defonce members (r/atom []))
(defonce rankings (r/atom {}))
(defonce club-loading (r/atom true))

;; -- Scorecard Overlay --
;; Holds the book ID to display as a full-screen score card, or nil.
(defonce scorecard-book (r/atom nil))

;; -- Book Detail Modal --
;; Holds {:book-id "..." :context :ranking|:aggregate :callbacks {...}} or nil.
(defonce detail-modal (r/atom nil))

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
  (reset! scorecard-book nil)
  (reset! detail-modal nil)
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
  "Derive a vec of member IDs — the WHOLE current roster, away members
   included. This is the population that fuses (scoring.md §3, \"only current
   members fuse\"). It is NOT the population the gate waits for; see
   `awaited-ids`. A call site that needs one of the two has to say which."
  []
  (mapv :id @members))

(defn away-ids
  "The set of current members marked Away (docs/plan/01-away). The gate does
   not wait for them; their contributions still count in full."
  []
  (into #{} (comp (filter :away) (map :id)) @members))

(defn awaited-ids
  "The gate's quantifier: current members who are not away
   (docs/contexts/ranking/scoring.md §3, `fully-dealt-with?`)."
  []
  (into [] (comp (remove :away) (map :id)) @members))
