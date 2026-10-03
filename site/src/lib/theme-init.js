// Inlined in <head> (Base.astro) before anything paints, so the page never flashes the wrong theme.
// From design/starter/theme/theme-init.js, plus the browser-chrome colour for a chosen theme, and
// <html class="motion-ok"> when neither reduced motion nor Save-Data is on (numbers roll only then).
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var root = document.documentElement;
    root.dataset.theme = theme;
    var accent = localStorage.getItem('accent');
    if (accent === 'indigo' || accent === 'graphite') root.dataset.accent = accent;
    var conn = navigator.connection;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !(conn && conn.saveData)) root.classList.add('motion-ok');
    if (stored) {
      var metas = document.querySelectorAll('meta[name="theme-color"]');
      for (var i = 0; i < metas.length; i++) metas[i].setAttribute('content', theme === 'dark' ? '#000000' : '#F5F5F7');
    }
  } catch (e) {
    /* storage blocked: tokens.css falls back to the OS setting */
  }
})();
