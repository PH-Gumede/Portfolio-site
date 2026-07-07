# Philasande Gumede — Developer Portfolio

A single-page personal portfolio built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies. It introduces me, showcases six of my projects, and gives recruiters a fast way to reach me.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## Overview

This is my developer portfolio — the site recruiters land on first. It exists to answer three questions quickly: **who am I, what have I built, and how do I get in touch.**

- **What it does** — presents an animated hero introduction, a grid of six linked projects (three live deployments, two GitHub repos, one in-progress build), and a contact section with my availability and socials.
- **Who it's for** — recruiters and hiring managers screening for graduate/junior developer roles, and anyone who wants a quick, honest look at my front-end skills.
- **Why it exists** — as a final-year BSc Computing student (UNISA, graduating January 2027) actively applying to graduate programmes in South Africa, I needed one canonical link that represents my work and is easy to keep current.
- **The problem it solves** — instead of sending a CV and hoping someone digs through six separate GitHub repos, this site gives a single, curated entry point with live previews and direct links.

## Features

-  **Custom animated cursor** — a two-part cursor (a solid dot plus a lagging outer ring) that smoothly trails the real cursor and grows on hover over interactive elements.
-  **Glitch-text reveal** — my name and section labels scramble through random letters before resolving into place, triggered on page load and again on hover.
-  **Dark/light theme toggle** — every colour on the page is driven by CSS custom properties, so switching themes recolours the entire site instantly. The toggle button itself loops a small "PG → sun/moon" animation to hint that it's interactive.
-  **Scroll-triggered reveals** — sections fade and slide into view the first time they enter the viewport, staggered slightly for a cascading effect.
-  **Project showcase grid** — six project cards, each linking out to either a live deployment or the project's GitHub repository, tagged with the technologies used.
-  **Contact & availability section** — current location, availability status, and direct links to email, GitHub, and LinkedIn.
-  **Responsive layout** — a dedicated breakpoint reflows the layout, contact grid, and spacing for smaller screens.

## Screenshots / Demo

No screenshots are currently included in this repository. Recommended additions (see the **Assets Checklist** provided alongside this README) include a full-page desktop screenshot, a mobile-viewport screenshot, and a short screen recording of the theme toggle and glitch-text effects in action, since those are motion-based and don't come across in a static image.

## Live Demo

This repository *is* the source for the live site. If you're viewing this on GitHub, deploy it with any static host (GitHub Pages, Netlify, Vercel — see below) and place the resulting URL here.

> **Note:** at the time of writing, no dedicated live URL for this exact repository was found; add it here once deployed.

## Tech Stack

| Category | Technology |
|---|---|
| **Structure** | HTML5 |
| **Styling** | CSS3 — custom properties (CSS variables), `clamp()` for fluid typography, `backdrop-filter`, CSS transitions & keyframe animations |
| **Interactivity** | Vanilla JavaScript (ES6+) — no framework |
| **Fonts** | Google Fonts — Bebas Neue, DM Mono, Instrument Serif, Syne |
| **Build tooling** | None — plain static files |
| **Hosting** | Any static host (GitHub Pages, Netlify, Vercel) |

## Project Structure

```
Portfolio-site/
├── index.html    # All markup: nav, hero, projects grid, contact section
├── main.js       # Cursor, scroll reveal, theme toggle, glitch-text logic
└── style.css     # All styling, including light/dark theme variables
```

There is no `src/` folder, no bundler config, and no package manifest — the three files above are the entire application. This is intentional: the site is meant to run by simply opening `index.html`.

## Installation

No build tools or package managers are required.

```bash
# Clone the repository
git clone https://github.com/PH-Gumede/Portfolio-site.git
cd Portfolio-site

# Open directly in a browser
open index.html        # macOS
start index.html        # Windows
xdg-open index.html     # Linux
```

For the best experience (so relative asset paths resolve correctly and to mirror how it behaves in production), serve it through a lightweight local server instead of opening the file directly:

```bash
# Using Python 3
python -m http.server 8000

# Or using Node's http-server
npx http-server .
```

Then visit `http://localhost:8000`.

## Usage

Once open, use the top navigation to jump between **Home**, **Projects**, and **Contact**. Click the **PG** logo in the top-left to toggle between dark and light mode. Each card in the Projects grid is a link — cards tagged **Live** or **Mobile** open the deployed project in a new tab; cards tagged **GitHub** open the corresponding repository.

