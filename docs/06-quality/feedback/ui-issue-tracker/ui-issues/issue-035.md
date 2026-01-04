# Issue 035: Blog author links fall back to `#` (dead link + unexpected page jump)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `35`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
- Area: `Blog`
- Impact (1–5): `3`
- Reach (1–5): `2`
- Effort (1–5): `3`
- Confidence (1–3): `3`
- Priority: `15` (audit was outdated)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: Blog author names/avatars should not be clickable if there is no real author URL; falling back to `href="#"` creates dead links and page-jumps.

Audit claim (Issue 35): Blog post pages render author links as `post.authorLink || '#'`, causing dead navigation and a scroll-to-top jump.

Likely source:
- `src/domains/blog/ui/pages/BlogPostPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (current code):
- `BlogPostPage` derives `authorHref` as either a real URL or `null` (`post.authorLink?.trim() ? post.authorLink : null`).
- When `authorHref` is `null`, the UI renders a `<span>`/`<div>` (non-link) instead of `<a href="#">`.

Repro:
1) Open a blog post with no `authorLink` in its data.
2) Author name/avatar renders as non-clickable text (no `#` fallback).

Verified: **NO** (audit claim is outdated).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: `NOT_AN_ISSUE`

## Step 4 — Options
- [ ] Option A: (describe)
- [ ] Option B: (describe)
- [ ] (Optional) Option C: (describe)
- [ ] Pick one + rationale (fit with domain architecture).

## Step 5 — Plan
- [ ] Write implementation plan (bullets).
- [ ] Write acceptance criteria (testable).
- [ ] Risks/rollback notes.

## Step 6 — Execute + Validate
- [ ] Implement changes.
- [ ] Validate (tests or best-effort manual checks).
- [ ] Record results and any regressions found.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Recorded outcome:
- Marked `NOT_AN_ISSUE` because the blog author link logic already avoids `href="#"` fallbacks.

---

## Evidence / Links

- Code refs:
- `src/domains/blog/ui/pages/BlogPostPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: This issue appears to have been fixed already by switching to an `authorHref | null` model and rendering non-links when absent.
