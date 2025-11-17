import { useState } from 'react'
import { GenericModal } from '@App/components/GenericModal'
import { GenericIsland } from '../components/GenericIsland'
import { ContactModal } from './ContactModal'

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
        rotationY={Math.PI / 2}
        objectScale={1.5}
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
