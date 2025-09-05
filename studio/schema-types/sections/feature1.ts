import { defineField, defineType } from "sanity";

export const feature1 = defineType({
  name: "feature1",
  title: "Feature 1",
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
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        defineField({
          name: "feature",
          title: "Feature",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon (id/text)",
              type: "string",
            }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
            }),
            defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "header", subtitle: "primaryCtaLabel" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Feature 1",
        subtitle: subtitle ? `CTA: ${subtitle}` : "",
      } as { title: string; subtitle?: string };
    },
  },
});
