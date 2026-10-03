// A tiny markup for content strings, so facts stay in plain TypeScript files:
//   **bold**            → <strong>
//   {{cite:source-id}}  → a numbered source marker (opens the source sheet)
// Intervals such as "97.9–100%" or "0–2.1%." never break across lines, as in the design.

export type RichNode =
  | { t: 'text'; v: string }
  | { t: 'b'; v: string }
  | { t: 'nowrap'; v: string }
  | { t: 'cite'; id: string };

const TOKENS = /\*\*(.+?)\*\*|\{\{cite:([a-z0-9-]+)\}\}/g;
const INTERVAL = /\d[\d.,]*–\d[\d.,]*%\.?/g;

function splitIntervals(text: string, out: RichNode[]) {
  let last = 0;
  for (const m of text.matchAll(INTERVAL)) {
    if (m.index > last) out.push({ t: 'text', v: text.slice(last, m.index) });
    out.push({ t: 'nowrap', v: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ t: 'text', v: text.slice(last) });
}

export function parseRich(input: string): RichNode[] {
  const out: RichNode[] = [];
  let last = 0;
  for (const m of input.matchAll(TOKENS)) {
    if (m.index > last) splitIntervals(input.slice(last, m.index), out);
    if (m[1] !== undefined) out.push({ t: 'b', v: m[1] });
    else out.push({ t: 'cite', id: m[2] });
    last = m.index + m[0].length;
  }
  if (last < input.length) splitIntervals(input.slice(last), out);
  return out;
}

/** Source ids cited in a string, in order. */
export function citesIn(input: string): string[] {
  return [...input.matchAll(/\{\{cite:([a-z0-9-]+)\}\}/g)].map((m) => m[1]);
}

/** The string without markup, for meta descriptions and search. */
export function plainText(input: string): string {
  return input.replace(/\{\{cite:[a-z0-9-]+\}\}/g, '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\s+/g, ' ').trim();
}

/** True when the whole value is a [placeholder] (shown muted, as in the design). */
export const isWholePlaceholder = (value: string): boolean => /^\[[^\]]+\]$/.test(value.trim());
