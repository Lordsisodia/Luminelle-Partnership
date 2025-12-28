# Issue 118: Social URL config exists but isn’t used; UI hard-codes social links so env vars can’t fix them

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `118`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform`
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

Social links and contact identity should be driven from canonical config (env‑overrideable), not hard-coded in UI presets.

Audit claim (Issue 118): `docs/reviews/app-ui-review-2025-12-26.md` notes social URL constants exist but some UI/presets hard-code URLs instead.

Likely files:
- `src/config/constants.ts` (canonical env-backed URLs)
- `src/ui/components/GlobalFooter.tsx` (public footer)
- `src/domains/admin/shared/data/componentMeta.ts` (admin default component presets)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence:
- Public footer already uses `INSTAGRAM_URL`/`TIKTOK_URL` from `src/config/constants.ts`.
- Admin default footer preset hard-coded socials + support email in `src/domains/admin/shared/data/componentMeta.ts`, so env overrides wouldn’t propagate.

Repro:
1) Set `VITE_INSTAGRAM_URL` / `VITE_TIKTOK_URL` to a different handle.
2) Observe that public footer updates (uses constants), but admin preset values would remain hard-coded unless also updated.

Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

- Impact: 2 (trust surface drift)
- Reach: 3 (anyone relying on socials/contact, plus ops/admin presets)
- Effort: 1 (swap hard-coded preset values to constants)
- Confidence: 3 (clear + deterministic)
- Decision: **FIX**
- Dependencies: none

## Step 4 — Options
- [x] Option A: Leave presets hard-coded and accept drift.
- [x] Option B: Import canonical config constants into presets and reuse them.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option B** to keep admin defaults aligned with the same env-backed config as the public site.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Update `componentMeta.ts` footer preset to use `SUPPORT_EMAIL`, `INSTAGRAM_URL`, `TIKTOK_URL`.
- Run `npm run typecheck`.

Acceptance criteria:
- No admin footer preset hard-codes socials/support email when canonical constants exist.

Risks / rollback:
- Minimal; rollback is restoring the literal strings.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/domains/admin/shared/data/componentMeta.ts`: footer preset now uses canonical constants.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
  - `src/domains/admin/shared/data/componentMeta.ts`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Canonical, env-backed social/contact config is now reused in admin presets (reduces drift and makes env overrides effective).
