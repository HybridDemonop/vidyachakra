'use client'

import { Command } from 'cmdk'
import {
  Award,
  BarChart3,
  Bell,
  BookOpenCheck,
  ChevronsLeft,
  Factory,
  Gauge,
  GraduationCap,
  LayoutGrid,
  MessageSquareQuote,
  Package,
  Search,
  Sparkles,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Logo } from '@/components/vc/primitives'
import { AIDrawer } from './ai-drawer'
import { cn } from '@/lib/utils'

export const nav = [
  { href: '/dashboard/leadership', l: 'Command Center', i: LayoutGrid, c: '#F59E0B' },
  { href: '/dashboard/industry', l: 'Industry Intelligence', i: Factory, c: '#F59E0B' },
  { href: '/dashboard/faculty', l: 'Faculty GrowthHub', i: Users, c: '#0F766E' },
  { href: '/dashboard/curriculum', l: 'Curriculum Engine', i: BookOpenCheck, c: '#A78BFA' },
  { href: '/dashboard/resources', l: 'Resource & FLOSS', i: Package, c: '#B45309' },
  { href: '/dashboard/student', l: 'Student Career', i: GraduationCap, c: '#FF7085' },
  { href: '/dashboard/credentials', l: 'Credential Wallet', i: Award, c: '#FF7085' },
  { href: '/dashboard/feedback', l: 'Feedback & Analytics', i: MessageSquareQuote, c: '#2DD4BF' },
  { href: '/dashboard/metrics', l: 'Success Metrics', i: Gauge, c: '#2DD4BF' },
]

const roles = [
  { l: 'Leadership', href: '/dashboard/leadership' },
  { l: 'Faculty', href: '/dashboard/faculty' },
  { l: 'Student', href: '/dashboard/student' },
  { l: 'Employer', href: '/dashboard/feedback' },
]

const AIContext = createContext<{ openAI: (prompt?: string) => void }>({ openAI: () => {} })
export const useAI = () => useContext(AIContext)

