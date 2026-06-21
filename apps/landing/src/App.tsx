import { Nav } from './components/Nav'
import { useMode } from './components/ModeSwitcher'
import { Hero } from './sections/Hero'
import { Architecture } from './sections/Architecture'
import { Colors } from './sections/Colors'
import { Components } from './sections/Components'
import { Ai } from './sections/Ai'
import { Pipeline } from './sections/Pipeline'
import { CTA, Footer } from './sections/Footer'

export function App() {
  const [mode, setMode] = useMode()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav mode={mode} onModeChange={setMode} />
      <main>
        <Hero />
        <Architecture />
        <Colors />
        <Components />
        <Ai />
        <Pipeline />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
