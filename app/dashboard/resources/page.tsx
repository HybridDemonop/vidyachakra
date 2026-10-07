'use client'

import { motion } from 'framer-motion'
import { ArrowRight, GitCompare, Rocket, Search, Send, Share2 } from 'lucide-react'
import { useState } from 'react'
import { flossMatches } from '@/lib/mock-data'
import { PageHeader, Panel } from '@/components/app/ui'
import { Counter } from '@/components/vc/primitives'

const R = '#B45309'
const RL = '#F59E0B'
const actions = [
  { l: 'Discover', i: Search },
  { l: 'Compare', i: GitCompare },
  { l: 'Request', i: Send },
  { l: 'Deploy', i: Rocket },
  { l: 'Share', i: Share2 },
]
const total = flossMatches.reduce((a, m) => a + m.cost, 0) / 100000

export default function ResourcesPage() {
  const [act, setAct] = useState('Discover')
  return (
    <>
      <PageHeader eyebrow="Resource & FLOSS Hub" pre="Same learning." em="Open tools." color={RL} sub="Audit commercial licenses, match open-source alternatives, and migrate labs without disruption." />

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Panel eyebrow="Process" title="Audit → Match → Migrate" color={R}>
          <ol className="grid grid-cols-3 gap-3">
            {['Audit', 'Match', 'Migrate'].map((s, i) => (
              <li key={s} className="rounded-xl border border-white/10 p-4" style={{ borderTop: `2px solid ${R}` }}>
                <p className="font-mono text-[10px] text-cream/40">0{i + 1}</p>
                <p className="display mt-2 text-2xl font-semibold">{s}</p>
                <p className="mt-1 text-xs text-cream/50">{['46 licensed tools scanned', '28 viable alternatives', '4 labs migrating'][i]}</p>
              </li>
            ))}
          </ol>
        </Panel>
        <div className="relative overflow-hidden rounded-xl bg-rust p-6">
          <div aria-hidden className="absolute -right-10 -top-10 size-48 rounded-full bg-amber/40 blur-3xl" />
          <p className="eyebrow relative text-cream/70">Estimated annual savings</p>
          <p className="display relative mt-3 text-6xl font-bold">
            <Counter value={total} prefix="₹" suffix="L" />
          </p>
          <p className="relative mt-2 text-sm text-cream/75">across 4 active migrations · ₹4.2Cr institution-wide</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Actions">
        {actions.map((a) => (
          <button key={a.l} aria-pressed={act === a.l} onClick={() => setAct(a.l)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${act === a.l ? 'bg-amber text-ink' : 'glass text-cream/70 hover:text-cream'}`}>
            <a.i className="size-4" aria-hidden /> {a.l}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {flossMatches.map((m, i) => (
          <Panel key={m.from} color={R} eyebrow="Smart match" title={`${m.parity}% feature parity`}>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                <p className="font-mono text-[10px] uppercase text-cream/40">Commercial</p>
                <p className="mt-1 font-medium">{m.from}</p>
                <p className="text-xs text-rose">₹{(m.cost / 100000).toFixed(1)}L / yr</p>
              </div>
              <motion.span animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.2 }}>
                <ArrowRight className="size-5 text-amber" aria-hidden />
              </motion.span>
              <div className="rounded-lg border border-amber/30 bg-amber/5 p-3">
                <p className="font-mono text-[10px] uppercase text-amber">Open source</p>
                <p className="mt-1 font-medium">{m.to}</p>
                <p className="text-xs text-teal-light">₹0 license</p>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex justify-between text-xs text-cream/50">
                <span>Migration progress</span>
                <span className="font-mono">{m.progress}%</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-rust to-amber" initial={{ width: 0 }} whileInView={{ width: `${m.progress}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.1 }} />
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </>
  )
}
