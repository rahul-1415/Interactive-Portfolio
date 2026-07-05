/**
 * Treasure barrels adrift on the open sea — the voyage's collectibles.
 * Hand-placed along natural sailing lines between islands, all in open water
 * (clear of every island's collision circle and the Sunny's hull capsule).
 * Marked on the sea chart as ✕ until hauled aboard.
 */
export interface TreasureSpot {
  id: string
  position: [number, number]
}

export const TREASURE_SPOTS: TreasureSpot[] = [
  { id: 'barrel-westward', position: [-45, 30] },
  { id: 'barrel-galley-run', position: [-90, 130] },
  { id: 'barrel-midsea', position: [-10, 105] },
  { id: 'barrel-sunny-east', position: [65, 60] },
  { id: 'barrel-news-route', position: [120, 80] },
  { id: 'barrel-scholar-strait', position: [35, 175] },
  { id: 'barrel-cape-west', position: [-45, 185] },
  { id: 'barrel-far-west', position: [-130, 60] },
  { id: 'barrel-south-anchorage', position: [30, -35] },
  { id: 'barrel-northeast-deep', position: [150, 140] },
]
