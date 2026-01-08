# Issue 182: Drawer checkout CTA is stuck on “Preparing checkout…” (no working “Go to checkout”)

Source: Client feedback screenshot `codex-clipboard-WYi8EU.png` (Jan 2026)
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `UNTRIAGED`
- Area: `Client`
- Impact (1–5): `5`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `(5×5×2)−3 = 47`
- Owner: `AI`
- Created: `2026-01-07`

---

## ✅ Outputs (what “done” produces)

- Verified repro steps where the drawer shows “Preparing checkout…” indefinitely.
- Root-cause explanation (where checkout URL/session creation fails or isn’t wired).
- A decision doc with **three viable solutions** and a recommendation.
- Acceptance criteria (testable) for the later implementation agent.

---

## Problem statement

In the right-side drawer cart, the primary CTA is stuck on “Preparing checkout…” and never becomes a working “Go to checkout / Secure checkout” button.

This blocks purchase completion and looks broken to users.

---

## 🔁 Multi-agent workflow (runbook)

### Agent 1 — Research + codebase understanding (NO CODE CHANGES)

**Goal:** reproduce the issue, understand the checkout-start code path, and document 3 potential solutions.

#### Tasks

1. Reproduce
   - Open the site (prod/staging) with real Shopify config.
   - Add a product to cart.
   - Open the drawer cart tab.
   - Observe CTA state: is it disabled? Does it ever switch to a working checkout link/button?
   - Record expected vs actual with screenshots.

2. Inspect the checkout-start logic end-to-end
   - Find where checkout URL is computed (drawer vs cart provider vs commerce adapter).
   - Confirm when the app calls “begin checkout”.
   - Confirm whether the commerce checkout adapter returns a usable URL.
   - If a URL is returned, confirm whether navigation is blocked by UI state.

3. Inspect network/API dependencies
   - Confirm the cart fetch endpoint is reachable and returns `checkoutUrl`.
   - Confirm any discount-code sync or cart updates are not blocking checkout URL refresh.
   - Look for errors in console logs.

4. Write up findings + propose options
   - Create/update the research doc: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-182-research.md`
   - Include **3 solutions** with tradeoffs and implementation notes.

#### Deliverable

- `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-182-research.md`

---

## Candidate code hotspots (starting points)

- Drawer checkout CTA UI and state:
  - `src/ui/providers/DrawerProvider.tsx`
- Cart state + checkout URL refresh:
  - `src/domains/client/shop/cart/providers/CartContext.tsx`
- Commerce checkout adapter:
  - `src/domains/platform/commerce/adapters/shopify/internal-api/checkout.ts`
- Shopify cart fetch endpoint:
  - `functions/api/storefront/cart/fetch.ts`

---

## Acceptance criteria (for the later implementation agent)

- When a cart has items, the drawer CTA transitions from “Preparing…” to a working checkout CTA within a reasonable time.
- If checkout cannot be started, CTA clearly explains why (no infinite “Preparing…”).
- Checkout navigation is reliable on mobile and desktop (no blocked taps/clicks).

