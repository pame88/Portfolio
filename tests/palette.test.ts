import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const tokens = readFileSync(
  new URL("../src/styles/tokens.css", import.meta.url),
  "utf8",
);

function resolveColor(name: string, visited = new Set<string>()): string {
  assert.ok(!visited.has(name), `Circular color alias: ${name}`);
  visited.add(name);
  const match = tokens.match(new RegExp(`--color-${name}:\\s*([^;]+);`, "i"));
  assert.ok(match, `Missing color token: ${name}`);
  const value = match[1].trim();
  const alias = value.match(/^var\(--color-([\w-]+)\)$/);
  if (alias) return resolveColor(alias[1], visited);
  assert.match(value, /^#[\da-f]{6}$/i, `Invalid color token: ${name}`);
  return value;
}

function luminance(name: string) {
  const hex = resolveColor(name).slice(1);
  const channels = [0, 2, 4].map((offset) => {
    const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

test("all interface color roles resolve to exactly eight shared colors", () => {
  const names = [...tokens.matchAll(/--color-([\w-]+):/g)].map(
    (match) => match[1],
  );
  const colors = new Set(names.map((name) => resolveColor(name).toLowerCase()));
  assert.equal(colors.size, 8);
});

test("body text and focus remain accessible on off-white surfaces", () => {
  for (const surface of ["page", "surface"]) {
    for (const role of [
      "text",
      "secondary",
      "muted",
      "accent",
      "accent-hover",
      "focus",
      "utility-blue",
      "utility-orange",
      "accent-complement",
      "utility-blue-complement",
      "utility-orange-complement",
      "text-complement",
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

test("each matching dark ink is readable on its light paired background", () => {
  for (const [surface, ink] of [
    ["sand-light", "sand-dark"],
    ["grass-light", "grass-dark"],
    ["sunset-pink", "horizon-purple"],
    ["sky-light", "ocean-dark"],
  ]) {
    const ratio = (luminance(surface) + 0.05) / (luminance(ink) + 0.05);
    assert.ok(ratio >= 4.5, `${ink} on ${surface}: ${ratio.toFixed(2)}:1`);
  }
});
