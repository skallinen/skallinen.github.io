(ns lotto.core
  (:require [nav :refer [navbar]] [reagent.core :as r]
            [reagent.dom :as rdom]
            [clojure.string :as str]))

;; --- State ---
(defonce app-state (r/atom {:btc-usd 96000
                            :status :idle
                            :generated-keys nil
                            :is-dark (= "dark" (.getItem js/localStorage "theme"))
                            :hover-gif nil}))

(def gifs
  ["https://media3.giphy.com/media/GhU3C9uMON5X8OLx2G/giphy.gif?cid=ecf05e47nlyjmfa9s1ljn8hxw418dmq4jik7uoku8575fexu&rid=giphy.gif&ct=g"
   "https://media2.giphy.com/media/1AHZBEKJx5Mf57NQqb/giphy.gif?cid=ecf05e47j9pmfgook4yf3cdztme3eake5fxo3tpf8x60cdb7&rid=giphy.gif&ct=g"
   "https://media0.giphy.com/media/30VBSGB7QW1RJpNcHO/giphy.gif?cid=ecf05e47j9pmfgook4yf3cdztme3eake5fxo3tpf8x60cdb7&rid=giphy.gif&ct=g"
   "https://media0.giphy.com/media/287U9qQH5vrKg7KYSH/giphy.gif?cid=ecf05e471h2jyvklk295f15umw86g1atvvymxeztii830oo4&rid=giphy.gif&ct=g"
   "https://media0.giphy.com/media/CayH3P0wRYbjPudd3J/giphy.gif?cid=ecf05e471h2jyvklk295f15umw86g1atvvymxeztii830oo4&rid=giphy.gif&ct=g"
   "https://media3.giphy.com/media/uqPDIEPMODKne/giphy.gif?cid=ecf05e47t9woh5p3i50y2r3z5o07xf6iepzfodluqeamybuk&rid=giphy.gif&ct=g"])

(def target-address "1Gfc8pG3KWKWJZRqwUnosV77QHQWzeoFqz")
(def b58-chars "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")

;; --- Helpers ---
(defn format-currency [amount]
  (if amount
    (let [billions (/ amount 1000000000)
          millions (/ amount 1000000)]
      (if (>= billions 1)
        (str "$" (.toFixed billions 2) " Billion")
        (str "$" (.toFixed millions 0) " Million")))
    ".1 Billion"))


;; Apply theme immediately
(when (:is-dark @app-state) (-> js/document .-body .-classList (.add "dark-mode")))

(defn toggle-dark! []
  (let [new-val (not (:is-dark @app-state))
        body (.-body js/document)]
    (swap! app-state assoc :is-dark new-val)
    (.setItem js/localStorage "theme" (if new-val "dark" "light"))
    (if new-val
      (.add (.-classList body) "dark-mode")
      (.remove (.-classList body) "dark-mode"))))

