'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard, Text, useGLTF } from '@react-three/drei'
import { ISLANDS } from '@/content/islands'
import { normalizeModel } from '@/lib/normalizeModel'
import { useShipStore } from '@/stores/ship'
import { useWorldStore } from '@/stores/world'
import { LANDMARKS } from './landmarks'

function IslandBase({ variant, radius }: { variant: 0 | 1; radius: number }) {
  const { scene } = useGLTF(variant === 0 ? '/models/island-1.glb' : '/models/island-2.glb')
  // Base spans a bit beyond the landmark footprint
  const model = useMemo(() => normalizeModel(scene, radius * 2.4), [scene, radius])
  return <primitive object={model} position={[0, -1.2, 0]} />
}

export function Islands() {
  const lastNear = useRef<string | null>(null)

  // Proximity: nearest dockable island, written to the world store on change only
  useFrame(() => {
    const ship = useShipStore.getState().position
    let near: (typeof ISLANDS)[number] | null = null
    let best = Infinity
    for (const island of ISLANDS) {
      const dx = ship.x - island.position[0]
      const dz = ship.z - island.position[1]
      const d = Math.hypot(dx, dz)
      if (d < island.dockRadius && d < best) {
        best = d
        near = island
      }
    }
    const id = near?.id ?? null
    if (id !== lastNear.current) {
      lastNear.current = id
      useWorldStore.getState().setNearIsland(id)
    }
  })

  return (
    <>
      {ISLANDS.map((island, index) => {
        const Landmark = LANDMARKS[island.id]
        return (
          <group key={island.id} position={[island.position[0], 0, island.position[1]]}>
            {island.id !== 'publications' && (
              <IslandBase variant={(index % 2) as 0 | 1} radius={island.landRadius} />
            )}
            <Landmark />
            <Billboard position={[0, 30, 0]}>
              <Text
                font="/fonts/bangers-regular.woff"
                fontSize={3.4}
                color="#1A1A1A"
                outlineWidth={0.12}
                outlineColor="#EFE0B9"
                anchorY="bottom"
              >
                {island.name}
              </Text>
            </Billboard>
          </group>
        )
      })}
    </>
  )
}

useGLTF.preload('/models/island-1.glb')
useGLTF.preload('/models/island-2.glb')
