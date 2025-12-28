# Issue 151: JSON-LD structured data uses relative URLs (logo/images), which can break rich results

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `151`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

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

Some JSON‑LD schemas used relative URLs for fields like `Organization.logo` and `Product.image`, which can cause validators/crawlers to ignore or degrade rich results.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx` used `jsonLd.logo: cdnUrl('/l-icon.svg')` (often relative).
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` used `productJsonLd.image: [heroImage]` where `heroImage` is typically `/uploads/...` (relative).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a silent SEO/share quality failure: the UI looks fine, but rich results can miss key images/logos.
- We already have a `publicBaseUrl` helper (issue 104) that can normalize URLs safely.

## Step 4 — Options
- [x] Option A: Normalize JSON‑LD URLs to absolute at generation time (prefix with `publicBaseUrl`).
- [x] Option B: Make the SEO component post-process JSON‑LD objects (harder to do reliably).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** because it’s explicit, low-risk, and keeps schema generation honest per-route.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Update `Organization.logo` and `Product.image` in JSON‑LD to use `toPublicUrl(...)`.

Acceptance criteria:
- JSON‑LD `logo` and `image` values are absolute URLs (or already-absolute CDN URLs).

Risks:
- None significant; `toPublicUrl()` is a no-op for already-absolute URLs.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 151)
- Code refs:
  - `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx` (JSON‑LD logo now absolute)
  - `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (JSON‑LD product image now absolute)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: JSON‑LD logo and product image now normalize to absolute URLs via `toPublicUrl(...)`.
