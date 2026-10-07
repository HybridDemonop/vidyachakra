'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { layerColor, layers } from '@/lib/mock-data'

function Dust({ count = 380 }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 3
      const a = Math.random() * Math.PI * 2
      p[i * 3] = Math.cos(a) * r
      p[i * 3 + 1] = (Math.random() - 0.5) * 3
      p[i * 3 + 2] = Math.sin(a) * r
    }
    return p
  }, [count])
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.03
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#F59E0B" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function Chakra() {
  const group = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)
  const orbit = useRef<THREE.Group>(null)
  useFrame((state, d) => {
    if (spin.current) spin.current.rotation.z -= d * 0.25
    if (orbit.current) orbit.current.rotation.z += d * 0.12
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -0.35 + state.pointer.y * 0.25, 0.05)
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0.35 + state.pointer.x * 0.4, 0.05)
    }
  })
  const amber = new THREE.Color('#F59E0B')
  return (
    <group ref={group}>
      <group ref={spin}>
        <mesh>
          <torusGeometry args={[1.6, 0.07, 32, 160]} />
          <meshStandardMaterial color={amber} emissive={amber} emissiveIntensity={0.9} toneMapped={false} metalness={0.6} roughness={0.25} />
        </mesh>
        <mesh>
          <torusGeometry args={[1.85, 0.008, 8, 200]} />
          <meshBasicMaterial color="#F4EEDC" transparent opacity={0.4} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.32, 0.05, 24, 80]} />
          <meshStandardMaterial color={amber} emissive={amber} emissiveIntensity={1.0} toneMapped={false} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.16, 32, 32]} />
          <meshStandardMaterial color="#fff2c7" emissive={amber} emissiveIntensity={0.6} toneMapped={false} />
        </mesh>
        {Array.from({ length: 7 }).map((_, i) => {
          const a = (i / 7) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * 0.96, Math.sin(a) * 0.96, 0]} rotation={[0, 0, a - Math.PI / 2]}>
              <cylinderGeometry args={[0.018, 0.03, 1.28, 12]} />
              <meshStandardMaterial color={amber} emissive={amber} emissiveIntensity={0.6} toneMapped={false} />
            </mesh>
          )
        })}
      </group>
      <group ref={orbit}>
        {layers.map((l, i) => {
          const a = (i / layers.length) * Math.PI * 2
          const c = layerColor[l.key]
          return (
            <Float key={l.key} speed={2} floatIntensity={0.4} rotationIntensity={0}>
              <group position={[Math.cos(a) * 2.35, Math.sin(a) * 2.35, 0]}>
                <mesh>
                  <sphereGeometry args={[0.11, 24, 24]} />
                  <meshStandardMaterial color={c} emissive={c} emissiveIntensity={1.2} toneMapped={false} />
                </mesh>
                <mesh>
                  <sphereGeometry args={[0.24, 24, 24]} />
                  <meshBasicMaterial color={c} transparent opacity={0.12} />
                </mesh>
                <Html center distanceFactor={7} style={{ pointerEvents: 'none' }} position={[0, -0.36, 0]}>
                  <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-cream/80">{l.title.split(' ')[0]}</span>
                </Html>
              </group>
            </Float>
          )
        })}
      </group>
    </group>
  )
}

export default function Wheel3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6.4], fov: 45 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }} aria-label="Rotating Vidyachakra wheel with six orbiting layers">
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 4]} intensity={30} color="#F59E0B" />
      <pointLight position={[-4, -2, 2]} intensity={20} color="#A78BFA" />
      <Chakra />
      <Dust />
    </Canvas>
  )
}
