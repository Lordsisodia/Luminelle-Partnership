# Issue 168: Client cart recovery env module mixes `process.env` with `import.meta.env` (browser-unsafe footgun)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `168`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `17`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The cart recovery env helper mixed `process.env` and `import.meta.env`, which is a browser footgun: importing it into client code can crash at runtime if `process` is undefined.

Audit (issue 168): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Client cart recovery env module mixes `process.env` with `import.meta.env` (browser-unsafe footgun)”.

Likely file:
- `src/domains/client/shop/cart/recovery/env.ts`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `env.ts` exported server flags using direct `process.env.*` reads at module scope.
- The same file also exported client flags using `import.meta.env.*`.
- If this module is imported into a browser bundle, direct `process.env` access can throw `ReferenceError: process is not defined` depending on bundler/runtime.

Repro (conceptual):
1. Import `@client/shop/cart/recovery/env` from a browser-executed module.
2. Load the page in a browser where `process` is not polyfilled.
3. Observe runtime crash on module evaluation.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a defensive fix that prevents a class of “works locally, crashes in prod” failures when cart recovery UI is enabled.
- No product decision required.

## Step 4 — Options
- [x] Option A: Guard access to `process.env` (`typeof process !== 'undefined'`) so browser imports degrade safely.
- [ ] Option B: Split into `env.server.ts` and `env.client.ts` and enforce import boundaries (larger refactor).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: smallest change that eliminates the crash risk without requiring refactors across callers.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Replace direct `process.env.*` reads with a guarded `serverEnv` object that is `{}` when `process` isn’t available.

Acceptance criteria:
- Importing this module into browser code does not throw.
- Server-side code can still read real `process.env` values when available.
- `npm run typecheck` passes.

Risks:
- Minimal. In the browser bundle, these server flags now resolve to safe defaults (false/empty), which is the desired behavior.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added a guarded `serverEnv` lookup and routed server-only exports through it to avoid `process` reference errors in the browser.

Files touched:
- `src/domains/client/shop/cart/recovery/env.ts`

Validation:
- Run `npm run typecheck`.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 168)
- Code refs:
  - `src/domains/client/shop/cart/recovery/env.ts` (guarded env access)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Cart recovery env exports no longer crash when imported into browser code; server-only env reads are now safely guarded.
