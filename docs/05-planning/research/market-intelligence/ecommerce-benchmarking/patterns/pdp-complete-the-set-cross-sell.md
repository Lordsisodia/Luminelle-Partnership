# E-commerce Pattern Card

Pattern name: PDP “Complete the set” / outfit cross-sell module

Funnel stage: PDP

Problem it solves: Shoppers don’t know what to pair with an item, and AOV remains constrained to single-item purchases.

Why it works: Turns styling uncertainty into guided suggestions at the exact moment of purchase intent; increases AOV without forcing discounts and improves confidence by showing canonical combinations.

Evidence (required):
- Store: SKIMS
- Page URL: https://skims.com/products/fits-everybody-t-shirt-bra-onyx
- Screenshot link: pending (capture during manual audit)
- Notes (what the evidence proves): PDP includes “complete the set” style merchandising that promotes matching items.

Implementation notes (for our builds):
- UI placement: below primary product info (desktop) and below size selection / ATC (mobile).
- Copy guidance: “Complete the set”, “Pairs well with”, “Recommended with”.
- Data required: product-to-product associations (manual curation + optional algorithmic co-purchase).
- Edge cases: variants mismatch (color names), out-of-stock pair items, sizing mismatch across categories.

Tradeoffs / risks:
- Can feel pushy if too large or too early; must remain secondary to the main product.

Related patterns:
- Cart “pair it with” upsell (post-ATC)
- PDP “Shop the look” editorial modules
