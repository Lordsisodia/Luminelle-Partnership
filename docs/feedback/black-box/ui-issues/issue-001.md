# Issue 001: Checkout is a stub page (breaks the purchase flow)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `1`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
- Area: `Client`
- Impact (1–5): `5`
- Reach (1–5): `5`
- Effort (1–5): `4`
- Confidence (1–3): `2`
- Priority: `46`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The audit claims `/checkout` renders as plain text (“Checkout temporarily unavailable”) with no layout/branding or next steps, breaking trust at the highest-intent moment.

Audit claim (from `docs/reviews/app-ui-review-2025-12-26.md`, Issue 1):
- `/checkout` is a stub page with plain text and no branded fallback UX.

Likely files:
- `src/domains/client/shop/checkout/ui/pages/CheckoutPage.tsx`
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx` (checkout CTA state)
- `src/domains/client/shop/cart/providers/CartContext.tsx` (where `checkoutUrl` comes from)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO** (on `dev` as of `2025-12-28`).

Current code evidence:
- `src/domains/client/shop/checkout/ui/pages/CheckoutPage.tsx`
  - Redirects to `checkoutUrl` (Shopify checkout) when available.
  - Otherwise renders a branded fallback via `TemporarilyUnavailablePage` (MarketingLayout + CTAs).
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
  - Only enables “Continue to checkout” when `checkoutUrl` exists; otherwise shows a disabled “Checkout coming soon” button.

Repro:
1. Visit `/checkout` with an empty cart / without a Shopify checkout URL.
2. Confirm the page is branded and includes next actions (back to cart, continue shopping).
3. With a Shopify checkout URL present, confirm `/checkout` redirects to the Shopify checkout URL.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **NOT_AN_ISSUE** (audit finding no longer matches current code).

Notes:
- If checkout is still unavailable in a given environment, the root cause is likely Shopify configuration (`SHOPIFY_STORE_DOMAIN` / `SHOPIFY_STOREFRONT_PUBLIC_TOKEN`) rather than UI/layout.
- The UI already provides a branded fallback and prevents users from clicking through when no `checkoutUrl` exists.

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
- `src/domains/client/shop/checkout/ui/pages/CheckoutPage.tsx`
- `src/ui/pages/TemporarilyUnavailablePage.tsx`
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: `/checkout` is no longer a plain-text stub; it redirects to Shopify checkout when configured and otherwise shows a branded fallback with clear next steps.
