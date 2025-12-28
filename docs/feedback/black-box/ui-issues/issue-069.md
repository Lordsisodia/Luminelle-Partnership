# Issue 069: PDP quantity selector hard-codes “Buy 2, save 10%” for every product (even when not applicable)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `69`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `4`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `13`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The audit claims the PDP quantity selector always shows a “Buy 2, save 10%” / “Save 10%” message for every product, even when that promo isn’t applicable.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO** (on `dev` as of `2025-12-28`).

Audit claim (from `docs/reviews/app-ui-review-2025-12-26.md`):
- The quantity UI always displays “Buy 2, save 10%” and shows “Save 10%” for qty ≥ 2, regardless of product.

Current code evidence:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx`
  - The `select#pdp-quantity` renders options like `Quantity: 2 — £{(price * 2).toFixed(2)}` and does **not** include any “save 10%” copy.
  - The string “Buy 2, save 10%” is only referenced as a badge value filter (it is *not* injected into the quantity UI).

Related references (not the quantity selector):
- `src/domains/client/shop/products/data/product-config.ts` contains `badge: 'Buy 2, save 10%'` for the shower cap product.
- `src/layouts/MarketingLayout.tsx` and `src/domains/client/marketing/ui/sections/shop/trust-bar/TrustBar.tsx` include promo messages mentioning “Buy 2, save 10%”.

Repro:
1. Open any PDP (e.g. curler).
2. Open the Quantity dropdown.
3. Observe options only show `Quantity: N — £...` with no promo/savings text.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **NOT_AN_ISSUE** (audit finding no longer matches current code).

Notes:
- If we want the quantity selector to advertise a multi-buy discount, we should only do so when:
  - the discount is actually implemented/enforced at checkout, and
  - the offer is product-specific (or otherwise scoped).
- That would be a **new feature** (with pricing + promo logic), not a bug fix.

## Step 4 — Options
- [x] Option A: (describe)
- [x] Option B: (describe)
- [x] Pick one + rationale (fit with domain architecture).

Not applicable (issue is not present).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Not applicable (issue is not present).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

No code changes required.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx`
- `src/domains/client/shop/products/data/product-config.ts`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: The PDP quantity selector does not hard-code “Buy 2, save 10%” in current `dev`. The phrase exists as marketing copy/badges, but isn’t injected into the quantity dropdown.
