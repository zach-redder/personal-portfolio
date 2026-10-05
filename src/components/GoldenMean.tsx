'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'

const MEAN = 50
const SNAP_RANGE = 6
const MEAN_ZONE = 3
const SNAP_MS = 320
const START = 18

type Zone = 'certainty' | 'mean' | 'doubt'

const COPY: Record<Zone, { name: string; text: string }> = {
  certainty: {
    name: 'Certainty',
    text: 'All affirmation, no questions. You stop growing, and nothing new can get through.',
  },
  mean: {
    name: 'The mean',
    text: 'Affirm who you are. Question who you’re becoming. This is the balance Keystone is built around.',
  },
  doubt: {
    name: 'Doubt',
    text: 'All questions, no footing. Nothing holds, and it gets hard to act.',
  },
}

function zoneOf(v: number): Zone {
  if (Math.abs(v - MEAN) <= MEAN_ZONE) return 'mean'
  return v < MEAN ? 'certainty' : 'doubt'
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Arch geometry: a semicircle of voussoirs. The middle stone is the keystone.
const CX = 160
const CY = 150
const OUTER = 124
const INNER = 76
const STONES = 9
const KEY = 4
const SPAN = 180 / STONES
const BASE_GAP = 2.6
const KEY_LIFT = 12
// Fixed per-stone scatter so the arch falls apart the same way every time.
const DRIFT = [0.9, 0.4, 1, 0.6, 0, 0.8, 0.5, 1, 0.35]
const TWIST = [0.7, -0.5, 0.3, -0.8, 0, 0.6, -0.4, 0.9, -0.6]

const rad = (deg: number) => (deg * Math.PI) / 180
const pt = (r: number, deg: number) => `${(CX + r * Math.cos(rad(deg))).toFixed(2)} ${(CY - r * Math.sin(rad(deg))).toFixed(2)}`

function stonePath(i: number, gap: number, outer: number): string {
  const a0 = 180 - i * SPAN - gap / 2
  const a1 = 180 - (i + 1) * SPAN + gap / 2
  return `M${pt(outer, a0)}A${outer} ${outer} 0 0 1 ${pt(outer, a1)}L${pt(INNER, a1)}A${INNER} ${INNER} 0 0 0 ${pt(INNER, a0)}Z`
}

function Arch({ value }: { value: number }) {
  const zone = zoneOf(value)
  const t = zone === 'mean' ? 0 : (value - MEAN) / MEAN // -1 certainty … +1 doubt
  const rigid = Math.max(0, -t)
  const loose = Math.max(0, t)
  const gap = BASE_GAP * (1 - rigid) + 5 * loose
  const stroke =
    zone === 'mean' ? 'var(--color-gold)' : zone === 'certainty' ? 'var(--color-terracotta)' : 'var(--color-muted)'
  const keyFill = Math.max(0, 1 - Math.abs(t) * 8)

  return (
    <svg
      viewBox="0 0 320 190"
      role="img"
      aria-label={`An arch of stones in the ${COPY[zone].name.toLowerCase()} state`}
      className="h-full w-full"
    >
      <g fill="none" stroke={stroke} strokeWidth={1.5 + 1.5 * rigid} strokeLinejoin="round">
        <path d={`M${CX - OUTER - 14} ${CY + 28}H${CX + OUTER + 14}`} opacity={0.5} />
        <rect x={CX - OUTER} y={CY} width={OUTER - INNER} height={28} />
        <rect x={CX + INNER} y={CY} width={OUTER - INNER} height={28} />

        {Array.from({ length: STONES }, (_, i) => {
          const isKey = i === KEY
          const mid = 180 - (i + 0.5) * SPAN
          const outer = OUTER + (isKey ? KEY_LIFT * (1 - rigid) : 0)
          const d = isKey ? 0 : loose * 26 * DRIFT[i]
          const dx = Math.cos(rad(mid)) * d
          const dy = -Math.sin(rad(mid)) * d + (isKey ? loose * 54 : 0)
          const twist = loose * 16 * TWIST[i]
          const cr = (OUTER + INNER) / 2
          const ox = CX + cr * Math.cos(rad(mid))
          const oy = CY - cr * Math.sin(rad(mid))
          const fill = isKey ? 'var(--color-gold)' : zone === 'certainty' ? 'var(--color-terracotta)' : 'none'
          const fillOpacity = isKey ? keyFill : zone === 'certainty' ? 0.1 + 0.55 * rigid : 0
          return (
            <path
              key={i}
              d={stonePath(i, gap, outer)}
              fill={fill}
              fillOpacity={fillOpacity}
              opacity={1 - 0.5 * loose}
              transform={`translate(${dx.toFixed(2)} ${dy.toFixed(2)}) rotate(${twist.toFixed(2)} ${ox.toFixed(2)} ${oy.toFixed(2)})`}
            />
          )
        })}
      </g>
    </svg>
  )
}

export function GoldenMean() {
  const [value, setValue] = useState(START)
  const raf = useRef<number | null>(null)
  const captionId = useId()
  const zone = zoneOf(value)

  const stop = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current)
    raf.current = null
  }, [])

  const tweenTo = useCallback(
    (target: number) => {
      stop()
      if (prefersReducedMotion()) {
        setValue(target)
        return
      }
      const from = value
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / SNAP_MS)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(from + (target - from) * eased)
        raf.current = t < 1 ? requestAnimationFrame(step) : null
      }
      raf.current = requestAnimationFrame(step)
    },
    [stop, value],
  )

  useEffect(() => stop, [stop])

  const settle = () => {
    if (Math.abs(value - MEAN) < SNAP_RANGE && value !== MEAN) tweenTo(MEAN)
  }

  const accent = zone === 'mean' ? 'text-gold' : zone === 'certainty' ? 'text-terracotta' : 'text-text'

  return (
    <div className="border border-line bg-surface p-[var(--phi-3)]" style={{ borderRadius: 'var(--radius-card)' }}>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">The golden mean</p>
      <p className="mt-2 font-display text-2xl leading-tight text-text">Find the mean between certainty and doubt.</p>

      <div className="mx-auto my-[var(--phi-2)] aspect-[320/190] w-full max-w-[20rem]">
        <Arch value={value} />
      </div>

      <div className="relative">
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={value}
          onChange={(e) => {
            stop()
            setValue(Number(e.target.value))
          }}
          onPointerUp={settle}
          onKeyUp={settle}
          onBlur={settle}
          aria-label="From certainty to doubt"
          aria-valuetext={COPY[zone].name}
          aria-describedby={captionId}
          className="mean-range"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[calc(50%+0.9rem)] flex -translate-x-1/2 flex-col items-center font-mono text-[0.65rem] uppercase leading-tight tracking-[0.14em] text-gold"
        >
          <span>▲</span>
          <span>the mean</span>
        </span>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-terracotta">Certainty</p>
          <p className="mt-1 font-display text-lg leading-snug text-text">Affirm who you are.</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">Doubt</p>
          <p className="mt-1 font-display text-lg leading-snug text-text">Question who you’re becoming.</p>
        </div>
      </div>

      <p id={captionId} className="mt-[var(--phi-2)] min-h-[4.5rem] border-t border-line pt-[var(--phi-2)] text-sm text-muted">
        <strong className={accent}>{COPY[zone].name}.</strong> {COPY[zone].text}
      </p>
    </div>
  )
}
