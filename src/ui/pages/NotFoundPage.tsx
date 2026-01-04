import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'

export const NotFoundPage = () => {
  const location = useLocation()

  return (
    <>
      <Seo title="Not found" description="Page not found." />
      <MarketingLayout navItems={[]} subtitle="Not found">
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">404</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-semantic-text-primary">Page not found</h1>
            <p className="mt-4 text-sm leading-relaxed text-semantic-text-primary/70">
              We couldn’t find{' '}
              <span className="font-mono text-[12px] text-semantic-text-primary">{location.pathname}</span>.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <RouterLink
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white"
              >
                Back to home
              </RouterLink>
              <RouterLink
                to="/cart"
                className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary"
              >
                View cart
              </RouterLink>
            </div>
          </div>
        </section>
      </MarketingLayout>
    </>
  )
}

export default NotFoundPage
