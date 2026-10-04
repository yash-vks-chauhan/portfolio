// Headless Chromium has no GPU: its WebGL is software-rendered (SwiftShader), where the hero keeps its still frame
// (HeroBackground.tsx). Tests and scripts that need the live background use this to stand in for a device with a GPU:
// no performance caveat, and a hardware renderer name.

/** @param {import('@playwright/test').Page} page */
export function pretendGpu(page) {
  return page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    // @ts-expect-error: the overloads of getContext don't survive a wrapper
    HTMLCanvasElement.prototype.getContext = function (type, options) {
      return getContext.call(this, type, options ? { ...options, failIfMajorPerformanceCaveat: false } : options);
    };
    const UNMASKED_RENDERER_WEBGL = 0x9246;
    for (const proto of [WebGLRenderingContext.prototype, WebGL2RenderingContext.prototype]) {
      const getParameter = proto.getParameter;
      proto.getParameter = function (p) {
        return p === UNMASKED_RENDERER_WEBGL ? 'Test GPU' : getParameter.call(this, p);
      };
    }
  });
}
