// The sun/moon segmented control (nav capsule on desktop, footer on phones). From design/starter/theme/ThemeSwitch.tsx.
// The selected look comes from CSS keyed on <html data-theme> (site.css .theme-switch), so the server-rendered switch is
// already right on first paint; aria-pressed is filled in once the island knows the theme.
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { setTheme, watchTheme, type Theme } from '../../lib/theme';

const OPTIONS: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: 'light', label: 'Light appearance', Icon: Sun },
  { value: 'dark', label: 'Dark appearance', Icon: Moon },
];

export default function ThemeSwitch({ className = '' }: { className?: string }) {
  const [theme, setThemeState] = useState<Theme | null>(null);
  useEffect(() => watchTheme(setThemeState), []);

  return (
    <div role="group" aria-label="Appearance" className={`theme-switch ${className}`}>
      <span className="theme-switch-thumb" aria-hidden="true" />
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          data-value={value}
          aria-label={label}
          aria-pressed={theme === null ? undefined : theme === value}
          onClick={() => setTheme(value)}
        >
          <Icon size={17} strokeWidth={2} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
