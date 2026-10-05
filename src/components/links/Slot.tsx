'use client'

import { useState } from 'react'
import type { HotbarLink } from '@/content/links'

export interface SlotCell {
  cellLeft: number
  cellTop: number
  cellWidth: number
  cellHeight: number
  iconLeft: number
  iconTop: number
  iconWidth: number
  iconHeight: number
}

interface Props {
  index: number
  link: HotbarLink
  cell: SlotCell
  onActivate: () => void
  onDeactivate: () => void
}

// A real <a>, so open-in-new-tab works natively. Hover and keyboard focus both drive the highlight and tooltip.
export function Slot({ index, link, cell, onActivate, onDeactivate }: Props) {
  const [iconFailed, setIconFailed] = useState(false)

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${link.title} (opens in a new tab)`}
      className="absolute z-20 block focus-visible:outline-offset-0"
      style={{
        left: `${cell.cellLeft}%`,
        top: `${cell.cellTop}%`,
        width: `${cell.cellWidth}%`,
        height: `${cell.cellHeight}%`,
      }}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
    >
      {iconFailed ? (
        // containerType makes this box a query container so `cqh` sizes the number to the box's own height.
        <div
          className="absolute rounded-sm bg-surface-2"
          style={{
            left: `${cell.iconLeft}%`,
            top: `${cell.iconTop}%`,
            width: `${cell.iconWidth}%`,
            height: `${cell.iconHeight}%`,
            containerType: 'size',
          }}
        >
          <div
            className="flex h-full w-full select-none items-center justify-center font-bold text-text"
            style={{ fontSize: '40cqh' }}
          >
            {index + 1}
          </div>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- static export: pixel art is used as-is
        <img
          src={link.icon}
          onError={() => setIconFailed(true)}
          alt=""
          draggable={false}
          className="pointer-events-none absolute select-none object-contain"
          style={{
            left: `${cell.iconLeft}%`,
            top: `${cell.iconTop}%`,
            width: `${cell.iconWidth}%`,
            height: `${cell.iconHeight}%`,
          }}
        />
      )}
    </a>
  )
}
