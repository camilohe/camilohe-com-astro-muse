# camilohe.com

Personal website and blog for Camilo Estevez, built with [Astro](https://astro.build/).
Static output — deploys as plain files to Cloudflare Pages.

## Local development

Requires Node 22 (see `.nvmrc`).

```bash
npm install
npm run dev      # dev server with hot reload
npm run build    # production build -> dist/
```

## Deploying to Cloudflare Pages

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, select this repo.
3. Set these build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist/`
   - **Node.js version:** picked up automatically from `.nvmrc` (22)
4. Under **Custom domains**, add `www.camilohe.com` (DNS is already on Cloudflare,
   so the record is created automatically with free SSL).

Every push to `main` rebuilds and redeploys automatically. Preview deployments are
created for pull requests.

## Security updates

Dependencies are minimal on purpose: `astro` and `@astrojs/rss` only.

- **Dependabot** (`.github/dependabot.yml`) checks weekly for new versions of npm
  packages and GitHub Actions, and opens pull requests automatically.
- The **CI workflow** (`.github/workflows/ci.yml`) runs `npm ci && npm run build`
  on every push and PR, so a broken dependency update shows up as a failing check.
- Workflow for an update PR: review the changelog, check CI is green, merge.
  - **Patch/minor updates** of Astro are low-risk and can usually be merged as-is.
  - **Major updates** of Astro — glance at the
    [migration guide](https://docs.astro.build/en/guides/upgrade-to/v6/) first;
    breaking changes are clearly documented.
- Because the site is fully static (no server, no database, no runtime secrets),
  the attack surface is tiny: the main thing to keep fresh is the build toolchain.

## Content management

### New blog post

Create a Markdown file in `src/content/blog/`, e.g. `src/content/blog/my-post.md`,
with this frontmatter:

```markdown
---
title: "My post title"
date: 2026-10-06
description: "One or two sentences shown on the blog index and in the RSS feed."
tags: ["powershell", "til"]
draft: false
---

Your Markdown content here. Code blocks get syntax highlighting automatically.
```

The filename becomes the URL: `my-post.md` → `https://www.camilohe.com/blog/my-post/`.

### TIL convention

Short "today I learned" posts are just short posts tagged `til`. Tag pages
(`https://www.camilohe.com/tags/til/`) are generated automatically — no manual
index to maintain.

### Drafts

Set `draft: true` in frontmatter to keep a post out of production builds while you
work on it. Flip to `false` (or remove the line) when it's ready.

### Updating

Edit the file (or `src/pages/about.astro`, `src/pages/projects.astro` for the
static pages), commit, and push. Cloudflare Pages rebuilds automatically — live
in about a minute.

### Tags

Any string in the `tags` array works. Tag index (`/tags/`) and per-tag pages
(`/tags/<tag>/`) are generated at build time from whatever tags exist.
