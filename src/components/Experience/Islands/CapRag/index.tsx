import { useState } from 'react'
import { GenericModal } from '@App/components/GenericModal'
import { CapRagModal } from './CapRagModal'
import { GenericIsland } from '../components/GenericIsland'

export const CapRag = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <>
      <GenericIsland
        title='Climate Action Policy - RAG Application'
        objectUrl='/assets/one_piece_straw_hat_2_years/scene.gltf'
        islandNumber={2}
        position={[60, 0, -80]}
        rotationY={-Math.PI / 8}
        objectScale={1}
        onClickObject={handleOpenModal}
      />

      <GenericModal
        isOpen={isModalOpen}
        onCloseModal={handleCloseModal}
        isLoading={false}
      >
        <CapRagModal />
      </GenericModal>
    </>
  )
}
