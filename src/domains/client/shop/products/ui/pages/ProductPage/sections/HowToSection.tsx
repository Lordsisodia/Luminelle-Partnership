type Step = { title: string; body: string }
type Props = { steps: Step[] }

export const HowToSection = ({ steps }: Props) => (
  <div className="rounded-3xl border border-semantic-accent-cta/60 bg-white/95 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-semantic-accent-cta/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary">
      Your sign to try this
    </div>
    <div className="space-y-3">
      {steps.map((step, idx) => (
        <div
          key={step.title}
          id={`pdp-sign-step-${idx + 1}`}
          className="scroll-mt-24 flex gap-3 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-semantic-legacy-brand-blush/10 p-3 shadow-[0_8px_18px_rgba(0,0,0,0.04)]"
        >
          <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-semantic-accent-cta text-sm font-extrabold text-semantic-text-primary shadow-soft">
            {idx + 1}
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-base font-semibold text-semantic-text-primary">{step.title}</p>
            <p className="text-[15px] leading-snug text-semantic-text-primary/85">{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)
