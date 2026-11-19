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
  is required outside the homepage tide's intentional sand-writing treatment.
  System availability can slightly change font metrics, an
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
additional shades, with one owner-requested exception: `--color-on-tide` is white
header ink used only while opaque dark wave water covers the link. Normal header
ink returns as that water clears. No other white/black ink, opacity-derived UI
colors, or shadow colors are added. The pastel surfaces carry the reference colors.
The homepage tide illustration is an intentional art-only palette exception:
nine `--art-tide-*` tokens follow the owner's layered-blue reference, from
pure white and pale foam through muted blue to deep navy water. These fills belong only to decorative wave
artwork; they are not interface color roles and must not style text, links,
controls, or other page surfaces. The base UI palette retains its eight colors;
the temporary white tide-header ink is its sole additional foreground role.
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
The homepage greeting is the sole additional text treatment: existing dark-sand
ink on the off-white canvas, also meeting 4.5:1 contrast.
All surfaces retain at least 4.5:1 text contrast.

Shared `.color-pair` styling with `--sand`, `--sky`, `--grass`, or `--sunset`
modifiers sets both background
and foreground together, including nested heading tones, secondary text,
links, hover states, borders, and focus rings. Do not select ink independently
from its surface. Hover retains the paired ink and never underlines text,
including brand, navigation, project cards, and prose links. Prose links
remain underlined at rest for discoverability; navigation links never underline,
including the current page, which retains its semantic `aria-current` state;
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

- The About introduction pairs a circular portrait with the existing title and
  subtitle, stacking on mobile and sitting side by side from 48rem. The
  `--size-about-portrait` token controls its fluid diameter. Its full-width,
  static gradient expands the approved photo's sky, sunset, and ocean into soft
  blue/pink/blue transitions, fading into the page canvas. This intentional
  decorative mixed-surface exception uses existing light palette tokens and
  ocean ink for readable text, with no image blur cost, animation, or duplicated
  portrait in the background. On About only, the site header continues the
  gradient's sky-blue top without a seam; its navigation and ink stay unchanged.
  The responsive grid rule lives alongside the shared tablet rules so the
  custom-media definition is available during CSS processing.
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
- Home uses TideGreeting to cycle the three author-approved phrases every
  five seconds while the introduction is visible.
  An original nine-band blue-to-white SVG tide descends over the header and introduction,
  changes the phrase under cover, then retreats upward and leaves scattered
  bold line-drawn shells with staggered settling motion. This is an intentional exception
  to the previously static welcome, not a return to painted typography.
  The tide is clipped at the actual start of Selected work, measured before
  each cycle rather than assumed from a fixed header height. Introductory
  phrases share a grid cell that reserves the tallest phrase's height, and
  equal shore bands above and below center the greeting within its introduction
  and reserve space for shell artwork, with no eyebrow or visible animation controls.
  This intentionally increases the introduction's height without moving work
  during text changes. There is no replay button or divider.
- The rotating greeting intentionally departs from Georgia and ocean ink to evoke
  handwriting carved into sand. `--font-tide-writing` uses locally available
  handwriting faces and cursive fallback; no retained source font is published.
  A static SVG filter models finger-drawn grooves rather than flat printed ink:
  displacement roughens letter edges by at most 1.2px per axis, morphology builds
  a narrow raised sand bank, grain lighting textures the recessed strokes, and a
  dark inner upper edge gives them depth. The outer bank matches the light-sand
  canvas exactly. The interior and inner edge use existing dark sand, with only
  15% grain modulation so the strokes stay lighter than full-strength shaded ink.
  No additional sand colors are introduced; lighting also uses existing light sand.
  The dark-sand base remains readable if filters are unsupported. Filter offsets,
  grain, and bank widths are decorative lettering geometry, not layout spacing. The text
  remains semantic, selectable HTML with its existing reduced-motion and no-JS
  behavior; there is no animated texture. Its body-scale line height leaves room
  for handwritten ascenders and descenders. Other headings and the page canvas
  remain unchanged.
