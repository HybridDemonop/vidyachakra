'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Building2, Briefcase, Factory, GraduationCap, Users } from 'lucide-react'
import { problems } from '@/lib/mock-data'
import { HeadlineMix, Reveal, SectionEyebrow } from '@/components/vc/primitives'

export function Problem() {
  return (
    <section id="problem" className="bg-cream py-28 text-ink md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionEyebrow n="01">The problem</SectionEyebrow>
        <HeadlineMix pre="The Education–Industry" em="alignment gap." color="var(--amber-deep)" className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)]" />
        <p className="mt-6 max-w-xl text-lg text-ink/70">Industry moves every quarter. Universities move every few years. Five slow systems, each working alone.</p>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
          {problems.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08} className="bg-cream p-6 transition-colors hover:bg-cream-2">
              <span className="eyebrow text-ink/40">0{i + 1}</span>
              <h3 className="display mt-10 text-2xl font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm text-ink/60">{p.s}</p>
              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-ink/10">
                <motion.div className="h-full bg-ink/40" initial={{ width: '0%' }} whileInView={{ width: `${18 + i * 7}%` }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3 }} />
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink/40">Cycle speed</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-amber px-8 py-7 text-ink md:flex-row md:items-center">
            <p className="display text-2xl font-bold md:text-4xl">
              Result: graduates trained for <em className="italic">yesterday&apos;s</em> jobs.
            </p>
            <span className="eyebrow">≈ 2–3 yr lag</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const holders = [
  { t: 'Industry', i: Factory, c: '#F59E0B' },
  { t: 'University', i: Building2, c: '#A78BFA' },
  { t: 'Faculty', i: Users, c: '#0F766E' },
  { t: 'Students', i: GraduationCap, c: '#FF7085' },
  { t: 'Employers', i: Briefcase, c: '#2DD4BF' },
]

export function Converge() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionEyebrow n="02">The insight</SectionEyebrow>
        <HeadlineMix pre="Universities have data. They lack a continuous" em="loop." className="mt-6 max-w-4xl text-[clamp(2.4rem,5.4vw,5rem)]" />
        <div className="mt-16 grid items-center gap-8 md:grid-cols-[1fr_1.4fr_1fr]">
          <ul className="flex flex-col gap-3">
            {holders.map((h, i) => (
              <motion.li
                key={h.t}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass flex items-center gap-3 rounded-xl px-4 py-3"
                style={{ marginLeft: `${[0, 24, 8, 32, 12][i]}px` }}
              >
                <h.i className="size-4" style={{ color: h.c }} aria-hidden />
                <span className="text-sm">{h.t}</span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-cream/40">siloed</span>
              </motion.li>
            ))}
          </ul>
          <svg viewBox="0 0 400 300" className="hidden h-72 w-full md:block" aria-hidden>
            {holders.map((h, i) => {
              const y = 30 + i * 60
              return (
                <motion.path
                  key={h.t}
                  d={`M 0 ${y} C 180 ${y}, 220 150, 400 150`}
                  fill="none"
                  stroke={h.c}
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  whileInView={{ pathLength: 1, opacity: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 0.4 + i * 0.12, ease: 'easeInOut' }}
                />
              )
            })}
          </svg>
          <Reveal delay={0.9}>
            <div className="relative mx-auto grid aspect-square w-56 place-items-center rounded-full border border-amber/40 bg-amber/5 shadow-[0_0_120px_-20px_var(--amber)]">
              <div className="absolute inset-4 animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-amber/40" />
              <div className="text-center">
                <p className="eyebrow text-amber">One system</p>
                <p className="display mt-2 text-3xl font-bold">Vidyachakra</p>
                <p className="mt-1 text-xs text-cream/60">The innovation isn&apos;t a new tool. It&apos;s the connection.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export const verbs = ['Detect', 'Develop', 'Adapt', 'Verify', 'Measure']

export function VerbStrip({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-3 ${className}`}>
      {verbs.map((v, i) => (
        <motion.span
          key={v}
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
        >
          <span className="display text-3xl font-bold md:text-5xl">{v}</span>
          {i < verbs.length - 1 && (
            <motion.span animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.2 }}>
              <ArrowRight className="size-6 opacity-60" aria-hidden />
            </motion.span>
          )}
        </motion.span>
      ))}
    </div>
  )
}

export function Verbs() {
  return (
    <section className="border-y border-white/10 bg-ink-2 py-16" aria-label="Five verbs">
      <VerbStrip className="text-cream [&_svg]:text-amber" />
    </section>
  )
}
