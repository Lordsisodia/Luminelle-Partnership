import { SimpleLayout } from '@/layouts/SimpleLayout'
import { legalIntro, sampleTermsSections } from '@/content/legal'

export const TermsPage = () => {
  return (
    <SimpleLayout
      title={legalIntro.terms.title}
      description={`${legalIntro.terms.updated} · ${legalIntro.terms.summary}`}
    >
      {sampleTermsSections.map((section) => (
        <section key={section.heading} className="space-y-2">
          <h2 className="font-heading text-xl text-brand-cocoa">
            {section.heading}
          </h2>
          <p>{section.body}</p>
        </section>
      ))}
    </SimpleLayout>
  )
}
