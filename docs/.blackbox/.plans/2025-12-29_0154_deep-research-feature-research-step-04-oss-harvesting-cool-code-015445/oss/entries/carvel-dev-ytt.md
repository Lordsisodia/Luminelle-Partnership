# OSS Project Entry

## Identity

- Name: ytt
- Repo: https://github.com/carvel-dev/ytt
- Full name: carvel-dev/ytt
- License: Apache-2.0
- Primary language: Go

## What it gives us (plain English)

- A templating + overlay system designed for safe customization (commonly used for YAML/config)
- Strong patterns for:
  - layering base templates with overlays
  - validating and shaping configuration
  - keeping customization “data-driven” instead of forks
- Useful as a direct tool for non-code assets, and as a conceptual model for storefront generator overrides

## What feature(s) it maps to

- Config-driven customization and overlays (avoid forks)
- Template upgrades with predictable merge semantics
- “Release channel” separation (stable template + optional overlays)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Indirect; strongest as a patterns repo or as tooling for configs.
- Setup friction (self-host? SaaS? Docker?): Medium if adopted directly. Low if used as a design reference.
- Data model alignment: High for any system where we want upgrades to apply cleanly while preserving local overrides.

## Adoption path

- 1 day POC:
  - Create a small “template config package” with:
    - base config for a storefront template (feature flags, endpoints, branding tokens)
    - overlay per merchant/project
  - Render final output and confirm overlays apply cleanly.
  - Simulate an upgrade: modify base and validate overlays still work.
- 1 week integration:
  - Use ytt for the parts of storefront generation that should be config-driven:
    - environment config
    - feature flags defaults
    - per-merchant endpoints and metadata
  - Pair with code generation:
    - treat code as generator-owned
    - treat config as overlay-owned
  - Hook into upgrade PR flow (create PR, render output, run tests, show diff).
- 1 month hardening:
  - Add schema/validation for merchant config (prevent invalid overrides).
  - Add a “diff explainer” that shows which overlay caused which output change.
  - Maintain versioned base packages with release notes.

## Risks

- Maintenance risk: Medium. Adds another templating DSL to maintain.
- Security risk: Medium if configs can include secrets; enforce strict secrets handling and redaction.
- Scope mismatch: Medium if we don’t do config-driven overrides.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/carvel-dev/ytt
- https://raw.githubusercontent.com/carvel-dev/ytt/develop/LICENSE

## Score (0–100) + reasoning

- Score: 60
- Why: Valuable overlay + validation model for “safe overrides without forks”; best when we want a strong config-driven layer in the storefront generator.

