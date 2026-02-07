# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Marketing site for **Lacy Shell** — a ZSH plugin that detects natural language vs shell commands and routes input accordingly. The site lives at [lacy.sh](https://lacy.sh).

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint (Next.js core-web-vitals + typescript configs)
npm start        # Serve production build
```

## Architecture

Single-page Next.js 16 app using the App Router. No database, no auth, no API beyond one route.

### Key Files

- `app/page.tsx` — The entire site. Client component (`"use client"`) with install tabs, demo lines, tools list, modes grid, and CTA. All content is hardcoded as data arrays at the top of the file (`tabs`, `demoLines`, `tools`).
- `app/layout.tsx` — Root layout with fonts (Instrument Serif + DM Mono via `next/font`), metadata, Open Graph, JSON-LD structured data.
- `app/globals.css` — All styles. Uses CSS custom properties (no Tailwind utility classes despite Tailwind being configured). Tailwind is imported but only used as a CSS reset via `@import "tailwindcss"`.
- `app/hero-beam.tsx` — Canvas-based animated light beam effect. Pure 2D canvas, no dependencies. Tuning constants are extracted at the top of the file with comments.
- `app/install/route.ts` — API route that proxies the install script from `github.com/lacymorrow/lacy/main/install.sh`, cached for 300s.

### Styling Approach

All styling is vanilla CSS in `globals.css` — not Tailwind utility classes. The design system uses CSS custom properties defined in `:root` (Zinc-based dark palette). See `DESIGN.md` for the full design system specification.

Key constraints from the design system:
- Max width: 680px (narrow, document-like)
- Two fonts only: Instrument Serif (headings) and DM Mono (everything else)
- No sans-serif, no gradients, no glows, no rounded corners on structural elements
- Color accents map to ANSI terminal colors: green (shell), magenta (agent), violet (brand), blue (auto mode)
- Single responsive breakpoint at 640px

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`).

## Related Repos

- `lacy-shell/` — The actual ZSH plugin this site markets
- `lash/` — AI coding agent CLI (recommended tool in the tools list)
- `homebrew-tap/` — Homebrew formula for `brew install lacymorrow/tap/lacy`
