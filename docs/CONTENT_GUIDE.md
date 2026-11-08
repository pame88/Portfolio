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

<Section width="reading">
  ## Context

Write the actual project narrative here.

</Section>

<Section width="wide">
  <ResponsiveImage
    src={image}
    alt="Describe the actual image."
    caption="Optional caption."
  />
</Section>
```

The validated schema supports title, description, category (`work` or `creative`), thumbnail, optional heroMedia (image or video), tags, featured, published, order, date, role, timeline, collaborators, tools, relatedProjects, and placeholder. Metadata is optional unless explicitly required by the schema. Do not invent values to fill empty fields.

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

Import raster images for Astro processing; `ResponsiveImage` emits responsive WebP/AVIF sources and width/height. SVGs remain vectors. Use meaningful alt text; use `alt=""` only for decorative imagery. Captions and credits are separate from alternatives.

Set `priority` only for important above-the-fold imagery. Set `sizes` when a composition differs from the default full-content width. Cards explicitly crop; project media otherwise preserves its natural aspect ratio. Do not serve high-resolution source files directly from `public/` by default.

Existing root media folders are source material, not approval to publish. Select assets with the owner first.

## Videos

Use `VideoPlayer` in MDX with `src`, imported `poster`, and `label`. For content videos with speech, supply a WebVTT `captions` URL and a `transcript` link; check accuracy and keyboard playback. Captionless videos still need an equivalent textual description.

Public video/track URLs such as `/media/clip.mp4` are resolved through the configured base path by the component. Absolute HTTPS URLs remain external. Use approved YouTube/Vimeo links for now; provider-specific embeds are deferred.

Decorative videos require `decorative`, are muted/looping/inline, expose a pause/play button, and stop under reduced motion; they must not convey information unavailable in adjacent text. They remain static posters without JavaScript. External videos with caption tracks require the media host to allow cross-origin access. Keep local files small and use external hosting for large video. Do not rely on Git LFS for GitHub Pages delivery.

## Flexible storytelling

Compose Markdown headings/text and reusable Sections/media in MDX. Use reading, wide, and full-width compositions intentionally. Do not insert an extra h1; the project layout owns it. Add shared sections/galleries only when real storytelling needs them, then document their API.
