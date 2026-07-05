import { SceneCanvas } from '@/components/canvas/SceneCanvas'
import { BountyBoard } from '@/components/dom/BountyBoard'
import { DockPrompt } from '@/components/dom/DockPrompt'
import { IslandModal } from '@/components/dom/IslandModal'
import { LoadingGate } from '@/components/dom/LoadingGate'
import { Minimap } from '@/components/dom/Minimap'
import { SettingsPanel } from '@/components/dom/SettingsPanel'
import { TouchHelm } from '@/components/dom/TouchHelm'
import { portfolio } from '@/content'

export default function Home() {
  return (
    <main>
      <SceneCanvas />
      <header className="hud-identity">
        <h1>{portfolio.personal.name}</h1>
        <p>{portfolio.personal.title}</p>
      </header>
      <p className="hud-hint">W A S D — take the helm · press E to dock</p>
      <DockPrompt />
      <BountyBoard />
      <TouchHelm />
      <Minimap />
      <SettingsPanel />
      <IslandModal />
      <LoadingGate />
    </main>
  )
}
