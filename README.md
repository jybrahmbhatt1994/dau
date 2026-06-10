# DAU — Frontend

A pixel-accurate, fully responsive **Next.js 14 (App Router) + TypeScript + Tailwind CSS** frontend for the DAU site, architected so a **headless WordPress** backend can be dropped in without touching any UI.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

> The first dev run downloads the **Mulish** and **Namdhinggo** fonts via `next/font/google`, so an internet connection is needed for the first build. Placeholder imagery is served from `picsum.photos`.

## Stack & conventions

- **Next.js App Router** with React Server Components — sections render on the server; only the header (dropdowns/drawer) is a client component.
- **Tailwind CSS** — all design tokens from `design-system.md` live in `tailwind.config.ts` (`navy`, `ink`, `brand`, `gold`, `royal`, `surface`, fonts `font-display` = Namdhinggo, `font-sans` = Mulish).
- **TypeScript** everywhere; content shapes are defined in `lib/types.ts`.

## Project structure

```
app/
  layout.tsx        # fonts + TopBar/Header/Footer chrome
  page.tsx          # homepage = composition of section components
  globals.css
components/
  layout/           # TopBar, Header (nav + mobile drawer), Footer
  ui/               # Container, SectionHeading, ActionButton, Logo, icons
  home/             # one component per homepage section
lib/
  types.ts          # content contracts the UI depends on
  wordpress.ts      # << data access layer (mock now, fetch later) >>
data/
  home.ts           # mock homepage content
  navigation.ts     # menus (header / footer / utility bar)
```

## Wiring up headless WordPress

All data flows through **`lib/wordpress.ts`** — the single integration boundary. The UI imports `getHomeData()` / `getNavigation()` and never knows where the data came from.

To go live:

1. Stand up WordPress with **WPGraphQL** (recommended) or use the built-in **REST API**, plus ACF for the structured homepage fields.
2. Set `WORDPRESS_API_URL` in `.env.local` (see `.env.local.example`).
3. Replace the mock returns in `lib/wordpress.ts` with `fetch` calls and **map** the response into the types in `lib/types.ts`. Use `next: { revalidate: 60 }` for ISR.
4. Add WordPress media hostnames to `images.remotePatterns` in `next.config.mjs`.

Because components consume the typed contracts (not the WP payload), no component changes are required.

## Responsiveness

Every section is fluid: 4-up card grids collapse 4 → 2 → 1, the 5-up faculty row goes 5 → 3 → 2, the hero and contact panels stack, and the header switches to a slide-in drawer below `xl`. Headings use `clamp()` so the 60px Figma titles scale down smoothly.
