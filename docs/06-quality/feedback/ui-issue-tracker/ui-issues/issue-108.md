# Issue 108: Shopify checkout/cart handoff page doesn’t provide a direct “Open on Shopify” link even when the domain is known

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `108`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `5`
- Effort (1–5): `4`
- Confidence (1–3): `2`
- Priority: `16`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

When users land on a Shopify checkout/cart deep link on the storefront domain, the handoff page explains the problem but didn’t provide a one-click “Open on Shopify” escape hatch even when the Shopify domain is known.

Audit (issue 108): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Shopify checkout/cart handoff page doesn’t provide a direct “Open on Shopify” link even when the domain is known”.

Likely file:
- `src/domains/client/shop/cart/ui/pages/ShopifyCheckoutHandoffPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- The page had “Back to cart” and “Home” CTAs only, even though it already reads `SHOPIFY_STORE_DOMAIN` from env and knows the full path the user attempted to load.

Repro (before fix):
1. Visit a Shopify checkout/cart URL that is being served by the SPA (e.g., `/cart/c/<id>?key=...`).
2. The handoff page renders but does not offer a direct link to the Shopify-served domain for that same path.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a recovery UX improvement: it doesn’t solve the root cause (domain/proxy config), but it prevents users from getting stuck.
- No product decision needed.

## Step 4 — Options
- [x] Option A: Add a direct `https://{SHOPIFY_STORE_DOMAIN}{fullPath}` link when the domain is known and differs from the current host.
- [ ] Option B: Always attempt to auto-redirect (riskier; could bounce between domains).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: explicit user action, low risk, and provides a clear escape hatch.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Compute a `shopifyCheckoutUrl` when `SHOPIFY_STORE_DOMAIN` is set (and not equal to the current host).
- Render a primary action link “Open on Shopify” to that URL.

Acceptance criteria:
- When `SHOPIFY_STORE_DOMAIN` is configured, the page shows an “Open on Shopify” link.
- The link opens the same path on the Shopify-served domain in a new tab.
- `npm run typecheck` passes.

Risks:
- If `SHOPIFY_STORE_DOMAIN` is misconfigured, the link may 404; this is still better than leaving users stranded.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added an “Open on Shopify” link when the Shopify domain is known and differs from the current host.

Files touched:
- `src/domains/client/shop/cart/ui/pages/ShopifyCheckoutHandoffPage.tsx`

Validation:
- Run `npm run typecheck`.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 108)
- Code refs:
  - `src/domains/client/shop/cart/ui/pages/ShopifyCheckoutHandoffPage.tsx` (`shopifyCheckoutUrl` + link)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Users now have a direct “Open on Shopify” escape hatch when the Shopify domain is known, reducing dead-end checkout experiences.
