// Source numbering: every page lists its sources in order, and markers and footnotes use those numbers.
// Unknown or unlisted ids throw at build time, so a number can't ship without its source.
import { sourceById } from '../content/sources';
import type { Source } from '../content/types';

export type Numbering = Record<string, number>;

/** Numbers sources in the order given (a page's citation order): the first gets 1. */
export function numberSources(ids: readonly string[]): Numbering {
  const out: Numbering = {};
  for (const id of ids) {
    if (!sourceById[id]) throw new Error(`Unknown source "${id}". Add it to src/content/sources.ts.`);
    if (!(id in out)) out[id] = Object.keys(out).length + 1;
  }
  return out;
}

/** The number for a cited source; throws if the page doesn't list it. */
export function citeNumber(n: Numbering, id: string, where = 'this page'): number {
  const number = n[id];
  if (!sourceById[id]) throw new Error(`Unknown source "${id}" cited on ${where}.`);
  if (!number) throw new Error(`Source "${id}" is cited on ${where} but missing from its source list.`);
  return number;
}

export function getSource(id: string): Source {
  const s = sourceById[id];
  if (!s) throw new Error(`Unknown source "${id}".`);
  return s;
}

/** Sources in numbering order, for a footnote list. */
export function footnotes(n: Numbering): { n: number; source: Source }[] {
  return Object.entries(n)
    .sort((a, b) => a[1] - b[1])
    .map(([id, number]) => ({ n: number, source: getSource(id) }));
}

/** Data the source sheet needs, serialisable for React islands. */
export interface SheetSource {
  id: string;
  title: string;
  detail: string;
  where: string;
  checked: string;
  url?: string;
  linkLabel?: string;
}

export function sheetData(ids: readonly string[]): Record<string, SheetSource> {
  return Object.fromEntries(
    ids.map((id) => {
      const { title, detail, where, checked, url, linkLabel } = getSource(id);
      return [id, { id, title, detail, where, checked, url, linkLabel }];
    }),
  );
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-10-02" → "2 Oct 2026". Placeholders come back as given. */
export function formatChecked(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}
