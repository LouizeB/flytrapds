import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const profiles = {
  public: {
    title: "Visual audit — Flytrap public DS",
    defaultUrl: "https://louizeb.github.io/flytrapds/",
    reportPath: ".planning/visual-audit.md",
    resultFile: "visual-audit-results.json",
    screenshotPrefix: "flytrap-public",
    mainSelector: "#main-content",
    loaderSelector: '[aria-label="Loading Flytrap Design System"], [aria-label="Carregando Flytrap Design System"]',
    expectedSections: [
      "Foundations",
      "Tokens",
      "Components",
      "Patterns",
      "Accessibility",
      "Guidelines",
      "Code / Develop",
      "AI Workflows",
    ],
    expectedComponentAnchors: [
      "component-inputs",
      "component-navigation",
      "component-feedback",
      "component-data-display",
      "component-surfaces",
      "component-overlays",
      "component-ai",
    ],
    expectedPatternAnchors: [],
    humanReviewNotes: [
      "Desktop: sidebar, hero, character, organic atmosphere, dense cards and all DS sections render after the boot sequence.",
      "Mobile: content stacks without horizontal overflow; all sections remain reachable after the boot sequence.",
      "Automated DOM checks cover duplicate IDs, broken hash links, unnamed buttons/links, component category anchors and horizontal overflow.",
      "Known non-blocking observation: the public art layer is intentionally dark/neon and remains outside the DS token contract.",
    ],
  },
  studio: {
    title: "Visual audit — Flytrap Stream Studio",
    defaultUrl: "http://127.0.0.1:4174/",
    reportPath: ".planning/studio-visual-audit.md",
    resultFile: "studio-visual-audit-results.json",
    screenshotPrefix: "flytrap-studio",
    mainSelector: 'main[data-slot="page"]',
    loaderSelector: '[aria-label="Loading Flytrap Stream Studio"]',
    expectedSections: [
      "Personalized experience preview",
      "Choose the experience",
      "Recommendations",
    ],
    expectedComponentAnchors: [],
    expectedPatternAnchors: [],
    humanReviewNotes: [
      "Desktop: the initial Experience view keeps mood controls and recommendations visible without exposing advanced details.",
      "Mobile: the initial view remains stacked and navigable without horizontal overflow.",
      "Results and AI details are available through explicit navigation controls and are intentionally hidden from the initial view.",
      "Automated DOM checks cover duplicate IDs, broken hash links, unnamed buttons/links and horizontal overflow.",
      "Known non-blocking observation: Studio intentionally uses the dark-only Flytrap product shell until a deliberate light mode is designed.",
    ],
  },
};

const profileName = process.env.FLYTRAP_VISUAL_AUDIT_PROFILE ?? "public";
const profile = profiles[profileName];

if (!profile) {
  console.error(`Unknown visual audit profile: ${profileName}. Expected one of: ${Object.keys(profiles).join(", ")}`);
  process.exit(1);
}

const url = process.env.FLYTRAP_VISUAL_AUDIT_URL ?? profile.defaultUrl;
const outputDir = resolve(".planning/screenshots");
const reportPath = resolve(process.env.FLYTRAP_VISUAL_AUDIT_REPORT ?? profile.reportPath);
const resultPath = join(outputDir, process.env.FLYTRAP_VISUAL_AUDIT_RESULT_FILE ?? profile.resultFile);
const waitAfterNetworkIdleMs = Number(process.env.FLYTRAP_VISUAL_AUDIT_WAIT_MS ?? 4500);

const viewports = [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "mobile", width: 390, height: 1200 },
];

const expectedSections = profile.expectedSections;
const expectedComponentAnchors = profile.expectedComponentAnchors;
const expectedPatternAnchors = profile.expectedPatternAnchors;

function statusIcon(ok) {
  return ok ? "✅" : "❌";
}

