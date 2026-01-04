# Architecture Component Catalog (swappable units)

Goal: make it explicit which components are intended to be swappable and where the boundary lives, so client projects can “swap providers and/or swap UI” without rewriting the whole app.

Evidence rule:
- Every “exists today” statement must cite an evidence snapshot under:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

---

## The dependency direction (the rule that makes swaps possible)

- UI + product domains depend on **ports** (types + semantics) and `/api/*`, and avoid vendor SDKs for swappable platform domains.  
  - Exception class: identity UI and explicitly capability-gated embedded flows (tracked as report-only).  
  Evidence that ports exist and are centralized:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`
  Evidence of vendor SDK imports outside platform domains (baseline report):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`

- **Runtimes** select providers (mock/disabled/real) and return a `*Port` implementation.  
  Evidence that runtime modules exist:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-runtime-files.txt`

- **Adapters** implement ports and may call `/api/*` (Cloudflare Pages Functions) or vendor SDKs server-side.  
  Evidence that adapter modules exist:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-adapters-files.txt`

- Cloudflare Pages Functions (`functions/api/**`) is the stable `/api/*` boundary for all frontends.  
  Evidence that the API surface is implemented there and is Fetch-style:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/cloudflare-api-surface.rg.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-handlers.clean.rg.txt`

---

## Swap matrix (at a glance)

This table is the “interchangeability spec” for client work: what can swap, where the seam is, and what evidence proves the seam exists today.

| Swap unit | Seam (stable contract) | Implemented today | Swap by (no rewrite) | Key evidence |
|---|---|---|---|---|
| Frontend UI | Same-origin `/api/*` + stable DTOs/capabilities | `src/**` | Build a new UI that only calls `/api/*` and consumes DTOs/capabilities (not Shopify/Stripe/Supabase SDKs). | `artifacts/snapshots/functions-api-handlers.clean.rg.txt`, `artifacts/snapshots/platform-ports-files.txt` |
| Backend boundary (BFF) | `/api/*` contract implemented as Fetch-style handlers | `functions/api/**` | Re-implement the same `/api/*` contract on another runtime (if desired) while keeping frontends unchanged. | `artifacts/snapshots/functions-api-files.clean.find.txt`, `artifacts/snapshots/functions-api-handlers.clean.rg.txt` |
| Commerce provider | `Commerce*Port` + internal keys (`ProductKey`, `VariantKey`, …) | Shopify adapter + runtime selection under `src/domains/platform/commerce/**` | Add `src/domains/platform/commerce/adapters/<provider>/**` + update runtime selection; UI stays on ports + `/api/*`. | `artifacts/snapshots/src-domains-platform-commerce-runtime.ts.head.txt`, `artifacts/snapshots/src-domains-platform-ports-primitives.ts.head.txt` |
| Payments provider | `PaymentsPort` + capability model | Stripe adapter + runtime selection under `src/domains/platform/payments/**` | Add `src/domains/platform/payments/adapters/<provider>/**` + update runtime; keep `/api/payments/*` stable. | `artifacts/snapshots/src-domains-platform-payments-runtime.ts.head.txt`, `artifacts/snapshots/src-domains-platform-payments-ports-payments.ts.head.txt` |
| Content provider | content ports + `/api/storefront/*` content endpoints | Content runtime exists (`platform/content/runtime.ts`) | Add/replace content adapter (Shopify metaobjects today → CMS later) while keeping storefront endpoints stable. | `artifacts/snapshots/src-domains-platform-content-runtime.ts.head.txt`, `artifacts/snapshots/functions-api-files.clean.find.txt` |
| Identity provider | auth tiers (`public/user/admin/integration`) + backend-verified identity | Clerk currently appears in UI + webhook surface | Keep UI on an internal auth context and keep `/api/*` tier semantics stable; swap auth provider behind the boundary when needed. | `artifacts/snapshots/coupling-clerk-matches.txt`, `artifacts/snapshots/functions-api-files.clean.find.txt` |
| Data store | tenant-scoped data access behind backend boundary | Supabase client exists; server schema exists | Default to backend-first access for tenant-owned data; later swaps keep `/api/*` stable. | `artifacts/snapshots/coupling-supabase-matches.txt`, `artifacts/snapshots/server-files.find.txt` |

---

## Platform domain readiness (ports/runtime/adapters present)

This is a fast “how swappable is this domain today?” matrix.

Evidence anchors (raw inventories):
- Ports: `artifacts/snapshots/platform-ports-files.txt`
- Runtimes: `artifacts/snapshots/platform-runtime-files.txt`
- Adapters: `artifacts/snapshots/platform-adapters-files.txt`
- Backend surface (`/api/*`): `artifacts/snapshots/functions-api-files.clean.find.txt`

| Platform domain | Ports | Runtime | Adapters | Backend surface | Notes / blockers |
|---|---:|---:|---:|---:|---|
| `platform/commerce` | ✅ | ✅ | ✅ | ✅ | Swap seam exists; main blocker is “vendor IDs above adapters” (drive leak scan to 0). Evidence baseline: `artifacts/snapshots/check-vendor-leaks.txt` |
| `platform/payments` | ✅ | ✅ | ✅ | ✅ | Swap seam exists; payments intent endpoint already behind `/api/*`. Evidence: `artifacts/snapshots/functions-api-payments-intent-create.ts.head80.txt` |
| `platform/content` | ✅ | ✅ | ✅ | ✅ | Swap seam exists; content adapters already routed through internal API boundary. Evidence: `artifacts/snapshots/platform-adapters-files.txt` |
| `platform/cms` | ✅ | ❌ | ❌ | (via content today) | “CMS” is currently port-specified only; treat it as an expansion domain until a runtime + adapter lands. Evidence: `artifacts/snapshots/platform-ports-files.txt` |

Where to go next:
- Provider swap runbook: `provider-swap-playbook.md`
- Frontend swap runbook: `frontend-swap-playbook.md`
- Key mapping plan (to remove vendor IDs from UI/client): `pr-7-vendor-key-mapping-detailed-plan.md`

---

## Component: Commerce

- What it is:
  - Catalog, cart, checkout ports (UI calls these; provider swaps implement these).
- Evidence of ports/runtimes/adapters existing today:
  - Runtime selects Shopify vs dev mock based on env:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-runtime.ts.head.txt`
  - Shopify adapter entrypoint exists:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-index.ts.head.txt`
  - Commerce ports are listed in the platform ports inventory:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`

- Swap candidates (future):
  - Shopify ↔ (Medusa/BigCommerce/Custom) behind the same port surface.
  - “Headless storefront” UI ↔ “marketing site only” UI still uses the same `/api/storefront/*` endpoints.
- Acceptance gate:
  - No adapter imports from UI/client domains (must stay empty):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`

---

## Component: Payments

- What it is:
  - A `PaymentsPort` with “capabilities” + “begin payment” output modes (redirect/embedded/none).
- Evidence of port/runtime/adapter existing today:
  - Payments port surface:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-ports-payments.ts.head.txt`
  - Runtime provider selection (`PAYMENTS_PROVIDER`, dev mock):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-runtime.ts.head.txt`
  - Stripe adapter uses `/api/payments/intent/create` and maps into `PortError`:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-adapters-stripe-index.ts.head.txt`
  - Cloudflare endpoint exists:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-payments-intent-create.ts.head80.txt`

- Swap candidates (future):
  - Stripe ↔ Shopify Payments ↔ Adyen ↔ (other PSP) behind the same `PaymentsPort`.
- Acceptance gates:
  - Vendor leaks above adapters go to 0 (baseline exists today):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`

---

## Component: Content / CMS sections

- What it is:
  - “Section rendering” that can be sourced from Shopify metaobjects today and swapped later.
- Evidence that platform content exists:
  - Platform file inventory contains `platform/content/**` + Shopify content adapter paths:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-files.find.txt`

---

## Component: Storefront primitives kit + Blocks Kit (UI)

- What it is:
  - A docs-first “UI kit” contract for reusable blocks (storefront primitives + marketing sections + blog blocks).
  - The point is to make UI work repeatable across clients without turning the UI into a vendor-specific integration surface.
- Evidence the contracts and acceptance criteria exist today (docs artifacts):
  - Blocks Kit contracts excerpt:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/oss-catalog-blocks-kit-contracts.head200.txt`
  - Storefront primitives acceptance criteria excerpt (PLP/PDP/cart):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/oss-catalog-blocks-inventory.storefront-v1.5.150-270.txt`
  - Storefront pattern reference set excerpt (pattern → canonical repos):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/oss-catalog-storefront-reference-set.head170.txt`
  - Storefront kit mini‑POC checklist excerpt (explicit minimal DTOs + primitives):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-0647-storefront-kit.step0001.head220.txt`

- Swap implication:
  - New client UIs implement the same primitive components against stable DTOs (see: `dto-and-capabilities-spec-v0.1.md`), while providers remain behind `/api/*` + platform adapters.

---

## Component: Identity (AuthN/AuthZ)

- What it is:
  - Current identity provider: Clerk (UI + webhook surface).
  - Swappability requirement: the UI must depend on an internal auth context, not on Clerk-specific details.
- Evidence of Clerk coupling today:
  - Internal auth context wrapper exists under `platform/auth` (the seam we want to keep vendor-local):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-auth-providers-AuthContext.impl.tsx.head240.txt`
  - Clerk webhook exists in `/api/*`:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-webhooks-clerk.ts.head80.txt`
  - Repo-wide Clerk match inventory exists:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/coupling-clerk-matches.txt`
  - Non-platform Clerk SDK import count is tracked as a stop-point metric (drives “Clerk only in platform/auth” cleanup):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/stop-point-metrics.latest.txt`

Implementation plan (when code changes are allowed):
- `pr-9-identity-decoupling-detailed-plan.md`

---

## Component: Data / Storage

- What it is:
  - Current data store: Supabase (Postgres + auth + storage), with a browser client created from Vite env vars.
- Evidence:
  - Supabase browser client module:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-storage-supabase.ts.head.txt`
  - Repo-wide Supabase match inventory exists:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/supabase-repo-matches.rg.head400.txt`

---

## Component: Observability + Experiments + Feature Flags

- What it is:
  - Cross-cutting infrastructure domains intended to be provider-swappable.
- Evidence that these platform domains exist:
  - Platform file inventory includes `feature-flags`, `observability`, `design-tokens`:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-files.find.txt`
