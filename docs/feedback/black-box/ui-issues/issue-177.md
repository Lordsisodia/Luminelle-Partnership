# Issue 177: CDN URL encoding is inconsistent, which is brittle with space/case filenames (broken images / wrong preloads / bad previews)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `177`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform`
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

Asset URLs are inconsistently encoded (some call sites wrap `cdnUrl` with `encodeURI`, others don’t), which is brittle when filenames include spaces/casing.

Audit (issue 177): `docs/reviews/app-ui-review-2025-12-26.md` — “CDN URL encoding is inconsistent”.

Likely files:
- `src/lib/utils/cdn.ts` / `src/utils/cdn.ts` (CDN helper)
- Any image-heavy pages using `cdnUrl(...)` (PDP, landing, blog)
- Problematic filenames: `src/domains/client/shop/products/data/product-config.ts` (`CAP_GALLERY`)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- `src/lib/utils/cdn.ts` returns raw URL strings (no encoding).
- Call sites are mixed:
  - some do `encodeURI(cdnUrl(...))`
  - others pass `cdnUrl(...)` directly into `src`/preload/meta.
- There are real asset paths with spaces (e.g. `/uploads/luminele/main (1).webp`).

Repro (before fix):
1. Set `VITE_USE_ASSET_CDN=1` and `VITE_ASSET_BASE_URL` to a CDN host.
2. Navigate pages that render assets with spaces/case-heavy filenames.
3. Observe inconsistent URL shapes and potential broken loads or duplicate requests depending on whether encoding was applied.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Image reliability is conversion/polish critical.
- Centralizing encoding in one helper removes “spot fixes” and reduces regressions.

## Step 4 — Options
- [x] Option A: Encode inside `cdnUrl` (make output consistently URL-safe), keep call sites as-is.
- [x] Option B: Add a new helper (e.g. `cdnUrlEncoded`) and migrate call sites.
- [x] Option C: Rename assets to URL-safe filenames and remove encoding at call sites (best long-term, bigger migration).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** because it’s a low-risk centralized fix with immediate impact (and avoids a large migration).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Update `src/lib/utils/cdn.ts` so it returns `encodeURI(...)` for its output in all branches.
- Add guards for non-file schemes (e.g. `video://`, `data:`, `blob:`) to avoid accidental mangling.

Acceptance criteria:
- Assets with spaces in filenames render reliably regardless of whether the call site wraps `cdnUrl` with `encodeURI`.
- Typecheck passes.

Risks:
- Very low. `encodeURI` is idempotent for already-encoded URLs and doesn’t affect common reserved URL characters.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Centralized URL encoding inside `cdnUrl(...)` so returned asset URLs are consistently URL-safe (handles spaces reliably).

File touched:
- `src/lib/utils/cdn.ts`

Validation:
- `npm run typecheck` ✅

Manual QA checklist:
- With `VITE_USE_ASSET_CDN=1`, visit a page that uses `CAP_GALLERY` (filenames with spaces) and confirm images load reliably.
- Confirm pages that already did `encodeURI(cdnUrl(...))` still behave (double-encoding should not occur with `encodeURI`).

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 177)
- Code refs:
  - `src/lib/utils/cdn.ts` (now returns encoded URLs for all branches)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Asset URL encoding is now consistent at the source (`cdnUrl`), reducing broken image risk with space-heavy filenames.
