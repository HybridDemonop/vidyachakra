'use client'

import { Award, BadgeCheck, RotateCw } from 'lucide-react'
import { useState } from 'react'
import { credentials } from '@/lib/mock-data'
import { PageHeader } from '@/components/app/ui'

function QR({ seed }: { seed: string }) {
  const cells = Array.from({ length: 121 }, (_, i) => {
    const h = (seed.charCodeAt(i % seed.length) * (i + 7) * 31) % 7
    const corner = (x: number, y: number) => (x < 3 && y < 3) || (x > 7 && y < 3) || (x < 3 && y > 7)
    const x = i % 11
    const y = Math.floor(i / 11)
    return corner(x, y) ? !(x === 1 && y === 1) && !(x === 9 && y === 1) && !(x === 1 && y === 9) : h < 3
  })
  return (
    <svg viewBox="0 0 11 11" className="size-24 rounded bg-cream p-1" role="img" aria-label="Verification QR code">
      {cells.map((on, i) => on && <rect key={i} x={i % 11} y={Math.floor(i / 11)} width="1" height="1" fill="#0E0D0B" />)}
    </svg>
  )
}

function FlipCard({ c }: { c: (typeof credentials)[number] }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button onClick={() => setFlipped(!flipped)} className="group block h-72 w-full text-left [perspective:1200px]" aria-label={`${c.t} credential. ${flipped ? 'Showing verification' : 'Show verification details'}`} aria-pressed={flipped}>
      <div className="relative size-full transition-transform duration-700 [transform-style:preserve-3d]" style={{ transform: flipped ? 'rotateY(180deg)' : 'none' }}>
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-2 p-6 [backface-visibility:hidden]" style={{ boxShadow: `inset 0 1px 0 ${c.c}` }}>
          <div aria-hidden className="holo pointer-events-none absolute inset-0" />
          <div aria-hidden className="absolute -right-12 -top-12 size-44 rounded-full opacity-40 blur-3xl" style={{ background: c.c }} />
          <div className="relative flex items-center justify-between">
            <span className="eyebrow text-[10px]" style={{ color: c.c }}>
              {c.lvl}
            </span>
            <BadgeCheck className="size-5 text-teal-light" aria-label="Verified" />
          </div>
          <div className="relative mt-8 grid size-16 place-items-center rounded-full" style={{ background: `radial-gradient(circle at 30% 30%, ${c.c}, ${c.c}33)`, boxShadow: `0 0 30px -4px ${c.c}` }}>
            <Award className="size-7 text-ink" aria-hidden />
          </div>
          <p className="display relative mt-auto text-2xl font-bold">{c.t}</p>
          <p className="relative mt-1 flex items-center justify-between text-xs text-cream/50">
            <span>Issued {c.date}</span>
            <span className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
              <RotateCw className="size-3" aria-hidden /> Flip
            </span>
          </p>
        </div>
        <div className="absolute inset-0 flex flex-col rounded-2xl border border-white/10 bg-ink-2 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]" style={{ borderTop: `2px solid ${c.c}` }}>
          <p className="eyebrow text-[10px] text-cream/50">Issuer</p>
          <p className="mt-1 font-medium">{c.issuer}</p>
          <p className="eyebrow mt-4 text-[10px] text-cream/50">Verification code</p>
          <p className="mt-1 font-mono text-sm" style={{ color: c.c }}>
            {c.code}
          </p>
          <div className="mt-auto flex items-end justify-between">
            <QR seed={c.code} />
            <span className="rounded-full bg-teal/25 px-2.5 py-1 text-[10px] text-teal-light">On-chain verified</span>
          </div>
        </div>
      </div>
    </button>
  )
}

export default function CredentialsPage() {
  return (
    <>
      <PageHeader eyebrow={`Credential Wallet · ${credentials.length} verified`} pre="Skills you can" em="prove." color="#FF7085" sub="Stackable micro-credentials, each mapped to a course outcome and verifiable by any employer. Tap a card to flip." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {credentials.map((c) => (
          <FlipCard key={c.code} c={c} />
        ))}
      </div>
    </>
  )
}
