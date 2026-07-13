import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AgentCard,
  AgentStatusIndicator,
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
  Avatar,
  AvatarFallback,
  Badge,
  BrandIcon,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  BrandLockup,
  BrandMark,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChatThread,
  CheckboxField,
  CitationChip,
  CodeBlock,
  Combobox,
  ComponentPreview,
  CopyButton,
  CostTokenMeter,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DatePicker,
  DatePickerField,
  DataList,
  DataListDescription,
  DataListItem,
  DataListTerm,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  EmptyState,
  Field,
  FileUpload,
  FilterBar,
  FlytrapIcon,
  Form,
  FormField,
  FormMessage,
  Header,
  HeaderActions,
  HeaderBrand,
  HeaderTitle,
  HumanApprovalPrompt,
  IconButton,
  AiAvatar,
  Input,
  InsightCallout,
  InlineNotification,
  InteractiveCard,
  KpiStatCard,
  Label,
  MessageBubble,
  MessageActions,
  Page,
  PageDescription,
  PageHeader,
  PageTitle,
  Pagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  Progress,
  RadioGroup,
  RadioGroupField,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PromptInput,
  ReasoningStream,
  SearchField,
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Separator,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuLabel,
  SidebarMobile,
  SidebarMobileTrigger,
  SidebarProvider,
  SidebarTrigger,
  Skeleton,
  Slider,
  SliderField,
  Spinner,
  Stack,
  StatusIndicator,
  SuccessIcon,
  SwitchField,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  StreamingMessage,
  SuggestedPrompts,
  SmartDataTable,
  TokenSwatch,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  ToolCallBlock,
  RunTraceTimeline,
  Timeline,
  TimelineItem,
  Toolbar,
  TreeItem,
  TreeView,
  useSidebar,
  Container,
  Grid,
} from "../src";

describe("componentes de formulário", () => {
  it("bloqueia o Button durante loading e preserva o label", () => {
    render(<Button loading loadingAnnouncement="Salvando alterações">Salvar</Button>);
    const button = screen.getByRole("button", { name: /salvar/i });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Salvando alterações");
  });

  it("altera Checkbox e Switch por interação da pessoa", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<>
      <CheckboxField label="Selecionar item" checkboxProps={{ onCheckedChange }} />
      <SwitchField label="Ativar recurso" />
    </>);

    await user.click(screen.getByLabelText("Selecionar item"));
    await user.click(screen.getByLabelText("Ativar recurso"));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(screen.getByLabelText("Ativar recurso")).toHaveAttribute("data-state", "checked");
  });

  it("oferece nomes e descrições acessíveis", async () => {
    const { container } = render(<form>
      <label htmlFor="notes">Notas</label>
      <Textarea id="notes" />
      <RadioGroup aria-label="Densidade" defaultValue="comfortable">
        <RadioGroupField description="Mais espaço entre elementos" label="Confortável" value="comfortable" />
        <RadioGroupField label="Compacta" value="compact" />
      </RadioGroup>
    </form>);

    expect((await axe(container, { rules: { "color-contrast": { enabled: false } } })).violations).toHaveLength(0);
  });
});

describe("componentes Onda 1", () => {
  it("compõe Label com obrigatório e texto opcional", () => {
    const { rerender } = render(<Label htmlFor="name" required>Nome</Label>);
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");

    rerender(<Label htmlFor="alias" optionalText="Opcional">Alias</Label>);
    expect(screen.getByText("Opcional")).toBeVisible();
  });

  it("associa FormField a controle, mensagens e estado inválido", async () => {
    const { container, rerender } = render(<Form aria-label="Perfil">
      <FormField error="Informe um nome" hint="Use seu nome público" label="Nome" required success="Tudo certo">
        <Input aria-describedby="native-help" id="name" />
      </FormField>
    </Form>);

    const input = screen.getByLabelText(/^Nome/);
    expect(input).toHaveAttribute("id", "name");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", expect.stringContaining("native-help"));
    expect(screen.getByRole("alert")).toHaveTextContent("Informe um nome");
    expect(screen.queryByText("Tudo certo")).not.toBeInTheDocument();
    expect((await axe(container, { rules: { "color-contrast": { enabled: false } } })).violations).toHaveLength(0);

    rerender(<FormField hint="Ajuda" label="Código" success="Disponível"><Input /></FormField>);
    expect(screen.getByText("Disponível")).toBeVisible();
    expect(screen.getByLabelText("Código")).not.toHaveAttribute("aria-invalid");

    rerender(<FormField label="Sem mensagens"><Input /></FormField>);
    expect(screen.getByLabelText("Sem mensagens")).not.toHaveAttribute("aria-describedby");

    rerender(<FormField label="Conteúdo livre">Texto sem controle</FormField>);
    expect(screen.getByText("Conteúdo livre")).toBeVisible();
    expect(screen.getByText("Texto sem controle")).toBeVisible();
  });

  it.each([
    ["hint", "Dica"],
    ["error", "Erro"],
    ["success", "Sucesso"],
  ] as const)("renderiza FormMessage no tom %s", (tone, text) => {
    render(<FormMessage tone={tone}>{text}</FormMessage>);
    expect(screen.getByText(text)).toBeVisible();
  });

  it.each([
    ["sm", "Carregando rápido"],
    ["md", "Carregando"],
    ["lg", "Carregando tudo"],
  ] as const)("expõe Spinner acessível no tamanho %s", (size, label) => {
    render(<Spinner label={label} size={size} />);
    expect(screen.getByRole("status", { name: label })).toBeVisible();
  });

  it.each([
    ["info", "status"],
    ["success", "status"],
    ["warning", "status"],
    ["error", "alert"],
  ] as const)("renderiza InlineNotification %s com role %s", async (variant, role) => {
    const { container } = render(<InlineNotification action={<Button size="sm">Ver</Button>} title="Sincronização" variant={variant}>Mensagem do sistema.</InlineNotification>);
    expect(screen.getByRole(role)).toHaveTextContent("Sincronização");
    expect(screen.getByRole("button", { name: "Ver" })).toBeVisible();
    expect((await axe(container, { rules: { "color-contrast": { enabled: false } } })).violations).toHaveLength(0);
  });

  it("recorre à notificação informativa quando variante é nula e aceita conteúdo mínimo", () => {
    const { rerender } = render(<InlineNotification variant={null}>Somente descrição.</InlineNotification>);
    expect(screen.getByRole("status")).toHaveTextContent("Somente descrição.");

    rerender(<InlineNotification title="Somente título" />);
    expect(screen.getByRole("status")).toHaveTextContent("Somente título");
  });

  it("renderiza CodeBlock com metadados e modo mínimo", () => {
    const { rerender } = render(<CodeBlock code="<Button />" filename="button.tsx" language="tsx" />);
    expect(screen.getByText("button.tsx")).toBeVisible();
    expect(screen.getByText("<Button />")).toBeVisible();

    rerender(<CodeBlock code="plain" language="" />);
    expect(screen.queryByText("Snippet")).not.toBeInTheDocument();
    expect(screen.getByText("plain")).toBeVisible();
  });

  it("documenta tokens com swatch, valor e descrição opcional", () => {
    const { rerender } = render(<TokenSwatch description="Acento primário" name="color.primary" value="var(--primary)" />);
    expect(screen.getByText("color.primary")).toBeVisible();
    expect(screen.getByText("Acento primário")).toBeVisible();

    rerender(<TokenSwatch name="color.surface" value="#05060a" />);
    expect(screen.getByText("#05060a")).toBeVisible();
  });

  it("compõe ComponentPreview com preview, descrição e código", () => {
    const { rerender } = render(<ComponentPreview code="<Button>Salvar</Button>" description="Exemplo interativo" preview={<Button>Salvar</Button>} title="Button" />);
    expect(screen.getByRole("heading", { name: "Button" })).toBeVisible();
    expect(screen.getByText("Exemplo interativo")).toBeVisible();
    expect(screen.getByText("<Button>Salvar</Button>")).toBeVisible();

    rerender(<ComponentPreview preview={<Badge>Beta</Badge>} title="Badge" />);
    expect(screen.getByRole("heading", { name: "Badge" })).toBeVisible();
    expect(screen.queryByText("Exemplo interativo")).not.toBeInTheDocument();
  });

  it("limpa SearchField não controlado e chama onClear em modo controlado", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    const { rerender } = render(<SearchField aria-label="Buscar componentes" defaultValue="button" />);

    await user.click(screen.getByRole("button", { name: "Limpar busca" }));
    expect(screen.getByRole("searchbox", { name: "Buscar componentes" })).toHaveValue("");
    expect(screen.queryByRole("button", { name: "Limpar busca" })).not.toBeInTheDocument();

    rerender(<SearchField aria-label="Buscar tokens" clearLabel="Limpar tokens" onClear={onClear} value="color" />);
    await user.click(screen.getByRole("button", { name: "Limpar tokens" }));
    expect(onClear).toHaveBeenCalledOnce();
  });

  it("atualiza SearchField por digitação", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { unmount } = render(<SearchField aria-label="Buscar" onChange={onChange} />);
    await user.type(screen.getByRole("searchbox", { name: "Buscar" }), "tokens");
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Limpar busca" })).toBeVisible();

    unmount();
    const empty = render(<SearchField aria-label="Vazio" />);
    expect(screen.queryByRole("button", { name: "Limpar busca" })).not.toBeInTheDocument();

    empty.rerender(<SearchField aria-label="Controlado" readOnly value="token" />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Controlado" }), { target: { value: "tokens" } });
    expect(screen.getByRole("searchbox", { name: "Controlado" })).toHaveValue("token");
  });

  it("renderiza Slider e SliderField com valor e descrição", () => {
    const { rerender } = render(<Slider aria-label="Intensidade" valueLabel="42%" />);
    expect(screen.getByRole("slider", { name: "Intensidade" })).toBeVisible();
    expect(screen.getByText("42%")).toBeVisible();

    rerender(<SliderField hint="Ajusta a densidade da interface" label="Densidade" valueLabel="Alta" />);
    expect(screen.getByRole("slider", { name: "Densidade" })).toHaveAccessibleDescription("Ajusta a densidade da interface");
    expect(screen.getByText("Alta")).toBeVisible();

    rerender(<SliderField label="Humor" />);
    expect(screen.getByRole("slider", { name: "Humor" })).toBeVisible();
  });
});

