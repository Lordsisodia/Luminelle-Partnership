# AI snapshots

This folder is for **image artifacts** generated from the app UI that you can attach to an AI system for analysis (layout, copy, hierarchy, visual regressions, etc.).

## Landing page screenshots

Generate a fresh set of landing page screenshots with:

```bash
npm run playwright:install
BASE_URL=http://localhost:5173 npm run snapshots:landing
```

Default output path:

- `docs/03-ai/ai-snapshots/landing/latest`

## Repo size note

Screenshots can be large. If you plan to commit these, consider:

- keeping only a small curated set (e.g. `desktop-full.jpeg`, `mobile-full.jpeg`, and a few section shots)
- using Git LFS if the folder grows

