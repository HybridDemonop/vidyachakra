'use client'

import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { useRef, useState } from 'react'
import { layerColor, layers, loopSteps } from '@/lib/mock-data'
import { HeadlineMix, Reveal, SectionEyebrow, TiltCard } from '@/components/vc/primitives'

export function LayerCard({ layer }: { layer: (typeof layers)[number] }) {
  const c = layerColor[layer.key]
  return (
    <TiltCard color={c} className="h-full">
      <div className="flex h-full flex-col p-7">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-cream/40">{layer.n}</span>
          <span className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest" style={{ borderColor: `${c}66`, color: c }}>
            {layer.tag}
          </span>
        </div>
        <span className="mt-8 block size-10 rounded-full" style={{ background: `radial-gradient(circle at 35% 35%, ${c}, transparent 70%)`, boxShadow: `0 0 30px -4px ${c}` }} aria-hidden />
        <h3 className="display mt-6 text-3xl font-semibold">{layer.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-cream/60">{layer.body}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
          {layer.points.map((p) => (
            <li key={p} className="rounded-md bg-white/5 px-2 py-1 text-xs text-cream/70">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </TiltCard>
  )
}

export function LayersGrid() {
  return (
    <section id="layers" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionEyebrow n="03">The Vidyachakra ecosystem</SectionEyebrow>
        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <HeadlineMix pre="Six layers." em="One wheel." className="text-[clamp(2.6rem,6vw,5.5rem)]" />
          <p className="max-w-sm text-cream/60">Value flows in every direction. Not just one way.</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {layers.map((l, i) => (
            <Reveal key={l.key} delay={i * 0.08} className="h-full">
              <LayerCard layer={l} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function LoopDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  const [looped, setLooped] = useState(false)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(6, Math.floor(v * 7.6)))
    setLooped(v > 0.94)
  })
  const angle = useTransform(scrollYProgress, [0, 0.92, 1], [0, Math.PI * 2 * (6 / 7), Math.PI * 2])
  const R = 42
  const px = useTransform(angle, (a) => `${50 + Math.sin(a) * R}%`)
  const py = useTransform(angle, (a) => `${50 - Math.cos(a) * R}%`)
  const rotY = useTransform(scrollYProgress, [0, 1], [-14, 14])
  const dash = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="loop" ref={ref} className="relative h-[320vh] bg-cream text-ink">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionEyebrow n="04">The continuous loop</SectionEyebrow>
            <HeadlineMix pre="A wheel that never stops" em="turning." color="var(--amber-deep)" className="mt-6 text-[clamp(2.4rem,5vw,4.8rem)]" />
            <div className="mt-8 min-h-28" aria-live="polite">
              <p className="eyebrow text-ink/50">Step 0{active + 1} / 07</p>
              <motion.p key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="display mt-2 text-3xl font-semibold">
                {loopSteps[active].t}
              </motion.p>
              <p className="mt-2 max-w-sm text-ink/60">{loopSteps[active].d}</p>
            </div>
            <motion.p animate={{ opacity: looped ? 1 : 0.25 }} className="mt-6 flex items-center gap-2 font-display text-lg italic text-amber-deep">
              <RotateCcw className="size-4" aria-hidden /> The system loops back into itself — every semester.
            </motion.p>
          </div>

          <div style={{ perspective: 1200 }} className="mx-auto w-full max-w-[560px]">
            <motion.div style={{ rotateX: 22, rotateY: rotY, transformStyle: 'preserve-3d' }} className="relative aspect-square">
              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
                <circle cx="50" cy="50" r={R} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.4" />
                <motion.circle cx="50" cy="50" r={R} fill="none" stroke="var(--amber)" strokeWidth="0.8" strokeLinecap="round" style={{ pathLength: dash }} transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="1 1.5" strokeWidth="0.3" />
              </svg>
              <div className="absolute left-1/2 top-1/2 grid size-[28%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-center text-cream shadow-2xl">
                <div>
                  <p className="eyebrow text-[9px] text-amber">Every semester</p>
                  <p className="display text-xl font-bold md:text-2xl">Loop</p>
                </div>
              </div>
              {loopSteps.map((s, i) => {
                const a = (i / 7) * Math.PI * 2
                const on = i <= active
                const cur = i === active
                return (
                  <div
                    key={s.t}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${50 + Math.sin(a) * R}%`, top: `${50 - Math.cos(a) * R}%` }}
                  >
                    <div
                      className={`flex flex-col items-center gap-1.5 transition-all duration-500 ${cur ? 'scale-110' : ''}`}
                    >
                      <span
                        className={`grid size-9 place-items-center rounded-full border font-mono text-xs transition-all duration-500 md:size-11 ${on ? 'border-amber bg-amber text-ink shadow-[0_0_30px_var(--amber)]' : 'border-ink/20 bg-cream text-ink/50'}`}
                      >
                        0{i + 1}
                      </span>
                      <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium md:text-xs ${on ? 'bg-ink text-cream' : 'text-ink/50'}`}>{s.t}</span>
                    </div>
                  </div>
                )
              })}
              <motion.span
                aria-hidden
                className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber shadow-[0_0_24px_6px_var(--amber)]"
                style={{ left: px, top: py }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
