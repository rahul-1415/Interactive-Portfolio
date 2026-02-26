import { GenericIsland } from '../components/GenericIsland'
import { IslandMeta, islandById } from '../islandRegistry'

type SkillsProps = {
  onIslandHover?: (island: IslandMeta) => void
  onIslandBlur?: () => void
  onIslandClick: () => void
}

export const Skills = ({ onIslandHover, onIslandBlur, onIslandClick }: SkillsProps) => {
  return (
    <GenericIsland
      island={islandById.skills}
      objectUrl='/assets/coffe.gltf'
      islandNumber={1}
      objectScale={1.7}
      onClickObject={onIslandClick}
      onHoverIsland={onIslandHover}
      onBlurIsland={onIslandBlur}
    />
  )
}
