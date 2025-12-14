type Step = { title: string; body: string }
type Props = { steps: Step[] }

export const HowToSection = ({ steps }: Props) => (
  <div className="rounded-3xl border border-brand-peach/60 bg-white/95 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-peach/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-cocoa">
      Your sign to try this
    </div>
    <div className="space-y-3">
      {steps.map((step, idx) => (
        <div
          key={step.title}
          className="flex gap-3 rounded-2xl border border-brand-blush/60 bg-brand-blush/10 p-3 shadow-[0_8px_18px_rgba(0,0,0,0.04)]"
        >
          <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-peach text-sm font-extrabold text-brand-cocoa shadow-soft">
            {idx + 1}
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-base font-semibold text-brand-cocoa">{step.title}</p>
            <p className="text-[15px] leading-snug text-brand-cocoa/85">{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)
