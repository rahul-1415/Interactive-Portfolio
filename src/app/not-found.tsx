import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="loading-eyebrow">Uncharted waters</p>
      <h1>Here Be Bugs</h1>
      <p className="not-found-monster" aria-hidden>
        🐙
      </p>
      <p>This corner of the chart was never drawn. The Log Pose points home.</p>
      <Link className="set-sail-btn" href="/">
        Follow the Log Pose ↩
      </Link>
    </div>
  )
}
