import { useMemo, useState } from 'react'

type Prize = {
  label: string
  helper?: string
  color: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// 8 slices with 4 core options, plus a special "best value" slice.
// The wheel always lands on the special slice, and we always award it after email capture.
const defaultPrizes: Prize[] = [
  { label: 'Get 5% off', helper: 'Any pack', color: '#F9A58A' },
  { label: 'Get 10% off', helper: 'Any pack', color: '#F4C7B7' },
  { label: 'Free shipping', helper: 'UK & EU', color: '#FDD9C3' },
  { label: 'Get a free cap', helper: 'Lucky you', color: '#F7B8A0' },
  { label: 'Get 5% off', helper: 'Any pack', color: '#F9A58A' },
  { label: '10% + free shipping', helper: 'Best value', color: '#F7B8A0' },
  { label: 'Free shipping', helper: 'UK & EU', color: '#FDD9C3' },
  { label: 'Get a free cap', helper: 'Lucky you', color: '#F7B8A0' },
]

const guaranteedAward: Prize = {
  label: '10% + free shipping',
  helper: 'Best value',
  color: '#F7B8A0',
}

const APPLY_LINK = 'https://lumellebeauty.co.uk/discount/LUMELLE10?redirect=/cart'

export const SpinWheel = ({ prizes = defaultPrizes }: { prizes?: Prize[] }) => {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)
  const [result, setResult] = useState<Prize | null>(null)

  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false)

  const slice = 360 / prizes.length

  const gradient = useMemo(() => {
    let acc = ''
    prizes.forEach((prize, idx) => {
      const start = idx * slice
      const end = start + slice
      acc += `${prize.color} ${start}deg ${end}deg${idx === prizes.length - 1 ? '' : ', '}`
    })
    return `conic-gradient(${acc})`
  }, [prizes, slice])

  const uniqueOptions = useMemo(() => {
    const seen = new Set<string>()
    return prizes.filter((prize) => {
      const key = prize.label.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }, [prizes])

  const spin = () => {
    if (spinning || hasSpun) return

    if (!hasSubmittedEmail) {
      const trimmed = email.trim()
      if (!emailRegex.test(trimmed)) {
        setError('Please enter a valid email to spin.')
        return
      }
      setError(null)
      setHasSubmittedEmail(true)
    }

    setSpinning(true)
    setResult(null)

    // Always land visually on the special "10% + free shipping" slice.
    let targetIndex = prizes.length - 1
    for (let i = prizes.length - 1; i >= 0; i--) {
      const label = prizes[i].label.toLowerCase()
      if (label.includes('10%') && label.includes('free')) {
        targetIndex = i
        break
      }
    }

    const spins = 6 + Math.floor(Math.random() * 4) // 6–9 full rotations
    const targetRotation = 360 - (targetIndex * slice + slice / 2)
    const nextRotation = rotation + spins * 360 + targetRotation
    setRotation(nextRotation)

    window.setTimeout(() => {
      setResult(guaranteedAward)
      setSpinning(false)
      setHasSpun(true)
    }, 3400)
  }

  return (
    <div className="flex flex-col items-center gap-4 text-brand-cocoa">
      <div className="relative h-64 w-64 max-w-full md:h-72 md:w-72">
        {/* Pointer */}
        <div className="absolute left-1/2 top-[-10px] z-20 -translate-x-1/2">
          <div className="h-4 w-4 rotate-45 rounded-sm bg-brand-cocoa shadow-sm" />
        </div>

        {/* Wheel */}
        <div
          className="absolute inset-0 rounded-full border-8 border-white shadow-[0_18px_38px_rgba(0,0,0,0.12)] transition-transform duration-[3200ms] ease-out"
          style={{
            backgroundImage: gradient,
            transform: `rotate(${rotation}deg)`,
          }}
          aria-live="polite"
        />

        {/* Center puck */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full bg-white/90 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-cocoa shadow-soft backdrop-blur">
            <span className="sr-only">Spin</span>
          </div>
        </div>
      </div>

      {!hasSpun && (
        <div className="flex w-full max-w-md flex-col items-stretch gap-2">
          <label htmlFor="spin-email" className="text-left text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">
            Email address
          </label>
          <input
            id="spin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-brand-blush/60 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-peach"
            disabled={hasSubmittedEmail || spinning}
            required
          />
          {error && <p className="text-left text-xs font-medium text-red-600">{error}</p>}

          <button
            type="button"
            disabled={spinning}
            onClick={spin}
            className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-brand-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {spinning ? 'Spinning…' : hasSubmittedEmail ? 'Spin the wheel' : 'Unlock & spin'}
          </button>
        </div>
      )}

      <div className="mt-2 grid w-full max-w-md grid-cols-2 gap-3 text-sm text-brand-cocoa/80">
        {uniqueOptions.map((prize) => (
          <div key={prize.label} className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
            <span className="h-4 w-4 shrink-0 rounded-full border border-brand-cocoa/20" style={{ backgroundColor: prize.color }} />
            <div>
              <div className="font-semibold text-brand-cocoa">{prize.label}</div>
              {prize.helper ? <div className="text-xs text-brand-cocoa/70">{prize.helper}</div> : null}
            </div>
          </div>
        ))}
      </div>

      {hasSpun && result ? (
        <div className="w-full max-w-md rounded-2xl bg-white/80 p-4 text-center shadow-soft">
          <p className="font-heading text-lg font-bold text-brand-cocoa">You won {result.label}!</p>
          <p className="mt-1 text-sm text-brand-cocoa/80">
            Use code <span className="font-semibold">LUMELLE10</span> at checkout. Enjoy your treat.
          </p>
          <a
            href={APPLY_LINK}
            className="mt-4 inline-flex min-w-[200px] items-center justify-center rounded-full bg-brand-peach px-6 py-3 text-sm font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5"
          >
            Apply my reward
          </a>
        </div>
      ) : null}
    </div>
  )
}

export default SpinWheel
