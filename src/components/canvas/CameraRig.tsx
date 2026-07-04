'use client'

import { useFrame } from '@react-three/fiber'

/** Gentle idle bob so the sea feels alive even before ship controls land. */
export function CameraRig() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime()
    camera.position.y = 10 + Math.sin(t * 0.5) * 0.3
    camera.rotation.z = Math.sin(t * 0.3) * 0.008
  })
  return null
}
