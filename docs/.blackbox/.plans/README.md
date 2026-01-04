# `.plans/` (Black Box execution plans)

This folder stores **plan folders** created by the AI before it starts complex work.

Each plan is a directory so it can hold multiple markdown files (checklist, docs-to-read, notes, artifacts, etc.).

## Pinned / canonical runs (start here)

If you’re trying to understand “the architecture work” without browsing dozens of plan folders, start with:

- Backend↔Frontend interchangeability + scalability (docs-only, evidence-first, runnable gates + dashboard):
  - `2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/`
- UI↔infra plug-in architecture (ports/adapters framing; capability-driven UI; 6–10h / ~50 prompts):
  - `2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/`
- Key mapping migration (remove Shopify GIDs above adapters):
  - `2025-12-29_0741_ui-infra-key-mapping-migration-remove-shopify-gids/`
- Architecture map + coupling hotspots (src mapping, docs-only):
  - `2025-12-29_1844_architecture-map-improvements-src/`
- Supabase multitenancy + decoupled backend posture (design input):
  - `2025-12-29_1901_supabase-multitenancy-decoupled-backend-cloudflare/`

Pin any other plan you care about:
- `touch ./.blackbox/.plans/<plan>/.keep`

## Plan folder naming convention

Use this format:

`YYYY-MM-DD_HHMM_<goal-slug>/`

Examples:
- `2025-12-28_1815_deep-research-theme-migration/`
- `2025-12-28_1820_debug-checkout-extension-install/`

Rules:
- Use **24-hour time** (`HHMM`)
- Keep `<goal-slug>` short and descriptive (kebab-case)

## Required contents inside each plan folder

At minimum:
- `README.md` — goal + created timestamp + context
- `docs-to-read.md` — explicit doc list and why
- `checklist.md` — step list with `[ ]` / `[x]`

Recommended:
- `artifacts.md` — what files were created/updated
- `notes.md` — revisions, decisions, open questions
- `artifacts/` — run outputs (raw, sources, extracted, summary, run-meta)

## Progress tracking rules (ticking steps off)

Use GitHub-style checkboxes:
- `- [ ]` not done
- `- [x]` done

Recommended completion format:
- `- [x] Step name (done: 2025-12-28 18:22)`

If the plan changes mid-way:
- Don’t rewrite history silently
- Record the change in `notes.md`

## Template

Start every plan by copying the folder:
- `_template/`

## Archiving (keep `.plans/` readable)

If `.plans/` gets noisy, archive older runs into `.plans/_archive/`:

```bash
# Preview (recommended)
python3 ./.blackbox/scripts/archive-plans.py --older-than-days 14 --dry-run

# Apply
python3 ./.blackbox/scripts/archive-plans.py --older-than-days 14
```

Pin a plan so it never archives:

```bash
touch ./.blackbox/.plans/<plan>/.keep
```

## Long-run cycles (6–10 hours / ~50 prompts)

For long CLI sessions, scaffold an `agent-cycle.md` inside a plan folder:

```bash
./.blackbox/scripts/start-agent-cycle.sh --keep --hours 8 --prompts 50 "my goal"
```
