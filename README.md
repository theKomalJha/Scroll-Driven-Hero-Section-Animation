# Scroll-Driven Hero Section

A recreation of a scroll-driven hero animation: a sports car drives across a road as you scroll, and its trail reveals the letter-spaced headline **W E L C O M E &nbsp; I T Z F I Z Z** while the impact stats drift apart around it.

Inspired by [this reference demo](https://paraschaturvedi.github.io/car-scroll-animation).

- **Live demo:** `https://<your-username>.github.io/<repo-name>/`
- **Stack:** Next.js (App Router, static export) · React · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger

## Features

| Requirement | Implementation |
| --- | --- |
| Above-the-fold hero | A `300vh` section with a sticky, full-viewport track |
| Intro animation | GSAP timeline: the car drives in, headline letters rise in with a stagger, then the stat cards reveal one by one |
| Scroll-driven motion | A ScrollTrigger timeline maps scroll progress to the car's `x`; `scrub: 1` eases the playhead toward the scroll position for fluid motion |
| Headline reveal | The headline is rendered twice in the same box. The trail is a mask that slides in while its contents counter-slide, so the reveal uses only transforms |
| Speed feedback | The gap between raw scroll progress and the smoothed playhead drives a slight car stretch and speed lines |
| Performance | Only `transform` and `opacity` are animated. Layout is read only on ScrollTrigger refresh (load and resize), never per scroll frame |
| Accessibility | A real `<h1>`, decorative layers marked `aria-hidden`, `prefers-reduced-motion` skips the intro and the speed effects, and a `<noscript>` fallback |

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata, no-JS fallback
    page.tsx          # hero + closing section
    globals.css       # Tailwind theme tokens
  components/
    HeroSection.tsx   # all GSAP intro + scroll logic
    CarSvg.tsx        # hand-drawn top-down car (SVG)
  lib/
    content.ts        # headline + stats data
```

## Run locally

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to ./out
```

## Deploy (GitHub Pages)

1. Push this repo to GitHub on the `main` branch.
2. In the repo, open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. The workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds the static export with `NEXT_PUBLIC_BASE_PATH=/<repo-name>` and publishes `out/`.
