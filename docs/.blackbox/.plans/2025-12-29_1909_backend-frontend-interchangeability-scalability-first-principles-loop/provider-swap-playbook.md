# Provider Swap Playbook (how to add/replace Shopify/Stripe/etc. safely)

Goal:
- Enable “swap providers without rewriting UI” by keeping all vendor specifics behind:
  - platform ports (`src/domains/platform/**/ports/*`)
  - adapter implementations (`src/domains/platform/**/adapters/<provider>/*`)
  - the stable backend boundary (`functions/api/**` implementing same-origin `/api/*`)

This playbook is intentionally CLI-first and works even if you keep only one provider today.

Evidence rule:
- Any statement about “what exists today” cites a snapshot under:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

Primary evidence (current repo has the seam ingredients):
- Ports inventory: `artifacts/snapshots/platform-ports-files.txt`
- Runtime selection inventory: `artifacts/snapshots/platform-runtime-files.txt`
- Adapter inventory: `artifacts/snapshots/platform-adapters-files.txt`
- Canonical backend boundary inventory: `artifacts/snapshots/functions-api-files.clean.find.txt`

Related canonical docs:
- Backend contract: `backend-boundary-contract-v1.md`
- DTO + capabilities: `dto-and-capabilities-spec-v0.1.md`
- Key mapping: `key-mapping-spec-v1.md`
- Acceptance gates + runbook: `acceptance-gates.md`, `acceptance-gates-runbook.md`

---

## 0) The single rule that makes swaps cheap

- UI depends on ports + `/api/*`, and avoids vendor SDKs for swappable platform domains.
  - Exception class: identity UI (auth) and explicitly capability-gated embedded flows (e.g. embedded payments).
- Vendor-specific logic lives in adapters + backend functions.

Evidence that “UI/client does not import adapters directly” is enforced by scans (baseline is empty):
- `artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`

Evidence of vendor SDK imports outside platform domains (report-only baseline; used to keep coupling visible):
- `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`

---

## 1) Pick the swap target (what kind of provider change is this?)

This playbook covers three swap types:

### 1.1 Swap a platform provider (preferred)

Example:
- Commerce: Shopify → (future provider)
- Payments: Stripe → (future PSP)
- Content/CMS: Shopify metaobjects → (future CMS)

Mechanism:
- Implement the same port surface with a new adapter.
- Keep runtime selection stable and capability-driven.

Evidence runtime selection exists today (so adding another provider is a mechanical extension):
- `artifacts/snapshots/platform-runtime-files.txt`
- `artifacts/snapshots/src-domains-platform-commerce-runtime.ts.head.txt`
- `artifacts/snapshots/src-domains-platform-payments-runtime.ts.head.txt`

### 1.2 Swap the backend runtime (keep `/api/*` stable)

Example:
- Cloudflare Pages Functions → another runtime

Mechanism:
- Re-implement the same `/api/*` handlers elsewhere.
- Keep the request/response contract identical for all frontends.

Evidence `/api/*` is implemented as Fetch-style handlers today:
- `artifacts/snapshots/functions-api-handlers.clean.rg.txt`

### 1.3 Swap the UI (covered elsewhere)

See:
- `frontend-swap-playbook.md`

---

## 2) “Swap readiness” checklist (before writing any adapter)

### 2.1 Keys must be internal (no vendor IDs above adapters)

Principle:
- If the UI carries vendor IDs, you do not have a provider swap seam — you have a UI rewrite seam.

Evidence that vendor identifiers currently leak above adapters (baseline):
- `artifacts/snapshots/check-vendor-leaks.txt`

Plan:
- Execute PR 7 when code changes are allowed:
  - `pr-7-vendor-key-mapping-detailed-plan.md`

### 2.2 The boundary must be single-canonical (avoid `api/**` vs `functions/api/**` drift)

Principle:
- A provider swap should change adapter implementation, not “which backend tree we happen to be using”.

Evidence drift exists today and is tracked:
- `artifacts/snapshots/api-vs-functions.summary.txt`

Plan:
- Execute P0.3 when code changes are allowed:
  - `p0-3-boundary-consolidation-detailed-plan.md`

### 2.3 Identity provider coupling stays localized (Clerk today; swap-ready later)

Why this matters:
- For client projects, “swappable” often includes identity (some clients won’t use Clerk).
- We can’t make identity provider swaps cheap if Clerk APIs leak throughout UI/client domains.

