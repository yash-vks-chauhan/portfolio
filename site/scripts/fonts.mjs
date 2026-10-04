// Captures should show Inter, as a returning visitor (font cached) sees it. The site's @font-face uses
// font-display: optional, so a cold load can keep the stand-in font for the whole view; for screenshots the HTML (the
// stylesheet is inlined) is served with `block` instead, which waits for Inter. The pages themselves don't change.

/** @param {import('@playwright/test').Page | import('@playwright/test').BrowserContext} target */
export function preferInter(target) {
  return target.route('**/*', async (route) => {
    if (route.request().resourceType() !== 'document') return route.continue();
    const response = await route.fetch();
    const body = (await response.text()).replace(/font-display:\s*optional/g, 'font-display:block');
    return route.fulfill({ response, body });
  });
}
