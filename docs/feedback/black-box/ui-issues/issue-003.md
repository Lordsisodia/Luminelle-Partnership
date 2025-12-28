# Issue 003: The entire account area is stubbed (users can’t manage anything)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `3`
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

The audit claims the account area is a dead end: users click “Account” and hit “temporarily unavailable” pages instead of getting useful order/help flows.

Audit claim (from `docs/reviews/app-ui-review-2025-12-26.md`, Issue 3):
- “`/account` and all subpages render ‘temporarily unavailable’.”

Likely files:
- `src/domains/client/account/ui/pages/AccountPage.tsx`
- `src/domains/client/account/ui/pages/OrdersPage.tsx`
- `src/domains/client/account/ui/pages/OrderDetailPage.tsx`
- `src/domains/client/account/ui/pages/AddressesPage.tsx`
- `src/domains/client/account/ui/pages/PaymentMethodsPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **PARTIALLY**.

Evidence:
- `src/domains/client/account/ui/pages/AccountPage.tsx` is already a branded account home (not a stub).
- Subpages were still rendered as `TemporarilyUnavailablePage` placeholders:
  - `OrdersPage.tsx`
  - `OrderDetailPage.tsx`
  - `AddressesPage.tsx`
  - `PaymentMethodsPage.tsx`

Repro:
1. Visit `/account` → branded home exists.
2. Visit `/account/orders`, `/account/addresses`, `/account/payments` → previously “temporarily unavailable” placeholders (before fix).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Score:
- Impact: 4 (trust + navigation dead ends)
- Reach: 4 (account entry points are visible in header/drawer)
- Effort: 4 (multiple pages + copy + routing)
- Confidence: 2 (clear in code; full “real account” needs backend decisions)
- Priority: `(4×4×2) − 4 = 28`

Decision: **FIX**

Dependencies:
- Full account management (real order list, addresses, saved payment methods) requires a backend decision (Shopify Customer Account / Clerk + DB / etc.).
- This fix focuses on removing dead-end vibes by providing branded guidance + support flows.

## Step 4 — Options
- [x] Option A: (describe)
- [x] Option B: (describe)
- [x] (Optional) Option C: (describe)
- [x] Pick one + rationale (fit with domain architecture).

Option A — Keep `TemporarilyUnavailablePage` stubs:
- Easy, but feels broken and is a trust hit.

Option B — Replace stubs with branded “helpful” pages (**chosen**):
- Keep expectations clear (“not available yet”) but give immediate next actions (tracking, returns, support contact).
- Reuse patterns already used on `/returns` and `/order/track`.

Option C — Fully implement account features:
- Higher effort, needs product + data + auth decisions.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation plan:
- Replace placeholder account subpages with branded pages using `MarketingLayout` + `Seo` + `noindex`.
- Provide clear CTAs to:
  - `/order/track`
  - `/returns`
  - WhatsApp + email support
- For order detail, show the reference and allow copying it.

Acceptance criteria:
- Account subpages are no longer “blank”/placeholder stubs.
- Users always have an actionable next step (track, return, contact support).
- `npm run typecheck` stays green.

Risks/rollback:
- Low risk; changes are UX-only and don’t modify auth/data flows.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- `src/domains/client/account/ui/pages/OrdersPage.tsx` → branded “Orders” page with tracking/returns/support actions.
- `src/domains/client/account/ui/pages/OrderDetailPage.tsx` → branded “Order details” page with copy-reference + support CTAs.
- `src/domains/client/account/ui/pages/AddressesPage.tsx` → branded “Addresses” page with mailto prefill form for address updates.
- `src/domains/client/account/ui/pages/PaymentMethodsPage.tsx` → branded “Payments” help page with cart + support CTAs.

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
- `src/domains/client/account/ui/pages/AccountPage.tsx`
- `src/domains/client/account/ui/pages/OrdersPage.tsx`
- `src/domains/client/account/ui/pages/OrderDetailPage.tsx`
- `src/domains/client/account/ui/pages/AddressesPage.tsx`
- `src/domains/client/account/ui/pages/PaymentMethodsPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Full account management is still a larger feature, but the account area no longer feels like a broken dead end — it now routes users to real support flows (tracking/returns) with clear escalation options.
