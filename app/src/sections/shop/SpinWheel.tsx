import { useCallback, useMemo, useRef, useState, useEffect } from 'react'

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

const basePrizes: Prize[] = [
  { label: '5% off', helper: 'Any pack', color: '#F9A58A' },
  { label: '10% off', helper: 'Any pack', color: '#F4C7B7' },
  { label: 'Free shipping', helper: 'UK & EU', color: '#FDD9C3' },
  { label: '10% + free ship', helper: 'Best value', color: '#F7B8A0' },
]

const defaultPrizes: Prize[] = [...basePrizes, ...basePrizes.map((prize) => ({ ...prize }))]

export const SpinWheel = ({ prizes = defaultPrizes, onResult, claimHref = '/sign-in' }: SpinWheelProps) => {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<Prize | null>(null)
  const [spun, setSpun] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [confettiKey, setConfettiKey] = useState(0)
  const audioContextRef = useRef<AudioContext | null>(null)
  const [hydrated, setHydrated] = useState(false)

  const slice = 360 / prizes.length

  const uniquePrizes = useMemo(() => {
    const seen = new Set<string>()
    return prizes.filter((p) => {
      if (seen.has(p.label)) return false
      seen.add(p.label)
      return true
    })
  }, [prizes])

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

  const playWinSound = useCallback(() => {
    if (typeof window === 'undefined') return
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtx) return
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioCtx()
    }
    const ctx = audioContextRef.current
    // Resume in case the context was suspended by browser autoplay policy
    ctx.resume?.()
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(880, now)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.22, now + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5)
    osc.connect(gain).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.5)
  }, [])

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setResult(null)
    setShowModal(false)

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
      setShowModal(true)
      setConfettiKey((k) => k + 1)
      playWinSound()
      onResult?.(prize)
    }, 3400)
  }

  useEffect(() => {
    setHydrated(true)
  }, [])

  const confettiPieces = useMemo(() => {
    const colors = ['#F9A58A', '#F4C7B7', '#FDD9C3', '#F7B8A0', '#FCE4D6', '#E16F5C']
    return Array.from({ length: 42 }).map((_, i) => ({
      id: `${confettiKey}-${i}`,
      left: Math.random() * 100, // vw
      size: 6 + Math.random() * 6,
      color: colors[i % colors.length],
      delay: Math.random() * 0.2,
      duration: 1200 + Math.random() * 600,
      rotate: Math.random() * 720,
    }))
  }, [confettiKey])

  const showConfetti = showModal && result

  return (
    <div className="flex flex-col items-center gap-4 text-brand-cocoa">
      <style>
        {`
          @keyframes pointer-wiggle {
            0% { transform: translateX(-50%) rotate(0deg); }
            25% { transform: translateX(-50%) rotate(-7deg); }
            50% { transform: translateX(-50%) rotate(7deg); }
            75% { transform: translateX(-50%) rotate(-3deg); }
            100% { transform: translateX(-50%) rotate(0deg); }
          }
          @keyframes confetti-fall {
            0% { transform: translateY(-12vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
          }
        `}
      </style>
      <div className="relative h-64 w-64 max-w-full">
        {/* Pointer */}
        <div
          className="absolute left-1/2 top-[-12px] z-20 -translate-x-1/2 drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]"
          style={{ animation: showConfetti ? 'pointer-wiggle 900ms ease-in-out 1' : undefined }}
        >
          <div className="h-4 w-4 rotate-45 rounded-sm bg-brand-cocoa shadow-[0_3px_10px_rgba(0,0,0,0.22)]" />
        </div>
        {/* Wheel */}
        {hydrated ? (
          <div
            className="absolute inset-0 rounded-full border-8 border-white shadow-[0_18px_38px_rgba(0,0,0,0.12)] transition-transform duration-[3200ms] ease-out"
            style={{
              backgroundImage: gradient,
              transform: `rotate(${rotation}deg)`,
            }}
            aria-live="polite"
          />
        ) : (
          <div className="absolute inset-0 rounded-full bg-brand-blush/30 border-8 border-white shadow-[0_18px_38px_rgba(0,0,0,0.12)]" />
        )}
        {/* Slice dividers + subtle gloss */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-1 rounded-full mix-blend-screen opacity-60"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22), transparent 45%),
              radial-gradient(circle at 70% 70%, rgba(255,255,255,0.14), transparent 50%),
              repeating-conic-gradient(from -90deg, rgba(255,255,255,0.72) 0deg 1deg, transparent 1deg 45deg)
            `,
          }}
        />
        {/* Inner ring to give a beveled feel */}
        <div className="pointer-events-none absolute inset-5 rounded-full border border-white/70 shadow-inner" />
        {/* Center puck (blank for clean look) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-white/90 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-cocoa shadow-soft backdrop-blur">
            <span className="block text-[8px] font-semibold leading-tight text-brand-cocoa/70">Tap to</span>
            <span className="text-xs font-black tracking-[0.22em]">Spin</span>
          </div>
        </div>
      </div>
      {showConfetti ? (
        <div className="pointer-events-none fixed inset-0 z-[998] overflow-hidden">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="absolute rounded-[2px]"
              style={{
                left: `${piece.left}vw`,
                width: piece.size,
                height: piece.size * 2,
                backgroundColor: piece.color,
                animation: `confetti-fall ${piece.duration}ms ease-out forwards`,
                animationDelay: `${piece.delay}s`,
                transform: `translateY(-12vh) rotate(${piece.rotate}deg)`,
                opacity: 0.9,
              }}
            />
          ))}
        </div>
      ) : null}
      <div className="mt-4 grid w-full max-w-md grid-cols-2 gap-3 text-sm text-brand-cocoa/80">
        {uniquePrizes.map((prize) => (
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

      {showModal && result ? (
        <div className="fixed inset-0 z-[999] grid place-items-center bg-black/60 px-4 py-8 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-3xl bg-white px-6 py-7 text-center shadow-[0_22px_60px_rgba(0,0,0,0.2)]">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-brand-cocoa/50 transition hover:text-brand-cocoa"
              aria-label="Close reward popup"
            >
              ✕
            </button>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-peach">You won</div>
            <div className="text-2xl font-black text-brand-cocoa">{result.label}</div>
            {result.helper ? <div className="mt-1 text-sm text-brand-cocoa/70">{result.helper}</div> : null}
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={claimHref}
                className="inline-flex w-full items-center justify-center rounded-full bg-brand-cocoa px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
              >
                Claim reward
              </a>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-sm font-semibold text-brand-cocoa/70 underline decoration-brand-peach/70 underline-offset-4 transition hover:text-brand-cocoa"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
