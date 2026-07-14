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
;; One person <-> one color, forever (R3). Colors have NAMES so a
;; user (or an e2e robot acting as one) can pick "teal" by name.
(def person-colors
  [{:name "teal"      :hex "#7badb6"}
   {:name "rust"      :hex "#a9431e"}
   {:name "gold"      :hex "#c9a227"}
   {:name "green"     :hex "#6b8f71"}
   {:name "plum"      :hex "#8d6a9f"}
   {:name "blue"      :hex "#4a6fa5"}
   {:name "raspberry" :hex "#b05c74"}
   {:name "stone"     :hex "#7a7265"}])

(println "[config] loaded")
