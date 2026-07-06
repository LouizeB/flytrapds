import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AgentCard,
  AgentStatusIndicator,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AiAvatar,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  AiAccentIcon,
  ApprovalIcon,
  Badge,
  BrandIcon,
  BrandLockup,
  BrandMark,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Chart,
  ChatThread,
  CitationChip,
  CheckboxField,
  CostTokenMeter,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EmptyState,
  ExternalLinkIcon,
  Field,
  FilterBar,
  FlytrapIcon,
  IconButton,
  Input,
  InsightCallout,
  MessageBubble,
  MessageActions,
  Progress,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PromptInput,
  RunTraceTimeline,
  RadioGroup,
  RadioGroupField,
  ReasoningStream,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SendIcon,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuLabel,
  SidebarProvider,
  SidebarTrigger,
  Skeleton,
  SmartDataTable,
  SuggestedPrompts,
  SuccessIcon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ToolIcon,
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  SwitchField,
  Header,
  HeaderActions,
  HeaderBrand,
  HeaderTitle,
  HumanApprovalPrompt,
  StreamingMessage,
  ToolCallBlock,
} from "@flytrap/ui";
import "@flytrap/ui/styles";

const scales = ["magenta", "acid", "neutral", "success", "warning", "error"];
const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const chartData = [
  { period: "Sem 1", adoption: 54, compliance: 78 },
  { period: "Sem 2", adoption: 68, compliance: 84 },
  { period: "Sem 3", adoption: 81, compliance: 92 },
  { period: "Sem 4", adoption: 87, compliance: 100 },
];
type Appearance = "light" | "dark" | "vibrant";

const navItems = [
  ["Visão geral", "overview"],
  ["Comece aqui", "start"],
  ["Fundamentos", "foundations"],
  ["Componentes", "components"],
  ["AI layer", "ai-layer"],
] as const;

const semanticIcons = [
  { icon: AiAccentIcon, label: "AI" },
  { icon: ToolIcon, label: "Tool call" },
  { icon: ApprovalIcon, label: "Approval" },
];

const semanticStructures = [
  ["Surface", "canvas, card, popover e overlay"],
  ["Content", "texto, ícone e conteúdo inverso"],
  ["Action", "primary, secondary e destructive por estado"],
  ["Border & focus", "divisão, input e foco visível"],
  ["Feedback", "success, warning, error e info"],
  ["Dataviz", "séries, contraste e leitura de dados"],
  ["Navigation", "sidebar, item ativo e seleção"],
  ["AI", "agent, tool, approval e streaming"],
] as const;

const systemDimensions = [
  ["Brand", "flytrap", "Identidade e primitives cromáticos"],
  ["Mode", "light · dark", "Condição luminosa da interface"],
  ["Theme", "default · vibrant", "Expressão visual dentro da marca"],
  ["Viewport", "base · sm · md · lg · xl · 2xl", "Adaptação mobile-first"],
] as const;

function AppearanceControl({ appearance, onChange }: { appearance: Appearance; onChange: (value: Appearance) => void }) {
  return <div aria-label="Aparência" className="flex gap-1 rounded-lg border bg-card p-1" role="group">
    {(["light", "dark", "vibrant"] as const).map(value => <Button
      aria-pressed={appearance === value}
      className="h-8 px-2.5 capitalize"
      key={value}
      onClick={() => onChange(value)}
      size="sm"
      variant={appearance === value ? "default" : "ghost"}
    >{value}</Button>)}
  </div>;
}

