# Issue 053: Product PDP “sections” are loaded globally (not per product), so multiple products can show wrong copy/media

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `53`
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

Shopify “sections” metaobject content is currently global (not keyed by product), so it can override and leak the shower cap copy/FAQ/gallery onto other product handles.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence (before fix):
- `loadSections(handle)` ignored `handle` and always loaded the same global metaobjects (`hero`, `essentials`, `reasons`, `how`, `care`, `faq`, `gallery`).
- `useProductContent(handle)` applied those sections to any handle, and `ProductPage` prefers `sections.*` over `config.*` when non-empty.

Files:
- `src/domains/client/shop/products/data/product-loaders.ts` (`loadSections`)
- `src/lib/sections.ts` (fetches global metaobjects)
- `src/domains/client/shop/products/hooks/useProductContent.ts`
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (override order)

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- Wrong product copy/FAQ/care instructions is a trust failure and can cause returns/support tickets.
- The Shopify metaobjects are global today; a safe mitigation is to only apply them to the intended product(s) until we build per-product section storage.

## Step 4 — Options
- [x] Option A: redesign Shopify metaobjects to be keyed per product handle (larger platform/data change).
- [x] Option B: gate applying fetched sections so they only override the shower cap PDP, and other products use `product-config` defaults.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. Small blast radius, fixes the immediate cross-product leak without requiring CMS/schema changes.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- In `loadSections(handle)`, return `null` for non-shower-cap products.
- Keep existing global metaobject fetching unchanged for now.

Acceptance criteria:
- Curler PDPs use their `product-config` copy/FAQ/how/care and are not overridden by global metaobject sections.
- Shower cap PDP can still use the global metaobject sections (as intended).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Gated `loadSections(handle)` to only return sections for the shower cap PDP (`productConfigs['shower-cap'].handle`).

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/products/data/product-loaders.ts`
- `src/lib/sections.ts`
- `src/domains/client/shop/products/hooks/useProductContent.ts`
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Prevents cross-product content leaks by only applying global Shopify metaobject sections to the shower cap PDP until sections are keyed per product.
