#!/usr/bin/env node
// Builds the Glass artboards from templates/*.src.html into
//   ../prototype/<name>.html               standalone preview (tweak defaults filled in, local images)
//   ../artifact/project/<name>.dc.html     Claude Design canvas artboard (with --canvas)
//
// usage: node build.js [PageKey ...] [--canvas] [--strict]
//   PageKey   one of the keys in pages.js (default: all)
//   --canvas  also write the canvas artboards (image urls come from blobs.json)
//   --strict  fail if an image has no uploaded blob url
// env: STATE='{"q":"film"}' SUFFIX=alt  render a prototype with component state forced (Components page)
//
// Template placeholders:
//   [[tokens]]                 the theme's colour tokens (tokens.js)
//   [[theme:LIGHT~~DARK]]      text that differs between the light and dark variant
//   [[if:key:THEN~~ELSE]]      text chosen by a variant def that is 'true'
//   [[def:key]]                a variant def value (pages.js)
//   [[asset:key]]              an image: a local path in prototypes, a /_blob/ url in the canvas
//   [[i:name:size:stroke]]     a Lucide icon (icons/lucide.json)
//   [[si:Name:size]]           a Simple Icons glyph (icons/simple-icons.json)
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const OUT_PROTO = path.join(ROOT, '..', 'prototype');
const OUT_CANVAS = path.join(ROOT, '..', 'artifact', 'project');
const LUCIDE = JSON.parse(fs.readFileSync(path.join(ROOT, 'icons', 'lucide.json'), 'utf8')).icons;
const SI = JSON.parse(fs.readFileSync(path.join(ROOT, 'icons', 'simple-icons.json'), 'utf8')).icons;
const BLOBS = JSON.parse(fs.readFileSync(path.join(ROOT, 'blobs.json'), 'utf8'));
const { color } = require('./tokens.js');
const PAGES = require('./pages.js');

// Image paths as seen from ../prototype/
const LOCAL = {
  'hero-iridescence': '../assets/backgrounds/hero-iridescence.jpg',
  'hero-aurora': '../assets/backgrounds/hero-aurora.jpg',
  'hero-silk': '../assets/backgrounds/hero-silk.jpg',
  'hero-grainient': '../assets/backgrounds/hero-grainient.jpg',
  'gridee-dark': '../assets/projects/gridee-home-dark.jpg',
  'gridee-light': '../assets/projects/gridee-home-light.jpg',
  'gridee-icon': '../assets/icons/gridee-icon.png',
  'pulse-insights': '../assets/projects/pulse-insights.jpg',
  'glassbox-ask': '../assets/projects/glassbox-ask.jpg',
  'glassbox-refusal': '../assets/projects/glassbox-refusal.jpg',
  'glassbox-audit-log': '../assets/projects/glassbox-audit-log.jpg',
  'glassbox-audit-replay': '../assets/projects/glassbox-audit-replay.jpg',
};

const TOKENS = Object.fromEntries(Object.entries(color).map(([theme, map]) => [theme, Object.entries(map).map(([k, v]) => `--${k}:${v}`)]));

function lucide(name) {
  const nodes = LUCIDE[name];
  if (!nodes) throw new Error('lucide icon missing from icons/lucide.json: ' + name);
  return nodes.map(([tag, a]) => '<' + tag + ' ' + Object.entries(a).map(([k, v]) => `${k}="${v}"`).join(' ') + '></' + tag + '>').join('');
}

function expandIcons(s) {
  s = s.replace(/\[\[i:([a-z0-9-]+)(?::([\d.]+))?(?::([\d.]+))?(?::([^\]]*))?\]\]/g, (m, n, sz = '20', sw = '2', st = '') =>
    `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${st ? ` style="${st}"` : ''}>${lucide(n)}</svg>`);
  s = s.replace(/\[\[si:([A-Za-z0-9]+)(?::([\d.]+))?(?::([^\]]*))?\]\]/g, (m, n, sz = '20', st = '') => {
    const ic = SI[n];
    if (!ic) throw new Error('simple icon missing from icons/simple-icons.json: ' + n);
    return `<svg width="${sz}" height="${sz}" viewBox="${ic.vb}" fill="currentColor" aria-hidden="true"${st ? ` style="${st}"` : ''}><path d="${ic.d}"></path></svg>`;
  });
  return s;
}

