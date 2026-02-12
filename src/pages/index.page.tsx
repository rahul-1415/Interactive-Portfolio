import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Head from 'next/head'
import { Suspense, useEffect, useState } from 'react'
import { Experience } from '@App/components/Experience'
import { IslandId, IslandMeta } from '@App/components/Experience/Islands/islandRegistry'
import { SceneHud } from '@App/components/Experience/SceneHud'
import { IslandModalHub } from '@App/components/IslandModalHub'
import { SplashScreen } from '@App/components/Loading'
import { keyboardMap } from '@App/core/utils/keyboardMap'

const blockedCodes = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Space'
])
const blockedKeys = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  ' '
])

export default function Home (): JSX.Element {
  const [shipPosition, setShipPosition] = useState<[number, number, number]>([0, 0, 40])
  const [hoveredIsland, setHoveredIsland] = useState<IslandMeta | null>(null)
  const [activeIslandModal, setActiveIslandModal] = useState<IslandId | null>(null)
  const isModalOpen = activeIslandModal !== null

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (!blockedCodes.has(event.code) && !blockedKeys.has(event.key)) return

      event.preventDefault()
    }

    window.addEventListener('keydown', handleKeydown, { passive: false, capture: true })
    document.addEventListener('keydown', handleKeydown, { passive: false, capture: true })

    return () => {
      window.removeEventListener('keydown', handleKeydown, { capture: true })
      document.removeEventListener('keydown', handleKeydown, { capture: true })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Rahul Babu | Interactive Portfolio</title>
      </Head>

      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows
          dpr={[1, 1.85]}
          camera={{
            fov: 43,
            near: 0.1,
            far: 2600,
            position: [0, 40, 120]
          }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={<SplashScreen />}>
            <Experience
              onShipPositionChange={setShipPosition}
              onIslandHoverChange={setHoveredIsland}
              onIslandClick={setActiveIslandModal}
              isModalOpen={isModalOpen}
            />
          </Suspense>
        </Canvas>
      </KeyboardControls>

      <SceneHud
        shipPosition={shipPosition}
        hoveredIsland={hoveredIsland}
        isModalOpen={isModalOpen}
      />

      <IslandModalHub
        activeIsland={activeIslandModal}
        onClose={() => setActiveIslandModal(null)}
      />
    </>
  )
}
