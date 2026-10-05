import type { ReactNode } from 'react'

export function SectionHeading({ numeral, id, children }: { numeral: string; id: string; children: ReactNode }) {
  return (
    <div className="mb-[var(--phi-4)] flex items-baseline gap-[var(--phi-2)] border-t border-line pt-[var(--phi-3)]">
      <span aria-hidden="true" className="reveal font-display text-title italic text-gold" data-reveal>
        {numeral}.
      </span>
      <h2 id={id} className="reveal text-title text-text" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
        {children}
      </h2>
    </div>
  )
}
