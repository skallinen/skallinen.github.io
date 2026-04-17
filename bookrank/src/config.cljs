(ns config)

;; =============================================
;; Firebase Configuration
;; REPLACE these values with your Firebase project config.
;; Get from: Firebase Console → Project Settings → Web App
;; =============================================

(def firebase-config
  {:apiKey            "AIzaSyCUn2U-L_gipdKcpcXe4r1TCM63dxhDVnM"
   :authDomain        "book-club-e4916.firebaseapp.com"
   :projectId         "book-club-e4916"
   :storageBucket     "book-club-e4916.firebasestorage.app"
   :messagingSenderId "910679044088"
   :appId             "1:910679044088:web:04f7c993a52c7f393af00d"
   :measurementId     "G-TDF93TXWH1"})

(println "[config] loaded")
