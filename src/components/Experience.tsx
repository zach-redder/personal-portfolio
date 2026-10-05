import { experience } from '@/content/experience'
import { formatRange } from '@/lib/format'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="wrap pt-[var(--phi-6)]">
      <SectionHeading numeral="III" id="experience-title">
        Experience
      </SectionHeading>

      <ol className="relative ml-2 border-l border-line">
        {experience.map((role, i) => (
          <li
            key={`${role.title}-${role.start}`}
            data-reveal
            className="reveal relative pb-[var(--phi-4)] pl-[var(--phi-3)] last:pb-0"
            style={{ '--i': i } as React.CSSProperties}
          >
            <span aria-hidden="true" className="absolute -left-[5px] top-2 size-[9px] rounded-full bg-gold" />
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
              {formatRange(role.start, role.end)}
            </p>
            <h3 className="mt-1 text-2xl text-text">{role.title}</h3>
            <p className="text-gold">{role.org}</p>
            {role.summary && <p className="mt-2 max-w-xl text-muted">{role.summary}</p>}
          </li>
        ))}
      </ol>
    </section>
  )
}
