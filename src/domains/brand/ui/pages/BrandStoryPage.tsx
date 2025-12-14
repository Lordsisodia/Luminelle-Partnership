import { Link } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { SectionHeading } from '@ui/components/SectionHeading'
import { successStories } from '@/content/landing'

const hero = {
  eyebrow: 'Brand Story',
  title: 'Designed for steam, loved by creators',
  description:
    'We started with a simple promise: keep silk presses, curls, and braids flawless—even in the steamiest shower. Every detail is co-created with the people who film, post, and sell with us.',
  ctaPrimary: { label: 'Shop the cap', href: '/product/lumelle-shower-cap' },
  ctaSecondary: { label: 'Meet the creators', href: '/creators' },
  image: '/uploads/luminele/page9-image.webp',
}

const storyHighlights = [
  {
    eyebrow: 'The spark',
    title: 'Steam-proof, not plastic',
    body: 'We blended satin-soft lining with a waterproof core so styles survive heat and humidity without flimsy plastic caps.',
  },
  {
    eyebrow: 'Creator-tested',
    title: 'Iterated on camera',
    body: '100+ creators tried, filmed, and fed back—shaping fit, band tension, and packaging that converts on TikTok Shop.',
  },
  {
    eyebrow: 'Built to last',
    title: 'Reuse 100+ showers',
    body: 'Durable stitching, wipe-clean core, and stretch that rebounds—so it looks premium long after the unboxing.',
  },
]

const craftPoints = [
  {
    title: 'Dual-layer engineering',
    body: 'Satin interior for smooth strands; waterproof outer shell to block steam.',
    icon: '🧵',
  },
  {
    title: 'Comfort band',
    body: 'Soft, no-dent elastic that seals edges without creasing.',
    icon: '✨',
  },
  {
    title: 'Creator-ready visuals',
    body: 'Pastel palette, luxe packaging, and detail shots that pop on camera.',
    icon: '🎥',
  },
]

const proofChips = [
  { label: 'Avg rating', value: '4.8★' },
  { label: 'Creators active', value: '100+' },
  { label: 'Dispatch time', value: '48 hrs' },
]

const values = ['Satin-first comfort', 'Reusable, not disposable', 'Cruelty-free', '30-day returns', 'UK fulfillment']

