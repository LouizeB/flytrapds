import { Card } from '../components/ui'
import { AI_SURFACES } from '../data'
import { SectionHead } from './Architecture'

export function Ai() {
  return (
    <section id="ai" className="border-b border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead
          eyebrow="AI-first"
          title="Superfícies de IA como cidadãs de primeira classe"
          lead="Tokens dedicados (--ai-*, --agent-*, --chat-bubble-*) cobrem agents, chat e dashboards inteligentes desde o design — não como remendo."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <Card className="p-6">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              AI Chat
            </span>
            <div className="mt-4 space-y-3">
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                Resuma os deploys com falha desta semana.
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-2.5 text-sm">
                3 falhas, todas no build de tokens.{' '}
                <span className="font-medium text-[var(--ai-citation,var(--magenta-600))]">[CI #182]</span>
                <span className="mt-2 block font-mono text-xs text-[var(--ai-thinking,var(--neutral-600))]">
                  ▍pensando · consultando 12 traces…
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Agent run
            </span>
            <div className="mt-4 space-y-2.5">
              {[
                ['plan', 'success', 'concluído'],
                ['tool: search_repo', 'success', 'concluído'],
                ['tool: open_pr', 'run', 'executando'],
              ].map(([step, status, label]) => (
                <div
                  key={step}
                  className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2"
                >
                  <span className="font-mono text-xs">{step}</span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={
                      status === 'run'
                        ? { background: 'var(--warning-100)', color: 'var(--warning-700)' }
                        : { background: 'var(--success-100)', color: 'var(--success-700)' }
                    }
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {AI_SURFACES.map((s) => (
            <Card key={s.title} className="p-6">
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <ul className="mt-3 space-y-1.5">
                {s.items.map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-[var(--magenta-500)]" />
                    {i}
                  </li>
                ))}
              </ul>
              <code className="mt-4 block rounded-md bg-muted px-3 py-2 font-mono text-[11px] text-foreground">
                {s.tokens}
              </code>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
