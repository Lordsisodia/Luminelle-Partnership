import { MarketingLayout } from '@/layouts/MarketingLayout'

export const BlogIndexPage = () => {
  return (
    <MarketingLayout navItems={[]} subtitle={null}>
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="font-heading text-3xl text-brand-cocoa">Blog</h1>
          <p className="mt-2 text-brand-cocoa/70">Articles coming soon. We’ll publish hair care tips, styling preservation guides, and product updates here.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-brand-blush/60 bg-brand-blush/20 p-5">
              <h3 className="font-heading text-lg text-brand-cocoa">How to keep a blowout fresh for days</h3>
              <p className="mt-2 text-sm text-brand-cocoa/80">Smart shower routines and protective accessories that prevent frizz.</p>
            </article>
            <article className="rounded-2xl border border-brand-blush/60 bg-brand-blush/20 p-5">
              <h3 className="font-heading text-lg text-brand-cocoa">The problem with disposable shower caps</h3>
              <p className="mt-2 text-sm text-brand-cocoa/80">Why reusables are better for your hair and the planet.</p>
            </article>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}

export default BlogIndexPage

