import { cpSync, mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";

rmSync("dist", { force: true, recursive: true });
execFileSync("tsc", ["-p", "tsconfig.build.json"], { stdio: "inherit" });

mkdirSync("dist", { recursive: true });
cpSync("src/assets", "dist/assets", { recursive: true });
cpSync("src/styles", "dist/styles", { recursive: true });
