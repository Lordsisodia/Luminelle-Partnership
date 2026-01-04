# OSS Discovery Query Bank (combined)

## Base query bank

# GitHub Search Queries — Returns-only (v2, topic-qualified)
#
# Goal: focus on RMA/returns/store-credit primitives with less noise.
# Strategy: prefer `topic:` and explicit returns vocabulary; avoid generic "script"/"agreement"/"whitepaper" patterns.

## Topic-qualified returns/RMA (best signal when present)
- `topic:rma topic:ecommerce`
- `topic:returns topic:ecommerce`
- `topic:reverse-logistics topic:ecommerce`
- `topic:return-portal topic:ecommerce`

## Shopify returns apps / portals (narrower)
- `"return portal" "shopify app"`
- `"returns" "shopify app" "store credit"`
- `"exchange" "shopify app" "store credit"`

## Store credit primitives
- `"store credit" "returns" ecommerce`
- `"store credit" refund exchange`

## RMA workflow primitives
- `"rma" "return reason" taxonomy`
- `"return request" "rma number"`
- `"return received" inspection restock`


## Derived from competitor feature map

# OSS Discovery Queries (derived from feature map)

Source: `.blackbox/.local/feature-map-returns.md`

These are auto-generated and intentionally capped per section.

## Admin UX primitives

- audit log open source
- rbac open source
- approval workflow open source
- csv import mapping open source

## Automation / Workflows

- return approval workflow open source
- refund approval workflow open source
- SLA timers escalation open source
- event log audit trail open source
- workflow engine open source
- job queue dashboard open source
- idempotency keys open source
- webhook ingestion open source

## Returns / Exchanges

- return portal open source
- RMA workflow open source
- return reasons taxonomy open source
- exchanges open source
- store credit issuance open source
- return label generation open source
- warehouse receiving + inspection open source
- restock disposition workflow open source
- refund approvals policy checks open source
- returns portal ecommerce open source
- rma management open source
- wismo where is my order portal open source

