import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const mediaUrl = z
  .string()
  .regex(/^(\/(?!\/)|https:\/\/)/, "Use /media/... or an HTTPS URL.");

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      category: z.enum(["work", "creative"]),
      introLayout: z.enum(["standard", "hero-first"]).default("standard"),
      thumbnail: z.object({ src: image(), alt: z.string().min(1) }),
      heroMedia: z
        .discriminatedUnion("type", [
          z.object({
            type: z.literal("image"),
            src: image(),
            alt: z.string().min(1),
          }),
          z.object({
            type: z.literal("video"),
            src: mediaUrl,
            poster: image(),
            label: z.string().min(1),
            captions: mediaUrl.optional(),
            transcript: mediaUrl.optional(),
          }),
        ])
        .optional(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      published: z.boolean().default(false),
      placeholder: z.boolean().default(false),
      order: z.number().int().default(0),
      date: z.coerce.date().optional(),
      year: z
        .string()
        .regex(/^\d{4}( - \d{4})?$/, "Use YYYY or YYYY - YYYY.")
        .optional(),
      role: z
        .union([z.string(), z.array(z.string())])
        .transform((value) => (typeof value === "string" ? [value] : value))
        .default([]),
      timeline: z.string().optional(),
      collaborators: z.array(z.string()).default([]),
      tools: z.array(z.string()).default([]),
      relatedProjects: z.array(z.string()).default([]),
    }),
});

export const collections = { projects };
