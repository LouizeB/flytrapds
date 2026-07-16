// Fonte única DTCG → primitives, foundations, semantic, component, Tailwind theme e TypeScript.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(root, "src/flytrap.tokens.json");
const tokens = JSON.parse(readFileSync(sourcePath, "utf8"));
const brand = tokens.$extensions?.flytrap?.brand ?? "flytrap";

function leaves(node, path = []) {
  return Object.entries(node ?? {}).flatMap(([key, value]) => {
    if (key.startsWith("$")) return [];
    const nextPath = [...path, key];
    return value && typeof value === "object" && "$value" in value
      ? [{ path: nextPath, node: value }]
      : leaves(value, nextPath);
  });
}

function variableName(path) {
  const [group, ...rest] = path;
  if (group === "foundation" && ["radius", "breakpoint"].includes(rest[0])) return `foundation-${rest.join("-")}`;
  if (["primitive", "foundation", "semantic", "component"].includes(group)) return rest.join("-");
  return path.join("-");
}

function cssValue(value) {
  if (typeof value !== "string") return String(value);
  const match = value.match(/^\{([^}]+)\}$/);
  if (!match) return value;
  return `var(--${variableName(match[1].split("."))})`;
}

function declarations(entries, mode = "light") {
  return entries.flatMap(({ path, node }) => {
    const modes = node.$extensions?.modes ?? {};
    if (mode !== "light" && !(mode in modes)) return [];
    const value = mode === "light" ? node.$value : modes[mode];
    return `  --${variableName(path)}:${cssValue(value)};`;
  }).join("\n");
}

const primitiveEntries = leaves(tokens.primitive, ["primitive"]);
const foundationEntries = leaves(tokens.foundation, ["foundation"]);
const semanticEntries = leaves(tokens.semantic, ["semantic"]);
const componentEntries = leaves(tokens.component, ["component"]);

const header = `@import "tailwindcss";
@import "tw-animate-css";
@custom-variant dark (&:is(.dark *));

/* AUTO-GERADO por build.mjs — não editar. Fonte única: src/flytrap.tokens.json. */`;

const tokenLayers = `:root,
[data-brand="${brand}"] {
${declarations(primitiveEntries)}
${declarations(foundationEntries)}
}

:root {
${declarations(semanticEntries)}
${declarations(componentEntries)}
}

.dark {
${declarations(semanticEntries)}
${declarations(componentEntries)}
${declarations(semanticEntries, "dark")}
}

.vibrant {
${declarations(semanticEntries)}
${declarations(componentEntries)}
${declarations(semanticEntries, "vibrant")}
}`;

const semanticTheme = semanticEntries
  .map(({ path }) => `  --color-${variableName(path)}:var(--${variableName(path)});`)
  .join("\n");
const componentTheme = componentEntries
  .filter(({ path }) => !variableName(path).endsWith("radius"))
  .map(({ path }) => `  --color-${variableName(path)}:var(--${variableName(path)});`)
  .join("\n");

const breakpointTheme = Object.entries(tokens.foundation.breakpoint)
  .map(([name, token]) => `  --breakpoint-${name}:${token.$value};`)
  .join("\n");

const tailwindTheme = `@theme inline {
${semanticTheme}
${componentTheme}
${breakpointTheme}
  --radius-lg:var(--foundation-radius-lg);
  --radius-md:var(--foundation-radius-md);
  --radius-sm:var(--foundation-radius-sm);
  --font-display:var(--font-family-display),sans-serif;
  --font-sans:var(--font-family-sans),sans-serif;
  --font-mono:var(--font-family-mono),monospace;
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
}`;

const css = [header, tokenLayers, tailwindTheme].join("\n\n");
mkdirSync(join(root, "dist"), { recursive: true });
writeFileSync(join(root, "dist/flytrap-globals.css"), css);
writeFileSync(
  join(root, "dist/tokens.ts"),
  `// AUTO-GERADO. Fonte: src/flytrap.tokens.json.\nexport const tokens = ${JSON.stringify(tokens, null, 2)} as const;\nexport const primitives = tokens.primitive;\n`,
);
console.log(`built ${brand}: ${primitiveEntries.length} primitives, ${foundationEntries.length} foundations, ${semanticEntries.length} semantic, ${componentEntries.length} component tokens`);
