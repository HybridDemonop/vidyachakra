'use client'

import { ArrowRight, Menu, Play, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Glows, HeadlineMix, Logo, MagneticButton } from '@/components/vc/primitives'
import { Wheel } from '@/components/vc/wheel'

const links = [
  { href: '#problem', l: 'Problem' },
  { href: '#layers', l: 'Platform' },
  { href: '#loop', l: 'The loop' },
  { href: '#ripples', l: 'Ripples' },
  { href: '#impact', l: 'Impact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 pl-5" aria-label="Main">
        <Link href="/" aria-label="Vidyachakra home">
          <Logo />
        </Link>
        <ul className="hidden items-center gap-7 text-sm text-cream/70 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-cream">
                {l.l}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden rounded-full bg-amber px-4 py-2 text-sm font-semibold text-ink transition hover:bg-[#fbb13c] sm:inline-flex">
            Enter demo
          </Link>
          <button className="rounded-full p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-4 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-cream/80">
              {l.l}
            </a>
          ))}
          <Link href="/login" className="mt-2 block rounded-full bg-amber px-4 py-2 text-center font-semibold text-ink">
            Enter demo
          </Link>
        </div>
      )}
    </header>
  )
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 md:pt-32">
      <Glows />
      <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-6 px-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.2 }} className="eyebrow">
            Hackathon pitch · Higher education · 2026
          </motion.p>
          <HeadlineMix as="h1" pre="Make higher education" em="future-ready." className="mt-6 text-[clamp(3rem,7.4vw,7.5rem)]" />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-cream/70"
          >
            Vidyachakra closes the loop between what industry needs and what universities teach. One continuous system across faculty, curriculum, resources, students and careers.
            <span className="mt-3 block font-display text-xl italic text-cream">Wheel of knowledge — a wheel that never stops turning.</span>
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href="/login">
              Explore the platform <ArrowRight className="size-4" />
            </MagneticButton>
            <MagneticButton href="#loop" variant="ghost">
              <Play className="size-4" /> Watch the loop
            </MagneticButton>
          </motion.div>
          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6">
            {[
              ['6', 'Connected layers'],
              ['7', 'Step loop'],
              ['1', 'Ecosystem'],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="eyebrow text-cream/50">{l}</dt>
                <dd className="display mt-1 text-4xl text-amber">{n}</dd>
              </div>
            ))}
          </dl>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="relative h-[420px] sm:h-[560px]">
          <Wheel />
        </motion.div>
      </div>
    </section>
  )
}
