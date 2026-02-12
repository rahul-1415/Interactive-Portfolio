import { Sky, Sparkles, Stars } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { Lights } from '../Lights'
import { Islands } from './Islands'
import { IslandId, IslandMeta } from './Islands/islandRegistry'
import { Ocean } from './Ocean'
import { Ship } from './Ship'

type ExperienceWorldProps = {
  onShipPositionChange?: (position: [number, number, number]) => void
  onIslandHoverChange?: (island: IslandMeta | null) => void
  onIslandClick: (islandId: IslandId) => void
  isModalOpen: boolean
}

const ExperienceWorld = ({
  onShipPositionChange,
  onIslandHoverChange,
  onIslandClick,
  isModalOpen
}: ExperienceWorldProps) => {
  return (
    <>
      <Islands
        onIslandClick={onIslandClick}
        onIslandHover={(island) => {
          onIslandHoverChange?.(island)
        }}
        onIslandBlur={() => {
          onIslandHoverChange?.(null)
        }}
      />

      <Ship
        isModalOpen={isModalOpen}
        onPositionChange={onShipPositionChange}
      />

      <Ocean />
    </>
  )
}

type ExperienceProps = {
  onShipPositionChange?: (position: [number, number, number]) => void
  onIslandHoverChange?: (island: IslandMeta | null) => void
  onIslandClick: (islandId: IslandId) => void
  isModalOpen: boolean
}

export const Experience = ({
  onShipPositionChange,
  onIslandHoverChange,
  onIslandClick,
  isModalOpen
}: ExperienceProps) => {
  return (
    <>
      <color args={['#e39158']} attach='background' />
      <fog attach='fog' args={['#e39158', 75, 430]} />

      <Sky
        distance={450000}
        sunPosition={[130, 40, -110]}
        inclination={0.52}
        azimuth={0.21}
        turbidity={8}
        rayleigh={0.65}
        mieCoefficient={0.013}
        mieDirectionalG={0.92}
      />

      <Stars
        radius={340}
        depth={140}
        count={1900}
        factor={4}
        saturation={0}
        fade
        speed={0.22}
      />

      <Sparkles
        count={180}
        scale={[440, 120, 440]}
        size={3}
        speed={0.16}
        opacity={0.28}
        color='#ffe6a7'
      />

      <Physics>
        <Lights />
        <ExperienceWorld
          onShipPositionChange={onShipPositionChange}
          onIslandHoverChange={onIslandHoverChange}
          onIslandClick={onIslandClick}
          isModalOpen={isModalOpen}
        />
      </Physics>
    </>
  )
}
