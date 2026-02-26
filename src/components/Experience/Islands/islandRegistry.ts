import { experienceStyleConfig } from '../styleConfig'

export type IslandId =
  | 'projects'
  | 'about'
  | 'experience'
  | 'contact'
  | 'caprag'
  | 'skills'
  | 'publication'
  | 'certification'
  | 'education'

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
  },
  {
    id: 'skills',
    title: 'Skills Deck',
    subtitle: 'Core engineering stack across backend, frontend, AI, and cloud delivery.',
    position: [-125, 0, -65],
    accent: '#9ed8ff'
  },
  {
    id: 'publication',
    title: 'Publication Point',
    subtitle: 'Research publications and submitted work spanning AI evaluation and autonomy.',
    position: [122, 0, -78],
    accent: '#ffd38f'
  },
  {
    id: 'certification',
    title: 'Certification Bay',
    subtitle: 'Professional credentials across cloud, DevOps, and research compliance.',
    position: [-120, 0, -160],
    accent: '#b5f4b0'
  },
  {
    id: 'education',
    title: 'Education Harbor',
    subtitle: 'Academic background and degree timeline.',
    position: [116, 0, -165],
    accent: '#f6b5ff'
  }
]

export const islandById = islandRegistry.reduce<Record<IslandId, IslandMeta>>((acc, island) => {
  acc[island.id] = island

  return acc
}, {} as Record<IslandId, IslandMeta>)
