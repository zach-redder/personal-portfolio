import type { ProjectLink } from '@/content/projects'
import { ArrowUpRight } from './Icons'

const LABEL: Record<ProjectLink['type'], string> = {
  live: 'Live',
  appstore: 'App Store',
  github: 'GitHub',
}

export function ProjectLinks({ links }: { links: ProjectLink[] }) {
  if (links.length === 0) return null
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1">
      {links.map((l) => (
        <li key={l.type}>
          <a
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-gold underline-offset-4 hover:underline"
          >
            {LABEL[l.type]}
            <ArrowUpRight />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
