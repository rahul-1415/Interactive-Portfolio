'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import * as THREE from 'three'
import { isComplete, useProgress } from '@/stores/progress'

/**
 * Skypiea — the hidden sky island. Only reveals itself once the log is
 * complete (Pirate King): a bank of sea clouds high over the middle sea
 * carrying a slice of Upper Yard and the golden belfry of Shandora,
 * drifting gently. A pure reward — the crown jewel for 100% explorers.
 */

// Low enough that the chase camera (pitched at the sea, ~25° half-fov) frames
// her on the horizon from open water; sailing underneath she towers off-frame.
const ALTITUDE = 30
const POSITION: [number, number] = [55, 112]

const CLOUDS: [number, number, number, number][] = [
  // x, y, z, radius (local)
  [0, 0, 0, 9],
  [-8, -1, 3, 6.5],
  [8, -0.5, -2, 7],
  [3, -2, 6, 5.5],
  [-4, -2.5, -5, 5],
  [12, -2, 4, 4.5],
  [-12, -1.5, -1, 4.5],
]

export function Skypiea() {
  const groupRef = useRef<THREE.Group>(null)
  const visited = useProgress((s) => s.visited)
  const treasures = useProgress((s) => s.treasures)

  useFrame(({ clock }) => {
    const group = groupRef.current
    if (!group) return
    const t = clock.getElapsedTime()
    group.position.y = ALTITUDE + Math.sin(t * 0.25) * 1.4
    group.rotation.y = Math.sin(t * 0.05) * 0.08
  })

  if (!isComplete(visited.length, treasures.length)) return null

  return (
    <group ref={groupRef} position={[POSITION[0], ALTITUDE, POSITION[1]]}>
      {/* Sea-cloud bank */}
      {CLOUDS.map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[r, 12, 10]} />
          <meshToonMaterial color="#F6FBFF" />
        </mesh>
      ))}
      {/* Upper Yard — a slice of green on the clouds */}
      <mesh position={[0, 6.2, 0]}>
        <cylinderGeometry args={[7.5, 8.5, 2.6, 12]} />
        <meshToonMaterial color="#5C8A3C" />
      </mesh>
      {/* Giant beanstalk vine */}
      <mesh position={[-5, 11, -2]} rotation-z={0.12}>
        <cylinderGeometry args={[0.6, 0.9, 8, 8]} />
        <meshToonMaterial color="#3F6B2A" />
      </mesh>
      {/* The golden belfry of Shandora */}
      <group position={[2.5, 7.5, 0.5]}>
        {[1, -1].map((s) => (
          <mesh key={s} position={[s * 2.2, 2.6, 0]}>
            <boxGeometry args={[0.8, 5.2, 0.8]} />
            <meshToonMaterial color="#D9A441" />
          </mesh>
        ))}
        <mesh position={[0, 5.4, 0]}>
          <boxGeometry args={[5.6, 1, 1]} />
          <meshToonMaterial color="#D9A441" />
        </mesh>
        {/* The great bell — hot gold for bloom */}
        <mesh position={[0, 3.6, 0]}>
          <cylinderGeometry args={[1.15, 1.5, 2.2, 10]} />
          <meshBasicMaterial color={[2.8, 2.2, 0.7]} toneMapped={false} />
        </mesh>
      </group>
      <Billboard position={[0, 16, 0]}>
        <Text
          font="/fonts/bangers-regular.woff"
          fontSize={3}
          color="#1A1A1A"
          outlineWidth={0.12}
          outlineColor="#F6FBFF"
          anchorY="bottom"
        >
          Skypiea
        </Text>
        <Text
          font="/fonts/bangers-regular.woff"
          fontSize={1.2}
          color="#4B3621"
          outlineWidth={0.06}
          outlineColor="#F6FBFF"
          anchorY="bottom"
          position={[0, -1.6, 0]}
        >
          the sea above the sea — for the Pirate King alone
        </Text>
      </Billboard>
    </group>
  )
}
