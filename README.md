# Portfolio

A premium, production-grade software engineer portfolio. Built as a polished SaaS-style product, not a generic developer site.

## Stack

- **Next.js 15+** (App Router, RSC)
- **TypeScript** (strict)
- **Tailwind CSS** + `tailwindcss-animate`
- **Framer Motion** for motion
- **React Three Fiber + drei** for the hero 3D
- **shadcn/ui** primitives (Radix + variants)
- **next-themes** for theme switching
- **Lenis** for smooth scroll
- **Lucide React** for icons
- **React Hook Form + Zod** for the contact form
- **Resend** for transactional email
- **sonner** for toasts
- **cmdk** for the ⌘K command palette

## Architecture

```
src/
├── app/              # App Router routes, route handlers, sitemap/robots/og
├── components/
│   ├── ui/           # Headless primitives (Button, Card, Input…)
│   ├── sections/     # Page sections (Hero, Projects, Skills…)
│   ├── shared/       # Layout-level components (Navbar, Footer, Palette…)
│   ├── animations/   # Reveal, magnetic, text reveal helpers
│   └── three/        # R3F scenes (lazy / client-only)
├── data/             # JSON-driven content (single source of truth)
├── hooks/            # Reusable client hooks
├── lib/              # utils, seo, validations
├── styles/           # global tokens (also in globals.css)
├── types/            # TS interfaces for all JSON
├── utils/            # extra helpers
└── constants/        # site, nav, philosophy, etc.
```

### Data-driven content

All content (personal info, projects, skills, experience, socials, testimonials) lives in `src/data/*.json` and is typed by `src/types/`. To add a project, drop a new entry into `projects.json` — the homepage grid, filtering, sitemap, and dynamic `/projects/[slug]` page pick it up automatically.

## Getting started

```bash
# 1. Install
npm install   # or pnpm install / yarn

# 2. Env (only required for the contact form)
cp .env.example .env.local

# 3. Dev
npm run dev
```

### Required env vars

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (used in metadata, sitemap) |
| `RESEND_API_KEY` | Resend API key for the contact form |
| `CONTACT_TO_EMAIL` | Inbox that receives form submissions |
| `CONTACT_FROM_EMAIL` | `From:` address (must be verified in Resend) |

Without `RESEND_API_KEY`/`CONTACT_TO_EMAIL`, the API route returns a configuration error — the UI still validates and shows toast feedback.

## Performance

- Three.js scene is dynamically imported, SSR-disabled, with reduced DPR on mobile.
- Fonts loaded via `next/font` (Inter + JetBrains Mono).
- Images use `next/image` (configure `remotePatterns` in `next.config.mjs`).
- Animations respect `prefers-reduced-motion`.
- Lenis is disabled when reduced motion is preferred.
- Built-in scroll progress + active section highlighting use passive listeners.

## SEO

- Per-page metadata via `buildMetadata()` in `lib/seo.ts`.
- Dynamic OG image at `/opengraph-image` (edge runtime, `next/og`).
- Sitemap + robots.txt generated from data.
- Person JSON-LD injected in the layout.

## Accessibility

- Semantic HTML (`<main>`, `<nav>`, `<section>`, `<article>`).
- Skip-to-content link.
- Keyboard support for nav, palette (⌘K), forms.
- `aria-*` labels on icon-only controls.
- Focus-visible rings, color contrast tuned for both themes.

## Replace these placeholders

- `/public/resume.pdf` — drop your real resume PDF (delete `resume.txt`).
- `/public/avatar.jpg` (optional).
- `/public/apple-touch-icon.png` — 180×180 PNG.
- `src/data/personal.json` — your details.
- Project thumbnails — current cards render a built-in code-window mock; if you want real images, point `thumbnail` URLs to files in `/public/projects/` and update `ProjectCard` to render them via `next/image`.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run typecheck` | TypeScript noEmit |
| `npm run lint` | ESLint via Next |
