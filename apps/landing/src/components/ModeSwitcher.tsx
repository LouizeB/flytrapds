import { useEffect, useState } from 'react'
import { cn } from '../lib/cn'

export type Mode = 'light' | 'dark' | 'vibrant'

const MODES: { id: Mode; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'vibrant', label: 'Vibrant' },
]

const STORAGE_KEY = 'flytrap-mode'

function apply(mode: Mode) {
  const root = document.documentElement
  root.classList.toggle('dark', mode === 'dark')
  root.classList.toggle('vibrant', mode === 'vibrant')
}

export function useMode(): [Mode, (m: Mode) => void] {
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window === 'undefined') return 'light'
    return (localStorage.getItem(STORAGE_KEY) as Mode | null) ?? 'light'
  })

  useEffect(() => {
    apply(mode)
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      /* ignore */
    }
  }, [mode])

  return [mode, setMode]
}

export function ModeSwitcher({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-border bg-card p-0.5"
      role="radiogroup"
      aria-label="Trocar mode/theme"
    >
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          role="radio"
          aria-checked={mode === m.id}
          onClick={() => onChange(m.id)}
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium transition-colors',
            mode === m.id
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
