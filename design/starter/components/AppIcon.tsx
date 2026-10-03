// Project and organisation squircles: a diagonal gradient, a 1 px top highlight and one white glyph or monogram.
// Gridee uses its real icon (pass `image`). Organisations get monograms, never their logos.
import type { ComponentType, SVGProps } from 'react';

type Glyph = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }>;

export function AppIcon({
  size = 44,
  gradient,
  Icon,
  monogram,
  image,
  label,
}: {
  size?: number;
  gradient?: string;
  Icon?: Glyph;
  monogram?: string;
  image?: string;
  /** Leave empty when the name is next to the icon (it is then decorative). */
  label?: string;
}) {
  const radius = Math.round(size * 0.225);
  if (image) {
    return <img src={image} alt={label ?? ''} width={size} height={size} style={{ width: size, height: size, borderRadius: radius }} className="shrink-0" />;
  }
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className="flex shrink-0 items-center justify-center text-white"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: gradient,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35)',
        fontSize: Math.round(size * (monogram && monogram.length > 2 ? 0.27 : 0.36)),
        fontWeight: 700,
        letterSpacing: 0,
      }}
    >
      {Icon ? <Icon size={Math.round(size * 0.5)} strokeWidth={2} aria-hidden /> : monogram}
    </span>
  );
}
