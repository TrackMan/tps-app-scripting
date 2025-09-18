// tools/format.js
import { execSync } from "node:child_process";
import path from "node:path";
import url from "node:url";

const root = path.resolve(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "..",
);

// Files & globs to format
const patterns = [
  "README.md",
  "docs/**/*.md",
  "schema/**/*.json",
  "examples/**/*.json",
  "tools/**/*.js",
  ".github/**/*.yml",
  ".github/**/*.yaml",
];

// Build the command (quotes each pattern to be safe on Windows shells)
const quoted = patterns.map((p) => `"${p}"`).join(" ");
const cmd = `npx prettier --loglevel warn --write ${quoted}`;

try {
  execSync(cmd, { cwd: root, stdio: "inherit" });
} catch (e) {
  console.error("\n❌ Prettier failed to format files.");
  console.error("   Try: npm install --save-dev prettier");
  process.exit(e.status || 1);
}
