import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { useAuth as useAppAuth } from '@auth/ui/providers/AuthContext'
import { createSupabaseClient } from '@/lib/supabase'
import { setNoIndexNoFollow } from '@/lib/seo'
import { INSTAGRAM_URL, SUPPORT_EMAIL, TIKTOK_URL, TWITTER_URL, WHATSAPP_INVITE_URL } from '@/config/constants'
import { useCart } from '@cart/providers/CartContext'

type LoyaltySummary = {
  balance: number
  lifetime_earned: number
  lifetime_spent: number
}

type TaskClaimRow = {
  task_key: string
  points_awarded: number
  claimed_at: string
}

type LedgerRow = {
  id: string
  points: number
  source: string
  created_at: string
}

type WheelClaimRow = {
  discount_code: string
  claimed_at: string
}

function describeLedgerSource(source: string): { title: string; subtitle?: string } {
  const normalized = source.trim()

  if (normalized.startsWith('task:')) {
    const key = normalized.slice('task:'.length)
    return { title: key.replace(/_/g, ' ') }
  }

  if (normalized.startsWith('shopify:fulfillment:')) {
    const parts = normalized.split(':')
    const orderId = parts[parts.length - 1]
    return { title: 'Purchase (shipped)', subtitle: orderId ? `Order #${orderId}` : undefined }
  }

  if (normalized.startsWith('shopify:refund:')) {
    const parts = normalized.split(':')
    const orderId = parts[parts.length - 1]
    return { title: 'Refund', subtitle: orderId ? `Order #${orderId}` : undefined }
  }

  return { title: normalized }
}

type EarnTask = {
  key:
    | 'join_whatsapp'
    | 'follow_instagram'
    | 'follow_tiktok'
    | 'follow_twitter'
    | 'post_instagram_story'
    | 'post_tiktok_video'
    | 'leave_review'
    | 'refer_friend'
  title: string
  description: string
  points: number
  actionHref?: string
  actionLabel?: string
  metaHint?: string
}

const POINTS_PER_GBP = 50

const earnTasks: EarnTask[] = [
  {
    key: 'join_whatsapp',
    title: 'Join our WhatsApp updates',
    description: 'Get restocks, drops, and creator-tested tips before everyone else.',
    points: 150,
    actionHref: WHATSAPP_INVITE_URL,
    actionLabel: 'Open WhatsApp invite',
  },
  {
    key: 'follow_instagram',
    title: 'Follow us on Instagram',
    description: 'See creator routines, results, and new launches.',
    points: 100,
    actionHref: INSTAGRAM_URL,
    actionLabel: 'Open Instagram',
    metaHint: 'Optional: paste your @handle in the claim note.',
  },
  {
    key: 'follow_tiktok',
    title: 'Follow us on TikTok',
    description: 'Watch creators keep styles flawless after every shower.',
    points: 100,
    actionHref: TIKTOK_URL,
    actionLabel: 'Open TikTok',
    metaHint: 'Optional: paste your @handle in the claim note.',
  },
  {
    key: 'follow_twitter',
    title: 'Follow us on X / Twitter',
    description: 'Get quick updates and promo drops.',
    points: 100,
    actionHref: TWITTER_URL,
    actionLabel: 'Open X',
    metaHint: 'Optional: paste your @handle in the claim note.',
  },
  {
    key: 'post_instagram_story',
    title: 'Post an Instagram story',
    description: 'Share your unboxing or shower routine and tag us.',
    points: 200,
    metaHint: 'Optional: paste the story link or screenshot note in the claim.',
  },
  {
    key: 'post_tiktok_video',
    title: 'Post a TikTok video',
    description: 'Show the before/after and tag Lumelle.',
    points: 500,
    metaHint: 'Optional: paste the video link in the claim note.',
  },
  {
    key: 'leave_review',
    title: 'Leave a review',
    description: 'Help other customers choose the right routine.',
    points: 200,
    metaHint: 'Optional: paste the order number or review link in the claim.',
  },
  {
    key: 'refer_friend',
    title: 'Refer a friend',
    description: 'Invite a friend to try Lumelle (verification coming soon).',
    points: 300,
    metaHint: 'Optional: paste your friend’s first name (no email/phone).',
  },
]

