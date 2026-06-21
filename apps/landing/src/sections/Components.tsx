import { Badge, Button, Card } from '../components/ui'
import { SectionHead } from './Architecture'

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">{title}</h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          shadcn base
        </span>
      </div>
      <div className="space-y-3">{children}</div>
    </Card>
  )
}

export function Components() {
  return (
    <section id="componentes" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead
          eyebrow="Componentes"
          title="58 componentes, um contrato de tokens"
          lead="Base shadcn/ui + charts + camada AI. Cada peça consome apenas tokens semânticos — então mode e theme se aplicam sem variantes manuais."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Panel title="Button">
            <div className="flex flex-wrap gap-2.5">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <Button size="sm">sm</Button>
              <Button size="md">md</Button>
              <Button size="lg">lg</Button>
            </div>
          </Panel>

          <Panel title="Badge">
            <div className="flex flex-wrap gap-2">
              <Badge>default</Badge>
              <Badge variant="success">success</Badge>
              <Badge variant="warning">warning</Badge>
              <Badge variant="error">error</Badge>
              <Badge variant="info">info</Badge>
            </div>
          </Panel>

          <Panel title="Input">
            <input
              placeholder="Nome do projeto"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <input
              defaultValue="flytrap-prod"
              className="h-10 w-full rounded-md border border-[var(--error-600)] bg-background px-3 text-sm outline-none ring-2 ring-[var(--error-600)]/30"
            />
            <p className="font-mono text-xs text-[var(--error-600)]">slug já existe</p>
          </Panel>

          <Panel title="KPI Card">
            <div className="rounded-md border border-border bg-background p-4">
              <span className="text-xs text-muted-foreground">Conversão</span>
              <div className="mt-1 flex items-end justify-between">
                <span className="font-display text-3xl font-bold">12,4%</span>
                <span className="rounded-full bg-[var(--success-100)] px-2 py-0.5 text-xs font-medium text-[var(--success-700)]">
                  ▲ 3,2%
                </span>
              </div>
            </div>
          </Panel>

          <Panel title="Switch / Toggle">
            <div className="flex items-center justify-between rounded-md border border-border bg-background p-3">
              <span className="text-sm">Modo escuro</span>
              <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                <span className="ml-auto mr-0.5 h-5 w-5 rounded-full bg-primary-foreground" />
              </span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border bg-background p-3">
              <span className="text-sm text-muted-foreground">Telemetria</span>
              <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                <span className="ml-0.5 h-5 w-5 rounded-full bg-foreground/60" />
              </span>
            </div>
          </Panel>

          <Panel title="Progress / Chart">
            <div className="space-y-2">
              {[
                ['var(--chart-1)', '82%', 'w-[82%]'],
                ['var(--chart-2)', '64%', 'w-[64%]'],
                ['var(--chart-3)', '47%', 'w-[47%]'],
              ].map(([c, label, w]) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${w}`} style={{ background: c }} />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </section>
  )
}
