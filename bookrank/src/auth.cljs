(ns auth
  (:require [reagent.core :as r]
            [config]))

;; =============================================
;; Firebase Authentication (Google Sign-In)
;; =============================================

(println "[auth] loaded")

(defonce user (r/atom nil))
(defonce auth-loading (r/atom true))

(defonce firebase-app
  (try
    (when (some? (aget js/window "firebase"))
      (.initializeApp js/firebase (clj->js config/firebase-config)))
    (catch js/Error e
      (println "[auth] Firebase init failed (config not set?):" (.-message e))
      nil)))

(defonce firebase-auth
  (try
    (when (and (some? (aget js/window "firebase")) firebase-app)
      (.auth js/firebase))
    (catch js/Error e nil)))

(defonce firebase-db
  (try
    (when (and (some? (aget js/window "firebase")) firebase-app)
      (.firestore js/firebase))
    (catch js/Error e nil)))

(defn user->map
  "Extract relevant user info from Firebase User object."
  [fb-user]
  (when fb-user
    {:uid          (.-uid fb-user)
     :display-name (.-displayName fb-user)
     :email        (.-email fb-user)
     :photo-url    (.-photoURL fb-user)}))

(defn sign-in!
  "Launch Google sign-in popup."
  []
  (when firebase-auth
    (let [provider (js/firebase.auth.GoogleAuthProvider.)]
      (-> (.signInWithPopup firebase-auth provider)
          (.then (fn [result]
                   (println "[auth] signed in:" (.-displayName (.-user result)))))
          (.catch (fn [err]
                    (js/console.error "[auth] sign-in error:" err)))))))

(defn sign-out!
  "Sign out the current user."
  []
  (when firebase-auth
    (-> (.signOut firebase-auth)
        (.then (fn [] (println "[auth] signed out")))
        (.catch (fn [err] (js/console.error "[auth] sign-out error:" err))))))

(defn init-auth!
  "Set up auth state listener. Call once on app init."
  []
  (if firebase-auth
    (.onAuthStateChanged firebase-auth
                         (fn [fb-user]
                           (reset! user (user->map fb-user))
                           (reset! auth-loading false)
                           (println "[auth] state changed:" (if fb-user (.-email fb-user) "signed out"))))
    (do
      (println "[auth] Firebase not available, running without auth")
      (reset! auth-loading false))))
