import assert from "node:assert/strict";
import test from "node:test";
import {
  createTideVariation,
  tideFoamPaths,
  tideTimeMilliseconds,
  tideWavePaths,
  type TideVariation,
} from "../src/utils/tide-wave.ts";

test("tide timing survives production CSS conversion from milliseconds to seconds", () => {
  for (const [milliseconds, seconds, expected] of [
    ["5000ms", "5s", 5000],
    ["3400ms", "3.4s", 3400],
    ["1000ms", "1s", 1000],
    ["440ms", ".44s", 440],
  ] as const) {
    assert.equal(tideTimeMilliseconds(milliseconds), expected);
    assert.equal(tideTimeMilliseconds(seconds), expected);
  }
});

test("invalid tide timing fails instead of producing rapid or stalled cycles", () => {
  for (const value of ["5", "0s", "-1ms", "Infinitys", "1s trailing"]) {
    assert.throws(() => tideTimeMilliseconds(value), RangeError);
  }
});

function anchors(path: string): number[] {
  return Array.from(path.matchAll(/ C ([\d .-]*\d)/g), (match) => {
    const coordinates = match[1].trim().split(/\s+/).map(Number);
    return coordinates[5];
  });
}

test("each wash randomizes stronger through pronounced broad shoreline curves", (context) => {
  let draw = 0;
  context.mock.method(Math, "random", () => draw);
  const strengths: number[] = [];
  for (const sample of [0, 0.3, 0.6, 0.999]) {
    draw = sample;
    const variation = createTideVariation();
    assert.ok(variation.phase >= 0 && variation.phase < 100);
    assert.ok(variation.amplitude >= 80 && variation.amplitude <= 175);
    assert.ok(variation.wavelength >= 1600 && variation.wavelength <= 2400);
    assert.ok(variation.center >= 320 && variation.center <= 1280);
    const heights = anchors(tideWavePaths(0, { ...variation, phase: 0 })[0]);
    strengths.push(Math.max(...heights) - Math.min(...heights));
  }
  assert.ok(
    strengths[0] > 150 && strengths[0] < 210,
    "The shallower washes still need a clearly curved shoreline.",
  );
  assert.ok(strengths[3] > 330, "Deep washes need pronounced curvature.");
  assert.ok(
    strengths[3] - strengths[0] > 150,
    "Random washes need visibly different curve strengths.",
  );
});

test("extreme shorelines cover the shell shore without clipping and ripple during arrival", () => {
  for (const center of [320, 1280]) {
    for (const wavelength of [1600, 2400]) {
      const variation: TideVariation = {
        phase: 73,
        amplitude: 175,
        wavelength,
        center,
      };
      for (const seconds of [0, 0.5, 1, 5, 100, 10000]) {
        const layers = tideWavePaths(seconds, variation).map(anchors);
        for (let layer = 0; layer < layers.length; layer++) {
          layers[layer].forEach((height, point) => {
            assert.ok(
              height > 0 && height < 900,
              "Variation escaped the drawing.",
            );
            if (layer === 0) {
              const edgeHeight = 2.1;
              const reach = 1 - edgeHeight + (height / 900) * edgeHeight;
              assert.ok(
                reach > 0 && reach < 1,
                "The full edge must cover the shell shore and stop above Selected work.",
              );
            }
            if (layer > 0) assert.ok(height < layers[0][point]);
          });
        }
        const later = anchors(tideWavePaths(seconds + 0.15, variation)[0]);
        const changes = layers[0].map((height, point) => later[point] - height);
        assert.ok(
          Math.max(...changes) - Math.min(...changes) > 5,
          "Incoming ripples must deform the shoreline, not just translate it.",
        );
      }
    }
  }
});

test("tide contours deform over time instead of sliding as rigid sheets", () => {
  const first = tideWavePaths(0).map(anchors);
  const later = tideWavePaths(0.75).map(anchors);
  for (let layer = 0; layer < first.length; layer++) {
    const changes = first[layer].map(
      (height, index) => later[layer][index] - height,
    );
    assert.ok(
      Math.max(...changes) - Math.min(...changes) > 1,
      `Layer ${layer} only translated instead of undulating.`,
    );
    if (layer > 0) {
      const bends = changes.map(
        (change, index) => change - (later[0][index] - first[0][index]),
      );
      assert.ok(
        Math.max(...bends) - Math.min(...bends) > 35,
        `Layer ${layer} needs a stronger bend independent of the overall wave.`,
      );
    }
  }
});

