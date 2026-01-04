# Evidence Extract — Zapier Templates (Workflow Automation Templates)

- slug: `zapier-templates`
- category: workflow automation templates / solution templates
- license: proprietary (SaaS)

## Notable features (3)

1) Dedicated templates catalog (“Workflow Automation Templates”) with “no code needed” positioning  
Evidence: https://zapier.com/templates

2) Templates organized by use cases (category links like lead management, customer support, tickets/incidents)  
Evidence: use-case links rendered on https://zapier.com/templates (e.g., `/templates/lead-management`, `/templates/customer-support-management`, `/templates/ticket-incident-management`)

3) Templates have detail pages (e.g., `/templates/details/...`) implying a first-class template object model (metadata, steps/apps, etc.)  
Evidence: template detail links appear on https://zapier.com/templates (e.g., `/templates/details/unified-lead-capture`)

## Copyable workflows (2)

1) “Start from template” onboarding
- Browse by use case → open a template detail page → customize → enable and monitor  
Evidence: https://zapier.com/templates

2) Standardization via templates
- Recommend known-good templates for common business processes (lead capture, support triage) to reduce variance and errors  
Evidence: “Use cases” and “Featured solution templates” sections on https://zapier.com/templates

## 3 steal ideas (easy / medium / hard)

- Easy: template gallery with curated categories (“use cases”) and recommended defaults.
- Medium: template detail pages that surface required permissions, data touched, and “approval required” flags.
- Hard: sustained curation + ecosystem breadth (keeping templates current as integrations evolve).

## Thin-slice implementation (1–3 days)

- Day 1: ship a small template gallery (10 templates) grouped by use-case categories.
- Day 2: add template detail page with “preview steps” + required permissions + required secrets.
- Day 3: add “clone template → create rule” flow + audit trail for template usage.

