# Magic Cart Recovery — Open Source Framework Options
Date: 2025-12-11  
Purpose: avoid reinventing cart recovery by reusing proven open-source components/patterns.

## Shortlist (revolutionary & open-source)
- **Medusa (Node/TS)** – Cart module + Workflows SDK + Abandoned Cart tutorial; provides scheduled jobs, notification providers, and recover-link flow we can lift or run as a service.
- **n8n (workflow engine)** – Self-hosted, drag/drop; has Shopify abandoned-cart templates. Perfect to orchestrate delays/retries/discount steps without coding a new backend.
- **Saleor (Python/GraphQL)** – Example showing abandoned-basket automation via Segment → Customer.io; good event schema and journey pattern to copy.
- **Spree (Rails, AGPL)** – Mature cart/checkout; strong reference for cart states, tokenized restore links, GDPR/consent handling.
- **Cloudflare R2 + Supabase (infra pieces)** – Cheap, open infra for storing shared-cart payloads server-side (R2 object, Supabase row/trigger) to keep tokens PII-free.

## How these help our use case
- **Align with Shopify cart recovery:** Medusa/n8n workflows map 1:1 to our need: detect abandonment, issue restore link, send multi-channel nudges, and replay cart state.
- **Faster delivery:** Reusing Medusa’s abandoned-cart workflow or n8n templates cuts custom orchestration time; we only adapt the API calls to Shopify Storefront cart + our Zustand store.
- **Compliance & resilience:** Spree and Saleor show battle-tested patterns for consent (GDPR), TTLs, and handling price/availability drift—reducing risk of data/privacy bugs.
- **Cross-device restore:** R2/Supabase pattern lets us store restore payloads server-side, so share links are short, signed, and PII-free.
- **Extensible journeys:** n8n/Saleor’s event-driven approach lets us add SMS/push later without touching the cart code—just new nodes/segments.

## Recommended integration plan (reuse > build)
1) **Workflow/orchestration:** Use n8n self-hosted for the recovery journey (wait X hrs → send email/SMS → optional discount → stop on restore). Emit events from our app to n8n via webhook.
2) **Cart replay pattern:** Mirror Medusa’s recover-link approach—signed token → backend validates → recreates Shopify cart → applies lines/discount → redirects to checkout.
3) **Storage for share links:** Store serialized cart snapshot or `cartId` + metadata in Supabase (row) or R2 object; token carries only a reference + signature.
4) **Consent & compliance:** Copy Spree/Saleor consent UX (explicit “remember my cart” checkbox + revoke link) and TTLs for stored payloads.
5) **Frontend state:** Keep our plan to move to Zustand `persist` for local durability; use the frameworks only for orchestration and messaging.

## Effort vs benefit (estimate)
- n8n orchestration: ~0.5–1 day to deploy + hook webhooks.
- Medusa workflow pattern: ~0.5 day to adapt as reference (no need to run Medusa fully).
- Supabase/R2 payload store: ~0.5 day to stand up table/bucket + token signer.
- Consent/UX borrow from Spree/Saleor: ~0.25 day to document and implement.

