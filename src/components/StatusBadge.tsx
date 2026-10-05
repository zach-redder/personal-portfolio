import type { ProjectStatus } from '@/content/projects'

const TONE: Record<ProjectStatus, string> = {
  Shipped: 'text-laurel border-laurel',
  'In Progress': 'text-gold border-gold',
  'Open Source': 'text-gold border-gold',
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`rounded-sm border px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] ${TONE[status]}`}>
      {status}
    </span>
  )
}
