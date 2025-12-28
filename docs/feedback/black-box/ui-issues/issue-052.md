# Issue 052: PDP “Share” button gives no success feedback and can fail silently

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `52`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

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

The PDP “Share” icon button triggers native share or clipboard copy, but provides no success/error feedback, so it can fail silently and users don’t know what happened.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx` called `navigator.share(...).catch(() => undefined)` or `navigator.clipboard?.writeText(...).catch(() => undefined)` with no UI feedback.

Repro:
1. On a PDP, click the share icon.
2. On browsers without native share, clipboard copy may fail (permissions/HTTP) and there is no feedback.
3. Even on success, the UI doesn’t confirm the action.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- Improves confidence/trust for a common interaction.
- No backend work required.

## Step 4 — Options
- [x] Option A: add a toast/snackbar system and reuse it.
- [x] Option B: add a tiny inline “Copied/Shared” pill near the share icon, with a safe fallback when clipboard is unavailable.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. Low-blast-radius change, localized to the PDP share control.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Add a small ephemeral UI message (“Shared” / “Link copied”) next to the share button.
- Use native share where available; otherwise attempt clipboard copy.
- If clipboard is unavailable/fails, fall back to showing a manual copy prompt.

Acceptance criteria:
- After clicking share:
  - Native share success shows “Shared”.
  - Clipboard copy success shows “Link copied”.
  - Clipboard failure still gives the user a copyable link (prompt) and shows a message.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Added a small pill next to the share icon showing transient success feedback.
- Added a best-effort fallback to `window.prompt` if clipboard APIs are unavailable/fail.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Users now get clear feedback when the share action succeeds, and a fallback path when clipboard APIs aren’t available.
