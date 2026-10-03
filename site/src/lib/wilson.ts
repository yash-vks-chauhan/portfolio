// Wilson score interval for a proportion: what the site shows next to every pass rate.
// 183/183 → 97.9–100%, 0/183 → 0–2.1% (95%).

export interface Interval {
  lower: number;
  upper: number;
}

/** z defaults to the 95% two-sided value. */
export function wilson(successes: number, n: number, z = 1.959963984540054): Interval {
  if (!Number.isInteger(n) || n <= 0) throw new RangeError('n must be a positive integer');
  if (!Number.isInteger(successes) || successes < 0 || successes > n) throw new RangeError('successes must be an integer from 0 to n');
  const p = successes / n;
  const z2 = z * z;
  const denominator = 1 + z2 / n;
  const center = (p + z2 / (2 * n)) / denominator;
  const half = (z * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / denominator;
  return { lower: Math.max(0, center - half), upper: Math.min(1, center + half) };
}

/** "97.9–100%": one decimal, trailing ".0" dropped, en dash. */
export function formatInterval({ lower, upper }: Interval, digits = 1): string {
  const pct = (x: number) => (x * 100).toFixed(digits).replace(/\.0+$/, '');
  return `${pct(lower)}–${pct(upper)}%`;
}
