#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const DEFAULT_CONFIG = {
  redditQueries: [
    "ralph wiggum",
    "ralph loop",
    "ralph wiggum loop",
    "ralph-wiggum",
    "ghuntley ralph",
    "chief wiggum"
  ],
  redditSubs: [
    "ClaudeAI",
    "ClaudeCode",
    "LocalLLaMA",
    "OpenaiCodex"
  ]
};
const REDDIT_EXCLUDED_IDS = new Set([
  "1q2c0ne",
  "1qgksrm"
]);

function parseArgs(argv) {
  const args = {
    reddit: false,
    output: path.resolve(process.cwd(), "ralph-reddit-cache.json")
  };

  argv.forEach((arg) => {
    if (arg === "--reddit") args.reddit = true;
    if (arg.startsWith("--output=")) args.output = path.resolve(process.cwd(), arg.slice("--output=".length));
  });

  if (!args.reddit) args.reddit = true;
  return args;
}

function isRelevantRedditText(text) {
  const lower = String(text || "").toLowerCase();
  const hasDirectPhrase =
    lower.includes("ralph wiggum") ||
    lower.includes("ralph loop") ||
    lower.includes("ralph wiggum loop");
  const hasAuthorSignal =
    lower.includes("ghuntley") ||
    lower.includes("geoffrey huntley");
  const hasRalph = lower.includes("ralph");
  const hasContext = [
    "loop",
    "claude",
    "claude code",
    "agent",
    "agentic",
    "coding",
    "while true",
    "wiggum",
    "ghuntley",
    "huntley"
  ].some((term) => lower.includes(term));

  return hasDirectPhrase || hasAuthorSignal || (hasRalph && hasContext);
}

function hasStrongRalphTitle(title) {
  const lower = String(title || "").toLowerCase();
  return [
    "ralph",
    "wiggum",
    "bmalph",
    "microralph",
    "ralphio",
    "ralphloop",
    "ralphy",
    "chief wiggum",
    "clancy wiggum",
    "wiggy"
  ].some((term) => lower.includes(term));
}

function countRalphSignals(text) {
  const lower = String(text || "").toLowerCase();
  const matches = lower.match(/\bralph\b|\bwiggum\b|\bghuntley\b|geoffrey huntley|\bbmalph\b|\bmicroralph\b|\bralphio\b|\bralphloop\b|\bwiggy\b/g);
  return matches ? matches.length : 0;
}

function isPrimaryRalphTopic(title, selftext) {
  return hasStrongRalphTitle(title);
}

function isAllowedRedditSubreddit(subreddit) {
  return DEFAULT_CONFIG.redditSubs.map((item) => item.toLowerCase()).includes(String(subreddit || "").toLowerCase());
}

function shouldExcludeRedditItem(payload) {
  const id = String(payload?.id || "");
  if (REDDIT_EXCLUDED_IDS.has(id)) return true;
  const permalink = String(payload?.permalink || "");
  if (permalink.includes("/comments/1q2c0ne/")) return true;
  if (permalink.includes("/comments/1qgksrm/")) return true;
  return false;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "ralph-tracker/1.0"
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.json();
}

async function fetchRedditPostDetails(id) {
  const data = await fetchJson(`https://www.reddit.com/comments/${encodeURIComponent(id)}.json?raw_json=1`);
  const post = data?.[0]?.data?.children?.[0]?.data;
  return {
    title: post?.title || "",
    selftext: post?.selftext || ""
  };
}

async function fetchReddit() {
  const posts = new Map();
  const comments = new Map();
  const errors = [];

  for (const sub of DEFAULT_CONFIG.redditSubs) {
    for (const query of DEFAULT_CONFIG.redditQueries) {
      const url =
        "https://www.reddit.com/r/" +
        encodeURIComponent(sub) +
        "/search.json?q=" +
        encodeURIComponent(query) +
        "&restrict_sr=1&sort=new&limit=100&raw_json=1";

      try {
        const data = await fetchJson(url);
        const items = data?.data?.children || [];
        for (const entry of items) {
          const payload = entry.data || {};
          if (shouldExcludeRedditItem(payload)) continue;
          if (!isAllowedRedditSubreddit(payload.subreddit)) continue;
          const combined = [payload.title, payload.selftext, payload.body].filter(Boolean).join(" ");
          if (!isRelevantRedditText(combined)) continue;

          if (entry.kind === "t1") {
            comments.set(payload.id, {
              id: payload.id,
              created_at: new Date(Number(payload.created_utc || 0) * 1000).toISOString(),
              body: payload.body || "",
              score: Number(payload.score || 0),
              permalink: payload.permalink || "",
              author: payload.author || "—",
              subreddit: payload.subreddit || "—"
            });
          } else {
            const basePost = {
              id: payload.id,
              created_at: new Date(Number(payload.created_utc || 0) * 1000).toISOString(),
              title: payload.title || "",
              selftext: payload.selftext || "",
              subreddit: payload.subreddit || "—",
              score: Number(payload.score || 0),
              num_comments: Number(payload.num_comments || 0),
              permalink: payload.permalink || "",
              url: payload.url || "",
              author: payload.author || "—"
            };

            let details = { title: basePost.title, selftext: basePost.selftext };
            if (!hasStrongRalphTitle(basePost.title)) {
              try {
                details = await fetchRedditPostDetails(basePost.id);
              } catch (_error) {
                details = { title: basePost.title, selftext: basePost.selftext };
              }
            }

            if (!isPrimaryRalphTopic(details.title, details.selftext)) continue;
            posts.set(payload.id, {
              ...basePost,
              title: details.title || basePost.title,
              selftext: details.selftext || basePost.selftext
            });
          }
        }
      } catch (error) {
        errors.push(`${sub} '${query}': ${error.message}`);
      }
    }
  }

  return {
    source: "reddit",
    fetchedAt: Date.now(),
    posts: Array.from(posts.values()).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
    comments: Array.from(comments.values()).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
    errors,
    config: DEFAULT_CONFIG
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.reddit) {
    console.error("Only --reddit is supported in this helper.");
    process.exit(1);
  }

  const result = await fetchReddit();
  fs.writeFileSync(args.output, JSON.stringify(result, null, 2));

  const summary = {
    output: args.output,
    posts: result.posts.length,
    comments: result.comments.length,
    errors: result.errors.length
  };
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
