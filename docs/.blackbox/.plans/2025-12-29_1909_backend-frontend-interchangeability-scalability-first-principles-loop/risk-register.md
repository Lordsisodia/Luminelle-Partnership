# Risk Register (swap-friendly architecture)

This file tracks the top risks/unknowns that could block “swappable UI + swappable providers + multi-tenant”.

Evidence anchors:
- Vendor leak gate exists but is not yet “clean”: `artifacts/snapshots/check-vendor-leaks.txt`
- Cloudflare backend surface exists: `artifacts/snapshots/cloudflare-api-surface.rg.txt`
- Supabase coupling is present across repo: `artifacts/snapshots/supabase-repo-matches.rg.head400.txt`

---

## R1 — Vendor ID leakage above adapters

- Why it matters: a new frontend would need Shopify-specific knowledge, breaking swappability.
- Evidence: `artifacts/snapshots/coupling-shopify-gid-matches.txt` and gate output `artifacts/snapshots/check-vendor-leaks.txt`.
- Mitigation: Stage 1 in `migration-stages.md` + hard gate G3 in `acceptance-gates.md`.

## R2 — Multi-tenant correctness (cache + auth + DB isolation)

- Why it matters: “one backend for many clients” is risky without deterministic tenant resolution.
- Evidence: tenancy rules doc `tenancy-context-rules.md` and Supabase coupling snapshot `artifacts/snapshots/supabase-repo-matches.rg.head400.txt`.
- Mitigation: Stage 3–5 in `migration-stages.md`; implement tenant-aware cache key rules (host-first).

## R3 — Cloudflare edge/runtime limitations vs legacy assumptions

- Why it matters: some server patterns (Node/Vercel) don’t translate directly to Cloudflare.
- Evidence:
  - Cloudflare Pages Functions surface exists (Fetch-style handlers): `artifacts/snapshots/cloudflare-api-surface.rg.txt`
  - Repo contains both Cloudflare and legacy Vercel-shaped surfaces (top-level inventory): `artifacts/snapshots/repo-top-level.ls.txt`
  - Legacy `api/**` route tree exists alongside `functions/**` (file inventory): `artifacts/snapshots/api-files.find.txt`
  - Normalized endpoint diff (quantifies surface drift): `artifacts/snapshots/api-vs-functions.summary.txt`
- Mitigation: keep `/api/*` on Fetch-style handlers only (`functions/api/**`) and treat `api/**` as legacy snapshot.
