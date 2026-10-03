// The Toolkit grid (React Bits GlassIcons). Each tool links to the projects that used it.
// `verify` marks a usage the README doesn't state outright; confirm it or drop that project from usedIn.
// Sizes, glows and the phone selection (eight tools, `phone` = order) come from the Home and Mobile artboards.

export interface Tool {
  name: string;
  /** Shorter label on phones ("Postgres"). */
  shortName?: string;
  /** A Simple Icons glyph (lib/brand-icons.ts), or a monogram when there is no glyph. */
  icon: { brand: string; size: number } | { monogram: string; size: number };
  /** Back-tile gradient, light → dark. */
  color: [string, string];
  /** The back tile's coloured shadow. */
  glow: string;
  usedIn: string[];
  /** Position in the phone grid (1–8); tools without one are desktop-only. */
  phone?: number;
  verify?: string;
}

export const toolkit: Tool[] = [
  { name: 'Python', icon: { brand: 'SiPython', size: 30 }, color: ['#4B8BBE', '#306998'], glow: 'rgba(48,105,152,0.35)', usedIn: ['glassbox', 'autoscaler', 'ems-research', 'ieee-manuscript', 'ct-denoising'], phone: 1, verify: 'ieee-manuscript (the README names XGBoost and SHAP but not the language)' },
  { name: 'TypeScript', icon: { brand: 'SiTypescript', size: 28 }, color: ['#4A90E2', '#2D6FBF'], glow: 'rgba(49,120,198,0.35)', usedIn: ['pulse', 'kalakraft', 'autoscaler'], phone: 2, verify: 'Add glassbox if its Next.js front end is TypeScript' },
  { name: 'Kotlin', icon: { brand: 'SiKotlin', size: 26 }, color: ['#A47BFF', '#7F52FF'], glow: 'rgba(127,82,255,0.35)', usedIn: ['gridee'], phone: 5 },
  { name: 'FastAPI', icon: { brand: 'SiFastapi', size: 30 }, color: ['#26A69A', '#00796B'], glow: 'rgba(0,150,136,0.35)', usedIn: ['glassbox', 'autoscaler'], phone: 3 },
  { name: 'Next.js', icon: { brand: 'SiNextdotjs', size: 30 }, color: ['#48484A', '#1C1C1E'], glow: 'rgba(0,0,0,0.3)', usedIn: ['glassbox', 'kalakraft', 'autoscaler'], phone: 4 },
  { name: 'PostgreSQL', shortName: 'Postgres', icon: { brand: 'SiPostgresql', size: 30 }, color: ['#5B7FE8', '#336791'], glow: 'rgba(51,103,145,0.35)', usedIn: ['glassbox', 'autoscaler'], phone: 6, verify: 'autoscaler uses TimescaleDB (a Postgres extension); add pulse if its Prisma database is Postgres' },
  { name: 'scikit-learn', icon: { monogram: 'sk', size: 22 }, color: ['#FFB347', '#F7931E'], glow: 'rgba(247,147,30,0.35)', usedIn: ['glassbox', 'ems-research'], verify: 'Add autoscaler if its Isolation Forest and Random Forest use scikit-learn' },
  { name: 'XGBoost', icon: { monogram: 'XG', size: 20 }, color: ['#3FB27F', '#187A50'], glow: 'rgba(24,122,80,0.35)', usedIn: ['ems-research', 'ieee-manuscript'] },
  { name: 'TensorFlow', icon: { brand: 'SiTensorflow', size: 28 }, color: ['#FF9A3C', '#FF6F00'], glow: 'rgba(255,111,0,0.35)', usedIn: ['ct-denoising'] },
  { name: 'Docker', icon: { brand: 'SiDocker', size: 32 }, color: ['#4FB3FF', '#1D8FE1'], glow: 'rgba(36,150,237,0.35)', usedIn: ['glassbox', 'autoscaler', 'ems-research'], phone: 7 },
  { name: 'Kubernetes', icon: { brand: 'SiKubernetes', size: 30 }, color: ['#5A8DEE', '#326CE5'], glow: 'rgba(50,108,229,0.35)', usedIn: ['autoscaler'] },
  { name: 'AWS', icon: { brand: 'SiAmazonwebservices', size: 32 }, color: ['#FFB02E', '#FF8A00'], glow: 'rgba(255,153,0,0.35)', usedIn: ['glassbox'], phone: 8 },
];

/** How the "used in" chips name each project. */
export const usedInLabel: Record<string, string> = {
  glassbox: 'GlassBox',
  pulse: 'Pulse',
  gridee: 'Gridee',
  'ems-research': 'IIT Madras EMS',
  'ieee-manuscript': 'IEEE manuscript',
  autoscaler: 'Autoscaler',
  kalakraft: 'Kalakraft',
  'ct-denoising': 'CT denoising',
};
