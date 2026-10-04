// A Simple Icons glyph (CC0) in currentColor, by name. For .astro files (and the lazy command bar): it imports every
// glyph, so islands use BrandSvg with the glyph passed in instead.
import { brandIcons, type BrandGlyph } from '../../lib/brand-icons';
import { BrandSvg } from './BrandSvg';

export function brandGlyph(name: string): BrandGlyph {
  const icon = brandIcons[name];
  if (!icon) throw new Error(`Unknown brand icon "${name}"`);
  return icon;
}

export function Brand({ name, size = 16, className, title }: { name: string; size?: number; className?: string; title?: string }) {
  return <BrandSvg glyph={brandGlyph(name)} size={size} className={className} title={title} />;
}
