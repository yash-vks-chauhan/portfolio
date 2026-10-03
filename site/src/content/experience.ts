// Experience, education and certifications, as drawn in the Experience section (desktop and phone rows).
// A bullet with a number cites its source (bulletSources); the sheet shows the marker after the bullet.
import type { Certification, ExperienceItem } from './types';

export const work: ExperienceItem[] = [
  {
    id: 'gridee',
    org: 'Gridee',
    role: 'Co-Founder & Founding Engineer',
    start: 'Jan 2026',
    end: null,
    range: '2026 – now',
    rangeShort: '2026–',
    summary: 'Shipped a smart-parking platform on Android and iOS: live availability, advance and instant reservations, wallet and Razorpay payments.',
    bullets: [
      'QR and number-plate check-in with CameraX and ML Kit OCR.',
      'JWT-secured API calls, refundable coin bookings, no stored card data.',
      '8,000+ combined downloads.',
    ],
    bulletSources: { 2: 'gridee-downloads' },
    stack: ['Kotlin', 'CameraX', 'ML Kit', 'Razorpay'],
    icon: { image: 'gridee-icon' },
    links: [
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.gridee.parking', kind: 'play' },
      { label: 'App Store', href: 'https://apps.apple.com/us/app/grideeapp/id6757460398', kind: 'appstore' },
    ],
    sources: ['gridee-downloads'],
  },
  {
    id: 'iitm',
    org: 'IIT Madras',
    role: 'Research Intern',
    start: 'Mar 2025',
    end: 'Mar 2026',
    range: '2025 – 26',
    rangeShort: '2025–26',
    summary: 'Emergency medical services analytics for Tamil Nadu’s 108 ambulance service.',
    bullets: [
      'Five-plus years of dispatch and road-construction data, with 100+ data-quality checks.',
      'A GraphSAGE → VAE → XGBoost workflow for drift and anomaly analysis.',
      'An equity analysis across metro, tribal and rural districts.',
    ],
    bulletSources: { 0: 'iitm-internship' },
    stack: ['Python', 'XGBoost', 'SHAP', 'GraphSAGE'],
    icon: { monogram: 'IIT', gradient: 'linear-gradient(145deg, #8E8BFF, #5149C9)' },
    links: [{ label: 'Case study', href: '/work/ems-research', kind: 'case' }],
    sources: ['iitm-internship'],
  },
  {
    id: 'hindalco',
    org: 'Hindalco Industries',
    role: 'Summer Intern, Electrical & Instrumentation',
    roleShort: 'Summer Intern, E&I',
    start: 'Jun 2025',
    end: 'Jul 2025',
    range: '2025',
    rangeShort: '2025',
    summary: 'Predictive maintenance in MTell (ARIMA plus custom anomaly detection) on Proficy Historian and OSI PI sensor streams.',
    bullets: ['Helped deliver a reported 20% drop in unscheduled downtime and 15% lower maintenance cost, a team outcome.'],
    bulletSources: { 0: 'hindalco-report' },
    icon: { monogram: 'H', gradient: 'linear-gradient(145deg, #FFB340, #F08A00)' },
    sources: ['hindalco-report'],
  },
];

export const education: ExperienceItem[] = [
  {
    id: 'srm',
    org: 'SRM Institute of Science and Technology',
    orgShort: 'SRM IST',
    role: 'B.Tech CSE (AI/ML) · CGPA 8.5',
    start: 'Aug 2023',
    end: '2027',
    range: '2023 – 27',
    rangeShort: '2023–27',
    summary: 'B.Tech in Computer Science and Engineering, specialising in AI/ML, graduating in 2027.',
    bullets: ['CGPA 8.5/10.', 'Technical Associate, GitHub Community SRM.'],
    bulletSources: { 0: 'srm-record' },
    icon: { monogram: 'SRM', gradient: 'linear-gradient(145deg, #409CFF, #0A60D6)' },
    sources: ['srm-record'],
  },
];

// The AWS Machine Learning Specialty stays off until confirmed (the résumé and GitHub profile disagree).
export const certifications: Certification[] = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    issued: 'Jan 2026',
    validUntil: 'Jan 2029',
    url: 'https://www.credly.com/earner/earned/badge/620cc098-c1d6-4850-bf9b-06fd39fa1c9a',
    icon: { brand: 'SiAmazonwebservices', gradient: 'linear-gradient(145deg, #3A3A3C, #232F3E)', color: '#FF9900' },
  },
  {
    name: 'Oracle Database SQL Certified Specialist',
    issuer: 'Oracle',
    issued: 'May 2026',
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=4189F0AF0C6DCE40CEEAACA4C0B1E5960B7627143EF726E135A8A0CB88DC52AE',
    icon: { glyph: 'database', gradient: 'linear-gradient(145deg, #FF6961, #C7000B)' },
  },
  {
    name: 'Salesforce Certified Agentforce Specialist',
    issuer: 'Salesforce',
    issued: 'Dec 2025',
    url: 'https://www.salesforce.com/trailblazer/m1492qm8k7toorq2g4',
    icon: { glyph: 'cloud', gradient: 'linear-gradient(145deg, #4FC3F7, #0B76D0)' },
  },
];
