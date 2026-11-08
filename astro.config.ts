import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import customMedia from "postcss-custom-media";
import { hostingConfig } from "./src/utils/urls";

const hosting = hostingConfig(process.env.SITE_URL, process.env.BASE_PATH);

export default defineConfig({
  ...hosting,
  output: "static",
  trailingSlash: "always",
  integrations: [mdx(), sitemap()],
  vite: { css: { postcss: { plugins: [customMedia()] } } },
});
