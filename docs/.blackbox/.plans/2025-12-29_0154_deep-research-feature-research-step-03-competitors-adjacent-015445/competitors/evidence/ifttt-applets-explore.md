# Evidence Extract — IFTTT Explore / Applets (recipes gallery)

- slug: `ifttt-applets`
- category: trigger-action automation + templates (“applets/recipes” gallery)
- license: proprietary (SaaS)

## Notable features (3)

1) Explore UI supports browsing by tabs (All / Applets / Services / Stories) and provides search (“Search Applets or services”)  
Evidence: https://ifttt.com/explore

2) Applets are first-class recipe objects with shareable public URLs (e.g. `/applets/<id>-...`)  
Evidence: applet cards link to applet pages on https://ifttt.com/explore (example links visible in HTML).

3) Applet cards expose social proof (install counts like “360K users enabled this Applet”)  
Evidence: https://ifttt.com/explore

## Copyable workflows (2)

1) Discovery loop
- Explore → search/browse → open applet → enable (template-driven onboarding)  
Evidence: https://ifttt.com/explore

2) Template credibility loop
- Show install counts / popularity to guide users toward known-good automations (reduce “template roulette”)  
Evidence: installs metadata visible on https://ifttt.com/explore

## 3 steal ideas (easy / medium / hard)

- Easy: template gallery tabs + search input as default discoverability primitives.
- Medium: add “popularity” signals (usage count) and “pro” badges for premium templates.
- Hard: ecosystem management (prevent spam/low-quality templates; ensure template safety).

## Thin-slice implementation (1–3 days)

- Day 1: template gallery with search + categories + “popular templates” row.
- Day 2: add template usage telemetry (installs/uses) and surface popularity + “recommended” badges.
- Day 3: add template QA workflow (internal review + publish/unpublish + audit).

