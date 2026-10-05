'use client'

import { useEffect, useState } from 'react'
import { links } from '@/content/links'
import { Slot, type SlotCell } from './Slot'
import { Tooltip } from './Tooltip'

// Geometry measured from public/images/hotbar-base.png (1035x241). All values are % of the hotbar's own box,
// so they hold at any render size. Re-derive them if hotbar-base.png ever changes.
const NATIVE_ASPECT = 1035 / 241

// cell*: the slot's outer frame (hit-box and highlight size). icon*: icon box as % *within the cell*.
const SLOT_LAYOUT: SlotCell[] = [
  { cellLeft: 4.203, cellTop: 29.253, cellWidth: 10.048, cellHeight: 43.154, iconLeft: 15.865, iconTop: 15.865, iconWidth: 69.231, iconHeight: 69.231 },
  { cellLeft: 14.348, cellTop: 29.253, cellWidth: 10.145, cellHeight: 43.154, iconLeft: 15.714, iconTop: 15.865, iconWidth: 69.524, iconHeight: 69.231 },
  { cellLeft: 24.493, cellTop: 29.253, cellWidth: 10.145, cellHeight: 43.154, iconLeft: 15.714, iconTop: 15.865, iconWidth: 69.524, iconHeight: 69.231 },
  { cellLeft: 34.734, cellTop: 29.253, cellWidth: 10.048, cellHeight: 43.154, iconLeft: 15.865, iconTop: 15.865, iconWidth: 69.231, iconHeight: 69.231 },
  { cellLeft: 44.879, cellTop: 29.253, cellWidth: 10.531, cellHeight: 43.154, iconLeft: 15.138, iconTop: 15.865, iconWidth: 70.642, iconHeight: 69.231 },
  { cellLeft: 55.507, cellTop: 29.253, cellWidth: 10.048, cellHeight: 43.154, iconLeft: 15.865, iconTop: 15.865, iconWidth: 69.231, iconHeight: 69.231 },
  { cellLeft: 65.652, cellTop: 29.253, cellWidth: 10.145, cellHeight: 43.154, iconLeft: 15.714, iconTop: 15.865, iconWidth: 69.524, iconHeight: 69.231 },
  { cellLeft: 75.894, cellTop: 29.253, cellWidth: 10.048, cellHeight: 43.154, iconLeft: 15.865, iconTop: 15.865, iconWidth: 69.231, iconHeight: 69.231 },
  { cellLeft: 86.039, cellTop: 29.253, cellWidth: 10.048, cellHeight: 43.154, iconLeft: 15.865, iconTop: 15.865, iconWidth: 69.231, iconHeight: 69.231 },
]

// Width follows the viewport on both axes while aspect-ratio locks the height to the image's native ratio.
const VIEWPORT_FIT = 0.92
const MAX_WIDTH_PX = 2200
const HOTBAR_WIDTH_CSS = `min(${VIEWPORT_FIT * 100}vw, calc(${VIEWPORT_FIT * 100}vh * ${NATIVE_ASPECT}), ${MAX_WIDTH_PX}px)`

const TOOLTIP_WIDTH_PCT = 42
const TOOLTIP_GAP_PX = -24

// hotbar-highlight.png's drawn frame is inset in its 350x350 canvas; these are the measured content bounds (%).
const HIGHLIGHT_CONTENT = { left: 17.429, top: 17.143, width: 67.143, height: 64.286 }
// >1 lets the highlight spill slightly past the slot border, like a glow.
const HIGHLIGHT_SCALE = 1.12
const HIGHLIGHT_TRANSITION =
  'left var(--dur-fast) var(--ease-out), top var(--dur-fast) var(--ease-out), width var(--dur-fast) var(--ease-out), height var(--dur-fast) var(--ease-out), opacity var(--dur-fast) var(--ease-out)'

function scaleCell(cell: SlotCell) {
  const cellWidth = cell.cellWidth * HIGHLIGHT_SCALE
  const cellHeight = cell.cellHeight * HIGHLIGHT_SCALE
  return {
    cellLeft: cell.cellLeft - (cellWidth - cell.cellWidth) / 2,
    cellTop: cell.cellTop - (cellHeight - cell.cellHeight) / 2,
    cellWidth,
    cellHeight,
  }
}

function highlightRect(scaled: ReturnType<typeof scaleCell>) {
  const width = (scaled.cellWidth * 100) / HIGHLIGHT_CONTENT.width
  const height = (scaled.cellHeight * 100) / HIGHLIGHT_CONTENT.height
  return {
    left: scaled.cellLeft - width * (HIGHLIGHT_CONTENT.left / 100),
    top: scaled.cellTop - height * (HIGHLIGHT_CONTENT.top / 100),
    width,
    height,
  }
}

export function Hotbar() {
  const [baseFailed, setBaseFailed] = useState(false)
  const [highlightFailed, setHighlightFailed] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  // Last slot the highlight sat on. Never reset on leave, so the next hover glides in instead of snapping.
  const [highlightIndex, setHighlightIndex] = useState(0)

  useEffect(() => {
    if (activeIndex !== null) setHighlightIndex(activeIndex)
  }, [activeIndex])

  const visible = activeIndex !== null
  const scaled = scaleCell(SLOT_LAYOUT[highlightIndex])
  const rect = highlightRect(scaled)
  const current = links[highlightIndex]

  return (
    <div className="relative" style={{ width: HOTBAR_WIDTH_CSS, aspectRatio: NATIVE_ASPECT }}>
      {baseFailed ? (
        <div className="absolute inset-0 z-0 rounded-sm border-2 border-line bg-surface-2" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- static export: pixel art is used as-is
        <img
          src="/images/hotbar-base.png"
          onError={() => setBaseFailed(true)}
          draggable={false}
          alt=""
          className="absolute inset-0 z-0 h-full w-full select-none"
        />
      )}

      {highlightFailed ? (
        <div
          className="pointer-events-none absolute z-30 rounded-sm bg-gold/40"
          style={{
            left: `${scaled.cellLeft}%`,
            top: `${scaled.cellTop}%`,
            width: `${scaled.cellWidth}%`,
            height: `${scaled.cellHeight}%`,
            transition: HIGHLIGHT_TRANSITION,
            opacity: visible ? 1 : 0,
          }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- static export: pixel art is used as-is
        <img
          src="/images/hotbar-highlight.png"
          onError={() => setHighlightFailed(true)}
          draggable={false}
          alt=""
          className="pointer-events-none absolute z-30 select-none"
          style={{
            left: `${rect.left}%`,
            top: `${rect.top}%`,
            width: `${rect.width}%`,
            height: `${rect.height}%`,
            transition: HIGHLIGHT_TRANSITION,
            opacity: visible ? 1 : 0,
          }}
        />
      )}

      {links.map((link, i) => (
        <Slot
          key={link.id}
          index={i}
          link={link}
          cell={SLOT_LAYOUT[i]}
          onActivate={() => setActiveIndex(i)}
          onDeactivate={() => setActiveIndex(null)}
        />
      ))}

      <Tooltip
        visible={visible}
        left={50 - TOOLTIP_WIDTH_PCT / 2}
        width={TOOLTIP_WIDTH_PCT}
        gap={TOOLTIP_GAP_PX}
        title={current.title}
        description={current.description}
      />
    </div>
  )
}
