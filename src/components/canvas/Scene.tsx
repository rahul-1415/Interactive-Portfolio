'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Ocean } from './Ocean'
import { Ship } from './Ship'
import { Islands } from './Islands'
import { FollowCamera } from './FollowCamera'
import { SkyDome } from './SkyDome'
import { Effects } from './Effects'

export default function Scene() {
  return (
    <div className="scene-root">
      <Canvas
        camera={{ position: [0, 8, -18], fov: 50, near: 0.1, far: 700 }}
        dpr={[1, 2]}
        gl={{ antialias: false, stencil: false, powerPreference: 'high-performance' }}
      >
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
        <Effects />
      </Canvas>
    </div>
  )
}