function App() {
  const [appearance, setAppearance] = useState<Appearance>("light");
  const [toastOpen, setToastOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const appearanceClass = appearance === "light" ? "" : appearance;

  return <div className={appearanceClass}>
    <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[248px_1fr]">
      <aside className="border-b bg-sidebar p-6 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <a className="text-sidebar-primary" href="#overview"><BrandLockup descriptor="Design System" markSize={48} /></a>
        <nav aria-label="Seções" className="mt-8 grid gap-1 text-sm">
          {navItems.map(([label, id]) => <a className="rounded-md px-3 py-2 font-medium hover:bg-sidebar-accent" href={`#${id}`} key={id}>{label}</a>)}
        </nav>
        <div className="mt-8"><AppearanceControl appearance={appearance} onChange={setAppearance} /></div>
        <div className="mt-8 border-t pt-5 text-xs leading-5 text-muted-foreground lg:absolute lg:bottom-6 lg:left-6 lg:right-6">
          <p>DTCG · React · APCA</p>
          <a className="mt-2 inline-flex items-center gap-1 font-medium text-primary hover:underline" href="https://github.com/LouizeB/flytrapds">GitHub <FlytrapIcon icon={ExternalLinkIcon} size="sm" /></a>
        </div>
      </aside>

      <main className="min-w-0">
        <section className="relative overflow-hidden border-b px-6 py-20 md:px-12 md:py-28" id="overview">
          <div aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full bg-primary/15 blur-3xl" />
          <div aria-hidden="true" className="absolute bottom-0 right-1/3 size-48 rounded-full bg-secondary/20 blur-3xl" />
          <div className="relative mx-auto max-w-6xl">
            <div className="flex flex-wrap gap-2"><Badge variant="secondary">AI-first</Badge><Badge variant="outline">Multibrand</Badge><Badge variant="success">54 pares APCA</Badge></div>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold tracking-tight md:text-7xl">Bonito por instinto.<br /><span className="text-primary">Rigoroso por sistema.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Uma linguagem visual orgânica sobre tokens rastreáveis, componentes React acessíveis e padrões próprios para agents, chat e inteligência em dashboards.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg"><a href="#components">Explorar componentes</a></Button><Button asChild size="lg" variant="outline"><a href="https://github.com/LouizeB/flytrapds">Ver código <FlytrapIcon icon={ExternalLinkIcon} /></a></Button></div>
            <dl className="mt-16 grid gap-4 sm:grid-cols-3">
              {[["228", "tokens resolvidos"], ["3", "aparências publicadas"], ["51", "módulos públicos"]].map(([value, label]) => <div className="rounded-xl border bg-card/70 p-5 backdrop-blur" key={label}><dt className="text-sm text-muted-foreground">{label}</dt><dd className="mt-1 font-display text-3xl font-bold">{value}</dd></div>)}
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:px-12" id="start">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Comece pelo seu contexto</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Um sistema, duas trilhas</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">Design e desenvolvimento compartilham os mesmos nomes, estados e critérios de qualidade. Escolha a trilha que responde primeiro às suas perguntas.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Card>
              <CardHeader><span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground"><FlytrapIcon icon={AiAccentIcon} size="lg" /></span><CardTitle>Para Product Designers</CardTitle><CardDescription>Entenda intenção, linguagem visual e como especificar sem quebrar o contrato.</CardDescription></CardHeader>
              <CardContent className="grid gap-3 text-sm"><ul className="grid list-disc gap-2 pl-5 text-muted-foreground"><li>Foundations, semantic e component tokens</li><li>Light, dark, vibrant e futuras marcas</li><li>Anatomia, estados, conteúdo e acessibilidade</li><li>Inventário, prioridade e handoff para código</li></ul><Button asChild className="mt-2 w-fit" variant="outline"><a href="https://github.com/LouizeB/flytrapds/blob/main/docs/README.md#trilha-product-design">Abrir trilha de design <FlytrapIcon icon={ExternalLinkIcon} /></a></Button></CardContent>
            </Card>
            <Card>
              <CardHeader><span className="grid size-10 place-items-center rounded-xl bg-muted text-foreground"><FlytrapIcon icon={ToolIcon} size="lg" /></span><CardTitle>Para Developers</CardTitle><CardDescription>Instale, componha e valide a implementação com contratos verificáveis.</CardDescription></CardHeader>
              <CardContent className="grid gap-3 text-sm"><ul className="grid list-disc gap-2 pl-5 text-muted-foreground"><li>Setup do monorepo e imports de `@flytrap/ui`</li><li>DTCG, CSS variables e arquitetura responsiva</li><li>APIs React, aliases semânticos e composições AI</li><li>Quality gates, PRs, Pages e release</li></ul><Button asChild className="mt-2 w-fit" variant="outline"><a href="https://github.com/LouizeB/flytrapds/blob/main/docs/README.md#trilha-development">Abrir trilha de desenvolvimento <FlytrapIcon icon={ExternalLinkIcon} /></a></Button></CardContent>
            </Card>
          </div>
        </section>

        <section className="border-y bg-muted/30 px-6 py-16 md:px-12" id="foundations">
          <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Foundations</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Uma fonte, três camadas</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">Primitive entrega valor, semantic entrega intenção e component entrega contexto. Brand, mode e theme mudam sem reescrever componentes.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[['01', 'Primitive', '--magenta-500', 'Valores brutos nunca consumidos diretamente pela UI.'], ['02', 'Semantic', '--primary', 'Contrato compartilhado por superfícies, texto e ações.'], ['03', 'Component', '--button-primary-bg', 'Decisões específicas de anatomia e estado.']].map(([index, title, token, description]) => <Card key={title}><CardHeader><span className="font-mono text-xs text-primary">{index}</span><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader><CardContent><code className="rounded-md bg-muted px-2 py-1 font-mono text-xs">{token}</code></CardContent></Card>)}
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl font-bold">Estruturas semânticas</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Um vocabulário orientado à função evita que telas dependam de nomes de cor ou detalhes de implementação.</p>
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {semanticStructures.map(([name, description]) => <div className="rounded-xl border bg-card p-4" key={name}><dt className="font-semibold">{name}</dt><dd className="mt-1 text-sm text-muted-foreground">{description}</dd></div>)}
              </dl>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold">Dimensões do sistema</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Brand, mode, theme e viewport têm responsabilidades independentes. Hoje o catálogo publica light, dark e vibrant; a evolução preserva essa separação.</p>
              <dl className="mt-5 overflow-hidden rounded-xl border bg-card">
                {systemDimensions.map(([name, values, description]) => <div className="grid gap-1 border-b p-4 last:border-b-0 sm:grid-cols-[88px_1fr]" key={name}><dt className="font-semibold">{name}</dt><dd><code className="font-mono text-xs text-primary">{values}</code><p className="mt-1 text-sm text-muted-foreground">{description}</p></dd></div>)}
              </dl>
              <Button asChild className="mt-5" variant="outline"><a href="https://github.com/LouizeB/flytrapds/blob/main/architecture/README.md">Consultar arquitetura semântica <FlytrapIcon icon={ExternalLinkIcon} /></a></Button>
            </div>
          </div>
          <div className="mt-12 grid gap-6">
            {scales.map(scale => <div key={scale}><div className="mb-2 flex items-center justify-between"><h3 className="text-sm font-semibold capitalize">{scale}</h3><span className="font-mono text-xs text-muted-foreground">50—950</span></div><div className="grid grid-cols-6 overflow-hidden rounded-xl border sm:grid-cols-11">{steps.map(step => <div className="aspect-square min-h-10" key={step} style={{ background: `var(--${scale}-${step})` }} title={`--${scale}-${step}`} />)}</div></div>)}
          </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-12" id="components">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Components</p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Componentes com identidade Flytrap</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Card><CardHeader><CardTitle>Actions</CardTitle><CardDescription>Estados semânticos, loading acessível, icon-only com nome obrigatório e pares APCA validados.</CardDescription></CardHeader><CardContent className="flex flex-wrap gap-2"><Button>Default</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="destructive">Destructive</Button><Button loading loadingAnnouncement="Salvando alterações">Salvando</Button><IconButton icon={SendIcon} label="Enviar mensagem" variant="secondary" /></CardContent></Card>
              <Card><CardHeader><CardTitle>Field</CardTitle><CardDescription>Label, hint, error e atributos nativos em composição.</CardDescription></CardHeader><CardContent><Field hint="Usaremos apenas para atualizações do DS." label="E-mail"><Input placeholder="voce@exemplo.com" type="email" /></Field></CardContent></Card>
              <Card><CardHeader><CardTitle>Adoption</CardTitle><CardDescription>Telemetria conectada ao contrato visual.</CardDescription></CardHeader><CardContent><div className="mb-2 flex justify-between text-sm"><span>87%</span><span className="inline-flex items-center gap-1 text-success"><FlytrapIcon icon={SuccessIcon} size="sm" />+12%</span></div><Progress value={87} /></CardContent></Card>
              <InsightCallout title="APCA como contrato">Contraste é validado sobre conteúdo, ações, foco e dataviz em light, dark e vibrant.</InsightCallout>
              <Card><CardHeader><CardTitle>Selection</CardTitle><CardDescription>Primitives acessíveis e independentes de domínio.</CardDescription></CardHeader><CardContent className="grid gap-5"><Select defaultValue="semantic"><SelectTrigger aria-label="Camada"><SelectValue placeholder="Selecione uma camada" /></SelectTrigger><SelectContent><SelectItem value="primitive">Primitive</SelectItem><SelectItem value="semantic">Semantic</SelectItem><SelectItem value="component">Component</SelectItem></SelectContent></Select><CheckboxField label="Validar contraste APCA" description="Executa a matriz dos modos publicados." /></CardContent></Card>
              <Card><CardHeader><CardTitle>Navigation & disclosure</CardTitle><CardDescription>Teclado, foco e overlays tratados pela biblioteca.</CardDescription></CardHeader><CardContent><Tabs defaultValue="preview"><TabsList><TabsTrigger value="preview">Preview</TabsTrigger><TabsTrigger value="code">Código</TabsTrigger></TabsList><TabsContent value="preview"><Alert><AlertTitle>Componente pronto</AlertTitle><AlertDescription>API pública, estados e acessibilidade documentados.</AlertDescription></Alert></TabsContent><TabsContent value="code"><Skeleton className="h-20" /></TabsContent></Tabs><div className="mt-4 flex flex-wrap gap-2"><Dialog><DialogTrigger asChild><Button variant="outline">Abrir dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Novo componente</DialogTitle><DialogDescription>Dialogs preservam foco, contexto e fechamento acessível.</DialogDescription></DialogHeader><DialogFooter><Button>Continuar</Button></DialogFooter></DialogContent></Dialog><AlertDialog><AlertDialogTrigger asChild><Button variant="destructive">Remover</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Remover componente?</AlertDialogTitle><AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction>Remover</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog><TooltipProvider><Tooltip><TooltipTrigger asChild><IconButton icon={SendIcon} label="Detalhes da ação" variant="ghost" /></TooltipTrigger><TooltipContent>Tooltip com atraso e navegação acessível</TooltipContent></Tooltip></TooltipProvider></div></CardContent></Card>
              <EmptyState action={<Button variant="outline">Criar componente</Button>} className="md:col-span-2" description="Use estados vazios para orientar a próxima ação sem inventar conteúdo de produto." icon={BrandIcon} title="Nenhum componente nesta coleção" />
              <Card className="md:col-span-2"><CardHeader><CardTitle>Form controls</CardTitle><CardDescription>Controles reutilizáveis com label, descrição, teclado e estados nativos.</CardDescription></CardHeader><CardContent className="grid gap-5 md:grid-cols-2"><div className="grid gap-2"><label className="text-sm font-medium" htmlFor="catalog-notes">Notas</label><Textarea id="catalog-notes" placeholder="Contexto para a decisão…" /></div><div className="grid gap-5"><RadioGroup aria-label="Densidade" defaultValue="comfortable"><RadioGroupField description="Mais espaço entre elementos." label="Confortável" value="comfortable" /><RadioGroupField label="Compacta" value="compact" /></RadioGroup><Separator /><SwitchField description="Mantém avisos relevantes visíveis." label="Notificações" /></div></CardContent></Card>
              <Card className="md:col-span-2"><CardHeader><CardTitle>Overlays & feedback</CardTitle><CardDescription>Camadas temporárias preservam foco, contexto e anúncio acessível.</CardDescription></CardHeader><CardContent className="flex flex-wrap gap-2"><Popover><PopoverTrigger asChild><Button variant="outline">Abrir popover</Button></PopoverTrigger><PopoverContent><p className="font-medium">Conteúdo contextual</p><p className="mt-1 text-sm text-muted-foreground">Para ações breves sem bloquear a interface.</p></PopoverContent></Popover><Sheet><SheetTrigger asChild><Button variant="outline">Abrir sheet</Button></SheetTrigger><SheetContent><SheetHeader><SheetTitle>Painel lateral</SheetTitle><SheetDescription>Uma superfície responsiva para tarefas complementares.</SheetDescription></SheetHeader></SheetContent></Sheet><Button onClick={() => setToastOpen(true)}>Mostrar toast</Button><ToastProvider><Toast onOpenChange={setToastOpen} open={toastOpen}><div><ToastTitle>Alterações salvas</ToastTitle><ToastDescription>O catálogo foi atualizado.</ToastDescription></div><ToastClose /></Toast><ToastViewport /></ToastProvider></CardContent></Card>
              <Card className="overflow-hidden md:col-span-2"><CardHeader><CardTitle>Application structure</CardTitle><CardDescription>Header, Sidebar e CommandMenu compõem shells sem carregar decisões de produto.</CardDescription></CardHeader><CardContent><SidebarProvider><div className="flex h-72 overflow-hidden rounded-xl border"><Sidebar className="flex"><SidebarHeader><BrandMark label={null} /><SidebarMenuLabel>Flytrap</SidebarMenuLabel></SidebarHeader><SidebarContent><SidebarGroup><SidebarGroupLabel>Biblioteca</SidebarGroupLabel><SidebarMenu><SidebarMenuItem><SidebarMenuButton active><FlytrapIcon icon={ToolIcon} /><SidebarMenuLabel>Componentes</SidebarMenuLabel></SidebarMenuButton></SidebarMenuItem><SidebarMenuItem><SidebarMenuButton><FlytrapIcon icon={AiAccentIcon} /><SidebarMenuLabel>Tokens</SidebarMenuLabel></SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarGroup></SidebarContent></Sidebar><div className="min-w-0 flex-1"><Header><SidebarTrigger /><HeaderBrand><HeaderTitle>Catálogo</HeaderTitle></HeaderBrand><HeaderActions><Badge variant="success">Estável</Badge></HeaderActions></Header><div className="p-4"><Command><CommandInput placeholder="Buscar no design system…" /><CommandList><CommandEmpty>Nenhum resultado.</CommandEmpty><CommandGroup heading="Navegação"><CommandItem>Componentes</CommandItem><CommandItem>Tokens</CommandItem><CommandItem>Acessibilidade</CommandItem></CommandGroup></CommandList></Command></div></div></div></SidebarProvider></CardContent></Card>
              <Chart className="md:col-span-2" data={chartData} description="Visualização com tabela de dados equivalente." series={[{ key: "adoption", label: "Adoção" }, { key: "compliance", label: "Conformidade" }]} title="Evolução do sistema" type="area" valueFormatter={value => `${value}%`} xKey="period" />
              <Card className="md:col-span-2"><CardHeader><CardTitle>Disclosure & data</CardTitle><CardDescription>Primitives P1 para documentação, filtros e registros operacionais.</CardDescription></CardHeader><CardContent className="grid gap-4"><Accordion><AccordionItem open><AccordionTrigger>O que entrou na release 0.4?</AccordionTrigger><AccordionContent>Observabilidade AI, ações de chat, navegação e dados reutilizáveis.</AccordionContent></AccordionItem></Accordion><FilterBar onValueChange={() => {}} value=""><Badge variant="outline">Todos</Badge></FilterBar><SmartDataTable caption="Componentes P1" columns={[{ key: "name", header: "Componente" }, { key: "area", header: "Área" }]} getRowId={row => row.name} rows={[{ name: "RunTraceTimeline", area: "AI" }, { name: "SmartDataTable", area: "Data" }]} /></CardContent></Card>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:px-12" id="ai-layer">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">AI layer</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Inteligência com estados legíveis</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">Agents, tools, aprovação humana, streaming e custo tratados como padrões de interface — não como exceções improvisadas.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <AgentCard model="Claude Sonnet" name="Token validator" status="running" tokens="2.3K">Validando aliases, modos e pares APCA do contrato DTCG.</AgentCard>
            <Card><CardHeader><CardTitle>Vocabulário AI</CardTitle><CardDescription>Aliases semânticos estáveis entre design e código.</CardDescription></CardHeader><CardContent className="grid grid-cols-3 gap-4 text-center text-xs text-muted-foreground">{semanticIcons.map(({ icon, label }) => <div className="grid place-items-center gap-2 rounded-lg border bg-background p-4" key={label}><FlytrapIcon icon={icon} size="lg" /><span>{label}</span></div>)}</CardContent></Card>
            <Card><CardHeader><CardTitle>Brand assets</CardTitle><CardDescription>Marca vetorial e avatar oficial em tamanhos padronizados.</CardDescription></CardHeader><CardContent className="flex items-end gap-6"><BrandMark size={60} /><AiAvatar size="lg" status="processing" /><AiAvatar size="md" /><AiAvatar size="sm" status="offline" /></CardContent></Card>
            <Card><CardHeader><CardTitle>Streaming & citations</CardTitle><CardDescription>Atualizações progressivas sem reanunciar todo o conteúdo.</CardDescription></CardHeader><CardContent className="grid gap-3"><StreamingMessage status="streaming">Construindo uma resposta com contexto verificável…</StreamingMessage><div className="flex flex-wrap gap-2"><CitationChip href="https://github.com/LouizeB/flytrapds" index={1} source="Flytrap DS" /><CitationChip index={2} missing source="Fonte indisponível" /></div></CardContent></Card>
            <Card><CardHeader><CardTitle>Tools & approval</CardTitle><CardDescription>Execução inspecionável e interrupção humana antes de ações críticas.</CardDescription></CardHeader><CardContent className="grid gap-3"><ToolCallBlock input="scope: packages/ui" name="validate_components" output="95 testes aprovados" status="success" /><HumanApprovalPrompt description="A ação publicará uma nova versão do pacote compartilhado." title="Publicar componentes?" /></CardContent></Card>
            <Card className="md:col-span-2"><CardHeader><CardTitle>Agent observability</CardTitle><CardDescription>Status, sequência operacional e consumo permanecem legíveis sem expor raciocínio interno.</CardDescription></CardHeader><CardContent className="grid gap-5"><div><AgentStatusIndicator status="running" /></div><RunTraceTimeline steps={[{ id: "plan", title: "Planejamento", description: "Escopo e ferramentas definidos.", status: "completed", duration: "180 ms" }, { id: "execute", title: "Execução", status: "running" }]} /><CostTokenMeter cost="R$ 0,08" limit={4000} used={2300} /></CardContent></Card>
            <Card className="md:col-span-2"><CardHeader><CardTitle>Chat composition</CardTitle><CardDescription>Thread, resumo seguro de análise e entrada de prompt permanecem componentes independentes.</CardDescription></CardHeader><CardContent className="grid gap-3"><ChatThread state="ready"><MessageBubble role="user">Quais componentes ainda faltam?</MessageBubble><MessageBubble role="assistant">Vou confrontar o inventário com os exports públicos.</MessageBubble><ReasoningStream status="completed" summary="Inventário e API pública foram comparados; os próximos gaps estão documentados." /></ChatThread><SuggestedPrompts onSelect={setPrompt} prompts={["Resumir mudanças", "Ver riscos da release"]} /><MessageActions content="Inventário e API pública foram comparados." onRetry={() => {}} /><PromptInput onSubmitPrompt={() => setPrompt("")} onValueChange={setPrompt} value={prompt} /></CardContent></Card>
          </div>
        </section>

        <footer className="border-t px-6 py-8 text-center text-sm text-muted-foreground">Flytrap DS · React, tokens e acessibilidade trabalhando como um só sistema.</footer>
      </main>
    </div>
  </div>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
