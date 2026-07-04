'use client'

import { Canvas } from '@react-three/fiber'
import { Ocean } from './Ocean'
import { CameraRig } from './CameraRig'
import { SkyDome } from './SkyDome'

export default function Scene() {
  return (
    <div className="scene-root">
      <Canvas
        camera={{ position: [0, 10, 26], fov: 50, near: 0.1, far: 400 }}
        dpr={[1, 2]}
        onCreated={({ camera }) => camera.lookAt(0, 0, -10)}
      >
        <fog attach="fog" args={['#cfeaf7', 70, 240]} />
        <SkyDome />
        <ambientLight intensity={0.6} color="#dff3ff" />
        <directionalLight position={[30, 45, -20]} intensity={1.7} color="#fff4d6" />
        <Ocean />
        <CameraRig />
      </Canvas>
    </div>
  )
}
