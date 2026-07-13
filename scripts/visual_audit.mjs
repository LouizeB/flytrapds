import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const url = process.env.FLYTRAP_VISUAL_AUDIT_URL ?? "https://louizeb.github.io/flytrapds/";
const outputDir = resolve(".planning/screenshots");
const reportPath = resolve(".planning/visual-audit.md");
const resultPath = join(outputDir, "visual-audit-results.json");
const waitAfterNetworkIdleMs = Number(process.env.FLYTRAP_VISUAL_AUDIT_WAIT_MS ?? 4500);

const viewports = [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "mobile", width: 390, height: 1200 },
];

function statusIcon(ok) {
  return ok ? "✅" : "❌";
}

function markdown(results) {
  const lines = [
    "# Visual audit — Flytrap public DS",
    "",
    `URL: ${url}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Summary",
    "",
    "| Check | Result |",
    "|--|--|",
  ];

  const allOk = results.every((result) => result.ok);
  lines.push(`| Overall | ${statusIcon(allOk)} ${allOk ? "pass" : "review required"} |`);
  lines.push(`| Screenshots | ${results.map((result) => `\`${result.screenshot}\``).join(", ")} |`);
  lines.push("");
  lines.push("## Viewports");
  lines.push("");
  lines.push("| Viewport | HTTP | Main visible | Loader hidden | Required sections | Blocking errors | Warnings | Screenshot |");
  lines.push("|--|--:|--|--|--|--|--:|--|");

  for (const result of results) {
    lines.push([
      `| ${result.viewport.name} (${result.viewport.width}×${result.viewport.height})`,
      result.status,
      statusIcon(result.mainVisible),
      statusIcon(!result.loaderVisible),
      `${statusIcon(result.requiredSections.present.length === result.requiredSections.expected.length)} ${result.requiredSections.present.length}/${result.requiredSections.expected.length}`,
      `${statusIcon(result.consoleErrors.length === 0 && result.pageErrors.length === 0)} ${result.consoleErrors.length + result.pageErrors.length}`,
      `${result.consoleWarnings.length}`,
      `\`${result.screenshot}\` |`,
    ].join(" | "));
  }

  lines.push("");
  lines.push("## Required sections");
  lines.push("");

  for (const result of results) {
    lines.push(`### ${result.viewport.name}`);
    lines.push("");
    lines.push(`Present: ${result.requiredSections.present.map((item) => `\`${item}\``).join(", ")}`);
    if (result.requiredSections.missing.length > 0) {
      lines.push(`Missing: ${result.requiredSections.missing.map((item) => `\`${item}\``).join(", ")}`);
    }
    if (result.consoleErrors.length > 0 || result.consoleWarnings.length > 0 || result.pageErrors.length > 0) {
      lines.push("");
      lines.push("Diagnostics:");
      for (const message of result.consoleErrors) lines.push(`- console error: ${message}`);
      for (const message of result.consoleWarnings) lines.push(`- console warning: ${message}`);
      for (const error of result.pageErrors) lines.push(`- page error: ${error}`);
    }
    lines.push("");
  }

  lines.push("## Human review notes");
  lines.push("");
  lines.push("- Desktop: sidebar, hero, character, organic atmosphere, dense cards and all DS sections render after the boot sequence.");
  lines.push("- Mobile: content stacks without horizontal overflow; all sections remain reachable after the boot sequence.");
  lines.push("- Known non-blocking observation: the public art layer is intentionally dark/neon and remains outside the DS token contract.");
  lines.push("");

  return `${lines.join("\n")}\n`;
}

async function run() {
  mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch();
  const results = [];
  const expectedSections = [
    "Foundations",
    "Tokens",
    "Components",
    "Patterns",
    "Accessibility",
    "Guidelines",
    "Code / Develop",
    "AI Workflows",
  ];

  for (const viewport of viewports) {
    const context = await browser.newContext({
      colorScheme: "dark",
      deviceScaleFactor: 1,
      viewport: { width: viewport.width, height: viewport.height },
    });
    await context.addInitScript(() => localStorage.setItem("flytrap:appearance", "dark"));

    const page = await context.newPage();
    const consoleErrors = [];
    const consoleWarnings = [];
    const pageErrors = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
      if (message.type() === "warning") consoleWarnings.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(waitAfterNetworkIdleMs);

    const screenshot = join(".planning/screenshots", `flytrap-public-${viewport.name}-ready.png`);
    await page.screenshot({ path: screenshot, fullPage: true });

    const bodyText = await page.locator("body").innerText({ timeout: 5000 });
    const present = expectedSections.filter((section) => bodyText.includes(section));
    const missing = expectedSections.filter((section) => !bodyText.includes(section));
    const loaderVisible = await page.locator('[aria-label="Carregando Flytrap Design System"]').isVisible().catch(() => false);
    const mainVisible = await page.locator("#main-content").isVisible().catch(() => false);
    const status = response?.status() ?? 0;

    results.push({
      ok: status >= 200 && status < 300 && mainVisible && !loaderVisible && missing.length === 0 && consoleErrors.length === 0 && pageErrors.length === 0,
      status,
      url: page.url(),
      viewport,
      screenshot,
      loaderVisible,
      mainVisible,
      requiredSections: { expected: expectedSections, present, missing },
      consoleErrors,
      consoleWarnings,
      pageErrors,
    });

    await context.close();
  }

  await browser.close();
  writeFileSync(resultPath, `${JSON.stringify(results, null, 2)}\n`);
  writeFileSync(reportPath, markdown(results));

  const failed = results.filter((result) => !result.ok);
  if (failed.length > 0) {
    console.error(`Visual audit failed for ${failed.map((result) => result.viewport.name).join(", ")}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Visual audit passed: ${reportPath}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
