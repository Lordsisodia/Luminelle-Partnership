# OSS Project Entry

## Identity

- Name: Kustomize
- Repo: https://github.com/kubernetes-sigs/kustomize
- Full name: kubernetes-sigs/kustomize
- License: Apache-2.0
- Primary language: Go

## What it gives us (plain English)

- A mature “overlay/patch” system for config/package customization without forking the base
- A clean mental model for storefront generation if we treat generated artifacts as “base + overlays”:
  - base template owned by us
  - overlays owned by merchant/project
  - upgrades apply cleanly by updating the base while overlays stay stable
- Practical patterns for:
  - file ownership boundaries
  - declarative customization
  - repeatable builds

## What feature(s) it maps to

- Template upgrade safety (avoid forks; use overlays)
- Release channels (stable base + experimental overlays)
- “Generator-owned vs merchant-owned” boundary enforcement

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Indirect (tooling model). Very valuable as a design pattern even if we don’t literally use Kustomize.
- Setup friction (self-host? SaaS? Docker?): Medium if adopted directly; low if used as “pattern reference”.
- Data model alignment: High for any “we generate code + allow safe customization + ship upgrades” system.

## Adoption path

- 1 day POC:
  - Model a storefront template repo as:
    - `base/` (generator-owned)
    - `overlays/<merchant>/` (merchant/project customization)
  - Use patches to customize:
    - theme tokens
    - nav structure
    - a feature flag default
  - Simulate an upgrade by changing `base/` and confirming overlays still apply.
- 1 week integration:
  - Decide whether we:
    - adopt Kustomize-like semantics in our own generator, or
    - literally use Kustomize for non-code assets (configs/manifests) and borrow the model for code
  - Create a “ownership manifest” that mirrors the overlay boundary:
    - generator-owned files are overwritten on upgrade
    - merchant-owned overlays are preserved
  - Integrate upgrade flow:
    - generate a PR that bumps base template version
    - apply overlays
    - run CI gates (Theme Check / Playwright / Lost Pixel / Lighthouse CI)
- 1 month hardening:
  - Add conflict detection UX: show merchants/support where an overlay patch no longer applies.
  - Provide guided resolution tools (automatic patch rebase suggestions).
  - Maintain versioned base templates with release notes (Changesets/release-please).

## Risks

- Maintenance risk: Medium. If we adopt the model deeply, we must maintain tooling and semantics.
- Security risk: Low. Mostly about keeping customization boundaries safe.
- Scope mismatch: Medium. If we never allow customization or never upgrade, overlays aren’t needed.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/kubernetes-sigs/kustomize
- https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/LICENSE

## Score (0–100) + reasoning

- Score: 68
- Why: High-quality “no-forks customization + upgrades” model; even if we don’t adopt it literally, it’s the right conceptual primitive for scalable storefront template upgrades.

