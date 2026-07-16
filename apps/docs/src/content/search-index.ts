import { generatedFlytrapMemoryIndex } from "./generated-memory-index";

export type FlytrapMemoryType =
  | "component"
  | "development"
  | "governance"
  | "pattern"
  | "token"
  | "workflow";

export interface FlytrapMemoryItem {
  answer: string;
  href: string;
  id: string;
  source: string;
  summary: string;
  tags: readonly string[];
  title: string;
  type: FlytrapMemoryType;
}

export interface FlytrapMemoryResult extends FlytrapMemoryItem {
  score: number;
}

export interface FlytrapMemoryAnswer {
  confidence: "high" | "medium" | "low";
  response: string;
  sources: FlytrapMemoryResult[];
}

const curatedFlytrapMemoryIndex = [
  {
    answer: "Flytrap is a multibrand, AI-first design system built on semantic tokens, React components, APCA gates and a living public documentation experience.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/00-overview.md",
    id: "flytrap-overview",
    source: "docs/00-overview.md",
    summary: "Project concept, goals, stack, brand language and maturity status.",
    tags: ["overview", "flytrap", "design system", "ai-first", "multibrand", "stack", "status", "brand"],
    title: "Flytrap overview",
    type: "governance",
  },
  {
    answer: "Install `@louizeb/flytrap-ui`, import the component from the package barrel, and load `@louizeb/flytrap-ui/styles` once in the app entry.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/18-distribution.md",
    id: "install-ui",
    source: "docs/18-distribution.md",
    summary: "Package installation, distribution and usage contract for product teams.",
    tags: ["install", "package", "pnpm", "npm", "styles", "@louizeb/flytrap-ui", "setup"],
    title: "Install the Design System",
    type: "development",
  },
  {
    answer: "Use Button for primary, secondary, outline, ghost and link actions. Keep loading, disabled and focus states explicit.",
    href: "#component-inputs",
    id: "button-component",
    source: "packages/ui/src/components/button.tsx",
    summary: "Action component with tokenized variants, sizes, loading behavior and accessible focus.",
    tags: ["button", "action", "primary", "secondary", "loading", "disabled", "focus"],
    title: "Button",
    type: "component",
  },
  {
    answer: "Use Form, Field, Label, Input, Textarea, Select, Checkbox, RadioGroup and validation messages to build accessible form flows.",
    href: "#component-inputs",
    id: "form-components",
    source: "docs/04-components.md",
    summary: "Input and form components for data collection with labels, helper text, errors and explicit states.",
    tags: ["form", "field", "label", "input", "textarea", "select", "checkbox", "radio", "validation"],
    title: "Forms and inputs",
    type: "component",
  },
  {
    answer: "Use SearchField when users need to filter components, docs or local memory. It exposes a searchbox role and clear action.",
    href: "#component-inputs",
    id: "search-field-component",
    source: "packages/ui/src/components/search-field.tsx",
    summary: "Search input with accessible role, icon affordance and clear button.",
    tags: ["search", "searchfield", "filter", "input", "clear", "memory"],
    title: "SearchField",
    type: "component",
  },
  {
    answer: "Use DropdownMenu, Combobox, CommandMenu, Tabs, Breadcrumb and NavigationRail when users need to move through commands, sections or grouped choices.",
    href: "#component-navigation",
    id: "navigation-components",
    source: "docs/04-components.md",
    summary: "Navigation and command components with keyboard order, current state and explicit labels.",
    tags: ["navigation", "dropdown", "combobox", "command", "tabs", "breadcrumb", "rail", "keyboard"],
    title: "Navigation components",
    type: "component",
  },
  {
    answer: "Use SmartDataTable, DataList, Timeline, TokenSwatch, Chart and StatusIndicator when the interface needs readable status, metrics, token values or operational evidence.",
    href: "#component-data-display",
    id: "data-display-components",
    source: "docs/04-components.md",
    summary: "Data display components for tables, lists, timelines, charts, status and token documentation.",
    tags: ["data", "table", "list", "timeline", "chart", "status", "token swatch", "metrics"],
    title: "Data display components",
    type: "component",
  },
  {
    answer: "Use Dialog, Sheet, Popover, Tooltip and Toast for focused temporary content. Keep close actions, focus return and keyboard escape behavior explicit.",
    href: "#component-overlays",
    id: "overlay-components",
    source: "docs/04-components.md",
    summary: "Overlay components for confirmations, contextual help and temporary UI surfaces.",
    tags: ["dialog", "sheet", "popover", "tooltip", "toast", "overlay", "focus", "escape"],
    title: "Overlay components",
    type: "component",
  },
  {
    answer: "Use MoodSelector, MoodSignal, RecommendationRail, MediaCard, PlayerControls, ModelConfidence and PersonalizationPanel for mood-shaped streaming experiences.",
    href: "#component-ai",
    id: "ai-streaming-components",
    source: "docs/04-components.md",
    summary: "AI and streaming components that expose mood, confidence, playback, recommendations and user control.",
    tags: ["ai", "streaming", "mood", "media", "recommendation", "player", "confidence", "personalization"],
    title: "AI and streaming components",
    type: "component",
  },
  {
    answer: "Use Alert for persistent inline feedback. The component maps error to `role=\"alert\"` and non-error feedback to `role=\"status\"`.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/alert.tsx",
    id: "alert-component",
    source: "packages/ui/src/components/alert.tsx",
    summary: "Feedback surface with info, success, warning and error variants plus title and description slots.",
    tags: ["alert", "feedback", "status", "error", "info", "success", "warning", "role alert"],
    title: "Alert",
    type: "component",
  },
  {
    answer: "Use InlineNotification when feedback needs title, body and an optional action in one compact row.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/inline-notification.tsx",
    id: "inline-notification-component",
    source: "packages/ui/src/components/inline-notification.tsx",
    summary: "Actionable feedback row with semantic status roles and optional action content.",
    tags: ["inline notification", "notification", "feedback", "status", "action", "error", "success"],
    title: "InlineNotification",
    type: "component",
  },
  {
    answer: "Use Avatar for people or entities and AiAvatar for the Flytrap assistant, with image fallback and visible online, processing or offline status.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/avatar.tsx",
    id: "avatar-component",
    source: "packages/ui/src/components/avatar.tsx",
    summary: "Avatar primitives, fallback content and AI avatar status indicator.",
    tags: ["avatar", "ai avatar", "fallback", "image", "status", "online", "processing", "offline"],
    title: "Avatar",
    type: "component",
  },
  {
    answer: "Use BrandMark for the Flytrap logo asset and BrandLockup when the mark needs a readable name and descriptor.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/brand-mark.tsx",
    id: "brand-mark-component",
    source: "packages/ui/src/components/brand-mark.tsx",
    summary: "Logo image and lockup primitives with explicit accessible label behavior.",
    tags: ["brand mark", "brandmark", "logo", "lockup", "flytrap", "alt", "label"],
    title: "BrandMark",
    type: "component",
  },
  {
    answer: "Use Badge for compact metadata such as status, priority or category labels. Variants include default, secondary, outline, success, warning and destructive.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/badge.tsx",
    id: "badge-component",
    source: "packages/ui/src/components/badge.tsx",
    summary: "Small pill label for status, priority and metadata.",
    tags: ["badge", "pill", "label", "metadata", "status", "priority", "success", "warning", "destructive"],
    title: "Badge",
    type: "component",
  },
  {
    answer: "Use ButtonGroup for segmented controls or grouped actions. ButtonGroupItem exposes selected state through `aria-pressed`.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/button-group.tsx",
    id: "button-group-component",
    source: "packages/ui/src/components/button-group.tsx",
    summary: "Grouped button pattern with selected state, keyboard focus and disabled behavior.",
    tags: ["button group", "buttongroup", "segmented", "group", "aria-pressed", "selected", "toggle"],
    title: "ButtonGroup",
    type: "component",
  },
  {
    answer: "Use Card as the standard content surface, then compose CardHeader, CardTitle, CardDescription, CardContent and CardFooter.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/card.tsx",
    id: "card-component",
    source: "packages/ui/src/components/card.tsx",
    summary: "Tokenized surface primitive for grouped content and actions.",
    tags: ["card", "surface", "header", "title", "description", "content", "footer"],
    title: "Card",
    type: "component",
  },
  {
    answer: "Use CodeBlock for documented snippets that need filename, language and horizontally scrollable code.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/code-block.tsx",
    id: "code-block-component",
    source: "packages/ui/src/components/code-block.tsx",
    summary: "Code figure with caption metadata and readable pre/code layout.",
    tags: ["code block", "codeblock", "snippet", "code", "filename", "language", "tsx", "pre"],
    title: "CodeBlock",
    type: "component",
  },
  {
    answer: "Use Combobox when users need a searchable listbox selection with controlled or uncontrolled value support.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/combobox.tsx",
    id: "combobox-component",
    source: "packages/ui/src/components/combobox.tsx",
    summary: "Searchable selection input with listbox options, disabled items and empty state messaging.",
    tags: ["combobox", "select", "searchable", "listbox", "option", "empty", "keyboard"],
    title: "Combobox",
    type: "component",
  },
  {
    answer: "Use DataList for term and description pairs such as package metadata, configuration values or compact property documentation.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/data-list.tsx",
    id: "data-list-component",
    source: "packages/ui/src/components/data-list.tsx",
    summary: "Definition list primitives with item, term and description slots.",
    tags: ["data list", "datalist", "definition list", "term", "description", "metadata", "properties"],
    title: "DataList",
    type: "component",
  },
  {
    answer: "Use DatePicker for native date input and DatePickerField when the control needs a label and hint text.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/date-picker.tsx",
    id: "date-picker-component",
    source: "packages/ui/src/components/date-picker.tsx",
    summary: "Date input wrapper with calendar affordance, accessible label support and optional hint.",
    tags: ["date picker", "datepicker", "date", "calendar", "field", "label", "hint"],
    title: "DatePicker",
    type: "component",
  },
  {
    answer: "Use Dialog for focused modal content. Keep title, description, close action, focus behavior and Escape behavior explicit.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/dialog.tsx",
    id: "dialog-component",
    source: "packages/ui/src/components/dialog.tsx",
    summary: "Radix-backed modal and alert dialog primitives with overlay, content, header, footer and close affordance.",
    tags: ["dialog", "modal", "alert dialog", "overlay", "focus", "escape", "close", "title", "description"],
    title: "Dialog",
    type: "component",
  },
  {
    answer: "Use DropdownMenu for contextual command menus, grouped actions, checkbox items, radio items, labels, separators and shortcuts.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/dropdown-menu.tsx",
    id: "dropdown-menu-component",
    source: "packages/ui/src/components/dropdown-menu.tsx",
    summary: "Radix-backed menu primitives for command and selection menus.",
    tags: ["dropdown menu", "dropdown", "menu", "commands", "checkbox item", "radio item", "shortcut", "separator"],
    title: "DropdownMenu",
    type: "component",
  },
  {
    answer: "Use EmptyState when a screen or panel has no data yet and needs a clear title, explanation and optional next action.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/empty-state.tsx",
    id: "empty-state-component",
    source: "packages/ui/src/components/empty-state.tsx",
    summary: "Empty state panel with optional icon, description and action slot.",
    tags: ["empty state", "emptystate", "no data", "blank", "placeholder", "action", "icon"],
    title: "EmptyState",
    type: "component",
  },
  {
    answer: "Use FileUpload for drag-or-select file input with label, description, multiple file support and announced selected filenames.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/file-upload.tsx",
    id: "file-upload-component",
    source: "packages/ui/src/components/file-upload.tsx",
    summary: "Accessible file input surface with dashed border, upload icon and aria-live filename feedback.",
    tags: ["file upload", "fileupload", "upload", "files", "multiple", "drag", "select", "aria-live"],
    title: "FileUpload",
    type: "component",
  },
  {
    answer: "Use Accordion for progressive disclosure. Compose AccordionItem, AccordionTrigger and AccordionContent when content should expand without leaving the page.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/accordion.tsx",
    id: "accordion-component",
    source: "packages/ui/src/components/accordion.tsx",
    summary: "Disclosure component built from native details and summary semantics.",
    tags: ["accordion", "disclosure", "details", "summary", "expand", "collapse", "content"],
    title: "Accordion",
    type: "component",
  },
  {
    answer: "Use Breadcrumb to show page hierarchy and the current location with BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage and BreadcrumbSeparator.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/breadcrumb.tsx",
    id: "breadcrumb-component",
    source: "packages/ui/src/components/breadcrumb.tsx",
    summary: "Navigation trail primitives for hierarchy, links, current page and separators.",
    tags: ["breadcrumb", "navigation", "hierarchy", "current page", "separator", "trail"],
    title: "Breadcrumb",
    type: "component",
  },
  {
    answer: "Use Checkbox for boolean choices and CheckboxField when the choice needs a visible label and supporting description.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/checkbox.tsx",
    id: "checkbox-component",
    source: "packages/ui/src/components/checkbox.tsx",
    summary: "Radix-backed checkbox primitive with field wrapper for label and description.",
    tags: ["checkbox", "boolean", "checked", "field", "label", "description", "form"],
    title: "Checkbox",
    type: "component",
  },
  {
    answer: "Use CommandMenu for searchable command palettes. It includes dialog, input, list, empty, group, separator, item and shortcut primitives.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/command-menu.tsx",
    id: "command-menu-component",
    source: "packages/ui/src/components/command-menu.tsx",
    summary: "Command palette primitives for searching actions or destinations.",
    tags: ["command menu", "command", "palette", "search", "shortcut", "dialog", "cmdk", "action"],
    title: "CommandMenu",
    type: "component",
  },
  {
    answer: "Use ComponentPreview to document a component with a live preview, description and code sample in one surface.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/component-preview.tsx",
    id: "component-preview-component",
    source: "packages/ui/src/components/component-preview.tsx",
    summary: "Documentation utility that pairs rendered preview content with implementation code.",
    tags: ["component preview", "preview", "documentation", "code", "example", "docs"],
    title: "ComponentPreview",
    type: "component",
  },
  {
    answer: "Use CopyButton when documented values or snippets need a compact copy-to-clipboard action.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/copy-button.tsx",
    id: "copy-button-component",
    source: "packages/ui/src/components/copy-button.tsx",
    summary: "Copy action button with a configurable clipboard function.",
    tags: ["copy button", "copy", "clipboard", "snippet", "value", "action"],
    title: "CopyButton",
    type: "component",
  },
  {
    answer: "Use FilterBar to combine a search input with additional filter controls for result sets.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/filter-bar.tsx",
    id: "filter-bar-component",
    source: "packages/ui/src/components/filter-bar.tsx",
    summary: "Filter surface with controlled search value and optional child filters.",
    tags: ["filter bar", "filter", "search", "results", "controls", "toolbar"],
    title: "FilterBar",
    type: "component",
  },
  {
    answer: "Use Form, FormField and FormMessage to group inputs with labels, hints, errors and validation copy.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/form.tsx",
    id: "form-component",
    source: "packages/ui/src/components/form.tsx",
    summary: "Form composition primitives for accessible field groups and validation messaging.",
    tags: ["form", "form field", "field", "validation", "message", "hint", "error", "submit"],
    title: "Form",
    type: "component",
  },
  {
    answer: "Use Header to compose app or page chrome with brand, title and action slots.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/header.tsx",
    id: "header-component",
    source: "packages/ui/src/components/header.tsx",
    summary: "Header, brand, title and actions primitives for top-level interface chrome.",
    tags: ["header", "brand", "title", "actions", "navigation", "chrome"],
    title: "Header",
    type: "component",
  },
  {
    answer: "Use Input for text entry and Field when the control needs a label, hint or error message.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/input.tsx",
    id: "input-component",
    source: "packages/ui/src/components/input.tsx",
    summary: "Text input primitive and field wrapper for helper and error copy.",
    tags: ["input", "text field", "field", "label", "hint", "error", "form"],
    title: "Input",
    type: "component",
  },
  {
    answer: "Use InteractiveCard when a card behaves like a selectable button with heading, description, icon and selected state.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/interactive-card.tsx",
    id: "interactive-card-component",
    source: "packages/ui/src/components/interactive-card.tsx",
    summary: "Selectable card button with explicit selected state and accessible interaction semantics.",
    tags: ["interactive card", "selectable", "card", "button", "selected", "icon", "choice"],
    title: "InteractiveCard",
    type: "component",
  },
  {
    answer: "Use Label to connect controls to readable copy, including required and optional indicators.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/label.tsx",
    id: "label-component",
    source: "packages/ui/src/components/label.tsx",
    summary: "Form label primitive with required and optional helper affordances.",
    tags: ["label", "required", "optional", "form", "field", "accessible name"],
    title: "Label",
    type: "component",
  },
  {
    answer: "Use Container, Stack and Grid to compose responsive layout foundations before adding product-specific surfaces.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/layout.tsx",
    id: "layout-component",
    source: "packages/ui/src/components/layout.tsx",
    summary: "Container, stack and grid primitives for page structure and spacing.",
    tags: ["layout", "container", "stack", "grid", "responsive", "spacing", "columns"],
    title: "Layout primitives",
    type: "component",
  },
  {
    answer: "Use MediaCard for streaming recommendations, with image, title, subtitle, duration, badge, action and active state.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/media-card.tsx",
    id: "media-card-component",
    source: "packages/ui/src/components/media-card.tsx",
    summary: "Streaming media recommendation card with optional action and active affordance.",
    tags: ["media card", "media", "streaming", "recommendation", "image", "duration", "active", "badge"],
    title: "MediaCard",
    type: "component",
  },
  {
    answer: "Use ModelConfidence to show a model confidence label, numeric value and explanatory copy.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/model-confidence.tsx",
    id: "model-confidence-component",
    source: "packages/ui/src/components/model-confidence.tsx",
    summary: "AI confidence indicator for recommendations, generation or audit flows.",
    tags: ["model confidence", "confidence", "ai", "model", "value", "explanation"],
    title: "ModelConfidence",
    type: "component",
  },
  {
    answer: "Use MoodSelector when a user needs to choose or adjust the mood signal that shapes recommendations.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/mood-selector.tsx",
    id: "mood-selector-component",
    source: "packages/ui/src/components/mood-selector.tsx",
    summary: "Controlled or uncontrolled mood choice group for AI streaming experiences.",
    tags: ["mood selector", "mood", "ai", "streaming", "recommendation", "choice", "value"],
    title: "MoodSelector",
    type: "component",
  },
  {
    answer: "Use MoodSignal to display the current mood tone and strength, such as calm, focus, energy or melancholy.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/mood-signal.tsx",
    id: "mood-signal-component",
    source: "packages/ui/src/components/mood-signal.tsx",
    summary: "Mood meter for visible AI personalization signals.",
    tags: ["mood signal", "mood", "tone", "calm", "focus", "energy", "melancholy", "meter"],
    title: "MoodSignal",
    type: "component",
  },
  {
    answer: "Use Page, PageHeader, PageTitle, Section and Toolbar to standardize documentation or product page structure.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/page.tsx",
    id: "page-component",
    source: "packages/ui/src/components/page.tsx",
    summary: "Page, section and toolbar primitives for repeatable screen structure.",
    tags: ["page", "section", "toolbar", "page header", "page title", "description", "structure"],
    title: "Page primitives",
    type: "component",
  },
  {
    answer: "Use Pagination to move through paged data with previous, next and current page controls.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/pagination.tsx",
    id: "pagination-component",
    source: "packages/ui/src/components/pagination.tsx",
    summary: "Navigation controls for paginated data sets.",
    tags: ["pagination", "previous", "next", "page", "current", "navigation", "data"],
    title: "Pagination",
    type: "component",
  },
  {
    answer: "Use PersonalizationPanel to explain active AI personalization with mood, confidence, signals and an optional action.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/personalization-panel.tsx",
    id: "personalization-panel-component",
    source: "packages/ui/src/components/personalization-panel.tsx",
    summary: "AI personalization summary panel for mood-shaped streaming interfaces.",
    tags: ["personalization panel", "personalization", "ai", "mood", "confidence", "signals", "streaming"],
    title: "PersonalizationPanel",
    type: "component",
  },
  {
    answer: "Use PlayerControls for previous, play or pause, next and progress controls in streaming experiences.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/player-controls.tsx",
    id: "player-controls-component",
    source: "packages/ui/src/components/player-controls.tsx",
    summary: "Playback control group with disabled state and progress value.",
    tags: ["player controls", "player", "play", "pause", "previous", "next", "progress", "streaming"],
    title: "PlayerControls",
    type: "component",
  },
  {
    answer: "Use Popover for anchored contextual content that should stay lighter than a modal dialog.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/popover.tsx",
    id: "popover-component",
    source: "packages/ui/src/components/popover.tsx",
    summary: "Radix-backed anchored overlay with trigger, anchor, close and content primitives.",
    tags: ["popover", "overlay", "anchored", "contextual", "trigger", "content", "close"],
    title: "Popover",
    type: "component",
  },
  {
    answer: "Use Progress to communicate task or media progress with a numeric value.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/progress.tsx",
    id: "progress-component",
    source: "packages/ui/src/components/progress.tsx",
    summary: "Progress indicator primitive for completion or playback state.",
    tags: ["progress", "meter", "completion", "loading", "value", "bar"],
    title: "Progress",
    type: "component",
  },
  {
    answer: "Use RadioGroup for mutually exclusive choices and RadioGroupField when each item needs label and description copy.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/radio-group.tsx",
    id: "radio-group-component",
    source: "packages/ui/src/components/radio-group.tsx",
    summary: "Radix-backed radio group with field wrapper for option descriptions.",
    tags: ["radio group", "radio", "choice", "single select", "field", "label", "description"],
    title: "RadioGroup",
    type: "component",
  },
  {
    answer: "Use RecommendationRail to group streaming recommendations with a title, description and empty state.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/recommendation-rail.tsx",
    id: "recommendation-rail-component",
    source: "packages/ui/src/components/recommendation-rail.tsx",
    summary: "Recommendation section container for AI streaming media cards.",
    tags: ["recommendation rail", "recommendation", "rail", "streaming", "media", "empty", "ai"],
    title: "RecommendationRail",
    type: "component",
  },
  {
    answer: "Use ScrollArea when a region needs keyboard-focusable scrolling without turning the whole page into a scroll trap.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/scroll-area.tsx",
    id: "scroll-area-component",
    source: "packages/ui/src/components/scroll-area.tsx",
    summary: "Focusable overflow region for contained scrollable content.",
    tags: ["scroll area", "scroll", "overflow", "keyboard", "focusable", "region"],
    title: "ScrollArea",
    type: "component",
  },
  {
    answer: "Use Select for single-choice menus with trigger, value, content, label, item and separator primitives.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/select.tsx",
    id: "select-component",
    source: "packages/ui/src/components/select.tsx",
    summary: "Radix-backed select menu with grouped items and selected-item indicator.",
    tags: ["select", "single select", "menu", "trigger", "value", "item", "option"],
    title: "Select",
    type: "component",
  },
  {
    answer: "Use Separator to divide related content visually while preserving orientation semantics.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/separator.tsx",
    id: "separator-component",
    source: "packages/ui/src/components/separator.tsx",
    summary: "Horizontal or vertical visual divider primitive.",
    tags: ["separator", "divider", "horizontal", "vertical", "orientation", "section"],
    title: "Separator",
    type: "component",
  },
  {
    answer: "Use Sheet for side panels and drawers. It shares dialog semantics with side-specific content variants.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/sheet.tsx",
    id: "sheet-component",
    source: "packages/ui/src/components/sheet.tsx",
    summary: "Drawer overlay primitives with trigger, close, content, header, footer, title and description.",
    tags: ["sheet", "drawer", "side panel", "overlay", "dialog", "trigger", "close"],
    title: "Sheet",
    type: "component",
  },
  {
    answer: "Use Sidebar for persistent navigation and SidebarMobile for the responsive drawer version, with provider-controlled open state.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/sidebar.tsx",
    id: "sidebar-component",
    source: "packages/ui/src/components/sidebar.tsx",
    summary: "Responsive sidebar system with provider, triggers, header, content, footer, groups and menu buttons.",
    tags: ["sidebar", "navigation", "mobile", "drawer", "provider", "menu", "responsive"],
    title: "Sidebar",
    type: "component",
  },
  {
    answer: "Use Skeleton to reserve layout space while content is loading, with block, text or circle shapes.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/skeleton.tsx",
    id: "skeleton-component",
    source: "packages/ui/src/components/skeleton.tsx",
    summary: "Loading placeholder primitive for block, text and circular content shapes.",
    tags: ["skeleton", "loading", "placeholder", "shape", "block", "text", "circle"],
    title: "Skeleton",
    type: "component",
  },
  {
    answer: "Use Slider for numeric range input and SliderField when the control needs label, hint and value label support.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/slider.tsx",
    id: "slider-component",
    source: "packages/ui/src/components/slider.tsx",
    summary: "Range input primitive with field wrapper and visible value label.",
    tags: ["slider", "range", "input", "value", "field", "label", "hint"],
    title: "Slider",
    type: "component",
  },
  {
    answer: "Use SmartDataTable for accessible tabular data with columns, rows, caption and empty state handling.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/smart-data-table.tsx",
    id: "smart-data-table-component",
    source: "packages/ui/src/components/smart-data-table.tsx",
    summary: "Typed data table primitive with caption, rows, columns and empty message.",
    tags: ["smart data table", "data table", "table", "columns", "rows", "caption", "empty"],
    title: "SmartDataTable",
    type: "component",
  },
  {
    answer: "Use Spinner for indeterminate loading states and keep the accessible loading label meaningful.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/spinner.tsx",
    id: "spinner-component",
    source: "packages/ui/src/components/spinner.tsx",
    summary: "Loading indicator with size options and accessible label.",
    tags: ["spinner", "loading", "busy", "label", "size", "progress"],
    title: "Spinner",
    type: "component",
  },
  {
    answer: "Use StatusIndicator for compact neutral, info, success, warning or error status text.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/status-indicator.tsx",
    id: "status-indicator-component",
    source: "packages/ui/src/components/status-indicator.tsx",
    summary: "Inline status indicator with semantic tone variants.",
    tags: ["status indicator", "status", "tone", "neutral", "info", "success", "warning", "error"],
    title: "StatusIndicator",
    type: "component",
  },
  {
    answer: "Use Switch for on/off settings and SwitchField when the setting needs label and description copy.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/switch.tsx",
    id: "switch-component",
    source: "packages/ui/src/components/switch.tsx",
    summary: "Toggle switch primitive with field wrapper for settings.",
    tags: ["switch", "toggle", "setting", "on", "off", "field", "label"],
    title: "Switch",
    type: "component",
  },
  {
    answer: "Use Tabs to switch between related panels without changing page context.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/tabs.tsx",
    id: "tabs-component",
    source: "packages/ui/src/components/tabs.tsx",
    summary: "Radix-backed tabs with list, trigger and content primitives.",
    tags: ["tabs", "tab list", "tab trigger", "panel", "section", "switch"],
    title: "Tabs",
    type: "component",
  },
  {
    answer: "Use Textarea for longer free-form text entry.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/textarea.tsx",
    id: "textarea-component",
    source: "packages/ui/src/components/textarea.tsx",
    summary: "Multiline text input primitive for forms and prompts.",
    tags: ["textarea", "multiline", "input", "text", "form", "prompt"],
    title: "Textarea",
    type: "component",
  },
  {
    answer: "Use Timeline to show ordered events with title, description, meta and tone.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/timeline.tsx",
    id: "timeline-component",
    source: "packages/ui/src/components/timeline.tsx",
    summary: "Ordered timeline list for activity, release and process history.",
    tags: ["timeline", "activity", "events", "history", "meta", "tone", "ordered"],
    title: "Timeline",
    type: "component",
  },
  {
    answer: "Use Toast for transient notifications with title, description, action, close control and viewport placement.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/toast.tsx",
    id: "toast-component",
    source: "packages/ui/src/components/toast.tsx",
    summary: "Radix-backed transient notification primitives.",
    tags: ["toast", "notification", "transient", "action", "close", "viewport", "feedback"],
    title: "Toast",
    type: "component",
  },
  {
    answer: "Use TokenSwatch to document a token name, value and description with a visible color or value sample.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/token-swatch.tsx",
    id: "token-swatch-component",
    source: "packages/ui/src/components/token-swatch.tsx",
    summary: "Token documentation swatch for names, values and usage copy.",
    tags: ["token swatch", "token", "swatch", "color", "value", "documentation"],
    title: "TokenSwatch",
    type: "component",
  },
  {
    answer: "Use Tooltip for concise contextual help attached to a trigger. Keep the content short and non-essential.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/tooltip.tsx",
    id: "tooltip-component",
    source: "packages/ui/src/components/tooltip.tsx",
    summary: "Radix-backed tooltip provider, root, trigger and content primitives.",
    tags: ["tooltip", "help", "hint", "trigger", "content", "contextual"],
    title: "Tooltip",
    type: "component",
  },
  {
    answer: "Use TreeView for hierarchical navigation or structured data with expanded, selected and disabled item states.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/components/tree-view.tsx",
    id: "tree-view-component",
    source: "packages/ui/src/components/tree-view.tsx",
    summary: "Tree list primitives for nested navigation and hierarchy.",
    tags: ["tree view", "tree", "hierarchy", "expanded", "selected", "disabled", "navigation"],
    title: "TreeView",
    type: "component",
  },
  {
    answer: "Use AgentCard to summarize an AI agent with name, status, model, token usage and optional detail content.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/agent-card.tsx",
    id: "agent-card-component",
    source: "packages/ui/src/ai/agent-card.tsx",
    summary: "AI agent status card for orchestration dashboards.",
    tags: ["agent card", "agent", "ai", "status", "model", "tokens", "dashboard"],
    title: "AgentCard",
    type: "component",
  },
  {
    answer: "Use AgentStatusIndicator to show agent execution status such as idle, queued, running, completed or error.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/agent-status.tsx",
    id: "agent-status-component",
    source: "packages/ui/src/ai/agent-status.tsx",
    summary: "Compact AI execution status indicator.",
    tags: ["agent status", "agent", "queued", "running", "completed", "error", "execution"],
    title: "AgentStatusIndicator",
    type: "component",
  },
  {
    answer: "Use ChatThread to wrap assistant conversations and expose empty, loading, ready and error states.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/chat-thread.tsx",
    id: "chat-thread-component",
    source: "packages/ui/src/ai/chat-thread.tsx",
    summary: "Conversation container with explicit state handling.",
    tags: ["chat thread", "chat", "conversation", "empty", "loading", "ready", "error"],
    title: "ChatThread",
    type: "component",
  },
  {
    answer: "Use CitationChip to attach source references to AI answers and mark missing sources when evidence is incomplete.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/citation-chip.tsx",
    id: "citation-chip-component",
    source: "packages/ui/src/ai/citation-chip.tsx",
    summary: "Citation link chip for sourced AI responses.",
    tags: ["citation chip", "citation", "source", "missing source", "evidence", "ai"],
    title: "CitationChip",
    type: "component",
  },
  {
    answer: "Use CostTokenMeter to show token usage, limits and optional cost in AI workflows.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/cost-token-meter.tsx",
    id: "cost-token-meter-component",
    source: "packages/ui/src/ai/cost-token-meter.tsx",
    summary: "AI cost and token usage meter.",
    tags: ["cost token meter", "tokens", "cost", "usage", "limit", "ai", "meter"],
    title: "CostTokenMeter",
    type: "component",
  },
  {
    answer: "Use HumanApprovalPrompt when an AI action needs explicit approve or reject controls before continuing.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/human-approval-prompt.tsx",
    id: "human-approval-prompt-component",
    source: "packages/ui/src/ai/human-approval-prompt.tsx",
    summary: "Human-in-the-loop approval surface with pending, approved, rejected and expired states.",
    tags: ["human approval", "approval", "approve", "reject", "pending", "human in the loop", "ai"],
    title: "HumanApprovalPrompt",
    type: "component",
  },
  {
    answer: "Use InsightCallout to highlight AI insights with info, warning or success severity.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/insight-callout.tsx",
    id: "insight-callout-component",
    source: "packages/ui/src/ai/insight-callout.tsx",
    summary: "AI insight message surface with severity variants.",
    tags: ["insight callout", "insight", "callout", "info", "warning", "success", "ai"],
    title: "InsightCallout",
    type: "component",
  },
  {
    answer: "Use KpiStatCard for concise KPI values, optional deltas and supporting descriptions.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/kpi-stat-card.tsx",
    id: "kpi-stat-card-component",
    source: "packages/ui/src/ai/kpi-stat-card.tsx",
    summary: "Metric card for operational and AI dashboards.",
    tags: ["kpi stat card", "kpi", "metric", "delta", "value", "dashboard"],
    title: "KpiStatCard",
    type: "component",
  },
  {
    answer: "Use MessageActions to expose copy, retry and feedback actions around assistant messages.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/message-actions.tsx",
    id: "message-actions-component",
    source: "packages/ui/src/ai/message-actions.tsx",
    summary: "Assistant message action row for copy, retry and feedback.",
    tags: ["message actions", "message", "copy", "retry", "feedback", "assistant", "ai"],
    title: "MessageActions",
    type: "component",
  },
  {
    answer: "Use MessageBubble for user and assistant messages inside chat surfaces.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/message-bubble.tsx",
    id: "message-bubble-component",
    source: "packages/ui/src/ai/message-bubble.tsx",
    summary: "Chat message bubble with user and assistant roles.",
    tags: ["message bubble", "message", "chat", "user", "assistant", "role"],
    title: "MessageBubble",
    type: "component",
  },
  {
    answer: "Use PromptInput for assistant prompts with controlled value, submit handling, max length, attachment action and footer slot.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/prompt-input.tsx",
    id: "prompt-input-component",
    source: "packages/ui/src/ai/prompt-input.tsx",
    summary: "AI prompt form for chat and generation flows.",
    tags: ["prompt input", "prompt", "chat", "submit", "attachment", "max length", "ai"],
    title: "PromptInput",
    type: "component",
  },
  {
    answer: "Use ReasoningStream to disclose analysis summaries with streaming, completed or interrupted status.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/reasoning-stream.tsx",
    id: "reasoning-stream-component",
    source: "packages/ui/src/ai/reasoning-stream.tsx",
    summary: "Collapsible reasoning summary for AI runs.",
    tags: ["reasoning stream", "reasoning", "analysis", "streaming", "completed", "interrupted", "ai"],
    title: "ReasoningStream",
    type: "component",
  },
  {
    answer: "Use RunTraceTimeline to show ordered AI run steps and execution trace evidence.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/run-trace-timeline.tsx",
    id: "run-trace-timeline-component",
    source: "packages/ui/src/ai/run-trace-timeline.tsx",
    summary: "Timeline for AI run trace steps.",
    tags: ["run trace timeline", "run trace", "timeline", "steps", "execution", "trace", "ai"],
    title: "RunTraceTimeline",
    type: "component",
  },
  {
    answer: "Use StreamingMessage for assistant output that may still be streaming and can expose retry behavior.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/streaming-message.tsx",
    id: "streaming-message-component",
    source: "packages/ui/src/ai/streaming-message.tsx",
    summary: "Message container with streaming, completed and interrupted states.",
    tags: ["streaming message", "streaming", "message", "retry", "completed", "interrupted", "ai"],
    title: "StreamingMessage",
    type: "component",
  },
  {
    answer: "Use SuggestedPrompts to offer curated prompt shortcuts that teach supported AI workflows.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/suggested-prompts.tsx",
    id: "suggested-prompts-component",
    source: "packages/ui/src/ai/suggested-prompts.tsx",
    summary: "Prompt suggestion chips for chat onboarding and guided discovery.",
    tags: ["suggested prompts", "prompt", "suggestions", "chips", "onboarding", "ai"],
    title: "SuggestedPrompts",
    type: "component",
  },
  {
    answer: "Use ToolCallBlock to show AI tool calls with pending, running, success or error status plus input, output and duration.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/ai/tool-call-block.tsx",
    id: "tool-call-block-component",
    source: "packages/ui/src/ai/tool-call-block.tsx",
    summary: "Collapsible tool-call evidence block for AI run transparency.",
    tags: ["tool call block", "tool call", "pending", "running", "success", "error", "duration", "ai"],
    title: "ToolCallBlock",
    type: "component",
  },
  {
    answer: "Use Chart for line, area or bar data visualization with ready, loading, empty and error states.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/packages/ui/src/charts/chart.tsx",
    id: "chart-component",
    source: "packages/ui/src/charts/chart.tsx",
    summary: "Chart primitive with typed series, data points and explicit rendering states.",
    tags: ["chart", "line chart", "area chart", "bar chart", "data visualization", "loading", "empty", "error"],
    title: "Chart",
    type: "component",
  },
  {
    answer: "Use the API quality contract to choose the right component family, avoid common antipatterns and run the validation matrix before shipping.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/17-component-api-quality.md",
    id: "component-api-quality",
    source: "docs/17-component-api-quality.md",
    summary: "Consumption rules, component family contracts, antipatterns and delivery validation commands.",
    tags: ["api", "quality", "contract", "antipattern", "validation", "matrix", "component family"],
    title: "Component API quality",
    type: "governance",
  },
  {
    answer: "Use the AI-managed streaming pattern when recommendations adapt from an explicit mood or intent control.",
    href: "#pattern-ai-managed-streaming",
    id: "ai-managed-streaming",
    source: "docs/20-pattern-library.md",
    summary: "Mood-shaped recommendations with visible control, confidence, playback and human approval.",
    tags: ["ai", "streaming", "mood", "recommendation", "player", "approval", "studio"],
    title: "AI-managed streaming flow",
    type: "pattern",
  },
  {
    answer: "Use Dashboard layout for operational surfaces that combine navigation, KPI cards, tables and timelines.",
    href: "#pattern-dashboard-layout",
    id: "dashboard-layout",
    source: "docs/20-pattern-library.md",
    summary: "Sidebar, KPI, table and activity composition for product operations.",
    tags: ["dashboard", "layout", "kpi", "table", "timeline", "adoption", "release"],
    title: "Dashboard layout",
    type: "pattern",
  },
  {
    answer: "Use Release readiness when a component, page or package needs traceable proof before shipping.",
    href: "#pattern-release-readiness",
    id: "release-readiness",
    source: "docs/20-pattern-library.md",
    summary: "Quality gates for shipping through tests, visual audit, adoption and documentation evidence.",
    tags: ["release", "readiness", "ci", "audit", "adoption", "visual", "quality"],
    title: "Release readiness flow",
    type: "pattern",
  },
  {
    answer: "Flytrap currently supports one materialized brand with light, dark and vibrant modes; new brands must ship as full DTCG systems with semantic, component and APCA coverage.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/05-multibrand.md",
    id: "multibrand-modes-themes",
    source: "docs/05-multibrand.md",
    summary: "Brand, mode, theme and viewport dimensions, plus the target Figma → Tokens Studio → DTCG pipeline.",
    tags: ["multibrand", "brand", "mode", "theme", "viewport", "dtcg", "vibrant", "light", "dark"],
    title: "Multibrand modes and themes",
    type: "token",
  },
  {
    answer: "Flytrap color ramps use a 50 to 950 scale generated in HCT, with brand, neutral and semantic ramps verified through APCA roles.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/02-color-scale.md",
    id: "color-scale",
    source: "docs/02-color-scale.md",
    summary: "HCT color scale, magenta and acid ramps, neutral values and independent semantic feedback ramps.",
    tags: ["color", "scale", "hct", "apca", "magenta", "acid", "neutral", "success", "warning", "error"],
    title: "Color scale",
    type: "token",
  },
  {
    answer: "Flytrap uses DTCG tokens compiled to CSS variables, Tailwind theme values and TypeScript metadata.",
    href: "#tokens",
    id: "token-architecture",
    source: "docs/01-architecture-tokens.md",
    summary: "Primitive, foundation, semantic and component token architecture.",
    tags: ["tokens", "dtcg", "css variables", "tailwind", "semantic", "component"],
    title: "Token architecture",
    type: "token",
  },
  {
    answer: "The public token guide groups tokens by All tokens, Color, Type, Space, Border, Motion and Elevation so designers and developers can inspect the system by decision type.",
    href: "#tokens",
    id: "token-categories",
    source: "apps/docs/src/living/token-system-guide.tsx",
    summary: "Interactive token categories used by the documentation page.",
    tags: ["all tokens", "color", "type", "typography", "space", "border", "motion", "elevation", "tabs"],
    title: "Token categories",
    type: "token",
  },
  {
    answer: "The current design-to-code source of truth is `packages/tokens/src/flytrap.tokens.json`; Figma changes are reconciled manually until a versioned Tokens Studio export and drift check exist.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/19-design-code-sync.md",
    id: "design-code-sync",
    source: "docs/19-design-code-sync.md",
    summary: "Manual Figma → DTCG reconciliation process and criteria for future automation.",
    tags: ["figma", "tokens studio", "dtcg", "design code", "sync", "drift", "manual process"],
    title: "Design to code sync",
    type: "workflow",
  },
  {
    answer: "Use the Figma-to-deploy pipeline as the architecture target: design intent, DTCG tokens, gates, package build, docs and deployment evidence.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/06-pipeline.md",
    id: "figma-deploy-pipeline",
    source: "docs/06-pipeline.md",
    summary: "End-to-end phases from Figma and tokens through build, documentation and deployment.",
    tags: ["pipeline", "figma", "deploy", "tokens", "build", "docs", "ci", "vercel"],
    title: "Figma to deploy pipeline",
    type: "workflow",
  },
  {
    answer: "The Supabase backend stores component registry, adoption, APCA audit and private RAG context; public clients read only safe tables while AI access stays behind Edge Functions.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/07-supabase.md",
    id: "supabase-backend",
    source: "docs/07-supabase.md",
    summary: "Supabase project, schema, RLS rules, Edge AI chat function and pending ds_context ingestion.",
    tags: ["supabase", "backend", "rls", "edge function", "rag", "ds_context", "component registry", "adoption"],
    title: "Supabase backend",
    type: "development",
  },
  {
    answer: "Keep service role, Anthropic and Voyage keys server-only; public Vercel variables are limited to safe NEXT_PUBLIC Supabase values under RLS.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/08-secrets.md",
    id: "secrets-boundary",
    source: "docs/08-secrets.md",
    summary: "GitHub, Vercel and Supabase Edge secret boundaries for the public repository.",
    tags: ["secrets", "service role", "anthropic", "voyage", "vercel", "github actions", "supabase", "rls"],
    title: "Secrets boundary",
    type: "governance",
  },
  {
    answer: "Use the project links reference to find the canonical Figma project, GitHub repository, GitHub Pages site, Vercel project and Supabase backend.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/09-project-links.md",
    id: "project-links",
    source: "docs/09-project-links.md",
    summary: "Canonical project URLs and IDs for design, source, CI, public site, deploy and backend.",
    tags: ["links", "figma", "github", "github pages", "vercel", "supabase", "project id", "resources"],
    title: "Project links",
    type: "development",
  },
  {
    answer: "Use ADRs to understand core Flytrap decisions: name, HCT, APCA targets, semantic ramps, Supabase region, public repo, component ownership and distribution.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/10-decisions.md",
    id: "adr-decisions",
    source: "docs/10-decisions.md",
    summary: "Architecture decision record table for tokens, accessibility, backend, repository and distribution choices.",
    tags: ["adr", "decisions", "hct", "apca", "supabase", "public repo", "distribution", "changesets"],
    title: "Architecture decisions",
    type: "governance",
  },
  {
    answer: "Use the roadmap to understand milestone status, current critical path and upcoming fronts for patterns, adoption, memory and release.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/11-roadmap.md",
    id: "roadmap",
    source: "docs/11-roadmap.md",
    summary: "Milestones from scaffold through tokens, UI, deploy, public experience, memory and release readiness.",
    tags: ["roadmap", "milestone", "m0", "m1", "m2", "m5", "memory", "release", "adoption"],
    title: "Roadmap",
    type: "workflow",
  },
  {
    answer: "APCA contrast is a required gate. Do not rely on visual approval alone for color accessibility.",
    href: "#accessibility",
    id: "apca-accessibility",
    source: "docs/03-accessibility-apca.md",
    summary: "Contrast, focus and readability requirements for accessible Flytrap interfaces.",
    tags: ["accessibility", "apca", "contrast", "focus", "readability", "a11y"],
    title: "Accessibility and APCA",
    type: "governance",
  },
  {
    answer: "To request or evolve a component, document the problem, states, anatomy, tokens, accessibility contract and evidence.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/12-component-anatomy.md",
    id: "component-evolution",
    source: "docs/12-component-anatomy.md",
    summary: "Definition of Done for proposing, improving and shipping components.",
    tags: ["request", "improve", "component", "anatomy", "definition of done", "feedback"],
    title: "Request or improve a component",
    type: "workflow",
  },
  {
    answer: "Official iconography uses semantic icon choices, controlled sizes and handoff rules so icons reinforce meaning instead of becoming decoration.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/13-iconography.md",
    id: "semantic-iconography",
    source: "docs/13-iconography.md",
    summary: "Icon contract, sizing, semantic vocabulary and design handoff guidance.",
    tags: ["icon", "iconography", "semantic", "handoff", "size", "meaning"],
    title: "Semantic iconography",
    type: "governance",
  },
  {
    answer: "Brand logo and avatar assets should be consumed through the DS components, with accessible labels, fallback behavior and no duplicate app-local copies.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/16-brand-assets.md",
    id: "brand-assets-avatar",
    source: "docs/16-brand-assets.md",
    summary: "Brand mark, avatar component, accessibility notes and asset restrictions.",
    tags: ["brand", "logo", "avatar", "asset", "accessibility", "fallback", "ai avatar"],
    title: "Brand assets and avatar",
    type: "component",
  },
  {
    answer: "Memory Chat defaults to source-backed answers, can optionally use Ollama locally, and exposes confidence, fallback and missing-source states.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/21-memory-ollama.md",
    id: "memory-chat-ollama",
    source: "docs/21-memory-ollama.md",
    summary: "Local Memory Chat provider behavior, Ollama setup, visible answer states and missing-source flow.",
    tags: ["memory", "chat", "ollama", "source-backed", "fallback", "confidence", "missing source"],
    title: "Memory Chat and Ollama",
    type: "workflow",
  },
  {
    answer: "The public experience release contract defines the living organism metaphor, dense DS sections, character/art boundaries and what remains out of scope.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/15-public-experience-release-1.md",
    id: "public-experience-release",
    source: "docs/15-public-experience-release-1.md",
    summary: "Creative direction, content architecture, organism/character contract, accessibility and release scope for the public DS page.",
    tags: ["public experience", "release", "organism", "character", "hero", "art", "documentation", "scope"],
    title: "Public experience release",
    type: "governance",
  },
  {
    answer: "AI workflows should generate, audit, refactor or document interfaces while preserving Flytrap tokens and accessibility rules.",
    href: "#ai-workflows",
    id: "ai-workflows",
    source: "docs/14-ai-context-contract.md",
    summary: "Rules for AI-assisted generation, review and documentation.",
    tags: ["ai", "workflow", "generate", "audit", "refactor", "document", "agent"],
    title: "AI workflow contract",
    type: "workflow",
  },
  {
    answer: "Use the documentation README as the entrypoint for overview, token architecture, accessibility, components, distribution, patterns and Memory/Ollama docs.",
    href: "https://github.com/LouizeB/flytrapds/blob/main/docs/README.md",
    id: "documentation-index",
    source: "docs/README.md",
    summary: "Documentation table of contents and recommended starting points for the Flytrap DS repository.",
    tags: ["documentation", "readme", "docs", "toc", "overview", "development", "design"],
    title: "Documentation index",
    type: "development",
  },
] as const satisfies readonly FlytrapMemoryItem[];

