'use client'

import { BookOpen, Check } from 'lucide-react'
import { useState } from 'react'
import { CartesianGrid, Line, LineChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { facultyCourses, facultyGaps, facultyGrowth, facultyRadar, facultyTimeline } from '@/lib/mock-data'
import { axis, Banner, PageHeader, Panel, tooltipStyle } from '@/components/app/ui'

const T = '#0F766E'
const TL = '#2DD4BF'
const steps = ['Assess', 'Learn', 'Apply', 'Reassess']

export default function FacultyPage() {
  const [step, setStep] = useState(2)
  const [enrolled, setEnrolled] = useState<string[]>([])
  return (
    <>
      <PageHeader eyebrow="Faculty GrowthHub · Dr. Ananya Rao, CSE" pre="Development, not" em="filtering." color={TL} sub="A continuous, personal growth record — mapped to what your courses and students actually need." />

      <Panel eyebrow="Your cycle" title="Assess → Learn → Apply → Reassess" color={T}>
        <ol className="grid grid-cols-4 gap-2">
          {steps.map((s, i) => (
            <li key={s}>
              <button onClick={() => setStep(i)} className="w-full text-left" aria-current={i === step ? 'step' : undefined}>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: i <= step ? '100%' : '0%', background: TL }} />
                </div>
                <p className={`mt-2 text-sm ${i === step ? 'font-medium text-cream' : 'text-cream/50'}`}>
                  0{i + 1} {s}
                </p>
              </button>
            </li>
          ))}
        </ol>
      </Panel>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel eyebrow="4 dimensions" title="Competency profile" color={T}>
          <div className="h-72">
            <ResponsiveContainer>
              <RadarChart data={facultyRadar} outerRadius="72%">
                <PolarGrid stroke="rgb(255 255 255 / 0.08)" />
                <PolarAngleAxis dataKey="d" tick={{ fill: 'rgb(244 238 220 / 0.6)', fontSize: 11 }} />
                <Radar name="6 months ago" dataKey="prev" stroke="#F4EEDC55" fill="#F4EEDC" fillOpacity={0.04} />
                <Radar name="Now" dataKey="now" stroke={TL} fill={TL} fillOpacity={0.25} />
                <Tooltip {...tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel eyebrow="Growth over time" title="Composite score vs. department peers" color={T}>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={facultyGrowth} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid stroke="rgb(255 255 255 / 0.05)" vertical={false} />
                <XAxis dataKey="m" {...axis} />
                <YAxis {...axis} domain={[50, 85]} />
                <Tooltip {...tooltipStyle} />
                <Line dataKey="peer" name="Peers" stroke="#F4EEDC55" strokeDasharray="4 4" dot={false} />
                <Line dataKey="score" name="You" stroke={TL} strokeWidth={2.5} dot={{ r: 3, fill: TL }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel eyebrow="Where to grow next" title="Suggested focus areas" color={T}>
          <ul className="space-y-4">
            {facultyGaps.map((g) => (
              <li key={g.t}>
                <div className="flex justify-between text-sm">
                  <span>{g.t}</span>
                  <span className="font-mono text-cream/50">{g.lvl}%</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-white/10">
                  <div className="h-full rounded-full" style={{ width: `${g.lvl}%`, background: TL }} />
                </div>
                <p className="mt-1 text-xs text-cream/45">{g.why}</p>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel eyebrow="Recommended" title="Courses, workshops, certifications" color={T}>
          <ul className="space-y-3">
            {facultyCourses.map((c) => {
              const on = enrolled.includes(c.t)
              return (
                <li key={c.t} className="flex items-center gap-3 rounded-lg bg-white/[0.03] p-3">
                  <BookOpen className="size-4 shrink-0 text-teal-light" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{c.t}</p>
                    <p className="text-xs text-cream/45">
                      {c.k} · {c.h} · {c.p}
                    </p>
                  </div>
                  <button onClick={() => setEnrolled(on ? enrolled.filter((x) => x !== c.t) : [...enrolled, c.t])} className={`shrink-0 rounded-full px-3 py-1 text-xs ${on ? 'bg-teal text-cream' : 'border border-teal-light/40 text-teal-light hover:bg-teal/20'}`}>
                    {on ? <Check className="size-3.5" aria-label="Enrolled" /> : 'Enroll'}
                  </button>
                </li>
              )
            })}
          </ul>
        </Panel>
        <Panel eyebrow="Development record" title="Timeline" color={T}>
          <ol className="relative space-y-5 border-l border-white/10 pl-5">
            {facultyTimeline.map((t) => (
              <li key={t.t} className="relative">
                <span className="absolute -left-[25px] top-1 size-2.5 rounded-full ring-4 ring-ink" style={{ background: t.c }} />
                <p className="font-mono text-[10px] uppercase tracking-widest text-cream/40">
                  {t.date} · {t.k}
                </p>
                <p className="mt-0.5 text-sm">{t.t}</p>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
      <div className="mt-4">
        <Banner color={TL}>Growth is private to you and your mentor. Never used for ranking.</Banner>
      </div>
    </>
  )
}
