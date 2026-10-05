export const site = {
  name: 'Zach Redder',
  url: 'https://zachredder.com',
  title: 'Zach Redder | Software Developer, Human-Centered AI',
  tagline: 'Software Developer | Human-Centered AI | Technology for Human Flourishing',
  description:
    'Zach Redder is a software developer building human-centered AI and software for human flourishing, drawing on a second major in Philosophy.',
  email: 'zredder3@gmail.com',
  github: 'https://github.com/zach-redder',
  linkedin: 'https://www.linkedin.com/in/zachredder',
  blog: 'https://www.thekeystoneapp.com/blog',
} as const

interface NavItem {
  label: string
  href: string
  external?: boolean
}

export const navItems: NavItem[] = [
  { label: 'Projects', href: '/#projects' },
  // { label: 'Philosophy', href: '/#philosophy' },
  // { label: 'Experience', href: '/#experience' },
  { label: 'Blog', href: site.blog, external: true },
]

export const profile = [
  { label: 'Discipline', value: 'Human-centered AI · Technology for human flourishing' },
  { label: 'Training', value: 'B.C.S. Computer Science · Second major in Philosophy' },
] as const
