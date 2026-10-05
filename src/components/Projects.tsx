'use client'

import { useState } from 'react'
import type { Project } from '@/content/projects'
import { ProjectCard } from './ProjectCard'
import { ProjectDialog } from './ProjectDialog'

export function Projects({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <div>
      <ul className="grid gap-[var(--phi-3)] md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} onOpen={() => setSelected(project)} />
          </li>
        ))}
      </ul>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
