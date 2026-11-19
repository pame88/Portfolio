export function tideTimeMilliseconds(value: string): number {
  const match = value.trim().match(/^(\d+(?:\.\d+)?|\.\d+)(ms|s)$/);
  if (!match) {
    throw new RangeError("Tide timing must use milliseconds or seconds.");
  }
  const milliseconds = Number(match[1]) * (match[2] === "s" ? 1000 : 1);
  if (!Number.isFinite(milliseconds) || milliseconds <= 0) {
    throw new RangeError("Tide timing must be finite and greater than zero.");
  }
  return milliseconds;
}

function validateTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    throw new RangeError(
      "Tide wave time must be a finite, nonnegative number.",
    );
  }
}

type Point = { y: number; slope: number };

export interface TideVariation {
  phase: number;
  amplitude: number;
  wavelength: number;
  center: number;
}

export function createTideVariation(): TideVariation {
  return {
    phase: Math.random() * 100,
    amplitude: 80 + Math.random() * 95,
    wavelength: 1600 + Math.random() * 800,
    center: 320 + Math.random() * 960,
  };
}

function wavePoint(
  x: number,
  seconds: number,
  layer: number,
  variation?: TideVariation,
): Point {
  const swellRate =
    (Math.PI * 2) /
    ((variation?.wavelength ?? 2000) * (1 + 0.035 * Math.sin(seconds * 0.29)));
  const currentRate = (Math.PI * 2) / 470;
  const rippleRate = (Math.PI * 2) / 210;
  // Deeper bands soften the broad bend to keep all nine contours inside the SVG.
  const amplitude =
    (variation?.amplitude ?? 125) *
    (1 + 0.08 * Math.sin(seconds * 0.47)) *
    (1 - layer * 0.09);
  const swell =
    (x - (variation?.center ?? 800)) * swellRate +
    0.38 * Math.sin(seconds * 0.6);
  const current = x * currentRate + seconds * 2.7;
  const ripple = x * rippleRate - seconds * 4.2;
  const leading = {
    y:
      690 +
      amplitude * Math.cos(swell) +
      13 * Math.cos(current) +
      7 * Math.sin(ripple),
    slope:
      -amplitude * swellRate * Math.sin(swell) -
      13 * currentRate * Math.sin(current) +
      7 * rippleRate * Math.cos(ripple),
  };
  if (layer === 0) return leading;

  const spacingRate = (Math.PI * 2) / 1300;
  const crossRate = (Math.PI * 2) / (520 + layer * 110);
  const undertowRate = (Math.PI * 2) / (310 + layer * 70);
  const spacing = x * spacingRate + seconds * 0.48;
  const cross = x * crossRate + seconds * (1.2 + layer * 0.22) + layer * 1.4;
  const undertow =
    x * undertowRate - seconds * (0.9 + layer * 0.14) + layer * 0.65;
  return {
    y:
      leading.y -
      layer * (64 + 6 * Math.sin(spacing)) -
      26 * Math.sin(cross) -
      14 * Math.cos(undertow),
    slope:
      leading.slope -
      layer * 6 * spacingRate * Math.cos(spacing) -
      26 * crossRate * Math.cos(cross) +
      14 * undertowRate * Math.sin(undertow),
  };
}

function curve(
  start: number,
  end: number,
  segments: number,
  sample: (x: number) => Point,
): string {
  const step = (end - start) / segments;
  let previous = sample(start);
  let path = `${start.toFixed(2)} ${previous.y.toFixed(2)}`;
  for (let index = 1; index <= segments; index++) {
    const x = start + step * index;
    const point = sample(x);
    // Analytic tangents keep adjacent cubic segments smooth as swells evolve.
    path += ` C ${(x - (step * 2) / 3).toFixed(2)} ${(previous.y + (previous.slope * step) / 3).toFixed(2)} ${(x - step / 3).toFixed(2)} ${(point.y - (point.slope * step) / 3).toFixed(2)} ${x.toFixed(2)} ${point.y.toFixed(2)}`;
    previous = point;
  }
  return path;
}

export function tideWavePaths(
  seconds: number,
  variation?: TideVariation,
): string[] {
  validateTime(seconds);
  seconds += variation?.phase ?? 0;
  return Array.from({ length: 9 }, (_, layer) => {
    const contour = curve(-200, 1800, 40, (x) =>
      wavePoint(x, seconds, layer, variation),
    );
    return `M -200 -40 L ${contour} L 1800 -40 Z`;
  });
}

export function tideFoamPaths(
  seconds: number,
  variation?: TideVariation,
): string[] {
  validateTime(seconds);
  seconds += variation?.phase ?? 0;
  return Array.from({ length: 6 }, (_, patch) => {
    const start =
      -200 + (patch * 2000) / 6 + 16 * Math.sin(seconds * 0.7 + patch);
    const end = start + 245 + 30 * Math.cos(seconds * 0.4 + patch * 1.7);
    const outside = curve(start, end, 8, (x) =>
      wavePoint(x, seconds, 0, variation),
    );
    const inside = curve(end, start, 8, (x) => {
      const leading = wavePoint(x, seconds, 0, variation);
      const taper = ((x - start) * Math.PI) / (end - start);
      const thickness =
        26 +
        10 * Math.sin(x * 0.065 + seconds) +
        5 * Math.cos(x * 0.11 - seconds * 0.3);
      const thicknessSlope =
        10 * 0.065 * Math.cos(x * 0.065 + seconds) -
        5 * 0.11 * Math.sin(x * 0.11 - seconds * 0.3);
      return {
        y: leading.y - thickness * Math.sin(taper),
        slope:
          leading.slope -
          thicknessSlope * Math.sin(taper) -
          (thickness * Math.cos(taper) * Math.PI) / (end - start),
      };
    });
    return `M ${outside} L ${inside} Z`;
  });
}
