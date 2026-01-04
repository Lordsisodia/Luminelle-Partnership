# Domain Module Conventions (how `src/domains/**` stays swappable)

Purpose:
- Map the *actual* domain/module structure in `src/domains/**` (what exists today).
- Define the conventions that make components interchangeable across client projects:
  - UI can swap because it depends on ports + `/api/*` and avoids vendor SDKs for swappable domains (exceptions are tracked explicitly).
  - Platform providers can swap because vendor-specific code stays behind adapters.

Evidence rule:
- Any “exists today” statement cites a snapshot under:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

Primary topology evidence:
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-tree.maxdepth4.dirs.txt`
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`
- Vendor SDK imports outside platform domains (report-only coupling signal):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`

---

## 1) The domain taxonomy in this repo (what exists)

At a top level, `src/domains/**` is organized by “product surface” + “platform seam”:

- `src/domains/platform/**` — provider-pluggable infrastructure and shared contracts.
  - Evidence (platform subtree exists): `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`
  - Evidence (ports/runtimes/adapters exist and are inventoried):  
    - `artifacts/snapshots/platform-ports-files.txt`  
    - `artifacts/snapshots/platform-runtime-files.txt`  
    - `artifacts/snapshots/platform-adapters-files.txt`

- `src/domains/client/**` — end-user experiences (storefront, account, marketing, rewards).
  - Evidence (client subtree exists): `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`

- `src/domains/admin/**` — internal/admin surfaces (catalog, media, orders, analytics, pages, settings).
  - Evidence (admin subtree exists): `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`

- `src/domains/creator/**` — creator-facing surfaces.
  - Evidence (creator subtree exists): `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`

- `src/domains/blog/**` — blog surface.
  - Evidence (blog subtree exists): `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`

- `src/domains/ui-kit/**` — reusable UI primitives and stories.
  - Evidence (ui-kit subtree exists): `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`

Practical implication for “client projects”:
- Client-specific changes should primarily land in `src/domains/client/**` and/or a dedicated client theme/content layer.
- Shared infrastructure and “what makes the app a platform” should remain in `src/domains/platform/**`.

---

## 2) The module shape inside a domain (what exists)

Many domains consistently use the same internal structure:

- `data/` — data fetching + DTO shaping at the domain edge
  - Evidence examples (folders exist across multiple domains):  
    - `src/domains/admin/catalog/data`  
    - `src/domains/blog/data`  
    - `src/domains/client/account/data`  
    - Snapshot: `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`

- `logic/` — domain logic and transformations (kept UI-framework-agnostic)
  - Evidence examples:  
    - `src/domains/admin/catalog/logic`  
    - `src/domains/client/account/logic`  
    - Snapshot: `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`

- `hooks/` — React hooks that bind UI to domain logic / data
  - Evidence examples:  
    - `src/domains/admin/media/hooks`  
    - `src/domains/blog/hooks`  
    - `src/domains/client/account/hooks`  
    - Snapshot: `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`

- `ui/` — domain UI components, layouts, pages, sections
  - Evidence examples:  
    - `src/domains/blog/ui/pages` + `src/domains/blog/ui/layouts`  
    - `src/domains/admin/shared/ui`  
    - Snapshot: `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`

- `providers/` and/or `state/` — domain-specific context + state modules (where needed)
  - Evidence examples:  
    - `src/domains/client/account/providers`  
    - `src/domains/client/account/state`  
    - Snapshot: `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`

- `.docs/` — embedded documentation inside domain folders (a good pattern to keep)
  - Evidence examples:  
    - `src/domains/admin/catalog/.docs`  
    - `src/domains/client/account/.docs`  
    - `src/domains/platform/.docs`  
    - Snapshot: `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`

This is already a strong “interchangeability” foundation:
- UI code can swap per client because each domain’s UI is localized under `ui/` and depends on `hooks/` + `logic/`.
- Shared capabilities can be pushed down into `platform/**` without contaminating UI.

---

## 3) The one rule that enables swaps (dependency direction)

Rule:
- UI/client domains must not import provider-specific adapters.

Enforcement evidence (scan output is empty today, and should stay empty):
- `artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`

Interpretation:
- `src/domains/client/**` and `src/ui/**` should depend on:
  - `src/domains/platform/**/ports/**` (types + semantics)
  - `src/domains/platform/**/runtime.ts` (capability-driven selection output)
  - `src/domains/platform/http/internal-api/**` (calls `/api/*`)
- UI/client should *never* depend on:
  - `src/domains/platform/**/adapters/**`

Supporting contract anchors (what the frontend should rely on):
- Platform key primitives (must be vendor-agnostic):  
  `artifacts/snapshots/src-domains-platform-ports-primitives.ts.head.txt`
- Platform error semantics (stabilizes UI error handling):  
  `artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`

---

## 4) Practical “client project” conventions (recommended)

These are prescriptions (not current-state claims), chosen to preserve swappability:

- Prefer putting client-specific UI/brand customizations in:
  - `src/domains/client/marketing/**` and `src/theme/**` (existing directories)  
    Evidence: `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`
- Prefer putting cross-client UI primitives in:
  - `src/domains/ui-kit/**` and `src/ui/components/**`  
    Evidence: `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`
- Prefer putting “provider swap surfaces” in:
  - `src/domains/platform/<domain>/{ports,runtime,adapters}/**`  
    Evidence: `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`

If client customization starts to “fork” platform behavior:
- Add a capability flag at the port/runtime layer and branch by capability (not by vendor name).
  - This aligns with the “capability-driven UI” direction.  
    Research evidence anchor: `artifacts/snapshots/research-ui-infra-plugin-architecture.md.head220.txt`
