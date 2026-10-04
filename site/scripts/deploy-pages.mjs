#!/usr/bin/env node
// Publishes the site on GitHub Pages at https://yash-vks-chauhan.github.io/portfolio/, a temporary address until the
// real domain exists. It builds with BASE_PATH=/portfolio and SITE_URL set (and NOINDEX=1, which keeps this address out
// of search results), prepares dist/ for Pages, commits it to the gh-pages branch (with a temporary index, so your
// working tree and staging area are untouched) and pushes that branch. Pages publishes from it
// (Settings → Pages → Deploy from a branch → gh-pages, / (root)).
//   npm run deploy:pages            build, commit and push
//   npm run deploy:pages -- --dry   build and prepare dist/ only
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OWNER = 'yash-vks-chauhan';
const REPO = 'portfolio';
const SITE_URL = `https://${OWNER}.github.io`;
const BASE_PATH = `/${REPO}`;
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const dry = process.argv.includes('--dry');
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();

const build = spawnSync('npx', ['astro', 'build'], { cwd: root, stdio: 'inherit', env: { ...process.env, SITE_URL, BASE_PATH, NOINDEX: '1' } });
if (build.status !== 0) process.exit(build.status ?? 1);

// Pages runs Jekyll unless told not to, and Jekyll skips folders starting with "_" (Astro's _astro/).
fs.writeFileSync(path.join(dist, '.nojekyll'), '');
// Cloudflare's header rules mean nothing to Pages and would only be served as a file.
fs.rmSync(path.join(dist, '_headers'), { force: true });
// Where a page (work.html) sits beside a folder of the same name (work/), Pages may answer /work with the folder:
// give the folder an index.html with the same page.
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.html')) {
      const folder = p.slice(0, -'.html'.length);
      if (fs.existsSync(folder) && fs.statSync(folder).isDirectory() && !fs.existsSync(path.join(folder, 'index.html'))) {
        fs.copyFileSync(p, path.join(folder, 'index.html'));
      }
    }
  }
})(dist);

const url = `${SITE_URL}${BASE_PATH}/`;
if (dry) {
  console.log(`\nPrepared dist/ for ${url} (dry run: nothing committed or pushed).`);
  process.exit(0);
}

// Commit dist/ as the whole tree of gh-pages, on top of the published history if there is one.
try {
  git('fetch', 'origin', 'gh-pages');
} catch {
  // No gh-pages branch yet: the first deployment starts it.
}
let parent = '';
try {
  parent = git('rev-parse', '--verify', '-q', 'refs/remotes/origin/gh-pages');
} catch {}
const index = path.join(os.tmpdir(), `gh-pages-index-${process.pid}`);
const env = { ...process.env, GIT_INDEX_FILE: index };
const run = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', env }).trim();
fs.rmSync(index, { force: true });
run(`--work-tree=${dist}`, 'add', '--all', '--force', '.');
const tree = run('write-tree');
fs.rmSync(index, { force: true });
const source = git('rev-parse', '--short', 'HEAD');
const commit = execFileSync('git', ['commit-tree', tree, ...(parent ? ['-p', parent] : []), '-m', `Deploy ${source} to GitHub Pages`], { cwd: root, encoding: 'utf8' }).trim();
git('update-ref', 'refs/heads/gh-pages', commit);
execFileSync('git', ['push', 'origin', 'refs/heads/gh-pages:refs/heads/gh-pages'], { cwd: root, stdio: 'inherit' });
console.log(`\nPushed gh-pages (${commit.slice(0, 7)}). Once Pages publishes it: ${url}`);
