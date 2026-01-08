# Issue 184: `/api/storefront/*` endpoints return 500 (Cloudflare Worker 1101) — cart create, landing sections, product fetch

Source: Client DevTools logs (Jan 7, 2026)
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `PLANNED`
- Area: `Platform`
- Impact (1–5): `5`
- Reach (1–5): `5`
- Effort (1–5): `2`
- Confidence (1–3): `3`
- Priority: `(5×5×3)−2 = 73`
- Owner: `AI`
- Created: `2026-01-07`

---

## Problem statement

On `lumellebeauty.co.uk`, multiple Storefront proxy endpoints are failing with HTTP 500 and Cloudflare “Worker threw exception” (Error 1101), including:

- `POST /api/storefront/cart/create`
- `GET /api/storefront/landing/sections`
- `GET /api/storefront/product/by-handle?handle=lumelle-shower-cap`

This breaks:

- Cart creation (and therefore the cart drawer, discounts, checkout URL)
- Landing sections loading (metaobjects-backed content)
- Product data fetching

---

## ✅ Initial triage (what this likely is)

The Pages Functions are throwing uncaught errors (which Cloudflare renders as an HTML 1101 page).

Common causes:

- Missing env vars in Cloudflare Pages:
  - `SHOPIFY_STORE_DOMAIN`
  - `SHOPIFY_STOREFRONT_PUBLIC_TOKEN` or `SHOPIFY_STOREFRONT_PRIVATE_TOKEN`
- Wrong Storefront API auth header/token type
- Wrong API version configured

In code, the Storefront client throws if Storefront env isn’t configured.

---

## 🔁 Multi-agent workflow (runbook)

### Agent 1 — Research + codebase understanding (NO CODE CHANGES)

**Goal:** confirm the exact failing exception in Cloudflare logs, confirm missing/misnamed env vars, and propose 3 solution paths.

#### Tasks

1. Reproduce in production
   - Hit endpoints directly and record status + body:
     - `/api/storefront/cart/create`
     - `/api/storefront/landing/sections`
     - `/api/storefront/product/by-handle?handle=lumelle-shower-cap`

2. Cloudflare Pages Functions logs
   - Find the exception stack trace for Ray IDs
   - Confirm whether the error is “not configured” vs Shopify upstream error (401/403/etc)

3. Verify env var configuration
   - Confirm Cloudflare Pages project has:
     - `SHOPIFY_STORE_DOMAIN`
     - `SHOPIFY_STOREFRONT_PUBLIC_TOKEN` (recommended) or `SHOPIFY_STOREFRONT_PRIVATE_TOKEN`
     - `SHOPIFY_API_VERSION` (optional)
   - Check naming mismatches (e.g. only `VITE_*` exists, or token set under a different name)

4. Write up findings + propose options
   - Create/update: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-184-research.md`
   - Include **3 solutions** with tradeoffs.

#### Deliverable

- `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-184-research.md`

---

## Candidate code hotspots

- Storefront client:
  - `functions/_lib/storefront.ts`
- Storefront endpoints:
  - `functions/api/storefront/cart/*`
  - `functions/api/storefront/landing/sections.ts`
  - `functions/api/storefront/product/by-handle.ts`

---

## Acceptance criteria (for the later implementation agent)

- `/api/storefront/*` endpoints respond with JSON (never Cloudflare HTML exception pages).
- If not configured, responses include a clear `NOT_CONFIGURED` error payload.
- With correct env vars, cart creation + product/landing fetch succeed reliably.

---

## Worklog

- 2026-01-08 18:19 UTC — Triage batch 3: set status to `PLANNED` (treat as a platform/config hard-fail; prioritize returning stable JSON errors instead of Cloudflare 1101).
