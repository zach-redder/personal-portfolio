import type { Metadata } from 'next'
import Link from 'next/link'
import { Hotbar } from '@/components/links/Hotbar'
import { links } from '@/content/links'

export const metadata: Metadata = {
  title: 'Links | Zach Redder',
  description: 'Where to find Zach Redder: streams, videos, community, apps, code and more.',
  alternates: { canonical: '/links/' },
}

export default function LinksPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      <header className="wrap flex items-center justify-between py-4">
        <Link href="/" className="font-display text-xl text-text hover:text-gold">
          ← Zach Redder
        </Link>
        <h1 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Links</h1>
      </header>

      <div className="flex flex-1 items-center justify-center py-[var(--phi-4)]">
        <Hotbar />
      </div>

      {/* Hover doesn't exist on touch screens, so small viewports get the descriptions as plain text. */}
      <ul className="wrap divide-y divide-line border-t border-line pb-[var(--phi-4)] md:hidden">
        {links.map((link) => (
          <li key={link.id}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="block py-4">
              <span className="font-display text-2xl text-gold">{link.title}</span>
              <span className="sr-only"> (opens in a new tab)</span>
              <span className="mt-1 block text-sm text-muted">{link.description}</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
