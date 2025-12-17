import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { SectionHeading } from '@ui/components/SectionHeading'
import { CONTENT_BRIEF_URL, SUPPORT_EMAIL, WHATSAPP_INVITE_URL } from '@/config/constants'
import { Link } from 'react-router-dom'

const deliverables = [
  '60–90s TikTok video (hook in first 3s, steam test, results).',
  '5–8s “steam reveal” cut for ads (optional but loved).',
  '1–2 vertical stills showing fit and lining.',
]

const guardrails = [
  'Show the satin lining and perimeter seal (no gaps around edges).',
  'Avoid claims like “cures damage” or “medically proven.”',
  'Mention it’s satin-lined, waterproof, and reusable — not disposable plastic.',
  'Use natural or ring light; avoid heavy beauty filters.',
]

const proofPoints = [
  'Blocks steam to keep silk presses, curls, and braids frizz-free.',
  'Satin interior reduces friction and breakage versus plastic caps.',
  'Soft, no-dent elastic for a comfortable seal.',
  'Reusable, wipe-clean core; 30-day Luxe Guarantee.',
]

const BriefPage = () => {
  return (
    <>
      <Seo
        title="Creator Content Brief"
        description="Everything you need to film with the Lumelle satin-lined waterproof shower cap: shots, guardrails, and product proof points."
        url="https://lumelle.com/brief"
        type="article"
      />
      <MarketingLayout navItems={[]} subtitle="Creators">
        <main className="bg-white text-semantic-text-primary">
          <section className="bg-gradient-to-b from-[#fff8f4] via-white to-white">
            <div className="mx-auto max-w-5xl px-4 py-14 md:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/70">Creators</p>
              <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-semantic-text-primary md:text-4xl">
                Lumelle content brief
              </h1>
              <p className="mt-4 max-w-3xl text-base text-semantic-text-primary/80">
                Clear shots, honest claims, and a quick steam test—that’s all you need. Follow this brief to keep content on-brand and high converting.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={CONTENT_BRIEF_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
                >
                  Download PDF brief
                </a>
                <Link
                  to="/creators"
                  className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-cocoa px-5 py-2.5 text-sm font-semibold text-semantic-text-primary transition hover:-translate-y-0.5 hover:bg-semantic-legacy-brand-blush/30"
                >
                  View creator hub
                </Link>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <SectionHeading
                eyebrow="What to capture"
                title="Deliverables and must-have shots"
                description="Hit these beats to show the product working in real bathrooms, not studios."
              />
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <article className="space-y-3 rounded-3xl border border-semantic-accent-cta/35 bg-white p-5 shadow-soft">
                  <h3 className="font-heading text-lg font-semibold">Deliverables</h3>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-semantic-text-primary/75 leading-relaxed">
                    {deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
                <article className="space-y-3 rounded-3xl border border-semantic-accent-cta/35 bg-white p-5 shadow-soft">
                  <h3 className="font-heading text-lg font-semibold">Proof points to mention</h3>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-semantic-text-primary/75 leading-relaxed">
                    {proofPoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </section>

          <section className="bg-semantic-legacy-brand-blush/12 py-12">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <SectionHeading
                eyebrow="Brand guardrails"
                title="Stay compliant and on-brand"
                description="A few boundaries keep us truthful, FTC/ASA compliant, and ad-safe."
              />
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <article className="space-y-3 rounded-3xl border border-semantic-accent-cta/35 bg-white p-5 shadow-soft">
                  <h3 className="font-heading text-lg font-semibold">Do</h3>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-semantic-text-primary/75 leading-relaxed">
                    <li>Show the seal test: step into steam, remove cap, show smooth edges.</li>
                    <li>Use natural language like “keeps my press smooth” or “blocked the steam.”</li>
                    <li>Disclose paid/affiliate relationships per FTC/ASA (e.g., #ad, “gifted by Lumelle”).</li>
                  </ul>
                </article>
                <article className="space-y-3 rounded-3xl border border-semantic-accent-cta/35 bg-white p-5 shadow-soft">
                  <h3 className="font-heading text-lg font-semibold">Avoid</h3>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-semantic-text-primary/75 leading-relaxed">
                    {guardrails.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 rounded-3xl border border-semantic-accent-cta/40 bg-white px-6 py-10 text-center shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-semantic-text-primary/60">Need a reshoot or feedback?</p>
              <h2 className="font-heading text-2xl font-bold text-semantic-text-primary">Send your draft, get notes fast</h2>
              <p className="max-w-2xl text-sm text-semantic-text-primary/75 leading-relaxed">
                Drop your draft link in our WhatsApp or email for frame-by-frame feedback. We usually respond within 1–2 business days.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={WHATSAPP_INVITE_URL}
                  className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
                >
                  Message WhatsApp
                </a>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-semantic-text-primary transition hover:-translate-y-0.5 hover:bg-semantic-legacy-brand-blush/30"
                >
                  Email {SUPPORT_EMAIL}
                </a>
              </div>
            </div>
          </section>
        </main>
      </MarketingLayout>
    </>
  )
}

export default BriefPage
