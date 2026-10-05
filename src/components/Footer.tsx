import { quote } from '@/content/quote'
import { site } from '@/content/site'

export function Footer() {
  return (
    <footer className="mt-[var(--phi-6)] border-t border-line py-[var(--phi-4)]">
      <div className="wrap">
        <figure>
          <blockquote className="max-w-2xl font-display text-2xl italic text-text">“{quote.text}”</blockquote>
          <figcaption className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-muted">
            {quote.source}
          </figcaption>
        </figure>
        <div className="mt-[var(--phi-4)] flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <nav aria-label="Footer" className="flex gap-6 text-base">
            <a
              href={site.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text underline decoration-line underline-offset-4 hover:decoration-gold"
            >
              Blog<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
