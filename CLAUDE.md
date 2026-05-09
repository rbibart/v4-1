# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal site for Răzvan Bibarț (https://razvanbibart.com), built with Gatsby v3 and styled-components. Forked from Brittany Chiang's `bchiang7/v4`. Deployed to Netlify (and configured for Cloudflare Pages via `_build.toml`). Node 20.18.1 (`.nvmrc`, `.mise.toml`).

## Commands

- `npm run develop` (or `npm start`) — dev server at http://localhost:8000
- `npm run build` — production build into `public/`
- `npm run serve` — serve the built site locally
- `npm run clean` — clear Gatsby `.cache/` and `public/` (run this when GraphQL schema or sources behave oddly)
- `npm run format` — Prettier across `**/*.{js,jsx,json,md}`
- Lint: `npx eslint <path>` (config: `@upstatement/eslint-config/react`)

Note: `netlify.toml` references `npm run build:cf`, which is not defined in `package.json`. If touching the Netlify build, either add that script or update `netlify.toml`.

## Architecture

### Content pipeline
Markdown content lives under `content/` and is loaded by `gatsby-source-filesystem` (see `gatsby-config.js`):
- `content/jobs/<Company>/index.md` — experience entries shown in the Jobs section. Each company is its own folder.
- `content/projects/*.md` — project entries (with `frontmatter.showInProjects` / `featured` flags consumed by section components).
- `content/featured/`, `content/posts/` — additional remark sources.

Markdown is transformed by `gatsby-transformer-remark` with `gatsby-remark-images`, `gatsby-remark-prismjs` (syntax highlighting), `gatsby-remark-code-titles`, and `gatsby-remark-external-links` (auto `target=_blank` + `rel=nofollow noopener noreferrer`).

`gatsby-node.js` `createPages` is currently a no-op — there are no dynamic post/tag pages generated despite `src/templates/{post,tag}.js` existing. If reintroducing blog/tag routes, wire them up there.

### Page composition
- `src/pages/index.js` is the single-page layout that stitches together `src/components/sections/{hero,about,jobs,featured,projects,contact}.js`.
- Other top-level routes: `src/pages/{archive,story,404}.js`.
- `src/components/layout.js` wraps every page with `<Head>`, `<Nav>`, `<Side>` (social/email rails), and `<Footer>`. It also runs the loader animation on first load and handles in-page anchor smooth-scroll.

### Webpack aliases
`gatsby-node.js` defines path aliases — always use them in imports rather than relative paths:
`@components`, `@config`, `@fonts`, `@hooks`, `@images`, `@pages`, `@styles`, `@utils`.

### SSR-incompatible libraries
`scrollreveal`, `animejs`, and `miniraf` are stubbed with `loaders.null()` during `build-html`/`develop-html` stages (see `gatsby-node.js`). When adding any other browser-only library that touches `window` at import time, add it to that null-loader list or guard with `typeof window !== 'undefined'`.

### Sitemap quirk
`gatsby-plugin-sitemap` is configured with `output: '/'` and a custom `resolvePages` that assigns priority/changefreq by path prefix (see `gatsby-config.js`). `scripts/fix-sitemap.js` exists to flatten a generated `public/sitemap.xml/sitemap-0.xml` directory into a single `public/sitemap.xml` file — historically run as a postbuild step. It is not currently wired into `package.json` scripts; if sitemap output regresses, run it manually after `gatsby build` or re-add the postbuild hook.

### Styling
Styled-components throughout. Global theme tokens (colors, fonts, breakpoints) live in `src/styles/` and `src/config.js` (`config.colors` is also consumed by `gatsby-plugin-manifest` and `gatsby-remark-images` tracedSVG).

### Hooks/utils
`src/hooks/` exports `useOnClickOutside`, `usePrefersReducedMotion`, `useScrollDirection`. `src/utils/sr.js` is the shared ScrollReveal singleton — import from there rather than instantiating new instances per component.

## Conventions

- Husky + lint-staged run Prettier on `*.{js,css,json,md}` and ESLint --fix on `*.js` at commit time.
- `.editorconfig` and `prettier.config.js` (extends `@upstatement/prettier-config`) define formatting; do not hand-format against them.
- Site metadata (title, description, siteUrl, og image, twitter handle) is centralized in `gatsby-config.js` `siteMetadata`. The hardcoded `https://razvanbibart.com` also appears in the sitemap `serialize` and robots `sitemap` URL — update all three together if the domain changes.
