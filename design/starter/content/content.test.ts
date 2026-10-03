import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sources, sourceById } from './sources.ts';
import { projects } from './projects.ts';
import { work, education } from './experience.ts';
import { toolkit } from './toolkit.ts';
import { answers } from './answers.ts';

const slugs = new Set(projects.map((p) => p.slug));

test('source ids are unique', () => {
  assert.equal(new Set(sources.map((s) => s.id)).size, sources.length);
});

test('every citation points at a real source', () => {
  const cited = [
    ...projects.flatMap((p) => p.sources ?? []),
    ...[...work, ...education].flatMap((e) => e.sources ?? []),
    ...answers.flatMap((a) => a.answer.flatMap((part) => (typeof part === 'string' ? [] : [part.cite]))),
  ];
  for (const id of cited) assert.ok(sourceById[id], `unknown source "${id}"`);
});

test('toolkit only links to real projects', () => {
  for (const tool of toolkit) for (const slug of tool.usedIn) assert.ok(slugs.has(slug), `${tool.name} → unknown project "${slug}"`);
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
  assert.doesNotMatch(JSON.stringify({ ...m, todo: [] }), /circular|digital|upi|inclusion|e-waste/i);
});

test('dates checked are ISO dates or [placeholders]', () => {
  for (const s of sources) if (s.checked) assert.match(s.checked, /^(\d{4}-\d{2}-\d{2}|\[.+\])$/, s.id);
});

test('list the placeholders still to fill (informational)', () => {
  const text = JSON.stringify({ sources, projects: projects.map(({ todo, ...p }) => p), work, education, answers });
  const open = [...new Set(text.match(/\[[^\]"]+\]/g) ?? [])];
  console.log(`placeholders still open: ${open.join(', ') || 'none'}`);
  assert.ok(true);
});
