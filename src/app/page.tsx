import { SceneCanvas } from '@/components/canvas/SceneCanvas'
import { portfolio } from '@/content'

export default function Home() {
  return (
    <main>
      <SceneCanvas />
      <header className="hud-identity">
        <h1>{portfolio.personal.name}</h1>
        <p>{portfolio.personal.title}</p>
      </header>
      <p className="hud-hint">W A S D — take the helm</p>
    </main>
  )
}
