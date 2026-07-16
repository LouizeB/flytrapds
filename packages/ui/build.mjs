import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

function addEsmExtensions(directory) {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) {
      addEsmExtensions(path);
      continue;
    }
    if (!path.endsWith(".js")) continue;

    const source = readFileSync(path, "utf8");
    const withExtensions = source.replace(
      /(from\s+["']|export\s+\*\s+from\s+["'])(\.\.?\/[^"']+)(["'])/g,
      (match, prefix, specifier, quote) => /\.[a-z0-9]+$/i.test(specifier)
        ? match
        : `${prefix}${specifier}.js${quote}`,
    );
    writeFileSync(path, withExtensions);
  }
}

rmSync("dist", { force: true, recursive: true });
execFileSync("tsc", ["-p", "tsconfig.build.json"], { stdio: "inherit" });
addEsmExtensions("dist");

mkdirSync("dist", { recursive: true });
cpSync("src/assets", "dist/assets", { recursive: true });
cpSync("src/styles", "dist/styles", { recursive: true });
