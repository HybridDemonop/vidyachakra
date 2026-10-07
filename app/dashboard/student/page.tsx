'use client'

import { BookOpen, FolderGit2 } from 'lucide-react'
import { useState } from 'react'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts'
import { roleGaps, studentSkills, targetRoles } from '@/lib/mock-data'
import { Banner, PageHeader, Panel, Ring, tooltipStyle } from '@/components/app/ui'

const RO = '#FF7085'
const pathway = ['Industry skill', 'Validated module', 'Mapped to course outcome', 'Academic credit', 'Verified skill']
const projects = [
  { t: 'RAG assistant for library catalogue', s: 'Python · LangChain · Postgres', st: 'Verified' },
  { t: 'Summer internship — Zoho', s: 'Product dev · 8 weeks', st: 'Verified' },
  { t: 'Campus energy IoT dashboard', s: 'ESP32 · MQTT · Grafana', st: 'In review' },
]

export default function StudentPage() {
  const [role, setRole] = useState(targetRoles[0])
  return (
    <>
      <PageHeader eyebrow="Student Career Portal · Riya Menon, B.Tech CSE '27" pre="Beyond CGPA-only" em="visibility." color={RO} sub="Where am I now → what do I need next?" />

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Panel eyebrow="Unified skill profile" title="Six clusters, one picture" color={RO}>
          <div className="h-72">
            <ResponsiveContainer>
              <RadarChart data={studentSkills} outerRadius="72%">
                <PolarGrid stroke="rgb(255 255 255 / 0.08)" />
                <PolarAngleAxis dataKey="k" tick={{ fill: 'rgb(244 238 220 / 0.6)', fontSize: 11 }} />
                <Radar dataKey="v" name="Score" stroke={RO} fill={RO} fillOpacity={0.25} />
                <Tooltip {...tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel eyebrow="Career readiness" title={`For ${role}`} color={RO}>
          <div className="flex flex-col items-center">
            <Ring key={role} value={{ 'ML Engineer': 68, 'Cloud Engineer': 54, 'Data Analyst': 79, 'SecOps Analyst': 47 }[role]!} color={RO} label="Ready" size={170} />
            <label htmlFor="target" className="eyebrow mt-6 text-[10px] text-cream/50">
              Target role
            </label>
            <div id="target" className="mt-2 flex flex-wrap justify-center gap-1.5" role="group">
              {targetRoles.map((r) => (
                <button key={r} aria-pressed={r === role} onClick={() => setRole(r)} className={`rounded-full px-3 py-1 text-xs transition ${r === role ? 'bg-rose text-ink' : 'border border-white/10 text-cream/60 hover:text-cream'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel eyebrow="Skill gaps" title={`What ${role} needs next`} color={RO}>
          <ul className="space-y-4">
            {roleGaps[role].map((g) => (
              <li key={g.s}>
                <div className="flex justify-between text-sm">
                  <span>{g.s}</span>
                  <span className="font-mono text-xs text-cream/50">
                    {g.have} → {g.need}
                  </span>
                </div>
                <div className="relative mt-1.5 h-2 rounded-full bg-white/10">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-rose transition-all duration-700" style={{ width: `${g.have}%` }} />
                  <div className="absolute -top-1 h-4 w-0.5 bg-cream" style={{ left: `${g.need}%` }} aria-hidden />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel eyebrow="Recommended learning" title="Mapped to your courses" color={RO}>
          <ul className="space-y-3">
            {roleGaps[role].map((g, i) => (
              <li key={g.s} className="flex items-center gap-3 rounded-lg bg-white/[0.03] p-3">
                <BookOpen className="size-4 shrink-0 text-rose" aria-hidden />
                <div>
                  <p className="text-sm">{g.s} Foundations</p>
                  <p className="text-xs text-cream/45">Validated module · {i + 1} credit · CS-4{11 + i}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel eyebrow="Projects + internships" title="Evidence of work" color={RO}>
          <ul className="space-y-3">
            {projects.map((p) => (
              <li key={p.t} className="flex items-start gap-3">
                <FolderGit2 className="mt-0.5 size-4 shrink-0 text-cream/50" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="text-sm">{p.t}</p>
                  <p className="text-xs text-cream/45">{p.s}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${p.st === 'Verified' ? 'bg-teal/25 text-teal-light' : 'bg-amber/15 text-amber'}`}>{p.st}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-4">
        <Panel eyebrow="Credit pathway" title="How a skill becomes a credential" color={RO}>
          <ol className="grid gap-3 md:grid-cols-5">
            {pathway.map((p, i) => (
              <li key={p} className="relative rounded-xl border border-white/10 p-4" style={i < 3 ? { borderColor: `${RO}66`, background: `${RO}0d` } : undefined}>
                <p className="font-mono text-[10px]" style={{ color: i < 3 ? RO : 'rgb(244 238 220 / 0.4)' }}>
                  0{i + 1} {i < 3 ? '· done' : ''}
                </p>
                <p className="mt-1 text-sm font-medium">{p}</p>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
      <div className="mt-4">
        <Banner color={RO}>Every verified skill is visible to employers — not just your CGPA.</Banner>
      </div>
    </>
  )
}
