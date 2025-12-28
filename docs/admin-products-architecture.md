# Admin Catalogue – Products Page Architecture Plan

## Current state (2025-12-23)
- File: `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`
- Size: ~1,755 lines.
- Responsibilities combined in one file:
  - Data fetching/saving (Supabase), snapshots, role debug.
  - Route/selection sync (`/admin/products` vs `/admin/products/:handle`).
  - Preview (device toggle + iframe) and sticky column.
  - List view cards.
  - All form sections (hero, bullets, care, proof, benefits, creators, TikTok, FAQs).
  - Local UI primitives (Pill, TextInput, DeviceFrame, DeviceToggle, ProductCard).

## Target architecture (modular)
```
domains/admin/catalog/
├── data/
│   ├── useProducts.ts          # fetch/save, snapshots, media upsert
│   ├── useProductSelection.ts  # route <-> selection sync, session cache
│   └── useProductSpecs.ts      # parse/update specs_text + helpers
├── ui/
│   ├── cards/ProductCard.tsx
│   ├── layouts/ProductsLayout.tsx   # grid shell with optional preview slot
│   └── sections/
│       ├── HeroSection.tsx
│       ├── SignToTrySection.tsx
│       ├── CareMaterialsSection.tsx
│       ├── ProofStripSection.tsx
│       ├── WhyLoveSection.tsx      # pills
│       ├── CreatorsSection.tsx     # heading + bullets
│       ├── TikTokFeatureSection.tsx
│       └── FaqSection.tsx
└── pages/ProductsPage.tsx          # orchestration only

domains/admin/shared/ui/preview/
├── IPhonePreviewCard.tsx           # reusable preview shell (iframe + mock)
├── IPhoneMockup.tsx                # reusable iPhone frame
├── DeviceFrame.tsx                 # (optional) generic device frame
└── DeviceToggle.tsx                # (optional) device toggle UI
```

## Refactor steps (safe, incremental)
1) Extract UI primitives:
   - Move `ProductCard` to `ui/cards/ProductCard.tsx`.
   - Move preview UI (`IPhoneMockup`, `DeviceToggle`/`DeviceFrame`) to `domains/admin/shared/ui/preview/*`.
   - Keep exports and update imports in `ProductsPage.tsx`.

2) Introduce data hooks:
   - `useProducts` handles loading/saving, media upserts, snapshots, dirty flag.
   - `useProductSelection` handles URL ↔ selection syncing and session cache.
   - `useProductSpecs` handles parsing/updating sections (reasons, care, proof, creators, TikTok, FAQs).
   - `ProductsPage` consumes hooks; removes large inline effects.

3) Split form sections:
   - For each section, create a component in `ui/sections/*` with typed props:
     `value` (structured), `onChange`, `onScrollPreview` (optional), `editing state`.
   - Keep styling identical; move JSX out of page.

4) Layout shell:
   - `ProductsLayout` owns the grid + sticky preview slot.
   - `IPhonePreviewCard` hosts iframe inside an iPhone mock and is reusable across admin editors.
   - Keep `DeviceFrame`/`DeviceToggle` available if we re-add tablet/desktop modes later.

5) Enable/disable preview via prop/flag (`showPreview`), not by deleting code.

6) Cleanup & tests:
   - Remove dead helpers from page.
   - Add unit tests for `useProductSpecs` defaults and mutations.

## Benefits
- Smaller, single-responsibility files; easier to onboard and extend new sections.
- Testable data/logic (hooks) independent of UI.
- Preview can evolve (iPhone mockup) without touching form sections.

## Notes
- Routing already supports `/admin/products/:handle` to persist selection on refresh.
- Preview is desktop-only (`xl:`) and uses shared components in `domains/admin/shared/ui/preview/`.
