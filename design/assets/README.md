# Assets

Images used by the design, at the sizes the canvas uses. For the site, copy them to `public/images/` and let the framework produce AVIF/WebP.

| File | Size | What it is | Source and notes |
|---|---|---|---|
| `backgrounds/hero-iridescence.jpg` | 1504 × 820 | Still of React Bits **Iridescence** | Captured from reactbits.dev with the demo overlay off. The light hero's fallback and reduced-motion frame; the live component renders at full resolution |
| `backgrounds/hero-aurora.jpg` | 1504 × 756 | Still of React Bits **Soft Aurora** | Same capture method. The dark hero's fallback |
| `backgrounds/hero-silk.jpg` | 1504 × 852 | Still of React Bits **Silk** | Alternative only (Silk needs three.js) |
| `backgrounds/hero-grainient.jpg` | 1504 × 820 | Still of React Bits **Grainient** | Alternative only |
| `projects/glassbox-ask.jpg` | 1440 × 900 | GlassBox answering with citations and a compliance flag | From the Glassbox repo (`docs/screenshots/`) |
| `projects/glassbox-refusal.jpg` | 1440 × 900 | GlassBox refusing an out-of-scope question | Glassbox repo |
| `projects/glassbox-audit-replay.jpg` | 1440 × 900 | Decision replay | Glassbox repo |
| `projects/glassbox-audit-log.jpg` | 1440 × 900 | Per-tenant audit log | Glassbox repo |
| `projects/pulse-insights.jpg` | 1360 × 500 | Pulse campaign insights (demo data) | Cropped from a Pulse screenshot |
| `projects/gridee-home-dark.jpg` | 540 × 712 | Gridee home screen, dark | From `~/gridee-android/Gridee_Android/android-app/output/`. **Cropped above an AdMob test ad**: never use the uncropped screenshots |
| `projects/gridee-home-light.jpg` | 540 × 572 | Gridee home screen, light | Same source, also cropped above the test ad |
| `icons/gridee-icon.png` | 256 × 256 | The real Gridee app icon | `~/gridee-android/Gridee_Android/icon gridee.png` |

**Not here on purpose:** the Fontshare fonts from the earlier "Proof" direction (their licence doesn't allow redistribution, and Glass doesn't use them), and `~/Desktop/appshots.pdf`, which turned out to be a different app ("Schedulio"), not Gridee.

## Canvas upload ids

The canvas references these images by upload id (`source/blobs.json` has the same map). The fonts listed in `artifact/project/` belong to the old Proof artboards only.

| Key | Canvas url | File |
|---|---|---|
| hero-iridescence | `/_blob/1578c4fea80398eb36ce8ff300a21929` | backgrounds/hero-iridescence.jpg |
| hero-aurora | `/_blob/d37edec0c9c6d3712a9a41a19ea771da` | backgrounds/hero-aurora.jpg |
| hero-silk | `/_blob/b92ba49662f3721d42307af910e2b175` | backgrounds/hero-silk.jpg |
| hero-grainient | `/_blob/df1b9377f2709a348b7f39223b7a13c9` | backgrounds/hero-grainient.jpg |
| gridee-dark | `/_blob/59c6398db91f3d286500a8a9e3c99281` | projects/gridee-home-dark.jpg |
| gridee-icon | `/_blob/9b80553303468e2c1e704d6963c26d30` | icons/gridee-icon.png |
| pulse-insights | `/_blob/3148386abefa759f19aba0a9468c0457` | projects/pulse-insights.jpg |
| glassbox-ask | `/_blob/6faf0a3ec5d2bfb565118fcca8af42fd` | projects/glassbox-ask.jpg |
| glassbox-refusal | `/_blob/ccdeb845e712972d78f7f5773c95a872` | projects/glassbox-refusal.jpg |
| glassbox-audit-log | `/_blob/a10436700e5a44774351209a153a1e99` | projects/glassbox-audit-log.jpg |
| glassbox-audit-replay | `/_blob/8b067c9efe56bd600fa6f6626091f1d4` | projects/glassbox-audit-replay.jpg |

## Licences

The background stills are images of React Bits components' output (the components are MIT + Commons Clause). The screenshots and the Gridee icon are your own work. Icon glyphs in the design come from Lucide (ISC) and Simple Icons (CC0); see `source/icons/LICENSES.md`.
