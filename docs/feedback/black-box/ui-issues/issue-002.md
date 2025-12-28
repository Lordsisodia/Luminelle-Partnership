# Issue 002: Post-purchase support pages are also stubs (creates “we don’t support you” vibes)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `2`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `4`
- Reach (1–5): `4`
- Effort (1–5): `4`
- Confidence (1–3): `2`
- Priority: `28`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The audit claims the storefront ships post‑purchase routes (order confirmation, tracking, returns) as “temporarily unavailable” placeholders, which kills trust right after purchase.

Audit claim (from `docs/reviews/app-ui-review-2025-12-26.md`, Issue 2):
- “Order confirmation, tracking, and returns routes render ‘temporarily unavailable’ placeholders.”

Likely files:
- `src/domains/client/shop/checkout/ui/pages/OrderConfirmationPage.tsx`
- `src/domains/client/shop/checkout/ui/pages/OrderTrackingPage.tsx`
- `src/domains/client/shop/checkout/ui/pages/ReturnsPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (order confirmation was still a placeholder on `dev`).

Evidence (before fix):
- `src/domains/client/shop/checkout/ui/pages/OrderConfirmationPage.tsx` rendered `TemporarilyUnavailablePage`.

Repro:
1. Visit `/order/123/confirm`.
2. Observe placeholder/“temporarily unavailable” UI (before fix).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- We don’t need full “order detail” data to avoid broken vibes; a branded page with next steps + support routes is enough.
- Tracking + returns pages are already implemented as branded support funnels; order confirmation needed the same treatment.

## Step 4 — Options
- [x] Option A: (describe)
- [x] Option B: (describe)
- [x] (Optional) Option C: (describe)
- [x] Pick one + rationale (fit with domain architecture).

Option A — Keep stubs:
- Fast, but damages trust at the most sensitive moment (after purchase).

Option B — Ship branded pages with support CTAs (**chosen**):
- Aligns with existing `ReturnsPage` and `OrderTrackingPage` patterns.
- Works even without an order API (email/WhatsApp escalation).

Option C — Fully wire Shopify order status:
- Higher effort; requires deeper Shopify integrations + domain routing decisions.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation plan:
- Replace `OrderConfirmationPage` placeholder with a real page (MarketingLayout + SEO + noindex).
- Show order reference (if provided) with a “Copy reference” affordance.
- Provide obvious next actions: track order, start a return, WhatsApp, email.

Acceptance criteria:
- `/order/:orderId/confirm` renders a branded page (not `TemporarilyUnavailablePage`).
- Includes clear CTAs to `/order/track` and `/returns`, plus support contact options.
- `npm run typecheck` stays green.

Risks/rollback:
- If this route is not used yet, changes are low-risk and purely additive to UX.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- `src/domains/client/shop/checkout/ui/pages/OrderConfirmationPage.tsx`
  - Replaced placeholder with a branded confirmation/help page (order reference + copy, next steps, support CTAs).

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Final status: `DONE`

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/checkout/ui/pages/OrderConfirmationPage.tsx`
- `src/domains/client/shop/checkout/ui/pages/OrderTrackingPage.tsx`
- `src/domains/client/shop/checkout/ui/pages/ReturnsPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Post‑purchase routes no longer feel like dead ends; order confirmation now provides clear next steps + support options consistent with the tracking/returns pages.
