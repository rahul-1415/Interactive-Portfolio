import raw from '../../rahul-babu-data.json'
import type { PortfolioData } from './types'

/**
 * rahul-babu-data.json at the repo root is the single source of truth for all
 * portfolio content — edit it there and the site updates on next build.
 */
export const portfolio: PortfolioData = raw

export type * from './types'
