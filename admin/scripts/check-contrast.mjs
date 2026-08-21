/**
 * Reads the two palettes straight out of src/index.css and checks every text /
 * surface pair that the UI actually renders against WCAG AA (4.5:1).
 *
 *   node scripts/check-contrast.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const cssPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "index.css");
const css = fs.readFileSync(cssPath, "utf8");

/** Pulls `--color-x: oklch(L C H)` pairs out of one block of the stylesheet. */
function palette(blockStart) {
  const start = css.indexOf(blockStart);
  if (start === -1) throw new Error(`Block not found in index.css: ${blockStart}`);
  const block = css.slice(start, css.indexOf("\n}", start));

  const tokens = {};
  for (const [, name, l, c, h] of block.matchAll(
    /--color-([\w-]+):\s*oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/g,
  )) {
    tokens[name] = [Number(l), Number(c), Number(h)];
  }
  return tokens;
}

function oklchToRgb([L, C, hDeg]) {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((v) => Math.min(1, Math.max(0, v)));
}

const luminance = (rgb) => 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

function contrast(a, b) {
  const [hi, lo] = [luminance(oklchToRgb(a)), luminance(oklchToRgb(b))].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const WHITE = [1, 0, 0];

// Every combination the components actually put on screen.
const PAIRS = [
  ["fg", "page"],
  ["fg", "panel"],
  ["fg", "raised"],
  ["subtle", "panel"],
  ["subtle", "raised"],
  ["muted", "page"],
  ["muted", "panel"],
  ["muted", "raised"],
  ["brand-400", "page"],
  ["brand-400", "panel"],
];

const light = palette("@theme {");
const dark = palette("html.dark {");

let failures = 0;
for (const [name, tokens] of [
  ["LIGHT (:root)", light],
  ["DARK  (html.dark)", dark],
]) {
  console.log(`\n${name}`);
  for (const [fg, bg] of PAIRS) {
    const value = contrast(tokens[fg], tokens[bg]);
    const ok = value >= 4.5;
    if (!ok) failures++;
    console.log(`  ${ok ? "PASS" : "FAIL"}  ${value.toFixed(2).padStart(5)}:1  text-${fg} on bg-${bg}`);
  }

  // White is hard-coded on the brand and danger fills.
  const onBrand = contrast(WHITE, tokens["brand-500"]);
  const ok = onBrand >= 4.5;
  if (!ok) failures++;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${onBrand.toFixed(2).padStart(5)}:1  text-white on bg-brand-500`);
}

console.log(`\n${failures === 0 ? "All pairs meet WCAG AA." : `${failures} pair(s) below 4.5:1.`}`);
process.exit(failures === 0 ? 0 : 1);
