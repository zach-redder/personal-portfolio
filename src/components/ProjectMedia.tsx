import type { Project } from '@/content/projects'

// Real media when provided; otherwise a designed placeholder so cards keep one rhythm.
export function ProjectMedia({ project }: { project: Project }) {
  const { media } = project
  const frame = 'aspect-[16/10] w-full border-b border-line bg-surface-2 object-cover'

  if (media?.kind === 'video') {
    return <video className={frame} src={media.src} aria-label={media.alt} preload="none" muted playsInline controls />
  }
  if (media?.kind === 'image') {
    // eslint-disable-next-line @next/next/no-img-element -- static export: images are pre-sized in public/
    return <img className={frame} src={media.src} alt={media.alt} loading="lazy" decoding="async" />
  }
  return (
    <div
      className="relative flex aspect-[16/6] w-full items-center justify-center overflow-hidden border-b border-line bg-surface-2"
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="h-3/4 text-line" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round">
        <rect x="12" y="10" width="40" height="7" />
        <rect x="19" y="17" width="26" height="30" />
        <rect x="12" y="47" width="40" height="7" />
        <path d="M26 22v20M32 22v20M38 22v20" />
      </svg>
      <span className="absolute bottom-2 right-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
        Media to come
      </span>
    </div>
  )
}
