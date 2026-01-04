# E-commerce Pattern Card

Pattern name: PDP fabric confidence module (composition + feel + care clarity)

Funnel stage: PDP

Problem it solves: Shoppers can’t judge material quality and “how it wears” online, leading to PDP drop-off and high returns.

Why it works: Makes “what this is made of” and “how to care for it” scannable and credible, reducing uncertainty about quality, comfort, and maintenance.

Evidence (required):
- Store: Reformation
- Page URL: https://www.thereformation.com/products/kastoria-dress/1310183DAL.html?dwvar_1310183DAL_color=DAL
- Screenshot link: pending (capture during manual audit)
- Notes (what the evidence proves): PDP presents fabric/care details in a compact, legible module rather than burying them.

Implementation notes (for our builds):
- UI placement: within PDP accordions/tabs; ensure first “peek” is visible above the fold on mobile.
- Copy guidance: plain language (avoid only technical textile terms); include care and feel (stretch/opacity if relevant).
- Data required: composition, care instructions, material feel tags, optional “fit/feel” attributes (stretch, opacity, lining).
- Edge cases: multi-material products; region-specific fiber naming; care icons accessibility.

Tradeoffs / risks:
- Overly technical specs can reduce clarity; keep it scannable with progressive disclosure.

Related patterns:
- PDP fit confidence module
- Reviews with photo content and fabric comments

