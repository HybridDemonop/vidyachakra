import { Hero, Navbar } from '@/components/landing/hero'
import { Converge, Problem, Verbs } from '@/components/landing/problem'
import { LayersGrid, LoopDiagram } from '@/components/landing/layers-loop'
import { Closing, Comparison, Footer, Impact, Ripples } from '@/components/landing/ripples-impact'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Converge />
        <Verbs />
        <LayersGrid />
        <LoopDiagram />
        <Ripples />
        <Comparison />
        <Impact />
        <Closing />
      </main>
      <Footer />
    </>
  )
}
