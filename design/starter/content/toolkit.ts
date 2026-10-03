// The Toolkit grid (React Bits GlassIcons). Each tool links to the projects that used it.
// `verify` marks a usage the README doesn't state outright; confirm it or drop that project from usedIn.

export interface Tool {
  name: string;
  /** Simple Icons slug (simple-icons package), or a monogram when there is no glyph. */
  icon: { simpleIcon: string } | { monogram: string };
  /** Back-tile gradient, light → dark. */
  color: [string, string];
  usedIn: string[];
  verify?: string;
}

export const toolkit: Tool[] = [
  { name: 'Python', icon: { simpleIcon: 'python' }, color: ['#4B8BBE', '#306998'], usedIn: ['glassbox', 'autoscaler', 'ems-research', 'ieee-manuscript', 'ct-denoising'], verify: 'ieee-manuscript (the README names XGBoost and SHAP but not the language)' },
  { name: 'TypeScript', icon: { simpleIcon: 'typescript' }, color: ['#4A90E2', '#2D6FBF'], usedIn: ['pulse', 'kalakraft', 'autoscaler'], verify: 'Add glassbox if its Next.js front end is TypeScript' },
  { name: 'Kotlin', icon: { simpleIcon: 'kotlin' }, color: ['#A47BFF', '#7F52FF'], usedIn: ['gridee'] },
  { name: 'FastAPI', icon: { simpleIcon: 'fastapi' }, color: ['#26A69A', '#00796B'], usedIn: ['glassbox', 'autoscaler'] },
  { name: 'Next.js', icon: { simpleIcon: 'nextdotjs' }, color: ['#48484A', '#1C1C1E'], usedIn: ['glassbox', 'kalakraft', 'autoscaler'] },
  { name: 'PostgreSQL', icon: { simpleIcon: 'postgresql' }, color: ['#5B7FE8', '#336791'], usedIn: ['glassbox', 'autoscaler'], verify: 'autoscaler uses TimescaleDB (a Postgres extension); add pulse if its Prisma database is Postgres' },
  { name: 'scikit-learn', icon: { monogram: 'sk' }, color: ['#FFB347', '#F7931E'], usedIn: ['glassbox', 'ems-research'], verify: 'Add autoscaler if its Isolation Forest and Random Forest use scikit-learn' },
  { name: 'XGBoost', icon: { monogram: 'XG' }, color: ['#3FB27F', '#187A50'], usedIn: ['ems-research', 'ieee-manuscript'] },
  { name: 'TensorFlow', icon: { simpleIcon: 'tensorflow' }, color: ['#FF9A3C', '#FF6F00'], usedIn: ['ct-denoising'] },
  { name: 'Docker', icon: { simpleIcon: 'docker' }, color: ['#4FB3FF', '#1D8FE1'], usedIn: ['glassbox', 'autoscaler', 'ems-research'] },
  { name: 'Kubernetes', icon: { simpleIcon: 'kubernetes' }, color: ['#5A8DEE', '#326CE5'], usedIn: ['autoscaler'] },
  { name: 'AWS', icon: { simpleIcon: 'amazonwebservices' }, color: ['#FFB02E', '#FF8A00'], usedIn: ['glassbox'] },
];
