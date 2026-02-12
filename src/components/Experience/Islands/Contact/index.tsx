import { GenericIsland } from '../components/GenericIsland'
import { IslandMeta, islandById } from '../islandRegistry'

type ContactProps = {
  onIslandHover?: (island: IslandMeta) => void
  onIslandBlur?: () => void
  onIslandClick: () => void
}

export const Contact = ({ onIslandHover, onIslandBlur, onIslandClick }: ContactProps) => {
  return (
    <GenericIsland
      island={islandById.contact}
      objectUrl='/assets/islands/king_one_piece/scene.gltf'
      islandNumber={1}
      rotationY={Math.PI}
      objectScale={3}
      onClickObject={onIslandClick}
      colliders='trimesh'
      onHoverIsland={onIslandHover}
      onBlurIsland={onIslandBlur}
    />
  )
}
