import { About } from './About'
import { CapRag } from './CapRag'
import { Certification } from './Certification'
import { Contact } from './Contact'
import { Education } from './Education'
import { Experience } from './Experience'
import { IslandId, IslandMeta } from './islandRegistry'
import { Projects } from './Projects'
import { Publication } from './Publication'
import { Skills } from './Skills'

type IslandsProps = {
  onIslandHover?: (island: IslandMeta) => void
  onIslandBlur?: () => void
  onIslandClick: (islandId: IslandId) => void
}

export const Islands = ({ onIslandHover, onIslandBlur, onIslandClick }: IslandsProps) => {
  return (
    <>
      <Projects
        onIslandHover={onIslandHover}
        onIslandBlur={onIslandBlur}
        onIslandClick={() => onIslandClick('projects')}
      />

      <CapRag
        onIslandHover={onIslandHover}
        onIslandBlur={onIslandBlur}
        onIslandClick={() => onIslandClick('caprag')}
      />

      <About
        onIslandHover={onIslandHover}
        onIslandBlur={onIslandBlur}
        onIslandClick={() => onIslandClick('about')}
      />

      <Experience
        onIslandHover={onIslandHover}
        onIslandBlur={onIslandBlur}
        onIslandClick={() => onIslandClick('experience')}
      />

      <Contact
        onIslandHover={onIslandHover}
        onIslandBlur={onIslandBlur}
        onIslandClick={() => onIslandClick('contact')}
      />

      <Skills
        onIslandHover={onIslandHover}
        onIslandBlur={onIslandBlur}
        onIslandClick={() => onIslandClick('skills')}
      />

      <Publication
        onIslandHover={onIslandHover}
        onIslandBlur={onIslandBlur}
        onIslandClick={() => onIslandClick('publication')}
      />

      <Certification
        onIslandHover={onIslandHover}
        onIslandBlur={onIslandBlur}
        onIslandClick={() => onIslandClick('certification')}
      />

      <Education
        onIslandHover={onIslandHover}
        onIslandBlur={onIslandBlur}
        onIslandClick={() => onIslandClick('education')}
      />
    </>
  )
}
