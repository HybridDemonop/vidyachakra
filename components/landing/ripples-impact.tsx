'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Minus, RotateCcw, Waves } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ripples, stakeholders } from '@/lib/mock-data'
import { Glows, HeadlineMix, Logo, MagneticButton, Reveal, SectionEyebrow } from '@/components/vc/primitives'
import { VerbStrip } from './problem'

export function Ripples() {
  const [step, setStep] = useState(-1)
  const [run, setRun] = useState(0)
  useEffect(() => {
    if (run === 0) return
    setStep(-1)
    let i = -1
    const id = setInterval(() => {
      i++
      setStep(i)
      if (i >= ripples.length) clearInterval(id)
    }, 480)
    return () => clearInterval(id)
  }, [run])
  const done = step >= ripples.length

  return (
    <section id="ripples" className="relative overflow-hidden py-28 md:py-36">
      <Glows />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow n="05">One signal, nine ripples</SectionEyebrow>
            <HeadlineMix pre="Change one thing." em="Everything moves." className="mt-6 text-[clamp(2.4rem,5.4vw,5rem)]" />
          </div>
          <MagneticButton onClick={() => setRun((r) => r + 1)}>
            {run ? <RotateCcw className="size-4" /> : <Waves className="size-4" />} {run ? 'Replay' : 'Watch one signal ripple'}
          </MagneticButton>
        </div>

        <div className="relative mt-14">
          <AnimatePresence>
            {run > 0 &&
              [0, 1, 2, 3].map((r) => (
                <motion.span
                  key={`${run}-${r}`}
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber"
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 9, opacity: 0 }}
                  transition={{ duration: 3.2, delay: r * 0.6, ease: 'easeOut' }}
                />
              ))}
          </AnimatePresence>
          <ol className="relative grid gap-3 sm:grid-cols-3">
            {ripples.map((r, i) => {
              const on = i <= step
              return (
                <li
                  key={r.t}
                  className="glass relative overflow-hidden rounded-xl p-5 transition-all duration-500"
                  style={on ? { borderColor: `${r.c}88`, boxShadow: `0 0 40px -10px ${r.c}` } : undefined}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-cream/40">0{i + 1}</span>
                    <span className="size-2 rounded-full transition-all duration-500" style={{ background: on ? r.c : 'rgb(255 255 255 / 0.15)', boxShadow: on ? `0 0 12px ${r.c}` : 'none' }} />
                  </div>
                  <p className={`mt-6 font-medium transition-colors ${on ? 'text-cream' : 'text-cream/40'}`}>{r.t}</p>
                  <p className="mt-1 font-mono text-xs" style={{ color: on ? r.c : 'rgb(244 238 220 / 0.25)' }}>
                    {r.s}
                  </p>
                </li>
              )
            })}
          </ol>
          <motion.p animate={{ opacity: done ? 1 : 0, y: done ? 0 : 10 }} className="display mt-10 text-center text-3xl font-bold md:text-5xl">
            One ecosystem. <em className="italic text-amber">Nine ripples.</em>
          </motion.p>
        </div>
      </div>
    </section>
  )
}

const tools = ['LMS', 'Faculty training', 'ERP', 'Placement system', 'Certification platforms']

export function Comparison() {
  return (
    <section className="bg-cream py-28 text-ink md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionEyebrow n="06">Positioning</SectionEyebrow>
        <HeadlineMix pre="Not another LMS. Or placement" em="portal." color="var(--amber-deep)" className="mt-6 max-w-4xl text-[clamp(2.4rem,5.4vw,5rem)]" />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-ink/10 p-8">
              <p className="eyebrow text-ink/50">Existing tools · isolated</p>
              <ul className="mt-6 divide-y divide-ink/10">
                {tools.map((t) => (
                  <li key={t} className="flex items-center justify-between py-4">
                    <span className="text-lg">{t}</span>
                    <span className="flex items-center gap-2 font-mono text-xs text-ink/40">
                      <Minus className="size-3.5" aria-hidden /> works alone
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative h-full overflow-hidden rounded-2xl bg-ink p-8 text-cream">
              <div aria-hidden className="absolute -right-20 -top-20 size-72 rounded-full bg-amber/25 blur-3xl" />
              <p className="eyebrow relative text-amber">Vidyachakra · connected</p>
              <ul className="relative mt-6 divide-y divide-white/10">
                {tools.map((t) => (
                  <li key={t} className="flex items-center justify-between py-4">
                    <span className="text-lg">{t}</span>
                    <span className="flex items-center gap-2 font-mono text-xs text-amber">
                      <Check className="size-3.5" aria-hidden /> in the loop
                    </span>
                  </li>
                ))}
              </ul>
              <p className="display relative mt-6 text-2xl italic">Not the core product. The supporting brain.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Impact() {
  return (
    <section id="impact" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionEyebrow n="07">Impact across stakeholders</SectionEyebrow>
        <HeadlineMix pre="Everyone gains when the" em="wheel turns." className="mt-6 max-w-4xl text-[clamp(2.4rem,5.4vw,5rem)]" />
        <div className="mt-14 grid auto-rows-[minmax(200px,auto)] gap-4 md:grid-cols-6">
          {stakeholders.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.06} className={['md:col-span-3 md:row-span-2', 'md:col-span-3', 'md:col-span-3', 'md:col-span-3', 'md:col-span-3'][i]}>
              <div className="glass group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-7">
                <div aria-hidden className="absolute -bottom-24 -right-24 size-64 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60" style={{ background: s.c }} />
                <div className="relative">
                  <p className="eyebrow" style={{ color: s.c }}>
                    {s.t}
                  </p>
                  <p className={`mt-4 max-w-md text-cream/75 ${i === 0 ? 'text-xl' : ''}`}>{s.b}</p>
                </div>
                <div className="relative mt-8">
                  <p className={`display font-bold ${i === 0 ? 'text-8xl' : 'text-5xl'}`}>{s.stat}</p>
                  <p className="text-sm text-cream/50">{s.sl}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Closing() {
  return (
    <section className="relative overflow-hidden bg-cream py-32 text-ink">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <SectionEyebrow className="justify-center">The shift</SectionEyebrow>
        <p className="display mx-auto mt-8 max-w-5xl text-[clamp(2.2rem,5vw,4.6rem)] font-bold text-balance">
          <span className="text-ink/40">From a static education system</span> → to a continuously <em className="italic text-amber-deep">adapting</em> education ecosystem.
        </p>
        <p className="display mt-12 text-5xl italic md:text-7xl">Learn. Adapt. Evolve.</p>
        <div className="mt-14 rounded-2xl bg-amber px-6 py-8 text-ink">
          <VerbStrip />
        </div>
        <div className="mt-12">
          <MagneticButton href="/login" className="bg-ink text-cream shadow-none hover:bg-ink-2">
            Enter the demo
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-cream/50">Education-first. AI-supported.</p>
        </div>
        <p className="eyebrow text-cream/50">Built by Team · Sleep Deprived Coders · 2026</p>
      </div>
    </footer>
  )
}
