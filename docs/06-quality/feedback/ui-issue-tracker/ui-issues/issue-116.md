# Issue 116: `index.html` structured data advertises a site search (`SearchAction`) but search UX/data is not real

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `116`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `4`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `37`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

`index.html` advertised a `WebSite` `SearchAction` schema, implying a real on-site search, but the in-app search UX/data is still stubbed (hard-coded catalog + dead links).

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `index.html` included JSON‑LD `SearchAction` targeting `/search?q=...`.
- The `/search` route is currently driven by a hard-coded catalog and contains dead `href: '#'` items (separate issue), so advertising search engine capabilities is misleading.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Schema should not claim capabilities the product doesn’t actually deliver.
- Removing it reduces SEO “promise vs reality” drift until search is real.

## Step 4 — Options
- [x] Option A: Remove `SearchAction` from JSON‑LD until real search exists.
- [x] Option B: Implement real search and keep `SearchAction`.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** (truthful schema now; re-add later when search is backed by real data).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Edit the `WebSite` JSON‑LD block in `index.html` to remove `potentialAction` / `SearchAction`.

Acceptance criteria:
- `index.html` no longer includes a `SearchAction` schema.

Risks:
- Slightly less rich snippet potential until real search is shipped (acceptable trade-off).

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

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 116)
- Code refs:
  - `index.html` (removed `SearchAction` from `WebSite` JSON‑LD)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Removed misleading `SearchAction` schema until the app has a real search experience.
