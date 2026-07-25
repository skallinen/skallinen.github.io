;; UI components (Reagent). Read models come from views; every change goes
;; through dispatch/dispatch! — the UI never touches domain state directly.
(ns ui
  (:require [reagent.core :as r]
            [clojure.string :as str]
            [domain]
            [views]
            [state]
            [store]
            [speech]
            [dispatch]))

(defonce ^:private draft-title (r/atom ""))
(defonce ^:private draft-text (r/atom ""))
(defonce ^:private draft-url (r/atom ""))

(defn- add-to-queue! []
  (let [text @draft-text
        title @draft-title]
    (when-not (str/blank? text)
      (dispatch/dispatch! (cond-> {:kind "capture-text" :text text}
                            (not (str/blank? title)) (assoc :title title)))
      (reset! draft-title "")
      (reset! draft-text ""))))

(defn- add-url! []
  (let [url (str/trim @draft-url)]
    (when-not (str/blank? url)
      (dispatch/dispatch! {:kind "capture-url" :url url})
      (reset! draft-url ""))))

(defn capture-box []
  [:section.capture
   [:h2.section-label "Add to queue"]
   [:input.capture-title
    {:type "text" :aria-label "Title" :placeholder "Title (optional)"
     :value @draft-title
     :on-change #(reset! draft-title (.. % -target -value))}]
   [:textarea.capture-text
    {:aria-label "Text to read" :placeholder "Paste text to read aloud…" :rows 5
     :value @draft-text
     :on-change #(reset! draft-text (.. % -target -value))}]
   [:button.btn.btn-primary {:on-click add-to-queue!} "Add to queue"]
   [:div.capture-url-row
    [:input.capture-url
     {:type "url" :aria-label "Article URL"
      :placeholder "https://… — or add a web page to read"
      :value @draft-url
      :on-change #(reset! draft-url (.. % -target -value))
      :on-key-down #(when (= "Enter" (.-key %)) (add-url!))}]
    [:button.btn {:on-click add-url!} "Add URL"]]])

;; -- Active ingests (slice 03: the capture progress + retry UI) --------------

(defn active-ingests-section []
  (let [{:keys [ingests]} (views/active-ingests @state/app-state)]
    (when (seq ingests)
      [:section.active-ingests
       [:h2.section-label "Adding"]
       [:ul.ingest-list
        (doall
         (for [{:keys [ingest-id display-name reason] lifecycle :state} ingests]
           ^{:key ingest-id}
           [:li.ingest-item {:data-state lifecycle}
            [:span.ingest-name display-name]
            [:span.ingest-meta
             [:span.ingest-state lifecycle]
             (when reason [:span.ingest-reason reason])]
            (when (= "failed" lifecycle)
              [:span.item-actions
               [:button.btn.btn-small
                {:on-click #(dispatch/dispatch! {:kind "retry-ingest"
                                                 :ingest-id ingest-id})}
                "Retry"]
               [:button.btn.btn-small
                {:on-click #(dispatch/dispatch! {:kind "discard-ingest"
                                                 :ingest-id ingest-id})}
                "Dismiss"]])]))]])))

;; -- Queue reordering (ticket 02) -------------------------------------------
;; SortableJS 1.15.6 as a CDN global (bookrank pattern): drag by the handle;
;; onEnd reads the new order from the DOM, reverts the DOM move, and
;; dispatches reorder-queue — Reagent re-renders the order from folded state.

(defonce ^:private sortable (atom nil))

(defn- init-sortable! [el]
  (when-let [s @sortable]
    (.destroy s)
    (reset! sortable nil))
  (when (and el (some? (aget js/window "Sortable")))
    (reset! sortable
            (js/Sortable.
             el
             (clj->js
              {:animation 150
               :handle ".drag-handle"
               :ghostClass "sortable-ghost"
               :chosenClass "sortable-chosen"
               :onEnd (fn [evt]
                        (let [order (mapv #(.getAttribute % "data-item-id")
                                          (.from js/Array (.querySelectorAll el "[data-item-id]")))
                              item (.-item evt)
                              parent (.-parentNode item)
                              anchor (aget (.-children parent) (.-oldIndex evt))]
                          (.removeChild parent item)
                          (.insertBefore parent item (or anchor nil))
                          (dispatch/dispatch! {:kind "reorder-queue" :order order})))})))))

(defn- reorder-swap!
  "Move-up/move-down affordance: the same reorder-queue intent as dragging."
  [order idx delta]
  (let [j (+ idx delta)]
    (when (and (>= j 0) (< j (count order)))
      (dispatch/dispatch! {:kind "reorder-queue"
                           :order (assoc order idx (order j) j (order idx))}))))

(defn queue-section []
  (let [{:keys [items total-remaining]} (views/queue-view @state/app-state)
        order (mapv :item-id items)
        last-idx (dec (count items))]
    [:section.queue
     [:div.queue-header
      [:h2.section-label "Up next"]
      (when (seq items)
        [:<>
         [:span.queue-total (str (views/format-duration total-remaining) " left")]
         [:button.btn.btn-small
          {:on-click #(dispatch/dispatch! {:kind "clear-queue"})}
          "Clear queue"]])]
     (if (empty? items)
       [:p.empty-state "The queue is empty — paste something above."]
       [:ul.queue-list {:ref init-sortable!}
        (doall
         (for [[idx item] (map-indexed vector items)]
           ^{:key (:item-id item)}
           [:li.queue-item {:data-item-id (:item-id item)}
            [:span.drag-handle {:aria-hidden "true"} "⠿"]
            [:span.item-title (:title item)]
            [:span.item-meta
             [:span.item-kind (views/kind-label (:kind item))]
             [:span.item-duration (views/format-duration (:duration-estimate item))]]
            [:span.item-actions
             [:button.btn.btn-small.btn-icon
              {:aria-label "Move up" :disabled (zero? idx)
               :on-click #(reorder-swap! order idx -1)}
              "↑"]
             [:button.btn.btn-small.btn-icon
              {:aria-label "Move down" :disabled (= idx last-idx)
               :on-click #(reorder-swap! order idx 1)}
              "↓"]
             [:button.btn.btn-small.btn-icon
              {:aria-label "Remove from queue"
               :on-click #(dispatch/dispatch! {:kind "remove-from-queue"
                                               :item-id (:item-id item)})}
              "✕"]]]))])]))

(defn library-section []
  (let [{:keys [items]} (views/item-list @state/app-state)]
    [:section.library
     [:h2.section-label "Library"]
     (if (empty? items)
       [:p.empty-state "Nothing captured yet."]
       [:ul.library-list
        (for [item items]
          ^{:key (:item-id item)}
          [:li.library-item
           [:span.item-title (:title item)]
           [:span.item-actions
            ;; the already-queued guard (not the presentation) protects the
            ;; queue — refused intents change nothing (ticket 01)
            [:button.btn.btn-small
             {:on-click #(dispatch/dispatch! {:kind "queue-item-next"
                                              :item-id (:item-id item)})}
             "Play next"]
            [:button.btn.btn-small
             {:on-click #(dispatch/dispatch! {:kind "queue-item"
                                              :item-id (:item-id item)})}
             "Play last"]
            [:span {:class (str "status-badge status-" (:status item))}
             (views/status-label (:status item))]]])])]))

