# Architecture

## Product requirements

A personal UX/product design and creative portfolio, hosted as a static GitHub Pages site. The direction is minimal, editorial, contemporary, typography-driven, image-forward, and bespoke rather than template-like. The coastal palette combines faded blues, sandy beige, sea-glass green, and weathered white through shared semantic tokens; pale surfaces are paired with readable darker text. Keep the work central; avoid generic SaaS decoration, unnecessary gradients, and unrelated aesthetic changes.

Priority order: visual quality, design consistency, composable components, creative layout flexibility, media presentation, responsiveness, performance/accessibility, maintainability. When uncertain: consistency > reuse > simplicity > convenience.

Home introduces the portfolio and selected work; Work lists UX/product projects; Creative lists other creative practices; About provides background and contact once supplied. Project pages support both detailed narratives and image-first galleries. Real identity, contact information, assets, and achievements require author input.

## Foundation decisions

- Astro 6, strict TypeScript, static output, MDX, and Astro Content Collections. No backend, database, React runtime, state library, or animation library.
- `src/content/projects/` holds typed MDX metadata and composed storytelling. A single generated project route supplies shared chrome, not a rigid case-study template.
- `src/components/` owns layout, typography, media, and portfolio building blocks. `src/layouts/` owns document metadata and project framing. Pages assemble components, not copies of their styling.
- `src/styles/tokens.css` is the visual source of truth; global/typography styles consume it. Stylelint checks token use in CSS and Astro component styles. Breakpoints use custom-media declarations expanded by PostCSS, since native CSS variables cannot be used in media queries.
- `src/assets/` contains approved imported media. Images are copied unchanged to build output, not resized or re-encoded. `public/media/` is reserved for deliberately unprocessed files such as small video clips. Existing root asset folders remain untouched and are not public site content.
- Native links and CSS provide initial interaction. Introduce islands only when a real interaction requires them.

## Media and accessibility

All imagery uses original full-resolution files without downsampling or lossy conversion, even on mobile. The shared `ResponsiveImage` component uses native `img` with imported source dimensions and responsive CSS, not generated variants. Social images and video posters also retain their original files. This is an intentional quality-over-bandwidth decision: downloads may be much larger, and source quality remains the upper bound. SVG demonstration art stays vector. Hero media loads eagerly; cards and lower-page media load lazily. Project-card thumbnails never crop: width follows the grid column and height follows the image's natural aspect ratio. Other media preserves natural aspect ratios by default, with an intentional crop available when needed.

Native content video has controls, a poster, no automatic download beyond metadata, and a caption-track/transcript authoring contract. Decorative loops are muted, inline, have an explicit pause/play button, and pause under reduced motion (including preference changes). External providers are not loaded until the user follows an external link; an embed component can be added later with a privacy/accessibility decision.

All layouts require semantic landmarks, heading hierarchy, keyboard operation, visible focus, descriptive alternatives, readable contrast, and responsive gutters. Motion is short, optional, and nonessential.

## Routing, metadata, and deployment

`SITE_URL` is the deployment origin; `BASE_PATH` is `/` or the repository subpath. Local defaults are `http://localhost:4321` and `/`, not an assumed production identity. Both are validated in configuration. Internal links and public media resolve through one base-path helper.

GitHub Actions obtains origin and base path from `configure-pages`; a custom domain therefore needs no component changes. Pushes to `main` validate/build/deploy. Pull requests validate/build without deployment. GitHub Pages must be enabled with Actions as its source.

Every page has a title, description, canonical URL, Open Graph/Twitter metadata, and shared default social art. Projects use their own thumbnail. A sitemap and generated robots endpoint follow the configured deployment URL. Unpublished projects are excluded from listings, routes, and the sitemap.

## Growth boundaries

Start with the ten core components and simple pages. Add galleries, related-project displays, art direction, embeds, and richer motion only as content demands them. Local videos are subject to GitHub repository/file/Pages limits; prefer approved external hosting for large files. Git LFS is not a Pages media-serving solution.

See [Design system](DESIGN_SYSTEM.md), [Components](COMPONENTS.md), [Content guide](CONTENT_GUIDE.md), and [Project plan](PROJECT_PLAN.md) for their respective requirements.
