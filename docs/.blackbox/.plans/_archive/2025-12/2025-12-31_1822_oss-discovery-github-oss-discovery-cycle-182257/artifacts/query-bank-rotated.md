# OSS Discovery Query Bank (combined)

## Base query bank

# GitHub Search Queries — Support timeline + inbox primitives (v2, higher precision)

Goal: find OSS we can reuse for:

This query bank is intentionally **not** “find an entire helpdesk platform”.
We prefer **embeddable primitives** and “implementation-shaped” repos.

Recommended run settings:

---

- **shared inbox** / ticketing primitives (queues, states, tagging, SLAs)
- **embeddable chat widget patterns** (loader + identity handoff), as reference implementations
- `--no-derived-queries`
- `--min-stars 30–50` (many high-signal support primitives are niche)
- strong excludes for AI/LLM + note-taking apps + spammy “chat apps”
- **support timeline primitives** (threads, messages, assignments, internal notes)

## Core support primitives (inbox/ticketing)


- `ticketing system django helpdesk`
- `shared inbox open source ticketing`
- `helpdesk ticket queue assignment open source`
- `support inbox assignment sla open source`
- `customer support ticket follow up model open source`
- `django helpdesk ticketing open source`

## Timeline / activity feed UI (support-adjacent)


- `activity feed ui component react`
- `customer timeline ui component`
- `conversation timeline ui component react`

## Embeddable chat widget patterns (boot + identity)


- `customer support chat widget react`
- `embeddable chat widget react open source`
- `chat widget loader snippet open source`
- `website chat widget typescript open source`

## Integration primitives (APIs / adapters)


---

- `intercom api client open source`
- `helpdesk webhook integration open source`
- `zendesk api client open source`

## Exclusion guidance (reduce churn)

Prefer running with:

Rationale:


- we want *threads/messages/assignment* patterns, not “chatbot UI”
- `--exclude-keywords "ai,llm,chatgpt,copilot,knowledge-base,notes,note-taking,wiki,pkm"`
- `--exclude-regex "\\b(ai|llm|chatgpt|copilot|knowledge\\s*base|notes?|note-taking|pkm|second\\s*brain|obsidian|notion)\\b"`
- support primitives are frequently polluted by LLM apps and PKM/note products

## Derived from competitor feature map

# OSS Discovery Queries (derived from feature map)

_Disabled for this run._
