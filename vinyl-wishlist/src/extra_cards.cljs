(ns extra-cards)

(def instagram-images
  ["https://scontent-fra5-2.cdninstagram.com/v/t51.29350-15/434879683_1467567657195765_4048382398191941006_n.webp?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-fra5-2.cdninstagram.com&_nc_cat=109&_nc_oc=Q6cZ2QEvILg_WZUDYlE4vla1vsChhoaTdEIxwcvr41HX5wCRoISNizRF3mQeIpuw0AAze-o&_nc_ohc=BA-WbgNIgrcQ7kNvwERSYP5&_nc_gid=T1dIPSD0tQ3hJAZQUBOzsw&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzMzNTg1NjY2MTgyNTMwOTk4Mg%3D%3D.3-ccb7-5&oh=00_AfqZlx7OTRzOFq9jlQVn1Pc35xKosWN3mm5amLBNjIY7bQ&oe=695F2482&_nc_sid=10d13b"
   "https://scontent-fra3-2.cdninstagram.com/v/t51.29350-15/434808303_956270792350648_4113344328161914711_n.webp?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjg4NngxMDgwLnNkci5mMjkzNTAuZGVmYXVsdF9pbWFnZS5jMiJ9&_nc_ht=scontent-fra3-2.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2QEG2dVGaGd8usuiwgMggf_FDGozjhWN4YfObiAjQbT96PZG2_eVszHOg0iZAiM7meI&_nc_ohc=KqgPWQeNKpIQ7kNvwEMt7Qh&_nc_gid=Vsc7qN7Dx25K-U8heEG6Lw&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzMzNjQ3Nzc0OTMzMzQ1MTY2OA%3D%3D.3-ccb7-5&oh=00_AfprJHFRG-7-Uldsizqq96xJZAr565aO_40Hhnxve_Jkhg&oe=695F34A7&_nc_sid=10d13b"
   "https://scontent-fra3-1.cdninstagram.com/v/t51.29350-15/434849630_1143681873649477_4629964707418700484_n.webp?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjExMjN4MTQwNC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-fra3-1.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2QEMzq5D6aDnw1f8PwB9sSVoaSjRseyNDpfSxL8uGKQ9mHg7YQopIc1D9c57_Z00KKk&_nc_ohc=rrDS4bC3-BUQ7kNvwHVT448&_nc_gid=WM-6VQqAaGLkt1Z_ucuPOQ&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzMzNzE2NzgwNjk5ODQxMzg1MQ%3D%3D.3-ccb7-5&oh=00_Afqcw1gO1yVQWV8SkrV_0q7t4SnRStITrqUG-4PRi4LO8w&oe=695F1E66&_nc_sid=10d13b"
   "https://scontent-fra3-2.cdninstagram.com/v/t51.29350-15/436565905_793285518909424_4830893629562795495_n.webp?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjc2M3g5NTMuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlLmMyIn0&_nc_ht=scontent-fra3-2.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2QEYRDZ_bQ0G4t7hGb-4jXffPYAbFERkMkZJinEMwapfiw9gd9VcoatHAzlUGwramCQ&_nc_ohc=rwQzJgXG6sYQ7kNvwHg0iV8&_nc_gid=se20buCvYM-hkrIMFabYgg&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzM0MTkzOTI0MjEwNjcwOTk1OQ%3D%3D.3-ccb7-5&oh=00_Afp4DPPBIfffasCfXwhtj2HNU9yazbfMO1WB7IIay-dpzg&oe=695F2D3E&_nc_sid=10d13b"
   "https://scontent-fra3-1.cdninstagram.com/v/t51.29350-15/436990667_1572080526922945_8416233202956480684_n.webp?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjE0MDR4MTQwNC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-fra3-1.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2QGQ-emzO1A7cDSXTnnnb1wR1dVZfmLpzKzSLwA-MfE1ujcFlffgNiTE_FMwC6b2NDA&_nc_ohc=If-G1OZ9pgAQ7kNvwGBwmV2&_nc_gid=wl4M-NFlfDxtvFAeTwxCJA&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzM0MjUzMTQ3MDIzOTg1OTUwMQ%3D%3D.3-ccb7-5&oh=00_AfrCBYdHblD7ta7O7KqqrJqo68ep2dZJGnCawaPaXhrKug&oe=695F03BA&_nc_sid=10d13b"
   "https://scontent-fra5-1.cdninstagram.com/v/t51.29350-15/437209908_1160174948306474_6033820563329050994_n.webp?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEyMDl4MTQwNC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-fra5-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QEypX8_gHJcz7yy_WeT9h9eJV365CF8wgqVhAQ3GFG1m4A-JWIADMkQPRzAvNP2tHY&_nc_ohc=PnMERU_9dcEQ7kNvwH9A2C5&_nc_gid=of7jjaPK9CJSa_ZnwJixNQ&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzM0NTk2MjA0OTY0NDUzODIzMA%3D%3D.3-ccb7-5&oh=00_AfrPnHT5eE8Oq2tWQbwRQS48w1HxLclcGas2NXOU9zdA5g&oe=695F352E&_nc_sid=10d13b"])

