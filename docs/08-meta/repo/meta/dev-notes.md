# Dev Notes (v2 sandbox)

- This branch (`dev`) is the v2 playground; keep `main` stable for v1.
- Cloudflare Pages preview should point to `dev` only; production deploys from `main`.
- When a change is production-ready, merge `dev` -> `main` via PR.
- Hotfixes for v1: branch off `main`, merge back to `main`, then cherry-pick into `dev` if needed.
- Remember to bump service-worker version or bust cache on major front-end changes.
