import { Link } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { SUPPORT_EMAIL } from '@/config/constants'

const lastUpdated = '15 December 2025'

const sections = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <p>
        Lumelle Beauty (“Lumelle”, “we”, “our”, “us”) operates lumelle.com and lumellebeauty.co.uk. These Terms govern
        your use of our websites and any purchases made directly from us.
      </p>
    ),
  },
  {
    id: 'using-site',
    title: 'Using this site',
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>You must be at least 18 or have a parent/guardian accept these Terms on your behalf.</li>
        <li>Do not misuse the site (e.g., attempt unauthorized access, scrape at scale, or interfere with security).</li>
        <li>Information we provide (care tips, routine advice) is for general guidance and not medical advice.</li>
      </ul>
    ),
  },
  {
    id: 'orders',
    title: 'Orders & availability',
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Orders are accepted once payment is authorized. We may cancel or refund if stock is unavailable or an error occurs.</li>
        <li>Product images aim to reflect true colour and finish, but minor variation may occur across screens/batches.</li>
        <li>Please check sizing and material details on each product page before purchasing.</li>
      </ul>
    ),
  },
  {
    id: 'pricing',
    title: 'Pricing & payment',
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Prices include applicable VAT/UK sales tax unless stated otherwise.</li>
        <li>We accept the payment methods shown at checkout; charges are taken when you confirm the order.</li>
        <li>Promotions or discount codes cannot be combined unless explicitly stated.</li>
      </ul>
    ),
  },
  {
    id: 'shipping',
    title: 'Shipping & delivery',
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Estimated delivery windows are shown at checkout. Delays caused by carriers or customs are outside our control, but we’ll help chase issues.</li>
        <li>Please provide accurate delivery information; incorrect addresses may lead to delays or additional charges.</li>
      </ul>
    ),
  },
  {
    id: 'returns',
    title: 'Returns & cancellations',
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>We offer a 30-day return window for unused items in original condition. Start a return at <Link to="/returns" className="underline">lumelle.com/returns</Link>.</li>
        <li>If your item arrives damaged or defective, contact us within 7 days so we can replace or refund.</li>
        <li>Shipping fees are non-refundable unless the return is due to our error or a faulty product.</li>
      </ul>
    ),
  },
  {
    id: 'care',
    title: 'Product care & warranty',
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Follow the care instructions supplied with each product. Improper cleaning or heat exposure can reduce lifespan.</li>
        <li>We stand behind manufacturing quality. If you experience a defect within 60 days of delivery, we’ll repair, replace, or refund at our discretion.</li>
      </ul>
    ),
  },
  {
    id: 'ip',
    title: 'Intellectual property',
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>All content on our sites—including the LUMELLE™ name, logos, product imagery, copy, and designs—belongs to Lumelle Beauty or our licensors.</li>
        <li>You may not reuse or republish our assets without prior written permission.</li>
      </ul>
    ),
  },
  {
    id: 'user-content',
    title: 'Reviews & user submissions',
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>By posting reviews, images, or testimonials, you grant Lumelle a royalty-free license to display and share them for marketing, provided we attribute you where reasonable.</li>
        <li>Please keep submissions honest, respectful, and free of unlawful or infringing material.</li>
      </ul>
    ),
  },
  {
    id: 'liability',
    title: 'Liability',
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Nothing in these Terms limits your consumer rights under UK law.</li>
        <li>We do not exclude liability for fraud, fraudulent misrepresentation, or death/personal injury caused by our negligence.</li>
        <li>Subject to the above, our total liability for any claim related to an order is limited to the amount you paid for that order.</li>
      </ul>
    ),
  },
  {
    id: 'updates',
    title: 'Changes to these Terms',
    body: (
      <p>
        We may update these Terms to reflect operational, legal, or regulatory changes. The “Last updated” date above shows when revisions were posted; continued use of the site after that date means you accept the updated Terms.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Questions or issues? Email us at <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We aim to respond within two business days.
      </p>
    ),
  },
]

const TermsPage = () => {
  return (
    <>
      <Seo
        title="Terms & Conditions"
        description="Read the LUMELLE™ website and purchase terms, including shipping, returns, warranties, and your consumer rights."
        url="https://lumelle.com/terms"
        type="article"
      />
      <MarketingLayout navItems={[]} subtitle="Policies">
        <main className="bg-white text-semantic-text-primary">
          <section className="bg-gradient-to-b from-[#fff5f0] via-white to-white">
            <div className="mx-auto max-w-5xl px-4 py-14 md:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/70">Policies</p>
              <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-semantic-text-primary md:text-4xl">
                Terms &amp; Conditions
              </h1>
              <p className="mt-3 text-sm text-semantic-text-primary/70">Last updated: {lastUpdated}</p>
              <p className="mt-5 max-w-3xl text-base text-semantic-text-primary/80">
                These terms explain how we supply products and operate lumelle.com. Please read them before purchasing or using the site.
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
        </main>
      </MarketingLayout>
    </>
  )
}

export default TermsPage
