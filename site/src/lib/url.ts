// Clean page paths for canonical links, og:url and JSON-LD. With build.format 'file', Astro.url.pathname ends in
// ".html" at build time ("/work.html", "/index.html"); the site is served without extensions ("/work", "/").
export function pagePath(pathname: string): string {
  const clean = pathname.replace(/\.html$/, '').replace(/\/index$/, '/').replace(/(.)\/$/, '$1');
  return clean || '/';
}
