'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Eye, Sparkles, TrendingDown, X } from 'lucide-react'
import { useState } from 'react'
import { heatDepts, heatmap, heatSkills, kpis, layerColor, loopHealth, recommendations } from '@/lib/mock-data'
import { Banner, KpiCard, PageHeader, Panel, Ring } from '@/components/app/ui'
import { useAI } from '@/components/app/shell'

export default function LeadershipPage() {
  const { openAI } = useAI()
  return (
    <>
      <PageHeader
        eyebrow="University Command Center · Sem 1, 2026"
        pre="The loop, at a"
        em="glance."
        color="var(--amber)"
        sub="Every signal, gap and outcome across your institution — in one continuously updating view."
        action={
          <button onClick={() => openAI('Identify skill gaps')} className="inline-flex items-center gap-2 rounded-full border border-lavender/40 px-4 py-2 text-sm text-lavender transition hover:bg-lavender/10">
            <Sparkles className="size-4" aria-hidden /> Ask AI for this week&apos;s gaps
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel eyebrow="Loop health" title="How tight is the wheel?" color="#F59E0B">
          <div className="flex flex-col items-center gap-6 sm:flex-row lg:flex-col xl:flex-row">
            <Ring value={loopHealth.score} color="#F59E0B" label="Health" size={150} />
            <div className="flex-1">
              <p className="eyebrow text-[10px] text-cream/50">Loop tightness</p>
              <p className="display mt-2 text-5xl font-bold">
                {loopHealth.days}
                <span className="text-xl text-cream/50"> days</span>
              </p>
              <p className="mt-1 text-sm text-cream/60">avg. from gap detection → action</p>
              <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-teal/20 px-2 py-0.5 text-xs text-teal-light">
                <TrendingDown className="size-3" aria-hidden /> from {loopHealth.prevDays} days last year
              </p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-7 gap-1" aria-label="Loop step status">
            {['Signal', 'Map', 'Gap', 'Act', 'Build', 'Track', 'Loop'].map((s, i) => (
              <div key={s} className="text-center">
                <div className="h-1.5 rounded-full" style={{ background: i < 6 ? 'var(--amber)' : 'rgb(245 158 11 / 0.3)', opacity: 0.4 + i * 0.1 }} />
                <p className="mt-1.5 font-mono text-[9px] uppercase text-cream/40">{s}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Heatmap />
      </div>

      <div className="mt-4">
        <RecList />
      </div>
    </>
  )
}

function Heatmap() {
  const [hover, setHover] = useState<{ d: number; s: number } | null>(null)
  return (
    <Panel eyebrow="Coverage heatmap" title="Skill coverage by department" color="#A78BFA" className="lg:col-span-2">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-separate border-spacing-1 text-xs">
          <thead>
            <tr>
              <th className="sr-only">Department</th>
              {heatSkills.map((s) => (
                <th key={s} scope="col" className="pb-1 text-left font-mono text-[10px] font-normal uppercase tracking-wider text-cream/40">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {heatDepts.map((d, di) => (
              <tr key={d}>
                <th scope="row" className="pr-2 text-left font-medium text-cream/70">
                  {d}
                </th>
                {heatmap[di].map((v, si) => {
                  const on = hover?.d === di && hover?.s === si
                  return (
                    <td key={si} className="relative p-0">
                      <button
                        onMouseEnter={() => setHover({ d: di, s: si })}
                        onMouseLeave={() => setHover(null)}
                        onFocus={() => setHover({ d: di, s: si })}
                        onBlur={() => setHover(null)}
                        aria-label={`${d} ${heatSkills[si]}: ${v}% coverage`}
                        className="h-9 w-full rounded-md transition-transform hover:scale-110"
                        style={{
                          background: v < 30 ? `rgba(255,112,133,${0.25 + (30 - v) / 60})` : `rgba(167,139,250,${v / 110})`,
                          outline: on ? '1px solid #F4EEDC' : 'none',
                        }}
                      />
                      {on && (
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-40 -translate-x-1/2 rounded-lg border border-white/10 bg-ink-2 p-2.5 shadow-xl">
                          <p className="font-medium text-cream">
                            {d} · {heatSkills[si]}
                          </p>
                          <p className="mt-0.5 text-cream/60">{v}% outcome coverage</p>
                          {v < 30 && <p className="mt-1 text-rose">Gap flagged</p>}
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-cream/50">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-rose" /> Gap ({'<'}30%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-lavender" /> Strong coverage
        </span>
      </div>
    </Panel>
  )
}

function RecList() {
  const [state, setState] = useState<Record<string, 'approved' | 'rejected' | 'review'>>({})
  const pending = recommendations.filter((r) => !state[r.id] || state[r.id] === 'review')
  return (
    <Panel eyebrow={`${pending.length} pending`} title="Pending AI recommendations" color="#A78BFA">
      <Banner>AI recommends. Faculty + departments decide.</Banner>
      <ul className="mt-4 divide-y divide-white/5">
        <AnimatePresence initial={false}>
          {recommendations.map((r) => {
            const s = state[r.id]
            const c = layerColor[r.layer]
            return (
              <motion.li key={r.id} layout initial={{ opacity: 0 }} animate={{ opacity: s && s !== 'review' ? 0.45 : 1 }} className="flex flex-col gap-4 py-4 md:flex-row md:items-center">
                <span className="hidden h-10 w-0.5 rounded-full md:block" style={{ background: c }} aria-hidden />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="eyebrow text-[9px]" style={{ color: c }}>
                      {r.layer}
                    </span>
                    <span className="font-mono text-[10px] text-cream/40">{r.confidence}% confidence</span>
                    {s === 'review' && <span className="rounded-full bg-amber/15 px-2 text-[10px] text-amber">In review</span>}
                  </div>
                  <p className="mt-1 font-medium">{r.title}</p>
                  <p className="mt-0.5 text-sm text-cream/55">{r.rationale}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-cream/50">{r.impact}</span>
                <div className="flex shrink-0 gap-2">
                  {s === 'approved' || s === 'rejected' ? (
                    <span className={`rounded-full px-3 py-1.5 text-xs ${s === 'approved' ? 'bg-teal/25 text-teal-light' : 'bg-rose/15 text-rose'}`}>{s === 'approved' ? 'Approved' : 'Rejected'}</span>
                  ) : (
                    <>
                      <button onClick={() => setState({ ...state, [r.id]: 'approved' })} className="inline-flex items-center gap-1 rounded-full bg-amber px-3 py-1.5 text-xs font-semibold text-ink hover:bg-[#fbb13c]">
                        <Check className="size-3.5" aria-hidden /> Approve
                      </button>
                      <button onClick={() => setState({ ...state, [r.id]: 'review' })} className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5">
                        <Eye className="size-3.5" aria-hidden /> Review
                      </button>
                      <button onClick={() => setState({ ...state, [r.id]: 'rejected' })} className="rounded-full border border-white/15 p-1.5 text-cream/60 hover:border-rose/50 hover:text-rose" aria-label={`Reject: ${r.title}`}>
                        <X className="size-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>
    </Panel>
  )
}