function expandTheme(s, theme) {
  s = s.replace(/\[\[tokens\]\]/g, TOKENS[theme].join('; ') + ';');
  return s.replace(/\[\[theme:([\s\S]*?)~~([\s\S]*?)\]\]/g, (m, l, d) => (theme === 'Dark' ? d : l));
}

function expandDefs(s, defs) {
  s = s.replace(/\[\[if:([a-zA-Z0-9_]+):([\s\S]*?)~~([\s\S]*?)\]\]/g, (m, k, a, b) => (defs[k] === 'true' ? a : b));
  return s.replace(/\[\[def:([a-zA-Z0-9_]+)\]\]/g, (m, k) => {
    if (!(k in defs)) throw new Error('missing def ' + k);
    return defs[k];
  });
}

function expandAssets(s, mode, strict) {
  return s.replace(/\[\[asset:([a-z0-9-]+)\]\]/g, (m, k) => {
    if (mode === 'local') {
      if (!LOCAL[k]) throw new Error('no local image for ' + k);
      return LOCAL[k];
    }
    if (!BLOBS[k]) {
      if (strict) throw new Error('no blob url for ' + k + ' in blobs.json');
      return 'MISSING-BLOB-' + k;
    }
    return BLOBS[k];
  });
}

function splitSource(s) {
  const helmet = s.match(/<helmet>[\s\S]*?<\/helmet>/)[0];
  const script = s.match(/<script type="text\/x-dc"[\s\S]*?<\/script>/)[0];
  const body = s.replace(helmet, '').replace(script, '').trim();
  return { helmet, script, body };
}

function decodeAttr(v) {
  return v.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
}

// Runs the artboard's logic class once with the tweak defaults, like the canvas does on first render.
function evalVals(script) {
  const propsAttr = script.match(/data-props='([^']*)'/);
  const props = {};
  if (propsAttr) {
    const json = JSON.parse(decodeAttr(propsAttr[1]));
    for (const [k, v] of Object.entries(json)) if (!k.startsWith('$') && v && 'default' in v) props[k] = v.default;
  }
  const code = script.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
  const ctx = { console };
  vm.createContext(ctx);
  vm.runInContext(`class DCLogic { constructor(p){ this.props = p || {}; this.state = {}; } setState(o){ Object.assign(this.state, typeof o === 'function' ? o(this.state) : o); } forceUpdate(){} }\n${code}\n;globalThis.__C = Component;`, ctx);
  const inst = new ctx.__C(props);
  if (inst.state === undefined) inst.state = {};
  if (process.env.STATE) Object.assign(inst.state, JSON.parse(process.env.STATE));
  return inst.renderVals();
}

function lookup(vals, p) {
  return p.split('.').reduce((o, k) => (o == null ? undefined : o[k]), vals);
}

function renderTemplate(html, scope) {
  html = html.replace(/<sc-for\s+list="\{\{\s*([\w$.]+)\s*\}\}"\s+as="(\w+)"[^>]*>([\s\S]*?)<\/sc-for>/g, (m, listPath, as, body) => {
    const list = lookup(scope, listPath) || [];
    return list.map((item, i) => renderTemplate(body, Object.assign({}, scope, { [as]: item, $index: i }))).join('');
  });
  let prev;
  do {
    prev = html;
    html = html.replace(/<sc-if\s+value="\{\{\s*([\w$.]+)\s*\}\}"[^>]*>((?:(?!<sc-if)[\s\S])*?)<\/sc-if>/g, (m, p, body) => (lookup(scope, p) ? body : ''));
  } while (html !== prev);
  return fillHoles(html, scope);
}

function fillHoles(s, vals) {
  return s.replace(/\{\{\s*([A-Za-z_$][\w$]*(?:\.[\w$]+)*)\s*\}\}/g, (m, p) => {
    const v = lookup(vals, p);
    if (v === undefined || typeof v === 'function') return '';
    return String(v);
  });
}

