import { Button } from '../components/ui'
import { FIGMA_URL, REPO_URL, VERCEL_URL } from '../data'

export function CTA() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="ft-iridescent pointer-events-none absolute inset-0 opacity-40 blur-2xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Construa com o <span className="ft-gradient-text">Flytrap</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Tokens versionados, contraste garantido e superfícies de IA prontas. Da Variable do Figma
          ao deploy na Vercel.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            <Button size="lg">Abrir repositório</Button>
          </a>
          <a href={FIGMA_URL} target="_blank" rel="noreferrer">
            <Button size="lg" variant="secondary">
              Ver no Figma
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground font-display text-sm font-bold">
            F
          </span>
          <span className="font-display text-sm font-semibold">Flytrap DS</span>
        </div>
        <nav className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="hover:text-foreground">
            GitHub
          </a>
          <a href={FIGMA_URL} target="_blank" rel="noreferrer" className="hover:text-foreground">
            Figma
          </a>
          <a href={VERCEL_URL} target="_blank" rel="noreferrer" className="hover:text-foreground">
            Vercel
          </a>
        </nav>
        <span className="font-mono text-xs text-muted-foreground">
          Tailwind v4 · shadcn/ui · APCA
        </span>
      </div>
    </footer>
  )
}
