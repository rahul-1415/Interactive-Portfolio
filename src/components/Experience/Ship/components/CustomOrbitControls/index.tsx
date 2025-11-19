import { OrbitControls } from '@react-three/drei'
import { useModal } from '@App/core/context/ModalContext'

export const CustomOrbitControls = () => {
  const { isModalOpen } = useModal()

  return (
    <OrbitControls
      minDistance={60}
      maxDistance={150}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2.5}
      enabled={!isModalOpen}
    />
  )
}
