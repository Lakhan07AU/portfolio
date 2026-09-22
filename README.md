# Lakhan Singh — Portfolio

A single-page, statically-exported portfolio for **Lakhan Singh** — AI/ML Developer
( Machine Learning · Generative AI · Computer Vision ). BCA student at Alliance
University, Bengaluru.

## Stack

- **Next.js 16** (App Router, static export via `output: "export"`)
- **React 19**, **TypeScript**, **Tailwind CSS v4**
- **Framer Motion** — scroll reveals, reduced-motion aware
- **React Three Fiber / three.js** — hero neural-network scene (WebGL)
- **lucide-react** + hand-rolled brand icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run lint
npm run build    # outputs the static site to ./out (repo root basePath)
```

`next.config.ts` reads `NEXT_PUBLIC_BASE_PATH`. Leave it empty for root
deployments (Vercel, Netlify, GitHub Pages on a custom domain), or set it for a
project-page deployment:

```bash
# GitHub Pages project site at https://<user>.github.io/portfolio/
set NEXT_PUBLIC_BASE_PATH=/portfolio
npm run build
```

Serve the `out/` folder with any static host (`npx serve out`, GH Pages,
Netlify Drop, Vercel — either way).

## Content & data accuracy

No fabricated numbers. In particular:

- GitHub stats (contributions, stars, languages) are fetched **live** from the
  GitHub API at runtime from `lib/github.ts` — nothing is hardcoded.
- Skills in `lib/data.ts` are plain tags, not fake percentage bars.
- Projects use real repositories, dates and links; case-study architectures
  describe the actual codebase.
- Conference/seminar, hackathon and campus-activity claims reflect the
  submissions in `lib/data.ts`. Update that file to sync any text.

## Structure

```
app/            layout, metadata, globals.css, page assembly
components/
  chrome/       navbar, footer, loading screen, cursor, scroll progress
  three/        React Three Fiber hero neural network
  sections/     hero, about, expertise, projects, journey, achievements,
                hackathons, github (live), resume CTA, contact
  projects/     case-study modal + architecture flow
  ui/           reveal, magnetic, tilt card, headings, brand icons
lib/            site config, content data, github fetchers, basePath helper
public/         resume.pdf, favicon
legacy/         original static portfolio, kept as a reference
```

## Scripts

| Script       | Purpose                          |
| ------------ | -------------------------------- |
| `dev`        | Local dev server                 |
| `build`      | Lint + type-check + static build |
| `lint`       | ESLint                           |