export const flytrapMemoryIndex = [
  ...curatedFlytrapMemoryIndex,
  ...generatedFlytrapMemoryIndex,
] as const satisfies readonly FlytrapMemoryItem[];

const curatedMemoryIds: ReadonlySet<string> = new Set(curatedFlytrapMemoryIndex.map(item => item.id));

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

const semanticExpansions = [
  {
    terms: ["loading", "load", "pending", "skeleton", "spinner", "busy", "wait"],
    triggers: ["loading", "load", "pending", "carregamento", "espera", "skeleton", "spinner", "busy"],
  },
  {
    terms: ["empty state", "empty", "no data", "blank", "placeholder", "zero state"],
    triggers: ["empty", "no data", "sem dados", "vazio", "blank", "placeholder", "zero state"],
  },
  {
    terms: ["help", "tooltip", "popover", "contextual", "hint", "guidance"],
    triggers: ["help", "hint", "tooltip", "popover", "ajuda", "dica", "contextual"],
  },
  {
    terms: ["feedback", "alert", "toast", "inline notification", "status", "success", "warning", "error"],
    triggers: ["feedback", "alert", "toast", "notification", "notificacao", "status", "success", "warning", "error", "erro", "sucesso", "aviso"],
  },
  {
    terms: ["form", "input", "field", "label", "validation", "error", "textarea"],
    triggers: ["form", "input", "field", "campo", "label", "validation", "validacao", "textarea", "texto"],
  },
  {
    terms: ["choice", "select", "combobox", "radio", "checkbox", "switch", "option"],
    triggers: ["choice", "choose", "select", "combobox", "radio", "checkbox", "switch", "escolha", "selecionar", "opcao", "opção", "toggle"],
  },
  {
    terms: ["navigation", "breadcrumb", "sidebar", "tabs", "pagination", "command menu", "dropdown"],
    triggers: ["navigation", "navigate", "menu", "sidebar", "tabs", "breadcrumb", "pagination", "command", "atalho", "navegacao", "navegação"],
  },
  {
    terms: ["overlay", "dialog", "modal", "sheet", "popover", "drawer", "focus", "close"],
    triggers: ["overlay", "dialog", "modal", "sheet", "drawer", "painel", "close", "fechar", "focus"],
  },
  {
    terms: ["data", "table", "smart data table", "chart", "timeline", "data list", "metric", "kpi"],
    triggers: ["data", "dados", "table", "tabela", "chart", "grafico", "gráfico", "timeline", "metric", "kpi", "relatorio", "relatório"],
  },
  {
    terms: ["streaming", "mood", "recommendation", "player", "media", "personalization", "model confidence"],
    triggers: ["streaming", "mood", "humor", "recommendation", "recomendacao", "recomendação", "player", "media", "personalization", "personalizacao", "personalização"],
  },
  {
    terms: ["ai", "agent", "chat", "prompt", "reasoning", "tool call", "approval", "citation", "source"],
    triggers: ["ai", "ia", "agent", "agente", "chat", "prompt", "reasoning", "raciocinio", "raciocínio", "tool", "approval", "aprovacao", "aprovação", "citation", "source", "fonte"],
  },
  {
    terms: ["install", "package", "@louizeb/flytrap-ui", "styles", "setup", "npm", "pnpm"],
    triggers: ["install", "instalar", "setup", "package", "pacote", "@louizeb/flytrap-ui", "npm", "pnpm"],
  },
  {
    terms: ["accessibility", "apca", "contrast", "focus", "keyboard", "readability", "a11y"],
    triggers: ["accessibility", "acessibilidade", "apca", "contrast", "contraste", "focus", "foco", "keyboard", "teclado", "readability", "legibilidade", "a11y"],
  },
  {
    terms: ["token", "color", "typography", "space", "border", "motion", "elevation", "dtcg"],
    triggers: ["token", "tokens", "color", "cor", "typography", "tipo", "space", "espaco", "espaço", "border", "borda", "motion", "movimento", "elevation", "elevacao", "elevação", "dtcg"],
  },
] as const;

