import { useEffect } from 'react'
import { useParams, Navigate, Link as RouterLink } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import type { NavItem } from '@/layouts/MarketingLayout'
import { blogPosts } from '@/content/blog'
import { SectionHeading } from '@/components/SectionHeading'
import { HeroProofStrip } from '@/sections/shop'
import { homeConfig } from '@/content/home.config'
import { setMetaTags, injectJsonLd } from '@/lib/seo'

const navItems: NavItem[] = [
  { id: 'hero', label: 'Post' },
  { id: 'faq', label: 'FAQ' },
]

export const BlogPostPage = () => {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return <Navigate to="/blog" replace />

  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.tag === post.tag ? -1 : 1))
    .slice(0, 3)

  useEffect(() => {
    const title = `${post.title} | Lumelle Journal`
    const description =
      post.teaser || post.subtitle || 'Frizz-free hair care, creator-tested routines, and product science from Lumelle.'
    const image = post.ogImage ?? post.cover
    setMetaTags({ title, description, image, url: window.location.href, type: 'article' })

    // Structured data: Article + FAQ (2 Qs)
    const faq = post.faqs && post.faqs.length
      ? post.faqs
      : [
          {
            question: 'How do I keep hair frizz-free in the shower?',
            answer:
              'Use a satin-lined, waterproof cap placed just beyond the hairline, angle spray forward, finish cool, and remove front-to-back after blotting.',
          },
          {
            question: 'How should I care for the cap to keep the seal strong?',
            answer: 'Rinse after each use, hand wash weekly with mild soap, air dry fully, and rotate caps so the liner stays dry and odor-free.',
          },
        ]

    const ldArticle = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description,
      image: post.cover,
      author: { '@type': 'Organization', name: post.author || 'Lumelle Studio' },
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: window.location.href,
    }

    const ldFaq = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((qa) => ({
        '@type': 'Question',
        name: qa.question,
        acceptedAnswer: { '@type': 'Answer', text: qa.answer },
      })),
    }

    const injectJsonLd = (id: string, json: object) => {
      let script = document.getElementById(id) as HTMLScriptElement | null
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = id
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(json)
    }

    injectJsonLd('lumelle-article-ld', ldArticle)
    injectJsonLd('lumelle-faq-ld', ldFaq)
  }, [post])

  return (
    <MarketingLayout navItems={navItems} subtitle="Journal">
      <section id="hero" className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
          <nav className="mb-4 flex items-center gap-2 text-sm text-brand-cocoa/60">
            <RouterLink to="/" className="hover:text-brand-cocoa">Home</RouterLink>
            <span>›</span>
            <RouterLink to="/blog" className="hover:text-brand-cocoa">Blog</RouterLink>
            <span>›</span>
            <span className="text-brand-cocoa/80">{post.title}</span>
          </nav>
          <span className="inline-flex rounded-full bg-brand-blush/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-cocoa/70">
            {post.tag}
          </span>
          <h1 className="mt-3 font-heading text-4xl text-brand-cocoa">{post.title}</h1>
          <p className="mt-3 text-lg text-brand-cocoa/75">{post.subtitle}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-brand-cocoa/70">
            <span>{post.author}</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>•</span>
            <span>{post.readTime} read</span>
          </div>
          <div className="mt-6 overflow-hidden rounded-[2rem] border border-brand-blush/60">
            <img src={post.cover} alt={post.title} className="w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6">
          <div className="rounded-3xl border border-brand-blush/50 bg-brand-blush/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">TL;DR</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-brand-cocoa/80">
              <li>{post.teaser}</li>
              <li>Skim the subheads for quick wins and routines.</li>
            </ul>
          </div>

          {/* Body with structured sections */}
          {post.sections ? (
            <div className="mt-8 space-y-8 text-brand-cocoa">
              {post.sections.map((section, idx) => (
                <div key={section.heading + idx} className="space-y-3">
                  <h2 className="font-heading text-2xl text-brand-cocoa">{section.heading}</h2>
                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-lg leading-relaxed text-brand-cocoa/85">
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="prose prose-lg mt-8 text-brand-cocoa prose-headings:font-heading prose-p:leading-relaxed">
              {post.body.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
        </div>
      </section>

      <SectionHeading
        eyebrow="Need this cap?"
        title="Keep your style flawless"
        description="Protect your silk press, curls, or braids while you try these routines."
        alignment="center"
      />
      <div className="mx-auto max-w-6xl px-4 pb-12 md:px-6">
        <HeroProofStrip
          rating={homeConfig.socialProof.rating}
          count={homeConfig.socialProof.count}
          tagline={homeConfig.socialProof.tagline}
        />
      </div>

      {related.length ? (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 pb-12 md:px-6">
            <SectionHeading
              eyebrow="Related reads"
              title="You might also like"
              description="More quick wins to keep hair frizz-free."
              alignment="left"
            />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <RouterLink
                  key={item.slug}
                  to={`/blog/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-brand-blush/50 bg-white shadow-sm transition hover:-translate-y-1"
                >
                  <div className="aspect-[3/2] w-full overflow-hidden bg-brand-blush/20">
                    <img src={item.cover} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="space-y-2 p-4">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-cocoa/60">
                      <span className="rounded-full bg-brand-blush/40 px-2 py-0.5 text-brand-cocoa/80">{item.tag}</span>
                      <span>{item.readTime}</span>
                    </div>
                    <h3 className="font-heading text-lg text-brand-cocoa">{item.title}</h3>
                    <p className="text-sm text-brand-cocoa/75 line-clamp-2">{item.teaser}</p>
                  </div>
                </RouterLink>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="faq" className="bg-brand-blush/15">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <SectionHeading
            eyebrow="Need help?"
            title="Questions about Lumelle?"
            description="Chat with our WhatsApp concierge if you need more details."
            alignment="center"
          />
          <div className="mt-6 space-y-4">
            {homeConfig.faq.slice(0, 3).map((item, idx) => (
              <details key={idx} className="rounded-3xl border border-brand-blush/60 bg-white/95 p-4 shadow-soft">
                <summary className="cursor-pointer text-base font-semibold text-brand-cocoa">{item.q}</summary>
                <p className="mt-2 text-sm text-brand-cocoa/75">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}

export default BlogPostPage
