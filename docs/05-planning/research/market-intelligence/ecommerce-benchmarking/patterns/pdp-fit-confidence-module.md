# E-commerce Pattern Card

Pattern name: PDP fit confidence module (model measurements + size worn + size guidance)

Funnel stage: PDP

Problem it solves: Shoppers hesitate to add-to-cart because they can’t predict fit, especially across brands and product families.

Why it works: Provides concrete, decision-enabling fit information (model size, measurements, fit notes) at the moment of intent, reducing sizing doubt and returns anxiety.

Evidence (required):
- Store: Reformation
- Page URL: https://www.thereformation.com/products/kastoria-dress/1310183DAL.html?dwvar_1310183DAL_color=DAL
- Screenshot link: pending (capture during manual audit)
- Notes (what the evidence proves): PDP surfaces fit/size guidance in a structured module near variant selection to reduce doubt.

Implementation notes (for our builds):
- UI placement: within primary PDP info; and in sticky ATC on mobile.
- Copy guidance: “Model is wearing size X”; “Runs small/true/large”; “Find your size”.
- Data required: model measurements, size worn, product fit notes, size charts (per category), optional “runs small/large” rules.
- Edge cases: multiple models (different sizes), inclusive sizing ranges, out-of-stock sizes, international sizing.

Tradeoffs / risks:
- Wrong data undermines trust; needs strong QA and tooling to keep content accurate.

Related patterns:
- PDP fit quiz entry point
- PDP reviews filterable by size/body type

