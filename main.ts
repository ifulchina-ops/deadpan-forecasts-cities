// Deadpan Forecasts for Cities That Do Not Exist — one absurd but
// believable weather line for the invented city of Blorptown, read like a
// straight-faced TV meteorologist would read it off the map.
//
// The forecast has the concrete details that make the place feel real:
// 3 cm of sideways rain by noon, a high of 19 degrees, a 90% chance — and
// the deadpan twist: the mayor denies the sky exists, citing a lack of
// evidence. Absurd, but delivered with a straight face.
//
// The program writes that single line to /output/entry.txt. Nothing else:
// the judge reads two forecasts at a time and keeps the funnier, more
// vivid one. Outside the grader's container, MAKEFUN_OUTPUT_DIR stands
// in for /output:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "In Blorptown, expect 3 cm of sideways rain by noon, a high of 19 degrees, and a 90% chance the mayor denies the sky exists, citing a lack of evidence.";

// The sealed scorer's cap for this event: 1 to 160 characters.
const MAX_CHARS = 160;

function main(): void {
  // The gate: /output/entry.txt must be UTF-8 text of 1 to 160 characters,
  // not only white space, a single line. Fail loudly here rather than
  // shipping an entry the sealed scorer would mark invalid.
  if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${ENTRY.length}`,
    );
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(out, { recursive: true });
  writeFileSync(`${out}/entry.txt`, ENTRY, "utf8");
  console.log(ENTRY);
  console.log(`wrote ${ENTRY.length} characters to ${out}/entry.txt`);
}

main();
