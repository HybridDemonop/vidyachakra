'use client'

import { memo, type ReactNode } from 'react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { Counter, GlowCard } from '@/components/vc/primitives'
import { cn } from '@/lib/utils'

export function PageHeader({ eyebrow, pre, em, color, sub, action }: { eyebrow: string; pre: string; em: string; color: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="eyebrow text-cream/50">
          <span style={{ color }}>●</span> {eyebrow}
        </p>
        <h1 className="display mt-3 text-4xl font-bold md:text-6xl">
          {pre} <em className="font-semibold italic" style={{ color }}>{em}</em>
        </h1>
        {sub && <p className="mt-3 max-w-xl text-cream/60">{sub}</p>}
      </div>
      {action}
    </div>
  )
}

export function Panel({ title, eyebrow, children, color = '#F59E0B', className, action }: { title?: string; eyebrow?: string; children: ReactNode; color?: string; className?: string; action?: ReactNode }) {
  return (
    <GlowCard color={color} className={cn('p-5 md:p-6', className)}>
      {(title || eyebrow) && (
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            {eyebrow && <p className="eyebrow text-[10px] text-cream/40">{eyebrow}</p>}
            {title && <h2 className="mt-1 font-medium text-cream">{title}</h2>}
          </div>
          {action}
        </div>
      )}
      {children}
    </GlowCard>
  )
}

export const Sparkline = memo(function Sparkline({ data, color }: { data: { v: number }[]; color: string }) {
  const id = `sp-${color.slice(1)}`
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 2, bottom: 0, left: 0, right: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#${id})`} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
})

export function KpiCard({ label, value, prefix, suffix, decimals, delta, color, spark }: { label: string; value: number; prefix?: string; suffix?: string; decimals?: number; delta: string; color: string; spark: { v: number }[] }) {
  return (
    <GlowCard color={color} className="p-5">
      <p className="eyebrow text-[10px] text-cream/50">{label}</p>
      <p className="display mt-3 text-4xl font-bold">
        <Counter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </p>
      <div className="mt-3 flex flex-col gap-2">
        <span className="w-fit whitespace-nowrap rounded-full px-2 py-0.5 text-xs" style={{ background: `${color}1f`, color }}>
          {delta}
        </span>
        <div className="h-9 w-full">
          <Sparkline data={spark} color={color} />
        </div>
      </div>
    </GlowCard>
  )
}

export const tooltipStyle = {
  contentStyle: { background: '#171411', border: '1px solid rgb(255 255 255 / 0.1)', borderRadius: 10, fontSize: 12, color: '#F4EEDC' },
  labelStyle: { color: '#F4EEDC99' },
  cursor: { stroke: 'rgb(255 255 255 / 0.1)' },
}
export const axis = { stroke: 'rgb(244 238 220 / 0.35)', fontSize: 11, tickLine: false, axisLine: false }

export function Banner({ children, color = '#A78BFA' }: { children: ReactNode; color?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border px-5 py-4 text-sm" style={{ borderColor: `${color}40`, background: `${color}12`, color }}>
      <span className="size-2 shrink-0 animate-pulse rounded-full" style={{ background: color }} />
      <span className="font-display text-base italic text-cream">{children}</span>
    </div>
  )
}

export function Ring({ value, color, size = 160, label }: { value: number; color: string; size?: number; label?: string }) {
  const r = 42
  const c = 2 * Math.PI * r
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="-rotate-90 size-full" aria-hidden>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="7" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1)' }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="display text-4xl font-bold">
          <Counter value={value} />
        </p>
        {label && <p className="eyebrow text-[9px] text-cream/50">{label}</p>}
      </div>
    </div>
  )
}
