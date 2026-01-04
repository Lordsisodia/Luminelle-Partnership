---
step: 0031
created_at: "2025-12-30 19:15"
title: "Checkpoint: Tranche 20 mask drift + evidence policy enforcement (Conftest/git-secrets/Puppeteer/Cypress/Kyverno) + artifacts updated"
---

# Step 0031: Checkpoint: Tranche 20 mask drift + evidence policy enforcement (Conftest/git-secrets/Puppeteer/Cypress/Kyverno) + artifacts updated

## ✅ What I did (facts)

- Deepened Tranche 20 (N=5) “mask drift + evidence policy enforcement” repos with concrete adoption plans + verified license notes:
  - `oss/entries/open-policy-agent-conftest.md` (Apache-2.0)
  - `oss/entries/awslabs-git-secrets.md` (Apache-2.0)
  - `oss/entries/puppeteer-puppeteer.md` (Apache-2.0)
  - `oss/entries/cypress-io-cypress.md` (MIT)
  - `oss/entries/kyverno-kyverno.md` (Apache-2.0)
- Created manual `oss/entries/*.json` metadata files for the tranche:
  - `oss/entries/open-policy-agent-conftest.json`
  - `oss/entries/awslabs-git-secrets.json`
  - `oss/entries/puppeteer-puppeteer.json`
  - `oss/entries/cypress-io-cypress.json`
  - `oss/entries/kyverno-kyverno.json`
- Updated artifacts:
  - `artifacts/oss-candidates.md` (added repos + deepened pointers)
  - `artifacts/build-vs-buy.md` (added evidence policy enforcement row)
  - `artifacts/summary.md` (added Tranche 20 section)
  - `artifacts/sources.md` (added license proof links)
  - `progress-log.md` (logged tranche completion)

## 🧠 What I learned (new information)

- “Mask drift” is inevitable if masks are static rectangles; selector-driven masks are more resilient but require a stable selector contract.
- The right architecture is policy-first:
  - treat the evidence bundle as a manifest that must pass allowlist/denylist policies (Conftest/OPA)
  - only then allow artifact upload and promotion.
- Secret scanning should happen at multiple points:
  - pre-commit (git-secrets)
  - pre-PR (Gitleaks)
  - pre-upload (evidence manifest policy + targeted scanning).

## 🧭 What changes because of this

- We can make “safe evidence” objectively enforceable:
  - evidence manifest must pass policy checks
  - masking must be proven (metadata + policy gate)
  - mask drift can be detected and reported in upgrade PRs.
- This reduces the operational burden on humans (“trust me it’s masked”) and makes support-safe evidence sharing realistic.

## ➡️ Next step

- Next tranche: define a concrete “Mask Rules v1” spec (or harvest more repos) for:
  - selector contracts per template/page type
  - fallback behavior when selectors missing
  - auto PR generation to update mask configs when drift detected

  (Alternative: build a small prototype script to generate selector→coords masks with Playwright/Puppeteer and integrate it into the upgrade pipeline.)

## 🔗 Links / references

- `oss/entries/open-policy-agent-conftest.md`
- `oss/entries/puppeteer-puppeteer.md`
- `artifacts/build-vs-buy.md`
- `artifacts/sources.md`
