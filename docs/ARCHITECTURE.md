# Architecture

## Product requirements

A personal UX/product design and creative portfolio, hosted as a static GitHub Pages site. The direction is calm, simple, and image-forward, inspired by Cape Cod dunes and beach: four matched light-background/dark-ink pairs (beige, grass green, blue, and pink with blueish purple), Georgia serif titles, and clean system sans-serif body text. The page stays warm off-white, the header has no background fill, and the footer stays dune green. System fonts require no font downloads or external services. Keep the work central; decorative paint and animated lettering are not part of the current composition.

The homepage's TideGreeting is an intentional motion exception: an original
nine-band SVG wave covers and reveals approved HTML greetings on a five-second cadence,
leaving scattered bold line-drawn shells behind. The greeting is centered within
the introduction; varied shell sizes and inks occupy reserved space above and
below it, with a new count of one to five and fresh randomized positions and
rotations under each wash. Arrival slows into a continuously advancing turnaround
instead of holding at full coverage, then immediately reverses into withdrawal;
the complete 3800ms wash retains its five-second start-to-start cadence.
A faster 1080ms arrival leaves 2720ms for the longest, gently eased retreat.
Original ShoreShell SVGs evoke the
owner's embroidery-style reference without embedding it. A native custom element and Web Animations API
coordinate the sequence without React, dependencies, or animation media files.
During each wash, an active-only frame loop evolves smooth layered contours
from the pure `tideWavePaths` helper. A separate foam layer follows the incoming
edge, then trails behind and dissolves in patches while water recedes in one
continuous motion. Each water band has its own matching solid fill and retreat:
dark layers withdraw faster, while the three lightest layers trail and fade.
The original SVG artwork uses the owner's
darker blue reference, extending through pale blue to a white leading edge,
with wider band separation, without changing interface color roles.
The effect is isolated to the homepage, stops above Selected work, and provides
Escape-to-stop and reduced-motion behavior without visible animation controls
or an introductory eyebrow. The rotating greeting uses an intentional sand-writing
treatment: local cursive fonts and a static SVG filter modeling rough raised
banks, grain, and recessed shadows on semantic HTML. The existing sand pair
supplies the canvas-matched outer bank and lighter, dark-sand interior;
grain shading is subtle, and dark-sand ink remains the unfiltered fallback.
No font or image asset is added.
Letterforms themselves are not animated.
The real header remains above the water and clickable during washes, with
temporary white ink on links covered by dark water; header state is reset
whenever the cycle completes or is interrupted.

Priority order: visual quality, design consistency, composable components, creative layout flexibility, media presentation, responsiveness, performance/accessibility, maintainability. When uncertain: consistency > reuse > simplicity > convenience.

Home introduces the portfolio and selected work, including direct links to UX/product projects; the separate Work listing page is removed. Other lists creative practices, retaining the existing `/creative/` route and internal `creative` category for URL and content compatibility. About provides background and contact once supplied. Primary navigation contains Other and About; the Eamonn Burke brand links home, and document titles use the same author-supplied name. No pages use back buttons. Project pages support both detailed narratives and image-first galleries. Further identity details, contact information, assets, and achievements require author input.

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
