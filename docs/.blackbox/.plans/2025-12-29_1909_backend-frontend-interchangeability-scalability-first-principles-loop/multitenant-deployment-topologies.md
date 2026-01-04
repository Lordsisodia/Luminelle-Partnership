# Multi-tenant Deployment Topologies (Cloudflare + Supabase)

Purpose:
- Make a concrete, ops-friendly plan for “**one Supabase project for many clients**” without locking us into a single frontend.
- Clarify the trade-offs between:
  - shipping **one UI for many tenants**
  - shipping **many UIs** that share a stable backend boundary

Evidence rule:
- Any “current state exists today” statement in this file cites a snapshot under:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

Current state evidence anchors (minimal):
- Cloudflare backend boundary exists as Pages Functions under `functions/api/**`:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`
- Tenancy rules are defined (host-first, auth-as-restriction, cache-safe):
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/tenancy-context-rules.md`

---

## 0) Non-negotiable invariants (shared across all topologies)

- `/api/*` is the stable backend boundary for any frontend.
  - Contract: `backend-boundary-contract-v1.md`
- Tenant is resolved server-side (host-first) and is cache-safe.
  - Rules: `tenancy-context-rules.md`
- UI does not contain vendor IDs and does not import adapters.
  - Baseline leak scan (drive to zero in implementation phase):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`

---

## 1) Topology A — Single UI, many tenants (host-based runtime branding)

Concept:
- One deployable frontend.
- Tenant selection is implicit by host.
- UI loads tenant branding + CMS from `/api/*` at runtime.

Pros:
- Lowest ops overhead for many small clients.
- Fast rollout: one deploy updates everyone.
- Works naturally with host-first tenancy.

Cons:
- Harder to support radically different UX per client without feature-flag sprawl.
- Requires strong “capabilities + DTO” discipline so the UI doesn’t become a provider-specific blob.

Acceptance checks:
- A new tenant is onboarded by:
  - adding `tenant_domains` + `tenant_integrations` rows
  - not changing frontend code
  - not adding env vars
  - Runbook: `tenant-2-onboarding-runbook.md`
- Branding/CMS are tenant-scoped and cache-safe:
  - Rules: `tenancy-context-rules.md`
- Public tenant-scoped endpoints set explicit cache headers:
  - Heuristic gaps report highlights missing cache cues today: `contract-gaps-report-v1.1.md`

---

## 2) Topology B — Many UIs (per-client builds), shared backend boundary

Concept:
- Each client gets a dedicated frontend build + deploy (branding baked in).
- All clients share the same `/api/*` boundary and the same Supabase project.

Pros:
- Max flexibility for client-specific UX.
- Cleanest “client divergence” without UI conditionals.

Cons:
- More ops: more deployables and per-client release coordination.
- Still requires careful tenant isolation because one Supabase project is shared.

Acceptance checks:
- A new frontend can be introduced without changing backend provider integrations:
  - Playbook: `frontend-swap-playbook.md`
- All frontends agree on the backend contract and DTO conventions:
  - Contract: `backend-boundary-contract-v1.md`
  - DTO/capabilities: `dto-and-capabilities-spec-v0.1.md`
- Tenant resolution remains authoritative in `/api/*`:
  - Rules: `tenancy-context-rules.md`

---

## 3) Topology C — UI plugin model (shared shell + pluggable route packs)

Concept:
- One “shell” UI (router, auth, layout).
- Each client installs a route-pack module that defines pages and components.
- Backend remains stable and shared.

Pros:
- Controlled customization while keeping a shared deployable.
- Clear isolation between shared UX primitives and client surfaces.

Cons:
- Requires a stricter internal packaging discipline than today’s folder layout.
- Needs explicit “what is stable” boundaries inside `src/`.

Evidence that the repo already splits `platform` vs `client` domains (foundation for this):
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-dirs.find.txt`

Acceptance checks:
- “Client route packs” depend on platform ports and HTTP boundary only.
- No adapter imports appear in UI/client code:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`

---

## 4) Recommended default (for this repo)

Recommendation (proposal):
- Start with **Topology A** for speed (single UI, many tenants), but keep the architecture compatible with **Topology B** by:
  - keeping `/api/*` contract stable and versioned
  - using capabilities instead of provider branching in the UI

This aligns with the current direction of:
- host-first tenancy rules: `tenancy-context-rules.md`
- stable `/api/*` boundary: `backend-boundary-contract-v1.md`

