# Issue 122: Product spotlight discount UI depends on parsing a human-written price string (fragile + easy to break)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `122`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

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

The shop landing “Product spotlight” section computed discounts by parsing a human-written `price` string (e.g. `£14.99 (was £19.99)`), which is fragile and can silently break the discount UI if copy formatting changes.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence:
- `src/domains/client/marketing/ui/sections/shop/product-spotlight-section/ProductSpotlightSection.tsx`
  - Used a regex parser (`parsePrice(...)`) against `teaser.price: string` to derive `now/was/discount%`.
- `src/content/home.types.ts` and `src/content/home.config.ts`
  - `pdpTeaser.price` was typed and populated as a formatted string.

Repro:
1. Edit the `pdpTeaser.price` string in `src/content/home.config.ts` to a different format (e.g. “£14.99” or “Now £14.99 (RRP £19.99)”).
2. Discount UI fails to render (falls back) or renders incorrect values.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- This is a “silent correctness” risk: UI can drift without compiler/runtime errors.
- Low-effort to move to numeric fields and format UI from numbers.

## Step 4 — Options
- [x] Option A: Keep `price` as a string and harden the parser (still fragile).
- [x] Option B: Store numeric `priceNow` / `priceWas` and format the display in the UI (preferred).
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. Prices are data, not copy — store numbers and let UI format.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Update `HomeConfig['pdpTeaser']` to include `priceNow` and optional `priceWas`.
- Update `homeConfig` teaser objects to use numeric values.
- Remove regex parsing from `ProductSpotlightSection`; compute discount percent from numbers.
- Run `npm run typecheck`.

Acceptance criteria:
- No regex parsing of a price string in `ProductSpotlightSection`.
- Discount UI renders consistently regardless of copy formatting.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/content/home.types.ts`: replaced `pdpTeaser.price: string` with `priceNow: number` and optional `priceWas: number`.
- `src/content/home.config.ts`: updated teaser entries to provide numeric values (no string parsing required).
- `src/domains/client/marketing/ui/sections/shop/product-spotlight-section/ProductSpotlightSection.tsx`:
  - removed `parsePrice` regex
  - formats GBP values from numbers and computes discount percent from `priceNow/priceWas`.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/marketing/ui/sections/shop/product-spotlight-section/ProductSpotlightSection.tsx`
- `src/content/home.types.ts`
- `src/content/home.config.ts`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: The product spotlight discount UI now uses numeric price fields and no longer relies on parsing a freeform string.
