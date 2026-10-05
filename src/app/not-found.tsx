import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteShell } from '@/components/SiteShell'

export const metadata: Metadata = { title: 'Aporia (404) | Zach Redder', robots: { index: false } }

export default function NotFound() {
  return (
    <SiteShell>
      <section className="wrap flex min-h-[60dvh] flex-col justify-center py-[var(--phi-5)]">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta">404 · Aporia</p>
        <h1 className="mt-[var(--phi-2)] text-display text-text">You have reached an impasse.</h1>
        <p className="mt-[var(--phi-3)] max-w-xl text-lead text-muted">
          Socrates held that wisdom begins in admitting what we do not know. This page does not exist, which makes it a
          fine place to begin wondering. Perhaps the better question is what you were looking for.
        </p>
        <Link
          href="/"
          className="mt-[var(--phi-4)] w-fit rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-bg hover:bg-text"
        >
          Return to the beginning
        </Link>
      </section>
    </SiteShell>
  )
}
