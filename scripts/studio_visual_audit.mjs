import { spawn } from "node:child_process";
import { execFileSync } from "node:child_process";

const host = "127.0.0.1";
const port = Number(process.env.FLYTRAP_STUDIO_AUDIT_PORT ?? 4174);
const url = `http://${host}:${port}/`;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(timeoutMs = 20000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server is still booting.
    }
    await wait(250);
  }
  throw new Error(`Studio preview did not become ready at ${url}`);
}

function run(command, args, options = {}) {
  return execFileSync(command, args, { stdio: "inherit", ...options });
}

async function main() {
  run("pnpm", ["--filter", "@flytrap/studio", "build"]);

  const preview = spawn("pnpm", [
    "--filter",
    "@flytrap/studio",
    "exec",
    "vite",
    "preview",
    "--host",
    host,
    "--port",
    String(port),
    "--strictPort",
  ], {
    stdio: ["ignore", "pipe", "pipe"],
  });

  preview.stdout.on("data", (chunk) => process.stdout.write(chunk));
  preview.stderr.on("data", (chunk) => process.stderr.write(chunk));

  try {
    await waitForServer();
    run("node", ["scripts/visual_audit.mjs"], {
      env: {
        ...process.env,
        FLYTRAP_VISUAL_AUDIT_PROFILE: "studio",
        FLYTRAP_VISUAL_AUDIT_URL: url,
      },
    });
  } finally {
    preview.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
