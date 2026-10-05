export interface Role {
  org: string
  title: string
  start: string // 'YYYY-MM'
  end?: string // no end = present
  summary?: string // TODO: add a one-line summary for each role
}

export const experience: Role[] = [
  { org: 'LimnoTech', title: 'Environmental Software Developer', start: '2026-06' },
  { org: 'LimnoTech', title: 'AI/ML Intern', start: '2025-05', end: '2026-05' },
]
