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

function wavePoint(x: number, seconds: number, layer: number): Point {
  const swellRate = (Math.PI * 2) / (950 + 170 * Math.sin(seconds * 0.29));
  const currentRate = (Math.PI * 2) / 620;
  const rippleRate = (Math.PI * 2) / 270;
  const amplitude = 64 + 16 * Math.sin(seconds * 0.47);
  const swell =
    x * swellRate - seconds * 0.85 + 0.35 * Math.sin(seconds * 0.53);
  const current = x * currentRate + seconds * 0.9;
  const ripple = x * rippleRate - seconds * 0.8;
  const leading = {
    y:
      570 +
      amplitude * Math.sin(swell) +
      16 * Math.cos(current) +
      6 * Math.sin(ripple),
    slope:
      amplitude * swellRate * Math.cos(swell) -
      16 * currentRate * Math.sin(current) +
      6 * rippleRate * Math.cos(ripple),
  };
  if (layer === 0) return leading;

  const spacingRate = (Math.PI * 2) / 1300;
  const crossRate = (Math.PI * 2) / (520 + layer * 110);
  const undertowRate = (Math.PI * 2) / (310 + layer * 70);
  const spacing = x * spacingRate + seconds * 0.48;
  const cross = x * crossRate + seconds * (0.8 + layer * 0.17) + layer * 1.4;
  const undertow =
    x * undertowRate - seconds * (0.55 + layer * 0.11) + layer * 0.65;
  return {
    y:
      leading.y -
      layer * (48 + 4 * Math.sin(spacing)) -
      20 * Math.sin(cross) -
      12 * Math.cos(undertow),
    slope:
      leading.slope -
      layer * 4 * spacingRate * Math.cos(spacing) -
      20 * crossRate * Math.cos(cross) +
      12 * undertowRate * Math.sin(undertow),
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

export function tideWavePaths(seconds: number): string[] {
  validateTime(seconds);
  return Array.from({ length: 9 }, (_, layer) => {
    const contour = curve(-200, 1800, 20, (x) => wavePoint(x, seconds, layer));
    return `M -200 -40 L ${contour} L 1800 -40 Z`;
  });
}

export function tideFoamPaths(seconds: number): string[] {
  validateTime(seconds);
  return Array.from({ length: 6 }, (_, patch) => {
    const start =
      -200 + (patch * 2000) / 6 + 16 * Math.sin(seconds * 0.7 + patch);
    const end = start + 245 + 30 * Math.cos(seconds * 0.4 + patch * 1.7);
    const outside = curve(start, end, 8, (x) => wavePoint(x, seconds, 0));
    const inside = curve(end, start, 8, (x) => {
      const leading = wavePoint(x, seconds, 0);
      const taper = ((x - start) * Math.PI) / (end - start);
      const thickness =
        12 +
        6 * Math.sin(x * 0.065 + seconds) +
        3 * Math.cos(x * 0.11 - seconds * 0.3);
      const thicknessSlope =
        6 * 0.065 * Math.cos(x * 0.065 + seconds) -
        3 * 0.11 * Math.sin(x * 0.11 - seconds * 0.3);
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
