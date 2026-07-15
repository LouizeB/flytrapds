import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, join, relative } from "node:path";

const repoRoot = process.cwd();
const outputPath = process.argv.includes("--output")
  ? process.argv[process.argv.indexOf("--output") + 1]
  : ".planning/memory-index-candidates.md";

const memoryIndexPaths = [
  join(repoRoot, "apps/docs/src/content/search-index.ts"),
  join(repoRoot, "apps/docs/src/content/generated-memory-index.ts"),
].filter(path => existsSync(path));
const memoryIndexes = memoryIndexPaths.map(path => readFileSync(path, "utf8")).join("\n");

function slug(value) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function markdownTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? "Untitled";
}

function markdownHeadings(markdown) {
  return [...markdown.matchAll(/^##\s+(.+)$/gm)].map(match => match[1].trim());
}

function indexedSources() {
  return new Set([...memoryIndexes.matchAll(/"?source"?:\s*"([^"]+)"/g)].map(match => match[1]));
}

function indexedIds() {
  return [...memoryIndexes.matchAll(/"?id"?:\s*"([^"]+)"/g)].map(match => match[1]);
}

function docsInventory() {
  return readdirSync(join(repoRoot, "docs"))
    .filter(file => file.endsWith(".md"))
    .sort()
    .map(file => {
      const source = `docs/${file}`;
      const content = readFileSync(join(repoRoot, source), "utf8");
      return {
        headings: markdownHeadings(content).slice(0, 8),
        source,
        title: markdownTitle(content),
      };
    });
}

function componentInventory(folder) {
  const absolute = join(repoRoot, folder);
  if (!existsSync(absolute)) return [];

  return readdirSync(absolute)
    .filter(file => file.endsWith(".tsx"))
    .sort()
    .map(file => {
      const source = relative(repoRoot, join(absolute, file));
      const componentName = basename(file, ".tsx")
        .split("-")
        .map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
        .join("");

      return {
        source,
        title: componentName,
      };
    });
}

function duplicateIds(ids) {
  const seen = new Set();
  const duplicates = new Set();

  for (const id of ids) {
    if (seen.has(id)) duplicates.add(id);
    seen.add(id);
  }

  return [...duplicates].sort();
}

const sources = indexedSources();
const docs = docsInventory();
const components = [
  ...componentInventory("packages/ui/src/components"),
  ...componentInventory("packages/ui/src/ai"),
  ...componentInventory("packages/ui/src/charts"),
];
const ids = indexedIds();
const duplicates = duplicateIds(ids);

const unindexedDocs = docs.filter(item => !sources.has(item.source));
const unindexedComponents = components.filter(item => !sources.has(item.source));

const lines = [
  "# Memory index candidates",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Summary",
  "",
  `- Indexed sources: ${sources.size}`,
  `- Indexed IDs: ${ids.length}`,
  `- Duplicate IDs: ${duplicates.length === 0 ? "none" : duplicates.join(", ")}`,
  `- Docs discovered: ${docs.length}`,
  `- Docs not directly indexed: ${unindexedDocs.length}`,
  `- UI/AI/chart files discovered: ${components.length}`,
  `- UI/AI/chart files not directly indexed: ${unindexedComponents.length}`,
  "",
  "## Suggested documentation candidates",
  "",
  ...unindexedDocs.slice(0, 16).flatMap(item => [
    `### ${item.title}`,
    "",
    `- Source: \`${item.source}\``,
    `- Suggested id: \`${slug(item.title)}\``,
    `- Headings: ${item.headings.length > 0 ? item.headings.map(heading => `\`${heading}\``).join(", ") : "none"}`,
    "",
  ]),
  "## Suggested component candidates",
  "",
  ...unindexedComponents.slice(0, 30).flatMap(item => [
    `- \`${item.title}\` — \`${item.source}\``,
  ]),
  "",
  "## Source request template",
  "",
  "Use this when the Memory Chat reports `Needs source`:",
  "",
  "```md",
  "## Missing source request",
  "",
  "**Question:**",
  "**Type:** component | token | pattern | setup | accessibility | workflow",
  "",
  "## Source needed",
  "",
  "- [ ] Add or update the canonical documentation.",
  "- [ ] Add the source to `apps/docs/src/content/search-index.ts` or future generated memory data.",
  "- [ ] Include usage, states, accessibility and tokens when component-related.",
  "- [ ] Re-run docs tests and visual audit.",
  "```",
  "",
];

mkdirSync(join(repoRoot, outputPath, ".."), { recursive: true });
writeFileSync(join(repoRoot, outputPath), `${lines.join("\n")}\n`);

if (duplicates.length > 0) {
  console.error(`Duplicate memory IDs found: ${duplicates.join(", ")}`);
  process.exit(1);
}

console.log(`Memory index report written to ${outputPath}`);