const BrandStoryPage = () => {
  return (
    <MarketingLayout navItems={[]} subtitle="Brand">
      <main className="bg-white text-brand-cocoa">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#fff8f4] via-white to-[#fff8f4]">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:flex-row md:items-center md:gap-12 md:px-6">
            <div className="space-y-4 md:w-1/2">
              <p className="inline-flex items-center rounded-full bg-brand-peach/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-cocoa">
                {hero.eyebrow}
              </p>
              <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl">{hero.title}</h1>
              <p className="text-base text-brand-cocoa/75 md:text-lg">{hero.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={hero.ctaPrimary.href}
                  className="inline-flex items-center justify-center rounded-full bg-brand-cocoa px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
                >
                  {hero.ctaPrimary.label}
                </Link>
                <Link
                  to={hero.ctaSecondary.href}
                  className="inline-flex items-center justify-center rounded-full border border-brand-cocoa px-5 py-2.5 text-sm font-semibold text-brand-cocoa transition hover:-translate-y-0.5 hover:bg-brand-blush/30"
                >
                  {hero.ctaSecondary.label}
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="overflow-hidden rounded-[2rem] border border-brand-peach/50 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                <img src={hero.image} alt="Lumelle shower cap lifestyle" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-14">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <SectionHeading
              eyebrow="How we got here"
              title="From frizz fights to a creator-loved classic"
              description="Every launch is tested on-camera, refined in real bathrooms, and shipped fast enough to keep momentum."
              alignment="center"
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {storyHighlights.map((item) => (
                <article
                  key={item.title}
                  className="space-y-3 rounded-3xl border border-brand-peach/40 bg-white p-5 shadow-[0_14px_30px_rgba(0,0,0,0.06)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">{item.eyebrow}</p>
                  <h3 className="font-heading text-xl font-bold text-brand-cocoa">{item.title}</h3>
                  <p className="text-sm text-brand-cocoa/75 leading-relaxed">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Craft */}
        <section className="bg-brand-blush/10 py-14">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <SectionHeading
              eyebrow="Inside the build"
              title="Crafted to keep styles flawless"
              description="Material science, comfort testing, and visual polish—all tuned for creators and their audiences."
              alignment="center"
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {craftPoints.map((point) => (
                <article
                  key={point.title}
                  className="rounded-3xl border border-brand-peach/40 bg-white p-5 shadow-soft"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-peach/30 text-lg">{point.icon}</span>
                    <h4 className="font-heading text-lg font-semibold text-brand-cocoa">{point.title}</h4>
                  </div>
                  <p className="mt-3 text-sm text-brand-cocoa/75 leading-relaxed">{point.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Proof */}
        <section className="py-12">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 px-4 text-sm text-brand-cocoa/80">
            {proofChips.map((chip) => (
              <div
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full border border-brand-peach/40 bg-brand-blush/30 px-4 py-2 shadow-soft"
              >
                <span className="text-brand-cocoa font-semibold">{chip.value}</span>
                <span className="text-brand-cocoa/70">{chip.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Creator stories carousel */}
        <section className="py-14">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <SectionHeading
              eyebrow="Creator proof"
              title="Real creators, real results"
              description="Swipe through the people who shaped Lumelle and keep it selling out."
              alignment="center"
            />
            <div
              className="mt-8 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {successStories.map((story) => (
                <article
                  key={story.handle}
                  className="min-w-[min(82vw,340px)] snap-center rounded-3xl border border-brand-peach/35 bg-white/92 p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] md:min-w-[320px]"
                >
                  <div className="flex items-center gap-3">
                    <img src={story.avatarSrc} alt={story.avatarAlt} className="h-14 w-14 rounded-full object-cover" loading="lazy" />
                    <div>
                      <h4 className="font-heading text-lg font-bold text-brand-cocoa leading-tight">{story.name}</h4>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-cocoa/60">{story.handle}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-brand-cocoa/90 leading-relaxed">{story.highlight}</p>
                  <p className="text-sm text-brand-cocoa/70">{story.stats} · {story.earnings}</p>
                  <p className="mt-2 text-sm text-brand-cocoa/75 leading-relaxed">“{story.quote}”</p>
                  <div className="relative mt-3 overflow-hidden rounded-2xl border border-brand-peach/30 pb-[158%] bg-black">
                    <iframe
                      src={story.embedUrl.includes('lang=') ? story.embedUrl : `${story.embedUrl}&lang=en`}
                      title={`${story.name} TikTok embed`}
                      loading="lazy"
                      allow="encrypted-media; fullscreen; clipboard-write"
                      sandbox="allow-scripts allow-same-origin allow-presentation"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                      style={{ border: 0 }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 bg-brand-blush/10">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <SectionHeading
              eyebrow="What we stand for"
              title="Beauty that respects your style and time"
              description=""
              alignment="center"
            />
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {values.map((val) => (
                <span
                  key={val}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-peach/40 bg-white px-4 py-2 text-sm font-semibold text-brand-cocoa shadow-soft"
                >
                  <span className="h-2 w-2 rounded-full bg-brand-peach" />
                  {val}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-brand-peach/50 bg-gradient-to-r from-[#fff0e8] via-white to-[#ffe9dd] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.08)]">
            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-cocoa/70">Ready when you are</p>
                <h3 className="font-heading text-3xl font-bold text-brand-cocoa">See why creators won’t film without it</h3>
                <p className="text-base text-brand-cocoa/75">
                  Steam-proof, satin-soft, and camera-ready out of the box. Ships in 48 hours with 30-day returns.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/product/lumelle-shower-cap"
                    className="inline-flex items-center justify-center rounded-full bg-brand-cocoa px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
                  >
                    Shop the cap
                  </Link>
                  <Link
                    to="/creators"
                    className="inline-flex items-center justify-center rounded-full border border-brand-cocoa px-5 py-2.5 text-sm font-semibold text-brand-cocoa transition hover:-translate-y-0.5 hover:bg-brand-blush/30"
                  >
                    Join creators
                  </Link>
                </div>
              </div>
              <div className="overflow-hidden rounded-[1.5rem] border border-brand-peach/50 bg-white shadow-soft">
                <img src="/uploads/luminele/product-feature-06.webp" alt="Lumelle cap packaging and product" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  )
}

export default BrandStoryPage
