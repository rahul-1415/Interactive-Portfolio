'use client'

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { useWorldStore } from '@/stores/world'
import { useSettings } from '@/stores/settings'
import { Ocean } from './Ocean'
import { DockMarkers } from './DockMarkers'
import { Ship } from './Ship'
import { Islands } from './Islands'
import { FollowCamera } from './FollowCamera'
import { SkyDome } from './SkyDome'
import { Effects } from './Effects'

const isMobile = typeof window !== 'undefined' && window.matchMedia?.('(max-width: 820px)').matches

export default function Scene() {
  // Adaptive resolution: start cheap (1.0), let PerformanceMonitor raise the
  // pixel ratio with built-in hysteresis once it sees headroom (auto mode).
  const [dpr, setDpr] = useState(1)

  // The render loop stays idle behind the "Set Sail" gate — no point burning the
  // main thread animating a scene the loading overlay is covering. It flips to
  // 'always' once the voyage begins. This keeps the pre-sail page cheap (big
  // Lighthouse/TTI win) without affecting the live experience.
  const voyageStarted = useWorldStore((s) => s.voyageStarted)
  const quality = useSettings((s) => s.quality)
  const effectiveDpr = quality === 'low' ? 1 : quality === 'high' ? (isMobile ? 1.5 : 2) : dpr
  const lowFx = quality === 'low' || isMobile

  return (
    <div className="scene-root">
      <Canvas
        // Starts exactly on the launch dolly mark (clear of the Sunny's stern)
        // so the camera never travels through her hull on the way there.
        camera={{ position: [-20, 10, -16], fov: 50, near: 0.1, far: 700 }}
        dpr={effectiveDpr}
        frameloop={voyageStarted ? 'always' : 'demand'}
        gl={{ antialias: false, stencil: false, powerPreference: 'high-performance' }}
      >
        {quality === 'auto' && (
          <PerformanceMonitor
            onIncline={() => setDpr(Math.min(isMobile ? 1.5 : 2, dpr + 0.5))}
            onDecline={() => setDpr(Math.max(1, dpr - 0.5))}
          />
        )}
        <fog attach="fog" args={['#cfeaf7', 70, 240]} />
        <SkyDome />
        <ambientLight intensity={0.65} color="#dff3ff" />
        <directionalLight position={[45, 70, -35]} intensity={1.7} color="#fff4d6" />
        <Ocean />
        <DockMarkers />
        <Suspense fallback={null}>
          <Ship />
          <Islands />
        </Suspense>
        <FollowCamera />
        <Effects mobile={lowFx} />
      </Canvas>
    </div>
  )
}
