# Issue 176: Admin blog editor relies on placeholders instead of real labels (accessibility + clarity issue)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `176`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Admin`
- Impact (1–5): `2`
- Reach (1–5): `2`
- Effort (1–5): `1`
- Confidence (1–3): `3`
- Priority: `11` `(2×2×3)−1`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

## Step 4 — Options
- [x] Option A: Add visible labels (wrap inputs/textarea in `<label>` and add `<span>` label text).
- [x] Option B: Refactor to use a shared `TextField` component with label support everywhere.
- [x] Pick one + rationale (fit with domain architecture).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit claim: “Admin blog editor relies on placeholders instead of real labels (accessibility + usability)”.
- Verified in code: `src/domains/admin/blog/ui/pages/BlogDetailPage.tsx`
  - Sections editor fields (heading/paragraphs) lacked visible labels.
  - FAQ editor fields (question/answer) lacked visible labels.
  - Product CTA and keyword fields relied on placeholders for meaning.
- Repro steps (before fix):
  1. Navigate to `/admin/blogs/:slug` (e.g. open any blog post in the admin).
  2. Scroll to **Body → Sections / FAQs / Product CTA / Keywords**.
  3. Observe multiple inputs where meaning is conveyed only by placeholder text (no persistent label).
- Validation:
  - `npm run typecheck` ✅

## Outcome

- Final status: `DONE`
- Decision: `FIX` (small change, meaningful usability + accessibility improvement)
- Changes:
  - Added visible label text and `label` wrappers for repeating blog fields (sections, FAQs, product CTA, keywords).
  - Kept placeholders as hints (not the primary source of meaning).
  - No data model changes.
