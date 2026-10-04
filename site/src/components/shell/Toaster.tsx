// sonner's toaster, bottom centre (above the tab bar on phones). Toasts are GlassToast pills (lib/copy.ts).
// It also handles the page's copy and share controls, so those need no island of their own:
//   [data-copy-email]                      copies the email address ("Email copied")
//   [data-copy-text="…"] [data-copy-message] copies that text (e.g. a command)
//   [data-share]                           the system share sheet where there is one, otherwise copies the link
import { useEffect } from 'react';
import { Toaster as Sonner } from 'sonner';
import { copyEmail, copyText } from '../../lib/copy';

async function share() {
  const url = location.href.split('#')[0];
  const title = document.title;
  if (navigator.share) {
    try {
      await navigator.share({ title, url });
      return;
    } catch (err) {
      if ((err as DOMException).name === 'AbortError') return;
    }
  }
  await copyText(url, 'Link copied', url.replace(/^https?:\/\//, ''));
}

export default function Toaster() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-copy-email], [data-copy-text], [data-share]');
      if (!el) return;
      e.preventDefault();
      if (el.hasAttribute('data-copy-email')) void copyEmail();
      else if (el.dataset.copyText) void copyText(el.dataset.copyText, el.dataset.copyMessage ?? 'Copied');
      else void share();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return <Sonner position="bottom-center" offset={20} mobileOffset={{ bottom: 104 }} toastOptions={{ unstyled: true }} />;
}