describe("componentes Onda 2", () => {
  const moodOptions = [
    { value: "focus", label: "Foco" },
    { value: "calm", label: "Calmo" },
    { value: "energy", label: "Energia", disabled: true },
  ];

  it("seleciona Combobox por clique e anuncia a opção atual", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { container } = render(<Combobox aria-label="Humor" defaultValue="focus" onValueChange={onValueChange} options={moodOptions} />);

    expect(screen.getByRole("combobox", { name: "Humor" })).toHaveValue("Foco");
    await user.click(screen.getByRole("button", { name: "Abrir opções" }));
    await user.click(screen.getByRole("option", { name: "Calmo" }));
    expect(onValueChange).toHaveBeenCalledWith("calm");
    expect(screen.getByRole("combobox", { name: "Humor" })).toHaveValue("Calmo");
    expect((await axe(container, { rules: { "color-contrast": { enabled: false } } })).violations).toHaveLength(0);
  });

  it("filtra Combobox, escolhe por Enter e fecha com Escape", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Combobox aria-label="Modo" onValueChange={onValueChange} options={moodOptions} placeholder="Escolha um modo" />);
    const input = screen.getByRole("combobox", { name: "Modo" });

    await user.type(input, "cal");
    expect(screen.getByRole("option", { name: "Calmo" })).toBeVisible();
    await user.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("calm");

    input.focus();
    await user.keyboard("{ArrowDown}{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("representa Combobox vazio e modo controlado", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Combobox aria-label="Busca vazia" emptyMessage="Sem resultados" options={moodOptions} />);
    await user.type(screen.getByRole("combobox", { name: "Busca vazia" }), "zzz");
    expect(screen.getByText("Sem resultados")).toBeVisible();

    unmount();
    render(<Combobox aria-label="Controlado" onValueChange={() => {}} options={moodOptions} value="focus" />);
    expect(screen.getByRole("combobox", { name: "Controlado" })).toHaveValue("Foco");
  });

  it("mantém Combobox controlado ao selecionar e ignora Enter sem lista disponível", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(<Combobox aria-label="Controlado" onValueChange={onValueChange} options={moodOptions} value="focus" />);

    await user.click(screen.getByRole("button", { name: "Abrir opções" }));
    await user.click(screen.getByRole("option", { name: "Calmo" }));
    expect(onValueChange).toHaveBeenCalledWith("calm");
    expect(screen.getByRole("combobox", { name: "Controlado" })).toHaveValue("Foco");

    rerender(<Combobox aria-label="Sem disponível" options={[{ disabled: true, label: "Bloqueado", value: "blocked" }]} />);
    const input = screen.getByRole("combobox", { name: "Sem disponível" });
    await user.type(input, "Bloq");
    await user.keyboard("{Enter}");
    expect(screen.getByRole("listbox")).toBeVisible();
  });

  it("compõe DropdownMenu com item, checkbox, radio, label e atalho", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onCheckedChange = vi.fn();
    render(<DropdownMenu>
      <DropdownMenuTrigger asChild><Button>Menu</Button></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem onSelect={onSelect}>Novo projeto<DropdownMenuShortcut>⌘N</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuCheckboxItem checked onCheckedChange={onCheckedChange}>Mostrar grid</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="dark">
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>);

    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByText("Ações")).toBeVisible();
    expect(screen.getByText("⌘N")).toBeVisible();
    expect(screen.getByRole("menuitemcheckbox", { name: "Mostrar grid" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("menuitemradio", { name: "Dark" })).toHaveAttribute("aria-checked", "true");
    await user.click(screen.getByRole("menuitem", { name: /Novo projeto/ }));
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it("renderiza DatePicker simples e DatePickerField com descrição", () => {
    const { rerender } = render(<DatePicker aria-label="Data" defaultValue="2026-07-13" />);
    expect(screen.getByLabelText("Data")).toHaveValue("2026-07-13");

    rerender(<DatePickerField hint="Use a data de publicação" label="Publicação" />);
    expect(screen.getByLabelText("Publicação")).toHaveAccessibleDescription("Use a data de publicação");

    rerender(<DatePickerField label="Sem dica" />);
    expect(screen.getByLabelText("Sem dica")).not.toHaveAttribute("aria-describedby");
  });

  it("seleciona arquivos no FileUpload e suporta modo mínimo", async () => {
    const user = userEvent.setup();
    const onFilesChange = vi.fn();
    const file = new File(["flytrap"], "flytrap.txt", { type: "text/plain" });
    const { rerender } = render(<FileUpload multiple onFilesChange={onFilesChange} />);

    await user.upload(screen.getByLabelText(/Selecionar arquivos/), file);
    expect(onFilesChange).toHaveBeenCalledWith([file]);
    expect(screen.getByText("flytrap.txt")).toBeVisible();

    rerender(<FileUpload description={null} label="Anexar referência" />);
    expect(screen.getByLabelText(/Anexar referência/)).toBeInTheDocument();
    expect(screen.queryByText("Arraste ou selecione arquivos.")).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Anexar referência/), { target: { files: null } });
    expect(screen.queryByText("flytrap.txt")).not.toBeInTheDocument();
  });

  it("compõe Page, Section e Toolbar com hierarquia semântica", async () => {
    const { container } = render(<Page>
      <PageHeader>
        <PageTitle>Componentes</PageTitle>
        <PageDescription>Biblioteca Flytrap.</PageDescription>
      </PageHeader>
      <Toolbar aria-label="Ações da página"><Button>Adicionar</Button><SearchField aria-label="Buscar componente" /></Toolbar>
      <Section aria-labelledby="section-title">
        <SectionHeader>
          <SectionTitle id="section-title">Inputs</SectionTitle>
          <SectionDescription>Controles de entrada.</SectionDescription>
        </SectionHeader>
      </Section>
    </Page>);

    expect(screen.getByRole("main")).toBeVisible();
    expect(screen.getByRole("heading", { level: 1, name: "Componentes" })).toBeVisible();
    expect(screen.getByRole("toolbar", { name: "Ações da página" })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: "Inputs" })).toBeVisible();
    expect((await axe(container, { rules: { "color-contrast": { enabled: false } } })).violations).toHaveLength(0);
  });
});

