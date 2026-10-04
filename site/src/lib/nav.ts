// Navigation targets. On the home page the nav scrolls to sections (as drawn); elsewhere it goes to the pages.
import { withBase } from './url';

export type Section = 'home' | 'work' | 'about' | 'research' | 'none';

export interface NavLink {
  key: 'home' | 'work' | 'ask' | 'about';
  label: string;
  href: string;
}

export function navLinks(isHome: boolean): NavLink[] {
  return [
    { key: 'home', label: 'Home', href: isHome ? '#top' : withBase('/') },
    { key: 'work', label: 'Work', href: isHome ? '#work' : withBase('/work') },
    { key: 'ask', label: 'Ask', href: isHome ? '#ask' : withBase('/#ask') },
    { key: 'about', label: 'About', href: isHome ? '#about' : withBase('/about') },
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
    { key: 'home', label: 'Home', href: isHome ? '#top' : withBase('/'), icon: 'house' },
    { key: 'work', label: 'Work', href: withBase('/work'), icon: 'layout-grid' },
    { key: 'about', label: 'About', href: isHome ? '#about' : withBase('/about'), icon: 'user' },
    { key: 'contact', label: 'Contact', href: isHome ? '#contact' : withBase('/#contact'), icon: 'mail' },
  ];
}
