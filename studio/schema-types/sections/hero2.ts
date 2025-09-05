import { defineField, defineType } from "sanity";

export const hero2 = defineType({
  name: "hero2",
  title: "Hero 2",
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
      name: "primaryCtaTarget",
      title: "Primary CTA Target",
      type: "string",
      options: { list: ["", "_blank", "_self", "_parent", "_top"] },
      initialValue: "",
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
      name: "secondaryCtaTarget",
      title: "Secondary CTA Target",
      type: "string",
      options: { list: ["", "_blank", "_self", "_parent", "_top"] },
      initialValue: "",
    }),
  ],
  preview: {
    select: { title: "header", subtitle: "primaryCtaLabel" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Hero 2",
        subtitle: subtitle ? `CTA: ${subtitle}` : "",
      } as { title: string; subtitle?: string };
    },
  },
});
