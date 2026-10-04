// Gridee, on the GlassBox template. Facts: design/starter/content only (projects, experience, answers, sources);
// the README has no Gridee deep-dive. Your role split and the hard engineering story stay [placeholders] until you
// fill them in.
import type { CaseStudy } from './types';

export const gridee: CaseStudy = {
  slug: 'gridee',
  title: 'Gridee · Yash Chauhan',
  description:
    'Gridee is a smart-parking app I co-founded, on Android and iOS with 8,000+ combined downloads: live availability, reservations, wallet and Razorpay payments, and QR or number-plate check-in.',
  name: 'Gridee',
  lead: 'Smart parking I co-founded, with 8,000+ combined Android and iOS downloads.',
  leadPhone: 'Smart parking, in stores',
  icon: { image: 'gridee-icon' },
  actions: [
    { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.gridee.parking', kind: 'play', primary: true },
    { label: 'App Store', href: 'https://apps.apple.com/us/app/grideeapp/id6757460398', kind: 'appstore' },
    { label: 'gridee.in', href: 'https://www.gridee.in/', kind: 'site', desktopOnly: true },
  ],
  stats: [
    { label: 'Downloads', value: '8,000+', note: 'Android and iOS, combined', notePhone: 'Android + iOS' },
    { label: 'Stores', value: '2', note: 'Google Play, App Store', notePhone: 'Play, App Store' },
    { label: 'Since', value: '2026', note: 'co-founded in January', notePhone: 'co-founded' },
    { label: 'Check-in', value: 'QR + plate', note: 'CameraX, ML Kit OCR', notePhone: 'ML Kit OCR' },
    { label: 'Payments', value: 'Razorpay', note: 'no stored card data', notePhone: 'no card data' },
    { label: 'Bookings', value: 'Coins', note: 'refundable' },
  ],
  preview: {
    image: 'phone',
    slides: [
      {
        image: 'gridee-home-dark',
        alt: 'Gridee’s home screen in the dark theme: a search for where to park, and nearby lots with live availability',
        title: 'Home, dark.',
        caption: 'Search where to park; nearby lots show live availability.',
        captionPhone: 'Nearby lots, live availability.',
      },
      {
        image: 'gridee-home-light',
        alt: 'Gridee’s home screen in the light theme',
        title: 'Home, light.',
        caption: 'The same screen in the light theme.',
        captionPhone: 'The light theme.',
      },
    ],
  },
  summary: {
    icon: 'car',
    gradient: 'linear-gradient(145deg, #4CD964, #1F8F3A)',
    text: 'As co-founder and founding engineer, I shipped Gridee on Android and iOS: live availability, reservations, wallet and Razorpay payments, and QR or number-plate check-in with CameraX and ML Kit OCR. It has 8,000+ combined downloads.{{cite:gridee-downloads}}',
    textPhone: 'I co-founded Gridee and shipped it on Android and iOS. It has 8,000+ combined downloads.{{cite:gridee-downloads}}',
  },
  sections: [
    {
      kind: 'prose',
      id: 'what',
      title: 'What it does',
      phone: 1,
      paragraphs: [
        'Gridee is a smart-parking platform. Drivers see live availability, reserve a spot in advance or instantly, and pay from a wallet or with Razorpay.{{cite:gridee-app}}',
        'At the lot, check-in is a QR code or the number plate, read with CameraX and ML Kit OCR. API calls are secured with JWTs, bookings use refundable coins, and no card data is stored.',
      ],
      paragraphsPhone: [
        'Drivers see live availability, reserve in advance or instantly, and pay from a wallet or with Razorpay. Check-in is a QR code or the number plate, read with ML Kit OCR.{{cite:gridee-app}}',
      ],
    },
    {
      kind: 'constraints',
      id: 'built',
      title: 'How it’s built',
      phone: 'more',
      items: [
        { icon: 'scan-line', gradient: 'linear-gradient(145deg, #5AC8FA, #0A7CFF)', title: 'Check-in without typing.', text: 'QR codes, or the number plate read with CameraX and ML Kit OCR.' },
        { icon: 'wallet', gradient: 'linear-gradient(145deg, #4CD964, #1F8F3A)', title: 'Payments without card data.', text: 'A wallet, and Razorpay for cards; the app stores no card data.' },
        { icon: 'repeat', gradient: 'linear-gradient(145deg, #FFB340, #F08A00)', title: 'Refundable bookings.', text: 'Bookings are made with coins that can be refunded.' },
        { icon: 'lock', gradient: 'linear-gradient(145deg, #8E8BFF, #5149C9)', title: 'Secured calls.', text: 'Every API call carries a JWT.' },
      ],
    },
    {
      kind: 'architecture',
      id: 'booking',
      title: 'How a booking works',
      titlePhone: 'How a booking works',
      toc: 'A booking',
      phone: 2,
      intro: 'From search to the gate, in the app.',
      diagram: {
        width: 780,
        height: 296,
        nodes: [
          { x: 8, y: 24, icon: 'smartphone', bold: 'Search', text: 'where to park' },
          { x: 206, y: 24, icon: 'activity', bold: 'Live availability', text: 'of nearby lots' },
          { x: 404, y: 24, icon: 'list', bold: 'Reserve,', text: 'in advance or now' },
          { x: 602, y: 24, icon: 'wallet', bold: 'Pay:', text: 'wallet or Razorpay' },
          { x: 602, y: 184, icon: 'scan-line', tone: 'cite', bold: 'Check in', text: 'QR code or number plate' },
        ],
        edges: [
          { x: 158, y: 64, len: 46, dir: 'right', arrow: true },
          { x: 356, y: 64, len: 46, dir: 'right', arrow: true },
          { x: 554, y: 64, len: 46, dir: 'right', arrow: true },
          { x: 673, y: 112, len: 70, dir: 'down', arrow: true },
        ],
        labels: [
          {
            x: 8,
            y: 184,
            w: 520,
            size: 'note',
            text: 'Plates are read with CameraX and ML Kit OCR. Bookings are refundable coins, and Razorpay takes payments without the app storing card data.',
          },
        ],
        text: 'Text version: a driver searches for parking and sees the live availability of nearby lots, reserves in advance or instantly, and pays from the wallet or with Razorpay. At the lot, check-in is a QR code or the number plate, read with CameraX and ML Kit OCR.',
      },
      steps: [
        { text: '**Search** where to park' },
        { text: '**See live availability** of nearby lots' },
        { text: '**Reserve** in advance or instantly' },
        { text: '**Pay** from the wallet or with Razorpay; no card data stored' },
        { text: '**Check in** with a QR code or the number plate (ML Kit OCR)', tone: 'cite', icon: 'scan-line' },
      ],
    },
    {
      kind: 'prose',
      id: 'role',
      title: 'My part',
      phone: 3,
      paragraphs: ['I co-founded Gridee in January 2026 and am its founding engineer.', '[Your role split with your co-founder: what you built, and what they built]'],
    },
    {
      kind: 'prose',
      id: 'hard-part',
      title: 'One hard problem',
      toc: 'Hard problem',
      phone: 'more',
      paragraphs: ['[One hard engineering story, e.g. OCR check-in reliability or payment refunds: what went wrong, how you found it, and what changed]'],
    },
    {
      kind: 'ai-note',
      id: 'ai-note',
      title: 'How I used AI tools',
      toc: 'AI-tool note',
      phone: 'more',
      text: '[What you delegated to AI tools on Gridee, which decisions stayed yours, and one thing you caught and corrected in review.]',
    },
  ],
  info: [
    { label: 'Role', value: 'Co-founder & founding engineer', phone: true },
    { label: 'Since', value: 'Jan 2026', phone: true },
    { label: 'Platforms', value: 'Android · iOS', phone: true },
    { label: 'Stack', value: 'Kotlin · CameraX · ML Kit · Razorpay', phone: true },
    { label: 'Google Play', value: 'com.gridee.parking', href: 'https://play.google.com/store/apps/details?id=com.gridee.parking' },
    { label: 'App Store', value: 'GrideeApp', href: 'https://apps.apple.com/us/app/grideeapp/id6757460398' },
    { label: 'Site', value: 'gridee.in', href: 'https://www.gridee.in/' },
  ],
  sources: ['gridee-downloads', 'gridee-app', 'gridee-stores'],
  more: ['ems-research', 'glassbox'],
};
