// Flytrap tokens build: primitives (50–950, por brand) + semantic/component (estrutural) → globals.css + tokens.ts
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const primDir = join(root, "src/primitives");
mkdirSync(join(root, "dist"), { recursive: true });
const brands = readdirSync(primDir).filter(f=>f.endsWith(".json"))
  .map(f=>JSON.parse(readFileSync(join(primDir,f),"utf8")));
const SCALES = ["magenta","acid","neutral","success","warning","error"];

const primBlock = (b) => {
  const sel = b.brand==="flytrap" ? `:root,\n[data-brand="flytrap"]` : `[data-brand="${b.brand}"]`;
  const vars = SCALES.map(sc => Object.entries(b[sc]).map(([k,v])=>`  --${sc}-${k}:${v};`).join("\n")).join("\n");
  return `${sel} {\n${vars}\n}`;
};

const HEADER = `@import "tailwindcss";
@plugin "tailwindcss-animate";
@custom-variant dark (&:is(.dark *));

/* AUTO-GERADO por build.mjs — não editar. Fonte: src/primitives/*.json. Escala 50→950 (claro→escuro), base 500. */
`;

const SEMANTIC = `
/* SEMANTIC (light) — contrato shadcn */
:root {
  --radius:.625rem;
  --background:var(--neutral-50); --foreground:var(--neutral-900);
  --card:var(--neutral-50); --card-foreground:var(--neutral-900);
  --popover:var(--neutral-100); --popover-foreground:var(--neutral-900);
  --primary:var(--magenta-500); --primary-foreground:#FFFFFF;
  --secondary:var(--acid-300); --secondary-foreground:var(--neutral-900);
  --muted:var(--neutral-100); --muted-foreground:var(--neutral-600);
  --accent:var(--magenta-100); --accent-foreground:var(--magenta-700);
  --destructive:var(--error-600); --destructive-foreground:#FFFFFF;
  --success:var(--success-700); --warning:var(--warning-700); --error:var(--error-600);
  --border:var(--neutral-200); --input:var(--neutral-200); --ring:var(--magenta-500);
  --chart-1:#DE3981; --chart-2:#129000; --chart-3:#795FFF; --chart-4:#008794; --chart-5:#BE6600;
  --sidebar:var(--neutral-50); --sidebar-foreground:var(--neutral-900);
  --sidebar-primary:var(--magenta-500); --sidebar-primary-foreground:#FFFFFF;
  --sidebar-accent:var(--neutral-100); --sidebar-accent-foreground:var(--neutral-900);
  --sidebar-border:var(--neutral-200); --sidebar-ring:var(--magenta-500);
  --ai-agent-bg:var(--magenta-100); --ai-agent-fg:var(--magenta-700);
  --ai-thinking:var(--neutral-600); --ai-tool-bg:var(--neutral-100);
  --ai-stream-shimmer:var(--neutral-200); --ai-citation:var(--magenta-600);
  --motion-fast:120ms; --motion-base:240ms; --motion-fluid:480ms;
  --ease-organic:cubic-bezier(.34,1.56,.64,1); --ease-liquid:cubic-bezier(.65,0,.35,1);
}

/* MODE: dark */
.dark {
  --background:var(--neutral-900); --foreground:var(--neutral-100);
  --card:var(--neutral-800); --card-foreground:var(--neutral-100);
  --popover:var(--neutral-800); --popover-foreground:var(--neutral-100);
  --primary:var(--magenta-500); --primary-foreground:#FFFFFF;
  --secondary:var(--acid-300); --secondary-foreground:var(--neutral-950);
  --muted:var(--neutral-800); --muted-foreground:var(--neutral-300);
  --accent:var(--magenta-900); --accent-foreground:var(--magenta-300);
  --destructive:var(--error-600); --destructive-foreground:#FFFFFF;
  --success:var(--success-300); --warning:var(--warning-300); --error:var(--error-300);
  --border:var(--neutral-700); --input:var(--neutral-700); --ring:var(--acid-300);
  --chart-1:#FF7FB1; --chart-2:#50C32A; --chart-3:#AAA2FF; --chart-4:#00BCCF; --chart-5:#FC9200;
  --sidebar:var(--neutral-900); --sidebar-foreground:var(--neutral-100);
  --sidebar-primary:var(--magenta-500); --sidebar-primary-foreground:#FFFFFF;
  --sidebar-accent:var(--neutral-800); --sidebar-accent-foreground:var(--neutral-100);
  --sidebar-border:var(--neutral-700); --sidebar-ring:var(--acid-300);
  --ai-agent-bg:var(--magenta-900); --ai-agent-fg:var(--magenta-300);
  --ai-thinking:var(--neutral-300); --ai-tool-bg:var(--neutral-800);
  --ai-stream-shimmer:var(--neutral-700); --ai-citation:var(--magenta-300);
}

/* THEME: vibrant */
.vibrant {
  --background:var(--magenta-950); --foreground:var(--magenta-50);
  --card:var(--magenta-900); --card-foreground:var(--magenta-50);
  --muted:var(--magenta-900); --muted-foreground:var(--magenta-200);
  --border:var(--magenta-800); --ring:var(--acid-300);
}

/* COMPONENT layer (referencia semantic) */
:root {
  --button-primary-bg:var(--primary); --button-primary-fg:var(--primary-foreground);
  --button-secondary-outline:var(--magenta-500); --button-secondary-fg:var(--magenta-500);
  --button-radius:var(--radius);
  --agent-card-bg:var(--ai-agent-bg); --agent-card-fg:var(--ai-agent-fg);
  --agent-card-border:var(--border); --agent-status-run:var(--success); --agent-status-error:var(--error);
  --tool-call-bg:var(--ai-tool-bg);
  --reasoning-fg:var(--ai-thinking);
  --chat-bubble-user-bg:var(--primary); --chat-bubble-user-fg:var(--primary-foreground);
  --chat-bubble-assistant-bg:var(--card); --chat-bubble-assistant-fg:var(--card-foreground);
  --chat-stream-shimmer:var(--ai-stream-shimmer); --chat-input-ring:var(--ring); --chat-citation:var(--ai-citation);
  --kpi-card-bg:var(--card); --kpi-delta-up:var(--success); --kpi-delta-down:var(--error);
  --insight-bg:var(--accent); --insight-fg:var(--accent-foreground);
}
`;

