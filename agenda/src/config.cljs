(ns config)

;; =============================================
;; Firebase Configuration
;; Same project as bookrank (see product-design.md Layer 9):
;; the agenda app lives in the `agendas` collection family.
;; =============================================

(def firebase-config
  {:apiKey            "AIzaSyCUn2U-L_gipdKcpcXe4r1TCM63dxhDVnM"
   :authDomain        "book-club-e4916.firebaseapp.com"
   :projectId         "book-club-e4916"
   :storageBucket     "book-club-e4916.firebasestorage.app"
   :messagingSenderId "910679044088"
   :appId             "1:910679044088:web:04f7c993a52c7f393af00d"
   :measurementId     "G-TDF93TXWH1"})

;; Person color palette (design doc tokens + extensions).
;; One person <-> one color, forever (R3).
(def person-colors
  ["#7badb6"   ; teal
   "#a9431e"   ; orange
   "#c9a227"   ; gold
   "#6b8f71"   ; green
   "#8d6a9f"   ; plum
   "#4a6fa5"   ; blue
   "#b05c74"   ; raspberry
   "#7a7265"]) ; stone

(println "[config] loaded")
