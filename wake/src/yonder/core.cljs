(ns yonder.core
  (:require [clojure.string :as str]
            [reagent.core :as r]
            [reagent.dom :as rdom]
            [promesa.core :as p]))

(defn slugify [s]
  (-> s str/lower-case (str/replace #"\s+" "-")))

;; Global map state
(defonce *map-state (r/atom {:map nil
                             :layers {}
                             :layer-control nil
                             :tracks {} ; Track data storage
                             :track-layers {} ; Track line layers 
                             :track-points {} ; Track point markers
                             :track-start-end {}
                             :track-arrows {} ; Direction chevrons for the overview
                             :track-visible? {}})) ; Per-track visibility flags

;; Initialize Leaflet map
(defn init-map! []
  (when-let [existing-map (:map @*map-state)]
    (try
      (.remove existing-map)
      (js/console.log "🗑️ Removed existing map")
      (catch js/Error e
        (js/console.log "Note: Could not remove existing map:" (.-message e)))))

  (let [leaflet-map (js/L.map "map"
                              #js {:center #js [57.6348 18.2941]
                                   :zoom 6
                                   :zoomControl true})]
    (swap! *map-state assoc :map leaflet-map)
    (js/console.log "✅ Yonder map initialized!")
    leaflet-map))

;; Create base layers
(defn create-base-layers! []
  (let [osm-layer (js/L.tileLayer "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                  #js {:attribution "&copy; OpenStreetMap contributors"
                                       :maxZoom 19
                                       :subdomains #js ["a" "b" "c"]})

        cartodb-layer (js/L.tileLayer "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                      #js {:attribution "&copy; OpenStreetMap contributors &copy; CARTO"
                                           :maxZoom 19
                                           :subdomains "abcd"})

        cartodb-dark (js/L.tileLayer "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                     #js {:attribution "&copy; OpenStreetMap contributors &copy; CARTO"
                                          :maxZoom 19
                                          :subdomains "abcd"})

        esri-satellite (js/L.tileLayer "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                       #js {:attribution "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                                            :maxZoom 18})

        openstreetmap-fr (js/L.tileLayer "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                                         #js {:attribution "&copy; OpenStreetMap France | &copy; OpenStreetMap contributors"
                                              :maxZoom 20
                                              :subdomains "abc"})]

    ;; Add default layer (CartoDB Light) to map
    (when-let [current-map (:map @*map-state)]
      (.addTo cartodb-layer current-map)
      (js/console.log "✅ Added CartoDB Light base layer"))

    {:osm osm-layer
     :cartodb cartodb-layer
     :cartodb-dark cartodb-dark
     :esri-satellite esri-satellite
     :openstreetmap-fr openstreetmap-fr}))

(defn create-overlay-layers!
  "Create OpenSeaMap overlay layers"
  []
  (let [seamark-layer (js/L.tileLayer "https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
                                      #js {:attribution "&copy; OpenSeaMap contributors - Additional Seamarks"
                                           :maxZoom 18
                                           :opacity 0.9})]

    ;; Add default OpenSeaMap seamark layer to map
    (when-let [current-map (:map @*map-state)]
      (.addTo seamark-layer current-map)
      (js/console.log "✅ Added OpenSeaMap seamark overlay layer"))

    {:seamark seamark-layer}))

 ;; Track management functions
