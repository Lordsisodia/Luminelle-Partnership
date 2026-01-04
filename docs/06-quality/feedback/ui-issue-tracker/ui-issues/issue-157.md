# Issue 157: PDP meta description (and Product JSON-LD description) always appends “Blocks steam…” even for non-shower-cap products

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `157`
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

The PDP was appending shower-cap-specific copy (“Blocks steam…”) into meta descriptions and Product JSON‑LD for every product, including non-shower-cap products.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` appended the same “Blocks steam…” sentence to:
  - `<Seo description=... />`
  - `productJsonLd.description`

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Meta/share descriptions must be product-accurate; incorrect copy is a trust hit and hurts SEO/share quality.
- No product decision required; we can remove the incorrect universal append.

## Step 4 — Options
- [x] Option A: Remove the hard-coded append and use `productDesc` (plus a generic suffix).
- [x] Option B: Add per-product suffix fields in config/CMS and append conditionally.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** for correctness now (generic “Free returns…” suffix, no incorrect shower-cap claim).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Introduce a `metaDescription` derived from `productDesc` with a generic suffix.
- Use the same `metaDescription` for `<Seo />` and `productJsonLd.description`.

Acceptance criteria:
- Non-shower-cap PDPs no longer claim “Blocks steam…” in meta description or JSON‑LD.

Risks:
- None; this removes an incorrect claim and keeps descriptions consistent across surfaces.

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

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 157)
- Code refs:
  - `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (metaDescription no longer appends shower-cap copy)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: PDP meta description + Product JSON‑LD description are now product-accurate and no longer include a universal “Blocks steam…” claim.