Current state evidence:
- There is already an internal `AuthProvider` shim under `platform/auth` that wraps Clerk and exposes a minimal internal auth context:
  - `artifacts/snapshots/src-domains-platform-auth-providers-AuthContext.impl.tsx.head240.txt`
- Route shell exists for Clerk-required areas (current behavior is “render nested routes”):
  - `artifacts/snapshots/src-shells-ClerkShell.tsx.head200.txt`
- Clerk usage still appears outside platform domains (baseline report; drives future cleanup work):
  - `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`
  - `artifacts/snapshots/coupling-clerk-matches.txt`

Swap-ready target (implementation phase):
- Drive `vendor_sdk_imports_nonplatform_clerk → 0`, meaning:
  - Clerk imports exist only inside `src/domains/platform/auth/**` (adapter boundary for identity UI).
  - UI/client domains use internal wrappers (e.g., `useAuthContext`, `AuthProvider`, internal `UserMenu`), not Clerk APIs directly.

---

## 3) The minimal implementation sequence (provider swap in 8 steps)

### Step 1 — Freeze the port semantics (do not change the UI contract)

What to treat as contract:
- Port interfaces (methods + DTOs) and stable error codes.

Evidence anchors:
- Ports inventory: `artifacts/snapshots/platform-ports-files.txt`
- Stable errors: `artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`
- Stable primitives/keys: `artifacts/snapshots/src-domains-platform-ports-primitives.ts.head.txt`

### Step 2 — Define capability equivalence (UI renders by capability, not provider)

Rule:
- If providers differ, expose the difference via `capabilities`, not via branching on provider name.

Evidence that “capabilities-driven payments” already exists:
- `artifacts/snapshots/src-domains-platform-payments-ports-payments.ts.head.txt`

### Step 3 — Implement the new adapter behind the port

Directory rule:
- New provider code lives under:
  - `src/domains/platform/<domain>/adapters/<provider>/...`

Evidence that adapters follow this pattern today:
- `artifacts/snapshots/platform-adapters-files.txt`

### Step 4 — Route vendor secrets and signing through the backend boundary

Rule:
- Browser code must not receive vendor secrets (Stripe keys, Shopify admin secrets, etc.).
- Backend functions do signing/verification and talk to vendors where required.

Evidence the backend boundary exists:
- `artifacts/snapshots/functions-api-files.clean.find.txt`

Example evidence for payments boundary:
- `/api/payments/intent/create` exists as a Cloudflare function today:
  - `artifacts/snapshots/functions-api-payments-intent-create.ts.head80.txt`

### Step 5 — Extend runtime selection (keep selection out of UI)

Rule:
- Runtime decides which adapter implements the port based on environment/tenant config.

Evidence runtime modules exist today:
- `artifacts/snapshots/platform-runtime-files.txt`

### Step 6 — Add tenant-aware provider config (future-proof for multi-client)

Direction (docs-only now):
- Provider config should be resolved per tenant from `tenant_integrations`, not from per-tenant env vars.

Spec:
- `tenant-integrations-config-spec.md`

### Step 7 — Re-run acceptance gates (prove you didn’t break swap seams)

Run:
- `./.blackbox/scripts/refresh-1909-all-gates.sh`
- `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`

Key gates that matter for provider swaps:
- No adapter imports from UI/client:
  - `artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`
- Vendor leaks trend to 0:
  - `artifacts/snapshots/check-vendor-leaks.txt`
- Contract evidence remains consistent:
  - `contract-gaps-report-v1.1.md`

### Step 8 — Cut a “thin slice” validation flow

Don’t “swap everything at once”.

Recommended thin slices:
- Payments swap slice:
  - “begin payment” still works for `embedded` vs `redirect` modes (capabilities).
- Commerce swap slice:
  - PDP → cart → checkout handoff still works without leaking vendor URLs.

Evidence that checkout handoff seam exists and is tracked:
- `artifacts/snapshots/functions-_lib-shopifyCheckoutProxy.ts.head240.txt`
- `artifacts/snapshots/functions-cart-c-catchall.ts.head200.txt`
- `artifacts/snapshots/functions-checkouts-catchall.ts.head200.txt`

---

## 4) When to stop (don’t over-research)

Stop when:
- the port surface is stable,
- the adapter boundary contains the provider logic,
- and the acceptance gates still pass (or trend in the right direction).

The current stop-point dashboard is the “what to do next” signal:
- `stop-point-status-dashboard.md`
