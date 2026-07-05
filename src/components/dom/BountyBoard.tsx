'use client'

import { ISLANDS } from '@/content/islands'
import { TREASURE_SPOTS } from '@/content/treasures'
import { bountyOf, formatBounty, isComplete, titleFor, useProgress } from '@/stores/progress'
import { useWorldStore } from '@/stores/world'

/**
 * The voyage's wanted poster: live bounty, epithet, and the Log Pose tally
 * (islands charted / treasure hauled). Flashes a reward toast on each haul
 * and crowns a completed log with the Pirate King proclamation.
 */
export function BountyBoard() {
  const voyageStarted = useWorldStore((s) => s.voyageStarted)
  const visited = useProgress((s) => s.visited)
  const treasures = useProgress((s) => s.treasures)
  const crowned = useProgress((s) => s.crowned)
  // The toast animates itself out (bounty-toast-rise ends at opacity 0,
  // forwards), so it renders straight from the store — keyed by timestamp so
  // each haul restarts the animation. No effect/state needed.
  const toast = useProgress((s) => s.lastEvent)

  if (!voyageStarted) return null

  const bounty = bountyOf(visited.length, treasures.length)
  const complete = isComplete(visited.length, treasures.length)
  const title = titleFor(bounty, complete)

  return (
    <>
      <aside className="bounty-board" aria-label="Voyage progress">
        <span className="bounty-board-wanted">Bounty</span>
        <strong className="bounty-board-amount">{formatBounty(bounty)}</strong>
        <span className="bounty-board-title">{title}</span>
        <span className="bounty-board-tally">
          ⚓ {visited.length}/{ISLANDS.length} islands · ✕ {treasures.length}/
          {TREASURE_SPOTS.length} treasures
        </span>
      </aside>

      {toast && (
        <div className="bounty-toast" key={toast.at} role="status">
          <strong>+{formatBounty(toast.amount)}</strong>
          <span>{toast.label}</span>
        </div>
      )}

      {complete && !crowned && (
        <div className="pirate-king" role="dialog" aria-label="Voyage complete">
          <div className="pirate-king-card">
            <span className="pirate-king-burst" aria-hidden />
            <h2>Pirate King</h2>
            <p>
              Every island charted, every barrel hauled — a full log and an Emperor&apos;s bounty of{' '}
              {formatBounty(bounty)}. The One Piece was the voyage all along.
            </p>
            <div className="pirate-king-actions">
              <a href="/resume/Rahul-Babu-Resume.pdf" target="_blank" rel="noreferrer">
                Claim the Vivre Card (résumé)
              </a>
              <button onClick={() => useProgress.getState().dismissCrown()}>
                Back to the open sea
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
