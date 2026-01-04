# Visual Architecture Reference

This diagram illustrates the **Finalized Domain Structure** with the **UI Folder** pattern.

```text
src/
├── domains/
│   ├── landing/                 # 🟢 Example: A "Perfect" Domain
│   │   ├── ui/                  # 🎨 VIEW LAYER (React/JSX)
│   │   │   ├── pages/           #   -> LandingPage.tsx
│   │   │   ├── sections/        #   -> hero/, faq/, reviews/
│   │   │   ├── components/      #   -> Button.tsx, Card.tsx
│   │   │   └── layouts/         #   -> MarketingLayout.tsx
│   │   │
│   │   ├── logic/               # 🧠 BEHAVIOR LAYER (TypeScript)
│   │   │   ├── useLandingState.ts
│   │   │   └── form-handlers.ts
│   │   │
│   │   ├── data/                # 💾 DATA LAYER (API/Queries)
│   │   │   └── useProductsQuery.ts
│   │   │
│   │   └── hooks/               # 🪝 UTILS
│   │       └── useScrollSpy.ts
│   │
│   ├── shop/                    # 🟡 Example: The Shop Domain (Target State)
│   │   ├── ui/
│   │   │   ├── pages/
│   │   │   ├── sections/        #   -> (Move files here!)
│   │   │   └── ...
│   │   ├── logic/
│   │   └── ...
│   │
│   └── admin/                   # ⚪ Other Domains follow the same pattern
│       ├── ui/
│       ├── logic/
│       └── ...
│
├── components/                  # 🌐 Shared Global Components (Buttons, Inputs)
├── lib/                         # 🛠️ Shared Utilities (Supabase, Helpers)
└── types/                       # 📝 Shared TypeScript Definitions
```

## Key Rules
1.  **If it renders HTML**, it goes in `ui/`.
2.  **If it manages State**, it goes in `logic/`.
3.  **If it fetches Data**, it goes in `data/`.
4.  **If it's a Helper**, it goes in `hooks/` or `lib/`.
