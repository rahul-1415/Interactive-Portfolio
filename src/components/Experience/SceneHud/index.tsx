import { CSSProperties } from 'react'
import { IslandMeta, islandRegistry } from '../Islands/islandRegistry'
import { experienceStyleConfig } from '../styleConfig'
import styles from './styles.module.css'

type SceneHudProps = {
  shipPosition: [number, number, number]
  hoveredIsland: IslandMeta | null
  isModalOpen: boolean
}

type HudLayoutConfig = {
  panelGapDesktop: string
  panelGapTablet: string
  panelGapMobile: string
  panelRadius: string
  panelPaddingDesktop: string
  panelPaddingTablet: string
  panelPaddingMobile: string
  panelWidthBrandDesktop: string
  panelWidthMissionDesktop: string
  panelWidthRouteDesktop: string
  panelWidthControlsDesktop: string
  panelWidthBrandTablet: string
  panelWidthMissionTablet: string
  panelWidthRouteTablet: string
  panelWidthControlsTablet: string
}

const hudLayoutConfig: HudLayoutConfig = {
  panelGapDesktop: '0.85rem',
  panelGapTablet: '0.65rem',
  panelGapMobile: '0.5rem',
  panelRadius: '16px',
  panelPaddingDesktop: '0.9rem',
  panelPaddingTablet: '0.76rem',
  panelPaddingMobile: '0.62rem',
  panelWidthBrandDesktop: 'clamp(220px, 19vw, 310px)',
  panelWidthMissionDesktop: 'clamp(250px, 22vw, 360px)',
  panelWidthRouteDesktop: 'clamp(235px, 21vw, 335px)',
  panelWidthControlsDesktop: 'clamp(220px, 18vw, 305px)',
  panelWidthBrandTablet: 'clamp(200px, 30vw, 280px)',
  panelWidthMissionTablet: 'clamp(220px, 34vw, 320px)',
  panelWidthRouteTablet: 'clamp(215px, 32vw, 300px)',
  panelWidthControlsTablet: 'clamp(200px, 28vw, 280px)'
}

const getDistance = (
  current: [number, number, number],
  target: [number, number, number]
): number => {
  return Math.hypot(current[0] - target[0], current[2] - target[2])
}

export const SceneHud = ({
  shipPosition,
  hoveredIsland,
  isModalOpen
}: SceneHudProps) => {
  const nearestIsland = islandRegistry.reduce((closestIsland, island) => {
    const currentDistance = getDistance(shipPosition, island.position)
    const closestDistance = getDistance(shipPosition, closestIsland.position)

    return currentDistance < closestDistance ? island : closestIsland
  }, islandRegistry[0])

  const activeIsland = hoveredIsland || nearestIsland

  const islandDistances = islandRegistry.map(island => ({
    ...island,
    distance: Math.round(getDistance(shipPosition, island.position))
  }))

  const activeDistance = Math.round(getDistance(shipPosition, activeIsland.position))

  const missionProgress = Math.max(
    0,
    Math.min(100, Math.round((1 - Math.min(activeDistance, 260) / 260) * 100))
  )

  const hudStyle = {
    '--hud-gap-desktop': hudLayoutConfig.panelGapDesktop,
    '--hud-gap-tablet': hudLayoutConfig.panelGapTablet,
    '--hud-gap-mobile': hudLayoutConfig.panelGapMobile,
    '--hud-radius': hudLayoutConfig.panelRadius,
    '--hud-panel-padding-desktop': hudLayoutConfig.panelPaddingDesktop,
    '--hud-panel-padding-tablet': hudLayoutConfig.panelPaddingTablet,
    '--hud-panel-padding-mobile': hudLayoutConfig.panelPaddingMobile,
    '--hud-brand-width-desktop': hudLayoutConfig.panelWidthBrandDesktop,
    '--hud-mission-width-desktop': hudLayoutConfig.panelWidthMissionDesktop,
    '--hud-route-width-desktop': hudLayoutConfig.panelWidthRouteDesktop,
    '--hud-controls-width-desktop': hudLayoutConfig.panelWidthControlsDesktop,
    '--hud-brand-width-tablet': hudLayoutConfig.panelWidthBrandTablet,
    '--hud-mission-width-tablet': hudLayoutConfig.panelWidthMissionTablet,
    '--hud-route-width-tablet': hudLayoutConfig.panelWidthRouteTablet,
    '--hud-controls-width-tablet': hudLayoutConfig.panelWidthControlsTablet,
    '--hud-panel-alpha': String(experienceStyleConfig.hud.panelAlpha),
    '--hud-border-alpha': String(experienceStyleConfig.hud.borderAlpha),
    '--hud-shadow-alpha': String(experienceStyleConfig.hud.shadowAlpha),
    '--hud-tint-color': experienceStyleConfig.palette.hudTint
  } as CSSProperties

  return (
    <div className={styles.hud} style={hudStyle} aria-hidden>
      <header className={styles.brandPanel}>
        <p className={styles.brandEyebrow}>Interactive Portfolio</p>
        <h1 className={styles.brandTitle}>RAHUL BABU</h1>
        <p className={styles.brandSubtitle}>Navigate the archipelago to explore projects, experience, and contact pathways.</p>
      </header>

      <section className={styles.missionPanel}>
        <p className={styles.panelLabel}>Current Objective</p>
        <h2 className={styles.missionTitle}>{activeIsland.title}</h2>
        <p className={styles.missionSubtitle}>{activeIsland.subtitle}</p>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${missionProgress}%`, backgroundColor: activeIsland.accent }}
          />
        </div>
        <p className={styles.missionFooter}>
          Distance {activeDistance}m
          <span>{isModalOpen ? 'Docked at island' : 'Sail closer to interact'}</span>
        </p>
      </section>

      <section className={styles.routePanel}>
        <p className={styles.panelLabel}>Route Radar</p>
        <div className={styles.routeGrid}>
          {islandDistances.map(island => {
            const isNearest = island.id === nearestIsland.id
            const isActive = island.id === activeIsland.id

            return (
              <article
                key={island.id}
                className={`${styles.routeCard} ${isNearest ? styles.routeNearest : ''} ${isActive ? styles.routeActive : ''}`}
                style={{ borderColor: isActive ? island.accent : undefined }}
              >
                <p className={styles.routeName}>{island.title}</p>
                <p className={styles.routeDistance}>{island.distance}m</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className={styles.controlsPanel}>
        <p className={styles.panelLabel}>Ship Controls</p>
        <div className={styles.keyGroup}>
          <span className={styles.key}>W</span>
          <span>Forward</span>
          <span className={styles.key}>S</span>
          <span>Reverse</span>
        </div>
        <div className={styles.keyGroup}>
          <span className={styles.key}>A</span>
          <span>Left</span>
          <span className={styles.key}>D</span>
          <span>Right</span>
        </div>
        <div className={styles.keyGroup}>
          <span className={styles.key}>Shift</span>
          <span>Boost</span>
        </div>
      </section>
    </div>
  )
}
