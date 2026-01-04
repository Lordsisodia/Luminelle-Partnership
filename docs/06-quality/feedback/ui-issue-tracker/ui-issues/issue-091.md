# Issue 091: Blog post contains internal links to slugs that don’t exist (dead navigation inside the article)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `91`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Blog`
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `1`
- Confidence (1–3): `3`
- Priority: `17` (=(2×3×3)−1)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The “Welcome to the Lumelle Journal” article links to internal blog routes whose slugs don’t exist, so clicks land on `/blog/:slug` and immediately redirect back to `/blog`.

Audit claim (Issue 91): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` notes missing slugs linked from `src/content/blog/posts/lumelle-journal-launch.ts` and registered slugs in `src/content/blog/index.ts`.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence in code:
- `src/content/blog/posts/lumelle-journal-launch.ts` referenced non-existent slugs:
  - `/blog/frizz-free-showers`
  - `/blog/hair-hooks-that-convert`
  - `/blog/satin-vs-waterproof`
  - `/blog/travel-hair-kit`
- `src/domains/blog/ui/pages/BlogPostPage.tsx` resolves by `slug` and redirects to `/blog` when not found (`if (!post) return <Navigate to="/blog" replace />`).

Repro steps:
1) Open `/blog/lumelle-journal-launch`
2) Click “Full seal guide” (or any of the related links listed above)
3) Observe redirect back to `/blog` because the post can’t be found.

Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

- Impact: 2 (trust hit + broken internal navigation)
- Reach: 3 (affects all readers of this post)
- Effort: 1 (content link fix + tiny routing guard)
- Confidence: 3 (deterministic repro, deterministic fix)
- Decision: **FIX**
- Dependencies: none

## Step 4 — Options
- [x] Option A: Update the article links to existing slugs.
- [x] Option B: Add a legacy slug alias map in routing so old slugs still resolve.
- [x] Option C: Do both (best UX: fixes current content and future-proofs legacy URLs).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option C**: update the content source-of-truth (so new links are correct) and add a tiny alias redirect in `BlogPostPage` (so legacy URLs don’t silently die).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Update broken `/blog/...` hrefs in `lumelle-journal-launch.ts` to valid slugs.
- Add a small `BLOG_SLUG_ALIASES` map in `BlogPostPage` and redirect alias slugs → canonical slugs.
- Run `npm run typecheck`.
- Update tracker.

Acceptance criteria:
- Clicking all internal blog links inside “Welcome to the Lumelle Journal” navigates to a valid post (no redirect back to `/blog`).
- Visiting an alias slug directly (e.g. `/blog/travel-hair-kit`) redirects to the canonical slug and renders the post.

Risks / rollback:
- Very low risk; rollback is deleting the alias map and restoring old hrefs.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Updated content links to valid slugs: `src/content/blog/posts/lumelle-journal-launch.ts`
- Added legacy slug alias redirect support: `src/domains/blog/ui/pages/BlogPostPage.tsx`

Validation:
- `npm run typecheck` (best-effort) ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
  - `src/content/blog/posts/lumelle-journal-launch.ts` (fixed hrefs)
  - `src/domains/blog/ui/pages/BlogPostPage.tsx` (added `BLOG_SLUG_ALIASES`)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Dead internal links were corrected and legacy slugs now redirect to canonical posts instead of silently dumping users back to `/blog`.
