import { useEffect } from 'react'
import { AboutModal } from '@App/components/Experience/Islands/About/AboutModal'
import { CapRagModal } from '@App/components/Experience/Islands/CapRag/CapRagModal'
import { ContactModal } from '@App/components/Experience/Islands/Contact/ContactModal'
import { ExperienceModal } from '@App/components/Experience/Islands/Experience/ExperienceModal'
import { IslandId } from '@App/components/Experience/Islands/islandRegistry'
import { ProjectModal } from '@App/components/Experience/Islands/Projects/ProjectModal'
import { GenericModal } from '@App/components/GenericModal'
import {
  useGetAboutMeLazyQuery,
  useGetExperiencesLazyQuery,
  useGetProjectsLazyQuery
} from '@App/core/graphql/queries.generated'

type IslandModalHubProps = {
  activeIsland: IslandId | null
  onClose: () => void
}

export const IslandModalHub = ({ activeIsland, onClose }: IslandModalHubProps) => {
  const [getAbout, { data: aboutData, loading: aboutLoading }] = useGetAboutMeLazyQuery()
  const [getProjects, { data: projectsData, loading: projectsLoading }] = useGetProjectsLazyQuery()
  const [getExperience, { data: experienceData, loading: experienceLoading }] = useGetExperiencesLazyQuery()

  useEffect(() => {
    if (activeIsland === 'about') {
      getAbout()
    }

    if (activeIsland === 'projects') {
      getProjects()
    }

    if (activeIsland === 'experience') {
      getExperience()
    }
  }, [activeIsland, getAbout, getProjects, getExperience])

  if (!activeIsland) return null

  const isLoading =
    (activeIsland === 'about' && aboutLoading) ||
    (activeIsland === 'projects' && projectsLoading) ||
    (activeIsland === 'experience' && experienceLoading)

  return (
    <GenericModal
      isOpen={Boolean(activeIsland)}
      onCloseModal={onClose}
      isLoading={Boolean(isLoading)}
    >
      {activeIsland === 'about' && <AboutModal sections={aboutData?.abouts || []} />}
      {activeIsland === 'projects' && <ProjectModal projects={projectsData?.projects || []} />}
      {activeIsland === 'experience' && <ExperienceModal experiences={experienceData?.experiences || []} />}
      {activeIsland === 'contact' && <ContactModal />}
      {activeIsland === 'caprag' && <CapRagModal />}
    </GenericModal>
  )
}
