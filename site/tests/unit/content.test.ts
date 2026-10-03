// From design/starter/content/content.test.ts, plus the site's own content rules.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { sources, sourceById } from '../../src/content/sources';
import { projects } from '../../src/content/projects';
import { work, education } from '../../src/content/experience';
import { toolkit, usedInLabel } from '../../src/content/toolkit';
import { answers } from '../../src/content/answers';

const slugs = new Set(projects.map((p) => p.slug));

test('source ids are unique', () => {
  assert.equal(new Set(sources.map((s) => s.id)).size, sources.length);
});

test('every citation points at a real source', () => {
  const cited = [
    ...projects.flatMap((p) => p.sources ?? []),
    ...[...work, ...education].flatMap((e) => [...(e.sources ?? []), ...Object.values(e.bulletSources ?? {})]),
    ...answers.flatMap((a) => a.answer.flatMap((part) => (typeof part === 'string' ? [] : [part.cite]))),
  ];
  for (const id of cited) assert.ok(sourceById[id], `unknown source "${id}"`);
});

test('toolkit only links to real projects, and every project has a chip label', () => {
  for (const tool of toolkit) for (const slug of tool.usedIn) assert.ok(slugs.has(slug), `${tool.name} → unknown project "${slug}"`);
  for (const slug of slugs) assert.ok(usedInLabel[slug], `no "used in" label for ${slug}`);
});

test('the phone toolkit shows eight tools in a 1–8 order', () => {
  const order = toolkit.filter((t) => t.phone).map((t) => t.phone).sort((a, b) => (a ?? 0) - (b ?? 0));
  assert.deepEqual(order, [1, 2, 3, 4, 5, 6, 7, 8]);
});

test('work-index filter counts match the design', () => {
  const count = (c: string) => projects.filter((p) => p.categories.includes(c as never)).length;
  assert.equal(projects.length, 8);
  assert.deepEqual(
    ['ai-systems', 'full-stack', 'research', 'mobile', 'experiments'].map(count),
    [3, 3, 2, 1, 1]
  );
});

test('the double-blind manuscript reveals nothing about its topic', () => {
  const m = projects.find((p) => p.slug === 'ieee-manuscript');
  assert.ok(m);
  assert.deepEqual(m.stack, []);
  assert.doesNotMatch(JSON.stringify({ ...m, todo: [] }), /circular|digital|upi|inclusion|e-waste|delcon/i);
});

test('nothing on the site names the double-blind paper or its venue', () => {
  const everything = JSON.stringify({ sources, projects: projects.map(({ todo, ...p }) => p), work, education, answers });
  assert.doesNotMatch(everything, /circularity|DELCON|digital inclusion|e-waste/i);
});

test('dates checked are ISO dates or [placeholders]', () => {
  for (const s of sources) assert.match(s.checked, /^(\d{4}-\d{2}-\d{2}|\[.+\])$/, s.id);
});

test('banned words stay out of the copy (portfolio.design.md §2)', () => {
  const text = JSON.stringify({ sources, projects: projects.map(({ todo, ...p }) => p), work, education, answers });
  assert.doesNotMatch(text, /passionate|cutting-edge|leveraged|IEEE paper/i);
  // "tamper-proof" may only appear as a denial: "tamper-evident, not tamper-proof".
  assert.doesNotMatch(text, /(?<!not )tamper-proof/i);
});

test('list the placeholders still to fill (informational)', () => {
  const text = JSON.stringify({ sources, projects: projects.map(({ todo, ...p }) => p), work, education, answers });
  const open = [...new Set(text.match(/\[[^\]"]+\]/g) ?? [])];
  console.log(`placeholders still open: ${open.join(', ') || 'none'}`);
  assert.ok(true);
});
