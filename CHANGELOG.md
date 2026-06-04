# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]


## [0.2.0] — 2026-06-04

### Added
- Export `BentoResponsive` type for consumer use
- `tsup` build pipeline — library now ships a compiled `dist/` instead of raw source
- `prepare` script triggers build automatically on `pnpm install` from Git
- `@types/node` added to devDependencies

### Changed
- `package.json` exports now point to `dist/index.js` and `dist/index.d.ts`
- `tsconfig.json` — removed deprecated `baseUrl` (TS 6 compatibility)
- Extract all types to dedicated `types.ts` file
- Rename internal `Size` to `BentoElementSize`
- Remove `"use client"` directive — let consumer handle boundary

### Fixed
- Strip trailing dash from `bento-cols-*` class prefix for responsive variants
- Add `grid-flow-dense` to inline safelist in styles

### Security

## [0.1.0] - 2026-06-03

### Added
- `BentoBox` compound component with `BentoBox.Element`
- Responsive `cols` via `Responsive<Size>` type (`{ base, sm, md, lg }`)
- Container queries support via `bento-cols-*` CSS utilities
- `baseAspect` prop — auto-computes cell ratio per `colSpan × rowSpan`
- `dense` mode (`grid-auto-flow: dense`) to fill grid gaps automatically
- `AnimatePresence` + `layout` animations via `motion/react`
- `layoutId` prop on `BentoBox.Element` for Framer Motion repositioning
- `ImageTile` component with Next.js `Image`, zoom icon, gradient label
- `cn()` utility (`clsx` + `tailwind-merge`)
- Storybook 10 with interaction tests via `play()` functions
- Vitest + Playwright browser testing
- Biome 2 config for lint and format
- GitHub Actions workflow — deploy Storybook to GitHub Pages on push to `main`

### Fixed
- `bento-cols-*` class name missing dash causing `--bento-cols` to be undefined
- `gridAutoRows` formula aspect ratio inverted (`h/w` instead of `w/h`)
- `classNamesFromSize` generating `base:class-name` instead of bare class for base breakpoint
- `grid-rows-[auto]` overriding inline `gridAutoRows` style
- `@container` placement — must be on parent, not on `BentoBox` itself