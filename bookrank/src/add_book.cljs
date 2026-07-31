(ns add-book
  (:require [reagent.core :as r]
            [db]))

;; =============================================
;; Add Book Form
;; =============================================

(println "[add-book] loaded")

(defn add-book-form
  "Inline form for adding a book to a club."
  [club-id on-added]
  (let [title     (r/atom "")
        author    (r/atom "")
        date-read (r/atom "")
        saving    (r/atom false)]
    (fn [club-id on-added]
      [:div.card {:style {:margin-bottom "16px"}}
       [:div.form-row
        [:div.form-group
         [:label.form-label "Title"]
         [:input.form-input {:type "text"
                             :value @title
                             :placeholder "Book title"
                             :on-change #(reset! title (-> % .-target .-value))}]]
        [:div.form-group
         [:label.form-label "Author"]
         [:input.form-input {:type "text"
                             :value @author
                             :placeholder "Author name"
                             :on-change #(reset! author (-> % .-target .-value))}]]]
       [:div.form-row
        [:div.form-group
         [:label.form-label "Date read (optional)"]
         [:input.form-input {:type "date"
                             :value @date-read
                             :on-change #(reset! date-read (-> % .-target .-value))}]]
        [:div.form-group {:style {:display "flex" :align-items "flex-end"}}
         [:button.btn.btn-primary
          {:disabled @saving
           :on-click (fn []
                       (when (and (seq @title) (seq @author))
                         (reset! saving true)
                         (db/add-book! club-id @title @author
                                       (when (seq @date-read) @date-read)
                                       (fn []
                                         (reset! title "")
                                         (reset! author "")
                                         (reset! date-read "")
                                         (reset! saving false)
                                         (when on-added (on-added))))))}
          (if @saving "Adding..." "Add Book")]]]])))
