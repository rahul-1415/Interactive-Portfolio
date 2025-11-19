import { useState } from 'react'
import { GenericModal } from '@App/components/GenericModal'
import { ContactModal } from './ContactModal'
import { GenericIsland } from '../components/GenericIsland'

export const Contact = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsContactModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsContactModalOpen(false)
  }

  return (
    <>
      <GenericIsland
        title='Contact'
        objectUrl='/assets/islands/king_one_piece/scene.gltf'
        islandNumber={1}
        position={[-20, 0, -90]}
        rotationY={Math.PI / 1}
        objectScale={3}
        onClickObject={handleOpenModal}
        colliders='trimesh'
      />

      <GenericModal
        isOpen={isContactModalOpen}
        onCloseModal={handleCloseModal}
        isLoading={false}
      >
        <ContactModal />
      </GenericModal>
    </>
  )
}
