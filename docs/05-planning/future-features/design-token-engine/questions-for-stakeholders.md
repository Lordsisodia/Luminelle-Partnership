# Questions for Stakeholders

Business / Product
- Do we need multi-brand (tenant) support at launch, or just faster theming for one brand?
- Are there reseller/white-label commitments with specific launch dates?
- Which screens are most brand-sensitive (prioritize in pilot)?

Design
- Are gradients part of the core identity or can they be derived from base colors?
- Do we need dark mode or high-contrast mode in v1?
- Should testimonial/promo accent colors be standardized or remain page-specific?

Engineering
- Hosting/SSR: can we inline tokens in HTML head at render time (Vercel middleware)?
- Components library path: will shared UI import app CSS vars, or do we publish tokens as a package?
- Any constraints on adding Playwright for VRT in CI?

Governance
- Who signs off on token changes? What’s the SLA for emergency a11y fixes?
- Versioning: accept semantic version bumps on token changes? 
