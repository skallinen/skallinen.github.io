(progn
  (setq inhibit-startup-message t)
  (scroll-bar-mode -1)        ; Disable visible scrollbar
  (tool-bar-mode -1)          ; Disable the toolbar
  (tooltip-mode -1)           ; Disable tooltips
  (set-fringe-mode 10)        ; Give some breathing room
  (menu-bar-mode -1)            ; Disable the menu bar

  
  (setq custom-file "~/.custom.el")

  (require 'package)
  (add-to-list 'package-archives
               '("melpa" . "http://melpa.org/packages/") t)
  (package-initialize)
  (package-refresh-contents)

  (defvar my-packages '(
                        clojure-mode
                        cider))

  (dolist (p my-packages)
    (unless (package-installed-p p)
      (package-install p)))

  ;; theme 
  (load-theme 'tango-dark nil))

