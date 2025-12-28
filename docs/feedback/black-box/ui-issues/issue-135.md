# Issue 135: `Seo` allows relative `og:image` / `twitter:image` URLs (share previews can fail)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `135`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform`
- Impact (1–5): `2`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `17`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The `Seo` component allowed relative `og:image`/`twitter:image` URLs, which can cause social share previews (Slack/iMessage/Twitter) to fail because crawlers typically require absolute URLs.

Audit (issue 135): `docs/reviews/app-ui-review-2025-12-26.md` — “`Seo` allows relative `og:image` / `twitter:image` URLs”.

Likely file:
- `src/components/Seo.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `Seo` rendered `<meta property="og:image" content={image} />` and `<meta name="twitter:image" content={image} />` with whatever string was provided (often `/uploads/...`).

Repro (before fix):
1. Visit a page that sets `Seo image` to a relative path (e.g. `/` or a PDP).
2. Inspect the head tags: `og:image` and `twitter:image` are relative.
3. Share the URL in a scraper-based platform (Slack/Twitter) and observe previews can fail or show no image.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This impacts every shared link and harms perceived brand quality.
- No product decision needed.

## Step 4 — Options
- [x] Option A: Resolve relative URLs to absolute using `toPublicUrl(...)` (preferred).
- [ ] Option B: Require every call site to pass absolute URLs (easy to miss / drift risk).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: centralizing the fix in `Seo` prevents future drift and ensures consistency.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- In `Seo`, normalize `url` and `image` via `toPublicUrl(...)` when they are relative.
- Guard against special schemes (`data:`, `blob:`, `video://`) so they aren’t incorrectly rewritten.

Acceptance criteria:
- `og:image` and `twitter:image` are absolute URLs when `image` is relative.
- `og:url` and canonical are absolute even if a relative `url` is passed.
- Typecheck passes.

Risks:
- Minimal; only affects meta tags (no runtime rendering changes).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Updated `Seo` to resolve relative `url`/`image` values into absolute URLs using `toPublicUrl`.

File touched:
- `src/components/Seo.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 135)
- Code refs:
  - `src/components/Seo.tsx` (`og:image` + `twitter:image` now use absolute URLs)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Share previews are now more reliable because `og:image`/`twitter:image` are always absolute when given relative paths.
