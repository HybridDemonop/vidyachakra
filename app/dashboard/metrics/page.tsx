import { successMetrics } from '@/lib/mock-data'
import { PageHeader } from '@/components/app/ui'
import { GlowCard } from '@/components/vc/primitives'

export default function MetricsPage() {
  return (
    <>
      <PageHeader eyebrow="Success metrics" pre="Measure the" em="loop." color="var(--amber)" sub="Five layers, two signals each. All trending toward a tighter wheel." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {successMetrics.map((s) => (
          <GlowCard key={s.t} color={s.c} className="p-6">
            <p className="eyebrow text-[10px]" style={{ color: s.c }}>
              {s.t}
            </p>
            <dl className="mt-6 space-y-6">
              {s.m.map(([l, v]) => (
                <div key={l}>
                  <dd className="display text-4xl font-bold">{v}</dd>
                  <dt className="mt-1 text-sm text-cream/55">{l}</dt>
                </div>
              ))}
            </dl>
          </GlowCard>
        ))}
      </div>
      <div className="relative mt-6 overflow-hidden rounded-2xl bg-cream p-8 text-ink md:p-12">
        <p className="eyebrow text-ink/50">North star</p>
        <p className="display mt-4 max-w-4xl text-3xl font-bold text-balance md:text-5xl">
          We measure the loop getting <em className="italic text-amber-deep">tighter</em> — not just outputs going up.
        </p>
      </div>
    </>
  )
}
