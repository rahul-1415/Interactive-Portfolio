export type SectionId =
  'experience' | 'projects' | 'education' | 'publications' | 'certifications' | 'contact'

export interface IslandDef {
  id: SectionId
  /** In-world name (DESIGN.md §4). */
  name: string
  /** One Piece location that inspired it. */
  inspiredBy: string
  /** Short line shown under the name on the dock prompt / modal header. */
  tagline: string
  position: [number, number]
  /** Docking trigger radius (world units). */
  dockRadius: number
  /** Hard collision radius — ship cannot enter. */
  landRadius: number
  /** Zone accent (DESIGN.md tokens). */
  accent: string
}

/**
 * The Grand Log world map: six islands fanned out ahead of spawn so the
 * opening shot frames the whole voyage. Order follows the recommended route.
 */
export const ISLANDS: IslandDef[] = [
  {
    id: 'experience',
    name: 'The Floating Galley',
    inspiredBy: 'Baratie',
    tagline: 'Four courses of service at sea',
    position: [-86, 79],
    dockRadius: 34,
    landRadius: 16,
    accent: '#D9A441',
  },
  {
    id: 'projects',
    name: 'Dock District',
    inspiredBy: 'Water 7',
    tagline: 'Sixteen hulls in the yards',
    position: [-43, 133],
    dockRadius: 36,
    landRadius: 18,
    accent: '#3E9E9E',
  },
  {
    id: 'education',
    name: 'The Knowledge Tree',
    inspiredBy: 'Ohara',
    tagline: 'Every log ever kept',
    position: [32, 144],
    dockRadius: 34,
    landRadius: 18,
    accent: '#5C8A3C',
  },
  {
    id: 'publications',
    name: 'The Press Balloon',
    inspiredBy: 'World Economy News',
    tagline: 'Hot off the wing',
    position: [94, 108],
    dockRadius: 32,
    // Floats in the air — no landmass at the waterline, so no hull collision.
    landRadius: 0,
    accent: '#C63D2F',
  },
  {
    id: 'certifications',
    name: 'Fort Meridian',
    inspiredBy: 'Marineford',
    tagline: 'Commissions and commendations',
    position: [108, 40],
    dockRadius: 34,
    landRadius: 18,
    accent: '#5B6B8C',
  },
  {
    id: 'contact',
    name: 'Twin Cape Light',
    inspiredBy: 'Twin Cape Lighthouse',
    tagline: 'Signal the crew',
    position: [0, 191],
    dockRadius: 32,
    landRadius: 12,
    accent: '#D70000',
  },
]
