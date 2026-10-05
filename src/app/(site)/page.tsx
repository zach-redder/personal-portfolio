import { Contact } from '@/components/Contact'
// import { Experience } from '@/components/Experience'
import { Hero } from '@/components/Hero'
// import { Philosophy } from '@/components/Philosophy'
import { Projects } from '@/components/Projects'
import { SectionHeading } from '@/components/SectionHeading'
import { projects } from '@/content/projects'

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="projects" aria-labelledby="projects-title" className="wrap pt-[var(--phi-5)]">
        <SectionHeading numeral="I" id="projects-title">
          Projects
        </SectionHeading>
        <Projects projects={projects} />
      </section>
      {/* Hidden for now. Restore with the imports above, then re-add the nav items in content/site.ts.
      <Philosophy />
      <Experience />
      */}
      <Contact />
    </>
  )
}
