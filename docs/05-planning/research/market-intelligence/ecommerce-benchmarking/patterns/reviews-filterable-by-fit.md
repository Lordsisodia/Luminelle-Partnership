# E-commerce Pattern Card

Pattern name: Reviews filterable by fit/size + photo reviews

Funnel stage: PDP

Problem it solves: Generic star ratings don’t answer “will it fit me?” or “what does it look like on a real body?”, so shoppers remain unconvinced.

Why it works: Makes reviews decision-useful by letting shoppers filter and interpret feedback based on size/fit and see real photos, which reduces uncertainty and increases PDP-to-cart.

Evidence (required):
- Store: SKIMS
- Page URL: https://skims.com/products/fits-everybody-t-shirt-bra-onyx
- Screenshot link: pending (capture during manual audit)
- Notes (what the evidence proves): Reviews module is present and meaningfully reduces doubt (filters, distribution, photos).

Implementation notes (for our builds):
- UI placement: PDP below fit/fabric modules; include “review summary” above the fold on mobile when possible.
- Copy guidance: highlight fit signal (“runs small/true/large”), and make filtering obvious.
- Data required: review content, ratings, fit votes, photo uploads, moderation.
- Edge cases: low review counts for new SKUs, spam moderation, locale differences, accessibility.

Tradeoffs / risks:
- Poor moderation and low-quality reviews can backfire; need safeguards (spam, fake reviews, bias).

Related patterns:
- PDP fit confidence module
- PDP fit quiz entry point

