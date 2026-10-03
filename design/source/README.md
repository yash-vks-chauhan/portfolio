# Design source

The generator behind the Glass design. One template per page builds both the canvas artboard and the standalone prototype, so the two never drift apart.

```
templates/*.src.html   one template per page (Home builds light and dark, Mobile builds three artboards, …)
pages.js               which template builds which artboards, with their theme and tweak defaults
tokens.js              colour, accent, type, radius, space, material and motion tokens (single source of truth)
build.js               templates → ../prototype/*.html and ../artifact/project/*.dc.html, with a lint for canvas rules
gen-tokens.js          tokens.js → ../tokens/tokens.css, tailwind.css, tokens.json
blobs.json             image key → canvas upload url
icons/                 the Lucide and Simple Icons glyphs the templates use (licences in icons/LICENSES.md)
tools/shoot-all.js     prototypes → ../screenshots/*.jpg (Playwright)
tools/measure.js       a prototype's natural height and any horizontal overflow
```

## Commands

```bash
npm install && npx playwright install chromium   # only needed for screenshots and measuring

npm run build             # prototypes only
npm run build:canvas      # prototypes + canvas artboards (fails if an image has no upload url)
npm run build:open-states # Components prototype with every sheet and menu open
npm run tokens            # regenerate ../tokens/*
npm run shots             # regenerate ../screenshots/*
npm run measure -- GlassHome.html 1440
```

`build.js` needs nothing beyond Node. Running `npm run build:canvas` today reproduces `../artifact/project/Glass*.dc.html` exactly.

## Template placeholders

| Placeholder | Becomes |
|---|---|
| `[[tokens]]` | the theme's colour tokens from `tokens.js`, as CSS custom properties on the page root |
| `[[theme:LIGHT~~DARK]]` | the light or dark text, per variant |
| `[[if:key:THEN~~ELSE]]` / `[[def:key]]` | variant settings from `pages.js` (for example the phone first-screen crop) |
| `[[asset:key]]` | a local image path in prototypes, the `/_blob/` url in the canvas |
| `[[i:name:size:stroke]]` | an inline Lucide icon |
| `[[si:Name:size]]` | an inline Simple Icons glyph |
| `{{a.blue}}`, `{{bgClass}}`, … | canvas tweak values computed by the template's `renderVals()` (Accent, Background) |

Canvas rules the lint enforces: closed elements and quoted attributes, no `url()` in inline styles, holes that are plain dotted lookups, no emoji, no unexpanded placeholders.

## Changing the design

1. Edit `templates/<Page>.src.html` (or `tokens.js` for a token).
2. `npm run build:canvas`, then open the prototype to check it. `npm run measure` tells you the new page height if it changed: update the root `min-height`, `$preview` and the artboard's `h` in `pages.js` and `../artifact/project/canvas.json`.
3. `npm run shots` and `npm run tokens` if needed.
4. New image? Upload it to the canvas, add its url to `blobs.json` and its path to `LOCAL` in `build.js`.
5. Ask Claude to publish the changed `../artifact/project/` files to the canvas.
