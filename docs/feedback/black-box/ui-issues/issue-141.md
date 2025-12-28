# Issue 141: Two SEO components exist (`Seo` vs `SEO`) with different defaults and URL/image handling (meta drift risk)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `141`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `4`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `37`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The codebase had two competing SEO components (`Seo` and `SEO`) with different defaults/title rules, creating a high risk of metadata drift as pages get added.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `src/components/Seo.tsx` and `src/ui/components/SEO.tsx` both existed and implemented slightly different rules for title/url/image defaults.
- Even if only one is used today, this duplication invites accidental mixed usage later.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Duplication is a “slow burn” bug source: small differences compound into inconsistent SEO/share previews.

## Step 4 — Options
- [x] Option A: Delete the unused component and keep one canonical SEO component.
- [x] Option B: Merge behavior into a single component and update all imports.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** (lowest-risk, fastest path): the `SEO` component was unused, so removing it prevents future drift.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Confirm `src/ui/components/SEO.tsx` has no usages.
- Delete the unused file to eliminate future accidental imports.

Acceptance criteria:
- Only one SEO component remains in the codebase (`src/components/Seo.tsx`).
- Typecheck passes.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 141)
- Code refs:
  - `src/components/Seo.tsx` (kept as the canonical SEO component)
  - `src/ui/components/SEO.tsx` (deleted)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Removed the unused duplicate `SEO` component to prevent future metadata drift.
