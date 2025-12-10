import { useEffect } from 'react'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { StarRating } from '@/components/StarRating'
import { Sparkles, Leaf, Droplets, Users, MessageSquare } from 'lucide-react'
import { setMetaTags, injectJsonLd } from '@/lib/seo'

const stats = [
  { label: 'Creators protected', value: '12K+' },
  { label: 'Caps saved from landfills', value: '450K+' },
  { label: 'Countries shipped', value: '32' },
]

const timeline = [
  {
    year: '2019',
    title: 'Started in the shower',
    copy: 'Elle’s blowouts kept frizzing before shoots. She hacked together the first dual-layer cap with satin scraps and a waterproof lining.',
    media: '/uploads/luminele/product-feature-02.jpg',
  },
  {
    year: '2020',
    title: 'Built with creators',
    copy: 'Twenty TikTok beauty creators stress-tested prototypes, giving feedback on fit, steam resistance, and camera-ready styling.',
    media: '/uploads/luminele/product-feature-04.jpg',
  },
  {
    year: '2022',
    title: 'Concierge on WhatsApp',
    copy: 'We launched a human-led concierge that sends sizing tips, scripts, and gifting advice in minutes.',
    media: '/uploads/luminele/product-feature-05.jpg',
  },
  {
    year: 'Now',
    title: 'Creator-grade essentials',
    copy: 'One hero product, recycled packaging, and accessories that keep content days smooth around the world.',
    media: '/uploads/luminele/product-feature-06.jpg',
  },
]

const pillars = [
  {
    icon: Users,
    title: 'Creator obsessed',
    copy: 'Every feature is informed by daily shoot schedules, quick turnarounds, and tiny flat bathrooms.',
  },
  {
    icon: Leaf,
    title: 'Low-waste luxe',
    copy: 'Reusable satin replaces disposable plastics, cutting waste while keeping the unboxing premium.',
  },
  {
    icon: MessageSquare,
    title: 'Concierge support',
    copy: 'Beauty nerds on WhatsApp answer fit questions, gifting advice, and script requests in under 10 minutes.',
  },
]

const materials = [
  {
    icon: Sparkles,
    title: 'Dual-layer satin',
    copy: 'Glides over curls and silk presses to prevent friction and frizz.',
  },
  {
    icon: Droplets,
    title: 'Waterproof TPU core',
    copy: 'Blocks steam without trapping heat, so styles stay fresh.',
  },
  {
    icon: Leaf,
    title: 'Comfort stretch band',
    copy: 'Hugs up to 24" without leaving marks or headaches.',
  },
]

const team = [
  { name: 'Elle', role: 'Founder', photo: '/uploads/luminele/product-feature-03.jpg' },
  { name: 'Simone', role: 'Concierge lead', photo: '/uploads/luminele/product-feature-07.jpg' },
  { name: 'Arjun', role: 'Ops & fulfillment', photo: '/uploads/luminele/product-feature-02.jpg' },
]

export const BrandStoryPage = () => {
  useEffect(() => {
    const url = 'https://lumelle.com/brand'
    const image = '/uploads/luminele/product-feature-07.jpg'
    setMetaTags({
      title: 'Lumelle story | Satin-lined waterproof caps built with creators',
      description: 'How Lumelle co-designed a frizz-proof shower cap with creators to keep silk presses and curls camera-ready.',
      image,
      url,
      type: 'website',
    })
    injectJsonLd('brand-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumelle.com/' },
        { '@type': 'ListItem', position: 2, name: 'Brand', item: url },
      ],
    })
  }, [])

  return (
    <MarketingLayout navItems={[]} subtitle="Brand story">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 text-brand-cocoa md:px-6">
          {/* Hero */}
          <div className="grid gap-8 rounded-[2.5rem] border border-brand-peach/40 bg-white p-6 shadow-soft md:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Inside Lumelle</p>
              <h1 className="mt-3 font-heading text-4xl leading-tight">From bathroom hack to creator staple</h1>
              <p className="mt-3 text-brand-cocoa/70">
                Lumelle was born on set. Every cap is engineered with creators who need to stay camera-ready—no high-maintenance routines.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-brand-blush/60 bg-brand-blush/20 p-4 text-center">
                    <p className="text-2xl font-heading">{stat.value}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-cocoa/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border border-brand-blush/60">
              <img
                src="/uploads/luminele/product-feature-07.jpg"
                alt="Behind-the-scenes"
                className="h-full w-full object-cover"
                width={1200}
                height={800}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Milestones</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {timeline.map((entry) => (
                <article key={entry.year} className="grid gap-3 rounded-2xl border border-brand-blush/60 bg-white p-4 shadow-sm md:grid-cols-[0.65fr_1fr]">
                  <img
                    src={entry.media}
                    alt={entry.title}
                    className="h-28 w-full rounded-xl object-cover"
                    width={560}
                    height={280}
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">{entry.year}</p>
                    <h2 className="font-heading text-xl">{entry.title}</h2>
                    <p className="text-sm text-brand-cocoa/75">{entry.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Pillars */}
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-2xl border border-brand-blush/60 bg-brand-blush/10 p-5">
                <pillar.icon className="h-8 w-8 text-brand-cocoa" />
                <h3 className="mt-3 font-heading text-lg">{pillar.title}</h3>
                <p className="text-sm text-brand-cocoa/75">{pillar.copy}</p>
              </div>
            ))}
          </div>

          {/* Materials */}
          <div className="mt-14 rounded-[2.5rem] border border-brand-peach/40 bg-white p-6 shadow-soft">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Materials</p>
              <h2 className="font-heading text-3xl">What makes Lumelle different?</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {materials.map((mat) => (
                <div key={mat.title} className="rounded-2xl border border-brand-blush/60 bg-white p-4 text-sm">
                  <mat.icon className="h-6 w-6 text-brand-cocoa" />
                  <h3 className="mt-2 font-heading text-lg">{mat.title}</h3>
                  <p className="text-brand-cocoa/75">{mat.copy}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team & concierge */}
          <div className="mt-14 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-brand-blush/60 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Meet the team</p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {team.map((member) => (
                  <div key={member.name} className="text-center text-sm">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="mx-auto h-24 w-24 rounded-full border border-brand-blush/60 object-cover"
                      width={96}
                      height={96}
                      loading="lazy"
                      decoding="async"
                    />
                    <p className="mt-2 font-semibold text-brand-cocoa">{member.name}</p>
                    <p className="text-brand-cocoa/70">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-brand-peach/40 bg-brand-blush/20 p-5 text-brand-cocoa">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Concierge</p>
              <h3 className="mt-1 font-heading text-2xl">Need sizing or launch scripts?</h3>
              <p className="mt-2 text-sm text-brand-cocoa/75">WhatsApp us for fit checks, gifting ideas, and creator scripts in under 10 minutes.</p>
              <a href="https://wa.me/message/lumellecaps" className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-cocoa px-5 py-2 text-sm font-semibold text-white">Message concierge →</a>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-brand-cocoa/70">
                <StarRating value={5} size={14} />
                <span>4.9 concierge rating from 1,200 creators</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}

export default BrandStoryPage
