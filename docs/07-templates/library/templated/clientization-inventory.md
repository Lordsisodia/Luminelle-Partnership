# Clientization Inventory (Rename/Replace Hotspots)

When you copy this repo for a new client, these are the most common “Lumelle-specific” rename/replace hotspots.

This doc exists to prevent a “search the whole repo and hope” workflow.

---

## Recommended search terms

After copying, search for:
- `Lumelle` (brand name)
- `lumelle_` (storage keys and internal identifiers)
- `luminele` (asset folder naming; image paths)
- `LUM-` (order prefixes / examples)

Then decide whether each occurrence should become:
- **brandName** (human-readable), or
- **appSlug** (identifier prefix), or
- **content** (client copy/assets).

---

## Brand and UI hotspots (human-visible)

Common places brand names show up:
- Headers/footers/nav/drawers
- SEO defaults (site title, description, OG image)
- Legal pages, landing copy, blog author (“Studio”), etc.

---

## Storage keys (template risk)

There are brand-prefixed keys (examples):
- `lumelle_cart`, `lumelle_cart_v2`, `lumelle_shopify_cart_id`
- `lumelle_orders`, `lumelle_addresses`, `lumelle_payments`
- `lumelle_admin_pass`, `lumelle_anon_id`, `lumelle_session_id`
- Supabase client storage keys like `sb-lumelle-*`

Template-hardening recommendation:
- replace all hardcoded prefixes with keys derived from `appSlug`.

---

## Assets / image paths

Many content files reference paths like:
- `/uploads/luminele/...`

Per client you will:
- replace images under `public/uploads/*`, or
- update the asset base URL and paths.

---

## Shopify billing / plan names (if used)

If the Shopify embedded app billing flows are used, update:
- plan names
- plan pricing
- any brand strings

---

## Product merchandising config

Per client:
- product handles/variant IDs are different
- product copy/FAQs/galleries differ

So PDP configs should be considered client content, not template core.

