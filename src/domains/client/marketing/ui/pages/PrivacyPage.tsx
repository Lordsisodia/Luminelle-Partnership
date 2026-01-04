import { Link } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { SUPPORT_EMAIL } from '@/config/constants'
import { toPublicUrl } from '@platform/seo/logic/publicBaseUrl'
import CookiePreferences from '@ui/components/CookiePreferences'

const lastUpdated = '15 December 2025'

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    body: (
      <p>
        This Privacy Notice explains how Lumelle Beauty (“Lumelle”, “we”, “our”) collects, uses, and shares your
        personal data when you browse our sites, create an account, or place an order.
      </p>
    ),
  },
  {
    id: 'data-we-collect',
    title: 'Data we collect',
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Contact details (name, email, shipping/billing address, phone if provided).</li>
        <li>Order history and payment metadata (payments are processed by trusted processors; we don’t store card numbers).</li>
        <li>Site activity (pages viewed, cart actions) and device info (IP, browser) for analytics and fraud prevention.</li>
        <li>Marketing preferences and survey responses if you choose to provide them.</li>
      </ul>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How we use your data',
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>To process and deliver orders, handle returns, and provide customer support.</li>
        <li>To personalise offers, measure performance, and improve our products and site.</li>
        <li>To detect and prevent fraud or abuse of our services.</li>
        <li>To send marketing emails/SMS only if you opt in—you can opt out anytime.</li>
      </ul>
    ),
  },
  {
    id: 'sharing',
    title: 'How we share information',
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Service providers (payment processors, warehousing, fulfilment, email/SMS platforms) under contractual safeguards.</li>
        <li>Analytics and advertising partners using cookies or similar technologies (see Cookies section).</li>
        <li>Legal or safety reasons, if required by law or to protect our rights or users.</li>
        <li>We do not sell personal data.</li>
      </ul>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies & tracking',
    body: (
      <>
        <p>
          We use cookies and similar technologies for core functionality (cart, checkout) and optional analytics. Blocking
          some cookies may impact site features.
        </p>
        <CookiePreferences />
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights (UK/EU)',
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Access, correct, or delete your personal data.</li>
        <li>Object to or restrict processing, and request data portability.</li>
        <li>Withdraw consent for marketing at any time.</li>
        <li>Lodge a complaint with your local data protection authority.</li>
      </ul>
    ),
  },
  {
    id: 'retention',
    title: 'Retention',
    body: (
      <p>
        We keep data only as long as needed for the purposes above, to comply with legal/financial record requirements, or
        to resolve disputes.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <p>
        Questions or requests? Email <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We aim to
        respond within two business days.
      </p>
    ),
  },
]

const PrivacyPage = () => {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How Lumelle collects, uses, and protects your data, plus your privacy rights."
        url={toPublicUrl('/privacy')}
        type="article"
      />
      <MarketingLayout navItems={[]} subtitle="Policies">
        <div className="bg-white text-semantic-text-primary">
          <section className="bg-gradient-to-b from-brand-porcelain via-white to-white">
            <div className="mx-auto max-w-5xl px-4 py-14 md:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/70">Policies</p>
              <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-semantic-text-primary md:text-4xl">
                Privacy Policy
              </h1>
              <p className="mt-3 text-sm text-semantic-text-primary/70">Last updated: {lastUpdated}</p>
              <p className="mt-5 max-w-3xl text-base text-semantic-text-primary/80">
                We’re committed to protecting your privacy. This notice outlines what data we collect, why we collect it,
                and the choices you have.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
                >
                  Back to shop
                </Link>
                <Link
                  to="/returns"
                  className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-semantic-text-primary transition hover:-translate-y-0.5 hover:bg-semantic-legacy-brand-blush/30"
                >
                  Returns policy
                </Link>
              </div>
            </div>
          </section>

          <section className="pb-16">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
              <div className="divide-y divide-semantic-accent-cta/30 rounded-3xl border border-semantic-accent-cta/30 bg-white/90 shadow-soft">
                {sections.map((section) => (
                  <article key={section.id} id={section.id} className="p-6 md:p-7">
                    <h2 className="font-heading text-xl font-semibold text-semantic-text-primary md:text-2xl">
                      {section.title}
                    </h2>
                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-semantic-text-primary/80 md:text-base">
                      {section.body}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </MarketingLayout>
    </>
  )
}

export default PrivacyPage
