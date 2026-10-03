// Inline this in <head>, before any stylesheet paints, so the page never flashes the wrong theme.
// Next.js: <script dangerouslySetInnerHTML={{ __html: themeInit }} /> in the root layout's <head>.
// Astro:   <script is:inline> … </script> in the base layout's <head>.
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var root = document.documentElement;
    root.dataset.theme = theme;
    var accent = localStorage.getItem('accent');
    if (accent === 'indigo' || accent === 'graphite') root.dataset.accent = accent;
  } catch (e) {
    /* storage blocked: tokens.css falls back to the OS setting */
  }
})();
