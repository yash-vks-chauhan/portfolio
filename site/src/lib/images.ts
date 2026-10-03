// Every image the pages use, imported so Astro can size it and produce AVIF/WebP at build time.
// Provenance and licences: design/assets/README.md.
import type { ImageMetadata } from 'astro';
import glassboxAsk from '../assets/images/glassbox-ask.jpg';
import glassboxRefusal from '../assets/images/glassbox-refusal.jpg';
import glassboxAuditReplay from '../assets/images/glassbox-audit-replay.jpg';
import glassboxAuditLog from '../assets/images/glassbox-audit-log.jpg';
import grideeHomeDark from '../assets/images/gridee-home-dark.jpg';
import grideeHomeLight from '../assets/images/gridee-home-light.jpg';
import grideeIcon from '../assets/images/gridee-icon.png';
import heroIridescence from '../assets/images/hero-iridescence.jpg';
import heroAurora from '../assets/images/hero-aurora.jpg';
import pulseInsights from '../assets/images/pulse-insights.jpg';

export const images = {
  'glassbox-ask': glassboxAsk,
  'glassbox-refusal': glassboxRefusal,
  'glassbox-audit-replay': glassboxAuditReplay,
  'glassbox-audit-log': glassboxAuditLog,
  'gridee-home-dark': grideeHomeDark,
  'gridee-home-light': grideeHomeLight,
  'gridee-icon': grideeIcon,
  'hero-iridescence': heroIridescence,
  'hero-aurora': heroAurora,
  'pulse-insights': pulseInsights,
} satisfies Record<string, ImageMetadata>;

export type ImageKey = keyof typeof images;

export function image(key: string): ImageMetadata {
  const img = (images as Record<string, ImageMetadata>)[key];
  if (!img) throw new Error(`Unknown image "${key}". Add it to src/lib/images.ts.`);
  return img;
}
