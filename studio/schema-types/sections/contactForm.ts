import { defineField, defineType } from "sanity";

export const contactForm = defineType({
  name: "contactForm",
  title: "Contact Form",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "taglineIcon",
      title: "Tagline Icon (Lucide name)",
      type: "string",
      description: "Enter the Lucide icon name (e.g., 'mail', 'brain').",
    }),
    defineField({
      name: "supportLinks",
      title: "Support Links",
      type: "array",
      of: [
        defineField({
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon (Lucide name)",
              type: "string",
              description: "Enter the Lucide icon name (e.g., 'brain', 'clock', 'info-circle').",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "url",
              description: "URL for the link.",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "icon",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Untitled Link",
                subtitle: subtitle ? `Icon: ${subtitle}` : "",
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "headline",
      subtitle: "tagline",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Contact Form Section",
        subtitle: subtitle || "",
      };
    },
  },
});