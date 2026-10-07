'use client'

import { ArrowRight, Star } from 'lucide-react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { alumniProgression, employerFeedback, placementData } from '@/lib/mock-data'
import { axis, Banner, PageHeader, Panel, tooltipStyle } from '@/components/app/ui'

const TL = '#2DD4BF'
const flow = [
  { t: 'Employers', d: '22 structured reviews' },
  { t: 'Placement', d: '87% placed · 412 offers' },
  { t: 'Alumni', d: '340 pulse responses' },
  { t: 'Analytics', d: 'Patterns become curriculum signals' },
]

export default function FeedbackPage() {
  return (
    <>
      <PageHeader eyebrow="Feedback & Analytics · Class of 2026" pre="Outcomes that" em="talk back." color={TL} sub="Placement, alumni and employer patterns flow back into the wheel as the next round of signals." />
      <ol className="grid gap-3 md:grid-cols-4">
        {flow.map((f, i) => (
          <li key={f.t} className="glass relative rounded-xl p-5" style={{ borderTop: `2px solid ${TL}` }}>
            <p className="font-mono text-[10px] text-cream/40">0{i + 1}</p>
            <p className="display mt-2 text-2xl font-semibold">{f.t}</p>
            <p className="mt-1 text-sm text-cream/55">{f.d}</p>
            {i < 3 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-ink p-0.5 text-teal-light md:block" aria-hidden />}
          </li>
        ))}
      </ol>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel eyebrow="Placement outcomes" title="Graduate destinations (%)" color={TL}>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={placementData} margin={{ left: -20, top: 8 }}>
                <CartesianGrid stroke="rgb(255 255 255 / 0.05)" vertical={false} />
                <XAxis dataKey="y" {...axis} />
                <YAxis {...axis} />
                <Tooltip {...tooltipStyle} cursor={{ fill: 'rgb(255 255 255 / 0.03)' }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="placed" name="Placed" stackId="a" fill={TL} />
                <Bar dataKey="higher" name="Higher studies" stackId="a" fill="#A78BFA" />
                <Bar dataKey="entre" name="Founders" stackId="a" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel eyebrow="Alumni progression" title="Median CTC (₹ LPA) at 0, 1, 3 and 5 years" color={TL}>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={alumniProgression} margin={{ left: -20, top: 8, right: 8 }}>
                <defs>
                  <linearGradient id="alum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={TL} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={TL} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgb(255 255 255 / 0.05)" vertical={false} />
                <XAxis dataKey="yr" {...axis} />
                <YAxis {...axis} />
                <Tooltip {...tooltipStyle} />
                <Area dataKey="ctc" name="Median CTC" stroke={TL} strokeWidth={2.5} fill="url(#alum)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="mt-4">
        <Panel eyebrow="Employer feedback" title="What hiring partners said" color={TL}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="text-left font-mono text-[10px] uppercase tracking-widest text-cream/40">
                  <th className="pb-3 font-normal">Employer</th>
                  <th className="pb-3 font-normal">Role</th>
                  <th className="pb-3 font-normal">Rating</th>
                  <th className="pb-3 font-normal">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {employerFeedback.map((f) => (
                  <tr key={f.e}>
                    <td className="py-3.5 font-medium">{f.e}</td>
                    <td className="py-3.5 text-cream/60">{f.role}</td>
                    <td className="py-3.5">
                      <span className="flex gap-0.5" aria-label={`${f.rating} of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`size-3.5 ${i < f.rating ? 'fill-amber text-amber' : 'text-cream/20'}`} aria-hidden />
                        ))}
                      </span>
                    </td>
                    <td className="py-3.5 text-cream/60">{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
      <div className="mt-4">
        <Banner color={TL}>“System design depth” raised by 7 employers → sent to Curriculum Engine as a new signal.</Banner>
      </div>
    </>
  )
}
