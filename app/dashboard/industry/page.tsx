'use client'

import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { demandQuarters, trendingSkills } from '@/lib/mock-data'
import { axis, PageHeader, Panel, Sparkline, tooltipStyle } from '@/components/app/ui'

const A = '#F59E0B'
const cats = ['All', ...Array.from(new Set(trendingSkills.map((s) => s.cat)))]

export default function IndustryPage() {
  const [cat, setCat] = useState('All')
  const rows = useMemo(() => trendingSkills.filter((s) => cat === 'All' || s.cat === cat), [cat])
  return (
    <>
      <PageHeader eyebrow="Industry Intelligence · 1,240 postings this week" pre="Read the market" em="in real time." color={A} sub="Demand signals from job boards, employer panels and sector reports — mapped to skills." />
      <Panel eyebrow="Demand index" title="Skill demand over quarters" color={A}>
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={demandQuarters} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid stroke="rgb(255 255 255 / 0.05)" vertical={false} />
              <XAxis dataKey="q" {...axis} />
              <YAxis {...axis} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#F4EEDC99' }} />
              <Line dataKey="genai" name="GenAI" stroke={A} strokeWidth={2.5} dot={false} />
              <Line dataKey="cloud" name="Cloud" stroke="#A78BFA" strokeWidth={2} dot={false} />
              <Line dataKey="cyber" name="Cybersecurity" stroke="#FF7085" strokeWidth={2} dot={false} />
              <Line dataKey="data" name="Data Eng." stroke="#2DD4BF" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <div className="mt-4">
        <Panel
          eyebrow="Trending skills"
          title="What employers are asking for"
          color={A}
          action={
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
              {cats.map((c) => (
                <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full px-3 py-1 text-xs transition ${cat === c ? 'bg-amber text-ink' : 'border border-white/10 text-cream/60 hover:text-cream'}`}>
                  {c}
                </button>
              ))}
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="text-left font-mono text-[10px] uppercase tracking-widest text-cream/40">
                  <th className="pb-3 font-normal">Skill</th>
                  <th className="pb-3 font-normal">Demand</th>
                  <th className="pb-3 font-normal">QoQ</th>
                  <th className="pb-3 font-normal">8-wk trend</th>
                  <th className="pb-3 font-normal">Job roles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((r) => {
                  const up = r.trend >= 0
                  return (
                    <tr key={r.s} className="transition-colors hover:bg-white/[0.02]">
                      <td className="py-3.5 font-medium">{r.s}</td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-amber" style={{ width: `${r.demand}%` }} />
                          </div>
                          <span className="font-mono text-xs">{r.demand}</span>
                        </div>
                      </td>
                      <td className={`py-3.5 font-mono text-xs ${up ? 'text-teal-light' : 'text-rose'}`}>
                        <span className="inline-flex items-center gap-0.5">
                          {up ? <ArrowUpRight className="size-3.5" aria-hidden /> : <ArrowDownRight className="size-3.5" aria-hidden />}
                          {Math.abs(r.trend)}%
                        </span>
                      </td>
                      <td className="py-3.5">
                        <div className="h-8 w-24">
                          <Sparkline data={r.spark} color={up ? '#F59E0B' : '#FF7085'} />
                        </div>
                      </td>
                      <td className="py-3.5 text-cream/55">{r.roles}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </>
  )
}
