import { useMemo, useState } from 'react'

type Prize = {
  label: string
  helper?: string
  color?: string
}

type SpinWheelProps = {
  prizes?: Prize[]
  onResult?: (prize: Prize) => void
  claimHref?: string
}

const defaultPrizes: Prize[] = [
  { label: '5% off', helper: 'Any pack', color: '#F9A58A' },
  { label: '10% off', helper: 'Any pack', color: '#F4C7B7' },
  { label: 'Free shipping', helper: 'UK & EU', color: '#FDD9C3' },
  { label: '10% + free ship', helper: 'Best value', color: '#F7B8A0' },
]

export const SpinWheel = ({ prizes = defaultPrizes, onResult, claimHref = '/sign-in' }: SpinWheelProps) => {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<Prize | null>(null)
  const [spun, setSpun] = useState(false)

  const slice = 360 / prizes.length

  const gradient = useMemo(() => {
    // Build a conic-gradient string for the wheel wedges
    let acc = ''
    prizes.forEach((prize, idx) => {
      const start = idx * slice
      const end = start + slice
      const color = prize.color || defaultPrizes[idx % defaultPrizes.length].color!
      acc += `${color} ${start}deg ${end}deg${idx === prizes.length - 1 ? '' : ', '}`
    })
    return `conic-gradient(${acc})`
  }, [prizes, slice])

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setResult(null)

    const targetIndex = prizes.length - 1 // always land on best reward after capture
    const spins = 6 + Math.floor(Math.random() * 4) // 6-9 full rotations
    // Pointer is at 12 o'clock; align segment center there
    const targetRotation = 360 - (targetIndex * slice + slice / 2)
    const nextRotation = rotation + spins * 360 + targetRotation
    setRotation(nextRotation)

    window.setTimeout(() => {
      const prize = prizes[targetIndex]
      setResult(prize)
      setSpinning(false)
      setSpun(true)
      onResult?.(prize)
    }, 3400)
  }

  return (
    <div className="flex flex-col items-center gap-4 text-brand-cocoa">
      <div className="relative h-64 w-64 max-w-full">
        {/* Pointer */}
        <div className="absolute left-1/2 top-[-10px] z-20 -translate-x-1/2">
          <div className="h-4 w-4 rotate-45 rounded-sm bg-brand-cocoa shadow-sm" />
        </div>
        {/* Wheel */}
        <div
          className={`absolute inset-0 rounded-full border-8 border-white shadow-[0_18px_38px_rgba(0,0,0,0.12)] transition-transform duration-[3200ms] ease-out`}
          style={{
            backgroundImage: gradient,
            transform: `rotate(${rotation}deg)`,
          }}
          aria-live="polite"
        />
        {/* Center puck (blank for clean look) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full bg-white/90 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-cocoa shadow-soft backdrop-blur">
            <span className="sr-only">Spin</span>
          </div>
        </div>
      </div>
      <div className="mt-4 grid w-full max-w-md grid-cols-2 gap-3 text-sm text-brand-cocoa/80">
        {prizes.map((prize) => (
          <div key={prize.label} className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
            <span className="h-4 w-4 shrink-0 rounded-full border border-brand-cocoa/20" style={{ backgroundColor: prize.color || '#F9A58A' }} />
            <div>
              <div className="font-semibold text-brand-cocoa">{prize.label}</div>
              {prize.helper ? <div className="text-xs text-brand-cocoa/70">{prize.helper}</div> : null}
            </div>
          </div>
        ))}
      </div>

      {!spun ? (
        <button
          type="button"
          disabled={spinning}
          onClick={spin}
          className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-brand-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {spinning ? 'Spinning…' : 'Spin the wheel'}
        </button>
      ) : (
        <a
          href={claimHref}
          className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-brand-peach px-6 py-3 text-sm font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5"
        >
          Log in to claim
        </a>
      )}
      {result ? (
        <div className="text-center text-sm font-semibold text-brand-cocoa">
          You landed on <span className="underline decoration-brand-peach">{result.label}</span>
          {result.helper ? <span className="text-brand-cocoa/70"> — {result.helper}</span> : null}
        </div>
      ) : null}
    </div>
  )
}
