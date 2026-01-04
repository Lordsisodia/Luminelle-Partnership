# OSS Project Entry

## Identity

- Name: lakeFS
- Repo: https://github.com/treeverse/lakeFS
- Full name: treeverse/lakeFS
- License: Apache-2.0
- Primary language: Go

## What it gives us (plain English)

- “Git-like” versioning/branching for object storage (data lake focus, but the core idea is powerful)
- Conceptual match for template upgrades and artifact bundles:
  - versioned artifacts
  - “branch” for preview runs vs “main” for production-approved evidence
- Could enable a robust retention + provenance story for evidence artifacts

## What feature(s) it maps to

- Artifact versioning and provenance (who approved what evidence)
- Release channels: preview/staging/prod as branches
- Safer upgrades: compare artifacts between template versions

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Indirect (service), but it’s API-driven and designed to sit in front of object storage.
- Setup friction (self-host? SaaS? Docker?): High (platform component). Probably only worth it if we want strong versioning/provenance for stored artifacts.
- Data model alignment: Medium/High. Great if we treat evidence artifacts as first-class “versioned data”.

## Adoption path

- 1 day POC:
  - Run lakeFS locally against an object store backend (local/S3 dev).
  - Create:
    - a “preview” branch with evidence artifacts
    - merge/promote to “main” when approved
  - Confirm we can diff/list objects between branches.
- 1 week integration:
  - Decide scope:
    - use lakeFS only for evidence artifacts (not for app data)
    - define branch semantics (preview vs prod-approved)
  - Integrate with upgrade pipeline:
    - upload artifacts to preview branch
    - on approval, promote/merge to main
  - Expose in admin:
    - show evidence bundle “commit” linked to an upgrade approval
- 1 month hardening:
  - Add retention and compliance controls (who can access, who can delete).
  - Add automated garbage collection policies.
  - Add incident workflows (“freeze” evidence bundles for investigations).

## Risks

- Maintenance risk: High (service/platform).
- Security risk: High (sensitive artifacts + access controls).
- Scope mismatch: Medium/High unless we truly need versioned object storage semantics.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/treeverse/lakeFS
- https://raw.githubusercontent.com/treeverse/lakeFS/master/LICENSE

## Score (0–100) + reasoning

- Score: 49
- Why: Very compelling conceptual fit for artifact provenance, but likely too heavy unless we explicitly want “git-for-artifacts” operational rigor.

