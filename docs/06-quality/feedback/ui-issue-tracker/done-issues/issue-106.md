# Issue 106: `Seo` auto-prefixing + titles that already contain “Lumelle | …” yields awkward double-brand tab titles

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `106`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
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

The shared `Seo` component prefixes all titles with `LUMELLE™ | …`, but some pages already pass `title="Lumelle | …"`, resulting in doubled brand titles like `LUMELLE™ | Lumelle | …`.

Audit (issue 106): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “`Seo` auto-prefixing + titles that already contain “Lumelle | …” yields awkward double-brand tab titles”.

Likely file:
- `src/components/Seo.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `Seo` always produced `fullTitle = \`${siteTitle} | ${pageTitle}\``, regardless of whether `pageTitle` was already branded.
- Example page title inputs exist in the codebase (e.g. `title = 'Lumelle | Satin-lined waterproof shower cap'` on the shop landing page), which would become `LUMELLE™ | Lumelle | …`.

Repro (before fix):
1. Visit any page that passes a branded title like `Lumelle | …`.
2. Inspect the `<title>` tag: it shows double branding.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is high reach (affects every route that uses `Seo`).
- Fix is best centralized so we don’t have to hunt through all pages to normalize title strings.

## Step 4 — Options
- [x] Option A: Make `Seo` detect already-branded titles and avoid double-prefixing (central fix).
- [ ] Option B: Remove “Lumelle | …” prefixes from every page manually (lots of churn).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: lowest churn and enforces consistent behavior at the shared SEO layer.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Update `Seo` to:
  - Use `siteTitle` when the provided title is empty or exactly “Lumelle”.
  - If the title already starts with `Lumelle | …` (or similar separators), normalize it to a single `LUMELLE™ | …`.
  - Otherwise prefix as normal.

Acceptance criteria:
- Titles never render as `LUMELLE™ | Lumelle | …`.
- Existing pages that pass “Lumelle | …” become consistent as `LUMELLE™ | …`.
- Typecheck passes.

Risks:
- Very low; only string formatting for `<title>` and OG/Twitter titles.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added a small normalization step inside `Seo`’s title formatting to avoid double-branding.

Files touched:
- `src/components/Seo.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 106)
- Code refs:
  - `src/components/Seo.tsx` (title normalization logic)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: `Seo` now avoids doubled brand prefixes, making tab titles and share previews cleaner and consistent across the app.
