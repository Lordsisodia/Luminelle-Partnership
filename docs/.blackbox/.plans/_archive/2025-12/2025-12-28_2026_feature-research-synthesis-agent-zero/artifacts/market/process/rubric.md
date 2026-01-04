# Scoring Rubric (vibe-coding optimized)

We’re optimizing for **easy integration** and **high leverage**, not theoretical completeness.

## 1) Competitor scoring (0–100)

Score each competitor across:

- **Relevance (0–20):** How close to our target (Shopify-connected ecommerce + admin + workflows)?
- **Feature richness (0–20):** How many “real” features they ship vs marketing claims?
- **Workflow quality (0–20):** How good are their flows (ops, content, support, analytics)?
- **Differentiators (0–20):** Anything truly notable we should copy or counter?
- **Evidence quality (0–20):** Clear docs/demos/screenshots/pricing (not hand-wavy).

## 2) OSS candidate scoring (0–100)

- **Usefulness (0–30):** Does it cover a real feature we want?
- **Integration ease (0–25):** React/TS fit, API surface, self-host friction, docs.
- **Maintenance health (0–20):** stars, contributors, recent commits, releases, CVEs.
- **License friendliness (0–15):** prefer MIT/Apache/BSD; flag copyleft separately.
- **Time-to-value (0–10):** Can we get something working in 1–3 days?

## 3) Feature scoring (0–100)

- **Client value / ROI (0–35):** saves time / increases conversion / reduces support load.
- **Build feasibility (0–25):** can we ship MVP fast?
- **Data readiness (0–15):** do we already have the inputs?
- **UX clarity (0–15):** is it obvious to use and hard to misuse?
- **Strategic fit (0–10):** aligns with AI workflows + platform direction.

## 4) License policy (fill before heavy harvesting)

Choose one and write it at the top of the run’s `artifacts/open-questions.md`:

- `exclude` — skip GPL/AGPL entirely
- `flag` — include but clearly label for review

