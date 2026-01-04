# E-commerce Pattern Card

Pattern name: PDP “Find my size” / Fit quiz entry point

Funnel stage: PDP

Problem it solves: “I don’t know my size in this brand” hesitation that blocks PDP→Add-to-cart.

Why it works: Converts sizing doubt into a guided micro-flow, then returns the shopper to the PDP with a recommended size; reduces returns anxiety by making the sizing decision feel “supported”.

Evidence (required):
- Store: ThirdLove
- Page URL: https://www.thirdlove.com/pages/fitting-room
- Screenshot link: pending (capture during manual audit)
- Notes (what the evidence proves): Fit quiz exists as a primary sizing-confidence mechanic and is accessible outside the PDP flow.

Implementation notes (for our builds):
- UI placement: PDP near size selector + persistent link in sticky ATC on mobile.
- Copy guidance: “Find your size” (avoid jargon); include confidence language (“takes ~30 seconds”).
- Data required: quiz answers, recommendation model, size chart mappings, optional “runs small/large” rules per product family.
- Edge cases: users between sizes; international sizing; out-of-stock recommended size (offer closest + back-in-stock).

Tradeoffs / risks:
- If recommendations are wrong, trust damage is worse than having no quiz.
- Adds maintenance overhead when sizing changes by category.

Related patterns:
- PDP model measurements + size worn
- Returns/exchanges clarity near size selector
