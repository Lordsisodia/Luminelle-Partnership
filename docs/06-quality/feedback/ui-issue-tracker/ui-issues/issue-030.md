# Issue 030: Discount messaging is shown widely, but there’s no working discount system in the app

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `30`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `VALIDATING`
- Area: `Client / Commerce`
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `9`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` (gate messaging on capabilities).
- [x] Note dependencies (data, product decision, auth, etc.).

## Step 4 — Options
- [x] Option A: Hide discount/promo UI when checkout/discounts are not supported.
- [x] Option B: Keep messaging, but show “coming soon” text.
- [x] Pick one + rationale: Option A (avoids promise-vs-reality).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

## Step 7 — Record + Close
- [ ] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [ ] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Verified: **YES** (2026-01-08)
- Repro (when discounts are not supported / checkout is unavailable):
  - Start dev with default mock commerce (no `USE_REAL_COMMERCE=true`) and visit `/shop` and `/cart`.
  - Observe “Get 10% off…”, wheel reward messaging, and promo code entry even though checkout is unavailable.
- Code refs:
  - `src/domains/client/marketing/ui/sections/shop/email-capture-band/EmailCaptureBand.tsx`
  - `src/domains/client/marketing/ui/sections/shop/final-cta-section/FinalCtaSection.tsx`
  - `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
  - `src/domains/client/shop/cart/providers/CartContext.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `VALIDATING`
- Implementation notes:
  - Gate discount/promo UI on `commerce.checkout.getCapabilities().supportsDiscounts` and the presence of the `applyDiscount` port.
  - Clear any persisted discount codes when discounts are not supported (prevents stale “saved code” messaging).
  - Validation: `npm run typecheck` + `npm run build` pass on branch `vk/34f3-ui-030-client-p9`.
