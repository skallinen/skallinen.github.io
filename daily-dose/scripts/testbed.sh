#!/usr/bin/env bash
# Daily Dose test bed: the deployed client against local Firebase emulators.
# Usage: scripts/testbed.sh start|reset|stop|status   (see TESTBED.md)
set -euo pipefail
cd "$(dirname "$0")/.."
RUN=testbed/.run
PAGE_PORT=5178; AUTH_PORT=9199; FS_PORT=8290
PORTS="$PAGE_PORT $AUTH_PORT $FS_PORT 4499 4599 9151"
FIREBASE_TOOLS="${FIREBASE_TOOLS:-firebase-tools@15.23.0}"
mkdir -p "$RUN"

up() { curl -s -m 2 -o /dev/null "http://127.0.0.1:$1/" ; }
wait_port() {
  for _ in $(seq 1 120); do up "$1" && return 0; sleep 1; done
  echo "Port $1 did not come up; see $RUN/emulators.log" >&2; return 1
}
java_prefix() {
  if java -version >/dev/null 2>&1; then echo ""; else echo "nix-shell -p jdk21_headless --run"; fi
}

stop() {
  for f in "$RUN"/*.pid; do [ -f "$f" ] && kill "$(cat "$f")" 2>/dev/null || true; rm -f "$f"; done
  sleep 2
  for p in $PORTS; do pids=$(lsof -ti "tcp:$p" -sTCP:LISTEN 2>/dev/null || true); [ -n "$pids" ] && kill $pids 2>/dev/null || true; done
  echo "Test bed stopped."
}

start() {
  for p in $PORTS; do
    if lsof -ti "tcp:$p" -sTCP:LISTEN >/dev/null 2>&1; then echo "Port $p is busy; run scripts/testbed.sh stop first." >&2; exit 1; fi
  done
  node testbed/build.mjs
  node testbed/rules.mjs
  local cmd="npx -y $FIREBASE_TOOLS emulators:start --only auth,firestore --project demo-daily-dose --config testbed/firebase.json"
  local jp; jp=$(java_prefix)
  if [ -n "$jp" ]; then nohup $jp "$cmd" >"$RUN/emulators.log" 2>&1 & else nohup $cmd >"$RUN/emulators.log" 2>&1 & fi
  echo $! > "$RUN/emulators.pid"
  echo "Starting emulators (log: $RUN/emulators.log)..."
  wait_port $AUTH_PORT; wait_port $FS_PORT
  node testbed/seed.mjs
  node testbed/completions.mjs
  nohup node testbed/serve.mjs >"$RUN/serve.log" 2>&1 &
  echo $! > "$RUN/serve.pid"
  wait_port $PAGE_PORT
  echo "Ready: http://127.0.0.1:$PAGE_PORT/"
}

case "${1:-}" in
  start) start ;;
  reset) up $FS_PORT || { echo "Test bed is not running; use start." >&2; exit 1; }; node testbed/build.mjs && node testbed/rules.mjs && node testbed/seed.mjs && node testbed/completions.mjs ;;
  stop) stop ;;
  status) for p in $PORTS; do printf '%s ' "$p"; up "$p" && echo up || echo down; done ;;
  *) echo "Usage: $0 start|reset|stop|status" >&2; exit 2 ;;
esac
