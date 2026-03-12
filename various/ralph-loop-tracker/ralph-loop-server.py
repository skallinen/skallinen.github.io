#!/usr/bin/env python3

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, quote, urlparse
from urllib.request import Request, urlopen
import json
import os


ROOT = Path("/Users/samikallinen")
HOST = "127.0.0.1"
PORT = 8000
USER_AGENT = "ralph-tracker/1.0"


class RalphTrackerHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        parsed = urlparse(path)
        rel = parsed.path.lstrip("/") or "index.html"
        return str(ROOT / rel)

    def end_json(self, status_code, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/reddit-search":
            self.handle_reddit_search(parsed)
            return
        super().do_GET()

    def handle_reddit_search(self, parsed):
        params = parse_qs(parsed.query)
        subreddit = params.get("subreddit", [""])[0].strip()
        query = params.get("q", [""])[0].strip()
        limit = params.get("limit", ["100"])[0].strip() or "100"

        if not subreddit or not query:
          self.end_json(400, {"error": "Missing subreddit or q"})
          return

        target = (
            f"https://www.reddit.com/r/{quote(subreddit)}/search.json"
            f"?q={quote(query)}&restrict_sr=1&sort=new&limit={quote(limit)}&raw_json=1"
        )
        request = Request(target, headers={"User-Agent": USER_AGENT})

        try:
            with urlopen(request, timeout=20) as response:
                body = response.read()
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(body)
        except HTTPError as error:
            body = error.read().decode("utf-8", errors="replace")
            self.end_json(error.code, {"error": f"Reddit upstream HTTP {error.code}", "details": body[:500]})
        except URLError as error:
            self.end_json(502, {"error": "Reddit upstream unavailable", "details": str(error)})


def main():
    os.chdir(ROOT)
    server = ThreadingHTTPServer((HOST, PORT), RalphTrackerHandler)
    print(f"Serving Ralph Tracker on http://{HOST}:{PORT}/ralph-loop-tracker.html")
    server.serve_forever()


if __name__ == "__main__":
    main()
