import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const tokens = readFileSync(
  new URL("../src/styles/tokens.css", import.meta.url),
  "utf8",
);

function luminance(name: string) {
  const match = tokens.match(
    new RegExp(`--color-${name}:\\s*#([\\da-f]{6});`, "i"),
  );
  assert.ok(match, `Missing six-digit color token: ${name}`);
  const channels = [0, 2, 4].map((offset) => {
    const channel = parseInt(match[1].slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

test("coastal text and focus remain accessible on every shared surface", () => {
  for (const surface of ["page", "surface", "surface-warm"]) {
    for (const role of [
      "text",
      "secondary",
      "muted",
      "accent",
      "accent-hover",
      "focus",
    ]) {
      const foreground = luminance(role);
      const background = luminance(surface);
      const ratio =
        (Math.max(foreground, background) + 0.05) /
        (Math.min(foreground, background) + 0.05);
      const minimum = role === "focus" ? 3 : 4.5;
      assert.ok(
        ratio >= minimum,
        `${role} on ${surface}: ${ratio.toFixed(2)}:1 is below ${minimum}:1`,
      );
    }
  }
});
