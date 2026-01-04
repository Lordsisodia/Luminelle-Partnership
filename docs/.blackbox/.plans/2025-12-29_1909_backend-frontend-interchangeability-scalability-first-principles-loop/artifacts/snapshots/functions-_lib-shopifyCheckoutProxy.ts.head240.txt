import type { Env, PagesContext } from './types'

const LOOP_HEADER = 'x-lumelle-checkout-proxy-hop'
const MAX_HOPS = 3

function getUpstreamHost(env: Env & Record<string, unknown>): string | null {
  const raw =
    (env.SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN as string | undefined) ||
    (env.SHOPIFY_STORE_DOMAIN as string | undefined) ||
    (env.VITE_SHOPIFY_STORE_DOMAIN as string | undefined)
  const host = typeof raw === 'string' ? raw.trim() : ''
  return host ? host : null
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function errorHtml(opts: {
  currentHost: string
  upstreamHost: string | null
  requestedPath: string
  reason?: string
}) {
  const { currentHost, upstreamHost, requestedPath, reason } = opts
  const upstream = upstreamHost ? escapeHtml(upstreamHost) : '(not set)'
  const why = reason ? `<p><strong>Reason:</strong> ${escapeHtml(reason)}</p>` : ''

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Checkout unavailable</title>
    <style>
      body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; margin:0; background:#fff; color:#2a1f1a;}
      .wrap{max-width:760px; margin:0 auto; padding:48px 20px;}
      .card{border:1px solid rgba(160,120,120,.25); border-radius:16px; padding:20px; background:rgba(247,217,207,.12);}
      code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace; font-size:12px;}
      a{color:#2a1f1a;}
      .btn{display:inline-block; margin-top:14px; padding:10px 14px; border-radius:999px; background:#2a1f1a; color:#fff; text-decoration:none; font-weight:600; font-size:14px;}
      .muted{opacity:.75}
    </style>
  </head>
  <body>
    <div class="wrap">
      <h1>Checkout can’t load on ${escapeHtml(currentHost)}</h1>
      <div class="card">
        <p>
          You’re on a Shopify checkout/cart link:
          <br />
          <code>${escapeHtml(requestedPath)}</code>
        </p>
        ${why}
        <p class="muted">
          This site is hosted as a headless app on <code>${escapeHtml(currentHost)}</code>, but Shopify is currently issuing checkout URLs on that same host.
          To make a proxy work, Shopify must serve checkout pages from an upstream domain (usually <code>…myshopify.com</code>) that does <em>not</em> redirect back here.
        </p>
        <p><strong>Upstream configured:</strong> <code>${upstream}</code></p>
        <p>
          Fix: In Shopify Admin → <strong>Settings → Domains</strong>, set the store’s <strong>primary domain</strong> to <code>${upstream}</code>
          (or to a dedicated Shopify subdomain like <code>shop.${escapeHtml(currentHost)}</code>), then try again.
        </p>
        <a class="btn" href="/cart">Back to cart</a>
      </div>
    </div>
  </body>
</html>`
}

function getSetCookieValues(headers: Headers): string[] {
  const anyHeaders = headers as any
  if (typeof anyHeaders.getSetCookie === 'function') {
    const values = anyHeaders.getSetCookie()
    return Array.isArray(values) ? values : []
  }
  const single = headers.get('set-cookie')
  return single ? [single] : []
}

function rewriteSetCookieDomain(setCookie: string, upstreamHost: string, currentHost: string): string {
  const lc = setCookie.toLowerCase()
  const upstreamLc = upstreamHost.toLowerCase()
  if (!lc.includes('domain=')) return setCookie

  // Replace explicit upstream cookie domain to current host.
  const domainRegex = new RegExp(`(;\\s*domain=)${upstreamLc}(?=;|$)`, 'i')
  if (domainRegex.test(setCookie)) {
    return setCookie.replace(domainRegex, `$1${currentHost}`)
  }

  return setCookie
}

export async function proxyShopifyCheckout(context: PagesContext<Env & Record<string, unknown>>): Promise<Response> {
  const { request, env } = context

  const currentUrl = new URL(request.url)
  const currentHost = currentUrl.host
  const currentPath = `${currentUrl.pathname}${currentUrl.search}`

  const hop = Number.parseInt(request.headers.get(LOOP_HEADER) || '0', 10)
  if (Number.isFinite(hop) && hop >= MAX_HOPS) {
    return new Response(
      errorHtml({
        currentHost,
        upstreamHost: getUpstreamHost(env),
        requestedPath: currentPath,
        reason: `Checkout proxy loop guard triggered (hop=${hop}).`,
      }),
      { status: 508, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } },
    )
  }

  const upstreamHost = getUpstreamHost(env)
  if (!upstreamHost) {
    return new Response(
      errorHtml({
        currentHost,
        upstreamHost,
        requestedPath: currentPath,
        reason: 'Missing SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN / SHOPIFY_STORE_DOMAIN in Pages environment variables.',
      }),
      { status: 500, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } },
    )
  }

  if (upstreamHost.toLowerCase() === currentHost.toLowerCase()) {
    return new Response(
      errorHtml({
        currentHost,
        upstreamHost,
        requestedPath: currentPath,
        reason: `Upstream host is configured as the same as the current host (${currentHost}). This would self-fetch and loop.`,
      }),
      { status: 500, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } },
    )
  }

  const upstreamUrl = new URL(request.url)
  upstreamUrl.hostname = upstreamHost
  upstreamUrl.protocol = 'https:'

  const upstreamHeaders = new Headers(request.headers)
  upstreamHeaders.set(LOOP_HEADER, String((Number.isFinite(hop) ? hop : 0) + 1))

  const upstreamRequest = new Request(upstreamUrl.toString(), {
    method: request.method,
    headers: upstreamHeaders,
    body: request.body,
  })
  const upstreamResponse = await fetch(upstreamRequest, { redirect: 'manual' })

  // If Shopify is redirecting back to the current host, the proxy cannot complete until Shopify domains are adjusted.
  if (upstreamResponse.status >= 300 && upstreamResponse.status < 400) {
    const location = upstreamResponse.headers.get('location')
    if (location) {
      const next = new URL(location, upstreamUrl)
      if (next.host === currentHost) {
        const redirectReason = upstreamResponse.headers.get('x-redirect-reason') || 'primary domain redirection'
        return new Response(
          errorHtml({
            currentHost,
            upstreamHost,
            requestedPath: currentPath,
            reason: `Shopify redirected upstream checkout request back to ${currentHost} (${redirectReason}).`,
          }),
          { status: 502, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } },
        )
      }
    }
  }

  const headers = new Headers(upstreamResponse.headers)
  headers.set('cache-control', 'no-store')

  // Keep the shopper on the current host by rewriting absolute redirects.
  const location = headers.get('location')
  if (location) {
    const next = new URL(location, upstreamUrl)
    if (next.host === upstreamHost) {
      headers.set('location', `${currentUrl.origin}${next.pathname}${next.search}${next.hash}`)
    }
  }

  // Rewrite Set-Cookie domains so the browser stores them on the current host.
  const setCookies = getSetCookieValues(headers)
  if (setCookies.length > 0) {
    headers.delete('set-cookie')
    for (const cookie of setCookies) {
      headers.append('set-cookie', rewriteSetCookieDomain(cookie, upstreamHost, currentHost))
    }
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers,
  })
}
