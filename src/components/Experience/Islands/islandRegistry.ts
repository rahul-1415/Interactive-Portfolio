import { experienceStyleConfig } from '../styleConfig'

export type IslandId = 'projects' | 'about' | 'experience' | 'contact' | 'caprag'

export type IslandMeta = {
  id: IslandId
  title: string
  subtitle: string
  position: [number, number, number]
  accent: string
}

export const islandRegistry: IslandMeta[] = [
  {
    id: 'projects',
    title: 'Projects Docks',
    subtitle: 'Hands-on builds, shipped products, and technical experiments.',
    position: [-58, 0, -58],
    accent: experienceStyleConfig.palette.accentWarm
  },
  {
    id: 'about',
    title: 'About Outpost',
    subtitle: 'Who I am, what I value, and how I approach engineering.',
    position: [52, 0, -64],
    accent: '#eec56f'
  },
  {
    id: 'experience',
    title: 'Experience Port',
    subtitle: 'Roles, impact, and delivery history across teams and domains.',
    position: [6, 0, -118],
    accent: '#83c5be'
  },
  {
    id: 'contact',
    title: 'Contact Harbor',
    subtitle: 'Let us connect for product engineering and AI-focused work.',
    position: [-62, 0, -126],
    accent: experienceStyleConfig.palette.accentCool
  },
  {
    id: 'caprag',
    title: 'RAG Lab Isle',
    subtitle: 'Interactive climate policy assistant built with retrieval workflows.',
    position: [64, 0, -128],
    accent: '#ffb969'
  }
]

export const islandById = islandRegistry.reduce<Record<IslandId, IslandMeta>>((acc, island) => {
  acc[island.id] = island

  return acc
}, {} as Record<IslandId, IslandMeta>)
