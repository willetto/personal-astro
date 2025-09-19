import { defineField, defineType } from "sanity";

export const navItem = defineType({
  name: "navItem",
  title: "Navigation Item",
  type: "object",
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "reference",
      to: [{ type: "page" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label override",
      type: "string",
      description: "Optional. If empty, the page title is used.",
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
        ],
        layout: "radio",
      },
      initialValue: "secondary",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "label",
      pageTitle: "page.title",
    },
    prepare({ title, pageTitle }) {
      return {
        title: title || pageTitle || "Untitled",
        subtitle: "Navigation item",
      };
    },
  },
});