# Issue 034: Blog “social” section is blank (component returns `null`), creating dead whitespace

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `34`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Blog`
- Impact (1–5): `2`
- Reach (1–5): `2`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `5`
- Owner: `AI`
- Created: `2025-12-27`
- Closed: `2026-01-08`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The blog post page renders a “social/share” section, but (per the audit) the `BlogSocial` component returned `null`, leaving an empty padded block in the page flow.

- Audit source: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (Issue 34, dated 2025-12-26)
  - Key claim: Blog post page includes a dedicated social/engagement section, but `BlogSocial` is `() => null`, creating dead whitespace.
- Likely code:
  - `src/domains/blog/ui/components/BlogSocial.tsx`
  - `src/domains/blog/ui/pages/BlogPostPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES (historically)**, and **fixed in current code**.

- Evidence in code:
  - `src/domains/blog/ui/pages/BlogPostPage.tsx` renders the share section containing `BlogSocial`.
  - `src/domains/blog/ui/components/BlogSocial.tsx` now renders a real “Share / Copy link” UI and only returns `null` when required props are missing.
  - Hardened on 2026-01-08 to pass the canonical absolute `url` into `BlogSocial`, avoiding any slug/`window` edge cases.

Repro (manual):
1. Start the app.
2. Navigate to any blog post, e.g. `/blog/about-lumelle`.
3. Scroll past the article body to the “Share” block.
4. Confirm it renders share actions (copy link, X, Facebook) and does not show an empty padded section.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

- Score: I=2, R=2, E=3, C=2 → P=(2×2×2)-3 = **5**
- Decision: **FIX** (done)
- Dependencies: none (pure UI)

## Step 4 — Options
- [x] Option A: Remove the section until implemented (eliminate dead whitespace).
- [x] Option B: Ship a minimal working social/share block (copy link + share links).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option B**: minimal working share block is low effort, improves UX, and fits the blog domain without needing external data.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Ensure `BlogSocial` always gets a stable share URL from `BlogPostPage`.
- Render share UI (copy + external share links) and avoid returning `null` on valid blog posts.

Acceptance criteria:
- On a blog post page, the social/share section is visible and not blank.
- Copy link writes the blog URL to clipboard (or uses fallback).
- Share links open X/Facebook share flows with the blog post URL.

Risks/rollback:
- None; isolated UI component. Rollback is reverting the `BlogSocial` prop change.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implementation (2026-01-08):
- `src/domains/blog/ui/components/BlogSocial.tsx`: accept `url` (+ optional `title`) and render share UI.
- `src/domains/blog/ui/pages/BlogPostPage.tsx`: pass canonical `url` into `BlogSocial`.

Validation evidence (2026-01-08):
- `npm run typecheck` ✅
- `npm run build` ✅ (includes `npm run validate:blog-content`)
- Note: `npm run lint` currently fails repo-wide due to pre-existing eslint rule violations unrelated to this change.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Summary:
- Closed issue as **DONE**; the blog post “social/share” section now renders a real share block and no longer risks rendering as an empty padded section.

Files:
- `src/domains/blog/ui/components/BlogSocial.tsx`
- `src/domains/blog/ui/pages/BlogPostPage.tsx`
- `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

---

## Evidence / Links

- Code refs:
- `src/domains/blog/ui/components/BlogSocial.tsx`
- `src/domains/blog/ui/pages/BlogPostPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Audit claim (“`BlogSocial` is `() => null`”) was accurate at time of the 2025-12-26 review; current implementation ships a minimal, functional share block and passes typecheck/build on 2026-01-08.
