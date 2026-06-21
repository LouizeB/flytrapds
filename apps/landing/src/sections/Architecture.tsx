import { Card, Eyebrow } from '../components/ui'
import { DIMENSIONS, LAYERS } from '../data'

export function Architecture() {
  return (
    <section id="arquitetura" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead
          eyebrow="Arquitetura"
          title="3 camadas × 3 dimensões"
          lead="Estrutura atômica rígida: primitives alimentam semantics, que alimentam decisões de componente. Cada dimensão recompõe o sistema sem tocar nos componentes."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {LAYERS.map((l) => (
            <Card key={l.title} className="p-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--magenta-500)]">
                {l.tag}
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold">{l.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{l.desc}</p>
              <code className="mt-4 block rounded-md bg-muted px-3 py-2 font-mono text-xs text-foreground">
                {l.sample}
              </code>
            </Card>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {DIMENSIONS.map((d) => (
            <Card key={d.title} className="flex items-start gap-4 p-6">
              <span className="mt-0.5 rounded-md bg-accent px-2 py-1 font-mono text-xs text-accent-foreground">
                {d.tag}
              </span>
              <div>
                <h4 className="font-display text-lg font-semibold">{d.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: string
  lead: string
}) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-4xl font-bold tracking-tight">{title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{lead}</p>
    </div>
  )
}
