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
      name: "ctas",
      title: "CTAs",
      type: "array",
      of: [{ type: "cta" }],
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
    select: { title: "header", subtitle: "ctas.0.label" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Feature 1",
        subtitle: subtitle ? `CTA: ${subtitle}` : "",
      } as { title: string; subtitle?: string };
    },
  },
});
