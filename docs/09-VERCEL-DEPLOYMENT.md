# Vercel Deployment Guide

This repo uses an npm workspace: the root `package.json` proxies commands into
`/app`, which holds the Vite project. Vercel just needs the correct build
command and output directory.

## Dashboard Setup

1. Open the project in Vercel and go to **Settings → General → Project Settings**.
2. Leave **Root Directory** at the repository root.
3. Confirm the build commands:
   - **Install Command:** `npm install`
   - **Build Command:** `npm run build`
   - **Output Directory:** `app/dist`
4. Save the settings and trigger a new deploy.

Vercel will run installs at the workspace root, execute the build script (which
delegates to `/app`), and serve the generated `app/dist` output.

## CLI Deploy (optional)

```bash
cd /path/to/Luminelle-Partnership
vercel --prod          # runs install + build via workspace scripts
# or, if you already ran `npm run build`, push the prebuilt output:
vercel --prod --prebuilt
```

## Common Pitfalls

- **404 NOT_FOUND:** Usually means the output directory wasn’t set to `app/dist`
  or the build failed. Double-check the settings above.
- **Missing favicon warning:** add an icon at `app/public/favicon.ico` (or remove the reference) to silence the console 404.
- **Environment variables:** create a `.env` file in `/app` and configure the same keys in the Vercel dashboard (*Settings → Environment Variables*).

Refer back to this doc whenever the deployment footprint changes (e.g., folder rename, different build script).
