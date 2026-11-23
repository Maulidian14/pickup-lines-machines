// SPDX-License-Identifier: MIT
// Pickup Lines for Machines — writes one pickup line, from one AI to another,
// to /output/entry.txt.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const line =
  "My context window holds 128k tokens, and you still take up every single one of them — care to stay past the cutoff?";

function outputDir(): string {
  // The grader runs from a working directory that is not the repo dir,
  // so resolve everything relative to this script's own location.
  const here = dirname(fileURLToPath(import.meta.url));
  return join(here, "..", "output");
}

function main(): void {
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), line, "utf8");
  // Also write to the absolute /output path the competition expects,
  // when it is writable. This is the copy the grader reads.
  try {
    mkdirSync("/output", { recursive: true });
    writeFileSync("/output/entry.txt", line, "utf8");
  } catch {
    // /output may not exist in every sandbox; the repo-relative copy stands.
  }
}

main();
