# 001 — RESOLVED: Removed `@siso/ui` submodule dependency

Status: **Resolved** (2025-12-14)

## Summary
Historically, `package.json` depended on a **local file dependency**:

- `@siso/ui`: `file:./.siso-app-factory/packages/ui`

That path was provided by the `.siso-app-factory` git submodule, meaning fresh clones/CI without submodules could not install.

As of 2025-12-14, the dependency on `@siso/ui` has been removed from `package.json`, so the app no longer requires `.siso-app-factory` to install/build.

## Impact
- **Previously High**: fresh clones without submodules could not install dependencies.
- **Now**: should no longer block installs/builds.

## Evidence
- This repo contains `.gitmodules` for `.siso-app-factory`, and previously referenced it from `package.json`.
- `@siso/ui` is no longer listed as a dependency in `package.json`.

## Repro
This repro no longer applies if you’re on a commit after 2025-12-14.

To validate the fix:
1. Remove/rename `.siso-app-factory` locally (or clone without submodules).
2. Run: `npm install`
3. Expected result: install succeeds (no local file dependency on `.siso-app-factory`).

## Likely Root Cause
The UI package is intentionally managed as a submodule but **setup docs don’t mention** the required `git submodule` step.

## Fix Direction
Optional cleanup now that the dependency is removed:
- Remove `.siso-app-factory` from this repo entirely if it’s truly meant to live elsewhere (and update `.gitmodules` accordingly).
- Keep it, but document it as a separate/non-required workspace for other projects.
