// A Simple Icons glyph (CC0) in currentColor. Works statically in .astro files and inside islands.
import { brandIcons } from '../../lib/brand-icons';

export function Brand({ name, size = 16, className, title }: { name: string; size?: number; className?: string; title?: string }) {
  const icon = brandIcons[name];
  if (!icon) throw new Error(`Unknown brand icon "${name}"`);
  return (
    <svg
      viewBox={icon.viewBox}
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <path d={icon.d} />
    </svg>
  );
}
