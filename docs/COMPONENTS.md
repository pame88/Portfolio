# Component inventory

Components live under `src/components/` by concern and consume shared tokens.
Pages compose these building blocks rather than duplicating their styles.

| Component       | API and intended use                                                                                                        |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| SiteHeader      | Quiet sans-serif primary navigation, semantic current-page state, responsive wrapping without a JS menu                     |
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
Project content follows the introduction without a divider line. Other shared
rules and subsection borders remain unchanged.

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
Listening Parties, eat!, and ReXplore use the same full-width chapter component
for their walkthrough, concept video, presentation, and research process headings,
preserving their former Markdown anchors.

## Navigation

SiteHeader links to Other and About; the Eamonn Burke brand links home.
The document title suffix also uses Eamonn Burke. No link or project-card
text is underlined on hover; keyboard focus rings remain visible. Navigation
links are never underlined, including the current page; `aria-current` retains
the accessible selected-page state.
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
active pages. TideGreeting replaces the static home greeting without restoring
font-loading scripts or decorative paint. Retaining the older files does not
add them to the published page or approve other source media.

## TideGreeting

Homepage-only introduction accepting `greetings`, a readonly tuple of at least
two strings supplied by the author. Composes Section and Heading, retains the
reserved height for the tallest greeting using overlapping grid cells. The greeting
is centered horizontally and vertically within its introduction. There
is a homepage-only sand-writing treatment: system handwriting fonts, the existing
dark-sand ink, and a static SVG filter that roughens the contours, builds a narrow
raised sand bank, lights the grain, and shades the inside upper edge of each groove.
The greeting stays selectable semantic HTML, not outlined SVG text or an image.
The overlapping cells reserve its handwritten line height even without JavaScript;
no font asset or external service is loaded. The outer bank matches the light-sand
page canvas; the interior uses existing dark sand with only 15% grain modulation,
keeping it lighter than the earlier full-strength shaded treatment.
Other headings retain Georgia.
There is no eyebrow, replay button, or pause button. Reserved shore bands above and below
the heading scatter original ShoreShell artwork without overlapping text or navigation.
On connection, resize, and each covered greeting change, visible shells receive
shuffled horizontal slots and fresh random positions and rotations. Rotated bounds
stay inside their slots and clear of the heading; rearrangement during a wash
happens under the water, before settling begins.
Each wash selects one to five shells, excluding the previous count so it always
changes. Resize only repositions the existing selection. Separate horizontal slots
within each shore band accommodate all five shells even on phones.

