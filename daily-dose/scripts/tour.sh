#!/usr/bin/env bash
# Daily Dose feature tour (see TESTBED.md, "Feature tour").
#
#   scripts/tour.sh            run the tour. If the test bed is down, start a
#                              private one (Day 1 = today, tour peers seeded),
#                              and stop it again afterwards.
#   scripts/tour.sh --reset    reseed the RUNNING test bed first (Day 1 = today,
#                              tour peers). This wipes everyone's progress:
#                              never while testers are using it.
#   scripts/tour.sh --keep     do not stop a test bed this script started.
#   scripts/tour.sh --stop     stop the test bed when the tour ends, even if
#                              this script did not start it.
#
# On a bed this script did not start or reset (a shared one), the tour reads as
# Grace Okafor and leaves out the organiser beats. On its own bed it reads as
# Mikko Saarinen and ends with the organiser (Aino Lehtola). TOUR_* variables
# pass through to tour/tour.mjs (TOUR_AUTOGO, TOUR_HEADLESS, TOUR_SHOTS, ...).
set -euo pipefail
cd "$(dirname "$0")/.."
RESET=0; KEEP=0; STOP=0
for arg in "$@"; do
  case "$arg" in
    --reset) RESET=1 ;;
    --keep) KEEP=1 ;;
    --stop) STOP=1 ;;
    *) echo "Usage: $0 [--reset] [--keep] [--stop]" >&2; exit 2 ;;
  esac
done

up() { curl -s -m 3 -o /dev/null "http://127.0.0.1:$1/"; }
OWN=0; STARTED=0
if up 5178 && up 8290 && up 9199; then
  if [ "$RESET" = 1 ]; then
    echo "Reseeding the running test bed: Day 1 = today, tour peers. Everyone's progress is wiped."
    DAY1_OFFSET=0 TOUR_SEED=1 scripts/testbed.sh reset
    OWN=1
  else
    echo "Using the running test bed as it is (shared): reader Grace Okafor, no organiser beats."
  fi
else
  echo "Test bed is down: starting a private one with Day 1 = today."
  scripts/testbed.sh stop >/dev/null 2>&1 || true
  DAY1_OFFSET=0 TOUR_SEED=1 scripts/testbed.sh start
  OWN=1; STARTED=1
fi

if [ "$OWN" = 1 ]; then
  export TOUR_READER="${TOUR_READER:-Mikko Saarinen}"
else
  export TOUR_READER="${TOUR_READER:-Grace Okafor}"
  export TOUR_SKIP_ORGANISER="${TOUR_SKIP_ORGANISER:-1}"
fi

status=0
node tour/tour.mjs || status=$?

if [ "$STOP" = 1 ] || { [ "$STARTED" = 1 ] && [ "$KEEP" = 0 ]; }; then
  scripts/testbed.sh stop
fi
exit $status
