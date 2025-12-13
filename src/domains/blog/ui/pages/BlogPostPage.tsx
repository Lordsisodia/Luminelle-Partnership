import { useEffect, useRef, useState } from 'react'
import { useParams, Navigate, Link as RouterLink } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import type { NavItem } from '@/layouts/MarketingLayout'
import { blogPosts } from '@/content/blog'
import { SectionHeading } from '@ui/components/SectionHeading'
import { cdnUrl } from '@/utils/cdn'
import { BlogSocial } from '../components/BlogSocial'
import { Seo } from '@/components/Seo'

const navItems: NavItem[] = [
  { id: 'hero', label: 'Post' },
  { id: 'faq', label: 'FAQ' },
]

export const BlogPostPage = () => {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)
  const [currentRelatedIndex, setCurrentRelatedIndex] = useState(0)
  const relatedTrackRef = useRef<HTMLDivElement | null>(null)

  if (!post) return <Navigate to="/blog" replace />
  if (post.status === 'draft' && !import.meta.env.DEV) return <Navigate to="/blog" replace />

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && (import.meta.env.DEV ? true : p.status !== 'draft'))
    .sort((a, b) => (a.tag === post.tag ? -1 : b.tag === post.tag ? 1 : 0))
    .slice(0, 3)

  // Track horizontal scroll progress on the related carousel for the dots indicator
  useEffect(() => {
    const track = relatedTrackRef.current
    if (!track) return

    const handleScroll = () => {
      const slideWidth = track.scrollWidth / related.length || 1
      const nextIndex = Math.round(track.scrollLeft / slideWidth)
      setCurrentRelatedIndex(nextIndex)
    }

    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => track.removeEventListener('scroll', handleScroll)
  }, [related.length])

  const title = `${post.title} | Lumelle Journal`
  const description =
    post.teaser || post.subtitle || 'Frizz-free hair care, creator routines, and product science from Lumelle.'
  const image = post.ogImage ?? post.cover
  const absImage = cdnUrl(image)
  const url = `https://lumelle.com/blog/${post.slug}`

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
    image: absImage,
    author: { '@type': 'Organization', name: post.author || 'Lumelle Studio' },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: url,
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

  const ldBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumelle.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://lumelle.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  if (!post) return <Navigate to="/blog" replace />

  const reviewed = post.reviewed || post.date

  return (
    <>
      <Seo
        title={title}
        description={description}
        image={absImage}
        url={url}
        type="article"
        jsonLd={[ldArticle, ldFaq, ldBreadcrumb]}
      />
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
              <img
                src={post.cover}
                alt={post.title}
                className="w-full object-cover"
                width={1200}
                height={800}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6">
            <div className="rounded-2xl border border-brand-blush/60 bg-brand-blush/15 p-4 text-brand-cocoa">
              <h2 className="text-lg font-semibold text-brand-cocoa">
                {post.faqs?.[0]?.question || 'How do I keep hair frizz-free in the shower?'}
              </h2>
              <p className="mt-1 text-brand-cocoa/75">
                {post.faqs?.[0]?.answer ||
                  'Use a satin-lined, waterproof cap placed just beyond the hairline, tuck sideburns, angle spray forward, finish with 60 seconds of cooler water, then blot and remove front-to-back.'}
              </p>
            </div>

            <div className="rounded-3xl border border-brand-blush/50 bg-brand-blush/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">TL;DR</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-brand-cocoa/80">
                <li>{post.teaser}</li>
                <li>Skim the subheads for quick wins and routines.</li>
              </ul>
              <div className="mt-4">
                <a
                  href="/product/lumelle-shower-cap"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow-soft hover:-translate-y-0.5"
                >
                  Shop the satin-lined waterproof cap
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </a>
              </div>
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
                {(post.body ?? '')
                  .split('\n\n')
                  .filter(Boolean)
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>
            )}
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6">
            <BlogSocial slug={post.slug} />
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6">
            <div className="flex items-center gap-4 rounded-3xl border border-brand-blush/60 bg-brand-blush/15 p-4">
              <div className="h-12 w-12 rounded-full bg-brand-blush/40 text-center text-lg font-semibold text-brand-cocoa flex items-center justify-center">
                {post.author.charAt(0)}
              </div>
              <div className="space-y-1 text-sm text-brand-cocoa/80">
                <div className="font-semibold text-brand-cocoa">{post.author}{post.authorRole ? ` · ${post.authorRole}` : ''}</div>
                <div>
                  Published {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · Last reviewed {new Date(reviewed).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div>Have feedback? Email hello@lumelle.com</div>
              </div>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="bg-white">
            <div className="mx-auto max-w-6xl px-4 pb-12 md:px-6">
              <SectionHeading
                eyebrow="Related reads"
                title="You might also like"
                description="More quick wins to keep hair frizz-free."
                alignment="left"
              />
              <div
                ref={relatedTrackRef}
                className="no-scrollbar mt-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex gap-4 pr-6 md:pr-10">
                  {related.map((item) => (
                    <RouterLink
                      key={item.slug}
                      to={`/blog/${item.slug}`}
                      className="group relative flex min-w-[17rem] max-w-[17rem] flex-1 shrink-0 flex-col overflow-hidden rounded-2xl border border-brand-blush/50 bg-white shadow-sm transition hover:-translate-y-1"
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
              <div className="mt-4 flex justify-center gap-2">
                {related.map((item, idx) => (
                  <span
                    key={item.slug}
                    className={`h-2 w-2 rounded-full transition-all duration-200 ${currentRelatedIndex === idx ? 'bg-brand-cocoa' : 'bg-brand-blush/60'}`}
                    aria-hidden
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

      </MarketingLayout>
    </>
  )
}

export default BlogPostPage
