# Issue 083: PDP quantity picker uses ARIA “listbox” semantics but lacks keyboard listbox behavior

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `83`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `4`
- Effort (1–5): `2`
- Confidence (1–3): `2`
- Priority: `22`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The PDP quantity picker declares listbox semantics but behaves like a click-only custom dropdown, missing expected keyboard behavior.

Audit (issue 83): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “PDP quantity picker uses ARIA ‘listbox’ semantics but lacks keyboard listbox behavior”.

Likely files:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx` (quantity UI)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- `PriceBlock.tsx` uses `aria-haspopup="listbox"` and renders a `role="listbox"` with options.
- There is no arrow-key navigation, Escape-to-close, roving focus, or click-outside close; it behaves like a click-only dropdown.

Repro (before fix):
1. Visit a PDP (e.g. `/product/lumelle-shower-cap`).
2. Tab to the quantity control and open it.
3. Try using Arrow keys/Escape — nothing follows expected listbox patterns.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Quantity selection is core purchase flow UX; this pattern is a common accessibility audit failure.
- We can simplify by using a native `<select>` for correct keyboard/screen-reader behavior.

## Step 4 — Options
- [x] Option A: Replace with a native `<select>` (fastest and most accessible).
- [x] Option B: Keep custom dropdown but implement full ARIA listbox behavior (more code, more risk).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: native select is the least risky and most accessible solution.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Replace the custom `isQtyOpen` dropdown with a styled `<select>` control.
- Include an `sr-only` label for “Quantity”.
- Make option labels include totals (e.g. “Quantity: 2 — £29.98”) to retain information parity.

Acceptance criteria:
- Quantity selection works with keyboard out-of-the-box (native select).
- Screen readers announce the control with a label.
- Typecheck passes.

Risks:
- The UI will look slightly different (native select behavior), but interaction correctness improves substantially.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Replaced the custom listbox-style quantity dropdown with a native `<select>` so keyboard/screen-reader behavior works out of the box.

File touched:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx`

Validation:
- `npm run typecheck` ✅

Manual QA checklist:
- On a PDP, tab to quantity selector and change quantity using keyboard.
- Confirm the Add to Basket flow uses the selected quantity.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 83)
- Code refs:
  - `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx` (native select quantity control)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Quantity picker now behaves correctly for keyboard and assistive tech users without custom ARIA listbox complexity.
