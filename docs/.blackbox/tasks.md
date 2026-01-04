# 📋 Docs Black Box — Tasks

## Active
- [x] Define the canonical `.blackbox` template structure
- [x] Add starter agents (docs feedback)
- [x] Add scaffolding scripts (new plan, new agent, new run, promote, check)
- [ ] Reverse-engineer + unify Shopify WebhookInbox (verify + dedupe + replay + audit)
  - Plan: `.blackbox/.plans/2026-01-02_0012_reverse-engineer-shopify-webhookinbox-best-of-both-worlds/`
  - Process: `.blackbox/.plans/2026-01-02_0012_reverse-engineer-shopify-webhookinbox-best-of-both-worlds/reverse-engineering-process.md`
- [ ] Run the UI↔Infra plug-in architecture research cycle (6–10h / ~50 prompts)
  - Plan: `.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/`
  - Prompt pack: `.blackbox/.prompts/ui-infra-architecture-cycle.md`
- [ ] Reduce vendor coupling: remove `gid://shopify/...` from UI + client config (track with `./.blackbox/scripts/check-vendor-leaks.sh`)
  - Run plan: `.blackbox/.plans/2025-12-29_0741_ui-infra-key-mapping-migration-remove-shopify-gids/`
- [ ] Keep `deepresearch/index.md` current as new evergreen notes are added (promote appends automatically)
- [ ] Ensure every meaningful doc change is logged in `docs/08-meta/repo/docs-ledger.md`
- [x] Archive old runs in `.plans/_archive/` when `.plans/` gets noisy
  - Age-based: `python3 ./.blackbox/scripts/archive-plans.py --older-than-days 14`
  - OSS burst cleanup (count-based): `python3 ./.blackbox/scripts/archive-oss-plans.py --keep-latest 12`

## Backlog
- [x] Decide where “snapshots” and large artifacts should live (gitignore heavy raw artifacts by default)
- [x] Add schema templates for agent outputs (`schemas/`)
- [ ] Research best landing-page review layout (UGC video vs text)
  - Plan: `.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/`
  - Note: `.blackbox/deepresearch/2026-01-01_reviews-layout-ugc-video-vs-text-landing-page.md`
