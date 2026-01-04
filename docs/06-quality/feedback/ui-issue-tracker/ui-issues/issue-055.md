# Issue 055: Auth pages promise features that aren’t implemented (onboarding → dead ends)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `55`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform`
- Impact (1–5): `3`
- Reach (1–5): `3`
- Effort (1–5): `2`
- Confidence (1–3): `3`
- Priority: `25` (=(3×3×3)−2)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The sign-in/sign-up surfaces should not promise “account hub” features if the linked pages are placeholders or dead ends.

Audit claim (Issue 55): Auth pages advertised orders/shipping progress/addresses/creator perks while the destinations were stubbed (“temporarily unavailable”), creating a high-intent bounce moment.

Likely files:
- Auth pages:
  - `src/domains/platform/auth/ui/pages/SignInPage.tsx`
  - `src/domains/platform/auth/ui/pages/SignUpPage.tsx`
- Destinations referenced in the audit:
  - `src/domains/client/account/ui/pages/*`
  - `src/domains/client/shop/checkout/ui/pages/OrderTrackingPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (current code):
- Auth pages explicitly scope expectations:
  - `SignInPage.tsx` / `SignUpPage.tsx` call out that some account features are still being built (“Orders & saved addresses (coming soon)”).
- Previously-stubbed destinations are now implemented as branded “support funnels” instead of dead-end placeholders:
  - `src/domains/client/account/ui/pages/OrdersPage.tsx`, `AddressesPage.tsx`, `PaymentMethodsPage.tsx`
  - `src/domains/client/shop/checkout/ui/pages/OrderTrackingPage.tsx`

Repro (current `dev`):
1) Visit `/sign-in` and `/sign-up` and read the feature bullets + disclaimer copy.
2) After auth, navigate to `/account`, `/account/orders`, `/account/addresses`, `/account/payments`, `/order/track`.
3) Confirm the routes render real pages (not “temporarily unavailable”) and provide clear next steps.

Verified: **YES** (audit claim is no longer true on current `dev`)

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **DONE (already addressed)**.

Notes:
- This issue was high-impact at audit time (auth is a high-intent moment).
- Current implementation avoids misleading promises and avoids dead-end stubs by routing users into support-first pages.

## Step 4 — Options
- [x] Option A: Update auth copy to match shipped functionality (and clearly mark “coming soon” items).
- [x] Option B: Keep full “dashboard” promises and ship placeholder destination pages.
- [x] Pick one + rationale (fit with domain architecture).

Picked Option A (already in code): minimize misleading claims and ensure all linked routes are non-stub pages.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan (if it regresses later):
- Ensure auth pages only advertise features that exist, or explicitly label them as “coming soon”.
- Ensure any “account hub” destinations render a real page with a clear next step, even if underlying data isn’t wired yet.

Acceptance criteria:
- `/sign-in` and `/sign-up` do not imply fully-working order/address dashboards unless available.
- `/account/*` and `/order/track` are never “temporarily unavailable” stubs.

Risks / rollback:
- Mostly copy; low risk. If routed pages regress back to stubs, restore the support-funnel implementations.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Result:
- No additional code changes required in this pass: the auth copy already includes appropriate caveats, and the destination routes render real pages.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Recorded outcome:
- Marked `DONE` because the auth pages no longer overpromise, and the account/tracking routes are no longer dead-end placeholders.

---

## Evidence / Links

- Code refs:
  - `src/domains/platform/auth/ui/pages/SignInPage.tsx`
  - `src/domains/platform/auth/ui/pages/SignUpPage.tsx`
  - `src/domains/client/account/ui/pages/*`
  - `src/domains/client/shop/checkout/ui/pages/OrderTrackingPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: The audit claim described an earlier state; current `dev` does not ship auth → dead-end stubs, and copy now acknowledges what is/ isn’t implemented.
