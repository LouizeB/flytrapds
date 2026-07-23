import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";

const url = process.env.FLYTRAP_A11Y_URL ?? "http://127.0.0.1:4179";
let browser;
let preview;

async function waitForPreview() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The preview may still be starting.
    }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error(`Preview did not become available at ${url}`);
}

function formatViolation(violation) {
  const targets = violation.nodes.slice(0, 4).map(node => `    - ${node.target.join(" ")}`).join("\n");
  return `- ${violation.id} (${violation.impact ?? "unknown"}): ${violation.help}\n${targets}`;
}

async function audit(page, label) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  if (results.violations.length) {
    throw new Error(`${label} has ${results.violations.length} accessibility violation(s):\n${results.violations.map(formatViolation).join("\n")}`);
  }
  console.log(`[PASS] ${label}: ${results.passes.length} axe rules passed`);
}

async function run() {
  if (!process.env.FLYTRAP_A11Y_URL) {
    const pnpmCli = process.env.npm_execpath;
    if (!pnpmCli) throw new Error("npm_execpath is required to start the docs preview.");
    preview = spawn(pnpmCli, ["--dir", "apps/docs", "exec", "vite", "preview", "--host", "127.0.0.1", "--port", "4179"], {
      detached: true,
      stdio: ["ignore", "ignore", "inherit"],
    });
  }
  await waitForPreview();

  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ reducedMotion: "reduce", viewport: { height: 900, width: 1440 } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForSelector("#main-content");

  const structure = await page.evaluate(() => ({
    h1: document.querySelectorAll("h1").length,
    imagesWithoutAlt: document.querySelectorAll("img:not([alt])").length,
    lang: document.documentElement.lang,
    main: document.querySelectorAll("main").length,
  }));
  if (structure.lang !== "en" || structure.main !== 1 || structure.h1 !== 1 || structure.imagesWithoutAlt !== 0) {
    throw new Error(`Document structure failed: ${JSON.stringify(structure)}`);
  }

  await audit(page, "Portal initial view");

  const askButton = page.getByRole("button", { name: "Ask Flytrap" });
  await askButton.focus();
  await page.keyboard.press("Enter");
  await page.getByRole("dialog").waitFor();
  await audit(page, "Ask Flytrap dialog");

  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  if (!(await askButton.evaluate(element => element === document.activeElement))) {
    throw new Error("Ask Flytrap did not return focus to its trigger after closing.");
  }
  console.log("[PASS] Ask Flytrap keyboard open, close, and focus return");
  await browser.close();
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
}).finally(async () => {
  await browser?.close();
  if (!preview?.pid) return;
  try {
    process.kill(-preview.pid, "SIGTERM");
  } catch {
    preview.kill("SIGTERM");
  }
});
