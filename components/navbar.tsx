'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">

          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="AandolanBot home"
          >
            {/* Nepal flag double-triangle mark */}
            <span className="relative flex h-6 w-4 shrink-0" aria-hidden="true">
              <span
                className="absolute top-0 left-0 w-0 h-0"
                style={{
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderBottom: '10px solid oklch(0.49 0.22 18)',
                }}
              />
              <span
                className="absolute bottom-0 left-0 w-0 h-0"
                style={{
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '14px solid oklch(0.30 0.13 260)',
                }}
              />
            </span>
            <span className="font-black text-sm uppercase tracking-widest text-foreground transition-colors duration-150 group-hover:text-primary">
              Aandolan<span className="text-primary">Bot</span>
            </span>
          </Link>

          {/* Nav */}
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-4 sm:gap-6">
              <li>
                <Link
                  href="/"
                  className={cn(
                    'text-sm transition-colors duration-150',
                    pathname === '/'
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className={cn(
                    'rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    pathname === '/chat'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-primary text-primary-foreground hover:bg-accent'
                  )}
                >
                  Ask a Question
                </Link>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </header>
  )
}
