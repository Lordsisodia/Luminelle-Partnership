import { SectionHeading } from '@ui/components/SectionHeading'

const steps = [
  { n: '01', title: 'Protect', desc: 'Slip on pre-shower to block steam and humidity.', meta: '<5 sec · before shower', icon: '🛡️' },
  { n: '02', title: 'Rinse', desc: 'Rinse the satin lining, air-dry on the hook.', meta: '10 sec · after shower', icon: '💧' },
  { n: '03', title: 'Repeat', desc: 'Reach for it daily—reusable 100+ wears.', meta: 'Every wash day', icon: '♻️' },
]

export const HowItWorks = () => (
  <section className="bg-brand-blush/20 py-16">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading
        eyebrow="How it works"
        title="Three simple steps"
        description="Protect your style in seconds and keep it fresh day after day."
        alignment="center"
      />
      <div className="mt-10 rounded-[2.5rem] border border-brand-peach/40 bg-white/95 p-6 shadow-soft md:p-8">
        <div className="flex flex-col gap-4">
          {steps.map((s, index) => (
            <div
              key={s.n}
              className="flex items-center gap-4 rounded-2xl border border-brand-blush/60 bg-white p-4 shadow-sm md:gap-6"
            >
              <div className="flex flex-col items-center gap-2 text-brand-cocoa">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-peach/30 font-heading text-2xl text-brand-cocoa">
                  {s.icon}
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em]">Step {s.n}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-2xl text-brand-cocoa">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-cocoa/70">{s.desc}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/50">{s.meta}</p>
              </div>
              {index < steps.length - 1 ? (
                <div className="hidden text-brand-cocoa/40 md:block">
                  <svg width="36" height="12" viewBox="0 0 36 12" fill="none">
                    <path d="M0 6h32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M28 2l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl bg-brand-blush/20 p-4 text-center text-sm text-brand-cocoa/70">
          Need help picking a routine?{' '}
          <a href="https://wa.me/message/lumellecaps" className="font-semibold text-brand-cocoa underline-offset-2 hover:underline">
            Chat with WhatsApp support →
          </a>
        </div>
      </div>
    </div>
  </section>
)
