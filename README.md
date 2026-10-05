# zachredder.com

Personal site for Zach Redder: a software developer working on human-centered AI, with a second major in Philosophy.
Next.js 15 (App Router) + TypeScript + Tailwind CSS 4, exported as a fully static site.

- `/` is the portfolio: profile, projects, philosophy, experience, contact.
- `/links/` is the hotbar links page.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm start          # serve ./out locally
npm run lint
npm run typecheck
```

## Add a project

Edit **`src/content/projects.ts`** and append an object to `projects`. No component changes are needed. The
`stack` entries become the visible tags on each card. Put screenshots or video in `public/projects/` and reference them with `media`. Any fact you
don't have yet should be left out with a `// TODO` comment, never guessed.

Other content lives next to it in `src/content/`: `site.ts` (name, email, links, profile), `experience.ts`,
`principles.ts` (the Philosophy section, currently draft copy), `quote.ts` (footer quote) and `links.ts`
(the `/links` hotbar). The Blog button and nav link point to `site.blog` in `site.ts`.

## Design tokens

Colors, fonts, type scale, spacing (golden-ratio steps) and easing are defined once in `src/app/globals.css`
(`@theme` and `:root`). Components use token utilities such as `bg-bg`, `text-gold` and `font-display`; avoid
raw hex values in components.

## Deploy

The site is a static export (`output: 'export'`, `trailingSlash: true`), so any static host works, and `/links/`
works on direct load and refresh because it is a real `out/links/index.html`.

It is deployed on **Vercel**. To publish this repo at zachredder.com, in the Vercel dashboard either:

1. open the existing project, then Settings → Git, and connect it to `zach-redder/personal-portfolio`, or
2. import this repo as a new project, then move the `zachredder.com` domain from the old project to the new one.

Vercel detects Next.js automatically; no extra configuration is required. Production branch: `main`.