function markdown(results) {
  const lines = [
    `# ${profile.title}`,
    "",
    `Profile: ${profileName}`,
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
  lines.push("| Viewport | HTTP | Main visible | Loader hidden | Required sections | Component docs | Patterns | Links | Names | Overflow | Blocking errors | Warnings | Screenshot |");
  lines.push("|--|--:|--|--|--|--|--|--|--|--|--|--:|--|");

  for (const result of results) {
    lines.push([
      `| ${result.viewport.name} (${result.viewport.width}×${result.viewport.height})`,
      result.status,
      statusIcon(result.mainVisible),
      statusIcon(!result.loaderVisible),
      `${statusIcon(result.requiredSections.present.length === result.requiredSections.expected.length)} ${result.requiredSections.present.length}/${result.requiredSections.expected.length}`,
      `${statusIcon(result.domAudit.componentAnchors.present.length === result.domAudit.componentAnchors.expected.length)} ${result.domAudit.componentAnchors.present.length}/${result.domAudit.componentAnchors.expected.length}`,
      `${statusIcon(result.domAudit.patternAnchors.present.length === result.domAudit.patternAnchors.expected.length)} ${result.domAudit.patternAnchors.present.length}/${result.domAudit.patternAnchors.expected.length}`,
      `${statusIcon(result.domAudit.brokenHashLinks.length === 0)} ${result.domAudit.brokenHashLinks.length}`,
      `${statusIcon(result.domAudit.unnamedButtons.length === 0 && result.domAudit.unnamedLinks.length === 0)} ${result.domAudit.unnamedButtons.length + result.domAudit.unnamedLinks.length}`,
      `${statusIcon(!result.domAudit.horizontalOverflow)} ${result.domAudit.scrollWidth}/${result.domAudit.viewportWidth}`,
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
    lines.push(`Component docs: ${result.domAudit.componentAnchors.present.map((item) => `\`${item}\``).join(", ") || "None required"}`);
    lines.push(`Pattern docs: ${result.domAudit.patternAnchors.present.map((item) => `\`${item}\``).join(", ") || "None required"}`);
    if (result.domAudit.componentAnchors.missing.length > 0) {
      lines.push(`Missing component docs: ${result.domAudit.componentAnchors.missing.map((item) => `\`${item}\``).join(", ")}`);
    }
    if (result.domAudit.patternAnchors.missing.length > 0) {
      lines.push(`Missing pattern docs: ${result.domAudit.patternAnchors.missing.map((item) => `\`${item}\``).join(", ")}`);
    }
    if (result.domAudit.duplicateIds.length > 0 || result.domAudit.brokenHashLinks.length > 0 || result.domAudit.unnamedButtons.length > 0 || result.domAudit.unnamedLinks.length > 0 || result.domAudit.patternAnchors.missing.length > 0 || result.domAudit.horizontalOverflow) {
      lines.push("");
      lines.push("DOM audit:");
      for (const id of result.domAudit.duplicateIds) lines.push(`- duplicate id: \`${id}\``);
      for (const href of result.domAudit.brokenHashLinks) lines.push(`- broken internal link: \`${href}\``);
      for (const item of result.domAudit.unnamedButtons) lines.push(`- unnamed button: \`${item}\``);
      for (const item of result.domAudit.unnamedLinks) lines.push(`- unnamed link: \`${item}\``);
      if (result.domAudit.horizontalOverflow) lines.push(`- horizontal overflow: ${result.domAudit.scrollWidth}px document width for ${result.domAudit.viewportWidth}px viewport`);
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
  for (const note of profile.humanReviewNotes) lines.push(`- ${note}`);
  lines.push("");

  return `${lines.join("\n")}\n`;
}

async function run() {
  mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch();
  const results = [];

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

    const screenshot = join(".planning/screenshots", `${profile.screenshotPrefix}-${viewport.name}-ready.png`);
    await page.screenshot({ path: screenshot, fullPage: true });

    const bodyText = await page.locator("body").innerText({ timeout: 5000 });
    const present = expectedSections.filter((section) => bodyText.includes(section));
    const missing = expectedSections.filter((section) => !bodyText.includes(section));
    const loaderVisible = await page.locator(profile.loaderSelector).isVisible().catch(() => false);
    const mainVisible = await page.locator(profile.mainSelector).isVisible().catch(() => false);
    const status = response?.status() ?? 0;
    const domAudit = await page.evaluate(({ componentAnchors, patternAnchors }) => {
      const ids = [...document.querySelectorAll("[id]")]
        .map((element) => element.id)
        .filter(Boolean);
      const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
      const accessibleName = (element) => {
        const labelledBy = element.getAttribute("aria-labelledby");
        const labelledByText = labelledBy
          ?.split(/\s+/)
          .map((id) => document.getElementById(id)?.textContent?.trim() ?? "")
          .join(" ")
          .trim();

        return [
          element.getAttribute("aria-label"),
          labelledByText,
          element.textContent,
          element.getAttribute("title"),
        ].some((value) => typeof value === "string" && value.trim().length > 0);
      };
      const selectorLabel = (element) => {
        const tag = element.tagName.toLowerCase();
        const id = element.id ? `#${element.id}` : "";
        const classes = typeof element.className === "string"
          ? element.className.split(/\s+/).filter(Boolean).slice(0, 3).map((item) => `.${item}`).join("")
          : "";
        return `${tag}${id}${classes}`;
      };
      const unnamedButtons = [...document.querySelectorAll("button")]
        .filter((element) => !accessibleName(element))
        .map(selectorLabel);
      const unnamedLinks = [...document.querySelectorAll("a")]
        .filter((element) => !accessibleName(element))
        .map((element) => element.getAttribute("href") ?? selectorLabel(element));
      const brokenHashLinks = [...document.querySelectorAll('a[href^="#"]')]
        .map((element) => element.getAttribute("href") ?? "")
        .filter((href) => href.length > 1)
        .filter((href) => !document.getElementById(decodeURIComponent(href.slice(1))));
      const presentComponentAnchors = componentAnchors.filter((id) => Boolean(document.getElementById(id)));
      const missingComponentAnchors = componentAnchors.filter((id) => !document.getElementById(id));
      const presentPatternAnchors = patternAnchors.filter((id) => Boolean(document.getElementById(id)));
      const missingPatternAnchors = patternAnchors.filter((id) => !document.getElementById(id));
      const scrollWidth = document.documentElement.scrollWidth;
      const viewportWidth = window.innerWidth;

      return {
        brokenHashLinks,
        componentAnchors: {
          expected: componentAnchors,
          missing: missingComponentAnchors,
          present: presentComponentAnchors,
        },
        duplicateIds,
        horizontalOverflow: scrollWidth > viewportWidth + 2,
        patternAnchors: {
          expected: patternAnchors,
          missing: missingPatternAnchors,
          present: presentPatternAnchors,
        },
        scrollWidth,
        unnamedButtons,
        unnamedLinks,
        viewportWidth,
      };
    }, { componentAnchors: expectedComponentAnchors, patternAnchors: expectedPatternAnchors });

    results.push({
      ok: status >= 200
        && status < 300
        && mainVisible
        && !loaderVisible
        && missing.length === 0
        && domAudit.componentAnchors.missing.length === 0
        && domAudit.patternAnchors.missing.length === 0
        && domAudit.duplicateIds.length === 0
        && domAudit.brokenHashLinks.length === 0
        && domAudit.unnamedButtons.length === 0
        && domAudit.unnamedLinks.length === 0
        && !domAudit.horizontalOverflow
        && consoleErrors.length === 0
        && pageErrors.length === 0,
      status,
      url: page.url(),
      viewport,
      screenshot,
      loaderVisible,
      mainVisible,
      requiredSections: { expected: expectedSections, present, missing },
      domAudit,
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
