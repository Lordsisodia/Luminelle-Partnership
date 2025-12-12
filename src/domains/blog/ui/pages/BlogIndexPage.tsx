import type { NavItem } from '@/layouts/MarketingLayout'
import { blogPosts } from '@/content/blog'
import { SectionHeading } from '@ui/components/SectionHeading'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { setMetaTags, injectJsonLd } from '@/lib/seo'
import { cdnUrl } from '@/utils/cdn'
import { BlogLayout } from '@blog/ui/layouts'

const navItems: NavItem[] = [
  { id: 'hero', label: 'Blog' },
  { id: 'posts', label: 'Posts' },
]

const tags = ['Frizz-free', 'Protective styles', 'Science', 'Creator tips', 'Travel', 'Care', 'How-to', 'Tips']

export const BlogIndexPage = () => {
  const featured = blogPosts.filter((p) => p.featured).slice(0, 2)
  const rest = blogPosts.filter((p) => !p.featured)

  useEffect(() => {
    const title = 'Lumelle Journal | Blog'
    const description =
      'Guides, routines, and creator tips to keep silk presses, curls, and braids frizz-free with Lumelle.'
    const heroImage = cdnUrl(featured[0]?.cover || '/uploads/luminele/product-feature-01.webp')
    const url = 'https://lumelle.com/blog'
    setMetaTags({ title, description, url, image: heroImage, type: 'website' })

    // Simple Blog schema
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Lumelle Journal',
      url,
      description,
    }
    injectJsonLd('lumelle-blog-ld', ld)
    injectJsonLd('lumelle-blog-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumelle.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: url },
      ],
    })
  }, [featured])

  return (
    <BlogLayout navItems={navItems} subtitle="Journal">
      <section id="hero" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <nav className="mb-4 flex items-center justify-center gap-2 text-sm text-brand-cocoa/60">
            <Link to="/" className="hover:text-brand-cocoa">Home</Link>
            <span>›</span>
            <span className="text-brand-cocoa/80">Blog</span>
          </nav>
          <div className="text-center">
            <span className="inline-flex rounded-full bg-brand-blush/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/70">
              Journal
            </span>
            <h1 className="mt-3 font-heading text-4xl text-brand-cocoa md:text-5xl">Frizz-free hair, creator-tested</h1>
            <p className="mt-3 text-base text-brand-cocoa/75 md:text-lg">
              Guides, routines, and creator scripts that keep your style flawless—plus launches and behind-the-scenes.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-cocoa/70">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-brand-blush/40 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="posts" className="bg-brand-blush/10">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <SectionHeading
            eyebrow="Featured"
            title="Start with these"
            description="Editor picks to help you protect your style fast."
            alignment="left"
          />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {featured.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-3xl border border-brand-peach/40 bg-white shadow-soft transition hover:-translate-y-1"
              >
                <div className="aspect-[3/2] w-full overflow-hidden bg-brand-blush/20">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="h-full w-full object-cover"
                    width={800}
                    height={533}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="space-y-2 p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-cocoa/60">
                    <span className="rounded-full bg-brand-blush/40 px-2 py-0.5 text-brand-cocoa/80">{post.tag}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-heading text-xl text-brand-cocoa">{post.title}</h3>
                  <p className="text-sm text-brand-cocoa/75">{post.teaser}</p>
                  <div className="text-xs text-brand-cocoa/60">
                    {post.author} • {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <SectionHeading
            eyebrow="Latest"
            title="Browse all posts"
            description="Fresh tips for blowouts, curls, braids, and creator workflows."
            alignment="left"
          />
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-brand-blush/50 bg-white shadow-sm transition hover:-translate-y-1"
              >
                <div className="aspect-[3/2] w-full overflow-hidden bg-brand-blush/20">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="h-full w-full object-cover"
                    width={600}
                    height={400}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="space-y-2 p-4">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-cocoa/60">
                    <span className="rounded-full bg-brand-blush/40 px-2 py-0.5 text-brand-cocoa/80">{post.tag}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-heading text-lg text-brand-cocoa">{post.title}</h3>
                  <p className="text-sm text-brand-cocoa/75 line-clamp-2">{post.teaser}</p>
                  <div className="text-xs text-brand-cocoa/60">
                    {post.author} • {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </BlogLayout>
  )
}

export default BlogIndexPage
