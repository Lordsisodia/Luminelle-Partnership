# Issue 152: Terminology inconsistency: PDP says “Basket” while the rest of the UI says “Cart”

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `152`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `1`
- Reach (1–5): `5`
- Effort (1–5): `1`
- Confidence (1–3): `3`
- Priority: `14` (=(1×5×3)−1)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The PDP should use the same cart terminology as the rest of the app to avoid small-but-noticeable trust/polish drift.

Audit claim (Issue 152): PDP uses “Basket” (e.g. “Add to Basket”) while the rest of the UI uses “Cart”.

Likely sources:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx`
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx` (bottom CTA)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence:
- `PriceBlock` primary CTA label was “Add to Basket”.
- PDP bottom CTA label was also “Add to Basket”.

Repro:
1) Open any PDP (e.g. `/product/lumelle-shower-cap`).
2) Observe the primary CTA: “Add to Basket” (inconsistent with “Cart” used elsewhere).

Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

- Decision: **FIX**
- Dependencies: none

## Step 4 — Options
- [x] Option A: Standardize on “Cart” across the storefront UI.
- [x] Option B: Standardize on “Basket” everywhere (larger copy sweep).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: most of the app already uses “Cart”, so this is the minimal consistent change.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Replace “Add to Basket” strings in PDP CTAs with “Add to Cart”.
- Run `npm run typecheck`.
- Update tracker/worklog.

Acceptance criteria:
- PDP CTAs say “Add to Cart”.
- No TypeScript errors introduced.

Risks / rollback:
- None; copy-only.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx`: “Add to Cart”
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx`: “Add to Cart”

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx`
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: PDP CTAs now use the same “Cart” terminology as the rest of the UI.
