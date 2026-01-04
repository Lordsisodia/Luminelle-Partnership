# Architectural Decisions

Date: 2025-12-20

## Conversation Notes
- Observed structure: `src/content/blog/*` holds posts.
- Architecture goal: domain-based organization.
- Question: Should blog content live under the blog domain (e.g., `src/domains/blog/...`) instead of a top-level `content/blog` directory?
- Intent: ensure content placement aligns with domain ownership and reduces cross-domain coupling.

## Open Considerations
- Where should shared Markdown/content live when the owning domain is clear (e.g., blog)?
- Do other domains also place content under `src/content`, or is blog the exception?
- Would relocating posts impact existing content tooling (loaders, MDX/Markdown pipeline)?
- Should we keep a global `content` area only for domain-agnostic assets, or co-locate all content with domains?

## Possible Next Steps
- Map current content-loading pipeline to see dependencies on `src/content`.
- Prototype moving one post into a domain-scoped location and verify build tooling.
- Decide and document a placement rule: domain-owned vs shared/agnostic content.
