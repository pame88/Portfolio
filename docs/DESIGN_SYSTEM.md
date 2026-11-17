# Design system

## Direction and source of truth

The site is simple, sleek, and peaceful, inspired by Cape Cod dunes and beach.
`src/styles/tokens.css` owns shared visual decisions. The supplied beach
references inform eight muted colors: paired dune greens, paired sand beiges,
sunset pink, blueish lavender, sky blue, and ocean blue. Project artwork
retains its original colors and files; reference photographs are not published.

## Typography

- Georgia, with Times New Roman and generic serif fallbacks, gives page titles,
  chapter headings, and project titles a soft editorial character.
- Segoe UI, Helvetica Neue, Arial, and generic sans-serif fallbacks support
  navigation, subheadings, subtitles, body copy, labels, and captions.
- Headings use regular serif weight; sans-serif subheadings use medium weight.
  Fluid sizes and balanced wrapping preserve hierarchy on smaller screens.
- No font service, new dependency, text texture, shadow, or animated greeting
  is required. System availability can slightly change font metrics, an
  intentional tradeoff for immediate rendering and zero font downloads.

## Coastal palette

| Primitive token          | Color     | Use                                                    |
| ------------------------ | --------- | ------------------------------------------------------ |
| `--color-grass-light`    | `#dce5ca` | Pale dune grass; footer surface                        |
| `--color-grass-dark`     | `#4e6046` | Muted grass; footer text                               |
| `--color-sand-light`     | `#f8f6f0` | Original warm off-white; canvas and metadata pills     |
| `--color-sand-dark`      | `#74634b` | Muted dark beige; subsection-header text and rules     |
| `--color-sunset-pink`    | `#efcdd2` | Pastel sunset pink; available paired surface           |
| `--color-horizon-purple` | `#5f5575` | Muted blueish purple; all text and controls on pink    |
| `--color-sky-light`      | `#d7e8ee` | Pastel sky blue; chapter wave lines                    |
| `--color-ocean-dark`     | `#40596c` | Darker grayish-blue; body text, links, and site header |

Semantic color roles alias these eight primitives rather than defining
additional shades. No white/black ink, opacity-derived UI colors, or
shadow colors are added. The pastel surfaces carry the reference colors.
Section headers keep each pair together: dark beige on off-white, dark grass on pale grass,
blueish purple on pink, and ocean blue on sky blue. Darker members are
intentionally deep enough for legible small text, rather than pale pastels
that would fail contrast. Pink is the lighter member of the pink/purple pair;
purple is ink, not a background.

All four pairings meet at least 4.5:1 contrast, including labels and links.
Focus uses the same paired ink and exceeds 3:1. Borders are decorative,
not sole control or focus indicators.

Outside paired section headers and the footer, all text uses the darker
grayish-blue ocean ink, including page titles, prose, subtitles, labels,
links, captions, and controls. The page stays off-white. The footer uses
the complete dune-green pair: pale grass with dark-green text and links.
All surfaces retain at least 4.5:1 text contrast.

Shared `.color-pair` styling with `--sand`, `--sky`, `--grass`, or `--sunset`
modifiers sets both background
and foreground together, including nested heading tones, secondary text,
links, hover states, borders, and focus rings. Do not select ink independently
from its surface. Hover retains the paired ink and never underlines text,
including brand, navigation, project cards, and prose links. Prose links and
the current-page navigation item remain underlined at rest for discoverability;
keyboard focus retains a visible outline without adding colors.

Existing tone names (`magenta`, `pink`, `orange`, `violet`) and complement
tokens remain compatible with authored content. They now resolve to the
eight-color palette. Chapter headers intentionally use the blue pairing
across all legacy tone values; pale sky-blue wave lines replace the older
sunset, sky, and grass panels. Purple remains the pink pair's dark ink,
not an independent surface. Heading tone names
respect their enclosing pair instead of forcing a different hue.
Legacy paint tokens and unused
art components are retained without publishing or rendering them. Their
assets and font licenses remain untouched; active layouts no longer load
painted fonts or import the decorative greeting.

## Layout and components

- Keep the existing 4-128px spacing scale and fluid page gutters. All nonzero
  spacing, colors, font sizes, radii, shadows, and timing use shared tokens.
  Zero, intrinsic sizing, and structural percentages are CSS mechanics.
- PageContainer fills available width with shared side padding by default;
  `width="full"` explicitly removes padding. There is no centered max-width
  cap. Long desktop prose lines remain an intentional full-width tradeoff.
- Section owns vertical rhythm. Heading and Text do not add section spacing.
  Nested groups must not duplicate gutters. Section's optional named `heading`
  slot sits outside its padded content container, providing an explicit
  viewport-wide chapter-art region without viewport-unit breakouts or negative
  margins. The body keeps its existing gutter and 24px post-heading gap.
