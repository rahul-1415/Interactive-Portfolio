import { About } from './About'
import { CapRag } from './CapRag'
import { Contact } from './Contact'
import { Experience } from './Experience'
import { IslandId, IslandMeta } from './islandRegistry'
import { Projects } from './Projects'

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
    </>
  )
}
