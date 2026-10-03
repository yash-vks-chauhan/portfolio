# Canvas snapshot

A copy of every file in the Claude Design canvas "Yash Chauhan — Portfolio UI" (https://claude.ai/artifact/U371MceJ9TvQNAXSAMqjaT), taken on Oct 4, 2026 from version `1791063280-fc88`.

- `project/canvas.json`: the canvas index (pages, artboard positions and sizes, titles, notes).
- `project/Glass*.dc.html`: the **Glass** design (final), 11 artboards:
  - Home light and dark
  - Case study light and dark
  - Work index
  - Phone: first screen light and dark, full home, case study
  - Tokens
  - Components (interactive)
- `project/Main.dc.html`, `HomeDark`, `CaseStudy*`, `Work`, `Mobile*`, `Tokens`, `Components`, `DirA–C`: the earlier "Proof" direction and its alternatives, shown on the canvas under *(previous)* pages. Kept for reference only.

These files only render inside the canvas: they rely on the canvas runtime (`support.js`) and on uploaded images and fonts (`/_blob/…` urls, mapped in `../assets/README.md`). To look at the design outside the canvas, open `../prototype/` instead.

The Glass files are generated: `../source/build.js --canvas` reproduces them byte for byte from `../source/templates/`. To restore the canvas from this folder, or publish a change, ask Claude to publish the files under `project/` to the canvas url above.
