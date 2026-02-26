import { GenericIsland } from '../components/GenericIsland'
import { IslandMeta, islandById } from '../islandRegistry'

type CertificationProps = {
  onIslandHover?: (island: IslandMeta) => void
  onIslandBlur?: () => void
  onIslandClick: () => void
}

export const Certification = ({
  onIslandHover,
  onIslandBlur,
  onIslandClick
}: CertificationProps) => {
  return (
    <GenericIsland
      island={islandById.certification}
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
