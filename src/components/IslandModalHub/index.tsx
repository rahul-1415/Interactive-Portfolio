import { AboutModal } from '@App/components/Experience/Islands/About/AboutModal'
import { CapRagModal } from '@App/components/Experience/Islands/CapRag/CapRagModal'
import { CertificationModal } from '@App/components/Experience/Islands/Certification/CertificationModal'
import { ContactModal } from '@App/components/Experience/Islands/Contact/ContactModal'
import { EducationModal } from '@App/components/Experience/Islands/Education/EducationModal'
import { ExperienceModal } from '@App/components/Experience/Islands/Experience/ExperienceModal'
import { IslandId } from '@App/components/Experience/Islands/islandRegistry'
import { ProjectModal } from '@App/components/Experience/Islands/Projects/ProjectModal'
import { PublicationModal } from '@App/components/Experience/Islands/Publication/PublicationModal'
import { SkillsModal } from '@App/components/Experience/Islands/Skills/SkillsModal'
import { GenericModal } from '@App/components/GenericModal'

type IslandModalHubProps = {
  activeIsland: IslandId | null
  onClose: () => void
}

export const IslandModalHub = ({ activeIsland, onClose }: IslandModalHubProps) => {
  if (!activeIsland) return null

  return (
    <GenericModal
      isOpen={Boolean(activeIsland)}
      onCloseModal={onClose}
      isLoading={false}
    >
      {activeIsland === 'about' && <AboutModal />}
      {activeIsland === 'projects' && <ProjectModal />}
      {activeIsland === 'experience' && <ExperienceModal />}
      {activeIsland === 'contact' && <ContactModal />}
      {activeIsland === 'caprag' && <CapRagModal />}
      {activeIsland === 'skills' && <SkillsModal />}
      {activeIsland === 'publication' && <PublicationModal />}
      {activeIsland === 'certification' && <CertificationModal />}
      {activeIsland === 'education' && <EducationModal />}
    </GenericModal>
  )
}
