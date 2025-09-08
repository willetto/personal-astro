import { defineField, defineType } from "sanity";

export const hero1 = defineType({
  name: "hero1",
  title: "Hero 1",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA Label",
      type: "string",
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Primary CTA Href",
      type: "string",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary CTA Label",
      type: "string",
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "Secondary CTA Href",
      type: "string",
    }),
    defineField({
      name: "gradientFromColor",
      title: "Gradient From Color",
      type: "string",
      description:
        "Starting color for the background gradient (hex format, e.g., #7CFF6B)",
    }),
    defineField({
      name: "gradientToColor",
      title: "Gradient To Color",
      type: "string",
      description:
        "Ending color for the background gradient (hex format, e.g., #FFF042)",
    }),
  ],
  preview: {
    select: { title: "header" },
    prepare({ title }) {
      return {
        title: title || "Hero 1",
        subtitle: "Hero 1",
      } as { title: string; subtitle?: string };
    },
  },
});
