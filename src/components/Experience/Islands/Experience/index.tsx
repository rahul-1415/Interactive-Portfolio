import { GenericIsland } from '../components/GenericIsland'
import { IslandMeta, islandById } from '../islandRegistry'

type ExperienceProps = {
  onIslandHover?: (island: IslandMeta) => void
  onIslandBlur?: () => void
  onIslandClick: () => void
}

export const Experience = ({ onIslandHover, onIslandBlur, onIslandClick }: ExperienceProps) => {
  return (
    <GenericIsland
      island={islandById.experience}
      objectUrl='/assets/coffe.gltf'
      islandNumber={1}
      onClickObject={onIslandClick}
      onHoverIsland={onIslandHover}
      onBlurIsland={onIslandBlur}
    />
  )
}
