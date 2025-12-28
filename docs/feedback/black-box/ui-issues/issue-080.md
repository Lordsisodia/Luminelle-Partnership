# Issue 080: The same product is linked by multiple URLs/handles (duplicate pages + confusing navigation)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `80`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `4`
- Effort (1–5): `4`
- Confidence (1–3): `2`
- Priority: `12`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The same PDP can be accessed via multiple handles, creating duplicate pages (SEO drift) and confusing navigation/sharing.

Likely files:
- `src/domains/client/shop/products/data/product-config.ts` (keys vs public handles)
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (routing + canonical URL)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (prior to fix).

Evidence:
- `productConfigs` supports both internal keys (e.g. `shower-cap`) and public handles (e.g. `lumelle-shower-cap`).
- `ProductPage` allowed any “known handle” and did not enforce a canonical handle in the URL, so both could remain live.

Repro:
1. Visit `/product/shower-cap` (internal key route).
2. Visit `/product/lumelle-shower-cap` (public handle route).
3. Observe the same product is accessible at multiple URLs.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a routing/SEO correctness fix: pick one canonical URL per product and redirect aliases.
- No backend dependencies required.

## Step 4 — Options
- [x] Option A: (describe)
- [x] Option B: (describe)
- [x] (Optional) Option C: (describe)
- [x] Pick one + rationale (fit with domain architecture).

Option A — Allow multiple handles:
- Easy but creates duplication (SEO + analytics + support confusion).

Option B — Canonicalize in the router (**chosen**):
- Derive a canonical public handle and redirect all aliases to it (`replace` navigation).
- Preserve admin preview paths by rewriting the final `.../product/:handle` segment in-place.

Option C — Only fix via server redirects:
- Useful later, but we still want SPA-level canonicalization for correctness in the app itself.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation plan:
- Add a canonical handle resolver in the PDP route component.
- If the current `:handle` is an alias, redirect to the canonical handle while preserving query/hash.
- Keep the PDP component rendering based on the canonical handle.

Acceptance criteria:
- Visiting `/product/shower-cap` redirects to `/product/lumelle-shower-cap`.
- Visiting `/product/satin-overnight-curler-set` redirects to `/product/satin-overnight-curler`.
- `npm run typecheck` stays green.

Risks/rollback:
- If any external link relies on the alias URL, the redirect preserves behavior and improves SEO consistency.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`
  - Added canonical handle mapping and in-app redirects for alias PDP handles.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Final status: `DONE`

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: PDP URLs now canonicalize to a single “public handle” per product to reduce duplication and confusion.
