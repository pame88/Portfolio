# Component inventory

The foundation intentionally contains a small compositional library. All visual styling uses shared tokens. Components belong under `src/components/` in their respective concern folders.

| Component       | API and intended use                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| SiteHeader      | Shared primary navigation; highlights the current section; wraps on small screens without a JS menu                                         |
| SiteFooter      | Shared site footer; honest placeholder status, no invented contact links                                                                    |
| PageContainer   | `width`: content (default), reading, wide, full; shared alignment and gutters                                                               |
| Section         | `width` plus optional `id`; container and predictable vertical section spacing                                                              |
| Heading         | `as`: h1-h4; `variant`: display, xl, l, m, s; semantic tag independent of visual size                                                       |
| Text            | `as`: p/div; `size`: l/m/s; `tone`: primary/secondary; content slot                                                                         |
| ProjectCard     | Typed collection entry; complete lazy thumbnail at column width with natural height, category, title, description; one semantic linked card |
| ProjectGrid     | Typed entry array; optional `columns`: 2/3; empty state; responsive shared grid                                                             |
| ResponsiveImage | Imported `ImageMetadata`, required `alt`; optional caption/credit, priority, crop; original full-resolution file with responsive display    |
| VideoPlayer     | Required source, poster, accessible label; optional captions/transcript; decorative mode with reduced-motion handling                       |

`BaseLayout` supplies document/head metadata, skip link, header/footer, and main landmark. `ProjectLayout` supplies project introduction and metadata around a free MDX body.

## Composition

```astro
<Section width="reading">
  <Heading as="h2" variant="l">
    A section title
  </Heading>
  <Text size="l">Supporting content supplied by the author.</Text>
</Section>
```

MDX authors import shared media and sections rather than recreate page layouts. See [Content guide](CONTENT_GUIDE.md) for a complete project example.

Variants are not an excuse for one-off overrides. Extend this inventory only when a concrete project requires a missing shared pattern. Future galleries, quotes, embeds, carousels, and related-project UI are not implemented promises.
