# Issue 154: Admin “Pages” UI shows `/{slug}` as if it’s the live route, but `brand-story` doesn’t exist (`/brand` is the real route)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `154`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Admin`
- Impact (1–5): `3`
- Reach (1–5): `2`
- Effort (1–5): `1`
- Confidence (1–3): `3`
- Priority: `17` *(=(3×2×3)−1)*
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: Admin “Pages” currently displays the page URL as `/{slug}`, but at least one page’s actual public route is different (`brand-story` is routed at `/brand`), so the UI communicates the wrong shareable URL.

Audit source + key claim:
- `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `154`
  - “The Pages admin lists and details display pages as `/{slug}` (e.g., `/brand-story`). In the actual router, brand story is served at `/brand`.”

Likely files/components:
- `src/domains/admin/pages/ui/pages/PagesPage.tsx` (renders `/{page.slug}` in list + details)
- `src/App.tsx` (defines the real public route for the brand story page at `/brand`)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence in code:
- `src/domains/admin/pages/ui/pages/PagesPage.tsx`
  - Page data includes `{ slug: 'brand-story', title: 'Brand Story', ... }`
  - UI renders the displayed “route” as `/{page.slug}` in both the list and the details summary.
- `src/App.tsx`
  - Public router mounts the brand story page at `path="/brand"` (not `/brand-story`).

Repro steps (code-level + UI-level):
1. Navigate to `'/admin/pages'`.
2. Observe the “Brand Story” entry displays `'/brand-story'` (derived from `slug`).
3. Navigate to `'/brand'` (public page) — it renders the brand story page; `'/brand-story'` is not a route in `src/App.tsx`.

Verified: **YES** (static mismatch between admin display and router config).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Scores:
- Impact: `3` (admin UI conveys a wrong public URL; likely to cause broken links/bookmarks and QA confusion)
- Reach: `2` (admin surface only, but impacts operational workflows)
- Effort: `1` (localized display fix + small data change)
- Confidence: `3` (verified in code)
- Priority: `17` *(=(3×2×3)−1)*

Decision: `FIX`

Dependencies / constraints:
- This admin “Pages” surface is currently static/mock data; we can still fix the displayed “public route” with a small, explicit mapping.

## Step 4 — Options
- [x] Option A: (describe)
- [x] Option B: (describe)
- [x] Pick one + rationale (fit with domain architecture).

Option A — Add an explicit `publicPath` per page and display it as the authoritative URL.
- Pros: Accurate, minimal, scales to other special-case routes; matches how the router actually works.
- Cons: Requires maintaining the mapping (but admin “Pages” is already static/mock data today).

Option B — Keep showing `/{slug}`, but add a warning/secondary “Actual route: …” for exceptions.
- Pros: Minimal UI change.
- Cons: Still encourages the wrong default mental model (“slug = route”), and requires exception logic anyway.

Selected: **Option A**. The admin list/detail should present the public route (what you’d actually share/bookmark) as the primary value; show `slug` only as metadata when it differs.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation plan:
- Add `publicPath` to the admin page model in `PagesPage.tsx`.
- Populate `publicPath` for all existing mock pages (not just brand story).
- Render `publicPath` as the primary displayed URL in the list and detail header/summary.
- If `publicPath !== /{slug}`, show a small secondary “slug …” label.
- Include `publicPath` in the list search filter.

Acceptance criteria:
- In Admin → Pages list, “Brand Story” shows `/brand` (not `/brand-story`) as the route.
- In Admin → Pages detail, the header and summary show `/brand`, and show `slug brand-story` as secondary metadata.
- Other pages continue to show correct routes (`/creators`, `/terms`, `/privacy`, `/`).

Risks / rollback:
- Low risk: display-only change on a mock admin surface.
- Rollback is reverting `publicPath` usage and restoring `/{slug}` rendering.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implementation notes:
- Updated `src/domains/admin/pages/ui/pages/PagesPage.tsx` to add `publicPath` and render it in list + detail views.

Validation:
- Installed deps (local workspace): `npm ci`
- File-level lint: `npx eslint src/domains/admin/pages/ui/pages/PagesPage.tsx` ✅
- Typecheck: `npm run typecheck` ✅
- Build: `npm run build` ✅
- Note: repo-wide `npm run lint` currently reports many unrelated errors (not introduced by this change); this issue’s change set stays localized and type-safe.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Summary of changes:
- `src/domains/admin/pages/ui/pages/PagesPage.tsx`: add `publicPath` per admin page and display it as the authoritative public route (show `slug` only when it differs).
- `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`: update issue status + scoring.

---

## Evidence / Links

- Code refs:
- `src/domains/admin/pages/ui/pages/PagesPage.tsx` (was `/{slug}`, now uses `publicPath` and shows `slug …` when it differs)
- `src/App.tsx` (brand story public route is `/brand`)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Admin “Pages” no longer implies `/{slug}` is the live public route; “Brand Story” now displays `/brand` as the route and surfaces `brand-story` as a slug-only identifier.