;; Skip intervals: pinned defaults (30 s forward / 15 s back) — per plan.md
;; spec notes there is no configuring intent anywhere in the contexts.
(def ^:private skip-forward-seconds 30)
(def ^:private skip-back-seconds 15)

(def ^:private speed-choices [0.5 0.75 1 1.25 1.5 2 2.5 3])

(defn- speed-label [speed]
  (str speed "x"))

(defn- player-progress
  "Elapsed m:ss · interactive seek bar · total m:ss. The bar works in seconds;
   the domain position is the chunk index, so the seconds→chunk conversion
   happens here at the edge (ticket 01)."
  [content duration elapsed]
  [:div.player-progress
   [:span.player-position (views/format-position elapsed)]
   [:input.progress-bar
    {:type "range" :aria-label "Progress"
     :min 0 :max duration :step 1 :value elapsed
     :on-change #(dispatch/dispatch!
                  {:kind "seek"
                   :position (domain/chunk-at
                              (or content "")
                              (js/parseInt (.. % -target -value) 10))})}]
   [:span.player-duration (views/format-position duration)]])

(defn- skip-button [direction seconds enabled?]
  [:button.btn.btn-small.btn-icon
   {:aria-label (str "Skip " direction " " seconds " seconds")
    :disabled (not enabled?)
    :on-click #(dispatch/dispatch! {:kind "skip" :direction direction
                                    :seconds seconds})}
   (str (if (= "back" direction) "−" "+") seconds "s")])

