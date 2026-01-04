# Issue 166: Checkout attribution writes to `localStorage`/cookies without guarding storage failures (can crash checkout in privacy-restricted browsers)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `166`
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

Checkout attribution/identity attempted to read/write `localStorage` and set cookies without guarding failures, which can throw in privacy-restricted contexts and break checkout flows.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `src/experiments/identity.ts` used `localStorage.getItem/setItem` and `document.cookie = ...` directly.
- In Safari private mode / storage-disabled contexts, storage calls can throw (e.g. `QuotaExceededError` / `SecurityError`).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Checkout is conversion-critical; analytics/attribution must never block checkout.
- Best-effort storage writes are sufficient (skip persistence if blocked).

## Step 4 — Options
- [x] Option A: Wrap storage/cookie operations in `try/catch` and fall back to in-memory ids.
- [x] Option B: Remove attribution entirely.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: preserve attribution when possible, but degrade safely with no runtime crashes.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Add safe wrappers around `localStorage` and `document.cookie` reads/writes.
- Store anon/session ids in an in-memory window cache when persistence is unavailable.

Acceptance criteria:
- If `localStorage` throws, checkout still proceeds and attribution functions still return an id (in-memory).
- No HTML/JS errors triggered by storage access in privacy-restricted browsers.

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

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 166)
- Code refs:
  - `src/experiments/identity.ts` (safe storage wrappers + in-memory fallback)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Attribution identity no longer risks crashing checkout due to storage/cookie failures.
