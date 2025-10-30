import { SectionHeading } from '@/components/SectionHeading'
import { journeySteps } from '@/content/landing'

export const JourneySection = () => {
  return (
    <section
      id="journey"
      className="mx-auto max-w-6xl px-4 py-20 md:px-6"
    >
      <SectionHeading
        eyebrow="Creator Journey"
        title="Exactly what happens after you tap join"
        description="We map your next five days so you can move from trial to launch without slowing down."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {journeySteps.map((step, idx) => (
          <div
            key={step.title}
            className="relative rounded-3xl border border-brand-peach/40 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
          >
            <span className="font-heading text-4xl text-brand-peach/80">
              0{idx + 1}
            </span>
            <h3 className="mt-4 font-heading text-2xl text-brand-cocoa">
              {step.title}
            </h3>
            <p className="mt-3 text-sm text-brand-cocoa/70">
              {step.description}
            </p>
            <div className="mt-6 inline-flex rounded-full bg-brand-blush/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-cocoa/70">
              {step.caption}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
