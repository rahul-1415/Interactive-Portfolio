import { GenericIsland } from '../components/GenericIsland'
import { IslandMeta, islandById } from '../islandRegistry'

type CapRagProps = {
  onIslandHover?: (island: IslandMeta) => void
  onIslandBlur?: () => void
  onIslandClick: () => void
}

export const CapRag = ({ onIslandHover, onIslandBlur, onIslandClick }: CapRagProps) => {
  return (
    <GenericIsland
      island={islandById.caprag}
      objectUrl='/assets/one_piece_straw_hat_2_years/scene.gltf'
      islandNumber={2}
      rotationY={-Math.PI / 8}
      objectScale={1}
      onClickObject={onIslandClick}
      onHoverIsland={onIslandHover}
      onBlurIsland={onIslandBlur}
    />
  )
}
