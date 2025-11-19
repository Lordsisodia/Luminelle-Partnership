import { useParams, Navigate } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import type { NavItem } from '@/layouts/MarketingLayout'
import { blogPosts } from '@/content/blog'
import { SectionHeading } from '@/components/SectionHeading'
import { HeroProofStrip } from '@/sections/shop'
import { homeConfig } from '@/content/home.config'

const navItems: NavItem[] = [
  { id: 'hero', label: 'Post' },
  { id: 'faq', label: 'FAQ' },
]

export const BlogPostPage = () => {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return <Navigate to="/blog" replace />

  return (
    <MarketingLayout navItems={navItems} subtitle="Journal">
      <section id="hero" className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
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
