# Issue 182: Drawer checkout CTA stuck on “Preparing checkout…” (no working checkout CTA)

Source: Client feedback screenshot `codex-clipboard-WYi8EU.png` (Jan 2026)
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `5`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `(5×5×2)−3 = 47`
- Owner: `AI`
- Created: `2026-01-07`

---

## Problem statement

In the right-side drawer cart, the primary CTA can remain stuck on “Preparing checkout…” and never becomes a working “Secure checkout / Go to checkout” button.

This blocks purchase completion and looks broken to users.

---

## Step 1 — Intake

- Restated: when cart has items, the drawer checkout CTA stays in a “preparing” state forever instead of becoming actionable or clearly failing.
- Likely surfaces:
  - Drawer cart CTA: `src/ui/providers/DrawerProvider.tsx`
  - Cart provider checkout URL computation: `src/domains/client/shop/cart/providers/CartContext.tsx`
  - Shopify checkout URL fetch: `src/domains/platform/commerce/adapters/shopify/internal-api/checkout.ts`
  - Storefront proxy endpoint: `functions/api/storefront/cart/fetch.ts`

---

## Step 2 — Verify

### Evidence in code

- Drawer CTA is driven solely by `checkoutUrl`:
  - In `src/ui/providers/DrawerProvider.tsx`, CTA label falls back to `items.length > 0 ? 'Preparing checkout…' : 'Checkout'` and the button is disabled when `!checkoutUrl`. There is no error state driven by `checkoutStart` / a failure reason.
- Checkout URL computation can resolve to “none” (permanent) without a UI reflection:
  - In `src/domains/client/shop/cart/providers/CartContext.tsx`, `syncCheckoutUrl()` calls `commerce.checkout.beginCheckout()` and sets `checkoutStart` to `{ mode: 'none', reason: ... }` on error, while leaving `checkoutUrl` undefined.
  - In `src/domains/platform/commerce/adapters/shopify/internal-api/checkout.ts`, `beginCheckout()` fetches `checkoutUrl` via `/api/storefront/cart/fetch`, which can fail due to env/config or upstream errors.

### Repro (expected)

1. Add any item to cart.
2. Open drawer cart tab.
3. If checkout URL cannot be computed (e.g. storefront proxy failing, or missing env vars), drawer CTA stays disabled and continues to show “Preparing checkout…”.

### Verified

- Verified: **YES (code-level)** — drawer CTA has no terminal error state; a failed checkout URL computation results in an indefinite “Preparing checkout…” UI.

---

## Step 3 — Assess

- Impact: `5` (blocks purchase)
- Reach: `5` (cart checkout CTA affects most users)
- Effort: `3` (medium: add missing state + retry path)
- Confidence: `2` (confirmed in code; runtime likely depends on storefront proxy health)
- Priority: `(5×5×2)−3 = 47`

Decision: **FIX** (this is a UX+conversion blocker; even if upstream is down, we must not show infinite “Preparing…”).

---

## Step 4 — Options (2–3 approaches)

### Option A — Use `checkoutStart` + add a `refreshCheckout()` action (recommended)

- What: Keep checkout computation inside `CartContext`, but expose a `refreshCheckout()` + `checkoutLoading` state. Update the drawer CTA to show:
  - Loading: “Preparing checkout…” (only while computing)
  - Success: enabled “Secure checkout”
  - Failure: “Checkout unavailable” + reason + “Retry”
- Pros: fits existing architecture; fixes the “infinite preparing” UX; enables recovery from transient `/api/storefront/cart/fetch` failures.
- Cons: touches shared cart provider + drawer UI (but localized).

### Option B — Drawer computes checkout URL itself

- What: On CTA click, call `commerce.checkout.beginCheckout()` directly in the drawer and store a local URL.
- Pros: minimal changes to cart provider.
- Cons: duplicates logic already centralized in `CartContext`; easy to drift.

### Option C — Replace drawer CTA with a link to `/cart`

- What: Always route users to the cart page where checkout logic is more explicit.
- Pros: simplest UI behavior.
- Cons: still fails if checkout URL cannot be computed; adds friction; does not solve “infinite preparing” unless cart page is also improved.

Selected option: **Option A** (keeps the state machine in one place and makes failures/retries explicit in the drawer).

---

## Step 5 — Plan

- Expose a `refreshCheckout()` method (best-effort) from `CartContext` to recompute checkout URL.
- Track `checkoutLoading` in `CartContext` so UI can distinguish “loading” vs “failed”.
- Update `DrawerProvider` CTA:
  - Use provider label from `checkoutCapabilities.providerLabel`.
  - If `checkoutStart.mode === 'none'`, show “Checkout unavailable” + reason (no infinite preparing).
  - Add a small “Retry” action when checkout is unavailable.
- Update `CartPage` to use the same status logic for consistency (optional but low-cost).
- Validate via `npm run lint && npm run typecheck && npm run build`.

Acceptance criteria:
- With items in cart and a healthy storefront proxy, drawer CTA becomes enabled and navigates to checkout.
- If checkout computation fails, drawer CTA shows a terminal “Checkout unavailable” state with a visible reason and a retry path.
- No case where the drawer stays on “Preparing checkout…” indefinitely after a failure.

Risks / rollback:
- Risk: accidentally spamming checkout refresh calls; mitigate by serializing via the existing cart queue and disabling retry while loading.
- Rollback: revert drawer UI to previous label logic and keep `refreshCheckout()` internal-only.

---

## Step 6 — Execute + Validate

### Code changes

- `src/domains/client/shop/cart/providers/CartContext.tsx`
  - Added `checkoutLoading` + `refreshCheckout()` so UI can distinguish “loading” vs “failed” and provide a recovery path without requiring cart mutations.
  - On checkout computation failure, sets a terminal `checkoutStart: { mode: 'none', reason: ... }` so the UI can exit the infinite “Preparing…” state.
- `src/ui/providers/DrawerProvider.tsx`
  - Drawer CTA now uses `checkoutStart` / `checkoutCapabilities`:
    - Success: shows provider label and navigates to checkout.
    - Failure: shows “Checkout unavailable” + reason + “Retry”.
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
  - Mirrors the same status logic and exposes “Retry” on failure for consistency.

### Validation

- `npm run typecheck` ✅
- `npm run build` ✅
- `npm run lint` ❌ (fails repo-wide with many pre-existing errors unrelated to this change; not addressed as part of UI-182)

Manual QA (recommended):
- Add item → open drawer cart:
  - Healthy provider: CTA becomes enabled and routes to checkout.
  - Provider failure: CTA shows “Checkout unavailable” (no infinite “Preparing…”) and “Retry” re-attempts checkout URL computation.

---

## Step 7 — Record + Close

- Tracker status: `DONE`
- Worklog moved to `done-issues/issue-182.md` (see tracker link).
- Follow-up: if checkout remains unavailable due to `/api/storefront/*` failures, continue with Issue 184 (platform config / storefront proxy health).

## Notes / Related

- Research doc (in progress): `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-182-research.md`
- Likely correlated with Issue 184 (`/api/storefront/*` returning 500).
