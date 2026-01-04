---
compaction: 0004
created_at: "2025-12-29 02:18"
range: "0031-0040"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0004 (0031–0040)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0031_stop-3-cleanup-extract-shared-internal-api-client.md

---
step: 0031
created_at: "2025-12-29 02:00"
title: "Stop 3 cleanup: extract shared internal API client"
---

# Step 0031: Stop 3 cleanup: extract shared internal API client

## ✅ What I did (facts)

- Extracted the `requestJson()` helper into a shared platform module so adapters don’t depend on each other’s internals:
  - Added `src/domains/platform/http/internal-api/client.ts`
  - Updated Shopify internal-API adapters to import from `@platform/http/internal-api/client`
  - Deleted the old helper at `src/domains/platform/commerce/adapters/shopify/internal-api/client.ts`
- Ran validations:
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- The existing error classification logic (`PortError` mapping from HTTP status/body) works well as a shared primitive and will be reusable across future providers (Stripe, CMS, etc.) that expose internal API endpoints.

## 🧭 What changes because of this

- Content adapters no longer import “commerce adapter internals”; the platform layer is closer to a clean ports/adapters boundary.

## ➡️ Next step

- Optional: add `src/domains/platform/http/internal-api/index.ts` to simplify imports, and/or extend the shared client with request ID tracing if needed.

## 🔗 Links / references

- `src/domains/platform/http/internal-api/client.ts`
- `src/domains/platform/commerce/adapters/shopify/internal-api/cart.ts`
- `src/domains/platform/content/adapters/shopify/internal-api/sections.ts`

---

### 0032_cleanup-remove-legacy-platform-commerce-shopify-module.md

---
step: 0032
created_at: "2025-12-29 02:01"
title: "Cleanup: remove legacy @platform/commerce/shopify module"
---

# Step 0032: Cleanup: remove legacy @platform/commerce/shopify module

## ✅ What I did (facts)

- Removed the unused legacy Shopify “vendor client” module under platform commerce:
  - Deleted `src/domains/platform/commerce/shopify/index.ts`
  - Deleted `src/domains/platform/commerce/shopify/shopify.ts`
  - Deleted `src/domains/platform/commerce/shopify/shopifyCart.ts`
- Updated the last doc reference to the removed module to reflect the new ports-based approach:
  - `src/domains/README.md`
- Ran validations:
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- Once consumers are migrated to ports (`@platform/commerce`, `@platform/content`), the old “direct Shopify client” layer becomes dead weight and is safe to delete, reducing confusion and accidental coupling.

## 🧭 What changes because of this

- There is now a single sanctioned way for UI to access commerce/content functionality (through ports + runtime entrypoints), making provider swaps much cleaner.

## ➡️ Next step

- Optional: remove or update any remaining engineering docs that mention the old `@platform/commerce/shopify` import path, to prevent future reintroduction.

## 🔗 Links / references

- `src/domains/platform/commerce/runtime.ts`
- `src/domains/platform/commerce/adapters/shopify/internal-api/*`
- `src/domains/README.md`

---

### 0033_docs-remove-stale-platform-commerce-shopify-references.md

---
step: 0033
created_at: "2025-12-29 02:03"
title: "Docs: remove stale @platform/commerce/shopify references"
---

# Step 0033: Docs: remove stale @platform/commerce/shopify references

## ✅ What I did (facts)

- Updated a stale planning log entry that implied `@platform/commerce/shopify/*` was still a supported import path:
  - `docs/05-planning/plans/domain-architecture-reshuffle.md` now marks that approach as legacy and notes it was replaced by ports/adapters (internal-API first).
- Ran validation:
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- Some older “architecture reshuffle” notes captured intermediate states that are now actively misleading after the ports/adapters migration; leaving them unannotated risks future reintroductions.

## 🧭 What changes because of this

- The docs are less likely to steer future work back toward direct vendor client imports.

## ➡️ Next step

- Optional: sweep other planning docs for references to deprecated module paths and annotate them as legacy (especially anything that reads like a current recommendation).

## 🔗 Links / references

- `docs/05-planning/plans/domain-architecture-reshuffle.md`

---

### 0034_guardrail-enforce-ui-domain-import-boundaries.md

---
step: 0034
created_at: "2025-12-29 02:05"
title: "Guardrail: enforce UI/domain import boundaries"
---

# Step 0034: Guardrail: enforce UI/domain import boundaries

## ✅ What I did (facts)

- Added a CI-ready guardrail script to prevent UI/domain code from importing platform adapters or internal API clients directly:
  - Added `scripts/check-import-boundaries.mjs`
  - Added `npm run validate:boundaries`
- Updated the execution board doc to reference the new guardrail:
  - `docs/05-planning/research/ui-infra-week-1-execution-board.md`
- Validated:
  - `npm run validate:boundaries`
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- This is a low-friction way to keep “UI ↔ Infra interchangeable” true over time: it blocks new coupling at the import layer before it ships.

## 🧭 What changes because of this

