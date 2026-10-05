import { site } from '@/content/site'
import { ArrowUpRight, GithubIcon, LinkedinIcon, MailIcon } from './Icons'
import { SectionHeading } from './SectionHeading'

const rows = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, Icon: MailIcon, external: false },
  { label: 'LinkedIn', value: 'linkedin.com/in/zachredder', href: site.linkedin, Icon: LinkedinIcon, external: true },
  { label: 'GitHub', value: 'github.com/zach-redder', href: site.github, Icon: GithubIcon, external: true },
] as const

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="wrap pt-[var(--phi-6)]">
      <SectionHeading numeral="II" id="contact-title">
        Contact
      </SectionHeading>
      <p className="mb-[var(--phi-3)] max-w-xl text-lead text-muted">
        If you’re building technology meant to serve people well, I’d like to hear about it.
      </p>
      <ul className="divide-y divide-line border-y border-line">
        {rows.map(({ label, value, href, Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex items-center gap-4 py-[var(--phi-2)] text-text transition-colors hover:text-gold"
            >
              <Icon />
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{label}</span>
              <span className="ml-auto text-right">{value}</span>
              <ArrowUpRight />
              {external && <span className="sr-only">(opens in a new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
