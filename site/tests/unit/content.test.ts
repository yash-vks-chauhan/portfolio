// From design/starter/content/content.test.ts, plus the site's own content rules.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { sources, sourceById } from '../../src/content/sources';
import { projects } from '../../src/content/projects';
import { work, education } from '../../src/content/experience';
import { toolkit, usedInLabel } from '../../src/content/toolkit';
import { answers } from '../../src/content/answers';
import { caseStudies, shortPages } from '../../src/content/case-studies';
import { citesIn } from '../../src/lib/rich';
import { formatInterval, wilson } from '../../src/lib/wilson';

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
  assert.doesNotMatch(JSON.stringify(m), /circular|digital|upi|inclusion|e-waste|delcon/i);
});

test('nothing on the site names the double-blind paper or its venue', () => {
  const everything = JSON.stringify({ sources, projects, work, education, answers, caseStudies, shortPages });
  assert.doesNotMatch(everything, /circularity|DELCON|digital inclusion|e-waste/i);
});

test('dates checked are ISO dates or [placeholders]', () => {
  for (const s of sources) assert.match(s.checked, /^(\d{4}-\d{2}-\d{2}|\[.+\])$/, s.id);
});

test('banned words stay out of the copy (portfolio.design.md §2)', () => {
  const text = JSON.stringify({ sources, projects, work, education, answers, caseStudies, shortPages });
  assert.doesNotMatch(text, /passionate|cutting-edge|leveraged|IEEE paper/i);
  // "tamper-proof" may only appear as a denial: "tamper-evident, not tamper-proof".
  assert.doesNotMatch(text, /(?<!not )tamper-proof/i);
});

test('list the placeholders still to fill (informational)', () => {
  const text = JSON.stringify({ sources, projects, work, education, answers, caseStudies, shortPages });
  const open = [...new Set(text.match(/\[[^\]"]+\]/g) ?? [])];
  console.log(`placeholders still open: ${open.join(', ') || 'none'}`);
  assert.ok(true);
});

const pages = [...caseStudies, ...shortPages];

test('every project page exists, once, for a real project', () => {
  assert.equal(new Set(pages.map((p) => p.slug)).size, pages.length);
  for (const p of pages) {
    assert.ok(slugs.has(p.slug), `page for unknown project "${p.slug}"`);
    const project = projects.find((x) => x.slug === p.slug)!;
    assert.equal(project.href, `/work/${p.slug}`, `${p.slug}: the project's href should point at its page`);
    for (const slug of p.more) assert.ok(slugs.has(slug) && slug !== p.slug, `${p.slug}: "More work" → "${slug}"`);
  }
  // Every project except the double-blind manuscript has a page.
  assert.deepEqual(
    projects.filter((p) => p.slug !== 'ieee-manuscript').map((p) => p.slug).sort(),
    pages.map((p) => p.slug).sort(),
  );
});

test('every case-study citation is a real source in that page’s list', () => {
  for (const p of pages) {
    assert.equal(new Set(p.sources).size, p.sources.length, `${p.slug}: duplicate sources`);
    for (const id of p.sources) assert.ok(sourceById[id], `${p.slug}: unknown source "${id}"`);
    for (const id of citesIn(JSON.stringify(p))) assert.ok(p.sources.includes(id), `${p.slug} cites "${id}" without listing it`);
    // The numbering follows first citation: a cited source never comes after an uncited one.
    const cited = new Set(citesIn(JSON.stringify(p)).concat(p.sections.flatMap((s) => (s.kind === 'ops' ? s.ops.cards.flatMap((c) => (c.cite ? [c.cite] : [])) : []))));
    const order = p.sources.map((id) => cited.has(id));
    assert.ok(order.indexOf(false) === -1 || !order.slice(order.indexOf(false)).includes(true), `${p.slug}: list cited sources before uncited ones`);
  }
});

test('section ids are unique on each page, and the phone order has no clashes', () => {
  for (const p of pages) {
    const ids = p.sections.map((s) => s.id);
    assert.equal(new Set(ids).size, ids.length, `${p.slug}: duplicate section ids`);
    assert.ok(!ids.includes('sources'), `${p.slug}: "sources" is reserved`);
    const orders = p.sections.flatMap((s) => ('phone' in s && typeof s.phone === 'number' ? [s.phone] : []));
    assert.equal(new Set(orders).size, orders.length, `${p.slug}: two sections share a phone position`);
  }
});

test('GlassBox shows the Wilson intervals the evaluation implies', () => {
  const text = JSON.stringify(caseStudies.find((c) => c.slug === 'glassbox'));
  assert.equal(formatInterval(wilson(183, 183)), '97.9–100%');
  assert.equal(formatInterval(wilson(0, 183)), '0–2.1%');
  assert.match(text, /97\.9–100%/);
  assert.match(text, /0–2\.1%/);
});

test('the EMS case study keeps the record count and the manuscript title out', () => {
  const text = JSON.stringify(caseStudies.find((c) => c.slug === 'ems-research'));
  assert.doesNotMatch(text, /3\.6\s?M|million|Performance at Scale|Expert Systems|ESWA|Transportation Research/i);
});