- The architecture is now enforceable, not just aspirational: UI/domain code can only use ports/entrypoints, while adapters stay private to platform runtime wiring.

## ➡️ Next step

- Optional: run `npm run validate:boundaries` in CI as a required check, and extend the script with additional rules (e.g. forbid `@platform/http/internal-api` in non-platform code) as new providers are added.

## 🔗 Links / references

- `scripts/check-import-boundaries.mjs`
- `package.json`

---

### 0035_guardrail-enforce-infra-sdks-stay-in-platform.md

---
step: 0035
created_at: "2025-12-29 02:08"
title: "Guardrail: enforce infra SDKs stay in platform"
---

# Step 0035: Guardrail: enforce infra SDKs stay in platform

## ✅ What I did (facts)

- Moved the Supabase SDK import into the platform layer (so UI/lib code doesn’t depend on infra vendors directly):
  - `src/domains/platform/storage/supabase.ts` now owns the `@supabase/supabase-js` client creation.
  - `src/lib/supabase.ts` is now a shim re-exporting from `@platform/storage/supabase`.
- Tightened the boundary guardrail to forbid importing `@supabase/supabase-js` from UI/domain code:
  - Updated `scripts/check-import-boundaries.mjs` (rule `ui_imports_supabase_sdk`)
- Validated:
  - `npm run validate:boundaries`
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- Keeping infra SDKs inside `src/domains/platform/**` is a practical “interchangeable components” rule: UI can swap infra providers without migrating imports throughout the app.

## 🧭 What changes because of this

- The architecture boundary is enforced: infra vendor SDKs (Supabase) can’t leak back into UI/lib code via accidental imports.

## ➡️ Next step

- Optional: add similar rules for other infra SDKs if/when introduced (Stripe server SDK, Shopify Admin SDK, etc.), and keep UI vendor packages (e.g., Polaris) explicitly allowed.

## 🔗 Links / references

- `src/domains/platform/storage/supabase.ts`
- `src/lib/supabase.ts`
- `scripts/check-import-boundaries.mjs`

---

### 0036_guardrail-forbid-ui-direct-api-storefront-calls.md

---
step: 0036
created_at: "2025-12-29 02:10"
title: "Guardrail: forbid UI direct /api/storefront calls"
---

# Step 0036: Guardrail: forbid UI direct /api/storefront calls

## ✅ What I did (facts)

- Extended the import boundary guardrail to also forbid direct internal storefront API route usage from UI/domain code:
  - Updated `scripts/check-import-boundaries.mjs` to fail if any scanned UI/lib/domain file contains `/api/storefront/`.
- Validated:
  - `npm run validate:boundaries`
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- The repository currently has no UI/lib direct `/api/storefront/*` calls, so adding this guardrail is “pure prevention” and shouldn’t break anyone’s workflow.

## 🧭 What changes because of this

- Internal API calls stay encapsulated inside platform adapters, making providers swappable without UI churn.

## ➡️ Next step

- Optional: add a similar pattern guard for other internal endpoints (`/api/admin/*`, etc.) if those should also be adapter-only.

## 🔗 Links / references

- `scripts/check-import-boundaries.mjs`
- `src/domains/platform/commerce/adapters/shopify/internal-api/*` (allowed location for `/api/storefront/*` usage)

---

### 0037_stop-8-prep-add-platform-payments-port.md

---
step: 0037
created_at: "2025-12-29 02:12"
title: "Stop 8 prep: add @platform/payments port"
---

# Step 0037: Stop 8 prep: add @platform/payments port

## ✅ What I did (facts)

- Added a new vendor-agnostic payments slice under platform (contracts + runtime entrypoint), as prep for Stripe/other providers:
  - Added `src/domains/platform/payments/ports/payments.ts`
  - Added `src/domains/platform/payments/ports/index.ts`
  - Added `src/domains/platform/payments/runtime.ts`
  - Added `src/domains/platform/payments/index.ts`
- Ensured the new contracts are typechecked by extending:
  - `src/lib/_contract_sanity.ts`
- Validated:
  - `npm run validate:boundaries`
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- Adding ports + entrypoints early is low-risk: it creates stable seams for future provider swaps without forcing immediate implementation or UI migrations.

## 🧭 What changes because of this

- The platform now has an explicit “payments plug-in” seam (`@platform/payments`) ready for Stripe wiring later, without entangling the existing commerce checkout flow.

## ➡️ Next step

- Decide how payments should relate to checkout:
  1) Keep `CheckoutPort` as “end-to-end checkout” and `PaymentsPort` for non-checkout flows (subscriptions, invoices, portals), or
  2) Merge payments into commerce checkout if you want a single surface.

## 🔗 Links / references

- `src/domains/platform/payments/ports/payments.ts`
- `src/domains/platform/payments/runtime.ts`
- `src/lib/_contract_sanity.ts`

---

### 0038_stop-8-prep-scaffold-stripe-payments-adapter-env-selection.md

