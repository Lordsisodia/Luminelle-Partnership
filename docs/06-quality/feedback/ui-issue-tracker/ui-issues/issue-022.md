# Issue 022: “Bundle cards” section is a stub (renders nothing)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `22`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client` (Shop landing)
- Impact (1–5): `2`
- Reach (1–5): `4`
- Effort (1–5): `2`
- Confidence (1–3): `3`
- Priority: `22`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The shop landing page includes a “bundles/sets” section, but the `BundleCards` component returns `null`, so the section is missing entirely.

Audit claim (Issue 22): The landing page renders `<BundleCards />`, but the component returns `null`.

Likely source:
- `src/domains/client/marketing/ui/sections/shop/bundle-cards/BundleCards.tsx`
- `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx` (where it’s mounted)
- Product data for cards: `src/domains/client/shop/products/data/product-config.ts`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before):
- `src/domains/client/marketing/ui/sections/shop/bundle-cards/BundleCards.tsx` returned `null` unconditionally.
- `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx` mounted `<BundleCards />`, so users never saw anything in that spot.

Repro (before):
1) Visit `/`
2) Scroll past TikTok / reviews → there is no “bundles/sets” section at all (because the component returns `null`).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: `FIX`

Notes:
- This is a homepage conversion lever (AOV/upsell), and shipping nothing reads as unfinished.
- We can ship a safe “sets” section without introducing new discount claims or bundle pricing logic.

## Step 4 — Options
- [x] Option A: Implement a minimal “Build your routine” card section using existing `productConfigs`.
- [ ] Option B: Remove `<BundleCards />` from the landing page until bundles are implemented (effectively hide the gap).
- [ ] Option C: Implement real bundle pricing/discount logic (requires product + checkout decisions).
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option A**
- Low risk, makes the page feel complete, and reuses the existing “single source of truth” for product titles/subtitles/images.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Replace `BundleCards` stub with a real section:
  - heading + description
  - 2 cards (Shower cap + Heatless Curler set)
  - images from `productConfigs` gallery
  - CTAs link to `/product/:handle`

Acceptance criteria:
- `/` renders a visible “Build your routine” section where `<BundleCards />` is mounted.
- Cards have images, titles, subtitles, and internal navigation via router links.
- No new discount/savings claims are introduced by this section.

Risks/rollback:
- Changes are isolated to one component. Rollback is reverting `BundleCards.tsx`.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implementation:
- `src/domains/client/marketing/ui/sections/shop/bundle-cards/BundleCards.tsx`
  - now renders a real section (“Build your routine”) with two cards sourced from `productConfigs`
  - card CTAs route to the corresponding PDPs

Validation:
- Best-effort: `npm run typecheck`
- Manual QA:
  1) Visit `/` and scroll to the bundle section; verify it’s visible and styled.
  2) Click “Shop now” → routes to `/product/lumelle-shower-cap` and `/product/satin-overnight-curler`.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Summary:
- Implemented the previously stubbed `BundleCards` section so the homepage no longer ships a dead/empty “bundles” slot.

---

## Evidence / Links

- Code refs:
- `src/domains/client/marketing/ui/sections/shop/bundle-cards/BundleCards.tsx`
- `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx`
- `src/domains/client/shop/products/data/product-config.ts`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: This is a minimal implementation (no bundle pricing). It fills the UI gap and routes users to the relevant PDPs.
