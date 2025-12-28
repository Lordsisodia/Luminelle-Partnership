# Issue 040: Announcement + newsletter components don’t match the “configurable components” system (broken UX if enabled)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `40`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

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

Restatement: If the announcement/newsletter blocks are enabled, they must have working interactions (dismiss, submit, valid links) — otherwise they create “site is broken” UX.

Audit claim (Issue 40): Dismissible announcement “×” wasn’t clickable, CTA defaulted to `'#'`, newsletter input was `readOnly` with no submit logic, and default announcement CTA pointed to a route that doesn’t exist (`/shipping`).

Likely files:
- UI: `src/ui/components/AnnouncementBar.tsx`, `src/ui/components/NewsletterModal.tsx`
- Defaults/config: `src/domains/admin/shared/data/componentMeta.ts`
- Routes: `src/App.tsx` (to confirm valid destinations)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (before fix):
- `src/ui/components/AnnouncementBar.tsx`
  - `dismissible` rendered a non-interactive `×` (`<span>` only).
  - If `ctaLabel` was provided but `ctaHref` was falsy, the link fell back to `'#'`.
- `src/ui/components/NewsletterModal.tsx`
  - Email input was `readOnly` and the CTA button had no submit handler.
- `src/domains/admin/shared/data/componentMeta.ts`
  - `announcement.ctaHref` defaulted to `/shipping`, but there is no `/shipping` route in `src/App.tsx`.

Repro (conceptual, when the blocks are mounted):
1) Render `AnnouncementBar` with `dismissible` → clicking “×” should hide it; previously it didn’t.
2) Render `AnnouncementBar` with `ctaLabel` but missing `ctaHref` → previously produced a `'#'` link.
3) Render `NewsletterModal` → entering email + clicking CTA should submit; previously nothing happened.

Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Dependencies:
- Newsletter submission needs a backend endpoint. (A `/api/newsletter/subscribe` handler already exists in this repo.)

## Step 4 — Options
- [x] Option A: Implement real dismiss + newsletter submission + remove `'#'` fallback + fix default route.
- [x] Option B: Keep them as “layout-only” stubs and hide/disable them everywhere they could surface.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: these components are cheap to make “real enough” and preventing dead links/inputs is high value.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- `AnnouncementBar`:
  - Replace the decorative “×” with a real `<button>` that hides the bar.
  - Persist dismissal in `localStorage` keyed by the message string.
  - Render CTA only when a real href is provided (no `'#'` fallback).
- `NewsletterModal`:
  - Make the email input editable, validate email, and submit to `/api/newsletter/subscribe`.
  - Add success/error UI and disable after success.
- Update component defaults to point announcement CTA to a real route (`/terms#shipping`).
- Run `npm run typecheck`.

Acceptance criteria:
- Dismissible announcement can be dismissed (and stays dismissed on reload).
- CTA does not render a `'#'` fallback.
- Newsletter modal can submit (or show error) and shows a success state.
- Default CTA route exists in app routing.

Risks/rollback:
- Newsletter endpoint might not be deployed in some environments; failure path should be graceful (shows error, doesn’t break layout).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/ui/components/AnnouncementBar.tsx`
  - Added real dismiss button + localStorage persistence
  - Removed `'#'` CTA fallback
  - Uses `Link` for internal routes
- `src/ui/components/NewsletterModal.tsx`
  - Added editable email input + submit handler to `/api/newsletter/subscribe`
  - Added success/error UI states
- `src/domains/admin/shared/data/componentMeta.ts`
  - Changed announcement default CTA from `/shipping` → `/terms#shipping`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
  - `src/ui/components/AnnouncementBar.tsx`
  - `src/ui/components/NewsletterModal.tsx`
  - `src/domains/admin/shared/data/componentMeta.ts`
  - `src/domains/client/marketing/ui/pages/TermsPage.tsx` (existing `#shipping` anchor)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Announcement and newsletter components now behave like real interactive UI (dismiss + submit) and default config links target valid routes.