(defn parse-csv
  "Parse CSV text into a vector of maps with header keys"
  [csv-text]
  (let [lines (-> csv-text .trim (.split #"\r?\n"))
        headers (-> (first lines) (.split ",") (->> (map #(.trim %))))
        data-lines (rest lines)]
    (mapv (fn [line]
            (let [values (->> (.split line ",") (map #(.trim %)))]
              (->> (map vector headers values)
                   (into {}))))
          data-lines)))

(defn format-time
  "Format ISO time string for display"
  [time-string]
  (let [date (js/Date. time-string)]
    (.toLocaleString date "en-US"
                     #js {:year "numeric" :month "2-digit" :day "2-digit"
                          :hour "2-digit" :minute "2-digit"
                          :timeZone "UTC" :timeZoneName "short"})))

(defn calculate-sample-interval
  "Calculate time difference between track points"
  [current-time previous-time]
  (if-not previous-time
    "Start of track"
    (let [current (js/Date. current-time)
          previous (js/Date. previous-time)
          diff-ms (- (.getTime current) (.getTime previous))]
      (if (< diff-ms 0)
        "Invalid time"
        (let [hours (js/Math.floor (/ diff-ms (* 1000 60 60)))
              minutes (js/Math.floor (/ (mod diff-ms (* 1000 60 60)) (* 1000 60)))]
          (if (> hours 0)
            (str hours "h " minutes "m")
            (str minutes "m")))))))

(defn format-speed
  "Decimal points"
  [speed]
  (.toFixed speed 2))

(defn format-leg-time
  "Short human date-time for the hover tooltip, in the viewer's timezone"
  [iso]
  (.toLocaleString (js/Date. iso) "en-GB"
                   #js {:day "numeric" :month "short"
                        :hour "2-digit" :minute "2-digit"}))

(defn haversine-nm
  "Great-circle distance between two coordinates in nautical miles"
  [lat1 lon1 lat2 lon2]
  (let [rad #(* % (/ js/Math.PI 180))
        dlat (rad (- lat2 lat1))
        dlon (rad (- lon2 lon1))
        a (+ (* (js/Math.sin (/ dlat 2)) (js/Math.sin (/ dlat 2)))
             (* (js/Math.cos (rad lat1)) (js/Math.cos (rad lat2))
                (js/Math.sin (/ dlon 2)) (js/Math.sin (/ dlon 2))))]
    (* 3440.065 2 (js/Math.atan2 (js/Math.sqrt a) (js/Math.sqrt (- 1 a))))))

(defn track-distance-nm
  "Distance sailed along the (downsampled) track, in nautical miles"
  [track-data]
  (let [pts (keep (fn [point]
                    (let [lat (js/parseFloat (get point "lat"))
                          lon (js/parseFloat (get point "lon"))]
                      (when (and (not (js/isNaN lat)) (not (js/isNaN lon)))
                        [lat lon])))
                  track-data)]
    (reduce + 0 (map (fn [[[lat1 lon1] [lat2 lon2]]]
                       (haversine-nm lat1 lon1 lat2 lon2))
                     (partition 2 1 pts)))))

(defn track-tooltip-html
  "Leg name with departure, arrival, distance and duration from the track data"
  [track-name track-data]
  (let [dep (get (first track-data) "time")
        arr (get (last track-data) "time")
        ms (- (.getTime (js/Date. arr)) (.getTime (js/Date. dep)))
        hours (js/Math.floor (/ ms 3600000))
        mins (js/Math.round (/ (mod ms 3600000) 60000))
        nm (js/Math.round (track-distance-nm track-data))]
    (str "<strong>" track-name "</strong><br>"
         "Departed " (format-leg-time dep) "<br>"
         "Arrived " (format-leg-time arr) "<br>"
         nm " nm &middot; " hours " h " mins " min")))

(defn create-track-with-points
  "Create a track with line, individual point markers, and separate start/end markers"
  [track-data track-color track-name]
  (let [track-points (atom [])
        track-point-markers (js/L.layerGroup)
        start-end-markers (js/L.layerGroup) ; Separate group for start/end markers
        previous-time (atom nil)]

    ;; Process each track point
    (doseq [[index point] (map-indexed vector track-data)]
      (let [lat (js/parseFloat (get point "lat"))
            lon (js/parseFloat (get point "lon"))
            ele (js/parseFloat (get point "ele" "0"))
            time (get point "time")
            speed (js/parseFloat (get point "speed" "0"))
            haccuracy (js/parseFloat (get point "haccuracy" "0"))
            vaccuracy (js/parseFloat (get point "vaccuracy" "0"))]

        (when (and (not (js/isNaN lat)) (not (js/isNaN lon)))
          ;; Add to track points for polyline
          (swap! track-points conj [lat lon])

          ;; Calculate rest time
          (let [sample-interval (calculate-sample-interval time @previous-time)]

            ;; Create point marker - styled like original (dark gray)
            (let [marker (js/L.circleMarker (js/Array. lat lon)
                                            #js {:radius 4
                                                 :fillColor "#444444"
                                                 :color "#ffffff"
                                                 :weight 2
                                                 :opacity 1
                                                 :fillOpacity 0.8})
                  popup-content (str "<div class='marine-popup'>"
                                     "<h3>Track Point " (inc index) "</h3>"
                                     "<p><strong>Time:</strong> " (format-time time) "</p>"
                                     "<p><strong>Sampling interval:</strong> " sample-interval "</p>"
                                     "<p><strong>Speed:</strong> " (format-speed speed) " knots</p>"
                                     "<p><strong>Position:</strong> " (.toFixed lat 5) "°N, " (.toFixed lon 5) "°E</p>"
                                     "</div>")]
              (.bindPopup marker popup-content)
              (.addTo marker track-point-markers))

            (reset! previous-time time)))))

    ;; Create track line and line group
    (let [track-line (when (> (count @track-points) 1)
                       (js/L.polyline (clj->js @track-points)
                                      #js {:color track-color
                                           :weight 1
                                           :opacity 0.7}))
          track-line-group (js/L.layerGroup)]

      ;; Add line to group if it exists
      (when track-line
        (.addTo track-line track-line-group)

        ;; Invisible wide line on top as an easy hover target with leg info
        (let [hit-line (js/L.polyline (clj->js @track-points)
                                      #js {:color "#000000"
                                           :weight 14
                                           :opacity 0})]
          (.bindTooltip hit-line
                        (track-tooltip-html track-name track-data)
                        #js {:sticky true :className "track-tooltip"})
          (.addTo hit-line track-line-group))

        ;; Add start and end markers to separate group (zoom level 8+ visibility)
        (when (seq @track-points)
          (let [start-point (first @track-points)
                end-point (last @track-points)

                ;; Start marker - dark gray square
                start-marker (js/L.marker (clj->js start-point)
                                          #js {:icon (js/L.divIcon
                                                      #js {:className "custom-square-icon"
                                                           :html "<div class='square-marker' style='background-color: #444444;'></div>"
                                                           :iconSize #js [12 12]
                                                           :iconAnchor #js [6 6]})})

                ;; End marker - red square
                end-marker (js/L.marker (clj->js end-point)
                                        #js {:icon (js/L.divIcon
                                                    #js {:className "custom-square-icon"
                                                         :html "<div class='square-marker' style='background-color: #dc143c;'></div>"
                                                         :iconSize #js [12 12]
                                                         :iconAnchor #js [6 6]})})]

            (.bindPopup start-marker (str "<strong>Track Start</strong><br>" track-name " Beginning"))
            (.bindPopup end-marker (str "<strong>Track End</strong><br>" track-name " Finish"))
            (.addTo start-marker start-end-markers)
            (.addTo end-marker start-end-markers))))

      {:line track-line-group
       :points track-point-markers
       :start-end-markers start-end-markers ; New separate layer for start/end markers
       :track-line track-line})))

(defn calculate-track-point-density
  "Calculate how dense the track points are (average distance between consecutive points)"
  [track-data]
  (when (and track-data (> (count track-data) 10))
    (let [;; Sample first 50 points to estimate density
          sample-size (min 50 (dec (count track-data)))
          sample-points (take (inc sample-size) track-data)

          ;; Calculate distances between consecutive points
          distances (keep (fn [i]
                            (let [p1 (nth sample-points i)
                                  p2 (nth sample-points (inc i))
                                  lat1 (js/parseFloat (get p1 "lat"))
                                  lon1 (js/parseFloat (get p1 "lon"))
                                  lat2 (js/parseFloat (get p2 "lat"))
                                  lon2 (js/parseFloat (get p2 "lon"))]
                              (when (and lat1 lon1 lat2 lon2
                                         (not (js/isNaN lat1)) (not (js/isNaN lon1))
                                         (not (js/isNaN lat2)) (not (js/isNaN lon2)))
                               ;; Distance in degrees (rough approximation)
                                (js/Math.sqrt (+ (js/Math.pow (- lat2 lat1) 2)
                                                 (js/Math.pow (- lon2 lon1) 2))))))
                          (range sample-size))

          avg-distance (if (seq distances)
                         (/ (reduce + distances) (count distances))
                         0.001)]

      (js/console.log "📊 Track density analysis:"
                      "sample-points=" (count distances)
                      "avg-distance=" (.toFixed avg-distance 6))
      avg-distance)))

(defn update-track-point-visibility!
  "Update track point and start/end marker visibility based on dynamic spacing and track visibility"
  []
  (let [current-map (:map @*map-state)
        zoom (.getZoom current-map)
        track-layers (:track-layers @*map-state)
        track-points (:track-points @*map-state)
        track-start-end (:track-start-end @*map-state)
        tracks (:tracks @*map-state)]

    (doseq [[track-id points-layer] track-points]
      (let [track-layer (get track-layers track-id)
            start-end-layer (get track-start-end track-id)
            arrow-layer (get-in @*map-state [:track-arrows track-id])
            track-is-visible (.hasLayer current-map track-layer)
            track-data (get-in tracks [track-id :data])]

        (if track-is-visible
          ;; Track is visible, determine visibility for points and start/end markers
          (let [track-density (calculate-track-point-density track-data)
                ;; Higher thresholds - points appear only when zoomed in more
                min-zoom-for-points (cond
                                      (nil? track-density) 16 ; fallback - increased from 12
                                      (< track-density 0.0002) 16 ; very dense track - increased from 12
                                      (< track-density 0.001) 14 ; dense track - increased from 10
                                      (< track-density 0.005) 12 ; medium density - increased from 8
                                      (< track-density 0.02) 10 ; sparse track - increased from 6
                                      :else 8) ; very sparse - increased from 5

                should-show-points (>= zoom min-zoom-for-points)
                should-show-start-end (>= zoom 8)] ; Start/end markers appear at zoom 8+

            (js/console.log "🎯" track-id "density=" (.toFixed (or track-density 0) 6)
                            "min-zoom=" min-zoom-for-points "current-zoom=" zoom
                            "show-points=" should-show-points "show-start-end=" should-show-start-end)

            ;; Manage track points visibility
            (if should-show-points
              ;; Show points
              (when-not (.hasLayer current-map points-layer)
                (.addTo points-layer current-map)
                (js/console.log "✅ Showing track points for" track-id))
              ;; Hide points - zoom not high enough
              (when (.hasLayer current-map points-layer)
                (.removeFrom points-layer current-map)
                (js/console.log "⏸️ Hiding track points for" track-id "- need zoom >=" min-zoom-for-points)))

            ;; Manage start/end markers visibility (zoom level 8+)
            (when start-end-layer
              (if should-show-start-end
                ;; Show start/end markers at zoom 8+
                (when-not (.hasLayer current-map start-end-layer)
                  (.addTo start-end-layer current-map)
                  (js/console.log "✅ Showing start/end markers for" track-id))
                ;; Hide start/end markers below zoom 8
                (when (.hasLayer current-map start-end-layer)
                  (.removeFrom start-end-layer current-map)
                  (js/console.log "⏸️ Hiding start/end markers for" track-id "- need zoom >=8"))))

            ;; Direction chevron: overview zooms only, where start/end squares are hidden
            (when arrow-layer
              (if should-show-start-end
                (when (.hasLayer current-map arrow-layer)
                  (.removeFrom arrow-layer current-map))
                (when-not (.hasLayer current-map arrow-layer)
                  (.addTo arrow-layer current-map)))))

          ;; Track is not visible, hide all markers
          (do
            (when (.hasLayer current-map points-layer)
              (.removeFrom points-layer current-map))
            (when (and start-end-layer (.hasLayer current-map start-end-layer))
              (.removeFrom start-end-layer current-map))
            (when (and arrow-layer (.hasLayer current-map arrow-layer))
              (.removeFrom arrow-layer current-map))))))

    (js/console.log "✅ Updated dynamic track point and marker visibility for zoom level:" zoom)
    nil))

(defn list-tracks
  "List all stored tracks"
  []
  (let [tracks (:tracks @*map-state)]
    (js/console.log "=== STORED TRACKS ===")
    (doseq [[track-id track-info] tracks]
      (js/console.log "ID:" track-id "Name:" (:name track-info) "Points:" (count (:data track-info))))
    (js/console.log "Total tracks:" (count tracks))
    nil))

(defn remove-track!
  "Remove a track from map and state"
  [track-id]
  (when-let [track-layer (get-in @*map-state [:track-layers track-id])]
    (when-let [current-map (:map @*map-state)]
      (.removeFrom track-layer current-map)

      ;; Also remove point and start/end marker layers from the map
      (when-let [points-layer (get-in @*map-state [:track-points track-id])]
        (when (.hasLayer current-map points-layer)
          (.removeFrom points-layer current-map)))
      (when-let [start-end-layer (get-in @*map-state [:track-start-end track-id])]
        (when (.hasLayer current-map start-end-layer)
          (.removeFrom start-end-layer current-map)))
      (when-let [arrow-layer (get-in @*map-state [:track-arrows track-id])]
        (when (.hasLayer current-map arrow-layer)
          (.removeFrom arrow-layer current-map))))

    (swap! *map-state update :tracks dissoc track-id)
    (swap! *map-state update :track-layers dissoc track-id)
    (swap! *map-state update :track-points dissoc track-id)
    (swap! *map-state update :track-start-end dissoc track-id)
    (swap! *map-state update :track-arrows dissoc track-id)
    (swap! *map-state update :track-visible? dissoc track-id)

    (js/console.log "✅ Removed track:" track-id)
    nil))

(defn create-direction-arrow
  "Chevron marker at the track's midpoint, rotated to the local course.
  Shown only at overview zooms, where the start/end squares are hidden."
  [track-data]
  (let [pts (into []
                  (keep (fn [point]
                          (let [lat (js/parseFloat (get point "lat"))
                                lon (js/parseFloat (get point "lon"))]
                            (when (and (not (js/isNaN lat)) (not (js/isNaN lon)))
                              [lat lon]))))
                  track-data)
        n (count pts)]
    (when (> n 2)
      (let [i (quot n 2)
            [mid-lat mid-lon] (nth pts i)
            [lat1 lon1] (nth pts (dec i))
            [lat2 lon2] (nth pts (min (inc i) (dec n)))
            ;; Bearing in degrees clockwise from north, with latitude-corrected east component
            bearing (* (js/Math.atan2 (* (- lon2 lon1)
                                         (js/Math.cos (* mid-lat (/ js/Math.PI 180))))
                                      (- lat2 lat1))
                       (/ 180 js/Math.PI))]
        (js/L.marker (js/Array. mid-lat mid-lon)
                     #js {:interactive false
                          :icon (js/L.divIcon
                                 #js {:className "track-arrow-icon"
                                      :html (str "<div class=\"track-arrow\" style=\"transform: rotate("
                                                 (.toFixed bearing 0)
                                                 "deg)\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\">"
                                                 "<path d=\"M4 11 L8 4 L12 11\" fill=\"none\" stroke=\"#444444\" "
                                                 "stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"
                                                 "</svg></div>")
                                      :iconSize #js [16 16]
                                      :iconAnchor #js [8 8]})})))))

(defn load-csv-track!
  "Complete workflow to load a CSV track with points and start/end markers"
  [csv-content track-name]
  (let [track-data (parse-csv csv-content)
        track-id (str "track-" track-name)
        track-colors ["#333333"]
        color-index (count (:tracks @*map-state))
        track-color (nth track-colors (mod color-index (count track-colors)))
        track-layers (create-track-with-points track-data track-color track-name)]

    (when track-layers
      ;; Add track line to map (always visible)
      (.addTo (:line track-layers) (:map @*map-state))

      ;; Store track data and all layer types
      (swap! *map-state assoc-in [:tracks track-id] {:name track-name
                                                     :data track-data})
      (swap! *map-state assoc-in [:track-layers track-id] (:line track-layers))
      (swap! *map-state assoc-in [:track-points track-id] (:points track-layers))
      (swap! *map-state assoc-in [:track-start-end track-id] (:start-end-markers track-layers))
      (when-let [arrow (create-direction-arrow track-data)]
        (swap! *map-state assoc-in [:track-arrows track-id] arrow))
      (swap! *map-state assoc-in [:track-visible? track-id] true)

      ;; Update track point visibility based on current zoom
      (update-track-point-visibility!)

      (js/console.log "✅ Loaded complete track with points and markers:" track-name "with" (count track-data) "points")
      track-id)))

(defn load-csv-file!
  "Load a CSV file from the server using Promesa and create a track"
  [file-path track-name]
  (p/let [response (js/fetch file-path)
          csv-content (.text response)]
    (js/console.log "✅ Loaded CSV file:" file-path "(" (count (.split csv-content "\n")) "lines)")
    (load-csv-track! csv-content track-name)))

(defn zoom-to-track-bounds!
  "Fly to the bounds of a specific track by calculating bounds from track data"
  [track-id]
  (when-let [track-data (get-in @*map-state [:tracks track-id :data])]
    (let [current-map (:map @*map-state)
          ;; Calculate bounds from track data points
          lats (keep #(let [lat (js/parseFloat (get % "lat"))]
                        (when-not (js/isNaN lat) lat)) track-data)
          lons (keep #(let [lon (js/parseFloat (get % "lon"))]
                        (when-not (js/isNaN lon) lon)) track-data)]

      (when (and (seq lats) (seq lons))
        (let [min-lat (apply min lats)
              max-lat (apply max lats)
              min-lon (apply min lons)
              max-lon (apply max lons)
              ;; Create Leaflet bounds object
              bounds (js/L.latLngBounds
                      (js/Array. min-lat min-lon) ; southwest corner
                      (js/Array. max-lat max-lon))] ; northeast corner

          ;; Use flyToBounds for smooth animation
          (.flyToBounds current-map bounds #js {:padding #js [20 20]
                                                :duration 1.0})

          (js/console.log "🎯 Flying to bounds for track:" track-id
                          "bounds:" (.toString bounds)))))))

(defn fit-all-tracks!
  "Fit the map view to the combined bounds of all loaded tracks"
  []
  (let [current-map (:map @*map-state)
        all-points (for [[_ track-info] (:tracks @*map-state)
                         point (:data track-info)
                         :let [lat (js/parseFloat (get point "lat"))
                               lon (js/parseFloat (get point "lon"))]
                         :when (and (not (js/isNaN lat)) (not (js/isNaN lon)))]
                     [lat lon])]
    (when (and current-map (seq all-points))
      (.fitBounds current-map
                  (js/L.latLngBounds (clj->js all-points))
                  #js {:padding #js [30 30]})
      (js/console.log "🗺️ Fitted view to all" (count (:tracks @*map-state)) "tracks"))))

(defn load-all-tracks-from-folder!
  "Automatically load all CSV files listed in tracks/track-list.json"
  []
  (js/console.log "🔄 Loading track list from tracks/track-list.json...")

  (-> (js/fetch "tracks/track-list.json")
      (p/then (fn [response]
                (if (.-ok response)
                  (.json response)
                  (js/Promise.reject (js/Error. (str "Failed to load track-list.json: " (.-status response)))))))
      (p/then (fn [track-files-array]
                (let [track-files (js->clj track-files-array)
                      track-names (mapv #(.replace % #"\.csv$" "") track-files)]
                  (js/console.log "📋 Found tracks in track-list.json:" track-files)

                  ;; Store the original JSON order (track names) for the control
                  (swap! *map-state assoc :track-name-order track-names)

                  ;; Load each track file, collecting the promises
                  (let [load-promises (mapv (fn [filename]
                                              (let [track-name (.replace filename #"\.csv$" "")]
                                                (js/console.log "Loading track:" filename)
                                                (-> (load-csv-file! (str "tracks/" filename) track-name)
                                                    (p/catch (fn [error]
                                                               (js/console.error "Failed to load track:" filename (.-message error))
                                                               nil)))))
                                            track-files)]

                    ;; Show the overview of all tracks once all loads have settled
                    (-> (p/all load-promises)
                        (p/then (fn [_]
                                  ;; ?track=<slug> deep link zooms to that leg, else overview
                                  (let [param (.get (js/URLSearchParams. (.-search js/location)) "track")
                                        match (when param
                                                (some (fn [[track-id track-info]]
                                                        (when (= (slugify (:name track-info)) (slugify param))
                                                          track-id))
                                                      (:tracks @*map-state)))]
                                    (if match
                                      (zoom-to-track-bounds! match)
                                      (fit-all-tracks!)))
                                  (js/console.log "✅ Finished loading tracks from JSON list"))))))))

      (p/catch (fn [error]
                 (js/console.error "Failed to load track-list.json:" (.-message error))
                 ;; Fallback to hardcoded list
                 (js/console.log "Using fallback track list...")
                 (let [fallback-tracks ["25-06-13.csv" "Kattvik-Herrvik.csv"]]
                   (doseq [filename fallback-tracks]
                     (let [track-name (.replace filename #"\.csv$" "")]
                       (load-csv-file! (str "tracks/" filename) track-name))))))))

(defn load-log-index!
  "Fetch the track-name -> log-page mapping produced by the site build.
  Missing file (e.g. serving the repo root during development) is fine."
  []
  (-> (js/fetch "tracks/log-index.json")
      (p/then (fn [response] (when (.-ok response) (.json response))))
      (p/then (fn [index]
                (when index
                  (swap! *map-state assoc :log-index (js->clj index))
                  (js/console.log "📖 Loaded log index:" (count (js->clj index)) "entries"))))
      (p/catch (fn [_] nil))))

(defn track-checkbox [track-id track-info]
  [:label.layer-option.track-option
   [:input {:type "checkbox"
            :value track-id
            :checked (boolean (get-in @*map-state [:track-visible? track-id]))
            :on-change (fn [e]
                         (let [is-checked (.-checked (.-target e))
                               current-map (:map @*map-state)  ; Get fresh map reference
                               track-layer (get-in @*map-state [:track-layers track-id])  ; Get fresh layer reference
                               track-points (get-in @*map-state [:track-points track-id])
                               track-start-end (get-in @*map-state [:track-start-end track-id])]
                           (swap! *map-state assoc-in [:track-visible? track-id] is-checked)
                           (if is-checked
                             (do
                               (.addTo track-layer current-map)
                               (update-track-point-visibility!)
                               (zoom-to-track-bounds! track-id)
                               (js/console.log "✅ Showed track:" (:name track-info)))
                             (do
                               (.removeFrom track-layer current-map)
                               (.removeFrom track-points current-map)
                               (when track-start-end
                                 (.removeFrom track-start-end current-map))
                               (when-let [arrow (get-in @*map-state [:track-arrows track-id])]
                                 (when (.hasLayer current-map arrow)
                                   (.removeFrom arrow current-map)))
                               (js/console.log "✅ Hid track:" (:name track-info))))))}]
   [:span (:name track-info)]
   (when-let [log-url (get (:log-index @*map-state) (:name track-info))]
     [:a.log-link {:href log-url :title "Read the log"} "📖"])
   [:span.zoom-to-track
    {:title "Zoom to track bounds"
     :on-click (fn [e]
                 (.preventDefault e)
                 (.stopPropagation e)
                 (zoom-to-track-bounds! track-id)
                 (js/console.log "🎯 Zoomed to bounds for track:" (:name track-info)))}
    "🎯"]])

(defn tracks-list []
  (let [tracks (:tracks @*map-state)
        track-name-order (or (:track-name-order @*map-state) [])
        ordered-track-ids (keep (fn [track-name]
                                  (some (fn [[track-id track-info]]
                                          (when (= (:name track-info) track-name)
                                            track-id))
                                        tracks))
                                track-name-order)
        remaining-track-ids (remove (set ordered-track-ids) (keys tracks))
        all-track-ids (concat ordered-track-ids remaining-track-ids)]

    [:div.tracks-container
     (if (empty? tracks)
       [:div.empty-tracks-message "No tracks loaded"]
       (for [track-id all-track-ids]
         (when-let [track-info (get tracks track-id)]
           ^{:key track-id}
           [track-checkbox track-id track-info])))]))

(defn tracks-section-improved []
  [:div
   [:div.layer-section-title "Tracks"]
   [tracks-list]])

;; Layer control helper functions
(defn layer-display-name
  "Convert layer keys to human-readable names"
  [key]
  (case key
    :osm "OpenStreetMap"
    :cartodb "CartoDB Light"
    :cartodb-dark "CartoDB Dark"
    :esri-satellite "Satellite"
    :openstreetmap-fr "OSM France"
    :seamark "Seamarks & Navigation"
    (name key)))

(defn handle-base-layer-change
  "Handle base layer switching"
  [base-layers map-instance selected-key]
  (doseq [[_ layer] base-layers]
    (.removeFrom layer map-instance))
  (when-let [selected-layer (get base-layers selected-key)]
    (.addTo selected-layer map-instance)
    (js/console.log "✅ Switched to base layer:" (name selected-key))))

(defn handle-overlay-toggle
  "Handle overlay layer toggle"
  [layer map-instance layer-name checked?]
  (if checked?
    (do (.addTo layer map-instance)
        (js/console.log "✅ Added overlay:" layer-name))
    (do (.removeFrom layer map-instance)
        (js/console.log "✅ Removed overlay:" layer-name))))

(defn layer-control-component
  "Layer control component with proper local state management"
  [base-layers overlay-layers map-instance]
  (r/with-let [visible? (r/atom false)
               selected-base (r/atom :cartodb)
               active-overlays (r/atom #{:seamark})]
    [:div.custom-layer-control
     [:button.hamburger
      {:type "button"
       :on-click #(do (.preventDefault %)
                      (swap! visible? not)
                      (js/console.log "Layer control toggled!"))}
      "☰"]

     (when @visible?
       [:div.layer-content
        ;; Base layer dropdown
        [:select.base-layer-select
         {:value (name @selected-base)
          :on-change #(let [new-key (keyword (.. % -target -value))]
                        (reset! selected-base new-key)
                        (handle-base-layer-change base-layers map-instance new-key))}
         (for [[key _] base-layers]
           ^{:key key}
           [:option {:value (name key)} (layer-display-name key)])]

        ;; Overlay checkboxes
        (for [[key layer] overlay-layers]
          (let [checked? (contains? @active-overlays key)]
            ^{:key key}
            [:label.layer-option
             [:input {:type "checkbox"
                      :checked checked?
                      :on-change #(let [new-checked (.. % -target -checked)]
                                    (swap! active-overlays (if new-checked conj disj) key)
                                    (handle-overlay-toggle layer map-instance (layer-display-name key) new-checked))}]
             [:span (layer-display-name key)]]))

        ;; Tracks section
        [tracks-section-improved]])]))

;; Simplified control creation
(defn create-custom-layer-control!
  "Create a custom Leaflet control with proper component state"
  [base-layers overlay-layers]
  (let [CustomLayerControl
        (js/L.Control.extend
         #js {:options #js {:position "topright"}
              :onAdd
              (fn [map-instance]
                (let [container (.createElement js/document "div")]
                  (set! (.-className container) "leaflet-control")

                  ;; Render the proper Reagent component
                  (rdom/render
                   [layer-control-component base-layers overlay-layers map-instance]
                   container)

                  ;; Prevent map events
                  (.on (.-DomEvent js/L) container "click" js/L.DomEvent.stopPropagation)

                  container))})]

    (js/console.log "✅ Created layer control with component state")
    (new CustomLayerControl)))

;; Add layer control
(defn add-layer-control!
  "Add the custom layer control to the map"
  [base-layers overlay-layers]
  (when-let [current-map (:map @*map-state)]
    (let [control (create-custom-layer-control! base-layers overlay-layers)]
      (.addTo control current-map)
      (swap! *map-state assoc :custom-layer-control control)
      (js/console.log "✅ Added enhanced custom layer control")
      control)))

;; Initialize complete map
(defn init-complete-map!
  "Initialize map with all layers and controls, then auto-load all tracks"
  []
  (init-map!)
  (let [base-layers (create-base-layers!)
        overlay-layers (create-overlay-layers!)]
    (add-layer-control! base-layers overlay-layers)

    ;; Store layers in state for future reference
    (swap! *map-state assoc
           :base-layers base-layers
           :overlay-layers overlay-layers)

    ;; Add zoom event listener for track point visibility
    (when-let [current-map (:map @*map-state)]
      (.on current-map "zoomend" update-track-point-visibility!))

    ;; Auto-load all tracks from the tracks folder
    (js/setTimeout load-all-tracks-from-folder! 1000) ; Small delay to ensure map is ready

    ;; Log links for track rows (present when the built site is served)
    (load-log-index!)

    (js/console.log "✅ Complete map initialization finished with"
                    (count base-layers) "base layers and"
                    (count overlay-layers) "overlay layers")))

;; Header Component
(defn header []
  [:div.header
   [:h1 "In the Wake of Yonder, S/Y Jonnekin"]
   [:div.header-nav
    [:a {:href "blog.html"} "Blog"]
    [:a {:href "boat.html"} "Boat"]
    [:a {:href "wiki.html"} "Wiki"]]])

;; Map Component
(defn map-component []
  [:div.map-container
   [:div {:id "map"}]])

;; Main App Component
(defn app []
  [:div
   [header]
   [map-component]])

;; Initialize map after component mounts
(defn mount-app! []
  (rdom/render [app] (.getElementById js/document "app"))
  ;; Initialize map after a short delay to ensure DOM is ready
  (js/setTimeout init-complete-map! 300))

;; Start the app
(mount-app!)
