# Component inventory

Components live under `src/components/` by concern and consume shared tokens.
Pages compose these building blocks rather than duplicating their styles.

| Component       | API and intended use                                                                                                   |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| SiteHeader      | Quiet sans-serif primary navigation, current-page underline, responsive wrapping without a JS menu                     |
| SiteFooter      | Shared dune-grass footer; honest placeholder status, no invented contact links                                         |
| PageContainer   | `width`: content (default, full width with shared side padding), full (unpadded)                                       |
| Section         | `width` plus optional `id`; container and predictable vertical spacing                                                 |
| Heading         | `as`: h1-h4; `variant`: display, graffiti, xl, l, m, s; optional `tone`: magenta/blue/orange/violet                    |
| Text            | `as`: p/div; `size`: l/m/s; `tone`: primary/secondary; `variant`: body (default) or subtitle                           |
| ProjectCard     | Typed entry; complete lazy thumbnail at natural height, category, serif title, sans-serif description; one linked card |
| ProjectGrid     | Typed entry array; optional `columns`: 2/3; empty state; responsive grid                                               |
| ResponsiveImage | Imported `ImageMetadata`, required `alt`; optional caption/credit, priority, crop; original full-resolution file       |
| VideoPlayer     | Source, poster, accessible label; optional captions/transcript; decorative mode with reduced-motion handling           |

`BaseLayout` supplies document metadata, skip link, header/footer, and main
landmark. `ProjectLayout` supplies project introduction and metadata around
a free MDX body.

Page titles, chapter headings, and project-card titles use Georgia serif.
Subheadings, subtitles, and body text use system sans-serif. Heading level
expresses semantics, while `variant` selects size. The legacy `graffiti`
variant now uses the calm section-heading scale without effects. Existing
tone names respect the enclosing light/dark coastal pair; they do not
override the surface's matching ink. See [Design system](DESIGN_SYSTEM.md).

## Project introduction

Frontmatter can opt into `introLayout: hero-first` to omit the category
eyebrow and place labeled metadata pill groups below the hero. Role, tools,
and skill tags use the existing typed fields; optional timeline and
collaborators appear when supplied. Empty groups are omitted, and the
placeholder warning is retained for demonstration entries. Without a hero,
metadata follows the introduction. Dragon Admin Center opts in; the
standard layout keeps metadata and tags above the hero.

## SectionHeading

Accepts stable `id`, `title`, short structural `label`, optional `as`
(`h2` default, or `h3`), and `tone` (`blue` default, `pink`, or `violet`).
Composes Heading. Chapters use original pale-blue wave lines behind
ocean-blue labels and titles on the off-white canvas, rather than filled
panels. Three overlapping wave bands use irregular line spacing and subtly
different drift and curvature so strands gather, fan out, and cross rather
than repeat as parallel offsets. A stable value derived from `id` shifts
the composition without client-side state or randomness. Every motif is 288px high;
header content may grow at large text sizes without clipping. Artwork is
aria-hidden, nonfocusable, static, and cannot intercept pointer events.
It preserves its proportions and crops centrally on narrow screens rather
than squeezing the curves into steep, repetitive peaks.
The existing `tone` API remains compatible, but all chapter headers now use
the requested blue pairing instead of the earlier multicolor panels.

Subsections retain their neutral rule and dark-beige text on off-white.
Labels communicate reading order, not outcomes. Dragon Admin Center keeps
all chapter/subsection anchors, ordering, and semantic heading levels.

## Navigation

SiteHeader links to Other and About; the Portfolio brand links home.
The Other listing retains `/creative/` and the internal `creative` category,
but page titles, navigation, and project category labels display Other.
UX/product projects remain directly accessible from the home selection
without a separate Work listing. No pages or project layouts render back
buttons.

SiteFooter uses the shared grass color pair: pale dune-green background
and dark-green text, links, focus rings, and borders. Body copy elsewhere
remains grayish-blue outside paired section headings.

## ImageCarousel

Accepts unique `id`, accessible `label`, and nonempty `slides` array of
imported `src`, descriptive `alt`, and optional `caption`. Composes
ResponsiveImage without cropping or re-encoding. Its scroll-snap track
supports touch and a focusable keyboard surface.

A native custom element adds simple line-chevron buttons, a
screen-reader-only polite count, ArrowLeft/ArrowRight and Home/End
navigation, and resize alignment. Buttons retain Previous image/Next image
labels, 48px targets, visible focus, and disabled endpoint states. Side rails
keep controls off artwork and captions. Controls do not wrap and are omitted
for one image. There is no autoplay or animated scrolling. Without JavaScript,
all slides remain scrollable and nonfunctional buttons stay hidden.

## Retained inactive artwork

PaintMarks and SprayGreeting remain in the source but are not imported by
active pages. The home greeting is now a static Heading, with no animation,
font-loading script, SVG masks, or decorative paint. Retaining those files
does not add them to the published page or approve other source media.

## Composition

```astro
<Section>
  <Heading as="h2" variant="l">
    A section title
  </Heading>
  <Text size="l">Supporting content supplied by the author.</Text>
</Section>
```

MDX authors import shared media and sections rather than recreating layouts.
See [Content guide](CONTENT_GUIDE.md) for a complete example. Extend this
inventory only when a concrete project needs a missing shared pattern.
