'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// ---------------------------------------------------------------------------
// Stats strip data
// ---------------------------------------------------------------------------
const STATS = [
  { value: '900+', label: 'Pages documented' },
  { value: '2025', label: 'Nepal Gen-Z uprising' },
  { value: '47+', label: 'Chapters indexed' },
  { value: '100%', label: 'Free to query' },
] as const

// ---------------------------------------------------------------------------
// Example questions
// ---------------------------------------------------------------------------
const EXAMPLE_QUESTIONS = [
  'When did the Gen-Z Aandolan happen?',
  'Why did the Aandolan escalate?',
  'Who was held accountable?',
  'What were the key demands?',
] as const

// ---------------------------------------------------------------------------
// Feature list
// ---------------------------------------------------------------------------
const FEATURES = [
  {
    title: 'Primary sources only',
    desc: 'Every answer is drawn directly from the official government investigative document — no summaries, no editorialising.',
  },
  {
    title: 'Ask in plain language',
    desc: 'No need for legal terminology. Ask questions the way you would speak them and receive precise, sourced answers.',
  },
  {
    title: 'Full document coverage',
    desc: 'Timelines, testimonies, findings, and recommendations — the entire 900-page record is queryable.',
  },
] as const

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function HeroSection() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground font-sans">

      {/* ------------------------------------------------------------------ */}
      {/* HERO — full viewport, centered                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20 pb-16 text-center">

        {/* Subtle top divider line */}
        <div
          className="absolute top-14 inset-x-0 h-px bg-border"
          aria-hidden="true"
        />

        {/* Eyebrow badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
          <span className="text-sm font-medium tracking-wide text-muted-foreground">
            Nepal &mdash; 2025 Gen-Z Uprising &mdash; Official Government Record
          </span>
        </div>

        {/* Main headline */}
        <h1 className="mx-auto max-w-3xl text-balance text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Question the{' '}
          <span className="text-primary">Government Document</span>
        </h1>

        {/* Sub-headline */}
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          A 900-page official report on Nepal&apos;s 2025 Gen-Z Aandolan sits
          behind this interface. Ask anything. Get precise answers drawn
          directly from the primary source.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/chat"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Start Questioning
            <ArrowRight
              className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>

        </div>

        {/* Example question chips */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-2"
          aria-label="Example questions"
        >
          {EXAMPLE_QUESTIONS.map((q) => (
            <Link
              key={q}
              href="/chat"
              className="rounded-full border border-border bg-muted/40 px-4 py-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:border-primary/40 hover:text-foreground"
            >
              {q}
            </Link>
          ))}
        </div>

        {/* Bottom divider */}
        <div
          className="absolute bottom-0 inset-x-0 h-px bg-border"
          aria-hidden="true"
        />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* STATS STRIP                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="border-b border-border"
        aria-label="Document statistics"
      >
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-1 px-8 py-10"
            >
              <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {value}
              </span>
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FEATURES                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-6"
        aria-label="How it works"
      >
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            How it works
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Direct access to the record
          </h2>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
          {FEATURES.map(({ title, desc }) => (
            <div
              key={title}
              className="flex flex-col gap-3 bg-background px-8 py-10"
            >
              <div
                className="h-px w-8 bg-primary"
                aria-hidden="true"
              />
              <h3 className="text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BOTTOM CTA                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            The document is open. Are your questions?
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            No sign-up. No restrictions. Just you, your questions, and 900
            pages of official government record.
          </p>
          <Link
            href="/chat"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Open the Chat
            <ArrowRight
              className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                               */}
      {/* ------------------------------------------------------------------ */}
      <footer className="border-t border-border px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            AandolanBot &mdash; Nepal 2025
          </p>
          <p className="text-sm text-muted-foreground">
            Powered by the official government investigative report
          </p>
        </div>
      </footer>

    </main>
  )
}
