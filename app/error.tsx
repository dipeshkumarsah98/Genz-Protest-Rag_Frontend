'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('[AandolanBot] Unhandled error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-7 w-7 text-primary" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-bold text-foreground">
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
          An unexpected error occurred. You can try refreshing the page or
          return to the home page.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RefreshCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
