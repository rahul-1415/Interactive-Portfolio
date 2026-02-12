import { GenericIsland } from '../components/GenericIsland'
import { IslandMeta, islandById } from '../islandRegistry'

type AboutProps = {
  onIslandHover?: (island: IslandMeta) => void
  onIslandBlur?: () => void
  onIslandClick: () => void
}

export const About = ({ onIslandHover, onIslandBlur, onIslandClick }: AboutProps) => {
  return (
    <GenericIsland
      island={islandById.about}
      objectUrl='/assets/straw-hat.glb'
      islandNumber={2}
      onClickObject={onIslandClick}
      rotationY={Math.PI}
      objectScale={1}
      onHoverIsland={onIslandHover}
      onBlurIsland={onIslandBlur}
    />
  )
}
