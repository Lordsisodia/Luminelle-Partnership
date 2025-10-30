import { SimpleLayout } from '@/layouts/SimpleLayout'
import { legalIntro, samplePrivacySections } from '@/content/legal'

export const PrivacyPage = () => {
  return (
    <SimpleLayout
      title={legalIntro.privacy.title}
      description={`${legalIntro.privacy.updated} · ${legalIntro.privacy.summary}`}
    >
      {samplePrivacySections.map((section) => (
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
