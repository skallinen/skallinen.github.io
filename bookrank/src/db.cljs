(ns db
  (:require [reagent.core :as r]
            [auth]))

;; =============================================
;; Firestore Database Operations
;; =============================================

(println "[db] loaded")

;; -- Helpers --

(defn ts-now []
  (when (some? (aget js/window "firebase"))
    (js/firebase.firestore.FieldValue.serverTimestamp)))

(defn doc->map
  "Convert a Firestore document snapshot to a Clojure map with :id."
  [doc]
  (assoc (js->clj (.data doc) :keywordize-keys true)
         :id (.-id doc)))

(defn random-code
  "Generate a random 6-character invite code."
  []
  (let [chars "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
        len   (count chars)]
    (apply str (repeatedly 6 #(nth chars (rand-int len))))))

;; -- Clubs --

(defn create-club!
  "Create a new book club. Returns a promise."
  [club-name callback]
  (when-let [db auth/firebase-db]
    (let [uid (:uid @auth/user)
          code (random-code)]
      (-> (.add (.collection db "clubs")
                (clj->js {:name        club-name
                          :created_by  uid
                          :created_at  (ts-now)
                          :invite_code code}))
          (.then (fn [doc-ref]
                   ;; Add creator as member
                   (-> (.set (.doc (.collection db (str "clubs/" (.-id doc-ref) "/members")) uid)
                             (clj->js {:display_name (:display-name @auth/user)
                                       :email        (:email @auth/user)
                                       :photo_url    (:photo-url @auth/user)
                                       :joined_at    (ts-now)}))
                       (.then (fn [] (when callback (callback (.-id doc-ref))))))))
          (.catch (fn [err] (js/console.error "[db] create-club error:" err)))))))

(defn fetch-clubs!
  "Fetch all clubs the current user is a member of. Updates the provided atom."
  [clubs-atom]
  (when-let [db auth/firebase-db]
    (let [uid (:uid @auth/user)]
      ;; Query all clubs, then check membership
      ;; (Firestore doesn't support subcollection-based queries easily in compat SDK)
      ;; Alternative: query collectionGroup "members" where doc ID = uid
      ;; For simplicity, we'll query all clubs and filter client-side
      ;; In production you'd use a user-level collection of club references
      (-> (.get (.collection db "clubs"))
          (.then (fn [snapshot]
                   (let [all-clubs (map doc->map (seq (.-docs snapshot)))
                         ;; Now check membership for each club
                         promises (map (fn [club]
                                         (-> (.get (.doc db (str "clubs/" (:id club) "/members/" uid)))
                                             (.then (fn [member-doc]
                                                      (when (.-exists member-doc) club)))))
                                       all-clubs)]
                     (-> (js/Promise.all (clj->js promises))
                         (.then (fn [results]
                                  (let [my-clubs (filterv some? (js->clj results :keywordize-keys true))]
                                    (reset! clubs-atom my-clubs))))))))
          (.catch (fn [err] (js/console.error "[db] fetch-clubs error:" err)))))))

(defn join-club!
  "Join a club by invite code. Returns the club ID via callback."
  [invite-code callback]
  (when-let [db auth/firebase-db]
    (let [uid (:uid @auth/user)
          code (clojure.string/upper-case (clojure.string/trim invite-code))]
      (-> (.get (.where (.collection db "clubs") "invite_code" "==" code))
          (.then (fn [snapshot]
                   (if (.-empty snapshot)
                     (js/console.warn "[db] no club found for code:" code)
                     (let [club-doc (first (seq (.-docs snapshot)))
                           club-id  (.-id club-doc)]
                       (-> (.set (.doc db (str "clubs/" club-id "/members/" uid))
                                 (clj->js {:display_name (:display-name @auth/user)
                                           :email        (:email @auth/user)
                                           :photo_url    (:photo-url @auth/user)
                                           :joined_at    (ts-now)}))
                           (.then (fn [] (when callback (callback club-id)))))))))
          (.catch (fn [err] (js/console.error "[db] join-club error:" err)))))))

;; -- Books --

(defn add-book!
  "Add a book to a club."
  [club-id title author date-read callback]
  (when-let [db auth/firebase-db]
    (let [uid (:uid @auth/user)]
      (-> (.add (.collection db (str "clubs/" club-id "/books"))
                (clj->js {:title      title
                          :author     author
                          :added_by   uid
                          :added_at   (ts-now)
                          :date_read  (or date-read nil)}))
          (.then (fn [_] (when callback (callback))))
          (.catch (fn [err] (js/console.error "[db] add-book error:" err)))))))

(defn fetch-books!
  "Fetch all books for a club. Updates the provided atom."
  [club-id books-atom]
  (when-let [db auth/firebase-db]
    (-> (.get (.collection db (str "clubs/" club-id "/books")))
        (.then (fn [snapshot]
                 (reset! books-atom (mapv doc->map (seq (.-docs snapshot))))))
        (.catch (fn [err] (js/console.error "[db] fetch-books error:" err))))))

;; -- Rankings --

(defn save-ranking!
  "Save the current user's ranking for a club."
  [club-id order unread callback]
  (when-let [db auth/firebase-db]
    (let [uid (:uid @auth/user)]
      (-> (.set (.doc db (str "clubs/" club-id "/rankings/" uid))
                (clj->js {:order      (vec order)
                          :unread     (vec unread)
                          :updated_at (ts-now)}))
          (.then (fn [] (when callback (callback))))
          (.catch (fn [err] (js/console.error "[db] save-ranking error:" err)))))))

(defn fetch-ranking!
  "Fetch the current user's ranking for a club."
  [club-id ranking-atom]
  (when-let [db auth/firebase-db]
    (let [uid (:uid @auth/user)]
      (-> (.get (.doc db (str "clubs/" club-id "/rankings/" uid)))
          (.then (fn [doc]
                   (when (.-exists doc)
                     (reset! ranking-atom (js->clj (.data doc) :keywordize-keys true)))))
          (.catch (fn [err] (js/console.error "[db] fetch-ranking error:" err)))))))

(defn fetch-all-rankings!
  "Fetch all members' rankings for a club."
  [club-id rankings-atom]
  (when-let [db auth/firebase-db]
    (-> (.get (.collection db (str "clubs/" club-id "/rankings")))
        (.then (fn [snapshot]
                 (let [rankings (into {}
                                      (map (fn [doc]
                                             [(.-id doc)
                                              (js->clj (.data doc) :keywordize-keys true)])
                                           (seq (.-docs snapshot))))]
                   (reset! rankings-atom rankings))))
        (.catch (fn [err] (js/console.error "[db] fetch-all-rankings error:" err))))))

;; -- Members --

(defn fetch-members!
  "Fetch all members of a club."
  [club-id members-atom]
  (when-let [db auth/firebase-db]
    (-> (.get (.collection db (str "clubs/" club-id "/members")))
        (.then (fn [snapshot]
                 (reset! members-atom (mapv doc->map (seq (.-docs snapshot))))))
        (.catch (fn [err] (js/console.error "[db] fetch-members error:" err))))))

(defn fetch-club!
  "Fetch a single club document."
  [club-id club-atom]
  (when-let [db auth/firebase-db]
    (-> (.get (.doc db (str "clubs/" club-id)))
        (.then (fn [doc]
                 (when (.-exists doc)
                   (reset! club-atom (doc->map doc)))))
        (.catch (fn [err] (js/console.error "[db] fetch-club error:" err))))))
