# Paredit Adventures

A browser-based puzzle game for practicing Emacs paredit commands, built with Clojure [Scittle](https://github.com/babashka/scittle).

Navigate, reshape, and restructure s-expressions using the same keybindings you use in Emacs. Each stage introduces a new paredit command, followed by practice rounds that combine it with previously learned skills.

## Quick Start

```bash
# Serve locally
python3 -m http.server 8080

# Open in browser
open http://localhost:8080
```

No build step. No dependencies. Just a static site with Scittle loading ClojureScript directly in the browser.

## How to Play

You are a cursor in a world of s-expressions. Use paredit commands to transform nested structures and match the goal shown in the top-right corner.

### Controls

| Key | Command |
|-----|---------|
| `C-M-f` | Forward sexp |
| `C-M-b` | Backward sexp |
| `C-M-d` | Down into sexp |
| `C-M-u` | Up out of sexp |
| `C-)` | Forward slurp |
| `C-(` | Backward slurp |
| `C-}` | Forward barf |
| `C-{` | Backward barf |
| `M-(` | Wrap |
| `M-s` | Splice |
| `M-r` | Raise |
| `C-M-t` | Transpose |
| `M-up` / `C-M-Backspace` | Splice kill backward |
| `M-down` / `M-k` | Splice kill forward |
| `M-?` | Convolute |
| `M-S` | Split |
| `M-J` | Join |
| `C-/` | Undo |
| `r` | Restart puzzle |
| `Escape` | Skip puzzle |

### Stages

1. **First Steps** — forward/backward navigation
2. **Going Deeper** — descend/ascend into nesting
3. **Star Collector** — collect items using all navigation
4. **The Hungry List** — forward slurp (+4 practice rounds)
5. **Let It Go** — forward barf (+4 practice rounds)
6. **Both Directions** — all slurp/barf directions (+5 practice)
7. **Gift Wrapping** — wrap (+3 practice)
8. **Break Free** — splice (+3 practice)
9. **Rise Up** — raise (+3 practice)
10. **Swap Meet** — transpose (+3 practice)
11. **Surgical Splice** — splice-kill (+3 practice)
12. **Inside Out** — convolute (+3 practice)
13. **Divide & Conquer** — split/join (+3 practice)
14. **The Gauntlet** — use everything

## Project Structure

```
├── index.html              # Entry point
├── test.html               # Unit tests (35 paredit operation tests)
├── src/
│   ├── engine.cljs         # S-expression tree model & utilities
│   ├── paredit.cljs        # All paredit operations
│   ├── render.cljs         # Canvas rendering
│   ├── puzzlegen.cljs      # Puzzle generation
│   ├── levels.cljs         # Stage/level definitions & progression
│   └── game.cljs           # Game loop, input, state management
└── e2e/
    ├── deps.edn            # Clojure deps (Playwright)
    └── src/paredit_e2e/
        └── core.clj        # E2E tests via Playwright
```

## Testing

### Unit Tests

Open `http://localhost:8080/test.html` in a browser. Tests all 12 paredit operations against Emacs-verified behavior. 35/35 should pass.

### E2E Tests

Requires Java 21+ and Clojure CLI.

```bash
cd e2e

# First run only: install Playwright browsers
clojure -M -e '(import com.microsoft.playwright.CLI) (CLI/main (into-array ["install" "chromium"]))'

# Run tests (requires http server on port 8080)
clojure -M -m paredit-e2e.core
```

The E2E suite:
- Launches Chromium via Playwright
- Solves all 12 tutorial puzzles with known key sequences
- Solves 13 practice puzzles with verified solutions
- Checks all 50 practice puzzles are not pre-solved

## Design

Visual identity inspired by [8-bit-sheep](https://8-bit-sheep.com) and [1-bit-wonder](https://1-bit-wonder.net/metabolism):

- **Font**: Plus Jakarta Sans
- **Palette**: `#a9431e` (burnt orange), `#7badb6` (teal), `#E3CAC3` (rose), `#EEE7E1` (linen), `#F9EDDD` (peach)
- Light background, warm accent colors, minimal border-radius (6px)

## Tech

- [Scittle](https://github.com/babashka/scittle) — ClojureScript in the browser via SCI, no build step
- HTML5 Canvas for rendering
- [Playwright](https://playwright.dev/java/) for E2E testing via Clojure/Java interop
