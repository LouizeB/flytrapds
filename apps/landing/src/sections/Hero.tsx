import { Badge, Button, Card, Eyebrow } from '../components/ui'
import { REPO_URL } from '../data'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div className="ft-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="ft-iridescent ft-animate-float pointer-events-none absolute -right-32 -top-24 h-[460px] w-[460px] rounded-full opacity-60 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <Eyebrow>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--acid-300)]" />
            AI-first · Tailwind v4 · shadcn/ui
          </Eyebrow>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            O design system
            <br />
            <span className="ft-gradient-text">Venus Flytrap.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Beleza esculpida sobre estrutura atômica. <strong className="text-foreground">Flytrap</strong>{' '}
            é um design system multibrand com tokens em 3 camadas × 3 dimensões, acessibilidade{' '}
            <strong className="text-foreground">APCA como gate de CI</strong> e superfícies de IA prontas
            para agents, chat e dashboards.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#arquitetura">
              <Button size="lg">Explorar o sistema</Button>
            </a>
            <a href={REPO_URL} target="_blank" rel="noreferrer">
              <Button size="lg" variant="secondary">
                Ver no GitHub
              </Button>
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {[
              ['58+', 'componentes'],
              ['6', 'ramps de cor'],
              ['APCA', 'gate de a11y'],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-bold">{n}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Card className="ft-glow relative p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--magenta-500)]" />
              <span className="font-mono text-xs text-muted-foreground">flytrap / preview</span>
            </div>
            <Badge variant="success">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              live tokens
            </Badge>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Tudo abaixo usa tokens semânticos. Troque <span className="font-mono">Light / Dark / Vibrant</span>{' '}
            no topo e veja a superfície reagir.
          </p>

          <div className="mt-5 space-y-3">
            <label className="block text-xs font-medium text-muted-foreground">E-mail</label>
            <input
              type="email"
              placeholder="voce@flytrap.design"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <div className="flex flex-wrap gap-2.5">
              <Button>Deploy</Button>
              <Button variant="secondary">Preview</Button>
              <Button variant="ghost">Docs</Button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <Badge variant="success">passed</Badge>
              <Badge variant="warning">queued</Badge>
              <Badge variant="error">failed</Badge>
              <Badge variant="info">analyzing</Badge>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
