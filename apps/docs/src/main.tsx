import React from "react";
import { createRoot } from "react-dom/client";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Field, Input, InsightCallout, Progress } from "@flytrap/ui";
import "@flytrap/ui/styles";

const scales = ["magenta", "acid", "neutral", "success", "warning", "error"];
const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

function App() {
  return <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
    <aside className="border-b bg-sidebar p-6 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r"><a href="#overview" className="font-display text-xl font-bold text-primary">Flytrap DS</a><nav className="mt-8 grid gap-1 text-sm">{["Overview", "Tokens", "Components", "AI layer"].map(item => <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="rounded-md px-3 py-2 font-medium hover:bg-sidebar-accent">{item}</a>)}</nav><p className="mt-8 text-xs text-muted-foreground">v0.2 · React + shadcn</p></aside>
    <main className="mx-auto w-full max-w-6xl p-6 md:p-10">
      <section id="overview" className="py-8"><Badge variant="secondary">AI-first</Badge><h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">Bonito por instinto.<br /><span className="text-primary">Rigoroso por sistema.</span></h1><p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Design system multibrand sobre React, Tailwind v4 e shadcn/ui, com acessibilidade APCA incorporada ao pipeline.</p><div className="mt-7 flex gap-3"><Button>Começar</Button><Button variant="outline">Ver componentes</Button></div></section>
      <section id="tokens" className="py-12"><h2 className="font-display text-3xl font-bold">Tokens</h2><p className="mt-2 text-muted-foreground">Primitive → semantic → component, em light, dark e vibrant.</p><div className="mt-8 grid gap-6">{scales.map(scale => <div key={scale}><h3 className="mb-2 text-sm font-semibold capitalize">{scale}</h3><div className="grid grid-cols-6 overflow-hidden rounded-xl sm:grid-cols-11">{steps.map(step => <div key={step} title={`--${scale}-${step}`} className="aspect-square min-h-10" style={{ background: `var(--${scale}-${step})` }} />)}</div></div>)}</div></section>
      <section id="components" className="py-12"><h2 className="font-display text-3xl font-bold">Fundação shadcn</h2><div className="mt-8 grid gap-5 md:grid-cols-2"><Card><CardHeader><CardTitle>Button</CardTitle><CardDescription>Variantes semânticas, foco visível e estados nativos.</CardDescription></CardHeader><CardContent className="flex flex-wrap gap-2"><Button>Default</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button></CardContent></Card><Card><CardHeader><CardTitle>Form</CardTitle><CardDescription>Campos compostos e mensagens acessíveis.</CardDescription></CardHeader><CardContent><Field label="E-mail" hint="Usaremos apenas para atualizações do DS."><Input type="email" placeholder="voce@exemplo.com" /></Field></CardContent></Card><Card><CardHeader><CardTitle>Adoption</CardTitle><CardDescription>Uso de tokens semânticos nos produtos.</CardDescription></CardHeader><CardContent><div className="mb-2 flex justify-between text-sm"><span>87%</span><span className="text-success">+12%</span></div><Progress value={87} /></CardContent></Card><InsightCallout title="APCA como contrato">O gate roda sobre os pares semânticos antes de qualquer build de produto.</InsightCallout></div></section>
      <section id="ai-layer" className="py-12"><h2 className="font-display text-3xl font-bold">AI layer</h2><p className="mt-2 max-w-2xl text-muted-foreground">Composições próprias para agentes, chat e inteligência em dashboards — sem criar um segundo sistema visual.</p></section>
    </main>
  </div>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
