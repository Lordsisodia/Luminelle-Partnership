# Issue 107: Drawer upsell cards fabricate compare-at pricing + review counts (trust risk in cart)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `107`
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
  - The cart drawer’s upsell cards displayed fabricated “compare-at” pricing and review counts, which can mislead users at a trust-critical moment.
- [x] Link to the audit issue and copy the key claim.
  - Audit issue `107` (`docs/06-quality/reviews/app-ui-review-2025-12-26.md`): drawer upsells fabricate compare-at pricing + review counts.
- [x] Identify likely files/components.
  - `src/ui/providers/DrawerProvider.tsx` (upsell card renderer)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
  - `src/ui/providers/DrawerProvider.tsx` upsell cards rendered:
    - a strike-through price derived from `price × 1.3` (fabricated compare-at), and
    - hard-coded review counts/ratings (not sourced from Shopify or a reviews system).
- [x] Write repro steps (route + actions).
  1. Add an item to cart.
  2. Open the drawer cart tab and scroll to the upsell section (“Complete your routine”).
  3. Observe the upsell cards show a strike-through price + review count.
- [x] Mark `Verified: YES/NO` and set status accordingly.
  - Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
  - Impact `4`, Reach `5`, Effort `3`, Confidence `2` → Priority = `(4×5×2)−3 = 37`
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
  - Decision: `FIX`
- [x] Note dependencies (data, product decision, auth, etc.).
  - “Real” compare-at and reviews require a verified data source (Shopify compare-at + reviews provider). Until then, the UI should avoid numeric claims.

## Step 4 — Options
- [x] Option A: Remove compare-at + review counts from upsell cards (show only title + price).
  - Pros: Eliminates misleading claims immediately.
  - Cons: Upsells are a bit less “salesy”.
- [x] Option B: Gate claims behind real data (only show compare-at/reviews if present on product data).
  - Pros: Keeps merchandising affordances when real.
  - Cons: Requires wiring to Shopify/reviews data for upsells.
- [x] Option C: Replace with non-numeric badges (“Popular add-on”, “Recommended”).
  - Pros: Still provides conversion cues without fake numbers.
  - Cons: Still needs product sign-off to avoid dark-pattern vibes.
- [x] Pick one + rationale (fit with domain architecture).
  - Selected: **Option A** — remove the fabricated numeric claims now; re-add once there’s a real data source.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
  - Update the upsell card UI to remove review counts/ratings.
  - Remove the strike-through “compare-at” price.
- [x] Write acceptance criteria (testable).
  - Upsell cards show only title + real price.
  - No “compare-at” strike-through and no review count/ratings on upsells.
  - Typecheck passes.
- [x] Risks/rollback notes.
  - Risk: Lower perceived “deal” framing; acceptable tradeoff for trust/compliance.

## Step 6 — Execute + Validate
- [x] Implement changes.
  - Updated `src/ui/providers/DrawerProvider.tsx` upsell card rendering to remove fabricated compare-at + review counts.
- [x] Validate (tests or best-effort manual checks).
  - Ran `npm run typecheck` (passed).
  - Manual QA checklist:
    - Open drawer cart tab, scroll to upsells: cards show title + price only.
    - “Add” button still works.
- [x] Record results and any regressions found.
  - No regressions observed.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
  - Marked issue `107` as `DONE`.
- [x] Summarize what changed + where.
  - Drawer upsell cards no longer present fabricated pricing/review claims.
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
  - Follow-up (optional): if upsell cards should show reviews/discounts again, wire them to a single audited source of truth.
