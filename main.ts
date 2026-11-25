// One Line, One Laugh: Roast Your Fridge.
//
// This program writes one roast line about the entrant's own fridge to
// the entry file. The line is fixed text: no randomness, no clock, no
// network, no environment input. Running it twice produces byte-identical
// output, because the text never changes between runs. The joke is built
// around three concrete details — a rent-free roommate, show tunes at
// 2 a.m., a light that catches its owner stealing leftovers — and the
// payoff lands in the last few words, an apology owed to the yogurt.
//
// Usage:
//   node main.ts                writes to /output/entry.txt
//   node main.ts <output-path>  writes to the given path instead
//
// The optional path argument exists only so the entry can be verified
// locally against a scratch directory; the grader runs it with no
// argument and reads /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The roast. One line, 195 characters, just inside the 200 limit: a
// rent-free roommate that hums show tunes at 2 a.m. and still catches
// its owner stealing leftovers at midnight.
const ROAST =
  "My fridge is the only roommate who never pays rent, hums show tunes at 2 a.m., and still switches its light on to catch me stealing my own leftovers at midnight, like I owe the yogurt an apology.";

// The gate allows 1 to 200 characters of UTF-8 text, and nothing else.
// A trailing newline would be an extra character, so the file is written
// with exactly the line and no newline at the end.
const MAX_CHARS = 200;

// Default output path used by the grader. The program never deletes this
// directory; it only creates it when missing, then writes a single file.
const DEFAULT_OUTPUT = "/output/entry.txt";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function checkLine(line: string): void {
  if (line.includes("\n") || line.includes("\r")) {
    fail("the roast must be a single line, with no line breaks");
  }
  if (line.length === 0) {
    fail("the roast line is empty");
  }
  if (line.trim().length === 0) {
    fail("the roast line holds only white space");
  }
  if (line.length > MAX_CHARS) {
    fail(`the roast line runs ${line.length} characters, past the ${MAX_CHARS} limit`);
  }
}

function main(): void {
  // Validate first, so a bad line fails loudly instead of writing a file
  // the gate would refuse.
  checkLine(ROAST);
  const outputPath = process.argv[2] ?? DEFAULT_OUTPUT;
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, ROAST, "utf8");
  console.log(`wrote a ${ROAST.length}-character line to ${outputPath}`);
}

main();
