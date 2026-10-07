'use client'

import { ArrowRight, Briefcase, Building2, GraduationCap, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Glows, HeadlineMix, Logo } from '@/components/vc/primitives'
import { Wheel } from '@/components/vc/wheel'
import Link from 'next/link'

const demoRoles = [
  { l: 'Leadership', d: 'University command center', href: '/dashboard/leadership', i: Building2, c: '#F59E0B' },
  { l: 'Faculty', d: 'GrowthHub', href: '/dashboard/faculty', i: Users, c: '#0F766E' },
  { l: 'Student', d: 'Career portal', href: '/dashboard/student', i: GraduationCap, c: '#FF7085' },
  { l: 'Employer', d: 'Feedback & analytics', href: '/dashboard/feedback', i: Briefcase, c: '#2DD4BF' },
]

export default function LoginPage() {
  const router = useRouter()
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="relative isolate hidden flex-col justify-between overflow-hidden border-r border-white/10 p-10 lg:flex">
        <Glows />
        <Link href="/">
          <Logo />
        </Link>
        <div className="h-[460px]">
          <Wheel />
        </div>
        <div>
          <HeadlineMix pre="Learn. Adapt." em="Evolve." className="text-6xl" />
          <p className="mt-3 text-cream/60">Wheel of knowledge — a wheel that never stops turning.</p>
        </div>
      </section>
      <section className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link href="/" className="lg:hidden">
            <Logo />
          </Link>
          <p className="eyebrow mt-10 text-cream/50 lg:mt-0">Welcome back</p>
          <h1 className="display mt-3 text-5xl font-bold">
            Sign in to <em className="italic text-amber">the loop.</em>
          </h1>
          <form
            className="mt-10 space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              router.push('/dashboard/leadership')
            }}
          >
            <div>
              <label htmlFor="email" className="text-sm text-cream/70">
                Institutional email
              </label>
              <input id="email" type="email" required defaultValue="ananya.rao@vit.edu" className="mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 outline-none transition focus:border-amber" />
            </div>
            <div>
              <label htmlFor="pw" className="text-sm text-cream/70">
                Password
              </label>
              <input id="pw" type="password" required defaultValue="demo-password" className="mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 outline-none transition focus:border-amber" />
            </div>
            <button type="submit" className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-amber font-semibold text-ink transition hover:bg-[#fbb13c]">
              Sign in <ArrowRight className="size-4" />
            </button>
          </form>
          <div className="my-8 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="eyebrow text-[10px] text-cream/40">Or demo as…</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {demoRoles.map((r) => (
              <button
                key={r.l}
                onClick={() => router.push(r.href)}
                className="glass group rounded-xl p-4 text-left transition hover:-translate-y-0.5"
                style={{ borderTop: `2px solid ${r.c}` }}
              >
                <r.i className="size-5" style={{ color: r.c }} aria-hidden />
                <p className="mt-3 font-medium">{r.l}</p>
                <p className="text-xs text-cream/50">{r.d}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
