import { useEffect, useMemo } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { env } from '@/utils/env'
import { setNoIndex } from '@/lib/seo'

export const ShopifyCheckoutHandoffPage = () => {
  const location = useLocation()

  useEffect(() => {
    setNoIndex()
  }, [])

  const shopifyStoreDomain = env('SHOPIFY_STORE_DOMAIN')

  const fullPath = useMemo(() => `${location.pathname}${location.search}${location.hash}`, [location.hash, location.pathname, location.search])

  return (
    <MarketingLayout navItems={[]} subtitle="Checkout">
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Checkout</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-semantic-text-primary">This checkout link can’t load here</h1>
          <p className="mt-4 text-sm leading-relaxed text-semantic-text-primary/70">
            You’ve landed on a Shopify checkout/cart link (
            <span className="font-mono text-[12px] text-semantic-text-primary">{fullPath}</span>).
            It should be served by Shopify, but this domain is currently serving the Lumelle storefront app instead — which results in a blank screen.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <RouterLink
              to="/cart"
              className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white"
            >
              Back to cart
            </RouterLink>
            <RouterLink
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary"
            >
              Home
            </RouterLink>
          </div>

          <details className="mt-10 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-semantic-legacy-brand-blush/10 p-5">
            <summary className="cursor-pointer text-sm font-semibold text-semantic-text-primary">Developer details (why this happens + fix)</summary>
            <div className="mt-4 space-y-4 text-sm text-semantic-text-primary/80">
              <p>
                Shopify’s Storefront API returns cart checkout URLs on the shop’s <em>primary domain</em>. If Shopify’s primary domain is set to this same host
                while the headless app is deployed here, checkout URLs resolve back into the SPA instead of Shopify.
              </p>

              <div className="space-y-2 rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Observed</div>
                <div className="grid gap-1">
                  <div>
                    Current host: <span className="font-mono text-[12px]">{typeof window !== 'undefined' ? window.location.host : '(unknown)'}</span>
                  </div>
                  <div>
                    Configured Shopify API domain:{' '}
                    <span className="font-mono text-[12px]">{shopifyStoreDomain ?? '(not set)'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-semantic-text-primary">Fix options</p>
                <ol className="list-decimal space-y-2 pl-5">
                  <li>
                    In Shopify Admin → <span className="font-medium">Settings → Domains</span>, change the <span className="font-medium">primary domain</span> to a
                    Shopify-served domain (recommended: a subdomain like <span className="font-mono text-[12px]">shop.yourdomain.com</span>), and point that
                    subdomain’s DNS to Shopify.
                  </li>
                  <li>
                    If you must keep Shopify’s primary domain as-is, proxy Shopify checkout routes (at minimum <span className="font-mono text-[12px]">/cart/c/*</span>{' '}
                    and likely <span className="font-mono text-[12px]">/checkouts/*</span>) to Shopify at the edge (Cloudflare/Workers).
                  </li>
                </ol>
              </div>
            </div>
          </details>
        </div>
      </section>
    </MarketingLayout>
  )
}

export default ShopifyCheckoutHandoffPage
