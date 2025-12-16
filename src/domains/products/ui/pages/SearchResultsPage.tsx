import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'

const CATALOG = [
  { id: 'lumelle-cap', title: 'Lumelle Shower Cap', price: 24, image: '/uploads/luminele/product-feature-06.webp', href: '/product/lumelle-shower-cap' },
  { id: 'satin-overnight-curler', title: 'Satin Overnight Curler Set', price: 24, image: '/uploads/curler/1.webp', href: '/product/satin-overnight-curler' },
  { id: 'microfiber-towel', title: 'Microfiber Hair Towel', price: 14, image: '/uploads/luminele/product-feature-05.webp', href: '#' },
  { id: 'travel-case', title: 'Travel Case', price: 12, image: '/uploads/luminele/product-feature-04.webp', href: '#' },
]

export const SearchResultsPage = () => {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').toLowerCase()
  const results = useMemo(() => CATALOG.filter((p) => p.title.toLowerCase().includes(q)), [q])

  const url = 'https://lumelle.com/search'
  const title = 'Search'
  const description = 'Find Lumelle products and guides to keep hair frizz-free.'

  const ldBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumelle.com/' },
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
          <div className="mx-auto max-w-6xl px-4 py-8">
            <h1 className="font-heading text-xl text-semantic-text-primary">Search results</h1>
            <p className="mt-1 text-sm text-semantic-text-primary/70">Query: “{params.get('q') || ''}” — {results.length} result{results.length === 1 ? '' : 's'}</p>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {results.map((p) => (
                <a key={p.id} href={p.href} className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-3 hover:shadow-soft">
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
                </a>
              ))}
            </div>
          </div>
        </section>
      </MarketingLayout>
    </>
  )
}

export default SearchResultsPage
