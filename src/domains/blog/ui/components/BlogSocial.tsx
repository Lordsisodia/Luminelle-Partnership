import { Heart, Loader2, MessageCircle } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react'
import { Link, useLocation } from 'react-router-dom'
import { createSupabaseClient, isSupabaseConfigured, supabase as baseSupabase } from '@/lib/supabase'

type Comment = {
  id: string
  body: string
  display_name: string | null
  created_at: string
  user_id: string | null
  anon_id: string | null
  avatar_url?: string | null
}

const MAX_COMMENT_LENGTH = 500

export const BlogSocial = ({ slug }: { slug: string }) => {
  const supabase = baseSupabase
  const { getToken } = useClerkAuth()
  const { user } = useUser()
  const location = useLocation()

  const [likesCount, setLikesCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [commentCount, setCommentCount] = useState(0)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentBody, setCommentBody] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)

  const userId = user?.id ?? null
  const isSignedIn = Boolean(userId)
  const fallbackName = useMemo(
    () => user?.fullName || user?.username || user?.primaryEmailAddress?.emailAddress || 'Guest',
    [user]
  )
  const redirectTarget = useMemo(
    () => `${location.pathname}${location.search}#comments`,
    [location.pathname, location.search]
  )
  const signInHref = useMemo(
    () => `/sign-in?redirect=${encodeURIComponent(redirectTarget)}`,
    [redirectTarget]
  )
  const signUpHref = useMemo(
    () => `/sign-up?redirect=${encodeURIComponent(redirectTarget)}`,
    [redirectTarget]
  )

  const getWriteClient = async () => {
    const token = await getToken({ template: 'supabase' }).catch(() => null)
    const authedClient = token ? createSupabaseClient(token) : null
    return authedClient ?? supabase
  }

  const fetchLikes = async () => {
    if (!supabase) return
    const { data, count, error: likeErr } = await supabase
      .from('blog_likes')
      .select('user_id, anon_id', { count: 'exact' })
      .eq('slug', slug)

    if (likeErr) {
      console.error('Failed to load likes', likeErr.message)
      return
    }

    setLikesCount(count ?? 0)
    const hasLiked = userId ? (data || []).some((row) => row.user_id === userId) : false
    setLiked(Boolean(hasLiked))
  }

  const fetchCommentsCount = async () => {
    if (!supabase) {
      setCommentCount(sampleComments.length)
      return
    }
    const { count, error: commentErr } = await supabase
      .from('blog_comments')
      .select('id', { count: 'exact', head: true })
      .eq('slug', slug)
      .eq('status', 'published')
    if (commentErr) {
      console.error('Failed to load comments', commentErr.message)
      return
    }
    setCommentCount(count ?? 0)
  }

  const sampleComments: Comment[] = useMemo(
    () => [
      {
        id: 'seed-1',
        body: 'Tried this routine after hot yoga—keeping the cap on for 2 extra minutes before taking it off really helped.',
        display_name: 'Maya',
        created_at: new Date().toISOString(),
        user_id: null,
        anon_id: 'seed',
        avatar_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=96&q=80',
      },
      {
        id: 'seed-2',
        body: 'Love the carry-on kit list. Swapped the towel for a super small microfiber and it fits perfectly.',
        display_name: 'Jordan',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        user_id: null,
        anon_id: 'seed',
        avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80',
      },
    ],
    []
  )

  useEffect(() => {
    if (!supabase) {
      setComments(sampleComments)
      setCommentCount(sampleComments.length)
      return
    }
    fetchLikes()
    fetchCommentsCount()
    fetchLiveComments()
  }, [supabase, slug, userId, sampleComments])

  const fetchLiveComments = async () => {
    if (!supabase) {
      setComments(sampleComments)
      return
    }
    const { data, error: commentErr } = await supabase
      .from('blog_comments')
      .select('id, body, display_name, created_at, user_id, anon_id')
      .eq('slug', slug)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(20)

    if (commentErr) {
      console.error('Failed to load comments', commentErr.message)
      setComments(sampleComments)
      return
    }
    setComments(data || [])
  }

  const handleToggleLike = async () => {
    if (!supabase || likeLoading) return
    if (!isSignedIn) return
    setLikeLoading(true)
    setError(null)
    const client = await getWriteClient()
    if (!client) {
      setError('Social features are not configured right now.')
      setLikeLoading(false)
      return
    }
    try {
      if (liked) {
        const { error: deleteErr } = await client
          .from('blog_likes')
          .delete()
          .eq('slug', slug)
          .eq('user_id', userId)
        if (deleteErr) throw deleteErr
        setLiked(false)
        setLikesCount((prev) => Math.max(0, prev - 1))
      } else {
        const { error: insertErr } = await client
          .from('blog_likes')
          .upsert([{ slug, user_id: userId, anon_id: null }], { onConflict: 'slug,actor_id' })
        if (insertErr) throw insertErr
        setLiked(true)
        setLikesCount((prev) => prev + 1)
      }
    } catch (err) {
      console.error('Like toggle failed', err)
      setError('Could not update like. Please try again.')
    } finally {
      setLikeLoading(false)
    }
  }

  const handleSubmitComment = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setComments(sampleComments)
      setCommentCount(sampleComments.length)
      setError('Comments are turned off right now.')
      return
    }
    if (!isSignedIn) return
    const body = commentBody.trim()
    if (body.length < 2) {
      setError('Say a little more before posting.')
      return
    }
    setError(null)
    setCommentLoading(true)
    const client = await getWriteClient()
    if (!client) {
      setError('Comments are unavailable right now.')
      setCommentLoading(false)
      return
    }
    try {
      const { error: insertErr } = await client.from('blog_comments').insert({
        slug,
        body: body.slice(0, MAX_COMMENT_LENGTH),
        display_name: fallbackName.slice(0, 80),
        user_id: userId,
        anon_id: null,
        avatar_url: user?.imageUrl || null,
        status: 'published',
      })
      if (insertErr) throw insertErr
      setCommentBody('')
      fetchCommentsCount()
      fetchLiveComments()
    } catch (err) {
      console.error('Comment submit failed', err)
      setError('Could not post right now. Try again in a moment.')
    } finally {
      setCommentLoading(false)
    }
  }

  const disabledSocial = !isSupabaseConfigured || !supabase

  return (
    <section id="comments" className="mt-10 rounded-2xl border border-brand-blush/60 bg-white shadow-soft">
      <div className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Community</p>
          <h3 className="text-lg font-heading text-brand-cocoa">Show some love or drop a note.</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isSignedIn ? (
            <button
              type="button"
              onClick={handleToggleLike}
              disabled={disabledSocial || likeLoading}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition ${
                liked
                  ? 'border-brand-cocoa bg-brand-cocoa text-white shadow-soft'
                  : 'border-brand-blush/80 bg-brand-blush/20 text-brand-cocoa hover:-translate-y-0.5'
              } ${disabledSocial ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              {likeLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              )}
              <span>{likesCount}</span>
            </button>
          ) : (
            <Link
              to={signInHref}
              className={`inline-flex items-center gap-2 rounded-full border border-brand-blush/80 bg-brand-blush/20 px-3 py-2 text-sm font-semibold text-brand-cocoa transition hover:-translate-y-0.5 ${
                disabledSocial ? 'pointer-events-none opacity-60' : ''
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>{likesCount}</span>
              <span className="text-xs font-semibold text-brand-cocoa/60">Sign in to like</span>
            </Link>
          )}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-peach/60 bg-brand-blush/20 px-3 py-2 text-sm font-semibold text-brand-cocoa">
            <MessageCircle className="h-4 w-4" />
            <span>{commentCount} Comment{commentCount === 1 ? '' : 's'}</span>
          </div>
        </div>
      </div>
      <div className="px-5 pb-5 space-y-4">
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {isSignedIn ? (
          <div className="rounded-2xl border border-brand-blush/60 bg-brand-blush/10 p-4">
            <label className="sr-only" htmlFor="comment-box">
              Comment
            </label>
            <textarea
              id="comment-box"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Add a quick thought…"
              className="min-h-[90px] w-full resize-none rounded-xl border border-brand-blush/60 bg-white px-3 py-2 text-sm text-brand-cocoa outline-none focus:ring-2 focus:ring-brand-peach"
              maxLength={MAX_COMMENT_LENGTH}
            />
            <div className="mt-2 flex items-center justify-between text-xs text-brand-cocoa/60">
              <span>
                {commentBody.length}/{MAX_COMMENT_LENGTH}
              </span>
              <button
                type="button"
                disabled={commentLoading || disabledSocial}
                onClick={handleSubmitComment}
                className="inline-flex items-center gap-2 rounded-full bg-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow-soft hover:-translate-y-0.5 disabled:opacity-60"
              >
                {commentLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MessageCircle className="h-4 w-4" />
                )}
                Post
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-brand-blush/60 bg-brand-blush/10 p-4">
            <p className="text-sm font-semibold text-brand-cocoa">Sign in to join the conversation</p>
            <p className="mt-1 text-sm text-brand-cocoa/70">
              Comments are creator-only. Sign in to post and see your name next to your tips.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Link
                to={signInHref}
                className="inline-flex items-center gap-2 rounded-full bg-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow-soft hover:-translate-y-0.5"
              >
                Sign in
              </Link>
              <Link
                to={signUpHref}
                className="inline-flex items-center gap-2 rounded-full border border-brand-blush/80 bg-white px-4 py-2 text-sm font-semibold text-brand-cocoa shadow-soft hover:-translate-y-0.5"
              >
                Create account
              </Link>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {comments.length ? (
            comments.map((c) => (
              <div key={c.id} className="rounded-2xl border border-brand-blush/60 bg-brand-blush/10 p-4">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-brand-blush/40">
                    {c.avatar_url ? (
                      <img
                        src={c.avatar_url}
                        alt={c.display_name || 'Avatar'}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-brand-cocoa">
                        {(c.display_name || 'R').slice(0, 1).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm text-brand-cocoa/80">
                      <div className="font-semibold text-brand-cocoa">{c.display_name || 'Reader'}</div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-brand-cocoa/50">
                        {new Date(c.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                    <p className="mt-2 whitespace-pre-line text-brand-cocoa/90">{c.body}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-brand-blush/60 bg-brand-blush/10 p-4 text-sm text-brand-cocoa/70">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>Be the first to comment.</span>
              </div>
            </div>
          )}
        </div>

        {disabledSocial ? (
          <p className="text-sm text-brand-cocoa/70">
            Social features need Supabase env vars (`VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`). Add them to enable likes & comments.
          </p>
        ) : null}
      </div>
    </section>
  )
}
