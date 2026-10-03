import { test, expect } from 'vitest';
import { numberSources, citeNumber, footnotes, formatChecked } from '../../src/lib/citations';
import { parseRich, citesIn, plainText, isWholePlaceholder } from '../../src/lib/rich';

test('sources are numbered in page order, first citation wins', () => {
  const n = numberSources(['gridee-downloads', 'glassbox-eval-v4', 'gridee-downloads', 'glassbox-ci']);
  expect(n).toEqual({ 'gridee-downloads': 1, 'glassbox-eval-v4': 2, 'glassbox-ci': 3 });
  expect(footnotes(n).map((f) => f.n)).toEqual([1, 2, 3]);
});

test('an unknown source fails the build', () => {
  expect(() => numberSources(['no-such-source'])).toThrow(/Unknown source/);
});

test('a marker for a source the page does not list fails the build', () => {
  const n = numberSources(['gridee-downloads']);
  expect(() => citeNumber(n, 'glassbox-ci')).toThrow(/missing from its source list/);
  expect(citeNumber(n, 'gridee-downloads')).toBe(1);
});

test('checked dates read like the design', () => {
  expect(formatChecked('2026-10-02')).toBe('2 Oct 2026');
  expect(formatChecked('[date checked]')).toBe('[date checked]');
});

test('rich text: bold, citations and unbreakable intervals', () => {
  expect(parseRich('made **zero** claims: 0–2.1%.{{cite:glassbox-eval-v4}} done')).toEqual([
    { t: 'text', v: 'made ' },
    { t: 'b', v: 'zero' },
    { t: 'text', v: ' claims: ' },
    { t: 'nowrap', v: '0–2.1%.' },
    { t: 'cite', id: 'glassbox-eval-v4' },
    { t: 'text', v: ' done' },
  ]);
  expect(citesIn('a{{cite:x-1}} b {{cite:y}}')).toEqual(['x-1', 'y']);
  expect(plainText('**A** b{{cite:x}}.')).toBe('A b.');
  expect(isWholePlaceholder('[Your role]')).toBe(true);
  expect(isWholePlaceholder('MIT [x]')).toBe(false);
});
