# OSS Project Entry

## Identity

- Name: growthbook
- Repo: https://github.com/growthbook/growthbook
- Full name: growthbook/growthbook
- License: Mixed (MIT Expat + GrowthBook Enterprise License for specific directories)
- Stars (approx): 7203
- Forks (approx): 650
- Primary language: TypeScript
- Last updated: 2025-12-28T18:52:30Z
- Topics: ab-testing, abtest, abtesting, analytics, bigquery, clickhouse, continuous-delivery, data-analysis, data-engineering, data-science, experimentation, feature-flagging, feature-flags, mixpanel, redshift, remote-config, snowflake, split-testing, statistics

## What it gives us (plain English)

- A combined feature flag + experimentation platform (flags, experiments, variants)
- A UI for managing flags/experiments and reviewing results (depending on which features are OSS vs enterprise)
- SDKs to evaluate flags and assign experiment variants in apps/services
- Integrations with common analytics/data warehouse backends (varies by deployment and edition)
- A pragmatic “unify flags + A/B tests” approach for product iteration

## What feature(s) it maps to

- Feature flags with variants (experimentation-adjacent)
- A/B testing / experimentation management (if the needed surfaces are in the MIT-licensed portions)
- Remote config (feature configuration delivery)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Good. TypeScript-heavy; integrates via SDKs and HTTP APIs. We can wrap evaluations behind our own `featureFlags` boundary to avoid lock-in.
- Setup friction (self-host? SaaS? Docker?): Moderate. Self-host is doable, but experimentation requires additional analytics plumbing (events + metrics).
- Data model alignment: Good for “product teams own experiments” but multi-tenant SaaS needs a clear approach: global experiments vs per-tenant experiments.

## Adoption path

- 1 day POC:
  - Run GrowthBook locally (Docker) and create a simple flag + a simple experiment with 2 variants.
  - Integrate one service/UI surface with the SDK to assign variants and gate behavior.
  - Track 1 dummy metric (event counter) to validate end-to-end assignment + tracking.
  - Identify which required features live in enterprise-only directories (license gate).
- 1 week integration:
  - Decide “flags only” vs “flags + experiments” (experiments are the expensive part).
  - Define event + metric capture strategy (existing analytics pipeline vs build minimal).
  - Implement tenant-aware targeting and guardrails (don’t run experiments that break tenant contracts).
  - Add governance: experiment templates, required logging, and a kill-switch path.
  - If proceeding, productionize deployment + permissions; otherwise fallback to Unleash/Flagsmith for flags.
- 1 month hardening:
  - Add rigorous metric definitions (north-star + guardrail metrics) and analysis workflow.
  - Add experiment lifecycle automation (start/stop, cleanup, flag graduation).
  - Add data QA and backfill handling for analytics correctness.

## Risks

- Maintenance risk: Medium. Full experimentation stacks tend to sprawl (metrics, pipelines, governance).
- Security risk: Medium. Similar to feature flags; plus experiment assignment data can become sensitive.
- Scope mismatch: Medium. If we just need feature flags, this is more than we need.
- License risk: High. Repository includes GrowthBook Enterprise-licensed directories; treat as “mixed license” and confirm required features are MIT-licensed before adopting.

## Sources

- https://github.com/growthbook/growthbook
- https://raw.githubusercontent.com/growthbook/growthbook/main/LICENSE

## Score (0–100) + reasoning

- Score: 70
- Why: Strong product for flags + experiments, but licensing is mixed and experimentation adds significant analytics/governance complexity; consider “flags-only” alternatives first.

---

## Repo description (from GitHub)

Open Source Feature Flagging and A/B Testing Platform
