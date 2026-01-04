# Issue 005: Cart UI shows incorrect product media + fake compare-at pricing

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `5`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `4`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `37`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
  - Cart line items must accurately reflect what the user added (correct image + correct pricing); hard-coded media or fabricated compare-at pricing is a trust-killer.
- [x] Link to the audit issue and copy the key claim.
  - Audit issue `5` (`docs/06-quality/reviews/app-ui-review-2025-12-26.md`): cart line items showed a hard-coded image and hard-coded compare-at pricing.
- [x] Identify likely files/components.
  - `src/domains/client/shop/cart/ui/pages/CartPage.tsx` (cart page line items)
  - `src/ui/providers/DrawerProvider.tsx` (drawer cart line items and upsell “Add” path)
  - `src/domains/client/shop/cart/providers/CartContext.tsx` (cart item shape + image propagation)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
  - Cart items added from some UI paths didn’t include `image`, which forced a fallback image (making multiple cart items look identical).
  - Compare-at pricing in the drawer was previously displayed even when not backed by real compare-at values (addressed as part of issue `13`).
- [x] Write repro steps (route + actions).
  1. Add items via an upsell “Add” button.
  2. Open `/cart` or the cart drawer.
  3. Previously, cart items could fall back to the same placeholder image if `image` was not provided.
- [x] Mark `Verified: YES/NO` and set status accordingly.
  - Verified: **YES** (image propagation issue is real; compare-at fabrication is handled separately but affects the same “trust” surface)

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
  - Impact `4`, Reach `5`, Effort `3`, Confidence `2` → Priority = `(4×5×2)−3 = 37`
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
  - Decision: `FIX`
- [x] Note dependencies (data, product decision, auth, etc.).
  - Correct images require cart items to carry an `image` URL when added (or to be hydrated from Shopify data).

## Step 4 — Options
- [x] Option A: Ensure every add-to-cart code path passes `image` into `CartItem`.
  - Pros: Minimal change, immediate improvement.
  - Cons: Requires each add path to have an image URL available.
- [x] Option B: Always hydrate cart lines from Shopify before rendering, so image/compare-at are authoritative.
  - Pros: True source of truth.
  - Cons: Requires Shopify to be configured + adds async complexity; not always available.
- [x] Pick one + rationale (fit with domain architecture).
  - Selected: **Option A** — fix the known “upsell add” path to pass `image`, and rely on Shopify hydration when available.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
  - Update the drawer upsell “Add” handler to include `image` in the added cart item.
- [x] Write acceptance criteria (testable).
  - Items added from drawer upsells show their correct image in `/cart`.
  - Typecheck passes.
- [x] Risks/rollback notes.
  - Low risk: only enriches cart item metadata.

## Step 6 — Execute + Validate
- [x] Implement changes.
  - Updated `src/ui/providers/DrawerProvider.tsx` so upsell `add(...)` includes `image`.
- [x] Validate (tests or best-effort manual checks).
  - Ran `npm run typecheck` (passed).
  - Manual QA checklist:
    - Open drawer upsell section → click “Add”.
    - Go to `/cart` → item shows the upsell image, not the generic fallback.
- [x] Record results and any regressions found.
  - No regressions observed.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
  - Marked issue `5` as `DONE`.
- [x] Summarize what changed + where.
  - Cart items added via drawer upsells now include product imagery, reducing “wrong item” anxiety.
- [x] Mark DONE/DEFERRED/etc.
  - Final status: `DONE`

---

## Evidence / Links

- Code refs:
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes:
  - Compare-at fabrication/savings display in the drawer is handled under issue `13`.
