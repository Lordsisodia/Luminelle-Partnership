import { Component } from 'react'
import type { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

type AppErrorBoundaryProps = {
  children: ReactNode
}

type AppErrorBoundaryState = {
  error: Error | null
}

const isChunkLoadError = (error: Error) => {
  const name = error?.name ?? ''
  const message = error?.message ?? ''
  return (
    name.includes('ChunkLoadError') ||
    message.includes('ChunkLoadError') ||
    message.includes('Loading chunk') ||
    message.includes('dynamically imported module') ||
    message.includes('Failed to fetch dynamically imported module')
  )
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    // Best-effort: keep console error for debugging, but provide user-facing recovery UI.
    console.error('AppErrorBoundary caught an error', error, errorInfo)
  }

  private refresh = () => {
    if (typeof window === 'undefined') return
    window.location.reload()
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    const chunkFailed = isChunkLoadError(error)
    const title = chunkFailed ? 'Update needed' : 'Something went wrong'
    const description = chunkFailed
      ? 'A new version of this app may be available, or your network dropped while loading. Refresh to try again.'
      : 'The app hit an unexpected error. Refreshing usually fixes it.'

    return (
      <div className="min-h-screen bg-semantic-legacy-brand-blush/20 px-4 py-16 text-semantic-text-primary">
        <Helmet>
          <title>{`LUMELLE™ | ${title}`}</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="mx-auto w-full max-w-lg rounded-3xl border border-semantic-legacy-brand-blush/60 bg-white p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-semantic-text-primary/60">Lumelle</p>
          <h1 className="mt-3 text-2xl font-semibold">{title}</h1>
          <p className="mt-2 text-sm text-semantic-text-primary/70">{description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={this.refresh}
              className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white"
            >
              Refresh
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary"
            >
              Go to home
            </a>
          </div>

          <details className="mt-8 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-semantic-legacy-brand-blush/10 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-semantic-text-primary">Technical details</summary>
            <pre className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-white p-3 text-xs text-semantic-text-primary/80">
              {error.message || String(error)}
            </pre>
          </details>
        </div>
      </div>
    )
  }
}

export default AppErrorBoundary

