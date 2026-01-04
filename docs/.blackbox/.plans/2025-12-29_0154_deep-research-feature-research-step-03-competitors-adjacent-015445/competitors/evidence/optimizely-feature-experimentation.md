# Evidence Extract — Optimizely Feature Experimentation

- slug: `optimizely-feature-experimentation`
- category: feature experimentation + flags + audiences/targeting
- license: proprietary (SaaS)

## Cycle 13 — Evidence-backed primitives (audiences + rollout + experimentation UX)

### Notable features (3)

1) Feature Tests (experiments) are productized as a top-level primitive  
Evidence: https://support.optimizely.com/hc/en-us/articles/4410282697997-Feature-Test

2) Audiences / targeting logic is a first-class object with conditions and AND/OR logic (“targeting conditions”)  
Evidence: https://docs.developers.optimizely.com/feature-experimentation/docs/audiences

3) QA / debugging affordances exist (“QA Audience” to force bucketing via cookie / parameter)  
Evidence: https://docs.developers.optimizely.com/feature-experimentation/docs/create-a-qa-audience-to-test-experiments

### Copyable workflows (2)

1) Safe experiment setup: define audience/attributes → create feature test → QA with forced assignment → launch to audience  
Evidence: audiences + QA audience: https://docs.developers.optimizely.com/feature-experimentation/docs/audiences and https://docs.developers.optimizely.com/feature-experimentation/docs/create-a-qa-audience-to-test-experiments

2) “Targeting conditions” as a reusable admin primitive: create targeting rules once, reuse across tests/rollouts (reduces duplication)  
Evidence: audiences/targeting conditions: https://docs.developers.optimizely.com/feature-experimentation/docs/audiences

### 3 steal ideas (easy / medium / hard)

- Easy: ship a “targeting builder” UI that supports nested AND/OR and previews matching counts (even if first pass is limited).
- Medium: ship “QA mode” for flags/experiments (force variant) for internal testing + support debugging.
- Hard: build a full “audience object library” reusable across automation rules, approvals routing, and experimentation.

### Thin-slice implementation (1–3 days)

- Day 1: implement a minimal targeting rule builder (AND-only) for 2 attributes (role + country).
- Day 2: add QA overrides (force variant per user/email) with strict audit logging.
- Day 3: add “preview evaluation” endpoint: given a context, show which rules match + what variant chosen.

