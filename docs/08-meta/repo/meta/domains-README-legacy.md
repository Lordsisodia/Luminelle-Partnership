# Domain layout quick reference

## How to place code
- Start in `src/domains/<domain>/` (landing, shop, blog, auth, account, admin, shopify).
- Group by responsibility inside each domain:
  - `pages/` – route components
  - `sections/` – page sections
  - `components/` – domain-specific UI atoms/molecules
  - `hooks/` – domain-only hooks
  - `logic/` – services/use-cases/formatters
  - `data/` – queries, content, API mappers, fixtures
  - `providers/` or `state/` – context/store for the domain
  - `types/` – DTOs/interfaces
- Use `shared/` only when code is truly cross-domain. Current shared bits:
  - `src/utils/env.ts`, `src/utils/cdn.ts`
  - `src/lib/utils.ts` (tailwind `cn` helper)
  - `src/lib/ui.ts` (shared UI helpers)
- Prefer domain paths in imports: `@/domains/shop/pages/ProductPage` etc.

## When to keep code shared
- Used by 2+ domains and not tied to domain concepts.
- Pure utilities (no side effects) or framework wrappers.
- Shared UI helpers live in `src/lib/ui.ts`.

## Pending cleanups
- Populate empty placeholders (`logic/`, `data/`, `hooks/`, `types/`) as we migrate code.
- Decide whether to move `src/utils/*` into a `shared/` folder or keep as-is.
- Align tsconfig path aliases if you want shorter shared imports (currently `@/` maps to `src`).

## Shared module
- Shared utilities now live in `src/shared/`:
  - `shared/utils/cdn.ts` (asset URL helper)
  - `shared/utils/env.ts` (env accessor)
  - `shared/utils/cn.ts` (Tailwind class merge)
  - `shared/ui.ts` (shared UI helpers)
- Path alias added: `@/shared/*` → `src/shared/*`.