describe("componentes Onda 3", () => {
  it("compõe Container, Stack e Grid responsivos", () => {
    render(<Container>
      <Stack gap="lg">
        <Grid columns={4}>
          <span>Um</span>
          <span>Dois</span>
        </Grid>
      </Stack>
    </Container>);

    expect(screen.getByText("Um").parentElement).toHaveAttribute("data-slot", "grid");
    expect(screen.getByText("Dois").closest("[data-slot='container']")).toBeInTheDocument();
  });

  it.each(["sm", "md", "lg"] as const)("renderiza Stack com gap %s", (gap) => {
    const { container } = render(<Stack gap={gap}>Conteúdo</Stack>);
    expect(container.querySelector("[data-slot='stack']")).toBeInTheDocument();
  });

  it.each([1, 2, 3, 4] as const)("renderiza Grid com %i colunas", (columns) => {
    const { container } = render(<Grid columns={columns}>Conteúdo</Grid>);
    expect(container.querySelector("[data-slot='grid']")).toBeInTheDocument();
  });

  it("agrupa ações segmentadas com estado pressionado", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<ButtonGroup aria-label="Visualização">
      <ButtonGroupItem selected>Lista</ButtonGroupItem>
      <ButtonGroupItem onClick={onClick}>Grade</ButtonGroupItem>
      <ButtonGroupItem disabled>Mapa</ButtonGroupItem>
    </ButtonGroup>);

    expect(screen.getByRole("group", { name: "Visualização" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Lista" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Mapa" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Grade" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renderiza InteractiveCard selecionável com ícone, descrição e conteúdo", async () => {
    const { container, rerender } = render(<InteractiveCard description="Organismo reutilizável" heading="Componentes" icon={BrandIcon} selected>Use em telas densas.</InteractiveCard>);

    expect(screen.getByRole("button", { name: /Componentes/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Organismo reutilizável")).toBeVisible();
    expect(screen.getByText("Use em telas densas.")).toBeVisible();
    expect((await axe(container, { rules: { "color-contrast": { enabled: false } } })).violations).toHaveLength(0);

    rerender(<InteractiveCard heading="Tokens" />);
    expect(screen.getByRole("button", { name: "Tokens" })).toHaveAttribute("aria-pressed", "false");
  });

  it("compõe DataList com termos e descrições", () => {
    render(<DataList>
      <DataListItem>
        <DataListTerm>Status</DataListTerm>
        <DataListDescription>Sincronizado</DataListDescription>
      </DataListItem>
    </DataList>);

    expect(screen.getByText("Status").tagName).toBe("DT");
    expect(screen.getByText("Sincronizado").tagName).toBe("DD");
  });

  it.each([
    ["neutral", "Neutro"],
    ["info", "Informativo"],
    ["success", "Concluído"],
    ["warning", "Atenção"],
    ["error", "Erro"],
  ] as const)("renderiza StatusIndicator %s", (tone, label) => {
    render(<StatusIndicator tone={tone}>{label}</StatusIndicator>);
    expect(screen.getByRole("status")).toHaveTextContent(label);
  });

  it("renderiza StatusIndicator apenas com label visualmente oculto", () => {
    render(<StatusIndicator tone="success" />);
    expect(screen.getByRole("status")).toHaveTextContent("success");
  });

  it.each([
    ["neutral", "Criado"],
    ["info", "Em análise"],
    ["success", "Publicado"],
    ["warning", "Revisar"],
    ["error", "Falhou"],
  ] as const)("renderiza TimelineItem %s", (tone, title) => {
    render(<Timeline><TimelineItem description="Detalhe do evento" meta="agora" title={title} tone={tone} /></Timeline>);
    expect(screen.getByText(title)).toBeVisible();
    expect(screen.getByText("Detalhe do evento")).toBeVisible();
    expect(screen.getByText("agora")).toBeVisible();
  });

  it("renderiza TimelineItem mínimo", () => {
    render(<Timeline><TimelineItem title="Sem detalhes" /></Timeline>);
    expect(screen.getByText("Sem detalhes")).toBeVisible();
  });

  it("representa TreeView com item expandido, selecionado e desabilitado", async () => {
    const { container, rerender } = render(<TreeView aria-label="Arquitetura">
      <TreeItem expanded label="Components" selected>
        <TreeItem label="Button" />
      </TreeItem>
      <TreeItem disabled label="Deprecated" />
    </TreeView>);

    expect(screen.getByRole("tree", { name: "Arquitetura" })).toBeVisible();
    expect(screen.getByRole("treeitem", { name: "Components" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("treeitem", { name: "Components" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("treeitem", { name: "Deprecated" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("treeitem", { name: "Button" })).toBeVisible();
    expect((await axe(container, { rules: { "color-contrast": { enabled: false } } })).violations).toHaveLength(0);

    rerender(<TreeView aria-label="Fechada"><TreeItem expanded={false} label="Components"><TreeItem label="Button" /></TreeItem></TreeView>);
    expect(screen.queryByRole("treeitem", { name: "Button" })).not.toBeInTheDocument();
  });
});

describe("identidade de marca", () => {
  it("expõe logo com nome acessível e lockup sem duplicação", () => {
    render(<><BrandMark /><BrandLockup descriptor="Design System" /></>);
    expect(screen.getByRole("img", { name: "Flytrap" })).toHaveAttribute("src", expect.stringContaining("flytrap-logo.svg"));
    expect(screen.getByText("Design System")).toBeVisible();
  });

  it("expõe avatar AI e status separadamente", () => {
    render(<AiAvatar label="Assistente Flytrap" status="processing" />);
    expect(screen.getByRole("img", { name: "Assistente Flytrap" })).toBeVisible();
    expect(screen.getByRole("status", { name: "Processando" })).toBeVisible();
  });
});

describe("componentes AI", () => {
  it("anuncia somente o estado do streaming e permite retry", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<StreamingMessage onRetry={onRetry} status="interrupted">Resposta parcial preservada.</StreamingMessage>);

    expect(screen.getByRole("status")).toHaveTextContent("Resposta interrompida");
    await user.click(screen.getByRole("button", { name: "Tentar novamente" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("expõe detalhes de tool call sob demanda", async () => {
    const user = userEvent.setup();
    render(<ToolCallBlock input="query: tokens" name="search_design_system" output="3 resultados" status="success" />);

    expect(screen.queryByText("query: tokens")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /search_design_system/i }));
    expect(screen.getByText("query: tokens")).toBeVisible();
    expect(screen.getByText("3 resultados")).toBeVisible();
  });

  it("mantém aprovação humana explícita", async () => {
    const user = userEvent.setup();
    const onApprove = vi.fn();
    const onReject = vi.fn();
    render(<HumanApprovalPrompt description="A ação altera dados compartilhados." onApprove={onApprove} onReject={onReject} title="Publicar alterações?" />);

    await user.click(screen.getByRole("button", { name: "Aprovar" }));
    await user.click(screen.getByRole("button", { name: "Rejeitar" }));
    expect(onApprove).toHaveBeenCalledOnce();
    expect(onReject).toHaveBeenCalledOnce();
  });

  it("distingue citações disponíveis e ausentes", () => {
    render(<><CitationChip href="https://example.com" index={1} source="Documentação" /><CitationChip index={2} missing source="Fonte removida" /></>);
    expect(screen.getByRole("link", { name: /fonte 1/i })).toHaveAttribute("target", "_blank");
    expect(screen.getByText("[2] Fonte removida").closest("[data-slot='citation-chip']")).toHaveAttribute("data-state", "missing");
  });

  it("envia PromptInput com Enter e preserva Shift+Enter", async () => {
    const user = userEvent.setup();
    const onSubmitPrompt = vi.fn();
    function PromptFixture() {
      const [value, setValue] = React.useState("");
      return <PromptInput onSubmitPrompt={onSubmitPrompt} onValueChange={setValue} value={value} />;
    }
    render(<PromptFixture />);
    const input = screen.getByRole("textbox", { name: "Mensagem" });
    await user.type(input, "Olá{shift>}{enter}{/shift}mundo");
    expect(onSubmitPrompt).not.toHaveBeenCalled();
    await user.keyboard("{Enter}");
    expect(onSubmitPrompt).toHaveBeenCalledWith("Olá\nmundo");
  });

  it("apresenta somente resumo seguro de análise", async () => {
    const user = userEvent.setup();
    render(<ReasoningStream status="completed" summary="Foram comparados aliases e contraste." />);
    await user.click(screen.getByRole("button", { name: /resumo da análise/i }));
    expect(screen.getByText("Foram comparados aliases e contraste.")).toBeVisible();
    expect(screen.getByText(/não representa raciocínio interno/i)).toBeVisible();
  });

  it("representa estados assíncronos do ChatThread", () => {
    const { rerender } = render(<ChatThread state="empty" />);
    expect(screen.getByText("Comece uma conversa")).toBeVisible();
    rerender(<ChatThread state="loading" />);
    expect(screen.getByLabelText("Carregando conversa")).toBeVisible();
    rerender(<ChatThread errorMessage="Falha segura" state="error" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Falha segura");
  });
});

describe("estrutura e navegação", () => {
  it("expande e recolhe a Sidebar preservando estado semântico", async () => {
    const user = userEvent.setup();
    render(<SidebarProvider><Sidebar aria-label="Navegação principal" /><SidebarTrigger /></SidebarProvider>);

    expect(screen.getByLabelText("Navegação principal")).toHaveAttribute("data-state", "expanded");
    await user.click(screen.getByRole("button", { name: "Recolher navegação" }));
    expect(screen.getByLabelText("Navegação principal")).toHaveAttribute("data-state", "collapsed");
  });

  it("filtra comandos pela entrada de busca", async () => {
    const user = userEvent.setup();
    render(<Command><CommandInput aria-label="Buscar comandos" /><CommandList><CommandEmpty>Nenhum resultado</CommandEmpty><CommandItem>Tokens</CommandItem><CommandItem>Componentes</CommandItem></CommandList></Command>);

    await user.type(screen.getByRole("combobox", { name: "Menu de comandos" }), "tokens");
    expect(screen.getByText("Tokens")).toBeVisible();
    expect(screen.queryByText("Componentes")).not.toBeInTheDocument();
  });
});

describe("overlays e feedback", () => {
  it("abre e fecha Popover por teclado", async () => {
    const user = userEvent.setup();
    render(<Popover><PopoverTrigger asChild><Button>Filtros</Button></PopoverTrigger><PopoverContent>Opções de filtro</PopoverContent></Popover>);

    await user.click(screen.getByRole("button", { name: "Filtros" }));
    expect(screen.getByText("Opções de filtro")).toBeVisible();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("Opções de filtro")).not.toBeInTheDocument();
  });

  it("fornece nome e descrição ao Sheet", async () => {
    const user = userEvent.setup();
    render(<Sheet><SheetTrigger asChild><Button>Abrir painel</Button></SheetTrigger><SheetContent><SheetTitle>Preferências</SheetTitle><SheetDescription>Configure a experiência.</SheetDescription></SheetContent></Sheet>);

    await user.click(screen.getByRole("button", { name: "Abrir painel" }));
    expect(screen.getByRole("dialog", { name: "Preferências" })).toHaveAccessibleDescription("Configure a experiência.");
    await user.click(screen.getByRole("button", { name: "Fechar" }));
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Preferências" })).not.toBeInTheDocument());
  });

  it("anuncia Toast sem bloquear a interface", () => {
    render(<ToastProvider><Toast open><div><ToastTitle>Alterações salvas</ToastTitle><ToastDescription>O componente foi atualizado.</ToastDescription></div></Toast><ToastViewport /></ToastProvider>);
    expect(screen.getByText("Alterações salvas")).toBeVisible();
    expect(screen.getByText("O componente foi atualizado.")).toBeVisible();
  });
});

describe("Tabs", () => {
  it("troca o painel por teclado", async () => {
    const user = userEvent.setup();
    render(<Tabs defaultValue="preview"><TabsList aria-label="Visualização"><TabsTrigger value="preview">Preview</TabsTrigger><TabsTrigger value="code">Código</TabsTrigger></TabsList><TabsContent value="preview">Componente renderizado</TabsContent><TabsContent value="code">Exemplo de código</TabsContent></Tabs>);

    screen.getByRole("tab", { name: "Preview" }).focus();
    await user.keyboard("{ArrowRight}");

    await waitFor(() => expect(screen.getByRole("tab", { name: "Código" })).toHaveAttribute("data-state", "active"));
    expect(screen.getByText("Exemplo de código")).toBeVisible();
  });
});

describe("Alert", () => {
  it.each([
    ["info", "status"],
    ["success", "status"],
    ["warning", "status"],
    ["error", "alert"],
  ] as const)("usa role=%s para a variante %s", async (variant, role) => {
    const { container } = render(<Alert variant={variant}><AlertTitle>Título</AlertTitle><AlertDescription>Descrição</AlertDescription></Alert>);
    expect(screen.getByRole(role)).toHaveTextContent("Título");
    expect((await axe(container, { rules: { "color-contrast": { enabled: false } } })).violations).toHaveLength(0);
  });

  it("usa a variante info por padrão", () => {
    render(<Alert>Conteúdo</Alert>);
    expect(screen.getByRole("status")).toHaveTextContent("Conteúdo");
  });

  it("recorre ao ícone info quando a variante é explicitamente nula", () => {
    render(<Alert variant={null}>Conteúdo</Alert>);
    expect(screen.getByRole("status")).toHaveTextContent("Conteúdo");
  });
});

describe("Card", () => {
  it("compõe cabeçalho, conteúdo e rodapé", () => {
    render(<Card>
      <CardHeader><CardTitle>Título</CardTitle><CardDescription>Descrição</CardDescription></CardHeader>
      <CardContent>Conteúdo</CardContent>
      <CardFooter>Rodapé</CardFooter>
    </Card>);
    expect(screen.getByText("Título")).toBeVisible();
    expect(screen.getByText("Descrição")).toBeVisible();
    expect(screen.getByText("Conteúdo")).toBeVisible();
    expect(screen.getByText("Rodapé")).toBeVisible();
  });
});

describe("Header", () => {
  it("organiza marca, título e ações", () => {
    render(<Header><HeaderBrand>Marca</HeaderBrand><HeaderTitle>Painel</HeaderTitle><HeaderActions><button>Ação</button></HeaderActions></Header>);
    expect(screen.getByText("Marca")).toBeVisible();
    expect(screen.getByRole("heading", { name: "Painel" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Ação" })).toBeVisible();
  });
});

describe("Input e Field", () => {
  it("prioriza erro sobre hint e omite a mensagem quando ambos faltam", () => {
    const { rerender } = render(<Field hint="Dica" label="Com dica"><Input /></Field>);
    expect(screen.getByText("Dica")).toBeVisible();

    rerender(<Field error="Campo obrigatório" hint="Dica" label="Com erro"><Input /></Field>);
    expect(screen.getByText("Campo obrigatório")).toBeVisible();
    expect(screen.queryByText("Dica")).not.toBeInTheDocument();

    rerender(<Field label="Sem mensagem"><Input /></Field>);
    expect(screen.getByText("Sem mensagem")).toBeVisible();
  });
});

describe("Progress", () => {
  it.each([
    [-10, "0"],
    [50, "50"],
    [150, "100"],
  ])("normaliza o valor %i para %s", (value, expected) => {
    render(<Progress value={value} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", expected);
  });
});

describe("AgentCard", () => {
  it.each([
    ["idle", "Idle"],
    ["running", "Running"],
    ["completed", "Completed"],
    ["error", "Error"],
  ] as const)("exibe o status %s como %s", (status, label) => {
    render(<AgentCard model="gpt-5" name="Pesquisador" status={status} tokens="1.2k">Resumo da tarefa</AgentCard>);
    expect(screen.getByText(label)).toBeVisible();
    expect(screen.getByText("gpt-5")).toBeVisible();
    expect(screen.getByText("1.2k tokens")).toBeVisible();
  });

  it("omite o rodapé de metadados quando model e tokens não são informados", () => {
    render(<AgentCard name="Pesquisador" status="idle">Resumo da tarefa</AgentCard>);
    expect(screen.queryByText(/tokens/)).not.toBeInTheDocument();
  });
});

describe("InsightCallout", () => {
  it.each([
    [undefined, "Insight padrão"],
    ["warning", "Insight de atenção"],
    ["success", "Insight positivo"],
  ] as const)("renderiza título e conteúdo para severidade %s", (severity, title) => {
    render(<InsightCallout severity={severity} title={title}>Detalhe da observação.</InsightCallout>);
    expect(screen.getByRole("heading", { name: title })).toBeVisible();
    expect(screen.getByText("Detalhe da observação.")).toBeVisible();
  });
});

describe("KpiStatCard", () => {
  it("omite a variação quando delta não é informado", () => {
    render(<KpiStatCard label="Usuários ativos" value="1.204" />);
    expect(screen.getByText("1.204")).toBeVisible();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it.each([
    [12, "12%"],
    [-8, "8%"],
    [0, "0%"],
  ])("exibe a variação %i formatada", (delta, expected) => {
    render(<KpiStatCard delta={delta} description="vs. semana anterior" label="Conversões" value="342" />);
    expect(screen.getByText(new RegExp(expected))).toBeVisible();
  });
});

describe("MessageBubble", () => {
  it.each(["user", "assistant"] as const)("renderiza a mensagem do papel %s", (role) => {
    render(<MessageBubble role={role}>Olá!</MessageBubble>);
    expect(screen.getByText("Olá!")).toBeVisible();
  });
});

describe("FlytrapIcon", () => {
  it("fica oculto de leitores de tela sem label e visível como imagem com label", () => {
    const { rerender } = render(<FlytrapIcon icon={SuccessIcon} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    rerender(<FlytrapIcon icon={SuccessIcon} label="Sucesso" />);
    expect(screen.getByRole("img", { name: "Sucesso" })).toBeVisible();
  });
});

describe("Badge", () => {
  it.each(["default", "secondary", "outline", "success", "warning", "destructive"] as const)("renderiza a variante %s", (variant) => {
    render(<Badge variant={variant}>Rótulo {variant}</Badge>);
    expect(screen.getByText(`Rótulo ${variant}`)).toBeVisible();
  });
});

describe("Button asChild e IconButton", () => {
  it("propaga aria-disabled ao filho quando asChild e desabilitado", () => {
    render(<Button asChild disabled><a href="/destino">Ir</a></Button>);
    expect(screen.getByRole("link", { name: "Ir" })).toHaveAttribute("aria-disabled", "true");
  });

  it("não marca aria-disabled quando asChild não está desabilitado", () => {
    render(<Button asChild><a href="/destino">Ir</a></Button>);
    expect(screen.getByRole("link", { name: "Ir" })).not.toHaveAttribute("aria-disabled");
  });

  it("bloqueia clique e ativação por teclado quando asChild e desabilitado", () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn();
    render(<Button asChild disabled onClick={onClick} onKeyDown={onKeyDown}><a href="/destino">Ir</a></Button>);
    const link = screen.getByRole("link", { name: "Ir" });

    expect(link).toHaveAttribute("tabIndex", "-1");
    fireEvent.click(link);
    fireEvent.keyDown(link, { key: "Enter" });
    fireEvent.keyDown(link, { key: " " });
    fireEvent.keyDown(link, { key: "Escape" });
    expect(onClick).not.toHaveBeenCalled();
    expect(onKeyDown).toHaveBeenCalledOnce();
  });

  it("expõe rótulo acessível em IconButton", () => {
    render(<IconButton icon={SuccessIcon} label="Confirmar" />);
    expect(screen.getByRole("button", { name: "Confirmar" })).toBeVisible();
  });

  it.each(["ghost", "link"] as const)("usa token disabled na variante %s", (variant) => {
    render(<Button disabled variant={variant}>Ação {variant}</Button>);
    expect(screen.getByRole("button", { name: `Ação ${variant}` })).toHaveClass(`disabled:opacity-(--button-${variant}-opacity-disabled)`);
  });
});

describe("Checkbox", () => {
  it("dispensa aria-describedby quando não há descrição", () => {
    render(<CheckboxField label="Sem descrição" />);
    expect(screen.getByLabelText("Sem descrição")).not.toHaveAttribute("aria-describedby");
  });

  it("associa a descrição e respeita um id explícito", () => {
    render(<CheckboxField checkboxProps={{ id: "aceite" }} description="Necessário para prosseguir" label="Aceitar termos" />);
    const checkbox = screen.getByLabelText("Aceitar termos");
    expect(checkbox).toHaveAttribute("id", "aceite");
    expect(checkbox).toHaveAttribute("aria-describedby", "aceite-description");
    expect(screen.getByText("Necessário para prosseguir")).toBeVisible();
  });

  it("propaga estado disabled para o field", () => {
    render(<CheckboxField checkboxProps={{ disabled: true }} label="Desativado" />);
    expect(screen.getByLabelText("Desativado")).toBeDisabled();
    expect(screen.getByText("Desativado").closest("div.flex")).toHaveClass("min-h-11", "opacity-70");
  });
});

describe("RadioGroup", () => {
  it("propaga estado disabled para o field", () => {
    render(<RadioGroup aria-label="Densidade"><RadioGroupField disabled label="Desativado" value="off" /></RadioGroup>);
    expect(screen.getByLabelText("Desativado")).toBeDisabled();
    expect(screen.getByText("Desativado").closest("div.flex")).toHaveClass("min-h-11", "opacity-70");
  });
});

describe("Command extras", () => {
  it("usa título e descrição padrão do CommandDialog", async () => {
    render(<CommandDialog open><CommandGroup><CommandItem>Item<CommandShortcut>⌘K</CommandShortcut></CommandItem></CommandGroup><CommandSeparator /></CommandDialog>);
    expect(screen.getByRole("dialog", { name: "Menu de comandos" })).toBeVisible();
    expect(screen.getByText("⌘K")).toBeVisible();
  });
});

describe("Dialog", () => {
  it("abre, exibe cabeçalho e rodapé e fecha", async () => {
    const user = userEvent.setup();
    render(<Dialog><DialogTrigger asChild><Button>Abrir</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Confirmação</DialogTitle><DialogDescription>Detalhes da ação.</DialogDescription></DialogHeader><DialogFooter><Button>Confirmar</Button></DialogFooter></DialogContent></Dialog>);

    await user.click(screen.getByRole("button", { name: "Abrir" }));
    const dialog = screen.getByRole("dialog", { name: "Confirmação" });
    expect(dialog).toHaveAccessibleDescription("Detalhes da ação.");
    expect((await axe(dialog, { rules: { "color-contrast": { enabled: false } } })).violations).toHaveLength(0);

    await user.click(screen.getByRole("button", { name: "Fechar" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("compõe o fluxo de confirmação do AlertDialog", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<AlertDialog><AlertDialogTrigger asChild><Button>Excluir</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir item?</AlertDialogTitle><AlertDialogDescription>Ação irreversível.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={onConfirm}>Excluir</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>);

    await user.click(screen.getByRole("button", { name: "Excluir" }));
    await user.click(screen.getByRole("button", { name: "Excluir" }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });
});

describe("EmptyState", () => {
  it("renderiza ícone, descrição e ação quando fornecidos", () => {
    render(<EmptyState action={<button>Tentar novamente</button>} description="Nada por aqui ainda." icon={SuccessIcon} title="Sem resultados" />);
    expect(screen.getByRole("heading", { name: "Sem resultados" })).toBeVisible();
    expect(screen.getByText("Nada por aqui ainda.")).toBeVisible();
    expect(screen.getByRole("button", { name: "Tentar novamente" })).toBeVisible();
  });

  it("funciona apenas com o título obrigatório", () => {
    render(<EmptyState title="Vazio" />);
    expect(screen.getByRole("heading", { name: "Vazio" })).toBeVisible();
  });
});

describe("Select", () => {
  it("seleciona uma opção pelo teclado", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Select onValueChange={onValueChange}>
      <SelectTrigger aria-label="Ordenar por"><SelectValue placeholder="Escolha" /></SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ordenação</SelectLabel>
          <SelectItem value="recent">Mais recentes</SelectItem>
          <SelectSeparator />
          <SelectItem value="relevant">Mais relevantes</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>);

    await user.click(screen.getByRole("combobox", { name: "Ordenar por" }));
    await user.click(await screen.findByText("Mais relevantes"));
    expect(onValueChange).toHaveBeenCalledWith("relevant");
  });
});

describe("Separator", () => {
  it.each(["horizontal", "vertical"] as const)("renderiza a orientação %s", (orientation) => {
    const { container } = render(<Separator orientation={orientation} />);
    expect(container.querySelector("[data-slot='separator']")).toHaveAttribute("data-orientation", orientation);
  });
});

describe("Sheet extras", () => {
  it("renderiza cabeçalho e rodapé", async () => {
    const user = userEvent.setup();
    render(<Sheet><SheetTrigger asChild><Button>Abrir</Button></SheetTrigger><SheetContent><SheetHeader><SheetTitle>Filtros</SheetTitle><SheetDescription>Refine a busca.</SheetDescription></SheetHeader><SheetFooter><Button>Aplicar</Button></SheetFooter></SheetContent></Sheet>);
    await user.click(screen.getByRole("button", { name: "Abrir" }));
    expect(screen.getByRole("button", { name: "Aplicar" })).toBeVisible();
  });
});

describe("Sidebar extras", () => {
  it("expõe o menu com item ativo e ação asChild", () => {
    render(<SidebarProvider><SidebarHeader>Cabeçalho</SidebarHeader><SidebarContent><SidebarGroup><SidebarGroupLabel>Seção</SidebarGroupLabel><SidebarMenu><SidebarMenuItem><SidebarMenuButton active><SidebarMenuLabel>Painel</SidebarMenuLabel></SidebarMenuButton></SidebarMenuItem><SidebarMenuItem><SidebarMenuButton asChild><a href="/config">Configurações</a></SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarGroup></SidebarContent><SidebarFooter>Rodapé</SidebarFooter></SidebarProvider>);
    expect(screen.getByRole("button", { name: "Painel" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Configurações" })).toBeVisible();
  });

  it("colapsa o rótulo do grupo e centraliza os itens do menu", () => {
    render(<SidebarProvider defaultOpen={false}><SidebarGroup><SidebarGroupLabel>Seção</SidebarGroupLabel></SidebarGroup><SidebarMenu><SidebarMenuItem><SidebarMenuButton>Painel</SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarProvider>);
    expect(screen.getByText("Seção")).toHaveClass("sr-only");
  });

  it("abre o painel móvel pelo gatilho dedicado", async () => {
    const user = userEvent.setup();
    render(<SidebarProvider><SidebarMobileTrigger /><SidebarMobile><SidebarMenu><SidebarMenuItem>Item móvel</SidebarMenuItem></SidebarMenu></SidebarMobile></SidebarProvider>);
    await user.click(screen.getByRole("button", { name: "Abrir navegação" }));
    expect(await screen.findByText("Item móvel")).toBeVisible();
  });

  it("exige SidebarProvider para usar useSidebar", () => {
    function Consumer() {
      useSidebar();
      return null;
    }
    expect(() => render(<Consumer />)).toThrow("useSidebar deve ser usado dentro de SidebarProvider");
  });

  it("respeita o modo controlado via open/onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<SidebarProvider onOpenChange={onOpenChange} open={false}><Sidebar aria-label="Navegação" /><SidebarTrigger /></SidebarProvider>);
    expect(screen.getByLabelText("Navegação")).toHaveAttribute("data-state", "collapsed");
    await user.click(screen.getByRole("button", { name: "Expandir navegação" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByLabelText("Navegação")).toHaveAttribute("data-state", "collapsed");
  });
});

describe("Skeleton", () => {
  it.each(["text", "circle", "block"] as const)("renderiza a forma %s", (shape) => {
    const { container } = render(<Skeleton shape={shape} />);
    expect(container.querySelector("[data-slot='skeleton']")).toBeInTheDocument();
  });
});

describe("Switch", () => {
  it("dispensa aria-describedby quando não há descrição", () => {
    render(<SwitchField label="Sem descrição" />);
    expect(screen.getByLabelText("Sem descrição")).not.toHaveAttribute("aria-describedby");
  });

  it("associa a descrição quando informada", () => {
    render(<SwitchField description="Recebe notificações por e-mail" label="Notificações" />);
    expect(screen.getByLabelText("Notificações")).toHaveAttribute("aria-describedby");
    expect(screen.getByText("Recebe notificações por e-mail")).toBeVisible();
  });

  it("propaga estado disabled para o field", () => {
    render(<SwitchField label="Desativado" switchProps={{ disabled: true }} />);
    expect(screen.getByLabelText("Desativado")).toBeDisabled();
    expect(screen.getByText("Desativado").closest("div.flex")).toHaveClass("min-h-11", "opacity-70");
  });
});

describe("Toast extras", () => {
  it("permite ação e fechamento explícitos", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(<ToastProvider><Toast open><ToastTitle>Falha ao salvar</ToastTitle><ToastAction altText="Tentar novamente" onClick={onAction}>Repetir</ToastAction><ToastClose /></Toast><ToastViewport /></ToastProvider>);
    await user.click(screen.getByRole("button", { name: "Repetir" }));
    expect(onAction).toHaveBeenCalledOnce();
    await user.click(screen.getByRole("button", { name: "Fechar notificação" }));
  });
});

describe("Tooltip", () => {
  it("exibe o conteúdo ao focar o gatilho", async () => {
    const user = userEvent.setup();
    render(<TooltipProvider><Tooltip><TooltipTrigger asChild><Button>Ajuda</Button></TooltipTrigger><TooltipContent>Mais informações</TooltipContent></Tooltip></TooltipProvider>);
    await user.tab();
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Mais informações");
  });
});

describe("Avatar", () => {
  it.each(["sm", "md", "lg"] as const)("renderiza o fallback no tamanho %s", (size) => {
    render(<Avatar size={size}><AvatarFallback>FT</AvatarFallback></Avatar>);
    expect(screen.getByText("FT")).toBeVisible();
  });
});

describe("ChatThread extras", () => {
  it("renderiza os filhos no estado ready", () => {
    render(<ChatThread state="ready"><p>Mensagem existente</p></ChatThread>);
    expect(screen.getByText("Mensagem existente")).toBeVisible();
  });
});

describe("HumanApprovalPrompt extras", () => {
  it.each([
    ["approved", "Aprovado"],
    ["rejected", "Rejeitado"],
    ["expired", "Expirado"],
  ] as const)("oculta as ações quando o status é %s", (status, label) => {
    render(<HumanApprovalPrompt description="Detalhe" status={status} title="Decisão registrada" />);
    expect(screen.getByText(label)).toBeVisible();
    expect(screen.queryByRole("button", { name: "Aprovar" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Rejeitar" })).not.toBeInTheDocument();
  });

  it("exibe detalhes e prazo de expiração quando pendente", () => {
    render(<HumanApprovalPrompt description="Detalhe" details={<span>Contexto extra</span>} expiresAt="em 2 horas" title="Publicar?" />);
    expect(screen.getByText("Contexto extra")).toBeVisible();
    expect(screen.getByText("Expira em 2 horas")).toBeVisible();
  });
});

describe("PromptInput extras", () => {
  it("bloqueia o envio quando o valor está vazio ou já enviando", async () => {
    const onSubmitPrompt = vi.fn();
    render(<PromptInput onSubmitPrompt={onSubmitPrompt} onValueChange={() => {}} submitting value="" />);
    expect(screen.getByRole("button", { name: "Enviar mensagem" })).toBeDisabled();
  });

  it("renderiza contador, anexo e rodapé", () => {
    render(<PromptInput attachmentAction={<button>Anexar</button>} footer={<span>Modelo: gpt-5</span>} onSubmitPrompt={() => {}} onValueChange={() => {}} value="Olá" />);
    expect(screen.getByText("3/4000")).toBeVisible();
    expect(screen.getByRole("button", { name: "Anexar" })).toBeVisible();
    expect(screen.getByText("Modelo: gpt-5")).toBeVisible();
  });

  it("ignora Enter durante composição de IME", () => {
    const onSubmitPrompt = vi.fn();
    render(<PromptInput onSubmitPrompt={onSubmitPrompt} onValueChange={() => {}} value="日本語" />);
    fireEvent.keyDown(screen.getByRole("textbox", { name: "Mensagem" }), { isComposing: true, key: "Enter" });
    expect(onSubmitPrompt).not.toHaveBeenCalled();
  });

  it("envia ao submeter o formulário pelo botão", async () => {
    const user = userEvent.setup();
    const onSubmitPrompt = vi.fn();
    render(<PromptInput onSubmitPrompt={onSubmitPrompt} onValueChange={() => {}} value="Enviar pelo botão" />);
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));
    expect(onSubmitPrompt).toHaveBeenCalledWith("Enviar pelo botão");
  });

  it("executa o handler nativo de submit do formulário", () => {
    const onSubmitPrompt = vi.fn();
    const { container } = render(<PromptInput onSubmitPrompt={onSubmitPrompt} onValueChange={() => {}} value="Submit nativo" />);
    fireEvent.submit(container.querySelector("form")!);
    expect(onSubmitPrompt).toHaveBeenCalledWith("Submit nativo");
  });

  it("ignora submit vazio ou enquanto já está enviando", () => {
    const onSubmitPrompt = vi.fn();
    const { container, rerender } = render(<PromptInput onSubmitPrompt={onSubmitPrompt} onValueChange={() => {}} value="   " />);
    fireEvent.submit(container.querySelector("form")!);
    rerender(<PromptInput onSubmitPrompt={onSubmitPrompt} onValueChange={() => {}} submitting value="Ainda enviando" />);
    fireEvent.submit(container.querySelector("form")!);
    expect(onSubmitPrompt).not.toHaveBeenCalled();
  });
});

describe("ReasoningStream extras", () => {
  it.each([
    ["streaming", "Analisando"],
    ["interrupted", "Análise interrompida"],
  ] as const)("exibe o status %s", async (status, label) => {
    const user = userEvent.setup();
    render(<ReasoningStream status={status} summary="Resumo" />);
    await user.click(screen.getByRole("button", { name: /resumo da análise/i }));
    expect(screen.getByText(label)).toBeVisible();
  });
});

describe("StreamingMessage extras", () => {
  it("não exibe ícone de erro nem retry quando concluída", () => {
    render(<StreamingMessage status="completed">Resposta final.</StreamingMessage>);
    expect(screen.getByText("Resposta concluída")).toBeVisible();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("indica o estado streaming", () => {
    render(<StreamingMessage status="streaming">Gerando...</StreamingMessage>);
    expect(screen.getByText("Resposta em andamento")).toBeVisible();
  });
});

describe("ToolCallBlock extras", () => {
  it("usa a mensagem de erro padrão quando não informada", async () => {
    const user = userEvent.setup();
    render(<ToolCallBlock name="delete_records" status="error" />);
    await user.click(screen.getByRole("button", { name: /delete_records/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("A ferramenta falhou sem expor detalhes sensíveis.");
  });

  it.each([
    ["pending", "Pendente"],
    ["running", "Executando"],
  ] as const)("exibe o status %s sem duração quando ausente", (status, label) => {
    render(<ToolCallBlock name="fetch_data" status={status} />);
    expect(screen.getByText(label)).toBeVisible();
  });

  it("exibe a duração quando informada", () => {
    render(<ToolCallBlock duration="1.2s" name="fetch_data" status="success" />);
    expect(screen.getByText("1.2s")).toBeVisible();
  });
});

describe("componentes P1", () => {
  it("compõe accordion, scroll area e breadcrumb acessíveis", async () => {
    const { container } = render(<>
      <Accordion><AccordionItem open><AccordionTrigger>Contrato</AccordionTrigger><AccordionContent>Detalhes</AccordionContent></AccordionItem></Accordion>
      <ScrollArea className="h-20"><p>Conteúdo rolável</p></ScrollArea>
      <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">Início</BreadcrumbLink><BreadcrumbSeparator /><BreadcrumbPage>Agentes</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
    </>);
    expect(screen.getByText("Detalhes")).toBeVisible();
    expect(screen.getByText("Agentes")).toHaveAttribute("aria-current", "page");
    expect(container.querySelector("[tabindex='0']")).toBeInTheDocument();
    expect((await axe(container)).violations).toHaveLength(0);
  });

  it("permite navegar entre páginas", async () => {
    const user = userEvent.setup();
    const next = vi.fn();
    render(<Pagination><PaginationPrevious disabled /><PaginationPage current>1</PaginationPage><PaginationPage>2</PaginationPage><PaginationNext onClick={next} /></Pagination>);
    expect(screen.getByRole("button", { name: "Página 1" })).toHaveAttribute("aria-current", "page");
    await user.click(screen.getByRole("button", { name: "Próxima" }));
    expect(next).toHaveBeenCalledOnce();
  });

  it("copia conteúdo com adaptador injetado", async () => {
    const user = userEvent.setup();
    const copy = vi.fn().mockResolvedValue(undefined);
    render(<CopyButton copy={copy} value="token-123" />);
    await user.click(screen.getByRole("button", { name: /copiar/i }));
    expect(copy).toHaveBeenCalledWith("token-123");
    expect(screen.getByText("Copiado")).toBeVisible();
  });

  it.each([
    ["idle", "Inativo"],
    ["queued", "Na fila"],
    ["running", "Executando"],
    ["completed", "Concluído"],
    ["error", "Erro"],
  ] as const)("apresenta o status de agente %s", (status, label) => {
    render(<AgentStatusIndicator status={status} />);
    expect(screen.getByRole("status")).toHaveTextContent(label);
  });

  it("apresenta rastreamento e consumo da execução", () => {
    render(<>
      <RunTraceTimeline steps={[
        { id: "1", title: "Planejamento", description: "Definiu a estratégia", duration: "120 ms", status: "completed" },
        { id: "2", title: "Resposta", status: "running" },
      ]} />
      <CostTokenMeter cost="R$ 0,08" limit={1000} used={1200} />
    </>);
    expect(screen.getByText("Definiu a estratégia")).toBeVisible();
    expect(screen.getByText("120 ms")).toBeVisible();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-label", "100% dos tokens utilizados");
    expect(screen.getByText(/R\$ 0,08/)).toBeVisible();
  });

  it("seleciona prompts sugeridos e oferece ações de mensagem", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onRetry = vi.fn();
    const copy = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    render(<>
      <SuggestedPrompts onSelect={onSelect} prompts={["Resumir contexto"]} />
      <MessageActions content="Resposta" feedback={<button>Útil</button>} onRetry={onRetry} />
    </>);
    await user.click(screen.getByRole("button", { name: "Resumir contexto" }));
    await user.click(screen.getByRole("button", { name: "Copiar" }));
    await user.click(screen.getByRole("button", { name: "Tentar novamente" }));
    expect(onSelect).toHaveBeenCalledWith("Resumir contexto");
    expect(copy).toHaveBeenCalledWith("Resposta");
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("filtra e renderiza tabela com célula customizada", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const rows = [{ id: "1", name: "Curadoria", state: "Ativo" }];
    render(<>
      <FilterBar onValueChange={onValueChange} value=""><button>Estado</button></FilterBar>
      <SmartDataTable
        caption="Agentes"
        columns={[
          { key: "name", header: "Nome" },
          { key: "state", header: "Estado", render: value => <strong>{value}</strong> },
        ]}
        getRowId={row => row.id}
        rows={rows}
      />
    </>);
    await user.type(screen.getByRole("searchbox", { name: "Filtrar resultados" }), "cura");
    expect(onValueChange).toHaveBeenCalled();
    expect(screen.getByRole("table", { name: "Agentes" })).toBeVisible();
    expect(screen.getByText("Ativo").tagName).toBe("STRONG");
  });

  it("apresenta estado vazio da tabela", () => {
    render(<SmartDataTable caption="Sem dados" columns={[{ key: "name", header: "Nome" }]} getRowId={row => String(row.name)} rows={[]} />);
    expect(screen.getByText("Nenhum resultado.")).toBeVisible();
  });
});
