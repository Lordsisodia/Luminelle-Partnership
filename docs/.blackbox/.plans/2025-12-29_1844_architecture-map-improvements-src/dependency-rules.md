# Dependency Rules (UI ↔ Domains ↔ Platform)

This is a proposed “what can import what” rule set. It’s written as **policy**, not as enforced lint rules yet.

Goal: keep the UI interchangeable by ensuring provider-specific code is isolated behind platform ports/adapters.

---

## A) High-level layering model

1) **UI shell / global UI**
   - `src/ui/*`, `src/components/*`, `src/layouts/*`, `src/theme/*`
2) **Product domains**
   - `src/domains/client/*`, `src/domains/admin/*`, `src/domains/blog/*`, `src/domains/creator/*`
3) **Platform layer (ports + runtimes)**
   - `src/domains/platform/*` (ports, runtime selection, infrastructure primitives)
4) **Provider adapters**
   - `src/domains/platform/**/adapters/**`

---

## B) Allowed imports (positive rules)

### UI + product domains may import
- `@platform/<domain>` runtimes (e.g. `@platform/commerce`, `@platform/payments`, `@platform/content`)
- `@platform/<domain>/ports` **types** (DTOs + interfaces)
- shared platform primitives from `@platform/ports` (`PortError`, key types)
- `src/lib/*` only if the lib is provider-agnostic (or clearly a temporary shim)

### Platform adapters may import
- vendor SDKs (Shopify/Stripe/Clerk/etc.)
- `@platform/http/internal-api/*` helpers
- internal `keys.ts` encoding/decoding helpers
- server/API endpoints (when applicable)

---

## C) Forbidden imports (negative rules)

### UI + product domains must NOT import
- `src/domains/platform/**/adapters/**` (directly)
- vendor SDKs (e.g. `@shopify/*`, `@stripe/*`) unless the UI is explicitly a provider-owned “debug panel”
- raw vendor identifiers and shapes (e.g. `gid://shopify/...`)

### Shared libs (`src/lib/*`) should NOT
- embed vendor IDs, vendor copy, or vendor network assumptions
- leak port boundary types under legacy names (e.g. `variantId` but actually a `VariantKey`) without clear naming

---

## D) How to add a new provider (future Stripe/others)

Example: add an additional commerce provider later.

1) Add a new adapter under `src/domains/platform/commerce/adapters/<provider>/...`
2) Make it implement the existing ports:
   - `CatalogPort`, `CartPort`, `CheckoutPort`
3) Extend `src/domains/platform/commerce/runtime.ts` to select the provider based on env/config
4) Ensure UI only consumes `commerce` runtime and `CheckoutCapabilities` (no provider branching in UI)

---

## E) Practical enforcement (later)

These rules can be enforced incrementally by:
- Extending `docs/.blackbox/scripts/check-vendor-leaks.sh` (IDs + “provider copy” patterns).
- Adding ESLint boundary rules (optional; not part of this plan yet).

