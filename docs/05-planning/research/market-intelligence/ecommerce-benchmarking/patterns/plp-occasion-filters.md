# E-commerce Pattern Card

Pattern name: PLP filters that match shopper mental models (occasion/fabric/fit)

Funnel stage: PLP

Problem it solves: Shoppers can’t narrow the catalog efficiently with only size/color/price, leading to choice overload and lower discovery→PDP conversion.

Why it works: Lets shoppers express intent the way they think (“wedding guest”, “linen”, “workwear”, “supportive”) which speeds time-to-product and increases conversion.

Evidence (required):
- Store: Sézane
- Page URL: https://www.sezane.com/us-en/collection/dresses
- Screenshot link: pending (capture during manual audit)
- Notes (what the evidence proves): Filters are discoverable, fast, and aligned to real shopping intents (not just attributes).

Implementation notes (for our builds):
- UI placement: persistent filter button (mobile) and left rail (desktop).
- Copy guidance: use shopper language (“occasion”, “fit”, “coverage”); avoid internal taxonomy names.
- Data required: product tagging, filter taxonomy, SEO-safe URLs, analytics events.
- Edge cases: filter combinations that yield 0 results; “clear all”; persistence across navigation.

Tradeoffs / risks:
- Taxonomy design is hard; bad filters create more confusion than no filters.

Related patterns:
- PLP “quick add” for low-consideration items
- Search autocomplete (when intent is specific)

