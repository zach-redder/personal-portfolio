'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { navItems, site } from '@/content/site'
import { GithubIcon, MenuIcon, CloseIcon } from './Icons'
import { OPEN_PALETTE_EVENT } from './CommandPalette'

const linkClass =
  'rounded-sm px-3 py-2 text-sm text-muted transition-colors duration-[var(--dur-fast)] hover:text-text'

export function Nav() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const menuLinks = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a') ?? [])
      const nodes = buttonRef.current ? [buttonRef.current, ...menuLinks] : menuLinks
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg" style={{ height: 'var(--nav-h)' }}>
      <nav aria-label="Primary" className="wrap flex h-full items-center justify-between">
        <Link href="/" className="font-display text-xl text-text" onClick={close}>
          Zach Redder
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
              className="ml-2 cursor-pointer rounded-sm border border-line px-2 py-1 font-mono text-xs text-muted transition-colors hover:border-gold hover:text-gold"
              aria-label="Open command palette"
            >
              Ctrl K
            </button>
          </li>
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zach Redder on GitHub (opens in a new tab)"
              className="ml-1 inline-flex rounded-sm p-2 text-muted transition-colors hover:text-gold"
            >
              <GithubIcon />
            </a>
          </li>
        </ul>

        <button
          ref={buttonRef}
          type="button"
          className="inline-flex cursor-pointer rounded-sm p-2 text-text md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" ref={menuRef} className="absolute inset-x-0 top-full border-b border-line bg-bg md:hidden">
          <ul className="wrap flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="block py-3 text-lg text-text"
                  >
                    {item.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link href={item.href} onClick={close} className="block py-3 text-lg text-text">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zach Redder on GitHub (opens in a new tab)"
                className="flex items-center gap-2 py-3 text-lg text-text"
              >
                <GithubIcon /> GitHub
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
