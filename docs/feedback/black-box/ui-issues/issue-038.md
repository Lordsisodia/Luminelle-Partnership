# Issue 038: Product fetching is stubbed (PDP can’t reflect real Shopify title/price/images)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `38`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `4`
- Effort (1–5): `4`
- Confidence (1–3): `2`
- Priority: `12`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The audit claims PDP product fetching is effectively a no-op because the product fetcher always returns a “Stub product / Placeholder description”, which is then discarded by the loader as stub data — meaning the PDP never reflects real Shopify title/price/images.

Audit claim (from `docs/reviews/app-ui-review-2025-12-26.md`, issue 38):
- `fetchProductByHandle` returns a stub product.
- The loader discards it as stub, so the PDP never updates from live data.

Likely files:
- `src/lib/product.ts`
- `src/domains/platform/commerce/shopify/shopify.ts`
- `src/domains/client/shop/products/data/product-loaders.ts`
- `src/domains/client/shop/products/hooks/useProductContent.ts`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO** (on `dev` as of `2025-12-28`).

Current code evidence:
- `src/lib/product.ts`
  - `fetchProductByHandle` runs a real Shopify Storefront GraphQL query via `runStorefront(...)` when `shopifyEnabled` is true.
  - A stub fallback exists only when Shopify is not configured (`shopifyEnabled === false`), and the loader intentionally ignores stub data so it doesn’t overwrite static defaults.
- `src/domains/platform/commerce/shopify/shopify.ts`
  - `runStorefront` is implemented and performs a `fetch(...)` to Shopify Storefront GraphQL when env is configured.

Repro notes:
- When `VITE_SHOPIFY_STORE_DOMAIN` + `VITE_SHOPIFY_STOREFRONT_PUBLIC_TOKEN` are configured, the PDP *can* load real Shopify product title/price/images.
- When Shopify is not configured, the app intentionally uses in-repo `productConfigs` as the source of truth for PDP content and avoids overwriting with stub placeholders.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `NOT_AN_ISSUE`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **NOT_AN_ISSUE** (audit finding no longer matches current code).

Notes:
- If a specific deployment environment still does not reflect Shopify product data, that’s likely an environment/config issue (missing Storefront env vars) rather than the UI path being stubbed.

## Step 4 — Options
- [x] Option A: (describe)
- [x] Option B: (describe)
- [x] (Optional) Option C: (describe)
- [x] Pick one + rationale (fit with domain architecture).

Not applicable (issue is not present as described).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Not applicable (issue is not present as described).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

No code changes required.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/lib/product.ts`
- `src/domains/platform/commerce/shopify/shopify.ts`
- `src/domains/client/shop/products/data/product-loaders.ts`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: Shopify product fetching is no longer globally stubbed; it uses Storefront GraphQL when configured and otherwise falls back to in-repo product config without overwriting UI with placeholder data.
