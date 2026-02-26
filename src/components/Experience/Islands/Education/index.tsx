import { GenericIsland } from '../components/GenericIsland'
import { IslandMeta, islandById } from '../islandRegistry'

type EducationProps = {
  onIslandHover?: (island: IslandMeta) => void
  onIslandBlur?: () => void
  onIslandClick: () => void
}

export const Education = ({ onIslandHover, onIslandBlur, onIslandClick }: EducationProps) => {
  return (
    <GenericIsland
      island={islandById.education}
      objectUrl='/assets/islands/king_one_piece/scene.gltf'
      islandNumber={1}
      rotationY={Math.PI}
      objectScale={3}
      colliders='trimesh'
      onClickObject={onIslandClick}
      onHoverIsland={onIslandHover}
      onBlurIsland={onIslandBlur}
    />
  )
}
