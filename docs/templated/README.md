# Templated (Agency Starter Planning)

This folder is for planning what parts of this e‑commerce app are reusable across future clients, and how to evolve this repo into an agency starter you can **copy per client**.

## Working definition of “templateable”

- **Template (copy/paste)**: can be reused across clients with minimal or no edits.
- **Template (parameterized)**: reusable, but driven by config/env/content.
- **Client-specific**: tied to brand voice, product catalog, creative, policies, etc.

The goal is not “zero edits per client”, it’s **predictable edits in a few known places**.

## Baseline decisions (current)

These are recorded in `docs/templated/starter-decisions.md`:

- **Commerce**: Shopify storefront + Shopify checkout (redirect via `checkoutUrl`).
- **Auth/accounts**: Clerk is the primary auth provider.
- **DB**: Supabase/Postgres is the app database (per-client Supabase project per client).
- **Blog**: always included and **public for SEO**; interactive features are comments (auto-published) + likes (public count only, Clerk-gated for toggling).
- **Customer sync**: Clerk → Supabase immediately, and Shopify customer parity is created/ensured near real-time.
- **Deploy**: Vercel for now; keep portability in mind.
- **Template distribution**: this repo is the starter; new clients are created by copying it.

## Docs index

- `docs/templated/starter-decisions.md` — what we’ve decided (so we don’t re-debate it)
- `docs/templated/template-map.md` — what’s reusable vs parameterized vs client-specific
- `docs/templated/extraction-roadmap.md` — how to harden the repo into a repeatable starter
- `docs/templated/new-client-intake.md` — what info we collect from a new client
- `docs/templated/new-client-setup-steps.md` — the concrete “copy repo → working client” checklist
- `docs/templated/clientization-inventory.md` — where the Lumelle-specific strings/keys/assets live (rename hotspots)
- `docs/templated/blog-social.md` — Supabase schema/policy notes for blog comments + likes
- `docs/templated/customer-sync.md` — how Clerk → Supabase → Shopify customer parity should work
- `docs/templated/supabase-topology.md` — per-client vs multi-tenant Supabase tradeoffs
- `docs/templated/template-hardening-backlog.md` — prioritized starter kit improvements (code work, later)
- `docs/templated/open-questions.md` — remaining decisions to standardize