- Grids start at one column, become two at 48rem, and optionally three at
  72rem. Typography and gutters scale fluidly without page-specific breakpoints.
- Homepage Selected work intentionally uses one project per row. At 48rem
  and above, each row pairs equal-width image and details columns with a
  48px gap; below that breakpoint, details follow the image. Rows have 64px
  separation. Skills reuse the project-metadata pill styles; thumbnails
  remain complete and uncropped. Other listings retain their grid layout.
- Home uses the existing welcome phrase as static semantic text. There is no
  hero artwork, paint stripe, overspray, or entrance animation.
  No divider separates the welcome and selected-work sections; their shared
  Section spacing remains unchanged.
- The header has no background fill, allowing the off-white page canvas to show through.
  Its text remains ocean blue, with no bottom border.
  Header navigation uses plain sans-serif links without spray texture or shadow, padded targets, visible
  focus, native wrapping, and an underline plus `aria-current` for the
  current page at rest, never on hover. The Eamonn Burke brand and links use
  ocean-blue ink in every state; keyboard focus remains outlined.
  Footer uses a quiet dune-grass surface with matching dark-green copy and links.
- Chapter headings retain their 24px text inset but replace filled panels
  with original SVG wave-line artwork behind the title. All use pale sky-blue
  lines and ocean-blue ink on the off-white canvas, an intentional exception
  to the former solid-panel treatment. Ink meets 4.5:1 on both the canvas and
  the wave color. No additional shade or opacity blend is introduced. Their
  full-width heading slot lets the artwork reach both viewport edges; an
  internal PageContainer keeps labels and titles on the original alignment.
- `--height-section-wave` sets every motif to 18rem (288px at the default root
  size), independent of page width and shape. Three overlapping bands,
  displaced by one third of a wave cycle, maintain a relatively constant
  vertical envelope across the width. Each contains twelve strands with
  irregular offsets, subtle horizontal drift, and varying vertical scale.
  They gather, fan out, and cross instead of using uniform parallel spacing.
  A stable section-id-derived phase shifts the composition between sections
  without runtime randomness.
  Their coordinates, 1-unit strokes, and transforms are original SVG
  artwork, not UI spacing exceptions. Non-scaling strokes retain line weight.
  `--width-section-wave` keeps the drawing at least 75rem wide: a clipped
  viewport-wide art layer crops it centrally on narrow screens rather than
  squeezing the waves. On larger screens only horizontal scale changes;
  vertical scale remains fixed. This decorative-art crop does not affect
  project media and cannot introduce horizontal page overflow.
  Header content has the same minimum height but can grow for wrapped or
  enlarged text; the centered motif keeps its height and never clips copy.
- Wave decoration is hidden from assistive technology, nonfocusable, and
  pointer-transparent, with no animation under any motion preference.
  Smaller subsection headings retain their neutral rule and dark-beige ink.
  Labels, semantic heading levels, anchors, and spacing preserve structure.
- Pages do not render back buttons. The brand links home; primary navigation
  links to Other and About. Carousel controls retain simple line chevrons,
  not painted marks.
- Hero-first project introductions retain labeled, wrapping metadata pills
  below the uncropped hero. Pills remain noninteractive list items. Standard
  introductions and demonstration warnings are unchanged.
- At tablet widths and above, project introductions intentionally use 32px
  section padding and a 32px hero gap instead of the larger chapter spacing.
  Hero images are centered at their natural aspect ratio and capped by
  `--height-project-hero` (55svh), keeping the navigation, title, description,
  and complete hero visible together at typical desktop viewports such as
  1280 x 720 and 1366 x 768. This is a display-size exception to full-width
  project media, not a crop or source-resolution change. Mobile heroes,
  body media, cards, and other sections retain their existing sizing.

## Media and interaction

Project thumbnails always show complete images at grid-column width and
natural height. Other media preserves natural composition unless the author
explicitly selects a crop. Do not change source dimensions or re-encode
approved images as part of styling.

Carousels reserve the tallest slide's height. Each 48px button occupies a
side rail with an 8px gap, intentionally trading some small-screen image
width for unobstructed media and captions. Single-image and unenhanced
galleries use the full width. Native scroll snap supports touch; buttons and
keyboard move immediately. Counts are screen-reader-only. There is no
autoplay; without JavaScript, the scrollable gallery remains accessible and
nonfunctional controls stay hidden.

Focus is visible and hover is never the only affordance. Reduced motion
removes nonessential transitions and animations. Internal links and assets
must work at both root and repository-subpath deployments.

## Enforcement

`npm run validate` checks formatting, Stylelint token rules, Astro/TypeScript,
and focused tests, including measured palette contrast. Inline styles are
reserved for validated custom-property parameters such as media ratio.
SVG coordinates and stroke widths are artwork, not UI-scale exceptions.
Responsive browser checks complement automated validation.

See [Components](COMPONENTS.md) for APIs.
