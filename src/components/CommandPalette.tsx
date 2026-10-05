'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { site } from '@/content/site'

export const OPEN_PALETTE_EVENT = 'open-command-palette'

type Router = ReturnType<typeof useRouter>

interface Command {
  label: string
  hint: string
  run: (router: Router) => void
}

const external = (url: string) => () => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const COMMANDS: Command[] = [
  { label: 'Projects', hint: 'Section I', run: (r) => r.push('/#projects') },
  // { label: 'Philosophy', hint: 'Section II', run: (r) => r.push('/#philosophy') },
  // { label: 'Experience', hint: 'Section III', run: (r) => r.push('/#experience') },
  { label: 'Contact', hint: 'Section II', run: (r) => r.push('/#contact') },
  { label: 'Links', hint: '/links', run: (r) => r.push('/links/') },
  { label: 'Blog', hint: 'External', run: external(site.blog) },
  { label: 'GitHub', hint: 'External', run: external(site.github) },
  { label: 'LinkedIn', hint: 'External', run: external(site.linkedin) },
  {
    label: 'Email',
    hint: site.email,
    run: () => {
      window.location.href = `mailto:${site.email}`
    },
  },
]

export function CommandPalette() {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const results = COMMANDS.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()))

  const close = useCallback(() => dialogRef.current?.close(), [])

  const open = useCallback(() => {
    setQuery('')
    setActive(0)
    if (!dialogRef.current?.open) dialogRef.current?.showModal()
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (dialogRef.current?.open) close()
        else open()
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_PALETTE_EVENT, open)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_PALETTE_EVENT, open)
    }
  }, [open, close])

  const choose = (command: Command | undefined) => {
    if (!command) return
    close()
    command.run(router)
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      choose(results[active])
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command palette"
      className="project-dialog"
      style={{ width: 'min(100% - 1.5rem, 30rem)', marginTop: '12vh' }}
      onClick={(e) => {
        if (e.target === dialogRef.current) close()
      }}
    >
      <div className="p-[var(--phi-2)]">
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
          aria-label="Search pages and links"
          placeholder="Go to…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
          }}
          onKeyDown={onInputKey}
          className="w-full rounded-sm border border-line bg-bg px-3 py-2.5 text-base text-text placeholder:text-muted focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
        />
        <ul id={listId} role="listbox" aria-label="Results" className="mt-3">
          {results.map((c, i) => (
            <li
              key={c.label}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(c)}
              className={`flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 ${
                i === active ? 'bg-surface-2 text-gold' : 'text-text'
              }`}
            >
              <span>{c.label}</span>
              <span className="font-mono text-xs text-muted">{c.hint}</span>
            </li>
          ))}
          {results.length === 0 && (
            <li role="option" aria-selected="false" className="px-3 py-2 text-muted">
              No match. Perhaps ask a different question.
            </li>
          )}
        </ul>
        <p className="mt-3 px-3 font-mono text-xs text-muted">↑↓ to move · Enter to go · Esc to close</p>
      </div>
    </dialog>
  )
}
