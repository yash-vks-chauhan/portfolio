// Which template builds which artboards. defs fill [[def:x]] and [[if:x:..]] placeholders; theme picks the token set.
module.exports = {
  Home: {
    src: 'templates/Home.src.html',
    variants: [
      { out: 'GlassHome.dc.html', title: 'Home — Glass, light', theme: 'Light', defs: { bg: 'Iridescence' } },
      { out: 'GlassHomeDark.dc.html', title: 'Home — Glass, dark', theme: 'Dark', defs: { bg: 'Soft Aurora' } },
    ],
  },
  Case: {
    src: 'templates/Case.src.html',
    variants: [
      { out: 'GlassCase.dc.html', title: 'Case study — GlassBox, light', theme: 'Light', defs: {} },
      { out: 'GlassCaseDark.dc.html', title: 'Case study — GlassBox, dark', theme: 'Dark', defs: {} },
    ],
  },
  Work: {
    src: 'templates/Work.src.html',
    variants: [
      { out: 'GlassWork.dc.html', title: 'Work index — Glass, light', theme: 'Light', defs: {} },
    ],
  },
  Mobile: {
    src: 'templates/Mobile.src.html',
    variants: [
      { out: 'GlassMobileFirst.dc.html', title: 'Mobile home, first screen — light', theme: 'Light', defs: { first: 'true', bg: 'Iridescence', h: '844' } },
      { out: 'GlassMobileFirstDark.dc.html', title: 'Mobile home, first screen — dark', theme: 'Dark', defs: { first: 'true', bg: 'Soft Aurora', h: '844' } },
      { out: 'GlassMobile.dc.html', title: 'Mobile home — full scroll', theme: 'Light', defs: { first: 'false', bg: 'Iridescence', h: '5420' } },
    ],
  },
  MobileCase: {
    src: 'templates/MobileCase.src.html',
    variants: [
      { out: 'GlassMobileCaseDark.dc.html', title: 'Mobile case study — dark', theme: 'Dark', defs: { h: '3040' } },
    ],
  },
  Tokens: {
    src: 'templates/Tokens.src.html',
    variants: [
      { out: 'GlassTokens.dc.html', title: 'Glass — tokens', theme: 'Light', defs: { h: '4000' } },
    ],
  },
  Components: {
    src: 'templates/Components.src.html',
    variants: [
      { out: 'GlassComponents.dc.html', title: 'Glass — components (interactive)', theme: 'Light', defs: { h: '2300' } },
    ],
  },
};