(defn- speed-select [speed]
  [:select.speed-select
   {:aria-label "Speed" :value (str speed)
    :on-change #(dispatch/dispatch!
                 {:kind "set-speed"
                  :speed (js/parseFloat (.. % -target -value))})}
   (for [s speed-choices]
     ^{:key s}
     [:option {:value (str s)} (speed-label s)])])

(defn player-bar []
  (let [pv (views/player-view @state/app-state)
        player-state (:state pv)
        ;; live chunk index while speaking; the folded domain position otherwise
        ;; (e.g. paused, incl. after a reload when the runtime atom is fresh)
        position (if (= "playing" player-state)
                   @state/speech-position
                   (:position pv))
        speed (:speed pv)
        item-id (get-in pv [:item :item-id])
        content (when item-id (get-in @state/app-state [:items item-id :content]))
        duration (when item-id (get-in pv [:item :duration-estimate]))
        elapsed (when item-id (domain/elapsed-seconds (or content "") position))]
    [:div.player {:data-state player-state :data-position position
                  :data-speed (str speed)}
     (when item-id
       [player-progress content duration elapsed])
     [:div.player-row
      [:span.player-info
       [:span.player-title (or (get-in pv [:item :title]) "Nothing playing")]]
      [:span.player-controls
       [skip-button "back" skip-back-seconds (some? item-id)]
       [:button.btn.btn-primary.player-btn
        {:on-click dispatch/press-play!
         :disabled (and (= "idle" player-state)
                        (empty? (:queue @state/app-state)))}
        (case player-state
          "idle" "Play"
          "playing" "Pause"
          "paused" "Resume")]
       [skip-button "forward" skip-forward-seconds (some? item-id)]
       [speed-select speed]]]]))

(defn settings-panel []
  (let [k (r/atom (or (store/elevenlabs-key) ""))
        v (r/atom (or (store/elevenlabs-voice) ""))]
    (fn []
      [:section.settings
       [:h2.section-label "Settings"]
       [:label.settings-label {:for "elevenlabs-key"} "ElevenLabs API key"]
       [:input#elevenlabs-key.settings-input
        {:type "password" :placeholder "xi-api-key (optional)"
         :value @k :on-change #(reset! k (.. % -target -value))}]
       (when-let [voices @state/elevenlabs-voices]
         [:<>
          [:label.settings-label {:for "elevenlabs-voice"} "Voice"]
          [:select#elevenlabs-voice.settings-input
           {:value @v :on-change #(reset! v (.. % -target -value))}
           (for [voice voices]
             ^{:key (:voice-id voice)}
             [:option {:value (:voice-id voice)} (:name voice)])]])
       [:div.settings-actions
        [:button.btn.btn-primary
         {:on-click (fn []
                      (store/save-elevenlabs! @k @v)
                      (if (str/blank? @k)
                        (reset! state/elevenlabs-voices nil)
                        (speech/fetch-voices! @k))
                      (reset! state/settings-open? false))}
         "Save"]
        [:button.btn {:on-click #(reset! state/settings-open? false)} "Close"]]
       [:p.settings-note
        "Without a key, the browser's built-in speech synthesis is used."]])))

(defn header []
  [:header.app-header
   [:h1.app-title "Printcast"]
   [:button.btn.btn-ghost.settings-toggle
    {:aria-label "Settings" :on-click #(swap! state/settings-open? not)}
    "⚙"]])

(defn app []
  [:div.app-container
   [header]
   (when @state/settings-open? [settings-panel])
   [capture-box]
   [active-ingests-section]
   [queue-section]
   [library-section]
   [player-bar]])

(println "[ui] loaded")
