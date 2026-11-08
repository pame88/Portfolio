# Project plan

## Initial scope

1. Establish documented static architecture, typed MDX content, shared tokens, and tooling.
2. Build the ten foundational components documented in the component inventory.
3. Assemble Home, Work, Creative, About, and generated project pages with explicitly labeled demonstration content.
4. Validate formatting, tokens, TypeScript, static builds, root/subpath routes, responsive layout, media sizing, and accessibility basics.
5. Review architecture, tokens, components, authoring workflow, tradeoffs, and next steps before advanced features.

## Deliberately deferred

- Final visual identity, fonts, personal biography/contact, and real project content.
- Galleries/carousels, related-project presentation, provider embeds, custom visual experiments, and richer motion until needed.
- Real-media performance budgets and comprehensive manual assistive-technology testing once actual content is selected.
- Live deployment until a GitHub remote is connected and Pages is enabled.

## Collaboration requirements

Preserve established conventions and consider effects on every page. Explain significant tradeoffs and flag requests that undermine consistency. Do not redesign unrelated work. Keep decisions in their owning document rather than duplicating the kickoff prompt.

## Foundation review

- Implemented static Astro/TypeScript/MDX architecture, ten core components, shared tokens, six initial page routes, metadata/sitemap/robots, and a Pages workflow.
- Formatting, CSS/token lint, Astro checking (zero diagnostics), and focused URL tests pass. Negative probes confirmed token lint rejects arbitrary values in both CSS and Astro.
- Root and `/portfolio/` builds pass. Browser checks verified all six routes, internal links, optimized sources, social-image URLs, canonical URLs, and SEO endpoints. Layouts have no horizontal overflow at 320, 375, 768, and 1440px; grids collapse correctly; keyboard skip navigation works.
- A temporary draft confirmed unpublished content is absent from routes, featured listings, and the sitemap. Temporary video fixtures verified native control/track attributes, reduced-motion behavior, and preservation of explicit user pause using mocked playback. Fixtures were removed.
- Actual video decoding/caption accuracy, real-media performance, comprehensive assistive-technology review, and live GitHub deployment remain unverified until assets and hosting are supplied.

Next: review the provisional visual foundation with design references, select approved real projects/media, supply biography/contact content, then connect GitHub Pages. Add richer components only when those projects require them.
