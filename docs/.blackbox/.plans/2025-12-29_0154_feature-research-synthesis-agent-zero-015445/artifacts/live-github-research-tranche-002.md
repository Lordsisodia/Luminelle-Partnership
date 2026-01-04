---
status: blocked
last_reviewed: 2025-12-28
owner: agent-zero
---

# Live GitHub Research — Tranche 002 (Auto Search)

This run was **blocked by GitHub API rate limiting** (HTTP 403).

## ✅ What to do next (fast)

Provide a GitHub token so we can continue live repo research without rate limit blocks.

### Option A: one-off (recommended)

```bash
export GITHUB_TOKEN="<your_token_here>"
python3 .blackbox/scripts/research/github_search_repos.py \
  --out .blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/live-github-research-tranche-002.md \
  --token "$GITHUB_TOKEN"
```

### Option B: pass token inline

```bash
python3 .blackbox/scripts/research/github_search_repos.py \
  --out .blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/live-github-research-tranche-002.md \
  --token "<your_token_here>"
```

## 🔎 Error details (for debugging)

- URL: `https://api.github.com/search/repositories?q=rma%20returns%20management%20open%20source&sort=stars&order=desc&per_page=12`
- HTTP: `403`
- Message: `HTTP Error 403: rate limit exceeded`
- X-RateLimit-Remaining: `0`
- X-RateLimit-Reset: `1766954470`
