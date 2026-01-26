import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, Clock } from 'lucide-react'

type Tip = {
  title: string
  content: string
}

type Step = {
  title: string
  body: string
  timeEstimate?: string
  difficulty?: 'easy' | 'medium'
  tips?: Tip[]
}

type Props = {
  steps: Step[]
}

export const HowToSection = ({ steps }: Props) => {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [expandedTips, setExpandedTips] = useState<Set<number>>(new Set())
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  // Calculate total time
  const totalTime = steps
    .filter((s) => s.timeEstimate)
    .map((s) => s.timeEstimate || '')
    .join(' + ')

  const toggleTips = (idx: number) => {
    setExpandedTips((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) {
        next.delete(idx)
      } else {
        next.add(idx)
      }
      return next
    })
  }

  const handleStepClick = (idx: number) => {
    setActiveStep(idx)
    const el = stepRefs.current[idx]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // Intersection Observer for auto-highlight on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = steps.findIndex(
              (_, i) => entry.target.id === `pdp-sign-step-${i + 1}`
            )
            if (idx !== -1) {
              setActiveStep(idx)
            }
          }
        })
      },
      { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
    )

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [steps.length])

  const getDifficultyBadge = (difficulty?: string) => {
    if (!difficulty) return null
    const styles = {
      easy: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-amber-100 text-amber-800 border-amber-200',
    }
    const labels = { easy: 'Easy', medium: 'Medium' }
    return (
      <span
        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${styles[difficulty as keyof typeof styles]}`}
      >
        {labels[difficulty as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="rounded-3xl border border-semantic-accent-cta/60 bg-white/95 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-semantic-accent-cta/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary">
          Your sign to try this
        </div>
        {totalTime && (
          <div className="inline-flex items-center gap-1 rounded-full bg-semantic-legacy-brand-cocoa/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-semantic-legacy-brand-cocoa/80">
            <Clock className="h-3 w-3" />
            <span>{totalTime}</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx
          const isExpanded = expandedTips.has(idx)
          return (
            <div
              key={step.title}
              ref={(el) => {
                stepRefs.current[idx] = el
              }}
              id={`pdp-sign-step-${idx + 1}`}
              onClick={() => handleStepClick(idx)}
              className={`scroll-mt-24 flex cursor-pointer gap-3 rounded-2xl border bg-white p-3 shadow-[0_8px_18px_rgba(0,0,0,0.04)] transition-all ${
                isActive
                  ? 'border-semantic-accent-cta ring-2 ring-semantic-accent-cta/30 bg-white'
                  : 'border-semantic-legacy-brand-blush/60'
              }`}
            >
              <span
                className={`mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-extrabold shadow-soft transition-colors ${
                  isActive ? 'bg-semantic-legacy-brand-cocoa text-white' : 'bg-semantic-accent-cta text-semantic-text-primary'
                }`}
              >
                {idx + 1}
              </span>
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-base font-semibold text-semantic-text-primary">{step.title}</p>
                  {getDifficultyBadge(step.difficulty)}
                  {step.timeEstimate && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-semantic-text-primary/60">
                      <Clock className="h-3 w-3" />
                      {step.timeEstimate}
                    </span>
                  )}
                </div>
                <p className="text-[15px] leading-snug text-semantic-text-primary/85">{step.body}</p>

                {/* Expandable Pro Tips */}
                {step.tips && step.tips.length > 0 && (
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleTips(idx)
                      }}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-semantic-accent-cta/90 hover:text-semantic-accent-cta transition"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-3.5 w-3.5" />
                          Hide tips
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3.5 w-3.5" />
                          Pro tips
                        </>
                      )}
                    </button>
                    {isExpanded && (
                      <div className="mt-2.5 space-y-2 rounded-xl border border-semantic-legacy-brand-blush/40 bg-white p-3">
                        {step.tips.map((tip, tipIdx) => (
                          <div key={tipIdx} className="flex flex-col gap-0.5">
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-semantic-legacy-brand-cocoa/80">
                              {tip.title}
                            </p>
                            <p className="text-sm leading-snug text-semantic-text-primary/90">{tip.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
