# Summary (Prompt 1)

## Invariants agreed
- Frontend swappable: UI swaps should not require rewriting provider integrations.
- Backend stable: provider mapping + error semantics + tenancy resolution live behind a stable boundary.
- Tenancy-ready: every request has an explicit tenant context (even if single-tenant today).
- Scalable both ends: edge caching + backend caching + DB access strategy.

## Acceptance checks agreed
- No provider adapters imported by UI/product domains (enforcement scans):
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-adapter-imports.rg.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`
- No vendor IDs above adapters (measurable gate output; target to make “clean” when code changes are allowed):
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`
- Provider selection centralized in platform runtimes (inventory + runtime heads):
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-runtime-files.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-runtime.ts.head.txt`
- Standard error semantics via `PortError` (evidence anchor):
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`

## Next inspection set
- See `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/inspect-first.md`

---

# Summary (Prompt 3)

## Boot/composition summarized
- Boot and global providers are captured in: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/boot-composition.md`

## Backend boundary contract drafted → promoted (v1)
- Current canonical `/api/*` contract is: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/backend-boundary-contract-v1.md`
- Historical earlier draft (kept for context only): `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/backend-boundary-contract-v0.md`

---

# Summary (Prompt 4)

## Scalability plan drafted
- Edge/UI + backend + Supabase scaling plan is in:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/scalability-plan.md`

---

# Summary (Prompt 5)

## Tenancy context rules drafted
- Deterministic tenant resolution + propagation rules (host-first, auth-as-restriction, cache-safe) are in:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/tenancy-context-rules.md`
- Contract v1 includes tenancy propagation and tenancy-aware caching requirements:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/backend-boundary-contract-v1.md`

---

# Summary (Prompt 6)

## Runbooks + catalogs added (to make implementation “checklistable”)
- Acceptance gates are now runnable via copy/paste commands (and write evidence into `artifacts/snapshots/`):
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/acceptance-gates-runbook.md`
- Swappable components are now explicitly cataloged (what to swap + where it lives + acceptance checks):
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/architecture-component-catalog.md`
- External research carry-in is pinned to local evidence snapshots (so the plan is self-contained):
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/external-research-notes.md`

---

# Summary (Prompts 7–18)

## Contract automation added (v1.1 table + gaps report)

- The `/api/*` surface implemented in `functions/api/**` is now inventoried and turned into a machine-derived endpoint table (v1.1).  
  Evidence inputs/outputs:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-cues.matrix.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/backend-boundary-contract-v1.1-endpoint-table.md`

- A heuristic contract gaps report is generated from the cue scan to guide sequencing (auth wiring, cache headers).  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/contract-gaps-report-v1.1.md`

## Continuous evidence refresh + dashboard

- “Swappability gates” are runnable and refreshable via one command (plus a stop-point dashboard summarizing risk signals).  
  Evidence:  
  - `docs/.blackbox/scripts/refresh-1909-all-gates.sh`  
  - `docs/.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/stop-point-status-dashboard.md`

## Canonicalization (avoid plan sprawl)

- The plan now has a canonical map + artifact map so the “best approach” doesn’t regress as docs grow.  
  Evidence:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/CANONICAL.md`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifact-map.md`

## Canonical boundary drift surfaced + triaged (P0.3)

- A normalized drift diff between `api/**` and `functions/api/**` now exists, making “single canonical backend boundary” measurable.  
  Evidence:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.txt`

- The api-only endpoint set was triaged by repo usage so consolidation work is scoped and high-leverage (UI-called endpoints first).  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`

- Key legacy api-only implementations were snapshotted to de-risk migration into `functions/api/**` (newsletter, cloudinary, media).  
  Evidence:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-newsletter-subscribe.ts.head260.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-cloudinary-sign.ts.head260.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-admin-media-upsert.ts.head260.txt`

## Execution got “PR-sized” (detailed wiring plans)

- Detailed, implementation-ready plans exist for PR 2–PR 8 (auth guards, tenant resolution, cache headers, tenancy tables, tenant integration config lookup, key mapping, tenant #2 onboarding).  
  Evidence entrypoint: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/pr-by-pr-stop-points-plan.md`

---

# Summary (Prompt 19)

## P0.3 ambiguity removed + swappable seams summarized

- Resolved the remaining P0.3 “INVESTIGATE” endpoints by reading the actual Shopify webhook registration surfaces (install callback + CLI webhook registration script). The checkouts webhook endpoints are now explicitly treated as deferred legacy unless the topic set changes.  
  Evidence:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-shopify-auth-callback.ts.head240.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/scripts-register-webhooks.mjs.head220.txt`

- Captured explicit snapshots for the remaining deferred legacy endpoints (billing/settings/sync/og + checkouts webhooks) so future consolidation work doesn’t require re-reading the repo.  
  Evidence:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-shopify-billing-create.ts.head260.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-shopify-settings.ts.head260.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-shopify-sync.ts.head260.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-og.ts.head260.txt`

- Added a “swap matrix” to the component catalog so client projects can see the seams and swap targets without digging through the full plan.  
  Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/architecture-component-catalog.md`

---

# Summary (Prompt 20)

## P0.3 execution got more mechanical (contracts + checklist + deltas)

- Documented the exact legacy request/response contracts for the two P0.3 `MIGRATE_NOW` endpoints (newsletter + cloudinary) inside the P0.3 detailed plan.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-newsletter-subscribe.ts.head260.txt`, `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-cloudinary-sign.ts.head260.txt`

- Added a copy/paste P0.3 execution checklist (parity-first, then harden in PR 2) to reduce implementation mistakes when code changes begin.  
  Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/p0-3-boundary-consolidation-detailed-plan.md`

- Added explicit “expected drift deltas” for the first thin slice (after migrating newsletter+cloudinary, `api_only` should decrease by 2) to the PR stop-point gate pack.  
  Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/pr-stop-point-gate-pack.md`

---

# Summary (Prompt 21)

## Newsletter migration no longer depends on runtime DDL

- Drafted a concrete Supabase SQL migration for `public.newsletter_signups` (service-role insert/read via RLS), mirroring the legacy schema while staying compatible with the backend-first Supabase posture.  
  Evidence anchor (legacy schema + semantics): `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-newsletter-subscribe.ts.head260.txt`

---

# Summary (Prompt 22)

## Cloudinary signing migration is Cloudflare-compatible (docs-only guidance)

- Added a Cloudflare Pages Functions SHA1 signing snippet (Web Crypto) that mirrors the legacy `crypto.createHash('sha1')` signature semantics used by `/api/cloudinary/sign`, reducing implementation risk for P0.3.  
  Evidence anchor (legacy implementation): `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-cloudinary-sign.ts.head260.txt`

---

# Summary (Prompt 23)

## PR7 vendor leak remediation is now deterministic (two IDs → two keys)

- Captured snippet snapshots for the exact offending leak lines and updated the PR 7 plan with a concrete mapping proposal from the two leaked Shopify Variant GIDs to internal `VariantKey` values derived from product handles.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/vendor-leaks-src-ui-providers-DrawerProvider.tsx.L130-190.txt`

---

# Summary (Prompt 24)

## Key mapping docs now match the code (v0 vs v1) and PR7 is execution-ready

- Documented the current Shopify adapter “v0” reversible key encoding (base64url of Shopify GIDs) and clarified why stable “v1” keys still require an adapter-owned mapping registry for true provider swaps.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-keys.ts.head260.2025-12-30_2316.txt`

---

# Summary (Prompt 25)

## Vendor leak gate hardened (encoded IDs no longer bypass)

- Updated the vendor leak scan so it also checks for base64url-encoded Shopify GIDs embedded in `variant.<token>` strings (prevents “obfuscated” vendor IDs from slipping into UI/client/lib).  
  Evidence: `docs/.blackbox/scripts/check-vendor-leaks.sh`

---

# Summary (Prompt 26)

## Backend inspection set + end-to-end flow map added (makes the loop runnable)

- Added a backend-focused “inspect first” file list (Pages Functions surface + cross-cutting libs + legacy drift hotspots), matching the existing frontend `inspect-first.md`.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/inspect-first-backend.md`

- Captured missing backend evidence for the checkout proxy seam (critical for vendor-agnostic UI handoff):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-cart-c-catchall.ts.head200.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-checkouts-catchall.ts.head200.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-shopifyCheckoutProxy.ts.head240.txt`

- Expanded the architecture atlas with evidence-backed end-to-end flow maps (PDP, cart, checkout proxy, payments).  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/architecture-atlas.md`

---

# Summary (Prompt 27)

## Research ingestion + checkout proxy seam are now first-class in gates and dashboards

- Added `research-index.md` to explicitly track which research runs were ingested into the plan (and pinned upstream excerpts into local snapshots so citations remain self-contained).  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/research-index.md`

- Hardened the gate suite so `refresh-1909-all-gates.sh` always snapshots the checkout proxy/handoff seam (`/cart/c/*`, `/checkouts/*`), making the “vendor-agnostic checkout handoff” invariant continuously visible.  
  Evidence:  
  - `docs/.blackbox/scripts/refresh-1909-all-gates.sh`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-cart-c-catchall.ts.head200.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-checkouts-catchall.ts.head200.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-shopifyCheckoutProxy.ts.head240.txt`

- Extended the stop-point dashboard to include a “checkout proxy seam missing snapshots” metric (0 is OK) so regressions show up immediately.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/stop-point-status-dashboard.md`
