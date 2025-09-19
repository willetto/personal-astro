import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Studies",
  type: "document",
  icon: CaseIcon,
  groups: [
    {
      name: "projectDetails",
      title: "Project Details",
    },
    {
      name: "content",
      title: "Content",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
      group: "projectDetails",
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
            .replace(/^\/+/, "") // remove leading slashes
            .replace(/^case-studies\/+/, "") // remove route prefix if typed
            .replace(/[^a-z0-9/]+/g, "-") // non-url chars to '-'
            .replace(/-+/g, "-") // collapse dashes
            .replace(/\/{2,}/g, "/") // collapse multiple '/'
            .replace(/^-|-$/g, ""), // trim leading/trailing '-'
      },
      description:
        "Plain segment(s) only. Do NOT include a leading '/' or the 'case-studies/' prefix. Use kebab-case.",
      validation: (rule) =>
        rule.required().custom((value) => {
          const current = (value as { current?: string } | undefined)?.current;
          if (!current) return "Slug is required";
          if (/^\//.test(current)) return "Remove leading '/' from slug";
          if (/^case-studies\//.test(current))
            return "Remove 'case-studies/' prefix; the route adds it automatically";
          if (!/^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(current))
            return "Use lowercase letters, numbers, and hyphens";
          return true;
        }),
      group: "projectDetails",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Brief description of the case study (used for SEO and listings)",
      validation: (rule) => rule.max(300),
      group: "projectDetails",
    }),
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      group: "projectDetails",
    }),
    defineField({
      name: "projectDate",
      title: "Project Date",
      type: "date",
      group: "projectDetails",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      description: "Main image used for the case study header and listings",
      validation: (rule) => rule.required(),
      group: "projectDetails",
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
      group: "projectDetails",
    }),
    defineField({
      name: "challenge",
      title: "Challenge",
      type: "text",
      rows: 4,
      description: "What problem or challenge did this project solve?",
      group: "content",
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 4,
      description: "How did you solve the challenge?",
      group: "content",
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "text",
      rows: 4,
      description: "What were the outcomes and results?",
      group: "content",
    }),
    defineField({
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "string" }],
      description: "Technologies, frameworks, or tools used in this project",
      group: "projectDetails",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Tags for categorizing and filtering case studies",
      group: "projectDetails",
    }),
    defineField({
      name: "websiteUrl",
      title: "Website URL",
      type: "url",
      description: "Link to the live website or project",
      group: "projectDetails",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      description: "Link to the project repository",
      group: "projectDetails",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "clientName",
      media: "featuredImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Untitled Case Study",
        subtitle: subtitle ? `Client: ${subtitle}` : "No client specified",
        media,
      };
    },
  },
});