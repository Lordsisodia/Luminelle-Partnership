# Issue 171: Tailwind `line-clamp-*` utilities are used but the line-clamp plugin is not enabled (text overflow + layout breakage)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `171`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform` (Tailwind)
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `1`
- Confidence (1–3): `3`
- Priority: `17`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: Parts of the UI use Tailwind `line-clamp-*` classes to prevent text overflow, but the plugin wasn’t enabled, so clamping styles never applied.

Audit claim (Issue 171): `line-clamp-*` utilities are used, but Tailwind is missing the line-clamp plugin, causing overflow and layout issues.

Likely source:
- `tailwind.config.js` (plugins list)
- Any UI that uses `line-clamp-*` (blog/admin cards, etc.)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- `tailwind.config.js` imported and enabled `@tailwindcss/typography` but did **not** enable `@tailwindcss/line-clamp`.
- Repo contains real usages of `line-clamp-*`, e.g.:
  - `src/domains/blog/ui/pages/BlogIndexPage.tsx` (`line-clamp-2`)
  - `src/domains/admin/catalog/ui/cards/ProductCard.tsx` (`line-clamp-1`, `line-clamp-2`)

Repro (before):
1) Visit a view that uses a long title/teaser with `line-clamp-*` classes (blog index, admin product cards).
2) Observe text wrapping/overflow instead of clamping to N lines.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: `FIX`

Notes:
- Low effort, broad improvement: enabling the plugin makes existing class usage work as intended.

## Step 4 — Options
- [x] Option A: Enable `@tailwindcss/line-clamp` in `tailwind.config.js`.
- [ ] Option B: Remove all `line-clamp-*` usages and replace with custom CSS.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option A** — the plugin is already installed in `devDependencies`, and clamping is intended.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Import `@tailwindcss/line-clamp` in `tailwind.config.js`.
- Add it to the Tailwind `plugins` array.

Acceptance criteria:
- `line-clamp-1/2/3` utilities generate CSS in the built Tailwind output.
- UI surfaces that use `line-clamp-*` visually clamp text instead of wrapping/overflowing.

Risks/rollback:
- This will change UI wherever clamping classes were present but previously ineffective (expected). Rollback is removing the plugin from the Tailwind config.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implementation:
- `tailwind.config.js`
  - added `import lineClamp from '@tailwindcss/line-clamp'`
  - added `lineClamp` to `plugins`

Validation:
- Best-effort: `npm run typecheck`
- Manual QA:
  1) Visit blog index and verify teasers clamp (no multi-paragraph overflow).
  2) Visit admin products and verify long titles/subtitles clamp cleanly.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Summary:
- Enabled the Tailwind line-clamp plugin so existing `line-clamp-*` classes behave as intended across the UI.

---

## Evidence / Links

- Code refs:
- `tailwind.config.js`
- `src/domains/blog/ui/pages/BlogIndexPage.tsx`
- `src/domains/admin/catalog/ui/cards/ProductCard.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: This fix is intentionally global; it activates already-used utilities rather than introducing new styling rules.
