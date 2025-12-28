# Issue 094: Cart stepper controls and promo input lack accessible labels (hard for screen readers)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `94`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `27`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Cart quantity stepper +/- buttons and the promo code input are missing accessible labels, making the cart hard to use with assistive tech.

Audit (issue 94): `docs/reviews/app-ui-review-2025-12-26.md` — “Cart stepper controls and promo input lack accessible labels”.

Likely files:
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx` (quantity stepper buttons + promo input)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx` renders stepper buttons as “−” / “+” with no `aria-label`.
- Promo code input uses a placeholder only (“Promo code”) with no associated `<label>`.

Repro (before fix):
1. Visit `/cart` with an item in the cart.
2. Use a screen reader / keyboard navigation: stepper buttons announce poorly (symbol-only), and promo input has no label.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Cart is a core flow; unlabeled controls commonly fail accessibility audits.
- Fix is minimal and localized.

## Step 4 — Options
- [x] Option A: Add `aria-label`s to +/- buttons and add an `sr-only` label + `id` to the promo input.
- [x] Option B: Wrap promo input in a `<form>` and use visible labels + helper text.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** as the smallest change that satisfies basic a11y expectations without changing layout.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Add `type="button"` + descriptive `aria-label` to stepper buttons (include product title for clarity).
- Add `<label className="sr-only" htmlFor="promo-code">Promo code</label>` and set `id="promo-code"` on the input.

Acceptance criteria:
- Screen readers announce stepper controls meaningfully (“Increase quantity for …”).
- Promo input is associated with a label (not placeholder-only).
- Typecheck passes.

Risks:
- None; purely markup/a11y changes.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Quantity stepper buttons now have descriptive `aria-label`s and explicit `type="button"`.
- Promo code input now has an associated (sr-only) `<label>` + stable `id`.

File touched:
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx`

Validation:
- `npm run typecheck` ✅

Manual QA checklist:
- On `/cart`, use keyboard Tab: promo input is announced as “Promo code”.
- Screen reader announces stepper controls meaningfully (“Increase quantity for …” / “Decrease quantity for …”).

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 94)
- Code refs:
  - `src/domains/client/shop/cart/ui/pages/CartPage.tsx` (added aria-labels for +/- and label+id for promo input)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Cart controls and promo input now meet basic accessible labeling expectations.
