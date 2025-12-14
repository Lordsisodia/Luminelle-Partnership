import { SectionHeading } from '@ui/components/SectionHeading'
import { faqItems } from '@/content/landing'

export const FAQSection = () => {
  return (
    <section
      id="faq"
      className="scroll-mt-24 bg-white py-20 text-semantic-text-primary md:scroll-mt-32"
    >
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Frequently Asked"
          title="Answers before you join"
          description="We keep WhatsApp fast-paced, so here are the essentials before you hop in."
          alignment="center"
        />
        <div className="mt-10 space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-3xl border border-semantic-accent-cta/40 bg-semantic-legacy-brand-blush/20 p-4 transition hover:border-semantic-accent-cta hover:bg-semantic-legacy-brand-blush/30"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-semantic-text-primary transition group-open:text-semantic-text-primary">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-semantic-text-primary/75">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
