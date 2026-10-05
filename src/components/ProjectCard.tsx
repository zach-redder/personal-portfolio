import type { Project } from '@/content/projects'
import { formatRange } from '@/lib/format'
import { ProjectLinks } from './ProjectLinks'
import { ProjectMedia } from './ProjectMedia'
import { StatusBadge } from './StatusBadge'

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article
      className="group relative flex h-full flex-col border border-line bg-surface transition-[border-color,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1 hover:border-gold focus-within:border-gold"
      style={{ borderRadius: 'var(--radius-card)' }}
    >
      <ProjectMedia project={project} />

      <div className="flex flex-1 flex-col gap-3 p-[var(--phi-3)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <StatusBadge status={project.status} />
          {project.dates && (
            <span className="font-mono text-xs text-muted">{formatRange(project.dates.start, project.dates.end)}</span>
          )}
        </div>

        <h3 className="text-3xl text-text">
          {/* Stretched button: the whole card opens the dialog while inner links stay independently clickable. */}
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="cursor-pointer text-left after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </button>
        </h3>
        <p className="text-muted">{project.tagline}</p>

        {project.stack.length > 0 && (
          <ul aria-label="Stack" className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.stack.map((t) => (
              <li key={t} className="rounded-sm border border-line px-2 py-0.5 font-mono text-xs text-text">
                {t}
              </li>
            ))}
          </ul>
        )}

        <div className="relative z-10 min-h-6 translate-y-1 opacity-0 transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
          <ProjectLinks links={project.links} />
          {project.links.length === 0 && (
            <span className="text-xs text-muted">Details in the case file →</span>
          )}
        </div>
      </div>
    </article>
  )
}
