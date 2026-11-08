# Design system

## Source of truth

`src/styles/tokens.css` owns primitive scales and semantic aliases. This is a provisional neutral foundation, not a final visual identity. Refine tokens centrally after design references are supplied.

| Group         | Foundation                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------------- |
| Typography    | System sans body, system serif display; regular/medium weights; fluid display and headings     |
| Semantic text | display, heading-xl/l/m/s, body-l/m/s, caption, label                                          |
| Spacing       | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px expressed in rem                                       |
| Widths        | reading 44rem, content 76rem, wide 90rem, full-bleed                                           |
| Layout        | fluid page gutter, shared section spacing and grid gaps; one/two/three-column grid             |
| Colors        | warm page/surface, ink, secondary/muted text, border, teal accent and hover, focus             |
| Media         | natural dimensions by default; 4:3 cards and 16:9 video when a crop/container is needed        |
| Other         | radius, border width, focus offset, motion durations/easing, shadow, header and overlay layers |
| Breakpoints   | `--tablet` at 48rem and `--desktop` at 72rem, expanded at build time                           |

## Rules

- Components reference semantic text classes and CSS custom properties, not private size/color scales.
- All nonzero spacing, font sizes, colors, radii, shadows, and animation timing must use tokens. Zero, intrinsic sizing, and structural percentages are deliberate CSS mechanics, not design-scale exceptions.
- Place new reusable visual decisions in tokens, explain their intended use here, and prefer existing values. Do not duplicate styling in pages.
- PageContainer aligns gutters for content, reading, wide, or full widths. Section owns vertical rhythm. Heading/Text do not secretly add section spacing.
- Grids begin with one column, become two at tablet width, and optionally three at desktop width. Typography and gutters scale fluidly without page-specific breakpoints.
- Full-bleed composition is an explicit container choice, not negative-margin hacks. Gallery expansion must preserve these alignments.
- Focus remains visible; hover is not the only affordance. Reduced motion removes decorative transitions/loops. Natural image composition is preserved unless an author selects a crop.

## Enforcement

`npm run lint` runs Stylelint over shared CSS and Astro styles, including strict token-value rules and native style checks. Inline component styles are reserved for validated CSS custom-property parameters (for example media ratio). SVG source artwork and document metadata are not UI styling. Automated checks complement, not replace, responsive and accessibility review.

See [Components](COMPONENTS.md) for APIs; update this guide whenever token meaning or responsive behavior changes.