const stopWords = new Set([
  "a",
  "an",
  "and",
  "as",
  "como",
  "de",
  "do",
  "does",
  "e",
  "for",
  "how",
  "i",
  "in",
  "is",
  "o",
  "of",
  "or",
  "para",
  "por",
  "que",
  "the",
  "to",
  "um",
  "uma",
  "with",
]);

function weightedTerms(query: string) {
  const terms = new Map<string, number>();

  function add(term: string, weight: number) {
    const normalized = normalize(term.trim());
    if (!normalized || normalized.length < 2 || stopWords.has(normalized)) return;
    terms.set(normalized, Math.max(terms.get(normalized) ?? 0, weight));
  }

  for (const term of query.split(/\s+/).filter(Boolean)) {
    add(term, 1);
  }

  for (const expansion of semanticExpansions) {
    if (expansion.triggers.some(trigger => query.includes(normalize(trigger)))) {
      for (const term of expansion.terms) {
        add(term, 0.32);
        for (const part of term.split(/\s+/)) add(part, 0.18);
      }
    }
  }

  return [...terms.entries()].map(([term, weight]) => ({ term, weight }));
}

function scoreField(value: string, term: string, weight: number, fieldWeight: number) {
  if (!value.includes(term)) return 0;
  const exactBonus = value === term ? 2 : 0;
  const prefixBonus = value.startsWith(term) ? 0.75 : 0;
  return (fieldWeight + exactBonus + prefixBonus) * weight;
}

