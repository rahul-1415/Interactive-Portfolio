'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ISLANDS } from '@/content/islands'
import { useWorldStore } from '@/stores/world'

/**
 * In-world docking guidance: a faint accent ring on the water at each island's
 * dock radius, flaring gold and pulsing when the ship is inside it, plus a
 * light-beam beacon over the dockable island.
 */
export function DockMarkers() {
  const ringRefs = useRef<(THREE.Mesh | null)[]>([])
  const beaconRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const { nearIsland, docked } = useWorldStore.getState()

    ISLANDS.forEach((island, i) => {
      const ring = ringRefs.current[i]
      if (!ring) return
      const isNear = island.id === nearIsland
      const material = ring.material as THREE.MeshBasicMaterial
      material.opacity = isNear ? 0.55 + 0.25 * Math.sin(t * 5) : 0.16
      material.color.set(isNear ? '#FFCE00' : island.accent)
    })

    const beacon = beaconRef.current
    if (beacon) {
      const island = ISLANDS.find((i) => i.id === nearIsland)
      // The Sunny needs no beacon — she is her own landmark, and the beam
      // would spear through her masts.
      if (island && island.id !== 'home' && !docked) {
        beacon.visible = true
        beacon.position.set(island.position[0], 13, island.position[1])
        const material = beacon.material as THREE.MeshBasicMaterial
        material.opacity = 0.22 + 0.1 * Math.sin(t * 5)
      } else {
        beacon.visible = false
      }
    }
  })

  return (
    <>
      {ISLANDS.map((island, i) =>
        // No ring around home: the hull (52u long) crosses its dock circle.
        island.id === 'home' ? null : (
          <mesh
            key={island.id}
            ref={(el) => {
              ringRefs.current[i] = el
            }}
            position={[island.position[0], 0.3, island.position[1]]}
            rotation-x={-Math.PI / 2}
          >
            <ringGeometry args={[island.dockRadius - 1, island.dockRadius, 64]} />
            <meshBasicMaterial
              color={island.accent}
              transparent
              opacity={0.16}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        )
      )}
      <mesh ref={beaconRef} visible={false}>
        <cylinderGeometry args={[0.8, 1.8, 26, 12, 1, true]} />
        <meshBasicMaterial
          color={[2.6, 2.1, 0.6]}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </>
  )
}
