# Issue 027: Policy/support pages link to broken routes

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `27`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `15`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Support/policy links (e.g. returns and tracking) routed users to “temporarily unavailable” stub pages, which is especially damaging in high-anxiety moments (returns/tracking).

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence (before fix):
- `src/domains/client/shop/checkout/ui/pages/ReturnsPage.tsx` rendered `TemporarilyUnavailablePage`.
- `src/domains/client/shop/checkout/ui/pages/OrderTrackingPage.tsx` rendered `TemporarilyUnavailablePage`.
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx` linked users to `/returns` and `/order/track`.
- `src/domains/client/marketing/ui/pages/TermsPage.tsx` links to `/returns` (and presents it as the “start a return” entrypoint).

Repro:
1. Open `/cart`, click “View returns” or “track an order”.
2. You land on a stub/placeholder “coming soon” page instead of support instructions.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- These routes are linked from core flows; even a simple “contact support” workflow is better than “coming soon”.
- No backend dependencies required if we provide mailto/WhatsApp fallbacks.

## Step 4 — Options
- [x] Option A: stop linking to `/returns` and `/order/track` entirely; route users to `mailto:` only.
- [x] Option B: keep routes but replace stubs with minimal, helpful support pages that allow “start a return” / “tracking help” via mailto and WhatsApp.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. The routes already exist and are referenced across the site (including in Terms). Making them useful reduces trust damage immediately without needing backend work.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Replace `TemporarilyUnavailablePage` on:
  - `/returns`
  - `/order/track`
- Add lightweight “support request” forms that generate a prefilled `mailto:` link (order number/email/reason).
- Keep existing cart/terms links unchanged so they now lead somewhere useful.

Acceptance criteria:
- `/returns` is no longer a stub; users see clear next steps + can start a return via email/WhatsApp.
- `/order/track` is no longer a stub; users can request tracking help via email/WhatsApp.
- No broken routes in cart/terms for these support actions.

Risks/rollback:
- Low risk; new pages are simple, client-only, and do not change checkout/cart logic.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/domains/client/shop/checkout/ui/pages/ReturnsPage.tsx` now renders a real support page with a prefilled email link and WhatsApp link.
- `src/domains/client/shop/checkout/ui/pages/OrderTrackingPage.tsx` now renders a real support page with a prefilled email link and WhatsApp link.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/checkout/ui/pages/ReturnsPage.tsx`
- `src/domains/client/shop/checkout/ui/pages/OrderTrackingPage.tsx`
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
- `src/domains/client/marketing/ui/pages/TermsPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Support links now land on actionable pages instead of “temporarily unavailable”, reducing trust damage during returns/tracking moments.
