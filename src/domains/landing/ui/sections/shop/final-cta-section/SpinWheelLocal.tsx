import { useEffect, useMemo, useState } from 'react'
import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react'
import { useAuth } from '@auth/ui/providers/AuthContext'
import { createSupabaseClient } from '@/lib/supabase'
import { useCart } from '@cart/providers/CartContext'

type Prize = {
  label: string
  helper?: string
  color: string
}

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

const WELCOME_DISCOUNT_CODE = 'LUMELLE10'
const WELCOME_MIN_SPEND_GBP = 20
const PENDING_PREVIEW_KEY = 'lumelle_welcome_wheel_pending_preview'

type WheelClaim = {
  user_id: string
  discount_code: string
  claimed_at: string
}

export const SpinWheel = ({ prizes = defaultPrizes }: { prizes?: Prize[] }) => {
  const { isLoaded, isSignedIn, user } = useUser()
  const { getToken } = useClerkAuth()
  const { signedIn, signIn } = useAuth()
  const { applyDiscount, items, checkoutUrl } = useCart()

  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)
  const [result, setResult] = useState<Prize | null>(null)
  const [claim, setClaim] = useState<WheelClaim | null>(null)
  const [loadingClaim, setLoadingClaim] = useState(false)
  const [claiming, setClaiming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [applyStatus, setApplyStatus] = useState<'idle' | 'saved' | 'applied'>('idle')

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
    const hiddenLabels = new Set(['get 10% off'])

    return prizes.filter((prize) => {
      const key = prize.label.toLowerCase()
      if (hiddenLabels.has(key)) return false
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }, [prizes])

  const fetchClaim = async () => {
    if (!isLoaded || !isSignedIn || !user) return null
    const token = await getToken({ template: 'supabase' }).catch(() => null)
    const client = token ? createSupabaseClient(token) : null
    if (!client) return null

    const { data, error } = await client
      .from('welcome_wheel_claims')
      .select('user_id, discount_code, claimed_at')
      .eq('user_id', user.id)
      .maybeSingle()

    if (error) throw error
    return data as WheelClaim | null
  }

  const claimWelcome = async () => {
    if (!isLoaded || !isSignedIn || !user) return null
    const token = await getToken({ template: 'supabase' }).catch(() => null)
    const client = token ? createSupabaseClient(token) : null
    if (!client) throw new Error('Supabase not configured')

    const { data, error } = await client
      .from('welcome_wheel_claims')
      .insert({ user_id: user.id, discount_code: WELCOME_DISCOUNT_CODE })
      .select('user_id, discount_code, claimed_at')
      .single()

    if (!error) return data as WheelClaim

    // If the row already exists (already claimed), fetch and return it.
    if ((error as any)?.code === '23505') {
      const existing = await fetchClaim()
      return existing
    }

    throw error
  }

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return
    let cancelled = false

    const run = async () => {
      setLoadingClaim(true)
      setError(null)
      try {
        const existing = await fetchClaim()
        if (cancelled) return
        if (existing) {
          setClaim(existing)
          setHasSpun(true)
          setResult(guaranteedAward)
          return
        }

        // If they preview-spun while signed out, auto-claim on first login.
        const pendingPreview = localStorage.getItem(PENDING_PREVIEW_KEY) === '1'
        if (pendingPreview) {
          setClaiming(true)
          const created = await claimWelcome()
          if (cancelled) return
          if (created) {
            setClaim(created)
            setHasSpun(true)
            setResult(guaranteedAward)
          }
          localStorage.removeItem(PENDING_PREVIEW_KEY)
        }
      } catch (err) {
        console.error('Failed to load welcome wheel claim', err)
      } finally {
        if (!cancelled) {
          setClaiming(false)
          setLoadingClaim(false)
        }
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [getToken, isLoaded, isSignedIn, user])

  const spin = () => {
    if (spinning || hasSpun || loadingClaim || claiming) return

    setSpinning(true)
    setResult(null)
    setError(null)
    setApplyStatus('idle')

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
      ;(async () => {
        try {
          // Logged in: claim immediately (welcome-only, 1× per account)
          if (isLoaded && isSignedIn && user) {
            setClaiming(true)
            const created = await claimWelcome()
            if (created) setClaim(created)
          } else {
            // Signed out: allow a preview spin, then ask them to sign in to claim.
            localStorage.setItem(PENDING_PREVIEW_KEY, '1')
          }
          setResult(guaranteedAward)
          setHasSpun(true)
        } catch (err) {
          console.error('Failed to claim welcome deal', err)
          setError('Something went wrong. Please try again.')
          setHasSpun(false)
        } finally {
          setClaiming(false)
          setSpinning(false)
        }
      })()
    }, 3400)
  }

  const applyReward = () => {
    if (!applyDiscount) return

    const hasCart = Boolean(checkoutUrl) || (items?.length ?? 0) > 0
    if (!hasCart) {
      try {
        localStorage.setItem('lumelle_pending_discount_code', WELCOME_DISCOUNT_CODE)
      } catch {
        // ignore
      }
      setApplyStatus('saved')
      return
    }

    applyDiscount(WELCOME_DISCOUNT_CODE)
    setApplyStatus('applied')
    try {
      window.dispatchEvent(new CustomEvent('lumelle:open-cart'))
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 text-semantic-text-primary">
      <div className="relative h-64 w-64 max-w-full md:h-72 md:w-72">
        {/* Pointer */}
        <div className="absolute left-1/2 top-[-10px] z-20 -translate-x-1/2">
          <div className="h-4 w-4 rotate-45 rounded-sm bg-semantic-legacy-brand-cocoa shadow-sm" />
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
          <div className="h-10 w-10 rounded-full bg-white/90 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary shadow-soft backdrop-blur">
            <span className="sr-only">Spin</span>
          </div>
        </div>
      </div>

      {!hasSpun && (
        <div className="flex w-full max-w-md flex-col items-stretch gap-2">
          {error && <p className="text-left text-xs font-medium text-red-600">{error}</p>}
          <button
            type="button"
            disabled={spinning || loadingClaim || claiming}
            onClick={spin}
            className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {spinning ? 'Spinning…' : loadingClaim ? 'Loading…' : 'Spin the wheel'}
          </button>
          {!signedIn ? (
            <p className="text-center text-xs text-semantic-text-primary/70">
              You can preview the wheel now. Sign in to claim the welcome deal (1 per account).
            </p>
          ) : (
            <p className="text-center text-xs text-semantic-text-primary/70">
              Welcome deal unlocks once per account. Applies on orders over £{WELCOME_MIN_SPEND_GBP}+.
            </p>
          )}
        </div>
      )}

      <div className="mt-2 grid w-full max-w-md grid-cols-2 gap-3 text-sm text-semantic-text-primary/80">
        {uniqueOptions.map((prize) => (
          <div key={prize.label} className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
            <span className="h-4 w-4 shrink-0 rounded-full border border-semantic-legacy-brand-cocoa/20" style={{ backgroundColor: prize.color }} />
            <div>
              <div className="font-semibold text-semantic-text-primary">{prize.label}</div>
              {prize.helper ? <div className="text-xs text-semantic-text-primary/70">{prize.helper}</div> : null}
            </div>
          </div>
        ))}
      </div>

      {hasSpun && result ? (
        <div className="w-full max-w-md rounded-2xl bg-white/80 p-4 text-center shadow-soft">
          <p className="font-heading text-lg font-bold text-semantic-text-primary">
            {claim ? 'Welcome deal unlocked!' : 'You unlocked a welcome deal!'}
          </p>
          <p className="mt-1 text-sm text-semantic-text-primary/80">
            Code <span className="font-semibold">{WELCOME_DISCOUNT_CODE}</span> • 10% off (min £{WELCOME_MIN_SPEND_GBP}+)
          </p>
          {!signedIn ? (
            <button
              type="button"
              onClick={() => signIn()}
              className="mt-4 inline-flex min-w-[200px] items-center justify-center rounded-full bg-semantic-accent-cta px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-soft transition hover:-translate-y-0.5"
            >
              Sign in to claim
            </button>
          ) : (
            <button
              type="button"
              onClick={applyReward}
              disabled={claiming}
              className="mt-4 inline-flex min-w-[200px] items-center justify-center rounded-full bg-semantic-accent-cta px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-soft transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {claiming
                ? 'Claiming…'
                : applyStatus === 'applied'
                  ? 'Applied to cart'
                  : applyStatus === 'saved'
                    ? 'Saved — add to cart'
                    : 'Apply to cart'}
            </button>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default SpinWheel
