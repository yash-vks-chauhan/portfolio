// Theme switching, shared by the nav switch, the phone footer switch and the command bar.
// data-theme on <html> drives every token; the choice is remembered, and until then the OS decides (theme-init.js).

export type Theme = 'light' | 'dark';

export const THEME_EVENT = 'glass:theme';

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme: Theme): void {
  const root = document.documentElement;
  const swap = () => {
    root.dataset.theme = theme;
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', theme === 'dark' ? '#000000' : '#F5F5F7'));
    window.dispatchEvent(new CustomEvent<Theme>(THEME_EVENT, { detail: theme }));
  };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (doc.startViewTransition && !reduced) doc.startViewTransition(swap);
  else swap();
  try {
    localStorage.setItem('theme', theme);
  } catch {
    /* storage blocked: the choice lasts for this page only */
  }
}

/** Calls back with the theme now and whenever it changes (switch, command bar, or OS change before a choice). */
export function watchTheme(cb: (theme: Theme) => void): () => void {
  cb(currentTheme());
  const onEvent = (e: Event) => cb((e as CustomEvent<Theme>).detail);
  const observer = new MutationObserver(() => cb(currentTheme()));
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  window.addEventListener(THEME_EVENT, onEvent);
  return () => {
    observer.disconnect();
    window.removeEventListener(THEME_EVENT, onEvent);
  };
}
