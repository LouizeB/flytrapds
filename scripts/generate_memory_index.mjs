import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, join, relative } from "node:path";

const repoRoot = process.cwd();
const outputPath = join(repoRoot, "apps/docs/src/content/generated-memory-index.ts");
const githubBase = "https://github.com/LouizeB/flytrapds/blob/main";

const componentIntentTags = {
  accordion: ["disclosure", "expand", "collapse", "progressive disclosure", "faq"],
  alert: ["feedback", "status", "warning", "error", "success"],
  avatar: ["identity", "person", "profile", "fallback", "assistant"],
  badge: ["metadata", "status", "priority", "label"],
  "brand-mark": ["logo", "brand", "lockup", "identity"],
  breadcrumb: ["navigation", "hierarchy", "trail", "current page"],
  "button-group": ["segmented control", "toggle", "grouped action", "selected"],
  button: ["action", "submit", "primary action", "loading", "disabled"],
  card: ["surface", "container", "grouped content"],
  checkbox: ["boolean", "checked", "multi select", "form"],
  "code-block": ["snippet", "code", "developer documentation"],
  combobox: ["searchable select", "listbox", "option", "filter"],
  "command-menu": ["command palette", "search actions", "shortcut", "launcher"],
  "component-preview": ["documentation", "example", "preview", "code sample"],
  "copy-button": ["clipboard", "copy", "snippet action"],
  "data-list": ["definition list", "metadata", "term", "description"],
  "date-picker": ["date", "calendar", "field"],
  dialog: ["modal", "overlay", "confirmation", "focus trap"],
  "dropdown-menu": ["menu", "commands", "contextual actions"],
  "empty-state": ["no data", "blank state", "placeholder", "next action"],
  "file-upload": ["upload", "files", "attachment", "dropzone"],
  "filter-bar": ["filter", "search", "results", "toolbar"],
  form: ["validation", "field group", "submit", "error message"],
  header: ["app chrome", "brand", "actions", "top navigation"],
  "inline-notification": ["feedback", "notification", "status", "action"],
  input: ["text field", "data entry", "form control"],
  "interactive-card": ["selectable card", "choice", "state", "button"],
  label: ["accessible name", "required", "optional", "field"],
  layout: ["container", "stack", "grid", "responsive", "spacing"],
  "media-card": ["streaming", "recommendation", "content card", "duration"],
  "model-confidence": ["ai", "confidence", "model signal", "trust"],
  "mood-selector": ["mood", "recommendation control", "ai streaming"],
  "mood-signal": ["mood", "tone", "energy", "focus", "calm"],
  page: ["page structure", "section", "toolbar", "documentation layout"],
  pagination: ["paged data", "previous", "next", "navigation"],
  "personalization-panel": ["ai", "personalization", "mood", "signals"],
  "player-controls": ["streaming", "play", "pause", "progress", "media"],
  popover: ["anchored overlay", "contextual help", "floating panel"],
  progress: ["loading", "completion", "progress bar"],
  "radio-group": ["single choice", "option", "form"],
  "recommendation-rail": ["streaming", "recommendations", "media rail"],
  "scroll-area": ["overflow", "keyboard scroll", "contained scroll"],
  "search-field": ["search", "filter", "clear", "query"],
  select: ["single select", "menu", "option"],
  separator: ["divider", "section", "orientation"],
  sheet: ["drawer", "side panel", "overlay"],
  sidebar: ["navigation", "drawer", "responsive menu"],
  skeleton: ["loading", "placeholder", "pending content"],
  slider: ["range", "numeric input", "value"],
  "smart-data-table": ["table", "rows", "columns", "caption", "data"],
  spinner: ["loading", "busy", "progress"],
  "status-indicator": ["status", "tone", "health", "state"],
  switch: ["toggle", "setting", "on off"],
  tabs: ["tab panel", "sections", "switch view"],
  textarea: ["multiline", "long text", "prompt"],
  timeline: ["activity", "events", "history", "process"],
  toast: ["notification", "transient feedback", "dismiss"],
  "token-swatch": ["token", "color", "value", "documentation"],
  tooltip: ["hint", "contextual help", "non essential"],
  "tree-view": ["hierarchy", "nested navigation", "expanded"],
};

const aiIntentTags = {
  "agent-card": ["agent", "status", "model", "tokens", "orchestration"],
  "agent-status": ["agent execution", "queued", "running", "completed", "error"],
  "chat-thread": ["conversation", "empty state", "loading", "error"],
  "citation-chip": ["source", "citation", "evidence", "missing source"],
  "cost-token-meter": ["cost", "tokens", "usage", "limit"],
  "human-approval-prompt": ["approval", "human in the loop", "approve", "reject"],
  "insight-callout": ["insight", "callout", "severity"],
  "kpi-stat-card": ["metric", "kpi", "delta", "dashboard"],
  "message-actions": ["copy", "retry", "feedback", "assistant message"],
  "message-bubble": ["chat", "assistant", "user", "message"],
  "prompt-input": ["prompt", "submit", "attachment", "chat"],
  "reasoning-stream": ["reasoning", "analysis", "streaming", "disclosure"],
  "run-trace-timeline": ["trace", "steps", "execution", "timeline"],
  "streaming-message": ["streaming", "assistant output", "retry"],
  "suggested-prompts": ["prompt suggestions", "onboarding", "guided discovery"],
  "tool-call-block": ["tool call", "input", "output", "duration", "transparency"],
};

