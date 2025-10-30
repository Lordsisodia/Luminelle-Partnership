import { SimpleLayout } from '@/layouts/SimpleLayout'
import { briefPage } from '@/content/brief'

export const BriefPage = () => {
  return (
    <SimpleLayout
      title={briefPage.title}
      description={briefPage.intro}
      ctaHref="/"
      ctaLabel="Back to landing"
    >
      <a
        href={briefPage.downloadHref}
        className="inline-flex w-full items-center justify-center rounded-2xl bg-brand-peach px-4 py-3 text-sm font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-peach/90"
      >
        {briefPage.downloadLabel}
      </a>
      <section className="space-y-2">
        <h2 className="font-heading text-xl text-brand-cocoa">
          Before you download
        </h2>
        <ul className="space-y-2 text-sm text-brand-cocoa/75">
          {briefPage.checklist.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-[6px] inline-flex size-1.5 rounded-full bg-brand-cocoa/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="space-y-2">
        <h2 className="font-heading text-xl text-brand-cocoa">
          Quick reminders
        </h2>
        <ul className="space-y-2 text-sm text-brand-cocoa/75">
          {briefPage.reminders.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-[6px] inline-flex size-1.5 rounded-full bg-brand-cocoa/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </SimpleLayout>
  )
}
