# Issue 143: PDP “review count” in HeroProofStrip is derived by stripping digits from a label string (brittle + can show wrong numbers)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `143`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
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

The PDP hero proof strip shows a review count derived from a label string, and the parsing is brittle (can display the wrong number).

Audit claim (Issue 143): the review count shown in `HeroProofStrip` is derived by stripping digits from a string label (e.g. `"10k+" → 10`), which can under-report social proof.

Likely files:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx` (passes `count` to `HeroProofStrip`)
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (already computes a robust parsed count)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (code):
- `SectionsMap.tsx` used `Number(props.ratingCountLabel.replace(/[^0-9]/g, '')) || 100`, which breaks abbreviations like `10k+` (becomes `10`, not `10,000`).

Repro:
1. Set `ratingCountLabel` to something like `10k+` (via product config override).
2. Load the PDP and observe the proof strip showing `10` instead of `10,000`.

Verified: **YES** → fixed and marked `DONE`.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Score:
- Impact: 2 (social proof clarity + trust)
- Reach: 4 (PDP is high traffic)
- Effort: 3 (small refactor across 2 files)
- Confidence: 2 (clear bug pattern, easy to validate)
- Priority: `(2×4×2) − 3 = 13`

Decision: **FIX**

Dependencies: none.

## Step 4 — Options
- [x] Option A: (describe)
- [x] Option B: (describe)
- [x] (Optional) Option C: (describe)
- [x] Pick one + rationale (fit with domain architecture).

Option A — Keep current digit-stripping:
- Cheapest, but can show materially wrong social proof.

Option B — Parse label robustly and pass numeric count (**chosen**):
- Use a single parsing path (already present in `ProductPage`) and pass the computed numeric count into `HeroProofStrip`.

Option C — Change `HeroProofStrip` to accept the label string:
- Would avoid parsing, but shifts UI away from numeric formatting and would require copy decisions.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation plan:
- Add a `ratingCount: number` prop to `renderSections` so UI does not re-parse a label string.
- Compute `ratingCount` in `ProductPage` using the existing parsing logic, with a safe fallback.
- Pass `ratingCount` through to `HeroProofStrip`.

Acceptance criteria:
- `ratingCountLabel` values like `10k+` render as `10,000` (not `10`) in the proof strip.
- TypeScript remains green (`npm run typecheck`).

Risks/rollback:
- If product configs rely on label-only semantics, keep `ratingCountLabel` as UI copy and treat numeric count separately (current approach).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`
  - Passes a numeric `ratingCount` into `renderSections` using the robust parser + fallback.
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx`
  - Uses `props.ratingCount` for `HeroProofStrip` instead of digit-stripping.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Summary:
- Removed brittle digit-stripping for PDP review counts and routed a parsed numeric count through the section renderer to the proof strip.

Final status: `DONE`

---

## Evidence / Links

- Code refs:
  - `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`
  - `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: This prevents under-reporting social proof when labels use abbreviations like `k`/`m`.
