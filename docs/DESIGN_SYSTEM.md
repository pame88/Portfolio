# Design system

## Source of truth

`src/styles/tokens.css` owns primitive scales and semantic aliases. The palette is coastal: faded blues, sandy beige, sea-glass green, and weathered white. Typography and layout remain the existing editorial foundation. Refine visual decisions centrally, not through page-specific overrides.

| Group         | Foundation                                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| Typography    | System sans body, system serif display; regular/medium weights; fluid display and headings                     |
| Semantic text | display, heading-xl/l/m/s, body-l/m/s, caption, label                                                          |
| Spacing       | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px expressed in rem                                                       |
| Widths        | reading 44rem, content 76rem, wide 90rem, full-bleed                                                           |
| Layout        | fluid page gutter, shared section spacing and grid gaps; one/two/three-column grid                             |
| Colors        | weathered-white page, sea-glass surface, sandy warm surface/borders, coastal ink, faded-blue links and focus   |
| Media         | uncropped thumbnails at grid-column width and natural height; optional 4:3 crop for other media and 16:9 video |
| Other         | radius, border width, focus offset, motion durations/easing, shadow, header and overlay layers                 |
| Breakpoints   | `--tablet` at 48rem and `--desktop` at 72rem, expanded at build time                                           |

## Rules

- Components reference semantic text classes and CSS custom properties, not private size/color scales.
- All nonzero spacing, font sizes, colors, radii, shadows, and animation timing must use tokens. Zero, intrinsic sizing, and structural percentages are deliberate CSS mechanics, not design-scale exceptions.
- Place new reusable visual decisions in tokens, explain their intended use here, and prefer existing values. Do not duplicate styling in pages.
- PageContainer aligns gutters for content, reading, wide, or full widths. Section owns vertical rhythm. Heading/Text do not secretly add section spacing.
- Grids begin with one column, become two at tablet width, and optionally three at desktop width. Typography and gutters scale fluidly without page-specific breakpoints.
- Full-bleed composition is an explicit container choice, not negative-margin hacks. Gallery expansion must preserve these alignments.
- Focus remains visible; hover is not the only affordance. Reduced motion removes decorative transitions/loops. Project thumbnails always preserve the complete image: column width stays consistent and height varies with aspect ratio. Other media preserves natural composition unless an author selects a crop.

## Coastal palette

| Token                              | Color     | Use                                                             |
| ---------------------------------- | --------- | --------------------------------------------------------------- |
| `--color-page`                     | `#f5f3ed` | Weathered-white page canvas                                     |
| `--color-surface`                  | `#dfe9e2` | Pale sea-glass surface; site header and video backdrop          |
| `--color-surface-warm`             | `#e9dfcf` | Sandy-beige surface; site footer                                |
| `--color-text`                     | `#293d46` | Deep coastal blue-gray headings and primary text                |
| `--color-secondary`                | `#4e635e` | Weathered green secondary text and captions                     |
| `--color-muted`                    | `#506560` | Muted green labels; still readable at small sizes               |
| `--color-border`                   | `#c8bba6` | Sandy decorative separators, not a sole control/focus indicator |
| `--color-accent` / `--color-focus` | `#3f6278` | Faded ocean-blue links and keyboard focus                       |
| `--color-accent-hover`             | `#2e4c60` | Deeper blue interaction state                                   |

Pale colors belong on surfaces, not low-contrast text. All text roles meet a minimum 4.5:1 contrast against each of the three surfaces; focus meets at least 3:1. Header/footer color treatments reuse shared surface tokens without changing spacing or layout. Project artwork retains its original colors and files.

## Enforcement

`npm run lint` runs Stylelint over shared CSS and Astro styles, including strict token-value rules and native style checks. Inline component styles are reserved for validated CSS custom-property parameters (for example media ratio). SVG source artwork and document metadata are not UI styling. Automated checks complement, not replace, responsive and accessibility review.

See [Components](COMPONENTS.md) for APIs; update this guide whenever token meaning or responsive behavior changes.
