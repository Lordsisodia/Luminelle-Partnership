import { useEffect, useMemo, useState } from 'react'
import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { toPublicUrl } from '@platform/seo/logic/publicBaseUrl'
import { productConfigs } from '@client/shop/products/data/product-config'
import { cdnUrl } from '@/utils/cdn'

const CATALOG = Object.values(productConfigs)
  // Avoid duplicate/alias handles showing up as separate products until the canonical handle strategy is defined.
  .filter((cfg) => !cfg.handle.endsWith('-set'))
  .map((cfg) => {
    const gallery = cfg.gallery ?? []
    const hero = gallery.find((src) => typeof src === 'string' && !src.startsWith('video://'))
    const image = hero ?? '/uploads/luminele/product-feature-06.webp'

    return {
      id: cfg.handle,
      title: cfg.defaultTitle,
      price: typeof cfg.defaultPrice === 'number' && Number.isFinite(cfg.defaultPrice) ? cfg.defaultPrice : 0,
      image: cdnUrl(image),
      href: `/product/${cfg.handle}`,
    }
  })

export const SearchResultsPage = () => {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const [draft, setDraft] = useState(query)

  useEffect(() => {
    setDraft(query)
  }, [query])

  const q = query.trim().toLowerCase()
  const hasQuery = q.length > 0
  const results = useMemo(() => {
    if (!hasQuery) return CATALOG
    return CATALOG.filter((p) => p.title.toLowerCase().includes(q))
  }, [hasQuery, q])

  const url = toPublicUrl('/search')
  const title = 'Search'
  const description = 'Find Lumelle products and guides to keep hair frizz-free.'

  const ldBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: toPublicUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Search', item: url },
    ],
  }

  return (
    <>
      <Seo
        title={title}
        description={description}
        url={url}
        type="website"
        jsonLd={ldBreadcrumb}
      />
      <MarketingLayout navItems={[]} subtitle="Search">
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-8 md:px-6">
            <h1 className="font-heading text-xl text-semantic-text-primary">Search results</h1>
            <p className="mt-1 text-sm text-semantic-text-primary/70">
              {hasQuery ? (
                <>
                  Query: “{query}” — {results.length} result{results.length === 1 ? '' : 's'}
                </>
              ) : (
                'Search our catalogue (or browse popular products below).'
              )}
            </p>

            <form
              className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center"
              onSubmit={(e) => {
                e.preventDefault()
                const next = draft.trim()
                const nextParams = new URLSearchParams(params)
                if (next) nextParams.set('q', next)
                else nextParams.delete('q')
                setParams(nextParams, { replace: true })
              }}
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Search products (e.g. shower cap)"
                className="h-11 w-full flex-1 rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-4 text-sm text-semantic-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/20"
                inputMode="search"
              />
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 text-sm font-semibold text-white shadow-sm hover:bg-semantic-legacy-brand-cocoa/90"
              >
                Search
              </button>
            </form>

            {hasQuery && results.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-6 text-center text-semantic-text-primary/70">
                <p className="text-sm">
                  No results for <span className="font-semibold text-semantic-text-primary">“{query}”</span>.
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-semantic-text-primary/60">
                  Try “shower cap” or browse our best seller.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setDraft('shower cap')
                      const nextParams = new URLSearchParams(params)
                      nextParams.set('q', 'shower cap')
                      setParams(nextParams, { replace: true })
                    }}
                    className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary"
                  >
                    Search “shower cap”
                  </button>
                  <RouterLink
                    to="/product/lumelle-shower-cap"
                    className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white"
                  >
                    View best seller
                  </RouterLink>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                {results.map((p) =>
                  p.href.startsWith('/') ? (
                    <RouterLink
                      key={p.id}
                      to={p.href}
                      className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-soft"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-40 w-full rounded-lg object-cover"
                        width={600}
                        height={600}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="mt-3 font-semibold text-semantic-text-primary">{p.title}</div>
                      <div className="text-semantic-text-primary/70">£{p.price.toFixed(2)}</div>
                    </RouterLink>
                  ) : (
                    <div
                      key={p.id}
                      aria-disabled="true"
                      className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-3 opacity-70"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-40 w-full rounded-lg object-cover"
                        width={600}
                        height={600}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="mt-3 font-semibold text-semantic-text-primary">{p.title}</div>
                      <div className="text-semantic-text-primary/70">£{p.price.toFixed(2)}</div>
                      <div className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-semantic-text-primary/60">
                        Coming soon
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </section>
      </MarketingLayout>
    </>
  )
}

export default SearchResultsPage
