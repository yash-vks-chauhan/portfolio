// The Toolkit: React Bits GlassIcons (twelve tools; on phones eight, in the drawn order) and the "used in" panel for
// the pressed tool, which links to each project. Python is pressed to start, as drawn. The panel is a live region,
// so a screen reader hears the projects when the selection changes.
import { useState } from 'react';
import GlassIcons from '../bits/GlassIcons';
import { BrandSvg } from '../ui/BrandSvg';
import type { BrandGlyph } from '../../lib/brand-icons';

export interface ToolProp {
  name: string;
  shortName?: string;
  icon: { brand: BrandGlyph; size: number } | { monogram: string; size: number };
  color: [string, string];
  glow: string;
  phone?: number;
  usedIn: { label: string; href: string }[];
}

export default function ToolkitGrid({ tools }: { tools: ToolProp[] }) {
  const [selected, setSelected] = useState(0);
  const tool = tools[selected];
  const count = `${tool.usedIn.length} ${tool.usedIn.length === 1 ? 'project' : 'projects'}`;
  return (
    <>
      <GlassIcons
        items={tools.map((t) => ({
          label: t.name,
          shortLabel: t.shortName,
          color: `linear-gradient(145deg, ${t.color[0]}, ${t.color[1]})`,
          glow: t.glow,
          iconSize: t.icon.size,
          phoneOrder: t.phone,
          icon:
            'brand' in t.icon ? (
              <BrandSvg glyph={t.icon.brand} size={t.icon.size} />
            ) : (
              <span className="gi-mono" style={{ fontSize: t.icon.size }}>
                {t.icon.monogram}
              </span>
            ),
        }))}
        selected={selected}
        onSelect={setSelected}
        controls="used-in"
      />
      <div id="used-in" className="used-in" aria-live="polite">
        <span className="flex flex-col max-md:hidden">
          <span className="text-[17px] font-semibold tracking-[-0.016em]">{tool.name}</span>
          <span className="text-[13px] tracking-[-0.006em] text-label2">Used in {count}</span>
        </span>
        <span className="text-[15px] font-semibold tracking-[-0.012em] md:hidden">
          {tool.shortName ?? tool.name} <span className="font-normal text-label2">· used in {count}</span>
        </span>
        <span className="used-in-chips">
          {tool.usedIn.map((p) => (
            <a key={p.href} href={p.href} className="used-in-chip">
              {p.label}
            </a>
          ))}
        </span>
      </div>
    </>
  );
}
