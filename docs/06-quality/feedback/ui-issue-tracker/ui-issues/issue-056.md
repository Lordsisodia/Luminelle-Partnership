# Issue 056: Admin “Analytics” page is mock data (can mislead, includes routes that don’t exist in this app)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `56`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Admin`
- Impact (1–5): `4`
- Reach (1–5): `2`
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

The admin Analytics page is rendered from mock datasets, which can mislead operators/admins into making decisions based on fake numbers.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence:
- `src/domains/admin/analytics/ui/pages/AnalyticsPage.tsx` uses `MOCK_*` constants and includes non-existent example routes (e.g. `/collection/hair`, `/products/...`).

Repro:
1. Navigate to `/admin/analytics`.
2. Observe revenue/orders/traffic tables/charts populated from hard-coded mock arrays.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- Admin UIs should never look “real” when data is fake.
- We can mitigate immediately without wiring real analytics by (a) making demo status unmistakable and (b) disabling in production by default.

## Step 4 — Options
- [x] Option A: wire real analytics now (Shopify/PostHog/etc).
- [x] Option B: keep mock UI for design, but show a strong “Demo data” banner and disable in production unless explicitly enabled.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. Lowest risk; avoids production misuse while keeping the design playground in dev/staging.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Add a prominent “Demo data” callout banner at the top of the analytics page.
- Disable the page in production unless `VITE_ALLOW_MOCK_ADMIN_ANALYTICS=1` is set.

Acceptance criteria:
- In production builds: `/admin/analytics` shows a disabled message instead of mock numbers (unless explicitly enabled).
- In non-production: analytics still renders for UX iteration, but has an unmistakable “Demo data” banner.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Added `VITE_ALLOW_MOCK_ADMIN_ANALYTICS` gate.
- Added a “Demo data” banner to the analytics page.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/admin/analytics/ui/pages/AnalyticsPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Admin analytics no longer risks “fake numbers in prod” — it’s clearly labeled as demo data and disabled in production unless explicitly enabled.