---
step: 0038
created_at: "2025-12-29 02:14"
title: "Stop 8 prep: scaffold Stripe payments adapter + env selection"
---

# Step 0038: Stop 8 prep: scaffold Stripe payments adapter + env selection

## ✅ What I did (facts)

- Scaffolded a minimal Stripe Payments adapter (no live API calls yet; just the seam and capability surface):
  - Added `src/domains/platform/payments/adapters/stripe/index.ts`
- Wired `@platform/payments` runtime adapter selection via env flags (defaults unchanged):
  - `PAYMENTS_PROVIDER=stripe` selects the Stripe adapter.
  - In dev, `USE_REAL_PAYMENTS=true` is required to avoid the mock adapter (mirror of commerce/content behavior).
  - Without `PAYMENTS_PROVIDER`, dev stays mock-by-default and prod stays disabled-by-default (no behavior change).
- Validated:
  - `npm run validate:boundaries`
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- This approach makes “future Stripe” concrete without committing to Stripe endpoint design yet: the adapter can later call internal endpoints (recommended) or a server-side SDK, but UI will not need to change.

## 🧭 What changes because of this

- The payments surface is now structurally interchangeable; selecting the provider becomes a platform/runtime concern rather than a UI rewrite.

## ➡️ Next step

- Decide the integration style for Stripe:
  1) Internal API first (`/api/payments/*` endpoints backed by server credentials), or
  2) Direct client SDK usage (usually not recommended for privileged operations).

## 🔗 Links / references

- `src/domains/platform/payments/runtime.ts`
- `src/domains/platform/payments/adapters/stripe/index.ts`

---

### 0039_stop-8-prep-add-internal-api-payments-endpoint-wire-stripe-adapter.md

---
step: 0039
created_at: "2025-12-29 02:16"
title: "Stop 8 prep: add internal /api/payments endpoint + wire Stripe adapter"
---

# Step 0039: Stop 8 prep: add internal /api/payments endpoint + wire Stripe adapter

## ✅ What I did (facts)

- Added a placeholder internal payments API endpoint (no Stripe calls yet) to establish the “internal API first” pattern for Stripe:
  - Added `functions/api/payments/intent/create.ts`
  - Extended env bindings type with `STRIPE_SECRET_KEY` in `functions/_lib/types.ts`
- Wired the Stripe payments adapter to call the internal endpoint:
  - Updated `src/domains/platform/payments/adapters/stripe/index.ts` to call `/api/payments/intent/create` via `requestJson()`
- Validated:
  - `npm run validate:boundaries`
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- Returning a 500 with “not configured” wording is a clean way to surface `PortError('NOT_CONFIGURED')` via the shared internal-api client, without coupling UI to provider env logic.

## 🧭 What changes because of this

- Stripe integration is now structurally aligned with Shopify’s internal-API-first adapter approach: providers can be swapped by changing platform runtime wiring, not UI code.

## ➡️ Next step

- Implement the endpoint for real (when ready):
  1) Create a Stripe PaymentIntent server-side and return a client secret.
  2) Update the Stripe adapter capabilities mode to `embedded` and return `{ mode: 'embedded', clientSecret }`.

## 🔗 Links / references

- `functions/api/payments/intent/create.ts`
- `src/domains/platform/payments/adapters/stripe/index.ts`
- `src/domains/platform/http/internal-api/client.ts`

---

### 0040_ui-seam-paymentsprovider-provider-agnostic-payments-page.md

---
step: 0040
created_at: "2025-12-29 02:18"
title: "UI seam: PaymentsProvider + provider-agnostic payments page"
---

# Step 0040: UI seam: PaymentsProvider + provider-agnostic payments page

## ✅ What I did (facts)

- Added a minimal UI seam for payments so UI can consume `@platform/payments` without knowing providers:
  - Added `src/domains/client/account/providers/PaymentsProvider.tsx` (`usePayments()` + providerLabel/capabilities)
  - Wrapped the app router with `PaymentsProvider` in `src/main.tsx`
- Updated the Account “Payment methods” page to use capability-driven copy:
  - `src/domains/client/account/ui/pages/PaymentMethodsPage.tsx` now renders the payment provider label from `@platform/payments`.
- Validated:
  - `npm run validate:boundaries`
  - `npm run typecheck`
  - `python3 docs/08-meta/maintenance/validate_docs.py`

## 🧠 What I learned (new information)

- Introducing a provider-agnostic UI seam early lets you change infrastructure (Shopify ↔ Stripe) without rewriting “account/payments” UX later.

## 🧭 What changes because of this

- Payments UI is now “pluggable”: the visible provider label comes from platform capabilities, not hard-coded vendor copy.

## ➡️ Next step

- Extend the payments seam to expose a `beginPayment()` action when the Stripe endpoint is implemented (likely returning an embedded client secret).

## 🔗 Links / references

- `src/domains/client/account/providers/PaymentsProvider.tsx`
- `src/domains/platform/payments/runtime.ts`
- `src/domains/client/account/ui/pages/PaymentMethodsPage.tsx`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
