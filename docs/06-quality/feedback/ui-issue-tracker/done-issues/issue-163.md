# Issue 163: `crypto.randomUUID()` is used without a fallback in browser-executed code (can crash on older browsers)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `163`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform`
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

Some browser-executed code calls `crypto.randomUUID()` directly; on browsers/environments without `randomUUID`, it throws at runtime.

Audit (issue 163): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “`crypto.randomUUID()` is used without a fallback in browser-executed code”.

Likely files:
- `src/domains/client/shop/cart/recovery/queue.ts` (cart recovery mutation queue assigns `id: crypto.randomUUID()`)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- `src/domains/client/shop/cart/recovery/queue.ts` calls `crypto.randomUUID()` directly inside `enqueue()`.

Repro (before fix):
1. Use a browser/environment where `crypto.randomUUID` is not defined.
2. Trigger cart recovery enqueue behavior (any path that writes a queued mutation).
3. App throws at runtime when `enqueue()` is called.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a high-intent surface (cart/checkout recovery). A runtime exception here can white-screen or break checkout for a segment of users.
- The fix is very low-risk and local.

## Step 4 — Options
- [x] Option A: Create a shared `safeRandomId()` helper and reuse across the codebase.
- [x] Option B: Add a guarded fallback generator locally inside the cart recovery queue module.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option B** to keep the change tightly scoped (this repo already has multiple UUID helpers; introducing another shared helper adds more surface area).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Add a small `safeRandomId()` helper inside `queue.ts`:
  - Prefer `crypto.randomUUID()` when available
  - Fall back to a stable-ish string (`m_${Math.random().toString(36)...}`) when not
- Use it for queued mutation `id`.

Acceptance criteria:
- `enqueue()` never throws due to missing `crypto.randomUUID`.
- Typecheck passes.

Risks:
- The fallback ID is not cryptographically strong, but it only needs to be unique enough for an in-memory/local queue id.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Replaced direct `crypto.randomUUID()` usage in the cart recovery queue with a guarded helper (fallback when unavailable).

File touched:
- `src/domains/client/shop/cart/recovery/queue.ts`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 163)
- Code refs:
  - `src/domains/client/shop/cart/recovery/queue.ts` (now uses `safeRandomId()` instead of raw `crypto.randomUUID()`)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Cart recovery queue ID generation no longer throws on browsers missing `crypto.randomUUID()`.
