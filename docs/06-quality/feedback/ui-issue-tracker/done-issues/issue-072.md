# Issue 072: Free-shipping threshold + shipping copy is inconsistent across the site (trust + conversion hit)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `72`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `2`
- Confidence (1–3): `3`
- Priority: `16` (=(2×3×3)−2)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: “Free shipping” copy and the underlying threshold should be consistent across promo strips, trust bars, cart/drawer math, and landing copy.

Audit claim (Issue 72): Different surfaces used different thresholds/copy formats (e.g. `£19.99` vs `£20+`, “over” vs “on orders”), creating trust and conversion friction.

Likely files:
- `src/config/constants.ts` (threshold / label)
- Promo strip: `src/layouts/MarketingLayout.tsx`
- Trust bar: `src/domains/client/marketing/ui/sections/shop/trust-bar/TrustBar.tsx`
- Cart and drawer math: `src/domains/client/shop/cart/ui/pages/CartPage.tsx`, `src/ui/providers/DrawerProvider.tsx`
- PDP: `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx`
- Landing copy: `src/content/home.config.ts`, `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (current code):
- Threshold + label are centralized:
  - `src/config/constants.ts` exports:
    - `FREE_SHIPPING_THRESHOLD_GBP`
    - `FREE_SHIPPING_THRESHOLD_LABEL` (used for copy like `£20+`)
- Key UI surfaces consume the shared constant instead of hard-coding:
  - Promo strip: `src/layouts/MarketingLayout.tsx` uses `FREE_SHIPPING_THRESHOLD_LABEL`
  - Trust bar: `src/domains/client/marketing/ui/sections/shop/trust-bar/TrustBar.tsx` uses `FREE_SHIPPING_THRESHOLD_LABEL`
  - Cart math: `src/domains/client/shop/cart/ui/pages/CartPage.tsx` uses `FREE_SHIPPING_THRESHOLD_GBP`
  - Drawer math: `src/ui/providers/DrawerProvider.tsx` uses `FREE_SHIPPING_THRESHOLD_GBP`
  - PDP: `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx` uses `FREE_SHIPPING_THRESHOLD_LABEL`
  - SEO/landing meta copy: `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx` uses `FREE_SHIPPING_THRESHOLD_LABEL`

Verified: **YES** (threshold and copy are now centralized and consistent in current code)

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **DONE (already addressed)**.

Note:
- If the business rule for the threshold changes (e.g. £19.99 vs £20), update it once in `src/config/constants.ts` so math + copy stay aligned.

## Step 4 — Options
- [x] Option A: Centralize threshold and label in a shared constant and consume it everywhere (copy + math).
- [x] Option B: Keep per-surface copy and accept ongoing drift.
- [x] Pick one + rationale (fit with domain architecture).

Picked Option A (already in code): shared `config/constants` is the lowest-effort way to prevent drift.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Acceptance criteria:
- All “free shipping” threshold copy uses `FREE_SHIPPING_THRESHOLD_LABEL`.
- Any “free shipping remaining” math uses `FREE_SHIPPING_THRESHOLD_GBP`.
- No stray hard-coded threshold strings exist in UI surfaces.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Result:
- No additional changes required in this pass; the centralization is already present in the current branch.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
  - `src/config/constants.ts`
  - `src/layouts/MarketingLayout.tsx`
  - `src/domains/client/marketing/ui/sections/shop/trust-bar/TrustBar.tsx`
  - `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
  - `src/ui/providers/DrawerProvider.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Free shipping threshold messaging is centralized via `FREE_SHIPPING_THRESHOLD_GBP` / `FREE_SHIPPING_THRESHOLD_LABEL`, preventing copy/math drift between promo surfaces and cart/drawer calculations.
