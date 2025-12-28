# Issue 099: Support/contact + social identity is inconsistent across surfaces (trust drift)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `99`
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

Support contact info and social identity drift across UI + metadata (different emails/handles shown in different places), which erodes trust.

Audit claim (Issue 99): `docs/reviews/app-ui-review-2025-12-26.md` calls out blog footer using `hello@lumelle.com` while site constants use `info@lumellebeauty.co.uk`, and `index.html` JSON‑LD `sameAs` using `lumellehair` while the footer links to `lumelleuk`.

Likely files:
- `src/domains/blog/ui/pages/BlogPostPage.tsx`
- `index.html`
- `src/config/constants.ts` (canonical values)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence in code:
- Blog post page hard-coded: `src/domains/blog/ui/pages/BlogPostPage.tsx` contained “Have feedback? Email hello@lumelle.com”.
- Metadata drift: `index.html` JSON‑LD `sameAs` listed `lumellehair` socials, while UI uses `lumelleuk` constants (`src/config/constants.ts`).

Repro:
1) Open any blog post page (e.g. `/blog/lumelle-journal-launch`) and scroll to the author/footer card → see email.
2) View page source → `index.html` JSON‑LD → see `sameAs` values.

Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

- Impact: 2 (trust drift)
- Reach: 3 (anyone looking for contact/social)
- Effort: 1 (string replacement + reuse constants)
- Confidence: 3 (clear, deterministic)
- Decision: **FIX**
- Dependencies: none

## Step 4 — Options
- [x] Option A: Update UI copy to use `SUPPORT_EMAIL` and align JSON‑LD `sameAs` with canonical social URLs.
- [x] Option B: Add a single “brand identity” config module and generate JSON‑LD at runtime (heavier refactor).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: smallest change set with immediate trust impact.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Replace blog hard-coded email with `SUPPORT_EMAIL` and a `mailto:` link.
- Update `index.html` JSON‑LD `sameAs` to match `lumelleuk` social URLs.
- Run `npm run typecheck`.

Acceptance criteria:
- Blog pages no longer show `hello@lumelle.com`.
- JSON‑LD `sameAs` matches the same Instagram/TikTok handles used in the footer.

Risks / rollback:
- Low; rollback is reverting the string changes.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/domains/blog/ui/pages/BlogPostPage.tsx`: uses `SUPPORT_EMAIL` instead of a hard-coded address.
- `index.html`: updated JSON‑LD `sameAs` to the `lumelleuk` handles.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
  - `src/domains/blog/ui/pages/BlogPostPage.tsx` (support email copy)
  - `index.html` (JSON‑LD `sameAs`)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Support email and social identity are now consistent across UI + metadata.
