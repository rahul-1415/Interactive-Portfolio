import { GenericIsland } from '../components/GenericIsland'
import { IslandMeta, islandById } from '../islandRegistry'

type PublicationProps = {
  onIslandHover?: (island: IslandMeta) => void
  onIslandBlur?: () => void
  onIslandClick: () => void
}

export const Publication = ({ onIslandHover, onIslandBlur, onIslandClick }: PublicationProps) => {
  return (
    <GenericIsland
      island={islandById.publication}
      objectUrl='/assets/straw-hat.glb'
      islandNumber={2}
      rotationY={Math.PI * 0.5}
      objectScale={1.2}
      onClickObject={onIslandClick}
      onHoverIsland={onIslandHover}
      onBlurIsland={onIslandBlur}
    />
  )
}