test("independent water bands overlap but stay behind the leading edge and within the drawing", () => {
  let overlaps = false;
  for (const seconds of [0, 0.5, 1, 2.8, 5, 15, 100, 10000, 1000000]) {
    const layers = tideWavePaths(seconds).map(anchors);
    for (let layer = 0; layer < layers.length; layer++) {
      assert.ok(layers[layer].length > 0);
      for (let point = 0; point < layers[layer].length; point++) {
        const height = layers[layer][point];
        assert.ok(height > 0 && height < 900, "Wave escaped the drawing.");
        if (layer > 0) {
          assert.ok(
            layers[0][point] > height,
            `Water overtook the leading edge at ${seconds}s.`,
          );
          if (layer > 1 && height > layers[layer - 1][point]) overlaps = true;
        }
      }
    }
  }
  assert.ok(overlaps, "Internal bands never overlapped independently.");
});

test("the expanded tide has broad spacing across its full range of layers", () => {
  for (const seconds of [0, 0.75, 5, 15, 100]) {
    const layers = tideWavePaths(seconds).map(anchors);
    assert.ok(layers.length >= 9, "The tide needs at least nine water bands.");
    for (let layer = 1; layer < layers.length; layer++) {
      const gaps = layers[layer].map(
        (height, index) => layers[layer - 1][index] - height,
      );
      const average = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
      assert.ok(average >= 52, `Band ${layer} lost its wider separation.`);
    }
  }
});

test("foam breaks into irregular tapered patches along the same advancing edge", () => {
  const thicknesses: number[] = [];
  for (const variation of [
    undefined,
    { phase: 73, amplitude: 175, wavelength: 1600, center: 320 },
    { phase: 12, amplitude: 80, wavelength: 2400, center: 1280 },
  ] satisfies (TideVariation | undefined)[]) {
    for (const seconds of [0, 1, 5, 10000]) {
      const leading = tideWavePaths(seconds, variation)[0];
      const leadingStart = leading.match(/L -200\.00 ([\d.-]+)/);
      assert.ok(leadingStart);
      const water = Array.from(leading.matchAll(/ C ([\d .-]*\d)/g), (match) =>
        match[1].trim().split(/\s+/).map(Number),
      );
      const widths: number[] = [];
      let previousEnd = -Infinity;
      for (const path of tideFoamPaths(seconds, variation)) {
        const start = path.match(/^M ([\d.-]+) ([\d.-]+)/);
        assert.ok(start);
        const x = Number(start[1]);
        const y = Number(start[2]);
        assert.ok(x > previousEnd, "Foam patches joined into a solid stripe.");
        const outside = path.split(" L ")[0];
        const segments = Array.from(
          outside.matchAll(/ C ([\d .-]*\d)/g),
          (match) => match[1].trim().split(/\s+/).map(Number),
        );
        const end = segments.at(-1);
        assert.ok(end);
        previousEnd = end[4];
        widths.push(previousEnd - x);
        const segmentIndex = water.findIndex((segment) => segment[4] >= x);
        assert.ok(segmentIndex >= 0);
        const segment = water[segmentIndex];
        const before =
          segmentIndex === 0
            ? Number(leadingStart[1])
            : water[segmentIndex - 1][5];
        const step = 2000 / water.length;
        const fraction = (x - (segment[4] - step)) / step;
        const expected =
          (1 - fraction) ** 3 * before +
          3 * (1 - fraction) ** 2 * fraction * segment[1] +
          3 * (1 - fraction) * fraction ** 2 * segment[3] +
          fraction ** 3 * segment[5];
        assert.ok(
          Math.abs(y - expected) < 1,
          "Foam detached from the water's edge.",
        );
        const heights = anchors(path);
        const thickness = heights[3] - heights[11];
        thicknesses.push(thickness);
        assert.ok(
          thickness >= 10 && thickness <= 42,
          "Foam needs a visibly thicker ribbon while retaining irregularity.",
        );
        const insideEnd = heights.at(-1);
        assert.ok(insideEnd !== undefined && Math.abs(insideEnd - y) < 0.02);
        assert.ok(path.endsWith(" Z"));
      }
      assert.ok(
        thicknesses.reduce((sum, thickness) => sum + thickness, 0) /
          thicknesses.length >
          22,
        "Foam ribbons are too thin on average.",
      );
      assert.ok(Math.max(...widths) - Math.min(...widths) > 20);
    }
  }
  assert.notDeepEqual(tideFoamPaths(0), tideFoamPaths(1));
});

test("invalid tide timestamps fail explicitly", () => {
  for (const seconds of [-1, NaN, Infinity]) {
    assert.throws(() => tideWavePaths(seconds), RangeError);
    assert.throws(() => tideFoamPaths(seconds), RangeError);
  }
});
