// The master résumé shows a phone number and the double-blind paper's title, so it must never be published.
// The site links /resume.pdf; that file is Yash's to add (a redacted version).
import { test } from 'vitest';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

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
