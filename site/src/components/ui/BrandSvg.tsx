// Draws one Simple Icons glyph (CC0) in currentColor from its path data. Islands take the glyph as a prop, resolved
// by their Astro parent with Brand / brandIcons, so the whole icon set never ships to the browser.
import type { BrandGlyph } from '../../lib/brand-icons';

export function BrandSvg({ glyph, size = 16, className, title }: { glyph: BrandGlyph; size?: number; className?: string; title?: string }) {
  return (
    <svg
      viewBox={glyph.viewBox}
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <path d={glyph.d} />
    </svg>
  );
}
