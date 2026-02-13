# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build to /dist
npm run preview   # Preview production build
npm run host      # Dev server exposed on network (vite --host)
```

No test runner or linter is configured.

## Architecture

This is a **static multi-page portfolio website** built with vanilla JavaScript, Vite, GSAP, and Lenis. There are no frameworks (React, Vue, etc.) or TypeScript.

### Pages

- `index.html` — Home page (hero, featured work, services, social feed, footer)
- `contact.html` — Contact page (form, mouse trail effect)

Vite is configured for multi-entry builds in `vite.config.js`. Vercel rewrites (`vercel.json`) map `/home` → `/index.html` and `/contact` → `/contact.html`.

### JS Modules (`js/`)

Each module is self-contained and checks for page-specific DOM elements before executing:
```js
const isHomePage = document.querySelector(".page.home-page");
if (!isHomePage) return;
```

- `transition.js` — Page transition animations and routing between pages
- `lenis-scroll.js` — Smooth scroll setup with responsive breakpoint configs
- `menu.js` — Navigation menu toggle and animations
- `hero.js` — Hero section: image cycling, parallax effects
- `featured-work.js` — Work carousel with 3D transforms
- `services.js` — Service cards with scroll-triggered pinning
- `footer.js` — Particle explosion effect with config object
- `contact.js` — Mouse trail effect (desktop only, >1000px) and form handling
- `social-feed.js` — Fetches `/data/social.json`, renders posts with scroll animations

### CSS (`css/`)

Pure CSS with custom properties defined in `globals.css`:
```css
--bg: #000; --bg2: #0f0e0e; --fg: #edf1e8; --accent1: #F7931E; --orange: #F7931E;
```

Custom fonts loaded via `fonts.css`: urban-sketart (headings), formula (body), supply-mono (mono), rader (alt headings). Font files are in `public/fonts/`.

Primary mobile breakpoint: `max-width: 1000px`.

### Key Patterns

- **Animations**: GSAP with ScrollTrigger plugin throughout. Scroll-triggered pinning, scrubbing, staggered timelines. ScrollTrigger instances are killed and recreated on resize.
- **Smooth scroll**: Lenis with different configs for desktop (900px+ breakpoint) and mobile.
- **Configuration**: JS modules use local config objects (e.g., `contact.js` trail config, `footer.js` particle physics config). No environment variables.
- **Static data**: Social feed data in `public/data/social.json`. Work item images hardcoded as `work-item-1.png` through `work-item-10.png`.

### Deployment

- **Vercel**: `vercel.json` with build command and rewrites
- **Docker**: Multi-stage Dockerfile (Node build → Nginx Alpine serve on port 80)
- **Nginx**: `nginx.conf` with static asset caching (30 days) and SPA-style fallback
