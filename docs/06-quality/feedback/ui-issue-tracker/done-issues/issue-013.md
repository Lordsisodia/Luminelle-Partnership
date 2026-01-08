# Issue 013: Drawer shows “Total savings” based on invented compare-at pricing

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `13`
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
  - The drawer computes “compare-at” prices even when none exist (inventing them) and then displays “Total savings” and strike-through pricing that can mislead users.
- [x] Link to the audit issue and copy the key claim.
  - Audit issue `13` (`docs/06-quality/reviews/app-ui-review-2025-12-26.md`): the drawer invents compare-at pricing and shows “Total savings” based on it.
- [x] Identify likely files/components.
  - `src/ui/providers/DrawerProvider.tsx` (`getUnitPricing`, savings UI)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
  - `src/ui/providers/DrawerProvider.tsx` previously defaulted `unitCompareAt` to `~1.3× unitPrice` when compare-at was missing, then used it for:
    - per-line strike-through pricing, and
    - “Total savings” in the drawer footer.
- [x] Write repro steps (route + actions).
  1. Add any product to cart that does not have a real compare-at price.
  2. Open the drawer cart tab.
  3. Observe a strike-through “compare-at” price and “Total savings” that don’t correspond to real product pricing.
- [x] Mark `Verified: YES/NO` and set status accordingly.
  - Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
  - Impact `4`, Reach `5`, Effort `3`, Confidence `2` → Priority = `(4×5×2)−3 = 37`
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
  - Decision: `FIX`
- [x] Note dependencies (data, product decision, auth, etc.).
  - Showing savings requires real `compareAt` (Shopify metadata or CMS config). If compare-at isn’t available, the UI should not fabricate it.

## Step 4 — Options
- [x] Option A: Keep the savings UI but only compute/show it when real compare-at metadata exists.
  - Pros: Keeps discount UX for products that actually have compare-at pricing.
  - Cons: Savings disappears for products without compare-at, which is correct.
- [x] Option B: Remove savings + compare-at UI entirely from the drawer.
  - Pros: Lowest trust risk.
  - Cons: Loses useful “discount at a glance” for valid compare-at products.
- [x] Option C: Pull compare-at from a marketing config (non-Shopify) source.
  - Pros: Allows merchandising without Shopify compare-at.
  - Cons: Still needs a single audited source of truth; risks drift.
- [x] Pick one + rationale (fit with domain architecture).
  - Selected: **Option A** — only show compare-at/savings when it exists and is greater than unit price.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
  - Remove the “invented compare-at” fallback (no more `price × 1.3`).
  - Only render strike-through compare-at when it exists and is greater than unit price.
  - Compute “Total savings” only from real compare-at values; hide the savings row when savings is `0`.
- [x] Write acceptance criteria (testable).
  - For items without compare-at pricing, the drawer shows only the real price (no strike-through).
  - “Total savings” is not displayed unless there’s a real discount.
  - Typecheck passes.
- [x] Risks/rollback notes.
  - Risk: Some merchandising UIs may look “less salesy” without compare-at, but that’s the correct tradeoff for trust/compliance.

## Step 6 — Execute + Validate
- [x] Implement changes.
  - Updated `src/ui/providers/DrawerProvider.tsx` to treat compare-at as optional and only display it when real.
- [x] Validate (tests or best-effort manual checks).
  - Ran `npm run typecheck` (passed).
  - Manual QA checklist:
    - Cart item without compare-at: no strike-through price; no “Total savings”.
    - Cart item with compare-at > price: strike-through appears; “Total savings” appears and is positive.
- [x] Record results and any regressions found.
  - No regressions observed; changes are localized to drawer pricing display.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
  - Marked issue `13` as `DONE`.
- [x] Summarize what changed + where.
  - Drawer no longer fabricates compare-at pricing; savings/compare-at UI only appears when backed by real values.
- [x] Mark DONE/DEFERRED/etc.
  - Final status: `DONE`

---

## Evidence / Links

- Code refs:
  - `src/ui/providers/DrawerProvider.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes:
  - This resolves the “invented compare-at” problem for the drawer cart items and footer savings.
  - Separate issue: drawer *upsell cards* still fabricate compare-at + review counts (tracked elsewhere).
