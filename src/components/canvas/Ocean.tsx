'use client'

import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GRID_SEGMENTS = 96
const OCEAN_SIZE = 220

/**
 * Phase 0 placeholder ocean: CPU-displaced low-poly waves with flat shading.
 * Replaced by a GPU Gerstner-wave shader in Phase 1 (see docs/PLAN.md).
 */
export function Ocean() {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(OCEAN_SIZE, OCEAN_SIZE, GRID_SEGMENTS, GRID_SEGMENTS)
    g.rotateX(-Math.PI / 2)
    return g
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pos = geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const y =
        Math.sin(x * 0.14 + t * 0.9) * 0.7 +
        Math.cos(z * 0.11 + t * 0.6) * 0.85 +
        Math.sin((x + z) * 0.07 + t * 0.4) * 0.4
      pos.setY(i, y)
    }
    pos.needsUpdate = true
  })

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#2E63A4" flatShading roughness={0.45} metalness={0.02} />
    </mesh>
  )
}
