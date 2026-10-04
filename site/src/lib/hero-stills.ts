// The hero's still frames (AVIF and WebP, light and dark): Hero.astro draws them as the CSS background, and the home
// page preloads the AVIF for the OS theme from <head>, since a CSS background is otherwise found only at first layout.
import { getImage } from 'astro:assets';
import { images } from './images';

export interface Still {
  avif: string;
  webp: string;
}

const still = async (key: 'hero-iridescence' | 'hero-aurora'): Promise<Still> => ({
  avif: (await getImage({ src: images[key], format: 'avif', quality: 60 })).src,
  webp: (await getImage({ src: images[key], format: 'webp', quality: 72 })).src,
});

export async function heroStills(): Promise<{ light: Still; dark: Still }> {
  return { light: await still('hero-iridescence'), dark: await still('hero-aurora') };
}
