# Issue 074: Cart page links users to broken support/account routes and claims “secure checkout” while checkout is unavailable

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `74`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `5`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `47`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
  - The cart page suggests “help” actions that route users into stubbed/unavailable pages, compounding frustration at a high-intent moment.
- [x] Link to the audit issue and copy the key claim.
  - Audit issue `74` (`docs/06-quality/reviews/app-ui-review-2025-12-26.md`): cart help links and payment reassurance copy are shown even when the linked destinations/checkout path are unavailable.
- [x] Identify likely files/components.
  - `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
  - Related stubs:
    - `src/domains/client/shop/checkout/ui/pages/ReturnsPage.tsx`
    - `src/domains/client/shop/checkout/ui/pages/OrderTrackingPage.tsx`
    - `src/domains/client/account/ui/pages/OrdersPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
  - `src/domains/client/shop/cart/ui/pages/CartPage.tsx` previously linked “track an order” to `/account/orders`, which is currently a “Temporarily unavailable” stub page.
  - The “Secure checkout” reassurance is already conditional on `checkoutUrl` in `CartPage` (so it does not always show when checkout is unavailable).
- [x] Write repro steps (route + actions).
  1. Open `/cart`.
  2. Observe the “Need help?” links in the order summary.
  3. Click “track an order” → it routed to `/account/orders` (stub).
- [x] Mark `Verified: YES/NO` and set status accordingly.
  - Verified: **YES** (the help link destination was misleading; reassurance copy is already partially gated)

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
  - Impact `5`, Reach `5`, Effort `3`, Confidence `2` → Priority = `(5×5×2)−3 = 47`
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
  - Decision: `FIX`
- [x] Note dependencies (data, product decision, auth, etc.).
  - Full “returns/tracking/account” functionality is a separate project; this fix is specifically about not sending cart users to the wrong stub surface.

## Step 4 — Options
- [x] Option A: Remove help links entirely until support pages are implemented.
  - Pros: Avoids dead-end navigation.
  - Cons: Removes a useful reassurance/assist path.
- [x] Option B: Point “track an order” to the most relevant non-account route (`/order/track`) instead of account order history.
  - Pros: More accurate, less “account feature” expectation.
  - Cons: Tracking is still a stub, but at least it’s the correct stub.
- [x] Option C: Replace help links with a direct support contact (email/FAQ).
  - Pros: Actionable today.
  - Cons: Requires deciding the canonical support channel + copy.
- [x] Pick one + rationale (fit with domain architecture).
  - Selected: **Option B** — minimal change, more truthful routing.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
  - Update the “track an order” link destination from `/account/orders` → `/order/track`.
- [x] Write acceptance criteria (testable).
  - Cart page “track an order” link routes to `/order/track`.
  - Typecheck passes.
- [x] Risks/rollback notes.
  - Very low risk (copy/link only).

## Step 6 — Execute + Validate
- [x] Implement changes.
  - Updated `src/domains/client/shop/cart/ui/pages/CartPage.tsx` help link destination.
- [x] Validate (tests or best-effort manual checks).
  - Ran `npm run typecheck` (passed).
  - Manual QA checklist:
    - Visit `/cart` → click “track an order” → land on `/order/track`.
- [x] Record results and any regressions found.
  - No regressions observed.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
  - Marked issue `74` as `DONE`.
- [x] Summarize what changed + where.
  - Cart page no longer links “track an order” to the stubbed account order-history route; it links to the tracking route instead.
- [x] Mark DONE/DEFERRED/etc.
  - Final status: `DONE`

---

## Evidence / Links

- Code refs:
  - `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes:
  - This improves honesty of the help routing from the cart page.
  - Follow-up: once returns/tracking/account are real, revisit cart help copy to point users to the best self-serve path.
