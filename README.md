# Design & creative portfolio

A static, editorial portfolio foundation built with Astro, TypeScript, typed MDX collections, and a shared CSS-token design system. Included content is explicitly labeled demonstration material, not real portfolio work.

## Development

Use Node 22.12+ (Node 24 LTS recommended).

```sh
npm ci
npm run dev
```

The development site runs at `http://localhost:4321`.

```sh
npm run format
npm run validate
npm run build
npm run preview
```

Validation checks formatting, CSS/token rules, Astro/TypeScript, and focused content/URL tests. The static output is `dist/`.

## GitHub Pages

Connect a GitHub repository, enable Settings > Pages > GitHub Actions, and push to `main`. The workflow validates and deploys static output; pull requests only validate/build. No live deployment is possible until the remote and Pages are configured.

The workflow derives `SITE_URL` (origin) and `BASE_PATH` from Pages configuration. A future custom domain is supported by updating Pages settings. For local production builds, set them explicitly. PowerShell example:

```powershell
$env:SITE_URL = "https://your-account.github.io"
$env:BASE_PATH = "/your-repository"
npm run build
```

For root/custom-domain hosting use `BASE_PATH="/"`. Do not put the repository path in `SITE_URL`. Defaults are local-only; never publish a local-default build.

## Project requirements

- [Architecture and product requirements](docs/ARCHITECTURE.md)
- [Design tokens and responsive rules](docs/DESIGN_SYSTEM.md)
- [Component APIs and composition](docs/COMPONENTS.md)
- [Adding projects, images, and videos](docs/CONTENT_GUIDE.md)
- [Initial scope and next steps](docs/PROJECT_PLAN.md)
- [Mandatory development behavior](AGENTS.md)

Keep these guides aligned with decisions. The kickoff prompt is distributed by responsibility rather than copied verbatim. Existing source-asset folders are preserved and not published.
