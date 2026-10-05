'use client'

import { useEffect, useRef } from 'react'
import type { Project } from '@/content/projects'
import { formatRange } from '@/lib/format'
import { CloseIcon } from './Icons'
import { ProjectLinks } from './ProjectLinks'
import { ProjectMedia } from './ProjectMedia'
import { StatusBadge } from './StatusBadge'

interface Props {
  project: Project | null
  onClose: () => void
}

export function ProjectDialog({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close()
      }}
    >
      {project && (
        <div className="relative">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close project details"
            className="absolute right-3 top-3 z-10 cursor-pointer rounded-sm bg-bg p-2 text-text hover:text-gold"
          >
            <CloseIcon />
          </button>
          {project.media && <ProjectMedia project={project} />}
          <div className="flex flex-col gap-4 p-[var(--phi-3)]">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              {project.dates && (
                <span className="font-mono text-xs text-muted">{formatRange(project.dates.start, project.dates.end)}</span>
              )}
            </div>
            <h3 id="project-dialog-title" className="text-title text-text">
              {project.title}
            </h3>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-gold">{project.role}</p>
            <p className="text-lead text-text">{project.description}</p>

            <ul className="list-disc space-y-1 pl-5 text-muted marker:text-gold">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            {project.stack.length > 0 && (
              <ul aria-label="Stack" className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <li key={t} className="rounded-sm border border-line px-2 py-1 font-mono text-xs text-text">
                    {t}
                  </li>
                ))}
              </ul>
            )}

            <ProjectLinks links={project.links} />
          </div>
        </div>
      )}
    </dialog>
  )
}
