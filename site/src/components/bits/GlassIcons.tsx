/*
 * GlassIcons, from React Bits (https://reactbits.dev · github.com/DavidHDev/react-bits @ ca44b3f, TS + Tailwind variant).
 * Copyright (c) 2026 David Haz. MIT + Commons Clause: used inside this site only; the component itself is not
 * sold or redistributed. Full licence: ./LICENSE-react-bits.md. Site changes, if any, are noted below.
 *
 * Site changes: the grid and tiles take the Toolkit's drawn geometry (72 px tiles in a 6-column grid of 112 px minimum;
 * 60 px tiles in 4 columns on phones) instead of em sizes; each tile is a toggle (`aria-pressed`) with its label shown
 * under it, a coloured glow from `glow`, and a phone order (`phoneOrder`; tiles without one are desktop-only). The
 * hover lift is the design's (effects.css `.gi`), which also covers reduced motion.
 */

import React from 'react';

export interface GlassIconsItem {
  icon: React.ReactElement;
  /** Any CSS background for the back tile. */
  color: string;
  label: string;
  /** Shorter label on phones. */
  shortLabel?: string;
  /** The back tile's coloured shadow (desktop). */
  glow?: string;
  /** Icon size in px on desktop; phones draw it 4 px smaller. */
  iconSize?: number;
  /** Position in the phone grid; items without one are hidden on phones. */
  phoneOrder?: number;
  customClass?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  /** The pressed item's index. */
  selected?: number;
  onSelect?: (index: number) => void;
  className?: string;
  /** id of the element the selection describes (the "used in" panel). */
  controls?: string;
}

const GlassIcons: React.FC<GlassIconsProps> = ({ items, selected, onSelect, className, controls }) => (
  <div className={`gi-grid ${className || ''}`}>
    {items.map((item, index) => {
      const on = index === selected;
      return (
        <button
          key={item.label}
          type="button"
          aria-pressed={on}
          aria-controls={controls}
          onClick={() => onSelect?.(index)}
          className={`gi gi-item ${on ? 'is-on' : ''} ${item.phoneOrder ? '' : 'max-md:hidden'} ${item.customClass || ''}`}
          style={{ '--gi-order': item.phoneOrder ?? 99 } as React.CSSProperties}
        >
          <span className="gi-tile" aria-hidden="true">
            <span className="gb" style={{ background: item.color, '--gi-glow': item.glow ?? 'transparent' } as React.CSSProperties} />
            <span className="gf">
              <span className="gi-glyph" style={{ '--gi-s': item.iconSize ?? 28 } as React.CSSProperties}>
                {item.icon}
              </span>
            </span>
          </span>
          {item.shortLabel ? (
            <>
              <span className="gi-label max-md:hidden">{item.label}</span>
              <span className="gi-label md:hidden">{item.shortLabel}</span>
            </>
          ) : (
            <span className="gi-label">{item.label}</span>
          )}
        </button>
      );
    })}
  </div>
);

export default GlassIcons;
