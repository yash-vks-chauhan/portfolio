'use client';
// The sun/moon segmented control in the nav capsule. Writes data-theme on <html> and remembers the choice.
// To get React Bits' springy thumb, swap the two buttons for <RubberSegment items={['light', 'dark']} … />.
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const swap = () => {
    root.dataset.theme = theme;
  };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (doc.startViewTransition && !reduced) doc.startViewTransition(swap);
  else swap();
  try {
    localStorage.setItem('theme', theme);
  } catch {
    /* storage blocked: the choice lasts for this page only */
  }
}

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  const options: { value: Theme; label: string; Icon: typeof Sun }[] = [
    { value: 'light', label: 'Light appearance', Icon: Sun },
    { value: 'dark', label: 'Dark appearance', Icon: Moon },
  ];

  return (
    <div role="group" aria-label="Appearance" className="mx-1 flex gap-0.5 rounded-full bg-fill2 p-0.5">
      {options.map(({ value, label, Icon }) => {
        const on = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={on}
            onClick={() => {
              setTheme(value);
              applyTheme(value);
            }}
            className={`flex size-10 items-center justify-center rounded-full transition-colors ${
              on ? 'bg-seg-on text-label shadow-[var(--seg-on-shadow)]' : 'text-label2 hover:text-label'
            }`}
          >
            <Icon size={17} strokeWidth={2} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