export default function RewardsPage() {
  const { signedIn, signIn } = useAppAuth()
  const { getToken } = useClerkAuth()
  const { isLoaded, isSignedIn, user } = useUser()
  const { applyDiscount } = useCart()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [summary, setSummary] = useState<LoyaltySummary | null>(null)
  const [claims, setClaims] = useState<TaskClaimRow[]>([])
  const [ledger, setLedger] = useState<LedgerRow[]>([])
  const [wheelClaim, setWheelClaim] = useState<WheelClaimRow | null>(null)
  const [claimingTaskKey, setClaimingTaskKey] = useState<string | null>(null)
  const [taskNote, setTaskNote] = useState<Record<string, string>>({})

  const claimedTaskKeys = useMemo(() => new Set(claims.map((c) => c.task_key)), [claims])

  const approxValue = useMemo(() => {
    const balance = summary?.balance ?? 0
    return balance > 0 ? balance / POINTS_PER_GBP : 0
  }, [summary?.balance])

  const loadRewards = useCallback(async () => {
    if (!isLoaded || !isSignedIn || !user) return

    setLoading(true)
    setError(null)
    try {
      const token = await getToken({ template: 'supabase' }).catch(() => null)
      if (!token) {
        setError('Missing Clerk JWT template `supabase` token. Check Clerk → JWT Templates.')
        setSummary(null)
        setClaims([])
        setLedger([])
        setWheelClaim(null)
        return
      }

      const client = createSupabaseClient(token)
      if (!client) {
        setError('Supabase is not configured in this environment (missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).')
        setSummary(null)
        setClaims([])
        setLedger([])
        setWheelClaim(null)
        return
      }

      const [summaryRes, claimsRes, ledgerRes, wheelRes] = await Promise.all([
        client.rpc('get_loyalty_points_summary'),
        client
          .from('loyalty_task_claims')
          .select('task_key, points_awarded, claimed_at')
          .order('claimed_at', { ascending: false }),
        client
          .from('loyalty_points_ledger')
          .select('id, points, source, created_at')
          .order('created_at', { ascending: false })
          .limit(12),
        client
          .from('welcome_wheel_claims')
          .select('discount_code, claimed_at')
          .eq('user_id', user.id)
          .maybeSingle(),
      ])

      if (summaryRes.error) throw summaryRes.error
      if (claimsRes.error) throw claimsRes.error
      if (ledgerRes.error) throw ledgerRes.error
      if (wheelRes.error) throw wheelRes.error

      const summaryRow = Array.isArray(summaryRes.data) ? summaryRes.data[0] : summaryRes.data
      setSummary((summaryRow ?? null) as LoyaltySummary | null)
      setClaims((claimsRes.data ?? []) as TaskClaimRow[])
      setLedger((ledgerRes.data ?? []) as LedgerRow[])
      setWheelClaim((wheelRes.data ?? null) as WheelClaimRow | null)
    } catch (err) {
      console.error('Failed to load rewards', err)
      setError(err instanceof Error ? err.message : 'Failed to load rewards.')
      setSummary(null)
      setClaims([])
      setLedger([])
      setWheelClaim(null)
    } finally {
      setLoading(false)
    }
  }, [getToken, isLoaded, isSignedIn, user])

  useEffect(() => {
    setNoIndexNoFollow()
  }, [])

  useEffect(() => {
    if (!signedIn) {
      setSummary(null)
      setClaims([])
      setLedger([])
      setWheelClaim(null)
      return
    }
    void loadRewards()
  }, [loadRewards, signedIn])

  const claimTask = useCallback(
    async (taskKey: EarnTask['key']) => {
      if (!signedIn) {
        signIn()
        return
      }
      if (!isLoaded || !isSignedIn || !user) return
      if (claimingTaskKey) return

      setClaimingTaskKey(taskKey)
      setError(null)
      try {
        const token = await getToken({ template: 'supabase' }).catch(() => null)
        if (!token) {
          setError('Missing Clerk JWT template `supabase` token.')
          return
        }
        const client = createSupabaseClient(token)
        if (!client) {
          setError('Supabase is not configured in this environment.')
          return
        }

        const note = (taskNote[taskKey] ?? '').trim()
        const meta = note ? { note } : undefined

        const { data, error: rpcErr } = await client.rpc('claim_loyalty_task', {
          p_task_key: taskKey,
          ...(meta ? { p_meta: meta } : {}),
        })

        if (rpcErr) {
          setError(rpcErr.message)
          return
        }

        const row = Array.isArray(data) ? data[0] : data
        if (row?.claimed) {
          setTaskNote((prev) => ({ ...prev, [taskKey]: '' }))
          await loadRewards()
        } else {
          setError('Already claimed on this account.')
        }
      } catch (err) {
        console.error('Failed to claim loyalty task', err)
        setError(err instanceof Error ? err.message : 'Failed to claim reward.')
      } finally {
        setClaimingTaskKey(null)
      }
    },
    [claimingTaskKey, getToken, isLoaded, isSignedIn, loadRewards, signedIn, signIn, taskNote, user]
  )

  const applyWelcomeCode = useCallback(() => {
    if (!wheelClaim?.discount_code || !applyDiscount) return
    applyDiscount(wheelClaim.discount_code)
    try {
      window.dispatchEvent(new CustomEvent('lumelle:open-cart'))
    } catch {
      // ignore
    }
  }, [applyDiscount, wheelClaim?.discount_code])

  const formatPoints = (points: number) => {
    const value = Number(points)
    return Number.isFinite(value) ? value.toLocaleString() : String(points)
  }

  return (
    <MarketingLayout navItems={[]} subtitle="Rewards">
      <main className="bg-white text-semantic-text-primary">
        <section className="bg-gradient-to-b from-[#fff8f4] via-white to-[#fff8f4]">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center rounded-full bg-semantic-accent-cta/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary">
                Lumelle Rewards
              </p>
              <h1 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">
                Earn points. Unlock perks.
              </h1>
              <p className="mt-3 text-base text-semantic-text-primary/75 md:text-lg">
                Simple rewards for customers — purchases, reviews, and social shoutouts. Verification is coming soon; for now it’s honor‑system.
              </p>

              {!signedIn ? (
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
                    onClick={() => signIn()}
                  >
                    Sign in to view your points
                  </button>
                  <RouterLink
                    to="/product/lumelle-shower-cap"
                    className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-semantic-text-primary transition hover:-translate-y-0.5 hover:bg-semantic-legacy-brand-blush/30"
                  >
                    Shop now
                  </RouterLink>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            {error ? (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                {error}
              </div>
            ) : null}

            <div className="grid gap-6 md:grid-cols-3">
              <article className="rounded-3xl border border-semantic-accent-cta/40 bg-white p-6 shadow-soft">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Your points</div>
                <div className="mt-2 font-heading text-4xl font-bold">{formatPoints(summary?.balance ?? 0)}</div>
                <div className="mt-1 text-sm text-semantic-text-primary/70">
                  {summary?.balance ? `≈ £${approxValue.toFixed(2)} at  ${POINTS_PER_GBP} pts = £1` : `Earn points on actions below.`}
                </div>
                {signedIn ? (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-2xl bg-semantic-legacy-brand-blush/25 p-3 text-center">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-semantic-text-primary/60">Earned</div>
                      <div className="mt-1 text-sm font-semibold">{formatPoints(summary?.lifetime_earned ?? 0)}</div>
                    </div>
                    <div className="rounded-2xl bg-semantic-legacy-brand-blush/25 p-3 text-center">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-semantic-text-primary/60">Spent</div>
                      <div className="mt-1 text-sm font-semibold">{formatPoints(summary?.lifetime_spent ?? 0)}</div>
                    </div>
                    <div className="rounded-2xl bg-semantic-legacy-brand-blush/25 p-3 text-center">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-semantic-text-primary/60">Status</div>
                      <div className="mt-1 text-sm font-semibold">{loading ? 'Loading…' : 'Active'}</div>
                    </div>
                  </div>
                ) : null}
              </article>

              <article className="rounded-3xl border border-semantic-accent-cta/40 bg-white p-6 shadow-soft">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Welcome deal</div>
                <div className="mt-2 font-heading text-xl font-bold text-semantic-text-primary">
                  {wheelClaim ? 'Unlocked' : 'Not claimed yet'}
                </div>
                <p className="mt-2 text-sm text-semantic-text-primary/75">
                  Spin the welcome wheel once per account to get your guaranteed deal.
                </p>
                {wheelClaim ? (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-semantic-legacy-brand-blush/30 px-3 py-1 text-[12px] font-semibold">
                      Code: <span className="font-mono">{wheelClaim.discount_code}</span>
                    </span>
                    <button
                      type="button"
                      className="rounded-full bg-semantic-accent-cta px-4 py-2 text-sm font-semibold text-semantic-text-primary shadow-soft transition hover:-translate-y-0.5 hover:bg-semantic-accent-cta/90"
                      onClick={applyWelcomeCode}
                    >
                      Apply to cart
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <RouterLink
                      to="/"
                      className="rounded-full bg-semantic-accent-cta px-4 py-2 text-sm font-semibold text-semantic-text-primary shadow-soft transition hover:-translate-y-0.5 hover:bg-semantic-accent-cta/90"
                    >
                      Go to wheel
                    </RouterLink>
                    {!signedIn ? (
                      <button
                        type="button"
                        className="rounded-full border border-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-semantic-text-primary transition hover:bg-semantic-legacy-brand-blush/30"
                        onClick={() => signIn()}
                      >
                        Sign in to claim
                      </button>
                    ) : null}
                  </div>
                )}
              </article>

              <article className="rounded-3xl border border-semantic-accent-cta/40 bg-white p-6 shadow-soft">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Need help?</div>
                <div className="mt-2 font-heading text-xl font-bold text-semantic-text-primary">We’ve got you</div>
                <p className="mt-2 text-sm text-semantic-text-primary/75">
                  If anything looks off, message us and we’ll sort it.
                </p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Rewards help')}`}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 px-4 py-2 text-sm font-semibold text-semantic-text-primary transition hover:bg-semantic-legacy-brand-blush/30"
                >
                  Email {SUPPORT_EMAIL}
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-semantic-legacy-brand-blush/10 py-12">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center rounded-full bg-semantic-accent-cta/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary">
                How to earn
              </p>
              <h2 className="mt-4 font-heading text-2xl font-bold md:text-3xl">Complete actions, collect points</h2>
              <p className="mt-2 text-sm text-semantic-text-primary/75">
                For now, claims are limited to one per action per account. Social verification is coming later.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {earnTasks.map((task) => {
                const claimed = claimedTaskKeys.has(task.key)
                const isClaiming = claimingTaskKey === task.key

                return (
                  <article
                    key={task.key}
                    className="rounded-3xl border border-semantic-accent-cta/40 bg-white p-5 shadow-soft"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-heading text-lg font-bold text-semantic-text-primary">{task.title}</h3>
                        <p className="mt-1 text-sm text-semantic-text-primary/75">{task.description}</p>
                        {task.metaHint ? (
                          <p className="mt-2 text-[12px] text-semantic-text-primary/60">{task.metaHint}</p>
                        ) : null}
                      </div>
                      <div className="shrink-0 rounded-2xl bg-semantic-legacy-brand-blush/25 px-3 py-2 text-center">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-semantic-text-primary/60">Points</div>
                        <div className="mt-1 text-sm font-semibold">+{formatPoints(task.points)}</div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2 md:grid-cols-[1fr_auto_auto] md:items-center">
                      <input
                        value={taskNote[task.key] ?? ''}
                        onChange={(e) => setTaskNote((prev) => ({ ...prev, [task.key]: e.target.value }))}
                        placeholder="Optional claim note (link, @handle, etc.)"
                        className="w-full rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-2 text-sm text-semantic-text-primary placeholder:text-semantic-text-primary/40"
                      />

                      {task.actionHref ? (
                        <a
                          href={task.actionHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 px-4 py-2 text-sm font-semibold text-semantic-text-primary transition hover:bg-semantic-legacy-brand-blush/30"
                        >
                          {task.actionLabel ?? 'Open'}
                        </a>
                      ) : (
                        <span className="hidden md:block" />
                      )}

                      <button
                        type="button"
                        disabled={loading || isClaiming || claimed}
                        className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold shadow-soft transition ${
                          claimed
                            ? 'bg-semantic-legacy-brand-blush/40 text-semantic-text-primary/70'
                            : 'bg-semantic-accent-cta text-semantic-text-primary hover:-translate-y-0.5 hover:bg-semantic-accent-cta/90'
                        } disabled:opacity-60`}
                        onClick={() => void claimTask(task.key)}
                      >
                        {claimed ? 'Claimed' : isClaiming ? 'Claiming…' : 'Claim'}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Activity</p>
                <h2 className="mt-2 font-heading text-2xl font-bold">Points history</h2>
                <p className="mt-1 text-sm text-semantic-text-primary/70">
                  Your latest points movements.
                </p>
              </div>
              {!signedIn ? (
                <button
                  type="button"
                  className="rounded-full bg-semantic-legacy-brand-cocoa px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
                  onClick={() => signIn()}
                >
                  Sign in
                </button>
              ) : (
                <button
                  type="button"
                  className="rounded-full border border-semantic-legacy-brand-blush/60 px-5 py-2 text-sm font-semibold text-semantic-text-primary transition hover:bg-semantic-legacy-brand-blush/30"
                  onClick={() => void loadRewards()}
                  disabled={loading}
                >
                  {loading ? 'Refreshing…' : 'Refresh'}
                </button>
              )}
            </div>

            <div className="mt-6 rounded-3xl border border-semantic-accent-cta/40 bg-white p-5 shadow-soft">
              {!signedIn ? (
                <div className="text-sm text-semantic-text-primary/70">Sign in to see your points history.</div>
              ) : ledger.length === 0 ? (
                <div className="text-sm text-semantic-text-primary/70">
                  No points yet — claim an action above to get started.
                </div>
              ) : (
                <ol className="divide-y divide-semantic-legacy-brand-blush/40">
                  {ledger.map((row) => (
                    <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                      {(() => {
                        const desc = describeLedgerSource(row.source)
                        return (
                      <div className="text-semantic-text-primary">
                        <div className="font-semibold capitalize">{desc.title}</div>
                        {desc.subtitle ? (
                          <div className="text-[12px] text-semantic-text-primary/60">{desc.subtitle}</div>
                        ) : null}
                        <div className="text-[12px] text-semantic-text-primary/60">
                          {new Date(row.created_at).toLocaleString()}
                        </div>
                      </div>
                        )
                      })()}
                      <div className={`font-semibold ${row.points >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                        {row.points >= 0 ? '+' : ''}
                        {formatPoints(row.points)}
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  )
}
