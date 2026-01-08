# Issue 184 — Research Notes (Agent 1)

Owner: `AI`
Date started: `2026-01-07`

## 0) Triage update (2026-01-09T01:21:31+07:00)

- Decision: `PLANNED`
- Notes:
  - Platform unblocker that likely cascades into Issues 181/182 (discounts + checkout CTA).
  - Treat as “make endpoints reliable + never return Cloudflare HTML 1101 pages”.

## 1) Repro summary

- Environment:
- Endpoint(s):
- Expected:
- Actual:
- Ray IDs:

## 2) Evidence collected

- Cloudflare logs:
- Upstream Shopify errors (if any):
- Env var audit (Cloudflare Pages):

## 3) Root cause

- Confirmed cause:
- Contributing factors:

## 4) Three solution options

### Option 1 — Fix env configuration only (no code change)

- What:
- Pros:
- Cons:

### Option 2 — Harden functions: always return JSON + accept token fallbacks

- What:
- Pros:
- Cons:

### Option 3 — Disable server-side storefront proxy and use client Storefront token (if acceptable)

- What:
- Pros:
- Cons:

## 5) Recommendation

- Suggested option:
- Why:
