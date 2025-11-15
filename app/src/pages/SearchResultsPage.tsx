import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'

const CATALOG = [
  { id: 'lumelle-cap', title: 'Lumelle Shower Cap', price: 24, image: '/uploads/luminele/product-feature-06.jpg' },
  { id: 'microfiber-towel', title: 'Microfiber Hair Towel', price: 14, image: '/uploads/luminele/product-feature-05.jpg' },
  { id: 'travel-case', title: 'Travel Case', price: 12, image: '/uploads/luminele/product-feature-04.jpg' },
]

export const SearchResultsPage = () => {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').toLowerCase()
  const results = useMemo(() => CATALOG.filter((p) => p.title.toLowerCase().includes(q)), [q])

  return (
    <MarketingLayout navItems={[]} subtitle="Search">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h1 className="font-heading text-xl text-brand-cocoa">Search results</h1>
          <p className="mt-1 text-sm text-brand-cocoa/70">Query: “{params.get('q') || ''}” — {results.length} result{results.length === 1 ? '' : 's'}</p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {results.map((p) => (
              <a key={p.id} href={p.id === 'lumelle-cap' ? '/product/shower-cap' : '#'} className="rounded-2xl border border-brand-blush/60 bg-white p-3 hover:shadow-soft">
                <img src={p.image} alt={p.title} className="h-40 w-full rounded-lg object-cover" />
                <div className="mt-3 font-semibold text-brand-cocoa">{p.title}</div>
                <div className="text-brand-cocoa/70">£{p.price.toFixed(2)}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}

export default SearchResultsPage

