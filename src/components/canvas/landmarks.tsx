'use client'

import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import type { SectionId } from '@/content/islands'

/*
 * Landmark silhouettes per island — original stylized primitives, cel-toned to
 * match the ocean. Each is authored to read at a distance as its DESIGN.md
 * identity: galley ship, shipyard cranes, giant tree, press balloon, fortress,
 * lighthouse.
 */

function FloatingGalley() {
  // Baratie-inspired floating restaurant, built from cel-toned primitives:
  // a moored barge carrying a two-tier dining rotunda under red awnings,
  // with the house's grinning fish figurehead at the bow.
  return (
    <group rotation-y={0.85}>
      {/* Barge hull + gunwale rim */}
      <mesh position={[0, 1.9, 0]}>
        <boxGeometry args={[20, 2.6, 9]} />
        <meshToonMaterial color="#8A4E1E" />
      </mesh>
      <mesh position={[0, 3.35, 0]}>
        <boxGeometry args={[21.4, 0.7, 10]} />
        <meshToonMaterial color="#AF6528" />
      </mesh>
      {/* Dining rotunda — two tiers under red awnings */}
      <mesh position={[-2, 6.1, 0]}>
        <cylinderGeometry args={[6.2, 7, 5, 12]} />
        <meshToonMaterial color="#F0E6C8" />
      </mesh>
      <mesh position={[-2, 8.85, 0]}>
        <coneGeometry args={[7.7, 1.7, 12]} />
        <meshToonMaterial color="#C63D2F" />
      </mesh>
      <mesh position={[-2, 9.7, 0]}>
        <cylinderGeometry args={[5.1, 5.1, 0.5, 12]} />
        <meshToonMaterial color="#D9A441" />
      </mesh>
      <mesh position={[-2, 10.3, 0]}>
        <cylinderGeometry args={[4.2, 5, 3, 12]} />
        <meshToonMaterial color="#E8DBB5" />
      </mesh>
      <mesh position={[-2, 12.35, 0]}>
        <coneGeometry args={[5.5, 1.6, 12]} />
        <meshToonMaterial color="#C63D2F" />
      </mesh>
      {/* Portholes around the lower tier */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2
        return (
          <mesh key={i} position={[-2 + Math.cos(a) * 6.6, 6.2, Math.sin(a) * 6.6]}>
            <boxGeometry args={[0.7, 1.1, 0.7]} />
            <meshToonMaterial color="#4B3621" />
          </mesh>
        )
      })}
      {/* Fish figurehead: head, snout, dorsal and side fins, wide eyes */}
      <group position={[11.2, 4.9, 0]}>
        <mesh>
          <sphereGeometry args={[3, 12, 10]} />
          <meshToonMaterial color="#3E9E9E" />
        </mesh>
        <mesh position={[2.6, -0.5, 0]} rotation-z={-Math.PI / 2}>
          <coneGeometry args={[1.5, 2.6, 10]} />
          <meshToonMaterial color="#D9A441" />
        </mesh>
        <mesh position={[-0.4, 2.7, 0]} rotation-z={0.5}>
          <coneGeometry args={[0.9, 2.2, 8]} />
          <meshToonMaterial color="#2F7B7B" />
        </mesh>
        {[1, -1].map((s) => (
          <group key={s}>
            <mesh position={[0.4, 0.1, s * 2.8]} rotation-x={s * 0.9}>
              <coneGeometry args={[0.8, 2, 8]} />
              <meshToonMaterial color="#2F7B7B" />
            </mesh>
            <mesh position={[1.6, 0.9, s * 1.9]}>
              <sphereGeometry args={[0.55, 10, 8]} />
              <meshToonMaterial color="#F2F9FF" />
            </mesh>
            <mesh position={[2.05, 0.9, s * 2.05]}>
              <sphereGeometry args={[0.24, 8, 6]} />
              <meshToonMaterial color="#1A1A1A" />
            </mesh>
          </group>
        ))}
      </group>
      {/* Stern lantern — hot for bloom */}
      <mesh position={[-9.5, 5.4, 0]}>
        <sphereGeometry args={[0.6, 12, 12]} />
        <meshBasicMaterial color={[3.2, 2.4, 0.9]} toneMapped={false} />
      </mesh>
      <mesh position={[-9.5, 4.2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 2.2]} />
        <meshToonMaterial color="#4B3621" />
      </mesh>
    </group>
  )
}

