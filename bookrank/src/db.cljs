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

;; -- Superuser --

(defn check-superuser!
  "Check if the current user has superuser status. Updates the provided atom."
  [superuser-atom]
  (when-let [db auth/firebase-db]
    (let [uid (:uid @auth/user)]
      (-> (.get (.doc db (str "superusers/" uid)))
          (.then (fn [doc]
                   (reset! superuser-atom (.-exists doc))
                   (when (.-exists doc)
                     (println "[db] superuser confirmed:" (:email @auth/user)))))
          (.catch (fn [_] (reset! superuser-atom false)))))))

(defn fetch-all-clubs!
  "Fetch all clubs in the system (superuser only). Updates the provided atom."
  [clubs-atom]
  (when-let [db auth/firebase-db]
    (-> (.get (.collection db "clubs"))
        (.then (fn [snapshot]
                 (reset! clubs-atom (mapv doc->map (seq (.-docs snapshot))))))
        (.catch (fn [err] (js/console.error "[db] fetch-all-clubs error:" err))))))

;; -- Clubs --

(defn create-club!
  "Create a new book club. Stores member_uids array for efficient querying."
  [club-name callback]
  (when-let [db auth/firebase-db]
    (let [uid (:uid @auth/user)
          code (random-code)]
      (-> (.add (.collection db "clubs")
                (clj->js {:name         club-name
                          :created_by   uid
                          :created_at   (ts-now)
                          :invite_code  code
                          :member_uids  [uid]}))
          (.then (fn [doc-ref]
                   ;; Add creator as admin member
                   (-> (.set (.doc (.collection db (str "clubs/" (.-id doc-ref) "/members")) uid)
                             (clj->js {:display_name (:display-name @auth/user)
                                       :email        (:email @auth/user)
                                       :photo_url    (:photo-url @auth/user)
                                       :role         "admin"
                                       :joined_at    (ts-now)}))
                       (.then (fn [] (when callback (callback (.-id doc-ref))))))))
          (.catch (fn [err] (js/console.error "[db] create-club error:" err)))))))

(defn fetch-clubs!
  "Fetch clubs the current user is a member of using the member_uids array.
   Single query instead of N+1 fan-out. Falls back to full scan for legacy clubs."
  [clubs-atom]
  (when-let [db auth/firebase-db]
    (let [uid (:uid @auth/user)]
      (-> (.get (.where (.collection db "clubs") "member_uids" "array-contains" uid))
          (.then (fn [snapshot]
                   (let [my-clubs (mapv doc->map (seq (.-docs snapshot)))]
                     (reset! clubs-atom my-clubs))))
          (.catch (fn [err] (js/console.error "[db] fetch-clubs error:" err)))))))

(defn join-club!
  "Join a club by invite code. Adds UID to member_uids array for efficient querying."
  [invite-code callback]
  (when-let [db auth/firebase-db]
    (let [uid (:uid @auth/user)
          code (clojure.string/upper-case (clojure.string/trim invite-code))]
      (-> (.get (.where (.collection db "clubs") "invite_code" "==" code))
          (.then (fn [snapshot]
                   (if (.-empty snapshot)
                     (do (js/console.warn "[db] no club found for code:" code)
                         (when callback (callback nil)))
                     (let [club-doc (first (seq (.-docs snapshot)))
                           club-id  (.-id club-doc)]
                       ;; Add member subdoc
                       (-> (.set (.doc db (str "clubs/" club-id "/members/" uid))
                                 (clj->js {:display_name (:display-name @auth/user)
                                           :email        (:email @auth/user)
                                           :photo_url    (:photo-url @auth/user)
                                           :role         "member"
                                           :joined_at    (ts-now)}))
                           (.then (fn []
                                    ;; Also add UID to member_uids array on club doc
                                    (-> (.update (.doc db (str "clubs/" club-id))
                                                 (clj->js {:member_uids
                                                           (js/firebase.firestore.FieldValue.arrayUnion uid)}))
                                        (.then (fn [] (when callback (callback club-id))))
                                        (.catch (fn [_]
                                                  ;; If update fails (e.g. field doesn't exist yet), still proceed
                                                  (when callback (callback club-id))))))))))))
          (.catch (fn [err] (js/console.error "[db] join-club error:" err)))))))

(defn update-club-settings!
  "Update settings on a club document. settings is a clj map."
  [club-id settings callback]
  (when-let [db auth/firebase-db]
    (-> (.update (.doc db (str "clubs/" club-id))
                 (clj->js settings))
        (.then (fn [] (when callback (callback))))
        (.catch (fn [err]
                  (js/console.error "[db] update-club-settings error:" err))))))

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
  "Save the current user's ranking for a club.
   NOTE: The Firestore field is 'unread' but the UI calls it 'skipped'.
   Kept as 'unread' for backward compatibility with existing data."
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
  "Fetch the current user's ranking for a club. Optional callback called after fetch."
  ([club-id ranking-atom] (fetch-ranking! club-id ranking-atom nil))
  ([club-id ranking-atom callback]
   (when-let [db auth/firebase-db]
     (let [uid (:uid @auth/user)]
       (-> (.get (.doc db (str "clubs/" club-id "/rankings/" uid)))
           (.then (fn [doc]
                    (when (.-exists doc)
                      (reset! ranking-atom (js->clj (.data doc) :keywordize-keys true)))
                    (when callback (callback))))
           (.catch (fn [err] (js/console.error "[db] fetch-ranking error:" err))))))))

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