const THEME_INLINE = `
/* @theme inline → utilities Tailwind */
@theme inline {
  --color-background:var(--background); --color-foreground:var(--foreground);
  --color-card:var(--card); --color-card-foreground:var(--card-foreground);
  --color-popover:var(--popover); --color-popover-foreground:var(--popover-foreground);
  --color-primary:var(--primary); --color-primary-foreground:var(--primary-foreground);
  --color-secondary:var(--secondary); --color-secondary-foreground:var(--secondary-foreground);
  --color-muted:var(--muted); --color-muted-foreground:var(--muted-foreground);
  --color-accent:var(--accent); --color-accent-foreground:var(--accent-foreground);
  --color-destructive:var(--destructive); --color-destructive-foreground:var(--destructive-foreground);
  --color-success:var(--success); --color-warning:var(--warning); --color-error:var(--error);
  --color-border:var(--border); --color-input:var(--input); --color-ring:var(--ring);
  --color-chart-1:var(--chart-1); --color-chart-2:var(--chart-2); --color-chart-3:var(--chart-3);
  --color-chart-4:var(--chart-4); --color-chart-5:var(--chart-5);
  --color-sidebar:var(--sidebar); --color-sidebar-foreground:var(--sidebar-foreground);
  --color-sidebar-primary:var(--sidebar-primary); --color-sidebar-primary-foreground:var(--sidebar-primary-foreground);
  --color-sidebar-accent:var(--sidebar-accent); --color-sidebar-accent-foreground:var(--sidebar-accent-foreground);
  --color-sidebar-border:var(--sidebar-border); --color-sidebar-ring:var(--sidebar-ring);
  --color-ai-agent:var(--ai-agent-bg); --color-ai-agent-foreground:var(--ai-agent-fg);
  --color-ai-citation:var(--ai-citation);
  --radius-lg:var(--radius); --radius-md:calc(var(--radius) - 2px); --radius-sm:calc(var(--radius) - 4px);
  --font-display:"Fira Sans",sans-serif; --font-sans:"Ubuntu Sans",sans-serif; --font-mono:"Roboto Mono",monospace;
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
}
`;

const css = [HEADER, ...brands.map(primBlock), SEMANTIC, THEME_INLINE].join("\n");
writeFileSync(join(root,"dist/flytrap-globals.css"), css);
const ts = `// AUTO-GERADO. Primitives por brand (50–950).\nexport const primitives = ${JSON.stringify(Object.fromEntries(brands.map(b=>[b.brand,b])),null,2)} as const;\n`;
writeFileSync(join(root,"dist/tokens.ts"), ts);
console.log(`built css ${css.length}b`);