function intentBoost(item: FlytrapMemoryItem, query: string) {
  const has = (value: string) => query.includes(value);

  if (item.id === "install-ui" && (has("install") || has("instalar") || has("@louizeb/flytrap-ui") || has("package"))) return 45;
  if (item.id === "design-code-sync" && has("figma") && (has("dtcg") || has("tokens studio") || has("drift"))) return 45;
  if (item.id === "adr-decisions" && (has("adr") || has("decisions") || has("decisoes") || has("decisões"))) return 45;
  if (item.id === "documentation-index" && (has("readme") || has("table of contents") || has("toc"))) return 45;
  if (item.id === "apca-accessibility" && !has("adr") && (has("apca") || has("contrast") || has("contraste"))) return 32;
  if (item.id === "token-categories" && (has("all tokens") || has("motion") || has("elevation"))) return 32;
  if (item.id === "memory-chat-ollama" && (has("ollama") || has("memory chat") || has("missing source"))) return 32;

  return 0;
}

export function searchFlytrapMemory(query: string, limit = 6): FlytrapMemoryResult[] {
  const normalizedQuery = normalize(query.trim());
  const terms = weightedTerms(normalizedQuery);

  if (terms.length === 0) {
    return flytrapMemoryIndex.slice(0, limit).map(item => ({ ...item, score: 0 }));
  }

  return flytrapMemoryIndex
    .map(item => {
      const title = normalize(item.title);
      const summary = normalize(item.summary);
      const answer = normalize(item.answer);
      const tags = item.tags.map(normalize);
      const source = normalize(item.source);

      const matchedScore = terms.reduce((total, { term, weight }) => {
        const tagScore = tags.reduce((best, tag) => Math.max(best, scoreField(tag, term, weight, 7)), 0);
        const nextScore = scoreField(title, term, weight, 10)
          + tagScore
          + scoreField(summary, term, weight, 4)
          + scoreField(answer, term, weight, 3)
          + scoreField(item.type, term, weight, 2)
          + scoreField(source, term, weight, 1.5);

        return total + nextScore;
      }, 0);

      const score = matchedScore > 0
        ? matchedScore + (curatedMemoryIds.has(item.id) ? 12 : 0) + intentBoost(item, normalizedQuery)
        : 0;

      return { ...item, score: Number(score.toFixed(3)) };
    })
    .filter(item => item.score > 0)
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, limit);
}

export function answerFlytrapMemoryQuestion(question: string): FlytrapMemoryAnswer {
  const sources = searchFlytrapMemory(question, 3);

  if (sources.length === 0) {
    return {
      confidence: "low",
      response: "I could not find a reliable Flytrap source for that yet. Try asking about installation, Button, SearchField, APCA, patterns, release readiness, or component improvements.",
      sources,
    };
  }

  const [primary, ...supporting] = sources;
  const supportingText = supporting.length > 0
    ? ` Related sources: ${supporting.map(source => source.title).join(", ")}.`
    : "";

  return {
    confidence: primary.score >= 12 ? "high" : "medium",
    response: `${primary.answer} ${primary.summary}${supportingText}`,
    sources,
  };
}
