'use client'

import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <span className="relative grid size-7 place-items-center rounded-full border border-cream/30">
        <span className="size-3.5 rounded-full bg-amber shadow-[0_0_14px_var(--amber)]" />
      </span>
      <span className="display text-lg font-semibold tracking-tight">Vidyachakra</span>
    </span>
  )
}

export function SectionEyebrow({ n, children, className }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn('eyebrow flex items-center gap-3 opacity-60', className)}>
      {n && <span>{n}</span>}
      {n && <span aria-hidden className="h-px w-6 bg-current" />}
      <span>{children}</span>
    </p>
  )
}

export function HeadlineMix({
  pre,
  em,
  post,
  color = 'var(--amber)',
  as: Tag = 'h2',
  className,
}: {
  pre: string
  em: string
  post?: string
  color?: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}) {
  const words = pre.split(' ').filter(Boolean)
  const reduce = useReducedMotion()
  const ref = useRef<HTMLHeadingElement>(null)
  // Observe the heading itself: the translated words sit outside their clip box, so IO never sees them.
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const item = (i: number) => ({
    initial: reduce ? false : { y: '110%' },
    animate: inView || reduce ? { y: '0%' } : { y: '110%' },
    transition: { duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  })
  return (
    <Tag ref={ref} className={cn('display font-bold text-balance', className)}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span className="inline-block" {...item(i)}>
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
      <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
        <motion.em className="inline-block pr-[0.1em] font-semibold italic" style={{ color }} {...item(words.length)}>
          {em}
        </motion.em>
      </span>
      {post && <span> {post}</span>}
    </Tag>
  )
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function GlowCard({
  children,
  color = '#F59E0B',
  className,
  accent = 'top',
}: {
  children: ReactNode
  color?: string
  className?: string
  accent?: 'top' | 'left' | 'none'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      style={{ '--c': color } as React.CSSProperties}
      className={cn(
        'group/glow relative overflow-hidden rounded-xl glass transition-[border-color,box-shadow] duration-500 hover:border-[color:var(--c)]/50 hover:shadow-[0_0_40px_-12px_var(--c)]',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/glow:opacity-100"
        style={{ background: 'radial-gradient(380px circle at var(--mx) var(--my), color-mix(in oklab, var(--c) 14%, transparent), transparent 60%)' }}
      />
      {accent === 'top' && <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />}
      {accent === 'left' && <div aria-hidden className="absolute inset-y-0 left-0 w-0.5" style={{ background: color }} />}
      <div className="relative">{children}</div>
    </div>
  )
}

export function TiltCard({ children, className, color = '#F59E0B' }: { children: ReactNode; className?: string; color?: string }) {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })
  const rotateX = useTransform(sy, [0, 1], [8, -8])
  const rotateY = useTransform(sx, [0, 1], [-8, 8])
  const hl = useTransform([sx, sy], ([a, b]) => `radial-gradient(500px circle at ${(a as number) * 100}% ${(b as number) * 100}%, rgb(255 255 255 / 0.09), transparent 45%)`)
  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          x.set((e.clientX - r.left) / r.width)
          y.set((e.clientY - r.top) / r.height)
        }}
        onMouseLeave={() => {
          x.set(0.5)
          y.set(0.5)
        }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', '--c': color } as never}
        className="relative h-full overflow-hidden rounded-2xl glass transition-[border-color] duration-500 hover:border-[color:var(--c)]/50"
      >
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: hl }} />
        <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: color }} aria-hidden />
        <div style={{ transform: 'translateZ(30px)' }} className="relative h-full">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export function Counter({ value, decimals = 0, prefix = '', suffix = '', className }: { value: number; decimals?: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: setV })
    return () => c.stop()
  }, [inView, value])
  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {v.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export function MagneticButton({ href, children, variant = 'amber', className, onClick }: { href?: string; children: ReactNode; variant?: 'amber' | 'ghost'; className?: string; onClick?: () => void }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 15 })
  const sy = useSpring(y, { stiffness: 250, damping: 15 })
  const cls = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors',
    variant === 'amber' ? 'bg-amber text-ink hover:bg-[#fbb13c] shadow-[0_0_30px_-8px_var(--amber)]' : 'border border-cream/20 text-cream hover:border-cream/50 hover:bg-white/5',
    className,
  )
  const inner = href ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  )
  return (
    <motion.span
      className="inline-block"
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.25)
        y.set((e.clientY - r.top - r.height / 2) * 0.35)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {inner}
    </motion.span>
  )
}

export function Glows() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-40 -top-40 size-[640px] rounded-full bg-amber/20 blur-[140px]" />
      <div className="absolute -bottom-60 -left-40 size-[600px] rounded-full bg-violet/30 blur-[140px]" />
    </div>
  )
}
