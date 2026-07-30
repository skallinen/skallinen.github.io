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
            [fetcher]
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

(defn- capture-picked-file!
  "Stash the picked file's bytes for the extraction edge (transient — never
   in the event log) under the document-ref, then dispatch the intent;
   `plan-for` returns {:document-ref … :intent …} for the file. The input
   resets so the same file can be handed over again."
  [input plan-for]
  (when-let [file (aget (.-files input) 0)]
    (-> (.arrayBuffer file)
        (.then (fn [buf]
                 (let [{:keys [document-ref intent]} (plan-for file)]
                   (fetcher/stash-document! document-ref buf)
                   (dispatch/dispatch! intent))))
        (.finally (fn [] (set! (.-value input) ""))))))

(defn- add-document! [e]
  (capture-picked-file!
   (.-target e)
   (fn [file]
     (let [ref (str "mem:" (random-uuid))]
       {:document-ref ref
        :intent {:kind "capture-document" :file-name (.-name file)
                 :document-ref ref}}))))

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
    [:button.btn {:on-click add-url!} "Add URL"]]
   [:div.capture-file-row
    [:label.capture-file-label {:for "capture-file"} "… or add a document (PDF)"]
    [:input#capture-file.capture-file
     {:type "file" :accept ".pdf,application/pdf" :aria-label "Document file"
      :on-change add-document!}]]])

;; -- Speed + voice choices (shared by the player, the settings panel, and
;; the source page) -----------------------------------------------------------

(def ^:private speed-choices [0.5 0.75 1 1.25 1.5 2 2.5 3])

(defn- speed-label [speed]
  (str speed "x"))

(defn- voice-options
  "Option groups for a voice select: the enumerated voices grouped by
   provider (slice 08 ticket 04), in the order speech/available-voices offers
   them (slice 14: configured services first, the platform's own built-in
   voices last, each group by name). Groups are contiguous under that order,
   so first-appearance grouping emits them in it. Shared by the global voice
   setting and a source's own, which is how the two agree by construction
   rather than by coincidence. Returns a realized seq — a seq child renders
   as a fragment (a vector would be read as hiccup)."
  []
  (doall
   (for [group (partition-by :provider (speech/available-voices))
         :let [provider (:provider (first group))]]
     ^{:key provider}
     [:optgroup {:label provider}
      (for [{:keys [voice-id name]} group]
        ^{:key voice-id}
        [:option {:value voice-id} name])])))

;; -- Sources (slice 05: follow a podcast feed) -------------------------------

(defonce ^:private draft-feed (r/atom ""))

(defn- subscribe! []
  (let [url (str/trim @draft-feed)]
    (when-not (str/blank? url)
      (dispatch/dispatch! {:kind "subscribe-source" :feed-url url})
      (reset! draft-feed ""))))

