import { GenericIsland } from '../components/GenericIsland'
import { IslandMeta, islandById } from '../islandRegistry'

type ProjectsProps = {
  onIslandHover?: (island: IslandMeta) => void
  onIslandBlur?: () => void
  onIslandClick: () => void
}

export const Projects = ({ onIslandHover, onIslandBlur, onIslandClick }: ProjectsProps) => {
  return (
    <GenericIsland
      island={islandById.projects}
      objectUrl='/assets/goingMerry/scene.gltf'
      islandNumber={2}
      rotationY={Math.PI / 4}
      objectScale={1.5}
      onClickObject={onIslandClick}
      onHoverIsland={onIslandHover}
      onBlurIsland={onIslandBlur}
    />
  )
}
