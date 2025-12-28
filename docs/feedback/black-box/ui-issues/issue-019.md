# Issue 019: Internal navigation sometimes uses raw `<a href>` links (full reload + state loss)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `19`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform` (navigation)
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `2`
- Confidence (1–3): `3`
- Priority: `16`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: Some in-app navigation used raw `<a href>` anchors for internal routes, triggering full page reloads and losing SPA state (drawer/cart/scroll position).

Audit claim (Issue 19): Internal navigation sometimes uses raw `<a href>` links (full reload + state loss).

Likely source:
- Blog pages (product CTA links inside posts)
- Admin pages (prototype “disabled” states linking back to admin routes)
- Admin shell dropdown links (“View storefront”, “Sign in”)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before):
- Blog post page used `<a href="/product/lumelle-shower-cap">` for internal PDP CTA.
- Admin analytics “disabled” state used `<a href="/admin">` and `<a href="/admin/orders">`.
- Admin shell used `<a href="/">` and `<a href="/sign-in">` in several menus.

Repro (before):
1) Open a blog post and click the “Shop now” CTA → full reload.
2) Open admin analytics page in the “disabled” state and click “Back to dashboard” → full reload.
3) Open admin shell user menu and click “View storefront” → full reload (loses SPA state).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: `FIX`

Notes:
- This is a polish + performance issue (perceived speed) and can break “stateful” UI (drawer, scroll position).

## Step 4 — Options
- [x] Option A: Replace internal anchors with router navigation (`RouterLink`/`NavLink`), keeping `<a>` for external links or contexts without router.
- [ ] Option B: Leave anchors and rely on browser reloads.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option A** — consistent with SPA expectations and avoids state loss.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Replace internal anchors in blog/admin surfaces with `RouterLink`/`NavLink`.
- Keep raw `<a href="/">` only where router context isn’t guaranteed (e.g. global error boundary fallback).
- For dynamic URLs (blog product card), use `RouterLink` when the href starts with `/`, else use `<a target="_blank">`.

Acceptance criteria:
- Clicking internal links does not reload the page (no full refresh / state loss).
- External links still open as normal.

Risks/rollback:
- Low risk; rollback is reverting the small link changes in affected components.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implementation:
- `src/domains/blog/ui/pages/BlogPostPage.tsx`
  - internal product CTAs now use `RouterLink` instead of raw `<a href>`.
  - dynamic product card link uses `RouterLink` when internal, `<a>` when external.
- `src/domains/admin/analytics/ui/pages/AnalyticsPage.tsx`
  - internal nav CTAs now use `RouterLink`.
- `src/domains/admin/shared/ui/layouts/AdminShell.tsx`
  - internal menu links now use `NavLink`.

Validation:
- Best-effort: `npm run typecheck`
- Manual QA:
  1) Click blog “Shop now” CTA → routes without full reload.
  2) Click admin analytics “Back to dashboard”/“View orders” → routes without full reload.
  3) Click admin “View storefront” from user menu → routes without full reload.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Summary:
- Replaced internal raw anchors with router links in blog/admin surfaces to prevent reloads and state loss.

---

## Evidence / Links

- Code refs:
- `src/domains/blog/ui/pages/BlogPostPage.tsx`
- `src/domains/admin/analytics/ui/pages/AnalyticsPage.tsx`
- `src/domains/admin/shared/ui/layouts/AdminShell.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Kept the error boundary “Go to home” as a raw anchor intentionally, because router context may not exist when the boundary is rendering.
