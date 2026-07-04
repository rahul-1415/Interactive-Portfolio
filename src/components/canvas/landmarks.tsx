'use client'

import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { normalizeModel } from '@/lib/normalizeModel'
import type { SectionId } from '@/content/islands'

/*
 * Landmark silhouettes per island — original stylized primitives, cel-toned to
 * match the ocean. Each is authored to read at a distance as its DESIGN.md
 * identity: galley ship, shipyard cranes, giant tree, press balloon, fortress,
 * lighthouse.
 */

function useNormalizedGLTF(url: string, targetLength: number) {
  const { scene } = useGLTF(url)
  return useMemo(() => normalizeModel(scene, targetLength), [scene, targetLength])
}

function FloatingGalley() {
  // The Moby Dick whale-ship stands in beautifully for a Baratie-style
  // floating restaurant.
  const model = useNormalizedGLTF('/models/moby-dick.glb', 26)
  return (
    <group>
      <primitive object={model} position={[0, -0.6, 0]} rotation-y={0.6} />
      {/* Lantern glow for bloom to catch */}
      <mesh position={[0, 9, 0]}>
        <sphereGeometry args={[0.7, 12, 12]} />
        <meshBasicMaterial color={[3.2, 2.4, 0.9]} toneMapped={false} />
      </mesh>
    </group>
  )
}

function DockDistrict() {
  const sunny = useNormalizedGLTF('/models/thousand-sunny.glb', 18)
  return (
    <group>
      {/* Flagship launched in the harbor */}
      <primitive object={sunny} position={[10, -0.4, -6]} rotation-y={-0.9} />
      {/* Drydock gantry cranes */}
      {[-6, 0, 6].map((x, i) => (
        <group key={i} position={[x, 0, 4]}>
          <mesh position={[0, 6, 0]}>
            <boxGeometry args={[0.9, 12, 0.9]} />
            <meshToonMaterial color="#AF6528" />
          </mesh>
          <mesh position={[2.4, 11.2, 0]}>
            <boxGeometry args={[6, 0.7, 0.7]} />
            <meshToonMaterial color="#8A4E1E" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function KnowledgeTree() {
  return (
    <group>
      <mesh position={[0, 9, 0]}>
        <cylinderGeometry args={[3.2, 5.2, 18, 10]} />
        <meshToonMaterial color="#7A5230" />
      </mesh>
      {(
        [
          [0, 20, 0, 11],
          [-6, 17, 3, 7],
          [6, 18, -2, 8],
        ] as const
      ).map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[r, 12, 10]} />
          <meshToonMaterial color="#5C8A3C" />
        </mesh>
      ))}
    </group>
  )
}

function PressBalloon() {
  return (
    <group>
      <mesh position={[0, 22, 0]}>
        <sphereGeometry args={[8, 16, 14]} />
        <meshToonMaterial color="#C63D2F" />
      </mesh>
      <mesh position={[0, 22, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[8.02, 0.35, 8, 24]} />
        <meshToonMaterial color="#EFE0B9" />
      </mesh>
      <mesh position={[0, 12.5, 0]}>
        <boxGeometry args={[4.5, 3, 4.5]} />
        <meshToonMaterial color="#AF6528" />
      </mesh>
      {/* Rigging */}
      {[-1.8, 1.8].map((x, i) => (
        <mesh key={i} position={[x, 17.5, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 8]} />
          <meshToonMaterial color="#4B3621" />
        </mesh>
      ))}
    </group>
  )
}

function FortMeridian() {
  return (
    <group>
      <mesh position={[0, 4, 0]}>
        <cylinderGeometry args={[9, 10.5, 8, 12]} />
        <meshToonMaterial color="#8C93A8" />
      </mesh>
      <mesh position={[0, 9.5, 0]}>
        <cylinderGeometry args={[6, 7, 5, 10]} />
        <meshToonMaterial color="#7A8199" />
      </mesh>
      {/* Crenellations */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 8.8, 8.6, Math.sin(a) * 8.8]}>
            <boxGeometry args={[1.6, 1.4, 1.6]} />
            <meshToonMaterial color="#8C93A8" />
          </mesh>
        )
      })}
      <mesh position={[0, 13.5, 0]}>
        <coneGeometry args={[2.2, 4, 8]} />
        <meshToonMaterial color="#5B6B8C" />
      </mesh>
    </group>
  )
}

function TwinCapeLight() {
  return (
    <group>
      {/* Red/white banded tower */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, 2 + i * 4, 0]}>
          <cylinderGeometry args={[2.4 - i * 0.25, 2.65 - i * 0.25, 4, 12]} />
          <meshToonMaterial color={i % 2 === 0 ? '#D70000' : '#F2F9FF'} />
        </mesh>
      ))}
      <mesh position={[0, 19, 0]}>
        <cylinderGeometry args={[1.6, 1.9, 2.6, 10]} />
        <meshToonMaterial color="#4B3621" />
      </mesh>
      {/* The beacon — hot for bloom */}
      <mesh position={[0, 19, 0]}>
        <sphereGeometry args={[1.1, 12, 12]} />
        <meshBasicMaterial color={[4, 3.2, 1.2]} toneMapped={false} />
      </mesh>
      <mesh position={[0, 21.2, 0]}>
        <coneGeometry args={[2, 2, 12]} />
        <meshToonMaterial color="#D70000" />
      </mesh>
    </group>
  )
}

export const LANDMARKS: Record<SectionId, () => React.JSX.Element> = {
  experience: FloatingGalley,
  projects: DockDistrict,
  education: KnowledgeTree,
  publications: PressBalloon,
  certifications: FortMeridian,
  contact: TwinCapeLight,
}

useGLTF.preload('/models/moby-dick.glb')
useGLTF.preload('/models/thousand-sunny.glb')