(def data
  [{:id "bitcoin-butterfly"
    :title "Bitcoin Butterfly"
    :artist "Sami Kallinen"
    :album "Generative Art"
    :release_description "September 21, 2021"
    :image_url "visuals/btc-butterfly.jpg"
    :spotify_popularity 50
    :discogs_rating 5.0
    :price_median 100
    :mu 25.0 :sigma 8.333
    :type :article
    :body "This is a function written in Clojure and quil. For 12 hours on Monday 20 September bitcoin market fluctuations controlled its evolution in real-time. This charcoal drawing-like image (a snapshot) was then fed into a GAN, which transforms it into a butterfly engulfed in watercolour flames."}
   
   {:id "fascinating-gan"
    :title "A Fascinating GAN"
    :artist "Sami Kallinen"
    :album "AI Experiments"
    :release_description "September 17, 2021"
    :image_url "https://placehold.co/600x400/1a1a1a/ffffff?text=GPT-3" ;; No image in origin, placeholder
    :spotify_popularity 45
    :discogs_rating 4.0
    :price_median 0
    :mu 25.0 :sigma 8.333
    :type :article
    :body "Have you heard of Twitter, a fascinating generative adversarial network? Simply type a text into the prompt, and it will begin to generate content that is mostly realistic. Surprisingly logical. It is, however, not yet very stable. It has a tendency to devolve into racism and other forms of bigotry."}

   {:id "cognitive-dependency"
    :title "Cognitive Dependancy Graph"
    :artist "Sami Kallinen"
    :album "Thoughts"
    :release_description "August 5, 2021"
    :image_url "https://placehold.co/600x400/1a1a1a/ffffff?text=Cognitive+Graph"
    :spotify_popularity 30
    :discogs_rating 4.5
    :price_median 0
    :mu 25.0 :sigma 8.333
    :type :article
    :body "\"Cognitive dependency graph,\" mm, I'm not sure if I coined this meme, but it appears to be a useful mental model for thinking about all the parts you need to know and absorb before you can comprehend something. Especially when it comes to considering the complexity you bring when writing libraries, for example."}

   {:id "ironbeach"
    :title "Ironbeach"
    :artist "Sami Kallinen"
    :album "Photography"
    :release_description "July 3, 2021"
    :image_url "visuals/PSX_20210704_013014.jpg"
    :spotify_popularity 40
    :discogs_rating 4.2
    :price_median 0
    :mu 25.0 :sigma 8.333
    :type :article
    :body "Ironbeach, Jussarö. Photo: sakalli"}

   {:id "current-view"
    :title "Current view"
    :artist "Sami Kallinen"
    :album "Photography"
    :release_description "May 2, 2021"
    :image_url "visuals/current-view.jpg"
    :spotify_popularity 35
    :discogs_rating 4.1
    :price_median 0
    :mu 25.0 :sigma 8.333
    :type :article
    :body "Photo: sakalli"}

   {:id "mind-portal"
    :title "Mind Portal"
    :artist "Sami Kallinen"
    :album "Memories"
    :release_description "March 21, 2021"
    :image_url "visuals/mindportal.jpeg"
    :spotify_popularity 38
    :discogs_rating 4.3
    :price_median 0
    :mu 25.0 :sigma 8.333
    :type :article
    :body "Stumbled on this note in one of my notebooks from 20-25 years ago."}

   {:id "thrill-reading-assembly"
    :title "Thrill of Reading Assembly"
    :artist "Sami Kallinen"
    :album "Programming"
    :release_description "January 27, 2021"
    :image_url "https://placehold.co/600x400/1a1a1a/ffffff?text=Assembly"
    :spotify_popularity 32
    :discogs_rating 4.6
    :price_median 0
    :mu 25.0 :sigma 8.333
    :type :article
    :body "Go Knuth! \"/.../we can recognize some of [programs] as genuine works of art. I can still remember the great thrill it was for me to read the listing of Stan Poley's SOAP II assembly program in 1958;\" <3"}

   {:id "scifi-selfie"
    :title "Sci-fi Selfie"
    :artist "Sami Kallinen"
    :album "Photography"
    :release_description "December 26, 2020"
    :image_url "visuals/self-portrait-blade-runner.jpg"
    :spotify_popularity 55
    :discogs_rating 4.4
    :price_median 0
    :mu 25.0 :sigma 8.333
    :type :article
    :body "Photo: sakalli"}
    
   {:id "youtube-vid"
    :title "Video: New One"
    :artist "Sami Kallinen"
    :album "Video"
    :release_description "Video Content"
    :image_url "https://img.youtube.com/vi/ckQllKUw3b4/hqdefault.jpg"
    :spotify_popularity 60
    :discogs_rating 4.5
    :price_median 0
    :mu 25.0 :sigma 8.333
    :type :video
    :video_url "https://www.youtube.com/embed/ckQllKUw3b4"}

   {:id "drawings-carousel"
    :title "Drawings"
    :artist "Sami Kallinen"
    :album "Sketches"
    :release_description "Instagram Collection"
    :image_url (first instagram-images) ;; Use first image as cover
    :spotify_popularity 70
    :discogs_rating 4.8
    :price_median 0
    :mu 25.0 :sigma 8.333
    :type :carousel
    :images instagram-images}])
