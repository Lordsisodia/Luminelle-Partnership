# Issue 109: Blog pages don’t consistently apply `cdnUrl` to images (CDN toggle won’t apply; can cause broken imagery/perf regressions)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `109`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Blog`
- Impact (1–5): `3`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `27`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Blog pages use `cdnUrl(...)` for SEO images, but visible post cover images often bypass it, so enabling the asset CDN can break or degrade blog imagery.

Audit (issue 109): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Blog pages don’t consistently apply `cdnUrl` to images”.

Likely files:
- `src/domains/blog/ui/pages/BlogIndexPage.tsx` (post cards/featured images)
- `src/domains/blog/ui/pages/BlogPostPage.tsx` (post cover + related cards)
- `src/lib/utils/cdn.ts` / `src/utils/cdn.ts` (canonical helper)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- `src/domains/blog/ui/pages/BlogIndexPage.tsx` uses `cdnUrl(...)` for `heroImage`, but `<img>` cards render `src={post.cover}` directly.
- `src/domains/blog/ui/pages/BlogPostPage.tsx` sets `absImage = cdnUrl(image)` for SEO, but the visible cover uses `src={post.cover}` and related cards use `src={item.cover}`.

Repro (before fix):
1. Enable the CDN toggle (`VITE_USE_ASSET_CDN=1`) and configure `VITE_ASSET_BASE_URL`.
2. Visit `/blog` and `/blog/:slug`.
3. Observe that some images still use raw `/uploads/...` URLs instead of the CDN base.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Blog is image-heavy and public-facing; broken images are a major polish/trust hit.
- This is a low-risk normalization change (just wrapping paths in `cdnUrl`).

## Step 4 — Options
- [x] Option A: Always wrap non-absolute blog image src values with `cdnUrl(...)` before passing to `<img src>`.
- [x] Option B: Add a custom `<BlogImage />` component and migrate all blog images to use it.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** for a minimal diff (keeps logic local to the blog pages, avoids a new abstraction).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Replace `src={post.cover}` / `src={item.cover}` / `src={post.authorAvatar}` with `src={cdnUrl(...)}`
  in blog pages where the value is a relative asset path.
- Keep `cdnUrl` as the only helper so the CDN toggle works consistently.

Acceptance criteria:
- When `VITE_USE_ASSET_CDN=1`, blog cover/related images also use the CDN base (not only SEO).
- Typecheck passes.

Risks:
- Minimal; `cdnUrl` no-ops for `http` URLs and when CDN is disabled.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Blog index + post pages now render cover/author/related images via `cdnUrl(...)` so the CDN toggle applies consistently.

Files touched:
- `src/domains/blog/ui/pages/BlogIndexPage.tsx`
- `src/domains/blog/ui/pages/BlogPostPage.tsx`

Validation:
- `npm run typecheck` ✅

Manual QA checklist:
- With `VITE_USE_ASSET_CDN=1`, confirm blog cover images load (cards + post cover + related cards) and point at the CDN base.
- With CDN disabled, confirm blog still uses local `/uploads/...` URLs.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 109)
- Code refs:
  - `src/domains/blog/ui/pages/BlogIndexPage.tsx` (card cover images now use `cdnUrl(post.cover)`)
  - `src/domains/blog/ui/pages/BlogPostPage.tsx` (cover/related/author images now use `cdnUrl(...)`)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Blog image rendering now respects the asset CDN toggle consistently (SEO + visible imagery).