(defn- source-actions [source-id]
  [:span.item-actions
   [:button.btn.btn-small
    {:on-click #(dispatch/dispatch! {:kind "refresh-source" :source-id source-id})}
    "Refresh"]
   [:button.btn.btn-small
    {:on-click (fn []
                 (dispatch/dispatch! {:kind "unsubscribe-source" :source-id source-id})
                 ;; an unsubscribed source has no page to stay on
                 (when (str/starts-with? (str @state/route) "#/source/")
                   (set! (.-hash js/location) "#/")))}
    "Unsubscribe"]])

(defn sources-section []
  (let [{:keys [sources]} (views/source-list @state/app-state)]
    [:section.sources
     [:h2.section-label "Following"]
     [:div.subscribe-row
      [:input.subscribe-input
       {:type "url" :aria-label "Feed address"
        :placeholder "https://… — paste a podcast feed to follow"
        :value @draft-feed
        :on-change #(reset! draft-feed (.. % -target -value))
        :on-key-down #(when (= "Enter" (.-key %)) (subscribe!))}]
      [:button.btn {:on-click subscribe!} "Subscribe"]]
     (when (seq sources)
       [:ul.source-list
        (for [{:keys [source-id feed-url title author artwork-url voice-id speed
                      unplayed-count]} sources]
          ^{:key source-id}
          [:li.source-item
           (when artwork-url
             [:img.source-artwork {:src artwork-url :alt ""}])
           [:span.source-info
            [:a.source-title {:href (str "#/source/" source-id)}
             (or title feed-url)]
            (when author [:span.source-author author])
            ;; How many of this source are still to hear (since 16). Shown
            ;; only when there is something: a zero is noise — the row's job
            ;; is to say where to go next, and "nothing here" is said better
            ;; by silence than by a badge reading nought (ticket 04).
            (when (pos? (or unplayed-count 0))
              [:span.source-unplayed (str unplayed-count " unplayed")])
            ;; the per-source overrides, when set (since 08)
            (when voice-id [:span.source-voice (speech/voice-name voice-id)])
            (when speed [:span.source-speed (speed-label speed)])]
           [source-actions source-id]])])]))

;; -- Active ingests (slice 03: the capture progress + retry UI) --------------

(defn- document-retry-button
  "Retry for a failed document capture re-opens the file picker: extraction
   of fixed bytes is deterministic, so a retry only makes sense with the file
   handed over again — fresh bytes under the ingest's existing document-ref
   (decisions.md). Cancelling the picker leaves the ingest failed; the
   capture keeps its original file-name identity whatever the re-picked file
   is called."
  [ingest-id]
  (let [input (r/atom nil)]
    (fn [ingest-id]
      [:<>
       [:input.retry-file
        {:type "file" :accept ".pdf,application/pdf"
         :style {:display "none"} :tab-index -1 :aria-hidden "true"
         :ref #(reset! input %)
         :on-change (fn [e]
                      (capture-picked-file!
                       (.-target e)
                       (fn [_file]
                         {:document-ref (get-in @state/app-state
                                                [:ingests ingest-id :document-ref])
                          :intent {:kind "retry-ingest" :ingest-id ingest-id}})))}]
       [:button.btn.btn-small {:on-click #(some-> @input .click)} "Retry"]])))

(defn active-ingests-section []
  (let [{:keys [ingests]} (views/active-ingests @state/app-state)]
    (when (seq ingests)
      [:section.active-ingests
       [:h2.section-label "Adding"]
       [:ul.ingest-list
        (doall
         (for [{:keys [ingest-id capture-kind display-name reason]
                lifecycle :state} ingests]
           ^{:key ingest-id}
           [:li.ingest-item {:data-state lifecycle}
            [:span.ingest-name display-name]
            [:span.ingest-meta
             [:span.ingest-state lifecycle]
             (when reason [:span.ingest-reason reason])]
            (when (= "failed" lifecycle)
              [:span.item-actions
               (if (= "document" capture-kind)
                 [document-retry-button ingest-id]
                 [:button.btn.btn-small
                  {:on-click #(dispatch/dispatch! {:kind "retry-ingest"
                                                   :ingest-id ingest-id})}
                  "Retry"])
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

(defn- library-row
  "One library/episode row (shared by the home library and the source page):
   title (+ star), kind + duration meta (+ elapsed progress when in
   progress), queue affordances, lifecycle actions (slice 06 ticket 04),
   status badge. Archived rows offer Unarchive only — an archived item is
   out of active use."
  [item]
  (let [{:keys [item-id title kind duration-estimate status starred position]} item
        action (fn [label intent-kind & [attrs]]
                 [:button.btn.btn-small
                  (assoc attrs :on-click
                         #(dispatch/dispatch! {:kind intent-kind :item-id item-id}))
                  label])]
    [:li.library-item {:data-status status}
     [:span.item-heading
      [:span.item-title title]
      (when starred [:span.item-star {:title "Starred"} "★"])]
     [:span.item-meta
      [:span.item-kind (views/kind-label kind)]
      [:span.item-duration (views/format-duration duration-estimate)]
      (when (= "in-progress" status)
        [:span.item-progress
         (views/format-position
          (domain/item-elapsed-seconds (get-in @state/app-state [:items item-id])
                                       position))])]
     [:span.item-actions
      (if (= "archived" status)
        (action "Unarchive" "unarchive-item")
        [:<>
         ;; the deciders' guards (already queued, already starred) — not the
         ;; presentation — protect the domain: refused intents change nothing
         ;; (the slice-02 convention)
         (action "☆" "star-item" {:aria-label "Star" :class "btn-icon"})
         (when starred
           (action "★" "unstar-item" {:aria-label "Unstar" :class "btn-icon"}))
         (action "Play next" "queue-item-next")
         (action "Play last" "queue-item")
         (when (contains? #{"new" "in-progress"} status)
           (action "Mark played" "mark-played"))
         (when (contains? #{"played" "in-progress"} status)
           (action "Mark unplayed" "mark-unplayed"))
         (action "Archive" "archive-item")])
      [:span {:class (str "status-badge status-" status)}
       (views/status-label status)]]]))

;; -- Library view (slice 06: filters, sorts, archived + starred views) -------
;; The filter/sort selection is view state (query input), not domain events:
;; local atoms feeding views/library-items.

(defonce ^:private library-status-filter (r/atom ""))
(defonce ^:private library-kind-filter (r/atom ""))
(defonce ^:private library-source-filter (r/atom ""))
(defonce ^:private library-starred-only? (r/atom false))
(defonce ^:private library-sort-key (r/atom "date-newest-first"))

(def ^:private status-choices
  [["new" "Unplayed"] ["in-progress" "In progress"]
   ["played" "Played"] ["archived" "Archived"]])

(def ^:private kind-choices
  [["pasted-text" "pasted text"] ["web-article" "web article"]
   ["podcast-episode" "podcast episode"] ["document" "document"]])

(def ^:private sort-choices
  "The library-items ordering enum. The labels are unchanged since 06-library
   — what 11-item-ordering changed is what \"newest\" *means* (the item's own
   date, not the day it entered the library), not what the reader is offered."
  [["date-newest-first" "Newest first"] ["date-oldest-first" "Oldest first"]
   ["duration-shortest-first" "Shortest first"]
   ["duration-longest-first" "Longest first"]])

(defn- library-select [aria-label value-atom all-label choices]
  [:select.library-select
   {:aria-label aria-label :value @value-atom
    :on-change #(reset! value-atom (.. % -target -value))}
   (when all-label [:option {:value ""} all-label])
   (for [[value label] choices]
     ^{:key value}
     [:option {:value value} label])])

(defn- library-controls []
  (let [{:keys [sources]} (views/source-list @state/app-state)]
    [:div.library-controls
     [library-select "Filter by status" library-status-filter "All statuses" status-choices]
     [library-select "Filter by kind" library-kind-filter "All kinds" kind-choices]
     (when (seq sources)
       [library-select "Filter by source" library-source-filter "All sources"
        (mapv (fn [{:keys [source-id title feed-url]}]
                [source-id (or title feed-url)])
              sources)])
     [:label.library-starred-toggle
      [:input {:type "checkbox" :aria-label "Starred only"
               :checked @library-starred-only?
               :on-change #(reset! library-starred-only? (.. % -target -checked))}]
      "★ only"]
     [library-select "Sort by" library-sort-key nil sort-choices]]))

(defn- library-query
  "The library-items query input from the current control selection
   (docs/contexts/library/read-models/library-items.md)."
  []
  {:filter (cond-> {}
             (not (str/blank? @library-status-filter))
             (assoc :status @library-status-filter)

             (not (str/blank? @library-kind-filter))
             (assoc :kind @library-kind-filter)

             (not (str/blank? @library-source-filter))
             (assoc :source-id @library-source-filter)

             @library-starred-only?
             (assoc :starred true))
   :sort @library-sort-key})

(defn library-section []
  (let [{:keys [items]} (views/library-items @state/app-state (library-query))]
    [:section.library
     ;; "Saved" since 16-library-membership: the list holds the items the
     ;; reader added themselves, so a heading reading "Library" would be a
     ;; plain lie — a followed source's items are obviously in their library,
     ;; they are merely listed elsewhere. The query id and the context keep
     ;; their names; only the reader-facing word changes (plan decision 4).
     [:h2.section-label "Saved"]
     [library-controls]
     (if (empty? items)
       [:p.empty-state "Nothing here — paste something above, or relax the filters."]
       [:ul.library-list
        (for [item items]
          ^{:key (:item-id item)}
          [library-row item])])]))

;; -- Latest from followed sources (slice 16 ticket 03) -----------------------
;; Sits directly under Following on the page: the reader meets the sources
;; they follow and then what those sources have sent, before the queue and
;; before Saved. Rows carry the same affordances a list row carries anywhere
;; else — including putting an item in the queue, which takes the row out of
;; THIS list and moves the next-newest qualifying item up into it. The row
;; does not vanish from the page: it is in Up next, a few centimetres below,
;; which is why the two sections are worth keeping visibly adjacent.

(defn latest-section []
  (let [{:keys [items]} (views/latest-from-sources @state/app-state)]
    [:section.latest
     [:h2.section-label "Latest"]
     (if (empty? items)
       ;; Empty is a NORMAL state here and it says something true — everything
       ;; that arrived is lined up or heard. It must not read as an error.
       [:p.empty-state
        "Nothing new waiting — everything your shows have sent is lined up or heard."]
       [:ul.latest-list
        (for [item items]
          ^{:key (:item-id item)}
          [library-row item])])]))

;; -- Source page (slice 05 ticket 03: #/source/<id>) -------------------------

(defn- source-settings
  "Per-source voice/speed overrides (slice 08 ticket 02): each select
   dispatches its intent on change. Choosing \"Default voice\" dispatches an
   empty voice-id — v1's way of clearing the override; the speed placeholder
   is disabled (v1 always sets a value, clearing is deferred)."
  [{:keys [source-id voice-id speed]}]
  [:div.source-settings
   [:label.settings-label {:for "source-voice"} "Source voice"]
   [:select#source-voice.settings-input
    {:value (or voice-id "")
     :on-change #(dispatch/dispatch! {:kind "set-source-voice"
                                      :source-id source-id
                                      :voice-id (.. % -target -value)})}
    [:option {:value ""} "Default voice"]
    (voice-options)]
   [:label.settings-label {:for "source-speed"} "Source speed"]
   [:select#source-speed.settings-input
    {:value (if speed (str speed) "")
     :on-change #(let [v (.. % -target -value)]
                   (when-not (str/blank? v)
                     (dispatch/dispatch! {:kind "set-source-speed"
                                          :source-id source-id
                                          :speed (js/parseFloat v)})))}
    [:option {:value "" :disabled true} "Global speed"]
    (for [s speed-choices]
      ^{:key s}
      [:option {:value (str s)} (speed-label s)])]])

;; Which source's archived episodes are on show, or nil. Held as the source's
;; own id rather than a boolean so that walking to another source's page
;; starts on that source's episodes rather than inheriting a reveal.
(defonce ^:private archived-source-shown (r/atom nil))

(defn source-page [source-id]
  (let [source (->> (:sources (views/source-list @state/app-state))
                    (filter #(= source-id (:source-id %)))
                    first)
        archived? (= source-id @archived-source-shown)
        ;; THE PAGE IS THE QUERY NARROWED TO THIS SOURCE — nothing else.
        ;; library-items.md has said so since 11-item-ordering while this page
        ;; assembled its own list from item-list rows, so archived episodes
        ;; appeared here and in no other answer to the same question (the
        ;; standing gap, HANDOVER §9 [11]). The docs win: asking the query is
        ;; now the only path from the projection to any list of a source's
        ;; items, so the page and the library narrowed to this source cannot
        ;; drift apart again — order, membership and archived rule alike.
        ;; The queue is NOT consulted here: a source's page is the reader's
        ;; whole record of a show, and an episode dropping off it because it
        ;; was lined up would be a worse version of the complaint this slice
        ;; exists to fix. Only Latest excludes what playback holds.
        episodes (:items (views/library-items
                          @state/app-state
                          {:filter (cond-> {:source-id source-id}
                                     archived? (assoc :status "archived"))
                           :sort "date-newest-first"}))]
    [:section.source-page
     [:a.back-link {:href "#/"} "‹ Home"]
     (if (nil? source)
       [:p.empty-state "This source is no longer followed."]
       [:div.source-page-header
        (when (:artwork-url source)
          [:img.source-artwork-large {:src (:artwork-url source) :alt ""}])
        [:div.source-page-info
         [:h2.source-page-title (or (:title source) (:feed-url source))]
         (when (:author source)
           [:p.source-page-author (:author source)])
         [source-actions source-id]
         [source-settings source]]])
     [:div.source-episodes-header
      [:h2.section-label (if archived? "Archived" "Episodes")]
      ;; The reveal SWAPS the list rather than adding to it, so the label says
      ;; so: a control that promises to add rows and instead replaces them is
      ;; the kind of surprise this slice exists to remove (ticket 02).
      [:button.btn.btn-small
       {:on-click #(swap! archived-source-shown
                          (fn [shown] (when-not (= shown source-id) source-id)))}
       (if archived? "Show episodes" "Show archived only")]]
     (if (empty? episodes)
       [:p.empty-state
        (if archived?
          "Nothing archived from this source."
          "No episodes yet — try Refresh.")]
       [:ul.library-list
        (for [item episodes]
          ^{:key (:item-id item)}
          [library-row item])])]))

;; Skip intervals: pinned defaults (30 s forward / 15 s back) — per plan.md
;; spec notes there is no configuring intent anywhere in the contexts.
(def ^:private skip-forward-seconds 30)
(def ^:private skip-back-seconds 15)

;; -- Sleep timer (slice 10 ticket 01) ----------------------------------------
;; Off / 5 / 15 / 30 min / end of item — the spec's examples; the live
;; countdown (edge runtime) shows beside the player title.

(def ^:private sleep-choices
  [["" "Sleep: off"] ["300" "Sleep in 5 min"] ["900" "Sleep in 15 min"]
   ["1800" "Sleep in 30 min"] ["end-of-item" "Sleep at end of item"]])

(defn- sleep-timer-select [sleep-timer]
  [:select.sleep-select
   {:aria-label "Sleep timer"
    :value (cond
             (nil? sleep-timer) ""
             (= "end-of-item" (:mode sleep-timer)) "end-of-item"
             :else (str (:remaining sleep-timer)))
    :on-change #(let [v (.. % -target -value)]
                  (cond
                    (str/blank? v)
                    (dispatch/dispatch! {:kind "cancel-sleep-timer"})

                    (= "end-of-item" v)
                    (dispatch/dispatch! {:kind "set-sleep-timer"
                                         :mode "end-of-item"})

                    :else
                    (dispatch/dispatch! {:kind "set-sleep-timer"
                                         :mode "duration"
                                         :duration (js/parseInt v 10)})))}
   (for [[value label] sleep-choices]
     ^{:key value}
     [:option {:value value} label])])

(defn- sleep-remaining [sleep-timer]
  (when sleep-timer
    [:span.sleep-remaining
     (if (= "end-of-item" (:mode sleep-timer))
       "end of item"
       (views/format-position (max 0 (or @state/sleep-seconds-left
                                         (:remaining sleep-timer)))))]))

;; -- Chapters (slice 10 ticket 02) -------------------------------------------

(defn- current-section-index
  "The chapter the elapsed listening falls in: how many chapters have started
   by now, minus one — clamped at the first, which covers anything before the
   opening chapter's start. Section starts ascend, so counting stops at the
   first chapter still ahead."
  [sections elapsed]
  (->> sections
       (take-while #(<= (:position %) elapsed))
       count
       dec
       (max 0)))

(defn- chapters-panel [sections elapsed]
  (let [current (current-section-index sections elapsed)
        jump! (fn [i] #(dispatch/dispatch! {:kind "jump-to-chapter"
                                            :section-index i}))]
    [:div.chapters
     [:div.chapters-header
      [:span.chapters-label "Chapters"]
      [:span.item-actions
       ;; the decider's section-at-index guard — not the presentation —
       ;; protects the ends: next at the last chapter changes nothing
       ;; (the slice-02 convention)
       [:button.btn.btn-small
        {:aria-label "Previous chapter" :on-click (jump! (dec current))}
        "‹ Prev"]
       [:button.btn.btn-small
        {:aria-label "Next chapter" :on-click (jump! (inc current))}
        "Next ›"]]]
     [:ol.chapter-list
      (doall
       (for [[i {:keys [title]}] (map-indexed vector sections)]
         ^{:key i}
         [:li
          [:button.chapter-link
           {:class (when (= i current) "chapter-current")
            :on-click (jump! i)}
           title]]))]]))

(defn- player-progress
  "Elapsed m:ss · interactive seek bar · total m:ss. The bar works in seconds;
   the domain position is the chunk index for text (seconds→chunk conversion
   at this edge, ticket 01) and seconds for a recording (since 05).

   A pointer gesture settles to ONE seek (since 19, ticket 03): while the
   hand is moving, the bar tracks it locally — edge-local display state, like
   any draft field — and the seek the reader actually requested is dispatched
   where the gesture settles, at its release. The twenty intermediate
   positions were never requests, they were the input element's stutter.
   Keyboard operation keeps dispatching per step: there each step IS the
   request. A click with no travel settles immediately; a press released
   without any change dispatches nothing, exactly as before."
  [item duration elapsed]
  (let [drag (r/atom nil)] ; {:secs n :moved? bool} while a gesture is in flight
    (fn [item duration elapsed]
      (let [seek! (fn [secs]
                    (dispatch/dispatch!
                     {:kind "seek"
                      :position (domain/position-for-seconds item secs)}))
            settle! (fn [_]
                      (when-let [{:keys [secs moved?]} @drag]
                        (reset! drag nil)
                        (when moved? (seek! secs))))]
        [:div.player-progress
         [:span.player-position (views/format-position (or (:secs @drag) elapsed))]
         [:input.progress-bar
          {:type "range" :aria-label "Progress"
           :min 0 :max duration :step 1 :value (or (:secs @drag) elapsed)
           :on-pointer-down
           (fn [e]
             (reset! drag {:secs (js/parseInt (.. e -target -value) 10)}))
           ;; the release is the settle; lost capture is the safety net so a
           ;; gesture ending off the element can never leave the bar stuck
           :on-pointer-up settle!
           :on-lost-pointer-capture settle!
           :on-pointer-cancel (fn [_] (reset! drag nil))
           :on-change
           (fn [e]
             (let [secs (js/parseInt (.. e -target -value) 10)]
               (if @drag
                 (swap! drag assoc :secs secs :moved? true)
                 (seek! secs))))}]
         [:span.player-duration (views/format-position duration)]]))))

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
        item-id (get-in pv [:item :item-id])
        item (when item-id (get-in @state/app-state [:items item-id]))
        ;; live position while playing (recording seconds or speech chunk
        ;; index); the folded domain position otherwise (e.g. paused, incl.
        ;; after a reload when the runtime atoms are fresh)
        position (if (= "playing" player-state)
                   (if (domain/recording? item)
                     @state/audio-seconds
                     @state/speech-position)
                   (:position pv))
        speed (:speed pv)
        duration (when item-id (get-in pv [:item :duration-estimate]))
        ;; the one elapsed derivation every hand reads (the m:ss reading,
        ;; the progress marker, the chapter highlight — slice-11 shape, one
        ;; derivation shared by construction). A recording's seconds come
        ;; off the playing audio itself; a spoken item's reading is the
        ;; running clock: the recorded position's estimate plus the edge
        ;; tick, clamped at the next sentence's mark
        ;; (since 20-a-clock-not-a-ledger)
        elapsed (when item-id
                  (if (domain/recording? item)
                    (domain/item-elapsed-seconds item position)
                    (domain/displayed-elapsed (or (:content item) "") position
                                              @state/ticked-seconds)))]
    [:div.player {:data-state player-state :data-position position
                  :data-speed (str speed)}
     (when-let [sections (seq (get-in pv [:item :sections]))]
       [chapters-panel (vec sections) elapsed])
     (when item-id
       [player-progress item duration elapsed])
     [:div.player-row
      [:span.player-info
       [:span.player-title (or (get-in pv [:item :title]) "Nothing playing")]
       [sleep-remaining (:sleep-timer pv)]]
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
       [speed-select speed]
       (when item-id
         [sleep-timer-select (:sleep-timer pv)])]]]))

(defn settings-panel []
  (let [k (r/atom (or (store/elevenlabs-key) ""))
        ;; the last refused voice statement's reason — a control that
        ;; silently does nothing is indistinguishable from a broken one
        ;; (slice 15 ticket 03); an accepted statement clears it
        note (r/atom nil)
        say! (fn [intent]
               (let [res (dispatch/dispatch! intent)]
                 (reset! note (when-not (:ok? res) (:reason res)))))
        ;; read at DISPATCH time, not render time: Reagent re-renders
        ;; asynchronously, so a handler closing over the rendered list would
        ;; state a stale rotation when picks come quickly
        picked-now (fn []
                     (vec (get-in @state/app-state
                                  [:player :voice-rotation :voice-ids] [])))]
    (fn []
      (let [picked (get-in @state/app-state [:player :voice-rotation :voice-ids] [])]
        [:section.settings
         [:h2.section-label "Settings"]
         ;; The voice (slice 08 ticket 01): a unified select over the
         ;; enumerated voices, dispatching set-voice immediately — a voice
         ;; choice is a domain intent, not edge configuration. Choosing here
         ;; states a rotation of exactly that one voice (since
         ;; 15-voice-rotation, a fresh statement of the whole setting); the
         ;; shown value is the rotation's first voice. The placeholder is
         ;; disabled: there is no unset-voices intent (the slice-08 gap,
         ;; still open by decision).
         [:label.settings-label {:for "voice-setting"} "Voice"]
         [:select#voice-setting.settings-input
          {:value (or (first picked) "")
           :on-change #(let [v (.. % -target -value)]
                         (when-not (str/blank? v)
                           (say! {:kind "set-voice" :voice-id v})))}
          [:option {:value "" :disabled true} "Provider default"]
          (voice-options)]
         ;; The rotation (slice 15 ticket 03): an ordered list the reader
         ;; builds — add a voice to the end, remove one, see the order that
         ;; results. Every change states the WHOLE rotation through one
         ;; set-voice-rotation, so there is never a partial setting. Both
         ;; refusals stay reachable: the controls always dispatch and the
         ;; decider refuses (HANDOVER §8 decision 11).
         [:label.settings-label {:for "voice-add"} "Add a voice"]
         [:select#voice-add.settings-input
          {:value ""
           :on-change #(let [v (.. % -target -value)]
                         (when-not (str/blank? v)
                           (say! {:kind "set-voice-rotation"
                                  :voice-ids (conj (picked-now) v)})))}
          [:option {:value "" :disabled true} "Add a voice…"]
          (voice-options)]
         (when (seq picked)
           [:ol.voice-rotation
            (doall
             (for [vid picked]
               ^{:key vid}
               [:li.voice-rotation-item
                [:span.voice-rotation-name (speech/voice-name vid)]
                [:button.btn.btn-ghost.voice-rotation-remove
                 {:on-click #(say! {:kind "set-voice-rotation"
                                    :voice-ids (vec (remove #{vid} (picked-now)))})}
                 "Remove"]]))])
         (when @note
           [:p.voice-rotation-note @note])
         [:label.settings-label {:for "elevenlabs-key"} "ElevenLabs API key"]
         [:input#elevenlabs-key.settings-input
          {:type "password" :placeholder "xi-api-key (optional)"
           :value @k :on-change #(reset! k (.. % -target -value))}]
         [:div.settings-actions
          [:button.btn.btn-primary
           {:on-click (fn []
                        (store/save-elevenlabs-key! @k)
                        (if (str/blank? @k)
                          (reset! state/elevenlabs-voices nil)
                          (speech/fetch-voices! @k))
                        (reset! state/settings-open? false))}
           "Save"]
          [:button.btn {:on-click #(reset! state/settings-open? false)} "Close"]]
         [:p.settings-note
          "Without a key, the browser's built-in speech synthesis is used."]]))))

;; -- History & stats pages (slice 10 ticket 03: #/history, #/stats) ----------

(defn- history-page []
  (let [{:keys [entries]} (views/listening-history @state/app-state)]
    [:section.history
     ;; the back link needs a block of its own — .back-link is inline-block
     ;; (the slice-05 source page follows it with a block header), and the
     ;; section label is a boxed inline-block that would otherwise sit
     ;; alongside it on the same line
     [:div.page-back [:a.back-link {:href "#/"} "‹ Home"]]
     [:h2.section-label "History"]
     (if (empty? entries)
       [:p.empty-state "Nothing has been played yet."]
       [:ul.history-list
        (for [{:keys [item-id title kind finished]} entries]
          ^{:key item-id}
          [:li.history-item {:data-finished (str (boolean finished))}
           [:span.item-title title]
           [:span.item-meta
            [:span.item-kind (views/kind-label kind)]
            (when finished
              [:span.history-finished "finished"])]])])]))

(defn- stats-page []
  (let [{:keys [total-listened items-finished time-saved-by-speed]}
        (views/listening-stats @state/app-state)]
    [:section.stats
     [:div.page-back [:a.back-link {:href "#/"} "‹ Home"]]
     [:h2.section-label "Stats"]
     [:dl.stats-list
      [:div.stat
       [:dt.stat-label "Time listened"]
       [:dd.stat-value.stat-listened (views/format-minutes total-listened)]]
      [:div.stat
       [:dt.stat-label "Items finished"]
       [:dd.stat-value.stat-finished (str items-finished)]]
      [:div.stat
       [:dt.stat-label "Saved by speed"]
       [:dd.stat-value.stat-saved (views/format-minutes time-saved-by-speed)]]]]))

(defn header []
  [:header.app-header
   [:h1.app-title "Printcast"]
   [:nav.app-nav
    [:a.nav-link {:href "#/history"} "History"]
    [:a.nav-link {:href "#/stats"} "Stats"]
    [:button.btn.btn-ghost.settings-toggle
     {:aria-label "Settings" :on-click #(swap! state/settings-open? not)}
     "⚙"]]])

(defn- home []
  ;; One scrolling page, five sections. Latest sits directly under Following
  ;; (slice 16): the reader meets the shows they follow, then what those shows
  ;; have sent and nothing has claimed, then what is lined up, then what they
  ;; saved themselves. "Adding" is transient and appears only mid-capture.
  [:<>
   [capture-box]
   [sources-section]
   [latest-section]
   [active-ingests-section]
   [queue-section]
   [library-section]])

(defn app []
  (let [route (str @state/route)
        source-id (second (re-find #"^#/source/(.+)$" route))]
    [:div.app-container
     [header]
     (when @state/settings-open? [settings-panel])
     (cond
       source-id [source-page source-id]
       (= "#/history" route) [history-page]
       (= "#/stats" route) [stats-page]
       :else [home])
     [player-bar]]))

(println "[ui] loaded")
