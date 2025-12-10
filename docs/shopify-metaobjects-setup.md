Title: Product Content via Metaobjects (Setup)
Date: 2025-12-07

Goal
- Manage product page content (reasons, essentials, how-to, care, FAQ, optional gallery) inside Shopify, not in code.

What the code expects
- Product metafield: namespace `custom`, key `sections`, type: Metaobject (single reference).
- Metaobject definition (e.g., `lumelle_sections`) with fields (strings):
  - `heroSubtitle` (short text)
  - `essentials` (JSON array of { title, body })
  - `reasons` (JSON array of { title, desc })
  - `how` (JSON array of strings)
  - `care` (JSON array of { icon, title, body }) — icons optional keys: Shield, RefreshCcw, Feather
  - `faq` (JSON array of { q, a })
  - `gallery` (JSON array of image URLs)

How to configure
1) In Shopify Admin → Content → Metaobjects → Create definition (ID: `lumelle_sections`). Add the fields above (all plain text fields).
2) Create a metaobject entry with your content. For the JSON fields, paste valid JSON (see examples below).
3) In the product, add metafield `custom.sections` (type Metaobject) and select the entry.

Examples (paste in JSON fields)
- essentials:
```
[
  { "title": "Reusable waterproof", "body": "Dual-layer satin..." },
  { "title": "Satin lined", "body": "Smooth satin interior..." }
]
```
- reasons:
```
[
  { "title": "Our best seller", "desc": "Creator-tested fit..." },
  { "title": "Happier hair days", "desc": "Steam-blocking core..." }
]
```
- how:
```
["Slip on before your shower", "Rinse lining after", "Hang to air-dry"]
```
- care:
```
[
  { "icon": "Shield", "title": "Steam-shield core", "body": "Dual-layer satin..." },
  { "icon": "RefreshCcw", "title": "Reusable + easy care", "body": "Hand-wash friendly..." }
]
```
- faq:
```
[
  { "q": "Will it fit my hair?", "a": "Fits most lengths..." },
  { "q": "Is it waterproof?", "a": "Yes, TPU core..." }
]
```
- gallery:
```
["https://cdn.shopify.com/....jpg", "https://cdn.shopify.com/....jpg"]
```

What the app does
- `app/src/lib/sections.ts` fetches the metaobject referenced by `custom.sections` via Storefront API.
- `app/src/pages/product/ProductPage.tsx` merges the metaobject content into the UI, falling back to defaults when fields are missing.

Notes
- You can enhance the definition anytime—add fields for new sections and extend the mapper accordingly.
- If you prefer not to expose the public token, set `VITE_USE_SERVER_CART=1` and the app will use the server proxy to read sections.
