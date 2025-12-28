# Issue 123: Creator “Leaderboard” claims it updates daily, but it’s hard-coded static data

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `123`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Creator`
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

The “Leaderboard” UI claimed the rankings update daily, but the data is hard-coded static content — which is misleading.

Audit (issue 123): `docs/reviews/app-ui-review-2025-12-26.md` — “Creator ‘Leaderboard’ claims it updates daily, but it’s hard-coded static data”.

Likely files:
- `src/domains/creator/ui/sections/leaderboard/LeaderboardSection.tsx`
- `src/content/landing.ts` (static `leaderboardEntries`)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `leaderboardEntries` is a static array in `src/content/landing.ts`.
- `LeaderboardSection` copy said “We update rankings daily…” and “Updated daily…”, which implies a live data feed.

Repro (before fix):
1. Render the Leaderboard section (wherever it’s included in the creators flow).
2. Observe the copy promises daily updates.
3. Inspect the data source: it’s static content.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Misleading “live” claims are a trust hit, especially for a creator program.
- Real live leaderboard would require a backend/product decision; copy fix is the right scoped action for now.

## Step 4 — Options
- [x] Option A: Update the copy to describe the leaderboard as a snapshot (no “daily updates” claim).
- [ ] Option B: Implement real leaderboard data fetching + updates (bigger scope).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: fixes the misleading claim without introducing backend dependencies.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Replace “update daily” copy with “snapshot” language.
- Keep CTA to join WhatsApp, but remove “live/daily” promises.

Acceptance criteria:
- Leaderboard UI no longer claims daily updates.
- Typecheck passes.

Risks:
- Minimal; copy-only change.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Updated the Leaderboard section copy to remove daily-update claims and describe the table as a snapshot.

Files touched:
- `src/domains/creator/ui/sections/leaderboard/LeaderboardSection.tsx`
- `src/domains/client/marketing/ui/sections/leaderboard/LeaderboardSection.tsx` (duplicate copy; kept consistent)

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 123)
- Code refs:
  - `src/domains/creator/ui/sections/leaderboard/LeaderboardSection.tsx` (copy updated)
  - `src/content/landing.ts` (`leaderboardEntries` is static)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Leaderboard UI copy no longer implies a daily-updating live data feed; it’s presented as a snapshot until a real backend leaderboard exists.
