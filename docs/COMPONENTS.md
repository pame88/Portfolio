# Component inventory

Components live under `src/components/` by concern and consume shared tokens.
Pages compose these building blocks rather than duplicating their styles.

| Component       | API and intended use                                                                                                        |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| SiteHeader      | Quiet sans-serif primary navigation, current-page underline, responsive wrapping without a JS menu                          |
| SiteFooter      | Shared dune-grass footer; honest placeholder status, no invented contact links                                              |
| PageContainer   | `width`: content (default, full width with shared side padding), full (unpadded)                                            |
| Section         | `width` plus optional `id`; container and predictable vertical spacing                                                      |
| Heading         | `as`: h1-h4; `variant`: display, graffiti, xl, l, m, s; optional `tone`: magenta/blue/orange/violet                         |
| Text            | `as`: p/div; `size`: l/m/s; `tone`: primary/secondary; `variant`: body (default) or subtitle                                |
| ProjectCard     | Typed entry; complete lazy thumbnail at natural height, category/year, serif title, sans-serif description; one linked card |
| ProjectGrid     | Typed entry array; optional `columns`: 2/3; empty state; responsive grid                                                    |
| ResponsiveImage | Imported `ImageMetadata`, required `alt`; optional caption/credit, priority, crop; original full-resolution file            |
| VideoPlayer     | Source, poster, accessible label; optional captions/transcript; decorative mode with reduced-motion handling                |

`BaseLayout` supplies document metadata, skip link, header/footer, and main
landmark. `ProjectLayout` supplies project introduction and metadata around
a free MDX body.

VideoPlayer's optional `showCaption` defaults to `true`. Set it to `false` to
omit the visible figure caption (including any transcript link) without
removing the video's accessible `label`. The eat! concept video opts out.

Section's optional named `heading` slot renders before its padded body
container. Place a chapter SectionHeading directly in that slot to make its
wave artwork viewport-wide while preserving the original title and body
gutters. Content following a slotted heading keeps a 24px gap; other Sections
retain their existing spacing.

Page titles, chapter headings, and project-card titles use Georgia serif.
Subheadings, subtitles, and body text use system sans-serif. Heading level
expresses semantics, while `variant` selects size. The legacy `graffiti`
variant now uses the calm section-heading scale without effects. Existing
tone names respect the enclosing light/dark coastal pair; they do not
override the surface's matching ink. See [Design system](DESIGN_SYSTEM.md).

## Project introduction

Role strings and arrays normalize to a list, so each role receives its own pill.
Shared `pill-list` and `metadata-pill` styles keep project metadata and homepage
skills visually consistent.

Frontmatter can opt into `introLayout: hero-first` to omit the category
eyebrow and place labeled metadata pill groups below the hero. Role, tools,
and skill tags use the existing typed fields; optional timeline and
collaborators appear when supplied. Empty groups are omitted, and the
placeholder warning is retained for demonstration entries. Without a hero,
metadata follows the introduction. Dragon Admin Center opts in; the
standard layout keeps metadata and tags above the hero.

ProjectLayout wraps its introduction in `project-intro`. At tablet widths and
above, shared styles reduce introduction spacing and center hero images with
the viewport-relative `--height-project-hero` cap. Mobile sizing and body media
are unchanged; source dimensions and uncropped image proportions are retained.

## SectionHeading

Accepts stable `id`, `title`, short structural `label`, optional `as`
(`h2` default, or `h3`), and `tone` (`blue` default, `pink`, or `violet`).
Composes Heading. Chapters use original pale-blue wave lines behind
ocean-blue labels and titles on the off-white canvas, rather than filled
panels. Three overlapping, evenly phase-displaced wave bands keep the overall
height relatively consistent across the viewport. Irregular line spacing
and subtle drift and curvature let strands gather, fan out, and cross rather
than repeat as parallel offsets. A stable value derived from `id` shifts
the composition without client-side state or randomness. Every motif is 288px high;
header content may grow at large text sizes without clipping. Artwork is
aria-hidden, nonfocusable, static, and cannot intercept pointer events.
Use `slot="heading"` as a direct child of Section for full-width chapter
artwork. Its internal PageContainer preserves the title's shared gutter and
24px inset. The art clips a drawing at least 75rem wide on narrow screens;
larger viewports stretch it horizontally without changing its height.
The existing `tone` API remains compatible, but all chapter headers now use
the requested blue pairing instead of the earlier multicolor panels.

Subsections retain their neutral rule and dark-beige text on off-white.
Labels communicate reading order, not outcomes. Dragon Admin Center keeps
all chapter/subsection anchors, ordering, and semantic heading levels.

## Navigation

SiteHeader links to Other and About; the Eamonn Burke brand links home.
The document title suffix also uses Eamonn Burke. No link or project-card
text is underlined on hover; keyboard focus rings remain visible, and the
current-page navigation underline remains at rest.
The Other listing retains `/creative/` and the internal `creative` category,
but page titles, navigation, and project category labels display Other.
UX/product projects remain directly accessible from the home selection
without a separate Work listing. No pages or project layouts render back
buttons.

SiteFooter uses the shared grass color pair: pale dune-green background
and dark-green text, links, focus rings, and borders. Body copy elsewhere
remains grayish-blue outside paired section headings.

## FeatureHighlight

Accepts stable `id` and `title`, with default introductory copy, named `media`,
and named `solution` slots. At tablet widths and above, media sits left of the
introduction and the solution spans both columns below. On smaller
screens, reading order is introduction, media, then solution.
Dragon Admin Center uses this composition for its environment picker.
Its responsive rules share the global tablet block so custom media resolves
against the token stylesheet, as it does for project grids.

`FeatureHeading` accepts stable `id` and `title`. All four Dragon Admin Center
features share it, including the heading inside FeatureHighlight. It pairs
the large h3 heading scale with the shared "Feature highlight" label styling,
without a subsection rule. Other feature sections keep their existing body layouts.

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

ProjectGrid accepts `layout="rows"` for the homepage: one project per row,
with an uncropped image on the left and the eyebrow, title, description, and
supplied skill pills on the right at tablet widths and above. On mobile,
the image stacks above its details. ProjectCard accepts the same layout
option; the default grid layout and other listings are unchanged.

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
