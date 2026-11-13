import assert from "node:assert/strict";
import test from "node:test";
import { hostingConfig, resolvePath } from "../src/utils/urls.ts";

test("root, repository and custom-domain paths stay consistent", () => {
  for (const base of ["/", "/portfolio", "/portfolio/"]) {
    const config = hostingConfig("https://example.com", base);
    const expected = base === "/" ? "/about/" : "/portfolio/about/";
    assert.equal(resolvePath("/about/", config.base), expected);
    assert.equal(
      new URL(resolvePath("/media/clip.mp4", config.base), config.site)
        .pathname,
      base === "/" ? "/media/clip.mp4" : "/portfolio/media/clip.mp4",
    );
  }
  assert.equal(
    resolvePath("https://media.example/clip.mp4", "/portfolio/"),
    "https://media.example/clip.mp4",
  );
  assert.equal(resolvePath("#main-content", "/portfolio/"), "#main-content");
});

test("invalid hosting configuration and ambiguous internal URLs fail explicitly", () => {
  for (const origin of [
    "https://example.com/portfolio",
    "ftp://example.com",
    "https://user:pass@example.com",
    "https://example.com/?query=yes",
  ]) {
    assert.throws(() => hostingConfig(origin, "/"));
  }
  for (const base of ["portfolio", "//portfolio", "/../", "/portfolio?query"]) {
    assert.throws(() => hostingConfig("https://example.com", base));
  }
  for (const path of [
    "media/video.mp4",
    "//external.example/video.mp4",
    "javascript:alert(1)",
  ]) {
    assert.throws(() => resolvePath(path, "/portfolio/"));
  }
});