- `--interval-tide` is 5000ms between cycle starts; `--duration-tide` is 3400ms
  for arrival and retreat; `--duration-tide-turn` extends arrival by 400ms;
  `--duration-tide-shell` is 440ms. Greeting replacement happens at full cover,
  at the turnaround, followed immediately by withdrawal. The full 3800ms wash still
  finishes before the next five-second cycle.
  The deeper wave edge uses `--height-tide-edge`, bounded between 256px and
  512px using existing spacing tokens. Its 900-unit drawing spreads neighboring
  contours by 64 units nominally. A larger measured edge-height allowance increases
  visible band spacing, not just drawing-space distances.
  The wash extends through three quarters of Selected work's top padding, leaving
  the last quarter as a dry gap above its heading. This art-only reach adjustment
  accommodates wider bands and deeper curves without clipping or moving content.
  At each cycle, the edge height is capped at 2.1 times the measured space between that limit and the lowest of the navigation,
  reserved greeting, or complete shell shore. Measuring the whole shore guarantees
  coverage before and after each randomized scatter, not just for current shells. The leading
  contour stays within 481-899 units of its 900-unit drawing, so the opaque wash
  covers the greeting and all shells at turnaround while its full curved edge fits above the
  section boundary. Arrival stops at zero translation with no downward overshoot;
  clipping is only a safety boundary, not the visible shoreline. The section's
  remaining top padding leaves a dry gap above the Selected work heading.
  It shares the chapter artwork's 75rem
  minimum drawing width, so mobile crops broad swells rather than compressing
  them. Its nine opaque bands put a pure-white leading edge against the dry page and
  deep navy behind it, adapting the owner's reference for a wash from above.
  Each band has its own matching solid water, painted over its SVG edge by one
  CSS pixel to prevent a visible anti-aliasing seam at fractional positions.
  `tideWavePaths` combines a changing-amplitude, changing-wavelength swell with
  opposing currents. Internal bands use stronger 26/14-unit bends and faster
  opposing phase rates; they can cross each
  other, but cannot overtake the leading edge. Analytic tangents generate
  smooth cubic curves, not rigid sheets translated sideways.
  Every wash descends vertically and immediately withdraws straight back up,
  without diagonal sweeps or shear. Randomized amplitude (80-175 drawing units),
  wavelength (1600-2400 units), phase, and off-center position vary the shoreline
  from rounded arcs to pronounced deep curves. Faster opposing small ripples
  continuously deform the incoming water and matching foam. The broad bend
  softens toward deeper bands to keep all nine contours inside the drawing.
  All variations
  retain the measured coverage, clipping, timing, scroll behavior, and motion safeguards.
  A requestAnimationFrame
  loop updates paths only during the active wash and is canceled on completion
  or interruption. All layers withdraw in one continuous eased motion without
  intermediate keyframes, pauses, or forward surges. Darker layers finish
  sooner; the three lightest layers retreat more slowly and fade throughout.
  Arrival takes 1080ms with `--ease-tide-arrival`, continuously advancing while
  strongly decelerating toward its furthest reach rather than holding still.
  Its front-loaded easing reserves the last 40% of arrival for less than 5%
  of the travel, making the final approach visibly slower without extending
  arrival or altering retreat. There is no
  delayed retreat: only the instantaneous zero-velocity point needed to reverse
  direction. Retreat spans 1428ms for the deepest band to 2720ms for
  the shallowest, increasing depth separation. `--ease-tide-retreat` gives
  withdrawal and foam fading a gradual acceleration and deceleration instead
  of the quicker UI easing. Arrival is faster and withdrawal longer while
  the complete 3800ms cycle and five-second start cadence remain unchanged.
  A separate SVG foam layer follows
  arrival, then retains the furthest wash line while water recedes. Its original
  tapered ribbons drift backward slightly and fade independently; their geometry
  freezes on arrival completion. Water and foam opacity are intentional illustration-only
  exception to the opaque UI palette, not a new text or control treatment.
  Foam ribbons retain 11-41 drawing-unit midpoint thickness. Only one six-patch
  trail is left at the turnaround edge, with no additional rows during withdrawal.
  Interruption cancels all foam animations.
  Path coordinates, transforms, phase rates, foam fading, and shell rotation
  are decorative-art geometry, not new UI-scale values. Water uses the
  documented `--art-tide-*` exception. Shells add a separate art-only exception:
  `--art-shell-pink`, `--art-shell-rose`, `--art-shell-lilac`,
  `--art-shell-lavender`, and `--art-shell-sand` provide pastel pinks, purples,
  and light brown. No shell uses red, blue, or green. These colors remain bold
  outlines and lighter hatching, not solid silhouettes or new interface roles.
  Their slight irregularity, non-scaling strokes, varied rotations, and staggered
  landing evoke the supplied embroidery reference without publishing it.
  Each wash chooses one to five shells at every viewport size, never repeating
  the preceding count. Resize retains that count. Each shore band has its own
  horizontal slots so five shells still fit on phones without collisions.
  Shells vary in size using a 48px-64px token-based responsive base and per-drawing
  art scales. Their fully opaque inks and 2.2px outlines make them more prominent.
  Connection, resize, and each fully covered greeting change reshuffle horizontal
  slots, positions, and rotations. Rotated bounds and a 4px artwork clearance keep
  drawings inside their slots and out of the heading, navigation, and Selected work.
  The static fallback retains all five with varied sizes and colors in fixed safe
  positions. No viewport-specific shell count or local media-query exception remains.
  No image, font, video, or external
  service is loaded for the tide.
- There is no pause/replay button. Escape stops the current cycle immediately
  and suppresses future waves until navigation/reload; a visually hidden instruction
  makes this available to screen-reader users without adding visible UI.
  Reduced motion disables the tide and shell motion. Without JavaScript, the
  first greeting and shell scatter remain static.
  Scrolling never interrupts an active wash, even when the introduction leaves
  the viewport. An offscreen introduction suspends only future cycles.
  Hidden tabs, header keyboard focus and text selection suspend cycles.
  Header pointer activation, Escape, resize,
  and focus interactions finish any current wash immediately so navigation
  and focus are never obscured. Resuming waits a fresh five seconds.
  Touch gestures outside the header and keyboard scrolling do not cancel water.
  During a wash the actual header is stacked above the artwork, without a
  background fill or duplicate navigation. Links turn white only when the two
  darkest opaque bands cover them, tracked against their SVG contours. Ink
  changes immediately to avoid fading white text over the cleared canvas.
  The overlay stays pointer-transparent and real links remain clickable;
  keyboard focus and header pointer activation still clear the wave immediately.
  Decorative artwork is hidden from assistive technology and pointer-transparent;
  inactive phrases are hidden from both sight and screen readers. Text changes
  are not live announcements, and the main heading remains semantic HTML.
- The header has no background fill, allowing the off-white page canvas to show through.
  Its text remains ocean blue, with no bottom border.
  Header navigation uses 1.125rem plain sans-serif links via `--type-nav`,
  without spray texture or shadow, padded targets, visible
  focus, native wrapping, and `aria-current` for the
  current page, with no underline in any state. The Eamonn Burke brand and links use
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
