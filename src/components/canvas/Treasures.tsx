'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { TREASURE_SPOTS } from '@/content/treasures'
import { getWaveHeight } from '@/lib/waves'
import { useShipStore } from '@/stores/ship'
import { useWorldStore } from '@/stores/world'
import { useProgress } from '@/stores/progress'

const COLLECT_RADIUS = 5

/**
 * Treasure barrels adrift between the islands: a toon barrel riding the same
 * Gerstner field as the ship, crowned by a glowing berry coin and a faint
 * gold shaft so hunters can spot them from a distance. Sail through one to
 * haul it aboard (+฿90,000,000).
 */
export function Treasures() {
  const groupRefs = useRef<(THREE.Group | null)[]>([])
  // Re-render only when the collected list changes
  const collected = useProgress((s) => s.treasures)

  const shared = useMemo(
    () => ({
      wood: new THREE.MeshToonMaterial({ color: '#8A5A2B' }),
      band: new THREE.MeshToonMaterial({ color: '#D9A441' }),
      shaft: new THREE.MeshBasicMaterial({
        color: new THREE.Color(2.2, 1.8, 0.5),
        transparent: true,
        opacity: 0.14,
        side: THREE.DoubleSide,
        depthWrite: false,
        toneMapped: false,
      }),
      barrel: new THREE.CylinderGeometry(0.62, 0.52, 1.25, 10),
      ring: new THREE.TorusGeometry(0.62, 0.06, 6, 14),
      disc: new THREE.CylinderGeometry(0.34, 0.34, 0.1, 12),
      beam: new THREE.CylinderGeometry(0.28, 0.55, 9, 8, 1, true),
    }),
    []
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const ship = useShipStore.getState().position
    const world = useWorldStore.getState()
    const progress = useProgress.getState()

    TREASURE_SPOTS.forEach((spot, i) => {
      const group = groupRefs.current[i]
      if (!group || !group.visible) return
      const [x, z] = spot.position
      group.position.y = getWaveHeight(x, z, t) - 0.15
      group.rotation.y = t * 0.6 + i
      group.rotation.z = Math.sin(t * 1.3 + i * 2.1) * 0.08

      if (
        world.voyageStarted &&
        !world.launching &&
        Math.hypot(ship.x - x, ship.z - z) < COLLECT_RADIUS
      ) {
        progress.collectTreasure(spot.id)
      }
    })
  })

  return (
    <>
      {TREASURE_SPOTS.map((spot, i) => {
        if (collected.includes(spot.id)) return null
        return (
          <group
            key={spot.id}
            position={[spot.position[0], 0, spot.position[1]]}
            ref={(el) => {
              groupRefs.current[i] = el
            }}
          >
            <mesh geometry={shared.barrel} material={shared.wood} position={[0, 0.55, 0]} />
            <mesh
              geometry={shared.ring}
              material={shared.band}
              position={[0, 0.85, 0]}
              rotation-x={Math.PI / 2}
            />
            <mesh
              geometry={shared.ring}
              material={shared.band}
              position={[0, 0.35, 0]}
              rotation-x={Math.PI / 2}
            />
            <mesh geometry={shared.disc} position={[0, 1.35, 0]}>
              <meshBasicMaterial color={[3.4, 2.6, 0.8]} toneMapped={false} />
            </mesh>
            <mesh geometry={shared.beam} material={shared.shaft} position={[0, 5, 0]} />
          </group>
        )
      })}
    </>
  )
}