export function AppShell({ children }: { children: ReactNode }) {
  const path = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [cmd, setCmd] = useState(false)
  const [ai, setAi] = useState<{ open: boolean; prompt?: string }>({ open: false })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmd((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const current = nav.find((n) => path.startsWith(n.href))

  return (
    <AIContext.Provider value={{ openAI: (prompt) => setAi({ open: true, prompt }) }}>
      <div className="flex min-h-screen">
        <aside className={cn('sticky top-0 hidden h-screen shrink-0 flex-col border-r border-white/10 bg-ink-2/60 backdrop-blur-xl transition-[width] duration-300 md:flex', collapsed ? 'w-[72px]' : 'w-64')}>
          <div className="flex h-16 items-center justify-between px-5">
            <Link href="/" aria-label="Vidyachakra home">
              <Logo className={collapsed ? '[&>span:last-child]:hidden' : ''} />
            </Link>
          </div>
          <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4" aria-label="Dashboard">
            {!collapsed && <p className="eyebrow mb-3 px-3 text-[10px] text-cream/40">Workspace</p>}
            {nav.map((n) => {
              const active = path.startsWith(n.href)
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  title={n.l}
                  aria-current={active ? 'page' : undefined}
                  className={cn('relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors', active ? 'bg-white/[0.06] text-cream' : 'text-cream/55 hover:bg-white/[0.03] hover:text-cream')}
                >
                  {active && <motion.span layoutId="nav-bar" className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-amber shadow-[0_0_12px_var(--amber)]" />}
                  <n.i className="size-4 shrink-0" style={{ color: active ? n.c : undefined }} aria-hidden />
                  {!collapsed && <span className="truncate">{n.l}</span>}
                </Link>
              )
            })}
          </nav>
          <button onClick={() => setCollapsed(!collapsed)} className="m-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-cream/50 hover:bg-white/5 hover:text-cream" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            <ChevronsLeft className={cn('size-4 transition-transform', collapsed && 'rotate-180')} aria-hidden />
            {!collapsed && 'Collapse'}
          </button>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/10 bg-ink/70 px-4 backdrop-blur-xl md:px-8">
            <Link href="/" className="md:hidden" aria-label="Home">
              <span className="grid size-7 place-items-center rounded-full border border-cream/30">
                <span className="size-3.5 rounded-full bg-amber" />
              </span>
            </Link>
            <button onClick={() => setCmd(true)} className="glass flex w-full max-w-sm items-center gap-2 rounded-lg px-3 py-2 text-sm text-cream/50 transition hover:border-white/20">
              <Search className="size-4" aria-hidden />
              <span className="truncate">Search or jump to…</span>
              <kbd className="ml-auto hidden rounded border border-white/10 px-1.5 font-mono text-[10px] sm:inline">⌘K</kbd>
            </button>
            <div className="ml-auto flex items-center gap-2">
              <label className="sr-only" htmlFor="role">
                Switch role
              </label>
              <select
                id="role"
                className="hidden rounded-lg border border-white/10 bg-ink-2 px-3 py-2 text-sm text-cream sm:block"
                value={roles.find((r) => path.startsWith(r.href))?.href ?? ''}
                onChange={(e) => router.push(e.target.value)}
              >
                <option value="" disabled>
                  Role…
                </option>
                {roles.map((r) => (
                  <option key={r.l} value={r.href}>
                    {r.l}
                  </option>
                ))}
              </select>
              <button className="relative rounded-lg p-2 text-cream/70 hover:bg-white/5" aria-label="Notifications, 3 unread">
                <Bell className="size-5" />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-rose" />
              </button>
              <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-amber to-rose text-xs font-bold text-ink" aria-label="Dr. Ananya Rao">
                AR
              </span>
            </div>
          </header>
          <main className="flex-1 px-4 pb-28 pt-8 md:px-8">
            <motion.div key={path} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="mx-auto max-w-7xl">
              {children}
            </motion.div>
          </main>
        </div>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-40 flex justify-between overflow-x-auto rounded-2xl glass bg-ink-2/80 p-1.5 md:hidden" aria-label="Mobile">
        {nav.slice(0, 5).map((n) => {
          const active = path.startsWith(n.href)
          return (
            <Link key={n.href} href={n.href} aria-label={n.l} className={cn('grid flex-1 place-items-center rounded-xl py-2.5', active && 'bg-white/10')}>
              <n.i className="size-5" style={{ color: active ? n.c : 'rgb(244 238 220 / 0.6)' }} />
            </Link>
          )
        })}
        <button onClick={() => setCmd(true)} aria-label="More pages" className="grid flex-1 place-items-center rounded-xl py-2.5 text-cream/60">
          <BarChart3 className="size-5" />
        </button>
      </nav>

      <button
        onClick={() => setAi({ open: true })}
        className="group fixed bottom-20 right-5 z-40 flex items-center gap-2 rounded-full ai-border py-2 pl-2 pr-4 text-sm font-medium shadow-[0_0_40px_-8px_var(--violet)] md:bottom-6"
        aria-label="Open Vidyachakra AI"
      >
        <span className="relative grid size-8 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-lavender/40" />
          <span className="relative size-8 rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--lavender),var(--violet))]" />
          <Sparkles className="absolute size-3.5 text-cream" aria-hidden />
        </span>
        Vidyachakra AI
      </button>

      <Command.Dialog
        open={cmd}
        onOpenChange={setCmd}
        label="Command palette"
        overlayClassName="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm"
        contentClassName="fixed left-1/2 top-[18vh] z-50 w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-ink-2 shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4">
          <Search className="size-4 text-cream/40" aria-hidden />
          <Command.Input placeholder="Jump to a page or ask AI…" className="h-12 w-full bg-transparent text-sm text-cream outline-none placeholder:text-cream/40" />
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="p-6 text-center text-sm text-cream/50">No results.</Command.Empty>
          <Command.Group heading="Pages" className="text-cream/40 [&_[cmdk-group-heading]]:eyebrow [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px]">
            {nav.map((n) => (
              <Command.Item
                key={n.href}
                value={n.l}
                onSelect={() => {
                  router.push(n.href)
                  setCmd(false)
                }}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-cream/80 data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-cream"
              >
                <n.i className="size-4" style={{ color: n.c }} aria-hidden /> {n.l}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="AI actions" className="text-cream/40 [&_[cmdk-group-heading]]:eyebrow [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px]">
            {['Identify skill gaps', 'Analyse curriculum', 'Recommend resources'].map((a) => (
              <Command.Item
                key={a}
                onSelect={() => {
                  setCmd(false)
                  setAi({ open: true, prompt: a })
                }}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-cream/80 data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-cream"
              >
                <Sparkles className="size-4 text-lavender" aria-hidden /> {a}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command.Dialog>

      <AIDrawer open={ai.open} prompt={ai.prompt} onClose={() => setAi({ open: false })} context={current?.l} />
    </AIContext.Provider>
  )
}
