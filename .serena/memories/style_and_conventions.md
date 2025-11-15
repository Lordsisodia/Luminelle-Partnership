## Code style notes
- TypeScript (ES2020) with React 18 and Tailwind; Vite handles compilation.
- ESLint config extends `@eslint/js` + `typescript-eslint` + React Hooks + React Refresh defaults; linting targets `**/*.{ts,tsx}`.
- Components lean on Tailwind utility classes and typed content models in `src/content`.
- Prefer functional React components, hooks, and composition via `src/sections`.
- Keep `dist/` out of source control per ESLint global ignores.