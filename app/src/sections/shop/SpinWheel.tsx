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
  { label: '10% off', helper: 'Any pack', color: '#F9A58A' },
  { label: 'Free shipping', helper: '£20+ orders', color: '#F4C7B7' },
  { label: '15% off', helper: 'Bundles only', color: '#FDD9C3' },
  { label: 'Mystery gift', helper: 'Added at checkout', color: '#F7B9A3' },
  { label: '£5 off', helper: 'Single cap', color: '#F3A48E' },
  { label: 'Try again', helper: 'One more spin', color: '#FCE6DD' },
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

    const targetIndex = Math.floor(Math.random() * prizes.length)
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
        {/* Prize labels */}
        <div className="absolute inset-0">
          {prizes.map((prize, idx) => {
            const angle = idx * slice + slice / 2
            return (
              <div
                key={prize.label}
                className="absolute left-1/2 top-1/2 w-[64px] -translate-x-1/2 -translate-y-1/2 text-center text-[11px] font-semibold leading-tight text-brand-cocoa drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-55%) rotate(-${angle}deg)`,
                }}
              >
                {prize.label}
              </div>
            )
          })}
        </div>
        {/* Center puck */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-white/90 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-cocoa shadow-soft backdrop-blur">
            Spin
          </div>
        </div>
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
