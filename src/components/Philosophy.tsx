import { principles } from '@/content/principles'
import { SectionHeading } from './SectionHeading'

type Style = React.CSSProperties

const strokeProps = { fill: 'none', pathLength: 1 } as const

function ArchArt() {
  const columns = [50, 150, 250, 350]
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label="Line drawing of a colonnade with three arches beneath a pediment"
      className="draw w-full max-w-md text-gold"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-reveal
    >
      <path {...strokeProps} d="M20 280H380" />
      <path {...strokeProps} d="M30 82 200 14 370 82Z" style={{ '--i': 1 } as Style} />
      <path {...strokeProps} d="M30 94H370" style={{ '--i': 2 } as Style} />
      <path {...strokeProps} d="M30 106H370" style={{ '--i': 2 } as Style} />
      {columns.map((x, i) => (
        <g key={x}>
          <path {...strokeProps} d={`M${x - 7} 280V128`} style={{ '--i': 3 + i } as Style} />
          <path {...strokeProps} d={`M${x + 7} 280V128`} style={{ '--i': 3 + i } as Style} />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          {...strokeProps}
          d={`M${columns[i] + 7} 128A43 43 0 0 1 ${columns[i + 1] - 7} 128`}
          style={{ '--i': 7 + i } as Style}
        />
      ))}
    </svg>
  )
}

export function Philosophy() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="wrap pt-[var(--phi-6)]">
      <SectionHeading numeral="II" id="philosophy-title">
        Philosophy
      </SectionHeading>

      <div className="grid gap-[var(--phi-4)] lg:grid-cols-[1fr_1.618fr]">
        <div>
          <ArchArt />
          <p className="mt-[var(--phi-2)] inline-block rounded-sm border border-terracotta px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-terracotta">
            Draft copy · to be rewritten
          </p>
        </div>

        <ol className="space-y-[var(--phi-3)]">
          {principles.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              className="reveal flex gap-[var(--phi-3)] border-b border-line pb-[var(--phi-3)] last:border-b-0"
              style={{ '--i': i } as Style}
            >
              <span aria-hidden="true" className="font-display text-3xl italic text-gold">
                {['i', 'ii', 'iii', 'iv'][i]}.
              </span>
              <div>
                <h3 className="text-2xl text-text">{p.title}</h3>
                <p className="mt-1 text-muted">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
