(ns db
  (:require [clojure.string :as str]
            [auth]))

;; =============================================
;; Firestore Database Operations (bookrank pattern)
;; Schema — see product-design.md Layer 9:
;;   agendas/{aid}                 name, invite_code, member_uids[], created_by
;;   agendas/{aid}/members/{uid}   display_name, email, role, joined_at
;;   agendas/{aid}/persons/{pid}   name, color, lane_order
;;   agendas/{aid}/periods/{id}    who[], start, end, label, status, kind
;;   agendas/{aid}/marks/{id}      date, label, person?
;;   agendas/{aid}/anchors/{id}    month, day, label, person?
;;   agendas/{aid}/notes/{weekKey} text
;; =============================================

(println "[db] loaded")

;; -- Helpers --

(defn ts-now []
  (when (some? (aget js/window "firebase"))
    (js/firebase.firestore.FieldValue.serverTimestamp)))

(defn doc->map [doc]
  (assoc (js->clj (.data doc) :keywordize-keys true)
         :id (.-id doc)))

(defn random-code []
  (let [chars "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
        len   (count chars)]
    (apply str (repeatedly 6 #(nth chars (rand-int len))))))

;; -- Agendas: create / fetch / join --

(defn create-agenda!
  [agenda-name callback]
  (when-let [db auth/firebase-db]
    (let [uid  (:uid @auth/user)
          code (random-code)]
      (-> (.add (.collection db "agendas")
                (clj->js {:name        agenda-name
                          :created_by  uid
                          :created_at  (ts-now)
                          :invite_code code
                          :member_uids [uid]}))
          (.then (fn [doc-ref]
                   (-> (.set (.doc (.collection db (str "agendas/" (.-id doc-ref) "/members")) uid)
                             (clj->js {:display_name (:display-name @auth/user)
                                       :email        (:email @auth/user)
                                       :photo_url    (:photo-url @auth/user)
                                       :role         "admin"
                                       :joined_at    (ts-now)}))
                       (.then (fn [] (when callback (callback (.-id doc-ref))))))))
          (.catch (fn [err] (js/console.error "[db] create-agenda error:" err)))))))

(defn fetch-agendas!
  [agendas-atom]
  (when-let [db auth/firebase-db]
    (let [uid (:uid @auth/user)]
      (-> (.get (.where (.collection db "agendas") "member_uids" "array-contains" uid))
          (.then (fn [snapshot]
                   (reset! agendas-atom (mapv doc->map (seq (.-docs snapshot))))))
          (.catch (fn [err] (js/console.error "[db] fetch-agendas error:" err)))))))

(defn join-agenda!
  [invite-code callback]
  (when-let [db auth/firebase-db]
    (let [uid  (:uid @auth/user)
          code (str/upper-case (str/trim invite-code))]
      (-> (.get (.where (.collection db "agendas") "invite_code" "==" code))
          (.then (fn [snapshot]
                   (if (.-empty snapshot)
                     (do (js/console.warn "[db] no agenda found for code:" code)
                         (when callback (callback nil)))
                     (let [agenda-doc (first (seq (.-docs snapshot)))
                           aid        (.-id agenda-doc)]
                       (-> (.set (.doc db (str "agendas/" aid "/members/" uid))
                                 (clj->js {:display_name (:display-name @auth/user)
                                           :email        (:email @auth/user)
                                           :photo_url    (:photo-url @auth/user)
                                           :role         "member"
                                           :joined_at    (ts-now)}))
                           (.then (fn []
                                    (-> (.update (.doc db (str "agendas/" aid))
                                                 (clj->js {:member_uids
                                                           (js/firebase.firestore.FieldValue.arrayUnion uid)}))
                                        (.then (fn [] (when callback (callback aid))))
                                        (.catch (fn [_] (when callback (callback aid))))))))))))
          (.catch (fn [err] (js/console.error "[db] join-agenda error:" err)))))))

;; -- Generic subcollection helpers --

(defn add-doc!
  [aid coll data callback]
  (when-let [db auth/firebase-db]
    (-> (.add (.collection db (str "agendas/" aid "/" coll))
              (clj->js (assoc data :created_at (ts-now) :created_by (:uid @auth/user))))
        (.then (fn [doc-ref] (when callback (callback (.-id doc-ref)))))
        (.catch (fn [err] (js/console.error "[db] add" coll "error:" err))))))

(defn update-doc!
  [aid coll id data callback]
  (when-let [db auth/firebase-db]
    (-> (.update (.doc db (str "agendas/" aid "/" coll "/" id))
                 (clj->js data))
        (.then (fn [] (when callback (callback))))
        (.catch (fn [err] (js/console.error "[db] update" coll "error:" err))))))

(defn delete-doc!
  [aid coll id callback]
  (when-let [db auth/firebase-db]
    (-> (.delete (.doc db (str "agendas/" aid "/" coll "/" id)))
        (.then (fn [] (when callback (callback))))
        (.catch (fn [err] (js/console.error "[db] delete" coll "error:" err))))))

;; -- Week notes (doc id = week key, e.g. "2026-W29") --

(defn save-note!
  [aid week-key text callback]
  (when-let [db auth/firebase-db]
    (-> (.set (.doc db (str "agendas/" aid "/notes/" week-key))
              (clj->js {:text text :updated_at (ts-now)}))
        (.then (fn [] (when callback (callback))))
        (.catch (fn [err] (js/console.error "[db] save-note error:" err))))))

;; -- Real-time subscriptions (each returns an unsubscribe fn) --

(defn subscribe-agenda!
  [aid agenda-atom]
  (when-let [db auth/firebase-db]
    (.onSnapshot (.doc db (str "agendas/" aid))
                 (fn [doc]
                   (when (.-exists doc)
                     (reset! agenda-atom (doc->map doc))))
                 (fn [err] (js/console.error "[db] subscribe-agenda error:" err)))))

(defn subscribe-coll!
  [aid coll target-atom]
  (when-let [db auth/firebase-db]
    (.onSnapshot (.collection db (str "agendas/" aid "/" coll))
                 (fn [snapshot]
                   (reset! target-atom (mapv doc->map (seq (.-docs snapshot)))))
                 (fn [err] (js/console.error "[db] subscribe" coll "error:" err)))))

(defn subscribe-notes!
  [aid notes-atom]
  (when-let [db auth/firebase-db]
    (.onSnapshot (.collection db (str "agendas/" aid "/notes"))
                 (fn [snapshot]
                   (reset! notes-atom
                           (into {}
                                 (map (fn [doc] [(.-id doc) (:text (doc->map doc))])
                                      (seq (.-docs snapshot))))))
                 (fn [err] (js/console.error "[db] subscribe-notes error:" err)))))
