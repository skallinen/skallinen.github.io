(progn
  (setq inhibit-startup-message t)

  (scroll-bar-mode -1)        ; Disable visible scrollbar
  (tool-bar-mode -1)          ; Disable the toolbar
  (tooltip-mode -1)           ; Disable tooltips
  (set-fringe-mode 10)        ; Give some breathing room

  (menu-bar-mode -1)            ; Disable the menu bar
  (setq custom-file "~/.custom.el")

  ;; Install straight.el
  ;; Just pasted from https://github.com/raxod502/straight.el#getting-started
  (let ((bootstrap-file (concat user-emacs-directory "straight/repos/straight.el/bootstrap.el"))
        (bootstrap-version 3))
    (unless (file-exists-p bootstrap-file)
      (with-current-buffer
          (url-retrieve-synchronously
           "https://raw.githubusercontent.com/raxod502/straight.el/develop/install.el"
           'silent 'inhibit-cookies)
        (goto-char (point-max))
        (eval-print-last-sexp)))
    (load bootstrap-file nil 'nomessage))

  ;; You have to install use-package in order to use use-package with straight
  (straight-use-package 'use-package)

  (defun cider-interactive-notify-and-eval (code)
    (interactive)
    (message code)
    (cider-interactive-eval
     code
     (cider-interactive-eval-handler nil (point))
     nil
     nil))

  ;; clojure
  (use-package clojure-mode
    :straight t 
    :mode (("\\.edn$" . clojure-mode))
    :init (add-hook 'clojure-mode-hook 'clojure-pretty-lambda-mode)
    )
  ;; cider
  (use-package cider
    :straight t)
  
  ;; Some pretty lambdas for ya
  (use-package clojure-pretty-lambda
    :straight (clojure-pretty-lambda
               :type git :host github
               :repo "yonkornilov/clojure-pretty-lambda.el"))



  (defun cider-interactive-notify-and-eval (code)
    (interactive)
    (message code)
    (cider-interactive-eval
     code
     (cider-interactive-eval-handler nil (point))
     nil
     nil))

  (defun notespace/eval-and-realize-note-at-this-line ()
    (interactive)
    (save-buffer)
    (cider-interactive-notify-and-eval
     (concat "(notespace.api/eval-and-realize-note-at-line "
             (number-to-string (line-number-at-pos))
             ")")))

  (defun notespace/eval-and-realize-notes-from-this-line ()
    (interactive)
    (save-buffer)
    (cider-interactive-notify-and-eval
     (concat "(notespace.api/eval-and-realize-notes-from-line "
             (number-to-string (line-number-at-pos))
             ")")))

  (defun notespace/eval-and-realize-notes-from-change ()
    (interactive)
    (save-buffer)
    (cider-interactive-notify-and-eval
     (concat "(notespace.api/eval-and-realize-notes-from-change)")))

  (defun notespace/init-with-browser ()
    (interactive)
    (save-buffer)
    (cider-interactive-notify-and-eval
     (concat "(notespace.api/init-with-browser)")))

  (defun notespace/init ()
    (interactive)
    (save-buffer)
    (cider-interactive-notify-and-eval
     (concat "(notespace.api/init)")))

  (defun notespace/eval-this-notespace ()
    (interactive)
    (save-buffer)
    (cider-interactive-notify-and-eval
     "(notespace.api/eval-this-notespace)"))

  (defun notespace/eval-and-realize-this-notespace ()
    (interactive)
    (save-buffer)
    (cider-interactive-notify-and-eval
     "(notespace.api/eval-and-realize-this-notespace)"))

  (defun notespace/render-static-html ()
    (interactive)
    (cider-interactive-notify-and-eval
     "(notespace.api/render-static-html)"))

  ;; suggested emacs key binding (thanks @mchampine)
  (add-hook 'clojure-mode-hook
            (lambda ()
              (define-key clojure-mode-map (kbd "C-c n e") 'notespace/eval-this-notespace)
              (define-key clojure-mode-map (kbd "C-c n r") 'notespace/eval-and-realize-this-notespace)
              (define-key clojure-mode-map (kbd "C-c n n") 'notespace/eval-and-realize-note-at-this-line)
              (define-key clojure-mode-map (kbd "C-c n f") 'notespace/eval-and-realize-notes-from-this-line)
              (define-key clojure-mode-map (kbd "C-c n i b") 'notespace/init-with-browser)
              (define-key clojure-mode-map (kbd "C-c n i i") 'notespace/init)
              (define-key clojure-mode-map (kbd "C-c n s") 'notespace/render-static-html)
              (define-key clojure-mode-map (kbd "C-c n c") 'notespace/eval-and-realize-notes-from-change)))


  (use-package company
    :straight t 
    :diminish (company-mode)
    :config
    (global-company-mode)
    (setq company-minimum-prefix-length 1))

  (use-package rainbow-delimiters
    :straight t 
    :defer t
    :init
    (progn
      (add-hook 'clojure-mode-hook #'rainbow-delimiters-mode)))  

  (load-theme 'tango-dark nil))

