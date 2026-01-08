# Issue 104: Canonical URLs / breadcrumb JSON-LD / share links hard-code `https://lumelle.com` (breaks on staging/custom domains)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `104`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform`
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

Several pages hard-coded `https://lumelle.com` when generating canonical URLs + JSON‑LD breadcrumbs/share links, so staging/custom domains would emit metadata pointing at the wrong host.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Repro (before fix):
1. Run the app on any non‑production host (local, preview, staging).
2. Visit `/blog`, `/product/:handle`, `/search`, `/terms`, etc.
3. Canonical + JSON‑LD breadcrumb `item` URLs point at `https://lumelle.com/...` instead of the current host.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Wrong canonicals and OG/share URLs are a high‑impact polish + SEO correctness issue.
- No product decision needed; this is purely URL construction.

## Step 4 — Options
- [x] Option A: Centralize `publicBaseUrl` (env-driven) + use it everywhere.
- [x] Option B: Switch all pages to `window.location.origin` directly (no env override).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** so production/staging can set an explicit canonical host via env, while still having a safe client-side fallback.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Add a shared `toPublicUrl()` helper that uses `VITE_PUBLIC_BASE_URL` (or `PUBLIC_BASE_URL`) if configured, else falls back to `window.location.origin`.
- Replace hard-coded `https://lumelle.com` values in SEO/canonical/JSON‑LD on affected pages.
- Update the legacy `SEO` component’s default meta image URL to be host-aware.

Acceptance criteria:
- On a staging/custom host, canonical + JSON‑LD breadcrumb URLs use the current host (or configured base).
- Copy/share URLs on blog posts use the correct host.

Risks:
- If env is misconfigured (wrong base), canonicals will be wrong. Fallback to `window.location.origin` mitigates most dev/preview cases.

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

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 104)
- Code refs:
  - `src/domains/platform/seo/logic/publicBaseUrl.ts` (new helper; supports `VITE_PUBLIC_BASE_URL`)
  - `src/domains/blog/ui/pages/BlogIndexPage.tsx` (blog canonical + breadcrumbs)
  - `src/domains/blog/ui/pages/BlogPostPage.tsx` (post canonical + breadcrumbs + copy/share URL)
  - `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx` (home canonical)
  - `src/domains/client/shop/products/ui/pages/SearchResultsPage.tsx` (search canonical + breadcrumbs)
  - `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (PDP canonical + breadcrumbs)
  - `src/domains/client/marketing/ui/pages/TermsPage.tsx` / `PrivacyPage.tsx` / `WelcomePage.tsx` / `BriefPage.tsx` (legal/creator canonicals)
  - `src/ui/components/SEO.tsx` (default OG image URL now host-aware)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Canonical + JSON‑LD URLs are now host-aware via a single `publicBaseUrl` helper (env + runtime fallback).
