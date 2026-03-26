import Link from 'next/link'
import { FileQuestion } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <FileQuestion className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          404
        </p>
        <h1 className="text-2xl font-bold text-foreground">Page not found</h1>
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist. Head back to
          start exploring the document.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Go home
      </Link>
    </div>
  )
}
