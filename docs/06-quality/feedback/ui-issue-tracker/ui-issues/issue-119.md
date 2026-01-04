# Issue 119: TikTok embeds are inconsistently sandboxed across pages (inconsistent behavior + privacy/security risk)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `119`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `1`
- Confidence (1–3): `3`
- Priority: `17` (=(2×3×3)−1)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: All TikTok iframe embeds should use the same sandbox policy, so behavior is predictable and the app applies a consistent privacy/security posture.

Audit claim (Issue 119): Some TikTok embeds include a restrictive `sandbox` attribute while others don’t (notably the featured TikTok section), leading to inconsistent behavior and increased third‑party risk.

Likely sources:
- Sandboxed embeds: `src/domains/client/marketing/ui/sections/success/SuccessStoriesSection.tsx`, `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx`
- Unsandboxed embeds: `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence:
- `SuccessStoriesSection` iframes include `sandbox="allow-scripts allow-same-origin allow-presentation"`.
- `BrandStoryPage` creator-story iframes include the same sandbox attribute.
- `FeaturedTikTok` iframe did **not** include a sandbox attribute.

Repro:
1) Visit a PDP with featured TikTok section.
2) Compare iframe attributes (DevTools) against the marketing success/brand pages — featured section iframe lacked sandbox.

Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

- Decision: **FIX**
- Dependencies: none

## Step 4 — Options
- [x] Option A: Add the existing sandbox attribute to `FeaturedTikTok` iframes to match other pages.
- [x] Option B: Remove sandbox everywhere (not recommended).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: consistent, low‑risk, and matches the established embed policy already used elsewhere in the app.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Add `sandbox="allow-scripts allow-same-origin allow-presentation"` to the `FeaturedTikTok` iframe.
- Run `npm run typecheck`.
- Update tracker/worklog.

Acceptance criteria:
- TikTok iframes in `FeaturedTikTok` include the same sandbox attribute as other embed surfaces.
- No TypeScript errors introduced.

Risks / rollback:
- Low; TikTok embeds should continue to render. Rollback is removing the sandbox attribute if it causes any breakage.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx`: added sandbox attribute to the TikTok iframe.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: TikTok embed sandbox policy is now consistent across featured/product and marketing pages.
