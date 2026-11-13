# Content guide

## Adding a project

Create `src/content/projects/my-project.mdx` and approved assets under `src/assets/`. The filename is the route slug; no new page component is needed.

```mdx
---
title: "Author-supplied title"
description: "A concise, factual summary."
category: "work"
thumbnail:
  src: "../../assets/placeholder.svg"
  alt: "Describe the actual image, not its filename."
featured: false
published: false
order: 10
tags: ["Product design"]
---

import Section from "../../components/layout/Section.astro";
import ResponsiveImage from "../../components/media/ResponsiveImage.astro";
import image from "../../assets/placeholder.svg";

<Section>
  ## Context

Write the actual project narrative here.

</Section>

<Section>
  <ResponsiveImage
    src={image}
    alt="Describe the actual image."
    caption="Optional caption."
  />
</Section>
```

The validated schema supports title, description, category (`work` or `creative`), thumbnail, optional heroMedia (image or video), tags, featured, published, order, date, role, timeline, collaborators, tools, relatedProjects, and placeholder. Metadata is optional unless explicitly required by the schema. Do not invent values to fill empty fields.

`introLayout` defaults to `standard`. Set `introLayout: hero-first` to omit the category label and show role, tools, and skills (`tags`) as labeled pill groups below the hero. Optional timeline and collaborators join the same metadata block when supplied; empty fields produce no group. Without hero media, the block follows the introduction. Demonstration warnings remain visible in either layout. Dragon Admin Center uses this layout without changing the other project introductions.

Use lowercase, hyphenated filenames. Dates use ISO form. Listings sort by order then title. `published: false` is the default and removes a project from all public routes/listings. `placeholder: true` visibly labels demonstration content.

Optional image hero:

```yaml
heroMedia:
  type: image
  src: "../../assets/placeholder.svg"
  alt: "Describe the hero."
```

Optional video hero:

```yaml
heroMedia:
  type: video
  src: "https://approved-host.example/clip.mp4"
  poster: "../../assets/placeholder.svg"
  label: "Describe the video."
  captions: "https://approved-host.example/clip-en.vtt"
  transcript: "https://approved-host.example/transcript"
```

`relatedProjects` reserves IDs for future related-project UI; no links are generated from it yet.

## Images

Import the highest-resolution approved originals. `ResponsiveImage` serves the original file at its full source resolution on every device, without resizing, lossy conversion, or smaller `srcset` candidates. Astro copies imported files into the static output; CSS still scales their display responsively, and source width/height reserve layout space. SVGs remain vectors. Project social images and video posters also use their original files. This quality-first policy intentionally increases mobile bandwidth and download time; lazy loading remains enabled below the hero. It cannot restore detail missing from a low-resolution source or an already-compressed original. Use meaningful alt text; use `alt=""` only for decorative imagery. Captions and credits are separate from alternatives.

Set `priority` only for important above-the-fold imagery. Project-card thumbnails always show the complete image at the grid-column width; their height follows the natural aspect ratio. Do not crop thumbnails or vary their width based on image proportions. Project media also preserves its natural aspect ratio unless an author intentionally selects a crop. Keep originals imported from `src/assets/` rather than duplicating them in `public/`.

Existing root media folders are source material, not approval to publish. Select assets with the owner first.

## Videos

Use `VideoPlayer` in MDX with `src`, imported `poster`, and `label`. For content videos with speech, supply a WebVTT `captions` URL and a `transcript` link; check accuracy and keyboard playback. Captionless videos still need an equivalent textual description.

Public video/track URLs such as `/media/clip.mp4` are resolved through the configured base path by the component. Absolute HTTPS URLs remain external. Use approved YouTube/Vimeo links for now; provider-specific embeds are deferred.

Decorative videos require `decorative`, are muted/looping/inline, expose a pause/play button, and stop under reduced motion; they must not convey information unavailable in adjacent text. They remain static posters without JavaScript. External videos with caption tracks require the media host to allow cross-origin access. Keep local files small and use external hosting for large video. Do not rely on Git LFS for GitHub Pages delivery.

## Flexible storytelling

Compose Markdown headings/text and reusable Sections/media in MDX. Sections fill the available page width with shared side padding; use `width="full"` only for an intentional unpadded, full-bleed composition. Do not add private reading-width caps or duplicate gutters inside a Section. Do not insert an extra h1; the project layout owns it. Add shared sections/galleries only when real storytelling needs them, then document their API.

For a long case study, `SectionHeading` distinguishes chapters with a pale-blue wave motif behind blue text and subsections with a neutral rule. Supply a stable `id` when replacing a Markdown heading so existing fragment links still work; the same id also keeps the decorative wave form stable across builds. Every chapter wave has the same shared height. Existing `tone` values remain accepted, but chapter styling consistently uses the blue pairing. Dragon Admin Center keeps its three chapter anchors, numbers four feature highlights and four process steps, and separates the audit, design-system, GA-design, and customer-interaction content into individual Sections. This changes presentation only, not the supplied narrative or media order.

Markdown h2 titles inherit the shared Georgia serif style; h3/h4 subheadings use medium-weight system sans-serif. Do not select heading levels just to change appearance. Component-based intro subtitles use `<Text variant="subtitle">` and remain clean sans-serif, like paragraphs, captions, labels, and metadata. Optional `Heading` tones use accessible coastal inks; their older color names are retained for compatibility, not literal pink or violet styling.

## Solution carousels

Import `ImageCarousel` from `src/components/media/ImageCarousel.astro`. Supply a page-unique `id`, a descriptive `label`, and an ordered array of `{ src, alt, caption? }` objects using imported originals. Empty arrays fail the build; a single image remains a valid gallery without redundant controls. Use concise, individual-image captions rather than references to "left" and "right" from an earlier paired layout.

The Dragon Admin Center case study replaces the sample narrative using the owner's Medium draft (`01dc46ed3bb8`), with embedded images approved in article order. Its four "The solution" galleries contain 1, 4, 6, and 3 images respectively. The thumbnail and hero use the owner's original `src/assets/DACScreens/DACSplash.png`. The organization, removal, and EHR galleries use the matching laptop-framed originals from `src/assets/DACScreens/`, as approved by the owner. The EHR added-users screen is named `Roles page.png` in that source folder; the selected-users removal screen also shows its confirmation dialog. The environment-picker section contains only one image in the source; no extra slides were invented. That image and the eight process images still come from the draft, with no matching replacements in DACScreens. Original Medium image files are stored unchanged under `src/assets/dragon-admin-center/`; ordered captions and alternatives live in `src/content/dragon-admin-center-media.ts`. Existing, unrelated source folders remain unpublished. Copy is lightly edited for grammar and individual-slide captions; the empty "Post GA enhancements" draft heading is not published, and no outcomes or metrics are invented.

The existing `/projects/sample-case-study/` route is intentionally retained to avoid breaking links. The entry is no longer marked as a placeholder. Role, tools, and skill tags come from the author's supplied content.