// A small structural lint for canvas files (the canvas fails silently on these).
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
function lint(name, html) {
  const problems = [];
  const stack = [];
  const re = /<!--[\s\S]*?-->|<(\/)?([a-zA-Z][\w:-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/)?>/g;
  let m;
  const noScript = html.replace(/(<script[^>]*>)[\s\S]*?(<\/script>)/g, '$1$2').replace(/(<style[^>]*>)[\s\S]*?(<\/style>)/g, '$1$2');
  while ((m = re.exec(noScript))) {
    if (m[0].startsWith('<!--')) continue;
    const [, close, tagRaw, attrs, selfClose] = m;
    const tag = tagRaw.toLowerCase();
    if (attrs) {
      const unq = attrs.match(/\s[^\s=]+=(?!["'])[^\s>]+/);
      if (unq) problems.push(`unquoted attribute in <${tag}${unq[0]}>`);
      if (/style="[^"]*url\(/.test(attrs)) problems.push(`url() in inline style on <${tag}>`);
    }
    if (close) {
      const top = stack.pop();
      if (top !== tag) { problems.push(`mismatch: </${tag}> closes <${top}>`); break; }
    } else if (!VOID.has(tag) && !selfClose) {
      stack.push(tag);
    } else if (selfClose && !VOID.has(tag) && !['path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'stop'].includes(tag)) {
      problems.push(`self-closed non-void <${tag}/>`);
    }
  }
  if (stack.length) problems.push('unclosed: ' + stack.join(' > '));
  const holes = html.match(/\{\{[^}]*\}\}/g) || [];
  for (const h of holes) if (!/^\{\{\s*[A-Za-z_$][\w$]*(?:\.[\w$]+)*\s*\}\}$/.test(h)) problems.push('bad hole ' + h);
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) problems.push('emoji/dingbat character present');
  if (/MISSING-BLOB/.test(html)) problems.push('missing blob urls');
  if (/\[\[/.test(html)) problems.push('unexpanded [[ placeholder');
  console.log(problems.length ? `  lint ${name}:\n   - ` + problems.join('\n   - ') : `  lint ${name}: ok`);
  return problems;
}

function build(key, opts) {
  const page = PAGES[key];
  if (!page) throw new Error(`unknown page "${key}" (pages.js has: ${Object.keys(PAGES).join(', ')})`);
  const raw = fs.readFileSync(path.join(ROOT, page.src), 'utf8');
  let failed = 0;
  for (const v of page.variants) {
    let s = expandIcons(raw);
    s = expandTheme(s, v.theme || 'Light');
    s = expandDefs(s, v.defs || {});

    const loc = expandAssets(s, 'local');
    const p = splitSource(loc);
    const vals = evalVals(p.script);
    const head = p.helmet.replace(/<\/?helmet>/g, '');
    const proto = `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${v.title}</title>\n${head}\n</head>\n<body>\n${renderTemplate(p.body, vals)}\n</body>\n</html>\n`;
    const protoName = v.out.replace(/\.dc\.html$/, (process.env.SUFFIX ? '-' + process.env.SUFFIX : '') + '.html');
    fs.writeFileSync(path.join(OUT_PROTO, protoName), proto);

    const can = expandAssets(s, 'canvas', opts.strict);
    const c = splitSource(can);
    const html = `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>${v.title}</title>\n<script src="./support.js"></script>\n</head>\n<body>\n<x-dc>\n${c.helmet}\n${c.body}\n</x-dc>\n${c.script}\n</body>\n</html>\n`;
    if (opts.canvas) {
      fs.writeFileSync(path.join(OUT_CANVAS, v.out), html);
      console.log(`  wrote prototype/${protoName} and artifact/project/${v.out} (${(html.length / 1024).toFixed(1)} KB)`);
    } else {
      console.log(`  wrote prototype/${protoName}`);
    }
    if (lint(v.out, html).length) failed++;
  }
  return failed;
}

const args = process.argv.slice(2);
const opts = { canvas: args.includes('--canvas'), strict: args.includes('--strict') };
const keys = args.filter((a) => !a.startsWith('--'));
let failures = 0;
for (const k of keys.length ? keys : Object.keys(PAGES)) {
  console.log('build', k);
  failures += build(k, opts);
}
if (failures) {
  console.error(`${failures} artboard(s) failed lint`);
  process.exit(1);
}
