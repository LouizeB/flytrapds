export const REPO_URL = 'https://github.com/LouizeB/flytrapds'
export const FIGMA_URL = 'https://www.figma.com/files/project/65368906'
export const VERCEL_URL = 'https://flytrapds.vercel.app'

export interface Ramp {
  name: string
  steps: { step: string; varName: string }[]
}

const STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

function ramp(name: string): Ramp {
  return { name, steps: STEPS.map((s) => ({ step: s, varName: `--${name}-${s}` })) }
}

export const RAMPS: Ramp[] = [ramp('magenta'), ramp('acid'), ramp('neutral')]

export const STATUS_RAMPS: Ramp[] = [ramp('success'), ramp('warning'), ramp('error')]

export interface Layer {
  tag: string
  title: string
  desc: string
  sample: string
}

export const LAYERS: Layer[] = [
  {
    tag: 'Camada 1',
    title: 'Primitive',
    desc: 'Ramps 50→950 por brand (HCT). Valores brutos — nunca usados direto em componente.',
    sample: '--magenta-500: #F10081',
  },
  {
    tag: 'Camada 2',
    title: 'Semantic',
    desc: 'Contrato shadcn: background, primary, muted, border… Reage a mode e theme.',
    sample: '--primary: var(--magenta-500)',
  },
  {
    tag: 'Camada 3',
    title: 'Component',
    desc: 'Decisões por componente e superfícies AI (--button-*, --chat-bubble-*, --kpi-*).',
    sample: '--chat-bubble-user-bg: var(--primary)',
  },
]

export interface Dimension {
  tag: string
  title: string
  desc: string
}

export const DIMENSIONS: Dimension[] = [
  { tag: 'brand', title: 'Multibrand', desc: 'Cada brand é um arquivo de primitives. Tudo herda automático via [data-brand].' },
  { tag: 'mode', title: 'Light / Dark', desc: '.dark sobrescreve a camada semantic. Light é o default em :root.' },
  { tag: 'theme', title: 'Vibrant', desc: '.vibrant aplica superfícies magenta-tintadas. Extensível a novos themes.' },
]

export interface AiSurface {
  title: string
  items: string[]
  tokens: string
}

export const AI_SURFACES: AiSurface[] = [
  {
    title: 'Agents',
    items: ['AgentCard', 'RunTraceTimeline', 'ToolCallBlock', 'ReasoningStream', 'CostTokenMeter'],
    tokens: '--ai-agent-* · --agent-card-*',
  },
  {
    title: 'AI Chat',
    items: ['ChatThread', 'StreamingMessage', 'PromptInput', 'InlineCitation', 'ModelSelector'],
    tokens: '--chat-bubble-* · --ai-citation',
  },
  {
    title: 'Dashboards',
    items: ['KpiStatCard', 'ChartCard', 'AiInsightCallout', 'AnomalyFlag', 'SmartDataTable'],
    tokens: '--kpi-* · --chart-1..5 · --insight-*',
  },
]

export interface Phase {
  id: string
  title: string
}

export const PHASES: Phase[] = [
  { id: 'F1', title: 'Design (Figma Variables)' },
  { id: 'F2', title: 'Tokenização (Tokens Studio → DTCG)' },
  { id: 'F3', title: 'Build tokens (Style Dictionary)' },
  { id: 'F4', title: 'Componentes (@flytrap/ui)' },
  { id: 'F5', title: 'Qualidade (lint · typecheck · APCA)' },
  { id: 'F6', title: 'Release (Changesets · SemVer)' },
  { id: 'F7', title: 'Docs (Next.js + Storybook)' },
  { id: 'F8', title: 'Backend (Supabase + RAG)' },
  { id: 'F9', title: 'Deploy (Vercel)' },
  { id: 'F10', title: 'Telemetria → realimenta F1' },
]

export interface ApcaRole {
  role: string
  min: string
  desc: string
}

export const APCA_ROLES: ApcaRole[] = [
  { role: 'body', min: '75', desc: 'Texto corrido' },
  { role: 'ui', min: '60', desc: 'Texto de interface' },
  { role: 'large / nontext', min: '45', desc: 'Títulos e ícones' },
]
