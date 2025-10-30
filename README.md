# Lumelle Affiliate Landing

This is the marketing experience for the Lumelle creator program. Built with React + Vite + Tailwind and powered by the SISO App Factory component workspace.

## Getting started

```bash
npm install
npm run dev
```

Create a `.env` file based on `.env.example` to configure the WhatsApp invite link, support email, and content brief URL used throughout the flow.

## Project structure

- `app/` – Vite application source (views, sections, data models). All npm
  commands are proxied through the root workspace.
- `components-library/` – Local clone of `siso-app-factory` component workspace (used for future UI imports).
- `docs/` – Client documentation and requirements.

### App folders

- `src/content` – Typed content models for each section/page.
- `src/sections` – Landing page sections composed with Tailwind.
- `src/pages` – Route-level components (landing, welcome, brief, legal).
- `src/hooks` – Shared hooks (scroll spy, WhatsApp fallback).
- `src/layouts` – Shells shared across pages.

## Available scripts

At the root (workspace-aware):

- `npm run dev` – Start Vite dev server.
- `npm run build` – Type-check and build for production.
- `npm run preview` – Preview production build locally.

## Next steps

- Wire in selected components from `@siso/ui` to replace bespoke Tailwind blocks once we pick candidates.
- Swap placeholder imagery for approved assets (hero, creator avatars, brand photography).
- Configure analytics + conversion tracking to monitor CTA interactions and drop-off.

## Temporary imagery

Development placeholders live in `app/public/images` using royalty-free photos from Pexels (IDs 934069, 3735641, 3865674, 3184396, 3760858, 415829, 1448971). Replace with client-approved assets before launch and verify licensing.
