import { Button } from './ui'
import { ModeSwitcher, type Mode } from './ModeSwitcher'
import { REPO_URL } from '../data'

export function Nav({ mode, onModeChange }: { mode: Mode; onModeChange: (m: Mode) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
            <FlytrapMark />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">Flytrap DS</span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#arquitetura" className="transition-colors hover:text-foreground">
            Arquitetura
          </a>
          <a href="#cores" className="transition-colors hover:text-foreground">
            Cores
          </a>
          <a href="#componentes" className="transition-colors hover:text-foreground">
            Componentes
          </a>
          <a href="#ai" className="transition-colors hover:text-foreground">
            AI
          </a>
          <a href="#pipeline" className="transition-colors hover:text-foreground">
            Pipeline
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <ModeSwitcher mode={mode} onChange={onModeChange} />
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="hidden sm:block">
            <Button size="sm" variant="secondary">
              GitHub
            </Button>
          </a>
        </div>
      </div>
    </header>
  )
}

function FlytrapMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2c2 4 5 5 5 9a5 5 0 0 1-10 0c0-4 3-5 5-9Z"
        fill="currentColor"
        opacity=".95"
      />
      <path d="M9 11h6M10 13.5h4" stroke="var(--acid-300)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
