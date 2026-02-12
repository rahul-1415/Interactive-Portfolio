import { IslandMeta, islandRegistry } from '../Islands/islandRegistry'
import styles from './styles.module.css'

type SceneHudProps = {
  shipPosition: [number, number, number]
  hoveredIsland: IslandMeta | null
  isModalOpen: boolean
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

  return (
    <div className={styles.hud} aria-hidden>
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
