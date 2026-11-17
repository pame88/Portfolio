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

The validated schema supports title, description, category (`work` or `creative`), thumbnail, optional heroMedia (image or video), tags, featured, published, order, date, year, role, timeline, collaborators, tools, relatedProjects, and placeholder. Metadata is optional unless explicitly required by the schema. Do not invent values to fill empty fields.

`role` accepts a single string or an array of separate roles. Use an array
for multiple role pills, such as `role: ["Product designer", "Developer"]`.
Skills use `tags`; homepage project rows display the same supplied skills.

Use the optional quoted `year` field for an author-supplied year (`"2023"`) or range (`"2022 - 2026"`), independently of the exact `date` or project-page `timeline`. Work-card eyebrows display `UX Design` followed by a bullet and the year when supplied; creative cards retain `Other`. The Sample visual study demonstration entry has been removed from listings and generated routes.

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

Approved local videos can also be imported from `src/assets/` with `?url`
and passed to VideoPlayer. The URL resolver preserves Vite's existing
deployment prefix instead of adding it twice.

Decorative videos require `decorative`, are muted/looping/inline, expose a pause/play button, and stop under reduced motion; they must not convey information unavailable in adjacent text. They remain static posters without JavaScript. External videos with caption tracks require the media host to allow cross-origin access. Keep local files small and use external hosting for large video. Do not rely on Git LFS for GitHub Pages delivery.

## Flexible storytelling

Compose Markdown headings/text and reusable Sections/media in MDX. Sections fill the available page width with shared side padding; use `width="full"` only for an intentional unpadded, full-bleed composition. Do not add private reading-width caps or duplicate gutters inside a Section. Do not insert an extra h1; the project layout owns it. Add shared sections/galleries only when real storytelling needs them, then document their API.

For a long case study, `SectionHeading` distinguishes chapters with a pale-blue wave motif behind blue text and subsections with a neutral rule. Place chapter headings directly inside `Section` with `slot="heading"` so the artwork reaches the viewport edges while title text and body media retain their shared gutters. Keep subsection headings in the default content slot. Supply a stable `id` when replacing a Markdown heading so existing fragment links still work; the same id also keeps the decorative wave form stable across builds. Every chapter wave has the same shared height and a consistent vertical spread across its width. Existing `tone` values remain accepted, but chapter styling consistently uses the blue pairing. Dragon Admin Center keeps its three chapter anchors, uses `FeatureHeading` for consistent titles and "Feature highlight" eyebrows on all four features, numbers four process steps, and separates the audit, design-system, GA-design, and customer-interaction content into individual Sections. Its environment picker uses `FeatureHighlight` for a media-left, introduction-right composition with the solution spanning the full content width below. Mobile reading order remains introduction, media, then solution. The supplied narrative and image sequence are preserved.

Markdown h2 titles inherit the shared Georgia serif style; h3/h4 subheadings use medium-weight system sans-serif. Do not select heading levels just to change appearance. Component-based intro subtitles use `<Text variant="subtitle">` and remain clean sans-serif, like paragraphs, captions, labels, and metadata. Optional `Heading` tones use accessible coastal inks; their older color names are retained for compatibility, not literal pink or violet styling.

## Solution carousels

Import `ImageCarousel` from `src/components/media/ImageCarousel.astro`. Supply a page-unique `id`, a descriptive `label`, and an ordered array of `{ src, alt, caption? }` objects using imported originals. Empty arrays fail the build; a single image remains a valid gallery without redundant controls. Use concise, individual-image captions rather than references to "left" and "right" from an earlier paired layout.

The Dragon Admin Center case study replaces the sample narrative using the owner's Medium draft (`01dc46ed3bb8`), with embedded images approved in article order. Its four solution galleries contain 1, 4, 6, and 3 images respectively. The thumbnail and hero use the owner's original `src/assets/DACScreens/DACSplash.png`. The organization, removal, and EHR galleries use the matching laptop-framed originals from `src/assets/DACScreens/`, as approved by the owner. The EHR added-users screen is named `Roles page.png` in that source folder; the selected-users removal screen also shows its confirmation dialog. The environment-picker section uses the owner-approved original `src/assets/DAC Documentation/Environment picker.png`, replacing the draft screenshot without inventing extra slides. The eight process images still come from the draft. Original Medium image files are stored unchanged under `src/assets/dragon-admin-center/`; ordered captions and alternatives live in `src/content/dragon-admin-center-media.ts`. Existing, unrelated source folders remain unpublished. Copy is lightly edited for grammar and individual-slide captions; the empty "Post GA enhancements" draft heading is not published, and no outcomes or metrics are invented.

The existing `/projects/sample-case-study/` route is intentionally retained to avoid breaking links. The entry is no longer marked as a placeholder. Role, tools, and skill tags come from the author's supplied content.

