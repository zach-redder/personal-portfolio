import Link from 'next/link'
import { profile, site } from '@/content/site'
import { GoldenMean } from './GoldenMean'

export function Hero() {
  return (
    <section aria-labelledby="top" className="wrap pb-[var(--phi-5)] pt-[var(--phi-5)]">
      <div className="grid items-center gap-[var(--phi-4)] lg:grid-cols-[1.618fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">{site.tagline}</p>
          <h1 id="top" className="mt-[var(--phi-3)] text-display text-text">
            Zach Redder
          </h1>
          <p className="mt-[var(--phi-3)] max-w-[34rem] text-lead text-muted">
            I build AI and software oriented toward the human good, carrying philosophical frameworks like virtue
            ethics into product design and engineering, so technology supports a good life rather than just
            capturing attention.
          </p>
          <div className="mt-[var(--phi-4)] flex flex-wrap gap-3">
            <Link
              href="/#projects"
              className="rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-bg transition-colors duration-[var(--dur-fast)] hover:bg-text"
            >
              View projects
            </Link>
            <a
              href={site.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-line px-5 py-3 text-sm text-text transition-colors duration-[var(--dur-fast)] hover:border-gold hover:text-gold"
            >
              Blog<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <GoldenMean />
      </div>

      <div
        className="mt-[var(--phi-5)] border-y border-line py-[var(--phi-3)]"
        role="group"
        aria-labelledby="profile-heading"
      >
        <h2 id="profile-heading" className="mb-[var(--phi-2)] font-mono text-xs font-normal uppercase tracking-[0.18em] text-muted">
          Profile
        </h2>
        <dl className="grid gap-x-[var(--phi-4)] gap-y-3 sm:grid-cols-[auto_1fr]">
          {profile.map((row) => (
            <div key={row.label} className="contents">
              <dt className="font-mono text-xs uppercase tracking-[0.12em] text-gold sm:pt-1">{row.label}</dt>
              <dd className="text-text">{row.value}</dd>
            </div>
          ))}
          <div className="contents">
            <dt className="font-mono text-xs uppercase tracking-[0.12em] text-gold sm:pt-1">Email</dt>
            <dd>
              <a href={`mailto:${site.email}`} className="text-text underline decoration-line underline-offset-4 hover:decoration-gold">
                {site.email}
              </a>
            </dd>
          </div>
          <div className="contents">
            <dt className="font-mono text-xs uppercase tracking-[0.12em] text-gold sm:pt-1">GitHub</dt>
            <dd>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text underline decoration-line underline-offset-4 hover:decoration-gold"
              >
                github.com/zach-redder<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
