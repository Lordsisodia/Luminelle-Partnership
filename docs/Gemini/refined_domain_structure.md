# Refined Domain Structure: The "UI" Folder

You asked: *"Why separate pages and sections? Why not put them in a UI folder?"*

**You are absolutely right.**
Grouping all "View" concerns (JSX/React) into a `ui/` folder creates a much cleaner separation from the "Non-View" concerns (Logic, Data, Hooks).

## The New Proposed Structure

Inside each domain (e.g., `src/domains/landing/`), we group everything visual under `ui/`.

```text
src/domains/landing/
├── ui/                      # 🎨 THE VIEW (React Components)
│   ├── pages/               # Route Entry Points (e.g., LandingPage.tsx)
│   ├── sections/            # Major Page Blocks (e.g., Hero, FAQ)
│   ├── components/          # Domain-specific small components (e.g., HeroButton)
│   └── layouts/             # Page Wrappers (e.g., MarketingLayout)
│
├── logic/                   # 🧠 THE BRAIN (State, Handlers, Validation)
│   ├── useLandingLogic.ts
│   └── form-handlers.ts
│
├── data/                    # 💾 THE DATA (API Calls, Queries)
│   ├── useLandingQuery.ts
│   └── api.ts
│
└── hooks/                   # 🪝 UTILS (Generic Helpers)
    └── useScrollSpy.ts
```

## Why this is Better
1.  **Clear Separation**:
    *   **`ui/`** = Things that render HTML (JSX).
    *   **`logic/` & `data/`** = Things that run TypeScript/JS (No JSX).
2.  **Less Clutter**: When you open a domain, you only see 4 top-level folders (`ui`, `logic`, `data`, `hooks`) instead of 7.
3.  **Mental Model**: "I need to change how it *looks*" -> Go to `ui`. "I need to change how it *works*" -> Go to `logic`.

## Comparison

| Feature | Old Structure | **New Structure (Proposed)** |
| :--- | :--- | :--- |
| **Pages** | `domains/landing/pages/` | `domains/landing/ui/pages/` |
| **Sections** | `domains/landing/sections/` | `domains/landing/ui/sections/` |
| **Components** | `domains/landing/components/` | `domains/landing/ui/components/` |
| **Logic** | `domains/landing/logic/` | `domains/landing/logic/` (Unchanged) |

## Next Steps
If you approve this structure, I will:
1.  Update the `standardize-domains.mjs` script.
2.  Move the existing folders in `landing` and `shop` into this new `ui/` folder.
