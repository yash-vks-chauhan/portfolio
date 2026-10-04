#!/usr/bin/env node
// Performance budget: the JavaScript a visitor downloads on the home page, gzipped, with every island hydrated and
// the WebGL background loaded (motion on). Run after `npm run build`. Budget: 160 KB (design/IMPLEMENTATION.md §7).
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { pretendGpu } from './gpu.mjs';

const BUDGET_KB = 160;
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const port = 4332;
const base = `http://localhost:${port}`;
const server = spawn('npx', ['astro', 'preview', '--port', String(port), '--ignore-lock'], { cwd: root, stdio: 'ignore', detached: true });
const stop = () => {
  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {}
};
for (let i = 0; i < 120; i++) {
  try {
    if ((await fetch(base)).ok) break;
  } catch {}
  await new Promise((r) => setTimeout(r, 250));
}
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];
const browser = await chromium.launch({ executablePath: fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined });
let failed = false;
try {
  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    // Count the WebGL background as a visitor with a GPU loads it (headless Chromium renders WebGL in software,
    // where the site keeps the still frame instead).
    await pretendGpu(page);
    const scripts = new Set();
    page.on('response', (res) => {
      const url = new URL(res.url());
      if (url.origin === base && url.pathname.endsWith('.js')) scripts.add(url.pathname);
    });
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight * 0.8) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(800);
    // Inline scripts in the HTML count too.
    const html = fs.readFileSync(path.join(root, 'dist', route === '/' ? 'index.html' : `${route.slice(1)}.html`), 'utf8');
    const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
    const rows = [...scripts].map((p) => {
      const buf = fs.readFileSync(path.join(root, 'dist', p));
      return { file: p.replace('/_astro/', ''), raw: buf.length, gz: zlib.gzipSync(buf, { level: 9 }).length };
    });
    rows.push({ file: '(inline)', raw: Buffer.byteLength(inline), gz: zlib.gzipSync(inline, { level: 9 }).length });
    rows.sort((a, b) => b.gz - a.gz);
    const total = rows.reduce((s, r) => s + r.gz, 0) / 1024;
    console.log(`\n${route}: ${total.toFixed(1)} KB gzipped JS across ${rows.length} files (budget ${BUDGET_KB} KB)`);
    for (const r of rows.slice(0, 12)) console.log(`  ${(r.gz / 1024).toFixed(1).padStart(6)} KB  ${r.file}`);
    if (route === '/' && total > BUDGET_KB) failed = true;
    await page.close();
  }
} finally {
  await browser.close();
  stop();
}
process.exit(failed ? 1 : 0);
