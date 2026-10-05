interface Props {
  visible: boolean
  left: number
  width: number
  gap: number
  title: string
  description: string
}

// `left`/`width` are % of the hotbar; `gap` is a fixed px offset above it so text stays readable at any size.
export function Tooltip({ visible, left, width, gap, title, description }: Props) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-40 border border-line bg-surface px-4 py-3 text-center transition-opacity duration-[var(--dur-fast)] ease-[var(--ease-out)]"
      style={{
        left: `${left}%`,
        width: `${width}%`,
        bottom: '100%',
        marginBottom: gap,
        opacity: visible ? 1 : 0,
        borderRadius: 'var(--radius-card)',
      }}
    >
      <div className="font-display text-2xl text-gold">{title}</div>
      <div className="text-base text-muted">{description}</div>
    </div>
  )
}
