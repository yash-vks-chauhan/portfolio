// Site paths. BASE_PATH at build time hosts the site under a sub-path (GitHub Pages serves this repo at /portfolio/);
// without it, the site sits at the domain root and paths are unchanged.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes a root-relative path ("/work", "/#ask") with the base path; anchors and external URLs pass through. */
export function withBase(path: string): string {
  if (!base || !path.startsWith('/') || path.startsWith('//')) return path;
  return path === '/' ? `${base}/` : `${base}${path}`;
}

// Clean page paths for canonical links, og:url and JSON-LD. With build.format 'file', Astro.url.pathname ends in
// ".html" at build time ("/work.html", "/index.html"); the site is served without extensions ("/work", "/").
export function pagePath(pathname: string): string {
  const clean = pathname.replace(/\.html$/, '').replace(/\/index$/, '/').replace(/(.)\/$/, '$1');
  if (base && clean === base) return `${base}/`;
  return clean || '/';
}
