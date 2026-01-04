# 006 — PWA assets + service worker caching risks (verify deploy behavior)

## Summary
The app registers a service worker at runtime:

- `src/main.tsx` calls `navigator.serviceWorker.register('/sw.js')`

The app therefore assumes:
- `public/sw.js` is shipped at `/sw.js`
- `public/manifest.webmanifest` is shipped at `/manifest.webmanifest`

If these files are missing in the deployment artifact (or served from a different path), PWA install/offline behavior breaks and the console logs SW registration errors.

## Impact
- **Medium**: PWA install/offline breaks, and noisy console errors appear, if the SW/manifest don’t ship.
- **Medium/High**: caching behavior can serve stale assets if the service worker cache name isn’t bumped across releases.

## Evidence
- `src/main.tsx` registers `/sw.js` unconditionally on `window.load`.
- `public/sw.js` and `public/manifest.webmanifest` exist and must be included in the host’s static output.

## Repro
1. Build and inspect output:
   - run `npm run build`
   - confirm `dist/sw.js` and `dist/manifest.webmanifest` exist (Vite should copy `public/*` to `dist/*`)
2. Deploy to your host and load the app.
3. Observe:
   - if `/sw.js` is missing → SW registration fails (console error)
   - if SW is present but cache settings are wrong → users can get stuck on stale assets

## Fix Direction
- Ensure `public/sw.js` + `public/manifest.webmanifest` are deployed at the expected paths.
- Consider guarding SW registration in dev if caching causes debugging issues.
- Adopt a release/version strategy for the SW cache name (or integrate a build-time SW solution) so users don’t get stuck with outdated bundles.
