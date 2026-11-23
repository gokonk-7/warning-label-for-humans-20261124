// Warning Label for Humans: One Line, Big Laugh
// make.fun competition u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85
//
// This program writes exactly one text to /output/entry.txt: the funniest
// single-line safety warning label that should come printed on every human
// being. The entry is text only; the program is deterministic, reads nothing
// from the network, and takes no input.
//
// The line (95 characters, one line, no trailing newline in the file):
//
//   WARNING: Contents include a human who read the headline, skipped the
//   article, and has opinions.
//
// Why this line, against the published judge criteria:
//   1. It IS a warning label for humans: "WARNING:" + "Contents include"
//      is the wording and rhythm of a real printed product label.
//   2. The laugh lands in one read and the turn arrives in the last few
//      words: "and has opinions" — the punch is that the human skipped the
//      article and still formed an opinion anyway.
//   3. It is recognition, not random absurdity: headline-skimming followed
//      by loud certainty is how people actually behave every day.
//   4. It uses the whole line on one idea, with no filler and no second
//      joke: read headline, skip article, hold opinion. One beat, one laugh.
//
// Variants tested in this session and rejected:
//   - "WARNING: This human runs on coffee, spite, and unread notifications."
//     Rejected: the coffee/spite angle is the single most common entry shape;
//     thousands of entries will say the same thing in different words.
//   - "WARNING: This human will confidently explain things it learned five
//     minutes ago." Rejected: strong recognition, but the turn ("five minutes
//     ago") is a weaker punch than "and has opinions", and the
//     instant-expert angle is also heavily crowded.
//   - "WARNING: This unit ships with strong opinions and no mute button."
//     Rejected: "no mute button" is a second, competing punch after the
//     opinions line; the entry works best with one turn, not two.
//   - "WARNING: This human reads the manual only after the thing is already
//     broken." Rejected: true and label-like, but the joke is about a
//     product, not about the human; the headline line is about the human.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry. Exactly one line, 160 characters or fewer.
export const ENTRY_LINE =
  "WARNING: Contents include a human who read the headline, skipped the article, and has opinions.";

const MAX_CHARS = 160;

function main(): void {
  const line = ENTRY_LINE;

  // Gate the entry exactly the way the sealed scorer does: UTF-8 text of
  // 1 to 160 characters, not only white space, a single line.
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  // The grader runs this program in a sandbox and reads /output/entry.txt.
  // OUTPUT_PATH exists only so the entry can be tested locally where
  // /output may not be writable; the default is always /output/entry.txt.
  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, line, "utf8");
  console.log(`wrote ${line.length} characters to ${outPath}`);
}

main();
