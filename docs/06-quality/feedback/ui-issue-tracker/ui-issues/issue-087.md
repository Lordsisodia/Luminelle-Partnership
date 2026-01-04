# Issue 087: TikTok section hides the “Watch on TikTok” fallback link on mobile (no escape hatch if embeds fail)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `87`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `4`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `21`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The TikTok carousel hid the only “Watch on TikTok” escape-hatch link on mobile, so when embeds fail (privacy blockers, slow connections), users have no way to open the video directly.

Audit (issue 87): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “TikTok section hides the ‘Watch on TikTok’ fallback link on mobile”.

Likely file:
- `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- The fallback CTA was wrapped in a container with `hidden md:block`, so it only rendered at `md+` breakpoints.

Repro (before fix):
1. Open a PDP (e.g. `/product/lumelle-shower-cap`).
2. Use a mobile viewport (or narrow the window below the `md` breakpoint).
3. Scroll to the TikTok section.
4. Notice there is no “Watch on TikTok” link under each card.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- TikTok embeds are one of the most failure-prone UI elements (blocked iframes, slow third-party).
- A visible fallback link is the minimum reliable “escape hatch”.
- No product decision needed.

## Step 4 — Options
- [x] Option A: Show the “Watch on TikTok” CTA on all breakpoints (simple + consistent).
- [x] Option B: Add a single global “Open on TikTok” button for the active slide only.
- [x] Option C: Make the handle/name a link on mobile.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: simplest, least risky, and preserves per-card context.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Remove the `hidden md:block` wrapper so the fallback link renders on mobile too.

Acceptance criteria:
- On mobile, each TikTok card shows “Watch on TikTok”.
- Links open the correct `s.videoUrl` in a new tab.

Risks:
- Slightly more vertical content per card on mobile (acceptable tradeoff for reliability).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Change:
- Made the per-card “Watch on TikTok” CTA visible across breakpoints.

File touched:
- `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 87)
- Code refs:
  - `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx` (`Watch on TikTok` CTA now visible on mobile)

## Outcome

- Final status: `DONE`
- Final notes: Mobile users now always have a direct TikTok fallback link, even if embeds fail.
