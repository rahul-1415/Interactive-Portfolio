import { SceneCanvas } from '@/components/canvas/SceneCanvas'
import { AudioController } from '@/components/dom/AudioController'
import { BountyBoard } from '@/components/dom/BountyBoard'
import { CourseBanner } from '@/components/dom/CourseBanner'
import { DockPrompt } from '@/components/dom/DockPrompt'
import { IslandModal } from '@/components/dom/IslandModal'
import { LoadingGate } from '@/components/dom/LoadingGate'
import { Minimap } from '@/components/dom/Minimap'
import { ResumeButton } from '@/components/dom/ResumeButton'
import { SettingsPanel } from '@/components/dom/SettingsPanel'
import { SkypieaCard } from '@/components/dom/SkypieaCard'
import { TouchHelm } from '@/components/dom/TouchHelm'
import { portfolio } from '@/content'

export default function Home() {
  return (
    <main>
      <SceneCanvas />
      <header className="hud-identity">
        <div className="hud-identity-row">
          <h1>{portfolio.personal.name}</h1>
          <ResumeButton />
        </div>
        <p>{portfolio.personal.title}</p>
      </header>
      <p className="hud-hint">
        W A S D — helm · Shift — burst · Space — dock · click to set course
      </p>
      <DockPrompt />
      <SkypieaCard />
      <BountyBoard />
      <CourseBanner />
      <AudioController />
      <TouchHelm />
      <Minimap />
      <SettingsPanel />
      <IslandModal />
      <LoadingGate />
    </main>
  )
}