;; --- Logic ---
(defn random-b58 [len]
  (apply str (repeatedly len #(rand-nth b58-chars))))

(defn generate-btc-keys []
  {:wif (str "5" (random-b58 50)) 
   :address (str "1" (random-b58 33))})

(defn check-luck! []
  (swap! app-state assoc :status :checking)
  (js/setTimeout
   (fn []
     (swap! app-state assoc 
            :status :result 
            :generated-keys (generate-btc-keys)
            :hover-gif nil))
   1500))

;; --- API Strategy ---
(def price-sources
  [{:url "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    :extractor (fn [data] (-> data .-bitcoin .-usd))}
   {:url "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
    :extractor (fn [data] (js/parseFloat (.-price data)))}
   {:url "https://api.coindesk.com/v1/bpi/currentprice.json"
    :extractor (fn [data] (-> data .-bpi .-USD .-rate_float))}])

(defn try-fetch-price [sources]
  (when-let [source (first sources)]
    (-> (js/fetch (:url source))
        (.then #(.json %))
        (.then (fn [data]
                 (let [price ((:extractor source) data)]
                   (when (and price (> price 0))
                     (swap! app-state assoc :btc-usd price)))))
        (.catch (fn [err]
                  (js/console.log "Fetch failed:" (:url source) err)
                  (try-fetch-price (rest sources)))))))

(defn start-price-ticker! []
  (try-fetch-price price-sources)
  (js/setInterval #(try-fetch-price price-sources) 60000))

(defn set-random-gif []
  (swap! app-state assoc :hover-gif (rand-nth gifs)))

(defn clear-gif []
  (swap! app-state assoc :hover-gif nil))

;; --- Components ---


(defn main-view []
  (let [{:keys [btc-usd status generated-keys hover-gif]} @app-state
        wallet-btc 31000
        total-value (when btc-usd (* btc-usd wallet-btc))
        display-value (format-currency total-value)]
    
    [:div.app-container
     [navbar]
     
     [:div.container {:style {:text-align "center" :padding "60px 20px" :max-width "800px" :margin "0 auto"}}
      [:h4.label {:style {:letter-spacing "2px" :text-transform "uppercase" :font-size "14px" :margin-bottom "16px"}} "Irrational Hope"]
      [:h1 {:style {:font-size "48px" :margin-bottom "24px" :line-height "1.1"}} "Is Today Your Lucky Day?"]
      
      [:h2 {:style {:font-size "32px" :font-weight "400" :margin-bottom "40px"}}
       (str display-value " Lottery (Free)!")]
      
      [:p {:style {:font-size "18px" :line-height "1.6" :margin-bottom "40px" :color "var(--color-text)"}}
       "Wallet 967 has been inactive since July 25th, 2010, and holds a balance of "
       [:strong "31,000 BTC"]
       ", currently worth more than "
       [:strong display-value]
       ". It's likely that the owner of this early wallet has lost the access information, like many others."]
      
      [:p {:style {:font-size "18px" :line-height "1.6" :margin-bottom "40px"}}
       "By clicking the button below, we'll generate a random key for the account. The chances of it being the right one are incredibly slim, at one in 2^256, but who knows, maybe today's your lucky day!"]

      ;; Button Area
      (case status
        :idle
        [:div {:style {:position "relative" :display "inline-block" :width "100%" :max-width "400px"}}
         (when hover-gif
           [:img {:src hover-gif 
                  :style {:position "absolute"
                          :top "-50%" :left "-20%" :width "140%" :height "200%" 
                          :object-fit "cover" 
                          :border-radius "var(--radius-4)" 
                          :opacity 1
                          :z-index 1
                          :pointer-events "none"
                          :max-width "none"
                          }}])
         [:button 
          {:on-click check-luck!
           :on-mouse-enter set-random-gif
           :on-mouse-leave clear-gif
           :style {:font-size "20px" :padding "16px 32px" :width "100%" 
                   :background (if hover-gif "transparent" "var(--color-text)") ;; CHANGED
                   :color (if hover-gif "white" "var(--color-bg)") ;; CHANGED
                   :text-shadow (if hover-gif "0 2px 4px rgba(0,0,0,0.8)" "none")
                   :border (if hover-gif "1px solid rgba(255,255,255,0.2)" "none")
                   :border-radius "var(--radius-4)"
                   :cursor "pointer" :transition "all 0.1s"
                   :position "relative" :z-index 20
                   }}
          "Are you feeling lucky?"]]

        :checking
        [:div {:style {:font-size "24px" :color "var(--color-accent)" :animation "pulse 1s infinite"}}
         "Generating Private Key & Verifying Balance..."]

        :result
        (let [{:keys [address wif]} generated-keys
              won? (= address target-address)]
          [:div {:style {:animation "fadeIn 0.5s"}}
           [:p {:style {:font-size "14px" :color "var(--color-accent)" :margin-bottom "8px"}} "GENERATED PRIVATE KEY (WIF)"]
           [:div {:style {:font-family "monospace" :font-size "16px" :word-break "break-all" :margin-bottom "24px" :padding "16px" :background "var(--color-surface)" :border "1px solid var(--color-border)" :border-radius "var(--radius-2)"}}
            wif]
           
           [:p {:style {:font-size "14px" :color "var(--color-accent)" :margin-bottom "8px"}} "YOUR DERIVED ADDRESS"]
           [:div {:style {:font-family "monospace" :font-size "20px" :word-break "break-all" :margin-bottom "24px" :padding "16px" :background "var(--color-surface)" :border "1px solid var(--color-border)" :border-radius "var(--radius-2)"}}
            address]

           (if won?
             [:div
              [:h2 {:style {:color "var(--color-success)" :font-size "32px"}} "OMG IT IS CORRECT!"]
              [:p "Now copy that key and keep it safe if your life depends on it. good luck."]]
             [:div
              [:div {:style {:margin-bottom "32px"}}
               [:p {:style {:font-size "14px" :color "var(--color-accent)" :margin-bottom "8px"}} "TARGET ADDRESS (NEEDED)"]
               [:div {:style {:font-family "monospace" :font-size "16px" :color "#666" :word-break "break-all"}}
                target-address]]
              
              [:h3 {:style {:margin-bottom "16px" :font-weight "600"}} "We are sorry, no luck today."]
              [:p {:style {:margin-bottom "24px"}} 
               "The address derived from your random key does not match Wallet 967."]
              [:button 
               {:on-click #(swap! app-state assoc :status :idle :generated-keys nil :hover-gif nil)
                :style {:background "var(--color-surface)" :border "1px solid var(--color-border)" :padding "8px 16px" :border-radius "var(--radius-2)" :cursor "pointer"}}
               "Try again tomorrow"]])
           ]))
      ]]))

;; --- Mount ---
(defn ^:export init! []
  (start-price-ticker!)
  (rdom/render [main-view] (.getElementById js/document "app")))

(init!)
