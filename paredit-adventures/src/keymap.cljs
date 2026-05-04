;;; keymap.cljs — Keyboard layout calibration and mapping
;;; On first run, asks user to press 4 key combos to detect their layout.
;;; Stores the detected codes in localStorage for future sessions.

(ns keymap)

(def storage-key "paredit-adventures-keymap")

(def calibration-steps
  [{:id :slurp-fwd  :label "C-)"  :desc "Ctrl + )  (forward slurp)"
    :modifiers {:ctrl true}}
   {:id :slurp-bwd  :label "C-("  :desc "Ctrl + (  (backward slurp)"
    :modifiers {:ctrl true}}
   {:id :barf-fwd   :label "C-}"  :desc "Ctrl + }  (forward barf)"
    :modifiers {:ctrl true}}
   {:id :barf-bwd   :label "C-{"  :desc "Ctrl + {  (backward barf)"
    :modifiers {:ctrl true}}])

(defn save-keymap! [keymap]
  (.setItem js/localStorage storage-key (js/JSON.stringify (clj->js keymap))))

(defn load-keymap []
  (when-let [stored (.getItem js/localStorage storage-key)]
    (try
      (let [parsed (js->clj (js/JSON.parse stored) :keywordize-keys true)]
        ;; Convert string keys back to keywords
        (into {} (map (fn [[k v]] [(keyword k) v]) parsed)))
      (catch :default _ nil))))

(defn clear-keymap! []
  (.removeItem js/localStorage storage-key))

(defn needs-calibration? []
  (nil? (load-keymap)))

(defn make-default-keymap
  "Default US QWERTY keymap."
  []
  {:slurp-fwd  {:code "Digit0" :key ")" :shift true}
   :slurp-bwd  {:code "Digit9" :key "(" :shift true}
   :barf-fwd   {:code "BracketRight" :key "}" :shift true}
   :barf-bwd   {:code "BracketLeft" :key "{" :shift true}})

(defn match-key
  "Check if a keyboard event matches a calibrated key binding.
   Tries e.key first (layout-correct), then e.code+shift as fallback."
  [e binding]
  (or (= (.-key e) (:key binding))
      (and (= (.-code e) (:code binding))
           (= (.-shiftKey e) (:shift binding)))))
