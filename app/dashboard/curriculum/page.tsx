'use client'

import { DndContext, PointerSensor, KeyboardSensor, useDraggable, useDroppable, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { ArrowDown, GripVertical } from 'lucide-react'
import { useState } from 'react'
import { curriculumKanban } from '@/lib/mock-data'
import { Banner, PageHeader, Panel } from '@/components/app/ui'

const V = '#A78BFA'
type Col = keyof typeof curriculumKanban
type Card = (typeof curriculumKanban)['proposed'][number]
const cols: { k: Col; l: string; c: string }[] = [
  { k: 'proposed', l: 'Proposed', c: '#A78BFA' },
  { k: 'review', l: 'Under review', c: '#F59E0B' },
  { k: 'approved', l: 'Approved', c: '#2DD4BF' },
  { k: 'rejected', l: 'Rejected', c: '#FF7085' },
]
const flow = [
  { t: 'Industry', d: 'GenAI, Cloud, Cybersecurity demand rising' },
  { t: 'Skill map', d: '18 skills mapped to 214 course outcomes' },
  { t: 'Gap detected', d: 'CS-402, CS-411, Sem-6 electives' },
  { t: 'Academic review', d: 'Routed to Board of Studies' },
]

function KCard({ card }: { card: Card }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: card.id })
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ transform: transform ? `translate3d(${transform.x}px,${transform.y}px,0)` : undefined }}
      className={`flex cursor-grab touch-none items-start gap-2 rounded-lg border border-white/10 bg-ink-2 p-3 active:cursor-grabbing ${isDragging ? 'z-10 shadow-2xl ring-1 ring-lavender' : ''}`}
    >
      <GripVertical className="mt-0.5 size-4 shrink-0 text-cream/30" aria-hidden />
      <div>
        <p className="text-sm">{card.t}</p>
        <p className="mt-1 text-xs text-cream/45">
          {card.d} · {card.tag}
        </p>
      </div>
    </div>
  )
}

function Column({ col, cards }: { col: (typeof cols)[number]; cards: Card[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: col.k })
  return (
    <div ref={setNodeRef} className={`min-h-48 rounded-xl border p-3 transition-colors ${isOver ? 'border-lavender/60 bg-violet/10' : 'border-white/10 bg-white/[0.02]'}`}>
      <p className="mb-3 flex items-center gap-2 text-sm font-medium">
        <span className="size-2 rounded-full" style={{ background: col.c }} /> {col.l}
        <span className="ml-auto font-mono text-xs text-cream/40">{cards.length}</span>
      </p>
      <div className="space-y-2">
        {cards.map((c) => (
          <KCard key={c.id} card={c} />
        ))}
      </div>
    </div>
  )
}

export default function CurriculumPage() {
  const [board, setBoard] = useState(curriculumKanban)
  const [actions, setActions] = useState<string[]>(['Add practical module'])
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }), useSensor(KeyboardSensor))
  const onEnd = (e: DragEndEvent) => {
    const to = e.over?.id as Col | undefined
    if (!to) return
    const from = (Object.keys(board) as Col[]).find((k) => board[k].some((c) => c.id === e.active.id))
    if (!from || from === to) return
    const card = board[from].find((c) => c.id === e.active.id)!
    setBoard({ ...board, [from]: board[from].filter((c) => c.id !== card.id), [to]: [...board[to], card] })
  }
  return (
    <>
      <PageHeader eyebrow="Curriculum Engine" pre="Syllabi that keep" em="pace." color={V} sub="Detect gaps between industry demand and course outcomes. Route proposals to the people who decide." />
      <div className="grid gap-4 lg:grid-cols-[1fr_1.6fr]">
        <Panel eyebrow="How it flows" title="From signal to review" color={V}>
          <ol className="space-y-2">
            {flow.map((f, i) => (
              <li key={f.t}>
                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                  <p className="font-mono text-[10px] text-lavender">0{i + 1}</p>
                  <p className="mt-1 font-medium">{f.t}</p>
                  <p className="text-sm text-cream/55">{f.d}</p>
                </div>
                {i < flow.length - 1 && <ArrowDown className="mx-auto my-1 size-4 text-lavender/60" aria-hidden />}
              </li>
            ))}
          </ol>
        </Panel>
        <div className="relative overflow-hidden rounded-2xl bg-violet p-7 md:p-9">
          <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-lavender/40 blur-3xl" />
          <p className="eyebrow relative text-cream/70">Worked example</p>
          <h2 className="display relative mt-4 text-3xl font-bold md:text-5xl">
            Industry demand rises for <em className="italic text-amber">GenAI + Cloud + Cybersecurity.</em>
          </h2>
          <div className="relative mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-ink/30 p-4">
              <p className="eyebrow text-[10px] text-cream/60">Current coverage</p>
              <p className="display mt-2 text-3xl font-bold text-amber">Partial</p>
              <div className="mt-3 h-2 rounded-full bg-cream/15">
                <div className="h-full w-[31%] rounded-full bg-amber" />
              </div>
              <p className="mt-2 text-xs text-cream/70">31% of required outcomes covered</p>
            </div>
            <div className="rounded-xl bg-ink/30 p-4">
              <p className="eyebrow text-[10px] text-cream/60">Curriculum actions</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Update existing subject', 'Add practical module', 'Introduce elective', 'Integrate certification'].map((a) => {
                  const on = actions.includes(a)
                  return (
                    <button key={a} aria-pressed={on} onClick={() => setActions(on ? actions.filter((x) => x !== a) : [...actions, a])} className={`rounded-full px-3 py-1.5 text-xs transition ${on ? 'bg-cream text-violet' : 'border border-cream/30 text-cream hover:bg-cream/10'}`}>
                      {a}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-4" aria-label="Recommendation board">
        <Panel eyebrow="Drag to move" title="Recommendation board" color={V}>
          <DndContext sensors={sensors} onDragEnd={onEnd}>
            <div className="grid gap-3 md:grid-cols-4">
              {cols.map((c) => (
                <Column key={c.k} col={c} cards={board[c.k]} />
              ))}
            </div>
          </DndContext>
        </Panel>
      </section>
      <div className="mt-4">
        <Banner color={V}>Vidyachakra recommends. Academic authorities decide.</Banner>
      </div>
    </>
  )
}
