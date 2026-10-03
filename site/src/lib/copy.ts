// Copy-to-clipboard with the "Email copied" toast from the Components artboard.
import { createElement } from 'react';
import { toast } from 'sonner';
import { site } from '../content/site';
import { GlassToast } from '../components/shell/GlassToast';

export async function copyText(text: string, message: string, detail?: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    toast.custom(() => createElement(GlassToast, { message, detail, tone: 'ok' }), { duration: 2400 });
    return true;
  } catch {
    toast.custom(() => createElement(GlassToast, { message: 'Couldn’t copy', detail: text, tone: 'mute' }), { duration: 4000 });
    return false;
  }
}

export function copyEmail(): Promise<boolean> {
  return copyText(site.email, 'Email copied', 'yash.vks.chauhan@…');
}
