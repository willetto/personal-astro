import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import { mediaAssetSource } from "sanity-plugin-media";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Posts",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toString()
            .trim()
            .toLowerCase()
            .replace(/^\/+/, "")
            .replace(/^blog\/+/, "")
            .replace(/[^a-z0-9/]+/g, "-")
            .replace(/-+/g, "-")
            .replace(/\/{2,}/g, "/")
            .replace(/^-|-$/g, ""),
      },
      description:
        "Plain segment(s) only. Do NOT include a leading '/' or the 'blog/' prefix. Use kebab-case.",
      validation: (rule) =>
        rule.required().custom((value) => {
          const current = (value as { current?: string } | undefined)?.current;
          if (!current) return "Slug is required";
          if (/^\//.test(current)) return "Remove leading '/' from slug";
          if (/^blog\//.test(current))
            return "Remove 'blog/' prefix; the route adds it automatically";
          if (!/^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(current))
            return "Use lowercase letters, numbers, and hyphens";
          return true;
        }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(300),
      description: "Used for blog cards, summaries, and SEO descriptions.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
        sources: [mediaAssetSource],
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
      options: {
        layout: "tags",
      },
      description: "Used for blog filtering and tag pages.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "portableText",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
      media: "coverImage",
    },
  },
});
