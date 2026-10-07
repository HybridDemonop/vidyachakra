'use client'

import dynamic from 'next/dynamic'
import { Component, useSyncExternalStore, type ReactNode } from 'react'
import { CssWheel } from './wheel-3d-fallback'

const Wheel3D = dynamic(() => import('./wheel-3d'), { ssr: false, loading: () => <CssWheel /> })

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? <CssWheel /> : this.props.children
  }
}

let cached: boolean | null = null
function canUseWebGL() {
  if (cached !== null) return cached
  try {
    const c = document.createElement('canvas')
    cached = !!(c.getContext('webgl2') || c.getContext('webgl')) && window.innerWidth >= 640
  } catch {
    cached = false
  }
  return cached
}

export function Wheel() {
  const webgl = useSyncExternalStore(
    () => () => {},
    canUseWebGL,
    () => false,
  )
  return (
    <div className="grid size-full place-items-center">
      {webgl ? (
        <Boundary>
          <Wheel3D />
        </Boundary>
      ) : (
        <CssWheel />
      )}
    </div>
  )
}
