import { useState } from 'react'
import { GenericModal } from '@App/components/GenericModal'
import { useGetProjectsLazyQuery } from '@App/core/graphql/queries.generated'
import { GenericIsland } from '../components/GenericIsland'
import { ProjectModal } from './ProjectModal'

export const Projects = () => {
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false)
  const [getProjects, { data, loading }] = useGetProjectsLazyQuery()

  const handleOpenModal = () => {
    setIsProjectsModalOpen(true)
    getProjects()
  }

  const handleCloseModal = () => {
    setIsProjectsModalOpen(false)
  }

  return (
    <>
      <GenericIsland
        title='Projects'
        objectUrl='/assets/goingMerry/scene.gltf'
        islandNumber={2}
        position={[-30, 0, -40]}
        rotationY={Math.PI / 4}
        objectScale={1.5}
        onClickObject={handleOpenModal}
      />

      <GenericModal
        isOpen={isProjectsModalOpen}
        onCloseModal={handleCloseModal}
        isLoading={loading}
      >
        <ProjectModal projects={data?.projects || []} />
      </GenericModal>
    </>
  )
}
