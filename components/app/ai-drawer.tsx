'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Check, Send, ShieldCheck, Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { aiResponses, layerColor, type LayerKey } from '@/lib/mock-data'

type Msg = { id: number; role: 'user' | 'ai'; text: string; rec?: (typeof aiResponses)[string] }
const quick = Object.keys(aiResponses)

export function RecommendationCard({ title, body, rationale, layer, streamed = true }: { title: string; body: string; rationale: string; layer: LayerKey; streamed?: boolean }) {
  const [sent, setSent] = useState(false)
  const c = layerColor[layer]
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4" style={{ borderLeft: `2px solid ${c}` }}>
      <p className="eyebrow text-[10px]" style={{ color: c }}>
        Recommendation · {layer}
      </p>
      <p className="mt-2 font-medium text-cream">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-cream/70">{streamed ? <Typewriter text={body} /> : body}</p>
      <div className="mt-3 rounded-lg bg-white/[0.03] p-3">
        <p className="eyebrow text-[9px] text-cream/40">Rationale</p>
        <p className="mt-1 text-xs text-cream/60">{rationale}</p>
      </div>
      <button
        onClick={() => setSent(true)}
        disabled={sent}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-lavender px-3 py-1.5 text-xs font-semibold text-ink transition hover:bg-[#bba6fc] disabled:bg-teal disabled:text-cream"
      >
        {sent ? <Check className="size-3.5" /> : <Send className="size-3.5" />} {sent ? 'Sent to review board' : 'Send for review'}
      </button>
    </div>
  )
}

function Typewriter({ text }: { text: string }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(id), v) : v + 2)), 14)
    return () => clearInterval(id)
  }, [text])
  return (
    <>
      {text.slice(0, n)}
      {n < text.length && <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-lavender align-middle" />}
    </>
  )
}

export function AIDrawer({ open, prompt, onClose, context }: { open: boolean; prompt?: string; onClose: () => void; context?: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const lastPrompt = useRef<string | undefined>(undefined)

  const ask = (q: string) => {
    if (!q.trim() || thinking) return
    const key = quick.find((k) => q.toLowerCase().includes(k.toLowerCase().split(' ')[0].slice(0, 5))) ?? quick[0]
    setMsgs((m) => [...m, { id: Date.now(), role: 'user', text: q }])
    setInput('')
    setThinking(true)
    setTimeout(() => {
      setThinking(false)
      setMsgs((m) => [...m, { id: Date.now() + 1, role: 'ai', text: '', rec: aiResponses[key] }])
    }, 900)
  }

  useEffect(() => {
    if (open && prompt && prompt !== lastPrompt.current) {
      lastPrompt.current = prompt
      ask(prompt)
    }
    if (!open) lastPrompt.current = undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, prompt])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, thinking])

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm" />
          <motion.aside
            role="dialog"
            aria-label="Vidyachakra AI"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 260 }}
            className="ai-border fixed inset-y-2 right-2 z-50 flex w-[calc(100vw-1rem)] max-w-md flex-col overflow-hidden rounded-2xl"
          >
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-violet/40 blur-3xl" />
            <header className="relative flex items-center gap-3 border-b border-white/10 p-4">
              <span className="relative size-9 rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--lavender),var(--violet))] shadow-[0_0_24px_var(--violet)]" />
              <div>
                <p className="font-medium">Vidyachakra AI</p>
                <p className="text-xs text-cream/50">{context ? `Context: ${context}` : 'The supporting brain'}</p>
              </div>
              <button onClick={onClose} className="ml-auto rounded-lg p-2 text-cream/60 hover:bg-white/5" aria-label="Close AI panel">
                <X className="size-5" />
              </button>
            </header>
            <div className="relative flex items-center gap-2 border-b border-white/10 bg-violet/10 px-4 py-2 text-xs text-lavender">
              <ShieldCheck className="size-3.5" aria-hidden /> AI recommends · never decides
            </div>
            <div className="relative flex-1 space-y-4 overflow-y-auto p-4">
              {msgs.length === 0 && (
                <div className="py-6">
                  <p className="display text-3xl font-bold">
                    What should the wheel <em className="italic text-lavender">learn next?</em>
                  </p>
                  <p className="mt-2 text-sm text-cream/50">Pick a quick action or ask anything about your institution.</p>
                </div>
              )}
              {msgs.map((m) =>
                m.role === 'user' ? (
                  <p key={m.id} className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-white/10 px-4 py-2 text-sm">
                    {m.text}
                  </p>
                ) : (
                  m.rec && <RecommendationCard key={m.id} {...m.rec} />
                ),
              )}
              {thinking && (
                <div className="space-y-2" aria-label="Thinking">
                  <div className="shimmer h-3 w-2/3 rounded" />
                  <div className="shimmer h-3 w-full rounded" />
                  <div className="shimmer h-3 w-1/2 rounded" />
                </div>
              )}
              <div ref={endRef} />
            </div>
            <div className="relative border-t border-white/10 p-3">
              <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
                {quick.map((q) => (
                  <button key={q} onClick={() => ask(q)} className="flex shrink-0 items-center gap-1 rounded-full border border-lavender/30 px-3 py-1 text-xs text-lavender transition hover:bg-lavender/10">
                    <Sparkles className="size-3" aria-hidden /> {q}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  ask(input)
                }}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink px-3"
              >
                <label htmlFor="ai-input" className="sr-only">
                  Ask Vidyachakra AI
                </label>
                <input id="ai-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about gaps, courses, resources…" className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-cream/40" />
                <button type="submit" className="grid size-8 place-items-center rounded-lg bg-lavender text-ink" aria-label="Send">
                  <ArrowUp className="size-4" />
                </button>
              </form>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