Listening Parties is published at `/projects/listening-parties/` and included in Selected work. Its thumbnail and project hero both use the owner-approved `src/assets/ListeningParty/ListeningPartySplash2.png` original. Below the hero, "Concept walkthrough" uses the owner-approved `src/assets/ListeningParty/ListeningPartyVideo.mp4` unchanged with VideoPlayer. Its poster, `src/assets/ListeningParty/ListeningPartyVideo-poster.jpg`, is the video's first frame extracted at its native 1280 x 688 resolution, not the project splash image. Regenerate this poster when replacing the video. Playback uses native controls, metadata-only preload, and no autoplay. This approximately 96 MiB local video is an intentional exception to the external-hosting preference and remains below GitHub's 100 MiB per-file limit. Captions and a transcript have not been supplied. Additional narrative and project metadata remain pending author input.

eat! is published at `/projects/eat/` and included in Selected work. Its thumbnail and project hero both use the owner-approved `src/assets/eat!/eatSplash.png` original. Below the shared hero-first introduction, 17 slides from the owner-approved `src/assets/eat!/eat! Presentation.pptx` appear in the existing ImageCarousel. Original slides 12 (Product Demo) and 19 (Thanks!) are intentionally omitted; the remaining slides retain their source order with consecutive display numbering. The original template and artwork credits appear below the carousel instead of on the closing slide. PowerPoint exported each slide locally as a lossless 2560 x 1440 PNG under `src/assets/eat!/presentation/`, preserving the aspect ratio and artwork. These are deliberately static exports, not a live PowerPoint embed: animations and links within slides are not interactive. No deck is sent to an external viewer, and the PowerPoint source is not published. `src/content/eat-presentation.ts` owns the ordered imports, descriptive alternatives, and visible slide-number/title captions. To update the presentation, re-export the source at the same dimensions and update the content list to match, retaining the two intentional omissions. The existing carousel supplies keyboard, touch, button navigation, and a no-JavaScript scroll fallback without a new dependency. Other assets in the eat! folder remain unpublished.

Before exporting, make the deck's original Advent Pro and Roboto typefaces
available to PowerPoint, including their regular and bold faces and Roboto's
italic faces. Arial and Trebuchet MS must also be available. Font substitution
changes wrapping and causes overlaps even when the reported point sizes match.
The corrected exports use the original fonts and unchanged source point sizes
(including 30pt titles, 22pt feature labels, and 9pt process markers), rather
than shrinking text or changing the source deck. Check every slide after
exporting, especially the journey labels on slide 2, the two-line research
headings on slide 3, and the single-line insight labels below the illustrations
on slide 4. These fonts are export-time prerequisites only: the site still
loads no web fonts, and its own typography is unchanged.

The eat! page places a "Concept video" section above Presentation, using the
owner-approved `src/assets/eat!/Eat_FinalVideo_Compressed.mp4`. Its original
H.264 video stream is preserved without re-encoding; the audio is converted
from AAC to MP3 for playback in browsers without an AAC decoder, including
the integrated preview. When replacing this file, verify that audio actually
decodes during playback, not just that the video has an audio track.
It uses VideoPlayer with native controls, inline playback, metadata-only preload,
and no autoplay. The already approved slide 18 supplies its 16:9 poster.
This approximately 90 MiB local video is an intentional prototype exception to
the preference for externally hosted large videos; it is below GitHub's 100 MiB
per-file limit, but should not be duplicated or replaced with the larger original.
The uncompressed `src/assets/eat!/Eat_FinalVideo.mp4` is retained locally but
excluded from Git because it exceeds GitHub's 100 MiB per-file limit. Keep it
outside committed history; the site imports only the compressed version.
The video contains speech, but no captions were supplied and the owner declined
a transcript. Captions and a transcript remain unavailable. At the owner's
request, the video has no visible caption, concept description, or
caption-availability notice. Its accessible label remains on the video element.
The author's supplied metadata appears below the hero: Product Designer and
UX Researcher roles, Figma as the tool, and UX Design, UX Research, and
Marketing skills.

ReXplore is published at `/projects/rexplore/` and included in Selected work
after eat!. Its thumbnail and hero both use the owner-approved original
`src/assets/ReXplore/ReXplore.png`, without cropping or re-encoding. Its
hero-first introduction displays the supplied Product Designer and UX
Researcher roles, Figma tool, and UX Design and UX Research skills. The short
description summarizes the approved overview image, and its supplied year is 2023. The "Research process" section uses ImageCarousel to show slides 1-26
from the owner-approved `src/assets/ReXplore/Rexplore Process.pptx` in source
order. At the owner's request, slides 27 (template contact details) and 28
(no readable text) are omitted; the original Slidesgo, Flaticon, and Freepik
attribution appears below the carousel instead. Ordered imports, descriptive
alternatives, and numbered captions live in `src/content/rexplore-process.ts`.
PowerPoint exports are lossless 2560 x 1440 PNGs under
`src/assets/ReXplore/presentation/`, preserving the source's 16:9 aspect ratio,
artwork, font sizes, and wording. Export with the original Work Sans, Inter,
and Poppins regular and bold typefaces available; these are export-time
requirements, not web fonts. Inspect every exported slide when updating the
deck. The slides are static: embedded report and survey links are not
interactive. The PowerPoint source and other ReXplore assets remain unpublished.
