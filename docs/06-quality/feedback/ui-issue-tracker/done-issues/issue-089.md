# Issue 089: Non-standard Tailwind utilities are used in production UI (silent styling failures)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `89`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `4`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `13`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Some UI components use Tailwind utility classes that don’t exist in the default Tailwind scales (and aren’t configured in `tailwind.config.js`), so the intended styles silently don’t apply.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence (from `dev` before fix):
- `src/ui/components/PublicHeader.tsx` used `duration-400` (not in Tailwind’s default duration scale).
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx` used `py-1.25` (not in Tailwind’s default spacing scale).
- `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx` used `dragging:cursor-grabbing` (custom variant not configured, so it never applied).

Repro (visual):
1. Observe the promo strip fade timing in the header (duration mismatch).
2. Observe the curler launch pill vertical padding (class not applied).
3. Observe the TikTok scroller cursor affordance while dragging (variant never triggers).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- These are “silent failures” (no errors, just missing styles), which are easy to miss during review and add up as polish debt.
- No backend or product decision needed; we can replace with valid Tailwind utilities.

## Step 4 — Options
- [x] Option A: Extend Tailwind config to support these exact values (e.g. add `400ms`, `1.25` spacing, custom `dragging` variant).
- [x] Option B: Replace with existing Tailwind utilities and remove the unused “custom variant” expectations (preferred for low-blast-radius fixes).
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. These are one-off usages; swapping to standard utilities avoids expanding the Tailwind surface area unnecessarily.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Replace invalid utilities with valid equivalents:
  - `duration-400` → `duration-300`
  - `py-1.25` → `py-1.5`
  - remove `dragging:cursor-grabbing` and rely on `active:cursor-grabbing`
- Remove any now-unused “dragging” class toggles.
- Run `npm run typecheck`.

Acceptance criteria:
- `rg "duration-400|py-1\\.25|dragging:cursor-grabbing" src` returns no matches.
- Site still builds/typechecks.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/ui/components/PublicHeader.tsx`: `duration-400` → `duration-300`.
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx`: `py-1.25` → `py-1.5`.
- `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx`: removed `dragging:cursor-grabbing` and removed the unused `el.classList.add/remove('dragging')` calls.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/ui/components/PublicHeader.tsx`
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx`
- `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Replaced invalid Tailwind classes with standard utilities so styling consistently applies and doesn’t silently fail.