function slug(value) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function titleCaseSlug(value) {
  return value
    .split("-")
    .map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join("");
}

function wordsFromName(value) {
  return slug(value)
    .split("-")
    .filter(Boolean);
}

function markdownTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? "Untitled";
}

function markdownSections(markdown) {
  const title = markdownTitle(markdown);
  const body = markdown
    .replace(/^#\s+.+$/m, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[[^\]]+\]\([^)]+\)/g, match => match.replace(/^\[|\]\([^)]+\)$/g, ""))
    .replace(/[#*_>`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const headings = [...markdown.matchAll(/^##\s+(.+)$/gm)].map(match => match[1].trim());

  return {
    body: body.slice(0, 420),
    headings,
    title,
  };
}

function exportNames(sourceCode) {
  const names = new Set();
  for (const match of sourceCode.matchAll(/export\s+(?:interface|type|const|function)\s+([A-Za-z0-9_]+)/g)) {
    names.add(match[1]);
  }
  return [...names].sort();
}

function sourceHref(source) {
  return `${githubBase}/${source}`;
}

function docType(source, title, headings) {
  const haystack = `${source} ${title} ${headings.join(" ")}`.toLowerCase();
  if (haystack.includes("token") || haystack.includes("color") || haystack.includes("multibrand")) return "token";
  if (haystack.includes("pattern")) return "pattern";
  if (haystack.includes("accessibility") || haystack.includes("decision") || haystack.includes("overview") || haystack.includes("roadmap")) return "governance";
  if (haystack.includes("ai") || haystack.includes("memory") || haystack.includes("workflow") || haystack.includes("pipeline")) return "workflow";
  return "development";
}

function docsInventory() {
  const docsDir = join(repoRoot, "docs");
  return readdirSync(docsDir)
    .filter(file => file.endsWith(".md"))
    .sort()
    .map(file => {
      const source = `docs/${file}`;
      const markdown = readFileSync(join(repoRoot, source), "utf8");
      const { body, headings, title } = markdownSections(markdown);
      const tags = [
        "generated",
        "documentation",
        ...wordsFromName(title),
        ...headings.flatMap(wordsFromName),
      ];

      return {
        answer: `Generated documentation chunk from ${title}. Use it when a question asks about ${headings.slice(0, 3).join(", ") || title}.`,
        href: sourceHref(source),
        id: `generated-doc-${slug(title)}`,
        source,
        summary: body || `Generated documentation chunk for ${title}.`,
        tags: [...new Set(tags)].slice(0, 28),
        title: `${title} — generated source`,
        type: docType(source, title, headings),
      };
    });
}

function componentInventory(folder, kind) {
  const absolute = join(repoRoot, folder);
  if (!existsSync(absolute)) return [];

  return readdirSync(absolute)
    .filter(file => file.endsWith(".tsx"))
    .sort()
    .map(file => {
      const fileSlug = basename(file, ".tsx");
      const source = relative(repoRoot, join(absolute, file));
      const sourceCode = readFileSync(join(repoRoot, source), "utf8");
      const exports = exportNames(sourceCode);
      const title = exports.find(name => !name.endsWith("Props")) ?? titleCaseSlug(fileSlug);
      const intentTags = kind === "ai"
        ? aiIntentTags[fileSlug] ?? []
        : componentIntentTags[fileSlug] ?? [];
      const tags = [
        "generated",
        kind,
        "component",
        fileSlug,
        ...wordsFromName(fileSlug),
        ...exports.flatMap(wordsFromName),
        ...intentTags,
      ];

      return {
        answer: `Generated component chunk for ${title}. Source exports: ${exports.slice(0, 8).join(", ") || title}. Use it for ${intentTags.slice(0, 4).join(", ") || "component implementation guidance"}.`,
        href: sourceHref(source),
        id: `generated-${kind}-${fileSlug}`,
        source,
        summary: `${title} is generated from ${source}. Exports: ${exports.slice(0, 10).join(", ") || "none detected"}.`,
        tags: [...new Set(tags)].slice(0, 32),
        title: `${title} — generated source`,
        type: "component",
      };
    });
}

const items = [
  ...docsInventory(),
  ...componentInventory("packages/ui/src/components", "ui"),
  ...componentInventory("packages/ui/src/ai", "ai"),
  ...componentInventory("packages/ui/src/charts", "chart"),
];

const duplicateIds = items
  .map(item => item.id)
  .filter((id, index, ids) => ids.indexOf(id) !== index);

if (duplicateIds.length > 0) {
  console.error(`Duplicate generated IDs: ${[...new Set(duplicateIds)].join(", ")}`);
  process.exit(1);
}

const header = [
  "import type { FlytrapMemoryItem } from \"./search-index\";",
  "",
  "// This file is generated by `pnpm memory:generate`.",
  "// Do not edit entries manually; update docs/components or the generator instead.",
  "",
  "export const generatedFlytrapMemoryIndex = ",
].join("\n");

mkdirSync(join(outputPath, ".."), { recursive: true });
writeFileSync(
  outputPath,
  `${header}${JSON.stringify(items, null, 2)} as const satisfies readonly FlytrapMemoryItem[];\n`,
);

console.log(`Generated ${items.length} memory chunks at ${relative(repoRoot, outputPath)}`);
