import { Link } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { SectionHeading } from '@ui/components/SectionHeading'

const highlights = [
  {
    title: 'Fit that protects the perimeter',
    body: 'Satin-lined interior, waterproof shell, and a soft seal that keeps steam out while staying comfortable.',
  },
  {
    title: '30-day Luxe Guarantee',
    body: 'Try it for a month. If you don’t love your hair on day 30, send it back for a refund.',
  },
  {
    title: 'Creator-tested care tips',
    body: 'Quick routines and heat-free refreshers from the Lumelle creator community—sent by email and TikTok.',
  },
]

const steps = [
  { title: '1. Shop the cap', body: 'Pick your shade and size, then check out with tracked shipping.' },
  { title: '2. Seal & steam-test', body: 'Use our 30-second fit guide in your first shower to lock out steam.' },
  { title: '3. Refresh & repeat', body: 'Wipe clean, hang dry, and enjoy frizz-free silk presses, curls, and braids.' },
]

const WelcomePage = () => {
  return (
    <>
      <Seo
        title="Welcome"
        description="Start here for your first Lumelle shower cap: fit guide, care steps, and creator tips for frizz-free styles."
        url="https://lumelle.com/welcome"
        type="website"
      />
      <MarketingLayout navItems={[]} subtitle="Welcome">
        <main className="bg-white text-semantic-text-primary">
          <section className="bg-gradient-to-b from-[#fff8f4] via-white to-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:flex-row md:items-center md:gap-12 md:px-6">
              <div className="space-y-5 md:w-3/5">
                <p className="inline-flex items-center rounded-full bg-semantic-legacy-brand-blush/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/70">
                  Welcome
                </p>
                <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl">
                  Your first Lumelle shower cap, done right
                </h1>
                <p className="text-base text-semantic-text-primary/75 md:text-lg">
                  Follow this 2-minute setup to keep silk presses, curls, and braids flawless—even on steamy days.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/product/lumelle-shower-cap"
                    className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
                  >
                    Shop the cap
                  </Link>
                  <Link
                    to="/creators"
                    className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-cocoa px-5 py-2.5 text-sm font-semibold text-semantic-text-primary transition hover:-translate-y-0.5 hover:bg-semantic-legacy-brand-blush/30"
                  >
                    See creator tips
                  </Link>
                </div>
              </div>
              <div className="md:w-2/5">
                <div className="overflow-hidden rounded-[1.6rem] border border-semantic-accent-cta/50 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                  <img
                    src="/images/hero.jpg"
                    alt="Lumelle satin-lined shower cap on vanity"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <SectionHeading
                eyebrow="Quick start"
                title="3 steps to frizz-free showers"
                description="Seal the edges, block steam, and keep your style photo-ready."
                alignment="center"
              />
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {steps.map((step) => (
                  <article
                    key={step.title}
                    className="space-y-3 rounded-3xl border border-semantic-accent-cta/35 bg-white p-5 shadow-soft"
                  >
                    <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm text-semantic-text-primary/75 leading-relaxed">{step.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-semantic-legacy-brand-blush/12 py-12">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <SectionHeading
                eyebrow="Why it works"
                title="Made for creators, loved by every hair type"
                description="Engineering and testing focused on steam defense, gentle lining, and camera-ready finishes."
                alignment="center"
              />
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {highlights.map((item) => (
                  <article
                    key={item.title}
                    className="space-y-3 rounded-3xl border border-semantic-accent-cta/35 bg-white p-5 shadow-soft"
                  >
                    <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-semantic-text-primary/75 leading-relaxed">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 rounded-3xl border border-semantic-accent-cta/40 bg-white px-6 py-10 text-center shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-semantic-text-primary/60">Need help?</p>
              <h2 className="font-heading text-2xl font-bold text-semantic-text-primary">We’ll guide your first use</h2>
              <p className="max-w-2xl text-sm text-semantic-text-primary/75 leading-relaxed">
                DM us on TikTok or Instagram with a quick clip of your fit check, and we’ll send tweaks to keep every strand tucked.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/returns"
                  className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-semantic-text-primary transition hover:-translate-y-0.5 hover:bg-semantic-legacy-brand-blush/30"
                >
                  See returns & guarantee
                </Link>
                <a
                  href="https://www.tiktok.com/@lumellebeauty"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
                >
                  Message us on TikTok
                </a>
              </div>
            </div>
          </section>
        </main>
      </MarketingLayout>
    </>
  )
}

export default WelcomePage
