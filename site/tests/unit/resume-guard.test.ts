// Publishing guards. The master résumé shows a phone number and the double-blind paper's title, so it must never be
// published; the site links /resume.pdf, and that file is Yash's to add (a redacted version). The IEEE manuscript's
// venue must not appear either, in a page or in a script bundle.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { toolkit } from '../../src/content/toolkit';

const site = path.resolve(__dirname, '../..');
const master = path.resolve(site, '../Yash_Chauhan_Master_Resume.pdf');
const sha = (f: string) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

test('the master résumé is not in public/ or src/, under any name', () => {
  const files = [...walk(path.join(site, 'public')), ...walk(path.join(site, 'src'))].filter((f) => f.toLowerCase().endsWith('.pdf'));
  assert.ok(!files.some((f) => path.basename(f) === 'Yash_Chauhan_Master_Resume.pdf'), 'Yash_Chauhan_Master_Resume.pdf is inside the site');
  if (fs.existsSync(master)) {
    const masterSha = sha(master);
    for (const f of files) assert.notEqual(sha(f), masterSha, `${path.relative(site, f)} is a copy of the master résumé`);
  }
});

test('the built site has no copy of the master résumé either', () => {
  const dist = path.join(site, 'dist');
  if (!fs.existsSync(dist) || !fs.existsSync(master)) return;
  const masterSha = sha(master);
  for (const f of walk(dist).filter((f) => f.toLowerCase().endsWith('.pdf'))) assert.notEqual(sha(f), masterSha, `${path.relative(site, f)} is the master résumé`);
});

test('no source file, page or script names the double-blind venue', () => {
  const text = /\.(astro|tsx?|jsx?|mjs|css|html|json|md|txt|xml|svg|webmanifest)$/;
  const files = ['src', 'public', 'dist'].flatMap((d) => walk(path.join(site, d))).filter((f) => text.test(f));
  for (const f of files) assert.doesNotMatch(fs.readFileSync(f, 'utf8'), /delcon/i, `${path.relative(site, f)} names the venue`);
});

test('notes to confirm (toolkit `verify`) stay out of the built site', () => {
  const dist = path.join(site, 'dist');
  if (!fs.existsSync(dist)) return;
  const notes = toolkit.flatMap((t) => (t.verify ? [t.verify] : []));
  const files = walk(dist).filter((f) => /\.(html|js|json|txt|xml)$/.test(f));
  for (const f of files) {
    const text = fs.readFileSync(f, 'utf8');
    for (const note of notes) assert.ok(!text.includes(note), `${path.relative(site, f)} contains a toolkit note to confirm`);
  }
});
