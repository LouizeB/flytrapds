import { Card } from '../components/ui'
import { APCA_ROLES, PHASES } from '../data'
import { SectionHead } from './Architecture'

export function Pipeline() {
  return (
    <section id="pipeline" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead
          eyebrow="Pipeline & a11y"
          title="Do Figma ao deploy, com gate de contraste"
          lead="Dez fases automatizadas. O APCA roda no CI e bloqueia qualquer PR que regrida o contraste — acessibilidade não é opcional."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold">10 fases</h3>
            <ol className="mt-5 space-y-0">
              {PHASES.map((p, i) => (
                <li key={p.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-card font-mono text-xs font-semibold text-[var(--magenta-500)]">
                      {p.id}
                    </span>
                    {i < PHASES.length - 1 && <span className="my-1 w-px flex-1 bg-border" />}
                  </div>
                  <span className="pt-1.5 pb-3 text-sm">{p.title}</span>
                </li>
              ))}
            </ol>
          </Card>

          <Card className="h-fit p-6">
            <h3 className="font-display text-lg font-semibold">APCA por papel</h3>
            <p className="mt-1 text-sm text-muted-foreground">Contraste mínimo (Lc) exigido.</p>
            <div className="mt-5 space-y-3">
              {APCA_ROLES.map((r) => (
                <div
                  key={r.role}
                  className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-3"
                >
                  <div>
                    <span className="font-mono text-sm font-medium">{r.role}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{r.desc}</span>
                  </div>
                  <span className="font-display text-2xl font-bold text-[var(--magenta-500)]">
                    {r.min}
                  </span>
                </div>
              ))}
            </div>
            <code className="mt-5 block rounded-md bg-muted px-3 py-2 font-mono text-[11px] text-foreground">
              CI: pnpm apca → falha se regressão
            </code>
          </Card>
        </div>
      </div>
    </section>
  )
}
