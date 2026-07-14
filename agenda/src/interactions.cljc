(ns interactions)

;; =============================================
;; THE user-affordance registry — one source of truth.
;;
;; Every user-facing handle (role + accessible name, or form label)
;; is declared here once and read by two worlds:
;;   - the production UI (Scittle, browser) renders these as
;;     role/aria-label/text on the real elements
;;   - the e2e robot (JVM Clojure + Playwright) locates elements
;;     through the very same defs
;; Neither side hard-codes a string; rename here and the DOM, the
;; test locator — and nothing else — move together.
;; (Pattern: geokit definteraction, see e2e/README.md)
;; =============================================

;; -- top-level affordances --
(def new-item          {:role "button" :name "New item"})
(def add-person        {:role "button" :name "+ Person"})
(def confirm-person    {:role "button" :name "Add"})
(def person-name-field {:label "Person name"})
(def agenda-name-field {:label "Agenda Name"})
(def invite-code-field {:label "Invite Code"})
(def create-agenda     {:role "button" :name "Create"})
(def join-agenda       {:role "button" :name "Join"})

;; -- the editor dialog --
(def editor          {:role "dialog" :name "editor"})

;; -- the day chooser: opens when a clicked day holds several items;
;;    lists each period/mark (same accessible names as everywhere)
(def day-chooser {:role "dialog" :name "day items"})
(def type-period     {:role "button" :name "Period"})
(def type-mark       {:role "button" :name "Day mark"})
(def label-field     {:label "Label"})
(def start-field     {:label "Start"})
(def end-field       {:label "End"})
(def date-field      {:label "Date"})
(def kind-field      {:label "Kind"})
(def tentative-field {:label "tentative?"})
(def save            {:role "button" :name "Save"})
(def cancel          {:role "button" :name "Cancel"})
(def delete          {:role "button" :name "Delete"})

;; -- weeks --
(defn toggle-week
  "Chevron that expands/collapses the week with the given key."
  [week-key]
  {:role "button" :name (str "toggle week " week-key)})

(defn edit-period
  "A period's swimlane in the expanded week."
  [label]
  {:role "button" :name (str "edit period " label)})

(def week-note-field {:label "Week note"})
(def save-note       {:role "button" :name "Save note"})

;; history is hidden until today by default (R9/R10 tension resolved:
;; the archive exists but doesn't cost scroll distance); this reveals
;; one more quarter per press
(def show-previous {:role "button" :name "Show previous"})

;; -- persons --
(defn color-swatch
  "Palette swatch, addressed by its color NAME (teal, rust, ...)."
  [color-name]
  {:role "button" :name color-name})

(defn person-chip
  "A person chip (visible text = the person's name)."
  [person-name]
  {:text person-name})

(defn day-mark
  "A day mark's glyph+label group in a week row (in-cell or margin
   callout) — SVG text has no reliable text-locator semantics, so the
   group carries an accessible label."
  [label]
  {:label (str "day mark " label)})
