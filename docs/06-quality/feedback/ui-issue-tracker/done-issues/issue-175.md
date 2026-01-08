# Issue 175: Welcome page “Copy invite link” failure has no user-visible fallback (onboarding friction)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `175`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Creator`
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

The Welcome page “Copy invite link” action could fail silently (console error only), leaving creators unsure what to do next.

Audit claim (from `docs/06-quality/reviews/app-ui-review-2025-12-26.md`, Issue 175):
- Clipboard copy failures only log to console and provide no user-visible fallback or alternate way to get the link.

Likely files:
- `src/domains/client/marketing/ui/pages/WelcomePage.tsx` (`handleCopyLink`)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (prior to fix).

Evidence:
- `WelcomePage.tsx` previously did `navigator.clipboard.writeText(...)` inside a `try/catch`.
- On failure, it only did `console.error(...)` and did not surface any UI feedback or fallback link-copy method.

Repro:
1. Open `/welcome`.
2. In a restricted environment where Clipboard API fails (permission denied, non-secure context, older browser/webview), click “Copy invite link”.
3. Observe no visible fallback (only console error).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is an onboarding surface; copy/share actions should be deterministic and always provide a fallback.
- No backend dependencies required.

## Step 4 — Options
- [x] Option A: (describe)
- [x] Option B: (describe)
- [x] (Optional) Option C: (describe)
- [x] Pick one + rationale (fit with domain architecture).

Option A — Keep current behavior:
- Not acceptable for a primary onboarding action (silent failures).

Option B — Add fallback + user-visible message (**chosen**):
- If clipboard isn’t available or fails, fall back to `window.prompt(...)`.
- Show a visible inline status + display the invite URL so users can copy manually.
- Announce feedback via `aria-live`.

Option C — Build a full toast system:
- Overkill for a single action; can be done later if we want consistent toasts across the app.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation plan:
- Track a copy feedback state (`success`/`error` + message).
- On copy click:
  - Prefer `navigator.clipboard.writeText` when available.
  - Otherwise show `window.prompt` with the invite URL.
  - On failure, show `window.prompt` and render the invite URL inline as a fallback.
- Auto-dismiss feedback after a short delay.

Acceptance criteria:
- If clipboard copy works, show “Invite link copied”.
- If clipboard copy fails or is unavailable, users see a fallback prompt and the invite URL rendered in the UI.
- `npm run typecheck` stays green.

Risks/rollback:
- Minimal; only affects one button click path on `/welcome`.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
  - Added an inline feedback box for copy success/failure.
  - Added a deterministic fallback using `window.prompt('Copy this invite link:', inviteLink)` when clipboard copy fails/unavailable.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Final status: `DONE`

---

## Evidence / Links

- Code refs:
- `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Clipboard failures are no longer silent — creators get an immediate fallback and can always retrieve the invite link.
