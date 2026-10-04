// sonner's toaster (bottom centre, above the tab bar on phones) and the copy/share actions that end in a toast.
// The Shell island loads this module on the first copy or share and hands it the actions to run.
import { useEffect } from 'react';
import { Toaster as Sonner } from 'sonner';
import { copyEmail, copyText } from '../../lib/copy';
import type { CopyRequest } from '../../lib/events';

export type ToastAction = CopyRequest & { id: number };

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

export default function Toasts({ actions, onDone }: { actions: ToastAction[]; onDone: (id: number) => void }) {
  // Runs after sonner's own effect has subscribed (effects run children first), so the first toast isn't lost.
  useEffect(() => {
    for (const a of actions) {
      onDone(a.id);
      if (a.kind === 'email') void copyEmail();
      else if (a.kind === 'text') void copyText(a.text, a.message);
      else void share();
    }
  }, [actions, onDone]);
  return <Sonner position="bottom-center" offset={20} mobileOffset={{ bottom: 104 }} toastOptions={{ unstyled: true }} />;
}