function HomeSunny() {
  // The Thousand Sunny at anchor — the voyage's home port. The Mini Merry
  // launches from her soldier dock at the start. The baked GLB is authored in
  // world space around the origin (hull center ≈ (0.3, 2.3), matching the
  // SUNNY_HULL collider), so it renders verbatim: the island group sits at
  // (0, 2) and this offset cancels it.
  const { scene } = useGLTF('/models/thousand-sunny.glb')
  const sunny = useMemo(() => scene.clone(true), [scene])
  return (
    <group position={[0, 0, -2]}>
      <primitive object={sunny} />
      {/* Masthead lantern for bloom */}
      <mesh position={[0.3, 33.5, 2.3]}>
        <sphereGeometry args={[0.55, 12, 12]} />
        <meshBasicMaterial color={[3.2, 2.6, 1.0]} toneMapped={false} />
      </mesh>
    </group>
  )
}

function DockDistrict() {
  // Galley-La-style working shipyard: a stone dry-dock basin with a hull
  // taking shape on the slipway, a gantry crane mid-lift, the company tower
  // watching over the yard, and timber staged around the works.
  return (
    <group rotation-y={1.15}>
      {/* Dry-dock basin: quay walls + head wall + plank slipway */}
      <mesh position={[0, 1.4, -6]}>
        <boxGeometry args={[24, 2.8, 3]} />
        <meshToonMaterial color="#8C93A8" />
      </mesh>
      <mesh position={[0, 1.4, 6]}>
        <boxGeometry args={[24, 2.8, 3]} />
        <meshToonMaterial color="#8C93A8" />
      </mesh>
      <mesh position={[-12, 1.4, 0]}>
        <boxGeometry args={[3, 2.8, 15]} />
        <meshToonMaterial color="#7A8199" />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[24, 0.6, 9]} />
        <meshToonMaterial color="#6E4320" />
      </mesh>
      {/* Hull under construction: keel, stem/stern posts, parabolic ribs */}
      <group position={[-1, 0, 0]}>
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[15, 0.9, 1.2]} />
          <meshToonMaterial color="#8A4E1E" />
        </mesh>
        {[1, -1].map((s) => (
          <mesh key={s} position={[s * 7.6, 2.6, 0]} rotation-z={s * -0.35}>
            <boxGeometry args={[0.9, 3.4, 1]} />
            <meshToonMaterial color="#8A4E1E" />
          </mesh>
        ))}
        {[-6, -4, -2, 0, 2, 4, 6].map((x, i) => (
          <mesh key={i} position={[x, 2, 0]} rotation-x={Math.PI / 2}>
            <torusGeometry args={[3.4 - Math.abs(x) * 0.18, 0.26, 6, 12, Math.PI]} />
            <meshToonMaterial color="#AF6528" />
          </mesh>
        ))}
      </group>
      {/* Gantry crane mid-lift: legs, braces, cross beam, rope, plank load */}
      <group position={[4, 0, 0]}>
        {[1, -1].map((s) => (
          <group key={s}>
            <mesh position={[0, 6.5, s * 6.5]}>
              <boxGeometry args={[1, 13, 1]} />
              <meshToonMaterial color="#AF6528" />
            </mesh>
            <mesh position={[0, 3.4, s * 5]} rotation-x={s * 0.45}>
              <boxGeometry args={[0.7, 7, 0.7]} />
              <meshToonMaterial color="#8A4E1E" />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 13.2, 0]}>
          <boxGeometry args={[1.3, 1.1, 15]} />
          <meshToonMaterial color="#8A4E1E" />
        </mesh>
        <mesh position={[0, 10.6, 1.5]}>
          <cylinderGeometry args={[0.07, 0.07, 4.4]} />
          <meshToonMaterial color="#4B3621" />
        </mesh>
        <mesh position={[0, 8.2, 1.5]} rotation-y={0.3}>
          <boxGeometry args={[4.2, 0.9, 1.4]} />
          <meshToonMaterial color="#D9A441" />
        </mesh>
      </group>
      {/* Galley-La company tower keeping watch over the yard */}
      <group position={[7, 0, -10]}>
        <mesh position={[0, 3.4, 0]}>
          <cylinderGeometry args={[3.2, 3.9, 6.8, 10]} />
          <meshToonMaterial color="#F0E6C8" />
        </mesh>
        <mesh position={[0, 8.4, 0]}>
          <cylinderGeometry args={[2.2, 2.7, 3.6, 10]} />
          <meshToonMaterial color="#E8DBB5" />
        </mesh>
        <mesh position={[0, 11.6, 0]}>
          <coneGeometry args={[2.9, 2.8, 10]} />
          <meshToonMaterial color="#3E9E9E" />
        </mesh>
        {/* Work lantern — hot for bloom */}
        <mesh position={[0, 13.4, 0]}>
          <sphereGeometry args={[0.55, 12, 12]} />
          <meshBasicMaterial color={[3.0, 2.4, 0.9]} toneMapped={false} />
        </mesh>
      </group>
      {/* Staged timber and stores */}
      {(
        [
          [9, 5, 0.5],
          [9.5, 5.8, -0.4],
        ] as const
      ).map(([x, z, rot], i) => (
        <group key={i} position={[x, 0, z]} rotation-y={rot}>
          {[0, 1, 2].map((j) => (
            <mesh
              key={j}
              position={[0, 0.9 + j * 0.62, j % 2 === 0 ? 0.35 : -0.35]}
              rotation-z={Math.PI / 2}
            >
              <cylinderGeometry args={[0.35, 0.35, 5.5, 8]} />
              <meshToonMaterial color={j % 2 === 0 ? '#AF6528' : '#8A4E1E'} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[-8, 1.1, 8.6]}>
        <boxGeometry args={[1.6, 1.6, 1.6]} />
        <meshToonMaterial color="#D9A441" />
      </mesh>
      <mesh position={[-6, 1, 8.9]}>
        <cylinderGeometry args={[0.6, 0.5, 1.4, 10]} />
        <meshToonMaterial color="#8A5A2B" />
      </mesh>
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
  // Rides low over the water so the balloon reads clearly from the deck.
  return (
    <group>
      <mesh position={[0, 14, 0]}>
        <sphereGeometry args={[7, 16, 14]} />
        <meshToonMaterial color="#C63D2F" />
      </mesh>
      <mesh position={[0, 14, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[7.02, 0.32, 8, 24]} />
        <meshToonMaterial color="#EFE0B9" />
      </mesh>
      <mesh position={[0, 4.6, 0]}>
        <boxGeometry args={[4.2, 2.8, 4.2]} />
        <meshToonMaterial color="#AF6528" />
      </mesh>
      {/* Rigging */}
      {[-1.7, 1.7].map((x, i) => (
        <mesh key={i} position={[x, 7.6, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 6.4]} />
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

function Onigashima() {
  // Kaido's skull island: a horned skull rising from a rocky shoulder, with a
  // firelit cave mouth for a gate. Purple banners mark the Beast's colors.
  return (
    <group rotation-y={0.6}>
      {/* Rocky shoulder */}
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[13, 8, 9]} />
        <meshToonMaterial color="#5E5566" />
      </mesh>
      {/* Skull dome */}
      <mesh position={[0, 10, 0]} scale={[1, 0.92, 0.95]}>
        <sphereGeometry args={[8, 14, 12]} />
        <meshToonMaterial color="#C9BFAF" />
      </mesh>
      {/* Jaw */}
      <mesh position={[0, 4.6, 3.4]}>
        <boxGeometry args={[9.5, 3.2, 5]} />
        <meshToonMaterial color="#B7AC9B" />
      </mesh>
      {/* Horns */}
      {[1, -1].map((s) => (
        <mesh key={s} position={[s * 6.4, 15.4, 0]} rotation-z={s * -0.85}>
          <coneGeometry args={[1.6, 7.5, 8]} />
          <meshToonMaterial color="#E8DBB5" />
        </mesh>
      ))}
      {/* Eye sockets */}
      {[1, -1].map((s) => (
        <mesh key={s} position={[s * 3, 11, 6.3]} scale={[1, 1.25, 0.6]}>
          <sphereGeometry args={[1.7, 10, 8]} />
          <meshToonMaterial color="#1A1A1A" />
        </mesh>
      ))}
      {/* Cave-mouth gate under the jaw, lit from within */}
      <mesh position={[0, 2.4, 6.2]}>
        <cylinderGeometry args={[2.6, 3, 4.6, 10, 1, false, 0, Math.PI]} />
        <meshToonMaterial color="#241C2E" />
      </mesh>
      <mesh position={[0, 2.6, 6]}>
        <sphereGeometry args={[0.7, 10, 8]} />
        <meshBasicMaterial color={[2.6, 1.4, 0.5]} toneMapped={false} />
      </mesh>
      {/* Beast banners */}
      {[1, -1].map((s) => (
        <group key={s} position={[s * 10.5, 0, 4]}>
          <mesh position={[0, 5, 0]}>
            <cylinderGeometry args={[0.14, 0.18, 10]} />
            <meshToonMaterial color="#4B3621" />
          </mesh>
          <mesh position={[s * 0.9, 8.6, 0]}>
            <boxGeometry args={[1.8, 2.6, 0.12]} />
            <meshToonMaterial color="#7B4FC0" />
          </mesh>
        </group>
      ))}
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
  home: HomeSunny,
  experience: FloatingGalley,
  projects: DockDistrict,
  education: KnowledgeTree,
  publications: PressBalloon,
  certifications: FortMeridian,
  contact: TwinCapeLight,
  skills: Onigashima,
}

useGLTF.preload('/models/thousand-sunny.glb')