## Key Technical Concepts

**Trailing cursor via exponential smoothing.** Rather than snapping the cursor ring directly to the mouse position, `main.js` interpolates toward it every frame:

```javascript
rx += (mx - rx) * 0.12;
ry += (my - ry) * 0.12;
```

This is a simple low-pass filter — each frame, the ring closes 12% of the remaining distance to the real cursor — producing a smooth "lag" effect without needing a physics or animation library.

**One-shot scroll reveal with `IntersectionObserver`.** Instead of listening to `scroll` events and computing element positions manually (expensive and jittery), the site observes each `.reveal` element and reacts only when it crosses a 12% visibility threshold:

```javascript
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target); // fires once, then stops watching
    }
  });
}, { threshold: 0.12 });
```

Calling `unobserve` immediately after the reveal fires means each element is only ever measured twice (once to attach, once to trigger) rather than on every scroll frame — a deliberate performance choice.

**Theme switching without re-rendering.** Every color in the stylesheet is a CSS custom property (`--ash`, `--smoke`, `--accent`, etc.) defined once in `:root` and re-declared inside `body.light-mode`. Toggling a single class on `<body>` recolors the entire page — no JavaScript needs to touch individual elements.

**Letter-scramble glitch effect.** The `runGlitch()` function progressively "locks in" the correct character from left to right, filling the rest with random letters, and speeds up the reveal using a fractional increment (`iteration += 1/3`) so it resolves faster than one letter per animation tick.

## Challenges & Solutions

- **Challenge:** making the theme toggle feel discoverable without an explicit "light/dark" label cluttering the nav.
  **Solution:** the logo itself loops a subtle animation between the "PG" wordmark and a sun/moon icon every 2.2 seconds, hinting that it's interactive without adding extra UI chrome.

- **Challenge:** triggering the glitch-text effect only once per element on scroll, without a state-management library to track "have I already animated this."
  **Solution:** `IntersectionObserver`'s own `unobserve()` call doubles as the "already animated" flag — once an element is unobserved, it simply can't fire again.

## Known Limitations

Being transparent about the current state of this repository:

- The **"Job Tracker App"** project card links to a placeholder URL and references a screenshot (`images/project-03.png`) that isn't included in this repository — the `images/` folder doesn't currently exist, so that thumbnail will render as a broken image.
- The **Contact section's** displayed email (`phgumede1@gmail.com`) and its `mailto:` link target (`phgumede1@email.com`) don't match — clicking "Contact" currently opens a compose window addressed to the wrong domain.
- There is currently no mobile hamburger/overlay navigation (unlike the University and Luxury Listing sites), so the nav links rely on the single responsive breakpoint to stay usable on small screens.
- The footer copyright year is hardcoded rather than generated dynamically.

These are tracked below under **Recommended Improvements** and are quick fixes — flagging them here is meant to demonstrate the same honesty I'd want in a code review, not to undersell the project.

## Future Improvements

- Add a mobile navigation menu (hamburger + overlay) consistent with the pattern already used on the University and Luxury Listing sites.
- Replace the hardcoded footer year with `new Date().getFullYear()`.
- Add a proper `images/` directory (or move all imagery to a CDN, as most project thumbnails already are) so no asset paths are broken.
- Add basic analytics (e.g., a privacy-respecting option like Plausible) to understand which project cards get the most engagement.
- Add a lightweight contact form (e.g., via Formspree) as an alternative to the `mailto:` link, which depends on the visitor having a configured email client.
- Consider migrating to a static site generator (Astro or 11ty) if the project count grows significantly, to avoid hand-maintaining repeated card markup.

## Skills Demonstrated

- Vanilla JavaScript (DOM APIs, `IntersectionObserver`, `requestAnimationFrame`)
- CSS custom properties & theme architecture
- Responsive Web Design
- Animation & micro-interaction design without external libraries
- Semantic HTML & accessibility basics (`aria-label`, `rel="noopener"`)
- Git & GitHub-based project delivery
- Performance-conscious event handling (debounced observers over scroll listeners)

## Credits

- Fonts via [Google Fonts](https://fonts.google.com/) — Bebas Neue, DM Mono, Instrument Serif, Syne.
- Media assets (video previews, screenshots) hosted via [Cloudinary](https://cloudinary.com/).
- All code, design, and content in this repository is original work by Philasande Gumede.

## License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2026 Philasande Gumede

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
