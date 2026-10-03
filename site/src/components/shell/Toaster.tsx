// sonner's toaster, bottom centre (above the tab bar on phones). Toasts are GlassToast pills (lib/copy.ts).
// It also handles every [data-copy-email] control on the page (the contact card's Copy), so those need no island.
import { useEffect } from 'react';
import { Toaster as Sonner } from 'sonner';
import { copyEmail } from '../../lib/copy';

export default function Toaster() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest('[data-copy-email]');
      if (!el) return;
      e.preventDefault();
      void copyEmail();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return <Sonner position="bottom-center" offset={20} mobileOffset={{ bottom: 104 }} toastOptions={{ unstyled: true }} />;
}
