# OSS Project Entry

## Identity

- Name: Lost Pixel
- Repo: https://github.com/lost-pixel/lost-pixel
- Full name: lost-pixel/lost-pixel
- License: MIT
- Primary language: TypeScript

## What it gives us (plain English)

- Visual regression testing tooling aimed at modern frontend workflows
- Supports “snapshot → compare → report” workflows across typical UI sources like:
  - Storybook-like component catalogs
  - browser-based snapshots (e.g., via Playwright integrations)
- A practical way to keep “generated storefront templates” stable over time:
  - detect layout shifts and broken styling early
  - block promotions when UI diffs exceed thresholds

## What feature(s) it maps to

- Storefront generator regression protection (layout + styling diffs)
- Template upgrade safety (when we bump template versions, catch accidental changes)
- Preview environment gating (approve/reject based on visual diffs)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Strong for our TS frontend pipeline.
- Setup friction (self-host? SaaS? Docker?): Medium. Needs CI artifact storage and baseline management.
- Data model alignment: High (works at UI snapshot layer; backend agnostic).

## Adoption path

- 1 day POC:
  - Pick 3–5 critical storefront screens (home, collection, PDP, cart).
  - Generate snapshots from a known-good deployment and store baselines.
  - Run a diff on a small CSS/layout change to validate signal-to-noise.
  - Decide baseline policy:
    - per-template baselines (recommended)
    - per-merchant baselines (only if merchants heavily customize)
- 1 week integration:
  - Integrate into the storefront deploy pipeline:
    - on PR preview: run snapshots + diffs
    - post results back to PR (pass/fail + diff artifacts)
  - Add a “template upgrade workflow”:
    - run visual diffs against current production
    - require explicit approval for baseline updates
  - Add audit logging:
    - who approved baseline update
    - link to diff artifacts
- 1 month hardening:
  - Reduce flakiness:
    - deterministic fonts
    - stable viewport sizes
    - consistent data fixtures
  - Add a “UI contract suite” per template (baseline pages + components).
  - Build a support view: “what changed visually?” alongside the audit log.

## Risks

- Maintenance risk: Medium. Visual tests can be flaky without strong determinism controls.
- Security risk: Medium. Snapshot artifacts can contain PII; enforce scrubbed fixtures and strict access controls.
- Scope mismatch: Low. Very aligned with “generated storefront templates” and safe upgrades.
- License risk: Low (MIT).

## Sources

- https://github.com/lost-pixel/lost-pixel
- https://raw.githubusercontent.com/lost-pixel/lost-pixel/main/LICENSE

## Score (0–100) + reasoning

- Score: 73
- Why: A focused visual regression tool that fits modern TS workflows; particularly valuable for template versioning and upgrade safety in a managed-storefront model.

