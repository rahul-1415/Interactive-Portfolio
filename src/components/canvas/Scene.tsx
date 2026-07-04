'use client'

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { useWorldStore } from '@/stores/world'
import { Ocean } from './Ocean'
import { Ship } from './Ship'
import { Islands } from './Islands'
import { FollowCamera } from './FollowCamera'
import { SkyDome } from './SkyDome'
import { Effects } from './Effects'

const isMobile = typeof window !== 'undefined' && window.matchMedia?.('(max-width: 820px)').matches

export default function Scene() {
  // Adaptive resolution: start modest, let PerformanceMonitor raise/lower the
  // pixel ratio with built-in hysteresis.
  const [dpr, setDpr] = useState(isMobile ? 1 : 1.5)

  // The render loop stays idle behind the "Set Sail" gate — no point burning the
  // main thread animating a scene the loading overlay is covering. It flips to
  // 'always' once the voyage begins. This keeps the pre-sail page cheap (big
  // Lighthouse/TTI win) without affecting the live experience.
  const voyageStarted = useWorldStore((s) => s.voyageStarted)

  return (
    <div className="scene-root">
      <Canvas
        camera={{ position: [0, 8, -18], fov: 50, near: 0.1, far: 700 }}
        dpr={dpr}
        frameloop={voyageStarted ? 'always' : 'demand'}
        gl={{ antialias: false, stencil: false, powerPreference: 'high-performance' }}
      >
        <PerformanceMonitor
          onIncline={() => setDpr(Math.min(isMobile ? 1.5 : 2, dpr + 0.5))}
          onDecline={() => setDpr(Math.max(1, dpr - 0.5))}
        />
        <fog attach="fog" args={['#cfeaf7', 70, 240]} />
        <SkyDome />
        <ambientLight intensity={0.65} color="#dff3ff" />
        <directionalLight position={[45, 70, -35]} intensity={1.7} color="#fff4d6" />
        <Ocean />
        <Suspense fallback={null}>
          <Ship />
          <Islands />
        </Suspense>
        <FollowCamera />
        <Effects mobile={isMobile} />
      </Canvas>
    </div>
  )
}