(defn delete-member!
  "Delete a member from a club (admin only). Removes from member_uids array."
  [club-id member-id callback]
  (when-let [db auth/firebase-db]
    (-> (.delete (.doc db (str "clubs/" club-id "/members/" member-id)))
        (.then (fn []
                 ;; Also delete their ranking
                 (-> (.delete (.doc db (str "clubs/" club-id "/rankings/" member-id)))
                     (.catch (fn [_] nil))) ;; ignore if no ranking
                 ;; Remove from member_uids array
                 (-> (.update (.doc db (str "clubs/" club-id))
                              (clj->js {:member_uids
                                        (js/firebase.firestore.FieldValue.arrayRemove member-id)}))
                     (.catch (fn [_] nil))) ;; ignore if field doesn't exist
                 (when callback (callback))))
        (.catch (fn [err] (js/console.error "[db] delete-member error:" err))))))

(defn fetch-club!
  "Fetch a single club document."
  [club-id club-atom]
  (when-let [db auth/firebase-db]
    (-> (.get (.doc db (str "clubs/" club-id)))
        (.then (fn [doc]
                 (when (.-exists doc)
                   (reset! club-atom (doc->map doc)))))
        (.catch (fn [err] (js/console.error "[db] fetch-club error:" err))))))

;; =============================================
;; Real-time Subscriptions (.onSnapshot)
;; Each returns an unsubscribe function.
;; Call the returned fn to stop listening.
;; =============================================

(defn subscribe-club!
  "Subscribe to real-time updates on a club document."
  [club-id club-atom]
  (when-let [db auth/firebase-db]
    (.onSnapshot (.doc db (str "clubs/" club-id))
                 (fn [doc]
                   (when (.-exists doc)
                     (reset! club-atom (doc->map doc))))
                 (fn [err] (js/console.error "[db] subscribe-club error:" err)))))

(defn subscribe-books!
  "Subscribe to real-time updates on a club's books."
  [club-id books-atom]
  (when-let [db auth/firebase-db]
    (.onSnapshot (.collection db (str "clubs/" club-id "/books"))
                 (fn [snapshot]
                   (reset! books-atom (mapv doc->map (seq (.-docs snapshot)))))
                 (fn [err] (js/console.error "[db] subscribe-books error:" err)))))

(defn subscribe-members!
  "Subscribe to real-time updates on a club's members."
  [club-id members-atom]
  (when-let [db auth/firebase-db]
    (.onSnapshot (.collection db (str "clubs/" club-id "/members"))
                 (fn [snapshot]
                   (reset! members-atom (mapv doc->map (seq (.-docs snapshot)))))
                 (fn [err] (js/console.error "[db] subscribe-members error:" err)))))

(defn subscribe-rankings!
  "Subscribe to real-time updates on all members' rankings."
  [club-id rankings-atom]
  (when-let [db auth/firebase-db]
    (.onSnapshot (.collection db (str "clubs/" club-id "/rankings"))
                 (fn [snapshot]
                   (let [rankings (into {}
                                        (map (fn [doc]
                                               [(.-id doc)
                                                (js->clj (.data doc) :keywordize-keys true)])
                                             (seq (.-docs snapshot))))]
                     (reset! rankings-atom rankings)))
                 (fn [err] (js/console.error "[db] subscribe-rankings error:" err)))))
