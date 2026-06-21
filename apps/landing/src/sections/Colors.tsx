import { Card } from '../components/ui'
import { RAMPS, STATUS_RAMPS, type Ramp } from '../data'
import { SectionHead } from './Architecture'

function RampRow({ ramp }: { ramp: Ramp }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-display text-sm font-semibold capitalize">{ramp.name}</span>
        <span className="font-mono text-xs text-muted-foreground">50 → 950</span>
      </div>
      <div className="flex overflow-hidden rounded-md border border-border">
        {ramp.steps.map((s) => (
          <div
            key={s.step}
            className="group relative h-12 flex-1"
            style={{ background: `var(${s.varName})` }}
            title={`${ramp.name}-${s.step}`}
          >
            <span className="pointer-events-none absolute inset-x-0 bottom-1 text-center font-mono text-[9px] text-foreground/0 transition-colors group-hover:text-foreground/70">
              {s.step}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const SEMANTIC_SWATCHES = [
  { label: 'primary', varName: '--primary' },
  { label: 'secondary', varName: '--secondary' },
  { label: 'accent', varName: '--accent' },
  { label: 'muted', varName: '--muted' },
  { label: 'success', varName: '--success' },
  { label: 'warning', varName: '--warning' },
  { label: 'error', varName: '--error' },
  { label: 'border', varName: '--border' },
]

export function Colors() {
  return (
    <section id="cores" className="border-b border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead
          eyebrow="Cores"
          title="Ramps 50→950, base 500"
          lead="Magenta primário (#F10081), acid lime secundário e neutrals quentes. Escalas geradas por HCT e validadas por contraste APCA."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            {RAMPS.map((r) => (
              <RampRow key={r.name} ramp={r} />
            ))}
          </div>
          <div className="space-y-6">
            {STATUS_RAMPS.map((r) => (
              <RampRow key={r.name} ramp={r} />
            ))}
          </div>
        </div>

        <Card className="mt-10 p-6">
          <h3 className="font-display text-lg font-semibold">Tokens semânticos</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            O que os componentes realmente consomem — reagem a mode e theme.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SEMANTIC_SWATCHES.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span
                  className="h-9 w-9 shrink-0 rounded-md border border-border"
                  style={{ background: `var(${s.varName})` }}
                />
                <span className="font-mono text-xs text-muted-foreground">{s.varName}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
