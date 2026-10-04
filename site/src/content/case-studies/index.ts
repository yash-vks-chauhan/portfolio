// Every case study and short project page, by slug. /work/[slug] renders them.
import type { CaseStudy, ShortPage } from './types';
import { glassbox } from './glassbox';
import { pulse } from './pulse';
import { gridee } from './gridee';
import { ems } from './ems';
import { autoscaler, ctDenoising, kalakraft } from './short-pages';

export const caseStudies: CaseStudy[] = [glassbox, pulse, gridee, ems];
export const shortPages: ShortPage[] = [autoscaler, kalakraft, ctDenoising];
