# Vercel Middleware Snippet (if we inline tokens server-side later)

```ts
// middleware.ts (concept — not added)
import { NextResponse } from 'next/server'
import tokens from './src/theme/tokens.resolved.json'

export function middleware(req: Request) {
  const res = NextResponse.next()
  res.headers.set('x-brand-tokens', JSON.stringify(tokens))
  return res
}
```

For this Vite app, an alternative is a simple HTML transform during build to inline `generated.css` into `index.html` head. Kept here as a reference only; do not integrate until we decide on SSR/middleware approach.
