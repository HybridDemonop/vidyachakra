import { layerColor, layers } from '@/lib/mock-data'

export function CssWheel({ size = 420 }: { size?: number }) {
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size, perspective: 900 }} aria-hidden>
      <div className="css-wheel relative rounded-full border-[6px] border-amber shadow-[0_0_60px_var(--amber),inset_0_0_40px_var(--amber)]" style={{ width: size * 0.72, height: size * 0.72 }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className="absolute left-1/2 top-1/2 h-0.5 w-1/2 origin-left bg-amber/80" style={{ transform: `rotate(${(i / 7) * 360}deg)` }} />
        ))}
        <span className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber shadow-[0_0_30px_var(--amber)]" />
        {layers.map((l, i) => (
          <span
            key={l.key}
            className="absolute left-1/2 top-1/2 size-4 rounded-full"
            style={{ background: layerColor[l.key], boxShadow: `0 0 16px ${layerColor[l.key]}`, transform: `rotate(${(i / 6) * 360}deg) translateX(${size * 0.46}px)` }}
          />
        ))}
      </div>
    </div>
  )
}
