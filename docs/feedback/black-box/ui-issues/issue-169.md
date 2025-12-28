# Issue 169: Admin Products editor can lose unsaved changes with no warning when switching products

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `169`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Admin`
- Impact (1–5): `5`
- Reach (1–5): `2`
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

The admin product editor had a `dirty` state, but switching routes/products could discard changes with no warning, which is a high-trust UX failure for editors.

Audit (issue 169): `docs/reviews/app-ui-review-2025-12-26.md` — “Admin Products editor can lose unsaved changes with no warning when switching products”.

Likely file:
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `ProductsPage.tsx` computes `dirty` as `JSON.stringify(product) !== snapshots[product.id]`.
- There was no `useBlocker`/`beforeunload`/navigation prompt to prevent route changes when `dirty` was true.

Repro (before fix):
1. Visit `/admin/products/:handle`.
2. Change any field so the header shows “Unsaved changes”.
3. Navigate away (e.g., back to `/admin/products`, click another admin nav item, or switch to another product route).
4. Return: changes are lost with no warning unless you manually saved.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Losing edits is one of the fastest ways to destroy trust in an admin tool.
- No product decision required; we can add a guard at the routing layer.

## Step 4 — Options
- [x] Option A: Use React Router `useBlocker` to prompt on route/path changes when dirty.
- [ ] Option B: Build a custom modal + navigation blocker (more polish, more work).
- [ ] Option C: Auto-save drafts continuously (bigger architectural shift).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: minimal change, immediately prevents silent data loss, and aligns with existing routing-based selection model.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Add `useBeforeUnload` to warn on hard refresh/tab close when dirty.
- Add `useBlocker` to block navigations where the pathname changes (switching products/leaving the editor).
- Use `window.confirm` for now (fast + adequate for admin).
- Do not block query param updates within the same pathname (section/media deep links).

Acceptance criteria:
- When `dirty`, switching products or leaving `/admin/products/:handle` prompts the user to confirm discarding changes.
- Deep-link query param updates within the editor (e.g., `?section=...`) do not trigger prompts.
- `npm run typecheck` passes.

Risks:
- Using a browser confirm dialog has UX rough edges, but it is reliable and prevents silent loss.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added route-change blocking and beforeunload warnings when the editor is dirty.

Files touched:
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`

Validation:
- Run `npm run typecheck`.
- Best-effort manual QA:
  - Make an edit → try to navigate to a different admin route → confirm you get prompted.
  - While dirty, change only `?section=` via the Jump To dropdown → no prompt.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 169)
- Code refs:
  - `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (useBlocker + useBeforeUnload around `dirty`)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: The admin product editor now warns before discarding unsaved changes when switching products or leaving the page.
