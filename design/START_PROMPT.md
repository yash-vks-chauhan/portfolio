# Start prompt for building the site

Paste this into a new Claude Code session opened in this repo. Fill in the stack first. If a session runs out of room, paste it again: it resumes from `site/PROGRESS.md`.

```
Build my complete portfolio website from the final "Glass" design in /Users/yashchauhan/Desktop/portfolio. Work milestone by milestone until the whole site is done.

1. Each session:
   - If site/PROGRESS.md exists, continue from its first unchecked item.
   - Otherwise, read design/README.md, design/IMPLEMENTATION.md, design/portfolio.design.md and README.md.
   - Then create site/PROGRESS.md, listing every milestone (IMPLEMENTATION.md §3) and every launch check (§7).
   - Branch from design/glass (or from main, if it's merged).
2. Stack: [Astro 7 or Next.js 16] with Tailwind CSS v4, built in site/. If this is blank, ask me first.
3. Pages, in light and dark, at desktop (1440 px) and phone (390 px) widths:
   - home;
   - work index;
   - case studies for GlassBox, Pulse, Gridee and EMS research;
   - short pages for Autoscaler, Kalakraft and CT denoising;
   - research, about and a 404 page.
4. Features:
   - theme switch;
   - source sheets and footnotes;
   - Ask my portfolio v1;
   - ⌘K search;
   - work filter;
   - React Bits backgrounds and components, with reduced-motion fallbacks.
5. The design is final:
   - Match design/screenshots/.
   - Take exact values from design/prototype/.
   - Build on design/tokens/ and design/starter/.
6. Facts:
   - Use facts only from design/starter/content and from the README's project deep-dives and claims audit.
   - Write the Pulse, Gridee and EMS case studies from those, using the GlassBox template, and add their sources to sources.ts.
   - Never invent numbers, and keep the [placeholders].
7. Don't publish Yash_Chauhan_Master_Resume.pdf: it shows my phone number and the double-blind paper's title. Link /resume.pdf and leave the file to me.
8. After each milestone:
   - build, test and type-check;
   - screenshot the pages at 1440 and 390 px with Playwright and compare them with design/screenshots/;
   - fix any differences, tick PROGRESS.md and commit.
   Ask me before pushing, merging or deploying.
9. Finish with a list of what's blocked on me: placeholders, facts to confirm, the domain and the Cloudflare deployment.
```
