// Navigation targets. On the home page the nav scrolls to sections (as drawn); elsewhere it goes to the pages.

export type Section = 'home' | 'work' | 'about' | 'research' | 'none';

export interface NavLink {
  key: 'home' | 'work' | 'ask' | 'about';
  label: string;
  href: string;
}

export function navLinks(isHome: boolean): NavLink[] {
  return [
    { key: 'home', label: 'Home', href: isHome ? '#top' : '/' },
    { key: 'work', label: 'Work', href: isHome ? '#work' : '/work' },
    { key: 'ask', label: 'Ask', href: isHome ? '#ask' : '/#ask' },
    { key: 'about', label: 'About', href: isHome ? '#about' : '/about' },
  ];
}

export interface TabLink {
  key: 'home' | 'work' | 'about' | 'contact';
  label: string;
  href: string;
  icon: 'house' | 'layout-grid' | 'user' | 'mail';
}

export function tabLinks(isHome: boolean): TabLink[] {
  return [
    { key: 'home', label: 'Home', href: isHome ? '#top' : '/', icon: 'house' },
    { key: 'work', label: 'Work', href: '/work', icon: 'layout-grid' },
    { key: 'about', label: 'About', href: isHome ? '#about' : '/about', icon: 'user' },
    { key: 'contact', label: 'Contact', href: isHome ? '#contact' : '/#contact', icon: 'mail' },
  ];
}
