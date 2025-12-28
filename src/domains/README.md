# domains/ (2025-12-20)
Domain-driven code. Each subfolder owns a bounded context with its pages, sections, components, hooks, logic, data, providers, and state. Current domains:

- client/ (marketing, shop, account, rewards)
- admin/ (catalog, pages, media, blog, analytics; orders/settings scaffolded)
- creator/
- blog/
- platform/ (auth, commerce, storage, cms, feature-flags, observability, design-tokens)
- ui-kit/ (primitives, optional, domain-agnostic)

Import rules:
- Use domain aliases: `@client`, `@admin`, `@creator`, `@blog`, `@platform`, `@ui-kit`.
- No cross-domain deep imports; go through the owning domain or platform.
- Shared vendor clients live in platform (e.g., `@platform/commerce/shopify`, `@platform/storage/supabase`).
