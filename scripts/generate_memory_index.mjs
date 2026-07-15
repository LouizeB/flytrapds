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

function cleanMarkdown(markdown) {
  return markdown
    .replace(/^#\s+.+$/m, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[[^\]]+\]\([^)]+\)/g, match => match.replace(/^\[|\]\([^)]+\)$/g, ""))
    .replace(/[#*_>`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function markdownSections(markdown) {
  const title = markdownTitle(markdown);
  const headings = [...markdown.matchAll(/^##\s+(.+)$/gm)].map(match => match[1].trim());
  const matches = [...markdown.matchAll(/^##\s+(.+)$/gm)];
  const sections = [];

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const nextMatch = matches[index + 1];
    const heading = match[1].trim();
    const start = (match.index ?? 0) + match[0].length;
    const end = nextMatch?.index ?? markdown.length;
    const body = cleanMarkdown(markdown.slice(start, end)).slice(0, 520);

    if (body) sections.push({ body, heading });
  }

  const introEnd = matches[0]?.index ?? markdown.length;
  const intro = cleanMarkdown(markdown.slice(0, introEnd));

  return {
    body: (intro || cleanMarkdown(markdown)).slice(0, 420),
    headings,
    sections,
    title,
  };
}

function interfaceBlocks(sourceCode) {
  const blocks = [];
  const pattern = /export\s+interface\s+([A-Za-z0-9_]+)[^{]*\{([\s\S]*?)\n\}/g;

  for (const match of sourceCode.matchAll(pattern)) {
    const props = [...match[2].matchAll(/^\s*([A-Za-z0-9_]+)\??:/gm)]
      .map(propMatch => propMatch[1])
      .filter(prop => prop !== "children")
      .slice(0, 16);

    blocks.push({ name: match[1], props });
  }

  return blocks;
}

function exportedTypeValues(sourceCode) {
  const values = [];
  const pattern = /export\s+type\s+([A-Za-z0-9_]+)\s*=\s*([^;]+);/g;

  for (const match of sourceCode.matchAll(pattern)) {
    const literals = [...match[2].matchAll(/"([^"]+)"/g)]
      .map(literalMatch => literalMatch[1])
      .slice(0, 16);

    if (literals.length > 0) values.push({ name: match[1], values: literals });
  }

  return values;
}

function cvaVariantKeys(sourceCode) {
  const keys = new Set();

  for (const match of sourceCode.matchAll(/variants:\s*\{([\s\S]*?)\n\s*\}/g)) {
    for (const keyMatch of match[1].matchAll(/^\s*([A-Za-z0-9_-]+):\s*\{/gm)) {
      keys.add(keyMatch[1]);
    }
  }

  return [...keys].slice(0, 16);
}

function behaviorTerms(sourceCode) {
  const checks = [
    ["aria", /aria-[a-z-]+/],
    ["role", /\brole=/],
    ["keyboard", /onKeyDown|Escape|Enter|Arrow|keyboard/i],
    ["focus", /focus-visible|focus|Focus/i],
    ["disabled", /disabled|aria-disabled/],
    ["loading", /loading|aria-busy|spinner/i],
    ["status", /status|aria-live|role="status"/],
    ["alert", /role="alert"|Alert/i],
    ["overlay", /Portal|Overlay|Dialog|Popover|Sheet/i],
    ["controlled", /value|defaultValue|onValueChange|onChange/],
    ["selection", /selected|checked|aria-selected|aria-pressed/],
  ];

  return checks
    .filter(([, pattern]) => pattern.test(sourceCode))
    .map(([term]) => term);
}

function tokenTerms(sourceCode) {
  return [...sourceCode.matchAll(/(?:var\()?--([a-z0-9-]+)|\b(?:bg|text|border|ring|shadow|rounded|duration|ease)-[a-z0-9-()[\]/.]+/g)]
    .map(match => match[1] ? `--${match[1]}` : match[0])
    .filter(Boolean)
    .slice(0, 18);
}

function item(source, id, title, summary, answer, tags, type) {
  return {
    answer,
    href: sourceHref(source),
    id,
    source,
    summary,
    tags: [...new Set(tags)].slice(0, 36),
    title,
    type,
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
    .flatMap(file => {
      const source = `docs/${file}`;
      const fileSlug = basename(file, ".md");
      const markdown = readFileSync(join(repoRoot, source), "utf8");
      const { body, headings, sections, title } = markdownSections(markdown);
      const baseTags = [
        "generated",
        "documentation",
        fileSlug,
        ...wordsFromName(title),
        ...headings.flatMap(wordsFromName),
      ];
      const type = docType(source, title, headings);
      const overview = item(
        source,
        `generated-doc-${fileSlug}-overview`,
        `${title} — generated overview`,
        body || `Generated overview for ${title}.`,
        `Generated overview chunk from ${title}. Use it for broad questions about ${headings.slice(0, 3).join(", ") || title}.`,
        baseTags,
        type,
      );
      const sectionItems = sections.map(section => item(
        source,
        `generated-doc-${fileSlug}-section-${slug(section.heading)}`,
        `${title}: ${section.heading} — generated section`,
        section.body,
        `Generated documentation section from ${title}, focused on ${section.heading}.`,
        [...baseTags, "section", ...wordsFromName(section.heading)],
        docType(source, `${title} ${section.heading}`, [section.heading]),
      ));

      return [overview, ...sectionItems];
    });
}

function componentInventory(folder, kind) {
  const absolute = join(repoRoot, folder);
  if (!existsSync(absolute)) return [];

  return readdirSync(absolute)
    .filter(file => file.endsWith(".tsx"))
    .sort()
    .flatMap(file => {
      const fileSlug = basename(file, ".tsx");
      const source = relative(repoRoot, join(absolute, file));
      const sourceCode = readFileSync(join(repoRoot, source), "utf8");
      const exports = exportNames(sourceCode);
      const title = exports.find(name => !name.endsWith("Props")) ?? titleCaseSlug(fileSlug);
      const intentTags = kind === "ai"
        ? aiIntentTags[fileSlug] ?? []
        : componentIntentTags[fileSlug] ?? [];
      const interfaces = interfaceBlocks(sourceCode);
      const typeValues = exportedTypeValues(sourceCode);
      const variantKeys = cvaVariantKeys(sourceCode);
      const behaviors = behaviorTerms(sourceCode);
      const tokens = tokenTerms(sourceCode);
      const baseTags = [
        "generated",
        kind,
        "component",
        fileSlug,
        ...wordsFromName(fileSlug),
        ...exports.flatMap(wordsFromName),
        ...intentTags,
      ];
      const chunks = [
        item(
          source,
          `generated-${kind}-${fileSlug}-overview`,
          `${title} — generated overview`,
          `${title} is generated from ${source}. Exports: ${exports.slice(0, 10).join(", ") || "none detected"}.`,
          `Generated component overview for ${title}. Use it for ${intentTags.slice(0, 4).join(", ") || "component implementation guidance"}.`,
          baseTags,
          "component",
        ),
      ];

      if (exports.length > 0 || interfaces.length > 0 || typeValues.length > 0) {
        const propText = interfaces
          .map(block => `${block.name}${block.props.length > 0 ? ` props: ${block.props.join(", ")}` : ""}`)
          .join("; ");
        const typeText = typeValues
          .map(typeValue => `${typeValue.name}: ${typeValue.values.join(", ")}`)
          .join("; ");

        chunks.push(item(
          source,
          `generated-${kind}-${fileSlug}-api`,
          `${title} — generated API`,
          [
            exports.length > 0 ? `Exports: ${exports.join(", ")}.` : "",
            propText ? `Interfaces: ${propText}.` : "",
            typeText ? `Types: ${typeText}.` : "",
          ].filter(Boolean).join(" "),
          `Generated API chunk for ${title}, including exports, props and literal state/type values detected in source.`,
          [...baseTags, "api", "props", "exports", ...interfaces.flatMap(block => block.props), ...typeValues.flatMap(typeValue => typeValue.values)],
          "component",
        ));
      }

      if (behaviors.length > 0 || variantKeys.length > 0 || tokens.length > 0) {
        chunks.push(item(
          source,
          `generated-${kind}-${fileSlug}-behavior`,
          `${title} — generated behavior`,
          [
            behaviors.length > 0 ? `Behavior and accessibility signals: ${behaviors.join(", ")}.` : "",
            variantKeys.length > 0 ? `Variant keys: ${variantKeys.join(", ")}.` : "",
            tokens.length > 0 ? `Token/style signals: ${tokens.join(", ")}.` : "",
          ].filter(Boolean).join(" "),
          `Generated behavior chunk for ${title}, focused on states, accessibility, variants and tokenized styling signals.`,
          [...baseTags, "behavior", "accessibility", "states", "variants", "tokens", ...behaviors, ...variantKeys, ...tokens],
          "component",
        ));
      }

      return chunks;
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