Its native custom element uses the Web Animations API for a five-second
start-to-start cadence. During each 3800ms cycle a nine-band wave arrives,
the greeting changes only while covered at the turnaround, and the water
immediately retreats as the shells
settle in a staggered sequence. The absolutely positioned, clipped overlay measures the existing
`selected-work` boundary and three quarters of its top padding; the remaining
quarter is a dry gap above the heading. The homepage caps the decorative edge height to 2.1 times
the remaining space below the header, reserved greeting, and entire shell shore.
Measuring the shore rather than only currently visible shells covers every
possible scatter, including the replacement arrangement. At full reach the leading
contour's 481-899-unit range within the 900-unit drawing covers that whole area
while the entire curved edge stays above the overlay boundary. Arrival stops at
zero translation rather than overshooting into the clip.
Each solid water sheet extends upward by one edge height, keeping it connected
to the top of the clipped overlay throughout travel.
The homepage
requires the shared `site-header` for focus protection. Timing comes from
timing tokens; `tideTimeMilliseconds` accepts both `ms` and `s` because production
CSS optimization can change units. The component owns presentation and lifecycle handling.
The pure `tideWavePaths` helper supplies the original layered contours.
Every wash travels straight down and immediately back up, without corner sweeps
or shear. `createTideVariation` samples phase, amplitude (80-175 drawing units),
wavelength (1600-2400 units), and off-center position once per wash, ranging from
rounded arcs to pronounced deep curves. Both water and foam share those
parameters. Faster opposing currents ripple the edge throughout arrival;
deeper bands soften the broad bend to stay within the drawing.
Randomness is sampled once per cycle, never per frame. No reference photograph
is embedded or published.
It combines a breathing swell with opposing currents and independent internal
bands, then uses analytic slopes for continuously smooth cubic paths. Internal
bands can cross, but remain behind the leading edge. A taller 900-unit drawing
with 64-unit nominal band spacing, stronger 26/14-unit internal currents, and
faster opposing phase rates makes each layer bend more independently.
The 256px-512px responsive edge and larger measured-height allowance widen the
rendered bands rather than just increasing drawing coordinates. Each band has a separately
animated wrapper containing its SVG edge and matching solid water, preserving
the seam-free overlap. `--duration-tide-turn` extends arrival by 400ms so the
water keeps advancing slowly as it approaches its furthest reach. Arrival uses
`--ease-tide-arrival` for a brisk entry and a pronounced slow final approach;
the last 40% of arrival covers less than 5% of its travel, without a stationary hold or
retreat delay. Foam follows the entire advancing phase, then fades as withdrawal
begins. These animations share the normal cancellation lifecycle; no extra timer
can restart an interrupted wash.
Retreat then uses one continuous eased movement per layer, without an
intermediate stop or second run-up. Arrival takes 1080ms, with more of the
unchanged cycle reserved for gradual withdrawal. `--ease-tide-retreat` gives
water and foam a gentler acceleration and deceleration than UI transitions.
The darkest layer retreats in 1428ms;
durations increase toward the shallow edge, whose 2720ms retreat completes the
cycle. The three lightest layers fade throughout their slower withdrawal.
`tideFoamPaths` builds irregular, tapered ribbons along that same leading edge,
with 11-41 drawing-unit midpoint thickness for a more visible foam line.
Their separate layer follows arrival, then freezes its contours at maximum reach:
patches drift only backward and fade at staggered rates as the water pulls away.
An active-only requestAnimationFrame loop updates those contours rather than
sliding fixed shapes; foam geometry updates only during arrival.
Only one six-patch foam trail remains at the turnaround edge. No additional
rows are deposited during withdrawal; its drift and fade share the normal
cancellation lifecycle.
The illustration's nine `--art-tide-*` colors span deep blue to pure white and are a
documented art-only exception; temporary white header ink uses the separate
`--color-on-tide` role.

Reduced motion and no-JavaScript rendering preserve static text and artwork.
Escape stops waves for the rest of the visit, with a screen-reader instruction
and no visible control. Document visibility, introduction visibility,
header keyboard focus, and text selection gate scheduling. Scrolling does not
interrupt an active wash; leaving the viewport only suspends future cycles.
Header pointer activation, Escape, focus/selection changes, and resizing
finish the current animation; subsequent cycles wait a fresh five seconds.
Listeners, observers, timers, animation frames, and animations are cleaned up on disconnection.
The existing header is raised above the decorative overlay only during a wash.
Active-frame SVG hit testing marks each real link white while it is fully backed
by the two darkest water bands; no cloned or noninteractive navigation is used.
The component clears its header attributes on completion or disconnection.
Greeting changes are not live announcements. See the motion exception in
[Design system](DESIGN_SYSTEM.md).

## ShoreShell

Decorative original SVG line drawings accepting a typed `variant`: `scallop`,
`whelk`, `spiral`, `clam`, or `cockle`. Bold outlines and lighter hatching evoke
the owner's embroidery reference without copying or embedding that source image.
Drawings inherit their ink and have no solid fills. TideGreeting owns randomized
placement and rotation, varied responsive sizes, and staggered settling motion.
Shells use art-only pastel pink, rose, lilac, lavender, and light-sand inks.
No shell uses red, blue, or green. These illustration colors do not add interface
color roles.
One to five shells are scattered across the reserved shore at every viewport size;
the count changes with each wash. Without JavaScript, all five retain safe static
positions. SVGs are hidden from assistive
technology, nonfocusable, and pointer-transparent through their decorative container.

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
