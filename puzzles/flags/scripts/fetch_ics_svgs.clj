#!/usr/bin/env bb
(ns scripts.fetch-ics-svgs
  (:require
    [babashka.curl :as curl]
    [babashka.fs   :as fs]
    [clojure.java.io :as io]
    [clojure.string :as str]))

(def base "https://commons.wikimedia.org/wiki/Special:FilePath")

(def letters
  ["Alfa" "Bravo" "Charlie" "Delta" "Echo" "Foxtrot" "Golf" "Hotel" "India" "Juliett"
   "Kilo" "Lima" "Mike" "November" "Oscar" "Papa" "Quebec" "Romeo" "Sierra" "Tango"
   "Uniform" "Victor" "Whiskey" "X-ray" "Yankee" "Zulu"])

(def numerals
  ["Zero" "One" "Two" "Three" "Four" "Five" "Six" "Seven" "Eight" "Niner"])

(def specials
  ["Answer" "Repeat One" "Repeat Two" "Repeat Three"])

(def ua {"User-Agent" "bb-fetch-ics-svgs/1.0 (+https://example.local)"})

(defn ->title [stem name]
  (format "%s_%s.svg" stem (-> name (str/replace " " "_"))))

(defn ->outname [prefix name]
  (-> (str prefix "_" name ".svg")
      (str/replace " " "_")
      (str/lower-case)))

(defn GET-bytes!
  "GET body as bytes, following redirects."
  [url]
  (let [{:keys [status body]}
        (curl/get url {:headers ua
                       :raw-args ["-L"]
                       :as :bytes})]
    (when (or (nil? status) (>= status 400))
      (throw (ex-info (str "HTTP " status " for " url) {:status status})))
    body))

(defn download!
  [out-dir commons-title out-name]
  (let [url (str base "/" commons-title "?download")
        out-file (fs/file out-dir out-name)]
    (println "→" out-name)
    ;; Ensure parent dirs exist even if out-dir is a nested path
    (fs/create-dirs (fs/parent out-file))
    (with-open [os (io/output-stream out-file)]
      (.write os ^bytes (GET-bytes! url)))))

(defn -main [& [out-dir]]
  (let [out (or out-dir "assets/flags")]
    ;; Letters (A–Z)
    (doseq [nm letters]
      (download! out (->title "ICS" nm) (->outname "ics" nm)))
    ;; Numeral pennants (0–9)
    (doseq [nm numerals]
      (download! out (->title "ICS_Pennant" nm) (->outname "ics_pennant" (str/lower-case nm))))
    ;; Answer + Repeaters
    (doseq [nm specials]
      (download! out (->title "ICS" nm) (->outname "ics" (str/lower-case nm))))
    (println "Done. Saved SVGs in:" (str out))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
